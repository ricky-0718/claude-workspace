# セッション引き継ぎ — 2026-03-21 Circleback本採用 + オライオン面談分析

## 完了したこと

### 1. Circleback vs HiNote 文字起こし精度比較
- 同一面談（オライオン 台湾留学個別相談）でCirclebackとHiNoteを比較
- **結果**: Circleback圧勝（話者識別、固有名詞認識、文脈正確性）
- ただしCirclebackは社名「台湾留学101センター」を「1万人センター」と誤認識する傾向
- HiNoteは「101センター」と正しく認識（部分的に勝利）
- **決定**: Circlebackを面談文字起こしの本採用ツールとする

### 2. オライオンさん面談分析（/mendan完了）
- ✅ Circlebackから全文字起こし取得 → `claude-office/data/tmp-transcription.txt`
- ✅ 分析レポート → `knowledge/students/面談分析まとめ.md` に追記
- ✅ LINE下書き4通 → `knowledge/students/LINE下書きまとめ.md` に追記
- ✅ 顧客カード → `knowledge/students/顧客コンテキスト.md` に追加（検討中セクション）
- ✅ Asanaタスク作成（メイン1件 + サブタスク4件）
  - メイン: `1213750812735070`（オライオンさん 面談フォロー）
  - 当日LINE: `1213750652285452` / 3日後: `1213750652316531` / 7日後: `1213750652324653` / 14日後: `1213750767832090`
- ⏸ スプレッドシート更新: 未実行（次セッションで対応可）
- **温度感**: 中（本人・母前向き、父の承認待ち、他国も検討中）
- **返答期限**: 3/23（月）

### 3. Circleback自動化設計書
- `tasks/circleback-automation-design.md` に詳細設計を保存
- Webhook（Push型）をメイン + MCPフォールバックのハイブリッド方式
- 4フェーズの実装計画

### 4. メモリ更新
- `reference_company_name.md` — 社名「台湾留学101センター」。Circlebackの誤認識補正ルール
- `feedback_transcript_factcheck.md` — 文字起こし受領時はknowledge/で固有名詞をファクトチェック

## 未完了・次にやること

### 優先度高
1. **Circleback自動化 Phase 1**: Webhookサーバー構築
   - `claude-office/circleback-webhook.js` を作成
   - `claude-office/circleback-processor.js` を作成
   - Cloudflare Named Tunnel 設定（cloudflared.exeは配置済み）
   - Circleback Automationにエンドポイント登録
   - 設計書: `tasks/circleback-automation-design.md`

2. **Circleback自動化 Phase 2**: mendanスキル更新
   - `.claude/skills/mendan/SKILL.md` のステップ1をCircleback対応に書き換え
   - `claude-office/prompts/mendan-circleback.md` を作成

3. **オライオンさん 当日お礼LINE送信**（本日中！）
   - Asanaサブタスク `1213750652285452` の内容をそのまま送信

### 優先度中
4. **HiNote自動化ファイルの退役**（Circleback安定稼働後）
   - 対象: `hinote-monitor.js`, `hinote-checker.js`, `run-hinote-monitor.bat`, `run-hinote-monitor-silent.vbs`, `hinote-state.json`, `hinote-monitor.log`
   - `mendan-executor.js` は残す（Circleback版でも流用）

5. **面談DBスプレッドシート更新**（オライオンさん分）

6. **mendan実行ログ更新** — `.claude/skills/mendan/execution-log.md` に今回のログ追記

### 優先度低
7. **Circleback自動化 Phase 3-4**: E2Eテスト + 安定化 + HiNote完全退役
8. **HiNoteのログイン問題**: SSOポップアップがCDPモードで動作しない（Circleback本採用で優先度下がった）

## 重要なコンテキスト

### Circleback自動化の核心
- **巡回型（HiNote）→ 呼び鈴型（Circleback）** への移行
- Circlebackの「Automation」機能でWebhookが公式サポートされている
- ペイロードに transcript（話者名+タイムスタンプ+テキストの配列）, notes, attendees が全て含まれる
- HMAC-SHA256署名検証対応（`x-signature`ヘッダー）
- Quick Tunnelではなく**Named Tunnel**を使うこと（URL固定のため）
- `claude-office/cloudflared.exe` は配置済み、`config.yml` もある

### HiNote自動化の現状
- 3/16以降 `playwright-core` パッケージ不足で完全停止
- HiNote自体のログインもCDPモードだとSSO認証が通らない状態
- Circleback本採用が決まったので修復不要

### 社名誤認識の補正
- Circlebackは「台湾留学101センター」を「1万人センター」と誤変換する
- Webhook受信時に自動置換する設計（設計書のセクション6参照）
- `/mendan` 手動実行時もknowledge/で固有名詞をファクトチェックすること

## 関連ファイル

### 今回変更したファイル
- `knowledge/students/面談分析まとめ.md` — オライオン分析追記
- `knowledge/students/LINE下書きまとめ.md` — オライオンLINE4通追記
- `knowledge/students/顧客コンテキスト.md` — オライオン顧客カード追加
- `claude-office/data/tmp-transcription.txt` — Circleback文字起こし全文

### 今回作成したファイル
- `tasks/circleback-automation-design.md` — Circleback自動化設計書（508行）
- `memory/reference_company_name.md` — 社名参照メモリ
- `memory/feedback_transcript_factcheck.md` — 文字起こしファクトチェックルール

### 参考ファイル（既存）
- `.claude/skills/mendan/SKILL.md` — mendanスキル定義（書き換え対象）
- `claude-office/mendan-executor.js` — 流用対象
- `claude-office/hinote-monitor.js` — 退役対象
- `claude-office/hinote-checker.js` — 退役対象
- `tasks/handoff-circleback-setup.md` — 3/20のCircleback導入記録
