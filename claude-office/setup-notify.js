// ============================================
// LINE Notify セットアップ & テスト
// 使い方: node setup-notify.js <トークン>
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const token = process.argv[2];

if (!token) {
  console.log("=== LINE Notify Setup ===");
  console.log("");
  console.log("1. https://notify-bot.line.me/ にアクセス");
  console.log("2. LINEアカウントでログイン");
  console.log("3. マイページ → 「トークンを発行する」");
  console.log("4. トークン名: 「Spectre Agent」");
  console.log("5. 通知先: 「1:1でLINE Notifyから通知を受け取る」");
  console.log("6. 発行されたトークンをコピー");
  console.log("");
  console.log("Usage: node setup-notify.js <発行されたトークン>");
  process.exit(1);
}

// テスト送信
console.log("Sending test notification...");
const res = await fetch("https://notify-api.line.me/api/notify", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    message: "\n[Spectre Agent] セットアップ完了！LINE通知が正常に動作しています。",
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

  if (envContent.includes("LINE_NOTIFY_TOKEN=")) {
    envContent = envContent.replace(/LINE_NOTIFY_TOKEN=.*/, `LINE_NOTIFY_TOKEN=${token}`);
  } else {
    envContent += `\nLINE_NOTIFY_TOKEN=${token}\n`;
  }
  fs.writeFileSync(envPath, envContent, "utf-8");
  console.log("TOKEN saved to .env");
} else {
  const body = await res.text();
  console.error(`FAILED: HTTP ${res.status} - ${body}`);
  console.error("トークンが正しいか確認してください。");
}
