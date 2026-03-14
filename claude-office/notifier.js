// ============================================
// 通知モジュール（Slack Webhook + LINE Push フォールバック）
// メイン通知先: Slack（無制限、カスタム名・アイコン対応）
// LINE Push: フォールバック用（月200通制限あり）
// ============================================
import config from "./config.js";

// App自体にカスタムアイコン設定済みのため、icon指定は不要
// Webhook送信時はApp設定のアイコンが自動使用される
const SPECTRE_NAME = "スペクター";

/**
 * Slack Webhook でメッセージを送信（メイン通知手段）
 */
export async function sendSlack(message) {
  const webhookUrl = config.spectre?.slackWebhookUrl;

  if (!webhookUrl) {
    console.error("[Notifier] Slack Webhook URL not configured");
    return { ok: false, error: "SPECTRE_SLACK_WEBHOOK_URL not set" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message,
        username: SPECTRE_NAME,
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
 * スペクターから通知を送る（Slack優先）
 */
export async function notify(message) {
  const result = await sendSlack(message);
  if (!result.ok) {
    console.error(`[Notifier] Slack failed: ${result.error}, trying LINE Push`);
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
