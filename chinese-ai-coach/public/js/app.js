// State
let studentToken = localStorage.getItem('coach_token') || '';
let sessionId = localStorage.getItem('coach_session_id') || '';
let studentId = null;
let studentData = null;
let currentDrillIndex = 0;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

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

// ===== ドリルデータ（台湾華語 — 繁体字） =====
const drills = [
  { hanzi: '媽 麻 馬 罵', pinyin: 'mā má mǎ mà', text: '媽麻馬罵' },
  { hanzi: '他 她 它', pinyin: 'tā tā tā', text: '他她它' },
  { hanzi: '你好', pinyin: 'nǐ hǎo', text: '你好' },
  { hanzi: '謝謝', pinyin: 'xiè xie', text: '謝謝' },
  { hanzi: '我是日本人', pinyin: 'wǒ shì rì běn rén', text: '我是日本人' },
  { hanzi: '我想去台灣留學', pinyin: 'wǒ xiǎng qù tái wān liú xué', text: '我想去台灣留學' },
  { hanzi: '請問捷運站在哪裡', pinyin: 'qǐng wèn jié yùn zhàn zài nǎ lǐ', text: '請問捷運站在哪裡' },
  { hanzi: '我要一杯珍珠奶茶', pinyin: 'wǒ yào yī bēi zhēn zhū nǎi chá', text: '我要一杯珍珠奶茶' },
  { hanzi: '今天天氣很好', pinyin: 'jīn tiān tiān qì hěn hǎo', text: '今天天氣很好' },
  { hanzi: '我的大學在台北', pinyin: 'wǒ de dà xué zài tái běi', text: '我的大學在台北' },
];

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
    localStorage.setItem('coach_student', JSON.stringify(data));
    localStorage.setItem('coach_session_id', data.session_id);

    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    document.getElementById('student-name').textContent = `${data.name} さん`;

    loadDrill();
    loadTasks();
  } catch (err) {
    errorEl.textContent = '通信エラーが発生しました';
  }
}

// 自動ログイン（前回のセッションを復元）
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

// ===== 発音ドリル =====
function loadDrill() {
  const drill = drills[currentDrillIndex];
  document.getElementById('drill-hanzi').textContent = drill.hanzi;
  document.getElementById('drill-pinyin').textContent = drill.pinyin;
  document.getElementById('drill-progress').textContent =
    `${currentDrillIndex + 1} / ${drills.length}`;
  document.getElementById('score-panel').style.display = 'none';
}

function prevDrill() {
  if (currentDrillIndex > 0) { currentDrillIndex--; loadDrill(); }
}

function nextDrill() {
  if (currentDrillIndex < drills.length - 1) { currentDrillIndex++; loadDrill(); }
}

function playExample() {
  const drill = drills[currentDrillIndex];
  const utterance = new SpeechSynthesisUtterance(drill.text);
  utterance.lang = 'zh-TW';
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

// 録音
async function toggleRecord() {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
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
  const drill = drills[currentDrillIndex];
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('student_id', studentId || '1');
  formData.append('lesson_id', 'tone-basics');
  formData.append('target_text', drill.text);
  formData.append('target_pinyin', drill.pinyin);

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

  // word scores
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

  // initial/final scores (average from words)
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
      body: JSON.stringify({ message }),
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
