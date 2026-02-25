import { createSdkMcpServer, tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.resolve(__dirname, '..', 'config', 'gpts-urls.json');

/**
 * GPTs設定ファイルを読み込む。存在しなければnullを返す。
 */
function loadGptsConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * GPTs設定がない場合に、Claude自身がライティングするためのプロンプトを生成する
 */
function buildFallbackPrompt(platform, contentPlan, theme, targetAudience) {
  const platformGuides = {
    instagram: [
      '- キャプションは改行を多用し、読みやすく',
      '- 最初の1文でスクロールを止める強いフック',
      '- ハッシュタグは10〜15個、関連性の高いものを選定',
      '- CTA（行動喚起）を末尾に入れる',
      '- 絵文字を適度に使ってビジュアル的なリズムを作る',
    ],
    x: [
      '- 140文字以内で収まるよう簡潔に（日本語は全角換算）',
      '- 最初の一文で興味を引く',
      '- ハッシュタグは1〜3個に絞る',
      '- リプライしたくなる問いかけや余白を残す',
      '- スレッド形式の場合は番号を振る',
    ],
    youtube: [
      '- タイトルは32文字以内、検索キーワードを含める',
      '- サムネイル用のキャッチコピーも提案する',
      '- 概要欄は最初の3行に要点を入れる（折りたたみ前に見える部分）',
      '- タイムスタンプ付きの構成案を作成する',
      '- 視聴維持率を意識した起承転結の台本構成',
    ],
    note: [
      '- タイトルは興味を引きつつSEOを意識する',
      '- 導入文で「誰の」「どんな悩みを解決するか」を明示',
      '- 見出しで記事構成が分かるようにする',
      '- 具体例・体験談を交えて説得力を出す',
      '- 末尾にまとめとCTA（スキ・フォロー促進）を入れる',
    ],
  };

  const guide = platformGuides[platform] || [];

  return [
    `【${platform.toUpperCase()} コンテンツ ライティング指示】`,
    '',
    `■ テーマ: ${theme}`,
    `■ ターゲット: ${targetAudience}`,
    `■ 企画内容:`,
    contentPlan,
    '',
    `■ ${platform} ライティングガイドライン:`,
    ...guide,
    '',
    '上記の情報をもとに、プラットフォームに最適化されたコンテンツを作成してください。',
  ].join('\n');
}

/**
 * GPTs設定がある場合に、ブラウザ操作の指示テキストを生成する
 */
function buildBrowserInstructions(platform, gptsConfig, contentPlan, theme, targetAudience) {
  const config = gptsConfig[platform];
  if (!config || !config.url) {
    return null;
  }

  const prompt = [
    `以下の内容で${platform}向けコンテンツを作成してください。`,
    '',
    `テーマ: ${theme}`,
    `ターゲット: ${targetAudience}`,
    '',
    '企画内容:',
    contentPlan,
  ].join('\n');

  return [
    `【GPTs ブラウザ操作指示】`,
    '',
    `■ GPTs名: ${config.name}`,
    `■ URL: ${config.url}`,
    `■ プラットフォーム: ${platform}`,
    '',
    '■ 操作手順:',
    `1. ブラウザで以下のURLを開く: ${config.url}`,
    '2. チャット入力欄に以下のプロンプトを入力する:',
    '---',
    prompt,
    '---',
    '3. 送信してGPTsの応答を待つ',
    '4. 応答結果をコピーして返す',
  ].join('\n');
}

/**
 * GPTsブリッジMCPサーバー
 *
 * カスタムGPTsと連携するためのツールを提供する。
 * GPTs設定がある場合はブラウザ操作の指示を返し、
 * ない場合はClaude自身がライティングするためのプロンプトを返す。
 */
export const gptsServer = createSdkMcpServer({
  name: 'gpts-writer-tools',
  version: '1.0.0',
  tools: [
    tool(
      'write_with_gpts',
      'プラットフォーム別のカスタムGPTsを使ってコンテンツを作成する。GPTs未設定の場合はClaude用のライティングプロンプトを返す。',
      {
        platform: z.enum(['instagram', 'x', 'youtube', 'note']).describe('対象プラットフォーム'),
        content_plan: z.string().describe('企画内容'),
        theme: z.string().describe('テーマ'),
        target_audience: z.string().describe('ターゲット'),
      },
      async ({ platform, content_plan, theme, target_audience }) => {
        const gptsConfig = loadGptsConfig();

        // GPTs設定がある場合 → ブラウザ操作の指示を返す
        if (gptsConfig && gptsConfig[platform]) {
          const instructions = buildBrowserInstructions(
            platform,
            gptsConfig,
            content_plan,
            theme,
            target_audience
          );

          if (instructions) {
            return {
              content: [
                {
                  type: 'text',
                  text: instructions,
                },
              ],
            };
          }
        }

        // GPTs設定がない場合 → Claude自身がライティングするためのプロンプトを返す
        const fallbackPrompt = buildFallbackPrompt(platform, content_plan, theme, target_audience);
        return {
          content: [
            {
              type: 'text',
              text: [
                '【GPTs未設定】Claude によるライティングモードで実行します。',
                `config/gpts-urls.json に ${platform} のGPTs URLを設定すると、カスタムGPTs経由でのライティングに切り替わります。`,
                '',
                fallbackPrompt,
              ].join('\n'),
            },
          ],
        };
      }
    ),
  ],
});
