const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// 全生徒サマリー
router.get('/students', (req, res) => {
  const db = getDb();

  const students = db.prepare('SELECT * FROM students ORDER BY name').all();

  const summary = students.map(s => {
    // 今週のドリル回数と平均スコア
    const drillStats = db.prepare(`
      SELECT COUNT(*) as count, AVG(overall_score) as avg_score, AVG(tone_score) as avg_tone
      FROM drill_logs
      WHERE student_id = ? AND created_at > datetime('now', '-7 days')
    `).get(s.id);

    // 今週のチャット回数
    const chatCount = db.prepare(`
      SELECT COUNT(*) as count
      FROM chat_logs
      WHERE student_id = ? AND role = 'user' AND created_at > datetime('now', '-7 days')
    `).get(s.id);

    // 直近のスコア推移（過去4週）
    const weeklyScores = db.prepare(`
      SELECT
        strftime('%W', created_at) as week,
        AVG(tone_score) as avg_tone
      FROM drill_logs
      WHERE student_id = ? AND created_at > datetime('now', '-28 days')
      GROUP BY week
      ORDER BY week
    `).all(s.id);

    return {
      ...s,
      weekly_drills: drillStats.count,
      avg_score: Math.round(drillStats.avg_score || 0),
      avg_tone: Math.round(drillStats.avg_tone || 0),
      weekly_chats: chatCount.count,
      tone_trend: weeklyScores,
    };
  });

  res.json(summary);
});

// 個別生徒の詳細
router.get('/students/:id', (req, res) => {
  const db = getDb();
  const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id);
  if (!student) return res.status(404).json({ error: 'Not found' });

  const recentDrills = db.prepare(
    'SELECT * FROM drill_logs WHERE student_id = ? ORDER BY id DESC LIMIT 20'
  ).all(req.params.id);

  const recentChats = db.prepare(
    'SELECT * FROM chat_logs WHERE student_id = ? ORDER BY id DESC LIMIT 30'
  ).all(req.params.id).reverse();

  const reviews = db.prepare(
    'SELECT * FROM coach_reviews WHERE student_id = ? ORDER BY review_date DESC LIMIT 5'
  ).all(req.params.id);

  // 弱点分析（声調スコアが低いパターン）
  const weakTones = db.prepare(`
    SELECT target_text, target_pinyin, tone_score, created_at
    FROM drill_logs
    WHERE student_id = ? AND tone_score < 70
    ORDER BY created_at DESC LIMIT 10
  `).all(req.params.id);

  res.json({
    student,
    recentDrills,
    recentChats,
    reviews,
    weakTones,
  });
});

// 講師レビューを保存
router.post('/review', (req, res) => {
  const { student_id, coach_name, notes, weak_points, next_focus } = req.body;
  if (!student_id || !coach_name) {
    return res.status(400).json({ error: 'student_id and coach_name required' });
  }

  const db = getDb();
  db.prepare(`
    INSERT INTO coach_reviews (student_id, coach_name, review_date, notes, weak_points, next_focus)
    VALUES (?, ?, date('now'), ?, ?, ?)
  `).run(student_id, coach_name, notes || '', JSON.stringify(weak_points || []), next_focus || '');

  res.json({ success: true });
});

// 課題を作成（講師用）
router.post('/tasks', (req, res) => {
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
