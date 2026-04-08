// State
let studentToken = localStorage.getItem('coach_token') || '';
let sessionId = localStorage.getItem('coach_session_id') || '';
let studentId = null;
let studentData = null;
let currentDrillIndex = 0;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

// Curriculum state
let currentLessonId = null;
let lessonVocabulary = [];
let lessons = [];

const API = '';

// 認証付きfetchラッパー（セッション検証込み）
async function apiFetch(url, options = {}) {
  options.headers = {
    ...options.headers,
    'x-student-token': studentData?.token || '',
    'x-session-id': sessionId,
  };
  const res = await fetch(url, options);
  if (res.status === 401) {
    const data = await res.clone().json().catch(() => ({}));
    if (data.error === 'session_expired') {
      localStorage.removeItem('coach_session_id');
      localStorage.removeItem('coach_student');
      alert('別のデバイスでログインされました。再度ログインしてください。');
      location.reload();
      return null;
    }
  }
  return res;
}

// ===== ログイン =====
async function login() {
  const name = document.getElementById('login-name').value.trim();
  const passcode = document.getElementById('login-pass').value.trim();
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';

  if (!name || !passcode) {
    errorEl.textContent = 'お名前とパスコードを入力してください';
    return;
  }

  try {
    const res = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, passcode }),
    });
    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || 'ログインに失敗しました';
      return;
    }

    studentId = data.id;
    studentData = data;
    sessionId = data.session_id;
    currentLessonId = data.current_lesson_id || null;
    localStorage.setItem('coach_student', JSON.stringify(data));
    localStorage.setItem('coach_session_id', data.session_id);

    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    document.getElementById('student-name').textContent = `${data.name} さん`;

    loadLessons();
    loadTasks();
  } catch (err) {
    errorEl.textContent = '通信エラーが発生しました';
  }
}

// 自動ログイン復元
try {
  const saved = JSON.parse(localStorage.getItem('coach_student'));
  if (saved) {
    document.getElementById('login-name').value = saved.name;
  }
} catch {}

// ===== タブ切り替え =====
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
  });
});

// ===== レッスン選択 =====
async function loadLessons() {
  try {
    const res = await apiFetch(`${API}/api/curriculum/lessons`);
    if (!res) return;
    lessons = await res.json();

    const select = document.getElementById('lesson-select');
    select.innerHTML = '<option value="">レッスンを選択...</option>';

    lessons.forEach(l => {
      const pct = l.vocab_count > 0 ? Math.round((l.mastered / l.vocab_count) * 100) : 0;
      const opt = document.createElement('option');
      opt.value = l.id;
      opt.textContent = `第${l.lesson_number}課 ${l.title_zh}（${pct}%）`;
      select.appendChild(opt);
    });

    // Auto-select current lesson
    if (currentLessonId) {
      select.value = currentLessonId;
      selectLesson(currentLessonId);
    }
  } catch (err) {
    console.error('Failed to load lessons:', err);
  }
}

async function selectLesson(lessonId) {
  if (!lessonId) {
    document.getElementById('drill-card').style.display = 'none';
    lessonVocabulary = [];
    currentLessonId = null;
    return;
  }

  currentLessonId = lessonId;

  try {
    const res = await apiFetch(`${API}/api/curriculum/lessons/${lessonId}/vocabulary`);
    if (!res) return;
    lessonVocabulary = await res.json();

    if (lessonVocabulary.length === 0) {
      document.getElementById('drill-card').style.display = 'none';
      document.getElementById('lesson-progress-info').textContent = 'この課の単語データはまだありません';
      return;
    }

    currentDrillIndex = 0;
    document.getElementById('drill-card').style.display = '';

    // Show progress info
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const pct = lesson.vocab_count > 0 ? Math.round((lesson.mastered / lesson.vocab_count) * 100) : 0;
      document.getElementById('lesson-progress-info').innerHTML =
        `<div class="progress-bar-container">` +
        `<div class="progress-bar-fill" style="width:${pct}%"></div>` +
        `</div>` +
        `<span>${lesson.mastered || 0} / ${lesson.vocab_count} マスター</span>`;
    }

    loadDrill();
  } catch (err) {
    console.error('Failed to load vocabulary:', err);
  }
}

// ===== 発音ドリル =====
function loadDrill() {
  if (lessonVocabulary.length === 0) return;

  const item = lessonVocabulary[currentDrillIndex];
  document.getElementById('drill-hanzi').textContent = item.hanzi;
  document.getElementById('drill-pinyin').textContent = item.pinyin;
  document.getElementById('drill-translation').textContent = item.translation_ja;
  document.getElementById('drill-progress').textContent =
    `${currentDrillIndex + 1} / ${lessonVocabulary.length}`;
  document.getElementById('score-panel').style.display = 'none';

  // Show examples
  const exContainer = document.getElementById('drill-examples');
  const examples = item.examples || [];
  if (examples.length > 0) {
    exContainer.innerHTML = examples.map(ex => `
      <div class="example-item">
        <span class="ex-hanzi">${escapeHtml(ex.hanzi)}</span>
        <span class="ex-pinyin">${escapeHtml(ex.pinyin)}</span>
        <span class="ex-ja">${escapeHtml(ex.translation_ja)}</span>
      </div>
    `).join('');
    exContainer.style.display = '';
  } else {
    exContainer.style.display = 'none';
  }
}

function prevDrill() {
  if (currentDrillIndex > 0) { currentDrillIndex--; loadDrill(); }
}

function nextDrill() {
  if (currentDrillIndex < lessonVocabulary.length - 1) { currentDrillIndex++; loadDrill(); }
}

function playExample() {
  if (lessonVocabulary.length === 0) return;
  const item = lessonVocabulary[currentDrillIndex];
  const utterance = new SpeechSynthesisUtterance(item.hanzi);
  utterance.lang = 'zh-TW';
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

// 録音
async function toggleRecord() {
  if (isRecording) { stopRecording(); } else { startRecording(); }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { sampleRate: 16000, channelCount: 1 }
    });

    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus' : 'audio/webm'
    });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      await submitAudio(audioBlob);
    };

    mediaRecorder.start();
    isRecording = true;
    document.getElementById('record-btn').classList.add('recording');
    document.getElementById('record-label').textContent = '録音中...';
    document.getElementById('recording-indicator').classList.add('active');
  } catch (err) {
    alert('マイクへのアクセスが必要です');
    console.error(err);
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  isRecording = false;
  document.getElementById('record-btn').classList.remove('recording');
  document.getElementById('record-label').textContent = '録音開始';
  document.getElementById('recording-indicator').classList.remove('active');
}

async function submitAudio(audioBlob) {
  if (lessonVocabulary.length === 0) return;
  const item = lessonVocabulary[currentDrillIndex];
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('student_id', studentId || '1');
  formData.append('lesson_id', currentLessonId || 'free');
  formData.append('target_text', item.hanzi);
  formData.append('target_pinyin', item.pinyin);

  document.getElementById('record-label').textContent = '判定中...';

  try {
    const res = await apiFetch(`${API}/api/speech/assess`, {
      method: 'POST',
      body: formData,
    });
    if (!res) return;
    const result = await res.json();
    showScore(result);
  } catch (err) {
    console.error('Assessment error:', err);
    document.getElementById('record-label').textContent = '録音開始';
  }
}

function showScore(result) {
  document.getElementById('record-label').textContent = '録音開始';
  document.getElementById('score-panel').style.display = 'flex';

  setScore('tone', result.tone);
  setScore('overall', result.overall);

  const wordContainer = document.getElementById('word-scores');
  wordContainer.innerHTML = '';

  if (result.words) {
    result.words.forEach(w => {
      const score = w.tone_score || 0;
      const cls = score >= 80 ? 'good' : score >= 60 ? 'ok' : 'bad';
      wordContainer.innerHTML += `
        <div class="word-chip ${cls}">
          <span class="char">${w.word}</span>
          <span class="chip-score">${score}</span>
        </div>`;
    });
  }

  if (result.words && result.words.length > 0) {
    const avgInitial = Math.round(
      result.words.reduce((s, w) => s + (w.initial_score || 0), 0) / result.words.length
    );
    const avgFinal = Math.round(
      result.words.reduce((s, w) => s + (w.final_score || 0), 0) / result.words.length
    );
    setScore('initial', avgInitial);
    setScore('final', avgFinal);
  }
}

function setScore(type, value) {
  const fill = document.getElementById(`score-${type}`);
  const val = document.getElementById(`score-${type}-val`);
  if (fill) fill.style.width = `${value}%`;
  if (val) val.textContent = value;
}

// ===== テキスト会話 =====
async function sendChat() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  input.value = '';
  appendMessage('user', message);

  try {
    const res = await apiFetch(`${API}/api/chat/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lesson_id: currentLessonId }),
    });
    if (!res) return;
    const result = await res.json();

    if (result.error) {
      appendMessage('assistant', `エラー: ${result.error}`);
      return;
    }

    appendMessage('assistant', result.reply, result.corrections, result.hint_ja);
  } catch (err) {
    appendMessage('assistant', '通信エラーが発生しました');
    console.error(err);
  }
}

function appendMessage(role, content, corrections, hint) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  let html = `<div class="msg-content"><p>${escapeHtml(content)}</p>`;

  if (corrections && corrections.length > 0) {
    html += '<div class="corrections">';
    corrections.forEach(c => {
      html += `<div class="correction-item">
        <span class="original">${escapeHtml(c.original)}</span> →
        <span class="corrected">${escapeHtml(c.corrected)}</span><br>
        <small>${escapeHtml(c.explanation_ja)}</small>
      </div>`;
    });
    html += '</div>';
  }

  if (hint) {
    html += `<div class="hint">${escapeHtml(hint)}</div>`;
  }

  html += '</div>';
  div.innerHTML = html;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== 課題 =====
async function loadTasks() {
  try {
    const res = await apiFetch(`${API}/api/tasks/${studentId || 1}`);
    if (!res) return;
    const tasks = await res.json();

    const container = document.getElementById('task-list');
    if (!tasks.length) {
      container.innerHTML = '<p class="empty-state">課題はまだありません</p>';
      return;
    }

    container.innerHTML = tasks.map(t => {
      const typeIcon = t.task_type === 'drill' ? '🎙' : t.task_type === 'chat' ? '💬' : '📹';
      const completed = t.status === 'completed' ? 'completed' : '';
      return `
        <div class="task-card ${completed}">
          <div class="task-type ${t.task_type}">${typeIcon}</div>
          <div class="task-info">
            <div class="task-title">${escapeHtml(t.title)}</div>
            <div class="task-desc">${escapeHtml(t.description || '')}</div>
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    console.error('Task load error:', err);
  }
}
