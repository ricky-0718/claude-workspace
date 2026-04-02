/**
 * 25-merge-images.js
 * campus-images.json のデータを schools.json にマージする
 *
 * 各マッチした学校に以下のフィールドを追加:
 *   image: { url, attribution, alt }
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const IMAGES_PATH = join(ROOT, 'data', 'sources', 'campus-images.json');
const SCHOOLS_PATH = join(ROOT, 'data', 'final', 'schools.json');

// ──────────────────────────────────────────────
// 1. データ読み込み
// ──────────────────────────────────────────────

const campusImages = JSON.parse(readFileSync(IMAGES_PATH, 'utf8'));
const schools = JSON.parse(readFileSync(SCHOOLS_PATH, 'utf8'));

console.log(`[load] campus-images.json: ${campusImages.length} entries`);
console.log(`[load] schools.json: ${schools.length} schools`);

// ──────────────────────────────────────────────
// 2. インデックス構築 (school_id -> image data)
// ──────────────────────────────────────────────

const imageById = new Map();
for (const img of campusImages) {
  imageById.set(img.school_id, img);
}

// ──────────────────────────────────────────────
// 3. マージ
// ──────────────────────────────────────────────

const SOURCE_LABELS = {
  wikidata_p18: 'Wikimedia Commons (Wikidata P18)',
  wikidata_p154: 'Wikimedia Commons (Wikidata P154 logo)',
  wikipedia_zh: 'Chinese Wikipedia',
  wikipedia_en: 'English Wikipedia'
};

let merged = 0;
let skipped = 0;
let alreadyHadImage = 0;

for (const school of schools) {
  const imgData = imageById.get(school.id);

  if (!imgData) {
    skipped++;
    continue;
  }

  // Don't overwrite existing image data if present
  if (school.image?.url) {
    alreadyHadImage++;
    console.log(`  [skip] ${school.id} ${school.name.cht} (already has image)`);
    continue;
  }

  school.image = {
    url: imgData.image_url,
    attribution: `${imgData.license} via ${SOURCE_LABELS[imgData.source] || imgData.source}`,
    alt: `${school.name.cht} キャンパス`
  };

  merged++;
  console.log(`  [merge] ${school.id} ${school.name.cht}`);
}

// ──────────────────────────────────────────────
// 4. 統計レポート
// ──────────────────────────────────────────────

const totalWithImage = schools.filter(s => s.image?.url).length;

console.log('\n========== MERGE RESULTS ==========');
console.log(`Campus images:       ${campusImages.length}`);
console.log(`Newly merged:        ${merged}`);
console.log(`Already had image:   ${alreadyHadImage}`);
console.log(`No image available:  ${skipped}`);
console.log(`Schools with image:  ${totalWithImage} / ${schools.length}`);
console.log(`Coverage:            ${((totalWithImage / schools.length) * 100).toFixed(1)}%`);
console.log('====================================');

// ──────────────────────────────────────────────
// 5. 書き出し
// ──────────────────────────────────────────────

writeFileSync(SCHOOLS_PATH, JSON.stringify(schools, null, 2), 'utf8');
console.log(`\n[done] Updated ${SCHOOLS_PATH}`);
