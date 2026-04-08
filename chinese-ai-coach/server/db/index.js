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
    ];
    for (const sql of migrations) {
      try { db.exec(sql); } catch (e) { /* Column already exists */ }
    }
  }
  return db;
}

module.exports = { getDb };
