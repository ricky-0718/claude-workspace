// ============================================
// Asana Meeting Recorder
// Circleback議事録をMTG議事録プロジェクトに自動書き込み
// ============================================
import config from "./config.js";

const ASANA_BASE = "https://app.asana.com/api/1.0";
const PROJECT_ID = "1210645282894075"; // MTG議事録

// セクション: 会議タイトルやタグでルーティング
const SECTIONS = {
  teirei:   { gid: "1211369521437333", name: "定例会議" },
  kanbu:    { gid: "1210645283181097", name: "幹部会議" },
  soudan:   { gid: "1210645283181099", name: "相談会" },
  mendan4:  { gid: "1210645283181100", name: "4期生面談" },
  eigyo:    { gid: "1210645282894077", name: "営業メモ" },
};

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

/**
 * 会議タイトルからセクションを自動判定
 */
function detectSection(meetingName) {
  const name = meetingName || "";
  if (/幹部/i.test(name)) return SECTIONS.kanbu;
  if (/相談会/i.test(name)) return SECTIONS.soudan;
  if (/営業/i.test(name)) return SECTIONS.eigyo;
  // デフォルト: 定例会議
  return SECTIONS.teirei;
}

/**
 * 日付を YYYY/MM/DD 形式にフォーマット
 */
function formatDate(isoDate) {
  const d = new Date(isoDate);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Circlebackの議事録をAsana MTG議事録プロジェクトに書き込む
 * @param {object} payload - Circleback Webhookペイロード
 */
export async function recordMeeting(payload) {
  const attendees = (payload.attendees || []).map((a) => a.name).filter(Boolean);
  const dateStr = formatDate(payload.createdAt);
  const section = detectSection(payload.name);

  // タスク名: "YYYY/MM/DD 参加者1、参加者2、..."
  const taskName = `${dateStr} ${attendees.join("、") || payload.name || "不明"}`;

  // notes: Circlebackの議事録をそのまま使用
  let notes = payload.notes || "";

  // Action Items があれば追記
  if (payload.actionItems && payload.actionItems.length > 0) {
    notes += "\n\n✅ Action Items\n";
    for (const item of payload.actionItems) {
      const assignee = item.assignee ? ` (@${item.assignee})` : "";
      notes += `- ${item.text || item.description || ""}${assignee}\n`;
    }
  }

  console.log(`[MeetingRecorder] タスク作成: "${taskName}" → ${section.name}`);

  const result = await asanaRequest("POST", "/tasks", {
    name: taskName,
    projects: [PROJECT_ID],
    notes,
  });
  const taskGid = result.data.gid;

  // セクションに移動
  await asanaRequest("POST", `/sections/${section.gid}/addTask`, {
    task: taskGid,
  });

  console.log(`[MeetingRecorder] 完了: ${taskGid} → ${section.name}`);
  return { taskGid, section: section.name, taskName };
}
