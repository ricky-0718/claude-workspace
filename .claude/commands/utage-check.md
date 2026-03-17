---
name: utage-check
description: UTAGEのLINEチャットをチェックし、返信が必要なメッセージに返信案を作成
---

# UTAGE LINEチャット チェック＆返信案作成

UTAGEのLINEチャットを確認し、未読・要対応メッセージに対して返信案を作成してメモに保存するワークフローを実行する。

## 注意事項（必ず遵守）
- **Edge専用**。Chrome禁止。`switch_browser` 禁止。
- 2つ目のアカウント「休止」は無視する
- メモ入力後は必ず「更新」ボタンを押す（`find`で「更新」ボタンを検索→クリック）
- Edge拡張切断時は `tabs_context_mcp` で再接続
- **LINE返信ルール**: `knowledge/operations/utage-line-rules.md` を必ず読んでから返信案を作成する
- **フィードバック履歴**: `knowledge/operations/utage-line-feedback.md` も参照し、過去の学びを反映する

## ワークフロー

### Step 1: UTAGE LINEチャットを開く
1. `tabs_context_mcp` で現在のタブ情報を取得
2. 新規タブを作成し、以下のURLに移動:
   `https://utage-system.com/account/hVTTIqwMtevI/line/talk`
3. ページが読み込まれるまで待機

### Step 2: 未読・要対応メッセージをスキャン
1. スクリーンショット（`read_page`）でチャットリスト全体を確認
2. 赤い「要対応」タグ、未読バッジのある友だちを特定
3. 各チャットをクリックして内容を確認
4. ラベル・メモ・対応ステータスも合わせて確認

### Step 3: 返信が必要なものをリストアップ
1. 優先度を判定:
   - 契約確定 > 新規相談 > 了解返信 > 単純お礼
2. 一覧をユーザーに提示し、対応方針を確認

### Step 4: 各メッセージの返信案を生成
1. `knowledge/operations/utage-line-rules.md` のルールを遵守して返信案を作成
2. `knowledge/operations/utage-line-feedback.md` の学んだパターンを反映する
3. 冒頭に `【返信案 M/DD】` のタグを付与（当日日付）
4. 返信案をユーザーに提示して確認を取る

### Step 5: メモ欄に返信案を保存
1. 各友だちのチャット → 右側メモ欄に返信案を追記
2. 既存メモがある場合は**末尾に追記**（上書きしない）
3. 入力後は必ず「更新」ボタンをクリックして保存を確定する
   - `find` で「更新」ボタンを探し、`ref` でクリック

### Step 6: 完了報告
- 保存した返信案の一覧サマリーを表示
- 対応済み件数と未対応件数を報告
