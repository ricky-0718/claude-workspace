/**
 * X AI×マーケティング トレンド自動収集 → LINE通知システム
 *
 * X API v2で検索 → Claude APIで要約・活用提案生成 → LINE通知
 *
 * セットアップ:
 * 1. Google Sheetsを作成（シート名「処理済みツイート」）
 * 2. スクリプトプロパティを設定:
 *    - X_BEARER_TOKEN: X API Bearer Token
 *    - CLAUDE_API_KEY: Anthropic API Key
 *    - LINE_CHANNEL_ACCESS_TOKEN: LINE Messaging API チャネルアクセストークン
 *    - LINE_USER_ID: 通知先のLINEユーザーID
 * 3. initSheet() を実行してヘッダー設定
 * 4. setupTrigger() を実行して毎朝9時トリガーを設定
 */

// ===== 設定 =====
var CONFIG = {
  // スプレッドシートID（処理済みツイート管理用。ユーザーが作成したものに置き換え）
  SPREADSHEET_ID: '1YmSHQXva3-Y3sh6pUwCl9rHesn1Pg5H4nlHFftZ7YOY',

  // シート名
  SHEET_PROCESSED: '処理済みツイート',

  // X API設定
  X_API_BASE: 'https://api.x.com/2',
  MAX_RESULTS: 50,

  // 最低いいね数（ブクマ品質に合わせたフィルタ）
  MIN_LIKES: 30,

  // 検索クエリ（ブックマーク分析から生成）
  SEARCH_QUERIES: [
    '(Claude 活用 OR "Claude Code" OR Anthropic 新機能) lang:ja -is:retweet -is:reply',
    '(AIエージェント OR AI自動化 OR AI業務効率化 OR "AI agent") lang:ja -is:retweet -is:reply',
    '(AI 時短 OR 生成AI 活用 OR AIツール おすすめ OR NotebookLM OR Dify) lang:ja -is:retweet -is:reply',
    '(SNS フォロワー OR Xマネタイズ OR X収益化 OR SNS運用 コツ) lang:ja -is:retweet -is:reply',
  ],

  // 除外キーワード
  EXCLUDED_KEYWORDS: ['PR', '案件', 'アフィリエイト', '情報商材', '稼ぐ'],

  // スコアリング重み
  SCORE_WEIGHT_LIKES: 1.0,
  SCORE_WEIGHT_RETWEETS: 2.0,

  // Claude API設定
  CLAUDE_MODEL: 'claude-sonnet-4-20250514',
  CLAUDE_MAX_TOKENS: 4096,

  // LINE通知設定
  LINE_API_URL: 'https://api.line.me/v2/bot/message/push',
  LINE_MAX_TEXT_LENGTH: 5000,

  // 通知に含めるトップN件
  TOP_N: 5,

  // トリガー時刻
  TRIGGER_HOUR: 9,

  // 弊社コンテキスト（活用提案生成に使用）
  COMPANY_CONTEXT: 'マーケティング支援・留学支援会社。ウタゲ(LP制作ツール)、LINE公式アカウント、Meta広告、Google広告を運用中。リード獲得効率化、広告クリエイティブ自動化、顧客分析、LP最適化に関心がある。',
};

// ===== ヘッダー定義 =====
var HEADERS = {
  PROCESSED: ['ツイートID', '著者名', 'ユーザー名', '本文', 'URL', 'いいね数', 'RT数', 'スコア', '要約', '活用提案', '処理日時'],
};

// ===== ヘルパー関数 =====

function getSpreadsheet() {
  if (!CONFIG.SPREADSHEET_ID) {
    throw new Error('CONFIG.SPREADSHEET_ID が未設定です');
  }
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

function getProperty(key) {
  var value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) {
    throw new Error('スクリプトプロパティ "' + key + '" が未設定です');
  }
  return value;
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'M/d');
}

function formatDateTime(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss');
}

// ===== X API =====

/**
 * X API v2 でツイートを検索
 * @param {string} query - 検索クエリ
 * @returns {Array} ツイートオブジェクトの配列
 */
function searchTweets(query) {
  var token = getProperty('X_BEARER_TOKEN');

  var url = CONFIG.X_API_BASE + '/tweets/search/recent'
    + '?query=' + encodeURIComponent(query)
    + '&max_results=' + CONFIG.MAX_RESULTS
    + '&tweet.fields=public_metrics,created_at,author_id'
    + '&expansions=author_id'
    + '&user.fields=name,username,verified';

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
    return [];
  }

  var json = JSON.parse(response.getContentText());
  var tweets = json.data || [];
  var users = {};

  // ユーザー情報をマッピング
  if (json.includes && json.includes.users) {
    json.includes.users.forEach(function(user) {
      users[user.id] = { name: user.name, username: user.username };
    });
  }

  // ツイートにユーザー情報を付与
  return tweets.map(function(tweet) {
    var user = users[tweet.author_id] || { name: '不明', username: 'unknown' };
    var metrics = tweet.public_metrics || {};
    return {
      id: tweet.id,
      text: tweet.text,
      author_name: user.name,
      author_username: user.username,
      likes: metrics.like_count || 0,
      retweets: metrics.retweet_count || 0,
      replies: metrics.reply_count || 0,
      url: 'https://x.com/' + user.username + '/status/' + tweet.id,
    };
  });
}

/**
 * 全クエリでツイートを収集し、重複排除・フィルタ・スコアリングして返す
 * @returns {Array} スコア降順のツイート配列
 */
function collectAllTweets() {
  var allTweets = [];
  var seenIds = {};

  // 処理済みツイートIDを取得
  var processedIds = getProcessedTweetIds();

  for (var i = 0; i < CONFIG.SEARCH_QUERIES.length; i++) {
    Logger.log('検索クエリ ' + (i + 1) + '/' + CONFIG.SEARCH_QUERIES.length + ': ' + CONFIG.SEARCH_QUERIES[i]);

    var tweets = searchTweets(CONFIG.SEARCH_QUERIES[i]);
    Logger.log('  -> ' + tweets.length + ' 件取得');

    for (var j = 0; j < tweets.length; j++) {
      var tweet = tweets[j];

      // 重複排除（同じツイートが複数クエリにヒットする場合）
      if (seenIds[tweet.id]) continue;
      seenIds[tweet.id] = true;

      // 処理済み排除
      if (processedIds[tweet.id]) continue;

      // 除外キーワードチェック
      if (containsExcludedKeyword(tweet.text)) continue;

      // 最低エンゲージメントフィルタ
      if (tweet.likes < CONFIG.MIN_LIKES) continue;

      // スコア計算
      tweet.score = tweet.likes * CONFIG.SCORE_WEIGHT_LIKES
                  + tweet.retweets * CONFIG.SCORE_WEIGHT_RETWEETS;

      allTweets.push(tweet);
    }

    // レートリミット対策: クエリ間に1秒待機
    if (i < CONFIG.SEARCH_QUERIES.length - 1) {
      Utilities.sleep(1000);
    }
  }

  // スコア降順でソート
  allTweets.sort(function(a, b) { return b.score - a.score; });

  Logger.log('合計: ' + allTweets.length + ' 件の新規ツイート');
  return allTweets;
}

/**
 * 除外キーワードを含むかチェック
 */
function containsExcludedKeyword(text) {
  for (var i = 0; i < CONFIG.EXCLUDED_KEYWORDS.length; i++) {
    if (text.indexOf(CONFIG.EXCLUDED_KEYWORDS[i]) !== -1) return true;
  }
  return false;
}

// ===== Google Sheets（処理済み管理） =====

/**
 * 処理済みツイートIDのセットを取得
 * @returns {Object} ツイートIDをキーとしたオブジェクト
 */
function getProcessedTweetIds() {
  var sheet = getSheet(CONFIG.SHEET_PROCESSED);
  if (!sheet) return {};

  var data = sheet.getDataRange().getValues();
  var ids = {};
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) ids[String(data[i][0])] = true;
  }
  return ids;
}

/**
 * 処理済みツイートをシートに記録
 * @param {Array} tweets - 記録するツイート配列（要約・提案付き）
 */
function recordProcessedTweets(tweets) {
  if (tweets.length === 0) return;

  var sheet = getSheet(CONFIG.SHEET_PROCESSED);
  var now = formatDateTime(new Date());

  var rows = tweets.map(function(t) {
    return [
      t.id,
      t.author_name,
      t.author_username,
      t.text,
      t.url,
      t.likes,
      t.retweets,
      t.score,
      t.summary || '',
      t.proposal || '',
      now,
    ];
  });

  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log('処理済み記録: ' + rows.length + ' 件');
}

// ===== Claude API =====

/**
 * Claude APIを呼び出してテキスト応答を取得
 * @param {string} prompt - プロンプト
 * @returns {string} 応答テキスト
 */
function callClaudeAPI(prompt) {
  var apiKey = getProperty('CLAUDE_API_KEY');

  var payload = {
    model: CONFIG.CLAUDE_MODEL,
    max_tokens: CONFIG.CLAUDE_MAX_TOKENS,
    messages: [
      { role: 'user', content: prompt },
    ],
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
    throw new Error('Claude API returned ' + code);
  }

  var json = JSON.parse(response.getContentText());
  var textBlock = json.content.find(function(block) {
    return block.type === 'text';
  });
  if (!textBlock) throw new Error('Claude APIの応答にテキストブロックがありません');
  return textBlock.text;
}

/**
 * ツイート群をClaude APIで分析・要約・活用提案を生成
 * @param {Array} tweets - 分析対象のツイート配列
 * @returns {Array} summary, proposal が付与されたツイート配列
 */
function analyzeTweets(tweets) {
  if (tweets.length === 0) return [];

  var tweetTexts = tweets.map(function(t, i) {
    return (i + 1) + '. @' + t.author_username + ' (いいね:' + t.likes + ', RT:' + t.retweets + ')\n'
      + t.text + '\n'
      + t.url;
  }).join('\n\n');

  var prompt = 'あなたはAI×マーケティングの専門アナリストです。\n'
    + '以下のX（Twitter）のツイートを分析し、それぞれについて「要約」と「弊社での活用提案」を生成してください。\n\n'
    + '【弊社の情報】\n'
    + CONFIG.COMPANY_CONTEXT + '\n\n'
    + '【ツイート一覧】\n'
    + tweetTexts + '\n\n'
    + '【出力形式】\n'
    + '必ず以下のJSON配列のみを返してください。マークダウンのコードブロックは不要です。\n'
    + '[\n'
    + '  {\n'
    + '    "index": 1,\n'
    + '    "summary": "1行の簡潔な要約（50文字以内）",\n'
    + '    "proposal": "弊社での具体的な活用方法（80文字以内）"\n'
    + '  }\n'
    + ']\n\n'
    + '注意:\n'
    + '- summaryは内容の本質を捉えた1行要約\n'
    + '- proposalは弊社のビジネス（マーケティング支援・留学支援）に直結する具体的な提案\n'
    + '- 「〜に活用できそう」のような曖昧な表現は避け、具体的なアクションを書く';

  try {
    var response = callClaudeAPI(prompt);
    var cleanJson = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    var analyses = JSON.parse(cleanJson);

    // 結果をツイートに付与
    for (var i = 0; i < analyses.length; i++) {
      var idx = analyses[i].index - 1;
      if (idx >= 0 && idx < tweets.length) {
        tweets[idx].summary = analyses[i].summary;
        tweets[idx].proposal = analyses[i].proposal;
      }
    }
  } catch (e) {
    Logger.log('Claude分析エラー: ' + e.message);
    // エラー時はsummary/proposalなしで続行
  }

  return tweets;
}

// ===== LINE通知 =====

/**
 * LINE Messaging API でプッシュメッセージを送信
 * @param {string} text - 送信するテキスト
 */
function sendLineMessage(text) {
  var token = getProperty('LINE_CHANNEL_ACCESS_TOKEN');
  var userId = getProperty('LINE_USER_ID');

  // 5000文字制限対策
  if (text.length > CONFIG.LINE_MAX_TEXT_LENGTH) {
    text = text.substring(0, CONFIG.LINE_MAX_TEXT_LENGTH - 20) + '\n\n...（続きはシートで確認）';
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

  var response = UrlFetchApp.fetch(CONFIG.LINE_API_URL, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    Logger.log('LINE APIエラー (' + code + '): ' + response.getContentText());
    throw new Error('LINE API returned ' + code);
  }

  Logger.log('LINE通知送信完了');
}

/**
 * ツイート分析結果からLINE通知テキストを生成
 * @param {Array} tweets - 分析済みツイート配列
 * @param {number} totalCount - 全ツイート数
 * @returns {string} LINE通知テキスト
 */
function buildLineMessage(tweets, totalCount) {
  var today = formatDate(new Date());
  var topTweets = tweets.slice(0, CONFIG.TOP_N);

  var lines = [];
  lines.push('AI×マーケ トレンド速報（' + today + '）');
  lines.push('');
  lines.push('注目トピック TOP' + topTweets.length);
  lines.push('');

  var emojis = ['1.', '2.', '3.', '4.', '5.'];

  for (var i = 0; i < topTweets.length; i++) {
    var t = topTweets[i];
    lines.push(emojis[i] + ' ' + (t.summary || t.text.substring(0, 50)));
    lines.push('  活用: ' + (t.proposal || '分析中'));
    lines.push('  ' + t.url);
    lines.push('  (いいね ' + t.likes + ' / RT ' + t.retweets + ')');
    lines.push('');
  }

  if (totalCount > CONFIG.TOP_N) {
    lines.push('他 ' + (totalCount - CONFIG.TOP_N) + '件のトレンド → スプレッドシートで確認');
  }

  return lines.join('\n');
}

// ===== メイン処理 =====

/**
 * メイン: 毎朝自動実行（トリガーで呼ばれる）
 * 1. X APIで検索
 * 2. 重複排除・フィルタ・スコアリング
 * 3. Claude APIで要約・活用提案生成
 * 4. LINE通知
 * 5. 処理済み記録
 */
function dailyTrendCollect() {
  Logger.log('===== AI×マーケ トレンド収集 開始 =====');
  var startTime = new Date();

  // 1. 全クエリでツイート収集
  var tweets = collectAllTweets();
  if (tweets.length === 0) {
    Logger.log('新規ツイートなし。処理終了');
    sendLineMessage('AI×マーケ トレンド速報（' + formatDate(new Date()) + '）\n\n本日の新規トレンドはありませんでした。');
    return;
  }

  // 2. 上位ツイートをClaude APIで分析（API節約のためTOP_N件のみ）
  var topTweets = tweets.slice(0, CONFIG.TOP_N);
  Logger.log('Claude分析対象: ' + topTweets.length + ' 件');
  topTweets = analyzeTweets(topTweets);

  // 3. LINE通知テキスト生成 & 送信
  var message = buildLineMessage(topTweets, tweets.length);
  sendLineMessage(message);

  // 4. 全ツイートを処理済みとして記録（分析したもの + していないもの）
  // 分析済みのものは要約・提案付き
  var remaining = tweets.slice(CONFIG.TOP_N);
  var allToRecord = topTweets.concat(remaining);
  recordProcessedTweets(allToRecord);

  var elapsed = ((new Date().getTime() - startTime.getTime()) / 1000).toFixed(1);
  Logger.log('===== 完了: ' + tweets.length + ' 件処理, LINE通知済み (' + elapsed + '秒) =====');
}

// ===== トリガー管理 =====

/**
 * 毎朝9時のトリガーを設定（初回のみ実行）
 */
function setupTrigger() {
  removeTrigger();

  ScriptApp.newTrigger('dailyTrendCollect')
    .timeBased()
    .atHour(CONFIG.TRIGGER_HOUR)
    .everyDays(1)
    .create();

  Logger.log('トリガー設定完了: 毎朝 ' + CONFIG.TRIGGER_HOUR + ' 時に dailyTrendCollect を実行');
}

/**
 * dailyTrendCollect のトリガーを削除
 */
function removeTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'dailyTrendCollect') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

// ===== シート初期化 =====

/**
 * 処理済みツイートシートのヘッダーを設定（初回のみ）
 */
function initSheet() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_PROCESSED);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_PROCESSED);
    Logger.log('シート "' + CONFIG.SHEET_PROCESSED + '" を作成しました');
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.PROCESSED.length).setValues([HEADERS.PROCESSED]);
    sheet.getRange(1, 1, 1, HEADERS.PROCESSED.length).setFontWeight('bold');
    Logger.log('ヘッダーを設定しました');
  } else {
    Logger.log('シートにはデータあり（スキップ）');
  }
}

// ===== テスト関数 =====

/**
 * テスト: X API接続（1クエリだけ実行）
 */
function testXApi() {
  var tweets = searchTweets(CONFIG.SEARCH_QUERIES[0]);
  Logger.log('X API テスト: ' + tweets.length + ' 件取得');
  for (var i = 0; i < Math.min(3, tweets.length); i++) {
    Logger.log('  @' + tweets[i].author_username + ': ' + tweets[i].text.substring(0, 60) + '...');
    Logger.log('    いいね: ' + tweets[i].likes + ', RT: ' + tweets[i].retweets);
  }
}

/**
 * テスト: Claude API接続
 */
function testClaudeApi() {
  var result = callClaudeAPI('「AI×マーケティング」のトレンドについて1行で教えてください。');
  Logger.log('Claude テスト: ' + result);
}

/**
 * テスト: LINE通知送信
 */
function testLineNotify() {
  sendLineMessage('AI×マーケ トレンド収集システム テスト通知\n\nこのメッセージが届いていれば、LINE通知は正常に動作しています。');
}

/**
 * テスト: 全フロー（手動テスト用）
 */
function testFullFlow() {
  Logger.log('=== フルフローテスト開始 ===');
  dailyTrendCollect();
  Logger.log('=== フルフローテスト完了 ===');
}

/**
 * テスト: スプレッドシート接続
 */
function testConnection() {
  try {
    var ss = getSpreadsheet();
    Logger.log('スプレッドシート: ' + ss.getName());
    var sheet = getSheet(CONFIG.SHEET_PROCESSED);
    if (sheet) {
      Logger.log('OK シート "' + CONFIG.SHEET_PROCESSED + '" (' + sheet.getLastRow() + ' 行)');
    } else {
      Logger.log('NG シート "' + CONFIG.SHEET_PROCESSED + '" が見つかりません。initSheet()を実行してください');
    }
  } catch (e) {
    Logger.log('エラー: ' + e.message);
  }
}
