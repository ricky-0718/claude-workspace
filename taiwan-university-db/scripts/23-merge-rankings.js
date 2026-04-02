/**
 * 23-merge-rankings.js
 * ランキングデータを schools.json にマージする
 *
 * - rankings-2026.json の name_cht と schools.json の name.cht をマッチング
 * - 臺/台 の揺れ、法人名の長い表記、(臺北)/(桃園) 等のサフィックスに対応
 * - マッチした学校に rankings フィールドを追加
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const RANKINGS_PATH = join(ROOT, 'data', 'sources', 'rankings-2026.json');
const SCHOOLS_PATH = join(ROOT, 'data', 'final', 'schools.json');

// ──────────────────────────────────────────────
// 1. データ読み込み
// ──────────────────────────────────────────────
const rankingsData = JSON.parse(readFileSync(RANKINGS_PATH, 'utf8'));
const schools = JSON.parse(readFileSync(SCHOOLS_PATH, 'utf8'));

console.log(`[load] rankings-2026.json: ${rankingsData.rankings.length} entries`);
console.log(`[load] schools.json: ${schools.length} schools`);

// ──────────────────────────────────────────────
// 2. 名前正規化関数
// ──────────────────────────────────────────────
function normalize(name) {
  let n = name;
  // 臺 → 台 に統一
  n = n.replace(/臺/g, '台');
  // (臺北), (桃園), (高雄) 等のキャンパスサフィックスを除去
  n = n.replace(/\(.*?\)/g, '');
  // 「天主教」プレフィックスを除去（天主教輔仁大學 → 輔仁大學）
  n = n.replace(/^天主教/, '');
  // 法人名を除去（例: 「馬偕學校財團法人馬偕醫學大學」→「馬偕醫學大學」）
  n = n.replace(/^.*?學校財團法人/, '');
  // 「台南家專學校財團法人」パターン
  n = n.replace(/^.*?家專學校財團法人/, '');
  // 先頭・末尾のスペースを除去
  n = n.trim();
  return n;
}

// ──────────────────────────────────────────────
// 3. schools.json のインデックス構築
// ──────────────────────────────────────────────
// 正規化名 → school index のマップ（複数校が同一正規化名になる場合あり）
const normalizedIndex = new Map(); // normalized_name -> [index, ...]
schools.forEach((school, idx) => {
  const norm = normalize(school.name.cht);
  if (!normalizedIndex.has(norm)) {
    normalizedIndex.set(norm, []);
  }
  normalizedIndex.get(norm).push(idx);
});

// ──────────────────────────────────────────────
// 4. マッチング＆マージ
// ──────────────────────────────────────────────
let matched = 0;
let unmatched = 0;
const unmatchedNames = [];

for (const entry of rankingsData.rankings) {
  const normRanking = normalize(entry.name_cht);

  // 完全一致を試みる
  let indices = normalizedIndex.get(normRanking);

  if (!indices) {
    // 部分一致フォールバック: rankings の名前が schools の名前に含まれるか
    for (const [normSchool, idxList] of normalizedIndex.entries()) {
      if (normSchool.includes(normRanking) || normRanking.includes(normSchool)) {
        indices = idxList;
        break;
      }
    }
  }

  if (indices && indices.length > 0) {
    // ランキングオブジェクト構築
    const rankingObj = {
      qs_world: entry.qs_world,
      qs_asia: entry.qs_asia,
      the_world: entry.the_world,
      cheers: entry.cheers,
      yuanjian: entry.yuanjian
    };

    // 追加フィールドがあれば付与
    if (entry.qs_subject_top) {
      rankingObj.qs_subject_top = entry.qs_subject_top;
    }
    if (entry.yuanjian_category) {
      rankingObj.yuanjian_category = entry.yuanjian_category;
    }

    // 全マッチしたインデックスに適用（銘傳大學(臺北) と 銘傳大學(桃園) 等）
    for (const idx of indices) {
      schools[idx].rankings = rankingObj;
      console.log(`  [match] ${entry.name_cht} → ${schools[idx].name.cht}`);
    }
    matched++;
  } else {
    unmatched++;
    unmatchedNames.push(entry.name_cht);
  }
}

// ──────────────────────────────────────────────
// 5. 統計レポート
// ──────────────────────────────────────────────
const schoolsWithRankings = schools.filter(s => s.rankings).length;

console.log('\n========== MERGE RESULTS ==========');
console.log(`Rankings entries:     ${rankingsData.rankings.length}`);
console.log(`Matched:             ${matched}`);
console.log(`Unmatched:           ${unmatched}`);
console.log(`Schools with ranks:  ${schoolsWithRankings} / ${schools.length}`);
console.log('====================================');

if (unmatchedNames.length > 0) {
  console.log('\n[warn] Unmatched ranking entries:');
  unmatchedNames.forEach(name => console.log(`  - ${name}`));
}

// ──────────────────────────────────────────────
// 6. 書き出し
// ──────────────────────────────────────────────
writeFileSync(SCHOOLS_PATH, JSON.stringify(schools, null, 2), 'utf8');
console.log(`\n[done] Updated ${SCHOOLS_PATH}`);
console.log(`[done] ${schoolsWithRankings} schools now have ranking data.`);
