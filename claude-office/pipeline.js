// ============================================
// メッセージ処理パイプライン
// Chatworkポーリング → パース → Claude返信案生成 → 通知
// ============================================
import config from "./config.js";
import { pollChatwork, updateMessageStatus } from "./chatwork-poller.js";
import { generateDraft } from "./draft-generator.js";
import { notifyNewMessage, notifyDraftReady } from "./notifier.js";

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

      // 1. 新着通知（LINE Notify）
      if (config.lineNotify.token) {
        await notifyNewMessage(config.lineNotify.token, msg);
      }

      // 2. テキストメッセージの場合のみ返信案を生成
      if (msg.messageType === "テキスト" && msg.message.trim()) {
        try {
          console.log(`[Pipeline] Generating draft for ${msg.lineName}...`);
          const draft = await generateDraft(msg);

          if (draft.draft) {
            updateMessageStatus(msg.id, "draft_generated");
            stats.totalDrafts++;
            console.log(`[Pipeline] Draft generated (${draft.duration}ms)`);

            // 3. 返信案生成完了通知
            if (config.lineNotify.token) {
              await notifyDraftReady(config.lineNotify.token, msg, draft.draft);
            }
          } else {
            console.error(`[Pipeline] Draft generation failed: ${draft.error}`);
            updateMessageStatus(msg.id, "error");
          }
        } catch (err) {
          console.error(`[Pipeline] Error generating draft:`, err.message);
          updateMessageStatus(msg.id, "error");
        }
      } else {
        // テキスト以外（画像など）は通知のみ
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
