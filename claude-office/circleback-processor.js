// ============================================
// Circleback Processor
// Webhook ペイロードの判定・変換・Claude CLI 起動
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runClaude } from "./claude-runner.js";
import { sendSlack } from "./notifier.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(__dirname, "data");

const PENDING_FILE = path.join(DATA_DIR, "circleback-pending.json");
const STATE_FILE = path.join(DATA_DIR, "circleback-state.json");

// ============================================
// 「台湾留学101センター」誤認識の後処理
// ============================================
const MISRECOGNITION_PATTERNS = [
  /1万人センター/g,
  /10,000人センター/g,
  /10000人センター/g,
  /一万人センター/g,
  /one man center/gi,
  /1万センター/g,
];

export function fixMisrecognition(text) {
  if (!text) return text;
  let fixed = text;
  for (const pattern of MISRECOGNITION_PATTERNS) {
    fixed = fixed.replace(pattern, "台湾留学101センター");
  }
  return fixed;
}

// ============================================
// 面談判定ロジック（第2段階フィルタ）
// ============================================
const EXCLUDE_PATTERNS = [
  /社内(mtg|ミーティング|定例|会議)/i,
  /定例(会議|ミーティング|mtg)/i,
  /歓迎会/,
  /忘年会/,
  /新年会/,
  /1on1/i,
  /スタッフ(会議|ミーティング)/,
];

const INCLUDE_PATTERNS = [
  /面談/,
  /相談/,
  /個別(相談|面談)/,
  /ウェビナー後/,
  /留学(相談|カウンセリング)/,
];

const OUR_DOMAIN = "@ryugaku101.com";

export function isConsultationMeeting(payload) {
  const name = payload.name || "";
  const attendees = payload.attendees || [];

  // 1. 除外パターンチェック
  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.test(name)) {
      return { pass: false, reason: `除外パターン: ${pattern}` };
    }
  }

  // 2. 出席者全員が社内ドメイン → 社内会議として除外
  const externalAttendees = attendees.filter(
    (a) => a.email && !a.email.endsWith(OUR_DOMAIN)
  );
  const hasEmailAttendees = attendees.filter((a) => a.email).length;
  if (hasEmailAttendees > 0 && externalAttendees.length === 0) {
    return { pass: false, reason: "社内会議（外部参加者なし）" };
  }

  // 3. タイトルパターンマッチ
  for (const pattern of INCLUDE_PATTERNS) {
    if (pattern.test(name)) {
      return { pass: true, reason: `タイトル: ${pattern}` };
    }
  }

  // 4. transcript内容チェック（タイトルにヒットしなかった場合）
  const transcript = payload.transcript || [];
  const fullText = transcript.map((t) => t.text).join(" ");
  const contentKeywords = [
    "101センター",
    "台湾留学101",
    "リッキー",
    "留学",
    "オールインワンプラン",
    "台湾の大学",
  ];
  const matchedKeyword = contentKeywords.find((kw) => fullText.includes(kw));
  if (matchedKeyword) {
    return { pass: true, reason: `transcript内容: "${matchedKeyword}"` };
  }

  // 5. タグに「面談」が含まれるか
  const tags = payload.tags || [];
  if (tags.some((t) => t === "面談" || t === "相談")) {
    return { pass: true, reason: `タグ: ${tags.join(",")}` };
  }

  return { pass: false, reason: "条件不一致" };
}

// ============================================
// transcript 配列 → mendan テキスト形式に変換
// ============================================
function formatTimestamp(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatTranscript(transcript) {
  if (!transcript || transcript.length === 0) return "";
  return transcript
    .map((t) => {
      const ts = formatTimestamp(t.timestamp || 0);
      const speaker = t.speaker || "不明";
      const text = fixMisrecognition(t.text || "");
      return `[${speaker}] ${ts}\n${text}`;
    })
    .join("\n\n");
}

// ============================================
// Webhook ペイロードから mendan 入力データを抽出
// ============================================
export function extractMeetingData(payload) {
  const attendees = payload.attendees || [];
  const externalAttendees = attendees.filter(
    (a) => !a.email || !a.email.endsWith(OUR_DOMAIN)
  );
  const clientName =
    externalAttendees.length > 0
      ? externalAttendees[0].name
      : attendees[0]?.name || "不明";

  const createdAt = new Date(payload.createdAt);
  const dateStr = `${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`;

  const durationMin = payload.duration
    ? Math.round(payload.duration / 60)
    : null;

  const notes = fixMisrecognition(payload.notes || "");
  const transcriptText = formatTranscript(payload.transcript || []);

  // 全出席者名リスト（同席者の特定用）
  const allNames = attendees.map((a) => a.name).filter(Boolean);

  return {
    id: payload.id,
    name: clientName,
    date: dateStr,
    duration: durationMin,
    attendees: allNames,
    externalAttendees: externalAttendees.map((a) => a.name).filter(Boolean),
    notes,
    transcript: transcriptText,
    actionItems: payload.actionItems || [],
    insights: payload.insights || {},
    meetingUrl: payload.url || "",
    recordingUrl: payload.recordingUrl || null,
  };
}

// ============================================
// Pending キュー管理
// ============================================
function loadPending() {
  try {
    return JSON.parse(fs.readFileSync(PENDING_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function savePendingFile(data) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return { processedIds: [] };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

export function isAlreadyProcessed(meetingId) {
  const state = loadState();
  return state.processedIds.includes(meetingId);
}

export function addToPending(meetingData) {
  const pending = loadPending();
  pending.push({
    ...meetingData,
    receivedAt: new Date().toISOString(),
    status: "pending",
  });
  savePendingFile(pending);
}

export function getPending() {
  return loadPending().filter((p) => p.status === "pending");
}

export function markProcessed(meetingId) {
  // pending から除去
  const pending = loadPending();
  const updated = pending.map((p) =>
    p.id === meetingId ? { ...p, status: "done", doneAt: new Date().toISOString() } : p
  );
  savePendingFile(updated);

  // state に追加
  const state = loadState();
  if (!state.processedIds.includes(meetingId)) {
    state.processedIds.push(meetingId);
    // 最大200件保持
    if (state.processedIds.length > 200) {
      state.processedIds = state.processedIds.slice(-200);
    }
    saveState(state);
  }
}

// ============================================
// Claude CLI で面談分析を実行
// ============================================
export async function triggerAnalysis(meetingData) {
  const promptPath = path.join(__dirname, "prompts", "mendan-circleback.md");
  let promptTemplate;
  try {
    promptTemplate = fs.readFileSync(promptPath, "utf-8");
  } catch (err) {
    console.error("[Processor] プロンプトテンプレートの読み込みに失敗:", err.message);
    return { ok: false, error: "プロンプトテンプレートなし" };
  }

  // テンプレートの変数を置換
  const prompt = promptTemplate
    .replace("{{name}}", meetingData.name)
    .replace("{{date}}", meetingData.date)
    .replace("{{duration}}", meetingData.duration ? `${meetingData.duration}分` : "不明")
    .replace("{{attendees}}", meetingData.attendees.join("、"))
    .replace("{{notes}}", meetingData.notes)
    .replace("{{transcription}}", meetingData.transcript);

  console.log(`[Processor] Claude CLI 起動: ${meetingData.name}（${meetingData.date}）`);

  const result = await runClaude(prompt, {
    maxTurns: 15,
    timeout: 8 * 60 * 1000, // 8分（mendan分析は長い）
    allowedTools: [
      "Read", "Write", "Edit", "Bash", "Glob", "Grep",
      "mcp__plugin_asana_asana__asana_create_task",
      "mcp__plugin_asana_asana__asana_set_parent_for_task",
    ],
  });

  if (result.ok) {
    markProcessed(meetingData.id);
    console.log(`[Processor] 分析完了: ${meetingData.name}（${result.duration}ms）`);
  } else {
    console.error(`[Processor] 分析失敗: ${result.error}`);
  }

  return result;
}

// ============================================
// Webhook 受信時のメイン処理フロー
// ============================================
export async function processWebhook(payload) {
  const meetingId = payload.id;

  // 重複チェック
  if (isAlreadyProcessed(meetingId)) {
    console.log(`[Processor] 処理済みスキップ: ID=${meetingId}`);
    return { ok: true, skipped: true, reason: "already processed" };
  }

  // 面談判定
  const judgment = isConsultationMeeting(payload);
  console.log(`[Processor] 面談判定: ${judgment.pass ? "✓" : "✗"} (${judgment.reason})`);

  if (!judgment.pass) {
    return { ok: true, skipped: true, reason: judgment.reason };
  }

  // データ抽出
  const meetingData = extractMeetingData(payload);
  console.log(`[Processor] 面談データ: ${meetingData.name}（${meetingData.date}）${meetingData.duration || "?"}分`);

  // Pending キューに追加
  addToPending(meetingData);

  // Slack通知
  await sendSlack(
    `📋 面談Webhook受信: ${meetingData.name}（${meetingData.date}）\n` +
    `参加者: ${meetingData.attendees.join("、")}\n` +
    `時間: ${meetingData.duration || "?"}分\n` +
    `判定: ${judgment.reason}\n` +
    `→ Claude分析を開始します...`
  );

  // Claude CLI で自動分析（非同期）
  const analysisResult = await triggerAnalysis(meetingData);

  if (analysisResult.ok) {
    await sendSlack(
      `✅ 面談分析完了: ${meetingData.name}（${meetingData.date}）\n` +
      `所要時間: ${Math.round(analysisResult.duration / 1000)}秒`
    );
  } else {
    await sendSlack(
      `❌ 面談分析失敗: ${meetingData.name}\n` +
      `エラー: ${analysisResult.error}\n` +
      `→ /mendan で手動実行してください`
    );
  }

  return { ok: true, meetingData, analysisResult };
}
