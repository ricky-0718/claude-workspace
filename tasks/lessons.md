# Lessons Learned

## GAS Development
- `.timeDriven()` is not a valid method. Always use `.timeBased()` for trigger creation.
- Gmail search must include `newer_than:7d` to avoid reprocessing old emails.

## Browser Automation
- NEVER call `switch_browser`. Edge extension stays connected via `tabs_context_mcp`.
- GAS editor function dropdown: use `find` + `ref` click pattern, not direct DOM manipulation.
- Edge MCP: `javascript_tool` is the most stable action. `computer(screenshot)` and `find` can cause disconnection.
- Google Sheets データ入力: `computer(type)` はIME変換で不安定。`ClipboardEvent` 方式が最も確実:
  ```javascript
  const dt = new DataTransfer();
  dt.setData('text/plain', tsvData);
  const evt = new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true });
  document.activeElement.dispatchEvent(evt);
  ```
- Google Sheets シートタブ切替: `find` で ref 取得 → `left_click(ref)` が確実。`javascript_tool` の `.click()` は反映されないことがある。

## Asana MCP
- `create_task_preview` は1件ずつなら表示される。10件一括は表示されないことがある
- Asana Webへの直接遷移は desktop app にリダイレクトされることがある → `?open_in_browser=true` パラメータ付きURLで回避
- **日報タスクの作り方**: 完了したタスクは既存タスクのnotesに追記するのではなく、**毎回新しい個別タスクとして作成する**
- **タスク名の日付**: タスク名の冒頭に必ず `M/DD` 形式の日付を付ける（例: `2/23 メール自動保存を開始`）
- **コメントでのメンション**: `text`パラメータでは`@名前`はメンションにならない。`html_text`パラメータで`<a data-asana-gid="ユーザーGID"/>`を使う。最初からhtml_textを使うこと

## 面談文字起こしの処理
- **合意事項の抽出精度を上げる**: 文字起こしを議事録に変換する際、「受けます」「やります」等の合意表現を見落とさない。特に金額に関わる合意（オプション追加等）は、提案内容と分けて考えず、合意された全体の契約金額として正確に反映する
- **面談中に決まった追加オプションは最初から合算する**: 99万+20万=119万のように、面談で合意されたオプションは別扱いにせず、最初から合計金額で記録する

## Clipboard (Windows)
- Bashの `clip.exe` にヒアドキュメントやパイプで日本語を渡すと**文字化け（Shift-JIS変換）**する
- **正解**: PowerShell経由でコピーする
  ```bash
  powershell -Command "Get-Content -Path 'ファイルパス' -Encoding UTF8 | Set-Clipboard"
  ```
- ファイルがない場合は一時ファイルに書き出してからPowerShellでコピー

## Memory Management
- **ツール導入・設定完了時は即座にMEMORY.mdに記録する**。セッション終了時まで待つと記録漏れのリスクがある
- 対象: 新しいCLIツールのインストール、API認証設定、環境構築など
- セッション終了処理に頼らず、完了した時点でその場で書く

---
*This file is auto-updated when corrections are received. See CLAUDE.md > Self-Improvement Loop.*
