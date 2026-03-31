/**
 * 20-discover-jianzhang.js
 *
 * OIA/招生ページを2層クロールして外國學生簡章のURL（PDF/HTML）を特定し、
 * PDFは自動ダウンロードする（NotebookLM管理用）。
 *
 * 対象: 115學年度（2026年9月入学）学士 秋季班
 *
 * 入力: data/sources/oia-urls.json, data/final/schools.json, data/sources/jianzhang-foreign/
 * 出力: data/sources/jianzhang-urls.json
 * PDF保存: data/raw/jianzhang-pdf/
 * HTMLキャッシュ: data/raw/jianzhang/
 */

import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const JIANZHANG_DIR = join(SOURCES_DIR, 'jianzhang-foreign');
const CACHE_DIR = join(__dirname, '..', 'data', 'raw', 'jianzhang');
const PDF_DIR = join(__dirname, '..', 'data', 'raw', 'jianzhang-pdf');

const CONCURRENCY = 3;
const DELAY_MS = 300;
const TIMEOUT_MS = 20000;

// 全129校を対象（フィルタなし）
// 既にPDF取得済み or jianzhang-foreign調査済みの学校はスキップ

// 除外パターン（僑生・交換留学・語学研修・大学院など）
const EXCLUDE_PATTERNS = [
  /僑生/, /華語/, /chinese language/i, /exchange/i, /短期/,
  /暑期/, /summer/i, /雙聯/, /dual degree/i, /碩士在職/,
  /EMBA/i, /在職專班/, /推甄/, /繁星/, /指考/, /學測/,
  /轉學/, /transfer/i,
];

// OIA URL未発見の大学に対する直接アクセスURL
const MANUAL_OIA_URLS = {
  '04': 'https://www.ncnu.edu.tw/p/412-1000-33606.php',
  '39': 'https://oia.thu.edu.tw/',
  '46': 'https://dwaa.cjcu.edu.tw/',
  '68': 'https://oia.cmu.edu.tw/',
  '75': 'https://oia.nkust.edu.tw/',
  '86': 'https://oic.cyut.edu.tw/',
};

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function urlHash(url) {
  return createHash('md5').update(url).digest('hex').slice(0, 8);
}

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchRaw(url, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8,ja;q=0.7',
      },
      redirect: 'follow',
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return res;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetchRaw(url);
    if (res) return res;
    if (i < retries - 1) await sleep(2000 * (i + 1));
  }
  return null;
}

async function fetchHtmlCached(url, schoolId, depth) {
  const cacheFile = join(CACHE_DIR, `${schoolId}-d${depth}-${urlHash(url)}.html`);
  if (await fileExists(cacheFile)) {
    const cached = await readFile(cacheFile, 'utf-8');
    if (cached === '__PDF__') return { url, html: '', isPdf: true };
    if (cached === '__FAIL__') return null;
    return { url, html: cached, isPdf: false };
  }

  const res = await fetchWithRetry(url);
  if (!res) {
    await writeFile(cacheFile, '__FAIL__', 'utf-8');
    return null;
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('pdf') || url.toLowerCase().endsWith('.pdf')) {
    await writeFile(cacheFile, '__PDF__', 'utf-8');
    return { url: res.url, html: '', isPdf: true };
  }

  const html = await res.text();
  await writeFile(cacheFile, html, 'utf-8');
  return { url: res.url, html, isPdf: false };
}

/** PDFをダウンロードしてローカルに保存 */
async function downloadPdf(url, schoolId, schoolName) {
  const safeName = schoolName.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '_');
  const filename = `${schoolId}-${safeName}-115.pdf`;
  const filepath = join(PDF_DIR, filename);

  if (await fileExists(filepath)) {
    return { path: filepath, filename, cached: true };
  }

  const res = await fetchWithRetry(url);
  if (!res) return null;

  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(filepath, buffer);
  return { path: filepath, filename, cached: false };
}

function extractLinks(html, baseUrl) {
  const links = [];
  const seen = new Set();
  const aTagRegex = /<a[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = aTagRegex.exec(html)) !== null) {
    try {
      const href = match[1].trim();
      if (href.startsWith('javascript:') || href.startsWith('mailto:')) continue;
      const resolved = new URL(href, baseUrl).href;
      if (seen.has(resolved)) continue;
      seen.add(resolved);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      const isPdf = resolved.toLowerCase().endsWith('.pdf');
      links.push({ href: resolved, text, isPdf });
    } catch { /* skip invalid URLs */ }
  }
  return links;
}

function scoreLink(link) {
  const text = link.text;
  const url = link.href.toLowerCase();
  let score = 0;

  // 最高優先: 「外國學生招生簡章」
  if (/外國學生.*招生簡章|外國學生.*簡章/.test(text)) score += 100;
  if (/外國學生.*admission|foreign.*student.*admission/i.test(text)) score += 90;

  // 高優先: 「外國學生」「外國生」
  if (/外國學生|外國生/.test(text)) score += 60;
  if (/foreign\s*student|international\s*student/i.test(text)) score += 55;
  if (/international\s*degree/i.test(text)) score += 50;

  // 中優先: 「招生簡章」「入學申請」
  if (/招生簡章/.test(text)) score += 40;
  if (/入學申請|admission/i.test(text)) score += 30;
  if (/學位生|degree/i.test(text)) score += 25;

  // URLパターンボーナス
  if (/foreign|international|oia/i.test(url)) score += 15;
  if (/admission|apply|enroll/i.test(url)) score += 10;

  // PDFボーナス
  if (link.isPdf) score += 20;

  // 115學年度 / 2026ボーナス（最新）
  if (/115/.test(text) || /115/.test(url)) score += 25;
  if (/2026/.test(text) || /2026/.test(url)) score += 20;
  // 114もOK（まだ115が出ていない場合）
  if (/114/.test(text) || /114/.test(url)) score += 10;

  // 学士（大學部/undergraduate）ボーナス
  if (/大學部|學士|undergraduate|bachelor/i.test(text)) score += 10;

  // 秋季ボーナス
  if (/秋季|fall/i.test(text)) score += 5;

  // 除外パターン減点
  for (const pat of EXCLUDE_PATTERNS) {
    if (pat.test(text)) { score -= 80; break; }
  }

  return score;
}

async function discoverSchool(school, oiaEntry) {
  const result = {
    school_id: school.id,
    school_name: school.name.cht,
    start_urls: [],
    jianzhang_candidates: [],
    pdf_downloaded: null,
    pages_crawled: 0,
    method: 'not_found',
  };

  // 起点URLを収集
  const startUrls = new Set();
  if (oiaEntry?.oia_url && !oiaEntry.oia_url.startsWith('javascript:')) {
    startUrls.add(oiaEntry.oia_url);
  }
  if (oiaEntry?.foreign_admission_url && !oiaEntry.foreign_admission_url.startsWith('javascript:')) {
    startUrls.add(oiaEntry.foreign_admission_url);
  }
  if (oiaEntry?.admission_links) {
    for (const l of oiaEntry.admission_links) {
      if (l.href && !l.href.startsWith('javascript:')) startUrls.add(l.href);
    }
  }
  if (MANUAL_OIA_URLS[school.id]) {
    startUrls.add(MANUAL_OIA_URLS[school.id]);
  }
  // フォールバック: 大学トップページからOIA系パスを推測
  const website = school.website?.cht?.replace(/\/$/, '') || '';
  if (website && startUrls.size === 0) {
    for (const path of ['/oia/', '/oic/', '/international/']) {
      startUrls.add(website + path);
    }
  }

  result.start_urls = [...startUrls];
  if (startUrls.size === 0) return result;

  const allCandidates = [];
  const visitedUrls = new Set();

  // === Depth 0: 起点ページをクロール ===
  for (const url of startUrls) {
    if (visitedUrls.has(url)) continue;
    visitedUrls.add(url);

    const page = await fetchHtmlCached(url, school.id, 0);
    if (!page) continue;
    result.pages_crawled++;

    if (page.isPdf) {
      allCandidates.push({
        url: page.url || url, type: 'pdf', text: '(direct PDF)', depth: 0, score: 80,
      });
      continue;
    }

    const links = extractLinks(page.html, page.url || url);

    // 起点ページ自体の簡章キーワードチェック
    const pageText = page.html.replace(/<[^>]*>/g, '');
    if (/外國學生.*招生/.test(pageText) || /foreign.*student.*admission/i.test(pageText)) {
      allCandidates.push({
        url: page.url || url, type: 'html', text: '(admission page)', depth: 0, score: 50,
      });
    }

    for (const link of links) {
      const score = scoreLink(link);
      if (score >= 20) {
        allCandidates.push({
          url: link.href, type: link.isPdf ? 'pdf' : 'html',
          text: link.text.slice(0, 120), depth: 0, score,
        });
      }
    }
  }

  // === Depth 1: スコアの高いHTMLページをさらにクロール ===
  const depth0Html = allCandidates
    .filter(c => c.type === 'html' && c.score >= 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  for (const candidate of depth0Html) {
    if (visitedUrls.has(candidate.url)) continue;
    visitedUrls.add(candidate.url);

    const page = await fetchHtmlCached(candidate.url, school.id, 1);
    if (!page) continue;
    result.pages_crawled++;

    if (page.isPdf) {
      allCandidates.push({
        url: page.url || candidate.url, type: 'pdf',
        text: candidate.text + ' -> PDF', depth: 1, score: candidate.score + 20,
      });
      continue;
    }

    const links = extractLinks(page.html, page.url || candidate.url);
    for (const link of links) {
      if (visitedUrls.has(link.href)) continue;
      const score = scoreLink(link);
      if (score >= 20) {
        allCandidates.push({
          url: link.href, type: link.isPdf ? 'pdf' : 'html',
          text: link.text.slice(0, 120), depth: 1, score,
        });
      }
    }
  }

  // 結果を整理: 重複除去 → スコア順トップ10
  const sorted = allCandidates
    .sort((a, b) => b.score - a.score)
    .filter((c, i, arr) => arr.findIndex(x => x.url === c.url) === i)
    .slice(0, 10);

  result.jianzhang_candidates = sorted;

  if (sorted.length > 0) {
    const topScore = sorted[0].score;
    if (topScore >= 80) result.method = 'high_confidence';
    else if (topScore >= 40) result.method = 'medium_confidence';
    else result.method = 'low_confidence';
  }

  // 最高スコアのPDF候補があればダウンロード
  const topPdf = sorted.find(c => c.type === 'pdf' && c.score >= 40);
  if (topPdf) {
    const dl = await downloadPdf(topPdf.url, school.id, school.name.cht);
    if (dl) {
      result.pdf_downloaded = dl.filename;
    }
  }

  return result;
}

async function main() {
  console.log('=== 外國學生簡章 URL深層探索 (115學年度) ===\n');

  await mkdir(CACHE_DIR, { recursive: true });
  await mkdir(PDF_DIR, { recursive: true });

  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const oiaData = JSON.parse(await readFile(join(SOURCES_DIR, 'oia-urls.json'), 'utf-8'));
  const oiaMap = new Map(oiaData.results.map(r => [r.school_id, r]));

  // 既存リサーチ済みIDを取得（jianzhang-foreignの.jsonファイル）
  const researchedIds = new Set();
  try {
    const files = await readdir(JIANZHANG_DIR);
    for (const f of files.filter(f => f.endsWith('.json'))) {
      const data = JSON.parse(await readFile(join(JIANZHANG_DIR, f), 'utf-8'));
      if (data.school_id) researchedIds.add(data.school_id);
    }
  } catch { /* no data yet */ }

  // 既存PDF取得済みIDを取得（jianzhang-pdf/のPDFファイル名からIDを抽出）
  const pdfIds = new Set();
  try {
    const pdfFiles = await readdir(PDF_DIR);
    for (const f of pdfFiles.filter(f => f.endsWith('.pdf'))) {
      const idMatch = f.match(/^([A-Z0-9]+)-/);
      if (idMatch) pdfIds.add(idMatch[1]);
    }
  } catch { /* no pdfs yet */ }

  const skipIds = new Set([...researchedIds, ...pdfIds]);

  const targets = schools.filter(s => !skipIds.has(s.id));

  console.log(`全校数: ${schools.length}校`);
  console.log(`PDF取得済み: ${pdfIds.size}校 (${[...pdfIds].sort().join(', ')})`);
  console.log(`リサーチ済み: ${researchedIds.size}校 (${[...researchedIds].sort().join(', ')})`);
  console.log(`スキップ合計: ${skipIds.size}校`);
  console.log(`対象: ${targets.length}校`);
  console.log(`PDF保存先: data/raw/jianzhang-pdf/\n`);

  const startTime = Date.now();
  const results = [];
  const errors = [];

  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const batch = targets.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (school) => {
        try {
          return await discoverSchool(school, oiaMap.get(school.id));
        } catch (err) {
          errors.push({ school_id: school.id, error: err.message });
          return {
            school_id: school.id, school_name: school.name.cht,
            start_urls: [], jianzhang_candidates: [],
            pdf_downloaded: null, pages_crawled: 0, method: 'error',
          };
        }
      })
    );
    results.push(...batchResults);

    const completed = Math.min(i + CONCURRENCY, targets.length);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    const found = results.filter(r => r.jianzhang_candidates.length > 0).length;
    const pdfs = results.filter(r => r.pdf_downloaded).length;
    console.log(`  [${completed}/${targets.length}] 発見:${found} PDF:${pdfs} (${elapsed}s)`);

    if (i + CONCURRENCY < targets.length) await sleep(DELAY_MS);
  }

  // 統計
  const highConf = results.filter(r => r.method === 'high_confidence');
  const medConf = results.filter(r => r.method === 'medium_confidence');
  const lowConf = results.filter(r => r.method === 'low_confidence');
  const notFound = results.filter(r => r.method === 'not_found');
  const errored = results.filter(r => r.method === 'error');
  const pdfCount = results.filter(r => r.pdf_downloaded).length;
  const totalPages = results.reduce((s, r) => s + r.pages_crawled, 0);
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(50));
  console.log('  簡章URL探索 完了');
  console.log('='.repeat(50));
  console.log(`  高確信: ${highConf.length}校`);
  console.log(`  中確信: ${medConf.length}校`);
  console.log(`  低確信: ${lowConf.length}校`);
  console.log(`  未発見: ${notFound.length}校`);
  console.log(`  エラー: ${errored.length}校`);
  console.log(`  PDF保存: ${pdfCount}件`);
  console.log(`  クロール: ${totalPages}ページ / ${totalTime}秒`);

  if (highConf.length > 0) {
    console.log('\n--- 高確信 (簡章PDF/専用ページ発見) ---');
    for (const r of highConf) {
      const top = r.jianzhang_candidates[0];
      console.log(`  ${r.school_id} ${r.school_name}: ${top.type.toUpperCase()} score=${top.score}`);
      console.log(`     ${top.url.slice(0, 120)}`);
      if (r.pdf_downloaded) console.log(`     PDF: ${r.pdf_downloaded}`);
    }
  }
  if (medConf.length > 0) {
    console.log('\n--- 中確信 (関連ページ発見) ---');
    for (const r of medConf) {
      const top = r.jianzhang_candidates[0];
      console.log(`  ${r.school_id} ${r.school_name}: ${top.type.toUpperCase()} score=${top.score}`);
      console.log(`     ${top.url.slice(0, 120)}`);
    }
  }
  if (lowConf.length > 0) {
    console.log('\n--- 低確信 ---');
    for (const r of lowConf) {
      const top = r.jianzhang_candidates[0];
      console.log(`  ${r.school_id} ${r.school_name}: ${top.type.toUpperCase()} score=${top.score} "${top.text.slice(0,40)}"`);
    }
  }
  if (notFound.length > 0) {
    console.log('\n--- 未発見 ---');
    for (const r of notFound) {
      console.log(`  ${r.school_id} ${r.school_name} (起点:${r.start_urls.length} crawled:${r.pages_crawled})`);
    }
  }

  // PDFダウンロード一覧
  const downloadedPdfs = results.filter(r => r.pdf_downloaded);
  if (downloadedPdfs.length > 0) {
    console.log('\n--- NotebookLM用 PDF一覧 ---');
    console.log(`  保存先: data/raw/jianzhang-pdf/`);
    for (const r of downloadedPdfs) {
      console.log(`  ${r.pdf_downloaded}`);
    }
  }

  // 保存
  const output = {
    discovered_at: new Date().toISOString(),
    target_year: '115學年度 (2026年9月入学)',
    target_schools: targets.length,
    high_confidence: highConf.length,
    medium_confidence: medConf.length,
    low_confidence: lowConf.length,
    not_found: notFound.length,
    pdf_downloaded: pdfCount,
    results,
  };

  await writeFile(
    join(SOURCES_DIR, 'jianzhang-urls-all.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );
  console.log(`\n  保存: data/sources/jianzhang-urls-all.json`);

  if (errors.length > 0) {
    await writeFile(
      join(SOURCES_DIR, 'jianzhang-errors.json'),
      JSON.stringify(errors, null, 2),
      'utf-8'
    );
  }

  console.log(`\n  次のステップ: node scripts/21-parse-jianzhang-html.js`);
}

main().catch(err => {
  console.error('致命的エラー:', err.message);
  process.exit(1);
});
