---
name: upsider-kaikei
description: |
  UPSIDER AI経理の月次対応 — 不明明細リスト回答・証憑提出・Slack報告を一括実行。
  Trigger when: ユーザーが「UPSIDER対応して」「不明明細の回答」「AI経理」「証憑提出」「経理の月次対応」と言ったとき、
  またはops-managerエージェントがUPSIDER業務を実行するとき。
  Do NOT trigger for: 日常の経費精算、Freee操作、給料支払い
hooks:
  PreToolUse:
    - matcher: "Bash"
      type: prompt
      prompt: |
        UPSIDER経理スキル: Bashコマンド実行前の金額チェック。
        このコマンドがGoogle Sheetsへの書き込み（gws sheets）を含む場合:
        1. 書き込む金額がSpreadsheetのD列（元データ）と矛盾しないか
        2. 振込名→実態の対応が data/transaction-map.json と一致するか
        問題があれば 'deny' で理由を説明。問題なければ 'allow'。
  Stop:
    - matcher: "*"
      type: prompt
      prompt: |
        UPSIDER経理の完了前チェック:
        1. 全ての未記入G列セルに回答を書き込んだか？
        2. 証憑のアップロードは完了したか？
        3. Slack報告文をユーザーに確認してもらったか（自動送信していないか）？
        未完了があれば 'block'。全て完了なら 'approve'。
---

# UPSIDER AI経理 月次対応

毎月1回、UPSIDERのAI経理サービスから届く「不明明細リスト」への回答と証憑提出を行う。

## Gotchas

技術的な注意点・トラブルシューティングは `gotchas.md` を参照。

## 実行ログ

過去の実行履歴は `execution-log.md` を参照。新しい振込パターンが見つかったら `data/transaction-map.json` も更新すること。

## 前提情報

### アカウント・認証
- **gws CLI**: `newgoodriki@gmail.com` で認証中（Sheets/Drive操作用）
- **Slack**: `ricky@ryugaku101.com`（Playwright経由でブラウザ操作）
- **Stripe**: MCP設定済み（`.mcp.json`）。Restricted Key使用

### 主要リソース
| リソース | ID / URL |
|----------|----------|
| 不明明細リスト（Spreadsheet） | `1kC_w-gDvrrQ7m2C_JKJSwwJsyCXbCi4P3TJtrpw9yCk` |
| 売上一覧（Spreadsheet） | `1BKNFmTfagQkPGhtDxeHe4EN70lZA8KOqjLzo1n_OjOo` |
| 証憑提出用フォルダ（Drive） | `1Jhjm6W4ZlkL8OsegtqGP1WObllCu1c41` |
| Slackチャンネル | `collab_aandw_upsider` — `https://app.slack.com/client/T090YD8MC11/C09A3AVQFAQ` |
| ASANO TRAVEL請求書（ローカル） | `C:\Users\newgo\OneDrive\デスクトップ\A&W\請求書関連\呉さん支払い\` |
| 肥後美美子請求書（ローカル） | `C:\Users\newgo\OneDrive\デスクトップ\A&W\請求書関連\` |

### 振込名 → 実態の対応表

構造化データは `data/transaction-map.json` を参照。以下は概要:

| 振込名 | 実態 |
|--------|------|
| アラ リキ | 新良理輝（役員報酬） |
| カハラ タクマ | 華原琢眞（給与） |
| ストライプジャパン | Stripe売上入金 |
| 外国送金 | ASANO TRAVEL LTD |

全マッピングは `data/transaction-map.json` に12件定義済み。

## ワークフロー

### Phase 1: 依頼内容の確認

1. **Slackチャンネルを確認**
   - Playwright で `https://app.slack.com/client/T090YD8MC11/C09A3AVQFAQ` を開く
   - UPSIDERからの最新メッセージを確認し、依頼内容を把握

2. **不明明細リストのシート名を確認**
   - gws CLIでスプレッドシートのシート一覧を取得:
     ```
     gws sheets spreadsheets get --params '{"spreadsheetId":"1kC_w-gDvrrQ7m2C_JKJSwwJsyCXbCi4P3TJtrpw9yCk","fields":"sheets.properties.title"}'
     ```
   - 対象月のシート名を特定（例: `2026年03月分`）

### Phase 2: 不明明細リストの回答

3. **未記入のG列セルを特定**
   - 対象シートのデータを取得
   - G列（取引の詳細）が空のセルをリストアップ
   - C列（振込名/摘要）とD列（金額）から取引の種類を判定

4. **各取引の詳細を調査**

   **a) 通常の振込（人名カタカナ）**
   - `data/transaction-map.json` を参照して即座に記入

   **b) Stripe入金（ストライプジャパン）**
   - Stripe MCPで該当期間のペイアウトを確認
   - 金額が一致するペイアウトを特定し、含まれる決済内容を確認
   - Stripeダッシュボードでスクリーンショットを取得（証憑用）

   **c) 外国送金**
   - ローカルのASANO TRAVEL請求書を確認
   - PN番号付きのPDF請求書を読み、金額と日付から該当する銀行取引を特定

   **d) その他不明な取引**
   - ユーザーに確認。不明な場合は「不明（確認中）」と記入

5. **G列に回答を書き込む**
   - `scripts/gws-write.mjs` を使用して日本語テキストを書き込む:
     ```
     node .claude/skills/upsider-kaikei/scripts/gws-write.mjs "SPREADSHEET_ID" "RANGE" "VALUE"
     ```

### Phase 3: 証憑のアップロード

6. **アップロード対象を準備**
   - Stripeペイアウト明細のスクリーンショット
   - ASANO TRAVEL支払通知書（外国送金がある場合）
   - その他の請求書（依頼があれば）

7. **Claude用フォルダに一時コピー**（Playwright制限対策）
   ```bash
   mkdir -p "C:/Users/newgo/Claude用/tmp-upload"
   cp [対象ファイル] "C:/Users/newgo/Claude用/tmp-upload/"
   ```

8. **Google Driveにアップロード**
   - Playwright で証憑提出用フォルダを開く
   - `browser_file_upload` で送信
   - アップロード完了を確認

9. **一時ファイルを削除**

### Phase 4: Slack完了報告

10. **Slackで報告**
    - メッセージフォーマット:
    ```
    @Coworker お世話になっております。株式会社A&Wの新良です。
    不明明細リストの回答と証憑の提出が完了しましたのでご報告いたします。

    【不明明細リスト】X月分「取引の詳細」列を記入済みです。
    【証憑提出】Google Driveの「01_証憑提出用」フォルダにアップロードしました。
    ・[アップロードしたファイルの一覧]

    ご確認のほどよろしくお願いいたします。
    ```
    - **送信前にユーザーに確認を取る**（自動送信しない）

### Phase 5: 完了処理

11. **ハンドオフ更新・Asana日報記入**（ユーザーの指示があれば）
