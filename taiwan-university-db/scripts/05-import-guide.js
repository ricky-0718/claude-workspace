/**
 * 05-import-guide.js
 * university-guide.md（大学図鑑テキスト版）から
 * 各大学の日本語概要・学費・寮費・奨学金・学部情報を構造化JSONに変換
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, '..', '..', 'knowledge', 'students', 'drive-texts');
const SOURCES_DIR = join(__dirname, '..', 'data', 'sources');

function parseInfoTable(section) {
  const info = {};
  const rows = section.match(/\|\s*(.+?)\s*\|\s*(.+?)\s*\|/g) || [];
  for (const row of rows) {
    const match = row.match(/\|\s*(.+?)\s*\|\s*(.+?)\s*\|/);
    if (match && !match[1].startsWith('---') && match[1].trim() !== '項目') {
      info[match[1].trim()] = match[2].trim();
    }
  }
  return info;
}

function parseTuitionTable(section) {
  const tuitions = [];
  const rows = section.match(/\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/g) || [];
  for (const row of rows) {
    const match = row.match(/\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/);
    if (match && !match[1].startsWith('---') && match[1].trim() !== '学部') {
      tuitions.push({
        faculty: match[1].trim(),
        requirement: match[2].trim(),
        amount: match[3].trim()
      });
    }
  }
  return tuitions;
}

function extractBulletPoints(section, header) {
  const headerRegex = new RegExp(`###\\s*${header}[\\s\\S]*?(?=###|$)`);
  const match = section.match(headerRegex);
  if (!match) return null;
  const bullets = match[0].match(/^- .+$/gm) || [];
  return bullets.map(b => b.replace(/^- /, '').trim()).join('\n');
}

async function main() {
  await mkdir(SOURCES_DIR, { recursive: true });
  console.log('=== 大学図鑑データ取込開始 ===\n');

  const md = await readFile(join(KNOWLEDGE_DIR, 'university-guide.md'), 'utf-8');

  // 目次の後、各大学セクションを分割（## で区切る）
  const sections = md.split(/\n## /).slice(1); // 最初の目次セクションを除く
  // 目次自体を除外（「目次」で始まるセクション）
  const universitySections = sections.filter(s => !s.startsWith('目次'));

  const universities = [];

  for (const section of universitySections) {
    const lines = section.split('\n');
    const name = lines[0].trim();
    if (!name || name.length < 2) continue;

    // 英語名
    const enMatch = section.match(/\*\*(.+?)\*\*/);
    const enName = enMatch ? enMatch[1] : null;

    // URL
    const urlMatch = section.match(/https?:\/\/[^\s)]+/);
    const url = urlMatch ? urlMatch[0] : null;

    // 基本情報テーブル
    const info = parseInfoTable(section);

    // 概要（箇条書き）
    const description = extractBulletPoints(section, '概要');

    // 寮費
    const dormInfo = extractBulletPoints(section, '寮費');

    // 学費テーブル
    const tuitionSection = section.match(/### 外国人受け入れ学部[\s\S]*?(?=###|$)/)?.[0] || '';
    const tuition = parseTuitionTable(tuitionSection);

    // 奨学金
    const scholarshipMatch = section.match(/### 奨学金\s*\n([\s\S]*?)(?=###|$)/);
    const scholarship = scholarshipMatch ? scholarshipMatch[1].trim() : null;

    const uni = {
      name_ja: name,
      name_en: enName,
      url: url,
      student_count: {
        total: parseInt(info['全校生徒数']?.replace(/[^0-9]/g, '')) || null,
        foreign: parseInt(info['留学生数']?.replace(/[^0-9]/g, '')) || null,
        japanese: parseInt(info['日本人留学生数']?.replace(/[^0-9]/g, '')) || null
      },
      area: info['エリア'] || null,
      description_ja: description,
      dormitory_info_ja: dormInfo,
      tuition: tuition.length > 0 ? tuition : null,
      scholarship_ja: scholarship
    };

    universities.push(uni);
  }

  console.log(`大学数: ${universities.length}校`);

  // 保存
  const result = {
    source: '大学図鑑 2023年版（PDF → テキスト化）',
    extracted_at: new Date().toISOString(),
    universities: universities
  };

  await writeFile(join(SOURCES_DIR, 'guide-24schools.json'), JSON.stringify(result, null, 2), 'utf-8');
  console.log(`保存: guide-24schools.json`);

  // サンプル
  console.log('\n--- サンプル ---');
  universities.slice(0, 3).forEach(u => {
    console.log(`  ${u.name_ja} (${u.name_en})`);
    console.log(`    生徒: ${u.student_count.total}人 / 留学生: ${u.student_count.foreign}人 / 日本人: ${u.student_count.japanese}人`);
    console.log(`    学費: ${u.tuition?.length || 0}学部`);
    console.log(`    概要: ${u.description_ja?.substring(0, 50)}...`);
  });
}

main().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
