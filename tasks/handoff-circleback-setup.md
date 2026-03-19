# セッション引き継ぎ — 3/20 Circleback導入

## 完了したこと
- Circlebackアカウント作成（newgoodriki@gmail.comのGoogleアカウントで登録）
- デスクトップアプリ（v2.7.3）をインストール済み
- 録音方式:「Record computer audio without a bot」（ボットなし、システムオーディオキャプチャ）を選択
- デスクトップアプリの自動録音設定を確認（Detect meetings / Auto start / Auto end が全てON）
- MCP サーバーを登録済み（`~/.claude.json` に追加）→ 次セッションでOAuth認証が必要
- 議事録自動化ワークフローの大規模調査を実施（イヤホン環境での双方向録音、ツール比較、自動化パターン等）

## 未完了・次にやること
1. **MCP OAuth認証**（最優先）: 次セッション開始時にCircleback MCPの認証を完了する。ブラウザが開くのでCirclebackアカウントでログイン承認
2. **言語設定**: Circleback Settings → Account → Language で **Japanese** に変更（議事録出力の言語）
3. **ボット自動参加の確認/OFF**: Settings → Joining preferences でボット自動参加が全部ONだった。ボットなし運用なら全てOFFにする
4. **テスト面談**: 次回のZoom/Google Meet面談でCirclebackが双方向録音できるか検証（イヤホン使用時）
5. **HiNoteとの精度比較**: 同じ面談でHiNote（既存）とCircleback（新規）の文字起こし精度を比較
6. **自動化ワークフロー設計**: Circleback Webhook → Asana/LINE連携の設計（既存の/mendanワークフローとの統合検討）

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
- 7日間無料トライアル中（$25/月、年払い$20.83/月）
- UIは英語のみ（日本語切替不可）。議事録出力は日本語可能

### 調査で得た知見（主要ツール比較）
- **Notta**: 日本語精度最高（98.86%）だがMCP非対応
- **Krisp**: ボットなし＋仮想マイク/スピーカー方式で最も手軽。ノイズキャンセル付き
- **tl;dv**: 無料プランが最も充実（無制限文字起こし）
- **Fathom**: 無制限録画無料、ボットなし
- **Fireflies**: Asanaネイティブ連携あり

### 既存の面談ワークフローとの関係
```
【現行】HiNote → Spectre検出（旧PC） → /mendan → 分析 → Asana + LINE
【将来】Circleback → Webhook/MCP → Claude分析 → Asana + LINE
```
- 現行のHiNote + Spectreは引き続き稼働中。Circlebackは並行テスト
- HiNoteのAPI対応を待ちつつ、Circlebackで自動化の可能性を検証

## 関連ファイル
- MCP設定: `~/.claude.json`（circleback セクション）
- インストーラー: `~/Downloads/CirclebackSetup.exe`（不要なら削除可）
- Circlebackデスクトップアプリ: Microsoft Store経由でインストール済み
