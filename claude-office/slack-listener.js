// ============================================
// Slack 双方向通信モジュール
// #general チャンネルをポーリングし、ユーザーメッセージに応答
// 承認/却下/フィードバック/自由会話に対応
// ============================================
import config from "./config.js";
import { getLatestPending, updateApproval } from "./approval/manager.js";
import { getActiveDraft, addFeedback, updateDraft, clearActiveDraft } from "./draft-state.js";
import { refineDraft } from "./draft-generator.js";
import { sendSlack } from "./notifier.js";

const POLL_INTERVAL = 5000; // 5秒ごと
const APPROVE_KEYWORDS = ["OK", "ok", "承認", "はい", "送信して", "送って"];
const REJECT_KEYWORDS = ["却下", "やめて", "キャンセル", "いいえ", "ダメ"];

const SPECTRE_CHAT_PROMPT = `あなたは「スペクター」。台湾留学エージェント「101センター」代表リッキーに長年仕える老練な秘書。
有能で経験豊か、温かみのある老紳士。一人称は「わたくし」。リッキーさんを「リッキーさん」と呼ぶ。
控えめだが的確な助言をし、時折ユーモアや格言を交える。
回答は簡潔に。「ね」を語尾に使わない。`;

let pollTimer = null;
let lastTs = null; // 最後に処理したメッセージのタイムスタンプ
let botUserId = null; // ボット自身のユーザーID（自分のメッセージをスキップ用）

/**
 * Slack API 呼び出し
 */
async function slackApi(method, params = {}) {
  const token = config.spectre?.slackBotToken;
  if (!token) return { ok: false, error: "SPECTRE_SLACK_BOT_TOKEN not set" };

  const url = `https://slack.com/api/${method}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return res.json();
}

/**
 * Slack にスペクターとして返信
 */
async function reply(text, threadTs = null) {
  const params = {
    channel: config.spectre?.slackChannelId || "C0ALF4DAMH9",
    text,
    username: "スペクター",
  };
  if (threadTs) params.thread_ts = threadTs;
  return slackApi("chat.postMessage", params);
}

/**
 * Insight ブロック除去
 */
function stripInsight(text) {
  if (!text) return text;
  return text
    .replace(/`★ Insight[^`]*`[\s\S]*?`─+`\n*/g, "")
    .replace(/^---\n*/gm, "")
    .trim();
}

/**
 * メッセージを処理
 */
async function processMessage(text, ts) {
  console.log(`[Slack] Processing: "${text.substring(0, 50)}"`);

  // === 1. 承認応答チェック ===
  const pending = getLatestPending();
  if (pending) {
    const isApprove = APPROVE_KEYWORDS.some(k => text === k || text.startsWith(k));
    const isReject = REJECT_KEYWORDS.some(k => text === k || text.startsWith(k));

    if (isApprove) {
      updateApproval(pending.id, "approved");
      clearActiveDraft();
      await reply(`了解です（${pending.payload?.lineName || ""}）`, ts);
      return;
    }

    if (isReject) {
      updateApproval(pending.id, "rejected");
      clearActiveDraft();
      await reply(`破棄しました（${pending.payload?.lineName || ""}）`, ts);
      return;
    }
  }

  // === 2. 返信案のフィードバック ===
  const activeDraft = getActiveDraft();
  if (activeDraft) {
    await reply("承知いたしました。改善いたします...", ts);

    try {
      addFeedback(text);
      const result = await refineDraft(activeDraft, text);

      if (result.ok && result.draft) {
        updateDraft(result.draft);
        await reply(
          `改善いたしました。\n\nリッキーさんでしたら、こちらはいかがでしょう：\n\n${result.draft}\n\n「OK」→ 確定  「却下」→ 破棄\nさらに修正があればお申し付けください。`,
          ts
        );
      } else {
        await reply(`申し訳ございません。改善案の生成に失敗いたしました: ${result.error || "不明なエラー"}`, ts);
      }
    } catch (err) {
      console.error(`[Slack] Refinement error: ${err.message}`);
      await reply(`改善処理でエラーが発生いたしました: ${err.message}`, ts);
    }
    return;
  }

  // === 3. スペクターとの自由会話 ===
  try {
    const { runClaude } = await import("./claude-runner.js");
    const prompt = `${SPECTRE_CHAT_PROMPT}\n\nリッキーさんからのメッセージ:\n${text}\n\n簡潔に回答してください。`;
    const result = await runClaude(prompt, { maxTurns: 1, timeout: 50000, allowedTools: [] });

    let response = result.ok
      ? result.result
      : `申し訳ございません。エラーが発生いたしました: ${result.error}`;

    response = stripInsight(response);
    if (!response) response = "申し訳ございません。応答を生成できませんでした。";

    await reply(response, ts);
  } catch (err) {
    console.error(`[Slack] Claude error: ${err.message}`);
    await reply(`スペクターでございます。処理中にエラーが発生いたしました: ${err.message}`, ts);
  }
}

/**
 * ポーリングサイクル
 */
async function pollCycle() {
  try {
    const channelId = config.spectre?.slackChannelId || "C0ALF4DAMH9";
    const params = {
      channel: channelId,
      limit: 10,
    };
    if (lastTs) params.oldest = lastTs;

    const result = await slackApi("conversations.history", params);
    if (!result.ok) {
      if (result.error === "not_in_channel") {
        // ボットをチャンネルに参加させる
        await slackApi("conversations.join", { channel: channelId });
        console.log("[Slack] Joined channel");
        return;
      }
      console.error(`[Slack] Poll error: ${result.error}`);
      return;
    }

    // ボットのユーザーIDを初回取得
    if (!botUserId) {
      const authResult = await slackApi("auth.test");
      if (authResult.ok) {
        botUserId = authResult.user_id;
        console.log(`[Slack] Bot user ID: ${botUserId}`);
      }
    }

    const messages = (result.messages || [])
      .filter(m => {
        // ボット自身のメッセージをスキップ
        if (m.bot_id || m.user === botUserId) return false;
        // サブタイプ（channel_join等）をスキップ
        if (m.subtype) return false;
        // テキストメッセージのみ
        if (!m.text || !m.text.trim()) return false;
        // 既に処理済みのメッセージをスキップ
        if (lastTs && parseFloat(m.ts) <= parseFloat(lastTs)) return false;
        return true;
      })
      .sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts)); // 古い順

    for (const msg of messages) {
      await processMessage(msg.text.trim(), msg.ts);
      lastTs = msg.ts;
    }

    // メッセージがなくてもタイムスタンプを更新（重複防止）
    if (result.messages && result.messages.length > 0) {
      const maxTs = Math.max(...result.messages.map(m => parseFloat(m.ts)));
      if (!lastTs || maxTs > parseFloat(lastTs)) {
        lastTs = String(maxTs);
      }
    }
  } catch (err) {
    console.error(`[Slack] Poll error: ${err.message}`);
  }
}

/**
 * Slack リスナーを開始
 */
export function startSlackListener() {
  const token = config.spectre?.slackBotToken;
  if (!token) {
    console.log("[Slack] Bot token not configured. Listener not started.");
    return;
  }

  console.log(`[Slack] Starting listener (interval: ${POLL_INTERVAL / 1000}s)`);

  // 初回: 現在のタイムスタンプを設定（過去メッセージを処理しない）
  lastTs = String(Date.now() / 1000);

  setTimeout(() => pollCycle(), 3000);
  pollTimer = setInterval(pollCycle, POLL_INTERVAL);
}

/**
 * Slack リスナーを停止
 */
export function stopSlackListener() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  console.log("[Slack] Listener stopped");
}
