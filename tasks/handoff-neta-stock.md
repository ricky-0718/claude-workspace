# 引き継ぎ: SNSネタ自動ストックシステム

## ステータス: ✅ GASスクリプト実装完了（デプロイ待ち）

## 完了したこと

### 設計
- ブレインストーミング → アプローチ選定 → 詳細設計 → 実装計画 → コードレビュー
- 設計書: `docs/plans/2026-02-26-neta-stock-design.md`
- 実装計画: `docs/plans/2026-02-26-neta-stock-plan.md`

### 技術的決定事項
| 項目 | 決定 | 理由 |
|------|------|------|
| アーキテクチャ | GAS一本完結型 | シンプル・サーバー不要・安定稼働 |
| 収集方法 | Google Custom Search API | Botブロック回避。無料100回/日 |
| ネタ生成 | Claude API (GASから直接) | GAS一本で完結 |
| sns-agent-team連携 | 手動コピペ | GASからlocalhost不可。将来自動化可能 |
| 実行制限対策 | ラウンドロビン方式 | 5分おき×1テーマずつ |

### 実装済みGASスクリプト
- ファイル: `gas-scripts/neta-stock.gs` (577行)
- ローカルコピー: `C:\Users\newgo\Claude用\gas-scripts\neta-stock.gs`

#### 主要関数
| 関数 | 用途 | トリガー |
|------|------|---------|
| `collectContent()` | Custom Search APIで検索→収集データシートに保存 | 5分おき |
| `generateNeta()` | Claude APIでネタ生成→ネタストックシートに保存 | 毎日朝8時 |
| `setupTriggers()` | トリガー登録 | 手動1回 |
| `initHeaders()` | シートヘッダー初期化 | 手動1回 |
| `removeTriggers()` | トリガー削除 | 手動 |
| `testConnection()` | スプレッドシート接続テスト | 手動 |
| `testSearch()` | Custom Search APIテスト | 手動 |
| `testCollect()` | 収集処理テスト | 手動 |
| `testClaude()` | Claude API接続テスト | 手動 |
| `testGenerate()` | ネタ生成テスト | 手動 |

## 次のセッションでやること（デプロイ作業）

### ユーザー手動作業（GAS外）
1. **スプレッドシート新規作成**
   - 3シート作成: `設定`, `収集データ`, `ネタストック`
   - スプレッドシートIDをメモ

2. **Google Custom Search API セットアップ**
   - Google Cloud Console → Custom Search API 有効化
   - APIキー発行
   - Programmable Search Engine 作成（「ウェブ全体を検索」ON）
   - 検索エンジンID取得

3. **GASプロジェクト作成 & コード貼り付け**
   - `gas-scripts/neta-stock.gs` の内容をGASエディタに貼り付け
   - `CONFIG.SPREADSHEET_ID` にスプレッドシートIDを設定

4. **スクリプトプロパティに3つのキーを登録**
   - `CUSTOM_SEARCH_API_KEY`
   - `CUSTOM_SEARCH_ENGINE_ID`
   - `CLAUDE_API_KEY`

### テスト手順
```
initHeaders()       → ヘッダー設定
testConnection()    → 接続確認
testSearch()        → Custom Search API動作確認
testCollect()       → 収集処理テスト
testClaude()        → Claude API動作確認
testGenerate()      → ネタ生成テスト
```

### テスト用設定シートデータ
| テーマ | プラットフォーム | 検索クエリ | 最終実行日時 |
|--------|----------------|-----------|-------------|
| 台湾留学 | instagram | 台湾留学 おすすめ site:instagram.com | (空) |
| 台湾留学 | youtube | 台湾留学 vlog | (空) |
| キャリア | instagram | 海外キャリア 転職 | (空) |

### トリガー有効化
テスト成功後: `setupTriggers()` を実行

## 将来の拡張（スコープ外）
- [ ] GASからsns-agent-teamへの自動連携（ngrok or クラウドデプロイ時）
- [ ] スプレッドシート上の「生成」ボタンUI
- [ ] ナレッジ格納庫との連携
- [ ] ネタの重複検知（類似タイトル判定）

## sns-agent-teamの現状（参考）
- パス: `C:/Users/newgo/Claude用/sns-agent-team/`
- サーバー: Express on port 3847
- エージェント4体: trend-researcher, knowledge-analyst, content-planner, sns-writer
- API: `POST /api/generate` { theme, targetAudience, platforms }
