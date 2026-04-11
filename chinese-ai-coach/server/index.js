const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { getDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3860;
const FREE_LIMITS = { chat: 10, speech: 10 };
// 招待コード登録時に付与するトライアル日数。ベータ期間中は30、本番移行後は環境変数で短縮可能
const TRIAL_DAYS = parseInt(process.env.TRIAL_DAYS || '30', 10);

app.use(cors({
  origin: true,
  allowedHeaders: ['Content-Type', 'x-student-token', 'x-session-id', 'x-coach-key'],
}));
app.use(express.json({ limit: '5mb' }));
// 静的ファイル: index.htmlの自動配信は無効化（/ は LP を明示的に返すため）
app.use(express.static(path.join(__dirname, '../public'), { index: false }));

// 生徒認証ミドルウェア（セッション検証付き）
function auth(req, res, next) {
  const token = req.headers['x-student-token'] || req.query.token;
  const sessionId = req.headers['x-session-id'];
  if (!token) return res.status(401).json({ error: 'Token required' });

  const db = getDb();
  const student = db.prepare('SELECT * FROM students WHERE token = ?').get(token);
  if (!student) return res.status(401).json({ error: 'Invalid token' });

  // セッション検証
  if (sessionId) {
    const session = db.prepare(
      'SELECT * FROM sessions WHERE id = ? AND student_id = ?'
    ).get(sessionId, student.id);
    if (!session) {
      return res.status(401).json({
        error: 'session_expired',
        message: '別のデバイスでログインされました',
      });
    }
    db.prepare('UPDATE sessions SET last_active = CURRENT_TIMESTAMP WHERE id = ?')
      .run(sessionId);
  }

  req.student = student;
  next();
}

// 講師用認証（シンプルなパスワード）
function coachAuth(req, res, next) {
  const pass = req.headers['x-coach-key'] || req.query.coach_key;
  if (pass !== (process.env.COACH_KEY || 'coach2026')) {
    return res.status(401).json({ error: 'Invalid coach key' });
  }
  next();
}

function usageLimit(type) {
  return (req, res, next) => {
    const s = req.student;
    const db = getDb();

    // premium: 永久無制限
    if (s.plan === 'premium') return next();

    // trial: 期限内なら無制限、期限切れならfreeに自動降格して制限適用へフォールスルー
    if (s.plan === 'trial') {
      if (s.trial_ends_at && new Date(s.trial_ends_at) > new Date()) {
        return next();
      }
      db.prepare("UPDATE students SET plan = 'free' WHERE id = ?").run(s.id);
      s.plan = 'free';
    }

    // free: 日次制限を適用
    db.prepare(`INSERT INTO daily_usage (student_id, usage_date) VALUES (?, date('now')) ON CONFLICT(student_id, usage_date) DO NOTHING`).run(s.id);
    const usage = db.prepare(`SELECT ${type}_count FROM daily_usage WHERE student_id = ? AND usage_date = date('now')`).get(s.id);
    const count = usage?.[`${type}_count`] || 0;
    const limit = FREE_LIMITS[type];
    if (count >= limit) {
      return res.status(429).json({ error: 'daily_limit_reached', type, used: count, limit });
    }
    db.prepare(`UPDATE daily_usage SET ${type}_count = ${type}_count + 1 WHERE student_id = ? AND usage_date = date('now')`).run(s.id);
    res.setHeader('X-Usage-Remaining', String(limit - count - 1));
    res.setHeader('X-Usage-Limit', String(limit));
    next();
  };
}

// セルフサインアップ（招待コード制）
app.post('/api/register', (req, res) => {
  const { invite_code, name, passcode } = req.body;
  if (!invite_code || !name || !passcode) {
    return res.status(400).json({ error: '全ての項目を入力してください' });
  }
  if (passcode.length !== 4 || !/^\d{4}$/.test(passcode)) {
    return res.status(400).json({ error: 'パスコードは4桁の数字で入力してください' });
  }

  const db = getDb();
  const code = db.prepare(
    "SELECT * FROM invite_codes WHERE code = ? AND used_by IS NULL AND (expires_at IS NULL OR expires_at > datetime('now'))"
  ).get(invite_code.trim().toUpperCase());
  if (!code) {
    return res.status(400).json({ error: '招待コードが無効です。期限切れまたは使用済みの可能性があります' });
  }

  // 同名チェック
  const existing = db.prepare('SELECT id FROM students WHERE name = ?').get(name.trim());
  if (existing) {
    return res.status(400).json({ error: 'このお名前は既に登録されています。別のお名前を使用してください' });
  }

  const token = crypto.randomBytes(16).toString('hex');
  // ベータトライアル: 登録時点から TRIAL_DAYS 日間のプレミアム
  const trialEndsAt = new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const register = db.transaction(() => {
    const result = db.prepare(
      'INSERT INTO students (name, token, passcode, plan, invite_code_id, trial_ends_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name.trim(), token, passcode, 'trial', code.id, trialEndsAt);
    db.prepare('UPDATE invite_codes SET used_by = ?, used_at = datetime(?) WHERE id = ?')
      .run(result.lastInsertRowid, new Date().toISOString(), code.id);
    return result;
  });

  try {
    const result = register();
    const studentId = result.lastInsertRowid;
    const sessionId = crypto.randomUUID();
    db.prepare('INSERT INTO sessions (id, student_id, user_agent) VALUES (?, ?, ?)')
      .run(sessionId, studentId, req.headers['user-agent'] || '');
    res.json({
      id: studentId,
      name: name.trim(),
      token,
      plan: 'trial',
      trial_ends_at: trialEndsAt,
      session_id: sessionId,
    });
  } catch (err) {
    res.status(500).json({ error: '登録に失敗しました' });
  }
});

// 生徒ログイン
app.post('/api/login', (req, res) => {
  const { name, passcode } = req.body;
  if (!name || !passcode) return res.status(400).json({ error: 'name and passcode required' });

  const db = getDb();
  const student = db.prepare('SELECT id, name, level, token, plan, trial_ends_at FROM students WHERE name = ? AND passcode = ?').get(name.trim(), passcode);
  if (!student) return res.status(401).json({ error: 'お名前またはパスコードが違います' });

  // ログイン時にもトライアル期限切れを判定して自動降格
  if (student.plan === 'trial' && student.trial_ends_at && new Date(student.trial_ends_at) <= new Date()) {
    db.prepare("UPDATE students SET plan = 'free' WHERE id = ?").run(student.id);
    student.plan = 'free';
  }

  // 既存セッションを全削除 → 新規セッション作成（1デバイス制限）
  const sessionId = crypto.randomUUID();
  db.prepare('DELETE FROM sessions WHERE student_id = ?').run(student.id);
  db.prepare('INSERT INTO sessions (id, student_id, user_agent) VALUES (?, ?, ?)')
    .run(sessionId, student.id, req.headers['user-agent'] || '');

  res.json({ ...student, session_id: sessionId });
});

// 招待コード管理（ダッシュボードルーターより先に定義）
app.post('/api/dashboard/invite-codes/batch', coachAuth, (req, res) => {
  const { count = 10, expires_days = 30 } = req.body;
  const db = getDb();
  const codes = [];
  const insert = db.prepare('INSERT INTO invite_codes (code, expires_at) VALUES (?, datetime(?, ?))');
  const batchInsert = db.transaction(() => {
    for (let i = 0; i < Math.min(count, 100); i++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      insert.run(code, 'now', `+${expires_days} days`);
      codes.push(code);
    }
  });
  try {
    batchInsert();
    res.json({ codes, expires_days });
  } catch (err) {
    res.status(500).json({ error: 'コード生成に失敗しました' });
  }
});

app.get('/api/dashboard/invite-codes', coachAuth, (req, res) => {
  const db = getDb();
  const codes = db.prepare(`
    SELECT ic.*, s.name as used_by_name
    FROM invite_codes ic
    LEFT JOIN students s ON ic.used_by = s.id
    ORDER BY ic.created_at DESC
  `).all();
  res.json(codes);
});

app.delete('/api/dashboard/invite-codes/:id', coachAuth, (req, res) => {
  const db = getDb();
  const result = db.prepare('DELETE FROM invite_codes WHERE id = ? AND used_by IS NULL').run(req.params.id);
  if (result.changes === 0) return res.status(400).json({ error: '使用済みのコードは削除できません' });
  res.json({ ok: true });
});

// ===== フィードバック収集 =====
// 生徒が任意で送信（匿名可）。ログイン中ならstudent_idも記録
app.post('/api/feedback', (req, res) => {
  const { content, rating, category } = req.body;
  if (!content || typeof content !== 'string' || content.trim().length < 3) {
    return res.status(400).json({ error: '内容を入力してください（3文字以上）' });
  }
  if (content.length > 2000) {
    return res.status(400).json({ error: '2000文字以内で入力してください' });
  }
  const db = getDb();
  // 生徒がログイン中かチェック（オプショナル — トークンがあれば紐付け）
  let studentId = null;
  const token = req.headers['x-student-token'];
  if (token) {
    const student = db.prepare('SELECT id FROM students WHERE token = ?').get(token);
    if (student) studentId = student.id;
  }
  const ratingNum = Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null;
  const categoryStr = typeof category === 'string' && category.length < 50 ? category : null;
  try {
    db.prepare(
      'INSERT INTO feedback (student_id, rating, content, category) VALUES (?, ?, ?, ?)'
    ).run(studentId, ratingNum, content.trim(), categoryStr);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: '送信に失敗しました' });
  }
});

// ダッシュボード用: フィードバック一覧（コーチ認証）
app.get('/api/dashboard/feedback', coachAuth, (req, res) => {
  const db = getDb();
  const rows = db.prepare(`
    SELECT f.id, f.rating, f.content, f.category, f.created_at,
           s.name as student_name
    FROM feedback f
    LEFT JOIN students s ON s.id = f.student_id
    ORDER BY f.created_at DESC
    LIMIT 200
  `).all();
  res.json(rows);
});

// ルート（生徒向けはauth必須）
app.use('/api/chat', auth, usageLimit('chat'), require('./routes/chat'));
app.use('/api/speech', auth, usageLimit('speech'), require('./routes/speech'));
app.use('/api/tasks', auth, require('./routes/tasks'));
app.use('/api/curriculum', auth, require('./routes/curriculum'));
app.use('/api/dashboard', coachAuth, require('./routes/dashboard'));
app.use('/api/tts', auth, require('./routes/tts'));

// 生徒登録（管理者用）
app.post('/api/admin/students', coachAuth, (req, res) => {
  const { name, line_name, level, passcode } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });

  const token = crypto.randomBytes(16).toString('hex');
  const code = passcode || String(Math.floor(1000 + Math.random() * 9000));
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO students (name, line_name, token, passcode, level) VALUES (?, ?, ?, ?, ?)'
  ).run(name, line_name || '', token, code, level || 'beginner');

  res.json({ id: result.lastInsertRowid, token, passcode: code });
});

// 生徒一覧（管理者用）
app.get('/api/admin/students', coachAuth, (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT id, name, line_name, level, created_at FROM students').all());
});

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    speechsuper: !!process.env.SPEECHSUPER_APP_KEY,
    claude: !!process.env.ANTHROPIC_API_KEY,
  });
});

// LP（プロダクトLP — 新規ドメインのルート）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lp.html'));
});

// アプリ本体（/app および /app/* の全サブパス）
app.get(['/app', '/app/{*path}'], (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).end();
  });
});

// ダッシュボードページ
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// SPA fallback — それ以外のパスはLPへ
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/lp.html'), (err) => {
    if (err) res.status(404).end();
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`台湾スピーク running on http://localhost:${PORT}`);
  getDb(); // DB初期化

  // 24時間以上経過したセッションを1時間ごとに削除
  setInterval(() => {
    try {
      const db = getDb();
      db.prepare("DELETE FROM sessions WHERE last_active < datetime('now', '-1 day')").run();
    } catch {}
  }, 60 * 60 * 1000);
});
