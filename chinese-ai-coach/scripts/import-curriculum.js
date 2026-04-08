/**
 * 時代華語カリキュラムデータ インポートスクリプト
 *
 * Google Sheetsから単語・文法データを取得してSQLiteに投入する。
 * gws CLI必須（ローカル専用、Fly.ioでは実行不可）
 *
 * Usage:
 *   node scripts/import-curriculum.js              # 全データインポート
 *   node scripts/import-curriculum.js --vocab-only  # 単語のみ
 *   node scripts/import-curriculum.js --grammar-only # 文法のみ
 *   node scripts/import-curriculum.js --dry-run     # DB書き込みなし
 */

const { execSync } = require('child_process');
const path = require('path');
const Database = require('better-sqlite3');

// === Config ===
const VOCAB_SHEET_ID = '1By88PdXffVehBd1rVBICrsFCy96mZUP0-jdVLnYkQzE';
const GRAMMAR_SHEET_ID = '1hUsmfysj89OwXq5rQBq0i2_JbUZJbNz5uW_kH2qY2Po';
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'coach.db');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VOCAB_ONLY = args.includes('--vocab-only');
const GRAMMAR_ONLY = args.includes('--grammar-only');

// === 漢数字 → 数字 マッピング ===
const KANJI_NUM = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8,
  '九': 9, '十': 10, '十一': 11, '十二': 12, '十三': 13, '十四': 14,
  '十五': 15, '十六': 16,
};

function kanjiToNumber(str) {
  // Match 第X課 pattern
  const m = str.match(/第(.+?)課/);
  if (!m) return null;
  return KANJI_NUM[m[1]] || null;
}

// === gws CLI wrapper ===
function gwsRead(spreadsheetId, range) {
  const params = JSON.stringify({ spreadsheetId, range });
  const cmd = `gws sheets spreadsheets values get --params ${JSON.stringify(params)}`;
  try {
    const result = execSync(cmd, { encoding: 'utf8', timeout: 30000, maxBuffer: 10 * 1024 * 1024 });
    return JSON.parse(result);
  } catch (e) {
    console.error(`  [ERROR] Failed to read ${range}:`, e.message?.substring(0, 200));
    return null;
  }
}

function gwsGetSheets(spreadsheetId) {
  const params = JSON.stringify({ spreadsheetId, fields: 'sheets(properties(sheetId,title))' });
  const cmd = `gws sheets spreadsheets get --params ${JSON.stringify(params)}`;
  const result = execSync(cmd, { encoding: 'utf8', timeout: 30000 });
  return JSON.parse(result).sheets.map(s => s.properties.title);
}

// === DB setup ===
function getDb() {
  const fs = require('fs');
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Run schema
  const schema = fs.readFileSync(path.join(__dirname, '..', 'server', 'db', 'schema.sql'), 'utf-8');
  db.exec(schema);

  // Migration
  try { db.exec("ALTER TABLE students ADD COLUMN current_lesson_id TEXT DEFAULT 'book1-lesson01'"); } catch {}

  return db;
}

// ============================================================
// VOCABULARY IMPORT
// ============================================================
function importVocabulary(db) {
  console.log('\n=== 単語データ インポート ===');

  const sheets = gwsGetSheets(VOCAB_SHEET_ID);
  const lessonSheets = sheets.filter(s => s.startsWith('『時代華語』'));
  console.log(`  ${lessonSheets.length} レッスンシート発見`);

  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (id, book, lesson_number, title_zh, title_ja, vocab_count, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const deleteVocab = db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?');
  const insertVocab = db.prepare(`
    INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  let totalWords = 0;

  for (const sheetName of lessonSheets) {
    // Parse lesson number from sheet name: 『時代華語』第一課　新同學
    const lessonNum = kanjiToNumber(sheetName);
    if (!lessonNum) {
      console.log(`  [SKIP] Cannot parse lesson number: ${sheetName}`);
      continue;
    }

    // Extract title: everything after 課 and whitespace
    const titleMatch = sheetName.match(/課[\s　]+(.+)$/);
    const titleZh = titleMatch ? titleMatch[1] : '';
    const lessonId = `book1-lesson${String(lessonNum).padStart(2, '0')}`;

    console.log(`  ${lessonId}: ${sheetName}`);

    // Read all data from sheet
    const data = gwsRead(VOCAB_SHEET_ID, `'${sheetName}'!A1:G200`);
    if (!data || !data.values || data.values.length < 3) {
      console.log(`    [WARN] No data in sheet`);
      continue;
    }

    const rows = data.values;
    // Row 0 = title, Row 1 = headers, Row 2+ = data
    const words = [];
    let currentWord = null;

    for (let i = 2; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 5) continue;

      const wordCol = (row[1] || '').trim();
      const pinyinCol = (row[2] || '').trim();
      const jaCol = (row[3] || '').trim();
      const exHanzi = (row[4] || '').trim();
      const exPinyin = (row[5] || '').trim();
      const exJa = (row[6] || '').trim();

      if (wordCol) {
        // New word
        if (currentWord) words.push(currentWord);
        currentWord = {
          hanzi: wordCol,
          pinyin: pinyinCol,
          translation_ja: jaCol,
          examples: [],
        };
      }

      // Add example sentence (both for new word row and continuation rows)
      if (currentWord && exHanzi) {
        currentWord.examples.push({
          hanzi: exHanzi,
          pinyin: exPinyin,
          translation_ja: exJa,
        });
      }
    }
    if (currentWord) words.push(currentWord);

    console.log(`    ${words.length} 単語`);
    totalWords += words.length;

    if (!DRY_RUN) {
      // Insert lesson
      insertLesson.run(lessonId, 1, lessonNum, titleZh, '', words.length, lessonNum);

      // Clear old vocab and insert new
      deleteVocab.run(lessonId);
      for (let j = 0; j < words.length; j++) {
        const w = words[j];
        insertVocab.run(
          lessonId, j + 1, w.hanzi, w.pinyin, w.translation_ja,
          JSON.stringify(w.examples)
        );
      }
    }
  }

  console.log(`\n  合計: ${totalWords} 単語をインポート${DRY_RUN ? '（dry-run）' : ''}`);
}

// ============================================================
// GRAMMAR IMPORT
// ============================================================
function importGrammar(db) {
  console.log('\n=== 文法データ インポート ===');

  const sheets = gwsGetSheets(GRAMMAR_SHEET_ID);
  console.log(`  ${sheets.length} シート発見`);

  // Filter out non-content sheets
  const skipSheets = ['テンプレート', 'テスト'];
  const contentSheets = sheets.filter(s =>
    !skipSheets.includes(s) && !s.includes('コピー')
  );

  // Build lesson mapping: iterate sheets in order,
  // "第N課" sheets set the current lesson context
  const lessonNumPattern = /^第(\d+)課/;
  const kanjiLessonPattern = /^第(.+?)課/;

  // Also handle "2冊目第N課" pattern
  const book2Pattern = /^2冊目第(\d+)課/;

  let currentLessonId = null;
  let currentBook = 1;
  let grammarOrder = {};  // lesson_id -> counter

  const deleteGrammar = db.prepare('DELETE FROM grammar_points WHERE lesson_id = ? AND title = ?');
  const insertGrammar = db.prepare(`
    INSERT INTO grammar_points (lesson_id, sort_order, title, explanation, exercises, answers, summary)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  let totalGrammar = 0;

  for (const sheetName of contentSheets) {
    // Check if this is a lesson boundary marker
    const book2Match = sheetName.match(book2Pattern);
    const lessonMatch = sheetName.match(lessonNumPattern);
    const kanjiMatch = sheetName.match(kanjiLessonPattern);

    if (book2Match) {
      currentBook = 2;
      const num = parseInt(book2Match[1]);
      currentLessonId = `book2-lesson${String(num).padStart(2, '0')}`;
      grammarOrder[currentLessonId] = grammarOrder[currentLessonId] || 0;
      console.log(`  [LESSON] ${currentLessonId}: ${sheetName}`);

      // Ensure lesson exists
      if (!DRY_RUN) {
        const titleMatch = sheetName.match(/課[\s　]+(.+)$/);
        const titleZh = titleMatch ? titleMatch[1].replace(/[「」]/g, '') : sheetName;
        db.prepare(`INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order) VALUES (?, ?, ?, ?, ?)`)
          .run(currentLessonId, 2, num, titleZh, 100 + num);
      }
      continue;
    }

    if (sheetName.startsWith('第') && (lessonMatch || kanjiMatch)) {
      currentBook = 1;
      let num;
      if (lessonMatch) {
        num = parseInt(lessonMatch[1]);
      } else if (kanjiMatch) {
        num = KANJI_NUM[kanjiMatch[1]];
      }
      if (num) {
        currentLessonId = `book1-lesson${String(num).padStart(2, '0')}`;
        grammarOrder[currentLessonId] = grammarOrder[currentLessonId] || 0;
        console.log(`  [LESSON] ${currentLessonId}: ${sheetName}`);
      }
      continue;
    }

    // This is a grammar point sheet
    if (!currentLessonId) {
      console.log(`  [SKIP] No lesson context for: ${sheetName}`);
      continue;
    }

    // Read the grammar content
    const data = gwsRead(GRAMMAR_SHEET_ID, `'${sheetName}'!A1:D15`);
    if (!data || !data.values) {
      console.log(`  [WARN] No data: ${sheetName}`);
      continue;
    }

    const rows = data.values;
    let title = sheetName;
    let explanation = '';
    let exercises = '';
    let answers = '';
    let summary = '';

    for (const row of rows) {
      const section = (row[0] || '').trim();
      const content = (row[2] || '').trim();

      switch (section) {
        case 'タイトル': title = content || sheetName; break;
        case '文法解説': explanation = content; break;
        case '練習問題': exercises = content; break;
        case '解答': answers = content; break;
        case 'まとめ': summary = content; break;
      }
    }

    grammarOrder[currentLessonId]++;
    totalGrammar++;

    if (!DRY_RUN) {
      deleteGrammar.run(currentLessonId, title);
      insertGrammar.run(
        currentLessonId, grammarOrder[currentLessonId],
        title, explanation, exercises, answers, summary
      );
    }

    if (totalGrammar % 20 === 0) {
      console.log(`    ... ${totalGrammar} 文法項目処理済み`);
    }
  }

  // Update vocab_count for lessons that only came from grammar (book2)
  if (!DRY_RUN) {
    // Update grammar count on lessons
    const lessons = db.prepare('SELECT id FROM lessons').all();
    for (const l of lessons) {
      const count = db.prepare('SELECT COUNT(*) as c FROM grammar_points WHERE lesson_id = ?').get(l.id);
      // Don't overwrite vocab_count, just ensure lesson exists
    }
  }

  console.log(`\n  合計: ${totalGrammar} 文法項目をインポート${DRY_RUN ? '（dry-run）' : ''}`);
}

// ============================================================
// MAIN
// ============================================================
function main() {
  console.log('=== 時代華語カリキュラムデータ インポート ===');
  console.log(`  DB: ${DB_PATH}`);
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  const db = DRY_RUN ? null : getDb();

  if (!GRAMMAR_ONLY) {
    if (db) db.exec('BEGIN');
    try {
      importVocabulary(db);
      if (db) db.exec('COMMIT');
    } catch (e) {
      if (db) db.exec('ROLLBACK');
      console.error('Vocabulary import failed:', e);
      throw e;
    }
  }

  if (!VOCAB_ONLY) {
    if (db) db.exec('BEGIN');
    try {
      importGrammar(db);
      if (db) db.exec('COMMIT');
    } catch (e) {
      if (db) db.exec('ROLLBACK');
      console.error('Grammar import failed:', e);
      throw e;
    }
  }

  // Print summary
  if (db) {
    const lessonCount = db.prepare('SELECT COUNT(*) as c FROM lessons').get().c;
    const vocabCount = db.prepare('SELECT COUNT(*) as c FROM vocabulary').get().c;
    const grammarCount = db.prepare('SELECT COUNT(*) as c FROM grammar_points').get().c;
    console.log('\n=== 最終結果 ===');
    console.log(`  レッスン: ${lessonCount}`);
    console.log(`  単語: ${vocabCount}`);
    console.log(`  文法: ${grammarCount}`);
    db.close();
  }

  console.log('\n完了！');
}

main();
