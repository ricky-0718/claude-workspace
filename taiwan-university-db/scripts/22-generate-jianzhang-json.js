/**
 * 22-generate-jianzhang-json.js
 *
 * ダウンロード済みPDFのメタデータ + WebSearch結果から
 * jianzhang-foreign JSON を生成する。
 * 既存の手動リサーチファイル（9校）はスキップ。
 *
 * 入力: data/raw/jianzhang-pdf/, data/sources/oia-urls.json, data/final/schools.json
 * 出力: data/sources/jianzhang-foreign/{id}-*.json
 */

import { readFile, writeFile, readdir, access, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PDF_DIR = join(__dirname, '..', 'data', 'raw', 'jianzhang-pdf');
const JIANZHANG_DIR = join(__dirname, '..', 'data', 'sources', 'jianzhang-foreign');
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');

// WebSearch + PDF URL で確認済みのデータ
const ENRICHMENT = {
  '03': {
    oia_url: 'https://website.ncyu.edu.tw/oia/Subject?nodeId=58425',
    jianzhang_url: 'https://website.ncyu.edu.tw/oia/ServerFile/Get/5d4cf434-53df-4089-ac71-e7308963ba94',
  },
  '04': {
    oia_url: 'https://admission.ncnu.edu.tw/p/405-1055-11560,c1563.php',
    foreign_admission_url: 'https://admission.ncnu.edu.tw/p/406-1055-31441,r608.php',
    jianzhang_url: 'https://admission.ncnu.edu.tw/var/file/55/1055/attach/13/pta_23599_5120731_11661.pdf',
  },
  '05': {
    oia_url: 'https://oia.nchu.edu.tw/',
    jianzhang_url: 'https://oia.nchu.edu.tw/images/File/03_Apply_to_NCHU/3-1-Degree-Programs/3-1-2-International-Students/115_Academic_Year.pdf',
  },
  '06': {
    oia_url: 'https://oia.ccu.edu.tw/',
    foreign_admission_url: 'https://exams.ccu.edu.tw/p/404-1032-60689.php',
  },
  '08': {
    oia_url: 'https://oia.ndhu.edu.tw/',
    jianzhang_url: 'https://oia.ndhu.edu.tw/var/file/27/1027/img/4756/293724183.pdf',
  },
  '15': {
    oia_url: 'https://www.oia.ncu.edu.tw/',
    foreign_admission_url: 'https://admission.ncu.edu.tw/zh-TW',
  },
  '17': {
    oia_url: 'https://oga.site.nthu.edu.tw/',
    jianzhang_url: 'https://oga.site.nthu.edu.tw/var/file/524/1524/img/4520/847786807.pdf',
    notes: '研究所版。学部はIBP (ibp.nthu.edu.tw) が別途あり',
  },
  '19': {
    oia_url: 'https://oia.nsysu.edu.tw/',
    foreign_admission_url: 'https://exam-oaa.nsysu.edu.tw/p/412-1065-3946.php',
  },
  '41': {
    oia_url: 'https://www.isu.edu.tw/admissions',
    jianzhang_url: 'https://www.isu.edu.tw/storage/files/A9Ki20gtE3VzM0DMORKtAgts21sGxwuo2nmcy9zt.pdf',
  },
  '42': {
    oia_url: 'https://www.oia.pu.edu.tw/',
    jianzhang_url: 'https://oia.pu.edu.tw/var/file/48/1048/img/889609678.pdf',
  },
  '46': {
    oia_url: 'https://dwaa.cjcu.edu.tw/',
    jianzhang_url: 'https://dweb.cjcu.edu.tw/ShepherdFiles/B2902/Article/20251125094544398.pdf',
  },
  '48': {
    oia_url: 'https://www.shu.edu.tw/oia/',
    foreign_admission_url: 'https://oaa.web.shu.edu.tw/外國學生',
    jianzhang_url: 'https://drive.google.com/file/d/1fZnMxAICtV9oQm149sQSCyffzh0McGEP/view',
  },
  '49': {
    oia_url: 'https://www.dyu.edu.tw/',
    jianzhang_url: 'https://bulletin.dyu.edu.tw/',
  },
  '57': {
    oia_url: 'https://gao.yzu.edu.tw/',
    foreign_admission_url: 'https://gao.yzu.edu.tw/index.php/tw/admissions/int-student',
    jianzhang_url: 'https://gao.yzu.edu.tw/images/Brochure/115Brochure%20CH.pdf',
    financial_proof: { amount: 'NTD 120,000', usd_equivalent: 'USD 4,000', jpy_estimate: '約60万円' },
  },
  '61': {
    oia_url: 'https://oia.cycu.edu.tw/',
    foreign_admission_url: 'https://oia.cycu.edu.tw/?p=9765',
    jianzhang_url: 'https://oia.cycu.edu.tw/wp-content/uploads/115外國學生秋季班入學申請簡章251104更新.pdf',
    financial_proof: { amount: 'NTD 120,000', usd_equivalent: 'USD 4,000', jpy_estimate: '約60万円' },
    language_req: { chinese: 'TOCFL B1以上（中国語授業）', english: 'CEFR B1以上（英語授業）' },
  },
  '68': {
    oia_url: 'https://cmucia.cmu.edu.tw/admission_international.html',
    jianzhang_url: 'https://web81.cmu.edu.tw/Std_international/docs/Application_Guidelines.pdf',
  },
  '73': {
    oia_url: 'https://oia.ntut.edu.tw/',
    foreign_admission_url: 'https://oia.ntut.edu.tw/p/412-1032-17870.php',
    jianzhang_url: 'https://oia.ntut.edu.tw/var/file/32/1032/img/2026FallAdmissionHandbook.pdf',
  },
  '74': {
    oia_url: 'https://oia.npust.edu.tw/',
    jianzhang_url: 'https://oia2.npust.edu.tw/',
    notes: '114學年度版。115はまだ未公開の可能性',
  },
  '75': {
    oia_url: 'https://oia.nkust.edu.tw/',
    jianzhang_url: 'https://oia.nkust.edu.tw/images/upload/files/2026秋外國學生招生簡章.pdf',
  },
  '86': {
    oia_url: 'https://oic.cyut.edu.tw/',
    jianzhang_url: 'https://icsc.cyut.edu.tw/',
  },
  '87': {
    oia_url: 'https://www.stust.edu.tw/',
    jianzhang_url: 'https://webap.stust.edu.tw/IntStudWeb/images/',
  },
  'F0': {
    oia_url: 'https://oiais.nptu.edu.tw/',
    jianzhang_url: 'https://oiais.nptu.edu.tw/var/file/90/1090/img/2026-2027AdmissionGuide.pdf',
  },
};

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function main() {
  console.log('=== jianzhang-foreign JSON生成 ===\n');

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const schoolMap = new Map(schools.map(s => [s.id, s]));

  // OIA URL data
  let oiaMap = new Map();
  try {
    const oiaData = JSON.parse(await readFile(join(SOURCES_DIR, 'oia-urls.json'), 'utf-8'));
    oiaMap = new Map(oiaData.results.map(r => [r.school_id, r]));
  } catch { /* */ }

  // Existing jianzhang-foreign files
  const existingIds = new Set();
  try {
    const files = await readdir(JIANZHANG_DIR);
    for (const f of files.filter(f => f.endsWith('.json'))) {
      const data = JSON.parse(await readFile(join(JIANZHANG_DIR, f), 'utf-8'));
      if (data.school_id) existingIds.add(data.school_id);
    }
  } catch { /* */ }

  // PDF files
  const pdfFiles = (await readdir(PDF_DIR)).filter(f => f.endsWith('.pdf'));
  const pdfIds = new Set(pdfFiles.map(f => f.match(/^(\w+)-/)?.[1]).filter(Boolean));

  console.log(`PDF: ${pdfFiles.length}件`);
  console.log(`既存JSON: ${existingIds.size}件 (${[...existingIds].join(',')})`);
  console.log(`新規対象: ${pdfIds.size - existingIds.size}件\n`);

  let created = 0;
  let skipped = 0;

  for (const schoolId of [...pdfIds].sort()) {
    if (existingIds.has(schoolId)) {
      skipped++;
      continue;
    }

    const school = schoolMap.get(schoolId);
    if (!school) {
      console.log(`  SKIP ${schoolId}: schoolsデータなし`);
      continue;
    }

    const enrichment = ENRICHMENT[schoolId] || {};
    const oiaEntry = oiaMap.get(schoolId);

    // Find PDF file for size info
    const pdfFile = pdfFiles.find(f => f.startsWith(schoolId + '-'));
    let pdfSize = 0;
    if (pdfFile) {
      const s = await stat(join(PDF_DIR, pdfFile));
      pdfSize = s.size;
    }

    const result = {
      school_id: schoolId,
      school_name: school.name.cht,
      category: 'foreign_student',
      data_source: 'auto_discovery',
      researched_at: '2026-03-31',
      oia_url: enrichment.oia_url || oiaEntry?.oia_url || null,
      foreign_admission_url: enrichment.foreign_admission_url || oiaEntry?.foreign_admission_url || null,
      jianzhang_url: enrichment.jianzhang_url || null,
      jianzhang_year: schoolId === '74' ? 114 : 115,
      pdf_file: pdfFile || null,
      pdf_size_kb: Math.round(pdfSize / 1024),
    };

    // Add enriched fields if available
    if (enrichment.financial_proof) result.financial_proof = enrichment.financial_proof;
    if (enrichment.language_req) result.language_req = enrichment.language_req;
    if (enrichment.application_periods) result.application_periods = enrichment.application_periods;
    if (enrichment.notes) result.notes = enrichment.notes;

    const slug = school.slug?.slice(0, 20) || schoolId;
    const outFile = join(JIANZHANG_DIR, `${schoolId}-${slug}.json`);
    await writeFile(outFile, JSON.stringify(result, null, 2), 'utf-8');

    const hasDetail = enrichment.financial_proof || enrichment.language_req ? '★' : '';
    console.log(`  OK ${schoolId} ${school.name.cht} ${hasDetail}`);
    created++;
  }

  console.log('\n' + '='.repeat(50));
  console.log('  JSON生成 完了');
  console.log('='.repeat(50));
  console.log(`  新規作成: ${created}件`);
  console.log(`  既存スキップ: ${skipped}件`);

  const finalFiles = (await readdir(JIANZHANG_DIR)).filter(f => f.endsWith('.json'));
  console.log(`  jianzhang-foreign合計: ${finalFiles.length}件`);
  console.log(`\n  次のステップ: node scripts/15-merge-foreign.js`);
}

main().catch(console.error);
