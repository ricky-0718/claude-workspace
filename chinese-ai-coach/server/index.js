const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { getDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3860;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 簡易トークン認証ミドルウェア
function auth(req, res, next) {
  const token = req.headers['x-student-token'] || req.query.token;
  if (!token) return res.status(401).json({ error: 'Token required' });

  const db = getDb();
  const student = db.prepare('SELECT * FROM students WHERE token = ?').get(token);
  if (!student) return res.status(401).json({ error: 'Invalid token' });

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

// 生徒ログイン
app.post('/api/login', (req, res) => {
  const { name, passcode } = req.body;
  if (!name || !passcode) return res.status(400).json({ error: 'name and passcode required' });

  const db = getDb();
  const student = db.prepare('SELECT id, name, level, token FROM students WHERE name = ? AND passcode = ?').get(name.trim(), passcode);
  if (!student) return res.status(401).json({ error: 'お名前またはパスコードが違います' });

  res.json(student);
});

// ルート
app.use('/api/chat', require('./routes/chat'));
app.use('/api/speech', require('./routes/speech'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/dashboard', coachAuth, require('./routes/dashboard'));

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

// SPA fallback (Express v5 syntax)
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Chinese AI Coach running on http://localhost:${PORT}`);
  getDb(); // DB初期化
});
