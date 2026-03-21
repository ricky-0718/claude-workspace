# Circleback 面談文字起こし自動化パイプライン設計書

**作成日**: 2026-03-21
**ステータス**: 設計レビュー待ち

---

## 1. 背景と目的

### 現行システムの問題

HiNote + Playwright による面談自動検出パイプラインは 3/16 以降停止している。

| 問題 | 詳細 |
|------|------|
| playwright-core 依存パッケージ不足 | 旧PC上で `chromium.connectOverCDP()` が失敗。npm依存の問題で復旧困難 |
| ブラウザスクレイピングの脆弱性 | HiNote の DOM 構造変更で毎回コード修正が必要（h2, em > em 等のセレクタに依存） |
| HiNote に API/Webhook がない | コミュニティで要望中だが未実装。スクレイピング以外の取得手段がない |
| 話者識別の精度 | HiNote は「Speaker 1 / Speaker 2」止まり。名前の自動判定ができない |

### Circleback の優位性

| 項目 | HiNote | Circleback |
|------|--------|------------|
| API/Webhook | なし | Webhook完全対応（Automations機能） |
| MCP連携 | なし | 9ツール利用可能（SearchMeetings, GetTranscripts等） |
| 話者識別 | Speaker 1/2 | 名前で識別（カレンダー連携時） |
| 固有名詞認識 | 低 | 高（ただし「台湾留学101センター」を「1万人センター」と誤認識する傾向あり） |
| Zapier/Make連携 | なし | 両方対応 |
| デスクトップ録音 | マイクのみ | システムオーディオ + マイク（WASAPIループバック） |

### 本設計の目的

HiNote ベースのパイプライン（hinote-monitor.js + hinote-checker.js）を、Circleback Webhook + MCP ベースに完全置き換え、面談後の分析・フォロー業務を自動化する。

---

## 2. アーキテクチャ比較

### 現行アーキテクチャ（HiNote）

```
面談 → HiNote録音 → 旧PC hinote-checker.js (10分ポーリング)
                        ↓ Playwright CDP でブラウザスクレイピング
                     面談検出 → mendan-pending.json に保存
                        ↓ Slack通知
                     新PC /mendan コマンド手動実行
                        ↓ curl http://100.74.20.91:3848/api/mendan/pending
                     Claude CLI で分析 → Asana + LINE + スプレッドシート + git
```

**問題点**: Playwright依存、DOM構造依存、旧PC常時起動必須、10分遅延、手動トリガー必要

### 新アーキテクチャ（Circleback）

```
面談 → Circlebackデスクトップアプリ録音
         ↓ 自動文字起こし・議事録生成（Circleback側で完結）
       Circleback Automation → Webhook POST
         ↓ 面談完了イベントを受信（transcript + notes + attendees 全て含む）
       Webhook受信サーバー（新PC claude-office/）
         ↓ 面談判定ロジック（条件フィルタ）
       Claude Code CLI で分析実行
         ↓
       mendan-executor.js（既存流用）
         ↓ ナレッジファイル追記 + Asana + スプレッドシート + git push
       LINE通知（完了報告）
```

---

## 3. 自動化方式の選定

### 方式比較

| 方式 | メリット | デメリット | 適合度 |
|------|---------|-----------|--------|
| **A. Webhook（Push型）** | リアルタイム、ポーリング不要、Circleback公式サポート | Webhookエンドポイントの公開URLが必要 | **最適** |
| B. MCPポーリング | 追加インフラ不要、Claude Code内で完結 | 定期実行のスケジューラ必要、APIレート制限リスク | 次善 |
| C. スケジュール実行 | シンプル | 遅延が大きい（最大でインターバル分） | 非推奨 |

### 採用方式: A. Webhook + B. MCPフォールバック のハイブリッド

**メインパス（Webhook）**: Circlebackの Automation 機能で面談終了後に自動 Webhook POST。リアルタイム・確実。

**フォールバック（MCP）**: Webhook が失敗した場合、または手動で過去面談を処理したい場合に `/mendan` コマンドから Circleback MCP で直接取得。

### Webhookエンドポイントの公開方法

新PCの `claude-office/server.js`（旧PC連携用に既に稼働中）を拡張するか、専用のWebhookサーバーを立てる。

公開URLには **Cloudflare Tunnel（cloudflared）** を使用する。

| 要素 | 詳細 |
|------|------|
| ローカルサーバー | `claude-office/circleback-webhook.js` (Express / 標準http) |
| ポート | 3849（既存3848と分離） |
| 公開URL | Cloudflare Tunnel で固定ドメイン（Named Tunnel推奨） |
| 認証 | Circleback signing secret（`x-signature` ヘッダー + HMAC-SHA256 検証） |

> **注意**: Quick Tunnel（`cloudflared tunnel --url`）はURL不定で毎回Circleback側の設定更新が必要。Named Tunnelで固定サブドメインを使うこと。`claude-office/cloudflared.exe` は既に配置済み。

---

## 4. Webhook ペイロード構造

Circleback Webhook が送信する JSON（公式ドキュメントより）:

```json
{
  "id": 1234,
  "name": "面談名",
  "createdAt": "2026-03-21T14:00:00.000Z",
  "duration": 2400,
  "url": "https://meet.google.com/xxx",
  "recordingUrl": null,
  "tags": ["面談"],
  "icalUid": "abc@google.com",
  "attendees": [
    { "name": "新良 理輝", "email": "ricky@ryugaku101.com" },
    { "name": "山田 太郎", "email": null }
  ],
  "notes": "#### 概要\n...",
  "actionItems": [...],
  "transcript": [
    { "speaker": "新良 理輝", "text": "本日はありがとうございます。", "timestamp": 4.56 },
    { "speaker": "山田 太郎", "text": "よろしくお願いします。", "timestamp": 8.32 }
  ],
  "insights": { ... }
}
```

**HiNote との重要な違い**:
- `transcript` が構造化データ（speaker名 + timestamp + text の配列）。HiNoteのようなDOM解析が不要
- `attendees` にカレンダー招待者の名前・メールが含まれる
- `notes` にCircleback AI が生成した議事録（Markdown）が含まれる
- `duration` が秒数で提供される（面談時間の推定が不要に）

---

## 5. 面談判定ロジック

### Circleback Automation 側のフィルタ（第1段階）

CirclebackのAutomation条件で、面談に該当する会議だけをWebhookに送る。

| 条件種別 | 設定値 | 目的 |
|---------|--------|------|
| Tags | `面談` タグがある会議 | 手動タグ付けした面談のみ |
| Meeting name | 「面談」「相談」を含む | カレンダータイトルでフィルタ |
| Invitee emails | `@ryugaku101.com` ドメイン含む | 自社メンバー参加の会議 |

**OR条件で組み合わせ**: いずれか1つでも該当すれば送信。

### Webhook受信サーバー側のフィルタ（第2段階）

HiNote版の面談判定ロジック（`isConsultationNote()`）を移植・拡張する。

```
判定ロジック:
1. 除外パターンチェック（社内MTG、定例、歓迎会等）
2. タイトルパターンマッチ（面談、相談、ウェビナー後）
3. 出席者チェック（外部参加者がいるか）
4. transcript内容チェック（101センター、リッキー、留学、オールインワンプラン等の言及）
```

**社内会議の誤検出防止**: attendees全員が`@ryugaku101.com`の場合は社内会議として除外。

---

## 6. mendan スキルとの統合方法

### 現行 mendan スキルの構造

```
.claude/skills/mendan/
  SKILL.md          — スキル定義（9ステップのワークフロー）
  gotchas.md        — ハマりポイント集
  execution-log.md  — 実行履歴
  templates/
    report-format.md  — 分析レポートテンプレート
    line-draft-format.md — LINE下書きテンプレート

claude-office/
  hinote-monitor.js    — 新PC用（playwright-coreでスクレイピング）
  hinote-checker.js    — 旧PC用（10分間隔チェック、pending管理、API公開）
  mendan-executor.js   — Claude出力→ファイル書き込み+git push
  prompts/
    mendan-auto.md     — 全自動プロンプト（HiNote→Claude CLI用）
    mendan-lightweight.md — 軽量版プロンプト（区切りタグ出力）
```

### 統合方針

**SKILL.md のステップ1を書き換える**。それ以外のステップ（分析・LINE生成・Asana・スプレッドシート）は変更不要。

| ステップ | 現行（HiNote） | 新規（Circleback） |
|---------|---------------|-------------------|
| **1. データ取得** | `curl http://100.74.20.91:3848/api/mendan/pending`（旧PC API） | Webhook受信 or `SearchMeetings` + `GetTranscriptsForMeetings`（MCP） |
| 2. ナレッジ読み込み | 変更なし | 変更なし |
| 3. 分析レポート生成 | 変更なし | 変更なし |
| 4. LINE文面生成 | 変更なし | 変更なし |
| 5. 顧客コンテキスト更新 | 変更なし | 変更なし |
| 6. Asanaタスク作成 | 変更なし | 変更なし |
| 7. スプレッドシート更新 | 変更なし | 変更なし |
| 8. 完了通知 | `POST /api/mendan/{id}/done`（旧PC） | ステータス更新（ローカル JSON or Webhook応答ログ） |

### SKILL.md の変更内容

ステップ1を以下の2ケースに書き換える:

**ケースA（自動・推奨）**: Webhook経由で面談データが `claude-office/data/circleback-pending.json` に保存されている。Webhookサーバーが受信・保存した未処理エントリを使用。

**ケースB（手動・フォールバック）**: ユーザーが `/mendan` を実行した際に、Circleback MCPで直接検索。
1. `SearchMeetings` で直近の面談を検索
2. `GetTranscriptsForMeetings` で文字起こしを取得
3. ステップ2以降に進む

### データマッピング（Circleback → mendan入力）

| mendan が必要とするデータ | Circleback ソース | 変換 |
|--------------------------|------------------|------|
| 名前 | `attendees[]` から自社以外の参加者 | `@ryugaku101.com` 以外のattendeeの `name` |
| 面談日 | `createdAt` | ISO → `YYYY/M/DD` |
| 文字起こしテキスト | `transcript[]` | `[speaker] timestamp\ntext\n` に整形 |
| 面談時間 | `duration` | 秒 → 分に変換 |
| UTAGE参加者情報 | 変更なし（gws CLIでスプレッドシート検索） | 名前でUTAGEシートを検索 |

### 文字起こしの整形

Circlebackの `transcript` 配列を、既存mendanプロンプトが期待する形式に変換する:

```
入力（Circleback JSON）:
[
  { "speaker": "新良 理輝", "text": "本日はありがとうございます。", "timestamp": 4.56 },
  { "speaker": "山田 太郎", "text": "よろしくお願いします。", "timestamp": 8.32 }
]

出力（mendan プロンプト用テキスト）:
[新良 理輝] 00:00:04
本日はありがとうございます。

[山田 太郎] 00:00:08
よろしくお願いします。
```

### 「台湾留学101センター」誤認識の後処理

Circlebackが「1万人センター」「10,000人センター」等と誤認識する傾向がある。Webhook受信時に以下の置換を行う:

```
置換ルール:
- "1万人センター" → "台湾留学101センター"
- "10,000人センター" → "台湾留学101センター"
- "10000人センター" → "台湾留学101センター"
- "one man center" → "台湾留学101センター"
```

notes と transcript の両方に適用する。

---

## 7. Webhookサーバー設計

### 役割

1. Circleback Webhook POST を受信
2. 署名検証（`x-signature` + signing secret）
3. 面談判定ロジック実行
4. 面談データを `circleback-pending.json` に保存
5. Claude Code CLI を起動して分析実行（非同期）
6. Slack/LINE通知

### ファイル構成

```
claude-office/
  circleback-webhook.js   — Webhook受信サーバー（新規作成）
  circleback-processor.js — 面談判定 + データ整形 + Claude CLI起動（新規作成）
  mendan-executor.js      — ファイル書き込み + git push（既存流用）
  data/
    circleback-pending.json  — 未処理面談キュー（新規）
    circleback-state.json    — 処理済みID管理（新規）
  prompts/
    mendan-circleback.md     — Circleback用プロンプト（新規、mendan-lightweight.mdベース）
```

### circleback-webhook.js の責務

- Express or Node.js標準httpでPOSTエンドポイント `/webhook/circleback` を公開
- HMAC-SHA256署名検証
- 面談判定（`circleback-processor.js`の`isConsultationMeeting()`を呼ぶ）
- 判定通過 → `circleback-pending.json` に追加 + Slack通知
- 非同期で Claude CLI 起動（`circleback-processor.js` に委任）
- ヘルスチェックエンドポイント `/health`

### circleback-processor.js の責務

- Webhook ペイロードから mendan 入力形式へのデータ変換
- 誤認識テキストの後処理（101センター等）
- UTAGE参加者情報の検索
- Claude Code CLI 起動（`mendan-circleback.md` プロンプト使用）
- mendan-executor.js 呼び出し（ファイル書き込み + git push）
- 完了/失敗ステータスの更新

### 既存server.jsとの関係

旧PCの `server.js`（ポート3848）で公開していた `/api/mendan/pending`, `/api/mendan/{id}/claim`, `/api/mendan/{id}/done` は不要になる。新PCの `circleback-webhook.js` が単独で動作する。

ただし、旧PCの server.js は Spectre 等の他機能でも使用しているため、HiNote関連のエンドポイントのみ非推奨とし、サーバー自体は残す。

---

## 8. /mendan コマンド（MCP フォールバック）

手動で `/mendan` を実行した場合、Circleback MCP 経由でデータを取得するフロー。

### 新しいステップ1（SKILL.md更新内容）

```
## ステップ1: 面談データを取得

### ケースA: 未処理面談がある場合（Webhookサーバー経由）

claude-office/data/circleback-pending.json に未処理エントリがあるか確認。
あればそのデータを使用してステップ2に進む。

### ケースB: Circleback MCPで直接検索

1. SearchMeetings で直近7日の面談を検索
2. ユーザーに対象の面談を選択してもらう
3. GetTranscriptsForMeetings で文字起こしを取得
4. transcript配列を mendan入力テキスト形式に変換
5. ステップ2に進む

### ケースC: 手動入力（フォールバック）

ユーザーに情報を質問: 名前、学年、同席者、面談日。
文字起こしテキストの貼り付けを依頼。
```

---

## 9. Circleback Automation 設定手順

Circleback Web UI（https://app.circleback.ai）で以下を設定する。

### Automation 1: 面談Webhook（メイン）

| 設定項目 | 値 |
|---------|-----|
| 名前 | 「面談分析自動化」 |
| 条件 | Meeting name contains「面談」OR「相談」OR Tags include「面談」 |
| アクション | Send webhook request |
| Endpoint URL | `https://{named-tunnel-domain}/webhook/circleback` |
| 含めるデータ | Notes, Action items, Transcript, Insights 全て |
| 自動実行 | ON |

### Automation 2: AI Insights（カスタム抽出）

Circleback の「Generate insights with AI」アクションを追加で設定し、面談固有の情報を自動抽出させる。

| Insight名 | 抽出内容 |
|-----------|---------|
| 見込み客情報 | 氏名、学年、同席者、志望分野 |
| 温度感 | 高/中/低 + 根拠 |
| 障壁 | 決断を妨げている要因 |
| 次のアクション | 面談後に必要なフォロー |

これにより、Webhook ペイロードの `insights` フィールドに構造化データが含まれ、Claude分析の精度が上がる。

---

## 10. HiNote からの移行手順

### Phase 0: 並行テスト期間（1-2週間）

| 項目 | 内容 |
|------|------|
| 目的 | CirclebackとHiNoteの文字起こし精度を同一面談で比較 |
| 方法 | 面談時にCirclebackデスクトップアプリとHiNoteを同時稼働 |
| 判定基準 | 話者識別精度、固有名詞認識、文字起こし網羅性 |
| 合格条件 | Circlebackの文字起こしが実用レベル（mendan分析に支障なし） |

> 既に 3/20 のセッションで設定は完了している。次回の面談でテスト可能。

### Phase 1: Webhookサーバー構築

1. `claude-office/circleback-webhook.js` を作成（HTTP受信 + 署名検証）
2. `claude-office/circleback-processor.js` を作成（データ変換 + 面談判定）
3. Cloudflare Named Tunnel を設定（固定URL取得）
4. Circleback Automation にWebhookエンドポイントを登録
5. テスト: 過去の面談で Automation を手動実行 → Webhook受信確認

### Phase 2: mendan スキル統合

1. `claude-office/prompts/mendan-circleback.md` を作成（Circlebackデータ形式対応）
2. `.claude/skills/mendan/SKILL.md` のステップ1を更新（ケースA/B/C の3分岐）
3. `circleback-processor.js` から Claude CLI + mendan-executor.js の連携テスト
4. dry-run で1件実行 → 分析レポート・LINE文面の品質確認
5. 本番実行テスト（1件）→ Asana + スプレッドシート + git push 確認

### Phase 3: 自動実行の安定化

1. Webhookサーバーを Windows タスクスケジューラで自動起動設定
2. Cloudflare Tunnel の永続化（サービスとして登録）
3. エラー時のSlack/LINE通知設定
4. 2-3件の面談で安定動作を確認

### Phase 4: HiNote 完全退役

1. hinote-checker.js の定期実行を停止（旧PC タスクスケジューラから削除）
2. hinote-monitor.js の定期実行を停止（新PC タスクスケジューラから削除）
3. HiNoteデスクトップアプリのアンインストール（任意）
4. 旧PC server.js から `/api/mendan/*` エンドポイントを削除

> **注意**: HiNote自体は社内会議の文字起こし用に残してもよい。面談パイプラインのみCirclebackに移行。

---

## 11. 実装ステップ（フェーズ分け詳細）

### Phase 1: インフラ構築（見積もり: 1セッション）

- [ ] `circleback-webhook.js` — HTTPサーバー + 署名検証 + ペイロード保存
- [ ] `circleback-processor.js` — 面談判定 + データ変換 + 誤認識後処理
- [ ] `data/circleback-pending.json` — 初期ファイル作成
- [ ] Cloudflare Named Tunnel 設定（`cloudflared.exe tunnel create mendan`）
- [ ] Circleback Automation 作成（Web UI）

### Phase 2: mendan スキル更新（見積もり: 1セッション）

- [ ] `prompts/mendan-circleback.md` — Circlebackデータ対応プロンプト
- [ ] `SKILL.md` ステップ1 の書き換え（3ケース対応）
- [ ] `gotchas.md` に Circleback 固有の注意点を追記
- [ ] MCP フォールバック動作確認

### Phase 3: E2E テスト（見積もり: 1セッション、面談タイミング依存）

- [ ] Webhook受信テスト（Circleback UIから「Send test request」）
- [ ] 全パイプライン dry-run テスト
- [ ] 本番面談1件で E2E 確認
- [ ] エラーハンドリング確認（Webhook失敗時のMCPフォールバック）

### Phase 4: 安定化・退役（見積もり: 1セッション）

- [ ] タスクスケジューラ登録（Webhookサーバー + Cloudflare Tunnel）
- [ ] 2-3件の面談で安定運用を確認
- [ ] HiNote パイプライン停止
- [ ] ドキュメント更新（MEMORY.md, project_circleback.md）

---

## 12. リスクと対策

| リスク | 影響 | 対策 |
|--------|------|------|
| Cloudflare Tunnel 断 | Webhook受信不可 | MCP フォールバック（手動 `/mendan`）。Tunnel再接続の自動リトライ |
| Circleback サービス障害 | 文字起こし自体が生成されない | HiNote を完全退役するまでバックアップとして残す |
| signing secret 漏洩 | 偽のWebhookリクエスト | HMAC検証必須。secretはローカル `.env` で管理 |
| 「101センター」誤認識 | 分析精度低下 | テキスト後処理で自動置換（複数パターン対応） |
| 無料トライアル終了（3/27） | サービス停止 | 3/27までにテスト完了 → 有料プラン移行の判断 |
| 面談以外の会議がWebhookで飛ぶ | 誤処理 | 2段階フィルタ（Automation条件 + サーバー側判定） |
| Claude CLI タイムアウト | mendan分析失敗 | 軽量プロンプト（mendan-lightweight.md方式）で実行時間短縮 |

---

## 13. 不要になるコンポーネント

Phase 4 完了後に退役するファイル:

| ファイル | 用途 | 退役理由 |
|---------|------|---------|
| `claude-office/hinote-monitor.js` | 新PCでHiNoteスクレイピング | Circleback Webhook に置換 |
| `claude-office/hinote-checker.js` | 旧PCでHiNoteチェック + pending管理 | Circleback Webhook に置換 |
| `claude-office/run-hinote-monitor.bat` | hinote-monitor起動バッチ | 不要 |
| `claude-office/run-hinote-monitor-silent.vbs` | サイレント起動ラッパー | 不要 |
| `claude-office/data/hinote-state.json` | HiNote処理済みノート管理 | circleback-state.json に置換 |
| `claude-office/data/mendan-pending.json`（旧PC） | 旧PCのpendingキュー | circleback-pending.json に置換 |
| `scripts/start-edge-cdp.bat` | HiNote用Edge CDP起動 | Playwright不要に |

**残すもの**:
- `mendan-executor.js` — ファイル書き込み + git pushは引き続き使用
- `prompts/mendan-auto.md`, `mendan-lightweight.md` — 参考資料として残す
- `.claude/skills/mendan/` — ディレクトリ構造は維持（SKILL.md更新）

---

## 14. 関連ファイル一覧

| ファイル | パス |
|---------|------|
| mendan スキル定義 | `.claude/skills/mendan/SKILL.md` |
| mendan gotchas | `.claude/skills/mendan/gotchas.md` |
| 軽量版プロンプト | `claude-office/prompts/mendan-lightweight.md` |
| 全自動プロンプト | `claude-office/prompts/mendan-auto.md` |
| mendan executor | `claude-office/mendan-executor.js` |
| HiNote monitor（新PC） | `claude-office/hinote-monitor.js` |
| HiNote checker（旧PC） | `claude-office/hinote-checker.js` |
| Circleback導入ハンドオフ | `tasks/handoff-circleback-setup.md` |
| HiNote リファクタリング計画 | `tasks/hinote-monitor-refactor.md` |
| mendan 設計書（初版） | `docs/plans/2026-02-23-mendan-automation-design.md` |
| Cloudflared実行ファイル | `claude-office/cloudflared.exe` |
| Cloudflare設定 | `claude-office/config.yml` |
| Circleback MCP設定 | `~/.claude.json`（circleback セクション） |
| Circleback プラグイン | `.claude/plugins/cache/claude-plugins-official/circleback/1.0.0/.mcp.json` |
