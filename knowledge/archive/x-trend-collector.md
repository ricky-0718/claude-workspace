# X AI×マーケ トレンド収集システム

## 概要
X API v2で検索 → Claude APIで要約・活用提案 → LINE通知 → スプレッドシート記録
毎朝9時に自動実行するGASスクリプト

## リソース
- **ブランチ**: `worktree-x-trend-collector`
- **ワークツリー**: `.claude/worktrees/x-trend-collector/`
- **ローカルコード**: `gas-scripts/x-trend-collector.gs`
- **GASプロジェクト**: `1EZSJp8P4xXZfy2vmdmoqwuAd32rwxrngJzUv6Y49rb4x3ThrcR2KfcH_`
- **GAS URL**: https://script.google.com/u/0/home/projects/1EZSJp8P4xXZfy2vmdmoqwuAd32rwxrngJzUv6Y49rb4x3ThrcR2KfcH_/edit
- **スプレッドシートID**: `1YmSHQXva3-Y3sh6pUwCl9rHesn1Pg5H4nlHFftZ7YOY`
- **X Developer Console**: https://console.x.com/accounts/2028788215906508800/apps
- **X APIプラン**: Pay Per Use（従量課金）
- **X APIアプリ名**: `2028788215906508800taiwan101ce`
- **Xアカウント**: `@taiwan101center`

## スクリプトプロパティ（GASプロジェクト設定内）
- `X_BEARER_TOKEN` — ✅ 設定済み（3/4に再生成）
- `CLAUDE_API_KEY` — ✅ 設定済み
- `LINE_CHANNEL_ACCESS_TOKEN` — ✅ 設定済み
- `LINE_USER_ID` — ✅ 設定済み

## テスト結果（セッション4）
- ✅ `testClaudeApi` — 200 OK
- ✅ `testLineNotify` — LINE通知受信確認
- ✅ `testXApi` — 20件取得成功（トークン再生成後）
- ✅ `testFullFlow` — LINE通知届いた。ただし内容が好みと合わず

## 現在の状態 — 次セッションでやること

### 1. GASエディタのコードをローカルと同期する（最重要）
ローカル(`gas-scripts/x-trend-collector.gs`)が最新。GASエディタにはまだ反映されていない変更あり:
- 検索クエリ改善（Claude活用/AIエージェント/AI時短/SNSグロース）
- `MAX_RESULTS: 50`
- `MIN_LIKES: 30` フィルタ追加
- `diagToken()` と `testBearerToken()` はGASエディタにだけある（不要、削除してOK）

**手順**: GASエディタのMonacoにローカルコードを `setValue()` で一括反映 → Ctrl+S

### 2. testXApi → testFullFlow を再テスト
クエリ改善後のフルフロー動作確認。LINE通知の品質チェック。

### 3. まだ品質が低い場合のチューニングオプション
- `MIN_LIKES` を50や100に上げる
- 特定アカウント（@AI_masaou, @L_go_mrk, @ishida_ch 等）のツイートを優先するロジック追加
- 除外キーワードの調整

### 4. setupTrigger() で毎朝9時の自動実行を設定

### 5. masterにマージ

## X API 注意点
- `min_faves` オペレーターは Pay Per Use プランで使用不可（400エラーになる）
- Bearer Tokenは X Developer Console の「コピー」ボタンで取得すると `%2B` 等のURLエンコードが含まれる場合がある。GASでは両方（エンコード有/無）で動作した
- Bearer Token再生成すると旧トークンは即無効化される
- `/2/users/me` はBearer Token（app-only auth）では使えない（OAuth 2.0ユーザー認証が必要）

## ユーザーの好みプロファイル（Xブックマーク分析 1/26〜）
### 強い関心
- **Claude Code活用**: Skills自動最適化、Subagent設計、スケジュール機能、Googleスライド自動生成、SEO丸投げ
- **AIエージェント開発**: Claw-Empire、Notion Custom Agents、AI agent活用事例
- **AI×生産性**: NotebookLM、時短術、業務自動化

### 中程度の関心
- **SNSグロース**: X 1万フォロワー戦略、Xマネタイズ、Brain活用
- **AI×SEO/マーケ**: Claude Code for SEO、LP最適化
- **開発ツール**: Electrobun、Star-Office-UI

### よくブクマするアカウント
- `@AI_masaou`（AI駆動開発）
- `@L_go_mrk`（AI駆動塾）
- `@ishida_ch`（AIチュートリアル）
- `@ratekomaru`（らてこ丸）
- `@awakia`（Rimo）
- `@genkaidokusho`（限界読書）
- `@ai_jitan`（えーたん/AI×時短）
- `@yutosuzuki`（Offers | AI x HR）
- `@SEOTig`（SEOタイガー）

### ブクマの品質水準
- 最低いいね: 50〜100程度
- 平均いいね: 300〜2,000
- 内容: 具体的なハウツー・事例紹介が好み。抽象的な話は少ない
