/**
 * 請求書/契約書 自動保存ワークフロー
 *
 * Gmail に届いた請求書・契約書を自動的にGoogle Driveの指定フォルダに保存する。
 *
 * 対応パターン:
 *   A) PDF添付ファイル形式（CloudSign等）
 *   B) ダウンロードリンク形式（freee等）
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
  // type: 'attachment' = PDF添付形式, 'download_link' = ダウンロードリンク形式
  SENDERS: [
    { email: 'support@cloudsign.jp', prefix: 'cloudsign', type: 'attachment' },
    { email: 'noreply@freee.co.jp', prefix: 'freee', type: 'download_link' },
  ],

  // 1回の実行で処理する最大メール数
  MAX_THREADS: 20,

  // 検索対象の日数（直近N日のメールのみ処理）
  DAYS_TO_SEARCH: 7,

  // freeeダウンロードリンクの正規表現パターン
  FREEE_LINK_PATTERNS: [
    /https:\/\/secure\.freee\.co\.jp\/[^\s"'<>]+\/download[^\s"'<>]*/g,
    /https:\/\/secure\.freee\.co\.jp\/[^\s"'<>]*\/pdf[^\s"'<>]*/g,
    /https:\/\/[a-zA-Z0-9.-]*freee[a-zA-Z0-9.-]*\.co\.jp\/[^\s"'<>]*(?:download|pdf)[^\s"'<>]*/g,
  ],
};

/**
 * メイン処理: 2段階で請求書を自動保存
 *   Step 1: PDF添付メール（CloudSign等）
 *   Step 2: ダウンロードリンク形式メール（freee等）
 */
function processInvoiceEmails() {
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const label = getOrCreateLabel(CONFIG.PROCESSED_LABEL);

  let totalSaved = 0;

  // Step 1: 添付ファイル形式のメールを処理
  totalSaved += processAttachmentEmails(folder, label);

  // Step 2: ダウンロードリンク形式のメールを処理
  totalSaved += processDownloadLinkEmails(folder, label);

  if (totalSaved > 0) {
    Logger.log('合計 ' + totalSaved + ' 件のPDFを保存しました');
  }
}

/**
 * Step 1: PDF添付ファイル形式のメールを処理（従来のロジック）
 */
function processAttachmentEmails(folder, label) {
  const attachmentSenders = CONFIG.SENDERS.filter(s => s.type === 'attachment');
  if (attachmentSenders.length === 0) return 0;

  const fromQuery = attachmentSenders.map(s => s.email).join(' OR ');
  const query = `from:(${fromQuery}) has:attachment -label:${CONFIG.PROCESSED_LABEL} newer_than:${CONFIG.DAYS_TO_SEARCH}d`;

  const threads = GmailApp.search(query, 0, CONFIG.MAX_THREADS);
  if (threads.length === 0) return 0;

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

        if (!name.toLowerCase().endsWith('.pdf')) {
          continue;
        }

        const newName = `${dateStr}_${senderPrefix}_${name}`;
        const uniqueName = getUniqueName(folder, newName);

        folder.createFile(attachment.copyBlob().setName(uniqueName));
        savedCount++;
        Logger.log('[添付] 保存: ' + uniqueName);
      }
    }

    thread.addLabel(label);
  }

  return savedCount;
}

/**
 * Step 2: ダウンロードリンク形式のメールを処理
 * freee等のメール本文内にPDFダウンロードリンクが含まれるメールが対象
 */
function processDownloadLinkEmails(folder, label) {
  const linkSenders = CONFIG.SENDERS.filter(s => s.type === 'download_link');
  if (linkSenders.length === 0) return 0;

  const fromQuery = linkSenders.map(s => s.email).join(' OR ');
  const query = `from:(${fromQuery}) -has:attachment -label:${CONFIG.PROCESSED_LABEL} newer_than:${CONFIG.DAYS_TO_SEARCH}d`;

  const threads = GmailApp.search(query, 0, CONFIG.MAX_THREADS);
  if (threads.length === 0) return 0;

  let savedCount = 0;

  for (const thread of threads) {
    const messages = thread.getMessages();

    for (const message of messages) {
      const from = message.getFrom();
      const date = message.getDate();
      const dateStr = formatDate(date);
      const senderPrefix = getSenderPrefix(from);

      // メール本文からダウンロードリンクを抽出
      const body = message.getBody();
      const plainBody = message.getPlainBody();
      const links = extractDownloadLinks(body, plainBody);

      if (links.length === 0) continue;

      const subject = message.getSubject() || '請求書';
      const safeName = sanitizeFileName(subject);

      for (let i = 0; i < links.length; i++) {
        const url = links[i];
        try {
          const blob = fetchPdfFromUrl(url);
          if (!blob) {
            Logger.log('[リンク] スキップ（PDFではない）: ' + url);
            continue;
          }

          const suffix = links.length > 1 ? `_${i + 1}` : '';
          const fileName = `${dateStr}_${senderPrefix}_${safeName}${suffix}.pdf`;
          const uniqueName = getUniqueName(folder, fileName);

          folder.createFile(blob.setName(uniqueName));
          savedCount++;
          Logger.log('[リンク] 保存: ' + uniqueName);
        } catch (e) {
          Logger.log('[リンク] ダウンロード失敗: ' + url + ' - ' + e.message);
        }
      }
    }

    // リンクの有無にかかわらず処理済みラベルを付ける（再処理防止）
    thread.addLabel(label);
  }

  return savedCount;
}

/**
 * メール本文からfreeeのダウンロードリンクを抽出
 */
function extractDownloadLinks(htmlBody, plainBody) {
  const foundUrls = {};

  for (const pattern of CONFIG.FREEE_LINK_PATTERNS) {
    if (htmlBody) {
      const regex = new RegExp(pattern.source, pattern.flags);
      let match;
      while ((match = regex.exec(htmlBody)) !== null) {
        foundUrls[cleanUrl(match[0])] = true;
      }
    }

    if (plainBody) {
      const regex2 = new RegExp(pattern.source, pattern.flags);
      let match;
      while ((match = regex2.exec(plainBody)) !== null) {
        foundUrls[cleanUrl(match[0])] = true;
      }
    }
  }

  // HTMLのhref属性からもリンクを抽出
  if (htmlBody) {
    const hrefRegex = /href=["']?(https:\/\/[a-zA-Z0-9.-]*freee[a-zA-Z0-9.-]*\.co\.jp\/[^"'\s>]+)["']?/gi;
    let match;
    while ((match = hrefRegex.exec(htmlBody)) !== null) {
      const url = cleanUrl(match[1]);
      if (/download|pdf|invoice|receipt/i.test(url)) {
        foundUrls[url] = true;
      }
    }
  }

  const urls = Object.keys(foundUrls);
  if (urls.length > 0) {
    Logger.log('[リンク抽出] ' + urls.length + ' 件のダウンロードリンクを発見');
  }
  return urls;
}

/**
 * URL末尾のHTMLタグ残骸を除去
 */
function cleanUrl(url) {
  let cleaned = url.replace(/&amp;/g, '&');
  cleaned = cleaned.replace(/[)"'<>\]]+$/, '');
  return cleaned;
}

/**
 * URLからPDFをダウンロード。PDFでない場合はnullを返す
 */
function fetchPdfFromUrl(url) {
  const options = {
    method: 'get',
    followRedirects: true,
    muteHttpExceptions: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();

  if (responseCode !== 200) {
    Logger.log('[fetch] HTTPエラー ' + responseCode + ': ' + url);
    return null;
  }

  const contentType = response.getHeaders()['Content-Type'] || '';
  const blob = response.getBlob();

  if (contentType.indexOf('application/pdf') !== -1) {
    return blob;
  }

  if (blob.getContentType() === 'application/pdf') {
    return blob;
  }

  // application/octet-stream の場合、PDFマジックナンバーで判定
  if (contentType.indexOf('application/octet-stream') !== -1 || contentType === '') {
    const bytes = blob.getBytes();
    if (bytes.length > 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
      blob.setContentType('application/pdf');
      return blob;
    }
  }

  Logger.log('[fetch] PDFではないコンテンツ (' + contentType + '): ' + url);
  return null;
}

/**
 * ファイル名に使えない文字を除去
 */
function sanitizeFileName(name) {
  return name
    .replace(/[\/\\:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 100);
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
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'processInvoiceEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  }

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
 */
function markAllAsProcessed() {
  const label = getOrCreateLabel(CONFIG.PROCESSED_LABEL);

  const fromQuery = CONFIG.SENDERS
    .map(s => s.email)
    .join(' OR ');

  const query = `from:(${fromQuery}) -label:${CONFIG.PROCESSED_LABEL}`;

  let totalMarked = 0;

  while (true) {
    const threads = GmailApp.search(query, 0, 100);
    if (threads.length === 0) break;

    for (const thread of threads) {
      thread.addLabel(label);
      totalMarked++;
    }

    Logger.log(`${totalMarked} 件のスレッドをマーク済み...`);

    if (totalMarked > 400) {
      Logger.log('処理件数が多いため一旦停止。再度実行してください。');
      break;
    }
  }

  Logger.log(`完了: ${totalMarked} 件のスレッドを「${CONFIG.PROCESSED_LABEL}」でマークしました`);
}

/**
 * Google Drive保存先フォルダ内の全ファイルを削除（クリーンアップ用）
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
