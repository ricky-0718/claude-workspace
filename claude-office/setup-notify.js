// ============================================
// LINE Messaging API セットアップ & テスト
// 使い方: node setup-notify.js <Channel Access Token> <User ID>
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const channelToken = process.argv[2];
const userId = process.argv[3];

if (!channelToken || !userId) {
  console.log("=== LINE Messaging API Setup ===");
  console.log("");
  console.log("X Trend Collector で作成済みのBotをそのまま使います。");
  console.log("GASのスクリプトプロパティから以下を取得してください:");
  console.log("  - LINE_CHANNEL_ACCESS_TOKEN");
  console.log("  - LINE_USER_ID");
  console.log("");
  console.log("Usage: node setup-notify.js <Channel Access Token> <User ID>");
  process.exit(1);
}

// テスト送信
console.log("Sending test push message...");
const res = await fetch("https://api.line.me/v2/bot/message/push", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${channelToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: userId,
    messages: [{ type: "text", text: "[Spectre Agent] セットアップ完了！LINE通知が正常に動作しています。" }],
  }),
});

if (res.ok) {
  console.log("SUCCESS: テスト通知を送信しました！LINEを確認してください。");

  // .envファイルに書き込み
  const envPath = path.join(__dirname, ".env");
  let envContent = "";
  try {
    envContent = fs.readFileSync(envPath, "utf-8");
  } catch {}

  // トークン設定
  if (envContent.includes("LINE_CHANNEL_ACCESS_TOKEN=")) {
    envContent = envContent.replace(/LINE_CHANNEL_ACCESS_TOKEN=.*/, `LINE_CHANNEL_ACCESS_TOKEN=${channelToken}`);
  } else {
    envContent += `\nLINE_CHANNEL_ACCESS_TOKEN=${channelToken}`;
  }

  // ユーザーID設定
  if (envContent.includes("LINE_USER_ID=")) {
    envContent = envContent.replace(/LINE_USER_ID=.*/, `LINE_USER_ID=${userId}`);
  } else {
    envContent += `\nLINE_USER_ID=${userId}`;
  }

  fs.writeFileSync(envPath, envContent.trim() + "\n", "utf-8");
  console.log("Saved to .env");
} else {
  const body = await res.text();
  console.error(`FAILED: HTTP ${res.status} - ${body}`);
}
