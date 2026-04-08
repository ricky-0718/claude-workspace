const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.argv[2] || path.join(__dirname, '..', 'data', 'coach.db');
const db = new Database(DB_PATH);

function esc(s) {
  return (s || '').replace(/'/g, "''");
}

let sql = '-- Full curriculum data export\n';

// Grammar
sql += 'DELETE FROM grammar_points;\n';
const grammar = db.prepare('SELECT * FROM grammar_points ORDER BY lesson_id, sort_order').all();
for (const r of grammar) {
  const videoVal = r.video_url ? `'${r.video_url}'` : 'NULL';
  sql += `INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary,video_url) VALUES ('${r.lesson_id}',${r.sort_order},'${esc(r.title)}','${esc(r.explanation)}','${esc(r.exercises)}','${esc(r.answers)}','${esc(r.summary)}',${videoVal});\n`;
}

// Vocabulary
sql += '\nDELETE FROM vocabulary;\n';
const vocab = db.prepare('SELECT * FROM vocabulary ORDER BY lesson_id, sort_order').all();
for (const v of vocab) {
  sql += `INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('${v.lesson_id}',${v.sort_order},'${esc(v.hanzi)}','${esc(v.pinyin)}','${esc(v.translation_ja)}','${esc(v.examples_json)}');\n`;
}

const outPath = path.join(__dirname, '..', 'full-data-export.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log(`Exported: ${grammar.length} grammar + ${vocab.length} vocab`);
console.log(`File: ${Math.round(fs.statSync(outPath).size / 1024)} KB`);
db.close();
