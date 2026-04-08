const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// レッスン一覧（生徒の進捗付き）
router.get('/lessons', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;

  const lessons = db.prepare(`
    SELECT l.*,
           COALESCE(sp.vocab_mastered, 0) as mastered,
           (SELECT COUNT(*) FROM grammar_points WHERE lesson_id = l.id) as grammar_count
    FROM lessons l
    LEFT JOIN student_progress sp ON sp.lesson_id = l.id AND sp.student_id = ?
    ORDER BY l.sort_order
  `).all(studentId);

  res.json(lessons);
});

// 特定レッスンの単語リスト
router.get('/lessons/:lessonId/vocabulary', (req, res) => {
  const db = getDb();
  const vocab = db.prepare(
    'SELECT * FROM vocabulary WHERE lesson_id = ? ORDER BY sort_order'
  ).all(req.params.lessonId);

  // Parse examples_json
  const result = vocab.map(v => ({
    ...v,
    examples: v.examples_json ? JSON.parse(v.examples_json) : [],
  }));
  delete result.examples_json;

  res.json(result);
});

// 特定レッスンの文法ポイント
router.get('/lessons/:lessonId/grammar', (req, res) => {
  const db = getDb();
  const points = db.prepare(
    'SELECT * FROM grammar_points WHERE lesson_id = ? ORDER BY sort_order'
  ).all(req.params.lessonId);

  res.json(points);
});

// 進捗更新（ドリル完了時に呼ばれる）
router.post('/progress', (req, res) => {
  const { lesson_id, score } = req.body;
  const studentId = req.student.id;
  if (!lesson_id) return res.status(400).json({ error: 'lesson_id required' });

  const db = getDb();
  const lesson = db.prepare('SELECT vocab_count FROM lessons WHERE id = ?').get(lesson_id);
  if (!lesson) return res.status(404).json({ error: 'lesson not found' });

  // Upsert progress
  db.prepare(`
    INSERT INTO student_progress (student_id, lesson_id, vocab_total, vocab_mastered, last_drill_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(student_id, lesson_id) DO UPDATE SET
      vocab_mastered = CASE WHEN ? >= 80
        THEN MIN(vocab_mastered + 1, vocab_total)
        ELSE vocab_mastered END,
      last_drill_at = CURRENT_TIMESTAMP
  `).run(studentId, lesson_id, lesson.vocab_count, score >= 80 ? 1 : 0, score);

  // Update student's current lesson
  db.prepare('UPDATE students SET current_lesson_id = ? WHERE id = ?')
    .run(lesson_id, studentId);

  res.json({ ok: true });
});

module.exports = router;
