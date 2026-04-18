#!/usr/bin/env node
/**
 * CMP-31 WS-1: 日本人学生数を schools.json にパッチ
 *
 * 背景: guide-24schools.json に24校分の japanese 学生数があるが、
 * name-mapping.json との名寄せが「大学」vs「大學」の字形差で失敗し、
 * 6校しか schools.json に反映されていなかった（既存デプロイ時点）。
 *
 * このスクリプトは 學 ↔ 学 を正規化してマッチングし、欠落18校分を
 * student_count.japanese / total / foreign に補完する。
 */
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_ROOT = join(__dirname, '..');
const SITE_SCHOOLS = join(DB_ROOT, '..', 'taiwan-university-website', 'src', 'data', 'schools.json');
const GUIDE_PATH = join(DB_ROOT, 'data', 'sources', 'guide-24schools.json');
const MAPPING_PATH = join(DB_ROOT, 'data', 'sources', 'name-mapping.json');

// 繁体⇄簡体の正規化：大学関連でよく衝突するペアだけ処理
// （全域CJK正規化はやり過ぎ＆誤マッチのリスクがあるので最小限）
const NORMALIZE_MAP = {
  '學': '学',
  '灣': '湾',
  '臺': '台',
  '國': '国',
  '實': '実',
  '藝': '芸',
  '輔': '輔',
  '銘': '銘',
  '傳': '伝',
};
function normalize(s) {
  if (!s) return '';
  let out = s;
  for (const [src, dst] of Object.entries(NORMALIZE_MAP)) {
    out = out.split(src).join(dst);
  }
  return out;
}

// 厳密マッチのみ（includes は一致範囲が広すぎて誤マッチする）
function nameMatch(a, b) {
  if (!a || !b) return false;
  return normalize(a) === normalize(b);
}

async function main() {
  const schools = JSON.parse(await readFile(SITE_SCHOOLS, 'utf-8'));
  const guide = JSON.parse(await readFile(GUIDE_PATH, 'utf-8'));
  const mapping = JSON.parse(await readFile(MAPPING_PATH, 'utf-8'));

  const guideUnis = guide.universities;
  let patched = 0;
  let alreadyHasJp = 0;
  let skipNoMatch = 0;

  for (const school of schools) {
    // 既に japanese が入っているならスキップ（ただし total/foreign が無ければ補完）
    const sc = school.student_count || {};
    if (sc.japanese) {
      alreadyHasJp++;
      continue;
    }

    // name-mapping.json に .guide があるか確認
    const map = mapping[school.id];
    if (!map || !map.guide) {
      // マッピング自体がない → 候補絞り込みで name.cht / name.ja と照合
      const schoolNames = [school.name?.cht, school.name?.ja, school.name?.en].filter(Boolean);
      const found = guideUnis.find(u =>
        schoolNames.some(n => nameMatch(n, u.name_ja) || nameMatch(n, u.name_cht || ''))
      );
      if (!found) { skipNoMatch++; continue; }

      const gsc = found.student_count || {};
      if (gsc.japanese || gsc.total || gsc.foreign) {
        school.student_count = {
          total: sc.total ?? gsc.total,
          foreign: sc.foreign ?? gsc.foreign,
          japanese: gsc.japanese,
        };
        patched++;
        console.log(`[no-mapping/fallback] ${school.name?.ja || school.slug}: JP=${gsc.japanese}`);
      }
      continue;
    }

    // マッピングありの場合は .guide 値で正規化マッチ
    const target = map.guide;
    const found = guideUnis.find(u => nameMatch(u.name_ja, target));
    if (!found) { skipNoMatch++; continue; }

    const gsc = found.student_count || {};
    if (gsc.japanese || gsc.total || gsc.foreign) {
      school.student_count = {
        total: sc.total ?? gsc.total,
        foreign: sc.foreign ?? gsc.foreign,
        japanese: gsc.japanese,
      };
      patched++;
      console.log(`[mapping] ${school.name?.ja || school.slug}: JP=${gsc.japanese} (guide=${found.name_ja})`);
    }
  }

  console.log(`\n=== 結果 ===`);
  console.log(`既に japanese あり（スキップ）: ${alreadyHasJp}`);
  console.log(`パッチ適用: ${patched}`);
  console.log(`マッチせずスキップ: ${skipNoMatch}`);

  await writeFile(SITE_SCHOOLS, JSON.stringify(schools, null, 2) + '\n', 'utf-8');
  console.log(`\n書き込み完了: ${SITE_SCHOOLS}`);
}

main().catch(e => { console.error(e); process.exit(1); });
