# Asana API 注意点・知見

## サブタスク作成

### 正しいパターン
```javascript
// 親タスクのサブタスクとして直接作成
await fetch(`https://app.asana.com/api/1.0/tasks/${parentGid}/subtasks`, {
  method: "POST",
  headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
  body: JSON.stringify({ data: { name, assignee, due_on, notes } }),
});
```

### やってはいけないパターン
```javascript
// NG: parent/projects/workspace なしで /tasks に POST → 400エラー
await fetch("https://app.asana.com/api/1.0/tasks", {
  method: "POST",
  body: JSON.stringify({ data: { name, assignee, due_on, notes } }), // parent も projects もない
});
// → "You should specify one of workspace, parent, projects"

// NG: 作成後に setParent で親子関係を設定する2ステップ方式
// 最初の POST で上記エラーが出るため到達しない
```

### 根拠
- 2026/3/22 Circleback面談パイプラインで発生。`asana-mendan.js` で修正済み
- Asana REST API は `/tasks` POST 時に `workspace`, `parent`, `projects` のいずれか1つが必須

## タスク作成の必須パラメータ

| エンドポイント | 用途 | 必須パラメータ |
|---|---|---|
| `POST /tasks` | 通常タスク作成 | `projects` または `workspace` |
| `POST /tasks/{parent}/subtasks` | サブタスク作成 | なし（親はURLで指定済み） |
| `POST /sections/{section}/addTask` | セクション移動 | `task` (GID) |

## 日報プロジェクト固有ルール
- プロジェクトID: `1209935959800165`
- **assignee・due_on は絶対に設定しない**（他プロジェクトでは必須）
