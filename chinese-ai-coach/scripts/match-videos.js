const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.argv[2] || path.join(__dirname, '..', 'data', 'coach.db');
const db = new Database(DB_PATH);

// Load YouTube playlist data
const videosPath = process.argv[3] || path.join(__dirname, '..', '..', '.playwright-mcp', 'playlist-videos.json');
const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

// Parse video titles: "L1-2形容詞を..." → {book:1, lesson:1, order:2, title}
// "2L3-4 代わりに..." → {book:2, lesson:3, order:4, title}
const parsedVideos = videos.map(v => {
  const m2 = v.title.match(/^2L(\d+)-(\d+)\s*(.*)/);
  const m1 = v.title.match(/^L?(\d+)[\-‐](\d+)\s*(.*)/);
  if (m2) return { ...v, book: 2, lesson: parseInt(m2[1]), order: parseInt(m2[2]), cleanTitle: m2[3] };
  if (m1) return { ...v, book: 1, lesson: parseInt(m1[1]), order: parseInt(m1[2]), cleanTitle: m1[3] };
  return { ...v, book: 0, lesson: 0, order: 0, cleanTitle: v.title };
});

// Get all grammar points grouped by lesson
const grammar = db.prepare('SELECT id, lesson_id, sort_order, title, video_url FROM grammar_points ORDER BY lesson_id, sort_order').all();

// Clear all video URLs first
db.prepare('UPDATE grammar_points SET video_url = NULL').run();

// Match by lesson + order
let matched = 0;
const update = db.prepare('UPDATE grammar_points SET video_url = ? WHERE id = ?');

// Group grammar by lesson
const byLesson = {};
for (const g of grammar) {
  if (!byLesson[g.lesson_id]) byLesson[g.lesson_id] = [];
  byLesson[g.lesson_id].push(g);
}

// Group videos by book+lesson
const videosByLesson = {};
for (const v of parsedVideos) {
  if (v.book === 0) continue;
  const lid = `book${v.book}-lesson${String(v.lesson).padStart(2, '0')}`;
  if (!videosByLesson[lid]) videosByLesson[lid] = [];
  videosByLesson[lid].push(v);
}

// Sort videos by order within each lesson
for (const lid in videosByLesson) {
  videosByLesson[lid].sort((a, b) => a.order - b.order);
}

// Match: for each lesson, assign videos by order
for (const lid in byLesson) {
  const grammarItems = byLesson[lid];
  const lessonVideos = videosByLesson[lid] || [];

  if (lessonVideos.length === 0) continue;

  // If counts match, assign 1:1 by order
  if (grammarItems.length === lessonVideos.length) {
    for (let i = 0; i < grammarItems.length; i++) {
      const url = `https://www.youtube.com/watch?v=${lessonVideos[i].id}`;
      update.run(url, grammarItems[i].id);
      matched++;
    }
    continue;
  }

  // Otherwise, try fuzzy title match
  for (const g of grammarItems) {
    const gClean = g.title.replace(/[「」『』\s　／/（）()！!？?～〜・、。:：⏱⏳✨🎯🧭💡🌟💬💼📱⚠️⭐️""]/g, '').toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    for (const v of lessonVideos) {
      const vClean = (v.cleanTitle || '').replace(/[「」『』\s　／/（）()！!？?～〜・、。:：""]/g, '').toLowerCase();

      // Check containment
      if (vClean.includes(gClean) || gClean.includes(vClean)) {
        const score = Math.min(gClean.length, vClean.length);
        if (score > bestScore) { bestScore = score; bestMatch = v; }
        continue;
      }

      // Keyword overlap
      const gWords = gClean.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\w]{2,}/g) || [];
      let overlap = 0;
      for (const w of gWords) {
        if (vClean.includes(w)) overlap += w.length;
      }
      if (overlap > bestScore && overlap > 3) { bestScore = overlap; bestMatch = v; }
    }

    if (bestMatch) {
      const url = `https://www.youtube.com/watch?v=${bestMatch.id}`;
      update.run(url, g.id);
      matched++;
    }
  }
}

// Report
const total = grammar.length;
const withVideo = db.prepare('SELECT COUNT(*) as c FROM grammar_points WHERE video_url IS NOT NULL').get().c;
const without = db.prepare('SELECT id, lesson_id, title FROM grammar_points WHERE video_url IS NULL').all();

console.log(`Matched: ${withVideo} / ${total}`);
console.log(`Unmatched: ${without.length}`);
if (without.length > 0) {
  without.forEach(u => console.log(`  ${u.lesson_id}: ${u.title.substring(0, 50)}`));
}

db.close();
