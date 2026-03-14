// webhook/line-handler.js
import crypto from "crypto";
import { findSkillByCommand, listSkills } from "../skills/registry.js";
import { sendLinePush } from "../notifier.js";
import { getLatestPending, updateApproval } from "../approval/manager.js";
import { getActiveDraft, addFeedback, updateDraft, clearActiveDraft } from "../draft-state.js";
import { refineDraft } from "../draft-generator.js";
import config from "../config.js";

const APPROVE_KEYWORDS = ["OK", "ok", "承認", "はい", "送信して", "送って"];
const REJECT_KEYWORDS = ["却下", "やめて", "キャンセル", "いいえ", "ダメ"];

// スペクターの人格（LINE会話用）
const SPECTRE_CHAT_PROMPT = `あなたは「スペクター」。台湾留学エージェント「101センター」代表リッキーに長年仕える老練な秘書。
有能で経験豊か、温かみのある老紳士。一人称は「わたくし」。リッキーさんを「リッキーさん」と呼ぶ。
控えめだが的確な助言をし、時折ユーモアや格言を交える。
回答は簡潔に。LINEのメッセージなので長文は避ける。
「ね」を語尾に使わない。`;

/**
 * LINE Webhook署名検証
 */
export function verifySignature(body, signature, channelSecret) {
  if (!channelSecret) return true;
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

  return `スペクターでございます。\nご用命をお待ちしておりました。\n\n${cmdList || "（コマンドなし）"}\n\nその他のメッセージには会話でお答えいたします。`;
}

/**
 * Insight ブロック除去
 */
function stripInsight(text) {
  if (!text) return text;
  return text
    .replace(/`★ Insight[^`]*`[\s\S]*?`─+`\n*/g, "")
    .replace(/^---\n*/gm, "")
    .trim();
}

/**
 * メイン: Webhookイベントを処理
 */
export async function handleWebhookEvents(events) {
  for (const event of events) {
    if (event.type !== "message" || event.message.type !== "text") continue;

    if (config.line.userId && event.source.userId !== config.line.userId) {
      console.log(`[Webhook] Ignored: unknown user ${event.source.userId}`);
      continue;
    }

    const text = event.message.text.trim();
    const replyToken = event.replyToken;

    console.log(`[Webhook] Received: "${text}"`);

    // === 1. 承認応答チェック ===
    const pending = getLatestPending();
    if (pending) {
      const isApprove = APPROVE_KEYWORDS.some(k => text === k || text.startsWith(k));
      const isReject = REJECT_KEYWORDS.some(k => text === k || text.startsWith(k));

      if (isApprove) {
        updateApproval(pending.id, "approved");
        clearActiveDraft();
        await replyToLine(replyToken, `了解です（${pending.payload?.lineName || ""}）`);
        continue;
      }

      if (isReject) {
        updateApproval(pending.id, "rejected");
        clearActiveDraft();
        await replyToLine(replyToken, `破棄しました（${pending.payload?.lineName || ""}）`);
        continue;
      }
    }

    // === 2. 返信案のフィードバック（反復改善）===
    const activeDraft = getActiveDraft();
    if (activeDraft && !text.startsWith("ヘルプ") && !text.startsWith("help")) {
      // コマンドでもなく、承認/却下でもない → フィードバックとして処理
      const match = findSkillByCommand(text);
      if (!match) {
        await replyToLine(replyToken, "承知いたしました。改善いたします...");

        try {
          addFeedback(text);
          const result = await refineDraft(activeDraft, text);

          if (result.ok && result.draft) {
            updateDraft(result.draft);
            const msg = `改善いたしました。\n\nリッキーさんでしたら、こちらはいかがでしょう：\n\n${result.draft}\n\n「OK」→ 確定  「却下」→ 破棄\nさらに修正があればお申し付けください。`;
            await sendLinePush(config.line.channelToken, config.line.userId, msg);
          } else {
            await sendLinePush(
              config.line.channelToken,
              config.line.userId,
              `申し訳ございません。改善案の生成に失敗いたしました: ${result.error || "不明なエラー"}`
            );
          }
        } catch (err) {
          console.error(`[Webhook] Refinement error: ${err.message}`);
          await sendLinePush(
            config.line.channelToken,
            config.line.userId,
            `改善処理でエラーが発生いたしました: ${err.message}`
          );
        }
        continue;
      }
    }

    // === 3. ヘルプコマンド ===
    if (text === "ヘルプ" || text === "help") {
      await replyToLine(replyToken, buildHelpMessage());
      continue;
    }

    // === 4. Skillマッチング ===
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
        await replyToLine(replyToken, `エラーが発生いたしました: ${err.message}`);
      }
    } else {
      // === 5. スペクターとの自由会話 ===
      // まずPushが動作するか確認（診断用）
      const pushTest = await sendLinePush(
        config.line.channelToken,
        config.line.userId,
        `スペクターでございます。「${text}」とのご用命、承りました。ただいま考え中でございます...`
      );
      console.log(`[Webhook] Push test: ${JSON.stringify(pushTest)}`);

      try {
        const { runClaude } = await import("../claude-runner.js");
        const prompt = `${SPECTRE_CHAT_PROMPT}\n\nリッキーさんからのメッセージ:\n${text}\n\n簡潔に回答してください。`;
        console.log(`[Webhook] Starting Claude CLI (maxTurns=1, timeout=60s, allowedTools=[])`);
        const result = await runClaude(prompt, { maxTurns: 1, timeout: 60000, allowedTools: [] });
        console.log(`[Webhook] Claude CLI result: ok=${result.ok}, duration=${result.duration}ms, error=${result.error || 'none'}`);

        let response = result.ok
          ? result.result
          : `申し訳ございません。処理中にエラーが発生いたしました: ${result.error}`;

        response = stripInsight(response);
        if (!response) response = "申し訳ございません。応答を生成できませんでした。";

        const pushResult = await sendLinePush(config.line.channelToken, config.line.userId, response);
        if (!pushResult.ok) {
          console.error(`[Webhook] Push failed: ${pushResult.error}`);
        }
      } catch (err) {
        console.error(`[Webhook] Claude fallback error: ${err.message}`);
        await sendLinePush(
          config.line.channelToken,
          config.line.userId,
          `スペクターでございます。処理中にエラーが発生いたしました: ${err.message}`
        );
      }
    }
  }
}
