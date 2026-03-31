/**
 * 21-fetch-jianzhang-pdf.js
 *
 * Script 20で発見した高確信HTMLページ内部からPDFリンクを抽出し、
 * 外國學生簡章PDFをダウンロードする。
 *
 * 対象: 115學年度（2026年9月入学）学士 秋季班
 *
 * 入力: data/sources/jianzhang-urls.json, data/raw/jianzhang/ (HTMLキャッシュ)
 * 出力: data/raw/jianzhang-pdf/ (PDFファイル)
 *       data/sources/jianzhang-pdf-results.json (結果レポート)
 */

import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');
const PDF_DIR = join(__dirname, '..', 'data', 'raw', 'jianzhang-pdf');

const TIMEOUT_MS = 30000;

function gdriveDirect(viewUrl) {
  const m = viewUrl.match(/\/d\/([^/]+)\//);
  if (!m) return viewUrl;
  return `https://drive.google.com/uc?export=download&id=${m[1]}`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return { url: res.url, html: await res.text() };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

function extractPdfLinks(html, baseUrl) {
  const links = [];
  const seen = new Set();

  const aRegex = /<a[^>]*href=["']([^"']+\.pdf[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = aRegex.exec(html)) !== null) {
    try {
      const resolved = new URL(match[1], baseUrl).href;
      if (seen.has(resolved)) continue;
      seen.add(resolved);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      links.push({ url: resolved, text, source: 'a_tag' });
    } catch { /* skip */ }
  }

  const hrefRegex = /href=["']([^"']+\.pdf[^"']*)["']/gi;
  while ((match = hrefRegex.exec(html)) !== null) {
    try {
      const resolved = new URL(match[1], baseUrl).href;
      if (seen.has(resolved)) continue;
      seen.add(resolved);
      links.push({ url: resolved, text: '', source: 'href_only' });
    } catch { /* skip */ }
  }

  const gdriveRegex = /https:\/\/drive\.google\.com\/file\/d\/[^"'\s]+/g;
  while ((match = gdriveRegex.exec(html)) !== null) {
    if (seen.has(match[0])) continue;
    seen.add(match[0]);
    links.push({ url: match[0], text: 'Google Drive', source: 'gdrive' });
  }

  return links;
}

function scorePdfLink(link) {
  const text = (link.text + ' ' + decodeURIComponent(link.url)).toLowerCase();
  let score = 0;

  if (/外國學生|外國生|foreign.*student|international.*student/i.test(text)) score += 50;
  if (/招生簡章|簡章|prospectus|brochure|handbook/i.test(text)) score += 40;
  if (/admission/i.test(text)) score += 20;

  if (/115/.test(text)) score += 30;
  if (/2026/.test(text)) score += 25;
  if (/114/.test(text)) score += 10;

  if (/秋季|fall/i.test(text)) score += 10;

  if (/僑生|華語|exchange|轉學|碩士|博士|emba|運動|體育|記者/i.test(text)) score -= 100;
  if (/錄取名[冊單]|成績|新聞稿|公告格式/i.test(text)) score -= 80;

  return score;
}

async function downloadPdf(url, schoolId, schoolName) {
  const safeName = schoolName.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '_');
  const filename = `${schoolId}-${safeName}-115.pdf`;
  const filepath = join(PDF_DIR, filename);

  if (await fileExists(filepath)) {
    const content = await readFile(filepath);
    if (content.length > 1000) {
      return { filename, size: content.length, cached: true };
    }
  }

  let dlUrl = url;
  if (url.includes('drive.google.com/file/d/')) {
    dlUrl = gdriveDirect(url);
  }

  const buffer = await fetchBuffer(dlUrl);
  if (!buffer || buffer.length < 500) return null;

  const header = buffer.slice(0, 5).toString('ascii');
  if (header !== '%PDF-') return null;

  await writeFile(filepath, buffer);
  return { filename, size: buffer.length, cached: false };
}

async function processSchool(schoolResult) {
  const { school_id, school_name, jianzhang_candidates } = schoolResult;
  const result = {
    school_id,
    school_name,
    pdf_found: false,
    pdf_filename: null,
    pdf_url: null,
    pdf_score: 0,
    method: 'not_found',
    all_pdf_candidates: [],
  };

  // 高確信HTML候補ページからPDFリンクを探す
  for (const candidate of jianzhang_candidates.filter(c => c.type === 'html' && c.score >= 30)) {
    const page = await fetchHtml(candidate.url);
    if (!page) continue;

    const pdfLinks = extractPdfLinks(page.html, page.url);
    for (const pl of pdfLinks) {
      const score = scorePdfLink(pl);
      result.all_pdf_candidates.push({
        url: pl.url,
        text: pl.text.slice(0, 100),
        score,
        source_page: candidate.url,
      });
    }
  }

  // 直接PDF候補を追加
  for (const candidate of jianzhang_candidates.filter(c => c.type === 'pdf')) {
    const score = scorePdfLink({ text: candidate.text, url: candidate.url });
    result.all_pdf_candidates.push({
      url: candidate.url,
      text: candidate.text.slice(0, 100),
      score: Math.max(score, candidate.score),
      source_page: 'direct',
    });
  }

  // Google Driveリンク
  for (const candidate of jianzhang_candidates) {
    if (candidate.url.includes('drive.google.com')) {
      result.all_pdf_candidates.push({
        url: candidate.url,
        text: candidate.text.slice(0, 100),
        score: scorePdfLink({ text: candidate.text, url: candidate.url }) + 30,
        source_page: 'gdrive',
      });
    }
  }

  // 重複除去・スコア順
  const seen = new Set();
  result.all_pdf_candidates = result.all_pdf_candidates
    .filter(c => {
      if (seen.has(c.url)) return false;
      seen.add(c.url);
      return c.score > 0;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // 最高スコアPDFをダウンロード
  for (const candidate of result.all_pdf_candidates) {
    if (candidate.score < 20) break;

    const dl = await downloadPdf(candidate.url, school_id, school_name);
    if (dl) {
      result.pdf_found = true;
      result.pdf_filename = dl.filename;
      result.pdf_url = candidate.url;
      result.pdf_score = candidate.score;
      result.method = dl.cached ? 'cached' : 'downloaded';
      break;
    }
  }

  return result;
}

async function main() {
  console.log('=== 外國學生簡章 PDFダウンロード (115學年度) ===\n');

  await mkdir(PDF_DIR, { recursive: true });

  const urlData = JSON.parse(await readFile(join(SOURCES_DIR, 'jianzhang-urls.json'), 'utf-8'));

  const targets = urlData.results.filter(r =>
    r.jianzhang_candidates.length > 0 && r.method !== 'not_found'
  );

  console.log(`対象: ${targets.length}校（候補あり）\n`);

  const results = [];
  for (let i = 0; i < targets.length; i++) {
    const school = targets[i];
    console.log(`  [${i + 1}/${targets.length}] ${school.school_id} ${school.school_name}...`);

    const result = await processSchool(school);
    results.push(result);

    if (result.pdf_found) {
      console.log(`    -> PDF ${result.method}: ${result.pdf_filename} (score=${result.pdf_score})`);
    } else if (result.all_pdf_candidates.length > 0) {
      const top = result.all_pdf_candidates[0];
      console.log(`    -> PDF候補あり score=${top.score} DL失敗: ${decodeURIComponent(top.url).slice(0, 80)}`);
    } else {
      console.log(`    -> PDFリンクなし`);
    }

    await sleep(200);
  }

  const downloaded = results.filter(r => r.pdf_found);
  const dlFailed = results.filter(r => !r.pdf_found && r.all_pdf_candidates.length > 0);
  const notFound = results.filter(r => !r.pdf_found && r.all_pdf_candidates.length === 0);

  console.log('\n' + '='.repeat(50));
  console.log('  PDF取得結果');
  console.log('='.repeat(50));
  console.log(`  ダウンロード成功: ${downloaded.length}校`);
  console.log(`  DL失敗（候補あり）: ${dlFailed.length}校`);
  console.log(`  PDFリンクなし: ${notFound.length}校`);

  if (downloaded.length > 0) {
    console.log('\n--- ダウンロード済みPDF ---');
    for (const r of downloaded) {
      console.log(`  ${r.school_id} ${r.school_name}: ${r.pdf_filename}`);
      console.log(`    ${decodeURIComponent(r.pdf_url).slice(0, 120)}`);
    }
  }

  if (dlFailed.length > 0) {
    console.log('\n--- DL失敗（候補あり・要手動確認） ---');
    for (const r of dlFailed) {
      const top = r.all_pdf_candidates[0];
      console.log(`  ${r.school_id} ${r.school_name}: score=${top.score}`);
      console.log(`    ${decodeURIComponent(top.url).slice(0, 120)}`);
    }
  }

  // NotebookLM用PDF一覧
  console.log('\n--- NotebookLM用 PDF一覧 ---');
  console.log(`  保存先: ${PDF_DIR}`);
  try {
    const files = await readdir(PDF_DIR);
    const pdfs = files.filter(f => f.endsWith('.pdf'));
    for (const f of pdfs) {
      const stat = await readFile(join(PDF_DIR, f));
      console.log(`  ${f} (${(stat.length / 1024).toFixed(0)} KB)`);
    }
    console.log(`  合計: ${pdfs.length}件`);
  } catch { /* */ }

  // 完全未発見校
  const allNotFound = urlData.results.filter(r => r.method === 'not_found');
  if (allNotFound.length > 0 || notFound.length > 0) {
    console.log('\n--- 要手動リサーチ ---');
    for (const r of allNotFound) {
      console.log(`  ${r.school_id} ${r.school_name} (URLすら未発見)`);
    }
    for (const r of notFound) {
      console.log(`  ${r.school_id} ${r.school_name} (PDFリンクなし)`);
    }
  }

  await writeFile(
    join(SOURCES_DIR, 'jianzhang-pdf-results.json'),
    JSON.stringify({
      processed_at: new Date().toISOString(),
      target_year: '115學年度',
      total_processed: results.length,
      pdf_downloaded: downloaded.length,
      results,
    }, null, 2),
    'utf-8'
  );

  console.log(`\n  保存: data/sources/jianzhang-pdf-results.json`);
}

main().catch(console.error);
