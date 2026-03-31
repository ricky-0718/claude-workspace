/**
 * 10-create-spreadsheet.js
 * gws CLIでGoogle Spreadsheetを最新データで差し替え
 *
 * 4シート構成:
 *   1. 大学マスター（129行）— 基本情報 + 外國學生サマリー
 *   2. 学科マスター（2,371行）
 *   3. 学群マスター（18行）
 *   4. 外國學生出願（詳細リサーチ校）
 *
 * 処理フロー: 既存データクリア → 全量再投入 → 書式設定
 */

import { writeFileSync, unlinkSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const GWS_PATH = 'C:/Users/newgo/AppData/Roaming/npm/gws.cmd';

const SPREADSHEET_ID = '1pCmv7psEZiQ56kdAquYgnU9bgfzIfA05YOnUP8PpyrY';

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

// バッチ書き込み（API制限対策）
async function batchWrite(sheetName, allData, batchSize = 80) {
  for (let i = 0; i < allData.length; i += batchSize) {
    const batch = allData.slice(i, i + batchSize);
    const startRow = i + 1;
    for (let retry = 0; retry < 3; retry++) {
      try {
        gws('spreadsheets values update',
          { spreadsheetId: SPREADSHEET_ID, range: `'${sheetName}'!A${startRow}`, valueInputOption: 'RAW' },
          { values: batch }
        );
        break;
      } catch (err) {
        if (retry === 2) throw err;
        console.log(`  リトライ ${retry + 1}/3...`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    const done = Math.min(i + batchSize, allData.length);
    if (allData.length > batchSize) {
      console.log(`  → ${done}/${allData.length}行`);
    }
    if (i + batchSize < allData.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

// 出願期間を読みやすいテキストに変換
function formatPeriods(periods) {
  if (!periods || periods.length === 0) return '';
  return periods.map(p => {
    const start = p.start?.replace(/-/g, '/');
    const end = p.end?.replace(/-/g, '/');
    const label = p.round ? `第${p.round}回` : '';
    return `${label} ${start}〜${end}`.trim();
  }).join(' / ');
}

async function main() {
  console.log('=== スプレッドシート最新データ差し替え ===\n');
  console.log(`ID: ${SPREADSHEET_ID}\n`);

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const groups = JSON.parse(await readFile(join(FINAL_DIR, 'department-groups.json'), 'utf-8'));

  console.log(`データ: ${schools.length}校 / ${departments.length}学科 / ${groups.length}学群\n`);

  // --- 1. シート構成の確認・作成 ---
  console.log('[1/7] シート構成...');
  const info = JSON.parse(gws('spreadsheets get', { spreadsheetId: SPREADSHEET_ID, fields: 'sheets.properties' }));
  const existingSheets = info.sheets.map(s => s.properties);

  const requests = [];
  // Sheet1を大学マスターにリネーム（必要なら）
  if (existingSheets[0].title !== '大学マスター') {
    requests.push({
      updateSheetProperties: {
        properties: { sheetId: existingSheets[0].sheetId, title: '大学マスター' },
        fields: 'title'
      }
    });
  }

  const sheetConfigs = [
    { title: '学科マスター', index: 1, rows: 2500, cols: 30 },
    { title: '学群マスター', index: 2, rows: 30, cols: 10 },
    { title: '外國學生出願', index: 3, rows: 150, cols: 15 },
  ];
  for (const cfg of sheetConfigs) {
    const existing = existingSheets.find(s => s.title === cfg.title);
    if (!existing) {
      requests.push({ addSheet: { properties: { title: cfg.title, index: cfg.index, gridProperties: { rowCount: cfg.rows, columnCount: cfg.cols } } } });
    } else if (existing.gridProperties?.columnCount < cfg.cols || existing.gridProperties?.rowCount < cfg.rows) {
      requests.push({
        updateSheetProperties: {
          properties: {
            sheetId: existing.sheetId,
            gridProperties: { rowCount: Math.max(existing.gridProperties.rowCount, cfg.rows), columnCount: Math.max(existing.gridProperties.columnCount, cfg.cols) }
          },
          fields: 'gridProperties.rowCount,gridProperties.columnCount'
        }
      });
    }
  }

  // 大学マスターのカラム数を拡張（外國學生フィールド追加のため）
  const schoolSheet = existingSheets.find(s => s.title === '大学マスター') || existingSheets[0];
  if (schoolSheet.gridProperties?.columnCount < 32) {
    requests.push({
      updateSheetProperties: {
        properties: { sheetId: schoolSheet.sheetId, gridProperties: { columnCount: 32 } },
        fields: 'gridProperties.columnCount'
      }
    });
  }

  if (requests.length > 0) {
    gws('spreadsheets batchUpdate', { spreadsheetId: SPREADSHEET_ID }, { requests });
  }
  console.log('  → 4シート確認完了\n');

  // --- 2. 既存データクリア ---
  console.log('[2/7] 既存データクリア...');
  const clearRanges = ['大学マスター', '学科マスター', '学群マスター', '外國學生出願'];
  for (const range of clearRanges) {
    try {
      gws('spreadsheets values clear',
        { spreadsheetId: SPREADSHEET_ID, range: `'${range}'` },
        {}
      );
    } catch (err) {
      // シートが新規作成の場合はクリア不要
      console.log(`  (${range}: 新規作成のためスキップ)`);
    }
  }
  console.log('  → 全シートクリア完了\n');

  // --- 3. 大学マスター ---
  console.log('[3/7] 大学マスター投入...');
  const schoolHeaders = [
    'ID', '大学名（中文）', '大学名（日本語）', '大学名（英語）',
    '種別', '地域', '住所', '電話', 'サイト',
    '寮', '奨学金', '学科数',
    '学生数', '留学生数', '日本人数',
    '補完レベル',
    // --- 外國學生フィールド ---
    'OIA URL', '出願URL', '簡章URL', '簡章年度',
    '財力証明', '財力（円）',
    '語学（中国語）', '語学（英語）',
    '出願期間', '出願回数', '出願料',
    '最大出願数', '必要書類',
    '備考', 'データソース'
  ];

  const schoolRows = schools.map(s => {
    const fs = s.foreign_student || {};
    const fp = fs.financial_proof || s.financial_proof || {};
    const lr = fs.language_req || s.language_req || {};
    return [
      s.id, s.name.cht, s.name.ja, s.name.en,
      s.type, s.region, s.address, s.phone, s.website?.cht || '',
      s.dormitory?.available ? '○' : '×',
      s.scholarship?.available ? '○' : '×',
      s.department_count,
      s.student_count?.total || '',
      s.student_count?.foreign || '',
      s.student_count?.japanese || '',
      s.data_completeness,
      // 外國學生
      fs.oia_url || '',
      fs.admission_url || '',
      fs.jianzhang_url || '',
      fs.jianzhang_year || '',
      fp.amount || '',
      fp.jpy_estimate || '',
      lr.chinese || '',
      lr.english || '',
      formatPeriods(fs.application_periods),
      fs.application_periods?.length || '',
      fs.application_fee || '',
      fs.max_applications || '',
      (fs.required_documents || []).join('、'),
      fs.notes || '',
      (fs.data_sources || s.data_sources || []).join('+')
    ];
  });

  await batchWrite('大学マスター', [schoolHeaders, ...schoolRows], 20);
  console.log(`  → ${schoolRows.length}行完了\n`);

  // --- 4. 学科マスター ---
  console.log('[4/7] 学科マスター投入...');
  const schoolNameMap = new Map(schools.map(s => [s.id, s.name.ja]));
  const groupNameMap = new Map(groups.map(g => [g.id, g.name.ja]));

  const deptHeaders = [
    'ID', '大学ID', '大学名', '学群ID', '学群名',
    '学科名（中文）', '学科名（日本語）', '学科名（英語）',
    '全英語', '個人申請', '聯合分發',
    'TOCFL', '面接', '出願書類数', '学科サイト', '翻訳状態',
    // --- 104データ ---
    '学費/学期(NTD)', '師生比', '登録率(%)', '延修率(%)',
    '男性比(%)', 'Holland Code',
    '必修1年', '必修2年', '必修3年', '必修4年',
    '選修分野数', '選修概要',
    'ColleGo紹介'
  ];

  // 必修科目を学年別テキストに変換（200文字制限）
  function formatRequired(curriculum, grade) {
    if (!curriculum?.required) return '';
    const r = curriculum.required.find(x => x.grade === grade);
    if (!r) return '';
    const text = r.lessons.join('、');
    return text.length > 200 ? text.substring(0, 197) + '...' : text;
  }

  // 選修の分野名リスト（セル長制限対策）
  function formatElectives(curriculum) {
    if (!curriculum?.electives?.length) return '';
    return curriculum.electives.map(e => e.areaName).join('、');
  }

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
    d.translation_status,
    // 104データ
    d.tuition_104 || '',
    d.teacher_student_ratio || '',
    d.registration_ratio != null ? d.registration_ratio : '',
    d.deferral_ratio != null ? d.deferral_ratio : '',
    d.gender_ratio?.male || '',
    (d.holland_code || []).join(','),
    formatRequired(d.curriculum_104, 1),
    formatRequired(d.curriculum_104, 2),
    formatRequired(d.curriculum_104, 3),
    formatRequired(d.curriculum_104, 4),
    d.curriculum_104?.electives?.length || '',
    formatElectives(d.curriculum_104),
    (d.intro_collego || '').substring(0, 200)
  ]);

  await batchWrite('学科マスター', [deptHeaders, ...deptRows], 10);
  console.log(`  → ${deptRows.length}行完了\n`);

  // --- 5. 学群マスター ---
  console.log('[5/7] 学群マスター投入...');
  const groupHeaders = ['ID', '学群名（中文）', '学群名（日本語）', '学群名（英語）', '学科数'];
  const groupRows = groups.map(g => [g.id, g.name.cht, g.name.ja, g.name.en, g.department_count]);
  await batchWrite('学群マスター', [groupHeaders, ...groupRows]);
  console.log(`  → ${groupRows.length}行完了\n`);

  // --- 6. 外國學生出願（詳細リサーチ校） ---
  console.log('[6/7] 外國學生出願シート投入...');
  const detailedSchools = schools.filter(s =>
    s.foreign_student?.application_periods?.length > 0
  );

  const foreignHeaders = [
    '大学名（日本語）', '大学名（中文）',
    '出願回', '開始日', '終了日', '備考',
    '出願料', '最大出願数',
    '財力証明', '語学（中国語）', '語学（英語）',
    '簡章URL', '出願URL', 'OIA URL'
  ];

  const foreignRows = [];
  for (const s of detailedSchools) {
    const fs = s.foreign_student;
    const periods = fs.application_periods || [];
    // 1校につき出願回数分の行を生成
    if (periods.length === 0) continue;
    for (let i = 0; i < periods.length; i++) {
      const p = periods[i];
      foreignRows.push([
        s.name.ja, s.name.cht,
        p.round || (i + 1),
        p.start || '', p.end || '', p.notes || '',
        i === 0 ? (fs.application_fee || '') : '',
        i === 0 ? (fs.max_applications || '') : '',
        i === 0 ? (fs.financial_proof?.amount || '') : '',
        i === 0 ? (fs.language_req?.chinese || '') : '',
        i === 0 ? (fs.language_req?.english || '') : '',
        i === 0 ? (fs.jianzhang_url || '') : '',
        i === 0 ? (fs.admission_url || '') : '',
        i === 0 ? (fs.oia_url || '') : '',
      ]);
    }
  }

  await batchWrite('外國學生出願', [foreignHeaders, ...foreignRows]);
  console.log(`  → ${detailedSchools.length}校 / ${foreignRows.length}行完了\n`);

  // --- 7. 書式設定 ---
  console.log('[7/7] 書式設定...');
  const sheetsInfo = JSON.parse(gws('spreadsheets get', { spreadsheetId: SPREADSHEET_ID, fields: 'sheets.properties' }));
  const formatReqs = [];

  for (const sheet of sheetsInfo.sheets) {
    const sid = sheet.properties.sheetId;
    // ヘッダー太字 + 背景色
    formatReqs.push({
      repeatCell: {
        range: { sheetId: sid, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.85, green: 0.92, blue: 0.98 } } },
        fields: 'userEnteredFormat(textFormat,backgroundColor)'
      }
    });
    // 行固定
    formatReqs.push({
      updateSheetProperties: {
        properties: { sheetId: sid, gridProperties: { frozenRowCount: 1 } },
        fields: 'gridProperties.frozenRowCount'
      }
    });
  }

  // 大学マスターの外國學生カラム（Q〜AE列）に背景色を追加して区別
  const schoolSheetId = sheetsInfo.sheets.find(s => s.properties.title === '大学マスター')?.properties.sheetId;
  if (schoolSheetId !== undefined) {
    formatReqs.push({
      repeatCell: {
        range: { sheetId: schoolSheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 16, endColumnIndex: 31 },
        cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.95, green: 0.88, blue: 0.80 } } },
        fields: 'userEnteredFormat(textFormat,backgroundColor)'
      }
    });
  }

  gws('spreadsheets batchUpdate', { spreadsheetId: SPREADSHEET_ID }, { requests: formatReqs });
  console.log('  → ヘッダー書式 + 行固定 + 外國學生カラム色分け\n');

  // --- 完了 ---
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  スプレッドシート差し替え完了！              ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`\nURL: ${url}`);
  console.log(`\nシート構成:`);
  console.log(`  大学マスター:   ${schoolRows.length}校（外國學生15カラム追加）`);
  console.log(`  学科マスター:   ${deptRows.length}学科`);
  console.log(`  学群マスター:   ${groupRows.length}学群`);
  console.log(`  外國學生出願:   ${detailedSchools.length}校 / ${foreignRows.length}行`);
  console.log(`\n外國學生データ統計:`);
  console.log(`  OIA URL あり:   ${schools.filter(s => s.foreign_student?.oia_url).length}校`);
  console.log(`  出願期間あり:   ${detailedSchools.length}校`);
  console.log(`  詳細リサーチ:   ${schools.filter(s => s.foreign_student?.required_documents?.length > 0).length}校`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
