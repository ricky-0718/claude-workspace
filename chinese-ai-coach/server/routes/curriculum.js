const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// レベル定義
const LEVELS = [
  { level: 1, name: '入門者', min: 0 },
  { level: 2, name: '旅行者', min: 50 },
  { level: 3, name: '留学生', min: 150 },
  { level: 4, name: '台湾通', min: 300 },
  { level: 5, name: 'マスター', min: 500 },
];

function getLevel(mastered) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (mastered >= LEVELS[i].min) return LEVELS[i];
  }
  return LEVELS[0];
}

// 実績定義
const ACHIEVEMENT_DEFS = [
  { key: 'first_drill', label: '初めての発音', icon: '🎤', check: (s) => s.total_drills >= 1 },
  { key: 'mastered_10', label: '10語マスター', icon: '📚', check: (s) => s.mastered >= 10 },
  { key: 'mastered_50', label: '50語マスター', icon: '🎓', check: (s) => s.mastered >= 50 },
  { key: 'mastered_100', label: '100語マスター', icon: '💯', check: (s) => s.mastered >= 100 },
  { key: 'mastered_300', label: '300語マスター', icon: '🏆', check: (s) => s.mastered >= 300 },
  { key: 'streak_3', label: '3日連続', icon: '🔥', check: (s) => s.streak >= 3 },
  { key: 'streak_7', label: '7日連続', icon: '⚡', check: (s) => s.streak >= 7 },
  { key: 'streak_30', label: '30日連続', icon: '👑', check: (s) => s.streak >= 30 },
  { key: 'score_80', label: '発音80点突破', icon: '🎯', check: (s) => s.best_score >= 80 },
  { key: 'score_95', label: '発音95点突破', icon: '✨', check: (s) => s.best_score >= 95 },
  { key: 'quiz_perfect', label: 'クイズ全問正解', icon: '💎', check: (s) => s.perfect_quizzes >= 1 },
  { key: 'level_2', label: '旅行者レベル到達', icon: '✈️', check: (s) => s.mastered >= 50 },
  { key: 'level_3', label: '留学生レベル到達', icon: '🎒', check: (s) => s.mastered >= 150 },
  { key: 'level_4', label: '台湾通レベル到達', icon: '🇹🇼', check: (s) => s.mastered >= 300 },
];

function checkAchievements(studentId, db) {
  const stats = {};

  // 習得数
  const m = db.prepare("SELECT COUNT(*) as c FROM vocab_mastery WHERE student_id = ? AND correct_count >= 3").get(studentId);
  stats.mastered = m?.c || 0;

  // ドリル回数
  const d = db.prepare("SELECT COUNT(*) as c FROM drill_logs WHERE student_id = ?").get(studentId);
  stats.total_drills = d?.c || 0;

  // ストリーク
  const dates = db.prepare(
    "SELECT DISTINCT activity_date FROM activity_log WHERE student_id = ? ORDER BY activity_date DESC"
  ).all(studentId).map(r => r.activity_date);
  let streak = 0;
  if (dates.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (dates[0] === today || dates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < dates.length; i++) {
        const prev = new Date(dates[i - 1]);
        const curr = new Date(dates[i]);
        const diff = (prev - curr) / 86400000;
        if (diff === 1) streak++;
        else break;
      }
    }
  }
  stats.streak = streak;

  // 最高スコア
  const bs = db.prepare("SELECT MAX(overall_score) as best FROM drill_logs WHERE student_id = ?").get(studentId);
  stats.best_score = bs?.best || 0;

  // 完璧クイズ回数（Phase 2で実装拡張予定）
  stats.perfect_quizzes = 0;

  const newAchievements = [];
  const existing = db.prepare("SELECT achievement_key FROM achievements WHERE student_id = ?").all(studentId).map(r => r.achievement_key);

  for (const def of ACHIEVEMENT_DEFS) {
    if (existing.includes(def.key)) continue;
    if (def.check(stats)) {
      db.prepare("INSERT OR IGNORE INTO achievements (student_id, achievement_key) VALUES (?, ?)").run(studentId, def.key);
      newAchievements.push({ key: def.key, label: def.label, icon: def.icon });
    }
  }

  return newAchievements;
}

// レッスン一覧（生徒の進捗付き）
// ?book=N でフィルター。未指定時は全レッスン（教科書・旅行パック含む）を返す
router.get('/lessons', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;

  let lessons;
  if (req.query.book !== undefined) {
    const book = parseInt(req.query.book);
    lessons = db.prepare(`
      SELECT l.*,
             COALESCE(sp.vocab_mastered, 0) as mastered,
             (SELECT COUNT(*) FROM grammar_points WHERE lesson_id = l.id) as grammar_count
      FROM lessons l
      LEFT JOIN student_progress sp ON sp.lesson_id = l.id AND sp.student_id = ?
      WHERE l.book = ?
      ORDER BY l.sort_order
    `).all(studentId, book);
  } else {
    lessons = db.prepare(`
      SELECT l.*,
             COALESCE(sp.vocab_mastered, 0) as mastered,
             (SELECT COUNT(*) FROM grammar_points WHERE lesson_id = l.id) as grammar_count
      FROM lessons l
      LEFT JOIN student_progress sp ON sp.lesson_id = l.id AND sp.student_id = ?
      ORDER BY l.sort_order
    `).all(studentId);
  }

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

  const newAchievements = checkAchievements(studentId, db);
  res.json({ ok: true, new_achievements: newAchievements });
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
  const newAchievements = checkAchievements(studentId, db);
  res.json({ ok: true, new_achievements: newAchievements });
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
    level: getLevel(totals.mastered),
    next_level: LEVELS.find(l => l.min > (totals.mastered || 0)) || null,
    achievements: db.prepare("SELECT achievement_key, achieved_at FROM achievements WHERE student_id = ?").all(studentId),
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

// ===== 実績一覧 =====
router.get('/achievements', (req, res) => {
  const db = getDb();
  const studentId = req.student.id;
  const earned = db.prepare("SELECT achievement_key, achieved_at FROM achievements WHERE student_id = ?").all(studentId);
  const all = ACHIEVEMENT_DEFS.map(d => ({
    ...d,
    earned: earned.find(e => e.achievement_key === d.key)?.achieved_at || null,
  }));
  res.json(all);
});

module.exports = router;
