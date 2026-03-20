# セッション引き継ぎ — 3/20 Circleback導入

## 完了したこと
- Circlebackアカウント作成（newgoodriki@gmail.comのGoogleアカウントで登録）
- デスクトップアプリ（v2.7.3）をインストール済み
- 録音方式:「Record computer audio without a bot」（ボットなし、システムオーディオキャプチャ）を選択
- デスクトップアプリの自動録音設定を確認（Detect meetings / Auto start / Auto end が全てON）
- MCP サーバーを登録済み（`~/.claude.json` に追加）
- **MCP OAuth認証完了**（3/20 2セッション目で `/mcp` コマンドで認証）
- **言語設定: Japanese** に設定済み
- **ボット自動参加: 全OFF** に設定済み
- **カレンダー接続**: newgoodriki@gmail.com + ricky@ryugaku101.com
- 議事録自動化ワークフローの大規模調査を実施（イヤホン環境での双方向録音、ツール比較、自動化パターン等）

## 未完了・次にやること
1. **自動化ワークフロー設計**（最優先・Asanaマイタスク登録済み）: Circleback Webhook → Claude分析 → Asana/LINE連携。既存の/mendanワークフローとの統合検討
2. **テスト面談**: 次回のZoom/Google Meet面談でCirclebackが双方向録音できるか検証（イヤホン使用時）
3. **HiNoteとの精度比較**: 同じ面談でHiNote（既存）とCircleback（新規）の文字起こし精度を比較

## 利用可能なMCPツール（9個）
- `SearchMeetings` — 会議検索
- `ReadMeetings` — 会議詳細取得
- `SearchTranscripts` — 文字起こし検索
- `GetTranscriptsForMeetings` — 全文文字起こし取得
- `SearchCalendarEvents` — カレンダーイベント検索
- `SearchEmails` — メール検索
- `FindProfiles` — 参加者プロフィール検索
- `FindDomains` — 会社ドメイン検索
- `SearchSupportArticles` — サポート記事検索

## 重要なコンテキスト

### なぜCirclebackを選んだか
- HiNoteにはAPI/Webhook/Zapier連携がない（コミュニティで要望中だが未実装）
- CirclebackはWebhook/API/MCP/Zapierがフル対応で自動化の自由度が高い
- **唯一のMCP対応議事録ツール** → Claude Codeから直接会議データにアクセス可能
- デスクトップアプリがシステムオーディオキャプチャ対応 → イヤホン使用時でも双方向録音可能

### イヤホン問題の解決方法
- ユーザーは面談を必ずイヤホンで行う
- Circlebackデスクトップアプリは WindowsのWASAPIループバック相当で、イヤホンに出力される前のデジタル信号をキャプチャ
- マイク（自分の声）+ システムオーディオ（相手の声）を同時録音

### 料金
- 7日間無料トライアル中（〜3/27）。$25/月、年払い$20.83/月
- UIは英語のみ。議事録出力は日本語可能

### 既存の面談ワークフローとの関係
```
【現行】HiNote → Spectre検出（旧PC） → /mendan → 分析 → Asana + LINE
【将来】Circleback → Webhook/MCP → Claude分析 → Asana + LINE
```
- 現行のHiNote + Spectreは引き続き稼働中。Circlebackは並行テスト
- HiNoteのAPI対応を待ちつつ、Circlebackで自動化の可能性を検証

## 関連ファイル
- MCP設定: `~/.claude.json`（circleback セクション）
- メモリ: `project_circleback.md`
