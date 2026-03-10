import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORT_FILE = path.join(__dirname, "data", "morning-briefing.txt");
const INVOICE_FOLDER_ID = "10NUs7HGd5_36Blp8kpRmMM2tqnsjqz77";

function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

async function main() {
  const auth = getAuth();
  const gmail = google.gmail({ version: "v1", auth });
  const drive = google.drive({ version: "v3", auth });

  const lines = [
    `=== 朝のブリーフィング ===`,
    `日時: ${new Date().toLocaleString("ja-JP")}`,
    ``,
  ];

  // --- Gmail 未読 ---
  try {
    const unread = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
      maxResults: 20,
    });
    const msgs = unread.data.messages || [];
    lines.push(`未読メール: ${unread.data.resultSizeEstimate || msgs.length}件`);

    if (msgs.length > 0) {
      const top5 = msgs.slice(0, 5);
      for (const m of top5) {
        const detail = await gmail.users.messages.get({
          userId: "me",
          id: m.id,
          format: "metadata",
          metadataHeaders: ["From", "Subject"],
        });
        const from = detail.data.payload.headers.find((h) => h.name === "From")?.value || "";
        const subject = detail.data.payload.headers.find((h) => h.name === "Subject")?.value || "";
        const shortFrom = from.replace(/<.*>/, "").trim().slice(0, 20);
        lines.push(`  - [${shortFrom}] ${subject}`);
      }
      if (msgs.length > 5) lines.push(`  ...他${msgs.length - 5}件`);
    }
  } catch (e) {
    lines.push(`Gmail取得エラー: ${e.message}`);
  }

  lines.push("");

  // --- Drive 未整理ファイル ---
  try {
    const driveRes = await drive.files.list({
      q: `'${INVOICE_FOLDER_ID}' in parents and trashed = false`,
      fields: "files(id)",
      pageSize: 100,
    });
    const fileCount = (driveRes.data.files || []).length;
    lines.push(`請求書_未整理: ${fileCount}件`);
    if (fileCount > 0) {
      lines.push(`  → Driveで整理が必要です`);
    }
  } catch (e) {
    lines.push(`Drive取得エラー: ${e.message}`);
  }

  lines.push("");

  // --- 直近の請求書処理 ---
  try {
    const stateFile = path.join(__dirname, "data", "invoice-state.json");
    const state = JSON.parse(fs.readFileSync(stateFile, "utf-8"));
    lines.push(`請求書自動保存: 最終実行 ${state.lastRun || "未実行"}, 累計${state.totalSaved || 0}件`);
  } catch {
    lines.push(`請求書自動保存: 状態不明`);
  }

  const report = lines.join("\n");
  fs.writeFileSync(REPORT_FILE, report, "utf-8");
  console.log(report);
}

main().catch((e) => console.error("[morning-briefing] エラー:", e.message));
