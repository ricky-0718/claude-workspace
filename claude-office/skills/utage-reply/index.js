// skills/utage-reply/index.js
import { generateDraft } from "../../draft-generator.js";
import { notifyDraftReady, sendLinePush } from "../../notifier.js";
import { createApproval } from "../../approval/manager.js";
import config from "../../config.js";

export default {
  name: "utage-reply",
  description: "UTAGE LINE メッセージへの返信案を自動生成",
  commands: [],  // コマンドではなくトリガーで起動
  triggers: ["utage-message"],

  async handleTrigger(triggerType, data) {
    if (triggerType !== "utage-message") return null;
    const { message } = data;

    if (message.messageType !== "テキスト" || !message.message.trim()) {
      return { skipped: true, reason: "テキスト以外" };
    }

    const draft = await generateDraft(message);

    if (draft.draft && config.line.channelToken && config.line.userId) {
      // LINE に返信案を通知
      await notifyDraftReady(
        config.line.channelToken,
        config.line.userId,
        message,
        draft.draft
      );

      // 承認リクエストを作成
      createApproval("draft_send", {
        draftId: draft.id,
        lineName: message.lineName,
        draft: draft.draft,
        utageUrl: message.utageUrl,
      }, `${message.lineName}への返信案を送信`);

      // 承認待ちメッセージ
      await sendLinePush(
        config.line.channelToken,
        config.line.userId,
        `この返信案を送りますか？\n「OK」→ 送信  「却下」→ 中止`
      );
    }

    return draft;
  },
};
