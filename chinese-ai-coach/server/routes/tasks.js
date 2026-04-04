const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// 生徒の課題一覧
router.get('/:student_id', (req, res) => {
  const db = getDb();
  const tasks = db.prepare(
    'SELECT * FROM tasks WHERE student_id = ? ORDER BY due_date ASC, id ASC'
  ).all(req.params.student_id);

  res.json(tasks);
});

// 課題を完了にする
router.post('/:task_id/complete', (req, res) => {
  const db = getDb();
  db.prepare(
    "UPDATE tasks SET status = 'completed', completed_at = datetime('now') WHERE id = ?"
  ).run(req.params.task_id);

  res.json({ success: true });
});

// 課題を作成（講師が手動で追加する場合）
router.post('/', (req, res) => {
  const { student_id, lesson_id, task_type, title, description, due_date } = req.body;
  if (!student_id || !title) {
    return res.status(400).json({ error: 'student_id and title required' });
  }

  const db = getDb();
  const result = db.prepare(`
    INSERT INTO tasks (student_id, lesson_id, task_type, title, description, due_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(student_id, lesson_id || '', task_type || 'drill', title, description || '', due_date || null);

  res.json({ id: result.lastInsertRowid });
});

module.exports = router;
