const config = require('./config');
const asana = require('./asana-client');
const state = require('./state');

/**
 * ポーリングループを開始
 * setIntervalで定期的にAsanaの「待機中」セクションをチェックする
 */
function startPolling() {
  // 起動直後に1回実行
  pollOnce().catch(err => {
    console.error('[Poller] 初回ポーリングエラー:', err.message);
  });

  // その後は定期実行
  setInterval(async () => {
    try {
      await pollOnce();
    } catch (err) {
      // エラーは記録するだけ。次のサイクルで自動リトライ
      console.error('[Poller] ポーリングエラー:', err.message);
    }
  }, config.POLL_INTERVAL_MS);
}

/**
 * 1回のポーリング処理
 */
async function pollOnce() {
  const tasks = await asana.getTasksInSection(config.SECTION_WAITING);

  for (const task of tasks) {
    // すでに検出済みならスキップ（二重処理防止）
    if (state.isTaskKnown(task.gid)) continue;

    console.log(`[Poller] 🆕 新タスク検出: "${task.name}" (${task.gid})`);
    await handleNewTask(task);
  }
}

/**
 * 新しいタスクを処理する
 * 1. 状態に追加（トークン生成）
 * 2. Asanaコメントに承認リンクを投稿
 * 3. 「承認待ち」セクションに移動
 */
async function handleNewTask(task) {
  // 状態に追加してトークンを取得
  const token = state.addTask(task.gid, task.name, task.notes);

  // 承認URLを生成
  const approvalUrl = `http://localhost:${config.PORT}/approve/${token}`;

  // Asanaにコメントを投稿
  const comment =
    `🤖 Claude Code タスクを受け付けました\n\n` +
    `承認ページ: ${approvalUrl}\n\n` +
    `↑ このリンクをクリックして内容を確認し、「実行する」ボタンを押してください。\n` +
    `※ ローカルサーバー (localhost) のリンクです。サーバーが起動中のみ有効です。`;

  try {
    await asana.postComment(task.gid, comment);
    await asana.moveTaskToSection(task.gid, config.SECTION_APPROVAL);
    state.updateStatus(task.gid, 'approval_pending');
    console.log(`[Poller] ✅ 承認リンクを投稿しました: ${approvalUrl}`);
  } catch (err) {
    console.error(`[Poller] タスク処理エラー (${task.gid}):`, err.message);
    state.updateStatus(task.gid, 'error', { error: err.message });
  }
}

module.exports = { startPolling };
