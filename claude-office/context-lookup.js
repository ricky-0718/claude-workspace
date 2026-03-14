// ============================================
// 顧客コンテキスト検索
// knowledge/students/ から面談分析・顧客カード・LINE下書きを取得
// ============================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, "..", "knowledge", "students");
const FILES = {
  analysis: path.join(KNOWLEDGE_DIR, "面談分析まとめ.md"),
  context: path.join(KNOWLEDGE_DIR, "顧客コンテキスト.md"),
  lineDrafts: path.join(KNOWLEDGE_DIR, "LINE下書きまとめ.md"),
};

/**
 * マークダウンファイルから顧客名に該当するセクションを抽出
 * h2 or h3 の見出しに名前が含まれるセクション〜次の同レベル見出しまで
 */
function extractSection(content, name) {
  if (!content || !name) return null;

  const lines = content.split("\n");
  let capturing = false;
  let capturedLines = [];
  let headingLevel = 0;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2];

      if (capturing) {
        // 同レベル以上の見出しが来たら終了
        if (level <= headingLevel) break;
      }

      // 名前がタイトルに含まれているか（部分一致、スペース無視）
      const normalizedTitle = title.replace(/\s+/g, "");
      const normalizedName = name.replace(/\s+/g, "");
      if (
        normalizedTitle.includes(normalizedName) ||
        normalizedName.includes(normalizedTitle.replace(/[（）()]/g, "").split("：")[0])
      ) {
        capturing = true;
        headingLevel = level;
      }
    }

    if (capturing) {
      capturedLines.push(line);
    }
  }

  const result = capturedLines.join("\n").trim();
  return result || null;
}

/**
 * LINE名 → 実名のマッピングを試みる
 * 顧客コンテキストからLINE名で検索し、実名を返す
 */
function resolveRealName(lineName) {
  try {
    const content = fs.readFileSync(FILES.context, "utf-8");
    // "### 名前（よみがな）" パターンの見出し一覧
    const headings = content.match(/^###\s+(.+)/gm) || [];

    for (const h of headings) {
      const name = h.replace(/^###\s+/, "").replace(/（.+?）/, "").trim();
      // LINE名に実名の一部が含まれているか
      if (lineName.includes(name) || name.includes(lineName)) {
        return name;
      }
    }
  } catch {}
  return null;
}

/**
 * 顧客の全コンテキストを収集
 * @param {string} lineName - LINE登録名
 * @returns {object} { analysis, customerCard, lineDrafts, realName }
 */
export function lookupCustomerContext(lineName) {
  const result = {
    realName: null,
    analysis: null,
    customerCard: null,
    lineDrafts: null,
  };

  if (!lineName) return result;

  // LINE名 → 実名解決
  const realName = resolveRealName(lineName);
  const searchNames = [lineName, realName].filter(Boolean);
  result.realName = realName;

  for (const name of searchNames) {
    // 面談分析
    if (!result.analysis) {
      try {
        const content = fs.readFileSync(FILES.analysis, "utf-8");
        result.analysis = extractSection(content, name);
      } catch {}
    }

    // 顧客カード
    if (!result.customerCard) {
      try {
        const content = fs.readFileSync(FILES.context, "utf-8");
        result.customerCard = extractSection(content, name);
      } catch {}
    }

    // LINE下書き
    if (!result.lineDrafts) {
      try {
        const content = fs.readFileSync(FILES.lineDrafts, "utf-8");
        result.lineDrafts = extractSection(content, name);
      } catch {}
    }
  }

  return result;
}

/**
 * コンテキストをプロンプト用テキストに整形
 */
export function formatContextForPrompt(ctx) {
  const blocks = [];

  if (ctx.customerCard) {
    blocks.push(`# 顧客カード\n${ctx.customerCard}`);
  }

  if (ctx.analysis) {
    // 面談分析は長いので要点のみ（文字起こし全文を除外）
    const trimmed = ctx.analysis.split("## 文字起こし全文")[0].trim();
    // 3000文字に制限
    const limited = trimmed.length > 3000 ? trimmed.substring(0, 3000) + "\n...（省略）" : trimmed;
    blocks.push(`# 面談分析\n${limited}`);
  }

  if (ctx.lineDrafts) {
    // LINE下書きは直近のフォロー予定のみ
    const limited = ctx.lineDrafts.length > 1500 ? ctx.lineDrafts.substring(0, 1500) + "\n...（省略）" : ctx.lineDrafts;
    blocks.push(`# 面談後LINE下書き（参考）\n${limited}`);
  }

  return blocks.join("\n\n---\n\n");
}
