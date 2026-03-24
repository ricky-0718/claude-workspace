# Spectre Evolution — 新規セッション用ハンドオフ

## このファイルは何？
Spectre（claude-office/の24時間自律AIエージェント）を4段階で進化させるプロジェクトのハンドオフ文書。
新規セッションはこのファイルを読んでから実装を開始すること。

---

## やること（1行サマリー）
SpectreにOpenClaw水準の4機能を追加: **Skillsプラグイン / 顧客メモリ / 双方向LINE / 承認ワークフロー**

## 実装プラン
`docs/superpowers/plans/2026-03-12-spectre-evolution.md` ← **これが本体。全コード・全手順が書いてある。**

---

## 前提知識: Spectreの現在の構造

### コアファイル（読む順）
1. `claude-office/config.js` — .env読み込み（Chatwork/LINE/Deploy設定）
2. `claude-office/server.js` — Express API (port 3848)、エージェント管理、ルート定義
3. `claude-office/pipeline.js` — 30秒ポーリング → Chatwork → 返信案生成 → LINE通知
4. `claude-office/chatwork-poller.js` — Chatwork API、UTAGE通知パース
5. `claude-office/draft-generator.js` — Claude CLIで返信案生成、プロンプト構築
6. `claude-office/claude-runner.js` — Claude CLI ヘッドレス実行エンジン
7. `claude-office/notifier.js` — LINE Messaging API Push通知

### 現在の処理フロー
```
Chatwork (30秒ポーリング)
  → UTAGE LINE通知を検知
  → パース（送信者名・メッセージ・UTAGE URL）
  → LINE Push通知（新着通知）
  → Claude CLI で返信案生成
  → LINE Push通知（返信案）
  → data/drafts/ にJSON保存
```

### 環境
- **実行場所**: 旧PC (hp-spectre-14)、24時間稼働
- **開発場所**: 新PC (ricky-omnibook)、Claude Code セッション
- **デプロイ方法**: `POST http://100.74.20.91:3848/api/deploy` + `{ secret: .envのDEPLOY_SECRET }`
- **Node.js**: フルパス必要 `"C:/Program Files/nodejs/node.exe"`
- **Cloudflare Tunnel**: Quick Tunnel（URL動的。`GET /api/tunnel-url` で取得）

---

## 実装手順（概要）

### Phase 1: Skills プラグインシステム（Task 1-3）
1. `skills/registry.js` — コマンド→Skillルーティング
2. `skills/loader.js` — ディレクトリからSkill自動発見
3. `skills/utage-reply/index.js` — 既存の返信案生成をSkill化
4. `skills/system-status/index.js` — 動作確認用コマンドSkill
5. `server.js` 修正 — loadAllSkills()呼び出し + /api/skills エンドポイント
6. `pipeline.js` 修正 — Skill トリガー経由に変更

### Phase 2: 顧客メモリ（Task 4-5）
1. `memory/customer-store.js` — 顧客プロフィールCRUD
2. `pipeline.js` 修正 — 受信時に会話記録
3. `draft-generator.js` 修正 — プロンプトに顧客コンテキスト注入
4. `server.js` 修正 — /api/customers エンドポイント

### Phase 3: 双方向LINE通信（Task 6-8）
1. `config.js` 修正 — LINE_CHANNEL_SECRET 追加
2. `webhook/line-handler.js` — Webhook受信・コマンドルーティング・Claudeフォールバック
3. `server.js` 修正 — POST /webhook/line ルート追加
4. `skills/email-check/index.js` — Gmail確認スキル
5. `skills/asana-report/index.js` — Asana報告スキル
6. LINE Developers Console で Webhook URL 設定（手動）

### Phase 4: 承認ワークフロー（Task 9-11）
1. `approval/manager.js` — 承認状態管理
2. `webhook/line-handler.js` 修正 — 承認応答ハンドリング
3. `skills/utage-reply/index.js` 修正 — 承認フロー組み込み
4. `server.js` 修正 — /api/approvals エンドポイント
5. デプロイ & E2Eテスト

---

## 作業の始め方

### 1. ワークツリー作成
```bash
cd "C:/Users/newgo/Claude用"
git worktree add .worktrees/spectre-evolution -b feature/spectre-evolution master
```

### 2. 実装プランを開く
```
docs/superpowers/plans/2026-03-12-spectre-evolution.md
```
このプランに全コード・全手順が書いてある。Task 1から順番に実装する。

### 3. 各Phaseの完了後
- ローカルテスト: `cd claude-office && "C:/Program Files/nodejs/node.exe" server.js`
- 動作確認: `curl http://localhost:3848/api/skills`

### 4. 全Phase完了後
- masterにマージ
- 旧PCにデプロイ: `POST http://100.74.20.91:3848/api/deploy`
- LINE Developers Console で Webhook URL設定
- LINEからE2Eテスト

---

## 注意事項

### セキュリティ
- LINE Webhook は `config.line.userId` でオーナーのみ受付（他ユーザーは無視）
- 署名検証 (`X-Line-Signature`) を必ず行う
- Claude CLI フォールバックのタイムアウトは2分

### コーディングルール
- ES Modules (`import/export`) を使用（`require` 不可）
- ファイルパスは `fileURLToPath(import.meta.url)` で取得
- `.env` は `config.js` 経由でアクセス（`process.env` 直参照しない）
- エラーは `console.error` + 適切なHTTPステータスコード

### LINE API の注意
- Reply API の `replyToken` は1回しか使えない（15秒以内）
- 長時間処理はReplyで「処理中」→Pushで結果送信
- テキストメッセージ上限: 5000文字

### デプロイ
- `restart.bat` が失敗することがある → 旧PCで手動 `start.bat` 実行が必要な場合あり
- Cloudflare Tunnel URL は再起動で変わる → LINE Webhook URL の再設定が必要

---

## ファイル一覧（全体像）

### 新規作成（10ファイル）
```
claude-office/skills/registry.js
claude-office/skills/loader.js
claude-office/skills/utage-reply/index.js
claude-office/skills/system-status/index.js
claude-office/skills/email-check/index.js
claude-office/skills/asana-report/index.js
claude-office/memory/customer-store.js
claude-office/webhook/line-handler.js
claude-office/approval/manager.js
```

### 修正（4ファイル）
```
claude-office/server.js      — Skills loader, 新APIルート, Webhookルート
claude-office/pipeline.js    — Skill トリガー経由、顧客メモリ記録
claude-office/draft-generator.js — 顧客コンテキスト注入
claude-office/config.js      — LINE_CHANNEL_SECRET追加
```

### 変更なし
```
claude-office/claude-runner.js
claude-office/chatwork-poller.js
claude-office/notifier.js (replyToLine は webhook/line-handler.js 内に実装)
```
