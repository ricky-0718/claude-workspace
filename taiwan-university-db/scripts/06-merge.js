/**
 * 06-merge.js
 * 海聯會の生データを統合して schools.json + departments.json + department-groups.json を生成
 *
 * 現時点では海聯會データのみ。Phase 2でスプレッドシート・大学図鑑・NTNUデータを追加統合する。
 */

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = join(__dirname, '..', 'data', 'raw');
const DETAILS_DIR = join(RAW_DIR, 'hailian-dept-details');
const TRANSLATIONS_DIR = join(__dirname, '..', 'data', 'translations');
const FINAL_DIR = join(__dirname, '..', 'data', 'final');

function slugify(enName) {
  return enName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function regionFromAddress(address) {
  if (!address) return '不明';
  if (address.includes('臺北') || address.includes('台北')) return '台北';
  if (address.includes('新北')) return '新北';
  if (address.includes('桃園')) return '桃園';
  if (address.includes('新竹')) return '新竹';
  if (address.includes('臺中') || address.includes('台中')) return '台中';
  if (address.includes('彰化')) return '彰化';
  if (address.includes('南投')) return '南投';
  if (address.includes('雲林')) return '雲林';
  if (address.includes('嘉義')) return '嘉義';
  if (address.includes('臺南') || address.includes('台南')) return '台南';
  if (address.includes('高雄')) return '高雄';
  if (address.includes('屏東')) return '屏東';
  if (address.includes('花蓮')) return '花蓮';
  if (address.includes('臺東') || address.includes('台東')) return '台東';
  if (address.includes('宜蘭')) return '宜蘭';
  if (address.includes('金門')) return '金門';
  if (address.includes('澎湖')) return '澎湖';
  return 'その他';
}

async function loadTranslation(filename) {
  try {
    return JSON.parse(await readFile(join(TRANSLATIONS_DIR, filename), 'utf-8'));
  } catch { return {}; }
}

async function main() {
  await mkdir(FINAL_DIR, { recursive: true });
  console.log('=== データ統合開始 ===\n');

  // --- 生データ読み込み ---
  const schoolsRaw = JSON.parse(await readFile(join(RAW_DIR, 'hailian-schools.json'), 'utf-8'));
  const groupsRaw = JSON.parse(await readFile(join(RAW_DIR, 'hailian-groups.json'), 'utf-8'));
  const deptsListRaw = JSON.parse(await readFile(join(RAW_DIR, 'hailian-departments.json'), 'utf-8'));

  // 詳細データ読み込み（ある場合）
  let detailsBySchool = {};
  try {
    const detailFiles = await readdir(DETAILS_DIR);
    for (const f of detailFiles.filter(f => f.endsWith('.json'))) {
      const schoolId = f.replace('.json', '');
      const data = JSON.parse(await readFile(join(DETAILS_DIR, f), 'utf-8'));
      detailsBySchool[schoolId] = data.departments || [];
    }
    console.log(`詳細データ: ${Object.keys(detailsBySchool).length}校分を読み込み`);
  } catch {
    console.log('詳細データなし（01-fetchのみで統合）');
  }

  // --- 翻訳辞書読み込み ---
  const uniNames = await loadTranslation('university-names.json');
  const deptNames = await loadTranslation('department-names.json');
  const groupNames = await loadTranslation('group-names.json');

  // --- 1. department-groups.json ---
  console.log('\n[1/3] 学群データ生成...');
  const departmentGroups = groupsRaw.map(g => ({
    id: g.id,
    slug: slugify(g.eng_title || `group-${g.id}`),
    name: {
      cht: g.title,
      ja: groupNames[String(g.id)]?.ja || g.title,
      en: g.eng_title
    },
    department_count: 0 // 後で計算
  }));

  // --- 2. schools.json ---
  console.log('[2/3] 大学データ生成...');
  const schools = schoolsRaw.map(s => {
    const trans = uniNames[s.id] || {};
    return {
      id: s.id,
      slug: slugify(s.eng_title || s.title),
      name: {
        cht: s.title,
        ja: trans.ja || s.title,
        en: s.eng_title
      },
      type: s.type,
      region: regionFromAddress(s.address),
      address: s.address,
      phone: s.phone,
      website: {
        cht: s.url,
        en: s.eng_url || undefined
      },
      dormitory: {
        available: s.has_dorm,
        info_cht: s.dorm_info || undefined,
        info_en: s.eng_dorm_info || undefined
      },
      scholarship: {
        available: s.has_scholarship,
        url: s.scholarship_url || undefined
      },
      department_count: 0, // 後で計算
      data_completeness: 'basic',
      data_sources: ['hailian'],
      last_updated: new Date().toISOString().split('T')[0]
    };
  });

  // --- 3. departments.json ---
  console.log('[3/3] 学科データ生成...');
  const departments = [];

  for (const schoolGroup of deptsListRaw) {
    const schoolId = schoolGroup.id;

    // 詳細データがある場合はそちらを使う（64フィールド）
    const detailDepts = detailsBySchool[schoolId] || [];
    const detailMap = new Map(detailDepts.map(d => [d.id, d]));

    for (const dept of schoolGroup.departments) {
      const detail = detailMap.get(dept.id) || {};
      const trans = deptNames[dept.id] || {};

      departments.push({
        id: dept.id,
        school_id: schoolId,
        slug: slugify(dept.eng_title || dept.title),
        group_id: dept.main_group,
        name: {
          cht: dept.title,
          ja: trans.ja || dept.title,
          en: dept.eng_title
        },
        introduction: {
          cht: detail.description || undefined,
          en: detail.eng_description || undefined
        },
        website: {
          cht: detail.url || undefined,
          en: detail.eng_url || undefined
        },
        has_eng_taught: dept.has_eng_taught || false,
        required_documents: (detail.application_docs || []).map(doc => ({
          name_cht: doc.type?.name || doc.description,
          name_en: doc.type?.eng_name || doc.eng_description,
          required: doc.required
        })),
        has_interview: detail.has_interview || false,
        interview_info: detail.interview_description || undefined,
        quota: {
          individual_application: dept.admission_selection_ratify_quota || 0,
          united_distribution: {
            total: dept.admission_placement_ratify_quota || 0,
            s1: dept.admission_placement_step_quota?.s1 || 0,
            s2: dept.admission_placement_step_quota?.s2 || 0,
            s3: dept.admission_placement_step_quota?.s3 || 0,
            s4: dept.admission_placement_step_quota?.s4 || 0,
            s5: dept.admission_placement_step_quota?.s5 || 0
          }
        },
        group_data: dept.main_group_data ? {
          cht: dept.main_group_data.title,
          en: dept.main_group_data.eng_title
        } : undefined,
        ioh_url: dept.ioh?.url || undefined,
        translation_status: trans.ja ? 'ai_draft' : 'untranslated'
      });
    }
  }

  // 学科数を大学・学群に反映
  for (const school of schools) {
    school.department_count = departments.filter(d => d.school_id === school.id).length;
  }
  for (const group of departmentGroups) {
    group.department_count = departments.filter(d => d.group_id === group.id).length;
  }

  // --- 保存 ---
  await writeFile(join(FINAL_DIR, 'schools.json'), JSON.stringify(schools, null, 2), 'utf-8');
  await writeFile(join(FINAL_DIR, 'departments.json'), JSON.stringify(departments, null, 2), 'utf-8');
  await writeFile(join(FINAL_DIR, 'department-groups.json'), JSON.stringify(departmentGroups, null, 2), 'utf-8');

  console.log(`\n=== 統合完了 ===`);
  console.log(`大学: ${schools.length}校 → schools.json`);
  console.log(`学科: ${departments.length}件 → departments.json`);
  console.log(`学群: ${departmentGroups.length}件 → department-groups.json`);
  console.log(`保存先: ${FINAL_DIR}`);

  // 地域分布
  const regionCount = {};
  schools.forEach(s => { regionCount[s.region] = (regionCount[s.region] || 0) + 1; });
  console.log('\n地域分布:');
  Object.entries(regionCount).sort((a, b) => b[1] - a[1]).forEach(([r, c]) => {
    console.log(`  ${r}: ${c}校`);
  });
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
