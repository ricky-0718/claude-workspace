/**
 * スプレッドシート起動時にカスタムメニューを追加
 * このテンプレートは新規スプレッドシートの コード.gs に使用します
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Meta広告データ')
    .addItem('🔄 API: 昨日のデータを取得', 'testFetchYesterday')
    .addItem('📅 API: 期間指定で取得（バックフィル）', 'showBackfillDialog_')
    .addSeparator()
    .addItem('⚙ API認証情報を設定', 'setupCredentials')
    .addItem('🔑 長期トークンに変換', 'exchangeForLongLivedToken')
    .addItem('⏰ 日次トリガーを設定', 'setupDailyTrigger')
    .addItem('⏹ 日次トリガーを解除', 'removeDailyTrigger')
    .addToUi();
}

/**
 * バックフィル用ダイアログを表示
 */
function showBackfillDialog_() {
  var ui = SpreadsheetApp.getUi();
  var startResult = ui.prompt('開始日を入力 (YYYY-MM-DD):');
  if (startResult.getSelectedButton() !== ui.Button.OK) return;
  var endResult = ui.prompt('終了日を入力 (YYYY-MM-DD):');
  if (endResult.getSelectedButton() !== ui.Button.OK) return;
  manualFetchRange(startResult.getResponseText(), endResult.getResponseText());
}
