/**
 * server.js
 *
 * SNSコンテンツ企画エージェントチーム - Expressサーバー
 * Agent SDK + SSE によるリアルタイム進捗配信
 */

// Agent SDK の子プロセスが「入れ子セッション」と誤検知しないよう環境変数を削除
// (Claude Code セッション内からサーバーを起動するケースへの対策)
delete process.env.CLAUDECODE;
delete process.env.CLAUDE_CODE_ENTRYPOINT;

import express from 'express';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// DB層
import {
  initDB,
  createGeneration,
  updateGenerationStatus,
  saveOutput,
  getGeneration,
  listGenerations,
  getOutputs,
} from './db/database.js';

// MCPツール
import { knowledgeServer } from './tools/knowledge-search.js';
import { gptsServer } from './tools/gpts-writer.js';

// エージェント定義
import { AGENTS, buildOrchestratorPrompt } from './agents/orchestrator.js';

// Agent SDK
import { query } from '@anthropic-ai/claude-agent-sdk';

// ---------------------------------------------------------------------------
// 定数
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3847;

// ---------------------------------------------------------------------------
// dataディレクトリ確保 & DB初期化
// ---------------------------------------------------------------------------
mkdirSync(join(__dirname, 'data'), { recursive: true });

// ---------------------------------------------------------------------------
// SSEクライアント管理
// ---------------------------------------------------------------------------

/** @type {Map<string, Set<import('express').Response>>} */
const sseClients = new Map();

/**
 * SSEクライアントにデータを送信する
 * @param {string} generationId
 * @param {object} data - SSEで送信するJSONデータ
 */
function sendSSE(generationId, data) {
  const clients = sseClients.get(generationId);
  if (!clients) return;

  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try {
      res.write(payload);
    } catch {
      // クライアント切断済み - 次のcleanupで除去される
    }
  }
}

/**
 * SSEクライアントを登録する
 * @param {string} generationId
 * @param {import('express').Response} res
 */
function addSSEClient(generationId, res) {
  if (!sseClients.has(generationId)) {
    sseClients.set(generationId, new Set());
  }
  sseClients.get(generationId).add(res);
}

/**
 * SSEクライアントを除去する
 * @param {string} generationId
 * @param {import('express').Response} res
 */
function removeSSEClient(generationId, res) {
  const clients = sseClients.get(generationId);
  if (!clients) return;
  clients.delete(res);
  if (clients.size === 0) {
    sseClients.delete(generationId);
  }
}

// ---------------------------------------------------------------------------
// エージェントチーム実行
// ---------------------------------------------------------------------------

/**
 * Agent SDKを使ってエージェントチームを実行する
 * @param {string} generationId - DB上のgeneration ID
 * @param {string} theme - テーマ
 * @param {string} targetAudience - ターゲット
 * @param {string[]} platforms - プラットフォーム一覧
 */
async function runAgentTeam(generationId, theme, targetAudience, platforms) {
  try {
    // ステータスを 'running' に更新
    updateGenerationStatus(generationId, 'running');
    sendSSE(generationId, { type: 'status', status: 'running' });

    // オーケストレーターのプロンプトを生成
    const prompt = buildOrchestratorPrompt(theme, targetAudience, platforms);

    // Agent SDKのquery()を呼び出し
    const conversation = query({
      prompt,
      options: {
        allowedTools: [
          'Task',
          'WebSearch',
          'WebFetch',
          'mcp__knowledge-tools__search_knowledge',
          'mcp__knowledge-tools__list_knowledge_files',
          'mcp__gpts-writer-tools__write_with_gpts',
        ],
        agents: AGENTS,
        mcpServers: {
          'knowledge-tools': knowledgeServer,
          'gpts-writer-tools': gptsServer,
        },
        permissionMode: 'bypassPermissions',
        allowDangerouslySkipPermissions: true,
        model: 'claude-sonnet-4-6',
        maxTurns: 30,
        persistSession: false,
        stderr: (data) => {
          console.error(`[Agent SDK stderr] ${data}`);
          sendSSE(generationId, {
            type: 'task_progress',
            description: `[debug] ${data.slice(0, 300)}`,
          });
        },
      },
    });

    // ストリームからメッセージを受信しSSEに転送
    let lastAssistantText = '';

    for await (const message of conversation) {
      switch (message.type) {
        case 'assistant': {
          // アシスタントメッセージからテキストを抽出
          const textBlocks = message.message.content.filter(
            (block) => block.type === 'text'
          );
          if (textBlocks.length > 0) {
            lastAssistantText = textBlocks.map((b) => b.text).join('\n');
            sendSSE(generationId, {
              type: 'assistant_message',
              text: lastAssistantText.slice(0, 500), // プレビュー用に先頭500文字
            });
          }
          break;
        }

        case 'system': {
          if (message.subtype === 'init') {
            sendSSE(generationId, {
              type: 'system',
              subtype: 'init',
              model: message.model,
              tools: message.tools,
            });
          } else if (message.subtype === 'task_notification') {
            sendSSE(generationId, {
              type: 'task_notification',
              taskId: message.task_id,
              status: message.status,
              summary: message.summary,
            });
          } else if (message.subtype === 'task_started') {
            sendSSE(generationId, {
              type: 'task_started',
              taskId: message.task_id,
              description: message.description,
            });
          } else if (message.subtype === 'task_progress') {
            sendSSE(generationId, {
              type: 'task_progress',
              taskId: message.task_id,
              description: message.description,
            });
          }
          break;
        }

        case 'result': {
          if (message.subtype === 'success') {
            // 最終結果を取得
            const resultText = message.result || lastAssistantText;

            // JSONを抽出して構造化データとして保存を試みる
            let parsed = null;
            try {
              const jsonMatch = resultText.match(/```json\s*([\s\S]*?)```/);
              if (jsonMatch) {
                parsed = JSON.parse(jsonMatch[1]);
              } else {
                parsed = JSON.parse(resultText);
              }
            } catch {
              // JSONパースに失敗した場合はそのままテキストとして保存
            }

            if (parsed && parsed.contents) {
              // 構造化された結果: プラットフォーム別に保存
              for (const content of parsed.contents) {
                saveOutput({
                  generationId,
                  platform: content.platform,
                  content: JSON.stringify(content, null, 2),
                });
              }

              // 付随データの更新
              updateGenerationStatus(generationId, 'completed', {
                trendReport: parsed.research_summary
                  ? JSON.stringify(parsed.research_summary)
                  : null,
                knowledgeReport: parsed.knowledge_summary
                  ? JSON.stringify(parsed.knowledge_summary)
                  : null,
                contentPlan: JSON.stringify(parsed.contents),
              });
            } else {
              // テキストのみの結果
              saveOutput({
                generationId,
                platform: 'all',
                content: resultText,
              });
              updateGenerationStatus(generationId, 'completed');
            }

            sendSSE(generationId, {
              type: 'done',
              cost: message.total_cost_usd,
              turns: message.num_turns,
              duration_ms: message.duration_ms,
            });
          } else {
            // エラー結果
            updateGenerationStatus(generationId, 'failed');
            sendSSE(generationId, {
              type: 'error',
              message: `Agent execution failed: ${message.subtype}`,
              errors: message.errors || [],
            });
          }
          break;
        }

        // tool_progressなどはSSEに簡易転送
        case 'tool_progress': {
          sendSSE(generationId, {
            type: 'tool_progress',
            toolName: message.tool_name,
            elapsed: message.elapsed_time_seconds,
          });
          break;
        }

        default:
          // その他のメッセージは無視
          break;
      }
    }
  } catch (error) {
    console.error(`[runAgentTeam] Error for ${generationId}:`, error);
    updateGenerationStatus(generationId, 'failed');
    sendSSE(generationId, {
      type: 'error',
      message: error.message || 'Unknown error',
    });
  }
}

// ---------------------------------------------------------------------------
// Expressアプリケーション
// ---------------------------------------------------------------------------
const app = express();

// ミドルウェア
app.use(express.json());

// 静的ファイル配信（ダッシュボードHTML用）
app.use(express.static(join(__dirname, 'public')));

// ---------------------------------------------------------------------------
// API エンドポイント
// ---------------------------------------------------------------------------

/**
 * POST /api/generate
 * 企画依頼を受け付ける
 */
app.post('/api/generate', (req, res) => {
  const { theme, targetAudience, platforms } = req.body;

  // バリデーション
  if (!theme) {
    return res.status(400).json({ error: 'theme is required' });
  }
  if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
    return res
      .status(400)
      .json({ error: 'platforms must be a non-empty array' });
  }

  // DB登録
  const id = createGeneration({ theme, targetAudience, platforms });

  // 非同期でエージェントチームを起動（awaitしない）
  runAgentTeam(id, theme, targetAudience || '', platforms);

  // 即座にレスポンス
  res.json({ id, status: 'started' });
});

/**
 * GET /api/generate/:id/stream
 * SSEで進捗を配信する
 */
app.get('/api/generate/:id/stream', (req, res) => {
  const { id } = req.params;

  // generationの存在確認
  const generation = getGeneration(id);
  if (!generation) {
    return res.status(404).json({ error: 'Generation not found' });
  }

  // SSEヘッダー設定
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  // 現在のステータスを即座に送信
  res.write(
    `data: ${JSON.stringify({ type: 'status', status: generation.status })}\n\n`
  );

  // すでに完了/失敗していたらストリーム終了
  if (generation.status === 'completed' || generation.status === 'failed') {
    res.write(
      `data: ${JSON.stringify({ type: generation.status === 'completed' ? 'done' : 'error' })}\n\n`
    );
    res.end();
    return;
  }

  // SSEクライアント登録
  addSSEClient(id, res);

  // クライアント切断時にクリーンアップ
  req.on('close', () => {
    removeSSEClient(id, res);
  });
});

/**
 * GET /api/results
 * 過去の結果一覧
 */
app.get('/api/results', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const generations = listGenerations(limit);
  res.json(generations);
});

/**
 * GET /api/results/:id
 * 結果詳細（outputs付き）
 */
app.get('/api/results/:id', (req, res) => {
  const { id } = req.params;
  const generation = getGeneration(id);

  if (!generation) {
    return res.status(404).json({ error: 'Generation not found' });
  }

  const outputs = getOutputs(id);
  res.json({ ...generation, outputs });
});

// ---------------------------------------------------------------------------
// GPTs 設定 API
// ---------------------------------------------------------------------------
const GPTS_CONFIG_PATH = join(__dirname, 'config', 'gpts-urls.json');

/**
 * GET /api/config/gpts
 * 現在のGPTs設定を返す
 */
app.get('/api/config/gpts', (req, res) => {
  try {
    if (existsSync(GPTS_CONFIG_PATH)) {
      const config = JSON.parse(readFileSync(GPTS_CONFIG_PATH, 'utf-8'));
      res.json(config);
    } else {
      // デフォルト設定を返す
      res.json({
        instagram: { url: '', name: 'Instagram ライター' },
        x: { url: '', name: 'X ライター' },
        youtube: { url: '', name: 'YouTube ライター' },
        note: { url: '', name: 'NOTE ライター' },
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to read GPTs config' });
  }
});

/**
 * POST /api/config/gpts
 * GPTs設定を保存する
 */
app.post('/api/config/gpts', (req, res) => {
  try {
    const config = req.body;
    // configディレクトリ確保
    mkdirSync(join(__dirname, 'config'), { recursive: true });
    writeFileSync(GPTS_CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save GPTs config' });
  }
});

// ---------------------------------------------------------------------------
// サーバー起動
// ---------------------------------------------------------------------------
initDB();

app.listen(PORT, () => {
  console.log(`SNS Agent Team server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/generate         - 企画依頼`);
  console.log(`  GET  /api/generate/:id/stream - SSE進捗配信`);
  console.log(`  GET  /api/results          - 結果一覧`);
  console.log(`  GET  /api/results/:id      - 結果詳細`);
  console.log(`  GET  /api/config/gpts      - GPTs設定取得`);
  console.log(`  POST /api/config/gpts      - GPTs設定保存`);
});
