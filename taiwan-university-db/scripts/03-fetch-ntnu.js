/**
 * 03-fetch-ntnu.js
 * NTNU（師範大学）APIから37学科のTOCFL要件・カリキュラム・進路を取得
 *
 * 注意: NTNUのAPIはCORS制限があるが、Node.jsのfetchはCORS対象外なので直接叩ける
 * ベースURL: https://bds.oia.ntnu.edu.tw
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = join(__dirname, '..', 'data', 'raw');
const BASE_URL = 'https://bds.oia.ntnu.edu.tw';

async function postJSON(endpoint, body) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  await mkdir(RAW_DIR, { recursive: true });
  console.log('=== NTNU API データ取得開始 ===\n');

  // 1. 学科一覧取得（学士・中文授課）
  console.log('[1/2] 学科一覧を取得...');
  const listData = await postJSON('/api/v1/ap/regulation-list?_pageno=1&_limit=100&_locale=zh-tw', {
    degree_no: 'U',
    lang_code: 'C',
    season_no: '',
    college_no: '',
    keyword: ''
  });

  const regulations = listData.body?.regulations || [];
  console.log(`  → ${regulations.length}学科を検出\n`);

  // 2. 各学科の詳細取得（TOCFL要件・カリキュラム・進路）
  console.log('[2/2] 各学科の詳細を取得...');
  const departments = [];

  for (let i = 0; i < regulations.length; i++) {
    const reg = regulations[i];
    const depNo = reg.dep_no;

    try {
      const detail = await postJSON('/api/v1/ap/department-regulation?_locale=zh-tw', {
        dep_no: depNo
      });

      const d = detail.body || {};
      departments.push({
        dep_no: depNo,
        name_cht: reg.ch_name,
        name_en: reg.en_name,
        college: reg.col_no,
        tocfl_requirement: d.ch_cefr_lv || null,
        english_requirement: d.cefr_lv || null,
        introduction: d.info_ch || null,
        curriculum: d.course_plan_ch || null,
        career_paths: d.career_ch || null,
        notes: d.note_ch || null,
        portfolio_required: d.portfolio_ch || null,
        autobiography_required: d.autobiography_ch || null,
        study_plan_required: d.study_plan_ch || null
      });

      if ((i + 1) % 10 === 0 || i === regulations.length - 1) {
        console.log(`  進捗: ${i + 1}/${regulations.length} (${Math.round((i + 1) / regulations.length * 100)}%)`);
      }
    } catch (err) {
      console.log(`  ⚠️ ${depNo} (${reg.ch_name}): ${err.message}`);
    }

    await sleep(100);
  }

  // 保存
  const result = {
    source: 'NTNU OIA API (bds.oia.ntnu.edu.tw)',
    degree: 'bachelor',
    language: 'chinese',
    extracted_at: new Date().toISOString(),
    departments: departments
  };

  const outPath = join(RAW_DIR, 'ntnu-departments.json');
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');

  // サマリー
  console.log(`\n=== 取得完了 ===`);
  console.log(`学科数: ${departments.length}`);
  console.log(`保存先: ${outPath}`);

  // TOCFL要件分布
  const tocflCount = {};
  departments.forEach(d => {
    const level = d.tocfl_requirement || 'なし';
    tocflCount[level] = (tocflCount[level] || 0) + 1;
  });
  console.log('\nTOCFL要件分布:');
  Object.entries(tocflCount).sort().forEach(([level, count]) => {
    console.log(`  ${level}: ${count}学科`);
  });
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
