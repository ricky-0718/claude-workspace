let coachKey = localStorage.getItem('coach_key') || '';
let selectedStudentId = null;

// 講師ログイン
async function coachLogin() {
  const key = document.getElementById('coach-key-input').value.trim();
  const errEl = document.getElementById('coach-error');
  if (!key) { errEl.textContent = '講師キーを入力してください'; return; }

  try {
    const res = await fetch(`/api/dashboard/students?coach_key=${encodeURIComponent(key)}`);
    if (!res.ok) { errEl.textContent = '講師キーが正しくありません'; return; }

    coachKey = key;
    localStorage.setItem('coach_key', key);
    document.getElementById('coach-login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadStudents();
    loadInviteCodes();
  } catch { errEl.textContent = '通信エラー'; }
}

function coachLogout() {
  localStorage.removeItem('coach_key');
  coachKey = '';
  location.reload();
}

// 自動ログイン
if (coachKey) {
  document.getElementById('coach-login').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  loadStudents();
  loadInviteCodes();
}

// API呼び出しヘルパー
function dashFetch(url, options = {}) {
  const separator = url.includes('?') ? '&' : '?';
  return fetch(`${url}${separator}coach_key=${encodeURIComponent(coachKey)}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-coach-key': coachKey, ...options.headers },
  });
}

// 生徒一覧
async function loadStudents() {
  const res = await dashFetch('/api/dashboard/students');
  const students = await res.json();
  const grid = document.getElementById('student-grid');

  if (!students.length) {
    grid.innerHTML = '<p class="empty-state">生徒がまだいません</p>';
    return;
  }

  grid.innerHTML = students.map(s => {
    const toneClass = s.avg_tone >= 80 ? 'good' : s.avg_tone >= 60 ? 'ok' : 'needs-work';
    return `
      <div class="student-card" onclick="selectStudent(${s.id})">
        <div class="card-header">
          <span class="card-name">${esc(s.name)}</span>
          <span class="level-badge">${esc(s.level)}</span>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">ドリル</span>
            <span class="stat-value">${s.weekly_drills}</span>
            <span class="stat-unit">回/週</span>
          </div>
          <div class="stat">
            <span class="stat-label">平均</span>
            <span class="stat-value">${s.avg_score}</span>
            <span class="stat-unit">点</span>
          </div>
          <div class="stat">
            <span class="stat-label">声調</span>
            <span class="stat-value ${toneClass}">${s.avg_tone}</span>
            <span class="stat-unit">点</span>
          </div>
          <div class="stat">
            <span class="stat-label">会話</span>
            <span class="stat-value">${s.weekly_chats}</span>
            <span class="stat-unit">回/週</span>
          </div>
        </div>
        ${renderSparkline(s.tone_trend)}
      </div>`;
  }).join('');
}

// ミニスパークライン（SVG）
function renderSparkline(data) {
  if (!data || data.length < 2) return '<div class="sparkline-placeholder">データ不足</div>';

  const vals = data.map(d => d.avg_tone || 0);
  const max = Math.max(...vals, 100);
  const min = Math.min(...vals, 0);
  const range = max - min || 1;
  const w = 120, h = 32, pad = 2;

  const points = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');

  return `<svg class="sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <polyline points="${points}" fill="none" stroke="var(--primary)" stroke-width="2"/>
  </svg>`;
}

// 生徒詳細
async function selectStudent(id) {
  selectedStudentId = id;
  const res = await dashFetch(`/api/dashboard/students/${id}`);
  const data = await res.json();

  document.getElementById('detail-name').textContent = data.student.name;
  document.getElementById('detail-level').textContent = data.student.level;
  document.getElementById('student-detail').style.display = 'block';
  document.getElementById('student-detail').scrollIntoView({ behavior: 'smooth' });

  // ドリル履歴
  const drillsEl = document.getElementById('detail-drills');
  if (data.recentDrills.length) {
    drillsEl.innerHTML = `<table class="data-table">
      <thead><tr><th>テキスト</th><th>声調</th><th>総合</th><th>日時</th></tr></thead>
      <tbody>${data.recentDrills.map(d => `
        <tr>
          <td>${esc(d.target_text)}</td>
          <td class="${scoreClass(d.tone_score)}">${d.tone_score ?? '-'}</td>
          <td>${d.overall_score ?? '-'}</td>
          <td>${fmtDate(d.created_at)}</td>
        </tr>`).join('')}
      </tbody></table>`;
  } else {
    drillsEl.innerHTML = '<p class="empty-state">まだドリル記録がありません</p>';
  }

  // チャット履歴
  const chatsEl = document.getElementById('detail-chats');
  if (data.recentChats.length) {
    chatsEl.innerHTML = data.recentChats.map(c => {
      const cls = c.role === 'user' ? 'chat-user' : 'chat-assistant';
      return `<div class="chat-line ${cls}">
        <span class="chat-role">${c.role === 'user' ? '生徒' : 'AI'}</span>
        <span class="chat-text">${esc(c.content).substring(0, 200)}</span>
      </div>`;
    }).join('');
  } else {
    chatsEl.innerHTML = '<p class="empty-state">まだ会話記録がありません</p>';
  }

  // 弱点
  const weakEl = document.getElementById('detail-weak');
  if (data.weakTones.length) {
    weakEl.innerHTML = data.weakTones.map(w => `
      <div class="weak-item">
        <span class="weak-text">${esc(w.target_text)}</span>
        <span class="weak-pinyin">${esc(w.target_pinyin)}</span>
        <span class="weak-score bad">${w.tone_score}</span>
      </div>`).join('');
  } else {
    weakEl.innerHTML = '<p class="empty-state">弱点なし</p>';
  }

  // レビュー
  const reviewsEl = document.getElementById('detail-reviews');
  if (data.reviews.length) {
    reviewsEl.innerHTML = data.reviews.map(r => `
      <div class="review-item">
        <div class="review-header">
          <strong>${esc(r.coach_name)}</strong>
          <span>${r.review_date}</span>
        </div>
        <p>${esc(r.notes)}</p>
        ${r.next_focus ? `<p class="review-focus">次のフォーカス: ${esc(r.next_focus)}</p>` : ''}
      </div>`).join('');
  } else {
    reviewsEl.innerHTML = '<p class="empty-state">まだレビューがありません</p>';
  }
}

function closeDetail() {
  document.getElementById('student-detail').style.display = 'none';
  selectedStudentId = null;
}

// レビュー送信
async function submitReview() {
  if (!selectedStudentId) return;

  const weakStr = document.getElementById('review-weak').value.trim();
  const body = {
    student_id: selectedStudentId,
    coach_name: document.getElementById('review-coach').value.trim() || '講師',
    notes: document.getElementById('review-notes').value.trim(),
    weak_points: weakStr ? weakStr.split(',').map(s => s.trim()) : [],
    next_focus: document.getElementById('review-focus').value.trim(),
  };

  const res = await dashFetch('/api/dashboard/review', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    showDashToast('レビューを保存しました');
    document.getElementById('review-notes').value = '';
    document.getElementById('review-weak').value = '';
    document.getElementById('review-focus').value = '';
    selectStudent(selectedStudentId);
  }
}

// 課題作成
async function createTask() {
  if (!selectedStudentId) return;

  const body = {
    student_id: selectedStudentId,
    task_type: document.getElementById('task-type').value,
    title: document.getElementById('task-title').value.trim(),
    description: document.getElementById('task-desc').value.trim(),
    due_date: document.getElementById('task-due').value || null,
  };

  if (!body.title) { showDashToast('タイトルを入力してください'); return; }

  const res = await dashFetch('/api/dashboard/tasks', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    showDashToast('課題を作成しました');
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-due').value = '';
  }
}

// ===== 生徒登録 =====
function toggleAddStudent() {
  const section = document.getElementById('add-student-section');
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
  document.getElementById('student-created-result').style.display = 'none';
  document.getElementById('new-student-name').value = '';
  document.getElementById('new-student-line').value = '';
}

async function addStudent() {
  const name = document.getElementById('new-student-name').value.trim();
  const line_name = document.getElementById('new-student-line').value.trim();
  const level = document.getElementById('new-student-level').value;

  if (!name) { showDashToast('名前を入力してください'); return; }

  const res = await dashFetch('/api/admin/students', {
    method: 'POST',
    body: JSON.stringify({ name, line_name, level }),
  });

  if (!res.ok) {
    const err = await res.json();
    showDashToast('登録失敗: ' + (err.error || '不明なエラー'));
    return;
  }

  const data = await res.json();
  const appUrl = `${location.origin}`;

  const lineMsg = `【台湾スピーク】アカウントを作成しました！

下のURLからログインしてください。
${appUrl}

お名前: ${name}
パスコード: ${data.passcode}

パスコードは他の人に教えないでください。`;

  document.getElementById('student-line-message').value = lineMsg;
  document.getElementById('student-created-result').style.display = 'block';
  document.getElementById('copy-feedback').textContent = '';

  loadStudents();
}

function copyLineMessage() {
  const textarea = document.getElementById('student-line-message');
  textarea.select();
  navigator.clipboard.writeText(textarea.value).then(() => {
    document.getElementById('copy-feedback').textContent = 'コピーしました';
    setTimeout(() => { document.getElementById('copy-feedback').textContent = ''; }, 2000);
  });
}

// ヘルパー
function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function scoreClass(v) {
  if (v == null) return '';
  return v >= 80 ? 'good' : v >= 60 ? 'ok' : 'needs-work';
}

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return `${dt.getMonth()+1}/${dt.getDate()} ${dt.getHours()}:${String(dt.getMinutes()).padStart(2,'0')}`;
}

// ===== 招待コード管理 =====
async function loadInviteCodes() {
  const res = await dashFetch('/api/dashboard/invite-codes');
  const codes = await res.json();
  const container = document.getElementById('invite-codes-list');

  if (!codes.length) {
    container.innerHTML = '<p class="empty-state">招待コードがありません。「10件生成」ボタンで作成してください。</p>';
    return;
  }

  const unused = codes.filter(c => !c.used_by);
  const used = codes.filter(c => c.used_by);

  let html = '';

  if (unused.length) {
    html += `<div class="invite-section">
      <h3 class="invite-section-title">未使用（${unused.length}件）</h3>
      <div class="invite-grid">
        ${unused.map(c => `
          <div class="invite-card">
            <span class="invite-code">${esc(c.code)}</span>
            <span class="invite-expires">${c.expires_at ? fmtDate(c.expires_at) + 'まで' : '無期限'}</span>
            <div class="invite-actions">
              <button class="btn-sm" onclick="copyCode('${esc(c.code)}')">コピー</button>
              <button class="btn-sm btn-danger" onclick="deleteCode(${c.id})">削除</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  if (used.length) {
    html += `<div class="invite-section">
      <h3 class="invite-section-title">使用済（${used.length}件）</h3>
      <div class="invite-grid">
        ${used.map(c => `
          <div class="invite-card used">
            <span class="invite-code">${esc(c.code)}</span>
            <span class="invite-used-by">${esc(c.used_by_name)} が使用</span>
            <span class="invite-used-date">${fmtDate(c.used_at)}</span>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  container.innerHTML = html;
}

async function generateInviteCodes() {
  const expiresDays = document.getElementById('invite-expires-days').value;
  const res = await dashFetch('/api/dashboard/invite-codes/batch', {
    method: 'POST',
    body: JSON.stringify({ count: 10, expires_days: parseInt(expiresDays) }),
  });
  if (res.ok) {
    const data = await res.json();
    showDashToast(`${data.codes.length}件の招待コードを生成しました`);
    loadInviteCodes();
  }
}

async function deleteCode(id) {
  const res = await dashFetch(`/api/dashboard/invite-codes/${id}`, { method: 'DELETE' });
  if (res.ok) {
    loadInviteCodes();
  }
}

function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showDashToast(`コード ${code} をコピーしました`);
  });
}

function showDashToast(msg) {
  const existing = document.querySelector('.dash-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'dash-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
