# Spectre モーニングブリーフィング + Gap修正 実装プラン

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Spectreに毎朝8時のSlackブリーフィング配信（Asanaタスク・広告数値・Gmail・Calendar）とSlack自由会話のコンテキスト注入を追加する

**Architecture:** `morning-briefing-slack.js` が5つのデータソース（Asana API・Google Sheets・Gmail・Calendar・ローカルmd）を並列取得し、整形してSlack配信。server.jsのcronスケジューラで毎朝8:00 JST実行。slack-listener.jsにコマンド追加でオンデマンド実行も可能。

**Tech Stack:** Node.js (ES Modules) / googleapis / Asana REST API / Slack Webhook / Express

---

## ファイル構成

| アクション | ファイル | 責務 |
|---|---|---|
| 新規作成 | `claude-office/morning-briefing-slack.js` | 全データソース取得 → 整形 → Slack配信 |
| 修正 | `claude-office/server.js` | cronスケジューラ追加（毎朝8:00 JST） |
| 修正 | `claude-office/slack-listener.js` | 「ブリーフィング」コマンド追加 + 自由会話コンテキスト注入 |
| 修正 | `claude-office/config.js` | Asana PAT設定追加 |

---

## Chunk 1: モーニングブリーフィング

### Task 1: config.jsにAsana設定追加

**Files:**
- Modify: `claude-office/config.js`

- [ ] **Step 1: config.jsにasanaセクションを追加**

```js
// config.js の export default 内に追加:
asana: {
  pat: env.ASANA_PAT || "",
  contractProjectId: "1209960384497212",
},
```

asanaオブジェクトを `deploy` の後に追加する。

- [ ] **Step 2: .envにASANA_PATが存在するか確認**

旧PCの.envに `ASANA_PAT` がない場合、後でデプロイ時に追加が必要。新PCの.envを確認:

```bash
grep ASANA_PAT "C:/Users/newgo/Claude用/.worktrees/spectre-briefing/claude-office/.env"
```

存在しなければ、Asana API tokenを.envに追加する必要がある（手動作業）。

- [ ] **Step 3: コミット**

```bash
git add claude-office/config.js
git commit -m "feat(spectre): config.jsにAsana設定を追加"
```

---

### Task 2: morning-briefing-slack.js — Asanaタスク取得

**Files:**
- Create: `claude-office/morning-briefing-slack.js`

- [ ] **Step 1: ファイル作成 — Asanaデータ取得関数**

```js
// ============================================
// モーニングブリーフィング（Slack配信）
// Asana・広告Spreadsheet・Gmail・Calendar・ローカルmdから情報収集
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
import { sendSlack } from "./notifier.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// Asana API
// ============================================
const ASANA_BASE = "https://app.asana.com/api/1.0";
const CONTRACT_PROJECT_ID = config.asana?.contractProjectId || "1209960384497212";

// セクションの表示順（パイプライン）
const PIPELINE_SECTIONS = [
  "見込み客", "フォーム記入待ち", "契約書作成依頼", "契約書送信済",
  "締結済", "入金確認済", "BAND招待済み", "担当者挨拶済み",
];

async function asanaApi(endpoint, params = {}) {
  const pat = config.asana?.pat;
  if (!pat) return { data: [], error: "ASANA_PAT not set" };

  const url = new URL(`${ASANA_BASE}${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${pat}` },
  });
  if (!res.ok) return { data: [], error: `HTTP ${res.status}` };
  return res.json();
}

/**
 * 今日・期限超過・明日以降のタスクを取得
 */
async function fetchAsanaTasks() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // 3日先までのタスクを取得
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 3);
  const futureStr = futureDate.toISOString().split("T")[0];

  const result = await asanaApi(
    `/workspaces/${config.asana?.workspaceId || "1208442893224580"}/tasks/search`,
    {
      "projects.any": CONTRACT_PROJECT_ID,
      completed: "false",
      "due_on.before": futureStr,
      "opt_fields": "name,due_on,memberships.section.name",
      limit: "50",
      sort_by: "due_date",
      sort_ascending: "true",
    }
  );

  if (result.error) return { overdue: [], today: [], upcoming: [], error: result.error };

  const tasks = result.data || [];
  const overdue = [];
  const todayTasks = [];
  const upcoming = [];

  for (const t of tasks) {
    if (!t.due_on) continue;
    const section = t.memberships?.[0]?.section?.name || "";
    const entry = { name: t.name, due: t.due_on, section };

    if (t.due_on < todayStr) overdue.push(entry);
    else if (t.due_on === todayStr) todayTasks.push(entry);
    else upcoming.push(entry);
  }

  return { overdue, today: todayTasks, upcoming, error: null };
}

/**
 * パイプライン（セクション別タスク数）を取得
 */
async function fetchPipeline() {
  const sectionsRes = await asanaApi(`/projects/${CONTRACT_PROJECT_ID}/sections`);
  if (sectionsRes.error) return { sections: [], error: sectionsRes.error };

  const counts = {};
  for (const s of (sectionsRes.data || [])) {
    if (!PIPELINE_SECTIONS.includes(s.name)) continue;
    const tasksRes = await asanaApi(`/sections/${s.gid}/tasks`, {
      completed_since: "now",
      opt_fields: "gid",
      limit: "100",
    });
    counts[s.name] = (tasksRes.data || []).length;
  }

  return { counts, error: null };
}

export { fetchAsanaTasks, fetchPipeline };
```

- [ ] **Step 2: コミット**

```bash
git add claude-office/morning-briefing-slack.js
git commit -m "feat(spectre): morning-briefing-slack.js Asana取得関数を作成"
```

---

### Task 3: morning-briefing-slack.js — Google API（Sheets・Gmail・Calendar）

**Files:**
- Modify: `claude-office/morning-briefing-slack.js`

- [ ] **Step 1: Google API取得関数を追加**

ファイル末尾の `export` の前に以下を追加:

```js
// ============================================
// Google APIs（googleapis — invoice-poller.jsと同じOAuth）
// ============================================
import { google } from "googleapis";

function getGoogleAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

/**
 * 広告Spreadsheetから前日の数値を取得
 */
async function fetchAdsData() {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const SPREADSHEET_ID = "1lq2N5KtvdNaFqZweEaN2n3nAoFuHRrWKUU8TIseZN_M";
    // 日次生データは「Meta広告_生データ」シート
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Meta広告_生データ!A:G",
    });

    const rows = res.data.values || [];
    if (rows.length < 2) return { error: "No data" };

    // ヘッダー: 日付,広告費,インプレッション,リーチ数,クリック数,LINE登録数,フリークエンシー
    const header = rows[0];
    const lastRow = rows[rows.length - 1];

    const data = {};
    for (let i = 0; i < header.length; i++) {
      data[header[i]] = lastRow[i];
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Gmail未読メール（重要なもの上位5件）
 */
async function fetchGmail() {
  try {
    const auth = getGoogleAuth();
    const gmail = google.gmail({ version: "v1", auth });

    const unread = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread newer_than:3d",
      maxResults: 10,
    });

    const msgs = unread.data.messages || [];
    const count = unread.data.resultSizeEstimate || msgs.length;
    const details = [];

    for (const m of msgs.slice(0, 5)) {
      const detail = await gmail.users.messages.get({
        userId: "me",
        id: m.id,
        format: "metadata",
        metadataHeaders: ["From", "Subject"],
      });
      const from = detail.data.payload.headers.find(h => h.name === "From")?.value || "";
      const subject = detail.data.payload.headers.find(h => h.name === "Subject")?.value || "";
      const shortFrom = from.replace(/<.*>/, "").trim().slice(0, 20);
      details.push({ from: shortFrom, subject: subject.slice(0, 50) });
    }

    return { count, details, error: null };
  } catch (err) {
    return { count: 0, details: [], error: err.message };
  }
}

/**
 * Google Calendar 今日の予定
 */
async function fetchCalendar() {
  try {
    const auth = getGoogleAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 10,
    });

    const events = (res.data.items || []).map(e => ({
      time: e.start.dateTime
        ? new Date(e.start.dateTime).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
        : "終日",
      summary: e.summary || "(無題)",
    }));

    return { events, error: null };
  } catch (err) {
    return { events: [], error: err.message };
  }
}
```

- [ ] **Step 2: export行を更新**

ファイル末尾のexportを更新:

```js
export { fetchAsanaTasks, fetchPipeline, fetchAdsData, fetchGmail, fetchCalendar };
```

- [ ] **Step 3: コミット**

```bash
git add claude-office/morning-briefing-slack.js
git commit -m "feat(spectre): Google API取得関数を追加（Sheets・Gmail・Calendar）"
```

---

### Task 4: morning-briefing-slack.js — 整形 + Slack配信

**Files:**
- Modify: `claude-office/morning-briefing-slack.js`

- [ ] **Step 1: ブリーフィング整形関数とメインexportを追加**

```js
// ============================================
// ブリーフィング整形 + 配信
// ============================================

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00+09:00");
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function formatTasks(asana) {
  const lines = [];

  if (asana.overdue.length > 0) {
    lines.push("⚠️ 期限超過:");
    for (const t of asana.overdue) {
      const sec = t.section ? `（${t.section}）` : "";
      lines.push(`・${t.name}${sec}— ${formatDate(t.due)}期限`);
    }
    lines.push("");
  }

  if (asana.today.length > 0) {
    lines.push("📌 本日期限:");
    for (const t of asana.today) {
      const sec = t.section ? `（${t.section}）` : "";
      lines.push(`・${t.name}${sec}`);
    }
    lines.push("");
  }

  if (asana.upcoming.length > 0) {
    lines.push("📅 直近（3日以内）:");
    for (const t of asana.upcoming.slice(0, 5)) {
      lines.push(`・${t.name}（${formatDate(t.due)}）`);
    }
  }

  return lines.length > 0 ? lines.join("\n") : "タスクなし";
}

function formatPipeline(pipeline) {
  if (pipeline.error) return `取得エラー: ${pipeline.error}`;
  const parts = PIPELINE_SECTIONS
    .filter(s => pipeline.counts[s] !== undefined)
    .map(s => `${s}: ${pipeline.counts[s]}`);
  return parts.join(" → ");
}

function formatAds(ads) {
  if (ads.error) return `取得エラー: ${ads.error}`;
  if (!ads.data) return "データなし";
  const d = ads.data;
  const cost = d["広告費"] ? `¥${Number(d["広告費"]).toLocaleString()}` : "?";
  const clicks = d["クリック数"] || "?";
  const regs = d["LINE登録数"] || "0";
  const date = d["日付"] || "?";
  return `${date} | 広告費: ${cost} | クリック: ${clicks} | LINE登録: ${regs}`;
}

function formatGmail(gmail) {
  if (gmail.error) return `取得エラー: ${gmail.error}`;
  if (gmail.count === 0) return "未読なし";
  const lines = [`未読 ${gmail.count}件:`];
  for (const m of gmail.details) {
    lines.push(`・[${m.from}] ${m.subject}`);
  }
  return lines.join("\n");
}

function formatCalendar(cal) {
  if (cal.error) return `取得エラー: ${cal.error}`;
  if (cal.events.length === 0) return "予定なし";
  return cal.events.map(e => `・${e.time} ${e.summary}`).join("\n");
}

/**
 * ブリーフィングを生成してSlackに送信
 */
export async function runMorningBriefing() {
  console.log("[Briefing] Starting morning briefing...");

  // 5つのデータソースを並列取得
  const [asana, pipeline, ads, gmail, cal] = await Promise.all([
    fetchAsanaTasks().catch(e => ({ overdue: [], today: [], upcoming: [], error: e.message })),
    fetchPipeline().catch(e => ({ counts: {}, error: e.message })),
    fetchAdsData().catch(e => ({ data: null, error: e.message })),
    fetchGmail().catch(e => ({ count: 0, details: [], error: e.message })),
    fetchCalendar().catch(e => ({ events: [], error: e.message })),
  ]);

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;

  const message = `おはようございます、リッキーさん。${dateStr}のブリーフィングでございます。

━━ タスク ━━
${formatTasks(asana)}

━━ パイプライン ━━
${formatPipeline(pipeline)}

━━ 広告 ━━
${formatAds(ads)}

━━ Gmail ━━
${formatGmail(gmail)}

━━ 本日の予定 ━━
${formatCalendar(cal)}

ご確認事項があればお申し付けください。`;

  const result = await sendSlack(message);
  console.log(`[Briefing] ${result.ok ? "Sent to Slack" : `Failed: ${result.error}`}`);
  return { ok: result.ok, message };
}
```

- [ ] **Step 2: コミット**

```bash
git add claude-office/morning-briefing-slack.js
git commit -m "feat(spectre): ブリーフィング整形+Slack配信を実装"
```

---

### Task 5: server.jsにcronスケジューラ追加

**Files:**
- Modify: `claude-office/server.js`

- [ ] **Step 1: importを追加**

server.js先頭のimportブロックに追加:

```js
import { runMorningBriefing } from "./morning-briefing-slack.js";
```

- [ ] **Step 2: cronスケジューラ関数を追加**

`app.listen` の前（Routes セクションの後）に追加:

```js
// ---------------------------------------------------------------------------
// Cron: Morning Briefing (毎朝 8:00 JST)
// ---------------------------------------------------------------------------
function scheduleMorningBriefing() {
  function msUntilNext8am() {
    const now = new Date();
    const next = new Date(now);
    next.setHours(8, 0, 0, 0);
    if (now >= next) next.setDate(next.getDate() + 1);
    return next - now;
  }

  function schedule() {
    const ms = msUntilNext8am();
    const hours = (ms / 3600000).toFixed(1);
    console.log(`[Cron] Next morning briefing in ${hours}h`);

    setTimeout(async () => {
      try {
        await runMorningBriefing();
      } catch (err) {
        console.error("[Cron] Morning briefing error:", err.message);
      }
      schedule(); // 次の日をスケジュール
    }, ms);
  }

  schedule();
}
```

- [ ] **Step 3: app.listen内で起動**

`startSlackListener()` の後に追加:

```js
  // Schedule morning briefing (daily 8:00 JST)
  scheduleMorningBriefing();
```

- [ ] **Step 4: APIエンドポイント追加（手動トリガー用）**

Routes セクションの適切な位置に追加:

```js
// ---------------------------------------------------------------------------
// Routes: Morning Briefing
// ---------------------------------------------------------------------------
app.post("/api/briefing", async (_req, res) => {
  try {
    const result = await runMorningBriefing();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- [ ] **Step 5: コミット**

```bash
git add claude-office/server.js
git commit -m "feat(spectre): モーニングブリーフィングcronスケジューラを追加"
```

---

## Chunk 2: Slackコマンド + Gap修正

### Task 6: slack-listener.jsに「ブリーフィング」コマンド追加

**Files:**
- Modify: `claude-office/slack-listener.js`

- [ ] **Step 1: importを追加**

ファイル先頭のimportブロックに追加:

```js
import { runMorningBriefing } from "./morning-briefing-slack.js";
```

- [ ] **Step 2: processMessage関数にブリーフィングコマンドを追加**

`processMessage` 関数内、ヘルプコマンド（セクション2）の後、スキルコマンド（セクション3）の前に追加:

```js
  // === 2.5. ブリーフィングコマンド ===
  if (text === "ブリーフィング" || text === "briefing" || text === "おはよう") {
    await reply("ブリーフィングを準備いたします...");
    try {
      await runMorningBriefing();
    } catch (err) {
      await reply(`ブリーフィング生成でエラーが発生いたしました: ${err.message}`);
    }
    return;
  }
```

- [ ] **Step 3: コミット**

```bash
git add claude-office/slack-listener.js
git commit -m "feat(spectre): Slackに「ブリーフィング」コマンドを追加"
```

---

### Task 7: slack-listener.jsの自由会話にコンテキスト注入

**Files:**
- Modify: `claude-office/slack-listener.js`

- [ ] **Step 1: importを追加**

ファイル先頭のimportブロックに追加:

```js
import { lookupCustomerContext, formatContextForPrompt } from "./context-lookup.js";
```

- [ ] **Step 2: processMessageのセクション5（自由会話）を修正**

現在のセクション5（スペクターとの自由会話）を以下に置き換え:

```js
  // === 5. スペクターとの自由会話（コンテキスト付き） ===
  try {
    // テキスト内に顧客名が含まれている可能性があるのでコンテキスト検索
    const ctx = lookupCustomerContext(text);
    const contextBlock = formatContextForPrompt(ctx);
    const contextInfo = contextBlock
      ? `\n\n以下の顧客情報が見つかりました:\n${contextBlock}\n`
      : "";

    const { runClaude } = await import("./claude-runner.js");
    const prompt = `${SPECTRE_CHAT_PROMPT}${contextInfo}\n\nリッキーさんからのメッセージ:\n${text}\n\n簡潔に回答してください。`;
    const result = await runClaude(prompt, { maxTurns: 1, timeout: 50000, allowedTools: [] });

    let response = result.ok
      ? result.result
      : `申し訳ございません。エラーが発生いたしました: ${result.error}`;

    response = stripInsight(response);
    if (!response) response = "申し訳ございません。応答を生成できませんでした。";

    await reply(response);
  } catch (err) {
    console.error(`[Slack] Claude error: ${err.message}`);
    await reply(`スペクターでございます。処理中にエラーが発生いたしました: ${err.message}`);
  }
```

- [ ] **Step 3: コミット**

```bash
git add claude-office/slack-listener.js
git commit -m "feat(spectre): Slack自由会話にコンテキスト検索を追加"
```

---

### Task 8: ローカル動作確認 + デプロイ

- [ ] **Step 1: server.jsの起動テスト**

```bash
cd "C:/Users/newgo/Claude用/.worktrees/spectre-briefing/claude-office" && "C:/Program Files/nodejs/node.exe" -e "import('./morning-briefing-slack.js').then(m => console.log('Import OK:', Object.keys(m)))"
```

importが成功し、export関数一覧が表示されることを確認。

- [ ] **Step 2: API経由でブリーフィング手動テスト**

ローカルでserver.jsを起動し、ブリーフィングAPIを叩く:

```bash
curl -X POST http://localhost:3848/api/briefing
```

Slackにブリーフィングが配信されることを確認。

- [ ] **Step 3: masterにマージ**

```bash
cd "C:/Users/newgo/Claude用"
git checkout master
git merge feature/spectre-briefing
```

- [ ] **Step 4: 旧PCにデプロイ**

```bash
curl -X POST http://100.74.20.91:3848/api/deploy -H "Content-Type: application/json" -d '{"secret":"DEPLOY_SECRET_VALUE"}'
```

- [ ] **Step 5: 旧PCの.envにASANA_PATを追加（手動作業が必要な場合）**

instructionsエンドポイント経由で旧PCに指示:

```bash
curl -X POST http://100.74.20.91:3848/instructions -H "Content-Type: application/json" -d '{"text":"ASANA_PATを.envに追加してください"}'
```

- [ ] **Step 6: デプロイ後のE2Eテスト**

Slackで「ブリーフィング」と送信し、ブリーフィングが配信されることを確認。
