// skills/asana-report/index.js
import { runClaude } from "../../claude-runner.js";

export default {
  name: "asana-report",
  description: "Asanaの今日のタスクを確認して報告する",
  commands: ["タスク確認", "Asana", "asana"],
  triggers: [],

  async handleCommand(text, context) {
    const result = await runClaude(
      "Asanaの今日の期限のタスクと、直近の期限のタスクを確認し、優先度順に箇条書きで報告してください。",
      { maxTurns: 5, timeout: 120000, allowedTools: ["Bash", "Read"] }
    );
    return result.ok ? result.result : `Asana確認エラー: ${result.error}`;
  },
};
