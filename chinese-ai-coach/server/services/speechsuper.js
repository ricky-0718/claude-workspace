const crypto = require('crypto');
const FormData = require('form-data');

const APP_KEY = process.env.SPEECHSUPER_APP_KEY;
const SECRET_KEY = process.env.SPEECHSUPER_SECRET_KEY;
const BASE_HOST = 'api.speechsuper.com';
const USER_ID = 'coach_user';

function encrypt(content) {
  return crypto.createHash('sha1').update(content).digest('hex');
}

function createUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 3 | 8);
    return v.toString(16);
  }).toUpperCase();
}

async function assessPronunciation(audioBuffer, refText, options = {}) {
  // word.eval = 1文字のみ、2文字以上は sent.eval
  const coreType = refText.length === 1
    ? 'word.eval.promax.cn'
    : 'sent.eval.promax.cn';

  const timestamp = Date.now().toString();
  const connectSig = encrypt(APP_KEY + timestamp + SECRET_KEY);
  const startSig = encrypt(APP_KEY + timestamp + USER_ID + SECRET_KEY);

  const params = {
    connect: {
      cmd: 'connect',
      param: {
        sdk: { version: 16777472, source: 9, protocol: 2 },
        app: {
          applicationId: APP_KEY,
          sig: connectSig,
          timestamp,
        },
      },
    },
    start: {
      cmd: 'start',
      param: {
        app: {
          applicationId: APP_KEY,
          sig: startSig,
          userId: USER_ID,
          timestamp,
        },
        audio: {
          audioType: options.audioType || 'wav',
          sampleRate: options.sampleRate || 16000,
          channel: 1,
          sampleBytes: 2,
        },
        request: {
          coreType,
          refText,
          tokenId: createUUID(),
        },
      },
    },
  };

  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append('text', JSON.stringify(params));
    fd.append('audio', audioBuffer);

    const submitOptions = {
      host: BASE_HOST,
      path: '/' + coreType,
      method: 'POST',
      protocol: 'https:',
      headers: { 'Request-Index': '0' },
    };

    fd.submit(submitOptions, (err, res) => {
      if (err) return reject(new Error(err.message));

      const body = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => {
        const resString = Buffer.concat(body).toString();
        try {
          resolve(JSON.parse(resString));
        } catch {
          reject(new Error('Invalid JSON response: ' + resString.substring(0, 300)));
        }
      });
    });
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
