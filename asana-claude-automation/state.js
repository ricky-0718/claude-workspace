const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const STATE_FILE = path.join(__dirname, 'state.json');

// メモリ上の状態
let tasks = {};

/**
 * ランダムな8文字トークンを生成（承認URL用）
 */
function generateToken() {
  return crypto.randomBytes(4).toString('hex');
}

/**
 * ファイルから状態を復元
 */
function loadFromFile() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      tasks = data.tasks || {};
      console.log(`[State] ${Object.keys(tasks).length}件のタスクを復元しました`);
    }
  } catch (err) {
    console.warn('[State] state.json の読み込みに失敗。初期状態で開始します:', err.message);
    tasks = {};
  }
}

/**
 * 状態をファイルに保存
 */
function saveToFile() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify({ tasks }, null, 2), 'utf8');
  } catch (err) {
    console.error('[State] state.json の保存に失敗:', err.message);
  }
}

/**
 * タスクがすでに検出済みか確認
 */
function isTaskKnown(taskGid) {
  return taskGid in tasks;
}

/**
 * 新しいタスクを追加し、承認トークンを返す
 */
function addTask(taskGid, taskName, taskNotes) {
  const token = generateToken();
  tasks[taskGid] = {
    taskGid,
    taskName,
    taskNotes: taskNotes || '',
    status: 'waiting',
    token,
    detectedAt: new Date().toISOString(),
    approvedAt: null,
    startedAt: null,
    finishedAt: null,
    error: null,
  };
  saveToFile();
  return token;
}

/**
 * 承認トークンからタスク情報を検索
 */
function getTaskByToken(token) {
  return Object.values(tasks).find(t => t.token === token) || null;
}

/**
 * タスクGIDからタスク情報を取得
 */
function getTask(taskGid) {
  return tasks[taskGid] || null;
}

/**
 * タスクのステータスを更新
 */
function updateStatus(taskGid, status, extra = {}) {
  if (tasks[taskGid]) {
    tasks[taskGid].status = status;
    Object.assign(tasks[taskGid], extra);
    saveToFile();
  }
}

/**
 * 指定ステータスのタスク一覧を取得
 */
function getTasksByStatus(status) {
  return Object.values(tasks).filter(t => t.status === status);
}

module.exports = {
  loadFromFile,
  saveToFile,
  isTaskKnown,
  addTask,
  getTaskByToken,
  getTask,
  updateStatus,
  getTasksByStatus,
};
