const Database = require('better-sqlite3');
const db = new Database(process.argv[2] || '/data/coach.db');
const name = process.argv[3];
if (!name) { console.error('Usage: node cleanup-test-user.js <db-path> <name>'); process.exit(1); }
const result = db.prepare('DELETE FROM students WHERE name = ?').run(name);
console.log(`Deleted ${result.changes} rows with name="${name}"`);
db.close();
