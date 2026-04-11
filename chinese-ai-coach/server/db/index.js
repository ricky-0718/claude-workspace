const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../data/coach.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

let db;

function getDb() {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    db.exec(schema);

    // Migrations
    const migrations = [
      "ALTER TABLE students ADD COLUMN current_lesson_id TEXT DEFAULT 'book1-lesson01'",
      "ALTER TABLE grammar_points ADD COLUMN video_url TEXT",
      "ALTER TABLE students ADD COLUMN plan TEXT DEFAULT 'free'",
      "ALTER TABLE students ADD COLUMN invite_code_id INTEGER",
      // トライアル期限（ISO8601 datetime文字列）。NULLならトライアル適用なし
      "ALTER TABLE students ADD COLUMN trial_ends_at TEXT",
      // フィードバック収集テーブル
      `CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        rating INTEGER,
        content TEXT NOT NULL,
        category TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL
      )`,
      // 招待コードを再利用可能に。max_uses=1は単発、>1は共有コード
      "ALTER TABLE invite_codes ADD COLUMN max_uses INTEGER DEFAULT 1",
      "ALTER TABLE invite_codes ADD COLUMN use_count INTEGER DEFAULT 0",
    ];
    for (const sql of migrations) {
      try { db.exec(sql); } catch (e) { /* Column already exists */ }
    }
  }
  return db;
}

module.exports = { getDb };
