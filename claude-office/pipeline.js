// ============================================
// メッセージ処理パイプライン
// Chatworkポーリング → パース → Claude返信案生成 → 通知
// ============================================
import config from "./config.js";
import { pollChatwork, updateMessageStatus } from "./chatwork-poller.js";
import { notifyNewMessage } from "./notifier.js";
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

/**
 * 1回のポーリングサイクル
 */
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

    for (const msg of newMessages) {
      console.log(`[Pipeline] Processing: ${msg.lineName} - "${msg.message.substring(0, 50)}..."`);

      // 1. 新着通知（LINE Messaging API）
      if (config.line.channelToken && config.line.userId) {
        await notifyNewMessage(config.line.channelToken, config.line.userId, msg);
      }

      // 2. 顧客メモリに受信メッセージを記録
      addConversation(msg.lineName, {
        direction: "incoming",
        messageType: msg.messageType,
        message: msg.message,
        utageUrl: msg.utageUrl,
      });

      // 3. トリガー型Skillに処理を委譲
      const triggerSkills = getSkillsByTrigger("utage-message");
      for (const { name, skill } of triggerSkills) {
        try {
          const result = await skill.handleTrigger("utage-message", { message: msg });
          if (result && !result.skipped) {
            updateMessageStatus(msg.id, "draft_generated");
            stats.totalDrafts++;
            console.log(`[Pipeline] Skill "${name}" processed: ${msg.lineName}`);
          }
        } catch (err) {
          console.error(`[Pipeline] Skill "${name}" error:`, err.message);
          updateMessageStatus(msg.id, "error");
        }
      }

      // トリガーSkillが1つもなければ通知のみ
      if (triggerSkills.length === 0) {
        updateMessageStatus(msg.id, "notified");
      }
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

  console.log(`[Pipeline] Starting (interval: ${config.polling.intervalMs / 1000}s)`);
  stats.isRunning = true;

  // 初回は少し遅らせて実行（サーバー起動完了を待つ）
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
  stats.isRunning = false;
  console.log("[Pipeline] Stopped");
}

/**
 * パイプラインの統計を取得
 */
export function getPipelineStats() {
  return { ...stats };
}
