# タスクスケジューラ自動化5本 実装プラン

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 5つの定期タスクをNode.jsスクリプト + bat + タスクスケジューラで実装する

**Architecture:** 各タスクは独立したNode.jsスクリプト。既存のconfig.js（.env読み込み）とgoogleapis npmを共有。batファイル経由でschtasksから実行。結果はdata/に出力。

**Tech Stack:** Node.js, googleapis, fs, Windows Task Scheduler (schtasks)

---

## Chunk 1: インフラ＋簡単な2本

### Task 1: 旧PCの自動git pull（最も簡単・batのみ）

**Files:**
- Create: `claude-office/auto-git-pull.bat`

**スケジュール:** 毎日 04:00（旧PCのみ）

- [ ] **Step 1: batファイル作成**

```bat
@echo off
cd /d "%~dp0.."
git pull origin master >> "%~dp0data\git-pull.log" 2>&1
echo [%date% %time%] git pull completed >> "%~dp0data\git-pull.log"
```

- [ ] **Step 2: テスト実行**

Run: `auto-git-pull.bat` → `data/git-pull.log` にログ出力確認

- [ ] **Step 3: コミット**

```bash
git add claude-office/auto-git-pull.bat
git commit -m "feat: 旧PC用auto-git-pull.bat追加"
```

---

### Task 2: ログクリーンアップ

**Files:**
- Create: `claude-office/log-cleanup.js`
- Create: `claude-office/run-log-cleanup.bat`

**スケジュール:** 毎週日曜 03:00

**ロジック:**
- data/messages/ : 30日以上前のJSONを削除
- data/drafts/ : 30日以上前のJSONを削除
- data/results/ : 30日以上前のJSONを削除
- activity.json : 200件超を切り詰め
- data/git-pull.log : 1000行超を切り詰め

- [ ] **Step 1: log-cleanup.js 作成**

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

function cleanDir(dirPath, maxAgeMs) {
  if (!fs.existsSync(dirPath)) return 0;
  const now = Date.now();
  let count = 0;
  for (const f of fs.readdirSync(dirPath)) {
    const fp = path.join(dirPath, f);
    const stat = fs.statSync(fp);
    if (now - stat.mtimeMs > maxAgeMs) {
      fs.unlinkSync(fp);
      count++;
    }
  }
  return count;
}

function trimJsonArray(filePath, maxItems) {
  if (!fs.existsSync(filePath)) return;
  try {
    const arr = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (Array.isArray(arr) && arr.length > maxItems) {
      fs.writeFileSync(filePath, JSON.stringify(arr.slice(0, maxItems), null, 2), "utf-8");
      console.log(`[cleanup] ${path.basename(filePath)}: ${arr.length} → ${maxItems}`);
    }
  } catch {}
}

function trimLog(filePath, maxLines) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  if (lines.length > maxLines) {
    fs.writeFileSync(filePath, lines.slice(-maxLines).join("\n"), "utf-8");
    console.log(`[cleanup] ${path.basename(filePath)}: ${lines.length} → ${maxLines} lines`);
  }
}

console.log(`[cleanup] 開始: ${new Date().toISOString()}`);

const msgs = cleanDir(path.join(DATA_DIR, "messages"), THIRTY_DAYS);
const drafts = cleanDir(path.join(DATA_DIR, "drafts"), THIRTY_DAYS);
const results = cleanDir(path.join(DATA_DIR, "results"), THIRTY_DAYS);
console.log(`[cleanup] 削除: messages=${msgs}, drafts=${drafts}, results=${results}`);

trimJsonArray(path.join(DATA_DIR, "activity.json"), 200);
trimLog(path.join(DATA_DIR, "git-pull.log"), 1000);

console.log(`[cleanup] 完了`);
```

- [ ] **Step 2: run-log-cleanup.bat 作成**

```bat
@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" log-cleanup.js
```

- [ ] **Step 3: テスト実行**

Run: `run-log-cleanup.bat` → 削除件数ログ確認

- [ ] **Step 4: コミット**

```bash
git add claude-office/log-cleanup.js claude-office/run-log-cleanup.bat
git commit -m "feat: ログクリーンアップスクリプト追加"
```

---

## Chunk 2: googleapis使用の3本

### Task 3: 請求書_未整理フォルダ通知

**Files:**
- Create: `claude-office/invoice-folder-check.js`
- Create: `claude-office/run-invoice-folder-check.bat`

**スケジュール:** 毎週金曜 17:00

**ロジック:** Drive APIでフォルダ内ファイル一覧取得 → data/folder-report.txt に出力

- [ ] **Step 1: invoice-folder-check.js 作成**

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORT_FILE = path.join(__dirname, "data", "folder-report.txt");
const FOLDER_ID = "10NUs7HGd5_36Blp8kpRmMM2tqnsjqz77";

function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

async function main() {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    fields: "files(id,name,createdTime,size)",
    orderBy: "createdTime desc",
    pageSize: 100,
  });

  const files = res.data.files || [];
  const lines = [
    `=== 請求書_未整理フォルダ レポート ===`,
    `日時: ${new Date().toISOString()}`,
    `未整理ファイル数: ${files.length}件`,
    ``,
  ];

  for (const f of files) {
    const date = new Date(f.createdTime).toLocaleDateString("ja-JP");
    lines.push(`  ${date}  ${f.name}`);
  }

  if (files.length === 0) {
    lines.push("  （なし — 整理済み）");
  } else {
    lines.push("");
    lines.push(`⚠ ${files.length}件の未整理ファイルがあります。Driveで整理してください。`);
  }

  const report = lines.join("\n");
  fs.writeFileSync(REPORT_FILE, report, "utf-8");
  console.log(report);
}

main().catch((e) => console.error("[folder-check] エラー:", e.message));
```

- [ ] **Step 2: run-invoice-folder-check.bat 作成**

```bat
@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" invoice-folder-check.js
```

- [ ] **Step 3: テスト実行 → data/folder-report.txt 確認**

- [ ] **Step 4: コミット**

---

### Task 4: 朝のブリーフィング

**Files:**
- Create: `claude-office/morning-briefing.js`
- Create: `claude-office/run-morning-briefing.bat`

**スケジュール:** 毎朝 08:30

**ロジック:**
- Gmail API: 未読メール数 + 重要な未読の件名リスト
- Drive API: 未整理フォルダのファイル数
- data/morning-briefing.txt に出力

- [ ] **Step 1: morning-briefing.js 作成**

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORT_FILE = path.join(__dirname, "data", "morning-briefing.txt");
const INVOICE_FOLDER_ID = "10NUs7HGd5_36Blp8kpRmMM2tqnsjqz77";

function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

async function main() {
  const auth = getAuth();
  const gmail = google.gmail({ version: "v1", auth });
  const drive = google.drive({ version: "v3", auth });

  const lines = [
    `=== 朝のブリーフィング ===`,
    `日時: ${new Date().toLocaleString("ja-JP")}`,
    ``,
  ];

  // --- Gmail 未読 ---
  try {
    const unread = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
      maxResults: 20,
    });
    const msgs = unread.data.messages || [];
    lines.push(`📧 未読メール: ${unread.data.resultSizeEstimate || msgs.length}件`);

    if (msgs.length > 0) {
      const top5 = msgs.slice(0, 5);
      for (const m of top5) {
        const detail = await gmail.users.messages.get({
          userId: "me",
          id: m.id,
          format: "metadata",
          metadataHeaders: ["From", "Subject"],
        });
        const from = detail.data.payload.headers.find((h) => h.name === "From")?.value || "";
        const subject = detail.data.payload.headers.find((h) => h.name === "Subject")?.value || "";
        const shortFrom = from.replace(/<.*>/, "").trim().slice(0, 20);
        lines.push(`  - [${shortFrom}] ${subject}`);
      }
      if (msgs.length > 5) lines.push(`  ...他${msgs.length - 5}件`);
    }
  } catch (e) {
    lines.push(`📧 Gmail取得エラー: ${e.message}`);
  }

  lines.push("");

  // --- Drive 未整理ファイル ---
  try {
    const driveRes = await drive.files.list({
      q: `'${INVOICE_FOLDER_ID}' in parents and trashed = false`,
      fields: "files(id)",
      pageSize: 100,
    });
    const fileCount = (driveRes.data.files || []).length;
    lines.push(`📁 請求書_未整理: ${fileCount}件`);
    if (fileCount > 0) {
      lines.push(`  → Driveで整理が必要です`);
    }
  } catch (e) {
    lines.push(`📁 Drive取得エラー: ${e.message}`);
  }

  lines.push("");

  // --- 直近の請求書処理 ---
  try {
    const stateFile = path.join(__dirname, "data", "invoice-state.json");
    const state = JSON.parse(fs.readFileSync(stateFile, "utf-8"));
    lines.push(`🧾 請求書自動保存: 最終実行 ${state.lastRun || "未実行"}, 累計${state.totalSaved || 0}件`);
  } catch {
    lines.push(`🧾 請求書自動保存: 状態不明`);
  }

  const report = lines.join("\n");
  fs.writeFileSync(REPORT_FILE, report, "utf-8");
  console.log(report);
}

main().catch((e) => console.error("[morning-briefing] エラー:", e.message));
```

- [ ] **Step 2: run-morning-briefing.bat 作成**

```bat
@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" morning-briefing.js
```

- [ ] **Step 3: テスト実行 → data/morning-briefing.txt 確認**

- [ ] **Step 4: コミット**

---

### Task 5: GASトリガー生存確認

**Files:**
- Create: `claude-office/gas-health-check.js`
- Create: `claude-office/run-gas-health-check.bat`

**スケジュール:** 毎日 10:00

**ロジック:**
- GASトリガーは外部から直接確認不可
- 代替: x-trend-collector の出力先スプレッドシートの最終更新日時をDrive APIで取得
- 48時間以上更新なし → data/gas-health-alert.txt に警告出力
- 正常なら → 「正常」と出力

**注意:** x-trend-collectorの出力先スプレッドシートIDを事前に特定する必要あり

- [ ] **Step 1: スプレッドシートID特定**

`memory/x-trend-collector.md` または `gas-scripts/x-trend-collector.gs` からシートIDを取得

- [ ] **Step 2: gas-health-check.js 作成**

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ALERT_FILE = path.join(__dirname, "data", "gas-health-alert.txt");

// 監視対象: { name, fileId (Drive上のスプレッドシート), maxStaleHours }
const TARGETS = [
  {
    name: "X トレンド収集",
    fileId: "SHEET_ID_HERE", // TODO: 実装時に特定
    maxStaleHours: 48,
  },
];

function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

async function main() {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const now = Date.now();

  const lines = [
    `=== GASトリガー生存確認 ===`,
    `日時: ${new Date().toLocaleString("ja-JP")}`,
    ``,
  ];

  let hasAlert = false;

  for (const target of TARGETS) {
    try {
      const res = await drive.files.get({
        fileId: target.fileId,
        fields: "modifiedTime,name",
      });
      const modified = new Date(res.data.modifiedTime);
      const hoursAgo = ((now - modified.getTime()) / (1000 * 60 * 60)).toFixed(1);

      if (hoursAgo > target.maxStaleHours) {
        lines.push(`⚠ ${target.name}: ${hoursAgo}時間前に最終更新（${target.maxStaleHours}h超過）`);
        lines.push(`  → GASトリガーが停止している可能性あり。GASエディタで確認してください。`);
        hasAlert = true;
      } else {
        lines.push(`✅ ${target.name}: ${hoursAgo}時間前に更新（正常）`);
      }
    } catch (e) {
      lines.push(`❌ ${target.name}: 確認失敗 (${e.message})`);
      hasAlert = true;
    }
  }

  const report = lines.join("\n");
  fs.writeFileSync(ALERT_FILE, report, "utf-8");
  console.log(report);

  if (hasAlert) {
    console.log("\n[gas-health] ⚠ 要確認あり");
  }
}

main().catch((e) => console.error("[gas-health] エラー:", e.message));
```

- [ ] **Step 3: run-gas-health-check.bat 作成**

```bat
@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" gas-health-check.js
```

- [ ] **Step 4: テスト実行 → data/gas-health-alert.txt 確認**

- [ ] **Step 5: コミット**

---

## Chunk 3: 一括登録

### Task 6: 全スケジューラ一括登録bat

**Files:**
- Create: `claude-office/setup-all-schedulers.bat`

- [ ] **Step 1: setup-all-schedulers.bat 作成**

新PC/旧PC共通で使える一括登録スクリプト。
旧PC専用タスク（auto-git-pull）は分岐で処理。

```bat
@echo off
cd /d "%~dp0"
echo === タスクスケジューラ一括登録 ===

echo [1/6] 請求書自動保存（9:00, 13:00, 18:00）
schtasks /create /tn "InvoiceAutoSave" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 09:00 /f
schtasks /create /tn "InvoiceAutoSave_13" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 13:00 /f
schtasks /create /tn "InvoiceAutoSave_18" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 18:00 /f

echo [2/6] ログクリーンアップ（毎週日曜 03:00）
schtasks /create /tn "LogCleanup" /tr "%~dp0run-log-cleanup.bat" /sc weekly /d SUN /st 03:00 /f

echo [3/6] 請求書フォルダチェック（毎週金曜 17:00）
schtasks /create /tn "InvoiceFolderCheck" /tr "%~dp0run-invoice-folder-check.bat" /sc weekly /d FRI /st 17:00 /f

echo [4/6] 朝のブリーフィング（毎日 08:30）
schtasks /create /tn "MorningBriefing" /tr "%~dp0run-morning-briefing.bat" /sc daily /st 08:30 /f

echo [5/6] GASトリガー生存確認（毎日 10:00）
schtasks /create /tn "GasHealthCheck" /tr "%~dp0run-gas-health-check.bat" /sc daily /st 10:00 /f

echo [6/6] 旧PC用: 自動git pull（毎日 04:00）
schtasks /create /tn "AutoGitPull" /tr "%~dp0auto-git-pull.bat" /sc daily /st 04:00 /f

echo === 登録完了 ===
schtasks /query /fo table /nh | findstr /i "Invoice LogClean Folder Morning Gas AutoGit"
pause
```

- [ ] **Step 2: テスト実行（管理者権限）**

- [ ] **Step 3: コミット＆プッシュ**

```bash
git add claude-office/
git commit -m "feat: タスクスケジューラ自動化5本追加"
git push
```

---

## 実行順序まとめ

| # | タスク名 | スケジュール | 新PC | 旧PC |
|---|---------|-------------|:----:|:----:|
| 1 | 自動git pull | 毎日 04:00 | - | ✅ |
| 2 | 朝のブリーフィング | 毎日 08:30 | ✅ | ✅ |
| 3 | 請求書自動保存 | 毎日 9/13/18時 | ✅ | ✅ |
| 4 | GASトリガー確認 | 毎日 10:00 | ✅ | - |
| 5 | 請求書フォルダチェック | 金曜 17:00 | ✅ | - |
| 6 | ログクリーンアップ | 日曜 03:00 | ✅ | ✅ |
