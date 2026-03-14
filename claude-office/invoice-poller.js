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
    { email: "support@cloudsign.jp", prefix: "cloudsign", type: "attachment" },
    { email: "noreply@freee.co.jp", prefix: "freee", type: "download_link" },
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

function extractBody(payload) {
  if (payload.body && payload.body.data) {
    const b64 = payload.body.data.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(b64, "base64").toString("utf-8");
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body && part.body.data) {
        const b64 = part.body.data.replace(/-/g, "+").replace(/_/g, "/");
        return Buffer.from(b64, "base64").toString("utf-8");
      }
    }
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body && part.body.data) {
        const b64 = part.body.data.replace(/-/g, "+").replace(/_/g, "/");
        return Buffer.from(b64, "base64").toString("utf-8");
      }
    }
    for (const part of payload.parts) {
      if (part.parts) {
        const result = extractBody(part);
        if (result) return result;
      }
    }
  }
  return "";
}

function extractFreeeLinks(body) {
  const pattern = /https:\/\/[a-zA-Z0-9.-]*freee[a-zA-Z0-9.-]*\.co\.jp\/[^\s"'<>\])]+/g;
  const matches = body.match(pattern) || [];
  const cleaned = [...new Set(matches.map((url) => url.replace(/&amp;/g, "&").replace(/[)"'<>\]]+$/, "")))];
  // freee請求書URLをPDFダウンロードAPI URLに変換
  // /ivex/dl/{uuid}?... → /api/ivex/dl/{uuid}/0?is_download=1
  return cleaned.map((url) => {
    const m = url.match(/^(https:\/\/[^/]+)\/ivex\/dl\/([a-f0-9-]+)/);
    if (m) return `${m[1]}/api/ivex/dl/${m[2]}/0?is_download=1`;
    return url;
  });
}

async function fetchPdf(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    if (!res.ok) {
      console.log(`[invoice-poller] PDF取得失敗 (HTTP ${res.status}): ${url}`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/pdf")) return buffer;
    if (buffer.length > 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
      return buffer;
    }
    console.log(`[invoice-poller] PDFではないコンテンツ (${contentType}): ${url}`);
    return null;
  } catch (e) {
    console.error(`[invoice-poller] ダウンロード失敗: ${url} - ${e.message}`);
    return null;
  }
}

function sanitizeFileName(name) {
  return name.replace(/[\/\\:*?"<>|]/g, "_").replace(/\s+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").substring(0, 100);
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

    // === Phase 1: PDF添付メール（CloudSign等） ===
    const attachmentSenders = CONFIG.SENDERS.filter((s) => s.type === "attachment");
    if (attachmentSenders.length > 0) {
      const fromQuery = attachmentSenders.map((s) => s.email).join(" OR ");
      const query = `from:(${fromQuery}) has:attachment -label:${CONFIG.LABEL_NAME} newer_than:${CONFIG.DAYS_TO_SEARCH}d`;
      const listRes = await gmail.users.messages.list({ userId: "me", q: query, maxResults: CONFIG.MAX_MESSAGES });
      const messages = listRes.data.messages || [];

      if (messages.length > 0) {
        console.log(`[invoice-poller] 添付形式: ${messages.length}件`);
        for (const msg of messages) {
          try {
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
              const attRes = await gmail.users.messages.attachments.get({
                userId: "me", messageId: msg.id, id: pdf.attachmentId,
              });
              const base64 = attRes.data.data.replace(/-/g, "+").replace(/_/g, "/");
              const buffer = Buffer.from(base64, "base64");
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

            await gmail.users.messages.modify({
              userId: "me", id: msg.id,
              requestBody: { addLabelIds: [labelId] },
            });
            state.processedIds.push(msg.id);
            if (state.processedIds.length > 100) {
              state.processedIds = state.processedIds.slice(-100);
            }
          } catch (e) {
            console.error(`[invoice-poller] エラー (${msg.id}): ${e.message?.slice(0, 200)}`);
            errors++;
          }
        }
      }
    }

    // === Phase 2: ダウンロードリンク形式メール（freee等） ===
    const linkSenders = CONFIG.SENDERS.filter((s) => s.type === "download_link");
    if (linkSenders.length > 0) {
      const linkFromQuery = linkSenders.map((s) => s.email).join(" OR ");
      const linkQuery = `from:(${linkFromQuery}) -label:${CONFIG.LABEL_NAME} newer_than:${CONFIG.DAYS_TO_SEARCH}d`;
      const linkListRes = await gmail.users.messages.list({ userId: "me", q: linkQuery, maxResults: CONFIG.MAX_MESSAGES });
      const linkMessages = linkListRes.data.messages || [];

      if (linkMessages.length > 0) {
        console.log(`[invoice-poller] リンク形式: ${linkMessages.length}件`);
        for (const msg of linkMessages) {
          try {
            const fullRes = await gmail.users.messages.get({ userId: "me", id: msg.id, format: "full" });
            const full = fullRes.data;
            const dateStr = formatDate(full.internalDate);
            const fromHeader = full.payload.headers.find((h) => h.name === "From");
            const from = fromHeader ? fromHeader.value : "";
            const prefix = getSenderPrefix(from);

            const body = extractBody(full.payload);
            const links = extractFreeeLinks(body);

            if (links.length === 0) {
              // リンクなし → ラベルだけ付けて再処理防止
              await gmail.users.messages.modify({
                userId: "me", id: msg.id,
                requestBody: { addLabelIds: [labelId] },
              });
              continue;
            }

            const subjectHeader = full.payload.headers.find((h) => h.name === "Subject");
            const subject = subjectHeader ? subjectHeader.value : "請求書";
            const safeName = sanitizeFileName(subject);

            let linkSavedCount = 0;
            for (let i = 0; i < links.length; i++) {
              const pdfBuffer = await fetchPdf(links[i]);
              if (!pdfBuffer) continue;

              const suffix = links.length > 1 ? `_${i + 1}` : "";
              const newName = `${dateStr}_${prefix}_${safeName}${suffix}.pdf`;
              console.log(`[invoice-poller] リンクから保存: ${newName}`);

              const { Readable } = await import("stream");
              const stream = new Readable();
              stream.push(pdfBuffer);
              stream.push(null);
              await drive.files.create({
                requestBody: { name: newName, parents: [CONFIG.DRIVE_FOLDER_ID] },
                media: { mimeType: "application/pdf", body: stream },
              });
              savedCount++;
              linkSavedCount++;
            }

            // PDFを1件以上保存できた場合のみラベル付与
            if (linkSavedCount > 0) {
              await gmail.users.messages.modify({
                userId: "me", id: msg.id,
                requestBody: { addLabelIds: [labelId] },
              });
            }
            state.processedIds.push(msg.id);
            if (state.processedIds.length > 100) {
              state.processedIds = state.processedIds.slice(-100);
            }
          } catch (e) {
            console.error(`[invoice-poller] リンク処理エラー (${msg.id}): ${e.message?.slice(0, 200)}`);
            errors++;
          }
        }
      }
    }

    if (savedCount === 0 && errors === 0) {
      console.log("[invoice-poller] 未処理メールなし");
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
