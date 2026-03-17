# セッション引き継ぎ — 2026-03-18 スキル・プラグイン大規模拡張

## 完了したこと

### プラグイン・マーケットプレース追加
- **anthropics/skills** マーケットプレース追加 — PDF/DOCX/PPTX/XLSX文書スキル等16個
- **marketingskills** (Corey Haines) マーケットプレース追加 — CRO/コピー/SEO/広告等38スキル
- **circleback** プラグイン有効化 — 会議文字起こしMCP（HiNote代替候補）

### スキル インストール（~/.claude/skills/ に33個）
- **Wagner** 6個: voice-extractor, de-ai-ify, content-idea-generator, tweet-draft-reviewer, social-card-gen, youtube-summarizer
- **claude-seo** 12個: seo-audit, seo-page, seo-content, seo-technical, seo-schema, seo-geo, seo-plan, seo-programmatic, seo-competitor-pages, seo-hreflang, seo-images, seo-sitemap
- **claude-blog** 15個: blog, blog-write, blog-rewrite, blog-analyze, blog-audit, blog-brief, blog-calendar, blog-outline, blog-repurpose, blog-seo-check, blog-schema, blog-geo, blog-chart, blog-image, blog-strategy

### サブエージェント インストール（~/.claude/agents/ に17個）
- 広告監査 6個: audit-meta, audit-google, audit-budget, audit-creative, audit-compliance, audit-tracking
- SEO 7個: seo-content, seo-technical, seo-schema, seo-sitemap, seo-geo, seo-performance, seo-visual
- ブログ 4個: blog-writer, blog-researcher, blog-reviewer, blog-seo

### 不要プラグイン無効化（13個）
clangd-lsp, csharp-lsp, gopls-lsp, jdtls-lsp, kotlin-lsp, php-lsp, laravel-boost, gitlab, linear, greptile, firebase, huggingface-skills, atlassian

### カスタムコマンド作成
- `/gas-deploy` — GASスクリプトのデプロイワークフロー

### メモリ更新
- `feedback_morning_check_unnecessary.md` — /morning-checkは不要として再提案しない

## 未完了・次にやること

### 優先度高
1. **Circlebackの無料トライアル登録** — https://app.circleback.ai/ でGoogleアカウントサインアップ → 次セッションでMCP認証テスト
2. **team-auditへの統合** — 今セッションで追加した33スキル+17エージェントをteam-auditの検証範囲に含めるか検討（別セッションで判断予定）

### 優先度中
3. **SNS 0→1 戦略設計** — ブログ/インスタ/X/YouTubeの0→1。スキルは揃ったが、どのチャネルから攻めるかの戦略がまだ
4. **voice-extractorで文体抽出** — writing-rules.md をさらに強化するために、既存の文章サンプルから文体を抽出する

## 重要なコンテキスト

### スキルの配置（2箇所に分かれている）
- **~/.claude/skills/** (グローバル) — Wagner 6 + claude-seo 12 + claude-blog 15 = 33個
- **~/.claude/agents/** (グローバル) — 広告監査6 + SEO 7 + ブログ4 = 17個
- **プロジェクト/.claude/agents/** — 仮想マーケチーム6体（別セッションで作成: ad-analyst, content-writer, customer-manager, lp-architect, ops-manager, sales-advisor）
- **プロジェクト/.claude/commands/** — カスタムコマンド12個

### 別セッションの作業（この引き継ぎの直前に実行済み）
- 仮想マーケティングチーム6体構築（ad-analyst等）
- /review-ceo, /review-marketer, /review-customer コマンド追加
- /team-audit + hookifyリマインダー追加
- おさる式マーケティングメソドロジー（knowledge/marketing/osaru-methodology.md）追加
- MEMORY.md に Core Methodology セクション追加

### Circlebackについて
- Google Meetで面談を行っているため、HiNoteの旧PC監視スクリプトを置き換えられる可能性がある
- 月$25（約3,700円）。7日間無料トライアルあり
- Botlessモード（参加者に見えない）を推奨
- プラグインはMCP型（スキル/コマンドなし）。会議検索・文字起こし取得が可能

### 不要と判断したスキル（理由付き）
- ai-marketing-claude (Trabzada) — marketingskillsと80%重複
- openclaudia-skills — meta-ads + marketingskillsと重複
- agentkits-marketing — 93コマンドは過剰、重複多い
- geo-seo-claude — 有料集客メインの今は不要（ブログ育ってから再検討）

### 有効プラグイン一覧（30個）
asana, agent-sdk-dev, circleback, claude-code-setup, claude-md-management, code-review, code-simplifier, context7, coderabbit, commit-commands, explanatory-output-style, feature-dev, figma, firecrawl, frontend-design, learning-output-style, github, Notion, hookify, security-guidance, plugin-dev, skill-creator, superpowers, typescript-lsp, stripe, excel-generator(local), youtube-transcript(local), meta-ads-analyzer(local), meta-ads-setup(local)
+ マーケットプレース: anthropics/skills, marketingskills

## 関連ファイル
- `.claude/settings.json` — プラグイン有効/無効の変更
- `~/.claude/skills/` — 33スキル（グローバル）
- `~/.claude/agents/` — 17エージェント（グローバル）
- `.claude/commands/gas-deploy.md` — 新規作成
- `memory/feedback_morning_check_unnecessary.md` — 新規作成
- `.firecrawl/` — リサーチ結果のキャッシュ多数
