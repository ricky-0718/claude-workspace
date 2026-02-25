# SNSエージェントチーム 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 複数AIエージェントが連携してSNSコンテンツ（Instagram/X/YouTube/NOTE）の企画・原稿を自動生成するWebダッシュボードを構築する

**Architecture:** Node.js + Express + Agent SDK でエージェントチームを構築。ナレッジ格納庫検索とGPTsブラウザ連携をカスタムMCPツールとして実装。SQLiteで結果を保存し、SSEでリアルタイム進捗をダッシュボードに配信。

**Tech Stack:** Node.js, Express, @anthropic-ai/claude-agent-sdk, better-sqlite3, Tailwind CSS, Zod

**参照ドキュメント:** `docs/plans/2026-02-26-sns-agent-team-design.md`

**Node.jsパス:** `"C:/Program Files/nodejs/node.exe"` （PATHに入っていないためフルパス必須）

---

## Task 1: プロジェクト初期化 & パッケージインストール

**Files:**
- Create: `sns-agent-team/package.json`
- Create: `sns-agent-team/.gitignore`

**Step 1: ディレクトリ作成とnpm init**

```bash
mkdir -p sns-agent-team
cd sns-agent-team
"C:/Program Files/nodejs/node.exe" -e "
const pkg = {
  name: 'sns-agent-team',
  version: '1.0.0',
  description: 'SNSコンテンツ企画エージェントチーム',
  main: 'server.js',
  type: 'module',
  scripts: {
    start: 'node server.js',
    dev: 'node --watch server.js'
  }
};
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"
```

**Step 2: 依存パッケージをインストール**

```bash
cd sns-agent-team
"C:/Program Files/nodejs/node.exe" "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" install express better-sqlite3 uuid zod @anthropic-ai/claude-agent-sdk
```

注意: `@anthropic-ai/claude-agent-sdk`が npmにない場合は、CLIパス `%APPDATA%/Claude/claude-code/` から直接importする方式に切り替える。

**Step 3: .gitignore 作成**

```
node_modules/
data/*.db
config/gpts-urls.json
```

**Step 4: コミット**

```bash
git add sns-agent-team/package.json sns-agent-team/package-lock.json sns-agent-team/.gitignore
git commit -m "feat: SNSエージェントチーム プロジェクト初期化"
```

---

## Task 2: SQLiteデータベース層

**Files:**
- Create: `sns-agent-team/db/schema.sql`
- Create: `sns-agent-team/db/database.js`

**Step 1: スキーマ定義ファイルを作成**

```sql
-- db/schema.sql
CREATE TABLE IF NOT EXISTS generations (
  id TEXT PRIMARY KEY,
  theme TEXT NOT NULL,
  target_audience TEXT,
  platforms TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  trend_report TEXT,
  knowledge_report TEXT,
  content_plan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);

CREATE TABLE IF NOT EXISTS outputs (
  id TEXT PRIMARY KEY,
  generation_id TEXT NOT NULL,
  generation_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (generation_id) REFERENCES generations(id)
);

CREATE TABLE IF NOT EXISTS gpts_config (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  gpts_url TEXT NOT NULL,
  gpts_name TEXT
);
```

**Step 2: database.jsを実装**

```javascript
// db/database.js
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

export function initDB() {
  const dbPath = join(__dirname, '..', 'data', 'sns-agent.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);
  return db;
}

export function createGeneration({ theme, targetAudience, platforms }) {
  const id = uuidv4();
  db.prepare(`
    INSERT INTO generations (id, theme, target_audience, platforms, status)
    VALUES (?, ?, ?, ?, 'pending')
  `).run(id, theme, targetAudience, platforms);
  return id;
}

export function updateGenerationStatus(id, status, data = {}) {
  const sets = ['status = ?'];
  const values = [status];
  for (const [key, value] of Object.entries(data)) {
    sets.push(`${key} = ?`);
    values.push(value);
  }
  if (status === 'completed') {
    sets.push('completed_at = CURRENT_TIMESTAMP');
  }
  values.push(id);
  db.prepare(`UPDATE generations SET ${sets.join(', ')} WHERE id = ?`).run(...values);
}

export function saveOutput({ generationId, platform, content }) {
  const id = uuidv4();
  db.prepare(`
    INSERT INTO outputs (id, generation_id, platform, content)
    VALUES (?, ?, ?, ?)
  `).run(id, generationId, platform, JSON.stringify(content));
  return id;
}

export function getGeneration(id) {
  return db.prepare('SELECT * FROM generations WHERE id = ?').get(id);
}

export function listGenerations(limit = 20) {
  return db.prepare('SELECT * FROM generations ORDER BY created_at DESC LIMIT ?').all(limit);
}

export function getOutputs(generationId) {
  return db.prepare('SELECT * FROM outputs WHERE generation_id = ?').all(generationId);
}
```

**Step 3: dataディレクトリ作成とテスト**

```bash
mkdir -p sns-agent-team/data
cd sns-agent-team
"C:/Program Files/nodejs/node.exe" -e "
import { initDB, createGeneration, getGeneration } from './db/database.js';
initDB();
const id = createGeneration({ theme: 'テスト', targetAudience: 'テスト', platforms: 'instagram' });
console.log('Created:', id);
console.log('Get:', getGeneration(id));
"
```

Expected: generationが作成・取得できる

**Step 4: コミット**

```bash
git add sns-agent-team/db/
git commit -m "feat: SQLiteデータベース層を実装"
```

---

## Task 3: ナレッジ検索MCPツール

**Files:**
- Create: `sns-agent-team/tools/knowledge-search.js`

**Step 1: knowledge-search.js を実装**

ナレッジ格納庫（`ナレッジ格納庫/`）内のファイルを検索してマッチする内容を返すMCPツール。

```javascript
// tools/knowledge-search.js
import { createSdkMcpServer, tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const KNOWLEDGE_DIR = join(process.cwd(), '..', 'ナレッジ格納庫');

function findFiles(dir, extensions = ['.md', '.txt']) {
  const results = [];
  try {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        results.push(...findFiles(fullPath, extensions));
      } else if (extensions.includes(extname(entry).toLowerCase())) {
        results.push(fullPath);
      }
    }
  } catch (e) { /* skip inaccessible */ }
  return results;
}

function searchInFiles(query) {
  const files = findFiles(KNOWLEDGE_DIR);
  const results = [];
  const queryLower = query.toLowerCase();

  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, 'utf-8');
      if (content.toLowerCase().includes(queryLower)) {
        // マッチした周辺の文脈を抽出（前後200文字）
        const idx = content.toLowerCase().indexOf(queryLower);
        const start = Math.max(0, idx - 200);
        const end = Math.min(content.length, idx + query.length + 200);
        results.push({
          file: filePath.replace(KNOWLEDGE_DIR, ''),
          excerpt: content.slice(start, end).trim()
        });
      }
    } catch (e) { /* skip unreadable */ }
  }
  return results;
}

export const knowledgeServer = createSdkMcpServer({
  name: 'knowledge-tools',
  version: '1.0.0',
  tools: [
    tool(
      'search_knowledge',
      'ナレッジ格納庫からキーワードに関連する知識を検索する。営業スクリプト、面談分析、フォロー手法などの社内ナレッジを取得できる。',
      {
        query: z.string().describe('検索キーワード（例: 台湾留学、面談、成約率）'),
      },
      async ({ query }) => {
        const results = searchInFiles(query);
        if (results.length === 0) {
          return { content: [{ type: 'text', text: `「${query}」に関するナレッジは見つかりませんでした。` }] };
        }
        const text = results.map(r =>
          `## ${r.file}\n${r.excerpt}`
        ).join('\n\n---\n\n');
        return { content: [{ type: 'text', text }] };
      }
    ),
    tool(
      'list_knowledge_files',
      'ナレッジ格納庫にあるファイルの一覧を取得する',
      {},
      async () => {
        const files = findFiles(KNOWLEDGE_DIR);
        const list = files.map(f => f.replace(KNOWLEDGE_DIR, '')).join('\n');
        return { content: [{ type: 'text', text: list || 'ファイルが見つかりません' }] };
      }
    )
  ]
});
```

**Step 2: テスト**

```bash
cd sns-agent-team
"C:/Program Files/nodejs/node.exe" -e "
import { knowledgeServer } from './tools/knowledge-search.js';
console.log('Server created:', knowledgeServer ? 'OK' : 'FAIL');
"
```

Expected: `Server created: OK`

**Step 3: コミット**

```bash
git add sns-agent-team/tools/knowledge-search.js
git commit -m "feat: ナレッジ格納庫検索MCPツールを実装"
```

---

## Task 4: GPTsブリッジMCPツール

**Files:**
- Create: `sns-agent-team/tools/gpts-writer.js`
- Create: `sns-agent-team/config/gpts-urls.example.json`

**Step 1: GPTs URL設定のテンプレートを作成**

```json
{
  "instagram": {
    "url": "https://chat.openai.com/g/XXXXXXXXX",
    "name": "Instagram ライター"
  },
  "x": {
    "url": "https://chat.openai.com/g/XXXXXXXXX",
    "name": "X ライター"
  },
  "youtube": {
    "url": "https://chat.openai.com/g/XXXXXXXXX",
    "name": "YouTube ライター"
  },
  "note": {
    "url": "https://chat.openai.com/g/XXXXXXXXX",
    "name": "NOTE ライター"
  }
}
```

**Step 2: gpts-writer.js を実装**

GPTsへのブラウザ自動操作はEdge MCP経由で行う。ここではツールの外枠を定義し、実際のブラウザ操作は `tabs_context_mcp` → `navigate` → `find` → `form_input` → `get_page_text` のフローで行う。

ただし Agent SDK のツール内からブラウザMCPを直接呼ぶことはできないため、**代替案としてOpenAI APIを直接呼ぶ方式**と**プロンプトで手動実行を指示する方式**のどちらかを採用する。

```javascript
// tools/gpts-writer.js
import { createSdkMcpServer, tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(__dirname, '..', 'config', 'gpts-urls.json');

function loadConfig() {
  if (!existsSync(CONFIG_PATH)) {
    return null;
  }
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
}

export const gptsServer = createSdkMcpServer({
  name: 'gpts-tools',
  version: '1.0.0',
  tools: [
    tool(
      'write_with_gpts',
      'カスタムGPTsを使ってSNS向け原稿を作成する。企画内容を渡すと、指定プラットフォーム向けの原稿が返される。GPTsが未設定の場合はClaude自身がライティングを行う。',
      {
        platform: z.enum(['instagram', 'x', 'youtube', 'note']).describe('対象SNSプラットフォーム'),
        content_plan: z.string().describe('企画内容（コンテンツプランナーが作成した企画書）'),
        theme: z.string().describe('テーマ'),
        target_audience: z.string().describe('ターゲット層'),
      },
      async ({ platform, content_plan, theme, target_audience }) => {
        const config = loadConfig();

        // GPTs設定がない場合、Claude自身が書くためのプロンプトを返す
        if (!config || !config[platform]) {
          return {
            content: [{
              type: 'text',
              text: `[GPTs未設定: ${platform}] Claude自身でライティングを実行してください。\n\n企画内容:\n${content_plan}\n\nテーマ: ${theme}\nターゲット: ${target_audience}\n\nプラットフォーム「${platform}」向けに最適化された原稿を作成してください。`
            }]
          };
        }

        // GPTs設定がある場合、ブラウザ操作の指示を返す
        // （実際のブラウザ操作はオーケストレーターが実行する）
        const gpts = config[platform];
        return {
          content: [{
            type: 'text',
            text: `[GPTs連携: ${gpts.name}]\nURL: ${gpts.url}\n\n以下の内容をGPTsに送信してください:\n---\n${content_plan}\n\nテーマ: ${theme}\nターゲット: ${target_audience}\n---\n\n注: ブラウザでChatGPTを開き、上記URLのGPTsにテキストを送信して結果を取得してください。`
          }]
        };
      }
    )
  ]
});
```

**Step 3: コミット**

```bash
git add sns-agent-team/tools/gpts-writer.js sns-agent-team/config/gpts-urls.example.json
git commit -m "feat: GPTsブリッジMCPツールを実装"
```

---

## Task 5: エージェント定義

**Files:**
- Create: `sns-agent-team/agents/orchestrator.js`

**Step 1: 全エージェントの定義を1ファイルにまとめる**

Agent SDKでは、メインの`query()`呼び出し時に`agents`オプションでサブエージェントを定義する。

```javascript
// agents/orchestrator.js
export const AGENTS = {
  'trend-researcher': {
    description: 'SNSトレンドリサーチャー。Web検索で最新のSNSトレンド、バズっている話題、競合の動向を調査する。',
    prompt: `あなたはSNSトレンドリサーチャーです。
指定されたテーマとSNSプラットフォームについて、以下を調査してください:
1. 直近1週間のトレンドキーワードと話題
2. 競合や類似アカウントの人気投稿の傾向
3. ハッシュタグのトレンド（Instagram/Xの場合）
4. バズりやすいフォーマットや切り口

結果は箇条書きで整理し、各項目にソースがあれば付記してください。`,
    tools: ['WebSearch', 'WebFetch']
  },

  'knowledge-analyst': {
    description: 'ナレッジアナリスト。社内ナレッジ格納庫から関連する知識、事例、データを抽出する。',
    prompt: `あなたはナレッジアナリストです。
ナレッジ格納庫を検索して、指定テーマに関連する以下の情報を抽出してください:
1. テーマに直接関連する知識やノウハウ
2. 営業トークやスクリプトで使えるフレーズ
3. 数値データや成果事例
4. ターゲット層の課題や関心事

各項目に引用元ファイル名を付記してください。`,
    tools: ['mcp__knowledge-tools__search_knowledge', 'mcp__knowledge-tools__list_knowledge_files']
  },

  'content-planner': {
    description: 'コンテンツプランナー。トレンドとナレッジを組み合わせて各SNS向けのコンテンツ企画を立案する。',
    prompt: `あなたはSNSコンテンツプランナーです。
トレンドレポートとナレッジリストを受け取り、各SNS向けのコンテンツ企画を立案してください。

各プラットフォーム向けに以下を含めてください:
- コンセプト（1行）
- 切り口・角度
- キーメッセージ
- 構成案（投稿の流れ）
- 想定されるエンゲージメント要因

プラットフォームごとの特性を活かした企画にしてください:
- Instagram: ビジュアル重視、ストーリー性
- X: 短文インパクト、スレッド展開
- YouTube: 構成力、サムネイル訴求
- NOTE: 深い記事、SEO意識`,
    tools: []
  },

  'sns-writer': {
    description: 'SNSライター。企画書をもとにカスタムGPTsまたはClaude自身でSNS向け原稿を作成する。',
    prompt: `あなたはSNSライターです。
コンテンツ企画書を受け取り、write_with_gptsツールを使って各SNS向けの原稿を作成してください。
対象プラットフォームそれぞれに対してツールを呼び出してください。

GPTsが未設定の場合は、Claude自身が以下のフォーマットで原稿を作成してください:

Instagram: キャプション + ハッシュタグ30個 + 画像のイメージ説明
X: メインツイート + スレッド展開(3-5ツイート)
YouTube: タイトル + 概要欄 + 台本骨子(導入/本題/まとめ)
NOTE: 記事タイトル + 見出し構成 + 本文ドラフト(1500字程度)`,
    tools: ['mcp__gpts-tools__write_with_gpts']
  }
};

export function buildOrchestratorPrompt(theme, targetAudience, platforms) {
  return `あなたはSNSコンテンツディレクターです。
以下の企画依頼に基づいて、エージェントチームを指揮してコンテンツを企画・作成してください。

## 企画依頼
- テーマ: ${theme}
- ターゲット: ${targetAudience}
- 対象SNS: ${platforms}

## 作業手順
1. まずtrend-researcherとknowledge-analystに同時にタスクを振って、トレンドとナレッジを収集してください
2. 収集結果をcontent-plannerに渡して、各SNS向けの企画を立案してください
3. 企画書をsns-writerに渡して、各SNS向けの原稿を作成してください

## 出力フォーマット
最終的に、各SNS向けの成果物をJSON形式で整理して返してください:
{
  "trend_report": "トレンドレポート全文",
  "knowledge_report": "ナレッジリスト全文",
  "content_plan": "企画書全文",
  "outputs": {
    "instagram": "Instagram向け原稿",
    "x": "X向け原稿",
    "youtube": "YouTube向け原稿",
    "note": "NOTE向け原稿"
  }
}`;
}
```

**Step 2: コミット**

```bash
git add sns-agent-team/agents/orchestrator.js
git commit -m "feat: エージェント定義（ディレクター/リサーチャー/アナリスト/プランナー/ライター）"
```

---

## Task 6: Expressサーバー + SSE

**Files:**
- Create: `sns-agent-team/server.js`

**Step 1: server.js を実装**

```javascript
// server.js
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';
import { query } from '@anthropic-ai/claude-agent-sdk';
import { initDB, createGeneration, updateGenerationStatus, saveOutput, getGeneration, listGenerations, getOutputs } from './db/database.js';
import { knowledgeServer } from './tools/knowledge-search.js';
import { gptsServer } from './tools/gpts-writer.js';
import { AGENTS, buildOrchestratorPrompt } from './agents/orchestrator.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3847;

// dataディレクトリ確保
mkdirSync(join(__dirname, 'data'), { recursive: true });

// DB初期化
initDB();

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// 進捗通知用のSSEクライアント管理
const sseClients = new Map(); // generationId -> Set<Response>

// --- API ---

// 企画依頼を受け付け
app.post('/api/generate', async (req, res) => {
  const { theme, targetAudience, platforms } = req.body;
  if (!theme || !platforms) {
    return res.status(400).json({ error: 'theme と platforms は必須です' });
  }
  const id = createGeneration({ theme, targetAudience, platforms });
  // 非同期でエージェント実行開始
  runAgentTeam(id, theme, targetAudience, platforms);
  res.json({ id, status: 'started' });
});

// SSEで進捗配信
app.get('/api/generate/:id/stream', (req, res) => {
  const { id } = req.params;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  if (!sseClients.has(id)) sseClients.set(id, new Set());
  sseClients.get(id).add(res);

  // 現在の状態を即座に送信
  const gen = getGeneration(id);
  if (gen) {
    res.write(`data: ${JSON.stringify({ type: 'status', status: gen.status })}\n\n`);
  }

  req.on('close', () => {
    sseClients.get(id)?.delete(res);
  });
});

// 結果一覧
app.get('/api/results', (req, res) => {
  res.json(listGenerations());
});

// 結果詳細
app.get('/api/results/:id', (req, res) => {
  const gen = getGeneration(req.params.id);
  if (!gen) return res.status(404).json({ error: 'not found' });
  const outputs = getOutputs(req.params.id);
  res.json({ ...gen, outputs });
});

// --- SSE送信ヘルパー ---
function sendSSE(generationId, data) {
  const clients = sseClients.get(generationId);
  if (!clients) return;
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of clients) {
    client.write(msg);
  }
}

// --- エージェントチーム実行 ---
async function runAgentTeam(generationId, theme, targetAudience, platforms) {
  try {
    updateGenerationStatus(generationId, 'running');
    sendSSE(generationId, { type: 'status', status: 'running', message: 'エージェントチーム起動中...' });

    const prompt = buildOrchestratorPrompt(theme, targetAudience, platforms);

    let lastText = '';

    for await (const message of query({
      prompt,
      options: {
        allowedTools: ['Task', 'WebSearch', 'WebFetch',
          'mcp__knowledge-tools__search_knowledge',
          'mcp__knowledge-tools__list_knowledge_files',
          'mcp__gpts-tools__write_with_gpts'
        ],
        agents: AGENTS,
        mcpServers: {
          'knowledge-tools': knowledgeServer,
          'gpts-tools': gptsServer
        },
        permissionMode: 'bypassPermissions'
      }
    })) {
      // ストリームイベントの進捗をSSEに転送
      if (message.type === 'assistant') {
        const textBlocks = message.message?.content?.filter(b => b.type === 'text') || [];
        for (const block of textBlocks) {
          lastText = block.text;
          sendSSE(generationId, { type: 'progress', text: block.text.slice(0, 200) });
        }

        // ツール呼び出しを検知して進捗表示
        const toolBlocks = message.message?.content?.filter(b => b.type === 'tool_use') || [];
        for (const block of toolBlocks) {
          sendSSE(generationId, {
            type: 'agent_action',
            tool: block.name,
            input: typeof block.input === 'object' ? JSON.stringify(block.input).slice(0, 100) : ''
          });
        }
      }

      if (message.type === 'result' && message.subtype === 'success') {
        // 最終結果をパース・保存
        const resultText = message.result || lastText;
        try {
          // JSON部分を抽出
          const jsonMatch = resultText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0]);

            updateGenerationStatus(generationId, 'completed', {
              trend_report: result.trend_report || '',
              knowledge_report: result.knowledge_report || '',
              content_plan: result.content_plan || ''
            });

            if (result.outputs) {
              for (const [platform, content] of Object.entries(result.outputs)) {
                saveOutput({ generationId, platform, content });
              }
            }
          } else {
            updateGenerationStatus(generationId, 'completed', { content_plan: resultText });
          }
        } catch (e) {
          updateGenerationStatus(generationId, 'completed', { content_plan: resultText });
        }

        sendSSE(generationId, { type: 'status', status: 'completed' });
        sendSSE(generationId, { type: 'done' });
      }
    }
  } catch (error) {
    console.error('Agent team error:', error);
    updateGenerationStatus(generationId, 'failed');
    sendSSE(generationId, { type: 'status', status: 'failed', error: error.message });
    sendSSE(generationId, { type: 'done' });
  }
}

app.listen(PORT, () => {
  console.log(`SNS Agent Team Dashboard: http://localhost:${PORT}`);
});
```

**Step 2: 起動テスト**

```bash
cd sns-agent-team
"C:/Program Files/nodejs/node.exe" server.js
```

Expected: `SNS Agent Team Dashboard: http://localhost:3847`

**Step 3: コミット**

```bash
git add sns-agent-team/server.js
git commit -m "feat: Expressサーバー + SSE + Agent SDK統合"
```

---

## Task 7: Webダッシュボード（フロントエンド）

**Files:**
- Create: `sns-agent-team/public/index.html`
- Create: `sns-agent-team/public/app.js`

**Step 1: index.html を作成**

Tailwind CSS CDN使用。3セクション構成：企画依頼フォーム / 進捗モニター / 成果物一覧。

実装内容:
- 企画依頼フォーム（テーマ、ターゲット、SNSチェックボックス、送信ボタン）
- 進捗モニターエリア（SSEメッセージをリアルタイム表示）
- 成果物一覧（過去の結果をカード表示、SNSタブ切り替え、コピーボタン）

**Step 2: app.js を作成**

- `POST /api/generate` でフォーム送信
- `EventSource` で `/api/generate/:id/stream` に接続して進捗受信
- `GET /api/results` で過去の結果を読み込み
- 各成果物にコピーボタン機能

**Step 3: ブラウザで動作確認**

http://localhost:3847 にアクセスし:
- フォームが表示される
- テーマ入力 → 送信 → 進捗がリアルタイム表示される
- 完了後に成果物がカード表示される

**Step 4: コミット**

```bash
git add sns-agent-team/public/
git commit -m "feat: Webダッシュボード（企画依頼/進捗/成果物）"
```

---

## Task 8: GPTs設定UI & 統合テスト

**Files:**
- Modify: `sns-agent-team/public/index.html` — 設定画面を追加
- Modify: `sns-agent-team/server.js` — GPTs設定APIを追加

**Step 1: GPTs設定API追加**

```javascript
// server.js に追加
app.get('/api/config/gpts', (req, res) => { /* gpts-urls.json を返す */ });
app.post('/api/config/gpts', (req, res) => { /* gpts-urls.json を保存 */ });
```

**Step 2: 設定画面を追加**

ダッシュボードに「設定」タブを追加。各SNSのGPTs URLを入力・保存できるフォーム。

**Step 3: E2Eテスト**

1. ダッシュボードを開く
2. 設定画面でGPTs URLを入力（テスト用に空でもOK）
3. 企画依頼フォームでテーマ入力、全SNS選択、送信
4. 進捗がリアルタイムで表示される
5. 完了後に4つのSNS原稿が表示される

**Step 4: コミット**

```bash
git add sns-agent-team/
git commit -m "feat: GPTs設定UI + 統合テスト完了"
```

---

## 実行順序まとめ

| Task | 内容 | 依存 |
|------|------|------|
| 1 | プロジェクト初期化 | なし |
| 2 | SQLiteデータベース層 | Task 1 |
| 3 | ナレッジ検索MCPツール | Task 1 |
| 4 | GPTsブリッジMCPツール | Task 1 |
| 5 | エージェント定義 | Task 1 |
| 6 | Expressサーバー + SSE | Task 2, 3, 4, 5 |
| 7 | Webダッシュボード | Task 6 |
| 8 | GPTs設定UI + 統合テスト | Task 7 |

Task 2, 3, 4, 5 は並列実行可能。
