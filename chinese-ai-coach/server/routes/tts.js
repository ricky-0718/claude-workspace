const express = require('express');
const router = express.Router();
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// キャッシュディレクトリ
const CACHE_DIR = path.join(__dirname, '../../data/tts-cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// 台湾中国語の高品質音声
const VOICE = 'zh-TW-HsiaoChenNeural';

router.get('/', async (req, res) => {
  const text = req.query.text;
  const pinyin = req.query.pinyin || '';
  if (!text || text.length > 200) {
    return res.status(400).json({ error: 'text required (max 200 chars)' });
  }

  // ピンイン付きの場合、TTSテキストに声調ガイドを追加（単一文字/短い語の場合）
  let ttsText = text;
  if (pinyin && text.length <= 4) {
    ttsText = `${text}，${pinyin}`;
  }

  // キャッシュチェック（ピンイン含めてハッシュ）
  const hash = crypto.createHash('md5').update(ttsText).digest('hex');
  const cachePath = path.join(CACHE_DIR, `${hash}.mp3`);

  if (fs.existsSync(cachePath)) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    return fs.createReadStream(cachePath).pipe(res);
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    const { audioStream } = tts.toStream(text);
    const chunks = [];

    audioStream.on('data', (chunk) => chunks.push(chunk));
    audioStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      // キャッシュに保存
      fs.writeFileSync(cachePath, buffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800');
      res.send(buffer);
    });
    audioStream.on('error', (err) => {
      console.error('TTS error:', err);
      res.status(500).json({ error: 'TTS generation failed' });
    });
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
