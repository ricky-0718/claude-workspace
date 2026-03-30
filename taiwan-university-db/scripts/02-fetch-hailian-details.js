/**
 * 02-fetch-hailian-details.js
 * 海聯會APIから各学科の詳細データ（64フィールド）を取得
 *
 * 戦略: 大学単位で取得（137リクエスト）。各大学の最初の学科IDで詳細ページを叩くと
 *        その大学の全学科詳細が返ってくるかテスト → ダメなら学科単位で取得（2,371リクエスト）
 *
 * 出力: data/raw/hailian-dept-details/{school_id}.json（大学単位）
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = join(__dirname, '..', 'data', 'raw');
const DETAILS_DIR = join(RAW_DIR, 'hailian-dept-details');
const BASE_URL = 'https://api.overseas.ncnu.edu.tw';

const CONCURRENCY = 5;
const DELAY_MS = 150;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchJSON(url);
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`  リトライ ${i + 1}/${retries}: ${err.message}`);
      await sleep(1000 * (i + 1));
    }
  }
}

// 並列制御付きバッチ実行
async function runBatched(tasks, concurrency, delayMs) {
  const results = [];
  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fn => fn()));
    results.push(...batchResults);
    if (i + concurrency < tasks.length) await sleep(delayMs);
  }
  return results;
}

async function main() {
  await mkdir(DETAILS_DIR, { recursive: true });

  // 1. 一覧データを読み込んで大学リスト＋学科IDを取得
  const deptsRaw = JSON.parse(await readFile(join(RAW_DIR, 'hailian-departments.json'), 'utf-8'));
  console.log(`=== 学科詳細取得開始（${deptsRaw.length}校） ===\n`);

  // 2. まずNTU（school_id=01）で1件テスト: 大学単位で全学科が返るか確認
  const ntu = deptsRaw.find(s => s.id === '01');
  const testDeptId = ntu.departments[0].id;
  console.log(`[テスト] NTU dept ${testDeptId} の詳細を取得...`);
  const testData = await fetchJSON(`${BASE_URL}/schools/01/systems/bachelor/departments/${testDeptId}`);
  const returnedDeptCount = testData.departments?.length || 0;
  const expectedDeptCount = ntu.departments.length;

  let fetchBySchool;
  if (returnedDeptCount === expectedDeptCount) {
    console.log(`  → ${returnedDeptCount}学科が返却。大学単位で全学科取得可能！（${deptsRaw.length}リクエストで済む）\n`);
    fetchBySchool = true;
  } else {
    console.log(`  → ${returnedDeptCount}学科のみ返却（期待: ${expectedDeptCount}）。学科単位で取得します。\n`);
    fetchBySchool = false;
  }

  if (fetchBySchool) {
    // 大学単位で取得（137リクエスト）
    let completed = 0;
    const tasks = deptsRaw.map(school => async () => {
      const firstDeptId = school.departments[0]?.id;
      if (!firstDeptId) return null;
      const url = `${BASE_URL}/schools/${school.id}/systems/bachelor/departments/${firstDeptId}`;
      const data = await fetchWithRetry(url);
      const outPath = join(DETAILS_DIR, `${school.id}.json`);
      await writeFile(outPath, JSON.stringify(data, null, 2), 'utf-8');
      completed++;
      if (completed % 10 === 0 || completed === deptsRaw.length) {
        console.log(`  進捗: ${completed}/${deptsRaw.length}校 (${Math.round(completed / deptsRaw.length * 100)}%)`);
      }
      return { school_id: school.id, dept_count: data.departments?.length || 0 };
    });

    const results = await runBatched(tasks, CONCURRENCY, DELAY_MS);
    const totalDetails = results.filter(Boolean).reduce((sum, r) => sum + r.dept_count, 0);
    console.log(`\n=== 取得完了 ===`);
    console.log(`大学数: ${results.filter(Boolean).length}`);
    console.log(`学科詳細数: ${totalDetails}`);

  } else {
    // 学科単位で取得（2,371リクエスト）
    const allDepts = [];
    for (const school of deptsRaw) {
      for (const dept of school.departments) {
        allDepts.push({ school_id: school.id, dept_id: dept.id });
      }
    }
    console.log(`合計 ${allDepts.length} 学科を取得します...\n`);

    let completed = 0;
    const schoolData = {}; // school_id → { school info + departments[] }

    const tasks = allDepts.map(({ school_id, dept_id }) => async () => {
      const url = `${BASE_URL}/schools/${school_id}/systems/bachelor/departments/${dept_id}`;
      const data = await fetchWithRetry(url);
      if (!schoolData[school_id]) {
        schoolData[school_id] = { ...data, departments: [] };
      }
      if (data.departments?.[0]) {
        schoolData[school_id].departments.push(data.departments[0]);
      }
      completed++;
      if (completed % 100 === 0 || completed === allDepts.length) {
        console.log(`  進捗: ${completed}/${allDepts.length}学科 (${Math.round(completed / allDepts.length * 100)}%)`);
      }
      return true;
    });

    await runBatched(tasks, CONCURRENCY, DELAY_MS);

    // 大学単位でファイル保存
    for (const [schoolId, data] of Object.entries(schoolData)) {
      const outPath = join(DETAILS_DIR, `${schoolId}.json`);
      await writeFile(outPath, JSON.stringify(data, null, 2), 'utf-8');
    }

    const totalDetails = Object.values(schoolData).reduce((sum, s) => sum + s.departments.length, 0);
    console.log(`\n=== 取得完了 ===`);
    console.log(`大学数: ${Object.keys(schoolData).length}`);
    console.log(`学科詳細数: ${totalDetails}`);
  }

  console.log(`保存先: ${DETAILS_DIR}`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
