import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ALERT_FILE = path.join(__dirname, "data", "gas-health-alert.txt");

const TARGETS = [
  {
    name: "X トレンド収集",
    fileId: "1YmSHQXva3-Y3sh6pUwCl9rHesn1Pg5H4nlHFftZ7YOY",
    maxStaleHours: 48,
  },
];

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
  const now = Date.now();

  const lines = [
    `=== GASトリガー生存確認 ===`,
    `日時: ${new Date().toLocaleString("ja-JP")}`,
    ``,
  ];

  let hasAlert = false;

  for (const target of TARGETS) {
    try {
      const res = await drive.files.get({
        fileId: target.fileId,
        fields: "modifiedTime,name",
      });
      const modified = new Date(res.data.modifiedTime);
      const hoursAgo = ((now - modified.getTime()) / (1000 * 60 * 60)).toFixed(1);

      if (hoursAgo > target.maxStaleHours) {
        lines.push(`[警告] ${target.name}: ${hoursAgo}時間前に最終更新（${target.maxStaleHours}h超過）`);
        lines.push(`  → GASトリガーが停止している可能性あり。GASエディタで確認してください。`);
        hasAlert = true;
      } else {
        lines.push(`[正常] ${target.name}: ${hoursAgo}時間前に更新`);
      }
    } catch (e) {
      lines.push(`[エラー] ${target.name}: 確認失敗 (${e.message})`);
      hasAlert = true;
    }
  }

  const report = lines.join("\n");
  fs.writeFileSync(ALERT_FILE, report, "utf-8");
  console.log(report);

  if (hasAlert) {
    console.log("\n[gas-health] 要確認あり");
  }
}

main().catch((e) => console.error("[gas-health] エラー:", e.message));
