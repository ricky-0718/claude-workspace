const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const claude = require('../services/claude');

// テキスト会話を送信
router.post('/send', async (req, res) => {
  try {
    const { student_id, message, lesson_topic } = req.body;
    if (!student_id || !message) {
      return res.status(400).json({ error: 'student_id and message are required' });
    }

    const db = getDb();

    // 生徒の情報を取得
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(student_id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // 直近の会話履歴を取得（最新20件）
    const history = db.prepare(
      'SELECT role, content FROM chat_logs WHERE student_id = ? ORDER BY id DESC LIMIT 20'
    ).all(student_id).reverse();

    // Claude用のメッセージ配列を構築
    const messages = history.map(h => ({ role: h.role, content: h.content }));
    messages.push({ role: 'user', content: message });

    // Claude Haiku 4.5 に送信
    const result = await claude.chat(messages, student.level, lesson_topic || '自由會話');

    // ユーザーメッセージをDB保存
    db.prepare(
      'INSERT INTO chat_logs (student_id, role, content) VALUES (?, ?, ?)'
    ).run(student_id, 'user', message);

    // アシスタントの返答をDB保存
    db.prepare(
      'INSERT INTO chat_logs (student_id, role, content, corrections) VALUES (?, ?, ?, ?)'
    ).run(student_id, 'assistant', result.reply, JSON.stringify(result.corrections || []));

    res.json(result);
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 会話履歴を取得
router.get('/history/:student_id', (req, res) => {
  const db = getDb();
  const logs = db.prepare(
    'SELECT * FROM chat_logs WHERE student_id = ? ORDER BY id DESC LIMIT 50'
  ).all(req.params.student_id).reverse();

  res.json(logs);
});

module.exports = router;
