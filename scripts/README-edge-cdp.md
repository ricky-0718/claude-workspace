# Edge CDP 起動アーキテクチャ

Playwright MCP（`mcp__playwright__*`）が Edge を操作するには、Edge が `--remote-debugging-port=9222` 付きで起動している必要がある。本ドキュメントは、その「CDP付きEdge」を**常にユーザーのデフォルトプロファイル**で維持するための仕組みを解説する。

## 絶対ルール

**`--user-data-dir` で別プロファイルを作ってはならない**。ユーザーのデフォルトプロファイル（ログイン済みセッション）をそのまま使う。

- 理由: 別プロファイルでUTAGE等にログインすると、メインEdgeのセッションが切れる（UTAGEは同時ログイン不可）。2026/3/18 に発生済み。
- メモリ: `feedback_edge_cdp_same_profile`

## 3層防衛

| 層 | 仕組み | 起動タイミング | 設定ファイル |
|---|---|---|---|
| **L1** | Windowsスタートアップ | ユーザーログイン時 | `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\Edge with CDP.lnk` |
| **L2** | タスクバーピン留め | タスクバーEdge起動時 | `%APPDATA%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar\Microsoft Edge.lnk` |
| **L3** | Claude Code SessionStart hook | CCセッション開始時 | `~/.claude/ensure-edge-cdp.js` |

**L3の動作**: CDP port 9222 がLISTENINGでない場合、全Edgeプロセスを `taskkill` → デフォルトプロファイルでCDP付きEdgeを再起動。強制復旧メカニズム。

**L1の追加背景**: SessionStart hookは「新CCセッション開始時のみ」走るので、PC再起動直後にPaperclip UI確認等でEdgeを使いたいときに不便だった。L1でログイン時から常にCDP有効になる。

## スクリプト一覧

| スクリプト | 用途 |
|---|---|
| `install-edge-cdp-autostart.ps1` | L1のスタートアップショートカットを作成（冪等・再実行可） |
| `check-edge-shortcuts.ps1` | 全Edgeショートカットの現状棚卸し（Args確認） |
| `patch-system-edge-shortcut.ps1` | ProgramData の Edge.lnk にCDP Argsをパッチ（**管理者権限必須**） |

## ProgramData Edge.lnk のパッチ（必要な時だけadmin実行）

### 何のために必要か

`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk` はシステム全体のスタートメニューに表示されるショートカット。Argsが空なので、ユーザーがスタートメニューから「Edge」を検索してクリックするとCDPなしEdgeが起動する。

### 実質的に必要か？

**90%不要**。L3（ensure-edge-cdp.js）がCCセッション開始時に強制復旧してくれるので、CDPなしEdgeが一時的に立ち上がっても次回CCセッションで自動修復される。

### それでもやりたい場合（= CCセッション非起動時にPlaywright直叩きする想定があるとき）

1. PowerShellを**管理者として実行**で起動
2. 以下を実行:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\newgo\Claude用\scripts\patch-system-edge-shortcut.ps1"
   ```
3. 期待出力:
   ```
   OK: patched C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk
   Args now: --remote-debugging-port=9222 --restore-last-session --no-first-run
   ```

### Windows Updateで上書きされる可能性

Edge が自動更新されると、ProgramData の Edge.lnk が再生成されてArgsが消える可能性がある。上書きされたら再度 admin パッチを実行する。

## トラブル対応

### Playwright MCP が `failed` になる

1. `check-edge-shortcuts.ps1` で現在のショートカット状態を確認
2. `netstat -ano | findstr :9222` で CDP port LISTENING か確認
3. LISTENING でない → 新しいCCセッションを開く（L3が自動復旧）
4. それでも直らない → Edgeプロセスを全終了してタスクバーのEdgeから再起動

### スタートアップが効かない

1. PC再起動後に `check-edge-shortcuts.ps1` で L1 の `Edge with CDP.lnk` が存在するか
2. 存在する場合 → Windowsのスタートアップ設定で該当ショートカットが無効化されていないか確認
3. 無い場合 → `install-edge-cdp-autostart.ps1` を再実行

## 変更履歴

- **2026-04-16**: L1 追加（スタートアップショートカット）、旧 `.playwright-data` 系スクリプト3本（start-edge-cdp.bat / find-pw-edge.ps1 / kill-pw-edge.ps1）を削除
- **2026/3/18**: `ensure-edge-cdp.js` を `--user-data-dir` なしに修正（feedback_edge_cdp_same_profile）
