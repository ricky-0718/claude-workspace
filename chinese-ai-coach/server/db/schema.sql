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

-- カリキュラム: 課
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  book INTEGER NOT NULL DEFAULT 1,
  lesson_number INTEGER NOT NULL,
  title_zh TEXT NOT NULL,
  title_ja TEXT,
  vocab_count INTEGER DEFAULT 0,
  sort_order INTEGER NOT NULL
);

-- カリキュラム: 単語
CREATE TABLE IF NOT EXISTS vocabulary (
  id INTEGER PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  hanzi TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  translation_ja TEXT NOT NULL,
  examples_json TEXT,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- カリキュラム: 文法ポイント
CREATE TABLE IF NOT EXISTS grammar_points (
  id INTEGER PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  explanation TEXT,
  exercises TEXT,
  answers TEXT,
  summary TEXT,
  video_url TEXT,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- 生徒の進捗
CREATE TABLE IF NOT EXISTS student_progress (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  vocab_mastered INTEGER DEFAULT 0,
  vocab_total INTEGER DEFAULT 0,
  last_drill_at DATETIME,
  FOREIGN KEY (student_id) REFERENCES students(id),
  UNIQUE(student_id, lesson_id)
);

-- 単語マスタリー（クイズ結果 + SRS復習管理）
CREATE TABLE IF NOT EXISTS vocab_mastery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  vocabulary_id INTEGER NOT NULL,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  last_reviewed_at DATETIME,
  next_review_at DATETIME,
  ease_factor REAL DEFAULT 2.5,
  interval_days INTEGER DEFAULT 0,
  UNIQUE(student_id, vocabulary_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id)
);

-- 学習アクティビティログ（ストリーク計算用）
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  activity_date DATE NOT NULL,
  count INTEGER DEFAULT 1,
  UNIQUE(student_id, activity_type, activity_date),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
