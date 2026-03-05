// ============================================
// LINE Messaging API 通知モジュール
// 公式アカウントからPush Messageでスマホに通知を送る
// （LINE Notifyは2025/3/31終了のためMessaging APIに移行）
// ============================================

/**
 * LINE Messaging API で Push Message を送信
 * @param {string} channelToken - Channel Access Token
 * @param {string} userId - 送信先ユーザーID
 * @param {string} message - 通知メッセージ（最大5000文字）
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function sendLinePush(channelToken, userId, message) {
  if (!channelToken || !userId) {
    return { ok: false, error: "LINE_CHANNEL_TOKEN or LINE_USER_ID not set" };
  }

  // Messaging APIの制限: テキストメッセージ最大5000文字
  const trimmed = message.length > 5000
    ? message.substring(0, 4997) + "..."
    : message;

  try {
    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${channelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: userId,
        messages: [{ type: "text", text: trimmed }],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${body}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * 新着メッセージの通知を送る
 */
export async function notifyNewMessage(channelToken, userId, parsed) {
  const msg = `[LINE受信] ${parsed.lineName}\n${parsed.message}\n\nUTAGE: ${parsed.utageUrl}`;
  return sendLinePush(channelToken, userId, msg);
}

/**
 * 返信案生成完了の通知を送る
 */
export async function notifyDraftReady(channelToken, userId, parsed, draft) {
  const preview = draft.length > 200 ? draft.substring(0, 197) + "..." : draft;
  const msg = `[返信案] ${parsed.lineName}\n---\n${preview}\n\nUTAGE: ${parsed.utageUrl}`;
  return sendLinePush(channelToken, userId, msg);
}
