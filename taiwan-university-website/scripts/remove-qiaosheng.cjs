#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');

const REMOVAL_PATTERNS = [
  /[\r\n]*依本校外語[^\r\n]*僑生[^\r\n]*/g,
  /[\r\n]*[0-9]*\.?[^\r\n]*學士班招收之海外僑生[^\r\n]*/g,
  /[\r\n]*僑生不得選修[^\r\n]*/g,
  // 僑生 scholarship paragraphs
  /[\r\n]*優秀僑生[^\r\n]*/g,
  /[\r\n]*入學後第一學年[^\r\n]*僑生[^\r\n]*/g,
  // 僑生 application notes
  /[\r\n]*[※＊][^\r\n]*僑生[^\r\n]*/g,
  // Sentences about 僑生 in mixed paragraphs
  /[^。\r\n]*僑生申請專用[^。]*[。]?/g,
  /[^。\r\n]*配合僑生[^。]*[。]?/g,
];

const SIMPLIFY_PATTERNS = [
  [/外國學生及僑生/g, '外國學生'],
  [/外國學生、僑生/g, '外國學生'],
  [/；除港澳、僑生之外，亦有[^。]*[。]?/g, '。'],
  [/，僑生[^\r\n，。]*考量[。]?/g, '。'],
  [/港澳、僑生/g, ''],
];

function cleanText(text) {
  if (!text || typeof text !== 'string') return text;
  if (!/僑生/.test(text)) return text;
  let cleaned = text;
  for (const pattern of REMOVAL_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }
  for (const [find, replace] of SIMPLIFY_PATTERNS) {
    cleaned = cleaned.replace(find, replace);
  }
  // Remove remaining sentences containing 僑生 (split by Chinese period)
  if (/僑生/.test(cleaned)) {
    const parts = cleaned.split(/([。\r\n]+)/);
    const filtered = [];
    for (let i = 0; i < parts.length; i++) {
      if (/僑生/.test(parts[i])) continue;
      filtered.push(parts[i]);
    }
    cleaned = filtered.join('');
  }
  return cleaned.replace(/\r?\n\r?\n+/g, '\n').replace(/^[\r\n]+|[\r\n]+$/g, '').trim();
}

function walkAndClean(obj, stats) {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    const cleaned = cleanText(obj);
    if (cleaned !== obj) stats.count++;
    return cleaned;
  }
  if (Array.isArray(obj)) return obj.map(item => walkAndClean(item, stats));
  if (typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = walkAndClean(value, stats);
    }
    return result;
  }
  return obj;
}

console.log('Processing departments.json...');
const deptsPath = path.join(dataDir, 'departments.json');
const depts = JSON.parse(fs.readFileSync(deptsPath, 'utf8'));
const stats = { count: 0 };
const cleanedDepts = walkAndClean(depts, stats);
fs.writeFileSync(deptsPath, JSON.stringify(cleanedDepts, null, 2) + '\n', 'utf8');
console.log(`  Fields cleaned: ${stats.count}`);

const deptsAfter = fs.readFileSync(deptsPath, 'utf8');
const remaining = (deptsAfter.match(/僑生/g) || []).length;
const huaqiao = (deptsAfter.match(/華僑/g) || []).length;
console.log(`  Remaining 僑生: ${remaining}`);
console.log(`  Remaining 華僑: ${huaqiao} (academic content)`);

if (remaining > 0) {
  const lines = deptsAfter.split('\n');
  let shown = 0;
  for (let i = 0; i < lines.length && shown < 15; i++) {
    if (/僑生/.test(lines[i])) {
      console.log(`  L${i+1}: ${lines[i].trim().substring(0, 150)}`);
      shown++;
    }
  }
}
