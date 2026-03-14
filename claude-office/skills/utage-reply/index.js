// skills/utage-reply/index.js
import { generateDraft } from "../../draft-generator.js";
import { notifyDraftReady, notify } from "../../notifier.js";
import { createApproval } from "../../approval/manager.js";
import { setActiveDraft } from "../../draft-state.js";
import config from "../../config.js";

export default {
  name: "utage-reply",
  description: "UTAGE LINE メッセージへの返信案を自動生成",
  commands: [],
  triggers: ["utage-message"],

  async handleTrigger(triggerType, data) {
    if (triggerType !== "utage-message") return null;
    const { message } = data;

    if (message.messageType !== "テキスト" || !message.message.trim()) {
      return { skipped: true, reason: "テキスト以外" };
    }

    const draft = await generateDraft(message);

    if (draft.draft) {
      // Chatwork に返信案を通知（通数無制限）
      await notifyDraftReady(
        config.line.channelToken,
        config.line.userId,
        message,
        draft.draft
      );

      // 承認リクエスト作成
      createApproval("draft_confirm", {
        draftId: draft.id,
        lineName: message.lineName,
        draft: draft.draft,
        utageUrl: message.utageUrl,
      }, `${message.lineName}への返信案`);

      // アクティブドラフトに設定（フィードバック受付可能にする）
      setActiveDraft({
        lineName: message.lineName,
        originalMessage: message.message,
        draft: draft.draft,
        utageUrl: message.utageUrl,
        messageId: message.id,
      });
    }

    return draft;
  },
};
