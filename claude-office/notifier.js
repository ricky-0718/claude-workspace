// ============================================
// 通知モジュール（Chatwork + LINE Push）
// メイン通知先: Chatwork（無制限）
// LINE Push: フォールバック用（月200通制限あり）
// ============================================
import config from "./config.js";

/**
 * Chatwork にメッセージを送信（メイン通知手段）
 */
export async function sendChatwork(message) {
  const roomId = config.spectre?.chatworkRoomId;
  const token = config.chatwork?.apiToken;

  if (!roomId || !token) {
    console.error("[Notifier] Chatwork room or token not configured");
    return { ok: false, error: "SPECTRE_CHATWORK_ROOM_ID or CHATWORK_API_TOKEN not set" };
  }

  try {
    const res = await fetch(`https://api.chatwork.com/v2/rooms/${roomId}/messages`, {
      method: "POST",
      headers: {
        "X-ChatWorkToken": token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ body: message, self_unread: "1" }).toString(),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${body}` };
    }

    const data = await res.json();
    return { ok: true, messageId: data.message_id };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * LINE Messaging API で Push Message を送信（フォールバック用）
 */
export async function sendLinePush(channelToken, userId, message) {
  if (!channelToken || !userId) {
    return { ok: false, error: "LINE_CHANNEL_TOKEN or LINE_USER_ID not set" };
  }

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
 * スペクターから通知を送る（Chatwork優先）
 */
export async function notify(message) {
  const result = await sendChatwork(message);
  if (!result.ok) {
    console.error(`[Notifier] Chatwork failed: ${result.error}, trying LINE Push`);
    return sendLinePush(config.line.channelToken, config.line.userId, message);
  }
  return result;
}

/**
 * 返信案生成完了の通知を送る
 */
export async function notifyDraftReady(channelToken, userId, parsed, draft) {
  const draftPreview = draft.length > 500
    ? draft.substring(0, 497) + "..."
    : draft;

  const msg = `${parsed.lineName}さんからメッセージがございました。\n「${parsed.message.substring(0, 60)}」\n\nリッキーさんでしたら、こんな返信はいかがでしょう：\n\n${draftPreview}\n\nUTAGE: ${parsed.utageUrl}\n\n「OK」→ 確定  「却下」→ 破棄\nさらに修正があればお申し付けください。`;

  return notify(msg);
}
