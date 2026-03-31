/**
 * 17-fetch-104-curriculum.js
 * 104人力銀行 API からカリキュラム・学費・師生比等を一括取得
 *
 * API: GET https://career-idc.104.com.tw/major/intro?schoolId=X&majorId=Y&degree=3
 *
 * 特徴:
 *   - 並行度5リクエスト（rate limit対策）
 *   - 個別JSONキャッシュ（再実行時スキップ）
 *   - リトライ3回
 *   - 進捗表示
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');
const RAW_DIR = join(__dirname, '..', 'data', 'raw', '104-intro');
const API_BASE = 'https://career-idc.104.com.tw/major/intro';
const CONCURRENCY = 5;
const DELAY_MS = 200; // バッチ間遅延

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null; // データなし
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

async function main() {
  console.log('=== 104 カリキュラム一括取得 ===\n');

  await mkdir(RAW_DIR, { recursive: true });

  // マッピング読み込み
  const mapping = JSON.parse(await readFile(join(SOURCES_DIR, '104-id-mapping.json'), 'utf-8'));
  const deptMappings = mapping.departments;
  console.log(`対象: ${deptMappings.length}学科\n`);

  // キャッシュ済みをスキップ
  const tasks = [];
  let skipped = 0;
  for (const dm of deptMappings) {
    const cacheFile = join(RAW_DIR, `${dm.school_104}-${dm.major_104}.json`);
    if (await fileExists(cacheFile)) {
      skipped++;
      continue;
    }
    tasks.push(dm);
  }

  if (skipped > 0) {
    console.log(`キャッシュ済み: ${skipped}件スキップ`);
  }
  console.log(`取得対象: ${tasks.length}件\n`);

  if (tasks.length === 0) {
    console.log('全件キャッシュ済み。完了。');
    return;
  }

  // 並行バッチ処理
  let completed = 0;
  let success = 0;
  let noData = 0;
  let errors = 0;
  const errorList = [];
  const startTime = Date.now();

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    const promises = batch.map(async (dm) => {
      const url = `${API_BASE}?schoolId=${dm.school_104}&majorId=${dm.major_104}&degree=3`;
      const cacheFile = join(RAW_DIR, `${dm.school_104}-${dm.major_104}.json`);

      try {
        const data = await fetchWithRetry(url);
        if (data) {
          // メタデータ追加
          data._meta = {
            our_dept_id: dm.our_id,
            our_school_id: dm.our_school_id,
            school_104: dm.school_104,
            major_104: dm.major_104,
            fetched_at: new Date().toISOString()
          };
          await writeFile(cacheFile, JSON.stringify(data, null, 2), 'utf-8');
          success++;
        } else {
          // 404: 空ファイルを保存（再取得しない）
          await writeFile(cacheFile, JSON.stringify({ _meta: { ...dm, fetched_at: new Date().toISOString() }, _noData: true }), 'utf-8');
          noData++;
        }
      } catch (err) {
        errors++;
        errorList.push({ ...dm, error: err.message });
      }
    });

    await Promise.all(promises);
    completed += batch.length;

    // 進捗表示（10件ごと）
    if (completed % 50 === 0 || completed === tasks.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const rate = (completed / (Date.now() - startTime) * 1000).toFixed(1);
      const eta = ((tasks.length - completed) / rate).toFixed(0);
      console.log(`  [${completed}/${tasks.length}] 成功=${success} 空=${noData} エラー=${errors} (${elapsed}秒経過, ${rate}件/秒, ETA ${eta}秒)`);
    }

    // rate limit対策
    if (i + CONCURRENCY < tasks.length) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  // エラーリスト保存
  if (errorList.length > 0) {
    await writeFile(join(SOURCES_DIR, '104-fetch-errors.json'), JSON.stringify(errorList, null, 2), 'utf-8');
    console.log(`\nエラーリスト: ${join(SOURCES_DIR, '104-fetch-errors.json')}`);
  }

  // サマリー
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  カリキュラム取得完了                        ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`  成功: ${success + skipped}件（今回: ${success} / キャッシュ: ${skipped}）`);
  console.log(`  データなし: ${noData}件`);
  console.log(`  エラー: ${errors}件`);
  console.log(`  所要時間: ${totalTime}秒`);
  console.log(`  保存先: ${RAW_DIR}`);
  console.log(`\n  次のステップ: node scripts/18-merge-104.js`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
