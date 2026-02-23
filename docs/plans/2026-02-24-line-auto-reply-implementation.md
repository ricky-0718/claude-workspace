# LINE自動返信システム 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** LINE通知が来るたびにAIがセールス返信ドラフトを自動生成し、Chatworkに蓄積される仕組みを作る

**Architecture:** GASが5分ごとにChatworkルーム1（受信通知）をポーリングし、新着メッセージを検出。スプレッドシートDBから顧客の過去履歴を参照してClaude APIで返信文を生成し、ルーム2（AIドラフト）に投稿する。担当者が実際に送った返信はルーム3（送信済みログ）に貼り付け、GASが自動でDBに取り込む。

**Tech Stack:** Google Apps Script, Chatwork API, Claude API (Anthropic), Google Spreadsheet

**制約:** Chatwork APIは最新100件のみ取得可能。過去履歴はスプレッドシートDBで管理。

---

## Phase 0: 初回インポート（ブラウザ操作）

### Task 0-1: スプレッドシートDB作成

**Files:**
- Create: Googleスプレッドシート「LINE返信DB」

**Step 1: スプレッドシートを新規作成**

Edge MCPでGoogleスプレッドシートを新規作成し、以下のシートとヘッダーを設定:

シート「履歴」:
```
A1: 日時 | B1: 顧客名 | C1: 種別 | D1: メッセージ内容 | E1: メッセージID
```

種別の値: `受信` / `AIドラフト` / `送信済み`

シート「設定」:
```
A1: 項目      | B1: 値
A2: 最終処理ID | B2: (空)
A3: ルーム1 ID | B3: (ユーザーに確認)
A4: ルーム2 ID | B4: (ルーム作成後に記入)
A5: ルーム3 ID | B5: (ルーム作成後に記入)
```

**Step 2: スプレッドシートIDをメモ**

URLから `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit` のIDをメモ。

---

### Task 0-2: Chatworkルーム2,3を作成

**Step 1: ユーザーにChatwork APIトークンとルーム1のIDを確認**

ユーザーに以下を確認:
- Chatwork APIトークン
- ルーム1（受信通知）のルームID

**Step 2: Chatworkでルーム2,3を作成**

Edge MCPでChatworkを開き:
- ルーム2「AI返信ドラフト」を作成 → ルームIDをメモ
- ルーム3「送信済みログ」を作成 → ルームIDをメモ

**Step 3: スプレッドシートの設定シートにルームIDを記入**

---

### Task 0-3: ウタゲ過去チャット履歴インポート

**Step 1: ウタゲ管理画面にログイン**

Edge MCPでウタゲの管理画面を開く。ユーザーにログインを依頼（またはログイン済み状態を確認）。

**Step 2: LINEチャット一覧を開く**

「メール・LINE配信」→ アカウント選択 → 左メニュー「LINEチャット」

**Step 3: 各顧客のチャット履歴を取得**

顧客リストを上から順に:
1. 顧客名をクリック → トーク画面を開く
2. 会話履歴をread_page/get_page_textで取得
3. 日時・送受信・内容を整形
4. スプレッドシートDBの「履歴」シートに追記

**Step 4: インポート件数を確認**

スプレッドシートの行数を確認し、正常にインポートされたことを検証。

---

## Phase 1: GASメインスクリプト作成

### Task 1-1: GASプロジェクト作成 + CONFIG定義

**Files:**
- Create: `gas-scripts/line-auto-reply.gs`

**Step 1: 設定オブジェクトと基本構造を作成**

```javascript
/**
 * LINE自動返信システム
 *
 * Chatworkルーム1（受信通知）を5分ごとにポーリングし、
 * 新着メッセージを検出してClaude APIで返信文を生成、
 * ルーム2（AIドラフト）に投稿する。
 *
 * セットアップ:
 * 1. CONFIG にAPIトークン、ルームID、スプレッドシートIDを設定
 * 2. setupTrigger() を1回実行
 */

const CONFIG = {
  // Chatwork
  CHATWORK_API_TOKEN: 'ここにトークン',
  ROOM_ID_INCOMING: 'ルーム1のID',    // 受信通知
  ROOM_ID_DRAFT: 'ルーム2のID',       // AIドラフト
  ROOM_ID_SENT: 'ルーム3のID',        // 送信済みログ

  // Claude API
  CLAUDE_API_KEY: 'ここにAPIキー',
  CLAUDE_MODEL: 'claude-sonnet-4-6-20250514',

  // スプレッドシートDB
  SPREADSHEET_ID: 'ここにスプレッドシートID',
  SHEET_NAME_HISTORY: '履歴',
  SHEET_NAME_SETTINGS: '設定',

  // 処理設定
  MAX_HISTORY_FOR_PROMPT: 20, // プロンプトに含める履歴の最大件数
};
```

**Step 2: ファイルが正しく作成されたことを確認**

ファイルを読み返して構文エラーがないか確認。

---

### Task 1-2: Chatwork API連携関数

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: Chatworkメッセージ取得関数を追加**

```javascript
/**
 * Chatworkのルームからメッセージを取得
 * @param {string} roomId - ルームID
 * @param {boolean} forceAll - trueで最新100件、falseで未読のみ
 * @returns {Array} メッセージ配列
 */
function getChatworkMessages(roomId, forceAll) {
  const force = forceAll ? 1 : 0;
  const url = `https://api.chatwork.com/v2/rooms/${roomId}/messages?force=${force}`;
  const options = {
    method: 'get',
    headers: { 'X-ChatWorkToken': CONFIG.CHATWORK_API_TOKEN },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();

  if (code === 204) return []; // メッセージなし
  if (code !== 200) {
    Logger.log(`Chatwork API error: ${code} ${response.getContentText()}`);
    return [];
  }

  return JSON.parse(response.getContentText());
}

/**
 * Chatworkにメッセージを投稿
 * @param {string} roomId - ルームID
 * @param {string} body - メッセージ本文
 */
function postChatworkMessage(roomId, body) {
  const url = `https://api.chatwork.com/v2/rooms/${roomId}/messages`;
  const options = {
    method: 'post',
    headers: { 'X-ChatWorkToken': CONFIG.CHATWORK_API_TOKEN },
    payload: { body: body },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() !== 200) {
    Logger.log(`Chatwork POST error: ${response.getResponseCode()} ${response.getContentText()}`);
  }
}
```

**Step 2: テスト関数で動作確認**

```javascript
/** Chatwork接続テスト */
function testChatworkConnection() {
  const messages = getChatworkMessages(CONFIG.ROOM_ID_INCOMING, true);
  Logger.log(`取得メッセージ数: ${messages.length}`);
  if (messages.length > 0) {
    Logger.log(`最新メッセージ: ${messages[messages.length - 1].body}`);
  }
}
```

GASエディタで `testChatworkConnection` を実行し、メッセージが取得できることを確認。

---

### Task 1-3: スプレッドシートDB操作関数

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: DB読み書き関数を追加**

```javascript
/**
 * スプレッドシートDBに履歴を追記
 * @param {string} customerName - 顧客名
 * @param {string} type - 種別（受信/AIドラフト/送信済み）
 * @param {string} content - メッセージ内容
 * @param {string} messageId - Chatworkメッセージ ID（重複防止用）
 */
function saveToDatabase(customerName, type, content, messageId) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_HISTORY);
  const now = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
  sheet.appendRow([now, customerName, type, content, messageId || '']);
}

/**
 * 顧客の過去履歴をDBから取得
 * @param {string} customerName - 顧客名
 * @returns {Array} [{日時, 種別, 内容}, ...]
 */
function getCustomerHistory(customerName) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_HISTORY);
  const data = sheet.getDataRange().getValues();
  const history = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === customerName) {
      history.push({
        date: data[i][0],
        type: data[i][2],
        content: data[i][3],
      });
    }
  }

  // 最新N件に制限
  return history.slice(-CONFIG.MAX_HISTORY_FOR_PROMPT);
}

/**
 * 最終処理済みメッセージIDを取得・更新
 */
function getLastProcessedId() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_SETTINGS);
  return sheet.getRange('B2').getValue().toString();
}

function setLastProcessedId(messageId) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_SETTINGS);
  sheet.getRange('B2').setValue(messageId);
}
```

**Step 2: テスト関数で動作確認**

```javascript
/** DB書き込みテスト */
function testDatabase() {
  saveToDatabase('テスト太郎', '受信', 'これはテストメッセージです', 'test_001');
  const history = getCustomerHistory('テスト太郎');
  Logger.log(`履歴件数: ${history.length}`);
  Logger.log(JSON.stringify(history));
}
```

GASエディタで `testDatabase` を実行し、スプレッドシートに行が追加されることを確認。

---

### Task 1-4: Claude API連携関数

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: Claude API呼び出し関数を追加**

```javascript
/**
 * Claude APIで返信文を生成
 * @param {string} customerName - 顧客名
 * @param {string} latestMessage - 最新の受信メッセージ
 * @param {Array} history - 過去履歴
 * @returns {string} 生成された返信文
 */
function generateReply(customerName, latestMessage, history) {
  const historyText = history.map(h => {
    const label = h.type === '受信' ? `${customerName}` :
                  h.type === '送信済み' ? 'あなた（実際の返信）' : 'AI提案';
    return `[${h.date}] ${label}: ${h.content}`;
  }).join('\n');

  const systemPrompt = `あなたはセールス担当のアシスタントです。
LINE公式アカウントでお客様に返信するドラフトを作成してください。

## ルール
- 目的: お客様の購入・申し込みにつなげるセールス対応
- トーン: 過去の「送信済み」テキストの傾向に合わせる。なければ丁寧かつ親しみやすいトーン
- 長さ: 100〜300文字（LINE返信として自然な長さ）
- 禁止: 具体的な金額は出さない。相談や面談に誘導する
- 参照: 過去の会話からお客様の興味・関心を拾って提案に活かす

## 重要
- 「送信済み」のテキストが最も重要な学習データです。そのトーンや表現を優先的に参考にしてください
- 返信文のみを出力してください（説明や注釈は不要）`;

  const userPrompt = `## 過去の会話履歴
${historyText || '(履歴なし)'}

## 最新の受信メッセージ
${customerName}: ${latestMessage}

上記を踏まえて、${customerName}さんへの返信文を作成してください。`;

  const url = 'https://api.anthropic.com/v1/messages';
  const options = {
    method: 'post',
    headers: {
      'x-api-key': CONFIG.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    payload: JSON.stringify({
      model: CONFIG.CLAUDE_MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() !== 200) {
    Logger.log(`Claude API error: ${response.getResponseCode()} ${response.getContentText()}`);
    return null;
  }

  const result = JSON.parse(response.getContentText());
  return result.content[0].text;
}
```

**Step 2: テスト関数で動作確認**

```javascript
/** Claude API テスト */
function testClaudeAPI() {
  const reply = generateReply(
    'テスト太郎',
    '先日のセミナーの件で質問があります',
    [{ date: '2026/02/20', type: '受信', content: 'セミナーに参加しました。ありがとうございました。' }]
  );
  Logger.log(`生成された返信: ${reply}`);
}
```

GASエディタで `testClaudeAPI` を実行し、返信文が生成されることを確認。

---

### Task 1-5: ウタゲ通知メッセージのパース関数

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: 通知からの顧客名・メッセージ抽出**

※ ウタゲの通知フォーマットは実際のメッセージを見て調整が必要。
以下は一般的なパターン。

```javascript
/**
 * ウタゲからのChatwork通知メッセージを解析して顧客名とメッセージを抽出
 * @param {string} body - Chatworkメッセージ本文
 * @returns {Object|null} {customerName, message} または null（通知でない場合）
 */
function parseUtageNotification(body) {
  // TODO: 実際のウタゲ通知フォーマットに合わせて調整
  // 以下は一般的なパターン（実際のフォーマット確認後に修正）

  // パターン1: 「名前」さんからメッセージ\nメッセージ内容
  const pattern1 = /^(.+?)(?:さん|様)?(?:から)?(?:メッセージ|LINE).*/;
  // パターン2: [名前] メッセージ内容
  const pattern2 = /^\[(.+?)\]\s*(.+)/s;

  let customerName = null;
  let message = null;

  // 実際の通知フォーマットに基づいて解析ロジックを実装
  // フォーマット確認後にここを更新する

  const lines = body.split('\n').filter(l => l.trim());
  if (lines.length >= 2) {
    customerName = lines[0].replace(/さん.*$/, '').trim();
    message = lines.slice(1).join('\n').trim();
  }

  if (!customerName || !message) return null;
  return { customerName, message };
}
```

**Step 2: 実際のウタゲ通知を確認して修正**

GASエディタで `testChatworkConnection` を実行し、ルーム1のメッセージを確認。
実際のフォーマットに合わせて `parseUtageNotification` を調整する。

---

## Phase 2: メイン処理 + トリガー設定

### Task 2-1: メインポーリング処理

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: メイン処理関数を追加**

```javascript
/**
 * メイン処理: ルーム1の新着メッセージを確認し、AIドラフトを生成
 * 5分ごとにトリガーで自動実行
 */
function checkAndReply() {
  const messages = getChatworkMessages(CONFIG.ROOM_ID_INCOMING, true);
  if (messages.length === 0) return;

  const lastId = getLastProcessedId();
  let newLastId = lastId;
  let processedCount = 0;

  for (const msg of messages) {
    const msgId = msg.message_id.toString();

    // 既に処理済みならスキップ
    if (lastId && parseInt(msgId) <= parseInt(lastId)) continue;

    // ウタゲ通知を解析
    const parsed = parseUtageNotification(msg.body);
    if (!parsed) continue;

    const { customerName, message } = parsed;

    // DBに受信メッセージを保存
    saveToDatabase(customerName, '受信', message, msgId);

    // 過去履歴を取得
    const history = getCustomerHistory(customerName);

    // Claude APIで返信文を生成
    const reply = generateReply(customerName, message, history);
    if (!reply) continue;

    // AIドラフトをDBに保存
    saveToDatabase(customerName, 'AIドラフト', reply, '');

    // ルーム2にドラフトを投稿
    const draftMessage = `[info][title]${customerName}さん宛 AI返信ドラフト[/title]${reply}[/info]`;
    postChatworkMessage(CONFIG.ROOM_ID_DRAFT, draftMessage);

    newLastId = msgId;
    processedCount++;
  }

  if (processedCount > 0) {
    setLastProcessedId(newLastId);
    Logger.log(`${processedCount} 件の返信ドラフトを生成しました`);
  }
}
```

**Step 2: テスト実行**

GASエディタで `checkAndReply` を手動実行し、ルーム2にドラフトが投稿されることを確認。

---

### Task 2-2: トリガー設定

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: トリガーセットアップ関数を追加**

```javascript
/**
 * トリガーのセットアップ（初回のみ実行）
 * 5分おきに checkAndReply を自動実行
 */
function setupTrigger() {
  // 既存のトリガーを削除
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'checkAndReply') {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  ScriptApp.newTrigger('checkAndReply')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('トリガー設定完了: 5分おきに checkAndReply を実行');
}

/**
 * トリガーの削除（停止したい場合）
 */
function removeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'checkAndReply') {
      ScriptApp.deleteTrigger(trigger);
    }
  }
  Logger.log('トリガーを削除しました');
}
```

**Step 2: トリガーを設定**

GASエディタで `setupTrigger` を実行。

**Step 3: 動作確認**

5分待って、ルーム1に新しいメッセージが来ている場合、ルーム2にドラフトが自動投稿されることを確認。

---

## Phase 3: 送信済みログ取り込み

### Task 3-1: ルーム3からの送信済みテキスト自動取り込み

**Files:**
- Modify: `gas-scripts/line-auto-reply.gs`

**Step 1: ルーム3読み取り関数を追加**

```javascript
/**
 * ルーム3（送信済みログ）の新着メッセージをDBに取り込む
 * 担当者が貼り付けたテキストを自動でDB保存
 *
 * 想定フォーマット:
 *   [顧客名]
 *   送信した本文
 *
 * または:
 *   顧客名: 送信した本文
 */
function importSentMessages() {
  const messages = getChatworkMessages(CONFIG.ROOM_ID_SENT, true);
  if (messages.length === 0) return;

  const lastId = getLastProcessedSentId();
  let newLastId = lastId;
  let importCount = 0;

  for (const msg of messages) {
    const msgId = msg.message_id.toString();
    if (lastId && parseInt(msgId) <= parseInt(lastId)) continue;

    const parsed = parseSentMessage(msg.body);
    if (!parsed) continue;

    saveToDatabase(parsed.customerName, '送信済み', parsed.message, msgId);
    newLastId = msgId;
    importCount++;
  }

  if (importCount > 0) {
    setLastProcessedSentId(newLastId);
    Logger.log(`${importCount} 件の送信済みメッセージをDBに取り込みました`);
  }
}

/**
 * 送信済みログのメッセージを解析
 * @param {string} body - Chatworkメッセージ本文
 * @returns {Object|null} {customerName, message}
 */
function parseSentMessage(body) {
  const lines = body.split('\n').filter(l => l.trim());
  if (lines.length < 2) return null;

  // パターン: [顧客名]\n本文
  const bracketMatch = lines[0].match(/^\[(.+?)\]$/);
  if (bracketMatch) {
    return {
      customerName: bracketMatch[1],
      message: lines.slice(1).join('\n').trim(),
    };
  }

  // パターン: 顧客名: 本文
  const colonMatch = lines[0].match(/^(.+?)[:：]\s*$/);
  if (colonMatch) {
    return {
      customerName: colonMatch[1],
      message: lines.slice(1).join('\n').trim(),
    };
  }

  return null;
}

/**
 * 送信済みログ用の最終処理IDの取得・更新
 */
function getLastProcessedSentId() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_SETTINGS);
  return (sheet.getRange('B6').getValue() || '').toString();
}

function setLastProcessedSentId(messageId) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_SETTINGS);
  sheet.getRange('B6').setValue(messageId);
}
```

**Step 2: トリガーに送信済みログの取り込みも追加**

`checkAndReply` の末尾に以下を追加:

```javascript
  // ルーム3の送信済みログもチェック
  importSentMessages();
```

**Step 3: テスト実行**

ルーム3に以下のフォーマットでテストメッセージを投稿:
```
[テスト太郎]
テスト太郎さん、お世話になっております。先日はありがとうございました。
```

GASエディタで `importSentMessages` を実行し、スプレッドシートDBに「送信済み」として追加されることを確認。

---

## Phase 4: GASエディタへのデプロイ

### Task 4-1: GASエディタにコードを反映

**Step 1: Edge MCPでGASエディタを開く**

**Step 2: Monaco editorにコードを一括設定**

```javascript
window.monaco.editor.getModels()[0].setValue(code)
```

**Step 3: CONFIGに実際の値を設定**

- CHATWORK_API_TOKEN
- ROOM_ID_INCOMING / ROOM_ID_DRAFT / ROOM_ID_SENT
- CLAUDE_API_KEY
- SPREADSHEET_ID

**Step 4: 保存してテスト実行**

1. `testChatworkConnection` → Chatwork接続OK確認
2. `testDatabase` → DB読み書きOK確認
3. `testClaudeAPI` → Claude API応答OK確認
4. `checkAndReply` → エンドツーエンド動作確認

**Step 5: setupTrigger を実行**

自動ポーリングを開始。

**Step 6: コミット**

```bash
git add gas-scripts/line-auto-reply.gs
git commit -m "feat: LINE自動返信システムのGASスクリプト追加"
```

---

## 設定シート最終形

```
A1: 項目                | B1: 値
A2: 最終処理ID(受信)     | B2: (自動更新)
A3: ルーム1 ID          | B3: xxxxxx
A4: ルーム2 ID          | B4: xxxxxx
A5: ルーム3 ID          | B5: xxxxxx
A6: 最終処理ID(送信済み) | B6: (自動更新)
```

## 担当者の運用フロー

1. **朝**: Chatworkルーム2を見る → AIドラフトが溜まっている
2. **確認**: 内容を確認・修正してウタゲから実際に送信
3. **記録**: 送った文をコピーしてルーム3に `[顧客名]` + 本文 で貼り付け
4. → GASが5分ごとに自動でDBに取り込み → AIの精度が向上
