---
name: utage-lp
description: |
  ウタゲLPの新規作成・編集ワークフロー。ブラウザ自動化でウタゲ管理画面を操作する。
  Trigger when: ユーザーが「LPを作りたい」「LP編集して」「ウタゲのページ修正」「UTAGEのLP」と言ったとき、
  またはlp-architectエージェントがUTAGE LP制作を実行するとき。
  Do NOT trigger for: LP戦略の相談（lp-architectが直接対応）、CVR分析のみの場合
hooks:
  PreToolUse:
    - matcher: "mcp__playwright__browser_click"
      type: prompt
      prompt: |
        ウタゲLP保存ボタンのクリック検出。
        クリック対象が保存ボタン（.fn-save-page-btn）の場合:
        1. font-check スクリプトを実行済みか？（22px未満の要素がないか確認済みか）
        2. color-check スクリプトを実行済みか？（濃い背景に黒文字がないか確認済みか）
        未実行の検証がある場合は 'deny' で「先に検証スクリプトを実行してください」と返す。
        保存ボタン以外のクリックなら 'allow'。
---

# ウタゲLP制作ワークフロー

ウタゲ（Utage）のLP（ランディングページ）を制作・編集するためのガイド付きワークフロー。
ブラウザ自動化（Edge MCP）でウタゲ管理画面を操作する。

## Gotchas

技術的な注意点・ハマりポイントは `gotchas.md` を参照。

## 実行ログ

過去のLP編集履歴は `execution-log.md` を参照。ハマりポイントや検証結果を蓄積する。

## エディタ技術パターン

CKEditor操作、カスタムHTML編集、DOM構造などの詳細な技術パターンは `references/editor-patterns.md` を参照。

## ワークフロー

### Step 1: 要件確認
ユーザーに以下を確認:
1. **新規LP or 既存LP編集？**
   - 新規: フルHTML埋め込み or ビルダー構築
   - 既存編集: セクション削除/並べ替え、テキスト更新、デザイン修正
2. **ウタゲの管理画面URL**（ファネル → ページ → 編集画面）
3. **原稿ファイル**（mdファイルのパス。セクション構成の正解を決める基準）
4. **HTMLソース**（新規の場合。完成済みHTMLファイルのパス）
5. **LINE登録URL**（`https://utage-system.com/line/open/...`）
6. **フッターリンクURL**（プライバシーポリシー、特商法、会社概要）

### Step 2: 現状分析（既存LP編集の場合）
1. プレビューページでセクション一覧をJSで取得
2. 原稿ファイルと突き合わせて差分を特定
3. 修正計画をユーザーに提示して承認を得てから着手

### Step 3: HTMLソース準備（新規LPの場合）
1. HTMLファイルを読み込む
2. LINE URLを一括差し替え（`href="#line"` → 実URL）
3. フッターリンクを実URLに更新
4. 各変更をコミット

### Step 4: ウタゲ編集（ブラウザ自動化）
1. `tabs_context_mcp` でEdgeに接続
2. ウタゲ管理画面を開く
3. 作業内容に応じて実行（詳細は `references/editor-patterns.md` 参照）:
   - **セクション削除**: ×ボタン → 確認ダイアログ「はい」
   - **テキスト更新**: CKEditor API `setData()`
   - **カスタムHTML編集**: 「読まずに置換」パターン + Vueイベント発火
   - **新セクション追加**: カスタムHTMLエレメント追加
4. 保存ボタンをクリック → ネットワークで200 OK確認

### Step 5: 検証
1. プレビューURLをリロード
2. `scripts/font-check.mjs` のスクリプトで全セクション確認（22px未満の要素検出）
3. `scripts/color-check.mjs` のスクリプトで背景色/文字色の整合性チェック
4. LINE URLの存在確認
5. フッターリンク確認

### Step 6: 完了報告
- 変更内容のサマリーをユーザーに報告
- git commit & merge の確認

## 検証スクリプト

- **フォントサイズ検証**: `scripts/font-check.mjs` — プレビューページで `browser_evaluate` 実行。22px未満のテキスト要素を検出
- **背景色/文字色検証**: `scripts/color-check.mjs` — 濃い背景色のセクションで文字色がデフォルト黒のまま読めない箇所を検出

## 重要な注意事項

- **ブラウザ**: 必ずEdge MCP。Chrome禁止。`switch_browser` 禁止
- **保存忘れ**: プレビューは保存後にリロードしないと反映されない
- **LINE URL変換**: ウタゲがトラッキング用に自動変換する（正常動作）
