# SNSコンテンツ企画エージェントチーム 設計書

## 概要

複数のAIエージェントが連携してSNSコンテンツの企画・原稿作成を行うシステム。
トレンド分析と自社ナレッジを組み合わせ、4つのSNSプラットフォーム向けコンテンツを生成する。

## 要件

- **対象SNS**: Instagram, X (Twitter), YouTube, NOTE
- **自動化範囲**: トレンド分析 → ナレッジ活用 → 企画立案 → 原稿作成（投稿は人間が実行）
- **ライティング**: ChatGPT上のカスタムGPTsにブラウザ経由で委譲
- **UI**: Webダッシュボード（企画依頼・進捗監視・成果物管理）
- **利用者**: 個人利用

## アーキテクチャ

### 技術スタック

| レイヤー | 技術 | 理由 |
|---|---|---|
| フロントエンド | HTML + Vanilla JS + Tailwind CSS | シンプル。フレームワーク不要 |
| バックエンド | Express + Agent SDK | 既存プロジェクトと同じNode.js系 |
| データ保存 | SQLite (better-sqlite3) | ファイル1つ。サーバー不要 |
| リアルタイム通信 | SSE (Server-Sent Events) | Agent SDKのストリームと自然に統合 |
| GPTs連携 | Edge ブラウザ自動操作 | 既存GPTsをそのまま活用 |

### エージェントチーム構成

```
┌──────────────────────────────────────┐
│   コンテンツディレクター (メイン)       │
│   各エージェントにタスクを振る          │
└──────┬───────┬───────┬───────┬───────┘
       │       │       │       │
  ┌────▼───┐┌──▼────┐┌▼─────┐┌▼────────┐
  │トレンド ││ナレッジ││企画   ││GPTsブリッジ│
  │リサーチ ││分析   ││プラン ││(ライター) │
  │ャー    ││スト   ││ナー   ││          │
  └────────┘└───────┘└──────┘└──────────┘
```

| エージェント | 役割 | 使うツール |
|---|---|---|
| コンテンツディレクター | 全体の指揮。依頼を分解し各エージェントに委譲 | Task（サブエージェント呼び出し） |
| トレンドリサーチャー | SNSトレンド・競合分析をWeb検索で収集 | WebSearch, WebFetch |
| ナレッジアナリスト | ナレッジ格納庫から関連知識を抽出 | knowledge-search（カスタムMCPツール） |
| コンテンツプランナー | トレンド＋ナレッジを組み合わせて企画立案 | テキスト生成のみ |
| GPTsブリッジ | ChatGPT上のカスタムGPTsに原稿作成を依頼 | gpts-writer（カスタムMCPツール） |

### 処理フロー

```
1. ユーザーがダッシュボードで企画依頼を入力
   （テーマ: 「台湾留学の魅力」、ターゲット: 「高校生の保護者」、SNS: 全部）

2. コンテンツディレクターが起動

3. 並列実行:
   ├── トレンドリサーチャー → トレンドレポート
   └── ナレッジアナリスト → ナレッジリスト

4. コンテンツプランナー → 各SNS向け企画書

5. GPTsブリッジ（4SNS並列）:
   ├── Instagram用GPTs → キャプション + ハッシュタグ + 画像指示
   ├── X用GPTs → ツイート文 + スレッド案
   ├── YouTube用GPTs → タイトル + 概要欄 + 台本骨子
   └── NOTE用GPTs → 記事タイトル + 見出し + 本文ドラフト

6. 全結果をSQLiteに保存、ダッシュボードに表示
```

## GPTs連携の仕組み

### ブラウザ自動操作パターン

```
[Agent SDK] → gpts-writerツール呼び出し
    ↓
[gpts-writerツール] → Edge自動操作でChatGPTを開く
    ↓
[ChatGPT] → カスタムGPTsのURLにアクセス
    ↓
[ChatGPT] → 企画書テキストを送信
    ↓
[ChatGPT] → GPTsの応答を取得
    ↓
[gpts-writerツール] → 結果をAgent SDKに返す
```

### 注意点
- ChatGPTへのログイン状態を維持する必要がある
- GPTsのURLを設定ファイルで管理
- レート制限に注意（連続送信の間隔を空ける）

## Webダッシュボード

### 画面構成

| 画面 | 内容 |
|---|---|
| 企画依頼 | テーマ・ターゲット・対象SNSを入力して「企画開始」ボタン |
| 進捗モニター | 各エージェントの状態をリアルタイム表示（SSE） |
| 成果物一覧 | 過去の企画結果をSNS別に一覧表示。コピーボタン付き |

### データフロー

```
ダッシュボード(ブラウザ)
  │
  ├── POST /api/generate       → 企画依頼を送信
  ├── GET  /api/generate/:id/stream → SSEで進捗受信
  ├── GET  /api/results         → 過去の結果一覧
  └── GET  /api/results/:id     → 特定の結果詳細
```

## データベース設計

```sql
-- 企画依頼
CREATE TABLE generations (
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

-- 各SNSの成果物
CREATE TABLE outputs (
  id TEXT PRIMARY KEY,
  generation_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (generation_id) REFERENCES generations(id)
);

-- GPTs設定
CREATE TABLE gpts_config (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  gpts_url TEXT NOT NULL,
  gpts_name TEXT
);
```

## ディレクトリ構成

```
sns-agent-team/
├── package.json
├── server.js                  -- Expressサーバー + SSE
├── agents/
│   ├── orchestrator.js        -- コンテンツディレクター定義
│   ├── trend-researcher.js    -- トレンドリサーチャー定義
│   ├── knowledge-analyst.js   -- ナレッジアナリスト定義
│   ├── content-planner.js     -- コンテンツプランナー定義
│   └── gpts-bridge.js         -- GPTsブリッジ定義
├── tools/
│   ├── knowledge-search.js    -- ナレッジ格納庫検索MCPツール
│   └── gpts-writer.js         -- GPTs自動操作MCPツール
├── db/
│   ├── database.js            -- SQLite操作
│   └── schema.sql             -- テーブル定義
├── config/
│   └── gpts-urls.json         -- 各SNS用GPTsのURL設定
├── public/
│   ├── index.html             -- ダッシュボード
│   ├── style.css              -- Tailwind CSS
│   └── app.js                 -- フロントエンドJS（SSE受信等）
└── data/
    └── sns-agent.db           -- SQLiteファイル（自動生成）
```

## 設定ファイル

### gpts-urls.json

```json
{
  "instagram": {
    "url": "https://chat.openai.com/g/...",
    "name": "Instagram ライター"
  },
  "x": {
    "url": "https://chat.openai.com/g/...",
    "name": "X ライター"
  },
  "youtube": {
    "url": "https://chat.openai.com/g/...",
    "name": "YouTube ライター"
  },
  "note": {
    "url": "https://chat.openai.com/g/...",
    "name": "NOTE ライター"
  }
}
```

## 今後の拡張

- 成果物の自動投稿（各SNS API連携）
- 投稿パフォーマンス分析の取り込み
- 定期実行（週次でトレンドレポート自動生成）
- Asana日報への自動記入連携
