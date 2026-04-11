# Activity Log — 作業ログ

*append-only（追記のみ）、最新が上。本体Claude Codeセッション と Paperclip CEO の両方が更新する。*

> このファイルは「何が・いつ・誰によって」行われたかの履歴。どちらのセッションから見ても同じ視点で過去を振り返れるようにする。

---

## フォーマット

```markdown
### YYYY-MM-DD HH:MM - タイトル
- **Actor**: [Claude Code本体 / Paperclip CEO / Paperclip XXX-agent / User]
- **Type**: [Setup / Task / Decision / Issue / Review / Note]
- **Summary**: 1-3行の要約
- **Details**: 任意の詳細（箇条書き推奨）
- **Files**: 関連ファイルのパス
- **Cost/Duration**: 該当する場合
- **Related**: 関連するIssue ID / 前後のログエントリ
```

---

## 2026-04-12

### 02:35 - Paperclip を Tailscale Serve で他デバイスからアクセス可能に
- **Actor**: Claude Code本体セッション
- **Type**: Setup
- **Summary**: ローカルホスト限定だったPaperclipを、Tailscaleネットワーク内の他デバイス（スマホ・旧PC等）からもアクセスできるように Tailscale Serve で公開。インターネット公開ではないのでセキュア。
- **Details**:
  - 既存のTailscale Funnel設定（:443 → localhost:8443）を壊さないため、serve set-config ではなく `tailscale serve --bg --https=3100 http://127.0.0.1:3100` を使用
  - 結果: `https://ricky-omnibook.tail3a3559.ts.net:3100` (tailnet only) でPaperclipにアクセス可能
  - WSL2 Windows間のlocalhost forwardingを利用（Windows → 127.0.0.1:3100 → WSL2 Paperclip）
  - Tailscale証明書が自動で発行されるのでHTTPS警告なし
  - 設定は永続（PC再起動後も有効）
- **Related**: Paperclipの設定自体は local_trusted のまま（変更なし）

### 02:25 - Paperclip 自動起動設定（タスクスケジューラー）
- **Actor**: Claude Code本体セッション
- **Type**: Setup
- **Summary**: Windows ログイン時に Paperclip が自動起動するようにスクリプト + タスクスケジューラーを設定。
- **Details**:
  - `scripts/start-paperclip.sh` 作成（冪等、ログローテ、lockfile、起動確認付き）
  - PowerShell で `Start-Paperclip-AtLogin` タスク登録
    - Trigger: At logon (user: RICKY-OMNIBOOK\newgo)
    - Action: `wsl.exe -d Ubuntu -u ricky -- bash /mnt/c/Users/newgo/Claude用/scripts/start-paperclip.sh`
    - ExecutionTimeLimit: 5min
  - 冪等性テスト: 既に起動中の状態でスクリプト実行 → "nothing to do" で即終了 ✓
  - タスクスケジューラー経由実行: LastTaskResult=0 ✓
  - **未検証（次回PC再起動で自動テスト）**: 完全な停止状態からの自動起動フロー
- **Files**: `scripts/start-paperclip.sh`（新規）
- **Related**: CURRENT-STATE.md の Next Actions #3 を完了マーク

### 02:10 - プロトコル習得完了 (CMP-2)
- **Actor**: Paperclip CEO Agent
- **Type**: Task
- **Summary**: Heartbeat開始時のファイル読み込みプロトコルと、作業完了時の更新プロトコルを永続メモリに記録。今後の全heartbeatで自動適用される。
- **Details**:
  - CLAUDE.md と CURRENT-STATE.md を読み、現在の環境・状態を把握
  - プロトコルを3箇所に永続化:
    - PARA知識グラフ: `life/resources/protocols/` (summary.md + items.yaml)
    - Daily notes: `memory/2026-04-12.md`
    - Claude Code メモリ: `heartbeat-protocol.md` (MEMORY.md索引付き)
  - activity-log.md にこのエントリを追記（プロトコル自体の実践）
- **Files**: `life/resources/protocols/summary.md`, `life/resources/protocols/items.yaml`, `memory/heartbeat-protocol.md`
- **Issue**: CMP-2 `ac00f14a-8b14-4cd0-b248-db7c5126e700`

### 02:00 - Paperclip CEO にプロトコル学習タスク (CMP-2) を発注
- **Actor**: Claude Code本体セッション
- **Type**: Task
- **Summary**: PlaywrightなしでもCLIから issue 作成できることを確認。CEOに「今後全heartbeatで CLAUDE.md と CURRENT-STATE.md を先に読むプロトコル」を永続メモリに刷り込ませるためのタスク。
- **Details**:
  - `paperclipai issue create` CLI でCMP-2を作成
  - 初期statusが backlog だったため、`issue update --status todo` で昇格
  - 次のheartbeatでCEOが pickup する予定
  - 成果物: CEOの永続メモリにプロトコル記録 + activity-log へのエントリ追記
- **Files**: （Paperclip DB内 + 将来の workspaces/.../life/areas/... への記録）
- **Issue**: CMP-2 `ac00f14a-8b14-4cd0-b248-db7c5126e700`

### 01:30 - 共有ステータスアーキテクチャ設計
- **Actor**: Claude Code本体セッション
- **Type**: Decision / Setup
- **Summary**: 本体セッションとPaperclip CEOの情報ギャップを埋めるため、`tasks/CURRENT-STATE.md` と `tasks/activity-log.md` を新設し、CLAUDE.md にセッション開始時のチェックリストを追加。
- **Details**:
  - 問題: 会話履歴とメモリはセッション単位、リポジトリだけが両者で共有される
  - 解決: 3層アーキテクチャ（共有層=リポジトリ、個人層=メモリ、橋渡し=相互参照）
  - 両者がセッション開始時に `CURRENT-STATE.md` を読み、作業後に `activity-log.md` に追記する
- **Files**:
  - `tasks/CURRENT-STATE.md`（新規）
  - `tasks/activity-log.md`（新規）
  - `CLAUDE.md`（セッション開始チェックリスト追加）
- **Related**: 次の確認事項=Paperclipマルチエージェントテスト

### 01:20 - Paperclip CEO 初回タスク完了（CMP-1）
- **Actor**: Paperclip CEO Agent
- **Type**: Task
- **Summary**: リポジトリを自律的に読み込み、Q2最重要施策3つの戦略レポートを生成。12KB/204行。取締役会レビュー待ち。
- **Details**:
  - タスク: CMP-1 リポジトリの現状分析とQ2最重要施策3つの策定
  - CEOは最初にExploreサブエージェントを起動し、リポジトリ（/home/ricky/workspace）を自分で発見
  - 読んだファイル: CLAUDE.md, knowledge/business/事業戦略ロードマップ.md, 会社全事業データ総覧.md, tasks/todo.md, tasks/lessons.md
  - Tool calls: Bash 19, Read 8, Write 3, Skill 2, Glob 1, Agent 1
  - 戦略: ①ガイドブック→OW接続+LP切替 ②成約率42%→55% ③YouTube対談動画3本
  - Q2終了ラン・レート: ¥50M → ¥70-75M/year
  - CEO自身が「Issue reassigned to Ricky for review」と board review に送付
- **Files**: `tasks/paperclip-ceo-q2-strategy.md`（成果物）
- **Cost/Duration**: $1.20 / 5分2秒 / 35ターン / Opus 4.6[1M]
- **Tokens**: input 27, cache_read 917,761, cache_creation 56,994, output 12,479
- **Related**: CMP-1（Paperclip Issue）/ 次はボードレビュー

### 01:15 - CMP-1 タスク投入
- **Actor**: Claude Code本体セッション
- **Type**: Task
- **Summary**: PaperclipのNew Issue UIから最初のタスクをCEOに発注。
- **Details**:
  - タイトル: リポジトリの現状分析とQ2最重要施策3つの策定
  - Assignee: CEO
  - 内容: CLAUDE.md・agents/・knowledge/・tasks/ を読ませ、Q2 3施策を提案させる
- **Files**: （Paperclip内部）
- **Related**: CMP-1

### 01:10 - Paperclip workspace を Claude用リポジトリに bind
- **Actor**: Claude Code本体セッション
- **Type**: Setup
- **Summary**: シンボリックリンクで WSL から Windowsリポジトリへアクセス可能に。git safe.directory も設定。
- **Details**:
  - `/home/ricky/workspace` → `/mnt/c/Users/newgo/Claude用/`
  - `git config --global --add safe.directory '*'`
  - Paperclipサーバーを workspace ディレクトリから起動し直し
- **Files**: （WSL内シンボリックリンク）

### 01:00 - Paperclip 本体セットアップ完了
- **Actor**: Claude Code本体セッション
- **Type**: Setup
- **Summary**: WSL2 Ubuntu に Paperclip v2026.403.0 を導入、台湾留学101センター会社作成、CEOエージェント + Claude Codeアダプタで Test OK。
- **Details**:
  - WSL2 + Ubuntu（インストール時のパスワード入力で一度つまずいたが、起動後は安定）
  - ricky ユーザー作成（rootではPostgres起動不可のため）
  - nvm + Node 20.20.2 + pnpm 10.33.0
  - Claude Code CLI v2.1.101 を WSL にインストール
  - Windows側の `~/.claude/.credentials.json` を WSL の `/home/ricky/.claude/.credentials.json` にコピー → 認証成功
  - Paperclip doctor 9/9 pass, 埋め込みPostgres + UI (:3100) 起動確認
  - 台湾留学101センター会社、ミッション「台湾留学を通じて日本人の人生の選択肢を広げる。2027年までに売上1億円達成」
  - CEOエージェント、Claude Code adapter, Default model, Test now: Passed
- **Files**:
  - `/home/ricky/.paperclip/instances/default/` （WSL内、Paperclipデータ）
  - `.worktrees/tmp-start-paperclip.sh` （仮置き起動スクリプト）

### 00:20 - Paperclip vs Managed Agents 比較調査完了
- **Actor**: Claude Code本体セッション
- **Type**: Decision
- **Summary**: 2つのサブエージェントを並行起動して徹底調査。Paperclipの「会社運営」思想がリッキーさんの理想（自律タスク生成→実行→次）に最も近いと判明。ただしWindows 11では起動バグ未解決。
- **Details**:
  - PaperclipAI: OSS、5週間前にリリース、51K stars、ハートビート+組織図+予算管理
  - Claude Managed Agents: Anthropic公式、Outcomes/Multiagent/Memory、ただし「次に何をすべきか」の自律判断は含まない
  - Windows 11バグ（Issue #2932）は実在、WSL2で回避可能
- **Related**: 次→WSL2導入

### 00:00 頃 - リッキーさんの方針確認
- **Actor**: User（リッキーさん）
- **Type**: Decision
- **Summary**: 「エージェントが自律的にタスクを作成し、それを実行する環境を構築したい」という根本ニーズを明確化。Paperclipの理念が理想に近いと判断。台湾スピーク（台湾留学101センターの一プロジェクト）を題材にPaperclipを試す方針。
