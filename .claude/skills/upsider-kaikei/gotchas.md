# upsider-kaikei Gotchas

UPSIDER AI経理対応で蓄積されたハマりポイントと対処法。

## gws CLI関連

- **日本語JSONをBashから直接送ると文字化けする** → Node.js `execSync` 経由で実行。`scripts/gws-write.mjs` を使う
- **シート名に年月が含まれる** → 毎月シート名の確認が必要。`2026年03月分` のような形式
- **範囲指定ミス** → A1:H50 のように余裕を持って取得し、空行でデータ末尾を判定

## Stripe関連

- **`search_stripe_resources` は権限エラー** → Restricted Keyの制限。`fetch_stripe_resources` を使う
- **ペイアウト金額は手数料差引後** → 元の決済金額の合計とは一致しない。差額がStripe手数料
- **ペイアウト詳細の取得** → `fetch_stripe_resources: resource=balance_transactions, payout=po_XXXXX`
- **2FA要求** → Stripeダッシュボードにアクセス時に2FA要求された場合はユーザーに手動対応を依頼

## Drive関連

- **証憑提出用フォルダはgws APIで書き込み不可** → 共有フォルダの権限制限。Playwright経由でブラウザアップロード
- **Playwright MCPはClaude用フォルダ外のファイルにアクセス不可** → 一時的にClaude用フォルダ内にコピーしてからアップロード。完了後に削除

## ブラウザ関連

- **Edge専用。Chrome禁止。`switch_browser` 禁止**
- **Slackのメッセージ入力欄が見つからない** → スナップショットが大きい場合はgrepで `paragraph` の ref を検索
- **Slack @メンション** → `@Co` を slowly タイプ → オートコンプリートで「Coworker (アプリ)」を選択

## 外国送金関連

- **USD建ての計算** → 金額 × 為替レート + 送金手数料 ≒ 銀行引落額。完全一致はしない
- **PN番号** → ASANO TRAVEL請求書の識別子。G列記入時に含める
