const path = require('path');
const fs = require('fs');

// サーバーのgetDbを使うことでスキーマ初期化を保証する
const { getDb } = require('../server/db');

const SQL_PATH = path.join(__dirname, 'travel-pack.sql');

const db = getDb();

// 既存のトラベルパックを削除（冪等性）
db.prepare("DELETE FROM vocabulary WHERE lesson_id LIKE 'travel-%'").run();
db.prepare("DELETE FROM lessons WHERE id LIKE 'travel-%'").run();

const sql = fs.readFileSync(SQL_PATH, 'utf-8');
db.exec(sql);

// 件数確認
const lessons = db.prepare("SELECT id, title_zh, vocab_count FROM lessons WHERE id LIKE 'travel-%'").all();
lessons.forEach(l => {
  const actual = db.prepare("SELECT COUNT(*) as c FROM vocabulary WHERE lesson_id = ?").get(l.id);
  console.log(`${l.id}: ${l.title_zh} — ${actual.c} phrases`);
});
console.log('Travel pack imported successfully!');
