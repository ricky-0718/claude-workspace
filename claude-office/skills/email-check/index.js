// skills/email-check/index.js
import { runClaude } from "../../claude-runner.js";

export default {
  name: "email-check",
  description: "未読メールを確認して要約を返す",
  commands: ["メール確認", "メールチェック", "email"],
  triggers: [],

  async handleCommand(text, context) {
    const result = await runClaude(
      "Gmailの未読メールを確認し、重要なものを5件まで要約してください。件名・送信者・簡単な内容を箇条書きで返してください。",
      { maxTurns: 5, timeout: 120000, allowedTools: ["Bash", "Read"] }
    );
    return result.ok ? result.result : `メール確認エラー: ${result.error}`;
  },
};
