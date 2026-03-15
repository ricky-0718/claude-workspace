# HiNote Monitor リファクタリング 実装プラン

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** hinote-monitorのClaude CLI依存を軽量化し、安定した自動面談処理+ブラウザちらつき解消

**Architecture:** Claude CLIは分析テキスト生成+Asana+スプレッドシートのみ担当（Write/Edit不使用）。stdoutに区切り付きテキストを出力し、Node.js（mendan-executor.js）がファイル書き込み+gitを担当。ブラウザは既存タブ再利用。

**Tech Stack:** Node.js, Playwright CDP, Claude CLI, gws CLI, Asana MCP

---

## ファイル構成

| ファイル | 操作 | 役割 |
|---------|------|------|
| `claude-office/prompts/mendan-lightweight.md` | 新規 | 軽量版プロンプト（区切り付き出力） |
| `claude-office/mendan-executor.js` | 新規 | stdout解析→ファイル書き込み→git |
| `claude-office/hinote-monitor.js` | 修正 | タブ再利用+executor呼び出し+allowedTools制限 |

---

## Chunk 1: 軽量版プロンプト作成

### Task 1: mendan-lightweight.md 作成

**Files:**
- Create: `claude-office/prompts/mendan-lightweight.md`

- [ ] **Step 1: プロンプトファイル作成**

mendan-auto.md をベースに以下を変更:
- ファイル書き込み指示を全て削除
- 代わりに `===REPORT_START===` / `===REPORT_END===` 等の区切りでstdoutに出力する指示
- Asanaタスク作成とスプレッドシート更新の指示はそのまま残す
- allowedTools: `Read`, `Bash`, Asana MCP のみ（Write/Edit/Glob/Grep不要）

出力フォーマット:
```
===REPORT_START===
（面談分析レポート — 目次行とセパレータ含む、ファイル追記可能な形式）
===REPORT_END===
===LINE_START===
（LINE下書き4通 — 目次行とセパレータ含む）
===LINE_END===
===CUSTOMER_START===
（顧客カード — 追記用テキスト）
===CUSTOMER_END===
```

- [ ] **Step 2: コミット**

---

## Chunk 2: mendan-executor.js 作成

### Task 2: ファイル書き込みモジュール

**Files:**
- Create: `claude-office/mendan-executor.js`

- [ ] **Step 1: モジュール作成**

機能:
1. `parseClaudeOutput(stdout)` — 区切りタグでテキストを抽出
2. `appendToFile(filePath, content)` — 既存mdファイルの末尾に追記
3. `updateTableOfContents(filePath, name, date)` — 目次セクションにリンク追加
4. `gitCommitAndPush(name, date)` — git add + commit + push

エクスポート:
```js
export async function executeMendan(claudeOutput, name, date) {
  const sections = parseClaudeOutput(claudeOutput);
  // 面談分析まとめ.md に追記
  // LINE下書きまとめ.md に追記
  // 顧客コンテキスト.md に追記
  // git commit + push
}
```

- [ ] **Step 2: コミット**

---

## Chunk 3: hinote-monitor.js 修正

### Task 3: ブラウザタブ再利用

**Files:**
- Modify: `claude-office/hinote-monitor.js` — main関数のページ作成部分

- [ ] **Step 1: 既存タブ検出ロジック追加**

`context.newPage()` の代わりに:
```js
// 既存のHiNoteタブを検索
const pages = context.pages();
let page = pages.find(p => p.url().includes('hinotes.hidock.com'));
if (page) {
  await page.bringToFront(); // 不要かも — テスト後判断
  await page.reload({ waitUntil: 'load', timeout: 30000 });
} else {
  page = await context.newPage();
  await page.goto(HINOTE_URL, { waitUntil: 'load', timeout: 30000 });
}
```

finally節でタブを閉じない（再利用のため）。

- [ ] **Step 2: コミット**

### Task 4: runMendan を軽量化 + executor呼び出し

**Files:**
- Modify: `claude-office/hinote-monitor.js` — runMendan関数、成功時の処理

- [ ] **Step 1: runMendan修正**

変更点:
- テンプレートを `mendan-lightweight.md` に切り替え
- allowedTools から `Write`, `Edit`, `Glob`, `Grep` を削除
- タイムアウトを15分に延長（Asana+スプレッドシートがある分）
- maxTurnsを15に削減

```js
const PROMPT_TEMPLATE = path.join(__dirname, 'prompts', 'mendan-lightweight.md');

return runClaude(prompt, {
  maxTurns: 15,
  timeout: 15 * 60 * 1000,
  allowedTools: [
    'Read', 'Bash',
    'mcp__plugin_asana_asana__asana_create_task',
    'mcp__plugin_asana_asana__asana_set_parent_for_task',
  ],
});
```

- [ ] **Step 2: 成功時にexecutor呼び出し追加**

成功時（`result.ok === true`）に:
```js
import { executeMendan } from './mendan-executor.js';

if (result.ok) {
  await executeMendan(result.result, name, data.date);
  // state更新、通知など既存処理
}
```

- [ ] **Step 3: コミット**

---

## Chunk 4: テスト + 最終調整

### Task 5: dry-runテスト

- [ ] **Step 1: dry-runで新プロンプトの出力確認**
```bash
node hinote-monitor.js --dry-run
```
生成されたプロンプトが正しいか確認。

- [ ] **Step 2: executor単体テスト**
サンプル出力でparseClaudeOutput → ファイル書き込みを確認。

### Task 6: 本番テスト

- [ ] **Step 1: 手動で1件実行**
```bash
node hinote-monitor.js
```
- HiNoteから検出
- Claude CLIで分析+Asana作成
- executorでファイル書き込み+git push

- [ ] **Step 2: 結果確認**
- Asanaに正しくタスク作成されたか
- ファイルに正しく追記されたか
- gitにコミット+プッシュされたか

- [ ] **Step 3: 最終コミット + プッシュ**
