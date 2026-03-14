// skills/utage-reply/index.js
import { generateDraft } from "../../draft-generator.js";
import { sendLinePush } from "../../notifier.js";
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

    if (draft.draft && config.line.channelToken && config.line.userId) {
      // スペクターの提案スタイルで返信案を通知
      const draftPreview = draft.draft.length > 500
        ? draft.draft.substring(0, 497) + "..."
        : draft.draft;

      await sendLinePush(
        config.line.channelToken,
        config.line.userId,
        `${message.lineName}さんからメッセージがございました。\n「${message.message.substring(0, 60)}」\n\nリッキーさんでしたら、こんな返信はいかがでしょう：\n\n${draftPreview}\n\nUTAGE: ${message.utageUrl}`
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

      // 確認メッセージ
      await sendLinePush(
        config.line.channelToken,
        config.line.userId,
        `「OK」→ 確定  「却下」→ 破棄\nさらに修正があればお申し付けください。`
      );
    }

    return draft;
  },
};
