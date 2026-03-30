/**
 * 01-fetch-hailian.js
 * 海聯會（海外聯招會）APIから全データを取得
 *
 * エンドポイント:
 *   1. /schools?system_id=bachelor          → 129校の基本情報
 *   2. /department-groups?system_id=bachelor → 18学群分類
 *   3. /schools/all/systems/bachelor/departments?... → 全学科一覧（2,371件）
 *
 * 出力: data/raw/hailian-schools.json, hailian-groups.json, hailian-departments.json
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = join(__dirname, '..', 'data', 'raw');
const BASE_URL = 'https://api.overseas.ncnu.edu.tw';

async function fetchJSON(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`  GET ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });

  console.log('=== 海聯會API データ取得開始 ===\n');

  // 1. 全大学一覧
  console.log('[1/3] 大学一覧を取得...');
  const schools = await fetchJSON('/schools?system_id=bachelor');
  const schoolsPath = join(RAW_DIR, 'hailian-schools.json');
  await writeFile(schoolsPath, JSON.stringify(schools, null, 2), 'utf-8');
  console.log(`  → ${schools.length}校を保存: hailian-schools.json\n`);

  // 2. 学群分類
  console.log('[2/3] 学群分類を取得...');
  const groups = await fetchJSON('/department-groups?system_id=bachelor&school_code=');
  const groupsPath = join(RAW_DIR, 'hailian-groups.json');
  await writeFile(groupsPath, JSON.stringify(groups, null, 2), 'utf-8');
  console.log(`  → ${groups.length}学群を保存: hailian-groups.json\n`);

  // 3. 全学科一覧（ネスト構造: schools[] → departments[]）
  console.log('[3/3] 全学科一覧を取得...');
  const depts = await fetchJSON(
    '/schools/all/systems/bachelor/departments?discipline=all&category=1,2,3&eng-taught=false&school5=false&is-extended-department=1,0&keyword='
  );
  const deptsPath = join(RAW_DIR, 'hailian-departments.json');
  await writeFile(deptsPath, JSON.stringify(depts, null, 2), 'utf-8');

  const totalDepts = depts.reduce((sum, s) => sum + (s.departments?.length || 0), 0);
  console.log(`  → ${depts.length}校 × ${totalDepts}学科を保存: hailian-departments.json\n`);

  // サマリー
  console.log('=== 取得完了 ===');
  console.log(`大学数: ${schools.length}`);
  console.log(`学群数: ${groups.length}`);
  console.log(`学科数: ${totalDepts}`);
  console.log(`保存先: ${RAW_DIR}`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
