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
let lastRecordingBlob = null; // 録音再生用
let lastRecordingUrl = null;

// Quiz state
let quizQuestions = [];
let quizIndex = 0;
let quizResults = [];
let quizMode = 'zh_to_ja';
let currentDrillMode = 'drill'; // 'drill' or 'quiz'
let isReviewMode = false;
let drillScoreCache = {}; // {hanzi: lastToneScore}

const API = '';

// ===== Toast通知 =====
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showLimitModal(type, used, limit) {
  const existing = document.querySelector('.limit-overlay');
  if (existing) existing.remove();
  const typeNames = { chat: '会話', speech: '発音評価' };
  const typeName = typeNames[type] || type;
  const overlay = document.createElement('div');
  overlay.className = 'limit-overlay';
  overlay.innerHTML = `
    <div class="limit-modal">
      <h3>本日の${typeName}は終了です</h3>
      <p>無料プランでは1日${limit}回まで${typeName}できます。<br>今日は${used}回使用しました。<br>明日またチャレンジしてください！</p>
      <button onclick="this.closest('.limit-overlay').remove()">OK</button>
    </div>`;
  document.body.appendChild(overlay);
}

// ===== ゲーミフィケーション =====
function showConfetti() {
  const colors = ['#FFDB00', '#0A5FA6', '#059669', '#DC2626', '#7C3AED', '#FF6B6B'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animation = `confetti-fall ${1.5 + Math.random() * 2}s ease-in forwards`;
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

function showAchievementBanner(achievement) {
  const existing = document.querySelector('.achievement-banner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.className = 'achievement-banner';
  banner.innerHTML = `<span class="achievement-icon">${achievement.icon}</span>${achievement.label}`;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('show'));
  showConfetti();
  setTimeout(() => {
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 500);
  }, 3500);
}

function handleNewAchievements(achievements) {
  if (!achievements || !achievements.length) return;
  let delay = 0;
  achievements.forEach(a => {
    setTimeout(() => showAchievementBanner(a), delay);
    delay += 4000;
  });
}

function updateLevelBadge(level) {
  if (!level) return;
  let badge = document.getElementById('level-badge-display');
  if (!badge) {
    badge = document.createElement('span');
    badge.id = 'level-badge-display';
    badge.className = 'level-badge-display';
    const nameEl = document.getElementById('student-name');
    if (nameEl) nameEl.appendChild(badge);
  }
  badge.textContent = `Lv.${level.level} ${level.name}`;
}

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
      showToast('別のデバイスでログインされました。再度ログインしてください。', 'error');
      location.reload();
      return null;
    }
  }
  if (res.status === 429) {
    const data = await res.clone().json().catch(() => ({}));
    if (data.error === 'daily_limit_reached') {
      showLimitModal(data.type, data.used, data.limit);
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
    loadStats();
  } catch (err) {
    errorEl.textContent = '通信エラーが発生しました';
  }
}

// ===== 新規登録 =====
function showRegisterView() {
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('register-view').style.display = 'block';
  document.getElementById('reg-error').textContent = '';
}

function showLoginView() {
  document.getElementById('register-view').style.display = 'none';
  document.getElementById('login-view').style.display = 'block';
  document.getElementById('login-error').textContent = '';
}

async function register() {
  const code = document.getElementById('reg-code').value.trim().toUpperCase();
  const name = document.getElementById('reg-name').value.trim();
  const pass = document.getElementById('reg-pass').value.trim();
  const pass2 = document.getElementById('reg-pass2').value.trim();
  const errorEl = document.getElementById('reg-error');
  errorEl.textContent = '';

  if (!code || !name || !pass) {
    errorEl.textContent = '全ての項目を入力してください';
    return;
  }
  if (pass !== pass2) {
    errorEl.textContent = 'パスコードが一致しません';
    return;
  }
  if (pass.length !== 4 || !/^\d{4}$/.test(pass)) {
    errorEl.textContent = 'パスコードは4桁の数字で入力してください';
    return;
  }

  try {
    const res = await fetch(`${API}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invite_code: code, name, passcode: pass }),
    });
    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || '登録に失敗しました';
      return;
    }

    // 登録成功 → 自動ログイン
    studentId = data.id;
    studentData = data;
    sessionId = data.session_id;
    localStorage.setItem('coach_student', JSON.stringify(data));
    localStorage.setItem('coach_session_id', data.session_id);

    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    document.getElementById('student-name').textContent = `${data.name} さん`;

    loadLessons();
    loadScenarios();
    loadTasks();
    loadStats();
    showToast('アカウントを作成しました！', 'success');
  } catch (err) {
    errorEl.textContent = '通信エラーが発生しました';
  }
}

// 自動ログイン復元
try {
  const saved = JSON.parse(localStorage.getItem('coach_student'));
  if (saved && saved.name) {
    document.getElementById('login-name').value = saved.name;
    // セッションが残っていたら自動ログイン試行
    const savedSession = localStorage.getItem('coach_session_id');
    if (saved.token && savedSession) {
      // apiFetchの401 alertを一時的に無効化して静かに検証
      const tempToken = saved.token;
      const tempSession = savedSession;
      fetch(`${API}/api/curriculum/stats`, {
        headers: { 'x-student-token': tempToken, 'x-session-id': tempSession },
      }).then(res => {
        if (res && res.ok) {
          studentData = saved;
          studentId = saved.id;
          sessionId = tempSession;
          document.getElementById('login-screen').classList.remove('active');
          document.getElementById('main-screen').classList.add('active');
          document.getElementById('student-name').textContent = `${saved.name} さん`;
          loadLessons();
          loadScenarios();
          loadTasks();
          loadStats();
        } else {
          // セッション無効 → クリアしてログイン画面のまま
          localStorage.removeItem('coach_session_id');
          localStorage.removeItem('coach_student');
        }
      }).catch(() => {
        localStorage.removeItem('coach_session_id');
        localStorage.removeItem('coach_student');
      });
    }
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

    // book別にグループ分け
    const bookGroups = {
      1: { label: '教科書コース', items: [] },
      2: { label: '文法講座', items: [] },
      3: { label: '旅行パック', items: [] },
    };

    lessons.forEach(l => {
      const pct = l.vocab_count > 0 ? Math.round((l.mastered / l.vocab_count) * 100) : 0;
      const opt = document.createElement('option');
      opt.value = l.id;
      // 特別レッスンの表示
      if (l.book === 3) {
        opt.textContent = `✈ ${l.title_ja || l.title_zh}（${pct}%）`;
      } else if (l.lesson_number === 0) {
        opt.textContent = `🔤 ${l.title_ja || l.title_zh}（${pct}%）`;
      } else if (l.lesson_number === 99) {
        opt.textContent = `🎯 ${l.title_ja || l.title_zh}（${pct}%）`;
      } else {
        opt.textContent = `第${l.lesson_number}課 ${l.title_zh}（${pct}%）`;
      }
      const group = bookGroups[l.book];
      if (group) {
        group.items.push(opt);
      } else {
        select.appendChild(opt);
      }
    });

    // optgroupとして追加（itemsが存在するbookのみ）
    Object.values(bookGroups).forEach(group => {
      if (group.items.length === 0) return;
      const optgroup = document.createElement('optgroup');
      optgroup.label = group.label;
      group.items.forEach(opt => optgroup.appendChild(opt));
      select.appendChild(optgroup);
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
    document.getElementById('drill-empty').style.display = '';
    document.getElementById('grammar-empty').style.display = '';
    document.getElementById('grammar-list').innerHTML = '';
    lessonVocabulary = [];
    currentLessonId = null;
    return;
  }

  currentLessonId = lessonId;

  // Load vocabulary, grammar in parallel
  try {
    const [vocabRes, grammarRes, scoresRes] = await Promise.all([
      apiFetch(`${API}/api/curriculum/lessons/${lessonId}/vocabulary`),
      apiFetch(`${API}/api/curriculum/lessons/${lessonId}/grammar`),
      apiFetch(`${API}/api/curriculum/lessons/${lessonId}/drill-scores`),
    ]);

    // 前回スコアをキャッシュに読み込み
    if (scoresRes && scoresRes.ok) {
      const scores = await scoresRes.json();
      drillScoreCache = {};
      Object.entries(scores).forEach(([text, s]) => {
        drillScoreCache[text] = s.tone || s.overall || 0;
      });
    }

    // Vocabulary
    if (vocabRes) {
      lessonVocabulary = await vocabRes.json();
      if (lessonVocabulary.length > 0) {
        // ピンインドリルはシャッフルして出題
        if (lessonId === 'book1-pinyin-drill') shuffleVocabulary();
        currentDrillIndex = 0;
        document.getElementById('drill-card').style.display = '';
        document.getElementById('drill-empty').style.display = 'none';
        // ピンインドリルは発音練習のみ（クイズなし）
        document.getElementById('drill-mode-toggle').style.display =
          lessonId === 'book1-pinyin-drill' ? 'none' : '';
        isReviewMode = false;
        switchDrillMode('drill');
        loadDrill();
      } else {
        document.getElementById('drill-card').style.display = 'none';
        document.getElementById('drill-empty').style.display = '';
        document.getElementById('drill-mode-toggle').style.display = 'none';
      }
    }

    // Grammar
    if (grammarRes) {
      const grammarPoints = await grammarRes.json();
      loadGrammar(grammarPoints);
    }

    // Progress info
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const pct = lesson.vocab_count > 0 ? Math.round((lesson.mastered / lesson.vocab_count) * 100) : 0;
      document.getElementById('lesson-progress-info').innerHTML =
        `<div class="progress-bar-container">` +
        `<div class="progress-bar-fill" style="width:${pct}%"></div>` +
        `</div>` +
        `<span>${lesson.mastered || 0} / ${lesson.vocab_count} マスター</span>`;
    }
  } catch (err) {
    console.error('Failed to load lesson data:', err);
  }
}

// ===== 文法 =====
function loadGrammar(points) {
  const listEl = document.getElementById('grammar-list');
  const emptyEl = document.getElementById('grammar-empty');

  if (!points || points.length === 0) {
    listEl.innerHTML = '';
    emptyEl.style.display = '';
    return;
  }
  emptyEl.style.display = 'none';

  // 第0課のピンインルールはJSON形式 → 専用レンダリング
  const isPinyin = currentLessonId === 'book1-lesson00';

  listEl.innerHTML = points.map((g, i) => {
    const hasVideo = g.video_url && g.video_url.trim();
    let bodyContent;

    if (isPinyin) {
      bodyContent = renderPinyinRule(g);
    } else {
      const explanation = (g.explanation || '').replace(/\n/g, '<br>');
      const hasExercise = g.exercises && g.exercises.trim();
      const exercises = (g.exercises || '').replace(/\n/g, '<br>');
      const answers = (g.answers || '').replace(/\n/g, '<br>');
      const summary = (g.summary || '').replace(/\n/g, '<br>');
      bodyContent = `
        ${hasVideo ? `<a class="grammar-video-link" href="${g.video_url}" target="_blank" rel="noopener">▶ 動画で学ぶ</a>` : ''}
        <div class="grammar-section">
          <div class="grammar-section-label">解説</div>
          <div class="grammar-explanation">${explanation}</div>
        </div>
        ${hasExercise ? `
          <div class="grammar-section">
            <div class="grammar-section-label">練習問題</div>
            <div class="grammar-exercises">${exercises}</div>
            <button class="grammar-show-answer" onclick="this.nextElementSibling.style.display='block'; this.style.display='none';">答えを見る</button>
            <div class="grammar-answers" style="display:none">
              <div class="grammar-section-label">解答</div>
              ${answers}
            </div>
          </div>
        ` : ''}
        ${summary ? `
          <div class="grammar-section grammar-summary">
            <div class="grammar-section-label">まとめ</div>
            <div>${summary}</div>
          </div>
        ` : ''}
      `;
    }

    return `
      <div class="grammar-card ${isPinyin ? 'pinyin-rule-card' : ''}">
        <div class="grammar-header" onclick="toggleGrammar(${i})">
          <span class="grammar-num">${i + 1}</span>
          <span class="grammar-title">${escapeHtml(g.title)}</span>
          ${hasVideo ? '<span class="grammar-video-badge">▶</span>' : ''}
          <span class="grammar-toggle" id="grammar-toggle-${i}">▼</span>
        </div>
        <div class="grammar-body" id="grammar-body-${i}" style="display:none">
          ${bodyContent}
        </div>
      </div>
    `;
  }).join('');
}

// ===== ピンインルール専用レンダリング =====
function renderPinyinRule(grammarPoint) {
  let data;
  try { data = JSON.parse(grammarPoint.explanation); } catch { return grammarPoint.explanation || ''; }

  switch (data.type) {
    case 'tones':
      return `
        <p class="pinyin-desc">${data.description}</p>
        <div class="pinyin-tone-grid">
          ${data.rules.map(r => `
            <div class="tone-card tone-${r.pitch}">
              <div class="tone-symbol">${r.symbol}</div>
              <div class="tone-label">${r.label}</div>
              <div class="tone-how">${r.how}</div>
              <div class="tone-example">${r.example}</div>
            </div>
          `).join('')}
        </div>
      `;

    case 'hidden-vowels':
      return `
        <p class="pinyin-desc">${data.description}</p>
        <div class="pinyin-rule-table">
          ${data.rules.map(r => `
            <div class="rule-row">
              <div class="rule-written">
                <span class="rule-label">書き方</span>
                <span class="rule-big">${r.written}</span>
              </div>
              <span class="rule-arrow">→</span>
              <div class="rule-actual">
                <span class="rule-label">読み方</span>
                <span class="rule-big rule-correct">${r.actual}</span>
              </div>
              <div class="rule-wrong">${r.wrong}</div>
            </div>
            <div class="rule-example-line">${r.example}</div>
          `).join('')}
        </div>
      `;

    case 'u-umlaut':
      return `
        <p class="pinyin-desc">${data.description}</p>
        <div class="pinyin-rule-table">
          ${data.rules.map(r => `
            <div class="rule-row">
              <div class="rule-written">
                <span class="rule-label">書き方</span>
                <span class="rule-big">${r.written}</span>
              </div>
              <span class="rule-arrow">→</span>
              <div class="rule-actual">
                <span class="rule-label">読み方</span>
                <span class="rule-big rule-correct">${r.actual}</span>
              </div>
            </div>
            <div class="rule-example-line">${r.example}：${r.how}</div>
          `).join('')}
        </div>
        ${data.tip ? `<div class="pinyin-tip">💡 ${data.tip}</div>` : ''}
      `;

    case 'aspiration':
      return `
        <p class="pinyin-desc">${data.description}</p>
        <div class="pinyin-tip">🧻 ${data.howToCheck}</div>
        <div class="aspiration-grid">
          ${data.rules.map(r => `
            <div class="aspiration-row">
              <div class="asp-pair">
                <span class="asp-no-air">${r.unaspirated}</span>
                <span class="asp-vs">vs</span>
                <span class="asp-air">${r.aspirated}</span>
              </div>
              <div class="asp-label">
                <span class="asp-tag no-air">息なし</span>
                <span class="asp-tag with-air">息あり</span>
              </div>
              <div class="asp-example">${r.example}</div>
            </div>
          `).join('')}
        </div>
      `;

    case 'retroflex':
      return `
        <p class="pinyin-desc">${data.description}</p>
        ${data.rules.map(group => `
          <div class="retroflex-group">
            <div class="retroflex-group-title">${group.group}</div>
            ${group.sounds.map(s => `
              <div class="retroflex-row">
                <span class="retroflex-sound">${s.sound}</span>
                <span class="retroflex-like">${s.like}</span>
                <span class="retroflex-example">${s.example}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
      `;

    case 'tone-change':
      return `
        <p class="pinyin-desc">${data.description}</p>
        ${data.rules.map(rule => `
          <div class="tone-change-section">
            <div class="tone-change-name">${rule.name}</div>
            <div class="tone-change-desc">${rule.change}</div>
            <div class="tone-change-examples">
              ${rule.examples.map(ex => `
                <div class="tc-example">
                  ${ex.written ? `<span class="tc-written">${ex.written}</span><span class="tc-arrow">→</span><span class="tc-actual">${ex.actual}</span><span class="tc-meaning">（${ex.meaning}）</span>` : ''}
                  ${ex.context ? `<span class="tc-context">${ex.context}：</span><span class="tc-change">${ex.change}</span><span class="tc-eg">例：${ex.example}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      `;

    case 'vowel-variation':
    case 'i-variation':
      return `
        <p class="pinyin-desc">${data.description}</p>
        <div class="variation-table">
          ${data.rules.map(r => `
            <div class="variation-row">
              <div class="var-context">${r.context}</div>
              <div class="var-sound">${r.sound}</div>
              <div class="var-example">${r.example}</div>
            </div>
          `).join('')}
        </div>
      `;

    case 'pinyin-chart':
      return `
        <p class="pinyin-desc">${data.description}</p>
        ${data.groups.map(g => `
          <div class="chart-group">
            <div class="chart-group-name">${g.name}</div>
            <div class="chart-syllables">
              ${g.syllables.map(s => `
                <button class="chart-syl-btn" onclick="playText('${s}')">${s}</button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      `;

    default:
      return grammarPoint.explanation || '';
  }
}

function toggleGrammar(index) {
  const body = document.getElementById(`grammar-body-${index}`);
  const toggle = document.getElementById(`grammar-toggle-${index}`);
  if (body.style.display === 'none') {
    body.style.display = '';
    toggle.textContent = '▲';
  } else {
    body.style.display = 'none';
    toggle.textContent = '▼';
  }
}

// ===== 発音ドリル =====
let isPinyinDrillMode = false;

function shuffleVocabulary() {
  for (let i = lessonVocabulary.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lessonVocabulary[i], lessonVocabulary[j]] = [lessonVocabulary[j], lessonVocabulary[i]];
  }
}

function loadDrill() {
  if (lessonVocabulary.length === 0) return;

  const item = lessonVocabulary[currentDrillIndex];
  isPinyinDrillMode = currentLessonId === 'book1-pinyin-drill';

  if (isPinyinDrillMode) {
    // ピンイン練習モード: ピンインを大きく、グループ名を小さく
    document.getElementById('drill-hanzi').textContent = item.pinyin;
    document.getElementById('drill-pinyin').textContent = '';
  } else {
    document.getElementById('drill-hanzi').textContent = item.hanzi;
    document.getElementById('drill-pinyin').textContent = item.pinyin;
  }
  document.getElementById('drill-translation').textContent = item.translation_ja;
  document.getElementById('drill-progress').textContent =
    `${currentDrillIndex + 1} / ${lessonVocabulary.length}`;
  document.getElementById('score-panel').style.display = 'none';

  // 前回スコアバッジ表示
  const lastScore = drillScoreCache[item.hanzi];
  const badgeEl = document.getElementById('drill-last-score');
  if (badgeEl) {
    if (lastScore !== undefined) {
      const cls = lastScore >= 80 ? 'good' : lastScore >= 60 ? 'ok' : 'bad';
      badgeEl.innerHTML = `前回: <span class="last-score-val ${cls}">${lastScore}</span>`;
      badgeEl.style.display = '';
    } else {
      badgeEl.style.display = 'none';
    }
  }
  const playbackBtn = document.getElementById('playback-btn');
  if (playbackBtn) playbackBtn.style.display = 'none';

  // Update card nav buttons
  const prevBtn = document.getElementById('card-prev-btn');
  const nextBtn = document.getElementById('card-next-btn');
  if (prevBtn) prevBtn.disabled = currentDrillIndex === 0;
  if (nextBtn) nextBtn.disabled = currentDrillIndex >= lessonVocabulary.length - 1;

  // Set default drill target to the word itself
  drillTarget = { hanzi: item.hanzi, pinyin: item.pinyin };

  // Show examples (tappable for pronunciation test) — skip for pinyin lesson
  const exContainer = document.getElementById('drill-examples');
  const examples = item.examples || [];
  if (examples.length > 0 && currentLessonId !== 'book1-lesson00') {
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

// サーバーサイドTTS（Edge Neural Voice）で再生
const ttsAudioCache = {};
async function playText(text, pinyin) {
  if (!text) return;

  const cacheKey = text + (pinyin || '');

  // キャッシュ済みならそのまま再生
  if (ttsAudioCache[cacheKey]) {
    const audio = new Audio(ttsAudioCache[cacheKey]);
    audio.play();
    return;
  }

  try {
    let url = `${API}/api/tts?text=${encodeURIComponent(text)}`;
    if (pinyin) url += `&pinyin=${encodeURIComponent(pinyin)}`;
    const res = await apiFetch(url);
    if (!res || !res.ok) throw new Error('TTS failed');
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    ttsAudioCache[cacheKey] = blobUrl;
    const audio = new Audio(blobUrl);
    audio.play();
  } catch (err) {
    console.error('TTS error, falling back to browser:', err);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  }
}

function playExample() {
  if (!drillTarget) return;
  playText(drillTarget.hanzi, drillTarget.pinyin);
}

// 録音
async function toggleRecord() {
  if (isRecording) { stopRecording(); } else { startRecording(); }
}

let recordStartTime = 0;

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { sampleRate: 16000, channelCount: 1 }
    });

    audioChunks = [];
    recordStartTime = Date.now();
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus' : 'audio/webm'
    });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const duration = Date.now() - recordStartTime;

      // 0.5秒未満は無効
      if (duration < 500) {
        document.getElementById('record-label').textContent = '録音開始';
        return;
      }

      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

      // 音量チェック: 小さすぎる場合はスキップ
      try {
        const arrayBuf = await audioBlob.arrayBuffer();
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const decoded = await audioCtx.decodeAudioData(arrayBuf);
        const data = decoded.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += Math.abs(data[i]);
        const avg = sum / data.length;
        audioCtx.close();

        if (avg < 0.005) {
          document.getElementById('record-label').textContent = '音声が小さすぎます';
          setTimeout(() => { document.getElementById('record-label').textContent = '録音開始'; }, 2000);
          return;
        }
      } catch (e) {
        // デコード失敗時はそのまま送信
      }

      await submitAudio(audioBlob);
    };

    mediaRecorder.start();
    isRecording = true;
    document.getElementById('record-btn').classList.add('recording');
    document.getElementById('record-label').textContent = '録音中...';
    document.getElementById('recording-indicator').classList.add('active');
  } catch (err) {
    showToast('マイクへのアクセスが必要です', 'error');
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

  // 録音を保持して再生できるようにする
  if (lastRecordingUrl) URL.revokeObjectURL(lastRecordingUrl);
  lastRecordingBlob = audioBlob;
  lastRecordingUrl = URL.createObjectURL(audioBlob);

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
    if (result.new_achievements) handleNewAchievements(result.new_achievements);
    loadStats(); // 進捗を即時更新
    progressGraphsLoaded = false; // グラフも次回開いた時に再取得
  } catch (err) {
    console.error('Assessment error:', err);
    document.getElementById('record-label').textContent = '録音開始';
  }
}

function playRecording() {
  if (!lastRecordingUrl) return;
  const audio = new Audio(lastRecordingUrl);
  audio.play();
}

function showScore(result) {
  console.log('showScore result:', JSON.stringify(result));
  document.getElementById('record-label').textContent = '録音開始';
  document.getElementById('score-panel').style.display = 'flex';

  // 前回スコアをキャッシュ
  if (drillTarget) drillScoreCache[drillTarget.hanzi] = result.tone || result.overall || 0;

  // 録音再生ボタンを表示
  const playbackBtn = document.getElementById('playback-btn');
  if (playbackBtn && lastRecordingUrl) {
    playbackBtn.style.display = '';
  }

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
    if (!container) return;
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

// ===== モード切り替え =====
function switchDrillMode(mode) {
  currentDrillMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.mode-btn[data-mode="${mode}"]`)?.classList.add('active');

  document.getElementById('drill-mode').style.display = mode === 'drill' ? '' : 'none';
  document.getElementById('quiz-mode').style.display = mode === 'quiz' ? '' : 'none';

  if (mode === 'quiz') {
    document.getElementById('quiz-setup').style.display = '';
    document.getElementById('quiz-card').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
  }
}

// ===== 単語クイズ =====
function selectQuizType(type) {
  quizMode = type;
  document.querySelectorAll('.quiz-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.quiz-type-btn[data-type="${type}"]`)?.classList.add('active');
}

async function startQuiz() {
  if (!currentLessonId && !isReviewMode) return;

  let url;
  if (isReviewMode) {
    // 復習モード: review-queueから出題
    url = `${API}/api/curriculum/review-queue?limit=10`;
  } else {
    url = `${API}/api/curriculum/lessons/${currentLessonId}/quiz?mode=${quizMode}&count=10`;
  }

  try {
    const res = await apiFetch(url);
    if (!res) return;
    const data = await res.json();

    if (isReviewMode) {
      // review-queueのデータをクイズ形式に変換
      if (!data.items || data.items.length < 4) {
        showToast('復習する単語が足りません', 'info');
        return;
      }
      quizQuestions = buildReviewQuiz(data.items);
    } else {
      if (!data.questions || data.questions.length === 0) {
        showToast('この課の単語が足りません（最低4語必要）', 'info');
        return;
      }
      quizQuestions = data.questions;
    }

    quizIndex = 0;
    quizResults = [];

    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-card').style.display = '';
    document.getElementById('quiz-result').style.display = 'none';

    showQuizQuestion();
  } catch (err) {
    console.error('Quiz start error:', err);
  }
}

function buildReviewQuiz(items) {
  return items.map(item => {
    const wrongPool = items.filter(v => v.vocabulary_id !== item.vocabulary_id);
    const wrongAnswers = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);

    // Not enough wrong answers? Duplicate and modify
    while (wrongAnswers.length < 3) {
      wrongAnswers.push(items[Math.floor(Math.random() * items.length)]);
    }

    const question = { hanzi: item.hanzi, pinyin: item.pinyin };
    const correctAnswer = item.translation_ja;
    let choices = [correctAnswer, ...wrongAnswers.map(w => w.translation_ja)];
    choices = [...new Set(choices)]; // Remove duplicates
    while (choices.length < 4) choices.push('---');
    choices = choices.sort(() => Math.random() - 0.5);

    return {
      vocabulary_id: item.vocabulary_id,
      question,
      choices,
      correct_index: choices.indexOf(correctAnswer),
    };
  });
}

function showQuizQuestion() {
  const q = quizQuestions[quizIndex];
  const total = quizQuestions.length;

  document.getElementById('quiz-counter').textContent = `${quizIndex + 1} / ${total}`;
  document.getElementById('quiz-progress-fill').style.width = `${((quizIndex) / total) * 100}%`;

  // Reset choices first
  const choicesEl = document.getElementById('quiz-choices');
  choicesEl.innerHTML = '';

  // Show question with audio button
  const questionEl = document.getElementById('quiz-question');
  const audioBtn = `<button class="quiz-audio-btn" onclick="event.stopPropagation(); playText('${escapeHtml(q.question.hanzi || q.question.text || '').replace(/'/g, "\\'")}')">🔊</button>`;
  if (q.question.hanzi) {
    questionEl.innerHTML = `<span class="quiz-hanzi">${escapeHtml(q.question.hanzi)}</span>` +
      (q.question.pinyin ? `<span class="quiz-pinyin">${escapeHtml(q.question.pinyin)}</span>` : '') +
      audioBtn;
  } else if (q.question.text) {
    questionEl.innerHTML = `<span class="quiz-text">${escapeHtml(q.question.text)}</span>` + audioBtn;
  } else if (q.question.pinyin) {
    questionEl.innerHTML = `<span class="quiz-pinyin-only">${escapeHtml(q.question.pinyin)}</span>` + audioBtn;
  }

  // Show choices
  choicesEl.innerHTML = q.choices.map((c, i) =>
    `<button class="quiz-choice" onclick="answerQuiz(${i})">${escapeHtml(c)}</button>`
  ).join('');
}

function answerQuiz(selectedIndex) {
  const q = quizQuestions[quizIndex];
  const correct = selectedIndex === q.correct_index;

  quizResults.push({
    vocabulary_id: q.vocabulary_id,
    correct,
    selected: selectedIndex,
    correct_index: q.correct_index,
  });

  // Visual feedback
  const buttons = document.querySelectorAll('.quiz-choice');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct_index) btn.classList.add('correct');
    if (i === selectedIndex && !correct) btn.classList.add('wrong');
  });

  // Auto-advance after delay
  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizQuestions.length) {
      showQuizQuestion();
    } else {
      finishQuiz();
    }
  }, correct ? 600 : 1200);
}

async function finishQuiz() {
  const total = quizResults.length;
  const correctCount = quizResults.filter(r => r.correct).length;
  const pct = Math.round((correctCount / total) * 100);

  // Show result
  document.getElementById('quiz-card').style.display = 'none';
  document.getElementById('quiz-result').style.display = '';

  const circle = document.getElementById('quiz-score-circle');
  circle.className = 'quiz-score-circle ' + (pct >= 80 ? 'great' : pct >= 60 ? 'good' : 'needs-work');
  document.getElementById('quiz-score-num').textContent = `${correctCount}/${total}`;

  // Details: show wrong answers
  const wrongOnes = quizResults.filter(r => !r.correct);
  const detailsEl = document.getElementById('quiz-result-details');
  if (wrongOnes.length > 0) {
    detailsEl.innerHTML = '<p class="quiz-wrong-header">間違えた単語:</p>' +
      wrongOnes.map(r => {
        const q = quizQuestions[quizResults.indexOf(r)];
        const correctChoice = q.choices[q.correct_index];
        const questionText = q.question.hanzi || q.question.text || q.question.pinyin;
        return `<div class="quiz-wrong-item"><span>${escapeHtml(questionText)}</span> → <strong>${escapeHtml(correctChoice)}</strong></div>`;
      }).join('');
  } else {
    detailsEl.innerHTML = '<p class="quiz-perfect">パーフェクト！全問正解！</p>';
  }

  // Save results to server
  try {
    const res = await apiFetch(`${API}/api/curriculum/quiz/result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ results: quizResults }),
    });
    if (res) {
      const result = await res.json();
      if (result.new_achievements) handleNewAchievements(result.new_achievements);
    }
    loadStats(); // Refresh stats
    progressGraphsLoaded = false;
  } catch (err) {
    console.error('Quiz result save error:', err);
  }
}

// ===== 学習進捗 =====
async function loadStats() {
  try {
    const res = await apiFetch(`${API}/api/curriculum/stats`);
    if (!res) return;
    const stats = await res.json();

    currentStatsCache = stats;
    const summary = document.getElementById('progress-summary');
    summary.style.display = '';

    document.getElementById('stat-streak').textContent = stats.streak;
    document.getElementById('stat-today').textContent = stats.today_count;
    document.getElementById('stat-mastered').textContent = stats.mastered;

    // Review badge
    const reviewStat = document.getElementById('review-stat');
    if (stats.needs_review > 0) {
      reviewStat.style.display = '';
      document.getElementById('stat-review').textContent = stats.needs_review;
    } else {
      reviewStat.style.display = 'none';
    }

    // 使用制限バッジ表示
    if (stats.plan === 'free' && stats.daily_usage) {
      const chatNav = document.querySelector('[data-tab="chat"]');
      const drillNav = document.querySelector('[data-tab="drill"]');
      if (chatNav) {
        const chatRemaining = (stats.limits?.chat || 10) - (stats.daily_usage.chat_count || 0);
        const existingBadge = chatNav.querySelector('.usage-badge');
        if (existingBadge) existingBadge.remove();
        if (chatRemaining <= 3) {
          const badge = document.createElement('span');
          badge.className = `usage-badge${chatRemaining <= 0 ? ' depleted' : ''}`;
          badge.textContent = chatRemaining <= 0 ? '制限' : `残${chatRemaining}`;
          chatNav.appendChild(badge);
        }
      }
    }

    // レベルバッジ
    if (stats.level) updateLevelBadge(stats.level);
  } catch (err) {
    console.error('Stats load error:', err);
  }
}

// ===== 進捗グラフ =====
let progressGraphsLoaded = false;

function toggleProgressGraph() {
  const panel = document.getElementById('progress-graphs');
  const btn = document.getElementById('progress-expand-btn');
  if (panel.style.display === 'none') {
    panel.style.display = '';
    btn.textContent = '閉じる ▲';
    if (!progressGraphsLoaded) {
      loadProgressGraphs();
      progressGraphsLoaded = true;
    }
  } else {
    panel.style.display = 'none';
    btn.textContent = '詳しく見る ▼';
  }
}

async function loadProgressGraphs() {
  try {
    const [weeklyRes, statsRes] = await Promise.all([
      apiFetch(`${API}/api/curriculum/weekly-activity`),
      apiFetch(`${API}/api/curriculum/stats`),
    ]);
    if (weeklyRes) renderWeeklyChart(await weeklyRes.json());
    if (statsRes) {
      const stats = await statsRes.json();
      renderLessonChart(stats.lesson_progress || []);
    }
  } catch (err) {
    console.error('Graph load error:', err);
  }
}

function renderWeeklyChart(days) {
  const container = document.getElementById('weekly-chart');
  if (!days || days.length === 0) {
    container.innerHTML = '<p class="empty-state">まだ学習記録がありません</p>';
    return;
  }

  const maxCount = Math.max(...days.map(d => d.count), 1);
  const barWidth = 100 / days.length;

  const svgW = 280;
  const svgH = 120;
  const barGap = 6;
  const bw = (svgW - barGap * (days.length + 1)) / days.length;
  const chartH = 80;

  let bars = '';
  let labels = '';
  days.forEach((d, i) => {
    const x = barGap + i * (bw + barGap);
    const h = maxCount > 0 ? (d.count / maxCount) * chartH : 0;
    const y = chartH - h + 10;
    const color = d.count > 0 ? '#0A5FA6' : '#E0E0E0';

    bars += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${color}"/>`;
    if (d.count > 0) {
      bars += `<text x="${x + bw/2}" y="${y - 4}" text-anchor="middle" font-size="10" fill="#333">${d.count}</text>`;
    }
    labels += `<text x="${x + bw/2}" y="${svgH - 2}" text-anchor="middle" font-size="10" fill="#78716C">${d.day}</text>`;
  });

  container.innerHTML = `
    <svg viewBox="0 0 ${svgW} ${svgH}" class="chart-svg">
      ${bars}
      ${labels}
    </svg>
  `;
}

function renderLessonChart(lessonProgress) {
  const container = document.getElementById('lesson-chart');
  if (!lessonProgress || lessonProgress.length === 0) {
    container.innerHTML = '<p class="empty-state">レッスンデータがありません</p>';
    return;
  }

  const rows = lessonProgress.map(l => {
    const pct = l.vocab_count > 0 ? Math.round((l.mastered / l.vocab_count) * 100) : 0;
    const label = l.lesson_number === 0 ? 'ピンイン' : `第${l.lesson_number}課`;
    const color = pct >= 80 ? '#059669' : pct >= 40 ? '#0A5FA6' : '#D97706';
    return `
      <div class="lesson-bar-row">
        <span class="lesson-bar-label">${label}</span>
        <div class="lesson-bar-track">
          <div class="lesson-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <span class="lesson-bar-pct">${pct}%</span>
      </div>
    `;
  }).join('');

  container.innerHTML = rows;
}

// ===== シェア機能 =====
let currentStatsCache = null; // loadStatsで更新

async function generateScoreCard(data) {
  const { mastered, streak, level_name, level_num } = data;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0A5FA6"/>
        <stop offset="100%" style="stop-color:#084B84"/>
      </linearGradient>
    </defs>
    <rect width="600" height="340" rx="24" fill="url(#bg)"/>
    <text x="300" y="55" text-anchor="middle" fill="white" font-family="sans-serif" font-size="28" font-weight="bold">台湾スピーク</text>
    <text x="300" y="80" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="sans-serif" font-size="14">台湾で通じる中国語アプリ</text>
    <rect x="50" y="100" width="500" height="150" rx="16" fill="rgba(255,255,255,0.1)"/>
    <text x="175" y="155" text-anchor="middle" fill="#FFDB00" font-family="sans-serif" font-size="52" font-weight="bold">${mastered}</text>
    <text x="175" y="185" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="sans-serif" font-size="16">語マスター</text>
    <text x="425" y="155" text-anchor="middle" fill="#FFDB00" font-family="sans-serif" font-size="52" font-weight="bold">${streak}</text>
    <text x="425" y="185" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="sans-serif" font-size="16">日連続</text>
    <line x1="300" y1="120" x2="300" y2="230" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    ${level_name ? `<rect x="220" y="210" width="160" height="28" rx="14" fill="#FFDB00"/>
    <text x="300" y="230" text-anchor="middle" fill="#333" font-family="sans-serif" font-size="13" font-weight="bold">Lv.${level_num} ${level_name}</text>` : ''}
    <text x="300" y="310" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="sans-serif" font-size="12">taiwan-chinese-coach.fly.dev</text>
  </svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 340;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(resolve, 'image/png');
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

async function shareMyScore() {
  if (!currentStatsCache) {
    showToast('データを読み込み中...', 'info');
    return;
  }

  const data = {
    mastered: currentStatsCache.mastered || 0,
    streak: currentStatsCache.streak || 0,
    level_name: currentStatsCache.level?.name || '',
    level_num: currentStatsCache.level?.level || 1,
  };

  const pngBlob = await generateScoreCard(data);
  if (!pngBlob) {
    showToast('画像の生成に失敗しました', 'error');
    return;
  }

  const shareText = `台湾スピークで${data.mastered}語マスター！🔥${data.streak}日連続学習中 #台湾スピーク`;

  if (navigator.share) {
    try {
      const file = new File([pngBlob], 'taiwanspeak-score.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ text: shareText, files: [file] });
        return;
      }
      await navigator.share({ text: shareText, url: 'https://taiwan-chinese-coach.fly.dev' });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return;
    }
  }

  // Fallback: download + copy text
  const link = document.createElement('a');
  link.href = URL.createObjectURL(pngBlob);
  link.download = 'taiwanspeak-score.png';
  link.click();
  try { await navigator.clipboard.writeText(shareText); } catch {}
  showToast('画像をダウンロードしました。SNSに投稿してください！', 'success');
}

async function shareQuizScore() {
  const scoreNum = document.getElementById('quiz-score-num')?.textContent || '0';
  const total = quizQuestions.length || 10;
  const shareText = `台湾スピーク 単語クイズ ${scoreNum}/${total}問正解！ #台湾スピーク`;

  if (navigator.share) {
    try {
      await navigator.share({ text: shareText, url: 'https://taiwan-chinese-coach.fly.dev' });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return;
    }
  }
  try { await navigator.clipboard.writeText(shareText); } catch {}
  showToast('テキストをコピーしました！', 'success');
}

// ===== 復習モード =====
function startReviewMode() {
  isReviewMode = true;
  quizMode = 'zh_to_ja';

  // Switch to drill tab, quiz mode
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.nav-btn[data-tab="drill"]').classList.add('active');
  document.getElementById('drill-tab').classList.add('active');

  document.getElementById('drill-mode-toggle').style.display = '';
  switchDrillMode('quiz');
  startQuiz();
}
