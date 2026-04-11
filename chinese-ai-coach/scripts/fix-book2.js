const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.argv[2] || path.join(__dirname, '..', 'data', 'coach.db');
const db = new Database(DB_PATH);
const videos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '.playwright-mcp', 'playlist-videos.json'), 'utf8'));

// 1. Create all book2 lessons
// NOTE: title_zh は空文字にしておく。UIは「文法講座」グループ下に「第N課」として表示する。
// 「2冊目第N課」と入れると UI が「文法講座 > 第N課 2冊目第N課」のように重複してしまう
for (let i = 1; i <= 16; i++) {
  const lid = `book2-lesson${String(i).padStart(2, '0')}`;
  db.prepare('INSERT OR IGNORE INTO lessons (id,book,lesson_number,title_zh,sort_order,vocab_count) VALUES (?,2,?,?,?,0)')
    .run(lid, i, '', 100 + i);
}

// 2. Video → book2 lesson map
const videoLessonMap = {};
for (const v of videos) {
  const m = v.title.match(/^2L(\d+)/);
  if (m) videoLessonMap[v.id] = `book2-lesson${String(parseInt(m[1])).padStart(2, '0')}`;
}

// 3. Move by video URL
let moved = 0;
const withVideo = db.prepare('SELECT id, lesson_id, video_url, title FROM grammar_points WHERE video_url IS NOT NULL').all();
for (const g of withVideo) {
  const vidId = (g.video_url || '').split('v=')[1];
  const correct = videoLessonMap[vidId];
  if (correct && g.lesson_id !== correct) {
    db.prepare('UPDATE grammar_points SET lesson_id = ? WHERE id = ?').run(correct, g.id);
    moved++;
  }
}
console.log('Moved by video:', moved);

// 4. Move by title pattern
const book2Rules = [
  ['把構文', 'book2-lesson02'], ['(有)多＋形容詞', 'book2-lesson02'], ['没V', 'book2-lesson02'],
  ['疑問詞＋都', 'book2-lesson02'], ['"又"の使い方', 'book2-lesson02'], ['才＋V', 'book2-lesson02'], ['才で条件', 'book2-lesson02'],
  ['方向補語', 'book2-lesson03'], ['2音節動詞', 'book2-lesson03'], ['〜起來完全', 'book2-lesson03'],
  ['替の使い方', 'book2-lesson03'], ['除了⋯⋯，還', 'book2-lesson03'], ['把＋得', 'book2-lesson03'],
  ['V到徹底', 'book2-lesson04'], ['懂の使い方', 'book2-lesson04'], ['得不得了', 'book2-lesson04'],
  ['越來越', 'book2-lesson04'], ['V得起', 'book2-lesson04'], ['V飽', 'book2-lesson04'], ['對～有興趣', 'book2-lesson04'],
  ['被構文', 'book2-lesson05'], ['V著V著', 'book2-lesson05'], ['只要...就', 'book2-lesson05'],
  ['有時候…有時候', 'book2-lesson05'], ['始まりを伝える', 'book2-lesson05'], ['還好～', 'book2-lesson05'],
  ['毎週1回', 'book2-lesson05'], ['A像B一樣', 'book2-lesson05'],
  ['V好パターン', 'book2-lesson06'], ['言い間違えた', 'book2-lesson06'], ['できるようになった', 'book2-lesson06'],
  ['何でもOK', 'book2-lesson06'], ['きっと〜するよ', 'book2-lesson06'], ['等……就', 'book2-lesson06'],
  ['たった〇〇しか', 'book2-lesson06'], ['A讓B', 'book2-lesson06'],
  ['不但…還', 'book2-lesson07'], ['ひとつも〜ない', 'book2-lesson07'], ['させてあげる', 'book2-lesson07'],
  ['是＋形容詞', 'book2-lesson07'], ['V光了', 'book2-lesson07'], ['一點兒都不', 'book2-lesson07'],
  ['剛...就', 'book2-lesson07'], ['趁(著)', 'book2-lesson07'], ['趁著', 'book2-lesson07'],
  ['滿の使い方', 'book2-lesson08'], ['連～都', 'book2-lesson08'], ['像〜這樣', 'book2-lesson08'],
  ['只好', 'book2-lesson08'], ['為了', 'book2-lesson08'], ['接触', 'book2-lesson08'], ['的關係', 'book2-lesson08'],
  ['反問句', 'book2-lesson09'], ['快一點兒', 'book2-lesson09'], ['場所・時間・数量', 'book2-lesson09'],
  ['あまり〜ない', 'book2-lesson09'], ['怎麼這麼', 'book2-lesson09'], ['得/不下', 'book2-lesson09'], ['乾乾淨淨', 'book2-lesson09'],
  ['不但…而且', 'book2-lesson10'], ['Vs死了', 'book2-lesson10'], ['越…越…', 'book2-lesson10'],
  ['到底', 'book2-lesson10'], ['對NP來說', 'book2-lesson10'], ['的話', 'book2-lesson10'], ['對…有幫助', 'book2-lesson10'],
  ['存在文', 'book2-lesson11'], ['不感興趣', 'book2-lesson11'], ['V 出來', 'book2-lesson11'],
  ['嘛', 'book2-lesson11'], ['同 + 一', 'book2-lesson11'], ['從…中', 'book2-lesson11'],
  ['除了……，……都', 'book2-lesson12'], ['不像', 'book2-lesson12'], ['從…起', 'book2-lesson12'],
  ['向 +', 'book2-lesson12'], ['難怪', 'book2-lesson12'], ['得了/ V不了', 'book2-lesson12'], ['V 個', 'book2-lesson12'], ['N/NP + 來', 'book2-lesson12'],
  ['不管', 'book2-lesson13'], ['不如', 'book2-lesson13'], ['了 (一)點兒', 'book2-lesson13'],
  ['比、比較', 'book2-lesson13'], ['差(一)點', 'book2-lesson13'], ['白 + V', 'book2-lesson13'],
  ['想起來', 'book2-lesson14'], ['從來', 'book2-lesson14'], ['當……，就', 'book2-lesson14'],
  ['讓の使い方', 'book2-lesson14'], ['無所謂', 'book2-lesson14'], ['V走', 'book2-lesson14'], ['要不是', 'book2-lesson14'],
  ['可+(Neg)', 'book2-lesson15'], ['V(了) + 一', 'book2-lesson15'], ['下來マジック', 'book2-lesson15'],
  ['言ったらすぐ', 'book2-lesson15'], ['誰知道', 'book2-lesson15'],
  ['得很', 'book2-lesson16'], ['得看', 'book2-lesson16'], ['像……什麼的', 'book2-lesson16'],
  ['V來V去', 'book2-lesson16'], ['比得/不上', 'book2-lesson16'], ['只有......才', 'book2-lesson16'],
];

let moved2 = 0;
const remaining = db.prepare("SELECT id, lesson_id, title FROM grammar_points WHERE lesson_id LIKE 'book1%'").all();
for (const g of remaining) {
  for (const [pattern, lesson] of book2Rules) {
    if (g.title.includes(pattern)) {
      db.prepare('UPDATE grammar_points SET lesson_id = ? WHERE id = ?').run(lesson, g.id);
      moved2++;
      break;
    }
  }
}
console.log('Moved by title:', moved2);

// 5. Reorder sort_order within each lesson
const allLessons = db.prepare('SELECT DISTINCT lesson_id FROM grammar_points').all();
for (const l of allLessons) {
  const items = db.prepare('SELECT id FROM grammar_points WHERE lesson_id = ? ORDER BY sort_order').all(l.lesson_id);
  items.forEach((item, idx) => {
    db.prepare('UPDATE grammar_points SET sort_order = ? WHERE id = ?').run(idx + 1, item.id);
  });
}

// 6. Report
console.log('\n=== Book 1 ===');
for (let i = 1; i <= 16; i++) {
  const lid = `book1-lesson${String(i).padStart(2, '0')}`;
  const c = db.prepare('SELECT COUNT(*) as c FROM grammar_points WHERE lesson_id = ?').get(lid).c;
  console.log(`  ${lid}: ${c}`);
}
console.log('\n=== Book 2 ===');
for (let i = 1; i <= 16; i++) {
  const lid = `book2-lesson${String(i).padStart(2, '0')}`;
  const c = db.prepare('SELECT COUNT(*) as c FROM grammar_points WHERE lesson_id = ?').get(lid).c;
  if (c > 0) console.log(`  ${lid}: ${c}`);
}

db.close();
