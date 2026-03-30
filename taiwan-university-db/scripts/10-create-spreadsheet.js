/**
 * 10-create-spreadsheet.js
 * gws CLIでGoogle Spreadsheetを作成し、全データを投入
 *
 * 3シート構成:
 *   1. 大学マスター（129行）
 *   2. 学科マスター（2,371行）
 *   3. 学群マスター（18行）
 *
 * gws CLI構文:
 *   - batchUpdate: gws sheets spreadsheets batchUpdate --params '{"spreadsheetId":"..."}' --json '...'
 *   - values update: gws sheets spreadsheets values update --params '{"spreadsheetId":"...","range":"...","valueInputOption":"RAW"}' --json '...'
 */

import { writeFileSync, unlinkSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const GWS_PATH = 'C:/Users/newgo/AppData/Roaming/npm/gws.cmd';

// gws CLIを一時bashスクリプト経由で呼ぶ（引数長制限回避）
function gws(subcmd, params, jsonBody) {
  const tmpDir = tmpdir();
  const scriptFile = join(tmpDir, `gws-${Date.now()}.sh`);
  const jsonFile = join(tmpDir, `gws-${Date.now()}.json`);

  let script = '#!/bin/bash\n';
  script += 'gws sheets ' + subcmd;
  if (params) script += ` --params '${JSON.stringify(params)}'`;
  if (jsonBody !== undefined) {
    writeFileSync(jsonFile, JSON.stringify(jsonBody), 'utf-8');
    script += ` --json "$(< '${jsonFile.replace(/\\/g, '/')}')"`;
  }

  writeFileSync(scriptFile, script, 'utf-8');

  try {
    const result = execFileSync('bash', [scriptFile.replace(/\\/g, '/')], {
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024
    });
    try { unlinkSync(scriptFile); } catch {}
    if (jsonBody !== undefined) try { unlinkSync(jsonFile); } catch {}
    return result.trim();
  } catch (err) {
    try { unlinkSync(scriptFile); } catch {}
    if (jsonBody !== undefined) try { unlinkSync(jsonFile); } catch {}
    const msg = err.stderr?.substring(0, 500) || err.message;
    console.error(`  gws error: ${msg}`);
    throw err;
  }
}

// 既に作成済みのスプシを使う場合はここにID（空ならnew作成）
const EXISTING_SPREADSHEET_ID = '1pCmv7psEZiQ56kdAquYgnU9bgfzIfA05YOnUP8PpyrY';

async function main() {
  console.log('=== Google Spreadsheet 作成開始 ===\n');

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const groups = JSON.parse(await readFile(join(FINAL_DIR, 'department-groups.json'), 'utf-8'));

  let spreadsheetId, spreadsheetUrl;

  if (EXISTING_SPREADSHEET_ID) {
    spreadsheetId = EXISTING_SPREADSHEET_ID;
    spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    console.log(`[1/6] 既存スプレッドシートを使用: ${spreadsheetId}\n`);
  } else {
    console.log('[1/6] スプレッドシート作成...');
    const result = JSON.parse(gws('spreadsheets create', null, { properties: { title: '台湾大学データベース（マスター）' } }));
    spreadsheetId = result.spreadsheetId;
    spreadsheetUrl = result.spreadsheetUrl;
    console.log(`  ID: ${spreadsheetId}\n`);
  }

  // --- 2. シート構成 ---
  console.log('[2/6] シート構成...');
  // 既存シートを取得
  const info = JSON.parse(gws(`spreadsheets get`, { spreadsheetId, fields: 'sheets.properties' }));
  const existingSheets = info.sheets.map(s => s.properties);
  const defaultSheetId = existingSheets[0].sheetId;

  const requests = [];
  // Sheet1をリネーム
  if (existingSheets[0].title !== '大学マスター') {
    requests.push({
      updateSheetProperties: {
        properties: { sheetId: defaultSheetId, title: '大学マスター' },
        fields: 'title'
      }
    });
  }
  // 「学科マスター」がなければ追加（2,500行確保）
  if (!existingSheets.find(s => s.title === '学科マスター')) {
    requests.push({ addSheet: { properties: { title: '学科マスター', index: 1, gridProperties: { rowCount: 2500, columnCount: 20 } } } });
  } else {
    // 既存なら行数を拡張
    const existingSheet = existingSheets.find(s => s.title === '学科マスター');
    if (existingSheet && existingSheet.gridProperties?.rowCount < 2500) {
      requests.push({
        updateSheetProperties: {
          properties: { sheetId: existingSheet.sheetId, gridProperties: { rowCount: 2500, columnCount: 20 } },
          fields: 'gridProperties.rowCount,gridProperties.columnCount'
        }
      });
    }
  }
  // 「学群マスター」がなければ追加
  if (!existingSheets.find(s => s.title === '学群マスター')) {
    requests.push({ addSheet: { properties: { title: '学群マスター', index: 2 } } });
  }
  if (requests.length > 0) {
    gws('spreadsheets batchUpdate', { spreadsheetId }, { requests });
  }
  console.log('  → 大学マスター / 学科マスター / 学群マスター\n');

  // --- 3. 大学マスター ---
  console.log('[3/6] 大学マスター投入（129行）...');
  const schoolHeaders = [
    'ID', '大学名（中文）', '大学名（日本語）', '大学名（英語）',
    '種別', '地域', '住所', '電話', 'サイト',
    '寮', '奨学金', '財力証明', '財力（円）',
    '語学（中国語）', '語学（英語）',
    '日本語概要', '学科数',
    '学生数', '留学生数', '日本人数',
    '補完レベル'
  ];
  const schoolRows = schools.map(s => [
    s.id, s.name.cht, s.name.ja, s.name.en,
    s.type, s.region, s.address, s.phone, s.website?.cht || '',
    s.dormitory?.available ? '○' : '×',
    s.scholarship?.available ? '○' : '×',
    s.financial_proof?.amount || '',
    s.financial_proof?.jpy_estimate || '',
    s.language_req?.chinese || '',
    s.language_req?.english || '',
    s.ja_description || '',
    s.department_count,
    s.student_count?.total || '',
    s.student_count?.foreign || '',
    s.student_count?.japanese || '',
    s.data_completeness
  ]);

  // 20行ずつバッチ投入（シェル引数制限対策）
  const allSchoolData = [schoolHeaders, ...schoolRows];
  const SCHOOL_BATCH = 20;
  for (let i = 0; i < allSchoolData.length; i += SCHOOL_BATCH) {
    const batch = allSchoolData.slice(i, i + SCHOOL_BATCH);
    gws('spreadsheets values update',
      { spreadsheetId, range: `大学マスター!A${i + 1}`, valueInputOption: 'RAW' },
      { values: batch }
    );
  }
  console.log(`  → ${schoolRows.length}行\n`);

  // --- 4. 学科マスター ---
  console.log('[4/6] 学科マスター投入（2,371行）...');
  const schoolNameMap = new Map(schools.map(s => [s.id, s.name.ja]));
  const groupNameMap = new Map(groups.map(g => [g.id, g.name.ja]));

  const deptHeaders = [
    'ID', '大学ID', '大学名', '学群ID', '学群名',
    '学科名（中文）', '学科名（日本語）', '学科名（英語）',
    '全英語', '個人申請', '聯合分發',
    'TOCFL', '面接', '出願書類数', '学科サイト', '翻訳状態'
  ];
  const deptRows = departments.map(d => [
    d.id, d.school_id, schoolNameMap.get(d.school_id) || '', d.group_id, groupNameMap.get(d.group_id) || '',
    d.name.cht, d.name.ja, d.name.en,
    d.has_eng_taught ? '○' : '',
    d.quota?.individual_application || 0,
    d.quota?.united_distribution?.total || 0,
    d.tocfl_requirement || '',
    d.has_interview ? '○' : '',
    d.required_documents?.length || 0,
    d.website?.cht || '',
    d.translation_status
  ]);

  const BATCH_SIZE = 80;
  const allDeptData = [deptHeaders, ...deptRows];
  for (let i = 0; i < allDeptData.length; i += BATCH_SIZE) {
    const batch = allDeptData.slice(i, i + BATCH_SIZE);
    const startRow = i + 1;
    for (let retry = 0; retry < 3; retry++) {
      try {
        gws('spreadsheets values update',
          { spreadsheetId, range: `学科マスター!A${startRow}`, valueInputOption: 'RAW' },
          { values: batch }
        );
        break;
      } catch (err) {
        if (retry === 2) throw err;
        console.log(`  リトライ ${retry + 1}/3...`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    console.log(`  → ${Math.min(i + BATCH_SIZE, allDeptData.length)}/${allDeptData.length}行`);
    // API rate limit対策
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('');

  // --- 5. 学群マスター ---
  console.log('[5/6] 学群マスター投入（18行）...');
  const groupHeaders = ['ID', '学群名（中文）', '学群名（日本語）', '学群名（英語）', '学科数'];
  const groupRows = groups.map(g => [g.id, g.name.cht, g.name.ja, g.name.en, g.department_count]);
  gws('spreadsheets values update',
    { spreadsheetId, range: '学群マスター!A1', valueInputOption: 'RAW' },
    { values: [groupHeaders, ...groupRows] }
  );
  console.log(`  → ${groupRows.length}行\n`);

  // --- 6. 書式設定 ---
  console.log('[6/6] 書式設定...');
  const sheetsInfo = JSON.parse(gws('spreadsheets get', { spreadsheetId, fields: 'sheets.properties' }));
  const formatReqs = [];
  for (const sheet of sheetsInfo.sheets) {
    const sid = sheet.properties.sheetId;
    formatReqs.push({
      repeatCell: {
        range: { sheetId: sid, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.85, green: 0.92, blue: 0.98 } } },
        fields: 'userEnteredFormat(textFormat,backgroundColor)'
      }
    });
    formatReqs.push({
      updateSheetProperties: {
        properties: { sheetId: sid, gridProperties: { frozenRowCount: 1 } },
        fields: 'gridProperties.frozenRowCount'
      }
    });
  }
  gws('spreadsheets batchUpdate', { spreadsheetId }, { requests: formatReqs });
  console.log('  → ヘッダー太字 + 背景色 + 行固定\n');

  // --- 完了 ---
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  スプレッドシート作成完了！                  ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`\nURL: ${spreadsheetUrl}`);
  console.log(`\nシート構成:`);
  console.log(`  大学マスター: ${schoolRows.length}行`);
  console.log(`  学科マスター: ${deptRows.length}行`);
  console.log(`  学群マスター: ${groupRows.length}行`);

  await writeFile(join(__dirname, '..', 'data', 'spreadsheet-id.txt'), `${spreadsheetId}\n${spreadsheetUrl}\n`, 'utf-8');
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
