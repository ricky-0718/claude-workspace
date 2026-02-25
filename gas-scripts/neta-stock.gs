/**
 * SNSネタ自動ストックシステム
 *
 * Google Custom Search APIで検索上位コンテンツを収集し、
 * Claude APIでSNS投稿ネタを自動生成してスプレッドシートにストックする。
 *
 * セットアップ:
 * 1. スプレッドシートを作成し、3シート（設定/収集データ/ネタストック）を用意
 * 2. スクリプトプロパティに CUSTOM_SEARCH_API_KEY, CUSTOM_SEARCH_ENGINE_ID, CLAUDE_API_KEY を設定
 * 3. initHeaders() を実行してヘッダーを設定
 * 4. 設定シートにテーマ×検索クエリを入力
 * 5. setupTriggers() を1回実行
 */

// ===== 設定 =====
const CONFIG = {
  // スプレッドシートID（ユーザーが作成したものに置き換え）
  SPREADSHEET_ID: '', // <- ここにスプレッドシートIDを設定

  // シート名
  SHEET_SETTINGS: '設定',
  SHEET_COLLECTED: '収集データ',
  SHEET_NETA: 'ネタストック',

  // Custom Search API設定
  SEARCH_RESULTS_PER_QUERY: 10, // 1回の検索で取得する件数（最大10）

  // Claude API設定
  CLAUDE_MODEL: 'claude-sonnet-4-20250514',
  CLAUDE_MAX_TOKENS: 4096,
  NETA_COUNT_PER_GROUP: 5, // テーマxプラットフォームあたりの生成ネタ数

  // 生成トリガー時刻
  GENERATE_HOUR: 8, // 朝8時
};

// ===== シートヘッダー定義 =====
const HEADERS = {
  SETTINGS: ['テーマ', 'プラットフォーム', '検索クエリ', '最終実行日時'],
  COLLECTED: ['収集日時', 'テーマ', 'プラットフォーム', 'タイトル', 'URL', 'スニペット', 'ネタ生成済み'],
  NETA: ['生成日時', 'テーマ', 'プラットフォーム', 'ネタタイトル', '投稿案', '元ネタURL', 'ステータス'],
};

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
    throw new Error('スクリプトプロパティ "' + key + '" が未設定です');
  }
  return value;
}

/**
 * 現在日時をフォーマット（yyyy/MM/dd HH:mm:ss）
 */
function formatDateTime(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss');
}

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
    Logger.log('Custom Search APIエラー (' + code + '): ' + response.getContentText());
    return [];
  }

  const json = JSON.parse(response.getContentText());
  const items = json.items || [];

  return items.map(function(item) {
    return {
      title: item.title || '',
      url: item.link || '',
      snippet: item.snippet || '',
    };
  });
}

// ===== 収集処理 =====

/**
 * 設定シートから「最終実行日時が最も古い行」を1つ取得（ラウンドロビン方式）
 * 全テーマを均等に処理するため、最も長く更新されていない行を選ぶ
 * @returns {{row: number, theme: string, platform: string, query: string} | null}
 */
function getNextSettingsRow() {
  const sheet = getSheet(CONFIG.SHEET_SETTINGS);
  const data = sheet.getDataRange().getValues();

  // ヘッダー行のみ = データなし
  if (data.length <= 1) {
    Logger.log('設定シートにデータがありません');
    return null;
  }

  var oldestRow = null;
  var oldestTime = new Date();

  // ヘッダー行(index 0)をスキップ
  for (var i = 1; i < data.length; i++) {
    var theme = data[i][0];
    var platform = data[i][1];
    var query = data[i][2];
    var lastRun = data[i][3];

    // テーマとクエリが空の行はスキップ
    if (!theme || !query) continue;

    // 最終実行日時が未設定 = まだ一度も実行されていない = 最優先
    var lastRunDate = lastRun ? new Date(lastRun) : new Date(0);

    if (!oldestRow || lastRunDate < oldestTime) {
      oldestTime = lastRunDate;
      oldestRow = {
        row: i + 1, // 1-indexed（Sheets APIの行番号）
        theme: theme,
        platform: platform,
        query: query,
      };
    }
  }

  return oldestRow;
}

/**
 * 収集データシートに既に存在するURLのセットを取得（重複チェック用）
 * @returns {Object} URLをキーとしたオブジェクト（Setの代替）
 */
function getExistingUrls() {
  var sheet = getSheet(CONFIG.SHEET_COLLECTED);
  var data = sheet.getDataRange().getValues();
  var urls = {};

  // E列（index 4）がURL
  for (var i = 1; i < data.length; i++) {
    if (data[i][4]) {
      urls[data[i][4]] = true;
    }
  }

  return urls;
}

/**
 * 設定シートの最終実行日時を更新
 * @param {number} row - 設定シートの行番号（1-indexed）
 */
function updateLastRunTime(row) {
  var sheet = getSheet(CONFIG.SHEET_SETTINGS);
  sheet.getRange(row, 4).setValue(formatDateTime(new Date())); // D列 = 4
}

/**
 * メイン: コンテンツ収集（5分おきトリガーで実行）
 * 設定シートから1行を選び、Custom Search APIで検索、結果を収集データシートに追記
 */
function collectContent() {
  var target = getNextSettingsRow();
  if (!target) {
    Logger.log('処理対象なし');
    return;
  }

  Logger.log('収集開始: ' + target.theme + ' / ' + target.platform + ' / クエリ: ' + target.query);

  // 検索実行
  var results = searchWithCustomSearch(target.query);
  if (results.length === 0) {
    Logger.log('検索結果が0件でした');
    // 最終実行日時は更新する（無限ループ防止）
    updateLastRunTime(target.row);
    return;
  }

  // 重複チェック: 既に収集済みのURLをスキップ
  var existingUrls = getExistingUrls();
  var newResults = results.filter(function(r) {
    return !existingUrls[r.url];
  });
  Logger.log('新規: ' + newResults.length + ' 件 / 全体: ' + results.length + ' 件');

  // 収集データシートに追記
  if (newResults.length > 0) {
    var sheet = getSheet(CONFIG.SHEET_COLLECTED);
    var now = formatDateTime(new Date());
    var rows = newResults.map(function(r) {
      return [
        now,
        target.theme,
        target.platform,
        r.title,
        r.url,
        r.snippet,
        false, // ネタ生成済み = FALSE
      ];
    });
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  }

  // 最終実行日時を更新
  updateLastRunTime(target.row);

  Logger.log('収集完了: ' + newResults.length + ' 件を保存');
}

// ===== Claude API =====

/**
 * Claude APIを呼び出してテキスト応答を取得
 * @param {string} prompt - ユーザープロンプト
 * @returns {string} Claude の応答テキスト
 */
function callClaudeAPI(prompt) {
  var apiKey = getProperty('CLAUDE_API_KEY');

  var payload = {
    model: CONFIG.CLAUDE_MODEL,
    max_tokens: CONFIG.CLAUDE_MAX_TOKENS,
    messages: [
      { role: 'user', content: prompt }
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
  return json.content[0].text;
}

// ===== ネタ生成処理 =====

/**
 * 収集データシートから未処理データをテーマxプラットフォームでグルーピング
 * @returns {Object} キー: "テーマ|||プラットフォーム", 値: 収集データ配列
 */
function getUnprocessedCollectedData() {
  var sheet = getSheet(CONFIG.SHEET_COLLECTED);
  var data = sheet.getDataRange().getValues();
  var groups = {};

  for (var i = 1; i < data.length; i++) {
    var isProcessed = data[i][6]; // G列: ネタ生成済み
    if (isProcessed === true || isProcessed === 'TRUE') continue;

    var theme = data[i][1];
    var platform = data[i][2];
    var key = theme + '|||' + platform;

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push({
      row: i + 1, // 1-indexed
      title: data[i][3],
      url: data[i][4],
      snippet: data[i][5],
    });
  }

  return groups;
}

/**
 * Claude APIに送るプロンプトを構築
 * @param {string} theme - テーマ
 * @param {string} platform - プラットフォーム
 * @param {Array} items - 収集データ
 * @returns {string} プロンプト文字列
 */
function buildNetaPrompt(theme, platform, items) {
  var dataText = items.map(function(item, i) {
    return (i + 1) + '. タイトル: ' + item.title + '\n   URL: ' + item.url + '\n   概要: ' + item.snippet;
  }).join('\n\n');

  return 'あなたはSNSマーケティングの専門家です。\n'
    + '以下の検索結果データを参考に、「' + theme + '」に関する ' + platform + ' 向けの投稿ネタを' + CONFIG.NETA_COUNT_PER_GROUP + '個生成してください。\n\n'
    + '各ネタには以下を含めてください：\n'
    + '- title: キャッチーなタイトル（30文字以内）\n'
    + '- body: 投稿本文の案（' + platform + 'に適した長さとトーン）\n'
    + '- source_url: 最も参考にした検索結果のURL（1つ）\n\n'
    + '【収集データ】\n'
    + dataText + '\n\n'
    + '【出力形式】必ずJSON配列のみを返してください。マークダウンのコードブロックは不要です。\n'
    + '[\n'
    + '  {"title": "...", "body": "...", "source_url": "..."}\n'
    + ']';
}

/**
 * メイン: ネタ生成（1日1回トリガーで実行）
 * 未処理の収集データからClaude APIでネタを生成し、ネタストックシートに追記
 */
function generateNeta() {
  var groups = getUnprocessedCollectedData();
  var groupKeys = Object.keys(groups);

  if (groupKeys.length === 0) {
    Logger.log('未処理の収集データがありません');
    return;
  }

  Logger.log('ネタ生成開始: ' + groupKeys.length + ' グループ');

  var netaSheet = getSheet(CONFIG.SHEET_NETA);
  var collectedSheet = getSheet(CONFIG.SHEET_COLLECTED);
  var totalNeta = 0;
  var startTime = new Date().getTime();
  var MAX_EXECUTION_MS = 4 * 60 * 1000; // 4分（6分制限に余裕を持たせる）

  for (var g = 0; g < groupKeys.length; g++) {
    // GAS実行時間制限対策: 4分経過したら中断（残りは次回トリガーで処理）
    if (new Date().getTime() - startTime > MAX_EXECUTION_MS) {
      Logger.log('⏰ 実行時間制限に近づいたため中断（残り ' + (groupKeys.length - g) + ' グループは次回処理）');
      break;
    }

    var key = groupKeys[g];
    var parts = key.split('|||');
    var theme = parts[0];
    var platform = parts[1];
    var items = groups[key];

    Logger.log('  処理中: ' + theme + ' / ' + platform + ' (' + items.length + ' 件)');

    try {
      // Claude APIでネタ生成
      var prompt = buildNetaPrompt(theme, platform, items);
      var response = callClaudeAPI(prompt);

      // JSON解析（マークダウンのコードブロック記法を除去してからパース）
      var cleanJson = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      var netas = JSON.parse(cleanJson);

      // ネタストックシートに追記
      var now = formatDateTime(new Date());
      var rows = netas.map(function(neta) {
        return [
          now,
          theme,
          platform,
          neta.title || '',
          neta.body || '',
          neta.source_url || '',
          '未使用',
        ];
      });
      netaSheet.getRange(netaSheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      totalNeta += rows.length;

      // 収集データの「ネタ生成済み」をTRUEに更新
      for (var j = 0; j < items.length; j++) {
        collectedSheet.getRange(items[j].row, 7).setValue(true); // G列 = 7
      }

      Logger.log('  -> ' + netas.length + ' 件のネタを生成');

    } catch (e) {
      Logger.log('  エラー (' + theme + '/' + platform + '): ' + e.message);
      // エラーが起きてもスキップして次のグループへ
    }
  }

  Logger.log('ネタ生成完了: ' + totalNeta + ' 件を追加');
}

// ===== トリガー管理 =====

/**
 * トリガーのセットアップ（初回のみ実行）
 * - collectContent: 5分おきの時間ベーストリガー
 * - generateNeta: 毎日8時のトリガー
 *
 * 重要: GASのトリガーAPIは .timeBased() を使用（.timeDriven()は存在しない）
 */
function setupTriggers() {
  // 既存トリガーを削除（重複防止）
  removeTriggers();

  // 5分おき: コンテンツ収集
  ScriptApp.newTrigger('collectContent')
    .timeBased()
    .everyMinutes(5)
    .create();

  // 毎日指定時刻: ネタ生成
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
 * collectContent と generateNeta のトリガーを削除
 */
function removeTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (fn === 'collectContent' || fn === 'generateNeta') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  Logger.log('トリガーを削除しました');
}

// ===== ヘッダー初期化 =====

/**
 * シートヘッダーを初期化（シートが空の場合のみ）
 * ヘッダー行を太字で設定する
 */
function initHeaders() {
  var ss = getSpreadsheet();

  var pairs = [
    [CONFIG.SHEET_SETTINGS, HEADERS.SETTINGS],
    [CONFIG.SHEET_COLLECTED, HEADERS.COLLECTED],
    [CONFIG.SHEET_NETA, HEADERS.NETA],
  ];

  for (var i = 0; i < pairs.length; i++) {
    var sheetName = pairs[i][0];
    var headers = pairs[i][1];
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      Logger.log('シート "' + sheetName + '" が見つかりません');
      continue;
    }

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // ヘッダー行を太字に
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      Logger.log('"' + sheetName + '" ヘッダーを設定しました');
    } else {
      Logger.log('"' + sheetName + '" は既にデータあり（スキップ）');
    }
  }
}

// ===== テスト関数 =====

/**
 * テスト: スプレッドシート接続とシート取得
 */
function testConnection() {
  try {
    var ss = getSpreadsheet();
    Logger.log('スプレッドシート: ' + ss.getName());

    var sheets = [CONFIG.SHEET_SETTINGS, CONFIG.SHEET_COLLECTED, CONFIG.SHEET_NETA];
    for (var i = 0; i < sheets.length; i++) {
      var sheet = getSheet(sheets[i]);
      if (sheet) {
        Logger.log('OK シート "' + sheets[i] + '" 存在確認OK (' + sheet.getLastRow() + ' 行)');
      } else {
        Logger.log('NG シート "' + sheets[i] + '" が見つかりません');
      }
    }
  } catch (e) {
    Logger.log('エラー: ' + e.message);
  }
}

/**
 * テスト: Custom Search API検索
 */
function testSearch() {
  var results = searchWithCustomSearch('台湾留学 おすすめ');
  Logger.log('検索結果: ' + results.length + ' 件');
  for (var i = 0; i < results.length; i++) {
    Logger.log('  ' + results[i].title + ' | ' + results[i].url);
  }
}

/**
 * テスト: 収集処理（1回分）
 */
function testCollect() {
  Logger.log('=== 収集テスト開始 ===');
  collectContent();
  Logger.log('=== 収集テスト完了 ===');

  // 収集結果確認
  var sheet = getSheet(CONFIG.SHEET_COLLECTED);
  Logger.log('収集データシート: ' + (sheet.getLastRow() - 1) + ' 件');
}

/**
 * テスト: Claude API接続
 */
function testClaude() {
  var result = callClaudeAPI('「台湾留学」についてのInstagram投稿ネタを1つだけJSON形式で生成してください。形式: {"title": "...", "body": "..."}');
  Logger.log('Claude応答: ' + result);
}

/**
 * テスト: ネタ生成（全グループ）
 */
function testGenerate() {
  Logger.log('=== ネタ生成テスト開始 ===');
  generateNeta();
  Logger.log('=== ネタ生成テスト完了 ===');

  var sheet = getSheet(CONFIG.SHEET_NETA);
  Logger.log('ネタストックシート: ' + (sheet.getLastRow() - 1) + ' 件');
}
