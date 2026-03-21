// ============================================
// Circleback Webhook Server
// 面談完了時にCirclebackからPOSTを受信し、
// 自動で分析パイプラインを起動する
// ============================================
import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { processWebhook, getPending } from "./circleback-processor.js";
import "./config.js"; // .env 読み込み

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3849;

const app = express();

// ============================================
// HMAC-SHA256 署名検証
// ============================================
function verifyCirclebackSignature(rawBody, signature) {
  const secret = process.env.CIRCLEBACK_SIGNING_SECRET;
  if (!secret) {
    console.warn("[Webhook] CIRCLEBACK_SIGNING_SECRET が未設定。署名検証をスキップ");
    return true;
  }
  if (!signature) {
    return false;
  }
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// ============================================
// Middleware
// ============================================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-signature");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ============================================
// Routes
// ============================================

// Health check
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "circleback-webhook",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Pending queue status
app.get("/webhook/circleback/pending", (_req, res) => {
  res.json(getPending());
});

// Circleback Webhook endpoint (raw body for signature verification)
app.post("/webhook/circleback", express.raw({ type: "*/*", limit: "5mb" }), async (req, res) => {
  const rawBody = req.body.toString();
  const signature = req.headers["x-signature"];

  // 署名検証
  if (!verifyCirclebackSignature(rawBody, signature)) {
    console.warn("[Webhook] 署名検証失敗");
    return res.status(403).json({ error: "Invalid signature" });
  }

  // JSONパース
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    console.error("[Webhook] JSONパースエラー:", err.message);
    return res.status(400).json({ error: "Invalid JSON" });
  }

  console.log(`[Webhook] 受信: "${payload.name || "不明"}" (ID: ${payload.id})`);

  // 即座に200を返す（Circlebackはタイムアウトが短い可能性）
  res.status(200).json({ ok: true, received: true });

  // 非同期で処理（レスポンス後に実行）
  try {
    await processWebhook(payload);
  } catch (err) {
    console.error("[Webhook] 処理エラー:", err);
  }
});

// ============================================
// Start
// ============================================
app.listen(PORT, () => {
  console.log(`[Circleback Webhook] ポート ${PORT} で起動`);
  console.log(`[Circleback Webhook] エンドポイント: POST /webhook/circleback`);
  console.log(`[Circleback Webhook] ヘルスチェック: GET /health`);
  const secret = process.env.CIRCLEBACK_SIGNING_SECRET;
  console.log(`[Circleback Webhook] 署名検証: ${secret ? "有効" : "未設定（警告）"}`);
});
