const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../db');
const { assessPronunciation, mockAssessment } = require('../services/speechsuper');

// 音声ファイルの保存先
const audioDir = path.join(__dirname, '../../data/audio');
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// 発音判定
router.post('/assess', upload.single('audio'), async (req, res) => {
  try {
    const student_id = req.student.id;
    const { lesson_id, target_text, target_pinyin } = req.body;
    if (!target_text) {
      return res.status(400).json({ error: 'target_text is required' });
    }

    let result;
    const useMock = !process.env.SPEECHSUPER_APP_KEY;

    if (useMock) {
      // SpeechSuper APIキーがない場合はモックデータ
      result = mockAssessment(target_text);
    } else {
      // 実際のAPI呼び出し
      const audioBuffer = req.file.buffer;
      const apiResult = await assessPronunciation(audioBuffer, target_text);

      result = {
        overall: apiResult.overall || 0,
        pronunciation: apiResult.pronunciation || 0,
        fluency: apiResult.fluency || 0,
        tone: apiResult.tone || 0,
        words: apiResult.words || [],
      };
    }

    // 音声ファイルを保存（あれ��）
    let audioPath = null;
    if (req.file) {
      const filename = `${student_id}_${Date.now()}.wav`;
      audioPath = path.join(audioDir, filename);
      fs.writeFileSync(audioPath, req.file.buffer);
      audioPath = filename;
    }

    // DB保存
    const db = getDb();
    db.prepare(`
      INSERT INTO drill_logs
        (student_id, lesson_id, target_text, target_pinyin,
         overall_score, pronunciation_score, tone_score, initial_score, final_score,
         fluency_score, audio_path, feedback_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      student_id,
      lesson_id || 'free',
      target_text,
      target_pinyin || '',
      result.overall,
      result.pronunciation,
      result.tone,
      result.words?.[0]?.initial_score || null,
      result.words?.[0]?.final_score || null,
      result.fluency,
      audioPath,
      JSON.stringify(result)
    );

    // Update student progress if lesson_id is a real curriculum lesson
    if (lesson_id && lesson_id.startsWith('book')) {
      const lesson = db.prepare('SELECT vocab_count FROM lessons WHERE id = ?').get(lesson_id);
      if (lesson) {
        db.prepare(`
          INSERT INTO student_progress (student_id, lesson_id, vocab_total, vocab_mastered, last_drill_at)
          VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(student_id, lesson_id) DO UPDATE SET
            vocab_mastered = CASE WHEN ? >= 80
              THEN MIN(vocab_mastered + 1, vocab_total)
              ELSE vocab_mastered END,
            last_drill_at = CURRENT_TIMESTAMP
        `).run(student_id, lesson_id, lesson.vocab_count, result.tone >= 80 ? 1 : 0, result.tone);
      }
    }

    res.json({ ...result, mock: useMock });
  } catch (err) {
    console.error('Speech assessment error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ドリル履歴取得
router.get('/history/:student_id', (req, res) => {
  const db = getDb();
  const logs = db.prepare(
    'SELECT * FROM drill_logs WHERE student_id = ? ORDER BY id DESC LIMIT 50'
  ).all(req.params.student_id);

  res.json(logs);
});

module.exports = router;
