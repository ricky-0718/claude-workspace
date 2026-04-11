// 本番DB: book2-lesson02以降のtitle_zhをクリア（「2冊目第N課」の重複表記削除）
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.argv[2] || '/data/coach.db';
const db = new Database(DB_PATH);

// 修正前の状態を表示
const before = db.prepare("SELECT id, lesson_number, title_zh FROM lessons WHERE book = 2 ORDER BY sort_order").all();
console.log('=== Before ===');
before.forEach(l => console.log(`  ${l.id}: "${l.title_zh}"`));

// book2-lesson01は正しいタイトルなので除外。それ以降の重複表記を空に
const result = db.prepare(
  "UPDATE lessons SET title_zh = '' WHERE book = 2 AND id != 'book2-lesson01' AND title_zh LIKE '2冊目第%'"
).run();
console.log(`\nUpdated ${result.changes} rows`);

// 修正後の状態
const after = db.prepare("SELECT id, lesson_number, title_zh FROM lessons WHERE book = 2 ORDER BY sort_order").all();
console.log('\n=== After ===');
after.forEach(l => console.log(`  ${l.id}: "${l.title_zh}"`));

db.close();
