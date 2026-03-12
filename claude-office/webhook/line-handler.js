// webhook/line-handler.js
import crypto from "crypto";
import { findSkillByCommand, listSkills } from "../skills/registry.js";
import { sendLinePush } from "../notifier.js";
import { getLatestPending, updateApproval } from "../approval/manager.js";
import config from "../config.js";

const APPROVE_KEYWORDS = ["OK", "ok", "承認", "はい", "送信して", "送って"];
const REJECT_KEYWORDS = ["却下", "やめて", "キャンセル", "いいえ", "ダメ"];

/**
 * LINE Webhook署名検証
 */
export function verifySignature(body, signature, channelSecret) {
  if (!channelSecret) return true; // Secret未設定時はスキップ（開発用）
  const hash = crypto
    .createHmac("SHA256", channelSecret)
    .update(body)
    .digest("base64");
  return hash === signature;
}

/**
 * LINE Webhook Reply API
 */
async function replyToLine(replyToken, text) {
  const trimmed = text.length > 5000 ? text.substring(0, 4997) + "..." : text;
  const res = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.line.channelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text: trimmed }],
    }),
  });
  return res.ok;
}

/**
 * ヘルプメッセージ生成
 */
function buildHelpMessage() {
  const skills = listSkills();
  const cmdList = skills
    .filter(s => s.commands.length > 0)
    .map(s => `・${s.commands[0]} — ${s.description}`)
    .join("\n");

  return `Spectre コマンド一覧\n─────────────\n${cmdList || "（コマンドなし）"}\n\n「ヘルプ」でこのメッセージを表示`;
}

/**
 * メイン: Webhookイベントを処理
 */
export async function handleWebhookEvents(events) {
  for (const event of events) {
    // テキストメッセージのみ処理
    if (event.type !== "message" || event.message.type !== "text") continue;

    // 自分（オーナー）からのメッセージのみ処理（セキュリティ）
    if (config.line.userId && event.source.userId !== config.line.userId) {
      console.log(`[Webhook] Ignored: unknown user ${event.source.userId}`);
      continue;
    }

    const text = event.message.text.trim();
    const replyToken = event.replyToken;

    console.log(`[Webhook] Command received: "${text}"`);

    // 承認応答チェック（pendingがある場合のみ）
    const pending = getLatestPending();
    if (pending) {
      const isApprove = APPROVE_KEYWORDS.some(k => text === k || text.startsWith(k));
      const isReject = REJECT_KEYWORDS.some(k => text === k || text.startsWith(k));

      if (isApprove) {
        updateApproval(pending.id, "approved");
        await replyToLine(replyToken, `承認しました: ${pending.description}`);
        continue;
      }

      if (isReject) {
        updateApproval(pending.id, "rejected");
        await replyToLine(replyToken, `却下しました: ${pending.description}`);
        continue;
      }
    }

    // ヘルプコマンド
    if (text === "ヘルプ" || text === "help") {
      await replyToLine(replyToken, buildHelpMessage());
      continue;
    }

    // Skillマッチング
    const match = findSkillByCommand(text);
    if (match && match.skill.handleCommand) {
      try {
        const result = await match.skill.handleCommand(text, {
          replyToken,
          userId: event.source.userId,
          source: "line",
        });

        if (result) {
          await replyToLine(replyToken, result);
        }
      } catch (err) {
        console.error(`[Webhook] Skill "${match.name}" error:`, err.message);
        await replyToLine(replyToken, `エラー: ${err.message}`);
      }
    } else {
      // マッチしない場合 → Claude CLI にフォールバック
      await replyToLine(replyToken, "処理中...");

      // Push で結果を送信（replyTokenは1回しか使えないため）
      try {
        const { runClaude } = await import("../claude-runner.js");
        const result = await runClaude(text, { maxTurns: 3, timeout: 120000 });
        const response = result.ok
          ? result.result
          : `エラー: ${result.error}`;
        await sendLinePush(config.line.channelToken, config.line.userId, response);
      } catch (err) {
        await sendLinePush(
          config.line.channelToken,
          config.line.userId,
          `Claude実行エラー: ${err.message}`
        );
      }
    }
  }
}
