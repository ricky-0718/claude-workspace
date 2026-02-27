---
name: utage-lp
description: ウタゲLPの新規作成・編集ワークフロー
---

# ウタゲLP制作ワークフロー

## このコマンドについて
ウタゲ（Utage）のLP（ランディングページ）を制作・編集するためのガイド付きワークフロー。
ブラウザ自動化（Edge MCP）でウタゲ管理画面を操作する。

## 事前にメモリを読む
まず `memory/utage-lp-patterns.md` を読んで、ウタゲ編集の技術パターンを確認すること。

## ワークフロー

### Step 1: 要件確認
ユーザーに以下を確認:
1. **新規LP or 既存LP編集？**
   - 新規: フルHTML埋め込み or ビルダー構築
   - 既存編集: ハイブリッドアプローチ（テキスト更新 + カスタムHTML追加）
2. **ウタゲの管理画面URL**（ファネル → ページ → 編集画面）
3. **HTMLソース**（完成済みHTMLファイルのパス）
4. **LINE登録URL**（`https://utage-system.com/line/open/...`）
5. **フッターリンクURL**（プライバシーポリシー、特商法、会社概要）

### Step 2: HTMLソース準備（ローカル作業）
1. HTMLファイルを読み込む
2. LINE URLを一括差し替え（`href="#line"` → 実URL）
3. 編集しやすいポイントにHTMLコメント追加（`<!-- ★編集ポイント: ... -->`）
4. フッターリンクを実URLに更新
5. 各変更をコミット

### Step 3: ウタゲ編集（ブラウザ自動化）
1. `tabs_context_mcp` でEdgeに接続
2. ウタゲ管理画面を開く
3. **既存テキスト更新**: CKEditor APIで `setData()` を使用
4. **新セクション追加**: カスタムHTMLエレメントを追加し、HTMLを入力
5. 保存ボタンをクリック → ネットワークで200 OK確認

### Step 4: 検証
1. プレビューURLをリロード
2. JavaScript `document.body.innerText.includes()` で全セクション確認
3. LINE URLの存在確認
4. フッターリンク確認

### Step 5: 完了報告
- 変更内容のサマリーをユーザーに報告
- git commit & merge の確認

## 重要な注意事項
- **ブラウザ**: 必ずEdge MCP。Chrome禁止。`switch_browser` 禁止。
- **保存忘れ**: プレビューは保存後にリロードしないと反映されない
- **CKEditorのID**: ダブルクリック→ `Object.keys(CKEDITOR.instances)` で確認
- **カスタムHTML**: `<style>` タグOK、`<script>` タグは要注意
- **LINE URL変換**: ウタゲがトラッキング用に自動変換する（正常動作）
