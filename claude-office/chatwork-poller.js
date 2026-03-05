// ============================================
// Chatwork Poller
// LINE通知ルームを定期ポーリングし、新着メッセージを検知
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESSAGES_DIR = path.join(__dirname, "data", "messages");
const STATE_FILE = path.join(__dirname, "data", "chatwork-state.json");

if (!fs.existsSync(MESSAGES_DIR)) fs.mkdirSync(MESSAGES_DIR, { recursive: true });

/**
 * Chatworkメッセージのフォーマットをパース
 * UTAGEからの通知形式:
 *   アカウント公式アカウント「...」にてLINEメッセージを受信しました。
 *   LINE登録名：{名前}
 *   種類：{テキスト}
 *   メッセージ：
 *   {本文}
 *   LINEチャット(1to1トーク)：
 *   {URL}
 */
export function parseUtageNotification(body) {
  if (!body || !body.includes("LINEメッセージを受信しました")) return null;

  const nameMatch = body.match(/LINE登録名[：:]\s*(.+)/);
  const typeMatch = body.match(/種類[：:]\s*(.+)/);
  const urlMatch = body.match(/(https:\/\/utage-system\.com\/account\/[^\s]+)/);

  // メッセージ本文の抽出: 「メッセージ：」の後から「LINEチャット」の前まで
  let message = "";
  const msgStart = body.indexOf("メッセージ：");
  const chatLinkStart = body.indexOf("LINEチャット(");
  if (msgStart !== -1 && chatLinkStart !== -1) {
    message = body
      .substring(msgStart + "メッセージ：".length, chatLinkStart)
      .trim();
  }

  // アカウント名の抽出
  const accountMatch = body.match(/アカウント公式アカウント「(.+?)」/);

  return {
    lineName: nameMatch ? nameMatch[1].trim() : "不明",
    messageType: typeMatch ? typeMatch[1].trim() : "不明",
    message,
    utageUrl: urlMatch ? urlMatch[1] : "",
    accountName: accountMatch ? accountMatch[1] : "",
  };
}

/**
 * ポーリング状態の読み書き
 */
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return { lastMessageId: null };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

/**
 * Chatwork APIからメッセージを取得
 */
async function fetchMessages(apiToken, roomId) {
  const url = `https://api.chatwork.com/v2/rooms/${roomId}/messages?force=1`;
  const res = await fetch(url, {
    headers: { "X-ChatWorkToken": apiToken },
  });

  if (res.status === 204) return []; // メッセージなし
  if (!res.ok) {
    throw new Error(`Chatwork API error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

/**
 * 新着メッセージを保存
 */
function saveMessage(parsed, chatworkMsg) {
  const id = `msg_${chatworkMsg.message_id}`;
  const data = {
    id,
    chatworkMessageId: chatworkMsg.message_id,
    ...parsed,
    rawBody: chatworkMsg.body,
    receivedAt: new Date(chatworkMsg.send_time * 1000).toISOString(),
    processedAt: new Date().toISOString(),
    status: "new", // new -> draft_generated -> notified
  };
  const filePath = path.join(MESSAGES_DIR, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

/**
 * 処理済みメッセージIDのセットを取得
 */
function getProcessedIds() {
  const ids = new Set();
  try {
    const files = fs.readdirSync(MESSAGES_DIR);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      try {
        const data = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, f), "utf-8"));
        if (data.chatworkMessageId) ids.add(String(data.chatworkMessageId));
      } catch {}
    }
  } catch {}
  return ids;
}

/**
 * メイン: Chatworkをポーリングし、新着UTAGE通知を返す
 * @returns {Promise<Array>} 新着のパース済みメッセージ配列
 */
export async function pollChatwork(apiToken, roomId) {
  const messages = await fetchMessages(apiToken, roomId);
  const processedIds = getProcessedIds();
  const newMessages = [];

  for (const msg of messages) {
    // 既に処理済みならスキップ
    if (processedIds.has(String(msg.message_id))) continue;

    // UTAGEのLINE通知メッセージかパース
    const parsed = parseUtageNotification(msg.body);
    if (!parsed) continue;

    const saved = saveMessage(parsed, msg);
    newMessages.push(saved);
  }

  // 最終ポーリング時刻を保存
  saveState({ lastPollAt: new Date().toISOString(), messageCount: messages.length });

  return newMessages;
}

/**
 * 保存済みメッセージ一覧を取得
 */
export function getMessages(limit = 50) {
  try {
    const files = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith(".json"));
    const messages = files.map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, f), "utf-8"));
      } catch {
        return null;
      }
    }).filter(Boolean);
    messages.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
    return messages.slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * メッセージのステータスを更新
 */
export function updateMessageStatus(messageId, status) {
  const filePath = path.join(MESSAGES_DIR, `${messageId}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    data.status = status;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return data;
  } catch {
    return null;
  }
}
