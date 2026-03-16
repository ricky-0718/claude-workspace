// ============================================
// 設定管理 (.envファイル読み込み)
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  const config = {};
  try {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.substring(0, eqIdx).trim();
      const value = trimmed.substring(eqIdx + 1).trim();
      config[key] = value;
    }
  } catch (err) {
    console.error("Failed to load .env:", err.message);
  }
  return config;
}

const env = loadEnv();

// process.env にも反映（server.js の deploy endpoint 等で参照するため）
for (const [key, value] of Object.entries(env)) {
  if (!process.env[key]) process.env[key] = value;
}

export default {
  chatwork: {
    apiToken: env.CHATWORK_API_TOKEN || "",
    roomId: env.CHATWORK_ROOM_ID || "",
  },
  line: {
    channelToken: env.LINE_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: env.LINE_CHANNEL_SECRET || "",
    userId: env.LINE_USER_ID || "",
  },
  spectre: {
    chatworkRoomId: env.SPECTRE_CHATWORK_ROOM_ID || "425916129",
    slackWebhookUrl: env.SPECTRE_SLACK_WEBHOOK_URL || "",
    slackBotToken: env.SPECTRE_SLACK_BOT_TOKEN || "",
    slackChannelId: env.SPECTRE_SLACK_CHANNEL_ID || "C0ALF4DAMH9",
  },
  asana: {
    pat: env.ASANA_PAT || "",
    workspaceId: "1208442893224580",
    assigneeId: "1208498758664385",
    contractProjectId: "1209960384497212",
  },
  deploy: {
    secret: env.DEPLOY_SECRET || "",
  },
  utage: {
    chatBase: env.UTAGE_CHAT_BASE || "",
  },
  polling: {
    intervalMs: 30_000, // 30秒
  },
};
