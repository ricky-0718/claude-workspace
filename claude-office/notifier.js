// ============================================
// LINE Notify 通知モジュール
// スマホにプッシュ通知を送る
// ============================================

/**
 * LINE Notifyで通知を送信
 * @param {string} token - LINE Notify トークン
 * @param {string} message - 通知メッセージ（最大1000文字）
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function sendLineNotify(token, message) {
  if (!token) {
    return { ok: false, error: "LINE_NOTIFY_TOKEN not set" };
  }

  // LINE Notifyの制限: 最大1000文字
  const trimmed = message.length > 1000
    ? message.substring(0, 997) + "..."
    : message;

  try {
    const res = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ message: trimmed }),
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
export async function notifyNewMessage(token, parsed) {
  const msg = `\n[LINE受信] ${parsed.lineName}\n${parsed.message}\n\nUTAGE: ${parsed.utageUrl}`;
  return sendLineNotify(token, msg);
}

/**
 * 返信案生成完了の通知を送る
 */
export async function notifyDraftReady(token, parsed, draft) {
  const preview = draft.length > 200 ? draft.substring(0, 197) + "..." : draft;
  const msg = `\n[返信案] ${parsed.lineName}\n---\n${preview}\n\nUTAGE: ${parsed.utageUrl}`;
  return sendLineNotify(token, msg);
}
