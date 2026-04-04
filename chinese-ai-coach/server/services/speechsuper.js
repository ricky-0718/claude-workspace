const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const APP_KEY = process.env.SPEECHSUPER_APP_KEY;
const SECRET_KEY = process.env.SPEECHSUPER_SECRET_KEY;
const BASE_URL = 'https://api.speechsuper.com';

function buildParams(coreType, refText) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const connectStr = APP_KEY + timestamp + SECRET_KEY;
  const connectSig = crypto.createHash('sha1').update(connectStr).digest('hex');

  return {
    connect: {
      cmd: 'start',
      param: {
        baseType: 'sent',
        coreType,
        res: 'en.sent.score', // will be overridden for Chinese
      },
    },
    start: {
      cmd: 'start',
      param: {
        coreType,
        refText,
        attachAudioUrl: 1,
        result: {
          details: {
            gop_adjust: 1,
          },
        },
      },
    },
    appkey: APP_KEY,
    timestamp,
    sig: connectSig,
  };
}

async function assessPronunciation(audioBuffer, refText, options = {}) {
  const coreType = options.coreType || 'cn.sent.score';

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const connectSig = crypto.createHash('sha1')
    .update(APP_KEY + timestamp + SECRET_KEY)
    .digest('hex');

  const params = {
    appkey: APP_KEY,
    timestamp,
    sig: connectSig,
    coreType,
    refText,
    audioType: 'wav',
    audioSampleRate: 16000,
  };

  // Build multipart form data manually
  const boundary = '----FormBoundary' + crypto.randomBytes(8).toString('hex');

  const paramsPart = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="text"',
    'Content-Type: application/json',
    '',
    JSON.stringify(params),
  ].join('\r\n');

  const audioPart = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="audio"; filename="audio.wav"',
    'Content-Type: audio/wav',
    '',
  ].join('\r\n');

  const ending = `\r\n--${boundary}--\r\n`;

  const paramsBuffer = Buffer.from(paramsPart + '\r\n');
  const audioPartBuffer = Buffer.from(audioPart);
  const endingBuffer = Buffer.from(ending);
  const body = Buffer.concat([paramsBuffer, audioPartBuffer, audioBuffer, endingBuffer]);

  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}/${coreType}`);

    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Invalid JSON response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Mock function for development (before API key is available)
function mockAssessment(refText) {
  const words = refText.split('');
  return {
    overall: Math.floor(70 + Math.random() * 25),
    pronunciation: Math.floor(70 + Math.random() * 25),
    fluency: Math.floor(70 + Math.random() * 25),
    tone: Math.floor(60 + Math.random() * 30),
    words: words.map(w => ({
      word: w,
      tone_score: Math.floor(60 + Math.random() * 35),
      initial_score: Math.floor(70 + Math.random() * 25),
      final_score: Math.floor(70 + Math.random() * 25),
    })),
  };
}

module.exports = { assessPronunciation, mockAssessment };
