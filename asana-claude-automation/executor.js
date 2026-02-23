const { spawn } = require('child_process');
const config = require('./config');
const state = require('./state');
const asana = require('./asana-client');

/**
 * Claude Code CLIでタスクを実行する
 */
async function runTask(taskGid) {
  const taskInfo = state.getTask(taskGid);
  if (!taskInfo) throw new Error(`タスク ${taskGid} が見つかりません`);

  // ステータス更新 → 「実行中」に移動
  state.updateStatus(taskGid, 'running', { startedAt: new Date().toISOString() });

  try {
    await asana.moveTaskToSection(taskGid, config.SECTION_RUNNING);
  } catch (err) {
    console.warn('[Executor] セクション移動に失敗（続行）:', err.message);
  }

  // プロンプトを構築（タスク名 + 説明文）
  const prompt = [taskInfo.taskName, taskInfo.taskNotes].filter(Boolean).join('\n\n').trim();
  console.log(`[Executor] 実行開始: ${taskInfo.taskName}`);
  console.log(`[Executor] プロンプト: ${prompt.substring(0, 100)}...`);

  const startTime = Date.now();

  try {
    const result = await spawnClaude(prompt);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    await handleSuccess(taskGid, result, elapsed);
  } catch (err) {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    await handleError(taskGid, err, elapsed);
  }
}

/**
 * Claude Code CLIを子プロセスとして起動
 */
function spawnClaude(prompt) {
  return new Promise((resolve, reject) => {
    const args = [
      '-p', prompt,
      '--output-format', 'text',
      '--max-budget-usd', config.CLAUDE_MAX_BUDGET_USD,
      '--no-session-persistence',
    ];

    console.log(`[Executor] 起動: ${config.CLAUDE_EXE}`);
    console.log(`[Executor] 引数: ${args.join(' ').substring(0, 200)}`);

    // 環境変数から入れ子セッション防止の変数だけを除外
    // （他のCLAUDE_CODE_*は認証情報等を含むため残す）
    const env = { ...process.env };
    const keysToDelete = ['CLAUDECODE', 'CLAUDE_CODE_ENTRYPOINT'];
    for (const key of keysToDelete) {
      if (key in env) {
        console.log(`[Executor] 環境変数を削除: ${key}`);
        delete env[key];
      }
    }

    const proc = spawn(config.CLAUDE_EXE, args, {
      cwd: config.CLAUDE_WORKING_DIR,
      timeout: 5 * 60 * 1000, // 5分タイムアウト
      env,
      // stdinを閉じてTTY入力待ちを防止
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    proc.on('close', (code) => {
      console.log(`[Executor] 終了コード: ${code}`);
      if (code === 0) {
        resolve({ stdout, stderr, exitCode: code });
      } else {
        reject(new Error(
          `Claude Code が終了コード ${code} で終了\n` +
          `stdout: ${stdout.substring(0, 500)}\n` +
          `stderr: ${stderr.substring(0, 500)}`
        ));
      }
    });

    proc.on('error', (err) => {
      reject(new Error(`Claude Code の起動に失敗: ${err.message}`));
    });
  });
}

/**
 * 実行成功時の処理
 */
async function handleSuccess(taskGid, result, elapsedSec) {
  // 結果を切り詰め（Asanaコメントの文字数制限対策）
  const maxLen = 5000;
  let summary = result.stdout.trim();
  if (summary.length > maxLen) {
    summary = summary.substring(0, maxLen) + '\n\n... (結果が長いため省略)';
  }

  const comment =
    `✅ 実行完了（${elapsedSec}秒）\n\n` +
    `--- 結果 ---\n${summary}`;

  try {
    await asana.postComment(taskGid, comment);
    await asana.completeTask(taskGid);
    await asana.moveTaskToSection(taskGid, config.SECTION_DONE);
  } catch (err) {
    console.error('[Executor] Asanaへの結果書き込みに失敗:', err.message);
  }

  state.updateStatus(taskGid, 'done', { finishedAt: new Date().toISOString() });
  console.log(`[Executor] 完了: ${taskGid} (${elapsedSec}秒)`);
}

/**
 * 実行エラー時の処理
 */
async function handleError(taskGid, err, elapsedSec) {
  const errorMsg = err.message.substring(0, 2000);
  const comment =
    `❌ 実行エラー（${elapsedSec}秒）\n\n` +
    `${errorMsg}\n\n` +
    `手動で確認してください。タスクを「待機中」に戻すと再実行できます。`;

  try {
    await asana.postComment(taskGid, comment);
    await asana.moveTaskToSection(taskGid, config.SECTION_ERROR);
  } catch (e) {
    console.error('[Executor] Asanaへのエラー書き込みに失敗:', e.message);
  }

  state.updateStatus(taskGid, 'error', {
    finishedAt: new Date().toISOString(),
    error: errorMsg,
  });
  console.error(`[Executor] エラー: ${taskGid}`, errorMsg);
}

module.exports = { runTask };
