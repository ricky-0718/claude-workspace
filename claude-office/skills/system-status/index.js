// skills/system-status/index.js
import { getPipelineStats } from "../../pipeline.js";
import { listSkills } from "../registry.js";
import os from "os";

export default {
  name: "system-status",
  description: "Spectreのシステム状態を報告",
  commands: ["ステータス", "状態", "status"],
  triggers: [],

  async handleCommand(text, context) {
    const stats = getPipelineStats();
    const skills = listSkills();
    const uptime = Math.floor(process.uptime() / 60);

    return [
      `Spectre Status`,
      `─────────────`,
      `稼働時間: ${uptime}分`,
      `メモリ: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
      `OS: ${os.platform()} ${os.release()}`,
      ``,
      `Pipeline`,
      `ポーリング: ${stats.totalPolls}回`,
      `処理メッセージ: ${stats.totalMessages}件`,
      `生成した返信案: ${stats.totalDrafts}件`,
      `稼働中: ${stats.isRunning ? "YES" : "NO"}`,
      ``,
      `Skills (${skills.length})`,
      ...skills.map(s => `・${s.name}: ${s.description}`),
    ].join("\n");
  },
};
