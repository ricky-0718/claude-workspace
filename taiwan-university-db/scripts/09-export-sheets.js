/**
 * 09-export-sheets.js
 * 統合済みJSONデータをCSVに変換（Google Sheets インポート用）
 *
 * 出力:
 *   - exports/schools.csv      (129校)
 *   - exports/departments.csv  (2,371学科)
 *   - exports/groups.csv       (18学群)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const EXPORT_DIR = join(__dirname, '..', 'exports');

// CSV用エスケープ
function csvEscape(val) {
  if (val == null) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function toCSV(headers, rows) {
  const bom = '\uFEFF'; // UTF-8 BOM（Excelで文字化け防止）
  const headerLine = headers.map(csvEscape).join(',');
  const dataLines = rows.map(row => row.map(csvEscape).join(','));
  return bom + [headerLine, ...dataLines].join('\r\n');
}

async function main() {
  await mkdir(EXPORT_DIR, { recursive: true });
  console.log('=== CSV エクスポート開始 ===\n');

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const groups = JSON.parse(await readFile(join(FINAL_DIR, 'department-groups.json'), 'utf-8'));

  // --- 1. 大学マスター ---
  const schoolHeaders = [
    'ID', '大学名（中文）', '大学名（日本語）', '大学名（英語）',
    '種別', '地域', '住所', '電話', 'サイト（中文）', 'サイト（英語）',
    '寮あり', '奨学金あり', '奨学金URL',
    '財力証明（金額）', '財力証明（日本円目安）',
    '語学要件（中国語）', '語学要件（英語）',
    '日本語概要', '学科数',
    '学生数（全体）', '留学生数', '日本人留学生数',
    '補完レベル', 'データソース'
  ];
  const schoolRows = schools.map(s => [
    s.id, s.name.cht, s.name.ja, s.name.en,
    s.type, s.region, s.address, s.phone,
    s.website?.cht, s.website?.en,
    s.dormitory?.available ? '○' : '×',
    s.scholarship?.available ? '○' : '×',
    s.scholarship?.url,
    s.financial_proof?.amount, s.financial_proof?.jpy_estimate,
    s.language_req?.chinese, s.language_req?.english,
    s.ja_description,
    s.department_count,
    s.student_count?.total, s.student_count?.foreign, s.student_count?.japanese,
    s.data_completeness, s.data_sources?.join('+')
  ]);
  await writeFile(join(EXPORT_DIR, 'schools.csv'), toCSV(schoolHeaders, schoolRows), 'utf-8');
  console.log(`大学マスター: ${schoolRows.length}行 → schools.csv`);

  // --- 2. 学科マスター ---
  // 大学名をルックアップ用に
  const schoolNameMap = new Map(schools.map(s => [s.id, { cht: s.name.cht, ja: s.name.ja }]));

  const deptHeaders = [
    'ID', '大学ID', '大学名（日本語）', '学群ID',
    '学科名（中文）', '学科名（日本語）', '学科名（英語）',
    '学群（中文）', '学群（日本語）',
    '全英語授課', '個人申請定員', '聯合分發定員',
    'TOCFL要件', '面接あり',
    '出願書類数', '学科サイト（中文）',
    '学科紹介（中文）',
    '翻訳状態'
  ];
  const deptRows = departments.map(d => {
    const schoolName = schoolNameMap.get(d.school_id);
    return [
      d.id, d.school_id, schoolName?.ja || d.school_id, d.group_id,
      d.name.cht, d.name.ja, d.name.en,
      d.group_data?.cht, groups.find(g => g.id === d.group_id)?.name?.ja,
      d.has_eng_taught ? '○' : '',
      d.quota?.individual_application || 0,
      d.quota?.united_distribution?.total || 0,
      d.tocfl_requirement || '',
      d.has_interview ? '○' : '',
      d.required_documents?.length || 0,
      d.website?.cht || '',
      d.introduction?.cht ? d.introduction.cht.substring(0, 200) : '',
      d.translation_status
    ];
  });
  await writeFile(join(EXPORT_DIR, 'departments.csv'), toCSV(deptHeaders, deptRows), 'utf-8');
  console.log(`学科マスター: ${deptRows.length}行 → departments.csv`);

  // --- 3. 学群マスター ---
  const groupHeaders = [
    'ID', '学群名（中文）', '学群名（日本語）', '学群名（英語）', '学科数'
  ];
  const groupRows = groups.map(g => [
    g.id, g.name.cht, g.name.ja, g.name.en, g.department_count
  ]);
  await writeFile(join(EXPORT_DIR, 'groups.csv'), toCSV(groupHeaders, groupRows), 'utf-8');
  console.log(`学群マスター: ${groupRows.length}行 → groups.csv`);

  console.log(`\n=== エクスポート完了 ===`);
  console.log(`保存先: ${EXPORT_DIR}`);
  console.log(`\n次のステップ:`);
  console.log(`  1. Google Sheetsで新規スプレッドシートを作成`);
  console.log(`  2. ファイル > インポート > CSVファイルをアップロード`);
  console.log(`  3. 各シートにschools.csv, departments.csv, groups.csvをインポート`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
