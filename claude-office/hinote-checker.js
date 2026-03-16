// ============================================
// HiNote Checker — 旧PCで面談を検出・文字起こし保存
// server.jsから起動され、10分間隔でHiNoteをチェック。
// 新規面談を発見したらpendingに保存してSlack通知。
// 新PCの /mendan コマンドがAPIで文字起こしを取得する。
// ============================================
import { chromium } from 'playwright-core';
import { notify } from './notifier.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, execFileSync, spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CDP_PORT = 9222;
const HINOTE_URL = 'https://hinotes.hidock.com/notes';
const STATE_FILE = path.join(__dirname, 'data', 'hinote-state.json');
const PENDING_FILE = path.join(__dirname, 'data', 'mendan-pending.json');
const UTAGE_SPREADSHEET_ID = '1prDgc-Uc3Tm_OEU3ErCs5CK864O87ZJUCtrB_YvK8_U';
const CHECK_INTERVAL = 10 * 60 * 1000; // 10分

let checkTimer = null;
let isChecking = false; // 重複実行防止

// ============================================
// State管理
// ============================================
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { processedNoteIds: [], lastRun: null, totalProcessed: 0, failCounts: {} };
  }
}

function saveState(state) {
  state.lastRun = new Date().toISOString();
  if (state.processedNoteIds.length > 100) {
    state.processedNoteIds = state.processedNoteIds.slice(-100);
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

// ============================================
// Pending管理（検出済み・未処理の面談）
// ============================================
function loadPending() {
  try { return JSON.parse(fs.readFileSync(PENDING_FILE, 'utf-8')); }
  catch { return []; }
}

function savePending(pending) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(pending, null, 2), 'utf-8');
}

// ============================================
// Edge CDP接続
// ============================================
function isPortInUse(port) {
  try {
    execSync(`netstat -ano | findstr ":${port}.*LISTENING"`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function ensureEdgeCDP() {
  if (isPortInUse(CDP_PORT)) return true;

  console.log('[HiNote] Edge CDP起動中...');
  const edgePaths = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];
  const edgePath = edgePaths.find(p => fs.existsSync(p));
  if (!edgePath) {
    console.error('[HiNote] Edge が見つかりません');
    return false;
  }

  const userDataDir = path.join(__dirname, '..', '.playwright-data');
  if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

  spawn(edgePath, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
  ], { detached: true, stdio: 'ignore' }).unref();

  // 起動待ち（最大10秒）
  for (let i = 0; i < 10; i++) {
    try { execSync('timeout /t 1 >nul 2>&1', { shell: true, stdio: 'pipe' }); } catch {}
    if (isPortInUse(CDP_PORT)) {
      console.log('[HiNote] Edge CDP起動完了');
      return true;
    }
  }
  console.error('[HiNote] Edge CDP起動タイムアウト');
  return false;
}

// ============================================
// 面談判定ロジック
// ============================================
const TITLE_PATTERNS = [
  /面談/, /相談/, /ウェビナー後/,
];

const SUMMARY_PATTERNS = [
  /101センター/,
  /(?:リッキー|リキー)/,
  /高校.*(?:留学|台湾|相談|卒業)/,
  /個別.*相談/,
  /オールインワンプラン/,
  /台湾.*(?:大学|留学).*(?:志望|希望|検討|相談)/,
];

const EXCLUDE_PATTERNS = [
  /定例/, /営業MTG/, /スタッフ/, /社内/,
  /動画文字起こし/, /歓迎会/,
];

function isConsultationNote(title, summary = '') {
  if (EXCLUDE_PATTERNS.some(p => p.test(title))) return false;
  if (TITLE_PATTERNS.some(p => p.test(title))) return true;
  if (summary && SUMMARY_PATTERNS.some(p => p.test(summary))) return true;
  return false;
}

// ============================================
// HiNote ページスクレイピング
// ============================================
async function getNotesFromPage(page) {
  return page.evaluate(() => {
    const results = [];
    const main = document.querySelector('main');
    if (!main) return results;

    const headings = main.querySelectorAll('h2');
    for (const h2 of headings) {
      const title = h2.textContent?.trim();
      if (!title) continue;

      const card = h2.closest('[class*="cursor-pointer"]');
      if (!card) continue;

      const row = card.parentElement;
      if (!row) continue;

      const contentWrapper = h2.parentElement;
      const summaryEl = contentWrapper?.querySelector('p');
      const summary = summaryEl?.textContent?.trim() || '';

      let timestamp = '';
      for (const child of row.children) {
        const t = child.textContent?.trim();
        if (t && /^\d{4}\/\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{2}:\d{2}$/.test(t)) {
          timestamp = t;
        }
      }

      if (timestamp) {
        results.push({ title, summary, timestamp });
      }
    }
    return results;
  });
}

async function getNewNotes(page, state) {
  const allNotes = await getNotesFromPage(page);
  return allNotes.filter(n =>
    isConsultationNote(n.title, n.summary) &&
    !state.processedNoteIds.includes(n.timestamp)
  );
}

// ============================================
// 文字起こし抽出
// ============================================
async function extractTranscription(page, noteTitle) {
  const clicked = await page.evaluate((title) => {
    const headings = document.querySelectorAll('main h2');
    for (const h2 of headings) {
      if (h2.textContent?.trim() === title) {
        const card = h2.closest('[class*="cursor-pointer"]');
        if (card) { card.click(); return true; }
      }
    }
    return false;
  }, noteTitle);

  if (!clicked) return null;

  await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
  await page.waitForFunction(
    () => document.querySelector('[role="dialog"]')?.querySelectorAll('em > em').length > 0,
    { timeout: 15000 }
  ).catch(() => {});
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return null;

    const textbox = dialog.querySelector('input, [role="textbox"]');
    const title = textbox?.value || textbox?.textContent?.trim() || '';

    let date = '';
    const paragraphs = dialog.querySelectorAll('p');
    for (const p of paragraphs) {
      const t = p.textContent?.trim();
      if (t && /\d{4}年\d{1,2}月\d{1,2}日/.test(t)) {
        const m = t.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
        date = m ? `${m[1]}/${m[2]}/${m[3]}` : t;
        break;
      }
    }

    const segments = [];
    const outerEms = Array.from(dialog.querySelectorAll('em')).filter(em =>
      em.querySelector('em') && em.parentElement?.tagName !== 'EM'
    );

    for (const em of outerEms) {
      const innerEm = em.querySelector('em');
      const text = innerEm?.textContent?.trim();
      if (!text || text.length < 3) continue;

      let speaker = '';
      let time = '';
      const segment = em.parentElement?.parentElement?.parentElement;
      if (segment) {
        const header = segment.children[0];
        if (header) {
          for (const child of header.querySelectorAll('*')) {
            if (child.children.length > 0) continue;
            const ct = child.textContent?.trim();
            if (!ct) continue;
            if (/^(Speaker \d+|未知の話者|話者\s*\d*)$/.test(ct)) speaker = ct;
            if (/^\d{2}:\d{2}:\d{2}$/.test(ct)) time = ct;
          }
        }
      }
      segments.push({ speaker, time, text });
    }

    let transcription = '';
    for (const seg of segments) {
      transcription += `\n[${seg.speaker || '話者不明'}] ${seg.time}\n`;
      transcription += seg.text + '\n';
    }

    return {
      title,
      date,
      transcription: transcription.trim(),
      segmentCount: segments.length,
    };
  });

  return data;
}

async function closeDialog(page) {
  try {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
    const stillOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
    if (stillOpen) {
      await page.goto(HINOTE_URL, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(3000);
    }
  } catch {}
}

// ============================================
// 名前抽出
// ============================================
function extractNameFromTitle(title) {
  const patterns = [
    /^(.+?)さん[：:]/,
    /^(.+?)様\s/,
    /^(.+?)さん\s/,
  ];
  for (const p of patterns) {
    const m = title.match(p);
    if (m) return m[1].trim();
  }
  return null;
}

// ============================================
// UTAGE参加者情報取得
// ============================================
async function lookupParticipant(name) {
  if (!name) return null;
  try {
    const params = JSON.stringify({
      spreadsheetId: UTAGE_SPREADSHEET_ID,
      range: 'A:G',
    });
    const raw = execFileSync(process.env.ComSpec, [
      '/c', 'gws', 'sheets', 'spreadsheets', 'values', 'get', '--params', params,
    ], { encoding: 'utf-8', timeout: 15000 });

    const data = JSON.parse(raw);
    const rows = data.values || [];
    if (rows.length < 2) return null;

    const nameParts = name.replace(/\s+/g, '');
    for (let i = rows.length - 1; i >= 1; i--) {
      const row = rows[i];
      const cellName = (row[2] || '').replace(/\s+/g, '');
      const cellKana = (row[3] || '').replace(/\s+/g, '');
      if (cellName.includes(nameParts) || nameParts.includes(cellName) ||
          cellKana.includes(nameParts) || nameParts.includes(cellKana)) {
        return {
          date: row[0] || '',
          lineName: row[1] || '',
          name: row[2] || '',
          kana: row[3] || '',
          target: row[4] || '',
          grade: row[5] || '',
          content: row[6] || '',
        };
      }
    }
    return null;
  } catch (err) {
    console.error('[HiNote] UTAGE検索エラー:', err.message);
    return null;
  }
}

// ============================================
// メインチェック処理
// ============================================
async function checkHiNote() {
  if (isChecking) {
    console.log('[HiNote] 前回のチェックがまだ実行中。スキップ');
    return;
  }
  isChecking = true;

  console.log(`[HiNote] チェック開始: ${new Date().toISOString()}`);

  try {
    const cdpReady = ensureEdgeCDP();
    if (!cdpReady) {
      console.error('[HiNote] Edge CDP接続不可');
      return;
    }

    let browser;
    try {
      browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
    } catch (err) {
      console.error('[HiNote] CDP接続エラー:', err.message);
      return;
    }

    const state = loadState();
    let page;
    let reusingTab = false;

    try {
      const context = browser.contexts()[0];
      const existingPages = context.pages();
      page = existingPages.find(p => p.url().includes('hinotes.hidock.com'));

      if (page) {
        reusingTab = true;
        console.log('[HiNote] 既存タブを再利用');
        await page.reload({ waitUntil: 'load', timeout: 30000 });
      } else {
        page = await context.newPage();
        await page.goto(HINOTE_URL, { waitUntil: 'load', timeout: 30000 });
      }
      await page.waitForTimeout(3000);

      // ログイン確認
      const isLoggedIn = await page.evaluate(() => {
        const all = document.querySelectorAll('*');
        for (const el of all) {
          if (el.textContent?.trim() === 'すべてのノート' && el.children.length === 0) return true;
        }
        return false;
      });
      if (!isLoggedIn) {
        console.error('[HiNote] ログインセッション切れ');
        await notify('[HiNote] ログインセッション切れ。旧PCのEdgeで https://hinotes.hidock.com にログインしてください');
        return;
      }

      // 新規ノート検出
      const newNotes = await getNewNotes(page, state);
      if (newNotes.length === 0) {
        console.log('[HiNote] 新規ノートなし');
        saveState(state);
        return;
      }

      // 失敗回数フィルタ
      const MAX_RETRIES = 3;
      if (!state.failCounts) state.failCounts = {};
      const retryableNotes = newNotes.filter(n => {
        const fails = state.failCounts[n.timestamp] || 0;
        if (fails >= MAX_RETRIES) {
          console.log(`[HiNote] スキップ（${fails}回失敗）: ${n.title}`);
          return false;
        }
        return true;
      });

      if (retryableNotes.length === 0) {
        console.log(`[HiNote] 処理対象なし（全てスキップ済み）`);
        saveState(state);
        return;
      }

      console.log(`[HiNote] ${retryableNotes.length}件の新規面談ノートを検出`);

      // 各ノートを処理
      for (const note of retryableNotes) {
        console.log(`[HiNote] 処理中: ${note.title}`);

        try {
          // 文字起こし抽出
          const data = await extractTranscription(page, note.title);
          if (!data || !data.transcription) {
            console.error(`[HiNote] 文字起こし抽出失敗: ${note.title}`);
            state.failCounts[note.timestamp] = (state.failCounts[note.timestamp] || 0) + 1;
            saveState(state);
            await closeDialog(page);
            continue;
          }

          await closeDialog(page);

          // 名前抽出 + UTAGE検索
          const name = extractNameFromTitle(note.title);
          console.log(`[HiNote] 名前: ${name || '(タイトルから特定不可)'}`);

          const participant = await lookupParticipant(name);
          if (participant) {
            console.log(`[HiNote] UTAGE情報: ${participant.name} (${participant.grade})`);
          }

          // pendingに保存
          const pending = loadPending();
          const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            noteTitle: note.title,
            noteTimestamp: note.timestamp,
            name: name || null,
            date: data.date,
            transcription: data.transcription,
            segmentCount: data.segmentCount,
            participant: participant || null,
            detectedAt: new Date().toISOString(),
            status: 'pending',
          };
          pending.unshift(entry);
          savePending(pending);

          // 処理済みに追加
          state.processedNoteIds.push(note.timestamp);
          state.totalProcessed++;
          saveState(state);

          // Slack通知
          await notify(
            `[面談検出] ${name || note.title}\n` +
            `日時: ${data.date}\n` +
            `セグメント: ${data.segmentCount}件\n\n` +
            `新PCで /mendan を実行してください`
          );

          console.log(`[HiNote] 面談検出・保存完了: ${note.title} (id: ${entry.id})`);

        } catch (err) {
          state.failCounts[note.timestamp] = (state.failCounts[note.timestamp] || 0) + 1;
          saveState(state);
          console.error(`[HiNote] ノート処理エラー: ${note.title}`, err.message);
          await notify(`[面談検出エラー] ${note.title}: ${err.message}`);
          await closeDialog(page);
        }
      }
    } finally {
      if (page && !reusingTab) await page.close().catch(() => {});
      if (browser) browser.close().catch(() => {});
    }

    console.log('[HiNote] チェック完了');
  } catch (err) {
    console.error('[HiNote] 致命的エラー:', err.message);
  } finally {
    isChecking = false;
  }
}

// ============================================
// 公開API関数
// ============================================
export function startHiNoteChecker() {
  console.log(`[HiNote] 監視開始（${CHECK_INTERVAL / 60000}分間隔）`);

  // 初回は30秒後に実行（サーバー起動直後にEdge起動が間に合わない場合の猶予）
  setTimeout(() => {
    checkHiNote().catch(err => console.error('[HiNote] 初回チェックエラー:', err.message));
  }, 30000);

  checkTimer = setInterval(() => {
    checkHiNote().catch(err => console.error('[HiNote] チェックエラー:', err.message));
  }, CHECK_INTERVAL);
}

export function stopHiNoteChecker() {
  if (checkTimer) {
    clearInterval(checkTimer);
    checkTimer = null;
    console.log('[HiNote] 監視停止');
  }
}

export function getPendingMendans() {
  return loadPending().filter(m => m.status === 'pending');
}

export function getAllMendans() {
  return loadPending();
}

export function claimMendan(id) {
  const pending = loadPending();
  const entry = pending.find(m => m.id === id);
  if (!entry || entry.status !== 'pending') return null;
  entry.status = 'claimed';
  entry.claimedAt = new Date().toISOString();
  savePending(pending);
  return entry;
}

export function completeMendan(id) {
  const pending = loadPending();
  const entry = pending.find(m => m.id === id);
  if (!entry) return null;
  entry.status = 'done';
  entry.completedAt = new Date().toISOString();
  savePending(pending);
  return entry;
}
