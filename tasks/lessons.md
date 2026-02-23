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

---
*This file is auto-updated when corrections are received. See CLAUDE.md > Self-Improvement Loop.*
