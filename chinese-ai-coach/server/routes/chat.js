const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const claude = require('../services/claude');

// テキスト会話を送信
router.post('/send', async (req, res) => {
  try {
    const { message, lesson_topic, lesson_id, scenario_context, new_session } = req.body;
    const student_id = req.student.id;
    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }

    const db = getDb();
    const student = req.student;

    // シチュエーション切り替え時は履歴をリセット
    let messages;
    if (new_session) {
      messages = [{ role: 'user', content: message }];
    } else {
      const history = db.prepare(
        'SELECT role, content FROM chat_logs WHERE student_id = ? ORDER BY id DESC LIMIT 20'
      ).all(student_id).reverse();
      messages = history.map(h => ({ role: h.role, content: h.content }));
      messages.push({ role: 'user', content: message });
    }

    // Build lesson context from scenario or lesson
    let lessonContext = lesson_topic || '自由會話';
    if (scenario_context) {
      lessonContext = '【角色扮演場景】\n' + scenario_context +
        '\n\n重要：你要扮演場景中的角色，不是華語老師。用自然的繁體中文對話，保持角色設定。' +
        '學生說錯時，先用角色身份回應，然後在corrections中用日文指出錯誤。';
    } else if (lesson_id) {
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
