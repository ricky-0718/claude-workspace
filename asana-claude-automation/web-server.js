const express = require('express');
const path = require('path');
const state = require('./state');
const executor = require('./executor');

const app = express();

// 静的ファイル配信
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 承認ページを表示
 * GET /approve/:token
 */
app.get('/approve/:token', (req, res) => {
  const task = state.getTaskByToken(req.params.token);
  if (!task) {
    return res.status(404).sendFile(path.join(__dirname, 'public', 'approve.html'));
  }
  res.sendFile(path.join(__dirname, 'public', 'approve.html'));
});

/**
 * タスクのステータスをJSON返却
 * GET /api/status/:token
 */
app.get('/api/status/:token', (req, res) => {
  const task = state.getTaskByToken(req.params.token);
  if (!task) {
    return res.status(404).json({ error: 'タスクが見つかりません' });
  }
  res.json({
    taskName: task.taskName,
    taskNotes: task.taskNotes,
    status: task.status,
    error: task.error,
    startedAt: task.startedAt,
    finishedAt: task.finishedAt,
  });
});

/**
 * タスクの実行を開始
 * POST /api/approve/:token/execute
 */
app.post('/api/approve/:token/execute', (req, res) => {
  const task = state.getTaskByToken(req.params.token);
  if (!task) {
    return res.status(404).json({ error: 'タスクが見つかりません' });
  }

  if (task.status !== 'approval_pending') {
    return res.status(400).json({
      error: `タスクは現在「${task.status}」状態です。承認待ちのタスクのみ実行できます。`
    });
  }

  // 承認済みに更新
  state.updateStatus(task.taskGid, 'approved', { approvedAt: new Date().toISOString() });

  // 非同期で実行開始（レスポンスは即座に返す）
  executor.runTask(task.taskGid).catch(err => {
    console.error('[WebServer] タスク実行中にエラー:', err.message);
  });

  res.json({ message: '実行を開始しました', taskGid: task.taskGid });
});

/**
 * デバッグ: メモリ上のタスク一覧
 * GET /debug/tasks
 */
app.get('/debug/tasks', (req, res) => {
  const statuses = ['waiting', 'approval_pending', 'approved', 'running', 'done', 'error'];
  const result = {};
  for (const s of statuses) {
    result[s] = state.getTasksByStatus(s);
  }
  res.json(result);
});

/**
 * ヘルスチェック
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

/**
 * サーバーを起動
 */
function start(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve();
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`[Server] ❌ ポート ${port} はすでに使用されています。`);
        console.error('[Server] 別のサーバーが動いていないか確認してください。');
      }
      reject(err);
    });
  });
}

module.exports = { start };
