// ============================================
// HiNote Monitor
// HiNoteの「個別相談」カテゴリを監視し、
// 新しい文字起こしを検出したらmendan workflowを自動実行
// ============================================
import { chromium } from 'playwright-core';
import { runClaude } from './claude-runner.js';
import { notify } from './notifier.js';
import config from './config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CDP_PORT = 9222;
const HINOTE_URL = 'https://hinotes.hidock.com/notes';
const STATE_FILE = path.join(__dirname, 'data', 'hinote-state.json');
const PROMPT_TEMPLATE = path.join(__dirname, 'prompts', 'mendan-auto.md');
const START_EDGE_BAT = path.join(__dirname, '..', 'scripts', 'start-edge-cdp.bat');
const TMP_TRANSCRIPTION = path.join(__dirname, 'data', 'tmp-transcription.txt');
const UTAGE_SPREADSHEET_ID = '1prDgc-Uc3Tm_OEU3ErCs5CK864O87ZJUCtrB_YvK8_U';

// CLI引数
const args = process.argv.slice(2);
const LIST_ONLY = args.includes('--list-only');
const DRY_RUN = args.includes('--dry-run');
const EXTRACT_LATEST = args.includes('--extract-latest');

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

async function ensureEdgeCDP() {
  if (isPortInUse(CDP_PORT)) return true;

  console.log('[HiNote] Edge CDP未起動。起動します...');
  try {
    execSync(`"${START_EDGE_BAT}"`, { stdio: 'ignore', timeout: 5000 });
  } catch {}

  await new Promise(r => setTimeout(r, 3000));
  return isPortInUse(CDP_PORT);
}

// ============================================
// HiNote ノートリスト解析
// ============================================
// 面談判定: タイトル（手動/Google Calendar同期）+ 要約テキスト（AI自動生成タイトル対策）
const TITLE_PATTERNS = [
  /面談/, /相談/, /ウェビナー後/,
];

// 要約テキストに含まれていれば面談と判定するパターン
const SUMMARY_PATTERNS = [
  /101センター/,
  /(?:リッキー|リキー)/,
  /高校.*(?:留学|台湾|相談|卒業)/,
  /個別.*相談/,
  /オールインワンプラン/,
  /台湾.*(?:大学|留学).*(?:志望|希望|検討|相談)/,
];

// タイトルにこれが含まれていたら面談ではない（社内会議等）
const EXCLUDE_PATTERNS = [
  /定例/, /営業MTG/, /スタッフ/, /社内/,
  /動画文字起こし/, /歓迎会/,
];

function isConsultationNote(title, summary = '') {
  // 除外パターンに該当 → 面談ではない
  if (EXCLUDE_PATTERNS.some(p => p.test(title))) return false;

  // タイトルが手動パターンにマッチ → 面談
  if (TITLE_PATTERNS.some(p => p.test(title))) return true;

  // タイトルにマッチしない場合、要約テキストで判定（AI自動生成タイトル対策）
  if (summary && SUMMARY_PATTERNS.some(p => p.test(summary))) return true;

  return false;
}

async function getNotesFromPage(page) {
  // 「すべてのノート」タブを使用（「個別相談」タブは最近のノートが入っていない）
  // DOM構造: main > generic > generic[] > { generic[cursor=pointer](card), generic(timestamp) }
  // card内: generic(icon) + generic( h2(title) + p(summary) )
  const notes = await page.evaluate(() => {
    const results = [];
    const main = document.querySelector('main');
    if (!main) return results;

    // main直下のコンテナ内を走査
    const headings = main.querySelectorAll('h2');

    for (const h2 of headings) {
      const title = h2.textContent?.trim();
      if (!title) continue;

      // h2はcard内にある。cardの親（行wrapper）の末尾にタイムスタンプがある
      // h2 → parent(generic=content) → parent(generic[cursor=pointer]=card) → parent(generic=row)
      const card = h2.closest('[class*="cursor-pointer"]');
      if (!card) continue;

      const row = card.parentElement;
      if (!row) continue;

      // h2の兄弟要素のpタグから要約テキストを取得
      const contentWrapper = h2.parentElement;
      const summaryEl = contentWrapper?.querySelector('p');
      const summary = summaryEl?.textContent?.trim() || '';

      // 行wrapper内の最後の子要素がタイムスタンプ
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

  return notes;
}

async function getNewNotes(page, state) {
  const allNotes = await getNotesFromPage(page);

  // タイトル+要約で面談ノートをフィルタ + 未処理のみ
  return allNotes.filter(n =>
    isConsultationNote(n.title, n.summary) &&
    !state.processedNoteIds.includes(n.timestamp)
  );
}

// ============================================
// 文字起こし抽出
// ============================================
async function extractTranscription(page, noteTitle) {
  // タイトルの h2 要素をクリック（evaluate経由で確実にクリック）
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

  // ダイアログが表示されるまで待機（div[role="dialog"]）
  await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
  // 文字起こしコンテンツの読み込みを待つ（em要素が出現するまで）
  await page.waitForFunction(
    () => document.querySelector('[role="dialog"]')?.querySelectorAll('em > em').length > 0,
    { timeout: 15000 }
  ).catch(() => {});
  await page.waitForTimeout(1000);

  // ダイアログ内から文字起こしデータを抽出
  // DOM構造:
  //   dialog > generic > generic > generic(header: textbox + paragraph[date])
  //                               generic(content: segments[])
  //   各segment: generic( generic(speaker + timestamp + img), emphasis>emphasis(text) )
  const data = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return null;

    // タイトル: textbox内のテキスト
    const textbox = dialog.querySelector('input, [role="textbox"]');
    const title = textbox?.value || textbox?.textContent?.trim() || '';

    // 日時: "2026年3月12日木曜日 20:00 GMT+9" パターン
    let date = '';
    const paragraphs = dialog.querySelectorAll('p');
    for (const p of paragraphs) {
      const t = p.textContent?.trim();
      if (t && /\d{4}年\d{1,2}月\d{1,2}日/.test(t)) {
        // "2026年3月12日木曜日 20:00 GMT+9" → "2026/3/12"
        const m = t.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
        date = m ? `${m[1]}/${m[2]}/${m[3]}` : t;
        break;
      }
    }

    // 文字起こしセグメント抽出
    // 構造: セグメント(div) > [ヘッダー(div), テキスト(div > div > em > em)]
    // em → parent → parent → parent でセグメントコンテナ到達
    const segments = [];
    const outerEms = Array.from(dialog.querySelectorAll('em')).filter(em =>
      em.querySelector('em') && em.parentElement?.tagName !== 'EM'
    );

    for (const em of outerEms) {
      const innerEm = em.querySelector('em');
      const text = innerEm?.textContent?.trim();
      if (!text || text.length < 3) continue;

      // 3段上がりでセグメントコンテナ、最初の子がヘッダー
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

    // テキスト整形
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
    // ダイアログが閉じたか確認
    const stillOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
    if (stillOpen) {
      // ESCで閉じなかった場合、ノート一覧に戻る
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
    /^(.+?)さん[：:]/,      // "宮内 美侑さん：..."
    /^(.+?)様\s/,           // "鈴木様 ..."
    /^(.+?)さん\s/,         // "〇〇さん ..."
  ];
  for (const p of patterns) {
    const m = title.match(p);
    if (m) return m[1].trim();
  }
  return null;
}

// ============================================
// UTAGE スプレッドシートから参加者情報を取得
// ============================================
// 列: A=参加日程, B=LINE名, C=お名前, D=フリガナ, E=ご相談される方, F=学年, G=ご相談内容
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

    // ヘッダー行をスキップして検索
    // 名前の部分一致（姓 or フルネーム）で探す
    const nameParts = name.replace(/\s+/g, '');
    for (let i = rows.length - 1; i >= 1; i--) {
      const row = rows[i];
      const cellName = (row[2] || '').replace(/\s+/g, '');  // C列: お名前
      const cellKana = (row[3] || '').replace(/\s+/g, '');  // D列: フリガナ

      if (cellName.includes(nameParts) || nameParts.includes(cellName) ||
          cellKana.includes(nameParts) || nameParts.includes(cellKana)) {
        return {
          date: row[0] || '',       // 参加日程
          lineName: row[1] || '',   // LINE名
          name: row[2] || '',       // お名前
          kana: row[3] || '',       // フリガナ
          target: row[4] || '',     // ご相談される方
          grade: row[5] || '',      // 学年
          content: row[6] || '',    // ご相談内容
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
// mendan実行
// ============================================
async function runMendan(name, date, transcription, participant) {
  // 文字起こしが長い場合はファイル経由で渡す
  const useFile = transcription.length > 8000;
  if (useFile) {
    fs.writeFileSync(TMP_TRANSCRIPTION, transcription, 'utf-8');
  }

  const template = fs.readFileSync(PROMPT_TEMPLATE, 'utf-8');
  const transcriptionBlock = useFile
    ? `（文字起こしは ${TMP_TRANSCRIPTION} に保存しました。Readツールで読み込んでください）`
    : transcription;

  // UTAGE参加者情報があればプロンプトに追加
  let participantBlock = '';
  if (participant) {
    participantBlock = [
      '\n## UTAGE申し込みフォーム情報（自動取得）',
      `- LINE名: ${participant.lineName}`,
      `- お名前: ${participant.name}`,
      `- フリガナ: ${participant.kana}`,
      `- ご相談される方: ${participant.target}`,
      `- 学年: ${participant.grade}`,
      `- ご相談内容: ${participant.content}`,
      `- 参加日程: ${participant.date}`,
    ].join('\n');
  }

  const prompt = template
    .replaceAll('{{name}}', name || '不明')
    .replaceAll('{{date}}', date || new Date().toLocaleDateString('ja-JP'))
    .replaceAll('{{transcription}}', transcriptionBlock)
    .replaceAll('{{participant_info}}', participantBlock);

  if (DRY_RUN) {
    const dryRunFile = path.join(__dirname, 'data', 'mendan-dry-run.md');
    fs.writeFileSync(dryRunFile, prompt, 'utf-8');
    console.log(`[HiNote] dry-run: プロンプトを ${dryRunFile} に保存しました (${prompt.length}文字)`);
    return { ok: true, result: 'dry-run' };
  }

  return runClaude(prompt, {
    maxTurns: 25,
    timeout: 10 * 60 * 1000,
    allowedTools: [
      'Read', 'Write', 'Edit', 'Bash', 'Glob', 'Grep',
      'mcp__plugin_asana_asana__asana_create_task',
      'mcp__plugin_asana_asana__asana_set_parent_for_task',
    ],
  });
}

// ============================================
// LINE通知
// ============================================
async function safeNotify(message) {
  try {
    await notify(message);
  } catch (err) {
    console.error('[HiNote] LINE通知失敗:', err.message);
  }
}

// ============================================
// メイン処理
// ============================================
async function main() {
  console.log(`[HiNote] 監視開始: ${new Date().toISOString()} (mode: ${LIST_ONLY ? 'list-only' : DRY_RUN ? 'dry-run' : EXTRACT_LATEST ? 'extract-latest' : 'normal'})`);

  // 1. Edge CDP確認
  const cdpReady = await ensureEdgeCDP();
  if (!cdpReady) {
    console.error('[HiNote] Edge CDPに接続できません');
    return;
  }

  // 2. ブラウザ接続
  let browser;
  try {
    browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  } catch (err) {
    console.error('[HiNote] CDP接続エラー:', err.message);
    return;
  }

  const state = loadState();
  let page;

  try {
    // 3. 新タブでHiNoteを開く
    const context = browser.contexts()[0];
    page = await context.newPage();
    await page.goto(HINOTE_URL, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000); // SPA描画完了を待つ

    // ログイン確認: main内にh2要素があるか（ノートが表示されているか）
    const isLoggedIn = await page.evaluate(() => {
      // 「すべてのノート」テキストの存在確認
      const all = document.querySelectorAll('*');
      for (const el of all) {
        if (el.textContent?.trim() === 'すべてのノート' && el.children.length === 0) return true;
      }
      return false;
    });
    if (!isLoggedIn) {
      console.error('[HiNote] ログインセッション切れ');
      await safeNotify('[HiNote] ログインセッション切れ。Edgeで https://hinotes.hidock.com にログインしてください');
      return;
    }

    // --- list-only モード ---
    if (LIST_ONLY) {
      const notes = await getNotesFromPage(page);
      console.log(`\n=== HiNote ノート一覧 (${notes.length}件) ===`);
      for (const n of notes) {
        const isConsult = isConsultationNote(n.title) ? ' [面談]' : '';
        const processed = state.processedNoteIds.includes(n.timestamp) ? ' [処理済]' : '';
        console.log(`  ${n.timestamp} | ${n.title}${isConsult}${processed}`);
      }
      return;
    }

    // --- extract-latest モード ---
    if (EXTRACT_LATEST) {
      const notes = await getNotesFromPage(page);
      const consultNotes = notes.filter(n => isConsultationNote(n.title));
      if (consultNotes.length === 0) {
        console.log('[HiNote] 面談ノートがありません');
        return;
      }
      const latest = consultNotes[0];
      console.log(`\n=== 最新ノート抽出テスト ===`);
      console.log(`タイトル: ${latest.title}`);
      console.log(`日時: ${latest.timestamp}`);

      const data = await extractTranscription(page, latest.title);
      if (data) {
        console.log(`抽出日時: ${data.date}`);
        console.log(`セグメント数: ${data.segmentCount}`);
        console.log(`\n--- 文字起こし (最初500文字) ---`);
        console.log(data.transcription.substring(0, 500));
        console.log(`\n--- 合計 ${data.transcription.length} 文字 ---`);
      } else {
        console.log('抽出失敗');
      }
      await closeDialog(page);
      return;
    }

    // --- 通常モード ---
    // 4. 新規ノート検出
    const newNotes = await getNewNotes(page, state);
    if (newNotes.length === 0) {
      console.log('[HiNote] 新規ノートなし');
      saveState(state); // lastRun を更新
      return;
    }

    // 失敗回数が多いノートを除外（3回失敗でスキップ）
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
      console.log(`[HiNote] 処理対象なし（${newNotes.length}件は全てスキップ済み）`);
      saveState(state);
      return;
    }

    console.log(`[HiNote] ${retryableNotes.length}件の新規ノートを処理`);

    // 5. 各ノートを処理
    for (const note of retryableNotes) {
      console.log(`[HiNote] 処理中: ${note.title}`);

      try {
        // 5a. 文字起こし抽出
        const data = await extractTranscription(page, note.title);
        if (!data || !data.transcription) {
          console.error(`[HiNote] 文字起こし抽出失敗: ${note.title}`);
          state.failCounts[note.timestamp] = (state.failCounts[note.timestamp] || 0) + 1;
          saveState(state);
          await closeDialog(page);
          continue;
        }

        await closeDialog(page);

        // 5b. 名前抽出 + UTAGE参加者情報取得
        const name = extractNameFromTitle(note.title);
        console.log(`[HiNote] 名前: ${name || '(タイトルから特定不可)'}`);

        const participant = await lookupParticipant(name);
        if (participant) {
          console.log(`[HiNote] UTAGE情報: ${participant.name} (${participant.grade})`);
        }

        // 5c-5d. mendan実行
        const result = await runMendan(name, data.date, data.transcription, participant);

        if (result.ok) {
          // 5e. 成功
          state.processedNoteIds.push(note.timestamp);
          state.totalProcessed++;
          saveState(state);

          await safeNotify(
            `[面談分析完了] ${name || note.title}\n\n` +
            `📊 分析レポート: 面談分析まとめ.md に追記\n` +
            `📱 LINE下書き4通: LINE下書きまとめ.md に追記\n` +
            `📋 Asana: メインタスク + サブタスク4件作成`
          );
          const sec = result.duration ? `${Math.round(result.duration / 1000)}秒` : 'dry-run';
          console.log(`[HiNote] 完了: ${note.title} (${sec})`);
        } else {
          // 5f. 失敗 → failCountsをインクリメント（MAX_RETRIES回で諦める）
          state.failCounts[note.timestamp] = (state.failCounts[note.timestamp] || 0) + 1;
          saveState(state);
          console.error(`[HiNote] mendan実行失敗 (${state.failCounts[note.timestamp]}/${MAX_RETRIES}): ${result.error}`);
          await safeNotify(
            `[面談分析エラー] ${name || note.title}\n` +
            `エラー: ${(result.error || '').substring(0, 200)}`
          );
        }
      } catch (err) {
        state.failCounts[note.timestamp] = (state.failCounts[note.timestamp] || 0) + 1;
        saveState(state);
        console.error(`[HiNote] ノート処理エラー (${state.failCounts[note.timestamp]}/${MAX_RETRIES}): ${note.title}`, err.message);
        await safeNotify(`[面談分析エラー] ${note.title}: ${err.message}`);
        await closeDialog(page);
      }
    }
  } finally {
    // 6. タブを閉じる（Edgeは閉じない）
    if (page) await page.close().catch(() => {});
    if (browser) browser.close().catch(() => {});
  }

  console.log('[HiNote] 監視完了');
}

main().catch(err => {
  console.error('[HiNote] 致命的エラー:', err);
  process.exit(1);
});
