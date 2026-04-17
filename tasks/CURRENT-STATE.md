# CURRENT STATE — 現在地

*最終更新: 2026-04-17 00:00 / 更新者: 本体セッション②（終了時更新）*

## 📌 直近の完了タスク（2026-04-16 夕方）

**Paperclip成果物レビュー進行中（CMP-13→CMP-17）** ※セッション①担当

### CMP-13（Stripe分割払い調査）完了
- レポート採用OK（芝信金本命の結論は妥当）
- 抜け: Paidy（日本最大BNPL、PayPal傘下）の見落とし指摘
- **Paidy法人営業に正式問い合わせ送信済み**（sales@paidy.com、149万円取引可否含む6項目、Gmail draftId `r-3196238626403413315`）
- 2〜5営業日で返信想定 → 回答受領後にレポート追記

### CMP-17（大學DB PV100万戦略）レビュー完了・条件付き承認
- 評価: ★★★★☆ Phase A（基盤修正）は即採用可、Phase B〜Eは5項目の修正が必要
- 改訂指示ブリーフ作成: `tasks/paperclip-issues/07-cmp17-revision-brief.md`
- **5つの修正要件**:
  1. Phase A冒頭に「Month 0: GA現状測定」追加（ベースライン不明問題）
  2. WS-1-7 Cloudflare Pagesデプロイに `npm run deploy` 明記（既知の罠対策）
  3. ブログ施策を既存「ブログ帝国PJ」と統合管理（カニバリ防止）
  4. UGCレビューを「生徒体験談インタビュー記事」に仕様変更（ステマ認定リスク回避）
  5. Phase E広告タイミングを既存Meta/Google広告運用と整合
- 次: Paperclipに改訂指示を投入 → 改訂版受領後Phase A着手承認

### Edge CDP恒久対策 完了 ※セッション②担当
- **達成**: Windows ログイン時にCDP付きEdgeが自動起動する状態を構築
- **追加物**: `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\Edge with CDP.lnk`
  - Args: `--remote-debugging-port=9222 --restore-last-session --no-first-run`
  - デフォルトプロファイル使用（メモリルール `feedback_edge_cdp_same_profile` 遵守）
- **現在の3層防衛**:
  1. L1: スタートアップショートカット（今回追加）→ ログイン時自動起動
  2. L2: タスクバー Edge.lnk が既にCDP付き → 手動クリックでもCDP ON
  3. L3: SessionStart hook `ensure-edge-cdp.js` → CCセッション開始時に強制復旧
- **保留**: ProgramData の Edge.lnk パッチは admin 必要（L3があるので実質無害）
- **スクリプト**:
  - `scripts/install-edge-cdp-autostart.ps1`（インストーラー）
  - `scripts/check-edge-shortcuts.ps1`（全Edgeショートカットの棚卸し）
  - `scripts/patch-system-edge-shortcut.ps1`（admin実行時用・パッチスクリプト）
- ✅ 旧 `.playwright-data` 系スクリプト3本（start-edge-cdp.bat / find-pw-edge.ps1 / kill-pw-edge.ps1）削除済み
- ✅ `scripts/README-edge-cdp.md` にアーキテクチャと admin実行手順を文書化
- **検証**: 次回PC再起動時にタスクマネージャーで `msedge.exe --remote-debugging-port=9222` が起動しているか確認

---

## 📌 直近の完了タスク（2026-04-16 16:20）

**4月15日払い給料支払い完了（7名・全体フロー確立）**
- 請求書6ファイル収集（freee 4名／Gmail 1名／支払通知書新規作成 1名）
- ネットバンキング振込完了、Asanaサブタスク7件を完了、親タスク期日を4/25に更新
- 日報登録（金額伏せ版）＋ activity-log 更新
- 仕事リクエストに【入金確認】タスク作成＋5名メンション（社長トーン）
- **全体ワークフローを`knowledge/operations/salary-payment-config.md`と`project_salary_payment.md`memoryに記録**
- 次回（5月15日払い）から同じフローでClaude Codeが一気通貫で対応可能

**新しい知見**:
- freee DLリンクページのテキスト直読で金額・振込先取得（PDF DL不要）
- Gmail添付は`disp=inline→safe`でDLトリガー
- freee PDFは`/api/ivex/dl/<UUID>/0?is_download=1`にcurl並列DL（認証不要）
- 大勝さん時給 ¥1,000→¥1,500 昇給検知
- スタッフ閲覧Asanaでは金額を伏せるルール確立

## 📌 前の完了タスク（2026-04-15 夜）

**Brain Review（マイタスク棚卸し）＋ Paperclip 8 Issue 一括投入**
- Asanaマイタスク47件を棚卸し → 完了2/削除3/統合1/次アクション変換7/期日設定2/セクション変更4
- 詳細指示マークダウン6本作成（tasks/paperclip-issues/）
- Paperclip に **CMP-12〜CMP-21 の計8 Issue** を投入（親子構造で整理）
- Asanaタスク6件を「⏳相手待ち」に移動、notesにCMP番号追記
- 実行ログ更新: `.claude/skills/brain-review/execution-log.md`

**投入したPaperclip Issue一覧**:

| CMP | タイトル | 担当 | 状態 |
|---|---|---|---|
| 12 | 契約書保存バグ修正 | CTO | blocked（→ルーティン機能で別途対応予定、Paperclip側は保留） |
| 13 | Stripe分割払い調査 | CEO | todo |
| 14 | HPアップグレード案 | CEO→CTO | in_progress |
| 16 | 大學DB PV100万プロジェクト（親） | CEO | backlog |
| 17 | 大學DB Phase 1+2戦略策定 | CEO | in_progress |
| 18 | 台湾スピーク100万DL（親） | CEO | backlog |
| 19 | 台湾スピーク Phase 3-1 監視役 | CEO | todo |
| 20 | 台湾スピーク Phase 3-2 ロードマップ | CEO | todo |
| 21 | NTUT/TSMC 6/14説明会50名集客＋10月本募集戦略 | CEO | todo |

---

## 📌 前回の完了タスク（2026-04-14 夜）

**台湾スピーク v18 フィードバック対応完了**（本番反映済み）
- 台湾人レビュー反映: 謝謝/名字軽声、漂亮声調、ピンインマスター20問に整理
- UI: パスコード→パスワード、音の高さ→トーン
- マスター度ロジック刷新: 発音ドリル総合80+のみで認定（一度固定）
- マスターバッジ（ゴールド枠＋MASTERリボン、リアルタイム反映）
- 本番DBマイグレーション: ドリル80+の未認定19件を救済（travel-*レッスンのバグも修正）
- 診断スクリプト `chinese-ai-coach/scripts/diagnose-mastery.js` で検証 → 全項目クリア

**関連メモリ**: `project_chinese_ai_coaching.md`（BAND配布準備フェーズ）


> このファイルは、このClaude Codeセッションと Paperclip 両方のエージェントが**セッション開始時に必ず読む**共有ステータスファイル。「いま何をしていて、次に何をすべきか」の単一の真実。

---

## 🎯 Active Focus（いま注力中）

### ⓪ おさる相談：ファネル「イベント感」の器選択（返信待ち）
オートウェビナーLP（LINE追加率0.35%）とガイドブックLP（7.48%）の21倍乖離を受け、おさるさんに「イベント感を出すのはどちらの器か」を相談中。

- **前提**: おさるさんから「ROAS 840めちゃ良い／オートウェビナー継続OK／イベント感追加を推奨」の音声返信受領
- **2択**: A. 既存OW LPにイベント感追加 ／ B. ガイドブック側を入口にしてイベント感誘導
- **LP**: OW https://sub.ryugaku101.com/page/1fqyVBN0aNsn ／ ガイドブック https://sub.ryugaku101.com/page/8r209OrEG7kQ
- **送付数字**: 入口乖離（0.35% vs 7.48%）、ファネル以降全部目標超え（成約率34.29%、ROAS 620.18%）
- **次**: おさる回答後、LPイベント感（カウントダウン／限定特典／期間訴求）を実装

### ① Paperclip 本格運用フェーズ（進行中）
WSL2 Ubuntu 上で Paperclip v2026.403.0 が稼働中。CEO＋CTOの2エージェント体制。**4/15時点で合計21 Issue投入済み**（うち今日8件）。

- **URL（ローカル）**: http://localhost:3100
- **URL（Tailscale内）**: https://ricky-omnibook.tail3a3559.ts.net:3100 — スマホ・他デバイスから）
- **Company**: 台湾留学101センター（ID: `ea247fa6-c3e2-43cd-ae90-73ca87a93b1e`）
- **Agents**:
  - CEO（Claude Code adapter, Opus 4.6, ID: `4df7d44e-0900-4577-8581-025f24927d03`）
  - CTO（Claude Code adapter, ID: `7fb09381-5feb-4eed-ab65-50a4c13a5254`, reports to CEO）
- **Workspace bind**: `/home/ricky/workspace` → `/mnt/c/Users/newgo/Claude用/`
- **起動スクリプト**: `scripts/start-paperclip.sh`（正式版、冪等）
- **自動起動**: Windows タスクスケジューラー `Start-Paperclip-AtLogin`（ユーザーログイン時に起動）
- **Issue依頼パターン**: 詳細指示を `tasks/paperclip-issues/*.md` に書き、Issue descriptionでそのパスを参照させる方式で安定稼働
- **エージェント採用**: リッキー方針で「柔軟OK」。CTO hire やIC hireはCEOの判断で進める
- **監視頻度**: heartbeat 1時間（リッキー確認）→ 定期監視業務はこのサイクルで十分

### ② LINE導線統合プロジェクト（Paperclipタスク投入待ち）
大学DBサイト（db.ryugaku101.com）ローンチに合わせ、全流入経路→LINE→OW→面談の統合導線を設計する。

**決定済み**:
- 統合型1シナリオ（タグで流入元管理）
- LINE登録フック＝ガイドブックプレゼント
- 挨拶トーン＝台湾留学の専門家
- 特典振り分け＝後日決定

**ブリーフ**: `tasks/paperclip-line-funnel-project.md`
**成果物**: シナリオ設計書、CTA配置案、挨拶ドラフト3パターン、ファネルフロー図

### ③ CEO Q2戦略レポート（レビュー待ち）
`tasks/paperclip-ceo-q2-strategy.md` に Q2 戦略レポート（12KB / 204行）が出力済み。

**Q2施策の要約**:
1. **ガイドブックファネル→オートウェビナー接続＋LP切替**（+¥14.9M見込み）
2. **面談成約率42%→55%＋3-7-14フォロー体制**（追加広告費ゼロで+¥10-13M）
3. **YouTube対談動画3本制作**（全チャネル底上げ、+¥5M見込み）

### ③ CEO プロトコル習得 CMP-2（完了）
CEOが「heartbeat開始時にCLAUDE.mdとCURRENT-STATE.mdを読む + 作業後にactivity-logとCURRENT-STATEを更新する」プロトコルを3箇所に永続化：
- Paperclip PARA: `life/resources/protocols/` (summary.md + items.yaml)
- Daily notes: `memory/2026-04-12.md`
- Claude Code memory: `heartbeat-protocol.md`

次回以降のheartbeatで自動適用される見込み。マルチエージェント追加時も、このCEOの記憶をベースに動く。

---

## ⏭️ Next Actions（次のアクション）

優先順位順：

0. **Paperclip成果物レビュー**（投入したCMP-13/14/17/19/20/21のアウトプットを順次レビュー）
   - CMP-17（大學DB戦略）: in_progress。完了したら `tasks/paperclip-outputs/university-db-pv1m/` をレビュー
   - CMP-14（HPアップグレード）: in_progress（CTO）。実装計画書のレビュー
   - CMP-21（NTUT 6/14集客）: 期限タイト（4/20までにPhase 1完了目標）
   - 今後heartbeatサイクルごとに進捗確認

0. **おさる回答受領 → LPイベント感実装**（返信待ち）
   - 回答Aなら既存OW LPに「カウントダウン／期間限定特典／ライブ感演出」を追加
   - 回答Bならガイドブック→OW の誘導ステップに「今、期間限定」を挟む設計
   - 回答後、具体パターンを3案ドラフト → ユーザー判断

0. **上野航 追加出願の実行**（4/14完了: 提案書作成・Drive保存済）
   - PDF: https://drive.google.com/file/d/1B4GzWIo-Nh9umHqNscr1OD00-qLi0A3c/view
   - 最優先: 東海大學 第3梯次 4/30締切 → IDP+政治學系2学科同時出願
   - 次: 淡江R2 4/16〜5/6 → 全球政治經濟+外交國際関係
   - 航のTOEIC最新スコア・淡江R1合否の確認が必要

1. **CEO戦略レポートの人間レビュー**（リッキーさん判断）
   - `tasks/paperclip-ceo-q2-strategy.md` を読んで採否判断
   - Paperclip Inbox の CMP-1 を Approve / Comment
   - 施策の優先順位・詳細を調整する場合はCEOに再指示

2. **マルチエージェントテスト**（Paperclipの真価検証）
   - sales-advisor を Paperclipに追加
   - CMP-1 のサブタスクとして「面談スクリプト改訂」を発注
   - CEO が sales-advisor に委任できるか確認

3. ~~**Paperclip永続起動の設定**~~ ✅ **完了 2026-04-12 02:25**
   - `scripts/start-paperclip.sh` 作成（冪等、10MBログローテーション付き）
   - Windows タスクスケジューラー `Start-Paperclip-AtLogin` 登録
   - 冪等性テスト OK（既に起動中なら no-op）
   - タスクスケジューラー経由実行 OK（LastTaskResult=0）
   - **未検証**: PC再起動後の完全な自動起動フロー（次回PC再起動で自動検証される）

4. ~~**Edge CDP failed問題の恒久対策**~~ ✅ **実質完了 2026-04-16 18:00**
   - ✅ ユーザースタートアップに `Edge with CDP.lnk` 追加（ログイン時自動起動）
   - ✅ タスクバーの Edge.lnk は既にCDP付き（`--profile-directory=Default --remote-debugging-port=9222`）
   - ✅ SessionStart hook の `ensure-edge-cdp.js` が最終防衛（CDP切れ検出→kill&restart）
   - ⏸ ProgramData側の Edge.lnk パッチは admin 必要のため保留（上記3層で実質無害）
   - インストーラー: `scripts/install-edge-cdp-autostart.ps1`
   - **検証**: 次回PC再起動時にスタートアップからCDP付きEdgeが自動起動するか確認

---

## 🚧 Blockers（障害）

- なし（2026-04-12 時点）

---

## 📚 重要な参照先

| 対象 | パス | 備考 |
|---|---|---|
| **Q2戦略レポート**（CEO成果物） | `tasks/paperclip-ceo-q2-strategy.md` | 12KB / 204行 |
| **売上1億円ロードマップ** | `tasks/todo.md` | 既存の施策一覧 |
| **メモリインデックス**（Windows） | `C:/Users/newgo/.claude/projects/C--Users-newgo-Claude-/memory/MEMORY.md` | 本体セッションが自動ロード |
| **メモリインデックス**（WSL/Paperclip） | `/mnt/c/Users/newgo/.claude/projects/C--Users-newgo-Claude-/memory/MEMORY.md` | Paperclipエージェントは明示的に読む必要 |
| **Paperclip ログ** | `/tmp/paperclip.log`（WSL内） | サーバーのstdout |
| **CEO runログ** | `/home/ricky/.paperclip/instances/default/data/run-logs/` | heartbeat run の ndjson |

---

## 🗂️ 今日のセッションでやったこと（時系列）

詳細は `tasks/activity-log.md` を参照。要約：

1. Paperclip vs Claude Managed Agents の比較調査 → Paperclipの「会社運営」思想が理想に近いと判明
2. Windows 11 上の Paperclip 起動バグを確認 → WSL2 で回避する方針決定
3. WSL2 + Ubuntu + Node 20 + pnpm + Claude Code CLI 導入
4. Paperclip v2026.403.0 起動成功（ricky ユーザー、PostgreSQL埋め込み）
5. 台湾留学101センター会社作成、CEOエージェント作成、Claude Codeアダプタ認証OK
6. `/home/ricky/workspace` シンボリックリンクでリポジトリ共有
7. CMP-1 タスク投入 → 5分・35ターン・$1.20 で Q2戦略レポート生成
8. Paperclipセッションと本体Claude Codeセッションの情報共有アーキテクチャ設計（このファイル）

---

## 🔄 更新ルール

このファイルは**誰でも更新可**。ただし：

- **Active Focus** と **Next Actions** は、重要な状態変化があったら必ず更新
- **最終更新日時と更新者**を必ず書き換える
- 古い情報は削除ではなく `activity-log.md` に移動
- 更新理由を activity-log に記録
