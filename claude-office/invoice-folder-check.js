import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORT_FILE = path.join(__dirname, "data", "folder-report.txt");
const FOLDER_ID = "10NUs7HGd5_36Blp8kpRmMM2tqnsjqz77";

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
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    fields: "files(id,name,createdTime,size)",
    orderBy: "createdTime desc",
    pageSize: 100,
  });

  const files = res.data.files || [];
  const lines = [
    `=== 請求書_未整理フォルダ レポート ===`,
    `日時: ${new Date().toISOString()}`,
    `未整理ファイル数: ${files.length}件`,
    ``,
  ];

  for (const f of files) {
    const date = new Date(f.createdTime).toLocaleDateString("ja-JP");
    lines.push(`  ${date}  ${f.name}`);
  }

  if (files.length === 0) {
    lines.push("  （なし — 整理済み）");
  } else {
    lines.push("");
    lines.push(`${files.length}件の未整理ファイルがあります。Driveで整理してください。`);
  }

  const report = lines.join("\n");
  fs.writeFileSync(REPORT_FILE, report, "utf-8");
  console.log(report);
}

main().catch((e) => console.error("[folder-check] エラー:", e.message));
