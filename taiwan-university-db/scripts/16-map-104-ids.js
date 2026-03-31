/**
 * 16-map-104-ids.js
 * 104人力銀行のschoolId/majorIdと海聯會のschool_id/dept_idの対応表を作成
 *
 * マッチング戦略:
 *   1. 大学名: 正規化して完全一致 → 含有一致
 *   2. 学科名: 正規化して完全一致 → 末尾「系」統一 → 部分一致
 *
 * 出力: data/sources/104-id-mapping.json
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');
const FINAL_DIR = join(__dirname, '..', 'data', 'final');

// 大学名を正規化（法人名・プレフィックス除去、台/臺統一）
function normalizeSchoolName(name) {
  return name
    // 法人名プレフィックス除去
    .replace(/^天主教/, '')
    .replace(/^基督教/, '')
    .replace(/學校財團法人/, '')
    .replace(/學校法人/, '')
    .replace(/財團法人/, '')
    // キャンパス表記除去
    .replace(/\(臺北\)/, '').replace(/\(桃園\)/, '').replace(/\(高雄\)/, '')
    .replace(/（臺北）/, '').replace(/（桃園）/, '').replace(/（高雄）/, '')
    // 台/臺 統一
    .replace(/臺/g, '台')
    .replace(/台/g, '臺') // 臺に統一
    .trim();
}

// 学科名を正規化
function normalizeDeptName(name) {
  return name
    .replace(/學系$/, '系')      // 「○○學系」→「○○系」
    .replace(/學科$/, '科')      // 「○○學科」→「○○科」
    .replace(/\s+/g, '')         // 空白除去
    .replace(/（.*?）/g, '')     // 括弧内除去
    .replace(/\(.*?\)/g, '')
    .trim();
}

async function main() {
  console.log('=== 104 ↔ 海聯會 IDマッピング作成 ===\n');

  // データ読み込み
  const list104 = JSON.parse(await readFile(join(SOURCES_DIR, '104-school-major-list.json'), 'utf-8'));
  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const depts = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));

  console.log(`104: ${list104.school.length}校 / ${list104.school.reduce((s, x) => s + x.major.length, 0)}学科`);
  console.log(`海聯會: ${schools.length}校 / ${depts.length}学科\n`);

  // --- 1. 大学マッチング ---
  console.log('[1/3] 大学マッチング...');

  // 正規化済み海聯會マップ（複数キーで引けるようにする）
  const ourSchoolByNorm = new Map();
  const ourSchoolByShort = new Map(); // 短い名前でも引けるように
  for (const s of schools) {
    const norm = normalizeSchoolName(s.name.cht);
    ourSchoolByNorm.set(norm, s);
    // 「國立」「私立」「市立」を除いた短縮名でも登録
    const short = norm.replace(/^國立/, '').replace(/^私立/, '').replace(/^市立/, '');
    if (short !== norm) ourSchoolByShort.set(short, s);
  }

  const schoolMappings = [];
  const unmatchedSchools104 = [];

  for (const s104 of list104.school) {
    const norm104 = normalizeSchoolName(s104.name);
    let ourSchool = null;
    let matchType = '';

    // 完全一致（正規化後）
    if (ourSchoolByNorm.has(norm104)) {
      ourSchool = ourSchoolByNorm.get(norm104);
      matchType = 'exact';
    }
    // 短縮名一致
    else {
      const short104 = norm104.replace(/^國立/, '').replace(/^私立/, '').replace(/^市立/, '');
      if (ourSchoolByShort.has(short104)) {
        ourSchool = ourSchoolByShort.get(short104);
        matchType = 'short';
      }
    }
    // 含有一致（104名が海聯會名に含まれる、またはその逆）
    if (!ourSchool) {
      for (const s of schools) {
        const normOur = normalizeSchoolName(s.name.cht);
        if (normOur.includes(norm104) || norm104.includes(normOur)) {
          ourSchool = s;
          matchType = 'contains';
          break;
        }
      }
    }
    // キャンパス分割対応（104が1校、海聯會が複数キャンパスに分割）
    if (!ourSchool) {
      const candidates = schools.filter(s => {
        const base = normalizeSchoolName(s.name.cht);
        return base.startsWith(norm104) || norm104.startsWith(base);
      });
      if (candidates.length > 0) {
        // 最初のキャンパスにマッチ（後で複数対応）
        ourSchool = candidates[0];
        matchType = 'campus';
        // 全キャンパスを登録
        for (const c of candidates) {
          if (c.id !== ourSchool.id) {
            schoolMappings.push({
              our_id: c.id,
              id_104: s104.id,
              our_name: c.name.cht,
              name_104: s104.name,
              match_type: 'campus_extra'
            });
          }
        }
      }
    }

    if (ourSchool) {
      schoolMappings.push({
        our_id: ourSchool.id,
        id_104: s104.id,
        our_name: ourSchool.name.cht,
        name_104: s104.name,
        match_type: matchType
      });
    } else {
      unmatchedSchools104.push(s104.name);
    }
  }

  const uniqueSchoolIds = new Set(schoolMappings.map(m => m.our_id));
  console.log(`  マッチ: ${uniqueSchoolIds.size}校（${schoolMappings.length}マッピング）`);
  console.log(`  未マッチ: ${unmatchedSchools104.length}校`);
  if (unmatchedSchools104.length > 0) {
    console.log(`  未マッチ一覧: ${unmatchedSchools104.join(', ')}`);
  }

  // --- 2. 学科マッチング ---
  console.log('\n[2/3] 学科マッチング...');

  // 海聯會学科を大学ID別にグルーピング
  const deptsBySchool = new Map();
  for (const d of depts) {
    if (!deptsBySchool.has(d.school_id)) deptsBySchool.set(d.school_id, []);
    deptsBySchool.get(d.school_id).push(d);
  }

  const deptMappings = [];
  const unmatchedDepts = [];
  let matchStats = { exact: 0, normalized: 0, partial: 0 };

  // schoolMappingをour_id → 104 school infoのマップに変換
  const schoolMap104 = new Map();
  for (const sm of schoolMappings) {
    const s104 = list104.school.find(s => s.id === sm.id_104);
    if (!schoolMap104.has(sm.our_id)) schoolMap104.set(sm.our_id, []);
    schoolMap104.get(sm.our_id).push({ mapping: sm, school104: s104 });
  }

  for (const [ourSchoolId, entries] of schoolMap104) {
    const ourDepts = deptsBySchool.get(ourSchoolId) || [];
    if (ourDepts.length === 0) continue;

    // 海聯會学科の正規化名マップ
    const ourDeptByExact = new Map();
    const ourDeptByNorm = new Map();
    for (const d of ourDepts) {
      ourDeptByExact.set(d.name.cht, d);
      ourDeptByNorm.set(normalizeDeptName(d.name.cht), d);
    }

    for (const { mapping, school104 } of entries) {
      if (!school104) continue;
      for (const m104 of school104.major) {
        let ourDept = null;
        let matchType = '';

        // 完全一致
        if (ourDeptByExact.has(m104.name)) {
          ourDept = ourDeptByExact.get(m104.name);
          matchType = 'exact';
          matchStats.exact++;
        }
        // 正規化一致
        else {
          const norm = normalizeDeptName(m104.name);
          if (ourDeptByNorm.has(norm)) {
            ourDept = ourDeptByNorm.get(norm);
            matchType = 'normalized';
            matchStats.normalized++;
          }
        }
        // 部分一致（学科名の主要部分が一致）
        if (!ourDept) {
          const norm104 = normalizeDeptName(m104.name);
          for (const d of ourDepts) {
            const normOur = normalizeDeptName(d.name.cht);
            if (normOur.length >= 3 && norm104.length >= 3) {
              if (normOur.includes(norm104) || norm104.includes(normOur)) {
                ourDept = d;
                matchType = 'partial';
                matchStats.partial++;
                break;
              }
            }
          }
        }

        if (ourDept) {
          deptMappings.push({
            our_id: ourDept.id,
            our_school_id: ourSchoolId,
            school_104: mapping.id_104,
            major_104: m104.id,
            our_name: ourDept.name.cht,
            name_104: m104.name,
            match_type: matchType
          });
        } else {
          unmatchedDepts.push({
            school_104: mapping.id_104,
            school_name: mapping.name_104,
            major_104: m104.id,
            name_104: m104.name
          });
        }
      }
    }
  }

  // 重複除去（1つの海聯會学科に複数の104学科がマッチする場合、最初のものを採用）
  const seenOurIds = new Set();
  const uniqueDeptMappings = deptMappings.filter(m => {
    if (seenOurIds.has(m.our_id)) return false;
    seenOurIds.add(m.our_id);
    return true;
  });

  const totalMatchable = deptMappings.length + unmatchedDepts.length;
  console.log(`  マッチ: ${uniqueDeptMappings.length}学科（重複前: ${deptMappings.length}）`);
  console.log(`  未マッチ: ${unmatchedDepts.length}学科`);
  console.log(`  マッチ率: ${(uniqueDeptMappings.length / depts.length * 100).toFixed(1)}%（海聯會${depts.length}学科中）`);
  console.log(`  内訳: exact=${matchStats.exact} / normalized=${matchStats.normalized} / partial=${matchStats.partial}`);

  // --- 3. 出力 ---
  console.log('\n[3/3] マッピングファイル出力...');

  const output = {
    generated_at: new Date().toISOString(),
    stats: {
      schools_104: list104.school.length,
      schools_ours: schools.length,
      schools_matched: uniqueSchoolIds.size,
      schools_unmatched: unmatchedSchools104.length,
      depts_104_total: list104.school.reduce((s, x) => s + x.major.length, 0),
      depts_ours: depts.length,
      depts_matched: uniqueDeptMappings.length,
      depts_unmatched_104: unmatchedDepts.length,
      match_rate: +(uniqueDeptMappings.length / depts.length * 100).toFixed(1)
    },
    schools: schoolMappings,
    departments: uniqueDeptMappings,
    unmatched_schools_104: unmatchedSchools104,
    unmatched_depts_104_sample: unmatchedDepts.slice(0, 50)
  };

  const outPath = join(SOURCES_DIR, '104-id-mapping.json');
  await writeFile(outPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`  → ${outPath}`);

  // サマリー
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  IDマッピング完了                            ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`  大学: ${uniqueSchoolIds.size}/${schools.length}校マッチ`);
  console.log(`  学科: ${uniqueDeptMappings.length}/${depts.length}学科マッチ (${output.stats.match_rate}%)`);
  console.log(`  次のステップ: node scripts/17-fetch-104-curriculum.js`);
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
