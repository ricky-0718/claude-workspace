const config = require('./config');
const state = require('./state');
const asana = require('./asana-client');
const webServer = require('./web-server');
const poller = require('./poller');

async function main() {
  console.log('');
  console.log('========================================');
  console.log('  Asana → Claude Code 自動化システム');
  console.log('========================================');
  console.log('');

  // 1. 設定値の検証
  config.validate();
  console.log('');

  // 2. 状態ファイルから前回の状態を復元
  state.loadFromFile();

  // 3. PC再起動後のスタックタスクを回復
  await recoverStuckTasks();

  // 4. Expressサーバー起動
  await webServer.start(config.PORT);
  console.log(`[Server] 承認サーバー起動: http://localhost:${config.PORT}`);

  // 5. Asanaポーリング開始
  poller.startPolling();
  console.log(`[Poller] ${config.POLL_INTERVAL_MS / 1000}秒ごとにAsanaをチェックします`);

  console.log('');
  console.log('========================================');
  console.log('  起動完了！Asanaにタスクを追加してください');
  console.log('========================================');
  console.log('');
}

/**
 * サーバー再起動時のスタックタスク回復
 * 「実行中」だったタスクはプロセスが死んでいるため「エラー」に変更
 */
async function recoverStuckTasks() {
  const stuckTasks = state.getTasksByStatus('running');
  if (stuckTasks.length === 0) return;

  console.log(`[Recovery] ${stuckTasks.length}件のスタックタスクを発見`);

  for (const task of stuckTasks) {
    console.warn(`[Recovery] スタックタスク: "${task.taskName}" (${task.taskGid})`);

    try {
      await asana.postComment(
        task.taskGid,
        '⚠️ サーバーが再起動したため、実行が中断されました。\n' +
        'タスクを「待機中」に戻すと再実行できます。'
      );
      await asana.moveTaskToSection(task.taskGid, config.SECTION_ERROR);
    } catch (err) {
      console.error(`[Recovery] Asana更新失敗 (${task.taskGid}):`, err.message);
    }

    state.updateStatus(task.taskGid, 'error', {
      error: 'サーバー再起動により中断',
      finishedAt: new Date().toISOString(),
    });
  }
}

// 起動
main().catch(err => {
  console.error('起動エラー:', err);
  process.exit(1);
});
