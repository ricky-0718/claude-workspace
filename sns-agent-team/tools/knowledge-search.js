import { createSdkMcpServer, tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ナレッジ格納庫のパス（プロジェクトの1つ上のディレクトリ）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = path.resolve(__dirname, '..', '..', 'ナレッジ格納庫');

/**
 * ディレクトリ内の .md, .txt ファイルを再帰的に取得する
 */
function getKnowledgeFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getKnowledgeFiles(fullPath));
    } else if (/\.(md|txt)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * ファイル内容からキーワードにマッチする箇所を探し、
 * 前後200文字のコンテキストとともに返す
 */
function searchInFile(filePath, query) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return [];
  }

  const matches = [];
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let startPos = 0;

  while (true) {
    const idx = lowerContent.indexOf(lowerQuery, startPos);
    if (idx === -1) break;

    const contextStart = Math.max(0, idx - 200);
    const contextEnd = Math.min(content.length, idx + query.length + 200);
    const snippet = content.slice(contextStart, contextEnd);

    matches.push({
      position: idx,
      snippet: (contextStart > 0 ? '...' : '') + snippet + (contextEnd < content.length ? '...' : ''),
    });

    // 同じ位置で無限ループしないよう、次の検索開始位置を進める
    startPos = idx + Math.max(1, query.length);
  }

  return matches;
}

/**
 * ナレッジ検索MCPサーバー
 */
export const knowledgeServer = createSdkMcpServer({
  name: 'knowledge-tools',
  version: '1.0.0',
  tools: [
    tool(
      'search_knowledge',
      'ナレッジ格納庫内の .md / .txt ファイルをキーワード検索し、マッチ箇所の前後200文字を返す',
      { query: z.string().describe('検索キーワード') },
      async ({ query }) => {
        const files = getKnowledgeFiles(KNOWLEDGE_DIR);
        if (files.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `ナレッジ格納庫が見つからないか、対象ファイルがありません。\nパス: ${KNOWLEDGE_DIR}`,
              },
            ],
          };
        }

        const results = [];
        for (const filePath of files) {
          const matches = searchInFile(filePath, query);
          if (matches.length > 0) {
            const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
            results.push({ file: relativePath, matches });
          }
        }

        if (results.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `「${query}」に一致するナレッジは見つかりませんでした。\n検索対象: ${files.length} ファイル`,
              },
            ],
          };
        }

        // 結果を整形
        let output = `「${query}」の検索結果: ${results.length} ファイルでヒット\n\n`;
        for (const result of results) {
          output += `--- ${result.file} (${result.matches.length}件) ---\n`;
          for (const match of result.matches) {
            output += `${match.snippet}\n\n`;
          }
        }

        return {
          content: [{ type: 'text', text: output }],
        };
      }
    ),

    tool(
      'list_knowledge_files',
      'ナレッジ格納庫内の全ファイル一覧を返す',
      {},
      async () => {
        const files = getKnowledgeFiles(KNOWLEDGE_DIR);
        if (files.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `ナレッジ格納庫が見つからないか、対象ファイルがありません。\nパス: ${KNOWLEDGE_DIR}`,
              },
            ],
          };
        }

        const relativeFiles = files.map((f) => path.relative(KNOWLEDGE_DIR, f));
        const output = `ナレッジ格納庫 ファイル一覧 (${relativeFiles.length}件):\n\n` + relativeFiles.map((f) => `- ${f}`).join('\n');

        return {
          content: [{ type: 'text', text: output }],
        };
      }
    ),
  ],
});
