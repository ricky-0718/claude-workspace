---
name: upsider-kaikei
description: UPSIDER AI経理の月次対応 — 不明明細リスト回答・証憑提出・Slack報告を一括実行
---

# /upsider-kaikei — UPSIDER AI経理 月次対応コマンド

毎月1回、UPSIDERのAI経理サービスから届く「不明明細リスト」への回答と証憑提出を行う。

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
| 振込名 | 実態 | G列に記入する内容例 |
|--------|------|-------------------|
| アラ リキ | 新良理輝 | 役員報酬 |
| カハラ タクマ | 華原琢眞 | 給与（華原琢眞） |
| ハシヅメ ナオコ | 橋爪なおこ | TOEIC講座 業務委託費（橋爪なおこ） |
| ヒゴ ミミコ | 肥後美美子 | TOEIC講座 業務委託費（肥後美美子） |
| サワダ ミナ | 澤田弥奈 | 業務委託費（澤田弥奈） |
| 外国送金 | ASANO TRAVEL LTD（呉さん） | 台湾業務委託費（ASANO TRAVEL LTD） ※請求書で具体内容を確認 |
| 政策公庫 / ニッポンセイサクキン | 日本政策金融公庫 | 融資返済 |
| PE シナガワゼイム | 品川税務署 | 税金支払い |
| カ）エーアンドダブ | 自社口座間 | 自社口座間の資金移動 |
| ストライプジャパン | Stripe Inc. | Stripe売上入金 ※ペイアウト明細で確認 |
| ミツイスミトモカ | 三井住友カード | クレジットカード引落 |

## 注意事項（必ず遵守）
- **Edge専用**。Chrome禁止。`switch_browser` 禁止
- gws CLIで日本語を含むJSON → **Node.js `execSync`** 経由で書き込む（Bashから直接だとShift-JIS文字化け）
- Stripeペイアウトの詳細は **Stripe MCP** の `list_payment_intents` or `fetch_stripe_resources` で取得（`search_stripe_resources` は権限なし）
- Driveの証憑提出用フォルダはgws APIでは書き込み不可 → **Playwright経由でブラウザアップロード**
- Playwright MCPはClaude用フォルダ外のファイルにアクセス不可 → 一時コピーしてからアップロード

## ワークフロー

### Phase 1: 依頼内容の確認

1. **Slackチャンネルを確認**
   - Playwright で `https://app.slack.com/client/T090YD8MC11/C09A3AVQFAQ` を開く
   - UPSIDERからの最新メッセージを確認し、依頼内容を把握
   - 典型的な依頼: 不明明細リストへの回答、証憑提出、売上資料提出

2. **不明明細リストのシート名を確認**
   - gws CLIでスプレッドシートのシート一覧を取得:
     ```
     gws sheets spreadsheets get --params '{"spreadsheetId":"1kC_w-gDvrrQ7m2C_JKJSwwJsyCXbCi4P3TJtrpw9yCk","fields":"sheets.properties.title"}'
     ```
   - 対象月のシート名を特定（例: `2026年03月分`）

### Phase 2: 不明明細リストの回答

3. **未記入のG列セルを特定**
   - 対象シートのデータを取得:
     ```
     gws sheets spreadsheets values get --params '{"spreadsheetId":"1kC_w-gDvrrQ7m2C_JKJSwwJsyCXbCi4P3TJtrpw9yCk","range":"2026年XX月分!A1:H50"}'
     ```
   - G列（取引の詳細）が空のセルをリストアップ
   - C列（振込名/摘要）とD列（金額）から取引の種類を判定

4. **各取引の詳細を調査**

   **a) 通常の振込（人名カタカナ）**
   - 上記の対応表を参照して即座に記入

   **b) Stripe入金（ストライプジャパン）**
   - Stripe MCPで該当期間のペイアウトを確認:
     ```
     fetch_stripe_resources: resource=payouts, limit=10
     ```
   - 金額が一致するペイアウトを特定
   - ペイアウトに含まれる決済内容（商品名・顧客名）を確認:
     ```
     fetch_stripe_resources: resource=balance_transactions, payout=po_XXXXX
     ```
   - Stripeダッシュボードでペイアウト詳細ページのスクリーンショットを取得（証憑用）
   - G列への記入例: `Stripe売上入金（春休み留学2026参加費 3件 計660,000円、手数料差引後636,240円）`

   **c) 外国送金**
   - ローカルのASANO TRAVEL請求書を確認:
     ```
     ls "C:/Users/newgo/OneDrive/デスクトップ/A&W/請求書関連/呉さん支払い/"
     ```
   - PN番号付きのPDF請求書を読み、金額と日付から該当する銀行取引を特定
   - USD建ての場合: 金額 × 為替レート + 送金手数料 ≒ 銀行引落額
   - G列への記入例: `台湾業務委託費（ASANO TRAVEL LTD）中国語授業料 PN-0000000007 528,348円（3,442USD）`

   **d) その他不明な取引**
   - ユーザーに確認。不明な場合は「不明（確認中）」と記入

5. **G列に回答を書き込む**
   - Node.js `execSync` 経由でgws CLIを実行:
     ```javascript
     const { execSync } = require('child_process');
     const range = '2026年XX月分!G23';
     const value = 'Stripe売上入金（春休み留学2026参加費）';
     const params = JSON.stringify({spreadsheetId: '1kC_w-gDvrrQ7m2C_JKJSwwJsyCXbCi4P3TJtrpw9yCk', range: range, valueInputOption: 'RAW'});
     const json = JSON.stringify({values: [[value]]});
     execSync(`gws sheets spreadsheets values update --params '${params}' --json '${json}'`);
     ```

### Phase 3: 証憑のアップロード

6. **アップロード対象を準備**
   - Stripeペイアウト明細のスクリーンショット（Phase 2で取得済み）
   - ASANO TRAVEL支払通知書（`PN-*.pdf`）→ 外国送金がある場合
   - その他の請求書（肥後美美子のTOEIC講座請求書など）→ 依頼があれば

7. **Claude用フォルダに一時コピー**（Playwright制限対策）
   ```bash
   mkdir -p "C:/Users/newgo/Claude用/tmp-upload"
   cp "C:/Users/newgo/OneDrive/デスクトップ/A&W/請求書関連/呉さん支払い/ASANO TRAVEL LTD"*.pdf "C:/Users/newgo/Claude用/tmp-upload/"
   ```

8. **Google Driveにアップロード**
   - Playwright で `https://drive.google.com/drive/folders/1Jhjm6W4ZlkL8OsegtqGP1WObllCu1c41` を開く
   - 「新規」→「ファイルをアップロード」→ `browser_file_upload` で送信
   - Stripeスクリーンショット → 証憑提出用フォルダ直下
   - ASANO TRAVEL請求書 → 「海外送金」サブフォルダ
   - アップロード完了ダイアログを確認

9. **一時ファイルを削除**
   ```bash
   rm -rf "C:/Users/newgo/Claude用/tmp-upload"
   ```

### Phase 4: Slack完了報告

10. **Slackで @Coworker に報告**
    - Playwright で Slackチャンネルを開く
    - メッセージ入力欄に `@Co` を slowly タイプ → オートコンプリートで「Coworker (アプリ)」を選択（Enter）
    - 以下のフォーマットで報告メッセージを入力（Shift+Enter で改行）:

    ```
    @Coworker お世話になっております。株式会社A&Wの新良です。
    不明明細リストの回答と証憑の提出が完了しましたのでご報告いたします。

    【不明明細リスト】X月分「取引の詳細」列を記入済みです。
    【証憑提出】Google Driveの「01_証憑提出用」フォルダに以下をアップロードしました。
    ・[アップロードしたファイルの一覧]

    ご確認のほどよろしくお願いいたします。
    ```
    - **送信前にユーザーに確認を取る**（自動送信しない）

### Phase 5: 完了処理

11. **ハンドオフファイルを更新**
    - `tasks/handoff-upsider-accounting.md` の状態を「完了」に更新
    - 完了した作業内容を記録

12. **Asana日報に記入**（ユーザーの指示があれば）
    - タスク名例: `3/11 UPSIDER AI経理 不明明細回答＆証憑提出`

## トラブルシューティング

### gws CLIで日本語が文字化けする
→ Node.js `execSync` 経由で実行する。Bashから直接JSON送信しない

### Driveの証憑提出用フォルダにgws APIで書き込めない
→ 共有フォルダの権限制限。Playwright経由のブラウザアップロードで対応

### Stripe MCPの `search_stripe_resources` が権限エラーになる
→ Restricted Keyの制限。`list_payment_intents` や `fetch_stripe_resources` を使う

### Playwright MCPがClaude用フォルダ外のファイルにアクセスできない
→ 一時的にClaude用フォルダ内にコピーしてからアップロード。完了後に削除

### Slackのメッセージ入力欄が見つからない
→ スナップショットが大きい場合はPython/grepで `paragraph` の ref を検索

### Stripeダッシュボードに2FA要求される
→ ユーザーに手動で2FA完了してもらう。タイムアウト時はページリロード
