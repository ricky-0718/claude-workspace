/**
 * 11-parse-spreadsheet-foreign.js
 *
 * university-database.md のスプレッドシートデータ（26校）を解析し、
 * 外國學生向けの出願情報をJSON化する。
 *
 * 入力: data/sources/spreadsheet-26schools.json
 * 出力: data/sources/foreign-student-26schools.json
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');
const FINAL_DIR = join(__dirname, '..', 'data', 'final');

// Spreadsheet名 → schools.json ID のマッピング
const NAME_TO_ID = {
  '雲林科技大學': '72',
  '輔仁大學': '45',
  '中國醫藥大學': '68',
  '師範大學': '07',
  '政治大學': '13',
  '淡江大學': '37',
  '實踐大學': '40',
  '文化大学': '36',
  '成功大學': '02',
  '台北護理健康大學': '85',
  '台湾科技大学': '71',
  '台湾大学': '01',
  '東吳大學': '55',
  '銘傳大学': '38',
  '中原大学': '61',
  '亜東科技大学': 'B7',
  '国立東華大学': '08',
  '國立東華大學': '08',
  '台北商業大學': '84',
  '國立臺北商業大學': '84',
};

// TOEIC550シートに出てくる追加大学 + 表記揺れ対応
const TOEIC550_NAME_TO_ID = {
  '朝陽科技大學': '86',
  '明志科技大學': '97',
  '東海大學': '52',
  '國立屏東科技大學': '74',
  '逢甲大學': '48',
  '静宜大學': '53',
  '長庚大學': '56',
  '慈濟大學': '54',
  '義守大學': '50',
  '世新大學': '43',
  '文藻外語大學': '60',
  '國立勤益科技大學': '81',
  '國立臺中科技大學': '82',
  '弘光科技大學': '93',
  '致理科技大學': 'C3',
  '國立屏東大學': '25',
  // 表記揺れ対応
  '中原大學': '61',
  '銘傳大學': '38',
  '中国文化大學': '36',
  '國立雲林科技大學': '72',
  '実践大學': '40',
  '僑光科技大學': 'C2',
};

async function main() {
  console.log('=== 外國學生向けデータの構造化 ===\n');

  const sp = JSON.parse(await readFile(join(SOURCES_DIR, 'spreadsheet-26schools.json'), 'utf-8'));
  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const schoolById = new Map(schools.map(s => [s.id, s]));

  const result = {};

  // 1. 財力証明
  console.log('1. 財力証明の統合...');
  for (const [name, data] of Object.entries(sp.financial_proof || {})) {
    const id = NAME_TO_ID[name];
    if (!id) { console.log(`  ⚠ マッピングなし: ${name}`); continue; }
    if (!result[id]) result[id] = { school_id: id, school_name: schoolById.get(id)?.name?.cht || name };
    result[id].financial_proof = data;
  }

  // 2. 語学要件
  console.log('2. 語学要件の統合...');
  for (const [name, data] of Object.entries(sp.language_requirements || {})) {
    const id = NAME_TO_ID[name];
    if (!id) { console.log(`  ⚠ マッピングなし: ${name}`); continue; }
    if (!result[id]) result[id] = { school_id: id, school_name: schoolById.get(id)?.name?.cht || name };
    result[id].language_req = {
      chinese: data.chinese || null,
      english: data.english || null,
    };
  }

  // 3. TOEIC550シートから出願期間を追加
  console.log('3. TOEIC550シートから出願期間を統合...');
  for (const entry of (sp.toeic550_eligible || [])) {
    const id = NAME_TO_ID[entry.name] || TOEIC550_NAME_TO_ID[entry.name];
    if (!id) { console.log(`  ⚠ マッピングなし: ${entry.name}`); continue; }
    if (!result[id]) result[id] = { school_id: id, school_name: schoolById.get(id)?.name?.cht || entry.name };

    if (entry.application_period && entry.application_period !== '—') {
      result[id].english_program_period = entry.application_period;
      result[id].english_program_qualification = entry.qualification;
    }
  }

  // 4. 中国語で英語を学べる大学シートから追加
  console.log('4. 中国語で英語を学べる大学シートを統合...');
  for (const entry of (sp.chinese_to_english || [])) {
    const id = NAME_TO_ID[entry.name] || TOEIC550_NAME_TO_ID[entry.name];
    if (!id) continue;
    if (!result[id]) result[id] = { school_id: id, school_name: schoolById.get(id)?.name?.cht || entry.name };

    if (!result[id].special_programs) result[id].special_programs = [];
    result[id].special_programs.push({
      type: 'english_via_chinese',
      department: entry.department || null,
      curriculum_summary: entry.curriculum || null,
      application_period: entry.application_period || null,
    });
  }

  // Mark data source
  for (const entry of Object.values(result)) {
    entry.data_source = 'spreadsheet_115';
    entry.category = 'foreign_student';
  }

  const output = {
    source: 'Google Spreadsheet 台湾の大学データベース (115年)',
    category: 'foreign_student',
    extracted_at: new Date().toISOString(),
    schools: result,
    total_schools: Object.keys(result).length,
  };

  await writeFile(
    join(SOURCES_DIR, 'foreign-student-26schools.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );

  console.log(`\n✅ 完了: ${Object.keys(result).length}校の外國學生データを出力`);
  console.log(`   出力先: data/sources/foreign-student-26schools.json`);

  // Summary
  const withFinancial = Object.values(result).filter(r => r.financial_proof).length;
  const withLang = Object.values(result).filter(r => r.language_req).length;
  const withPeriod = Object.values(result).filter(r => r.english_program_period).length;
  console.log(`\n📊 統計:`);
  console.log(`   財力証明: ${withFinancial}校`);
  console.log(`   語学要件: ${withLang}校`);
  console.log(`   英語課程出願期間: ${withPeriod}校`);
}

main().catch(console.error);
