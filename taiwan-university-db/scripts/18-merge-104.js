/**
 * 18-merge-104.js
 * 104 API取得データをdepartments.jsonとschools.jsonに統合
 *
 * 追加フィールド（departments.json）:
 *   - curriculum_104: { required, electives }
 *   - tuition_104: number (NTD/学期)
 *   - teacher_student_ratio: number
 *   - registration_ratio: number (%)
 *   - deferral_ratio: number (%)
 *   - gender_ratio: { male, female }
 *   - holland_code: string[]
 *   - intro_collego: string
 *   - reference_links: { name, link }[]
 *   - source_104: { schoolId, majorId, fetched_at }
 *
 * 追加フィールド（schools.json）:
 *   - id_104: number
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const RAW_104_DIR = join(__dirname, '..', 'data', 'raw', '104-intro');
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');

async function main() {
  console.log('=== 104データ統合 ===\n');

  // データ読み込み
  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const mapping = JSON.parse(await readFile(join(SOURCES_DIR, '104-id-mapping.json'), 'utf-8'));

  // マッピングをルックアップ用に変換
  const deptMapping = new Map(mapping.departments.map(m => [m.our_id, m]));
  const schoolMapping = new Map(mapping.schools.map(m => [m.our_id, m]));

  console.log(`学科マッピング: ${deptMapping.size}件`);
  console.log(`大学マッピング: ${schoolMapping.size}件\n`);

  // 104 APIデータをdept_idで引けるように読み込み
  const files = await readdir(RAW_104_DIR);
  const rawDataMap = new Map(); // `${school_104}-${major_104}` → data

  let loaded = 0;
  let noData = 0;
  let withCurriculum = 0;

  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const data = JSON.parse(await readFile(join(RAW_104_DIR, f), 'utf-8'));
    if (data._noData) { noData++; continue; }

    const key = f.replace('.json', '');
    rawDataMap.set(key, data);
    loaded++;

    if (data.subject?.required?.length > 0 || data.subject?.electives?.length > 0) {
      withCurriculum++;
    }
  }

  console.log(`104データ読み込み: ${loaded}件（カリキュラムあり: ${withCurriculum}件, データなし: ${noData}件）\n`);

  // --- 1. departments.json 更新 ---
  console.log('[1/2] departments.json 更新...');

  let enriched = 0;
  let curriculumAdded = 0;

  for (const dept of departments) {
    const dm = deptMapping.get(dept.id);
    if (!dm) continue;

    const key = `${dm.school_104}-${dm.major_104}`;
    const data = rawDataMap.get(key);
    if (!data) continue;

    const info = data.info || {};
    const subject = data.subject || {};

    // カリキュラム
    if (subject.required?.length > 0 || subject.electives?.length > 0) {
      dept.curriculum_104 = {};
      if (subject.required?.length > 0) {
        dept.curriculum_104.required = subject.required;
      }
      if (subject.electives?.length > 0) {
        dept.curriculum_104.electives = subject.electives;
      }
      curriculumAdded++;
    }

    // 学費（NTD/学期）
    if (info.tuition) {
      dept.tuition_104 = info.tuition;
    }

    // 師生比
    if (info.teacherStudentRatio) {
      dept.teacher_student_ratio = info.teacherStudentRatio;
    }

    // 登録率
    if (info.registrationRatio != null) {
      dept.registration_ratio = info.registrationRatio;
    }

    // 延修率
    if (info.deferralRatio != null) {
      dept.deferral_ratio = info.deferralRatio;
    }

    // 性別比
    if (info.manRatio != null) {
      dept.gender_ratio = {
        male: info.manRatio,
        female: 100 - info.manRatio
      };
    }

    // Holland Code（興味タイプ）
    if (info.hollandCode?.length > 0) {
      dept.holland_code = info.hollandCode;
    }

    // ColleGo紹介文
    if (info.intro) {
      dept.intro_collego = info.intro;
    }

    // 参考リンク
    if (info.reference?.length > 0) {
      dept.reference_links = info.reference;
    }

    // 住所（学科レベル）
    if (info.address && !dept.address) {
      dept.address = info.address;
    }

    // 104ソース情報
    dept.source_104 = {
      schoolId: dm.school_104,
      majorId: dm.major_104,
      fetched_at: data._meta?.fetched_at || new Date().toISOString()
    };

    enriched++;
  }

  console.log(`  エンリッチ: ${enriched}学科`);
  console.log(`  カリキュラム追加: ${curriculumAdded}学科`);

  // --- 2. schools.json 更新 ---
  console.log('\n[2/2] schools.json 更新...');

  let schoolsEnriched = 0;
  for (const school of schools) {
    const sm = schoolMapping.get(school.id);
    if (!sm) continue;
    school.id_104 = sm.id_104;
    schoolsEnriched++;
  }

  console.log(`  104 ID追加: ${schoolsEnriched}校`);

  // --- 3. 保存 ---
  console.log('\n保存中...');
  await writeFile(join(FINAL_DIR, 'departments.json'), JSON.stringify(departments, null, 2), 'utf-8');
  await writeFile(join(FINAL_DIR, 'schools.json'), JSON.stringify(schools, null, 2), 'utf-8');

  // Webサイト側にもコピー
  const webDataDir = join(__dirname, '..', '..', 'taiwan-university-website', 'src', 'data');
  await writeFile(join(webDataDir, 'departments.json'), JSON.stringify(departments, null, 2), 'utf-8');
  await writeFile(join(webDataDir, 'schools.json'), JSON.stringify(schools, null, 2), 'utf-8');
  console.log('  → departments.json / schools.json (final + website)');

  // --- 統計 ---
  const stats = {
    total_depts: departments.length,
    enriched_depts: enriched,
    curriculum_added: curriculumAdded,
    with_tuition: departments.filter(d => d.tuition_104).length,
    with_ratio: departments.filter(d => d.teacher_student_ratio).length,
    with_holland: departments.filter(d => d.holland_code?.length > 0).length,
    with_intro: departments.filter(d => d.intro_collego).length,
    schools_with_104id: schoolsEnriched
  };

  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  104データ統合完了                            ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`  学科エンリッチ:    ${stats.enriched_depts}/${stats.total_depts} (${(stats.enriched_depts/stats.total_depts*100).toFixed(1)}%)`);
  console.log(`  カリキュラム:      ${stats.curriculum_added}学科`);
  console.log(`  学費データ:        ${stats.with_tuition}学科`);
  console.log(`  師生比データ:      ${stats.with_ratio}学科`);
  console.log(`  Holland Code:      ${stats.with_holland}学科`);
  console.log(`  ColleGo紹介:       ${stats.with_intro}学科`);
  console.log(`  大学104 ID:        ${stats.schools_with_104id}校`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
