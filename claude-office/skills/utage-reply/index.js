// skills/utage-reply/index.js
import { generateDraft } from "../../draft-generator.js";
import { notifyDraftReady } from "../../notifier.js";
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
      await notifyDraftReady(
        config.line.channelToken,
        config.line.userId,
        message,
        draft.draft
      );
    }

    return draft;
  },
};
