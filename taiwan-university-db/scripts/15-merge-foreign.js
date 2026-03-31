/**
 * 15-merge-foreign.js
 *
 * 全外國學生向けデータを schools.json に統合する。
 *
 * データソース:
 * 1. data/sources/foreign-student-26schools.json (スプレッドシート26校)
 * 2. data/sources/oia-urls.json (129校の國際處URL)
 * 3. data/sources/jianzhang-foreign/*.json (エージェントリサーチ結果)
 *
 * 出力: data/final/schools.json (foreign_student フィールドを追加)
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const JIANZHANG_DIR = join(SOURCES_DIR, 'jianzhang-foreign');

async function main() {
  console.log('=== 外國學生データ統合 ===\n');

  // Load existing schools
  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const schoolMap = new Map(schools.map(s => [s.id, s]));
  console.log(`既存データ: ${schools.length}校`);

  // Source 1: Spreadsheet 26 schools
  let spData = {};
  try {
    const sp = JSON.parse(await readFile(join(SOURCES_DIR, 'foreign-student-26schools.json'), 'utf-8'));
    spData = sp.schools || {};
    console.log(`スプレッドシート: ${Object.keys(spData).length}校`);
  } catch { console.log('スプレッドシートデータなし'); }

  // Source 2: OIA URLs
  let oiaData = [];
  try {
    const oia = JSON.parse(await readFile(join(SOURCES_DIR, 'oia-urls.json'), 'utf-8'));
    oiaData = oia.results || [];
    console.log(`OIA URL: ${oiaData.filter(r => r.oia_url).length}校`);
  } catch { console.log('OIA URLデータなし'); }

  // Source 3: Jianzhang research (per-school JSONs)
  const jianzhangData = new Map();
  try {
    const files = await readdir(JIANZHANG_DIR);
    for (const file of files.filter(f => f.endsWith('.json'))) {
      const data = JSON.parse(await readFile(join(JIANZHANG_DIR, file), 'utf-8'));
      if (data.school_id) {
        jianzhangData.set(data.school_id, data);
      }
    }
    console.log(`簡章リサーチ: ${jianzhangData.size}校`);
  } catch { console.log('簡章リサーチデータなし'); }

  console.log('\n--- 統合開始 ---\n');

  let enriched = 0;

  for (const school of schools) {
    // Initialize foreign_student field
    if (!school.foreign_student) {
      school.foreign_student = {};
    }
    const fs = school.foreign_student;

    // Merge OIA URL
    const oiaEntry = oiaData.find(r => r.school_id === school.id);
    if (oiaEntry) {
      if (oiaEntry.oia_url && !oiaEntry.oia_url.startsWith('javascript:')) {
        fs.oia_url = oiaEntry.oia_url;
      }
      if (oiaEntry.foreign_admission_url && !oiaEntry.foreign_admission_url.startsWith('javascript:')) {
        fs.admission_url = oiaEntry.foreign_admission_url;
      }
      if (oiaEntry.admission_links?.length > 0) {
        fs.admission_links = oiaEntry.admission_links
          .filter(l => !l.href.startsWith('javascript:'))
          .slice(0, 3);
      }
    }

    // Merge spreadsheet data (lower priority - overwritten by jianzhang if available)
    const spEntry = spData[school.id];
    if (spEntry) {
      if (spEntry.financial_proof) fs.financial_proof = spEntry.financial_proof;
      if (spEntry.language_req) fs.language_req = spEntry.language_req;
      if (spEntry.english_program_period) fs.english_program_period = spEntry.english_program_period;
      if (spEntry.english_program_qualification) fs.english_program_qualification = spEntry.english_program_qualification;
      if (spEntry.special_programs) fs.special_programs = spEntry.special_programs;
      fs.data_sources = fs.data_sources || [];
      if (!fs.data_sources.includes('spreadsheet')) fs.data_sources.push('spreadsheet');
    }

    // Merge jianzhang research (highest priority)
    const jzEntry = jianzhangData.get(school.id);
    if (jzEntry) {
      if (jzEntry.oia_url) fs.oia_url = jzEntry.oia_url;
      if (jzEntry.foreign_admission_url) fs.admission_url = jzEntry.foreign_admission_url;
      if (jzEntry.jianzhang_url) fs.jianzhang_url = jzEntry.jianzhang_url;
      if (jzEntry.jianzhang_year) fs.jianzhang_year = jzEntry.jianzhang_year;
      if (jzEntry.application_periods) fs.application_periods = jzEntry.application_periods;
      if (jzEntry.application_fee) fs.application_fee = jzEntry.application_fee;
      if (jzEntry.max_applications) fs.max_applications = jzEntry.max_applications;
      if (jzEntry.language_req) fs.language_req = jzEntry.language_req;
      if (jzEntry.financial_proof) fs.financial_proof = jzEntry.financial_proof;
      if (jzEntry.required_documents?.length > 0) fs.required_documents = jzEntry.required_documents;
      if (jzEntry.tuition_info) fs.tuition_info = jzEntry.tuition_info;
      if (jzEntry.notes) fs.notes = jzEntry.notes;
      fs.data_sources = fs.data_sources || [];
      if (!fs.data_sources.includes('web_research')) fs.data_sources.push('web_research');
    }

    // Count enriched
    const hasData = fs.oia_url || fs.admission_url || fs.financial_proof || fs.language_req;
    if (hasData) enriched++;

    // Clean up empty foreign_student
    if (Object.keys(fs).length === 0) {
      delete school.foreign_student;
    }
  }

  // Save
  await writeFile(join(FINAL_DIR, 'schools.json'), JSON.stringify(schools, null, 2), 'utf-8');

  // Stats
  const withOia = schools.filter(s => s.foreign_student?.oia_url).length;
  const withAdmission = schools.filter(s => s.foreign_student?.admission_url).length;
  const withFinancial = schools.filter(s => s.foreign_student?.financial_proof).length;
  const withLang = schools.filter(s => s.foreign_student?.language_req).length;
  const withDocs = schools.filter(s => s.foreign_student?.required_documents?.length > 0).length;
  const withPeriods = schools.filter(s => s.foreign_student?.application_periods?.length > 0).length;

  console.log('📊 統合結果:');
  console.log(`   外國學生データあり: ${enriched}/129校`);
  console.log(`   國際處URL: ${withOia}校`);
  console.log(`   外國學生招生URL: ${withAdmission}校`);
  console.log(`   財力証明: ${withFinancial}校`);
  console.log(`   語学要件: ${withLang}校`);
  console.log(`   必要書類: ${withDocs}校`);
  console.log(`   出願期間: ${withPeriods}校`);
  console.log(`\n✅ schools.json 更新完了`);
}

main().catch(console.error);
