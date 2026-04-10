const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// レッスン一覧（生徒の進捗付き）
router.get('/lessons', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;

  const book = parseInt(req.query.book) || 1;
  const lessons = db.prepare(`
    SELECT l.*,
           COALESCE(sp.vocab_mastered, 0) as mastered,
           (SELECT COUNT(*) FROM grammar_points WHERE lesson_id = l.id) as grammar_count
    FROM lessons l
    LEFT JOIN student_progress sp ON sp.lesson_id = l.id AND sp.student_id = ?
    WHERE l.book = ?
    ORDER BY l.sort_order
  `).all(studentId, book);

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

// ===== クイズ用: レッスンの単語からランダム4択を生成 =====
router.get('/lessons/:lessonId/quiz', (req, res) => {
  const db = getDb();
  const lessonId = req.params.lessonId;
  const count = Math.min(parseInt(req.query.count) || 10, 30);
  const mode = req.query.mode || 'zh_to_ja'; // zh_to_ja, ja_to_zh, pinyin_to_zh

  const allVocab = db.prepare(
    'SELECT id, hanzi, pinyin, translation_ja FROM vocabulary WHERE lesson_id = ? ORDER BY sort_order'
  ).all(lessonId);

  if (allVocab.length < 4) {
    return res.json({ error: 'Not enough vocabulary for quiz', questions: [] });
  }

  // Shuffle and pick quiz items
  const shuffled = [...allVocab].sort(() => Math.random() - 0.5);
  const quizItems = shuffled.slice(0, Math.min(count, allVocab.length));

  const questions = quizItems.map(item => {
    // Get 3 wrong answers from other vocab
    const wrongPool = allVocab.filter(v => v.id !== item.id);
    const wrongAnswers = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);

    let question, correctAnswer, choices;

    if (mode === 'zh_to_ja') {
      question = { hanzi: item.hanzi, pinyin: item.pinyin };
      correctAnswer = item.translation_ja;
      choices = [item.translation_ja, ...wrongAnswers.map(w => w.translation_ja)];
    } else if (mode === 'ja_to_zh') {
      question = { text: item.translation_ja };
      correctAnswer = item.hanzi;
      choices = [item.hanzi, ...wrongAnswers.map(w => w.hanzi)];
    } else {
      question = { pinyin: item.pinyin };
      correctAnswer = item.hanzi;
      choices = [item.hanzi, ...wrongAnswers.map(w => w.hanzi)];
    }

    // Shuffle choices
    choices = choices.sort(() => Math.random() - 0.5);

    return {
      vocabulary_id: item.id,
      question,
      choices,
      correct_index: choices.indexOf(correctAnswer),
    };
  });

  res.json({ questions, mode });
});

// ===== クイズ結果を保存（vocab_mastery更新 + SRS計算） =====
router.post('/quiz/result', (req, res) => {
  const { results } = req.body; // [{vocabulary_id, correct: bool}]
  const studentId = req.student.id;

  if (!results || !Array.isArray(results)) {
    return res.status(400).json({ error: 'results array required' });
  }

  const db = getDb();
  const upsert = db.prepare(`
    INSERT INTO vocab_mastery (student_id, vocabulary_id, correct_count, incorrect_count, last_reviewed_at, next_review_at, ease_factor, interval_days)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, datetime('now', '+' || ? || ' days'), ?, ?)
    ON CONFLICT(student_id, vocabulary_id) DO UPDATE SET
      correct_count = correct_count + ?,
      incorrect_count = incorrect_count + ?,
      last_reviewed_at = CURRENT_TIMESTAMP,
      next_review_at = datetime('now', '+' || ? || ' days'),
      ease_factor = ?,
      interval_days = ?
  `);

  const logActivity = db.prepare(`
    INSERT INTO activity_log (student_id, activity_type, activity_date, count)
    VALUES (?, 'quiz', date('now'), 1)
    ON CONFLICT(student_id, activity_type, activity_date) DO UPDATE SET
      count = count + 1
  `);

  const transaction = db.transaction(() => {
    for (const r of results) {
      const existing = db.prepare(
        'SELECT * FROM vocab_mastery WHERE student_id = ? AND vocabulary_id = ?'
      ).get(studentId, r.vocabulary_id);

      let easeFactor = existing?.ease_factor || 2.5;
      let interval = existing?.interval_days || 0;

      if (r.correct) {
        // SM-2: increase interval
        if (interval === 0) interval = 1;
        else if (interval === 1) interval = 3;
        else interval = Math.round(interval * easeFactor);
        easeFactor = Math.max(1.3, easeFactor + 0.1);
      } else {
        // Reset on incorrect
        interval = 0;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
      }

      upsert.run(
        studentId, r.vocabulary_id,
        r.correct ? 1 : 0, r.correct ? 0 : 1,
        interval, easeFactor, interval,
        r.correct ? 1 : 0, r.correct ? 0 : 1,
        interval, easeFactor, interval
      );
    }
    logActivity.run(studentId);
  });

  transaction();
  res.json({ ok: true });
});

// ===== 復習キュー（SRS: 期限切れの単語） =====
router.get('/review-queue', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;
  const limit = Math.min(parseInt(req.query.limit) || 20, 50);

  const items = db.prepare(`
    SELECT vm.*, v.hanzi, v.pinyin, v.translation_ja, v.lesson_id
    FROM vocab_mastery vm
    JOIN vocabulary v ON v.id = vm.vocabulary_id
    WHERE vm.student_id = ?
      AND (vm.next_review_at <= datetime('now') OR vm.interval_days = 0)
    ORDER BY vm.next_review_at ASC
    LIMIT ?
  `).all(studentId, limit);

  res.json({ items, count: items.length });
});

// ===== 学習統計（ストリーク・進捗） =====
router.get('/stats', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;

  // Total mastered / total vocab
  const totals = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM vocab_mastery WHERE student_id = ? AND correct_count > incorrect_count) as mastered,
      (SELECT COUNT(*) FROM vocabulary) as total_vocab,
      (SELECT COUNT(*) FROM vocab_mastery WHERE student_id = ? AND next_review_at <= datetime('now') AND interval_days = 0) as needs_review
  `).get(studentId, studentId);

  // Today's activity
  const today = db.prepare(`
    SELECT COALESCE(SUM(count), 0) as today_count
    FROM activity_log
    WHERE student_id = ? AND activity_date = date('now')
  `).get(studentId);

  // Streak: consecutive days with activity
  const recentDays = db.prepare(`
    SELECT DISTINCT activity_date
    FROM activity_log
    WHERE student_id = ?
    ORDER BY activity_date DESC
    LIMIT 60
  `).all(studentId);

  let streak = 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const dates = recentDays.map(d => d.activity_date);

  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    if (dates.includes(dateStr)) {
      streak++;
    } else if (i === 0) {
      // Today hasn't been logged yet, that's ok
      continue;
    } else {
      break;
    }
  }

  // Per-lesson progress
  const lessonProgress = db.prepare(`
    SELECT l.id, l.lesson_number, l.title_zh, l.vocab_count,
           COALESCE(sp.vocab_mastered, 0) as mastered
    FROM lessons l
    LEFT JOIN student_progress sp ON sp.lesson_id = l.id AND sp.student_id = ?
    WHERE l.book = 1
    ORDER BY l.sort_order
  `).all(studentId);

  // 使用状況を追加
  const todayUsage = db.prepare(
    "SELECT chat_count, speech_count FROM daily_usage WHERE student_id = ? AND usage_date = date('now')"
  ).get(studentId) || { chat_count: 0, speech_count: 0 };

  const plan = req.student.plan || 'free';

  res.json({
    mastered: totals.mastered,
    total_vocab: totals.total_vocab,
    needs_review: totals.needs_review,
    today_count: today.today_count,
    streak,
    lesson_progress: lessonProgress,
    plan,
    today_usage: todayUsage,
    limits: { chat: 10, speech: 5 },
  });
});

// ===== レッスン別の最新ドリルスコア =====
router.get('/lessons/:lessonId/drill-scores', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;
  const lessonId = req.params.lessonId;

  // 各単語の最新スコアを取得
  const scores = db.prepare(`
    SELECT target_text, tone_score, overall_score,
           MAX(created_at) as last_at
    FROM drill_logs
    WHERE student_id = ? AND lesson_id = ?
    GROUP BY target_text
  `).all(studentId, lessonId);

  const result = {};
  scores.forEach(s => {
    result[s.target_text] = {
      tone: s.tone_score,
      overall: s.overall_score,
    };
  });
  res.json(result);
});

// ===== 週間アクティビティ（過去7日） =====
router.get('/weekly-activity', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;

  // 過去7日分の日別アクティビティ
  const rows = db.prepare(`
    SELECT activity_date, SUM(count) as total
    FROM activity_log
    WHERE student_id = ? AND activity_date >= date('now', '-6 days')
    GROUP BY activity_date
    ORDER BY activity_date
  `).all(studentId);

  // 7日分の配列を作成（データがない日は0）
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const row = rows.find(r => r.activity_date === dateStr);
    days.push({
      date: dateStr,
      day: dayNames[d.getDay()],
      count: row ? row.total : 0,
    });
  }

  res.json(days);
});

module.exports = router;
