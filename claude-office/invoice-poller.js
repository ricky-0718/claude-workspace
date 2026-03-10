// ============================================
// Invoice Poller
// Gmail から請求書・契約書のPDF添付を自動でGoogle Driveに保存
// googleapis npm パッケージ使用（gws CLI不要）
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js"; // .env → process.env 反映

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_FILE = path.join(__dirname, "data", "invoice-state.json");

// --- 設定 ---
const CONFIG = {
  DRIVE_FOLDER_ID: "1Za5rERtxwU1XD58JTA4-xYsvC0JCFg4_",
  LABEL_NAME: "自動保存済み",
  SENDERS: [
    { email: "support@cloudsign.jp", prefix: "cloudsign" },
    { email: "noreply@freee.co.jp", prefix: "freee" },
  ],
  DAYS_TO_SEARCH: 7,
  MAX_MESSAGES: 20,
};

// --- OAuth2 クライアント ---
function getAuthClient() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

// --- ユーティリティ ---
function formatDate(epochMs) {
  const d = new Date(parseInt(epochMs));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getSenderPrefix(from) {
  for (const s of CONFIG.SENDERS) {
    if (from.includes(s.email)) return s.prefix;
  }
  return "other";
}

function findPdfs(part, results = []) {
  if (part.filename && part.filename.toLowerCase().endsWith(".pdf")) {
    results.push({ filename: part.filename, attachmentId: part.body.attachmentId });
  }
  if (part.parts) part.parts.forEach((p) => findPdfs(p, results));
  return results;
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return { processedIds: [], lastRun: null, totalSaved: 0 };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

// --- メイン処理 ---
export async function processInvoiceEmails() {
  const startTime = Date.now();
  console.log(`[invoice-poller] 実行開始: ${new Date().toISOString()}`);

  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    console.error("[invoice-poller] GOOGLE_REFRESH_TOKEN が未設定。auth-setup.js を実行してください。");
    return { saved: 0, errors: 1 };
  }

  const auth = getAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  const drive = google.drive({ version: "v3", auth });

  const state = loadState();
  let savedCount = 0;
  let errors = 0;

  try {
    // Gmail検索: 未処理メール
    const fromQuery = CONFIG.SENDERS.map((s) => s.email).join(" OR ");
    const query = `from:(${fromQuery}) has:attachment -label:${CONFIG.LABEL_NAME} newer_than:${CONFIG.DAYS_TO_SEARCH}d`;

    const listRes = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults: CONFIG.MAX_MESSAGES,
    });

    const messages = listRes.data.messages || [];

    if (messages.length === 0) {
      console.log("[invoice-poller] 未処理メールなし");
      state.lastRun = new Date().toISOString();
      saveState(state);
      return { saved: 0, errors: 0 };
    }

    console.log(`[invoice-poller] 未処理メール: ${messages.length}件`);

    // ラベルID取得（初回のみ、なければ作成）
    let labelId = null;
    const labelsRes = await gmail.users.labels.list({ userId: "me" });
    const existingLabel = labelsRes.data.labels.find((l) => l.name === CONFIG.LABEL_NAME);
    if (existingLabel) {
      labelId = existingLabel.id;
    } else {
      const newLabel = await gmail.users.labels.create({
        userId: "me",
        requestBody: { name: CONFIG.LABEL_NAME, labelListVisibility: "labelShow", messageListVisibility: "show" },
      });
      labelId = newLabel.data.id;
      console.log(`[invoice-poller] ラベル作成: ${CONFIG.LABEL_NAME} (${labelId})`);
    }

    for (const msg of messages) {
      try {
        // メッセージ詳細取得
        const fullRes = await gmail.users.messages.get({ userId: "me", id: msg.id, format: "full" });
        const full = fullRes.data;
        const dateStr = formatDate(full.internalDate);
        const fromHeader = full.payload.headers.find((h) => h.name === "From");
        const from = fromHeader ? fromHeader.value : "";
        const prefix = getSenderPrefix(from);

        const pdfs = findPdfs(full.payload);
        if (pdfs.length === 0) continue;

        for (const pdf of pdfs) {
          const newName = `${dateStr}_${prefix}_${pdf.filename}`;
          console.log(`[invoice-poller] 保存中: ${newName}`);

          // 添付ファイル取得
          const attRes = await gmail.users.messages.attachments.get({
            userId: "me",
            messageId: msg.id,
            id: pdf.attachmentId,
          });

          // base64url → Buffer
          const base64 = attRes.data.data.replace(/-/g, "+").replace(/_/g, "/");
          const buffer = Buffer.from(base64, "base64");

          // Google Driveにアップロード（ストリームで直接）
          const { Readable } = await import("stream");
          const stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          await drive.files.create({
            requestBody: { name: newName, parents: [CONFIG.DRIVE_FOLDER_ID] },
            media: { mimeType: "application/pdf", body: stream },
          });

          savedCount++;
        }

        // ラベル付与
        await gmail.users.messages.modify({
          userId: "me",
          id: msg.id,
          requestBody: { addLabelIds: [labelId] },
        });

        // 処理済み記録
        state.processedIds.push(msg.id);
        if (state.processedIds.length > 100) {
          state.processedIds = state.processedIds.slice(-100);
        }
      } catch (e) {
        console.error(`[invoice-poller] エラー (${msg.id}): ${e.message?.slice(0, 200)}`);
        errors++;
      }
    }

    state.lastRun = new Date().toISOString();
    state.totalSaved = (state.totalSaved || 0) + savedCount;
    saveState(state);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[invoice-poller] 完了: ${savedCount}件保存, ${errors}件エラー (${elapsed}s)`);
    return { saved: savedCount, errors };
  } catch (e) {
    console.error(`[invoice-poller] 致命的エラー: ${e.message}`);
    return { saved: 0, errors: 1 };
  }
}

// --- 定期実行 ---
let intervalId = null;

export function startInvoicePoller(intervalMs = 5 * 60 * 1000) {
  if (intervalId) {
    console.log("[invoice-poller] 既に実行中");
    return;
  }
  console.log(`[invoice-poller] 開始: ${intervalMs / 1000}秒間隔`);
  processInvoiceEmails().catch(console.error);
  intervalId = setInterval(() => {
    processInvoiceEmails().catch(console.error);
  }, intervalMs);
}

export function stopInvoicePoller() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[invoice-poller] 停止");
  }
}

// 直接実行時
if (process.argv[1] && process.argv[1].includes("invoice-poller")) {
  processInvoiceEmails().then((r) => console.log("Result:", r));
}
