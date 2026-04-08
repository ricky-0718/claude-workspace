const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.argv[2] || path.join(__dirname, '..', 'data', 'coach.db');
const db = new Database(DB_PATH);
const videosPath = process.argv[3] || path.join(__dirname, '..', '..', '.playwright-mcp', 'playlist-videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// Parse videos: "L1-2..." → book1 lesson1 order2, "2L3-4..." → book2 lesson3 order4
const videosByLesson = {};
for (const v of videos) {
  const m2 = v.title.match(/^2L(\d+)[\-‐](\d+)/);
  const m1 = v.title.match(/^L?(\d+)[\-‐](\d+)/);
  let book, lesson, order;
  if (m2) { book = 2; lesson = parseInt(m2[1]); order = parseInt(m2[2]); }
  else if (m1) { book = 1; lesson = parseInt(m1[1]); order = parseInt(m1[2]); }
  else continue;

  const lid = `book${book}-lesson${String(lesson).padStart(2, '0')}`;
  if (!videosByLesson[lid]) videosByLesson[lid] = [];
  videosByLesson[lid].push({ ...v, order });
}

// Sort each lesson's videos by order
for (const lid in videosByLesson) {
  videosByLesson[lid].sort((a, b) => a.order - b.order);
}

// Clear all video URLs
db.prepare('UPDATE grammar_points SET video_url = NULL').run();

// Positional match: Nth grammar point = Nth video
const update = db.prepare('UPDATE grammar_points SET video_url = ? WHERE id = ?');
let matched = 0;
let total = 0;

const allLessons = db.prepare("SELECT DISTINCT lesson_id FROM grammar_points ORDER BY lesson_id").all();
for (const { lesson_id } of allLessons) {
  const grammarItems = db.prepare('SELECT id, title FROM grammar_points WHERE lesson_id = ? ORDER BY sort_order').all(lesson_id);
  const lessonVideos = videosByLesson[lesson_id] || [];

  total += grammarItems.length;

  for (let i = 0; i < grammarItems.length; i++) {
    if (i < lessonVideos.length) {
      const url = `https://www.youtube.com/watch?v=${lessonVideos[i].id}`;
      update.run(url, grammarItems[i].id);
      matched++;
    }
  }

  const gap = grammarItems.length - lessonVideos.length;
  if (gap > 0) {
    console.log(`${lesson_id}: ${grammarItems.length} grammar, ${lessonVideos.length} videos (${gap} unmatched)`);
  } else {
    console.log(`${lesson_id}: ${grammarItems.length} grammar, ${lessonVideos.length} videos ✓`);
  }
}

console.log(`\nTotal: ${matched}/${total} matched`);
db.close();
