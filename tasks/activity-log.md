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

### 2026-04-15 16:55 - おさるさんにファネル方向性を相談（LP「イベント感」の器選択）
- **Actor**: Claude Code本体 + User
- **Type**: Decision（外部相談・返信待ち）
- **Summary**: オートウェビナーLP（LINE追加率0.35%）とガイドブックLP（7.48%）の21倍乖離を踏まえ、「イベント感を出すのは前提で、どちらの器で出すか」をおさるさんにLINE相談
- **Details**:
  - **前段**: おさるさんから音声返信（`C:/Users/newgo/Downloads/20260415030037.mp4` / 450KB）受領。「広告ROAS 840めちゃ良い／オートウェビナー継続OK／ただし『イベント感』を足し始める時期」という推奨。おさる自身もこのパターンにシフト中
  - **送付した数字**:
    - 入口LINE追加率: OW LP **0.35%**（目標10%）/ ガイドブックLP **7.48%**
    - ファネル以降は全部目標超え（CTR 4.42%、説明会参加率82.59%、個別相談率21.08%、成約率34.29%、面談実施率85.71%、ROAS **620.18%**）
    - CPA ¥13,950（目標¥20,000）/ CPO ¥233,670（目標¥100,000）＝客単価が高く回ってる構造
  - **相談した2択**:
    - A. 既存オートウェビナーLPにイベント感を追加して改善
    - B. LINE追加率が高いガイドブック側を入口にし、そこにイベント感を足して誘導
  - **LP**: OW https://sub.ryugaku101.com/page/1fqyVBN0aNsn ／ ガイドブック https://sub.ryugaku101.com/page/8r209OrEG7kQ
  - **ドラフト検討の学び**: 初回ドラフトは「LP改善のみ or イベント感」の誤2択だった → User メタ指示で「両方イベント感前提、**どちらの器か**」に正しく修正
- **Next**: おさる回答待ち → 回答後にLPイベント感実装（カウントダウン／限定特典／期間訴求の具体パターン設計）
- **Related**: `project_1oku_roadmap`, `project_guidebook_funnel_pivot`, `knowledge/marketing/osaru-methodology`, `reference_kpi_dashboard`

---

### 2026-04-15 16:50 - 上野航 提案書 ファクトチェック＆更新（Asanaレビュー反映）
- **Actor**: Claude Code本体
- **Type**: Task + Review
- **Summary**: Asanaタスク 1214021516535483 の王さん・大勝晴斗レビューに基づき、上野航 提案書の誤情報10項目を修正、元智大學追加、政治大合格強調を削除
- **Details**:
  - ファクトチェック ソース: 淡江115學年度簡章PDF・銘傳114學年度簡章PDF・社内DB（schools.json, departments.json）・王さん提供資料
  - **確定修正**:
    - 「全球政治經濟學系」の所属校確定 → 淡江（王さんメモの台中教育大學は誤記）
    - 淡江 学雜費: 「39,000-40,800/学期（学費のみ）」→ 56,260/学期（学費+雑費、年112,520 NTD）
    - 淡江 財力証明: 100,000 → 195,000 NTD / 6,500 USD（115簡章）
    - 銘傳 学科差し替え: 國際企業與貿易 → **國際事務與外交學士學位學程**（政治志望に合致）
    - 銘傳 学費: USD 5,000/年 → NT$46,201/学期（92,402/年）
    - 東海 IDP 財力証明: 120,000 → 100,000 NTD / 3,500 USD
    - 東海 政治學系 学費追加: NT$57,860/学期
  - **新規追加**: 元智大學 社會暨政策科學學系（中国語、48,389/学期、〜6/1）→ 候補9校に拡大
  - **戦略変更**: 「国立政治大合格」を強みとして前面に出すのをやめる（王さん指摘: 「政治大を選べる状況で淡江を選ぶ人はほぼいない→何か問題があって進学しなかったと疑念を持たれる」）
- **Files**:
  - `knowledge/students/提案書_上野航.md`（全面書き直し）
  - `knowledge/students/提案書_上野航.html`（全面書き直し、CSS保持）
  - `knowledge/students/提案書_上野航.pdf`（Edge headless再生成 1.15MB）
- **Related**: Asana 1214021516535483、feedback_proposal_factcheck.md、feedback_ueno_unlimited_applications.md

### 2026-04-14 19:40 - 台湾スピーク フィードバック一括対応＆マスター度バグ修正
- **Actor**: Claude Code本体
- **Type**: Task + Issue
- **Summary**: 台湾人レビュー＋ユーザーフィードバックで出た7項目＋マスター度ロジックの深堀りバグを一括修正、全Fly.ioデプロイ完了
- **Details**:
  - UI/文言: パスコード→パスワード、音の高さ→トーン、マスター度説明文更新
  - データ: ピンインマスター69→20問、声調修正（謝謝=xiè xie、名字=míng zi、漂亮=piào liàng）
  - マスター度ロジック全面刷新:
    - クイズでの更新を廃止、発音ドリル総合80点以上のみで認定（一度固定）
    - カード表示＝総合スコアに統一
    - `lesson_id.startsWith('book')`条件撤廃（travel-*レッスンでマスター認定が効かないバグ修正）
    - マスターバッジ（B案: ゴールド枠＋MASTERリボン）実装、80点取得時リアルタイム反映
    - 進捗バーも連動更新（カードリセットしない軽量再取得 `refreshLessonProgress()`）
  - 本番DBマイグレーション（Fly.io SSH経由）:
    - ピンインマスター20問を本番反映（FK制約回避で削除→再投入）
    - 声調データ修正を本番DBに反映（謝謝4件、名字3件、漂亮4件）
    - `backfill-mastery.js`: ドリル80+で未認定だった19件を救済（新良13件、華原6件）
    - `fix-mastery-migration.js`: 昔のクイズ誤答で`correct_count<=incorrect_count`になっていた単語を救済
  - 診断スクリプト `diagnose-mastery.js` で網羅チェック → [1]未認定0件・[2]vocab_count不一致0件 達成
- **Files**:
  - `chinese-ai-coach/public/js/app.js` `public/index.html` `public/css/style.css`
  - `chinese-ai-coach/server/routes/speech.js` `server/routes/curriculum.js` `server/routes/tts.js`
  - `chinese-ai-coach/scripts/{import-pinyin-lesson,debug-mastery,diagnose-mastery,backfill-mastery,fix-mastery-migration}.js`
  - `chinese-ai-coach/curriculum-data.sql` `full-data-export.sql` `scripts/_pinyin-fix-book1.json` `scripts/all-vocab-export.json`
- **Related**: project_chinese_ai_coaching (BAND配布準備フェーズ)

### 2026-04-14 15:45 - 上野航 追加出願先提案書の作成（PDF化＋Drive保存完了）
- **Actor**: Claude Code本体
- **Type**: Task
- **Summary**: 政治大合格済みの航に、追加出願先7校8学科の提案書を作成。HTML→PDF化してDrive保存まで完了。
- **Details**:
  - 7校8学科を提案: 淡江(全球政治經濟/外交國際關係) + 東海(IDP/政治) + 文藻(國際事務) + 銘傳 + 輔仁 + 東吳(政治)
  - 各校の115學年度外國學生簡章を自分で取得・PDF解析（pdf2json）して出願期限・学費・財力証明を確認
  - 学費は外國學生向け金額を使用（淡江56,260 / 銘傳46,201 / 東海IDP 69,020 / 東海政治57,860 / 文藻54,239）
  - 定員情報は僑生ルート（海聯會）の数字だったので全て削除
  - 出願数制限・出願料はユーザーから「記載不要」との指示で削除（こちら全額負担＋無制限対応）
  - モバイル対応のカード型HTMLで制作、Tailscale Funnelで共有
  - Edge headlessでPDF化、Drive提案資料サブフォルダにアップロード
- **Files**:
  - `knowledge/students/提案書_上野航.md`
  - `knowledge/students/提案書_上野航.html`
  - `knowledge/students/提案書_上野航.pdf` (1.18MB)
  - Drive ID: `1B4GzWIo-Nh9umHqNscr1OD00-qLi0A3c`
- **Cost/Duration**: セッション全体
- **Related**: `feedback_proposal_factcheck.md`（反省: 「要確認」を提案書に書いた→自分で確認して書き直し）、`feedback_ueno_unlimited_applications.md`（新規メモリ）

---

## 2026-04-13

### 2026-04-13 16:30 - 4期生向け動画撮影ガイド＋業務提携契約書＋台本テンプレート作成
- **Actor**: Claude Code本体
- **Type**: Task
- **Summary**: 4期生（台湾留学中）が中国語チャレンジ動画を撮影し、弊社SNSに投稿するための3点セット完成
- **Details**:
  - 撮影ガイド: マーケ知識ゼロの生徒向け。ミッション12個、インサートカット指示、参考TikTokリンク5本
  - 業務提携契約書: 素材¥2,500 / 編集済み¥5,000の動画買取。肖像権・著作権譲渡・守秘義務
  - 台本テンプレート集: おさるAI GPTで生成した3企画分（タピオカ/夜市/蛋餅）の秒数ごとカット割り＋空テンプレート
- **Files**:
  - `tasks/4kise-video-shooting-guide.md`
  - `tasks/4kise-video-script-templates.md`
  - `tasks/4kise-video-partnership-contract.md`
  - Google Docs 3点 → 成果物フォルダ格納済み

### 2026-04-13 - LINE導線統合 設計書5点完成（CMP-11）
- **Actor**: Paperclip CTO Agent
- **Type**: Task
- **Summary**: LINE導線統合プロジェクトの設計書5点を作成完了。統合シナリオ設計、大学DB CTA配置、ブログ→LINE導線、挨拶メッセージ4パターン、全体ファネルフロー図。
- **Details**:
  - おさる式メソドロジー、ファネルテンプレ、Q2戦略レポート、大学DB構造、既存LINEシナリオ、特典一覧、voice-guideを参照して設計
  - 大学DBサイトの既存LineCTA.astroコンポーネントを確認し、改良案を含めた
  - タグ体系: 流入経路タグ8種 + 進捗タグ7種 + 属性タグで全行動追跡
  - 面談キャパシティ（月20件）が成約数の実質ボトルネックであることを特定
  - 全設計書でUTAGE絶対ルール（他シナリオ連携触らない）を明記
- **Files**:
  - `tasks/line-funnel-01-scenario-architecture.md`
  - `tasks/line-funnel-02-db-cta-placement.md`
  - `tasks/line-funnel-03-blog-line-design.md`
  - `tasks/line-funnel-04-greeting-messages.md`
  - `tasks/line-funnel-05-funnel-flow.md`
- **Related**: CMP-11, CMP-10（親タスク）

---

### 2026-04-13 - LINE導線統合プロジェクト ブリーフ作成
- **Actor**: Claude Code本体
- **Type**: Decision
- **Summary**: 大学DBサイトローンチに向けたLINE導線統合プロジェクトの方針決定＆Paperclipタスクブリーフ作成。
- **Details**:
  - リッキーさんと4つの戦略的意思決定を完了:
    1. シナリオ構成 → 統合型（1シナリオ、タグで流入元管理）
    2. LINE登録フック → ガイドブックプレゼント
    3. 特典振り分け方針 → LINE登録=台湾全般知識、ウェビナー後=101内部情報（詳細は後日）
    4. 挨拶トーン → 台湾留学の専門家
  - 既存特典コンテンツの全棚卸し実施（ガイドブック、LINE6大特典、ウェビナー8大特典、安全ファクトレポート）
  - Paperclip用プロジェクトブリーフを作成
- **Files**: `tasks/paperclip-line-funnel-project.md`
- **Related**: Q2施策1（ガイドブックファネル→OW接続）

---

## 2026-04-12

### 02:50 - Asana 日報投稿・メモリ索引更新・セッション終了準備
- **Actor**: Claude Code本体セッション
- **Type**: Setup / Note
- **Summary**: 本日の成果を Asana 日報プロジェクトに投稿。Paperclipプロジェクトメモリを `memory/project_paperclip.md` に新規作成し、MEMORY.md索引にも登録。次セッションが Paperclip の存在を自動認識できる状態に。
- **Details**:
  - Asana 日報タスク作成: `https://app.asana.com/0/1209935959800165/1214012873612293`
  - `memory/project_paperclip.md` を新規作成（会社ID・CEO ID・URL・CLI操作方法等を網羅）
  - MEMORY.md の Projects セクションに Paperclip エントリ追加
  - セッション冒頭のコミット（9c699b8）以降に発生した変更は CURRENT-STATE と activity-log の追記のみ
- **Related**: コミット 9c699b8 / 次セッションへの引き継ぎ準備完了

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
