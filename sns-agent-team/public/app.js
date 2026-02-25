/**
 * app.js
 *
 * SNS コンテンツ企画ダッシュボード - フロントエンドロジック
 */

// ---------------------------------------------------------------------------
// グローバル状態
// ---------------------------------------------------------------------------

/** @type {EventSource|null} */
let currentSSE = null;

/** @type {string|null} 現在進行中の generation ID */
let currentGenerationId = null;

/** @type {Object<string, string>} プラットフォーム別コンテンツ (タブ用) */
let currentOutputs = {};

/** @type {string} 現在選択中のタブ */
let activeTab = '';

// プラットフォーム表示名 & アイコン
const PLATFORM_LABELS = {
  instagram: '\uD83D\uDFE3 Instagram',
  x: '\uD835\uDD4F X',
  youtube: '\u25B6\uFE0F YouTube',
  note: '\uD83D\uDCDD NOTE',
  all: '\uD83D\uDCCB すべて',
};

// ---------------------------------------------------------------------------
// ページ読み込み時
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadResults();
  loadGptsConfig();
});

// ---------------------------------------------------------------------------
// 1. loadResults - 過去の結果一覧を取得
// ---------------------------------------------------------------------------
async function loadResults() {
  const container = document.getElementById('history-list');
  try {
    const res = await fetch('/api/results');
    const generations = await res.json();

    if (!generations || generations.length === 0) {
      container.innerHTML = '<p class="text-gray-400 text-sm">まだ結果がありません</p>';
      return;
    }

    container.innerHTML = generations
      .map((g) => {
        const date = new Date(g.created_at).toLocaleString('ja-JP');
        const badgeClass = `badge-${g.status}`;
        return `
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition"
               onclick="showResult('${g.id}')">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-800">${escapeHtml(g.theme)}</p>
                <p class="text-xs text-gray-400 mt-1">${date}</p>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">
                ${g.status}
              </span>
            </div>
          </div>
        `;
      })
      .join('');
  } catch (err) {
    container.innerHTML = '<p class="text-red-400 text-sm">読み込みに失敗しました</p>';
    console.error('loadResults error:', err);
  }
}

// ---------------------------------------------------------------------------
// 2. submitGeneration - 企画依頼の送信
// ---------------------------------------------------------------------------
async function submitGeneration() {
  const theme = document.getElementById('input-theme').value.trim();
  const target = document.getElementById('input-target').value.trim();
  const checkboxes = document.querySelectorAll('.platform-cb:checked');
  const platforms = Array.from(checkboxes).map((cb) => cb.value);

  // バリデーション
  if (!theme) {
    alert('テーマを入力してください');
    return;
  }
  if (platforms.length === 0) {
    alert('SNSプラットフォームを1つ以上選択してください');
    return;
  }

  // ボタンをdisabled + スピナー表示
  const btn = document.getElementById('btn-submit');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> 処理中...';

  // 進捗モニターを表示 & リセット
  resetProgressMonitor();
  document.getElementById('progress-section').classList.remove('hidden');
  document.getElementById('result-section').classList.add('hidden');

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme,
        targetAudience: target,
        platforms,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'サーバーエラーが発生しました');
    }

    const data = await res.json();
    currentGenerationId = data.id;

    // SSE接続開始
    connectSSE(data.id);

    addLog('system', `企画を受付しました (ID: ${data.id.slice(0, 8)}...)`);
  } catch (err) {
    alert(`エラー: ${err.message}`);
    btn.disabled = false;
    btn.innerHTML = '企画開始';
  }
}

// ---------------------------------------------------------------------------
// 3. connectSSE - EventSourceでリアルタイム進捗を受信
// ---------------------------------------------------------------------------
function connectSSE(id) {
  // 既存のSSE接続があれば閉じる
  if (currentSSE) {
    currentSSE.close();
    currentSSE = null;
  }

  const es = new EventSource(`/api/generate/${id}/stream`);
  currentSSE = es;

  es.onmessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }

    switch (data.type) {
      case 'status':
        updateStatusBadge(data.status);
        addLog('status', `ステータス: ${data.status}`);
        break;

      case 'system':
        if (data.subtype === 'init') {
          addLog('system', `モデル: ${data.model} | ツール数: ${(data.tools || []).length}`);
        }
        break;

      case 'task_started':
        addLog('agent', `[タスク開始] ${data.description || data.taskId}`);
        break;

      case 'task_progress':
        addLog('agent', `[進捗] ${data.description || data.taskId}`);
        break;

      case 'task_notification':
        addLog('agent', `[${data.status}] ${data.summary || data.taskId}`);
        break;

      case 'assistant_message':
        addLog('assistant', data.text);
        break;

      case 'tool_progress':
        addLog('tool', `${data.toolName} (${data.elapsed}s)`);
        break;

      case 'done':
        updateStatusBadge('completed');
        addLog('done', '企画生成が完了しました！');
        if (data.cost) {
          addLog('info', `コスト: $${data.cost.toFixed(4)} | ターン: ${data.turns} | ${(data.duration_ms / 1000).toFixed(1)}秒`);
        }
        es.close();
        currentSSE = null;
        onGenerationComplete(id, data);
        break;

      case 'error':
        updateStatusBadge('failed');
        addLog('error', `エラー: ${data.message}`);
        es.close();
        currentSSE = null;
        restoreSubmitButton();
        break;

      default:
        // 未知のイベントタイプはログに簡易表示
        if (data.type) {
          addLog('info', `[${data.type}] ${JSON.stringify(data).slice(0, 200)}`);
        }
        break;
    }
  };

  es.onerror = () => {
    addLog('error', 'SSE接続が切断されました');
    es.close();
    currentSSE = null;
  };
}

// ---------------------------------------------------------------------------
// 4. showResult - 過去の結果詳細を表示（モーダル）
// ---------------------------------------------------------------------------
async function showResult(id) {
  try {
    const res = await fetch(`/api/results/${id}`);
    const data = await res.json();

    document.getElementById('modal-title').textContent = data.theme || '企画詳細';

    const date = new Date(data.created_at).toLocaleString('ja-JP');
    const badgeClass = `badge-${data.status}`;

    let outputsHtml = '';
    if (data.outputs && data.outputs.length > 0) {
      outputsHtml = data.outputs
        .map((o) => {
          const label = PLATFORM_LABELS[o.platform] || o.platform;
          return `
            <div class="border border-gray-100 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-600">${label}</span>
                <button onclick="copyToClipboard(this.closest('.border').querySelector('pre').textContent)"
                        class="text-xs text-blue-500 hover:text-blue-700">コピー</button>
              </div>
              <pre class="whitespace-pre-wrap text-sm bg-gray-50 rounded p-3">${escapeHtml(o.content)}</pre>
            </div>
          `;
        })
        .join('');
    } else {
      outputsHtml = '<p class="text-gray-400 text-sm">成果物はまだありません</p>';
    }

    document.getElementById('modal-body').innerHTML = `
      <div class="flex items-center gap-3 text-sm text-gray-500">
        <span>${date}</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">${data.status}</span>
      </div>
      ${data.target_audience ? `<p class="text-sm text-gray-500">ターゲット: ${escapeHtml(data.target_audience)}</p>` : ''}
      <div class="space-y-3">${outputsHtml}</div>
    `;

    document.getElementById('modal-overlay').classList.remove('hidden');
  } catch (err) {
    console.error('showResult error:', err);
    alert('詳細の取得に失敗しました');
  }
}

// ---------------------------------------------------------------------------
// 5. copyToClipboard / copyCurrentTab
// ---------------------------------------------------------------------------
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => showToast('クリップボードにコピーしました'),
    () => showToast('コピーに失敗しました', true)
  );
}

function copyCurrentTab() {
  const pre = document.getElementById('tab-pre');
  if (pre && pre.textContent) {
    copyToClipboard(pre.textContent);
  }
}

// ---------------------------------------------------------------------------
// ヘルパー関数
// ---------------------------------------------------------------------------

/** 進捗モニターをリセット */
function resetProgressMonitor() {
  const logArea = document.getElementById('log-area');
  logArea.innerHTML = '';
  updateStatusBadge('pending');
  currentOutputs = {};
  activeTab = '';
}

/** ステータスバッジを更新 */
function updateStatusBadge(status) {
  const badge = document.getElementById('status-badge');
  badge.className = `px-3 py-1 rounded-full text-xs font-semibold badge-${status}`;
  badge.textContent = status;
}

/** ログエリアにメッセージを追加（最新が上） */
function addLog(type, text) {
  const logArea = document.getElementById('log-area');

  // 初回の「ログが表示されます...」を消す
  const placeholder = logArea.querySelector('.text-gray-500');
  if (placeholder) placeholder.remove();

  const p = document.createElement('p');
  p.className = getLogClass(type);
  const time = new Date().toLocaleTimeString('ja-JP');
  p.textContent = `[${time}] ${text}`;
  logArea.prepend(p);
}

/** ログタイプに応じたCSSクラスを返す */
function getLogClass(type) {
  switch (type) {
    case 'error':     return 'text-red-400';
    case 'done':      return 'text-yellow-300 font-bold';
    case 'agent':     return 'text-cyan-300';
    case 'assistant': return 'text-blue-300';
    case 'tool':      return 'text-purple-300';
    case 'status':    return 'text-green-400';
    case 'system':    return 'text-gray-400';
    case 'info':      return 'text-gray-400';
    default:          return 'text-green-300';
  }
}

/** 企画完了時の処理 */
async function onGenerationComplete(id, doneData) {
  restoreSubmitButton();

  // 結果を取得して成果物エリアに表示
  try {
    const res = await fetch(`/api/results/${id}`);
    const data = await res.json();

    if (data.outputs && data.outputs.length > 0) {
      showOutputTabs(data.outputs);

      // コスト情報
      if (doneData.cost) {
        const costInfo = document.getElementById('cost-info');
        costInfo.innerHTML = `
          <span>コスト: $${doneData.cost.toFixed(4)}</span>
          <span>ターン: ${doneData.turns}</span>
          <span>時間: ${(doneData.duration_ms / 1000).toFixed(1)}秒</span>
        `;
        costInfo.classList.remove('hidden');
      }

      document.getElementById('result-section').classList.remove('hidden');
    }

    // 過去の結果一覧を更新
    loadResults();
  } catch (err) {
    console.error('onGenerationComplete error:', err);
  }
}

/** 成果物タブを生成して表示 */
function showOutputTabs(outputs) {
  currentOutputs = {};
  const tabBar = document.getElementById('tab-bar');
  tabBar.innerHTML = '';

  outputs.forEach((o, idx) => {
    const platform = o.platform;
    currentOutputs[platform] = o.content;

    const btn = document.createElement('button');
    btn.className = `tab-btn px-4 py-2 text-sm text-gray-500 hover:text-blue-600 transition ${idx === 0 ? 'active' : ''}`;
    btn.textContent = PLATFORM_LABELS[platform] || platform;
    btn.dataset.platform = platform;
    btn.onclick = () => switchTab(platform);
    tabBar.appendChild(btn);
  });

  // 最初のタブを表示
  if (outputs.length > 0) {
    switchTab(outputs[0].platform);
  }
}

/** タブ切り替え */
function switchTab(platform) {
  activeTab = platform;

  // タブボタンのアクティブ状態
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.platform === platform);
  });

  // コンテンツ表示
  const pre = document.getElementById('tab-pre');
  pre.textContent = currentOutputs[platform] || '(データなし)';
}

/** 送信ボタンを元に戻す */
function restoreSubmitButton() {
  const btn = document.getElementById('btn-submit');
  btn.disabled = false;
  btn.innerHTML = '企画開始';
}

/** モーダルを閉じる */
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// モーダルオーバーレイクリックで閉じる
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

/** HTMLエスケープ */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** トースト通知 */
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 right-6 px-4 py-2 rounded-lg shadow-lg text-sm text-white z-50 transition-opacity duration-300 ${
    isError ? 'bg-red-500' : 'bg-gray-800'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ---------------------------------------------------------------------------
// GPTs 設定管理
// ---------------------------------------------------------------------------

const GPTS_PLATFORMS = ['instagram', 'x', 'youtube', 'note'];

/** 設定セクションの表示/非表示を切り替え */
function toggleSettings() {
  const section = document.getElementById('settings-section');
  const isHidden = section.classList.contains('hidden');
  if (isHidden) {
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    section.classList.add('hidden');
  }
}

/** GPTs設定をサーバーから読み込んでフォームに反映 */
async function loadGptsConfig() {
  try {
    const res = await fetch('/api/config/gpts');
    const config = await res.json();

    for (const platform of GPTS_PLATFORMS) {
      const data = config[platform];
      if (data) {
        const nameInput = document.getElementById(`gpts-${platform}-name`);
        const urlInput = document.getElementById(`gpts-${platform}-url`);
        if (nameInput) nameInput.value = data.name || '';
        if (urlInput) urlInput.value = data.url || '';
      }
    }
  } catch (err) {
    console.error('loadGptsConfig error:', err);
  }
}

/** フォームの内容をサーバーに保存 */
async function saveGptsConfig() {
  const config = {};

  for (const platform of GPTS_PLATFORMS) {
    const nameInput = document.getElementById(`gpts-${platform}-name`);
    const urlInput = document.getElementById(`gpts-${platform}-url`);
    config[platform] = {
      name: nameInput ? nameInput.value.trim() : '',
      url: urlInput ? urlInput.value.trim() : '',
    };
  }

  const btn = document.getElementById('btn-save-gpts');
  btn.disabled = true;
  btn.textContent = '保存中...';

  try {
    const res = await fetch('/api/config/gpts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    if (!res.ok) {
      throw new Error('保存に失敗しました');
    }

    showToast('GPTs設定を保存しました');
  } catch (err) {
    showToast(`エラー: ${err.message}`, true);
    console.error('saveGptsConfig error:', err);
  } finally {
    btn.disabled = false;
    btn.textContent = '保存';
  }
}
