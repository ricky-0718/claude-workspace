# ブログ専門エージェントチーム設計書

## 概要
content-writerからブログ業務を分離し、3体の専門エージェント（blog-strategist, blog-writer, blog-editor）を新設する。各エージェントは既存のブログスキル群（15コマンド）を呼び出しつつ、おさる式メソドロジー・Voice Guide・セールスライティング12の型を上乗せする。

## エージェント定義

### 1. blog-strategist（ブログ戦略家）
- **ファイル**: `.claude/agents/blog-strategist.md`
- **色**: cyan
- **ツール**: Read, Grep, Glob
- **トリガー**: ブログ戦略、テーマ選定、編集カレンダー、コンテンツブリーフ
- **使うスキル**: `/blog-strategy`, `/blog-calendar`, `/blog-brief`
- **参照ナレッジ**:
  - `knowledge/marketing/osaru-methodology.md`（集客4レバー、ファネル設計、ゼロ億ロードマップ）
  - `knowledge/business/事業戦略ロードマップ.md`
- **判断基準**: おさる式ロードマップの現フェーズ（STEP5-6→7）に合ったコンテンツ戦略を提案。SEOスキルの出力をおさる式の売上方程式（リスト数×CVR×LTV）で評価する

### 2. blog-writer（ブログライター）
- **ファイル**: `.claude/agents/blog-writer.md`
- **色**: magenta
- **ツール**: Read, Write, Edit, Grep, Glob
- **トリガー**: ブログ執筆、記事作成、ブログ書いて
- **使うスキル**: `/blog-write`, `/blog-outline`, `/blog-image`, `/blog-chart`
- **参照ナレッジ**:
  - `knowledge/marketing/osaru-methodology.md`（リール7ステップ台本、8つの心理トリガー、セミナー15ステップ構成）
  - `knowledge/marketing/voice-guide-ricky-blog.md`（文体DNA）
  - `knowledge/marketing/osaru-sales-writing-12types.md`（セールスライティング12の型）
  - `knowledge/marketing/writing-rules.md`（文章生成統一ルール）
- **執筆フロー**:
  1. `/blog-outline`でSERP分析ベースの構成作成
  2. おさる式7ステップに再構成（フック→問題提起→権威づけ→対比→課題詳細→解決策→CTA）
  3. Voice Guideのトーンで執筆
  4. 8つの心理トリガーを各セクションに配置
  5. 「悩みを1個ずつ出す」原則を適用

### 3. blog-editor（ブログ編集者）
- **ファイル**: `.claude/agents/blog-editor.md`
- **色**: red
- **ツール**: Read, Write, Edit, Grep, Glob
- **トリガー**: ブログチェック、記事分析、SEOチェック、ブログスコア、ブログ改善
- **使うスキル**: `/blog-analyze`, `/blog-seo-check`, `/blog-geo`, `/blog-schema`, `/blog-rewrite`
- **参照ナレッジ**:
  - `knowledge/marketing/voice-guide-ricky-blog.md`（トーン検証）
  - `knowledge/marketing/osaru-methodology.md`（心理トリガー配置検証）
- **チェック項目**:
  1. `/blog-analyze`で100点スコアリング
  2. おさる式7ステップ構成の適合チェック
  3. 心理トリガーの配置検証（各セクションに適切に配置されているか）
  4. Voice Guideとの一致検証（Anti-Patterns違反がないか）
  5. AI臭さ排除チェック
  6. SEO・スキーマ・AI Citation最適化

## CLAUDE.md変更

### ルーティングテーブルに追加
| エージェント | 担当領域 | いつ召喚するか |
|---|---|---|
| blog-strategist | ブログ戦略・企画・カレンダー | ブログのテーマ選定、戦略、カレンダーの話題 |
| blog-writer | ブログ記事執筆 | ブログ記事の新規作成・リライトの話題 |
| blog-editor | ブログ品質管理・SEO | ブログの分析、スコア、SEO、改善の話題 |

### content-writerの変更
- descriptionから「blog content」を除外
- ブログ関連はblog-writer/blog-editorにルーティング

## 棲み分け
- content-writer: LINE返信、SNS投稿、ウェビナー台本、動画台本
- blog-writer: ブログ記事専用（おさる式 + Voice Guide + SEO）
