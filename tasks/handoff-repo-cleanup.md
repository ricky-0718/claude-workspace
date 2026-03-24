# セッション引き継ぎ — 2026-03-24 リポジトリ大掃除 + Circlebackデプロイ

## 完了したこと

### 1. リポジトリ大掃除（3コミット: 784ac5f → ec3d613 → 450bbaf）
- **ゴミファイル削除**: `.tmp.driveupload/`（318MB）、`.tmp-*`（38個）、スクリーンショット45枚、ルート散在スクリプト14個を削除
- **.gitignore整備**: `.firecrawl/`, `.playwright-mcp/`, `.superpowers/`, `cloudflared.exe`, `drive-pdfs/`, おさるPDF、成果物PDF/HTML等を追加
- **ナレッジ・スキル一括登録**: `knowledge/`（おさるメソドロジー、Voice Guide、給料設定）、`.claude/skills/pl-analysis/`、`package.json`、`osaru-text1〜4.txt`等35ファイル
- **完了済みタスク26件削除**: 36ファイル → 11ファイルに削減
- **ワークツリー3つ + ブランチ15本削除**: masterのみのクリーンな状態に
- **ゴーストワークツリー参照8件削除**: `.git/worktrees/`の残骸をPowerShellで除去
- **リモートブランチ `feature/hinote-remote`削除**: GitHub上からも除去

### 2. メモリファイル調査 & 修正
- リポジトリ内の誤った`memory/`ディレクトリ（`Claude用/.claude/projects/.../memory/`）を発見
- `feedback_custom_proposal.md`を正しい場所（`~/.claude/projects/.../memory/`）にコピー後、リポジトリ内の誤ディレクトリを削除
- **メモリファイルは61件全て無傷で正しい場所に存在**

### 3. Circlebackパイプライン旧PCデプロイ
- `git pull`成功（旧PC: 450bbaf に更新済み）
- `restart.bat`が失敗 → RDPで手動`start.bat`実行 → **サーバー復帰確認済み**
- 面談パイプライン（名前補正・JST変換・LINE名自動設定・spreadsheet-lookup.js）が旧PCで稼働中

### 4. フィードバック記録
- `feedback_line_reply_check_utage.md` 更新: 「送信済みかどうかの確認もUTAGEを見ればわかる」追記

### 5. CLAUDE.md更新（ユーザーが実施）
- **brand-designer（ブランドデザイナー）** エージェント追加（11体目）
- ルーティングルール追加: 外部向け成果物はbrand-designerを経由

## 未完了・次にやること

### 優先度: 高
- [ ] **台湾情勢レポートPDF フッター余白修正** — 最終ページの「台湾留学101センター」下に余白がない。`overflow: hidden`が原因の可能性。修正後にPDF再生成 + Google Driveに再アップロード
- [ ] **尾曲さやこ 3日後LINE（3/25）** — Asanaサブタスク `1213753789113543` に下書きあり。送信前にUTAGEで最新やり取りを確認してからカスタマイズ

### 優先度: 中
- [ ] **MEMORY.md整理** — 完了プロジェクトの移動（HiNote、スキルリファクタリング、ENVセキュリティ等）、古い情報の更新（仮想チーム「6体」→「11体」、ナレッジ基盤のブランチ参照削除、Karinさん参照先修正）
- [ ] **brand-designerエージェント定義作成** — CLAUDE.mdに記載されたが `.claude/agents/brand-designer.md` はまだ未作成の可能性あり。確認して必要なら作成
- [ ] **旧PCデプロイの安定化** — restart.bat問題の根本対策。`tasks/scheduler-automation-plan.md`にタスクスケジューラでの自動復帰計画あり

### 優先度: 低
- [ ] **残りのtasksファイル棚卸し** — 11件のうち陳腐化したものがないか定期確認
- [ ] **成果物のDrive移動** — ルート直下の提案書PDF/HTML、LINE特典PDF等（.gitignoreで非表示だがローカルに残存）

## 重要なコンテキスト

### リポジトリの現状
- **git status**: clean（masterのみ、ブランチなし、ワークツリーなし）
- **最新コミット**: `450bbaf`（新PCも旧PCも同じ）
- **tasks/**: 11ファイル（lessons.md, todo.md, todo-next.md + 進行中ハンドオフ8件）

### 旧PCデプロイで学んだこと
- exec APIで旧PCにgitコマンドを送る際、gitのフルパス `"C:\Program Files\Git\cmd\git.exe"` が必要（PATHに入っていない）
- Node.js `-e` 経由だとエスケープ地獄。CMDコマンド直書きが安定
- `.tmp-deploy-*.mjs` パターンは使い捨てだが有効。今回は削除済み

### ゴーストワークツリーの原因
- 過去セッションでワークツリーのディレクトリだけ削除して `git worktree remove` を使わなかったため `.git/worktrees/` に参照が残った
- 今後はCLAUDE.mdの `cleanup-worktree.bat` 手順で防止

## 関連ファイル

### 今回変更・作成したファイル（コミット済み）
- `.gitignore` — 大幅追記（ツールディレクトリ、一時ファイル、成果物PDF/HTML）
- `.claudeignore` — 新規作成
- `.claude/agents/ad-analyst.md` — KPIダッシュボード参照追加
- `.claude/agents/ops-manager.md` — P&Lトリガー追加
- `.claude/settings.json` — Firebaseプラグイン許可追加
- `.claude/skills/pl-analysis/` — 新規スキル3ファイル
- `knowledge/` — おさるメソドロジー、Voice Guide、給料設定
- `tasks/todo-next.md` — circleback deploey済みにチェック

### 残存タスクファイル（11件）
- `tasks/lessons.md` — 永続
- `tasks/todo.md` — 永続
- `tasks/todo-next.md` — 直近タスク
- `tasks/handoff-neta-stock.md` — GASデプロイ待ち
- `tasks/handoff-upsider-accounting.md` — Stripe残作業
- `tasks/headline-improvement-handoff.md` — UTAGEヘッドライン実装待ち
- `tasks/knowledge-base-handoff.md` — ナレッジ基盤残作業
- `tasks/plan-feedback-auto-capture.md` — フィードバック自動キャプチャ未実装
- `tasks/scheduler-automation-plan.md` — タスクスケジューラ未実装
- `tasks/spectre-evolution-handoff.md` — Spectre Phase 2-4
- `tasks/virtual-team-roadmap.md` — チームロードマップ
