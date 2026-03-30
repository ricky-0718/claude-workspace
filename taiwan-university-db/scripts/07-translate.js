/**
 * 07-translate.js
 * 繁体字→日本語漢字の自動変換で大学名・学科名を翻訳
 *
 * ステップ:
 *   1. 繁体字→日本語漢字の変換テーブルで機械変換
 *   2. 結果を translations/ に保存
 *   3. 手動レビュー対象としてフラグ付け
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const TRANSLATIONS_DIR = join(__dirname, '..', 'data', 'translations');

// 繁体字 → 日本語漢字 変換テーブル
const CHAR_MAP = {
  '國': '国', '臺': '台', '學': '学', '灣': '湾', '師': '師', '範': '範',
  '藝': '芸', '術': '術', '醫': '医', '藥': '薬', '體': '体', '園': '園',
  '電': '電', '機': '機', '資': '資', '訊': '訊', '應': '応', '經': '経',
  '營': '営', '濟': '済', '財': '財', '務': '務', '貿': '貿', '際': '際',
  '環': '環', '護': '護', '養': '養', '農': '農', '漁': '漁', '獸': '獣',
  '與': 'と', '個': '個', '傳': '伝', '統': '統', '歷': '歴', '設': '設',
  '計': '計', '語': '語', '數': '数', '專': '専', '實': '実', '踐': '践',
  '義': '義', '華': '華', '東': '東', '開': '開', '發': '発', '關': '関',
  '係': '係', '勞': '労', '動': '動', '觀': '観', '導': '導', '輔': '輔',
  '運': '運', '競': '競', '區': '区', '衛': '衛', '齒': '歯', '獨': '独',
  '廣': '広', '億': '億', '書': '書', '圖': '図', '衝': '衝', '業': '業',
  '聯': '連', '總': '総', '點': '点', '類': '類', '項': '項', '組': '組',
  '從': 'から', '龍': '竜', '鑰': '鍵', '寶': '宝', '豐': '豊', '佛': '仏',
  '殘': '残', '壓': '圧', '氣': '気', '轉': '転', '碼': '碼', '識': '識',
  '號': '号', '蘭': '蘭', '際': '際', '亞': '亜', '則': '則', '築': '築',
  '質': '質', '構': '構', '礎': '礎', '變': '変', '際': '際', '邊': '辺',
  '險': '険', '損': '損', '銀': '銀', '職': '職', '員': '員', '歲': '歳',
  '錄': '録', '達': '達', '畫': '画', '壽': '寿', '單': '単', '蟲': '虫',
  '戲': '戯', '劇': '劇', '雜': '雑', '誌': '誌', '會': '会', '鏡': '鏡',
  '專': '専', '議': '議', '問': '問', '題': '題', '號': '号', '萬': '万',
  '齡': '齢', '處': '処', '對': '対', '館': '館', '備': '備', '禮': '礼',
};

// 学科名パターン変換（「○○學系」→「○○学科」等）
const DEPT_PATTERNS = [
  [/學系$/,    '学科'],
  [/學士學位學程$/, '学士課程'],
  [/學位學程$/, '学位課程'],
  [/碩士班$/,  '修士課程'],
  [/博士班$/,  '博士課程'],
  [/研究所$/,  '大学院'],
];

function convertChars(text) {
  let result = '';
  for (const ch of text) {
    result += CHAR_MAP[ch] || ch;
  }
  return result;
}

function translateDeptName(chtName) {
  let ja = convertChars(chtName);
  for (const [pattern, replacement] of DEPT_PATTERNS) {
    ja = ja.replace(pattern, replacement);
  }
  return ja;
}

async function main() {
  await mkdir(TRANSLATIONS_DIR, { recursive: true });
  console.log('=== 翻訳辞書生成開始 ===\n');

  // --- 大学名翻訳 ---
  const schools = JSON.parse(await readFile(join(FINAL_DIR, 'schools.json'), 'utf-8'));
  const existingUniNames = await loadExisting(join(TRANSLATIONS_DIR, 'university-names.json'));

  const uniTranslations = {};
  let uniNewCount = 0;
  for (const school of schools) {
    if (existingUniNames[school.id]?.ja) {
      uniTranslations[school.id] = existingUniNames[school.id];
    } else {
      const ja = convertChars(school.name.cht);
      uniTranslations[school.id] = {
        cht: school.name.cht,
        ja: ja,
        en: school.name.en,
        status: 'auto'
      };
      uniNewCount++;
    }
  }
  await writeFile(
    join(TRANSLATIONS_DIR, 'university-names.json'),
    JSON.stringify(uniTranslations, null, 2),
    'utf-8'
  );
  console.log(`大学名: ${Object.keys(uniTranslations).length}校（新規自動変換: ${uniNewCount}件）`);

  // --- 学科名翻訳 ---
  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const existingDeptNames = await loadExisting(join(TRANSLATIONS_DIR, 'department-names.json'));

  const deptTranslations = {};
  let deptNewCount = 0;
  for (const dept of departments) {
    if (existingDeptNames[dept.id]?.ja) {
      deptTranslations[dept.id] = existingDeptNames[dept.id];
    } else {
      const ja = translateDeptName(dept.name.cht);
      deptTranslations[dept.id] = {
        cht: dept.name.cht,
        ja: ja,
        en: dept.name.en,
        status: 'auto'
      };
      deptNewCount++;
    }
  }
  await writeFile(
    join(TRANSLATIONS_DIR, 'department-names.json'),
    JSON.stringify(deptTranslations, null, 2),
    'utf-8'
  );
  console.log(`学科名: ${Object.keys(deptTranslations).length}件（新規自動変換: ${deptNewCount}件）`);

  // --- 翻訳をfinalデータに反映 ---
  console.log('\n翻訳をfinalデータに反映...');
  for (const school of schools) {
    const trans = uniTranslations[school.id];
    if (trans?.ja) school.name.ja = trans.ja;
  }
  for (const dept of departments) {
    const trans = deptTranslations[dept.id];
    if (trans?.ja) {
      dept.name.ja = trans.ja;
      dept.translation_status = trans.status === 'manual' ? 'manual' : 'ai_draft';
    }
  }
  await writeFile(join(FINAL_DIR, 'schools.json'), JSON.stringify(schools, null, 2), 'utf-8');
  await writeFile(join(FINAL_DIR, 'departments.json'), JSON.stringify(departments, null, 2), 'utf-8');

  console.log('\n=== 翻訳完了 ===');
  console.log(`大学名翻訳率: ${Object.values(uniTranslations).filter(t => t.ja).length}/${schools.length}`);
  console.log(`学科名翻訳率: ${Object.values(deptTranslations).filter(t => t.ja).length}/${departments.length}`);

  // サンプル出力
  console.log('\n--- サンプル（大学名）---');
  Object.entries(uniTranslations).slice(0, 5).forEach(([id, t]) => {
    console.log(`  ${t.cht} → ${t.ja}`);
  });
  console.log('\n--- サンプル（学科名）---');
  Object.entries(deptTranslations).slice(0, 10).forEach(([id, t]) => {
    console.log(`  ${t.cht} → ${t.ja}`);
  });
}

async function loadExisting(path) {
  try { return JSON.parse(await readFile(path, 'utf-8')); }
  catch { return {}; }
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
