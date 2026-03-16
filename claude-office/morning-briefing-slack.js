// ============================================
// モーニングブリーフィング（Slack配信）
// Asana・広告Spreadsheet・Gmail・Calendar・ローカルmdから情報収集
// 毎朝8:00 JSTに自動実行 + Slackコマンドでオンデマンド実行
// ============================================
import config from "./config.js";
import { sendSlack } from "./notifier.js";
import { google } from "googleapis";

// ============================================
// Asana API
// ============================================
const ASANA_BASE = "https://app.asana.com/api/1.0";

const PIPELINE_SECTIONS = [
  "見込み客", "フォーム記入待ち", "契約書作成依頼", "契約書送信済",
  "締結済", "入金確認済", "BAND招待済み", "担当者挨拶済み",
];

// ブリーフィングで除外するセクション（終了済み・マイルストーン系）
const EXCLUDED_SECTIONS = [
  "契約不成立", "TOCFL A2合格", "志望校確定",
];

async function asanaApi(endpoint, params = {}) {
  const pat = config.asana?.pat;
  if (!pat) return { data: [], error: "ASANA_PAT not set" };

  const url = new URL(`${ASANA_BASE}${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${pat}` },
  });
  if (!res.ok) return { data: [], error: `HTTP ${res.status}` };
  return res.json();
}

async function fetchAsanaTasks() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 3);
  const futureStr = futureDate.toISOString().split("T")[0];

  const projectId = config.asana?.contractProjectId || "1209960384497212";
  const workspaceId = config.asana?.workspaceId || "1208442893224580";

  const result = await asanaApi(
    `/workspaces/${workspaceId}/tasks/search`,
    {
      "projects.any": projectId,
      completed: "false",
      "due_on.before": futureStr,
      "opt_fields": "name,due_on,memberships.section.name,parent.name",
      limit: "50",
      sort_by: "due_date",
      sort_ascending: "true",
    }
  );

  if (result.error) return { overdue: [], today: [], upcoming: [], error: result.error };

  const tasks = result.data || [];
  const overdue = [];
  const todayTasks = [];
  const upcoming = [];

  // 期限超過は14日前まで（それ以上古いタスクはノイズ）
  const cutoffDate = new Date(today);
  cutoffDate.setDate(cutoffDate.getDate() - 14);
  const cutoffStr = cutoffDate.toISOString().split("T")[0];

  for (const t of tasks) {
    if (!t.due_on) continue;
    const section = t.memberships?.[0]?.section?.name || "";

    // 終了系セクションのタスクを除外
    if (EXCLUDED_SECTIONS.includes(section)) continue;

    // サブタスク（【3日後】等）に親タスク名を付与
    const parentName = t.parent?.name || "";
    const displayName = parentName && !t.name.includes(parentName.split("さん")[0])
      ? `${t.name}（${parentName.replace(/さん.*/, "さん")}）`
      : t.name;
    const entry = { name: displayName, due: t.due_on, section };

    if (t.due_on < todayStr) {
      // 14日以上前の期限超過はスキップ
      if (t.due_on >= cutoffStr) overdue.push(entry);
    } else if (t.due_on === todayStr) {
      todayTasks.push(entry);
    } else {
      upcoming.push(entry);
    }
  }

  return { overdue, today: todayTasks, upcoming, error: null };
}

async function fetchPipeline() {
  const projectId = config.asana?.contractProjectId || "1209960384497212";
  const sectionsRes = await asanaApi(`/projects/${projectId}/sections`);
  if (sectionsRes.error) return { counts: {}, error: sectionsRes.error };

  const counts = {};
  for (const s of (sectionsRes.data || [])) {
    if (!PIPELINE_SECTIONS.includes(s.name)) continue;
    const tasksRes = await asanaApi(`/sections/${s.gid}/tasks`, {
      completed_since: "now",
      opt_fields: "gid",
      limit: "100",
    });
    counts[s.name] = (tasksRes.data || []).length;
  }

  return { counts, error: null };
}

// ============================================
// Google APIs（invoice-poller.jsと同じOAuth）
// ============================================

function getGoogleAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2;
}

async function fetchAdsData() {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: "1lq2N5KtvdNaFqZweEaN2n3nAoFuHRrWKUU8TIseZN_M",
      range: "Meta広告_生データ!A:G",
    });

    const rows = res.data.values || [];
    if (rows.length < 2) return { error: "No data" };

    const header = rows[0];
    const lastRow = rows[rows.length - 1];

    const data = {};
    for (let i = 0; i < header.length; i++) {
      data[header[i]] = lastRow[i];
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function fetchGmail() {
  try {
    const auth = getGoogleAuth();
    const gmail = google.gmail({ version: "v1", auth });

    const unread = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread newer_than:3d",
      maxResults: 10,
    });

    const msgs = unread.data.messages || [];
    const count = unread.data.resultSizeEstimate || msgs.length;
    const details = [];

    for (const m of msgs.slice(0, 5)) {
      const detail = await gmail.users.messages.get({
        userId: "me",
        id: m.id,
        format: "metadata",
        metadataHeaders: ["From", "Subject"],
      });
      const from = detail.data.payload.headers.find(h => h.name === "From")?.value || "";
      const subject = detail.data.payload.headers.find(h => h.name === "Subject")?.value || "";
      const shortFrom = from.replace(/<.*>/, "").trim().slice(0, 20);
      details.push({ from: shortFrom, subject: subject.slice(0, 50) });
    }

    return { count, details, error: null };
  } catch (err) {
    return { count: 0, details: [], error: err.message };
  }
}

async function fetchCalendar() {
  try {
    const auth = getGoogleAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const res = await calendar.events.list({
      calendarId: "newgoodriki@gmail.com",
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 10,
    });

    const events = (res.data.items || []).map(e => ({
      time: e.start.dateTime
        ? new Date(e.start.dateTime).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
        : "終日",
      summary: e.summary || "(無題)",
    }));

    return { events, error: null };
  } catch (err) {
    // スコープ不足の場合は静かにスキップ
    if (err.message?.includes("insufficient authentication scopes")) {
      return { events: [], error: null, note: "Calendar APIスコープ未設定" };
    }
    return { events: [], error: err.message };
  }
}

// ============================================
// ブリーフィング整形 + 配信
// ============================================

function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  return `${Number(parts[1])}/${Number(parts[2])}`;
}

function formatTasks(asana) {
  const lines = [];

  if (asana.overdue.length > 0) {
    lines.push("⚠️ 期限超過:");
    for (const t of asana.overdue) {
      const sec = t.section ? ` (${t.section})` : "";
      lines.push(`・${t.name}${sec} — ${formatDate(t.due)}期限`);
    }
    lines.push("");
  }

  if (asana.today.length > 0) {
    lines.push("📌 本日期限:");
    for (const t of asana.today) {
      const sec = t.section ? ` (${t.section})` : "";
      lines.push(`・${t.name}${sec}`);
    }
    lines.push("");
  }

  if (asana.upcoming.length > 0) {
    lines.push("📅 直近（3日以内）:");
    for (const t of asana.upcoming.slice(0, 5)) {
      lines.push(`・${t.name}（${formatDate(t.due)}）`);
    }
  }

  return lines.length > 0 ? lines.join("\n") : "タスクなし";
}

function formatPipeline(pipeline) {
  if (pipeline.error) return `取得エラー: ${pipeline.error}`;
  const parts = PIPELINE_SECTIONS
    .filter(s => pipeline.counts[s] !== undefined)
    .map(s => `${s}: ${pipeline.counts[s]}`);
  return parts.join(" → ") || "データなし";
}

function formatAds(ads) {
  if (ads.error) return `取得エラー: ${ads.error}`;
  if (!ads.data) return "データなし";
  const d = ads.data;
  const cost = d["広告費"] ? `¥${Number(d["広告費"]).toLocaleString()}` : "?";
  const clicks = d["クリック数"] || "?";
  const regs = d["LINE登録数"] || "0";
  const date = d["日付"] || "?";
  return `${date} | 広告費: ${cost} | クリック: ${clicks} | LINE登録: ${regs}`;
}

function formatGmail(gmail) {
  if (gmail.error) return `取得エラー: ${gmail.error}`;
  if (gmail.count === 0) return "未読なし";
  const lines = [`未読 ${gmail.count}件:`];
  for (const m of gmail.details) {
    lines.push(`・[${m.from}] ${m.subject}`);
  }
  return lines.join("\n");
}

function formatCalendar(cal) {
  if (cal.error) return `取得エラー: ${cal.error}`;
  if (cal.note) return cal.note;
  if (cal.events.length === 0) return "予定なし";
  return cal.events.map(e => `・${e.time} ${e.summary}`).join("\n");
}

/**
 * ブリーフィングを生成してSlackに送信
 */
export async function runMorningBriefing() {
  console.log("[Briefing] Starting morning briefing...");

  const [asana, pipeline, ads, gmail, cal] = await Promise.all([
    fetchAsanaTasks().catch(e => ({ overdue: [], today: [], upcoming: [], error: e.message })),
    fetchPipeline().catch(e => ({ counts: {}, error: e.message })),
    fetchAdsData().catch(e => ({ data: null, error: e.message })),
    fetchGmail().catch(e => ({ count: 0, details: [], error: e.message })),
    fetchCalendar().catch(e => ({ events: [], error: e.message })),
  ]);

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;

  const message = `おはようございます、リッキーさん。${dateStr}のブリーフィングでございます。

━━ タスク ━━
${formatTasks(asana)}

━━ パイプライン ━━
${formatPipeline(pipeline)}

━━ 広告 ━━
${formatAds(ads)}

━━ Gmail ━━
${formatGmail(gmail)}

━━ 本日の予定 ━━
${formatCalendar(cal)}

ご確認事項があればお申し付けください。`;

  const result = await sendSlack(message);
  console.log(`[Briefing] ${result.ok ? "Sent to Slack" : `Failed: ${result.error}`}`);
  return { ok: result.ok, message };
}
