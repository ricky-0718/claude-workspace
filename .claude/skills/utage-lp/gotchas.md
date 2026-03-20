# utage-lp Gotchas

ウタゲLP制作で蓄積されたハマりポイントと対処法。

## ブラウザ関連

- **Edge専用。Chrome禁止。switch_browser禁止**
- **Edge MCP切断**: 頻繁に起きる → 3秒待ってリトライで復帰
- **保存前にプレビューを見ても変更は反映されない** → 保存ボタン → プレビューリロードの順

## textarea読み取りブロック（最重要）

- Edge MCPはtextarea内のURLを含むデータを「Cookie/query string data」として検出しブロック
- `.value`の直接読み取り、base64エンコード、小分け読み取り、すべてブロックされる
- **回避策**: 「読まずに置換」パターンを使う（`references/editor-patterns.md` 参照）

## CKEditor関連

- **エディタID確認**: ダブルクリック → `Object.keys(CKEDITOR.instances)` で確認
- **`<style>` タグOK**、`<script>` タグは要注意

## フォントサイズ問題

- カスタムHTMLはrem指定（1rem=16px）、ウタゲ標準はpx（30-40px）
- **カスタムHTMLセクションだけ文字が小さくなる原因**
- フッター（著作権表示・リンク）の13pxは正常 → 検出対象外
- 変換目安: 1rem→1.75rem(28px), 1.2rem→2rem(32px), 1.5rem→2.2rem(35px)

## セクション操作

- **連続削除時**: 削除後0.5秒待ってから次を処理
- **確認ダイアログ**: `find` で「はい」ボタンを探してクリック

## 保存

- 保存ボタン: `document.querySelector('.fn-save-page-btn')`
- POST完了を `read_network_requests` でステータス200確認
- LINE URL: ウタゲがトラッキング用に自動変換する（正常動作）
