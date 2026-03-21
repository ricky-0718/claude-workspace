// ============================================
// Asana Mendan Task Creator
// REST API直接呼び出し（MCP不要）
// 面談後フォロータスク + サブタスク4件を自動作成
// ============================================
import config from "./config.js";

const ASANA_BASE = "https://app.asana.com/api/1.0";
const PROJECT_ID = "1209960384497212"; // オールインワンプラン契約書
const SECTION_ID = "1209960384497232"; // 見込み客セクション
const ASSIGNEE_ID = "1208498758664385"; // 新良理輝

function getHeaders() {
  const pat = config.asana?.pat || process.env.ASANA_PAT;
  if (!pat) throw new Error("ASANA_PAT が未設定です");
  return {
    Authorization: `Bearer ${pat}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function asanaRequest(method, path, body) {
  const res = await fetch(`${ASANA_BASE}${path}`, {
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify({ data: body }) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Asana API ${res.status}: ${text}`);
  }
  return res.json();
}

function addDays(dateStr, days) {
  // dateStr: "2026/3/21" → Date → +days → "2026-03-21"
  const parts = dateStr.split("/");
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/**
 * 面談フォローのメインタスク + サブタスク4件を作成
 * @param {object} params
 * @param {string} params.name - 見込み客の名前
 * @param {string} params.date - 面談日 "2026/3/21"
 * @param {string} params.reportText - 分析レポート全文（メインタスクのnotes）
 * @param {object} params.lineDrafts - { today, day3, day7, day14 } 各LINE全文
 */
export async function createMendanTasks({ name, date, reportText, lineDrafts }) {
  console.log(`[Asana] メインタスク作成: ${name}さん 面談フォロー`);

  // 1. メインタスク作成
  const mainRes = await asanaRequest("POST", "/tasks", {
    name: `${name}さん 面談フォロー`,
    projects: [PROJECT_ID],
    assignee: ASSIGNEE_ID,
    due_on: addDays(date, 14),
    notes: reportText || "",
  });
  const mainGid = mainRes.data.gid;
  console.log(`[Asana] メインタスク作成完了: ${mainGid}`);

  // セクションに移動
  await asanaRequest("POST", `/sections/${SECTION_ID}/addTask`, {
    task: mainGid,
  });

  // 2. サブタスク4件
  const subtasks = [
    { name: `【当日】お礼LINE送信`, days: 0, notes: lineDrafts?.today || "" },
    { name: `【3日後】進捗確認LINE`, days: 3, notes: lineDrafts?.day3 || "" },
    { name: `【7日後】期限通知LINE`, days: 7, notes: lineDrafts?.day7 || "" },
    { name: `【14日後】最終確認LINE`, days: 14, notes: lineDrafts?.day14 || "" },
  ];

  const subtaskGids = [];
  for (const st of subtasks) {
    const subRes = await asanaRequest("POST", "/tasks", {
      name: st.name,
      assignee: ASSIGNEE_ID,
      due_on: addDays(date, st.days),
      notes: st.notes,
    });
    const subGid = subRes.data.gid;
    subtaskGids.push(subGid);

    // 親子関係を設定
    await asanaRequest("POST", `/tasks/${subGid}/setParent`, {
      parent: mainGid,
    });
    console.log(`[Asana] サブタスク作成: ${st.name} (${subGid})`);
  }

  return { mainGid, subtaskGids };
}
