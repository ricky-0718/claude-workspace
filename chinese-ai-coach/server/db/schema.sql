-- 生徒
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  line_name TEXT,
  token TEXT UNIQUE NOT NULL,
  passcode TEXT NOT NULL DEFAULT '0000',
  level TEXT DEFAULT 'beginner',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 発音ドリル記録
CREATE TABLE IF NOT EXISTS drill_logs (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  target_text TEXT NOT NULL,
  target_pinyin TEXT NOT NULL,
  overall_score REAL,
  pronunciation_score REAL,
  tone_score REAL,
  initial_score REAL,
  final_score REAL,
  fluency_score REAL,
  audio_path TEXT,
  feedback_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- テキスト会話記録
CREATE TABLE IF NOT EXISTS chat_logs (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  corrections TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- 課題
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  task_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  due_date DATE,
  completed_at DATETIME,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- セッション管理（同時ログイン制限）
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  student_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- 講師チェック記録
CREATE TABLE IF NOT EXISTS coach_reviews (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  coach_name TEXT NOT NULL,
  review_date DATE NOT NULL,
  notes TEXT,
  weak_points TEXT,
  next_focus TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
