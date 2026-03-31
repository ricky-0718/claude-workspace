/**
 * 19-translate-104.js
 * 104データの繁体字テキストをGoogle翻訳で日本語に翻訳
 *
 * 翻訳対象:
 *   1. intro_collego (紹介文) → intro_collego_ja
 *   2. curriculum_104.required[].lessons[] → lessons_ja[]
 *   3. curriculum_104.electives[].areaName → areaName_ja
 *   4. curriculum_104.electives[].lessons → lessons_ja
 *
 * キャッシュ: data/translations/104-cache.json に保存（再実行時スキップ）
 */

import translate from 'google-translate-api-x';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FINAL_DIR = join(__dirname, '..', 'data', 'final');
const TRANS_DIR = join(__dirname, '..', 'data', 'translations');
const CACHE_FILE = join(TRANS_DIR, '104-cache.json');

const DELAY_MS = 300;  // リクエスト間遅延（rate limit対策）
const BATCH_SIZE = 30;  // バッチあたりの科目名数

// キャッシュ読み込み
async function loadCache() {
  try { return JSON.parse(await readFile(CACHE_FILE, 'utf-8')); }
  catch { return {}; }
}

// 翻訳（キャッシュ付き）
async function translateCached(text, cache) {
  if (!text || text.trim().length === 0) return text;
  if (cache[text]) return cache[text];

  try {
    const res = await translate(text, { from: 'zh-TW', to: 'ja' });
    const translated = res.text;
    cache[text] = translated;
    return translated;
  } catch (err) {
    if (err.message?.includes('429') || err.message?.includes('Too Many')) {
      // rate limit: wait and retry
      await new Promise(r => setTimeout(r, 5000));
      try {
        const res = await translate(text, { from: 'zh-TW', to: 'ja' });
        cache[text] = res.text;
        return res.text;
      } catch { return text; } // 2回目も失敗なら原文のまま
    }
    return text; // エラー時は原文
  }
}

// 科目名をバッチ翻訳（改行区切りでまとめて送信）
async function translateBatch(items, cache) {
  // キャッシュ済みを除外
  const uncached = items.filter(t => !cache[t] && t.trim().length > 0);
  if (uncached.length === 0) return;

  // 改行区切りでまとめて翻訳
  const joined = uncached.join('\n');
  try {
    const res = await translate(joined, { from: 'zh-TW', to: 'ja' });
    const results = res.text.split('\n');
    for (let i = 0; i < uncached.length && i < results.length; i++) {
      cache[uncached[i]] = results[i].trim();
    }
  } catch (err) {
    // バッチ失敗時は個別に翻訳
    for (const item of uncached) {
      await translateCached(item, cache);
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }
}

async function main() {
  console.log('=== 104データ 日本語翻訳（Google翻訳） ===\n');
  await mkdir(TRANS_DIR, { recursive: true });

  const departments = JSON.parse(await readFile(join(FINAL_DIR, 'departments.json'), 'utf-8'));
  const cache = await loadCache();
  const cacheHitsBefore = Object.keys(cache).length;
  console.log(`キャッシュ: ${cacheHitsBefore}件\n`);

  // --- Phase 1: 全ユニーク科目名を収集してバッチ翻訳 ---
  console.log('[Phase 1] 科目名の翻訳...');
  const allCourseNames = new Set();
  const allAreaNames = new Set();

  for (const dept of departments) {
    if (dept.curriculum_104?.required) {
      for (const r of dept.curriculum_104.required) {
        r.lessons.forEach(l => allCourseNames.add(l));
      }
    }
    if (dept.curriculum_104?.electives) {
      for (const e of dept.curriculum_104.electives) {
        allAreaNames.add(e.areaName);
        const lessons = Array.isArray(e.lessons) ? e.lessons : [e.lessons];
        for (const l of lessons) {
          if (typeof l === 'string') {
            l.split('、').forEach(c => { if (c.trim()) allCourseNames.add(c.trim()); });
          }
        }
      }
    }
  }

  console.log(`  ユニーク科目名: ${allCourseNames.size}件`);
  console.log(`  ユニーク分野名: ${allAreaNames.size}件`);

  // 分野名を先に翻訳（少ない）
  const areaArray = [...allAreaNames];
  const uncachedAreas = areaArray.filter(a => !cache[a]);
  if (uncachedAreas.length > 0) {
    console.log(`  分野名翻訳中 (${uncachedAreas.length}件)...`);
    for (let i = 0; i < uncachedAreas.length; i += BATCH_SIZE) {
      const batch = uncachedAreas.slice(i, i + BATCH_SIZE);
      await translateBatch(batch, cache);
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  // 科目名をバッチ翻訳
  const courseArray = [...allCourseNames];
  const uncachedCourses = courseArray.filter(c => !cache[c]);
  console.log(`  科目名翻訳中 (${uncachedCourses.length}件、キャッシュ済み: ${courseArray.length - uncachedCourses.length}件)...`);

  const startTime = Date.now();
  for (let i = 0; i < uncachedCourses.length; i += BATCH_SIZE) {
    const batch = uncachedCourses.slice(i, i + BATCH_SIZE);
    await translateBatch(batch, cache);
    await new Promise(r => setTimeout(r, DELAY_MS));

    // 進捗表示（100件ごと）
    const done = Math.min(i + BATCH_SIZE, uncachedCourses.length);
    if (done % 300 === 0 || done === uncachedCourses.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const rate = (done / (Date.now() - startTime) * 1000).toFixed(1);
      console.log(`  [${done}/${uncachedCourses.length}] ${elapsed}秒 (${rate}件/秒)`);
    }

    // 1000件ごとにキャッシュ保存（中断対策）
    if (done % 1000 === 0) {
      await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    }
  }

  // キャッシュ中間保存
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  console.log(`  科目名翻訳完了\n`);

  // --- Phase 2: 紹介文の翻訳 ---
  console.log('[Phase 2] 紹介文の翻訳...');
  const intros = departments.filter(d => d.intro_collego && !cache[d.intro_collego]);
  console.log(`  未翻訳: ${intros.length}件`);

  const introStart = Date.now();
  for (let i = 0; i < intros.length; i++) {
    const dept = intros[i];
    await translateCached(dept.intro_collego, cache);
    await new Promise(r => setTimeout(r, DELAY_MS));

    if ((i + 1) % 50 === 0 || i === intros.length - 1) {
      const elapsed = ((Date.now() - introStart) / 1000).toFixed(0);
      console.log(`  [${i + 1}/${intros.length}] ${elapsed}秒`);
      // 中間保存
      await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    }
  }

  // 最終キャッシュ保存
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  console.log(`  紹介文翻訳完了\n`);

  // --- Phase 3: departments.jsonに翻訳を適用 ---
  console.log('[Phase 3] 翻訳をdepartments.jsonに適用...');
  let applied = 0;

  for (const dept of departments) {
    let changed = false;

    // カリキュラム翻訳
    if (dept.curriculum_104) {
      if (dept.curriculum_104.required) {
        for (const r of dept.curriculum_104.required) {
          r.lessons_ja = r.lessons.map(l => cache[l] || l);
        }
        changed = true;
      }
      if (dept.curriculum_104.electives) {
        for (const e of dept.curriculum_104.electives) {
          e.areaName_ja = cache[e.areaName] || e.areaName;
          const lessons = Array.isArray(e.lessons) ? e.lessons : [e.lessons];
          e.lessons_ja = lessons.map(l => {
            if (typeof l !== 'string') return l;
            return l.split('、').map(c => cache[c.trim()] || c.trim()).join('、');
          });
          if (!Array.isArray(e.lessons)) {
            e.lessons_ja = e.lessons_ja[0]; // 元が文字列なら文字列で返す
          }
        }
        changed = true;
      }
    }

    // 紹介文翻訳
    if (dept.intro_collego) {
      dept.intro_collego_ja = cache[dept.intro_collego] || dept.intro_collego;
      changed = true;
    }

    if (changed) applied++;
  }

  console.log(`  適用: ${applied}学科\n`);

  // --- 保存 ---
  console.log('保存中...');
  await writeFile(join(FINAL_DIR, 'departments.json'), JSON.stringify(departments, null, 2), 'utf-8');
  const webDataDir = join(__dirname, '..', '..', 'taiwan-university-website', 'src', 'data');
  await writeFile(join(webDataDir, 'departments.json'), JSON.stringify(departments, null, 2), 'utf-8');
  console.log('  → departments.json (final + website)\n');

  // --- サマリー ---
  const newTranslations = Object.keys(cache).length - cacheHitsBefore;
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  翻訳完了                                    ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`  新規翻訳: ${newTranslations}件`);
  console.log(`  キャッシュ合計: ${Object.keys(cache).length}件`);
  console.log(`  適用学科: ${applied}件`);

  // サンプル表示
  console.log('\n--- サンプル ---');
  const samples = departments.filter(d => d.intro_collego_ja && d.intro_collego_ja !== d.intro_collego).slice(0, 3);
  for (const d of samples) {
    console.log(`\n${d.name.ja}:`);
    console.log(`  中: ${d.intro_collego.substring(0, 80)}...`);
    console.log(`  日: ${d.intro_collego_ja.substring(0, 80)}...`);
  }

  const courseSamples = departments.filter(d => d.curriculum_104?.required?.[0]?.lessons_ja).slice(0, 2);
  for (const d of courseSamples) {
    console.log(`\n${d.name.ja} 1年次:`);
    const r = d.curriculum_104.required[0];
    r.lessons.slice(0, 5).forEach((l, i) => {
      console.log(`  ${l} → ${r.lessons_ja[i]}`);
    });
  }
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
