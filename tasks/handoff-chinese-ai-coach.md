# セッション引き継ぎ — 2026-04-05 中国語AI×人間コーチング MVP構築

## 完了したこと

### リサーチ（セッション前半）
- AI英語学習ツール最新事例の徹底リサーチ（Speak/$1億ARR, Preply/$12億, ELSA, Praktika等）
- Preplyのビジネスモデル完全解剖（手数料18-33%、Human+AI World戦略）
- Speakの詳細分析（韓国市場戦略、4層レッスン構造、弱点）
- 中国語AI学習アプリの市場調査（SuperChinese最大手で$143万調達のみ＝競合弱い）
- 「ゼロイチでアプリ開発は勝てない。管理レイヤーを作る」方針決定

### プロダクト設計
- 3層構造の設計確定: インプット（ビデオ講座）→ アウトプット（AIアプリ）→ 品質保証（週1人間チェック）
- 技術スタック選定: Express + SQLite + Claude Haiku 4.5 + SpeechSuper API
- サブスク料金仮設計: ライト¥5,000 / スタンダード¥15,000 / プレミアム¥30,000
- MVPスコープ決定: 発音ドリル + テキスト会話 + 課題管理 + 講師ダッシュボード(API)

### MVP実装
- **プロジェクト作成**: `chinese-ai-coach/` — Express + SQLite + Vanilla JS
- **DB設計**: students, drill_logs, chat_logs, tasks, coach_reviews の5テーブル
- **発音ドリル**: 繁体字10問（四声基礎〜日常会話）、モック判定、録音UI、スコア表示
- **テキスト会話**: Claude Haiku 4.5 API連携完了。繁體中文（台湾華語）で返答、文法修正+日本語ヒント
- **ログイン**: 名前+4桁パスコード方式（「アクセストークン」→修正済み）
- **ブランドデザイン**: 台湾留学101カラー（#0A5FA6 / #FFDB00 / Warm Neutrals）適用済み
- **APIキー**: Anthropic Console から `chinese-ai-coach-v2` キー発行・設定済み
- **SpeechSuper API**: トライアル申請完了（ricky@ryugaku101.com宛に1営業日以内）
- **公開URL**: Tailscale Funnel でスマホからアクセス確認済み

### テスト確認済み
- ログイン（名前+パスコード）→ 発音ドリル画面 → 会話練習 → 全フロー動作確認
- Claude Haiku 4.5が繁體中文で台湾用語を使って自然に会話
- 文法修正が繁體中文で出力される（簡体字混入バグ修正済み）
- スマホ（iPhone Safari）からのアクセス確認済み

## 未完了・次にやること

### 優先度高
1. **SpeechSuper APIキー受領** → `.env` の `SPEECHSUPER_APP_KEY` / `SPEECHSUPER_SECRET_KEY` に設定 → モックから本物の声調判定に切り替え
2. **講師ダッシュボード フロントエンド** — APIは完成済み（`/api/dashboard/students`, `/api/dashboard/students/:id`）。HTML画面を作るだけ
3. **ログインをURL個別リンク方式に変更** — パスコード不要化。LINEで `?s=token` 付きURLを送る

### 優先度中
4. **Cloudflare Pages デプロイ（本番）** — フロント静的ファイル + APIサーバーは別構成が必要
5. **カリキュラムJSON作成** — ビデオ講座（mindset-lesson1〜4）との連動定義
6. **サブスク課金システム** — Stripe or UTAGE連携

### 優先度低
7. **音声リアルタイム会話（Phase 2）** — OpenAI Realtime API。コスト高（月$135/人）
8. **進捗グラフ・統計画面**
9. **PWA化**（ホーム画面追加対応）

## 重要なコンテキスト

### なぜこのアプローチを選んだか
- Speakは$1.62億調達・253人チーム。同じ土俵で戦えない
- 「台湾留学のための中国語準備」という狭い領域で圧倒的に勝つ戦略
- AIアプリ自体は作らない。既存API上に「管理レイヤー」を構築する
- 中国語AI学習市場は英語の1/100。競合が弱い＝チャンス

### 台湾華語の重要性
- 全テキストは繁體中文（簡体字禁止）
- 台湾用語優先（計程車、捷運、機車、便當等）
- システムプロンプトに「簡体字絶対禁止」ルールを明記済み

### 技術的注意点
- **Tailscale Funnel**: `--bg` だと502になる。`tailscale funnel http://localhost:3860` をフォアグラウンドで実行
- **Bashのcurl日本語問題**: 日本語JSONはNode.jsのfetch経由で送ること（Shift-JIS文字化け）
- **Express v5**: ワイルドカードは `/{*path}` 形式（`*` 単体は使えない）
- **Claude APIのlazy init**: サービスファイルでモジュール読み込み時にnew Anthropic()するとdotenvが間に合わない。遅延初期化必須

## 関連ファイル

### プロジェクト本体
- `chinese-ai-coach/` — プロジェクトルート
- `chinese-ai-coach/server/index.js` — Expressメインサーバー（ポート3860）
- `chinese-ai-coach/server/services/claude.js` — Claude Haiku 4.5連携（台湾華語システムプロンプト）
- `chinese-ai-coach/server/services/speechsuper.js` — SpeechSuper連携（モック含む）
- `chinese-ai-coach/server/routes/chat.js` — チャットAPI
- `chinese-ai-coach/server/routes/speech.js` — 発音判定API
- `chinese-ai-coach/server/routes/dashboard.js` — 講師ダッシュボードAPI
- `chinese-ai-coach/server/routes/tasks.js` — 課題管理API
- `chinese-ai-coach/server/db/schema.sql` — DBスキーマ
- `chinese-ai-coach/public/` — フロントエンド（HTML/CSS/JS）
- `chinese-ai-coach/.env` — APIキー（gitignore済み）

### メモリ
- `memory/project_chinese_ai_coaching.md` — プロジェクト方針・仕様・進捗
- `memory/feedback_tailscale_funnel_foreground.md`
- `memory/feedback_api_key_self_service.md`
- `memory/feedback_ux_no_tech_jargon.md`

### プラン
- `.claude/plans/pure-meandering-shamir.md` — MVP設計プラン（承認済み）

### ワークツリー
- ブランチ: `feature/chinese-ai-coach`
- パス: `C:\Users\newgo\claude-worktrees\chinese-ai-coach`

## テスト用アカウント
| 名前 | パスコード | 用途 |
|---|---|---|
| 田中太郎 | 1234 | 最初のテスト用 |
| 山田太郎 | 1234 | デモ録画用（履歴リセット済み） |

## 起動方法
```bash
cd "C:/Users/newgo/claude-worktrees/chinese-ai-coach/chinese-ai-coach"
"C:/Program Files/nodejs/node.exe" server/index.js
# 別ターミナルでFunnel公開
tailscale funnel http://localhost:3860
```
