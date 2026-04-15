# CURRENT STATE — 現在地

*最終更新: 2026-04-15 16:50 / 更新者: Claude Code本体セッション（Windows）*

## 📌 直近の完了タスク（2026-04-14 夜）

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

### ① Paperclip 導入・検証フェーズ（進行中）
WSL2 Ubuntu 上で Paperclip v2026.403.0 が稼働中。台湾留学101センターを会社として登録し、CEOエージェント1体で2つのタスクを実行完了。

- **URL（ローカル）**: http://localhost:3100
- **URL（Tailscale内）**: https://ricky-omnibook.tail3a3559.ts.net:3100 — スマホ・他デバイスから）
- **Company**: 台湾留学101センター（ID: `ea247fa6-c3e2-43cd-ae90-73ca87a93b1e`）
- **Agents**: CEO（Claude Code adapter, Opus 4.6）— **プロトコル習得済み**
- **Workspace bind**: `/home/ricky/workspace` → `/mnt/c/Users/newgo/Claude用/`
- **起動スクリプト**: `scripts/start-paperclip.sh`（正式版、冪等）
- **自動起動**: Windows タスクスケジューラー `Start-Paperclip-AtLogin`（ユーザーログイン時に起動）

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

0. **おさる回答受領 → LPイベント感実装**（返信待ち）
   - 回答Aなら既存OW LPに「カウントダウン／期間限定特典／ライブ感演出」を追加
   - 回答Bならガイドブック→OW の誘導ステップに「今、期間限定」を挟む設計
   - 回答後、具体パターンを3案ドラフト → ユーザー判断

0. **上野航 追加出願の実行**（4/14完了: 提案書作成・Drive保存済）
   - PDF: https://drive.google.com/file/d/1B4GzWIo-Nh9umHqNscr1OD00-qLi0A3c/view
   - 最優先: 東海大學 第3梯次 4/30締切 → IDP+政治學系2学科同時出願
   - 次: 淡江R2 4/16〜5/6 → 全球政治經濟+外交國際關係
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

4. **Edge CDP failed問題の恒久対策**（優先度中）
   - `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk` に `--remote-debugging-port=9222` を追加
   - Windowsスタートアップフォルダに CDP付きEdge起動ショートカット追加
   - これでPaperclipのUI確認も含め、Playwright MCPの `failed` 状態を解消

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
