# P&L分析 Gotchas

## gws CLI

- `@file` 構文は動かない → `$(cat file)` パターンを使う
- `execFileSync` は `.cmd` ファイルに対応しない → `execSync` + `shell:'bash'`
- JSON が大きいと `Argument list too long` → シート別に分割して実行
- 日本語JSONはBashのcurlで文字化け → Node.js経由で送信
- `+read` ヘルパーはシート名にシングルクォート不要、`values update` 等ではクォート必要

## Google Sheets API

- `insertDimension` で行挿入すると既存の数式参照は自動調整される
- `values append` + `INSERT_ROWS` はデータの先頭に挿入されることがある（意図と逆）→ 位置を明示したい場合は `values update` を使う
- `repeatCell` の `fields` マスクを正しく指定しないと背景色が汚染される → 変更したいプロパティだけを指定
- シートの最大行数を超える範囲に `values update` するとエラー → 先に `insertDimension` で行を追加するか `values append` を使う

## Freee

- ログイン必須 → Playwright MCP（CDP接続のEdge）でアクセス
- 総勘定元帳のURLは `name` パラメータをURLエンコードする
- 出力が大きい場合ファイルに保存される → Node.jsで解析
- 会計期間（fiscal_year_id）はFreeeのページヘッダーから確認

## 二重計上（最重要）

Freee実績をそのまま総合P&Lに入れると、プロダクトP&Lに既に含まれている費用と重複する。
**必ずユーザーに1つずつ確認すること。**

4期生で発生した実例:
- ASANO TRAVEL（旅費交通費）→ AIO P&Lの住宿費に含まれていた
- BASE（消耗品費）→ AIO P&Lの教科書代に含まれていた
- 台湾留学ドットコム（研修費）→ AIO P&Lの教科書代に含まれていた

## デザイン

- 書式を一括クリアしてからやり直す方が安全: `updateCells` + `fields: 'userEnteredFormat'`
- 大量のformatリクエスト（100+）は1回で送ると `Argument list too long` → シート別に分割
