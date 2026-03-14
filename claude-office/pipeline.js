// ============================================
// メッセージ処理パイプライン
// Chatworkポーリング → バッファリング → 結合 → Claude返信案生成
// ============================================
import config from "./config.js";
import { pollChatwork, updateMessageStatus } from "./chatwork-poller.js";
import { getSkillsByTrigger } from "./skills/registry.js";
import { addConversation } from "./memory/customer-store.js";

let isProcessing = false;
let pollTimer = null;
let stats = {
  totalPolls: 0,
  totalMessages: 0,
  totalDrafts: 0,
  lastPollAt: null,
  lastError: null,
  isRunning: false,
};

// ============================================
// 連続メッセージバッファ
// 同じ送信者からの連続メッセージを1分間バッファリングし、
// まとめて1つの返信案として処理する
// ============================================
const BUFFER_WAIT_MS = 60 * 1000; // 1分間待機
const messageBuffer = new Map(); // lineName → { messages: [], timer, firstAt }

/**
 * メッセージをバッファに追加
 * タイマーが完了したら結合して処理
 */
function bufferMessage(msg) {
  const key = msg.lineName;

  // 顧客メモリには即座に記録
  addConversation(msg.lineName, {
    direction: "incoming",
    messageType: msg.messageType,
    message: msg.message,
    utageUrl: msg.utageUrl,
  });

  if (messageBuffer.has(key)) {
    // 既存バッファに追加、タイマーリセット
    const buf = messageBuffer.get(key);
    buf.messages.push(msg);
    clearTimeout(buf.timer);
    buf.timer = setTimeout(() => flushBuffer(key), BUFFER_WAIT_MS);
    console.log(`[Pipeline] Buffered: ${key} (${buf.messages.length} messages, timer reset)`);
  } else {
    // 新規バッファ作成
    const buf = {
      messages: [msg],
      firstAt: Date.now(),
      timer: setTimeout(() => flushBuffer(key), BUFFER_WAIT_MS),
    };
    messageBuffer.set(key, buf);
    console.log(`[Pipeline] Buffered: ${key} (1st message, waiting ${BUFFER_WAIT_MS / 1000}s)`);
  }
}

/**
 * バッファをフラッシュ — 結合してスキル処理に回す
 */
async function flushBuffer(lineName) {
  const buf = messageBuffer.get(lineName);
  if (!buf) return;
  messageBuffer.delete(lineName);

  const messages = buf.messages;
  console.log(`[Pipeline] Flushing: ${lineName} (${messages.length} messages)`);

  // 複数メッセージを1つに結合
  const combined = {
    // 最後のメッセージをベースにする（最新のIDやURLを使用）
    ...messages[messages.length - 1],
    // メッセージ本文は改行で結合
    message: messages.map(m => m.message).join("\n"),
    // 元のメッセージID一覧を保持
    originalMessageIds: messages.map(m => m.id),
  };

  if (messages.length > 1) {
    console.log(`[Pipeline] Combined ${messages.length} messages from ${lineName}: "${combined.message.substring(0, 80)}..."`);
  }

  // トリガー型Skillに処理を委譲
  const triggerSkills = getSkillsByTrigger("utage-message");
  for (const { name, skill } of triggerSkills) {
    try {
      const result = await skill.handleTrigger("utage-message", { message: combined });
      if (result && !result.skipped) {
        // 全メッセージのステータスを更新
        for (const m of messages) {
          updateMessageStatus(m.id, "draft_generated");
        }
        stats.totalDrafts++;
        console.log(`[Pipeline] Skill "${name}" processed: ${lineName}`);
      }
    } catch (err) {
      console.error(`[Pipeline] Skill "${name}" error:`, err.message);
      for (const m of messages) {
        updateMessageStatus(m.id, "error");
      }
    }
  }

  if (triggerSkills.length === 0) {
    for (const m of messages) {
      updateMessageStatus(m.id, "notified");
    }
  }
}

// ============================================
// ポーリングサイクル
// ============================================

async function pollCycle() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    stats.totalPolls++;
    stats.lastPollAt = new Date().toISOString();

    const newMessages = await pollChatwork(
      config.chatwork.apiToken,
      config.chatwork.roomId
    );

    if (newMessages.length === 0) {
      isProcessing = false;
      return;
    }

    console.log(`[Pipeline] ${newMessages.length} new message(s) detected`);
    stats.totalMessages += newMessages.length;

    // メッセージをバッファに投入（即座に処理せず、同一送信者をまとめる）
    for (const msg of newMessages) {
      bufferMessage(msg);
    }

    stats.lastError = null;
  } catch (err) {
    console.error(`[Pipeline] Poll error:`, err.message);
    stats.lastError = { message: err.message, at: new Date().toISOString() };
  } finally {
    isProcessing = false;
  }
}

/**
 * パイプラインを開始
 */
export function startPipeline() {
  if (pollTimer) return;

  if (!config.chatwork.apiToken || !config.chatwork.roomId) {
    console.error("[Pipeline] Chatwork credentials not configured. Pipeline not started.");
    return;
  }

  console.log(`[Pipeline] Starting (interval: ${config.polling.intervalMs / 1000}s, buffer: ${BUFFER_WAIT_MS / 1000}s)`);
  stats.isRunning = true;

  setTimeout(() => pollCycle(), 3000);
  pollTimer = setInterval(pollCycle, config.polling.intervalMs);
}

/**
 * パイプラインを停止
 */
export function stopPipeline() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  // バッファ内の未処理メッセージも即座にフラッシュ
  for (const [key] of messageBuffer) {
    const buf = messageBuffer.get(key);
    if (buf?.timer) clearTimeout(buf.timer);
    flushBuffer(key);
  }
  stats.isRunning = false;
  console.log("[Pipeline] Stopped");
}

/**
 * パイプラインの統計を取得
 */
export function getPipelineStats() {
  return {
    ...stats,
    bufferedSenders: messageBuffer.size,
  };
}
