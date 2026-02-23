/**
 * 請求書/契約書 自動保存ワークフロー
 *
 * Gmail に届いた請求書・契約書のPDF添付ファイルを
 * 自動的にGoogle Driveの指定フォルダに保存する。
 *
 * セットアップ:
 * 1. このスクリプトを Google Apps Script にコピー
 * 2. setupTrigger() を1回実行してトリガーを設定
 * 3. 初回実行時に Gmail と Drive の権限を承認
 */

// ===== 設定 =====
const CONFIG = {
  // 保存先 Google Drive フォルダID
  DRIVE_FOLDER_ID: '1H7kwZsby0wb0CeV0fW_e2OEmLwA1Bq0u',

  // 処理済みラベル名
  PROCESSED_LABEL: '自動保存済み',

  // 対象送信元の設定
  SENDERS: [
    { email: 'support@cloudsign.jp', prefix: 'cloudsign' },
    { email: 'noreply@freee.co.jp', prefix: 'freee' },
  ],

  // 1回の実行で処理する最大メール数
  MAX_THREADS: 20,

  // 検索対象の日数（直近N日のメールのみ処理）
  DAYS_TO_SEARCH: 7,
};

/**
 * メイン処理: 対象メールからPDF添付ファイルをGoogle Driveに保存
 */
function processInvoiceEmails() {
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const label = getOrCreateLabel(CONFIG.PROCESSED_LABEL);

  // 送信元ごとのOR条件を構築
  const fromQuery = CONFIG.SENDERS
    .map(s => s.email)
    .join(' OR ');

  const query = `from:(${fromQuery}) has:attachment -label:${CONFIG.PROCESSED_LABEL} newer_than:${CONFIG.DAYS_TO_SEARCH}d`;

  const threads = GmailApp.search(query, 0, CONFIG.MAX_THREADS);

  if (threads.length === 0) {
    return;
  }

  let savedCount = 0;

  for (const thread of threads) {
    const messages = thread.getMessages();

    for (const message of messages) {
      const from = message.getFrom();
      const date = message.getDate();
      const dateStr = formatDate(date);
      const senderPrefix = getSenderPrefix(from);

      const attachments = message.getAttachments();

      for (const attachment of attachments) {
        const name = attachment.getName();

        // PDFファイルのみ対象
        if (!name.toLowerCase().endsWith('.pdf')) {
          continue;
        }

        const newName = `${dateStr}_${senderPrefix}_${name}`;
        const uniqueName = getUniqueName(folder, newName);

        folder.createFile(attachment.copyBlob().setName(uniqueName));
        savedCount++;
      }
    }

    // 処理済みラベルを付与
    thread.addLabel(label);
  }

  if (savedCount > 0) {
    Logger.log(`${savedCount} 件のPDFを保存しました`);
  }
}

/**
 * 送信元メールアドレスからプレフィックスを取得
 */
function getSenderPrefix(fromHeader) {
  for (const sender of CONFIG.SENDERS) {
    if (fromHeader.includes(sender.email)) {
      return sender.prefix;
    }
  }
  return 'other';
}

/**
 * 日付を YYYY-MM-DD 形式にフォーマット
 */
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * フォルダ内で一意なファイル名を生成（重複時は連番付与）
 */
function getUniqueName(folder, fileName) {
  const files = folder.getFilesByName(fileName);
  if (!files.hasNext()) {
    return fileName;
  }

  const baseName = fileName.replace(/\.pdf$/i, '');
  let counter = 1;
  let newName;
  do {
    newName = `${baseName}_${counter}.pdf`;
    counter++;
  } while (folder.getFilesByName(newName).hasNext());

  return newName;
}

/**
 * Gmailラベルを取得（存在しない場合は作成）
 */
function getOrCreateLabel(labelName) {
  let label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }
  return label;
}

/**
 * トリガーのセットアップ（初回のみ実行）
 * 5分おきに processInvoiceEmails を自動実行
 */
function setupTrigger() {
  // 既存のトリガーを削除
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'processInvoiceEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  // 5分おきのトリガーを作成
  ScriptApp.newTrigger('processInvoiceEmails')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('トリガーを設定しました: 5分おきに processInvoiceEmails を実行');
}

/**
 * トリガーの削除（停止したい場合に実行）
 */
function removeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'processInvoiceEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  }
  Logger.log('トリガーを削除しました');
}

/**
 * 初期化: 既存の古いメールを全て「自動保存済み」ラベルでマーク
 * セットアップ時に1回だけ実行する。
 * これにより、今後は新着メールのみが処理対象になる。
 */
function markAllAsProcessed() {
  const label = getOrCreateLabel(CONFIG.PROCESSED_LABEL);

  const fromQuery = CONFIG.SENDERS
    .map(s => s.email)
    .join(' OR ');

  const query = `from:(${fromQuery}) -label:${CONFIG.PROCESSED_LABEL}`;

  let totalMarked = 0;

  // バッチ処理（500件ずつ）
  while (true) {
    const threads = GmailApp.search(query, 0, 100);
    if (threads.length === 0) break;

    for (const thread of threads) {
      thread.addLabel(label);
      totalMarked++;
    }

    Logger.log(`${totalMarked} 件のスレッドをマーク済み...`);

    // GAS実行時間制限対策
    if (totalMarked > 400) {
      Logger.log('処理件数が多いため一旦停止。再度実行してください。');
      break;
    }
  }

  Logger.log(`完了: ${totalMarked} 件のスレッドを「${CONFIG.PROCESSED_LABEL}」でマークしました`);
}

/**
 * Google Drive保存先フォルダ内の全ファイルを削除（古いファイルのクリーンアップ用）
 * 誤ってダウンロードされた古いファイルを削除する場合に使用
 */
function cleanupDriveFolder() {
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const files = folder.getFiles();
  let count = 0;

  while (files.hasNext()) {
    const file = files.next();
    file.setTrashed(true);
    count++;
  }

  Logger.log(`${count} 件のファイルをゴミ箱に移動しました`);
}

/**
 * テスト実行: 手動で1回だけ処理を実行
 */
function testRun() {
  Logger.log('テスト実行開始...');
  processInvoiceEmails();
  Logger.log('テスト実行完了');
}
