# HiNote リモート検出（A案）Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** HiNote面談検出を旧PC（hp-spectre-14）に移し、新PCのブラウザを開かずに済むようにする

**Architecture:** 旧PCのserver.jsにHiNote監視モジュールを組み込み、10分周期でEdge CDP経由でスクレイピング。新規面談発見時はSlack通知 + REST API公開。新PCの/mendanコマンドはAPIから文字起こしを取得して分析実行。

**Tech Stack:** Node.js, Express, playwright-core, Edge CDP, Tailscale

---

## File Structure

| ファイル | 操作 | 役割 |
|---------|------|------|
| `claude-office/hinote-checker.js` | CREATE | HiNote監視モジュール（server.jsから起動） |
| `claude-office/server.js` | MODIFY | マージコンフリクト解決 + API追加 + checker起動 |
| `scripts/setup-ssh.ps1` | CREATE | 旧PCにOpenSSH Server設定 |
| `.claude/commands/mendan.md` | MODIFY | APIから文字起こし取得に変更 |

---

## Chunk 1: SSH Setup

### Task 1: SSHセットアップスクリプト作成

**Files:**
- Create: `scripts/setup-ssh.ps1`

- [ ] **Step 1: setup-ssh.ps1 を作成**

```powershell
# OpenSSH Server のインストール・設定
# 旧PCのデプロイAPI経由で実行する想定
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
# ファイアウォールルール（Tailscale経由なのでWindowsファイアウォールは通常通過するが念のため）
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22 -ErrorAction SilentlyContinue
```

- [ ] **Step 2: デプロイAPIでSSH設定を実行**

旧PC（100.74.20.91:3848）にgit pullしてからPowerShellでsetup-ssh.ps1を実行。

- [ ] **Step 3: SSH接続テスト**

```bash
ssh 100.74.20.91 "hostname"
# Expected: hp-spectre-14 (or similar)
```

- [ ] **Step 4: Commit**

```bash
git add scripts/setup-ssh.ps1
git commit -m "feat: 旧PCリモート管理用SSHセットアップスクリプト追加"
```

---

## Chunk 2: HiNote Checker Module

### Task 2: hinote-checker.js 作成

**Files:**
- Create: `claude-office/hinote-checker.js`
- Reference: `claude-office/hinote-monitor.js` (ロジック移植元)

hinote-monitor.jsから検出・抽出ロジックを抽出し、server.jsのライフサイクルに組み込めるモジュールとして再構成する。

主要な違い:
- スタンドアロン実行ではなくexport関数として提供
- 検出した文字起こしを `data/mendan-pending.json` に保存
- Slack通知で新PC側に知らせる
- API経由で新PCが文字起こしを取得可能

- [ ] **Step 1: モジュール基本構造を作成**

```javascript
// hinote-checker.js — HiNote監視モジュール（server.jsから起動）
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
```

- [ ] **Step 2: Edge CDP起動 + 面談判定ロジック（hinote-monitor.jsから移植）**

isConsultationNote, getNotesFromPage, getNewNotes, extractTranscription, closeDialog, extractNameFromTitle, lookupParticipant をそのまま移植。

ensureEdgeCDPはNode.jsから直接Edgeをspawnする方式に変更（bat不要）:

```javascript
function ensureEdgeCDP() {
  if (isPortInUse(CDP_PORT)) return true;
  console.log('[HiNote] Edge CDP起動中...');
  const edgePaths = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];
  const edgePath = edgePaths.find(p => fs.existsSync(p));
  if (!edgePath) { console.error('[HiNote] Edge not found'); return false; }
  const userDataDir = path.join(__dirname, '..', '.playwright-data');
  spawn(edgePath, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
  ], { detached: true, stdio: 'ignore' }).unref();
  // 起動待ち（同期的にポーリング）
  for (let i = 0; i < 10; i++) {
    execSync('timeout /t 1 >nul 2>&1', { shell: true });
    if (isPortInUse(CDP_PORT)) return true;
  }
  return false;
}
```

- [ ] **Step 3: pending保存 + 通知ロジック**

```javascript
function loadPending() {
  try { return JSON.parse(fs.readFileSync(PENDING_FILE, 'utf-8')); }
  catch { return []; }
}

function savePending(pending) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(pending, null, 2), 'utf-8');
}

// 新規面談をpendingに追加してSlack通知
async function addPending(note, transcriptionData, participant) {
  const pending = loadPending();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    noteTitle: note.title,
    noteTimestamp: note.timestamp,
    name: extractNameFromTitle(note.title) || null,
    date: transcriptionData.date,
    transcription: transcriptionData.transcription,
    segmentCount: transcriptionData.segmentCount,
    participant: participant || null,
    detectedAt: new Date().toISOString(),
    status: 'pending', // pending → claimed → done
  };
  pending.unshift(entry);
  savePending(pending);
  return entry;
}
```

- [ ] **Step 4: メインチェックループ**

```javascript
async function checkHiNote() {
  console.log(`[HiNote] チェック開始: ${new Date().toISOString()}`);
  const cdpReady = ensureEdgeCDP();
  if (!cdpReady) { console.error('[HiNote] Edge CDP接続不可'); return; }

  let browser;
  try {
    browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  } catch (err) {
    console.error('[HiNote] CDP接続エラー:', err.message);
    return;
  }

  const state = loadState();
  let page, reusingTab = false;

  try {
    const context = browser.contexts()[0];
    const existingPages = context.pages();
    page = existingPages.find(p => p.url().includes('hinotes.hidock.com'));
    if (page) {
      reusingTab = true;
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
      if (fails >= MAX_RETRIES) return false;
      return true;
    });

    if (retryableNotes.length === 0) { saveState(state); return; }

    // 各ノートを処理
    for (const note of retryableNotes) {
      try {
        const data = await extractTranscription(page, note.title);
        if (!data || !data.transcription) {
          state.failCounts[note.timestamp] = (state.failCounts[note.timestamp] || 0) + 1;
          saveState(state);
          await closeDialog(page);
          continue;
        }
        await closeDialog(page);

        const name = extractNameFromTitle(note.title);
        const participant = await lookupParticipant(name);

        // pendingに保存
        const entry = await addPending(note, data, participant);

        // 処理済みに追加
        state.processedNoteIds.push(note.timestamp);
        state.totalProcessed++;
        saveState(state);

        // 通知
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
        await closeDialog(page);
      }
    }
  } finally {
    if (page && !reusingTab) await page.close().catch(() => {});
    if (browser) browser.close().catch(() => {});
  }
}
```

- [ ] **Step 5: 公開API関数 + タイマー管理**

```javascript
export function startHiNoteChecker() {
  console.log(`[HiNote] 監視開始（${CHECK_INTERVAL / 60000}分間隔）`);
  checkHiNote().catch(err => console.error('[HiNote] 初回チェックエラー:', err.message));
  checkTimer = setInterval(() => {
    checkHiNote().catch(err => console.error('[HiNote] チェックエラー:', err.message));
  }, CHECK_INTERVAL);
}

export function stopHiNoteChecker() {
  if (checkTimer) { clearInterval(checkTimer); checkTimer = null; }
}

export function getPendingMendans() {
  return loadPending().filter(m => m.status === 'pending');
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
```

- [ ] **Step 6: Commit**

```bash
git add claude-office/hinote-checker.js
git commit -m "feat: HiNote監視モジュール — 旧PCで検出・文字起こし保存"
```

---

## Chunk 3: Server.js Integration

### Task 3: server.js にマージコンフリクト解決 + API追加

**Files:**
- Modify: `claude-office/server.js`

- [ ] **Step 1: マージコンフリクト解決**

両方のimportと起動コードを残す（morning-briefing AND salary-scheduler）。

- [ ] **Step 2: hinote-checker import追加**

```javascript
import { startHiNoteChecker, getPendingMendans, claimMendan, completeMendan } from "./hinote-checker.js";
```

- [ ] **Step 3: mendan API routes追加**

```javascript
// GET /api/mendan/pending — 未処理の面談一覧
app.get("/api/mendan/pending", (_req, res) => {
  res.json(getPendingMendans());
});

// POST /api/mendan/:id/claim — 面談を処理中にマーク
app.post("/api/mendan/:id/claim", (req, res) => {
  const entry = claimMendan(req.params.id);
  if (!entry) return res.status(404).json({ error: "not found or already claimed" });
  res.json({ ok: true, mendan: entry });
});

// POST /api/mendan/:id/done — 面談処理完了
app.post("/api/mendan/:id/done", (req, res) => {
  const entry = completeMendan(req.params.id);
  if (!entry) return res.status(404).json({ error: "not found" });
  res.json({ ok: true, mendan: entry });
});
```

- [ ] **Step 4: app.listen内でchecker起動**

```javascript
// Start HiNote mendan checker (every 10 min)
startHiNoteChecker();
```

- [ ] **Step 5: Commit**

```bash
git add claude-office/server.js
git commit -m "feat: server.js — mendan API追加 + HiNote checker起動"
```

---

## Chunk 4: Mendan Command Update

### Task 4: /mendan コマンドをAPI取得方式に更新

**Files:**
- Modify: `.claude/commands/mendan.md`

- [ ] **Step 1: ステップ1-2を旧PC API取得に変更**

新しいフロー:
1. `GET http://100.74.20.91:3848/api/mendan/pending` で未処理面談を取得
2. 面談があれば自動的に文字起こしとUTAGE情報を使用（質問不要）
3. なければ従来通りユーザーに手動入力を依頼
4. API取得時は `POST /api/mendan/{id}/claim` で処理中にマーク
5. 完了時は `POST /api/mendan/{id}/done` で完了マーク

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/mendan.md
git commit -m "feat: /mendan コマンド — 旧PC APIから文字起こし自動取得"
```

---

## Chunk 5: Deploy & Verification

### Task 5: デプロイ・初期設定・動作確認

- [ ] **Step 1: git push**
- [ ] **Step 2: デプロイAPIで旧PCにコード配信**
- [ ] **Step 3: SSHセットアップ実行（PowerShell経由）**
- [ ] **Step 4: SSH接続確認**
- [ ] **Step 5: 旧PCでEdge CDPを起動しHiNoteにログイン確認**
- [ ] **Step 6: /api/mendan/pending APIの動作確認**
- [ ] **Step 7: 新PCで /mendan コマンド実行テスト**
