/**
 * LINE コマンドボット
 *
 * LINEからメッセージを受信し、コマンドに応じて処理・返信する。
 *
 * 対応コマンド:
 * - X/Twitter URL → ツイート内容を取得してClaude APIで分析
 * - テキスト → Claude APIに一般質問
 * - 「リセット」→ 会話履歴クリア
 *
 * セットアップ:
 * 1. GASプロジェクトを新規作成
 * 2. このコードを貼り付け
 * 3. スクリプトプロパティを設定:
 *    - LINE_CHANNEL_ACCESS_TOKEN: LINE Messaging API チャネルアクセストークン
 *    - X_BEARER_TOKEN: X API Bearer Token
 *    - CLAUDE_API_KEY: Anthropic API Key
 * 4. Web Appとしてデプロイ（実行: 自分、アクセス: 全員）
 * 5. LINE DevelopersでWebhook URLにデプロイURLを設定
 */

// ===== 設定 =====
var CONFIG = {
  // X API設定
  X_API_BASE: 'https://api.x.com/2',

  // Claude API設定
  CLAUDE_MODEL: 'claude-sonnet-4-20250514',
  CLAUDE_MAX_TOKENS: 2048,

  // LINE設定
  LINE_REPLY_URL: 'https://api.line.me/v2/bot/message/reply',
  LINE_PUSH_URL: 'https://api.line.me/v2/bot/message/push',
  LINE_MAX_TEXT_LENGTH: 5000,

  // 会話履歴設定
  HISTORY_MAX_TURNS: 10,

  // 会社コンテキスト
  SYSTEM_PROMPT: 'あなたはAI×マーケティングに詳しいアシスタントです。'
    + 'マーケティング支援・留学支援会社で働いており、ウタゲ(LP制作ツール)、LINE公式アカウント、Meta広告、Google広告を運用しています。'
    + '質問には簡潔かつ実用的に答えてください。日本語で回答してください。'
    + 'LINEでの返信なので、長すぎず読みやすい形式でお願いします。',

  // ツイート分析用プロンプト
  TWEET_ANALYSIS_PROMPT: '以下のツイートを分析してください。\n'
    + '1. 内容の要約（2-3行）\n'
    + '2. 注目ポイント\n'
    + '3. 弊社（マーケティング支援・留学支援会社）での活用可能性\n\n',
};

// ===== ヘルパー関数 =====

function getProperty(key) {
  var value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) {
    throw new Error('スクリプトプロパティ "' + key + '" が未設定です');
  }
  return value;
}

function formatDateTime(date) {
  return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
}

// ===== Webhook エントリポイント =====

/**
 * LINE Webhookのエントリポイント
 * LINEプラットフォームからのPOSTリクエストを受信し処理する
 *
 * 重要: LINEは200以外を返すとリトライする。どんなエラーでも200を返す。
 */
function doPost(e) {
  try {
    var body = e.postData.contents;
    var json = JSON.parse(body);
    var events = json.events || [];

    for (var i = 0; i < events.length; i++) {
      try {
        processEvent(events[i]);
      } catch (err) {
        Logger.log('イベント処理エラー: ' + err.message + '\n' + err.stack);
        // replyTokenが有効なら、エラーメッセージを返信
        try {
          replyToLine(events[i].replyToken, 'エラーが発生しました: ' + err.message);
        } catch (replyErr) {
          Logger.log('エラー返信も失敗: ' + replyErr.message);
        }
      }
    }
  } catch (outerErr) {
    Logger.log('doPost致命的エラー: ' + outerErr.message);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== コマンドルーティング =====

/**
 * LINE Webhookイベントを処理
 * テキストメッセージのみ対応。URLの有無で処理を振り分ける。
 */
function processEvent(event) {
  // messageイベント以外は無視
  if (event.type !== 'message') return;

  // テキスト以外は非対応
  if (event.message.type !== 'text') {
    replyToLine(event.replyToken, 'テキストメッセージのみ対応しています。');
    return;
  }

  var text = event.message.text.trim();

  // 履歴リセットコマンド
  if (text === 'リセット' || text === '履歴クリア') {
    clearHistory(event.source.userId);
    replyToLine(event.replyToken, '会話履歴をクリアしました。');
    return;
  }

  // X/Twitter URLが含まれているか
  var tweetId = extractTweetId(text);
  if (tweetId) {
    handleTweetAnalysis(event, tweetId);
    return;
  }

  // 一般テキスト → Claude質問
  handleGeneralQuestion(event);
}

/**
 * テキストからX/TwitterのURLを検出し、ツイートIDを抽出する
 *
 * 対応パターン:
 * - https://x.com/user/status/12345
 * - https://twitter.com/user/status/12345
 * - https://x.com/user/status/12345?s=20
 * - https://mobile.twitter.com/user/status/12345
 */
function extractTweetId(text) {
  var pattern = /https?:\/\/(?:mobile\.)?(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
  var match = text.match(pattern);
  return match ? match[1] : null;
}

// ===== X API =====

/**
 * X API v2 でツイートIDから単一ツイートを取得
 * @param {string} tweetId - ツイートID
 * @returns {Object|null} ツイート情報（失敗時はnull）
 */
function fetchTweetById(tweetId) {
  var token = getProperty('X_BEARER_TOKEN');

  var url = CONFIG.X_API_BASE + '/tweets/' + tweetId
    + '?tweet.fields=public_metrics,created_at,author_id'
    + '&expansions=author_id'
    + '&user.fields=name,username';

  var options = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    Logger.log('X APIエラー (' + code + '): ' + response.getContentText());
    return null;
  }

  var json = JSON.parse(response.getContentText());
  if (!json.data) return null;

  var tweet = json.data;
  var user = { name: '不明', username: 'unknown' };

  if (json.includes && json.includes.users && json.includes.users.length > 0) {
    user = json.includes.users[0];
  }

  var metrics = tweet.public_metrics || {};

  return {
    id: tweet.id,
    text: tweet.text,
    author_name: user.name,
    author_username: user.username,
    likes: metrics.like_count || 0,
    retweets: metrics.retweet_count || 0,
    replies: metrics.reply_count || 0,
    created_at: tweet.created_at || '',
    url: 'https://x.com/' + user.username + '/status/' + tweet.id,
  };
}

/**
 * ツイート情報をテキスト形式に整形
 */
function buildTweetContext(tweet) {
  var lines = [];
  lines.push('@' + tweet.author_username + ' (' + tweet.author_name + ')');
  lines.push(tweet.text);
  lines.push('いいね: ' + tweet.likes + ' / RT: ' + tweet.retweets + ' / 返信: ' + tweet.replies);
  lines.push('URL: ' + tweet.url);
  return lines.join('\n');
}

// ===== Claude API =====

/**
 * Claude APIを呼び出してテキスト応答を取得
 * @param {string} systemPrompt - システムプロンプト
 * @param {Array} messages - メッセージ配列 [{role:'user', content:'...'}, ...]
 * @returns {string} 応答テキスト
 */
function callClaudeAPI(systemPrompt, messages) {
  var apiKey = getProperty('CLAUDE_API_KEY');

  var payload = {
    model: CONFIG.CLAUDE_MODEL,
    max_tokens: CONFIG.CLAUDE_MAX_TOKENS,
    system: systemPrompt,
    messages: messages,
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  var code = response.getResponseCode();

  if (code !== 200) {
    Logger.log('Claude APIエラー (' + code + '): ' + response.getContentText());
    throw new Error('AI応答の生成に失敗しました（' + code + '）');
  }

  var json = JSON.parse(response.getContentText());
  var textBlock = null;
  for (var i = 0; i < json.content.length; i++) {
    if (json.content[i].type === 'text') {
      textBlock = json.content[i];
      break;
    }
  }
  if (!textBlock) throw new Error('Claude APIの応答にテキストがありません');
  return textBlock.text;
}

// ===== ツイート分析ハンドラ =====

/**
 * X URLを含むメッセージを処理
 * ツイートを取得→Claudeで分析→LINEに返信
 */
function handleTweetAnalysis(event, tweetId) {
  var userText = event.message.text;
  var replyToken = event.replyToken;

  // 1. ツイート取得
  var tweet = fetchTweetById(tweetId);
  if (!tweet) {
    replyToLine(replyToken, 'ツイートの取得に失敗しました。非公開アカウントまたは削除済みの可能性があります。');
    return;
  }

  // 2. ツイート情報をテキスト化
  var tweetContext = buildTweetContext(tweet);

  // 3. ユーザーの追加指示を抽出（URL部分を除去）
  var userInstruction = userText.replace(/https?:\/\/\S+/g, '').trim();
  if (!userInstruction) {
    userInstruction = '内容を要約して、注目ポイントと活用できそうなポイントを教えてください。';
  }

  // 4. Claude API呼び出し
  var prompt = CONFIG.TWEET_ANALYSIS_PROMPT
    + '【ツイート情報】\n' + tweetContext
    + '\n\n【ユーザーの指示】\n' + userInstruction;

  var analysis = callClaudeAPI(CONFIG.SYSTEM_PROMPT, [
    { role: 'user', content: prompt },
  ]);

  // 5. 返信
  replyToLine(replyToken, analysis);
}

// ===== 一般質問ハンドラ =====

/**
 * テキストメッセージを処理
 * 会話履歴付きでClaudeに質問→LINEに返信
 */
function handleGeneralQuestion(event) {
  var userText = event.message.text;
  var replyToken = event.replyToken;
  var userId = event.source.userId;

  // 1. 会話履歴を取得
  var history = getRecentHistory(userId);

  // 2. メッセージ配列を構築
  var messages = history.concat([
    { role: 'user', content: userText },
  ]);

  // 3. Claude API呼び出し
  var answer = callClaudeAPI(CONFIG.SYSTEM_PROMPT, messages);

  // 4. 返信
  replyToLine(replyToken, answer);

  // 5. 履歴保存
  saveConversation(userId, userText, answer);
}

// ===== LINE Reply API =====

/**
 * LINE Reply API でメッセージを返信
 * replyTokenは1回限り使用可能。無料。
 */
function replyToLine(replyToken, text) {
  var token = getProperty('LINE_CHANNEL_ACCESS_TOKEN');

  // 5000文字制限対策
  if (text.length > CONFIG.LINE_MAX_TEXT_LENGTH) {
    text = text.substring(0, CONFIG.LINE_MAX_TEXT_LENGTH - 30)
      + '\n\n...（文字数制限のため省略）';
  }

  var payload = {
    replyToken: replyToken,
    messages: [
      { type: 'text', text: text },
    ],
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(CONFIG.LINE_REPLY_URL, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    Logger.log('LINE Reply APIエラー (' + code + '): ' + response.getContentText());
  }
}

/**
 * LINE Push API でメッセージを送信（テスト用 / replyToken期限切れ時のフォールバック）
 */
function pushToLine(text) {
  var token = getProperty('LINE_CHANNEL_ACCESS_TOKEN');
  var userId = getProperty('LINE_USER_ID');

  if (text.length > CONFIG.LINE_MAX_TEXT_LENGTH) {
    text = text.substring(0, CONFIG.LINE_MAX_TEXT_LENGTH - 30)
      + '\n\n...（文字数制限のため省略）';
  }

  var payload = {
    to: userId,
    messages: [
      { type: 'text', text: text },
    ],
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(CONFIG.LINE_PUSH_URL, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    Logger.log('LINE Push APIエラー (' + code + '): ' + response.getContentText());
  }
}

// ===== 会話履歴 =====

/**
 * 会話履歴をPropertiesServiceに保存
 * 直近 HISTORY_MAX_TURNS ターンのみ保持
 */
function saveConversation(userId, userMessage, assistantMessage) {
  var key = 'HISTORY_' + userId;
  var props = PropertiesService.getScriptProperties();
  var history = [];

  var existing = props.getProperty(key);
  if (existing) {
    try {
      history = JSON.parse(existing);
    } catch (e) {
      history = [];
    }
  }

  history.push({ role: 'user', content: userMessage });
  history.push({ role: 'assistant', content: assistantMessage });

  // 直近N件のみ保持（1ターン = 2メッセージ）
  var maxMessages = CONFIG.HISTORY_MAX_TURNS * 2;
  if (history.length > maxMessages) {
    history = history.slice(history.length - maxMessages);
  }

  // PropertiesServiceの1プロパティあたり9KB制限への対策
  var json = JSON.stringify(history);
  while (json.length > 8000 && history.length > 2) {
    history.splice(0, 2);
    json = JSON.stringify(history);
  }

  props.setProperty(key, json);
}

/**
 * 直近の会話履歴を取得
 */
function getRecentHistory(userId) {
  var key = 'HISTORY_' + userId;
  var existing = PropertiesService.getScriptProperties().getProperty(key);
  if (!existing) return [];
  try {
    return JSON.parse(existing);
  } catch (e) {
    return [];
  }
}

/**
 * 会話履歴をクリア
 */
function clearHistory(userId) {
  var key = 'HISTORY_' + userId;
  PropertiesService.getScriptProperties().deleteProperty(key);
  Logger.log('会話履歴をクリア: ' + userId);
}

// ===== テスト関数 =====

/**
 * テスト: X API ツイート単体取得
 */
function testFetchTweet() {
  // 有名なツイートIDで試す（適宜変更）
  var tweetId = '1895178481093804166';
  var tweet = fetchTweetById(tweetId);
  if (tweet) {
    Logger.log('ツイート取得成功:');
    Logger.log('  @' + tweet.author_username + ': ' + tweet.text.substring(0, 80) + '...');
    Logger.log('  いいね: ' + tweet.likes + ', RT: ' + tweet.retweets);
  } else {
    Logger.log('ツイート取得失敗');
  }
}

/**
 * テスト: Claude API チャット
 */
function testClaudeChat() {
  var answer = callClaudeAPI(
    CONFIG.SYSTEM_PROMPT,
    [{ role: 'user', content: 'テスト: LINE公式アカウントの活用法を1つ教えてください。' }]
  );
  Logger.log('Claude応答: ' + answer);
}

/**
 * テスト: LINE Push通知（Reply APIはreplyToken必要なのでPushで代用）
 */
function testLinePush() {
  pushToLine('LINE コマンドボット テスト通知\n\nこのメッセージが届いていれば、接続は正常です。');
}

/**
 * テスト: ツイートID抽出
 */
function testExtractTweetId() {
  var cases = [
    'https://x.com/user/status/12345',
    'https://twitter.com/user/status/67890',
    'https://x.com/user/status/11111?s=20',
    'これ調べて https://x.com/user/status/22222 面白い',
    '普通のテキスト',
  ];
  for (var i = 0; i < cases.length; i++) {
    Logger.log(cases[i] + ' → ' + extractTweetId(cases[i]));
  }
}

/**
 * テスト: 会話履歴の保存と取得
 */
function testConversationHistory() {
  var testUserId = 'test_user_001';
  saveConversation(testUserId, 'テスト質問です', 'テスト回答です');
  var history = getRecentHistory(testUserId);
  Logger.log('履歴件数: ' + history.length);
  Logger.log(JSON.stringify(history, null, 2));
  // クリーンアップ
  clearHistory(testUserId);
  Logger.log('クリア後: ' + getRecentHistory(testUserId).length + ' 件');
}

/**
 * テスト: Webhook処理シミュレーション（ログ出力のみ、LINE返信は送らない）
 */
function testWebhookSimulate() {
  Logger.log('=== Webhookシミュレーション ===');

  // テスト1: テキストメッセージ
  Logger.log('--- テスト1: テキスト ---');
  var text1 = 'AIマーケティングのトレンドを教えて';
  var tweetId1 = extractTweetId(text1);
  Logger.log('入力: ' + text1);
  Logger.log('ツイートID: ' + (tweetId1 || 'なし → 一般質問として処理'));

  // テスト2: X URL
  Logger.log('--- テスト2: X URL ---');
  var text2 = 'これ調べて https://x.com/elonmusk/status/1234567890';
  var tweetId2 = extractTweetId(text2);
  Logger.log('入力: ' + text2);
  Logger.log('ツイートID: ' + (tweetId2 || 'なし'));
  var instruction = text2.replace(/https?:\/\/\S+/g, '').trim();
  Logger.log('ユーザー指示: ' + (instruction || '（なし → デフォルト指示）'));

  // テスト3: リセット
  Logger.log('--- テスト3: リセット ---');
  Logger.log('入力: リセット → 会話履歴クリア処理');
}
