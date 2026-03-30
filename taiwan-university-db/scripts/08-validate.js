/**
 * 08-validate.js
 * データ品質検証レポートを生成
 */

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const TRANSLATIONS_DIR = join(__dirname, '..', 'data', 'translations');

async function main() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║   データ検証レポート                 ║');
  console.log('╚══════════════════════════════════════╝\n');

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const groups = JSON.parse(await readFile(join(FINAL_DIR, 'department-groups.json'), 'utf-8'));

  let pass = 0, warn = 0, fail = 0;

  function check(label, condition, detail) {
    if (condition) {
      console.log(`  ✅ ${label}: ${detail}`);
      pass++;
    } else {
      console.log(`  ❌ ${label}: ${detail}`);
      fail++;
    }
  }

  function warning(label, detail) {
    console.log(`  ⚠️  ${label}: ${detail}`);
    warn++;
  }

  // --- 1. 基本カウント ---
  console.log('【1. データ件数】');
  check('大学数', schools.length >= 100, `${schools.length}校`);
  check('学科数', departments.length >= 2000, `${departments.length}件`);
  check('学群数', groups.length === 18, `${groups.length}件`);

  // --- 2. データ整合性 ---
  console.log('\n【2. データ整合性】');
  const schoolIds = new Set(schools.map(s => s.id));
  const orphanDepts = departments.filter(d => !schoolIds.has(d.school_id));
  check('学科→大学リンク', orphanDepts.length === 0,
    orphanDepts.length === 0 ? '全学科が有効な大学に紐付き'
      : `${orphanDepts.length}件の孤立学科あり`);

  const groupIds = new Set(groups.map(g => g.id));
  const noGroupDepts = departments.filter(d => d.group_id && !groupIds.has(d.group_id));
  check('学科→学群リンク', noGroupDepts.length === 0,
    noGroupDepts.length === 0 ? '全学科が有効な学群に紐付き'
      : `${noGroupDepts.length}件の不正な学群ID`);

  // 重複チェック
  const deptIdSet = new Set();
  const duplicates = [];
  departments.forEach(d => {
    if (deptIdSet.has(d.id)) duplicates.push(d.id);
    deptIdSet.add(d.id);
  });
  check('重複なし', duplicates.length === 0,
    duplicates.length === 0 ? '学科IDに重複なし'
      : `${duplicates.length}件の重複: ${duplicates.slice(0, 5).join(', ')}`);

  // --- 3. 翻訳カバレッジ ---
  console.log('\n【3. 翻訳カバレッジ】');
  const uniWithJa = schools.filter(s => s.name.ja && s.name.ja !== s.name.cht);
  const deptWithJa = departments.filter(d => d.name.ja && d.name.ja !== d.name.cht);
  const groupWithJa = groups.filter(g => g.name.ja && g.name.ja !== g.name.cht);

  const uniPct = Math.round(uniWithJa.length / schools.length * 100);
  const deptPct = Math.round(deptWithJa.length / departments.length * 100);

  check('大学名翻訳', uniPct >= 80, `${uniWithJa.length}/${schools.length} (${uniPct}%)`);
  check('学群名翻訳', groupWithJa.length === groups.length,
    `${groupWithJa.length}/${groups.length}`);

  if (deptPct >= 80) {
    check('学科名翻訳', true, `${deptWithJa.length}/${departments.length} (${deptPct}%)`);
  } else {
    warning('学科名翻訳', `${deptWithJa.length}/${departments.length} (${deptPct}%) — 80%未満`);
  }

  // --- 4. データ充実度 ---
  console.log('\n【4. データ充実度】');
  const withIntro = departments.filter(d => d.introduction?.cht);
  const withDocs = departments.filter(d => d.required_documents?.length > 0);
  const withInterview = departments.filter(d => d.has_interview);
  const withWebsite = departments.filter(d => d.website?.cht);

  console.log(`  学科紹介あり: ${withIntro.length}/${departments.length} (${Math.round(withIntro.length / departments.length * 100)}%)`);
  console.log(`  出願書類あり: ${withDocs.length}/${departments.length} (${Math.round(withDocs.length / departments.length * 100)}%)`);
  console.log(`  面接あり: ${withInterview.length}/${departments.length}`);
  console.log(`  学科サイトあり: ${withWebsite.length}/${departments.length}`);

  // --- 5. 地域分布 ---
  console.log('\n【5. 地域分布】');
  const regionCount = {};
  schools.forEach(s => { regionCount[s.region] = (regionCount[s.region] || 0) + 1; });
  Object.entries(regionCount).sort((a, b) => b[1] - a[1]).forEach(([r, c]) => {
    console.log(`  ${r}: ${c}校`);
  });

  // --- 6. data_completeness ---
  console.log('\n【6. データ補完レベル】');
  const completeness = { full: 0, enriched: 0, basic: 0 };
  schools.forEach(s => { completeness[s.data_completeness] = (completeness[s.data_completeness] || 0) + 1; });
  console.log(`  full（全ソース揃い）: ${completeness.full || 0}校`);
  console.log(`  enriched（部分補完）: ${completeness.enriched || 0}校`);
  console.log(`  basic（海聯會のみ）: ${completeness.basic || 0}校`);

  // --- サマリー ---
  console.log('\n╔══════════════════════════════════════╗');
  console.log(`║  結果: ✅ ${pass} PASS  ⚠️  ${warn} WARN  ❌ ${fail} FAIL  ║`);
  console.log('╚══════════════════════════════════════╝');
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
