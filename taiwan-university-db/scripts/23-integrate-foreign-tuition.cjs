#!/usr/bin/env node
/**
 * 23-integrate-foreign-tuition.js
 *
 * foreign-tuition-extracted.json のデータを
 * taiwan-university-website/src/data/schools.json に統合する。
 *
 * 既存の tuition フィールドはそのまま保持し、
 * foreign_tuition フィールドを追加/更新する。
 *
 * 使い方: node scripts/23-integrate-foreign-tuition.js
 */

const fs = require('fs');
const path = require('path');

const EXTRACTED_PATH = path.join(__dirname, '../data/sources/foreign-tuition-extracted.json');
const SCHOOLS_PATH = path.join(__dirname, '../../taiwan-university-website/src/data/schools.json');

function formatCurrency(amount) {
  if (!amount) return null;
  return amount.toLocaleString('en-US');
}

function ntdToJpy(ntdMin, ntdMax) {
  // 1 NTD ≈ 5 JPY (2026年4月レート概算)
  const rate = 5;
  const jpyMin = Math.round(ntdMin * rate / 10000);
  const jpyMax = Math.round(ntdMax * rate / 10000);
  if (jpyMin === jpyMax) return `約${jpyMin}万円/学期`;
  return `約${jpyMin}~${jpyMax}万円/学期`;
}

function main() {
  const extracted = JSON.parse(fs.readFileSync(EXTRACTED_PATH, 'utf8'));
  const schools = JSON.parse(fs.readFileSync(SCHOOLS_PATH, 'utf8'));

  let updated = 0;
  let notFound = 0;

  for (const [schoolId, data] of Object.entries(extracted.schools)) {
    const school = schools.find(s => s.id === schoolId);
    if (!school) {
      console.log(`[SKIP] school_id ${schoolId} (${data.school_name}) not found in schools.json`);
      notFound++;
      continue;
    }

    school.foreign_tuition = {
      undergraduate_per_semester: data.undergraduate_per_semester_display,
      source: data.source,
      extracted_at: data.extracted_at || extracted.metadata.extracted_at,
      confidence: data.confidence,
    };

    if (data.jpy_equivalent) {
      school.foreign_tuition.jpy_equivalent = data.jpy_equivalent;
    } else if (data.undergraduate_per_semester_min && data.undergraduate_per_semester_max) {
      school.foreign_tuition.jpy_equivalent = ntdToJpy(
        data.undergraduate_per_semester_min,
        data.undergraduate_per_semester_max
      );
    }

    if (data.source_url) {
      school.foreign_tuition.source_url = data.source_url;
    }

    if (data.notes) {
      school.foreign_tuition.notes = data.notes;
    }

    console.log(`[OK] ${schoolId} ${data.school_name}: ${data.undergraduate_per_semester_display}`);
    updated++;
  }

  fs.writeFileSync(SCHOOLS_PATH, JSON.stringify(schools, null, 2) + '\n', 'utf8');

  console.log(`\n=== Summary ===`);
  console.log(`Updated: ${updated} schools`);
  console.log(`Not found: ${notFound} schools`);
  console.log(`Total in extracted: ${Object.keys(extracted.schools).length}`);
  console.log(`Schools.json saved.`);
}

main();
