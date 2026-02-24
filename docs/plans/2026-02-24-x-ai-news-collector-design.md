# X AI情報自動収集システム - 設計ドキュメント

## 概要
X（Twitter）からAI関連の最新情報を自動収集し、
Asana「自己投資図書館」プロジェクトの「みんなの発見」セクションにタスクとして追加する。

## アーキテクチャ
```
X API v2 (従量課金)
    │
    ↓ 検索クエリ実行（1日1回）
    │
GAS (Google Apps Script)
    │
    ├─ キーワードフィルタ
    ├─ 品質フィルタ（いいね数・RT数）
    ├─ 重複チェック（処理済みツイートID管理）
    │
    ↓
Asana API
    │
    ↓ タスク作成
    │
「みんなの発見」セクション
```

## コスト見積もり
- X API: 従量課金制（前払いクレジット）
- 最低チャージ: $5（約800円）
- 読み取り単価: $0.005/ツイート
- 1日20件取得 × 30日 = 600件/月 = $3/月（約450円）
- $5チャージで約1ヶ月半持つ

## X API設定

### 必要なもの
1. X Developer Portal アカウント（https://developer.x.com/）
2. APIキー（Bearer Token）
3. $5以上のクレジットチャージ

### 使用エンドポイント
- `GET /2/tweets/search/recent` - 直近7日間のツイート検索
- レートリミット: 450リクエスト/15分

### 検索クエリ案
```
(Claude Code OR "AI agent" OR "LLM" OR エージェントAI OR 生成AI)
lang:ja min_faves:10 -is:retweet -is:reply
```

## GAS設計

### スクリプトプロパティ
- `X_BEARER_TOKEN`: X API Bearer Token
- `ASANA_PAT`: Asana Personal Access Token

### 定数
```javascript
const CONFIG = {
  ASANA_PROJECT_ID: '1213405447562397',
  ASANA_SECTION_GID: '（みんなの発見セクションのGID）',
  PROCESSED_SHEET_NAME: 'ProcessedTweets',
  SEARCH_QUERY: '(Claude Code OR "AI agent" OR エージェントAI OR 生成AI) lang:ja min_faves:10 -is:retweet -is:reply',
  MAX_RESULTS: 20,
};
```

### メイン処理フロー
1. X API で検索クエリを実行
2. 結果をパース（ツイートID、本文、著者、URL、いいね数）
3. Google Sheetsで処理済みツイートIDを確認（重複排除）
4. 新規ツイートをAsana APIでタスクに変換
5. 処理済みIDをシートに記録

### Asanaタスクのフォーマット
- タスク名: `【X】{ツイート本文の先頭40文字}...`
- 説明:
  ```
  📱 ツイート元
  {著者名} (@{スクリーンネーム})

  📝 内容
  {ツイート全文}

  🔗 元ツイート
  https://x.com/{screen_name}/status/{tweet_id}

  ❤️ いいね: {数} | 🔄 RT: {数}
  📅 投稿日: {日付}
  ```

### トリガー
- 毎朝 9:00 に自動実行（timeBased トリガー）

## 実装ステップ
1. [ ] X Developer Portal でアカウント作成 & $5チャージ
2. [ ] Bearer Token を取得
3. [ ] Asana PAT を取得（既にあれば流用）
4. [ ] 「みんなの発見」セクションのGIDを確認
5. [ ] GASプロジェクトを作成
6. [ ] 処理済みツイート管理用のGoogle Sheetsを作成
7. [ ] GASコードを実装
8. [ ] テスト実行
9. [ ] 毎朝トリガーを設定

## 品質フィルタ案
- `min_faves:10` - 最低10いいね以上（ノイズ除去）
- `-is:retweet` - リツイートは除外（オリジナル投稿のみ）
- `-is:reply` - リプライは除外
- `lang:ja` - 日本語ツイートのみ

## 拡張案
- いいね数に応じてAsanaタスクの優先度を変える
- 特定のAIインフルエンサーのリストを作成して優先的に収集
- 週次サマリーを自動生成

## 日付
- 設計日: 2026-02-24
