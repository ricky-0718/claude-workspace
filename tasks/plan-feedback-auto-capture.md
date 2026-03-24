# SessionEnd フィードバック自動キャプチャ 実装計画

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** セッション終了時に会話トランスクリプトを自動分析し、記録すべきフィードバック（ユーザーからの修正・指摘）があればターミナルに提案を表示する

**Architecture:** SessionEnd commandフック → Node.jsスクリプト → トランスクリプトJSONL読み込み → Claude Code CLI（別プロセス）で分析 → 結果をターミナル表示

**Tech Stack:** Node.js, Claude Code CLI (claude --print), JSONL parsing

---

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `C:/Users/newgo/.claude/feedback-capture.js` | SessionEndフックから呼ばれるメインスクリプト |
| `C:/Users/newgo/.claude/settings.json` | SessionEndフック追加 |

## 設計判断

### なぜNode.jsか
- 既存のSessionStartフックがNode.jsで動いている（統一性）
- Windows環境でJSONL解析がBashより安定
- execFileSyncでClaude CLIを安全に呼べる

### なぜ別プロセスのClaude CLIか
- 現セッションのコンテキストを消費しない
- claude --print で非対話的に実行 → 結果をstdoutに出力
- 無限ループ防止: 環境変数 FEEDBACK_CAPTURE_RUNNING=1 で再帰防止

### スコープ限定: フィードバックのみ
- CLAUDE.md更新提案はやらない（ユーザーが意図的に編集するもの）
- knowledge整合性チェックはやらない（/team-auditで十分）
- 記録すべきフィードバックのみに特化:
  - ユーザーが修正・訂正した内容
  - 「それは違う」「こうして」系の指示
  - 繰り返し出てくるパターン

---

### Task 1: feedback-capture.js の作成

**Files:**
- Create: `C:/Users/newgo/.claude/feedback-capture.js`

- [ ] **Step 1: スクリプト作成**

主要ロジック:
1. stdinからフック入力JSON読み取り → transcript_path取得
2. JSONLファイルからuserメッセージを抽出（修正・指摘パターン検出）
3. execFileSyncでClaude CLI（haiku）を別プロセス起動、会話要約を分析
4. フィードバック検出時のみターミナルに提案表示

安全性:
- execFileSync使用（shell injection防止）
- 環境変数FEEDBACK_CAPTURE_RUNNING=1で無限ループ防止
- CLAUDECODE/CLAUDE_CODE_ENTRYPOINT環境変数を除去（入れ子セッション防止）
- 60秒タイムアウト、エラーは全て静かに無視

- [ ] **Step 2: スクリプトの動作確認**

Run: テスト用JSONを標準入力に渡して即終了を確認

---

### Task 2: settings.json にSessionEndフック追加

**Files:**
- Modify: `C:/Users/newgo/.claude/settings.json` (ユーザーグローバル)

- [ ] **Step 3: SessionEndフックを追加**

既存の hooks オブジェクトに SessionEnd を追加（90秒タイムアウト）

- [ ] **Step 4: settings.jsonの構文確認**

Run: JSON.parse()でバリデーション

---

### Task 3: テスト実行

- [ ] **Step 5: Claude CLIのパス特定とテスト**

CLAUDE.mdに記載の通り APPDATA/Claude/claude-code/ 以下をスキャン。
手動でtranscript_pathを渡してテスト実行。

---

## 注意事項
- --model haiku で分析（コスト最小化）
- 60秒タイムアウト（セッション終了をブロックしすぎない）
- 4メッセージ未満の短い会話はスキップ
- エラーは全て静かに無視（セッション終了の邪魔をしない）
