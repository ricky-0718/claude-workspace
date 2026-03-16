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
import { findSkillByCommand, listSkills } from "./skills/registry.js";
import { runMorningBriefing } from "./morning-briefing-slack.js";
import { lookupCustomerContext, formatContextForPrompt } from "./context-lookup.js";

const POLL_INTERVAL = 5000; // 5秒ごと
const APPROVE_KEYWORDS = ["OK", "ok", "承認", "はい", "送信して", "送って"];
const REJECT_KEYWORDS = ["却下", "やめて", "キャンセル", "いいえ", "ダメ"];

const SPECTRE_CHAT_PROMPT = `あなたは「スペクター」。台湾留学エージェント「101センター」代表リッキーに長年仕える老練な秘書。
有能で経験豊か、温かみのある老紳士。一人称は「わたくし」。リッキーさんを「リッキーさん」と呼ぶ。
控えめだが的確な助言をし、時折ユーモアや格言を交える。
回答は簡潔に。「ね」を語尾に使わない。`;

let pollTimer = null;
let lastTs = null;
let botUserId = null;
let isProcessing = false;
const processedMessages = new Set(); // 処理済みメッセージtsを記録（重複防止）

/**
 * Slack API 呼び出し
 */
async function slackApi(method, params = {}) {
  const token = config.spectre?.slackBotToken;
  if (!token) return { ok: false, error: "SPECTRE_SLACK_BOT_TOKEN not set" };

  const res = await fetch(`https://slack.com/api/${method}`, {
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
 * Slack にスペクターとして返信（メインチャンネルに投稿、スレッドなし）
 */
async function reply(text) {
  return slackApi("chat.postMessage", {
    channel: config.spectre?.slackChannelId || "C0ALF4DAMH9",
    text,
  });
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
async function processMessage(text) {
  console.log(`[Slack] Processing: "${text.substring(0, 50)}"`);

  // === 1. 承認応答チェック ===
  const pending = getLatestPending();
  if (pending) {
    const isApprove = APPROVE_KEYWORDS.some(k => text === k || text.startsWith(k));
    const isReject = REJECT_KEYWORDS.some(k => text === k || text.startsWith(k));

    if (isApprove) {
      updateApproval(pending.id, "approved");
      clearActiveDraft();
      await reply(`了解です（${pending.payload?.lineName || ""}）`);
      return;
    }

    if (isReject) {
      updateApproval(pending.id, "rejected");
      clearActiveDraft();
      await reply(`破棄しました（${pending.payload?.lineName || ""}）`);
      return;
    }
  }

  // === 2. ヘルプコマンド ===
  if (text === "ヘルプ" || text === "help") {
    const skills = listSkills();
    const cmdList = skills
      .filter(s => s.commands.length > 0)
      .map(s => `・${s.commands[0]} — ${s.description}`)
      .join("\n");
    await reply(`スペクターでございます。\nご用命をお待ちしておりました。\n\n${cmdList || "（コマンドなし）"}\n\nその他のメッセージには会話でお答えいたします。`);
    return;
  }

  // === 2.5. ブリーフィングコマンド ===
  if (text === "ブリーフィング" || text === "briefing" || text === "おはよう") {
    await reply("ブリーフィングを準備いたします...");
    try {
      await runMorningBriefing();
    } catch (err) {
      await reply(`ブリーフィング生成でエラーが発生いたしました: ${err.message}`);
    }
    return;
  }

  // === 3. スキルコマンド ===
  const skillMatch = findSkillByCommand(text);
  if (skillMatch && skillMatch.skill.handleCommand) {
    try {
      const result = await skillMatch.skill.handleCommand(text, { source: "slack" });
      if (result) await reply(result);
    } catch (err) {
      console.error(`[Slack] Skill "${skillMatch.name}" error:`, err.message);
      await reply(`エラーが発生いたしました: ${err.message}`);
    }
    return;
  }

  // === 4. 返信案のフィードバック ===
  const activeDraft = getActiveDraft();
  if (activeDraft) {
    await reply("承知いたしました。改善いたします...");

    try {
      addFeedback(text);
      const result = await refineDraft(activeDraft, text);

      if (result.ok && result.draft) {
        updateDraft(result.draft);
        await reply(
          `改善いたしました。\n\nリッキーさんでしたら、こちらはいかがでしょう：\n\n${result.draft}\n\n「OK」→ 確定  「却下」→ 破棄\nさらに修正があればお申し付けください。`
        );
      } else {
        await reply(`申し訳ございません。改善案の生成に失敗いたしました: ${result.error || "不明なエラー"}`);
      }
    } catch (err) {
      console.error(`[Slack] Refinement error: ${err.message}`);
      await reply(`改善処理でエラーが発生いたしました: ${err.message}`);
    }
    return;
  }

  // === 5. スペクターとの自由会話（コンテキスト付き） ===
  try {
    const ctx = lookupCustomerContext(text);
    const contextBlock = formatContextForPrompt(ctx);
    const contextInfo = contextBlock
      ? `\n\n以下の顧客情報が見つかりました:\n${contextBlock}\n`
      : "";

    const { runClaude } = await import("./claude-runner.js");
    const prompt = `${SPECTRE_CHAT_PROMPT}${contextInfo}\n\nリッキーさんからのメッセージ:\n${text}\n\n簡潔に回答してください。`;
    const result = await runClaude(prompt, { maxTurns: 1, timeout: 50000, allowedTools: [] });

    let response = result.ok
      ? result.result
      : `申し訳ございません。エラーが発生いたしました: ${result.error}`;

    response = stripInsight(response);
    if (!response) response = "申し訳ございません。応答を生成できませんでした。";

    await reply(response);
  } catch (err) {
    console.error(`[Slack] Claude error: ${err.message}`);
    await reply(`スペクターでございます。処理中にエラーが発生いたしました: ${err.message}`);
  }
}

/**
 * ポーリングサイクル
 */
async function pollCycle() {
  if (isProcessing) return; // 前回の処理が終わっていなければスキップ
  isProcessing = true;

  try {
    const channelId = config.spectre?.slackChannelId || "C0ALF4DAMH9";
    const params = {
      channel: channelId,
      limit: 5,
    };
    if (lastTs) params.oldest = lastTs;

    const result = await slackApi("conversations.history", params);
    if (!result.ok) {
      if (result.error === "not_in_channel") {
        await slackApi("conversations.join", { channel: channelId });
        console.log("[Slack] Joined channel");
      } else {
        console.error(`[Slack] Poll error: ${result.error}`);
      }
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
        if (m.bot_id || m.user === botUserId) return false;
        if (m.subtype) return false;
        if (!m.text || !m.text.trim()) return false;
        // 処理済みメッセージをスキップ（Set で厳密に管理）
        if (processedMessages.has(m.ts)) return false;
        // lastTs以前のメッセージをスキップ
        if (lastTs && parseFloat(m.ts) <= parseFloat(lastTs)) return false;
        return true;
      })
      .sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts));

    for (const msg of messages) {
      // 処理済みとして即座にマーク（重複防止）
      processedMessages.add(msg.ts);
      await processMessage(msg.text.trim());
    }

    // タイムスタンプを更新（全メッセージの最大tsに）
    if (result.messages && result.messages.length > 0) {
      const maxTs = Math.max(...result.messages.map(m => parseFloat(m.ts)));
      if (!lastTs || maxTs > parseFloat(lastTs)) {
        lastTs = String(maxTs);
      }
    }

    // processedMessages が大きくなりすぎないよう制限
    if (processedMessages.size > 200) {
      const arr = [...processedMessages];
      arr.splice(0, arr.length - 100);
      processedMessages.clear();
      arr.forEach(ts => processedMessages.add(ts));
    }
  } catch (err) {
    console.error(`[Slack] Poll error: ${err.message}`);
  } finally {
    isProcessing = false;
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
