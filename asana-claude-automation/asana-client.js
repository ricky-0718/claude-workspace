const config = require('./config');

const BASE_URL = 'https://app.asana.com/api/1.0';

/**
 * Asana REST APIを呼び出す共通ヘルパー
 * レート制限(429)は指数バックオフで3回リトライ
 */
async function asanaRequest(method, path, body = null) {
  const maxRetries = 3;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${config.ASANA_PAT}`,
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      options.body = JSON.stringify({ data: body });
    }

    const res = await fetch(`${BASE_URL}${path}`, options);

    // レート制限の場合はリトライ
    if (res.status === 429 && attempt < maxRetries) {
      const waitMs = Math.pow(2, attempt) * 1000;
      console.warn(`[Asana] レート制限。${waitMs}ms後にリトライ (${attempt + 1}/${maxRetries})`);
      await new Promise(r => setTimeout(r, waitMs));
      continue;
    }

    if (!res.ok) {
      const buf = await res.arrayBuffer();
      const text = new TextDecoder('utf-8').decode(buf);
      throw new Error(`Asana API エラー: ${res.status} ${method} ${path}\n${text}`);
    }

    // Windows環境でのUTF-8文字化け防止：明示的にUTF-8デコード
    const buf = await res.arrayBuffer();
    const text = new TextDecoder('utf-8').decode(buf);
    const json = JSON.parse(text);
    return json.data;
  }
}

/**
 * 指定セクション内の未完了タスク一覧を取得
 */
async function getTasksInSection(sectionGid) {
  return asanaRequest(
    'GET',
    `/sections/${sectionGid}/tasks?opt_fields=gid,name,notes,created_at&completed_since=now`
  );
}

/**
 * タスクの詳細を取得
 */
async function getTask(taskGid) {
  return asanaRequest(
    'GET',
    `/tasks/${taskGid}?opt_fields=gid,name,notes,completed,created_at`
  );
}

/**
 * タスクをセクションに移動
 */
async function moveTaskToSection(taskGid, sectionGid) {
  return asanaRequest('POST', `/sections/${sectionGid}/addTask`, {
    task: taskGid,
  });
}

/**
 * タスクにコメントを投稿
 */
async function postComment(taskGid, text) {
  return asanaRequest('POST', `/tasks/${taskGid}/stories`, {
    text,
  });
}

/**
 * タスクを完了にする
 */
async function completeTask(taskGid) {
  return asanaRequest('PUT', `/tasks/${taskGid}`, {
    completed: true,
  });
}

/**
 * プロジェクトのセクション一覧を取得
 */
async function getProjectSections(projectGid) {
  return asanaRequest(
    'GET',
    `/projects/${projectGid}/sections?opt_fields=gid,name`
  );
}

module.exports = {
  getTasksInSection,
  getTask,
  moveTaskToSection,
  postComment,
  completeTask,
  getProjectSections,
};
