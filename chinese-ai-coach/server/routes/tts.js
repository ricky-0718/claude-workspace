const express = require('express');
const router = express.Router();
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// キャッシュディレクトリ
const CACHE_DIR = path.join(__dirname, '../../data/tts-cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// 高品質中国語音声（Xiaoxiao = Microsoft最高品質）
const VOICE = 'zh-CN-XiaoxiaoNeural';

router.get('/', async (req, res) => {
  const text = req.query.text;
  if (!text || text.length > 200) {
    return res.status(400).json({ error: 'text required (max 200 chars)' });
  }

  const hash = crypto.createHash('md5').update(text + VOICE + 'slow').digest('hex');
  const cachePath = path.join(CACHE_DIR, `${hash}.mp3`);

  if (fs.existsSync(cachePath)) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    return fs.createReadStream(cachePath).pipe(res);
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    // SSMLでゆっくり読み上げ（1文字は特にゆっくり）
    const rate = text.length === 1 ? 'slow' : 'medium';
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN"><voice name="${VOICE}"><prosody rate="${rate}">${text}</prosody></voice></speak>`;
    const { audioStream } = tts.rawToStream(ssml);
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
