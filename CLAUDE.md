# CLAUDE.md

## User Preferences
- **Language**: Japanese. Always respond in Japanese.
- **Browser**: ALWAYS use Edge. NEVER attempt to connect to Chrome. NEVER call switch_browser. Always call tabs_context_mcp directly.
- **専門用語**: エンジニア用語が出たら、必ず中学生でも分かるように例え話で解説する。
- **LINE返信文の口調**: 語尾に「ね」を使わない。丁寧だがフランクすぎない文体で書く。

## セッション終了ルール
- セッションの作業が一区切りついたら、必ず「masterにマージしますか？」とユーザーに確認する
- ファイルが散らばるのを防ぐため、マージ忘れを防止する
- マージ後、「ワークツリーとブランチも削除しますか？」と確認する
- 承認されたら、自分のセッションのワークツリーのみを削除する（他セッションのものは触らない）

## Git Worktree ルール
- **削除は必ずユーザーの許可を得てから行う**: ワークツリー・ブランチの削除は、ユーザーが明示的に許可するまで絶対に実行しない
- **自分のワークツリーのみ操作**: 他セッションのワークツリーは絶対に削除しない
- **削除方法**: `git worktree remove <パス>` を使う（`rm -rf` 禁止）
- **作業完了時の手順**:
  1. masterにマージ
  2. ユーザーに「ワークツリーとブランチも削除しますか？」と確認
  3. 承認されたらブランチを削除: `git branch -D <ブランチ名>`
  4. バックグラウンドでワークツリー削除を起動（PowerShell経由。日本語パス対応）:
     ```
     powershell -Command "Start-Process -WindowStyle Hidden -FilePath 'C:/Users/newgo/Claude用/scripts/cleanup-worktree.bat' -ArgumentList '<ワークツリー名>'"
     ```
  5. ユーザーに「数秒後にワークツリーが自動削除されます」と伝える
- **作業途中の場合**: ワークツリーだけ削除してブランチは残す（次回セッションで続きができる）
- **セッション復帰時**: `git worktree list` で現在の状態を確認してから作業開始する

## Workflow Orchestration

### 1. Plan First
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Run tests, check logs, demonstrate correctness
- Ask yourself: "Would a staff engineer approve this?"
- Diff behavior between main and your changes when relevant

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- Skip this for simple, obvious fixes - don't over-engineer

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user

## Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## GAS (Google Apps Script) Development
- Trigger API: `.timeBased()` to use (`.timeDriven()` does not exist)
- Monaco editor bulk set: `window.monaco.editor.getModels()[0].setValue(code)`
- Gmail search: always include `newer_than:7d` to prevent reprocessing old emails
- Local copies: `C:\Users\newgo\Claude用\gas-scripts\`

## Asana 日報 自動記入
- **タスク完了時**: 重要なタスクを完了したら、必ずAsana日報プロジェクトに記入する
- **プロジェクトID**: `1209935959800165`（日報・週報）
- **セクション**: 「新良理輝」セクション
- **記入方法**: Asana MCPプラグイン（`asana_create_task`）で直接作成
  - 設定する項目: `name`（タスク名）、`project_id`、`section_id`（新良理輝）、`notes`（説明）
  - **担当者（assignee）と期日（due_on）は絶対に設定しない**
- **タスク説明のフォーマット**:
  ```
  ■ やったこと
  [何を改善・完了したかの説明]

  ■ 具体的な内容
  ・[詳細1]
  ・[詳細2]

  ■ 効果
  ・[ビジネス上の効果]
  ```
- **タスク名のルール**:
  - タスク名の冒頭に必ず日付を付ける（例: `2/23 メール添付の自動保存を開始`）
  - 形式: `M/DD タスク名`
- **書き方のルール**:
  - 専門用語を避け、やったことの「意味」を書く
  - 「GASスクリプトをデプロイ」ではなく「メール添付の自動保存を開始した」
  - AIの活用を社員にアピールする目的なので、ビジネス成果に焦点を当てる

## Node.js Development
- Node.jsパス: `"C:/Program Files/nodejs/node.exe"` （PATHに入っていないためフルパス必須）
- Bashでの`cd`+実行: `cd "C:/Users/newgo/Claude用/project" && "C:/Program Files/nodejs/node.exe" script.js`
- バックグラウンドサーバー起動時: 先に旧プロセスを停止すること。`WMIC PROCESS WHERE "name='node.exe' AND CommandLine LIKE '%server.js%'" GET ProcessId` で確認
- PowerShellの`$_`はBashから呼ぶとエスケープ問題が起きる。WMIC推奨

## Claude Code CLI (子プロセス起動)
- 入れ子セッション防止: 環境変数`CLAUDECODE`と`CLAUDE_CODE_ENTRYPOINT`のみ削除（他のCLAUDE_CODE_*は認証情報を含むため残す）
- stdin待ちハング防止: `stdio: ['ignore', 'pipe', 'pipe']`必須
- CLIパス自動検出: `%APPDATA%/Claude/claude-code/`以下のバージョンディレクトリをスキャン

## Windows固有の注意
- Bash(Git Bash)のcurlで日本語JSONを送るとShift-JISで送信され文字化けする。Node.jsのfetchまたはMCPツール経由で送ること

## Browser Automation
- Edge extension disconnects frequently. On disconnect, retry via `tabs_context_mcp`
- GAS editor function dropdown: use `find` to locate option, then `ref` to click
