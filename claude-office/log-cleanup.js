import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

function cleanDir(dirPath, maxAgeMs) {
  if (!fs.existsSync(dirPath)) return 0;
  const now = Date.now();
  let count = 0;
  for (const f of fs.readdirSync(dirPath)) {
    const fp = path.join(dirPath, f);
    const stat = fs.statSync(fp);
    if (now - stat.mtimeMs > maxAgeMs) {
      fs.unlinkSync(fp);
      count++;
    }
  }
  return count;
}

function trimJsonArray(filePath, maxItems) {
  if (!fs.existsSync(filePath)) return;
  try {
    const arr = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (Array.isArray(arr) && arr.length > maxItems) {
      fs.writeFileSync(filePath, JSON.stringify(arr.slice(0, maxItems), null, 2), "utf-8");
      console.log(`[cleanup] ${path.basename(filePath)}: ${arr.length} → ${maxItems}`);
    }
  } catch {}
}

function trimLog(filePath, maxLines) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  if (lines.length > maxLines) {
    fs.writeFileSync(filePath, lines.slice(-maxLines).join("\n"), "utf-8");
    console.log(`[cleanup] ${path.basename(filePath)}: ${lines.length} → ${maxLines} lines`);
  }
}

console.log(`[cleanup] 開始: ${new Date().toISOString()}`);

const msgs = cleanDir(path.join(DATA_DIR, "messages"), THIRTY_DAYS);
const drafts = cleanDir(path.join(DATA_DIR, "drafts"), THIRTY_DAYS);
const results = cleanDir(path.join(DATA_DIR, "results"), THIRTY_DAYS);
console.log(`[cleanup] 削除: messages=${msgs}, drafts=${drafts}, results=${results}`);

trimJsonArray(path.join(DATA_DIR, "activity.json"), 200);
trimLog(path.join(DATA_DIR, "git-pull.log"), 1000);

console.log(`[cleanup] 完了`);
