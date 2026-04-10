# Phase 1 引き継ぎ: 台湾スピーク 100万DL戦略

**セッション日: 2026-04-10〜11**
**ブランチ: app-1m-strategy**
**ワークツリー: .worktrees/app-1m-strategy**

## 確定事項

| 項目 | 決定 |
|------|------|
| アプリ名 | **台湾スピーク** |
| タグライン | **台湾で通じる中国語アプリ** |
| ポジショニング | 中国語学習アプリではなく「台湾で通じる中国語」 |
| ターゲット | 台湾好きの日本人全体（旅行者200万人/年が入口） |
| 進め方 | Web版で50名テスト → 検証 → App Store公開 |

## Phase 0 完了済み（今セッション）

- [x] 競合・市場調査 → `knowledge/marketing/app-competitor-analysis.md`
- [x] ポジショニング策定 → `knowledge/marketing/app-positioning.md`
- [x] アプリ名決定（台湾スピーク）
- [x] app-growthエージェント作成 → `.claude/agents/app-growth.md`
- [x] プロジェクトメモリ更新

## Phase 1 TODO（次セッションで実装）

### 1. セルフサインアップ（招待コード制）— 最優先
**対象ファイル:**
- `chinese-ai-coach/server/index.js` — `/api/register` エンドポイント追加
- `chinese-ai-coach/server/db/schema.sql` — `invite_codes` テーブル追加
- `chinese-ai-coach/public/js/app.js` — 登録画面UI追加
- `chinese-ai-coach/public/index.html` — 登録フォームHTML

**仕様:**
- 管理者がダッシュボードで招待コード発行（バッチ発行可能）
- 生徒が招待コード + 自分の名前 + パスコード で登録
- 既存の `name + passcode` ログインはそのまま維持
- 将来のメール/SNSログインへの拡張余地を残す

### 2. フリーミアム制限ロジック
**対象ファイル:**
- `chinese-ai-coach/server/db/schema.sql` — `daily_usage` テーブル、`students.plan` カラム追加
- `chinese-ai-coach/server/index.js` — 制限チェックミドルウェア
- `chinese-ai-coach/server/routes/chat.js` — 日次AI会話制限（3回/日）
- `chinese-ai-coach/server/routes/speech.js` — 日次発音評価制限（5回/日）
- `chinese-ai-coach/server/routes/curriculum.js` — 単語学習制限（10語/日）

**仕様:**
- `students.plan`: 'free' / 'pro'（デフォルト: 'free'）
- `daily_usage`: student_id, usage_type, usage_date, count で日次カウント
- 50名テスト中は全員 'pro' に設定
- 制限超過時は `{ error: 'limit_reached', limit: 5, used: 5 }` レスポンス

### 3. ゲーミフィケーション強化
**対象ファイル:**
- `chinese-ai-coach/public/js/app.js` — レベルシステム、アニメーション
- `chinese-ai-coach/public/css/style.css` — バッジ・confetti CSS
- `chinese-ai-coach/server/routes/curriculum.js` — レベル計算API
- `chinese-ai-coach/server/db/schema.sql` — achievements テーブル

**仕様:**
- レベルバッジ: 初心者(0-50語)→旅行者(51-200語)→留学生(201-500語)→マスター(501+語)
- 達成アニメーション: 10単語マスター / スコア80点突破 / 3日連続ストリーク時にconfetti
- デイリーチャレンジ: 「今日のフレーズ」1日1問（ランダム出題）

### 4. 旅行者パック（100フレーズ）
**対象ファイル:**
- `chinese-ai-coach/curriculum-data.sql` に追加 or 新規SQLファイル
- `chinese-ai-coach/server/db/schema.sql` — lessons テーブルに旅行カテゴリ追加

**仕様:**
- 空港・MRT・タクシー（30フレーズ）
- 夜市・レストラン（30フレーズ）
- ホテル・コンビニ（20フレーズ）
- 緊急・病院・警察（20フレーズ）
- 各フレーズ: 繁体字 + ピンイン + 日本語訳 + 例文

### 5. シェア機能
**対象ファイル:**
- `chinese-ai-coach/public/js/app.js` — SVG→画像生成、シェアボタン

**仕様:**
- 発音スコアカードをSVG→Canvas→PNG変換
- LINE/X/TikTokシェアボタン
- 画像に「台湾スピーク」ロゴ + URL埋め込み

### 6. UI改善
- `alert()` → インラインUI通知に置換
- 課題タブをナビに復活（HTMLに要素あるが非表示）
- アプリ名を「台灣華語コーチ」→「台湾スピーク」に変更

## 重要な技術情報

- **本番URL**: https://taiwan-chinese-coach.fly.dev/
- **デプロイ**: `cd chinese-ai-coach && C:/Users/newgo/Claude用/flyctl-new/flyctl.exe deploy`
- **DB**: SQLite (`/data/coach.db`)、better-sqlite3 同期API
- **認証**: name + passcode → token + session_id
- **外部API**: Claude Haiku 4.5 / SpeechSuper（4/30トライアル期限）/ msedge-tts

## 競合の最重要ポイント（忘れないこと）

- **ChineseSkill** が台湾マンダリンコース300レッスンを持っている（唯一の潜在競合）
- 「台湾旅行 中国語」のASO競合はゼロ → ここを先に押さえる
- 台湾旅行者132万人/年が最大の市場

## 次セッション開始方法

```
「台湾スピーク Phase 1の実装を始めて」
→ このファイル（tasks/handoff-app-1m-phase1.md）を参照
→ ブランチ app-1m-strategy で作業
```
