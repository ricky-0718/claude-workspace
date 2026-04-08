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
let drillTarget = null; // {hanzi, pinyin} - current target for recording (word or example)

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
    loadScenarios();
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

  // Set default drill target to the word itself
  drillTarget = { hanzi: item.hanzi, pinyin: item.pinyin };

  // Show examples (tappable for pronunciation test)
  const exContainer = document.getElementById('drill-examples');
  const examples = item.examples || [];
  if (examples.length > 0) {
    exContainer.innerHTML = `<div class="examples-header">例文をタップして発音テスト</div>` +
      examples.map((ex, i) => `
      <div class="example-item" onclick="selectDrillTarget('example', ${i})" data-idx="${i}">
        <div class="ex-text">
          <span class="ex-hanzi">${escapeHtml(ex.hanzi)}</span>
          <span class="ex-pinyin">${escapeHtml(ex.pinyin)}</span>
          <span class="ex-ja">${escapeHtml(ex.translation_ja)}</span>
        </div>
        <button class="ex-play-btn" onclick="event.stopPropagation(); playText('${escapeHtml(ex.hanzi).replace(/'/g, "\\'")}')">▶</button>
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

function selectDrillTarget(type, index) {
  const item = lessonVocabulary[currentDrillIndex];
  // Remove active class from all
  document.querySelectorAll('.example-item').forEach(el => el.classList.remove('active'));
  document.querySelector('.drill-target')?.classList.remove('dimmed');

  if (type === 'example') {
    const ex = item.examples[index];
    drillTarget = { hanzi: ex.hanzi, pinyin: ex.pinyin };
    document.querySelectorAll('.example-item')[index]?.classList.add('active');
    document.querySelector('.drill-target')?.classList.add('dimmed');
    document.getElementById('record-label').textContent = '例文を録音';
  } else {
    drillTarget = { hanzi: item.hanzi, pinyin: item.pinyin };
    document.getElementById('record-label').textContent = '録音開始';
  }
  document.getElementById('score-panel').style.display = 'none';
}

function playText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-TW';
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

function playExample() {
  if (!drillTarget) return;
  playText(drillTarget.hanzi);
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
  if (!drillTarget) return;
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('student_id', studentId || '1');
  formData.append('lesson_id', currentLessonId || 'free');
  formData.append('target_text', drillTarget.hanzi);
  formData.append('target_pinyin', drillTarget.pinyin);

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

// ===== シチュエーション別会話 =====
const SCENARIOS = [
  { id: 'free', title_ja: '自由会話', title_zh: '自由會話', icon: '💭', level: 'all', description_ja: '好きなテーマで自由に会話', system_context: '', key_phrases: [] },
  // --- Beginner ---
  { id: 'self_introduction', title_ja: '自己紹介', title_zh: '自我介紹', icon: '👋', level: 'beginner', description_ja: '名前・出身を伝える', system_context: '你是台灣大學的新生，在宿舍大廳遇到剛搬進來的日本留學生。你很友善，主動打招呼並自我介紹。', key_phrases: ['你好，我叫＿＿。','我是日本人。','你是哪裡人？','很高興認識你！'] },
  { id: 'classroom_greetings', title_ja: '授業で先生に挨拶', title_zh: '在語言課跟老師打招呼', icon: '📚', level: 'beginner', description_ja: '授業の開始・終了時の挨拶', system_context: '你是台灣的華語老師，學生是剛開始學中文的日本留學生。用簡單的中文打招呼，確認學習狀況。', key_phrases: ['老師好！','我聽不懂，可以再說一遍嗎？','請問這個怎麼念？'] },
  { id: 'convenience_store', title_ja: 'コンビニで買い物', title_zh: '在便利商店買東西', icon: '🏪', level: 'beginner', description_ja: '7-11で飲み物やおにぎりを買う', system_context: '你是全家便利商店的店員，態度親切。問客人需要什麼，結帳時問是否有集點卡，告知金額。', key_phrases: ['這個多少錢？','可以刷卡嗎？','不用袋子，謝謝。','發票給我。'] },
  { id: 'mrt_navigation', title_ja: '捷運で道を聞く', title_zh: '搭捷運問路', icon: '🚇', level: 'beginner', description_ja: '台北MRTで乗り換えを確認', system_context: '你是台北捷運站的服務人員。一位日本留學生拿著路線圖走過來問路，用簡單中文幫助他。', key_phrases: ['請問去台北101怎麼搭？','在哪裡換車？','要坐幾站？'] },
  { id: 'lunch_box_shop', title_ja: '便當店で注文', title_zh: '在便當店點餐', icon: '🍱', level: 'beginner', description_ja: 'お弁当のおかずを選ぶ', system_context: '你是便當店的老闆娘，面對外國學生會放慢速度。問對方要什麼飯和配菜。', key_phrases: ['我要一個便當。','白飯還是糙米飯？','不要香菜。','內用還是外帶？'] },
  { id: 'night_market_food', title_ja: '夜市で屋台グルメ', title_zh: '在夜市點小吃', icon: '🌃', level: 'beginner', description_ja: 'タピオカや臭豆腐を注文', system_context: '你是夜市珍珠奶茶攤老闆，問客人口味、甜度和冰塊量。夜市很吵但你有耐心。', key_phrases: ['一杯珍珠奶茶。','半糖少冰。','這個是什麼？','辣的還是不辣？'] },
  { id: 'dormitory_checkin', title_ja: '大学寮チェックイン', title_zh: '辦理宿舍入住', icon: '🏠', level: 'beginner', description_ja: '寮の鍵受け取りと規則確認', system_context: '你是大學宿舍管理員，確認學號姓名，說明規則（門禁時間、不能煮東西），給鑰匙和門禁卡。', key_phrases: ['我是新生，來辦入住手續。','門禁是幾點？','WiFi密碼是什麼？'] },
  { id: 'asking_time_date', title_ja: '日時を確認する', title_zh: '確認日期時間', icon: '📅', level: 'beginner', description_ja: '待ち合わせや予定の確認', system_context: '你是日本留學生的台灣同學，討論下週一起出去玩，確認空閒時間和集合地點。', key_phrases: ['今天幾號？','你禮拜幾有空？','我們三點見面好嗎？'] },
  // --- Intermediate ---
  { id: 'university_registration', title_ja: '大学窓口で手続き', title_zh: '在學校辦公室辦手續', icon: '🏫', level: 'intermediate', description_ja: '履修登録や書類申請', system_context: '你是大學國際處職員，接待留學生詢問選課和學生證事宜。聽不懂時會換方式解釋。', key_phrases: ['選課系統什麼時候開放？','需要什麼證件？','什麼時候可以來領？'] },
  { id: 'scooter_rental', title_ja: '機車をレンタル', title_zh: '租機車', icon: '🛵', level: 'intermediate', description_ja: 'バイクレンタルの契約', system_context: '你是機車租賃店老闆，確認駕照，說明費用、加油方式、還車時間和交通規則。', key_phrases: ['租一天多少錢？','需要國際駕照嗎？','要加哪種油？'] },
  { id: 'hospital_clinic', title_ja: '病院で受診', title_zh: '去診所看病', icon: '🏥', level: 'intermediate', description_ja: '症状説明と薬の確認', system_context: '你是診所醫生，詢問留學生症狀（頭痛、發燒、肚子痛），告知藥物和服用方式。', key_phrases: ['我頭痛發燒。','這個藥一天吃幾次？','要掛哪一科？'] },
  { id: 'bank_account', title_ja: '銀行口座を開設', title_zh: '開銀行帳戶', icon: '🏦', level: 'intermediate', description_ja: '口座開設の手続き', system_context: '你是銀行行員，確認證件（護照、居留證），說明開戶程序和網路銀行功能。', key_phrases: ['我想開一個帳戶。','需要帶哪些證件？','可以辦網路銀行嗎？'] },
  { id: 'part_time_job', title_ja: 'バイトの面接', title_zh: '打工面試', icon: '☕', level: 'intermediate', description_ja: 'カフェで面接を受ける', system_context: '你是咖啡廳店長，正在招募工讀生。問對方中文程度、空閒時間、工作經驗和來打工的理由。', key_phrases: ['我對這份工作很有興趣。','禮拜二和禮拜四可以上班。','時薪是多少？'] },
  { id: 'landlord_negotiation', title_ja: '家主と賃貸交渉', title_zh: '跟房東談租屋', icon: '🏡', level: 'intermediate', description_ja: 'アパートの条件交渉', system_context: '你是公寓房東，介紹房間條件（租金、押金、附帶設備），確認合約細節。', key_phrases: ['這間包水電嗎？','押金要多少？','合約是幾個月？'] },
  // --- Advanced ---
  { id: 'group_project', title_ja: 'グループ課題の議論', title_zh: '小組討論報告', icon: '💬', level: 'advanced', description_ja: 'クラスメートと発表準備', system_context: '你是台灣大學生，和日本留學生討論期末報告的主題、分工和時間。會用年輕人用語如「超棒的」「沒問題啦」。', key_phrases: ['你對哪個主題有興趣？','我負責資料蒐集，你負責簡報，好嗎？'] },
  { id: 'phone_contract', title_ja: '携帯キャリア契約', title_zh: '辦手機門號', icon: '📱', level: 'advanced', description_ja: 'SIMカードの契約手続き', system_context: '你是中華電信門市人員，介紹留學生專案，說明費率差異、數據流量和合約期間。', key_phrases: ['有沒有留學生專案？','每月可以用多少GB？','需要帶居留證嗎？'] },
  { id: 'complaint', title_ja: 'トラブル解決', title_zh: '反映問題', icon: '⚠️', level: 'advanced', description_ja: '商品不良などの問題を伝える', system_context: '你是手機維修店老闆，留學生帶壞掉的二手手機來。了解狀況，判斷保固範圍，提出解決方案。', key_phrases: ['買不到一個禮拜就壞了。','在保固範圍內嗎？','可以退費嗎？'] },
  { id: 'career_networking', title_ja: '台湾企業と交流', title_zh: '與業界人士交流', icon: '💼', level: 'advanced', description_ja: '就職イベントでキャリア相談', system_context: '你是科技公司HR，在就業博覽會。留學生來詢問在台灣就業的可能性。說話正式但親切。', key_phrases: ['貴公司有招募外國人才嗎？','台灣的工作文化跟日本有什麼不同？'] },
];

let currentScenario = null;
let isNewSession = false;

function loadScenarios() {
  const grid = document.getElementById('scenario-grid');
  const levels = [
    { key: 'all', label: '' },
    { key: 'beginner', label: '初級' },
    { key: 'intermediate', label: '中級' },
    { key: 'advanced', label: '上級' },
  ];

  let html = '';
  for (const lvl of levels) {
    const items = SCENARIOS.filter(s => s.level === lvl.key);
    if (items.length === 0) continue;
    if (lvl.label) html += `<div class="scenario-level-label">${lvl.label}</div>`;
    html += items.map(s => `
      <div class="scenario-card" onclick="selectScenario('${s.id}')">
        <span class="scenario-icon">${s.icon}</span>
        <div class="scenario-info">
          <div class="scenario-title">${escapeHtml(s.title_ja)}</div>
          <div class="scenario-desc">${escapeHtml(s.description_ja)}</div>
        </div>
      </div>
    `).join('');
  }
  grid.innerHTML = html;
}

function selectScenario(id) {
  currentScenario = SCENARIOS.find(s => s.id === id) || null;

  // Hide grid, show active indicator
  document.getElementById('scenario-grid').style.display = 'none';
  document.getElementById('scenario-back-btn').style.display = '';
  const activeEl = document.getElementById('scenario-active');
  activeEl.style.display = '';

  if (currentScenario) {
    let phrasesHtml = '';
    if (currentScenario.key_phrases.length > 0) {
      phrasesHtml = `<div class="scenario-phrases">${currentScenario.key_phrases.map(p => `<span class="phrase-chip">${escapeHtml(p)}</span>`).join('')}</div>`;
    }
    activeEl.innerHTML = `
      <span class="scenario-icon">${currentScenario.icon}</span>
      <strong>${escapeHtml(currentScenario.title_ja)}</strong>
      <span class="scenario-zh">${escapeHtml(currentScenario.title_zh)}</span>
      ${phrasesHtml}
    `;
  }

  // Clear chat and mark as new session
  isNewSession = true;
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';
  if (currentScenario && currentScenario.id !== 'free') {
    appendMessage('assistant', `【${currentScenario.title_zh}】のロールプレイを始めましょう！中国語で話しかけてみてください。`);
  } else {
    appendMessage('assistant', '你好！我是你的華語老師。請用中文跟我聊天吧！');
  }
}

function showScenarioList() {
  document.getElementById('scenario-grid').style.display = '';
  document.getElementById('scenario-back-btn').style.display = 'none';
  document.getElementById('scenario-active').style.display = 'none';
  currentScenario = null;
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
      body: JSON.stringify({
        message,
        lesson_id: currentLessonId,
        scenario_id: currentScenario?.id || null,
        scenario_context: currentScenario?.system_context || null,
        new_session: isNewSession,
      }),
    });
    isNewSession = false; // Reset after first message
    if (!res) return;
    const result = await res.json();

    if (result.error) {
      appendMessage('assistant', `エラー: ${result.error}`);
      return;
    }

    appendMessage('assistant', result.reply, result.corrections, result.hint_ja);
  } catch (err) {
    isNewSession = false;
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
