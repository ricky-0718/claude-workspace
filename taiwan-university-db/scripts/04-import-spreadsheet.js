/**
 * 04-import-spreadsheet.js
 * university-database.md（スプレッドシートのテキスト版）から
 * 財力証明・語学要件を構造化JSONに変換
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, '..', '..', 'knowledge', 'students');
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');

async function main() {
  await mkdir(SOURCES_DIR, { recursive: true });
  console.log('=== スプレッドシートデータ取込開始 ===\n');

  const md = await readFile(join(KNOWLEDGE_DIR, 'university-database.md'), 'utf-8');

  // --- 財力証明テーブルのパース ---
  const financialData = {};
  const financialRegex = /\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(約.+?)\s*\|/g;
  const financialSection = md.split('### 財力証明の大学別比較')[1]?.split('###')[0] || '';
  let match;
  while ((match = financialRegex.exec(financialSection)) !== null) {
    const name = match[1].trim();
    if (name === '大学名' || name.startsWith('---')) continue;
    financialData[name] = {
      amount: match[2].trim(),
      jpy_estimate: match[3].trim()
    };
  }
  console.log(`財力証明: ${Object.keys(financialData).length}校`);

  // --- 語学要件テーブルのパース ---
  const languageData = {};
  const langSection = md.split('### 語学要件の大学別比較')[1]?.split('###')[0]?.split('---')[0] || '';
  const langRegex = /\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/g;
  while ((match = langRegex.exec(langSection)) !== null) {
    const name = match[1].trim();
    if (name === '大学名' || name.startsWith('---')) continue;
    languageData[name] = {
      chinese: match[2].trim(),
      english: match[3].trim() === '—' ? undefined : match[3].trim()
    };
  }
  console.log(`語学要件: ${Object.keys(languageData).length}校`);

  // --- TOEIC550出願可能大学のパース ---
  const toeicSection = md.split('## TOEIC 550で申請可能大学')[1]?.split('## ')[0] || '';
  const toeicSchools = [];
  const toeicRegex = /\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/g;
  while ((match = toeicRegex.exec(toeicSection)) !== null) {
    const name = match[1].trim();
    if (name === '大学名' || name.startsWith('---')) continue;
    toeicSchools.push({
      name: name,
      qualification: match[2].trim(),
      application_period: match[3].trim()
    });
  }
  console.log(`TOEIC550出願可能: ${toeicSchools.length}校`);

  // --- 中国語で英語を学べる大学のパース ---
  const engSection = md.split('## 中国語で英語を学べる大学')[1] || '';
  const engSchools = [];
  const engRegex = /\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/g;
  while ((match = engRegex.exec(engSection)) !== null) {
    const name = match[1].trim();
    if (name === '大学名' || name.startsWith('---')) continue;
    engSchools.push({
      name: name,
      language_req: match[2].trim(),
      department: match[3].trim(),
      curriculum: match[4].trim(),
      application_period: match[5].trim()
    });
  }
  console.log(`中国語で英語学べる: ${engSchools.length}校`);

  // --- 保存 ---
  const result = {
    source: 'Google Spreadsheet「台湾の大学データベース」',
    academic_year: 115,
    extracted_at: new Date().toISOString(),
    financial_proof: financialData,
    language_requirements: languageData,
    toeic550_eligible: toeicSchools,
    chinese_english_programs: engSchools
  };

  await writeFile(join(SOURCES_DIR, 'spreadsheet-26schools.json'), JSON.stringify(result, null, 2), 'utf-8');
  console.log(`\n保存: spreadsheet-26schools.json`);

  // サンプル
  console.log('\n--- サンプル（財力証明）---');
  Object.entries(financialData).slice(0, 5).forEach(([name, d]) => {
    console.log(`  ${name}: ${d.amount} (${d.jpy_estimate})`);
  });
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
