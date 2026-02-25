# SNSネタ自動ストックシステム 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** GASでSNSコンテンツを自動収集し、Claude APIでネタを生成してスプレッドシートにストックするシステムを構築する。

**Architecture:** Google Custom Search APIで検索上位コンテンツを定期収集し、Claude APIで投稿ネタを生成する。GAS一本完結型で、スプレッドシートがUI兼DB。既存のinvoice-auto-save.gsと同じパターン（CONFIG定数、トリガーセットアップ、Logger.logベースのテスト）を踏襲する。

**Tech Stack:** Google Apps Script, Google Custom Search API, Claude API (Messages API), Google Sheets

**設計書:** `docs/plans/2026-02-26-neta-stock-design.md`

**ローカルコピー:** `C:\Users\newgo\Claud用\gas-scripts\neta-stock.gs`

---

## 事前準備（ユーザー作業）

以下はGAS実装前にユーザーが手動で行う必要がある：

1. **スプレッドシート新規作成**
   - シート名: `設定`, `収集データ`, `ネタストック` の3シートを作成
   - 各シートの1行目にヘッダーを入力（Task 1で詳細指定）

2. **Google Custom Search API セットアップ**
   - Google Cloud Console → APIとサービス → Custom Search API 有効化
   - APIキー発行
   - Programmable Search Engine 作成 → 「ウェブ全体を検索」ON
   - 検索エンジンID取得

3. **GASスクリプトプロパティに3つのキーを登録**
   - `CUSTOM_SEARCH_API_KEY`
   - `CUSTOM_SEARCH_ENGINE_ID`
   - `CLAUDE_API_KEY`

4. **スプレッドシートIDをメモ**（CONFIG.SPREADSHEET_IDに設定する）

---

## Task 1: スプレッドシートのヘッダー設定 & CONFIG定数

**Files:**
- Create: `gas-scripts/neta-stock.gs`

**Step 1: CONFIG定数とヘッダー定数を書く**

```javascript
/**
 * SNSネタ自動ストックシステム
 *
 * Google Custom Search APIで検索上位コンテンツを収集し、
 * Claude APIでSNS投稿ネタを自動生成してスプレッドシートにストックする。
 *
 * セットアップ:
 * 1. スプレッドシートを作成し、3シート（設定/収集データ/ネタストック）を用意
 * 2. スクリプトプロパティに CUSTOM_SEARCH_API_KEY, CUSTOM_SEARCH_ENGINE_ID, CLAUDE_API_KEY を設定
 * 3. setupTriggers() を1回実行
 */

// ===== 設定 =====
const CONFIG = {
  // スプレッドシートID（ユーザーが作成したものに置き換え）
  SPREADSHEET_ID: '', // ← ここにスプレッドシートIDを設定

  // シート名
  SHEET_SETTINGS: '設定',
  SHEET_COLLECTED: '収集データ',
  SHEET_NETA: 'ネタストック',

  // Custom Search API設定
  SEARCH_RESULTS_PER_QUERY: 10,  // 1回の検索で取得する件数（最大10）

  // Claude API設定
  CLAUDE_MODEL: 'claude-sonnet-4-20250514',
  CLAUDE_MAX_TOKENS: 4096,
  NETA_COUNT_PER_GROUP: 5,  // テーマ×プラットフォームあたりの生成ネタ数

  // 生成トリガー時刻
  GENERATE_HOUR: 8,  // 朝8時
};

// ===== シートヘッダー定義 =====
const HEADERS = {
  SETTINGS: ['テーマ', 'プラットフォーム', '検索クエリ', '最終実行日時'],
  COLLECTED: ['収集日時', 'テーマ', 'プラットフォーム', 'タイトル', 'URL', 'スニペット', 'ネタ生成済み'],
  NETA: ['生成日時', 'テーマ', 'プラットフォーム', 'ネタタイトル', '投稿案', '元ネタURL', 'ステータス'],
};
```

**Step 2: ヘルパー関数を書く**

```javascript
// ===== ヘルパー関数 =====

/**
 * スプレッドシートを取得
 */
function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

/**
 * 指定シートを取得
 */
function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

/**
 * スクリプトプロパティを取得（未設定時はエラー）
 */
function getProperty(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) {
    throw new Error(`スクリプトプロパティ "${key}" が未設定です`);
  }
  return value;
}

/**
 * 現在日時をフォーマット
 */
function formatDateTime(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss');
}
```

**Step 3: テスト関数で動作確認**

```javascript
/**
 * テスト: スプレッドシート接続とシート取得
 */
function testConnection() {
  try {
    const ss = getSpreadsheet();
    Logger.log('スプレッドシート: ' + ss.getName());

    const sheets = [CONFIG.SHEET_SETTINGS, CONFIG.SHEET_COLLECTED, CONFIG.SHEET_NETA];
    for (const name of sheets) {
      const sheet = getSheet(name);
      if (sheet) {
        Logger.log(`✅ シート "${name}" 存在確認OK (${sheet.getLastRow()} 行)`);
      } else {
        Logger.log(`❌ シート "${name}" が見つかりません`);
      }
    }
  } catch (e) {
    Logger.log('❌ エラー: ' + e.message);
  }
}
```

**Step 4: GASエディタにコードを貼り付け、testConnection()を実行して確認**

実行: GASエディタで `testConnection` を選択 → 実行
期待: 3シートが全て `✅` で表示される

**Step 5: コミット**

```bash
cd "C:/Users/newgo/neta-stock"
git add gas-scripts/neta-stock.gs
git commit -m "feat: ネタストック GAS - CONFIG定数とヘルパー関数"
```

---

## Task 2: Google Custom Search API連携

**Files:**
- Modify: `gas-scripts/neta-stock.gs`

**Step 1: Custom Search API呼び出し関数を書く**

```javascript
// ===== Google Custom Search API =====

/**
 * Google Custom Search APIで検索を実行
 * @param {string} query - 検索クエリ
 * @returns {Array<{title: string, url: string, snippet: string}>}
 */
function searchWithCustomSearch(query) {
  const apiKey = getProperty('CUSTOM_SEARCH_API_KEY');
  const engineId = getProperty('CUSTOM_SEARCH_ENGINE_ID');

  const url = 'https://www.googleapis.com/customsearch/v1'
    + '?key=' + encodeURIComponent(apiKey)
    + '&cx=' + encodeURIComponent(engineId)
    + '&q=' + encodeURIComponent(query)
    + '&num=' + CONFIG.SEARCH_RESULTS_PER_QUERY;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const code = response.getResponseCode();

  if (code !== 200) {
    Logger.log(`Custom Search APIエラー (${code}): ${response.getContentText()}`);
    return [];
  }

  const json = JSON.parse(response.getContentText());
  const items = json.items || [];

  return items.map(item => ({
    title: item.title || '',
    url: item.link || '',
    snippet: item.snippet || '',
  }));
}
```

**Step 2: テスト関数を書く**

```javascript
/**
 * テスト: Custom Search API検索
 */
function testSearch() {
  const results = searchWithCustomSearch('台湾留学 おすすめ');
  Logger.log(`検索結果: ${results.length} 件`);
  for (const r of results) {
    Logger.log(`  ${r.title} | ${r.url}`);
  }
}
```

**Step 3: GASエディタで testSearch() を実行**

実行: GASエディタで `testSearch` を選択 → 実行
期待: 検索結果が10件程度表示される（APIキーが正しく設定されていれば）

**Step 4: コミット**

```bash
cd "C:/Users/newgo/neta-stock"
git add gas-scripts/neta-stock.gs
git commit -m "feat: Google Custom Search API連携"
```

---

## Task 3: 収集処理メイン — collectContent()

**Files:**
- Modify: `gas-scripts/neta-stock.gs`

**Step 1: 設定シートからラウンドロビンで1行取得する関数を書く**

```javascript
// ===== 収集処理 =====

/**
 * 設定シートから「最終実行日時が最も古い行」を1つ取得
 * @returns {{row: number, theme: string, platform: string, query: string} | null}
 */
function getNextSettingsRow() {
  const sheet = getSheet(CONFIG.SHEET_SETTINGS);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    Logger.log('設定シートにデータがありません');
    return null;
  }

  let oldestRow = null;
  let oldestTime = new Date();

  // ヘッダー行(0)をスキップ
  for (let i = 1; i < data.length; i++) {
    const theme = data[i][0];
    const platform = data[i][1];
    const query = data[i][2];
    const lastRun = data[i][3];

    if (!theme || !query) continue;

    const lastRunDate = lastRun ? new Date(lastRun) : new Date(0);

    if (!oldestRow || lastRunDate < oldestTime) {
      oldestTime = lastRunDate;
      oldestRow = {
        row: i + 1, // 1-indexed for Sheets API
        theme: theme,
        platform: platform,
        query: query,
      };
    }
  }

  return oldestRow;
}
```

**Step 2: 重複チェック関数を書く**

```javascript
/**
 * 収集データシートに既に存在するURLのセットを取得
 * @returns {Set<string>}
 */
function getExistingUrls() {
  const sheet = getSheet(CONFIG.SHEET_COLLECTED);
  const data = sheet.getDataRange().getValues();
  const urls = new Set();

  // E列（index 4）がURL
  for (let i = 1; i < data.length; i++) {
    if (data[i][4]) {
      urls.add(data[i][4]);
    }
  }

  return urls;
}
```

**Step 3: メインの収集関数を書く**

```javascript
/**
 * メイン: コンテンツ収集（5分おきトリガーで実行）
 * 設定シートから1行を選び、Custom Search APIで検索、結果を収集データシートに追記
 */
function collectContent() {
  const target = getNextSettingsRow();
  if (!target) {
    Logger.log('処理対象なし');
    return;
  }

  Logger.log(`収集開始: ${target.theme} / ${target.platform} / クエリ: ${target.query}`);

  // 検索実行
  const results = searchWithCustomSearch(target.query);
  if (results.length === 0) {
    Logger.log('検索結果が0件でした');
    // 最終実行日時は更新する（無限ループ防止）
    updateLastRunTime(target.row);
    return;
  }

  // 重複チェック
  const existingUrls = getExistingUrls();
  const newResults = results.filter(r => !existingUrls.has(r.url));
  Logger.log(`新規: ${newResults.length} 件 / 全体: ${results.length} 件`);

  // 収集データシートに追記
  if (newResults.length > 0) {
    const sheet = getSheet(CONFIG.SHEET_COLLECTED);
    const now = formatDateTime(new Date());
    const rows = newResults.map(r => [
      now,
      target.theme,
      target.platform,
      r.title,
      r.url,
      r.snippet,
      false, // ネタ生成済み = FALSE
    ]);
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  }

  // 最終実行日時を更新
  updateLastRunTime(target.row);

  Logger.log(`収集完了: ${newResults.length} 件を保存`);
}

/**
 * 設定シートの最終実行日時を更新
 */
function updateLastRunTime(row) {
  const sheet = getSheet(CONFIG.SHEET_SETTINGS);
  sheet.getRange(row, 4).setValue(formatDateTime(new Date())); // D列 = 4
}
```

**Step 4: テスト関数を書く**

```javascript
/**
 * テスト: 収集処理（1回分）
 */
function testCollect() {
  Logger.log('=== 収集テスト開始 ===');
  collectContent();
  Logger.log('=== 収集テスト完了 ===');

  // 収集結果確認
  const sheet = getSheet(CONFIG.SHEET_COLLECTED);
  Logger.log(`収集データシート: ${sheet.getLastRow() - 1} 件`);
}
```

**Step 5: GASエディタで testCollect() を実行して確認**

実行前提: 設定シートに少なくとも1行のテーマ×検索クエリが入力されていること
実行: GASエディタで `testCollect` を選択 → 実行
期待: 収集データシートに検索結果が追記される

**Step 6: コミット**

```bash
cd "C:/Users/newgo/neta-stock"
git add gas-scripts/neta-stock.gs
git commit -m "feat: 収集処理 collectContent() - ラウンドロビン+重複チェック"
```

---

## Task 4: Claude API連携

**Files:**
- Modify: `gas-scripts/neta-stock.gs`

**Step 1: Claude API呼び出し関数を書く**

```javascript
// ===== Claude API =====

/**
 * Claude APIを呼び出してテキスト応答を取得
 * @param {string} prompt - ユーザープロンプト
 * @returns {string} Claude の応答テキスト
 */
function callClaudeAPI(prompt) {
  const apiKey = getProperty('CLAUDE_API_KEY');

  const payload = {
    model: CONFIG.CLAUDE_MODEL,
    max_tokens: CONFIG.CLAUDE_MAX_TOKENS,
    messages: [
      { role: 'user', content: prompt }
    ],
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  const code = response.getResponseCode();

  if (code !== 200) {
    Logger.log(`Claude APIエラー (${code}): ${response.getContentText()}`);
    throw new Error(`Claude API returned ${code}`);
  }

  const json = JSON.parse(response.getContentText());
  return json.content[0].text;
}
```

**Step 2: テスト関数を書く**

```javascript
/**
 * テスト: Claude API接続
 */
function testClaude() {
  const result = callClaudeAPI('「台湾留学」についてのInstagram投稿ネタを1つだけJSON形式で生成してください。形式: {"title": "...", "body": "..."}');
  Logger.log('Claude応答: ' + result);
}
```

**Step 3: GASエディタで testClaude() を実行**

実行: GASエディタで `testClaude` を選択 → 実行
期待: JSON形式のネタが1つ返される

**Step 4: コミット**

```bash
cd "C:/Users/newgo/neta-stock"
git add gas-scripts/neta-stock.gs
git commit -m "feat: Claude API連携 callClaudeAPI()"
```

---

## Task 5: ネタ生成処理 — generateNeta()

**Files:**
- Modify: `gas-scripts/neta-stock.gs`

**Step 1: 未処理データの取得とグルーピング関数**

```javascript
// ===== ネタ生成処理 =====

/**
 * 収集データシートから未処理データをテーマ×プラットフォームでグルーピング
 * @returns {Object<string, Array<{row: number, title: string, url: string, snippet: string}>>}
 */
function getUnprocessedCollectedData() {
  const sheet = getSheet(CONFIG.SHEET_COLLECTED);
  const data = sheet.getDataRange().getValues();
  const groups = {};

  for (let i = 1; i < data.length; i++) {
    const isProcessed = data[i][6]; // G列: ネタ生成済み
    if (isProcessed === true || isProcessed === 'TRUE') continue;

    const theme = data[i][1];
    const platform = data[i][2];
    const key = `${theme}|||${platform}`;

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push({
      row: i + 1,
      title: data[i][3],
      url: data[i][4],
      snippet: data[i][5],
    });
  }

  return groups;
}
```

**Step 2: ネタ生成プロンプト構築関数**

```javascript
/**
 * Claude APIに送るプロンプトを構築
 * @param {string} theme
 * @param {string} platform
 * @param {Array} items - 収集データ
 * @returns {string}
 */
function buildNetaPrompt(theme, platform, items) {
  const dataText = items.map((item, i) =>
    `${i + 1}. タイトル: ${item.title}\n   URL: ${item.url}\n   概要: ${item.snippet}`
  ).join('\n\n');

  return `あなたはSNSマーケティングの専門家です。
以下の検索結果データを参考に、「${theme}」に関する ${platform} 向けの投稿ネタを${CONFIG.NETA_COUNT_PER_GROUP}個生成してください。

各ネタには以下を含めてください：
- title: キャッチーなタイトル（30文字以内）
- body: 投稿本文の案（${platform}に適した長さとトーン）
- source_url: 最も参考にした検索結果のURL（1つ）

【収集データ】
${dataText}

【出力形式】必ずJSON配列のみを返してください。マークダウンのコードブロックは不要です。
[
  {"title": "...", "body": "...", "source_url": "..."}
]`;
}
```

**Step 3: メインのネタ生成関数**

```javascript
/**
 * メイン: ネタ生成（1日1回トリガーで実行）
 * 未処理の収集データからClaude APIでネタを生成し、ネタストックシートに追記
 */
function generateNeta() {
  const groups = getUnprocessedCollectedData();
  const groupKeys = Object.keys(groups);

  if (groupKeys.length === 0) {
    Logger.log('未処理の収集データがありません');
    return;
  }

  Logger.log(`ネタ生成開始: ${groupKeys.length} グループ`);

  const netaSheet = getSheet(CONFIG.SHEET_NETA);
  const collectedSheet = getSheet(CONFIG.SHEET_COLLECTED);
  let totalNeta = 0;

  for (const key of groupKeys) {
    const [theme, platform] = key.split('|||');
    const items = groups[key];

    Logger.log(`  処理中: ${theme} / ${platform} (${items.length} 件)`);

    try {
      // Claude APIでネタ生成
      const prompt = buildNetaPrompt(theme, platform, items);
      const response = callClaudeAPI(prompt);

      // JSON解析（コードブロック記法を除去）
      const cleanJson = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      const netas = JSON.parse(cleanJson);

      // ネタストックシートに追記
      const now = formatDateTime(new Date());
      const rows = netas.map(neta => [
        now,
        theme,
        platform,
        neta.title || '',
        neta.body || '',
        neta.source_url || '',
        '未使用',
      ]);
      netaSheet.getRange(netaSheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      totalNeta += rows.length;

      // 収集データの「ネタ生成済み」をTRUEに更新
      for (const item of items) {
        collectedSheet.getRange(item.row, 7).setValue(true); // G列 = 7
      }

      Logger.log(`  → ${netas.length} 件のネタを生成`);

    } catch (e) {
      Logger.log(`  ❌ エラー (${theme}/${platform}): ${e.message}`);
      // エラーが起きてもスキップして次のグループへ
    }

    // GAS実行時間制限対策: 4分経過したら中断
    // （残りは次回トリガーで処理される）
  }

  Logger.log(`ネタ生成完了: ${totalNeta} 件を追加`);
}
```

**Step 4: テスト関数を書く**

```javascript
/**
 * テスト: ネタ生成（1グループ分）
 */
function testGenerate() {
  Logger.log('=== ネタ生成テスト開始 ===');
  generateNeta();
  Logger.log('=== ネタ生成テスト完了 ===');

  const sheet = getSheet(CONFIG.SHEET_NETA);
  Logger.log(`ネタストックシート: ${sheet.getLastRow() - 1} 件`);
}
```

**Step 5: GASエディタで testGenerate() を実行**

実行前提: 収集データシートに「ネタ生成済み = FALSE」のデータが存在すること
実行: GASエディタで `testGenerate` を選択 → 実行
期待: ネタストックシートに5件程度のネタが追記される

**Step 6: コミット**

```bash
cd "C:/Users/newgo/neta-stock"
git add gas-scripts/neta-stock.gs
git commit -m "feat: ネタ生成処理 generateNeta() - Claude APIでSNS投稿ネタ自動生成"
```

---

## Task 6: トリガーセットアップ & 完成

**Files:**
- Modify: `gas-scripts/neta-stock.gs`

**Step 1: トリガーセットアップ関数**

```javascript
// ===== トリガー管理 =====

/**
 * トリガーのセットアップ（初回のみ実行）
 */
function setupTriggers() {
  // 既存トリガーを削除
  removeTriggers();

  // 5分おき: コンテンツ収集
  ScriptApp.newTrigger('collectContent')
    .timeBased()
    .everyMinutes(5)
    .create();

  // 毎日8時: ネタ生成
  ScriptApp.newTrigger('generateNeta')
    .timeBased()
    .atHour(CONFIG.GENERATE_HOUR)
    .everyDays(1)
    .create();

  Logger.log('トリガーを設定しました:');
  Logger.log('  - collectContent: 5分おき');
  Logger.log('  - generateNeta: 毎日 ' + CONFIG.GENERATE_HOUR + '時');
}

/**
 * 全トリガーを削除
 */
function removeTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    const fn = trigger.getHandlerFunction();
    if (fn === 'collectContent' || fn === 'generateNeta') {
      ScriptApp.deleteTrigger(trigger);
    }
  }
  Logger.log('トリガーを削除しました');
}
```

**Step 2: ヘッダー初期化ユーティリティ**

```javascript
/**
 * シートヘッダーを初期化（シートが空の場合のみ）
 */
function initHeaders() {
  const ss = getSpreadsheet();

  const pairs = [
    [CONFIG.SHEET_SETTINGS, HEADERS.SETTINGS],
    [CONFIG.SHEET_COLLECTED, HEADERS.COLLECTED],
    [CONFIG.SHEET_NETA, HEADERS.NETA],
  ];

  for (const [sheetName, headers] of pairs) {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log(`❌ シート "${sheetName}" が見つかりません`);
      continue;
    }
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // ヘッダー行を太字に
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      Logger.log(`✅ "${sheetName}" ヘッダーを設定`);
    } else {
      Logger.log(`⏭ "${sheetName}" は既にデータあり（スキップ）`);
    }
  }
}
```

**Step 3: GASエディタで setupTriggers() を実行**

実行: GASエディタで `setupTriggers` を選択 → 実行
確認: GASエディタ → トリガー画面で2つのトリガーが表示される

**Step 4: 最終コミット**

```bash
cd "C:/Users/newgo/neta-stock"
git add gas-scripts/neta-stock.gs
git commit -m "feat: トリガーセットアップ & ヘッダー初期化ユーティリティ"
```

---

## Task 7: エンドツーエンド動作確認

**手順:**

1. `initHeaders()` を実行 → 3シートにヘッダーが設定される
2. 設定シートにテストデータを1行入力:
   | テーマ | プラットフォーム | 検索クエリ | 最終実行日時 |
   |--------|----------------|-----------|-------------|
   | 台湾留学 | instagram | 台湾留学 おすすめ site:instagram.com | (空) |
3. `testCollect()` を実行 → 収集データシートに検索結果が追記される
4. `testGenerate()` を実行 → ネタストックシートに投稿ネタが追記される
5. ネタストックシートの内容を確認:
   - ネタタイトルがキャッチーか
   - 投稿案がInstagramに適したトーンか
   - 元ネタURLが有効か
6. 問題なければ `setupTriggers()` を実行してトリガーを有効化

**完了条件:**
- 3シートにデータが正しく入っている
- 重複URLが収集データシートに入らない
- ネタ生成済みフラグがTRUEに更新される
- トリガーが正しく動作する

---

## 実装順序サマリー

| Task | 内容 | 推定時間 |
|------|------|---------|
| 1 | CONFIG定数 & ヘルパー関数 | 5分 |
| 2 | Custom Search API連携 | 5分 |
| 3 | 収集処理 collectContent() | 10分 |
| 4 | Claude API連携 | 5分 |
| 5 | ネタ生成処理 generateNeta() | 10分 |
| 6 | トリガー & ヘッダー初期化 | 5分 |
| 7 | E2Eテスト | 10分 |

**合計推定: 約50分**
