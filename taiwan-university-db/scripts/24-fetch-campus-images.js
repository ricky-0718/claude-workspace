/**
 * 24-fetch-campus-images.js
 * Wikimedia / Wikipedia API から台湾大学のキャンパス画像を取得する
 *
 * データソース:
 * 1. Wikidata SPARQL — P18 (image) / P154 (logo) プロパティ
 * 2. Chinese Wikipedia — pageimages API (サムネイル)
 * 3. English Wikipedia — pageimages API (フォールバック)
 *
 * 出力: data/sources/campus-images.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const SCHOOLS_PATH = join(ROOT, 'data', 'final', 'schools.json');
const OUTPUT_PATH = join(ROOT, 'data', 'sources', 'campus-images.json');

const USER_AGENT = 'TaiwanUniDB/1.0 (university database project)';
const THUMB_WIDTH = 800;

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** 臺/台 の揺れを統一して比較用の正規化名を作る */
function normalize(name) {
  let n = name;
  n = n.replace(/臺/g, '台');
  n = n.replace(/\(.*?\)/g, '');
  n = n.replace(/^天主教/, '');
  n = n.replace(/^.*?學校財團法人/, '');
  n = n.replace(/^.*?家專學校財團法人/, '');
  n = n.trim();
  return n;
}

/** Commons のファイル名からサムネイルURLを構築 */
function commonsThumbUrl(filename) {
  // filename may include "File:" prefix from Wikidata
  const clean = filename.replace(/^File:/, '');
  return `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${encodeURIComponent(clean)}&width=${THUMB_WIDTH}`;
}

/** Extract filename from a full commons URL */
function extractFilename(url) {
  // https://upload.wikimedia.org/wikipedia/commons/X/XX/Filename.jpg
  // or https://commons.wikimedia.org/wiki/Special:FilePath/Filename.jpg
  try {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split('/');
    return parts[parts.length - 1];
  } catch {
    return null;
  }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': USER_AGENT,
          ...(options.headers || {})
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`  [retry ${i + 1}/${retries}] ${err.message}`);
      await sleep(2000);
    }
  }
}

// ──────────────────────────────────────────────
// 1. Load schools.json
// ──────────────────────────────────────────────

const schools = JSON.parse(readFileSync(SCHOOLS_PATH, 'utf8'));
console.log(`[load] schools.json: ${schools.length} schools`);

// Build normalized index: norm_name -> school
const schoolByNorm = new Map();
const schoolByNormAll = new Map(); // norm -> [school, ...]
for (const school of schools) {
  const norm = normalize(school.name.cht);
  schoolByNorm.set(norm, school);
  if (!schoolByNormAll.has(norm)) schoolByNormAll.set(norm, []);
  schoolByNormAll.get(norm).push(school);
}

// ──────────────────────────────────────────────
// 2. Query Wikidata SPARQL
// ──────────────────────────────────────────────

console.log('\n[step 1] Querying Wikidata SPARQL for P18/P154...');

const sparqlQuery = `
SELECT ?item ?itemLabel ?image ?logo WHERE {
  ?item wdt:P31/wdt:P279* wd:Q3918 .
  ?item wdt:P17 wd:Q865 .
  OPTIONAL { ?item wdt:P18 ?image . }
  OPTIONAL { ?item wdt:P154 ?logo . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "zh,en" . }
}
`;

let wikidataResults = [];
try {
  const sparqlRes = await fetchWithRetry(
    'https://query.wikidata.org/sparql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: `query=${encodeURIComponent(sparqlQuery)}`
    }
  );
  const sparqlData = await sparqlRes.json();
  wikidataResults = sparqlData.results?.bindings || [];
  console.log(`  Found ${wikidataResults.length} Wikidata entries`);
} catch (err) {
  console.error(`  [error] Wikidata SPARQL failed: ${err.message}`);
}

await sleep(1000);

// Parse Wikidata results into a map: normalized_name -> { image, logo }
const wikidataImages = new Map();
for (const row of wikidataResults) {
  const label = row.itemLabel?.value;
  if (!label) continue;

  const norm = normalize(label);
  const existing = wikidataImages.get(norm) || {};

  if (row.image?.value && !existing.image) {
    existing.image = row.image.value;
  }
  if (row.logo?.value && !existing.logo) {
    existing.logo = row.logo.value;
  }
  existing.label = label;

  wikidataImages.set(norm, existing);
}
console.log(`  Parsed ${wikidataImages.size} unique universities with images/logos`);

// ──────────────────────────────────────────────
// 3. Query Wikipedia pageimages API
// ──────────────────────────────────────────────

console.log('\n[step 2] Querying Chinese Wikipedia pageimages API...');

// Prepare batches of 50 titles
const chtNames = schools.map(s => s.name.cht);
const enNames = schools.map(s => s.name.en).filter(Boolean);

async function fetchWikipediaImages(titles, lang = 'zh') {
  const results = new Map(); // title -> { thumbnail, original }
  const batches = [];

  for (let i = 0; i < titles.length; i += 50) {
    batches.push(titles.slice(i, i + 50));
  }

  for (let bIdx = 0; bIdx < batches.length; bIdx++) {
    const batch = batches[bIdx];
    const titlesParam = batch.join('|');

    console.log(`  Batch ${bIdx + 1}/${batches.length} (${batch.length} titles)...`);

    try {
      const url = `https://${lang}.wikipedia.org/w/api.php?` + new URLSearchParams({
        action: 'query',
        titles: titlesParam,
        prop: 'pageimages',
        piprop: 'thumbnail|original',
        pithumbsize: String(THUMB_WIDTH),
        format: 'json',
        pilimit: '50'
      }).toString();

      const res = await fetchWithRetry(url);
      const data = await res.json();

      if (data.query?.pages) {
        for (const page of Object.values(data.query.pages)) {
          if (page.pageid && page.thumbnail) {
            results.set(page.title, {
              thumbnail: page.thumbnail?.source,
              original: page.original?.source,
              pageTitle: page.title
            });
          }
        }
      }
    } catch (err) {
      console.error(`    [error] Batch ${bIdx + 1} failed: ${err.message}`);
    }

    await sleep(1000);
  }

  return results;
}

const zhWikiImages = await fetchWikipediaImages(chtNames, 'zh');
console.log(`  Found ${zhWikiImages.size} images from Chinese Wikipedia`);

await sleep(1000);

console.log('\n[step 3] Querying English Wikipedia pageimages API (fallback)...');
const enWikiImages = await fetchWikipediaImages(enNames, 'en');
console.log(`  Found ${enWikiImages.size} images from English Wikipedia`);

// ──────────────────────────────────────────────
// 4. Match and merge results
// ──────────────────────────────────────────────

console.log('\n[step 4] Matching results to schools.json...');

const campusImages = [];
const stats = { wikidata_p18: 0, wikidata_p154: 0, wikipedia_zh: 0, wikipedia_en: 0, unmatched: 0 };

for (const school of schools) {
  const norm = normalize(school.name.cht);
  let imageUrl = null;
  let source = null;
  let license = 'CC BY-SA 4.0'; // Wikimedia default

  // Priority 1: Wikidata P18 (image)
  const wdData = wikidataImages.get(norm);
  if (wdData?.image) {
    const filename = extractFilename(wdData.image);
    if (filename) {
      imageUrl = commonsThumbUrl(filename);
      source = 'wikidata_p18';
      stats.wikidata_p18++;
    }
  }

  // Priority 2: Chinese Wikipedia pageimage
  if (!imageUrl) {
    // Try exact title match
    const zhData = zhWikiImages.get(school.name.cht);
    if (zhData?.thumbnail) {
      imageUrl = zhData.thumbnail;
      source = 'wikipedia_zh';
      stats.wikipedia_zh++;
    } else {
      // Try with 臺/台 variant
      const altName = school.name.cht.replace(/臺/g, '台');
      const zhDataAlt = zhWikiImages.get(altName);
      if (zhDataAlt?.thumbnail) {
        imageUrl = zhDataAlt.thumbnail;
        source = 'wikipedia_zh';
        stats.wikipedia_zh++;
      } else {
        // Try reverse variant 台 → 臺
        const altName2 = school.name.cht.replace(/台/g, '臺');
        const zhDataAlt2 = zhWikiImages.get(altName2);
        if (zhDataAlt2?.thumbnail) {
          imageUrl = zhDataAlt2.thumbnail;
          source = 'wikipedia_zh';
          stats.wikipedia_zh++;
        }
      }
    }
  }

  // Priority 3: English Wikipedia pageimage
  if (!imageUrl && school.name.en) {
    const enData = enWikiImages.get(school.name.en);
    if (enData?.thumbnail) {
      imageUrl = enData.thumbnail;
      source = 'wikipedia_en';
      stats.wikipedia_en++;
    }
  }

  // Priority 4: Wikidata P154 (logo) as last resort
  if (!imageUrl && wdData?.logo) {
    const filename = extractFilename(wdData.logo);
    if (filename) {
      imageUrl = commonsThumbUrl(filename);
      source = 'wikidata_p154';
      stats.wikidata_p154++;
    }
  }

  if (imageUrl) {
    campusImages.push({
      school_id: school.id,
      name_cht: school.name.cht,
      image_url: imageUrl,
      source,
      license
    });
    console.log(`  [match] ${school.id} ${school.name.cht} <- ${source}`);
  } else {
    stats.unmatched++;
    console.log(`  [miss]  ${school.id} ${school.name.cht}`);
  }
}

// ──────────────────────────────────────────────
// 5. Write output
// ──────────────────────────────────────────────

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(campusImages, null, 2), 'utf8');

// ──────────────────────────────────────────────
// 6. Statistics
// ──────────────────────────────────────────────

console.log('\n========== FETCH RESULTS ==========');
console.log(`Total schools:       ${schools.length}`);
console.log(`Images found:        ${campusImages.length}`);
console.log(`  - Wikidata P18:    ${stats.wikidata_p18}`);
console.log(`  - Wikidata P154:   ${stats.wikidata_p154}`);
console.log(`  - Wikipedia (zh):  ${stats.wikipedia_zh}`);
console.log(`  - Wikipedia (en):  ${stats.wikipedia_en}`);
console.log(`Unmatched:           ${stats.unmatched}`);
console.log(`Coverage:            ${((campusImages.length / schools.length) * 100).toFixed(1)}%`);
console.log('====================================');
console.log(`\n[done] Output: ${OUTPUT_PATH}`);
