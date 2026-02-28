/**
 * Meta広告API自動取得スクリプト — {{CAMPAIGN_NAME}}
 *
 * このファイルはテンプレートから自動生成されました。
 * プレースホルダーは実行時に置換済みです。
 *
 * 初回セットアップ:
 * 1. setupCredentials() を実行してMeta API認証情報を設定
 *    （※自動セットアップ済みの場合はスキップ）
 * 2. exchangeForLongLivedToken() を実行して長期トークンに変換
 *    （※システムユーザートークン使用時はスキップ）
 * 3. testFetchYesterday() で動作確認
 * 4. setupDailyTrigger() でトリガー設定
 */

// === 定数 ===
// {{PLACEHOLDER_NOTE}}: 以下の値はセットアップ時に自動置換されます
const CONFIG = {
  SHEET_NAME: '{{SHEET_NAME}}',                    // デフォルト: 'Meta広告_生データ'
  AD_ACCOUNT_ID: '{{AD_ACCOUNT_ID}}',              // ユーザーの広告アカウントID（act_で始まる）
  CAMPAIGN_ID: '{{CAMPAIGN_ID}}',                  // ユーザー入力のキャンペーンID
  CAMPAIGN_NAME: '{{CAMPAIGN_NAME}}',              // ユーザー入力のキャンペーン名（ログ表示用）
  API_VERSION: 'v22.0',
  API_BASE_URL: 'https://graph.facebook.com',
  FIELDS: 'spend,impressions,reach,inline_link_clicks,frequency,actions',
  TOKEN_LIFETIME_DAYS: 60,
  TOKEN_WARNING_DAYS: 50,
};

// ============================================================
// 認証情報セットアップ
// ============================================================

/**
 * 初回セットアップ: Meta APIの認証情報をスクリプトプロパティに保存
 * この関数を手動で実行してください
 */
function setupCredentials() {
  const ui = SpreadsheetApp.getUi();

  const appId = ui.prompt('Meta アプリID を入力してください:').getResponseText();
  if (!appId) { ui.alert('キャンセルされました'); return; }

  const appSecret = ui.prompt('Meta アプリシークレット を入力してください:').getResponseText();
  if (!appSecret) { ui.alert('キャンセルされました'); return; }

  const accessToken = ui.prompt('Meta アクセストークン を入力してください\n（短期トークンでOK。後で長期に変換します）:').getResponseText();
  if (!accessToken) { ui.alert('キャンセルされました'); return; }

  const email = ui.prompt('エラー通知先メールアドレスを入力してください:').getResponseText();
  if (!email) { ui.alert('キャンセルされました'); return; }

  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    'META_APP_ID': appId,
    'META_APP_SECRET': appSecret,
    'META_ACCESS_TOKEN': accessToken,
    'META_AD_ACCOUNT_ID': CONFIG.AD_ACCOUNT_ID,
    'META_CAMPAIGN_ID': CONFIG.CAMPAIGN_ID,
    'NOTIFICATION_EMAIL': email,
    'TOKEN_SET_DATE': new Date().toISOString(),
    'TOKEN_TYPE': 'user',
  });

  ui.alert('設定完了', '認証情報をスクリプトプロパティに保存しました。\n次に exchangeForLongLivedToken() を実行してください。', ui.ButtonSet.OK);
  Logger.log('認証情報セットアップ完了');
}

// ============================================================
// トークン管理
// ============================================================

/**
 * 短期アクセストークンを長期アクセストークン（60日有効）に変換
 * setupCredentials() の後に1回実行してください
 */
function exchangeForLongLivedToken() {
  const props = PropertiesService.getScriptProperties();
  const appId = props.getProperty('META_APP_ID');
  const appSecret = props.getProperty('META_APP_SECRET');
  const shortToken = props.getProperty('META_ACCESS_TOKEN');

  if (!appId || !appSecret || !shortToken) {
    Logger.log('エラー: 先に setupCredentials() を実行してください');
    try { SpreadsheetApp.getUi().alert('エラー', '先に setupCredentials() を実行してください', SpreadsheetApp.getUi().ButtonSet.OK); } catch(e) { /* エディタ実行時は無視 */ }
    return;
  }

  const url = CONFIG.API_BASE_URL + '/oauth/access_token'
    + '?grant_type=fb_exchange_token'
    + '&client_id=' + appId
    + '&client_secret=' + appSecret
    + '&fb_exchange_token=' + shortToken;

  try {
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const data = JSON.parse(response.getContentText());

    if (data.error) {
      throw new Error(data.error.message);
    }

    props.setProperty('META_ACCESS_TOKEN', data.access_token);
    props.setProperty('TOKEN_SET_DATE', new Date().toISOString());

    Logger.log('長期トークンへの変換成功。有効期限: 約60日');
    try { SpreadsheetApp.getUi().alert('成功', '長期アクセストークンに変換しました（約60日有効）', SpreadsheetApp.getUi().ButtonSet.OK); } catch(uiErr) { /* エディタ実行時は無視 */ }
  } catch (e) {
    Logger.log('トークン変換エラー: ' + e.message);
    try { SpreadsheetApp.getUi().alert('エラー', 'トークン変換に失敗しました:\n' + e.message, SpreadsheetApp.getUi().ButtonSet.OK); } catch(uiErr) { /* エディタ実行時は無視 */ }
  }
}

/**
 * トークンの有効期限をチェックし、警告が必要ならメール送信
 */
function checkTokenExpiry_() {
  const props = PropertiesService.getScriptProperties();
  const tokenSetDate = props.getProperty('TOKEN_SET_DATE');
  if (!tokenSetDate) return;

  const setDate = new Date(tokenSetDate);
  const now = new Date();
  const daysSinceSet = (now - setDate) / (1000 * 60 * 60 * 24);

  if (daysSinceSet >= CONFIG.TOKEN_WARNING_DAYS) {
    const email = props.getProperty('NOTIFICATION_EMAIL');
    if (email) {
      const daysLeft = Math.floor(CONFIG.TOKEN_LIFETIME_DAYS - daysSinceSet);
      const tokenType = props.getProperty('TOKEN_TYPE') || 'unknown';
      MailApp.sendEmail({
        to: email,
        subject: '【警告】Meta広告APIトークンの期限が近づいています (' + CONFIG.CAMPAIGN_NAME + ')',
        body: 'キャンペーン: ' + CONFIG.CAMPAIGN_NAME + '\n'
            + 'トークン種別: ' + tokenType + '\n'
            + 'Meta広告APIのアクセストークンの有効期限まで残り約' + daysLeft + '日です。\n\n'
            + 'トークンを更新してください。\n'
            + 'システムユーザートークンの場合: ビジネスマネージャで新規トークンを生成\n'
            + 'ユーザートークンの場合: Graph API Explorerで新しいトークンを取得\n\n'
            + 'トークン設定日: ' + setDate.toLocaleDateString('ja-JP'),
      });
      Logger.log('トークン期限警告メール送信済み（残り約' + daysLeft + '日）');
    }
  }
}

// ============================================================
// データ取得
// ============================================================

/**
 * 指定日のMeta広告データを取得
 * @param {string} dateStr - 'YYYY-MM-DD' 形式
 * @return {Object|null} 取得データ or null（データなし）
 */
function fetchMetaInsights_(dateStr) {
  const props = PropertiesService.getScriptProperties();
  const accessToken = props.getProperty('META_ACCESS_TOKEN');

  if (!accessToken) {
    throw new Error('アクセストークンが未設定です。setupCredentials() を実行してください。');
  }

  const url = CONFIG.API_BASE_URL + '/' + CONFIG.API_VERSION
    + '/' + CONFIG.AD_ACCOUNT_ID + '/insights'
    + '?fields=' + CONFIG.FIELDS
    + '&time_range=' + encodeURIComponent(JSON.stringify({ since: dateStr, until: dateStr }))
    + '&level=campaign'
    + '&filtering=' + encodeURIComponent(JSON.stringify([
        { field: 'campaign.id', operator: 'EQUAL', value: CONFIG.CAMPAIGN_ID }
      ]))
    + '&access_token=' + accessToken;

  const options = { muteHttpExceptions: true };
  let response;

  // リトライ1回
  for (let attempt = 0; attempt < 2; attempt++) {
    response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) break;
    if (attempt === 0) {
      Logger.log('APIリクエスト失敗（リトライします）: ' + response.getResponseCode());
      Utilities.sleep(3000);
    }
  }

  if (response.getResponseCode() !== 200) {
    throw new Error('API Error (' + response.getResponseCode() + '): ' + response.getContentText());
  }

  const result = JSON.parse(response.getContentText());

  if (!result.data || result.data.length === 0) {
    Logger.log(dateStr + ': データなし（広告停止日の可能性） [' + CONFIG.CAMPAIGN_NAME + ']');
    return null;
  }

  return result.data[0];
}

/**
 * actions配列からLINE登録数を抽出
 * @param {Array} actions - Meta APIのactions配列
 * @return {number}
 */
function extractLineRegistrations_(actions) {
  if (!actions || !Array.isArray(actions)) return 0;

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].action_type === 'offsite_conversion.fb_pixel_complete_registration') {
      return parseInt(actions[i].value, 10) || 0;
    }
  }
  return 0;
}

/**
 * APIレスポンスからシート書き込み用の行データを生成
 * @param {Object} insightData - fetchMetaInsights_()の戻り値
 * @return {Array} [日付, 広告費, IMP, リーチ, クリック, LINE登録, フリークエンシー]
 */
function formatRowData_(insightData) {
  return [
    insightData.date_start,
    parseFloat(insightData.spend || 0),
    parseInt(insightData.impressions || 0, 10),
    parseInt(insightData.reach || 0, 10),
    parseInt(insightData.inline_link_clicks || 0, 10),
    extractLineRegistrations_(insightData.actions),
    parseFloat(insightData.frequency || 0),
  ];
}

// ============================================================
// シート書き込み
// ============================================================

/**
 * データをMeta広告_生データシートに書き込み（重複日付は上書き）
 * @param {Array} rowData - [日付, 広告費, IMP, リーチ, クリック, LINE登録, フリークエンシー]
 */
function writeRowToSheet_(rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error('シート "' + CONFIG.SHEET_NAME + '" が見つかりません');
  }

  const targetDate = rowData[0]; // YYYY-MM-DD
  const lastRow = sheet.getLastRow();

  // 既存データから同じ日付の行を探す（重複チェック）
  if (lastRow >= 2) {
    const dates = sheet.getRange('A2:A' + lastRow).getValues();
    for (let i = 0; i < dates.length; i++) {
      const cellDate = dates[i][0];
      // Date型の場合はフォーマット変換
      let dateStr;
      if (cellDate instanceof Date) {
        dateStr = Utilities.formatDate(cellDate, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      } else {
        dateStr = String(cellDate);
      }

      if (dateStr === targetDate) {
        // 既存行を上書き
        sheet.getRange(i + 2, 1, 1, rowData.length).setValues([rowData]);
        Logger.log(targetDate + ': 既存行を上書きしました（行' + (i + 2) + '） [' + CONFIG.CAMPAIGN_NAME + ']');
        return;
      }
    }
  }

  // 新規追記
  sheet.appendRow(rowData);
  Logger.log(targetDate + ': 新規データを追記しました [' + CONFIG.CAMPAIGN_NAME + ']');
}

// ============================================================
// メインエントリポイント
// ============================================================

/**
 * 毎日のトリガーから呼ばれるメイン関数
 * 前日のMeta広告データを取得してシートに書き込む
 */
function dailyFetchMetaAds() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = Utilities.formatDate(yesterday, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  Logger.log('=== Meta広告データ取得開始: ' + dateStr + ' [' + CONFIG.CAMPAIGN_NAME + '] ===');

  try {
    // トークン期限チェック
    checkTokenExpiry_();

    // データ取得
    const insightData = fetchMetaInsights_(dateStr);

    if (!insightData) {
      Logger.log(dateStr + ': データなし。書き込みスキップ。');
      return;
    }

    // シート書き込み
    const rowData = formatRowData_(insightData);
    writeRowToSheet_(rowData);

    Logger.log('=== 取得完了: ' + dateStr + ' [' + CONFIG.CAMPAIGN_NAME + '] ===');
    Logger.log('  広告費: ' + rowData[1] + ', IMP: ' + rowData[2] + ', クリック: ' + rowData[4] + ', LINE登録: ' + rowData[5]);

  } catch (e) {
    Logger.log('エラー: ' + e.message);
    sendErrorNotification_('dailyFetchMetaAds', dateStr, e.message);
  }
}

/**
 * 手動実行: 指定期間のデータを一括取得（バックフィル用）
 * 使用例: manualFetchRange('2026-01-01', '2026-02-21')
 */
function manualFetchRange(startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  Logger.log('=== バックフィル開始: ' + startDateStr + ' 〜 ' + endDateStr + ' [' + CONFIG.CAMPAIGN_NAME + '] ===');

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd');

    try {
      const insightData = fetchMetaInsights_(dateStr);

      if (!insightData) {
        skipCount++;
        continue;
      }

      const rowData = formatRowData_(insightData);
      writeRowToSheet_(rowData);
      successCount++;

      // API制限を避けるため少し待機
      Utilities.sleep(1000);

    } catch (e) {
      Logger.log(dateStr + ' エラー: ' + e.message);
      errorCount++;
    }
  }

  const summary = 'バックフィル完了: 成功=' + successCount + ', スキップ=' + skipCount + ', エラー=' + errorCount;
  Logger.log(summary);
  try { SpreadsheetApp.getUi().alert('完了', summary, SpreadsheetApp.getUi().ButtonSet.OK); } catch(e) { /* エディタ実行時は無視 */ }
}

/**
 * テスト用: 昨日のデータを取得して確認
 */
function testFetchYesterday() {
  dailyFetchMetaAds();
  try { SpreadsheetApp.getUi().alert('テスト実行完了。実行ログを確認してください。'); } catch(e) { /* エディタ実行時は無視 */ }
}

// ============================================================
// エラー通知
// ============================================================

/**
 * エラー通知メールを送信
 */
function sendErrorNotification_(functionName, dateStr, errorMessage) {
  const props = PropertiesService.getScriptProperties();
  const email = props.getProperty('NOTIFICATION_EMAIL');

  if (!email) {
    Logger.log('通知先メールアドレスが未設定のため通知をスキップ');
    return;
  }

  try {
    MailApp.sendEmail({
      to: email,
      subject: '【エラー】Meta広告データ自動取得に失敗しました (' + CONFIG.CAMPAIGN_NAME + ')',
      body: 'キャンペーン: ' + CONFIG.CAMPAIGN_NAME + '\n'
          + '関数: ' + functionName + '\n'
          + '対象日: ' + dateStr + '\n'
          + 'エラー: ' + errorMessage + '\n\n'
          + '時刻: ' + new Date().toLocaleString('ja-JP') + '\n\n'
          + 'Apps Script エディタで実行ログを確認してください。',
    });
    Logger.log('エラー通知メール送信済み');
  } catch (mailError) {
    Logger.log('通知メール送信も失敗: ' + mailError.message);
  }
}

// ============================================================
// トリガー管理
// ============================================================

/**
 * 毎日指定時刻に実行するトリガーを設定
 * {{TRIGGER_HOUR}} はセットアップ時に自動置換されます（デフォルト: 4）
 */
function setupDailyTrigger() {
  // 既存の同名トリガーを削除
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'dailyFetchMetaAds') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // 新規トリガー作成
  ScriptApp.newTrigger('dailyFetchMetaAds')
    .timeBased()
    .everyDays(1)
    .atHour({{TRIGGER_HOUR}})
    .create();

  Logger.log('日次トリガーを設定しました（毎日 午前{{TRIGGER_HOUR}}-' + ({{TRIGGER_HOUR}} + 1) + '時） [' + CONFIG.CAMPAIGN_NAME + ']');
  try { SpreadsheetApp.getUi().alert('トリガー設定完了', '毎日午前{{TRIGGER_HOUR}}-' + ({{TRIGGER_HOUR}} + 1) + '時にMeta広告データを自動取得します。', SpreadsheetApp.getUi().ButtonSet.OK); } catch(e) { /* エディタ実行時は無視 */ }
}

/**
 * トリガーを解除
 */
function removeDailyTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  let removed = 0;
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'dailyFetchMetaAds') {
      ScriptApp.deleteTrigger(triggers[i]);
      removed++;
    }
  }
  Logger.log(removed + '個のトリガーを削除しました [' + CONFIG.CAMPAIGN_NAME + ']');
  try { SpreadsheetApp.getUi().alert(removed + '個のトリガーを削除しました'); } catch(e) { /* エディタ実行時は無視 */ }
}
