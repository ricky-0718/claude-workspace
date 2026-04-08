const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const claude = require('../services/claude');

// テキスト会話を送信
router.post('/send', async (req, res) => {
  try {
    const { message, lesson_topic, lesson_id } = req.body;
    const student_id = req.student.id;
    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }

    const db = getDb();
    const student = req.student;

    // 直近の会話履歴を取得（最新20件）
    const history = db.prepare(
      'SELECT role, content FROM chat_logs WHERE student_id = ? ORDER BY id DESC LIMIT 20'
    ).all(student_id).reverse();

    // Claude用のメッセージ配列を構築
    const messages = history.map(h => ({ role: h.role, content: h.content }));
    messages.push({ role: 'user', content: message });

    // Build lesson context if lesson_id provided
    let lessonContext = lesson_topic || '自由會話';
    if (lesson_id) {
      const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lesson_id);
      const grammar = db.prepare(
        'SELECT title, explanation FROM grammar_points WHERE lesson_id = ? ORDER BY sort_order LIMIT 5'
      ).all(lesson_id);

      if (lesson) {
        lessonContext = `第${lesson.lesson_number}課「${lesson.title_zh}」`;
        if (grammar.length > 0) {
          lessonContext += '\n本課的文法重點:\n' +
            grammar.map((g, i) => `${i + 1}. ${g.title}`).join('\n');
        }
      }
    }

    // Claude Haiku 4.5 に送信
    const result = await claude.chat(messages, student.level, lessonContext);

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
