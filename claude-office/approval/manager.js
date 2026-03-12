// approval/manager.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APPROVALS_DIR = path.join(__dirname, "..", "data", "approvals");

if (!fs.existsSync(APPROVALS_DIR)) fs.mkdirSync(APPROVALS_DIR, { recursive: true });

/**
 * 承認リクエストを作成
 * @param {string} type - "draft_send" | "file_delete" | "command_execute"
 * @param {object} payload - 承認対象の詳細データ
 * @param {string} description - LINE通知用の説明文
 * @returns {object} approval
 */
export function createApproval(type, payload, description) {
  const id = `apr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
  const approval = {
    id,
    type,
    payload,
    description,
    status: "pending",  // pending → approved → executed / rejected → expired
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(APPROVALS_DIR, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(approval, null, 2), "utf-8");
  return approval;
}

/**
 * 最新のpending承認を取得
 */
export function getLatestPending() {
  try {
    const files = fs.readdirSync(APPROVALS_DIR).filter(f => f.endsWith(".json"));
    const approvals = files.map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(APPROVALS_DIR, f), "utf-8"));
      } catch { return null; }
    }).filter(a => a && a.status === "pending");

    approvals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return approvals[0] || null;
  } catch {
    return null;
  }
}

/**
 * 承認ステータスを更新
 */
export function updateApproval(id, status) {
  const filePath = path.join(APPROVALS_DIR, `${id}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    data.status = status;
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return data;
  } catch {
    return null;
  }
}

/**
 * 全承認リストを取得
 */
export function listApprovals(limit = 20) {
  try {
    const files = fs.readdirSync(APPROVALS_DIR).filter(f => f.endsWith(".json"));
    const approvals = files.map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(APPROVALS_DIR, f), "utf-8"));
      } catch { return null; }
    }).filter(Boolean);
    approvals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return approvals.slice(0, limit);
  } catch {
    return [];
  }
}
