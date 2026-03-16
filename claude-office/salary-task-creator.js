// ============================================
// 給料支払い Asana タスク自動作成
// 毎月1日に翌月分のタスク+サブタスクを作成
// ============================================
import config from "./config.js";

const ASANA_BASE = "https://app.asana.com/api/1.0";

// --- メンバー定義 ---
const MEMBERS_15TH = [
  "常世田理子", "王承翰", "うーさん", "上蔵いおり",
  "大勝晴人", "かのは", "エミリー",
];

const MEMBERS_25TH = [
  "よねさん", "リッキー", "なおこ先生", "みみこ先生", "華原琢眞",
];

// --- Asana API ヘルパー ---
async function asanaApi(method, endpoint, body = null) {
  const pat = config.asana?.pat;
  if (!pat) {
    console.error("[salary] ASANA_PAT not configured");
    return null;
  }

  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${pat}`,
      "Content-Type": "application/json",
    },
  };
  if (body) opts.body = JSON.stringify({ data: body });

  const res = await fetch(`${ASANA_BASE}${endpoint}`, opts);
  if (!res.ok) {
    const text = await res.text();
    console.error(`[salary] Asana API error: ${res.status} ${text}`);
    return null;
  }
  const json = await res.json();
  return json.data;
}

// --- タスク作成 ---
async function createSalaryTask(year, month) {
  const monthStr = `${month}月`;
  const taskName = `${monthStr}　給料支払い`;
  const dueDate15 = `${year}-${String(month).padStart(2, "0")}-15`;
  const dueDate25 = `${year}-${String(month).padStart(2, "0")}-25`;

  console.log(`[salary] Creating: ${taskName} (due: ${dueDate15})`);

  // 親タスク作成（期日はまず15日）
  const parentTask = await asanaApi("POST", "/tasks", {
    name: taskName,
    assignee: config.asana.assigneeId,
    workspace: config.asana.workspaceId,
    due_on: dueDate15,
    notes: `${monthStr}分の給料支払い管理タスク（自動作成）\n\n15日払い: ${MEMBERS_15TH.length}名\n25日払い: ${MEMBERS_25TH.length}名`,
  });

  if (!parentTask) {
    console.error("[salary] Failed to create parent task");
    return null;
  }
  console.log(`[salary] Parent task created: ${parentTask.gid}`);

  // サブタスク作成（15日組）
  for (const name of MEMBERS_15TH) {
    const sub = await asanaApi("POST", `/tasks/${parentTask.gid}/subtasks`, {
      name,
      due_on: dueDate15,
    });
    if (sub) console.log(`[salary]   + ${name} (15日)`);
  }

  // サブタスク作成（25日組）
  for (const name of MEMBERS_25TH) {
    const sub = await asanaApi("POST", `/tasks/${parentTask.gid}/subtasks`, {
      name,
      due_on: dueDate25,
    });
    if (sub) console.log(`[salary]   + ${name} (25日)`);
  }

  console.log(`[salary] Done: ${taskName} (${MEMBERS_15TH.length + MEMBERS_25TH.length} subtasks)`);
  return parentTask;
}

// --- 重複チェック ---
async function taskAlreadyExists(year, month) {
  const monthStr = `${month}月`;
  const res = await asanaApi(
    "GET",
    `/workspaces/${config.asana.workspaceId}/tasks/search?text=${encodeURIComponent(monthStr + "　給料支払い")}&assignee.any=${config.asana.assigneeId}&is_subtask=false&completed=false&limit=5`
  );
  if (!res) return false;
  return res.some((t) => t.name.includes(`${monthStr}`) && t.name.includes("給料支払い"));
}

// --- スケジューラ ---
let schedulerTimer = null;
const CHECK_INTERVAL = 6 * 60 * 60 * 1000; // 6時間ごとにチェック

async function checkAndCreate() {
  const now = new Date();
  const day = now.getDate();

  // 1日〜3日の間だけ実行（余裕を持たせる）
  if (day > 3) return;

  // 翌月ではなく「今月分」を作成（1日に当月タスクを作る）
  // ※ 月末締め翌月払いなので、3月1日に「3月 給料支払い」を作る
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0-indexed → 1-indexed

  // 重複チェック
  const exists = await taskAlreadyExists(year, month);
  if (exists) {
    console.log(`[salary] ${month}月分は既に存在。スキップ。`);
    return;
  }

  await createSalaryTask(year, month);
}

export function startSalaryScheduler() {
  if (!config.asana?.pat) {
    console.log("[salary] ASANA_PAT not set, scheduler disabled");
    return;
  }
  if (schedulerTimer) return;

  console.log("[salary] Scheduler started (checks every 6h)");

  // 初回チェックは起動30秒後
  setTimeout(() => checkAndCreate().catch((e) => console.error("[salary] Error:", e.message)), 30_000);

  // 以降6時間ごと
  schedulerTimer = setInterval(
    () => checkAndCreate().catch((e) => console.error("[salary] Error:", e.message)),
    CHECK_INTERVAL
  );
}

export function stopSalaryScheduler() {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
    console.log("[salary] Scheduler stopped");
  }
}

// CLI直接実行用: node salary-task-creator.js [year] [month]
const isDirectRun = process.argv[1]?.includes("salary-task-creator");
if (isDirectRun) {
  const args = process.argv.slice(2);
  const now = new Date();
  const year = parseInt(args[0]) || now.getFullYear();
  const month = parseInt(args[1]) || now.getMonth() + 1;
  console.log(`[salary] Manual run: ${year}年${month}月`);
  createSalaryTask(year, month)
    .then((t) => t ? console.log(`[salary] Success: ${t.gid}`) : console.log("[salary] Failed"))
    .catch((e) => console.error("[salary] Error:", e));
}
