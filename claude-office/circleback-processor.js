// ============================================
// Circleback Processor — 完全自動パイプライン
// Webhook受信 → Claude分析 → ファイル書き込み → Asana → git push → Slack通知
// 旧PCで24時間自律稼働。新PCは不要。
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runClaude } from "./claude-runner.js";
import { parseClaudeOutput, executeMendan } from "./mendan-executor.js";
import { createMendanTasks } from "./asana-mendan.js";
import { recordMeeting } from "./asana-meeting-recorder.js";
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

  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.test(name)) {
      return { pass: false, reason: `除外パターン: ${pattern}` };
    }
  }

  const externalAttendees = attendees.filter(
    (a) => a.email && !a.email.endsWith(OUR_DOMAIN)
  );
  const hasEmailAttendees = attendees.filter((a) => a.email).length;
  if (hasEmailAttendees > 0 && externalAttendees.length === 0) {
    return { pass: false, reason: "社内会議（外部参加者なし）" };
  }

  for (const pattern of INCLUDE_PATTERNS) {
    if (pattern.test(name)) {
      return { pass: true, reason: `タイトル: ${pattern}` };
    }
  }

  const transcript = payload.transcript || [];
  const fullText = transcript.map((t) => t.text).join(" ");
  const contentKeywords = [
    "101センター", "台湾留学101", "リッキー",
    "留学", "オールインワンプラン", "台湾の大学",
  ];
  const matchedKeyword = contentKeywords.find((kw) => fullText.includes(kw));
  if (matchedKeyword) {
    return { pass: true, reason: `transcript内容: "${matchedKeyword}"` };
  }

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
  try { return JSON.parse(fs.readFileSync(PENDING_FILE, "utf-8")); }
  catch { return []; }
}

function savePendingFile(data) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")); }
  catch { return { processedIds: [] }; }
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
  pending.push({ ...meetingData, receivedAt: new Date().toISOString(), status: "pending" });
  savePendingFile(pending);
}

export function getPending() {
  return loadPending().filter((p) => p.status === "pending");
}

export function markProcessed(meetingId) {
  const pending = loadPending();
  const updated = pending.map((p) =>
    p.id === meetingId ? { ...p, status: "done", doneAt: new Date().toISOString() } : p
  );
  savePendingFile(updated);

  const state = loadState();
  if (!state.processedIds.includes(meetingId)) {
    state.processedIds.push(meetingId);
    if (state.processedIds.length > 200) {
      state.processedIds = state.processedIds.slice(-200);
    }
    saveState(state);
  }
}

// ============================================
// LINE下書きからサブタスク用テキストを抽出
// ============================================
function extractLineDrafts(lineText) {
  if (!lineText) return {};
  const extract = (label) => {
    const re = new RegExp(`##\\s*${label}[\\s\\S]*?(?=\\n---\\n|\\n##\\s|$)`);
    const m = lineText.match(re);
    return m ? m[0].trim() : "";
  };
  return {
    today: extract("【当日】"),
    day3: extract("【3日後】"),
    day7: extract("【7日後】"),
    day14: extract("【14日後】"),
  };
}

// ============================================
// Step 1: Claude CLI で分析テキストを生成（出力のみ、ファイル操作なし）
// ============================================
async function runAnalysis(meetingData) {
  const promptPath = path.join(__dirname, "prompts", "mendan-circleback.md");
  let promptTemplate;
  try {
    promptTemplate = fs.readFileSync(promptPath, "utf-8");
  } catch (err) {
    return { ok: false, error: "プロンプトテンプレートなし: " + err.message };
  }

  const prompt = promptTemplate
    .replace("{{name}}", meetingData.name)
    .replace("{{date}}", meetingData.date)
    .replace("{{duration}}", meetingData.duration ? `${meetingData.duration}分` : "不明")
    .replace("{{attendees}}", meetingData.attendees.join("、"))
    .replace("{{notes}}", meetingData.notes)
    .replace("{{transcription}}", meetingData.transcript);

  console.log(`[Pipeline] Step 1/5: Claude CLI 分析開始 — ${meetingData.name}`);

  // Claude CLIは分析テキスト生成のみ（Readツールでナレッジ参照 + テキスト出力）
  const result = await runClaude(prompt, {
    maxTurns: 5,
    timeout: 5 * 60 * 1000,
    allowedTools: ["Read"],
  });

  return result;
}

// ============================================
// 除外判定（記録不要な会議）
// ============================================
function isExcludedMeeting(payload) {
  const name = payload.name || "";
  const SKIP_PATTERNS = [/歓迎会/, /忘年会/, /新年会/];
  for (const pattern of SKIP_PATTERNS) {
    if (pattern.test(name)) return { skip: true, reason: `除外: ${pattern}` };
  }
  // 極端に短い（5分未満）は誤検出の可能性
  if (payload.duration && payload.duration < 300) {
    return { skip: true, reason: "5分未満の会議" };
  }
  return { skip: false };
}

// ============================================
// 定例会議パイプライン（Claude分析なし、Asanaに議事録書き込みのみ）
// ============================================
async function processMeetingRecord(payload) {
  console.log(`[Pipeline:会議] 議事録記録: "${payload.name}"`);

  await sendSlack(
    `📝 会議Webhook受信: ${payload.name}\n` +
    `参加者: ${(payload.attendees || []).map(a => a.name).join("、")}\n` +
    `→ Asana MTG議事録に自動記録...`
  );

  try {
    const result = await recordMeeting(payload);
    markProcessed(payload.id);

    await sendSlack(
      `✅ 議事録記録完了: ${result.taskName}\n` +
      `→ Asana「${result.section}」セクション`
    );

    return { ok: true, type: "meeting", ...result };
  } catch (err) {
    console.error(`[Pipeline:会議] エラー:`, err.message);
    markProcessed(payload.id);
    await sendSlack(`❌ 議事録記録失敗: ${payload.name}\nエラー: ${err.message}`);
    return { ok: false, type: "meeting", error: err.message };
  }
}

// ============================================
// メインルーター: 3分岐（除外 / 面談 / 定例会議）
// ============================================
export async function processWebhook(payload) {
  const meetingId = payload.id;

  // 重複チェック
  if (isAlreadyProcessed(meetingId)) {
    console.log(`[Pipeline] 処理済みスキップ: ID=${meetingId}`);
    return { ok: true, skipped: true, reason: "already processed" };
  }

  // 1. 除外チェック（記録不要な会議）
  const excluded = isExcludedMeeting(payload);
  if (excluded.skip) {
    console.log(`[Pipeline] スキップ: ${excluded.reason}`);
    markProcessed(meetingId);
    return { ok: true, skipped: true, reason: excluded.reason };
  }

  // 2. 面談判定
  const judgment = isConsultationMeeting(payload);
  console.log(`[Pipeline] ルーティング: ${judgment.pass ? "面談パイプライン" : "定例会議レコーダー"} (${judgment.reason})`);

  // 3. 面談でなければ → 定例会議レコーダー
  if (!judgment.pass) {
    return processMeetingRecord(payload);
  }

  // データ抽出
  const meetingData = extractMeetingData(payload);
  console.log(`[Pipeline] ${meetingData.name}（${meetingData.date}）${meetingData.duration || "?"}分`);

  // Pending キューに追加
  addToPending(meetingData);

  // Slack: 受信通知
  await sendSlack(
    `📋 面談Webhook受信: ${meetingData.name}（${meetingData.date}）\n` +
    `参加者: ${meetingData.attendees.join("、")}\n` +
    `→ 自動分析パイプライン開始...`
  );

  try {
    // ── Step 1: Claude CLI 分析 ──
    const analysisResult = await runAnalysis(meetingData);
    if (!analysisResult.ok) {
      throw new Error(`Claude CLI失敗: ${analysisResult.error}`);
    }
    const claudeOutput = analysisResult.result;
    console.log(`[Pipeline] Step 1/5 完了: Claude分析 (${Math.round(analysisResult.duration / 1000)}秒)`);

    // ── Step 2: 区切りタグ解析 ──
    const sections = parseClaudeOutput(claudeOutput);
    if (!sections.report && !sections.line && !sections.customer) {
      throw new Error("Claude出力から区切りタグが見つかりません");
    }
    console.log(`[Pipeline] Step 2/5 完了: タグ解析 (report=${!!sections.report} line=${!!sections.line} customer=${!!sections.customer})`);

    // ── Step 3: ファイル書き込み + git push ──
    const execResult = await executeMendan(claudeOutput, meetingData.name, meetingData.date);
    console.log(`[Pipeline] Step 3/5 完了: ファイル書き込み + git push`);

    // ── Step 4: Asana タスク作成 ──
    const lineDrafts = extractLineDrafts(sections.line);
    const asanaResult = await createMendanTasks({
      name: meetingData.name,
      date: meetingData.date,
      reportText: sections.report || "",
      lineDrafts,
    });
    console.log(`[Pipeline] Step 4/5 完了: Asanaタスク作成 (main=${asanaResult.mainGid})`);

    // ── Step 5: 完了処理 ──
    markProcessed(meetingId);
    console.log(`[Pipeline] Step 5/5 完了: ステータス更新`);

    // Slack: 完了通知
    await sendSlack(
      `✅ 面談分析完了: ${meetingData.name}（${meetingData.date}）\n` +
      `所要時間: ${Math.round(analysisResult.duration / 1000)}秒\n` +
      `・分析レポート → knowledge/students/面談分析まとめ.md\n` +
      `・LINE下書き4通 → knowledge/students/LINE下書きまとめ.md\n` +
      `・顧客カード → knowledge/students/顧客コンテキスト.md\n` +
      `・Asanaタスク: メイン + サブ4件\n` +
      `・git push 完了`
    );

    return { ok: true, meetingData, asanaResult };

  } catch (err) {
    console.error(`[Pipeline] エラー:`, err.message);
    markProcessed(meetingId); // 無限リトライ防止

    await sendSlack(
      `❌ 面談自動分析失敗: ${meetingData.name}\n` +
      `エラー: ${err.message}\n` +
      `→ 新PCで /mendan を手動実行してください`
    );

    return { ok: false, error: err.message };
  }
}
