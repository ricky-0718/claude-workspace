/**
 * 12-discover-oia.js
 *
 * 129校の大学Webサイトから國際處（OIA）ページのURLを発見する。
 * 各大学のトップページにアクセスし、国際処へのリンクを探索。
 *
 * 入力: data/final/schools.json
 * 出力: data/sources/oia-urls.json
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');

const CONCURRENCY = 3;
const DELAY_MS = 500;
const TIMEOUT_MS = 15000;

// OIA URL候補パターン
const OIA_PATHS = [
  '/oia/',
  '/oic/',
  '/international/',
  '/oia/en/',
  '/oia/english/',
  '/en/admission/',
  '/admission/international/',
];

// OIAリンクを検出するキーワード
const OIA_KEYWORDS = [
  '國際', '国際', 'international', 'oia', 'oic', 'global',
  'foreign', 'overseas', '外國', '外国',
];

// 外國學生招生リンクを検出するキーワード
const ADMISSION_KEYWORDS = [
  '外國學生', '外國生', '外国学生', 'international student',
  'foreign student', '招生', 'admission', 'apply', '入學',
  '簡章', 'prospectus', 'guideline',
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithTimeout(url, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8,ja;q=0.7',
      },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const text = await res.text();
    return { url: res.url, html: text };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractLinks(html, baseUrl) {
  const links = [];
  // Extract <a> tags with href and text
  const aTagRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = aTagRegex.exec(html)) !== null) {
    try {
      const resolved = new URL(match[1], baseUrl).href;
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      links.push({ href: resolved, text });
    } catch { /* skip invalid URLs */ }
  }
  return links;
}

function findOiaLinks(links) {
  return links.filter(l => {
    const url = l.href.toLowerCase();
    const text = l.text.toLowerCase();
    return OIA_KEYWORDS.some(kw =>
      url.includes(kw.toLowerCase()) || text.includes(kw.toLowerCase())
    );
  });
}

function findAdmissionLinks(links) {
  return links.filter(l => {
    const url = l.href.toLowerCase();
    const text = l.text.toLowerCase();
    return ADMISSION_KEYWORDS.some(kw =>
      url.includes(kw.toLowerCase()) || text.includes(kw.toLowerCase())
    );
  });
}

async function discoverSchool(school) {
  const result = {
    school_id: school.id,
    school_name: school.name.cht,
    website: school.website?.cht || '',
    oia_url: null,
    foreign_admission_url: null,
    admission_links: [],
    method: 'not_found',
  };

  if (!result.website) return result;

  // Step 1: Try known OIA paths directly
  const baseUrl = result.website.replace(/\/$/, '');
  for (const path of OIA_PATHS) {
    const url = baseUrl + path;
    const page = await fetchWithTimeout(url);
    if (page) {
      result.oia_url = page.url;
      result.method = 'direct_path';

      // Look for admission links on OIA page
      const links = extractLinks(page.html, page.url);
      const admLinks = findAdmissionLinks(links);
      if (admLinks.length > 0) {
        result.admission_links = admLinks.slice(0, 5).map(l => ({ href: l.href, text: l.text }));
        result.foreign_admission_url = admLinks[0].href;
      }
      break;
    }
  }

  // Step 2: If no direct OIA path, scan top page for OIA links
  if (!result.oia_url) {
    const topPage = await fetchWithTimeout(result.website);
    if (topPage) {
      const links = extractLinks(topPage.html, topPage.url);
      const oiaLinks = findOiaLinks(links);
      if (oiaLinks.length > 0) {
        result.oia_url = oiaLinks[0].href;
        result.method = 'top_page_link';

        // Follow OIA link and look for admission
        const oiaPage = await fetchWithTimeout(result.oia_url);
        if (oiaPage) {
          const oiaPageLinks = extractLinks(oiaPage.html, oiaPage.url);
          const admLinks = findAdmissionLinks(oiaPageLinks);
          if (admLinks.length > 0) {
            result.admission_links = admLinks.slice(0, 5).map(l => ({ href: l.href, text: l.text }));
            result.foreign_admission_url = admLinks[0].href;
          }
        }
      }

      // Also check top page directly for admission links
      if (!result.foreign_admission_url) {
        const admLinks = findAdmissionLinks(links);
        if (admLinks.length > 0) {
          result.admission_links = admLinks.slice(0, 5).map(l => ({ href: l.href, text: l.text }));
          result.foreign_admission_url = admLinks[0].href;
          if (!result.oia_url) result.method = 'top_page_admission';
        }
      }
    }
  }

  return result;
}

async function runBatched(items, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);

    const completed = Math.min(i + CONCURRENCY, items.length);
    if (completed % 9 === 0 || completed === items.length) {
      const found = results.filter(r => r.oia_url).length;
      console.log(`  進捗: ${completed}/${items.length}校 (OIA発見: ${found}校)`);
    }
    if (i + CONCURRENCY < items.length) await sleep(DELAY_MS);
  }
  return results;
}

async function main() {
  console.log('=== 國際處URL発見スクリプト ===\n');

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  console.log(`対象: ${schools.length}校\n`);

  const results = await runBatched(schools, discoverSchool);

  // Statistics
  const withOia = results.filter(r => r.oia_url);
  const withAdmission = results.filter(r => r.foreign_admission_url);
  const notFound = results.filter(r => r.method === 'not_found');

  console.log('\n📊 結果:');
  console.log(`   國際處URL発見: ${withOia.length}/${schools.length}校`);
  console.log(`   外國學生招生URL発見: ${withAdmission.length}/${schools.length}校`);
  console.log(`   未発見: ${notFound.length}校`);

  // Save results
  const output = {
    discovered_at: new Date().toISOString(),
    total_schools: schools.length,
    oia_found: withOia.length,
    admission_found: withAdmission.length,
    results,
  };

  await writeFile(
    join(SOURCES_DIR, 'oia-urls.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );

  console.log(`\n✅ 出力: data/sources/oia-urls.json`);

  // List not found schools
  if (notFound.length > 0) {
    console.log(`\n⚠ 未発見の大学 (${notFound.length}校):`);
    notFound.slice(0, 20).forEach(r => console.log(`  - ${r.school_name} (${r.website})`));
    if (notFound.length > 20) console.log(`  ... 他 ${notFound.length - 20}校`);
  }
}

main().catch(console.error);
