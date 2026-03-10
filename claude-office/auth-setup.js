// OAuth2 リフレッシュトークン取得スクリプト（1回だけ実行）
// ブラウザで認証 → refresh_token を表示 → .env に保存する
import { google } from "googleapis";
import http from "http";
import { URL } from "url";
import "./config.js"; // .env → process.env 反映

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("GOOGLE_CLIENT_ID と GOOGLE_CLIENT_SECRET を .env に設定してください。");
  process.exit(1);
}
const REDIRECT_PORT = 8765;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/drive",
];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("\n=== OAuth認証 ===");
console.log("以下のURLをブラウザで開いてください:\n");
console.log(authUrl);
console.log("\n認証後、自動的にリダイレクトされます...\n");

// ローカルサーバーでコールバックを受け取る
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
  const code = url.searchParams.get("code");

  if (!code) {
    res.writeHead(400);
    res.end("No code received");
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>認証成功！</h1><p>このタブを閉じてOKです。</p>");

    console.log("\n=== 認証成功 ===");
    console.log("\n以下を .env に追加してください:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(`\naccess_token: ${tokens.access_token?.slice(0, 20)}...`);
    console.log(`token_type: ${tokens.token_type}`);
    console.log(`scope: ${tokens.scope}`);

    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500);
    res.end("Token exchange failed");
    console.error("Token exchange error:", e.message);
    server.close();
    process.exit(1);
  }
});

server.listen(REDIRECT_PORT, () => {
  console.log(`コールバックサーバー起動中: http://localhost:${REDIRECT_PORT}`);
});
