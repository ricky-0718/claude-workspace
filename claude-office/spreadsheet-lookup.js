// ============================================
// Spreadsheet Lookup — 面談DBからの情報照合
// UTAGEの予約フォームデータ（面談前に登録済み）を使って
// Circlebackの匿名データを補正する
// ============================================
import { execFileSync } from "child_process";

const SPREADSHEET_ID = "1prDgc-Uc3Tm_OEU3ErCs5CK864O87ZJUCtrB_YvK8_U";

/**
 * gws CLI でスプレッドシートを読み取る
 * @param {string} range - "A1:G120" 等
 * @returns {string[][]} 2次元配列
 */
function readSheet(range) {
  try {
    const result = execFileSync(
      "gws",
      ["sheets", "+read", "--spreadsheet", SPREADSHEET_ID, "--range", range],
      { encoding: "utf-8", timeout: 15000 }
    );
    const json = JSON.parse(result);
    return json.values || [];
  } catch (err) {
    console.error("[SpreadsheetLookup] gws read失敗:", err.message);
    return [];
  }
}

/**
 * 面談日から該当する予約エントリを検索
 * @param {string} dateStr - "2026/3/22" 形式の面談日
 * @returns {object|null} { name, lineName, furigana, grade, consultationType, content, scheduleTime }
 */
export function lookupByDate(dateStr) {
  // "2026/3/22" → "2026/03/22" にゼロ埋め
  const parts = dateStr.split("/");
  const month = parts[1].padStart(2, "0");
  const day = parts[2].padStart(2, "0");
  const searchDate = `${parts[0]}/${month}/${day}`;

  console.log(`[SpreadsheetLookup] 検索日: ${searchDate}`);

  // スプレッドシート全体を読み取り（最大200行）
  const rows = readSheet("A1:G200");
  if (rows.length < 2) return null;

  // ヘッダーをスキップ、日付でフィルタ
  // 参加日程の形式: "2026/03/22(日) 18:00〜18:30"
  const matches = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const schedule = row[0] || "";

    // "%event_schedule%" はUTAGEの未確定エントリなのでスキップ
    if (schedule.includes("%event_schedule%")) continue;

    // 日付部分を抽出して比較
    if (schedule.includes(searchDate)) {
      matches.push({
        schedule: schedule,
        lineName: row[1] || "",
        name: row[2] || "",
        furigana: row[3] || "",
        consultationType: row[4] || "",
        grade: row[5] || "",
        content: row[6] || "",
      });
    }
  }

  if (matches.length === 0) {
    console.log(`[SpreadsheetLookup] ${searchDate} の予約エントリなし`);
    return null;
  }

  if (matches.length === 1) {
    console.log(`[SpreadsheetLookup] 一致: ${matches[0].name} (LINE: ${matches[0].lineName})`);
    return matches[0];
  }

  // 同日に複数面談がある場合、最初のマッチを返す（将来的に時間帯で絞り込み可能）
  console.log(`[SpreadsheetLookup] ${matches.length}件の候補 → 最初のエントリを使用: ${matches[0].name}`);
  return matches[0];
}

/**
 * 名前でスプレッドシートを検索（フォールバック用）
 * @param {string} nameQuery - 名前の一部
 * @returns {object|null}
 */
export function lookupByName(nameQuery) {
  const rows = readSheet("A1:G200");
  if (rows.length < 2) return null;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const name = row[2] || "";
    const furigana = row[3] || "";
    if (name.includes(nameQuery) || furigana.includes(nameQuery)) {
      return {
        schedule: row[0] || "",
        lineName: row[1] || "",
        name,
        furigana,
        consultationType: row[4] || "",
        grade: row[5] || "",
        content: row[6] || "",
      };
    }
  }
  return null;
}
