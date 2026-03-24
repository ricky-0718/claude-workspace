# Claude Office v2 — 3機能追加プラン

## Context
Claude Officeダッシュボードに以下の3機能を追加する:
1. **作業ログの永続化** — サーバー再起動してもログが消えない
2. **複数キャラクター対応** — 同時稼働する複数セッションを異なるキャラとして表示
3. **ダッシュボードから指示送信** — サイトから指示を投稿 → Claude Codeが受け取れる

## 技術設計

### データ永続化 (`data/` ディレクトリ)
```
claude-office/data/
├── agents.json        # エージェント情報 (各セッション)
├── activity.json      # 作業ログ (最新100件)
└── instructions.json  # 指示キュー
```
サーバーはメモリ上で管理し、変更時にファイルへ同期書き込み。起動時にファイルから読み込む。

### 1. 作業ログ永続化

**server.js変更:**
- `setState()` 内でactivityログエントリを追加
- エントリ形式: `{ agent, state, detail, time }`
- 最大100件保持、超過分は古いものから削除
- `GET /activity` — ログ全件返却

**app.js変更:**
- 起動時に `GET /activity` でログを取得して表示
- ポーリングで差分を取得（updatedAt比較）

### 2. 複数キャラクター対応

**セッション識別:** Hook payloadの `session_id` フィールドを使用

**自動命名ルール（ツール使用傾向ベース）:**
| 傾向 | 名前 | 色 |
|------|------|-----|
| Edit/Write 多い | コード班 | #4A90D9 (青) |
| Grep/Read/Agent 多い | 調査班 | #6B8E23 (緑) |
| Bash 多い | 実行班 | #DAA520 (金) |
| WebFetch/WebSearch 多い | 通信班 | #9370DB (紫) |
| 混合/新規 | 総合班 | #E8956A (サーモン) |

**server.js変更:**
- `agents` Map: session_id → `{ name, state, detail, color, updatedAt, toolCounts }`
- `POST /set_state` に `session_id` パラメータ追加
- ツール使用回数を `toolCounts` に蓄積し、最多カテゴリから名前を自動決定
- 5分以上更新なしのエージェントは「オフライン」扱い
- `GET /status` が全エージェント配列を返却

**hook.js変更:**
- payloadから `session_id` を読み取り、POSTに含める

**app.js変更:**
- 複数キャラクターを描画（各々異なる色・位置）
- 同じゾーンに複数いる場合は少しずらして配置
- 各キャラの上に名前付き吹き出し（例: 「コード班: 執筆中」）
- 右パネルをエージェント一覧に変更

### 3. ダッシュボードから指示送信

**server.js追加API:**
- `POST /instructions` — `{ text }` → キューに追加（ID自動生成）
- `GET /instructions` — 全指示（pending/done）を返却
- `POST /instructions/:id/done` — 完了マーク
- `GET /instructions/count` — pending件数のみ（ステータスライン用）

**通知ファイル連携（ステータスライン）:**
- 指示変更時に `~/.claude/office-notifications.json` に `{ pending: N }` を書き出す
- statusline.js がこのファイルを読み、`📋 N件の指示` と表示

**app.js変更:**
- 下部パネルに「指示を送る」入力フォームを追加
- 指示一覧表示（pending/done切り替え）
- 送信ボタンで `POST /instructions`
- Claude Codeで `node set-state.js instructions` → 未処理の指示を表示

**statusline.js変更:**
- `~/.claude/office-notifications.json` を読み、pending > 0 なら表示

## 変更ファイル一覧

| ファイル | 変更内容 |
|---------|---------|
| `claude-office/server.js` | マルチエージェント、ログ永続化、指示API追加 |
| `claude-office/hook.js` | session_id送信 |
| `claude-office/set-state.js` | instructions サブコマンド追加 |
| `claude-office/public/index.html` | 指示入力フォーム、パネル構成変更 |
| `claude-office/public/style.css` | 複数キャラ、指示フォームのスタイル |
| `claude-office/public/app.js` | 複数キャラ描画、指示UI、ログ取得 |
| `~/.claude/statusline.js` | 指示通知表示 |

## 実装順序

### Step 1: サーバー大改修 (server.js)
- data/ ディレクトリ作成とファイルI/O
- エージェント管理（マルチセッション対応）
- アクティビティログ永続化
- 指示キューAPI
- 通知ファイル書き出し

### Step 2: Hook更新 (hook.js)
- session_id をpayloadから読み取りPOSTに含める

### Step 3: フロントエンド更新 (index.html + style.css + app.js)
- 複数キャラクター描画ロジック
- 指示送信フォーム + 一覧表示
- アクティビティログのサーバー連携
- エージェント一覧パネル

### Step 4: ユーティリティ更新
- set-state.js に `instructions` コマンド追加
- statusline.js に通知表示追加

### Step 5: テスト
- サーバー再起動 → ログ永続化確認
- 2つのターミナルからcurl → 複数エージェント表示確認
- ダッシュボードで指示送信 → ステータスライン表示確認

## API仕様（最終形）

```
GET  /status          → { agents: [...], pendingInstructions: N }
POST /set_state       → { session_id?, state?, detail?, tool_name? }
GET  /activity        → [{ agent, state, detail, time }, ...]
POST /instructions    → { text }
GET  /instructions    → [{ id, text, createdAt, status }, ...]
POST /instructions/:id/done → { ok: true }
GET  /instructions/count     → { count: N }
```
