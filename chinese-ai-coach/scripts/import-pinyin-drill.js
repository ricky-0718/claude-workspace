/**
 * 第9課「ピンイン全音節練習」データ投入スクリプト
 *
 * 時代華語1-2から抽出した271音節を声母グループ別に投入。
 * 練習モード専用（文法解説なし）。
 *
 * Usage:
 *   node scripts/import-pinyin-drill.js
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

const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

const LESSON_ID = 'book1-pinyin-drill';

// レッスン挿入（sort_order=1で第0課の次）
db.prepare(`
  INSERT OR REPLACE INTO lessons (id, book, lesson_number, title_zh, title_ja, vocab_count, sort_order)
  VALUES (?, 1, 99, '拼音全音節練習', 'ピンイン全音節練習', 0, 1)
`).run(LESSON_ID);

// 声母グループ別の全音節データ
const groups = {
  "ゼロ声母": ["a","ai","an","e","er","wa","wai","wan","wang","wei","wen","wo","wu","yan","yang","yao","ye","yi","yin","ying","yong","you","yu","yuan","yue","yun"],
  "b": ["ba","bai","ban","bang","bao","bei","ben","bi","bian","biao","bie","bin","bing","bo","bu"],
  "p": ["pa","pai","pan","pang","pao","peng","pi","pian","piao","ping"],
  "m": ["ma","mai","man","mang","mao","me","mei","men","mian","ming","mo","mu"],
  "f": ["fa","fan","fang","fei","fen","feng","fu"],
  "d": ["da","dai","dan","dang","dao","de","dei","deng","di","dian","ding","dong","dou","du","duan","dui","duo"],
  "t": ["ta","tai","tan","tang","te","ti","tian","tiao","tie","ting","tong","tou","tu"],
  "n": ["na","nai","nan","nao","ne","neng","ni","nian","niao","nin","niu","nü"],
  "l": ["lai","lan","lao","le","lei","leng","li","lian","liang","liao","lin","ling","liu","long","lou","lu","lü"],
  "g": ["gai","gan","gang","gao","ge","gei","gen","geng","gong","gou","gu","guai","guan","gui","guo"],
  "k": ["ka","kai","kan","kang","kao","ke","kong","kou","ku","kuai"],
  "h": ["hai","han","hang","hao","he","hei","hen","hong","hou","hu","hua","huai","huan","huang","hui","hun","huo"],
  "j": ["ji","jia","jian","jiang","jiao","jie","jin","jing","jiu","ju","jue"],
  "q": ["qi","qian","qiao","qie","qin","qing","qiu","qu","qun"],
  "x": ["xi","xia","xian","xiang","xiao","xie","xin","xing","xiong","xiu","xu","xue"],
  "zh": ["zhan","zhang","zhao","zhe","zhen","zhi","zhong","zhou","zhu","zhuan","zhun","zhuo"],
  "ch": ["cha","chang","chao","che","cheng","chi","chu","chuan","chuang","chun"],
  "sh": ["sha","shai","shan","shang","shao","she","shei","shen","sheng","shi","shou","shu","shuang","shui","shuo"],
  "r": ["ran","re","ren","ri","rong","rou","ru"],
  "z": ["za","zai","zao","zen","zi","zou","zu","zui","zuo"],
  "c": ["cai","can","ce","ci","cong","cuo"],
  "s": ["sai","se","si","song","sou","su","suan","sui","suo"],
};

// 既存データ削除
db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?').run(LESSON_ID);
db.prepare('DELETE FROM grammar_points WHERE lesson_id = ?').run(LESSON_ID);

// vocabulary テーブルに投入（各音節を1単語として）
const insertVocab = db.prepare(`
  INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json)
  VALUES (?, ?, ?, ?, ?, ?)
`);

let sortOrder = 1;
let totalCount = 0;

const insertTx = db.transaction(() => {
  for (const [group, syllables] of Object.entries(groups)) {
    for (const syl of syllables) {
      insertVocab.run(
        LESSON_ID,
        sortOrder++,
        syl,           // hanzi欄にピンインをそのまま入れる（漢字なし）
        syl,           // pinyin
        group === 'ゼロ声母' ? 'ゼロ声母' : `${group} グループ`,
        '[]'
      );
      totalCount++;
    }
  }
});
insertTx();

// vocab_countを更新
db.prepare('UPDATE lessons SET vocab_count = ? WHERE id = ?').run(totalCount, LESSON_ID);

console.log(`✓ ${totalCount} 音節投入完了`);
console.log(`✓ 第9課「ピンイン全音節練習」セットアップ完了`);

db.close();
