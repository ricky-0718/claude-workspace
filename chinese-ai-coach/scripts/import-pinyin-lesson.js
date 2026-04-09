/**
 * 第0課「ピンインマスター」データ投入スクリプト
 *
 * ピンインの発音ルール + 練習用の基本単語をDBに投入する。
 * 既存のlessons/vocabulary/grammar_pointsテーブルに乗せる。
 *
 * Usage:
 *   node scripts/import-pinyin-lesson.js
 */

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'coach.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'server', 'db', 'schema.sql');

const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Apply schema if tables don't exist
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

// ========== 第0課 レッスン定義 ==========
const LESSON_ID = 'book1-lesson00';

// レッスン挿入（sort_order=0で最初に表示）
db.prepare(`
  INSERT OR REPLACE INTO lessons (id, book, lesson_number, title_zh, title_ja, vocab_count, sort_order)
  VALUES (?, 1, 0, '拼音大師', 'ピンインマスター', 0, 0)
`).run(LESSON_ID);

// ========== ピンイン発音ルール（grammar_pointsテーブルに格納） ==========
// 「この時はこう読む」のシンプルなルール形式

const pinyinRules = [
  {
    title: '声調（四声）',
    explanation: JSON.stringify({
      type: 'tones',
      description: '中国語の音の上げ下げ。同じ音でも声調が違えば意味が変わる',
      rules: [
        { label: '第1声', symbol: 'ā', how: '高くまっすぐ伸ばす', example: 'mā（お母さん）', pitch: 'high-flat' },
        { label: '第2声', symbol: 'á', how: '下から上に上げる', example: 'má（麻）', pitch: 'rising' },
        { label: '第3声', symbol: 'ǎ', how: '低く抑える', example: 'mǎ（馬）', pitch: 'low' },
        { label: '第4声', symbol: 'à', how: '上から一気に下げる', example: 'mà（叱る）', pitch: 'falling' },
        { label: '軽声', symbol: 'ma', how: '軽く短く添える', example: 'ma（〜ですか？）', pitch: 'neutral' },
      ],
    }),
  },
  {
    title: '見た目と違う発音①：母音が隠れている',
    explanation: JSON.stringify({
      type: 'hidden-vowels',
      description: 'ピンインの表記と実際の発音が違うケース。丸暗記でOK',
      rules: [
        { written: 'ui', actual: 'ウェイ（uei）', wrong: '✕ ウイ', example: 'duì（対）→ ドゥウェイ', practice: ['duì', 'guì', 'huí', 'shuǐ'] },
        { written: 'iu', actual: 'イオウ（iou）', wrong: '✕ イウ', example: 'liú（流）→ リィオウ', practice: ['liú', 'niú', 'jiǔ', 'xiū'] },
        { written: 'un', actual: 'ウェン（uen）', wrong: '✕ ウン', example: 'lùn（論）→ ルゥエン', practice: ['lùn', 'cūn', 'chūn', 'shùn'] },
        { written: 'ian', actual: 'イエン（ien）', wrong: '✕ イアン', example: 'diàn（電）→ ディエン', practice: ['diàn', 'tiān', 'jiàn', 'qián'] },
      ],
    }),
  },
  {
    title: '見た目と違う発音②：üの点々が消える',
    explanation: JSON.stringify({
      type: 'u-umlaut',
      description: 'j, q, x, y の後ろでは ü が u と書かれる。でも発音は ü のまま',
      rules: [
        { written: 'ju', actual: 'ジュ（jü）', how: '「イ」の口で「ウ」と言う', example: 'jū（住む）' },
        { written: 'qu', actual: 'チュ（qü）', how: '同じく ü の音', example: 'qù（行く）' },
        { written: 'xu', actual: 'シュ（xü）', how: '同じく ü の音', example: 'xū（必要）' },
        { written: 'yu', actual: 'ユ（yü）', how: '同じく ü の音', example: 'yú（魚）' },
      ],
      tip: 'n と l の後だけは点々が残る → nǚ（女）、lǜ（緑）',
    }),
  },
  {
    title: '有気音と無気音',
    explanation: JSON.stringify({
      type: 'aspiration',
      description: '息を出すか出さないかの違い。日本語にはない区別',
      howToCheck: '口の前にティッシュを当てて発音。揺れたら有気音',
      rules: [
        { unaspirated: 'b', aspirated: 'p', example: 'bā（8）vs pā（うつ伏せ）', tip: 'b = 弱いパ行（息なし）' },
        { unaspirated: 'd', aspirated: 't', example: 'dā（乗る）vs tā（彼）', tip: 'd = 弱いタ行（息なし）' },
        { unaspirated: 'g', aspirated: 'k', example: 'gē（兄）vs kē（科目）', tip: 'g = 弱いカ行（息なし）' },
        { unaspirated: 'j', aspirated: 'q', example: 'jī（鶏）vs qī（7）', tip: 'j = 弱いチ行（息なし）' },
        { unaspirated: 'zh', aspirated: 'ch', example: 'zhī（知る）vs chī（食べる）', tip: 'zh = 舌を巻いてチ（息なし）' },
        { unaspirated: 'z', aspirated: 'c', example: 'zī（資）vs cī（刺す）', tip: 'z = 弱いツ（息なし）' },
      ],
    }),
  },
  {
    title: 'そり舌音と舌歯音',
    explanation: JSON.stringify({
      type: 'retroflex',
      description: '舌を巻くか巻かないかの違い',
      rules: [
        { group: 'そり舌音（舌を巻く）', sounds: [
          { sound: 'zh', like: '舌を巻いて「ヂ」', example: 'zhōng（中）' },
          { sound: 'ch', like: '舌を巻いて「チ」＋息', example: 'chī（食べる）' },
          { sound: 'sh', like: '舌を巻いて「シ」', example: 'shū（本）' },
          { sound: 'r', like: '舌を巻いて「リ」と「ジ」の間', example: 'rén（人）' },
        ]},
        { group: '舌歯音（舌を巻かない）', sounds: [
          { sound: 'z', like: '「ツ」の弱い版', example: 'zǎo（朝）' },
          { sound: 'c', like: '「ツ」＋息', example: 'cài（料理）' },
          { sound: 's', like: '「ス」', example: 'sān（3）' },
        ]},
      ],
    }),
  },
  {
    title: '声調が変わるルール',
    explanation: JSON.stringify({
      type: 'tone-change',
      description: '特定の組み合わせで声調が自動的に変わる',
      rules: [
        {
          name: '第3声 + 第3声',
          change: '前の3声 → 2声に変わる',
          examples: [
            { written: 'nǐ hǎo', actual: 'ní hǎo', meaning: 'こんにちは' },
            { written: 'wǒ yě', actual: 'wó yě', meaning: '私も' },
          ],
        },
        {
          name: '「一（yī）」の変化',
          change: '後ろの声調で変わる',
          examples: [
            { context: '4声の前', change: 'yī → yí', example: 'yíyàng（一様）' },
            { context: '1,2,3声の前', change: 'yī → yì', example: 'yìtiān（一天）' },
            { context: '単独・数字', change: 'そのまま yī', example: 'dìyī（第一）' },
          ],
        },
        {
          name: '「不（bù）」の変化',
          change: '4声の前だけ2声に変わる',
          examples: [
            { context: '4声の前', change: 'bù → bú', example: 'búshì（不是）' },
            { context: 'それ以外', change: 'そのまま bù', example: 'bùzhīdào（不知道）' },
          ],
        },
      ],
    }),
  },
  {
    title: '「e」は場所で音が変わる',
    explanation: JSON.stringify({
      type: 'vowel-variation',
      description: '同じ「e」でも、どこにいるかで違う音になる',
      rules: [
        { context: 'e 単独', sound: '「ウ」と「エ」の間（喉の奥）', example: 'è（お腹がすく）' },
        { context: 'ei の中', sound: '「エ」に近い', example: 'méi（ない）' },
        { context: 'ie の中', sound: '「エ」', example: 'xiè（ありがとう）' },
        { context: 'en, eng の中', sound: '弱い「ウ」的な音', example: 'mén（ドア）' },
      ],
    }),
  },
  {
    title: '「-i」は3種類ある',
    explanation: JSON.stringify({
      type: 'i-variation',
      description: '「i」の前の子音で読み方が変わる',
      rules: [
        { context: '普通の i（b,m,d,n,l,j,q,x の後）', sound: '「イー」', example: 'bī, mī, dī, nǐ' },
        { context: 'z, c, s の後', sound: '「ズ」「ツ」「ス」で止める感じ', example: 'zī, cí, sī' },
        { context: 'zh, ch, sh, r の後', sound: '舌を巻いたまま止める', example: 'zhī, chī, shī, rì' },
      ],
    }),
  },
];

// grammar_points に投入
const insertGrammar = db.prepare(`
  INSERT OR REPLACE INTO grammar_points (lesson_id, sort_order, title, explanation)
  VALUES (?, ?, ?, ?)
`);

// 既存の第0課文法データを削除
db.prepare('DELETE FROM grammar_points WHERE lesson_id = ?').run(LESSON_ID);

const insertGrammarTx = db.transaction(() => {
  pinyinRules.forEach((rule, i) => {
    insertGrammar.run(LESSON_ID, i + 1, rule.title, rule.explanation);
  });
});
insertGrammarTx();

console.log(`✓ ${pinyinRules.length} ピンインルール投入完了`);

// ========== 練習用基本単語 ==========
// 各ルールを体感できる単語を厳選

const practiceVocab = [
  // 声調の違いを体感
  { hanzi: '媽', pinyin: 'mā', translation_ja: 'お母さん（1声：高くまっすぐ）', examples: [{ zh: '媽媽', pinyin: 'māma', ja: 'お母さん' }] },
  { hanzi: '麻', pinyin: 'má', translation_ja: '麻（2声：上がる）', examples: [{ zh: '芝麻', pinyin: 'zhīma', ja: 'ごま' }] },
  { hanzi: '馬', pinyin: 'mǎ', translation_ja: '馬（3声：低く）', examples: [{ zh: '馬上', pinyin: 'mǎshàng', ja: 'すぐに' }] },
  { hanzi: '罵', pinyin: 'mà', translation_ja: '叱る（4声：下がる）', examples: [{ zh: '不要罵人', pinyin: 'bú yào mà rén', ja: '人を叱らないで' }] },

  // 隠れた母音 ui = ウェイ
  { hanzi: '水', pinyin: 'shuǐ', translation_ja: '水（ui→ウェイ）', examples: [{ zh: '喝水', pinyin: 'hē shuǐ', ja: '水を飲む' }] },
  { hanzi: '對', pinyin: 'duì', translation_ja: '正しい（ui→ウェイ）', examples: [{ zh: '對不起', pinyin: 'duìbuqǐ', ja: 'すみません' }] },

  // 隠れた母音 iu = イオウ
  { hanzi: '牛', pinyin: 'niú', translation_ja: '牛（iu→イオウ）', examples: [{ zh: '牛肉', pinyin: 'niúròu', ja: '牛肉' }] },
  { hanzi: '九', pinyin: 'jiǔ', translation_ja: '9（iu→イオウ）', examples: [{ zh: '九月', pinyin: 'jiǔ yuè', ja: '9月' }] },

  // 隠れた母音 un = ウェン
  { hanzi: '春', pinyin: 'chūn', translation_ja: '春（un→ウェン）', examples: [{ zh: '春天', pinyin: 'chūntiān', ja: '春' }] },

  // 隠れた母音 ian = イエン
  { hanzi: '天', pinyin: 'tiān', translation_ja: '天・日（ian→イエン）', examples: [{ zh: '今天', pinyin: 'jīntiān', ja: '今日' }] },
  { hanzi: '電', pinyin: 'diàn', translation_ja: '電気（ian→イエン）', examples: [{ zh: '電話', pinyin: 'diànhuà', ja: '電話' }] },

  // ü の点々が消える
  { hanzi: '去', pinyin: 'qù', translation_ja: '行く（qu = qü）', examples: [{ zh: '我要去台灣', pinyin: 'wǒ yào qù Táiwān', ja: '台湾に行きたい' }] },
  { hanzi: '魚', pinyin: 'yú', translation_ja: '魚（yu = yü）', examples: [{ zh: '吃魚', pinyin: 'chī yú', ja: '魚を食べる' }] },
  { hanzi: '女', pinyin: 'nǚ', translation_ja: '女（nüは点々が残る）', examples: [{ zh: '女生', pinyin: 'nǚshēng', ja: '女の子' }] },

  // 有気音 vs 無気音
  { hanzi: '八', pinyin: 'bā', translation_ja: '8（b＝息なし）', examples: [{ zh: '八月', pinyin: 'bā yuè', ja: '8月' }] },
  { hanzi: '怕', pinyin: 'pà', translation_ja: '怖い（p＝息あり）', examples: [{ zh: '不怕', pinyin: 'bú pà', ja: '怖くない' }] },
  { hanzi: '七', pinyin: 'qī', translation_ja: '7（q＝息あり）', examples: [{ zh: '七月', pinyin: 'qī yuè', ja: '7月' }] },
  { hanzi: '雞', pinyin: 'jī', translation_ja: '鶏（j＝息なし）', examples: [{ zh: '雞肉', pinyin: 'jīròu', ja: '鶏肉' }] },

  // そり舌音
  { hanzi: '中', pinyin: 'zhōng', translation_ja: '中（舌を巻く）', examples: [{ zh: '中文', pinyin: 'zhōngwén', ja: '中国語' }] },
  { hanzi: '吃', pinyin: 'chī', translation_ja: '食べる（舌を巻く＋息）', examples: [{ zh: '吃飯', pinyin: 'chī fàn', ja: 'ご飯を食べる' }] },
  { hanzi: '書', pinyin: 'shū', translation_ja: '本（舌を巻く）', examples: [{ zh: '看書', pinyin: 'kàn shū', ja: '本を読む' }] },
  { hanzi: '人', pinyin: 'rén', translation_ja: '人（巻き舌のr）', examples: [{ zh: '日本人', pinyin: 'Rìběnrén', ja: '日本人' }] },

  // 声調変化
  { hanzi: '你好', pinyin: 'nǐ hǎo', translation_ja: 'こんにちは（3+3→ní hǎo）', examples: [{ zh: '你好嗎？', pinyin: 'nǐ hǎo ma?', ja: '元気ですか？' }] },
  { hanzi: '不是', pinyin: 'bú shì', translation_ja: '違う（不+4声→bú）', examples: [{ zh: '不是我', pinyin: 'bú shì wǒ', ja: '私じゃない' }] },
];

// 単語投入
db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?').run(LESSON_ID);

const insertVocab = db.prepare(`
  INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const insertVocabTx = db.transaction(() => {
  practiceVocab.forEach((v, i) => {
    insertVocab.run(
      LESSON_ID,
      i + 1,
      v.hanzi,
      v.pinyin,
      v.translation_ja,
      JSON.stringify(v.examples)
    );
  });
});
insertVocabTx();

// vocab_countを更新
db.prepare('UPDATE lessons SET vocab_count = ? WHERE id = ?').run(practiceVocab.length, LESSON_ID);

console.log(`✓ ${practiceVocab.length} 練習用単語投入完了`);
console.log(`✓ 第0課「ピンインマスター」セットアップ完了`);

db.close();
