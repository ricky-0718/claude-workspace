#!/usr/bin/env node
/**
 * gws-write.mjs — Google Sheets 日本語書き込みヘルパー
 *
 * Bash環境からgws CLIで日本語JSONを送るとShift-JIS変換で文字化けするため、
 * Node.js経由で実行するラッパー。
 *
 * Usage:
 *   node gws-write.mjs <spreadsheetId> <range> <value>
 *
 * Example:
 *   node gws-write.mjs "1kC_w-..." "2026年03月分!G23" "Stripe売上入金"
 */
import { execSync } from 'child_process';

const [,, spreadsheetId, range, value] = process.argv;

if (!spreadsheetId || !range || !value) {
  console.error('Usage: node gws-write.mjs <spreadsheetId> <range> <value>');
  process.exit(1);
}

const params = JSON.stringify({
  spreadsheetId,
  range,
  valueInputOption: 'RAW'
});

const json = JSON.stringify({ values: [[value]] });

try {
  const result = execSync(
    `gws sheets spreadsheets values update --params '${params}' --json '${json}'`,
    { encoding: 'utf-8' }
  );
  console.log('Written successfully:', result.trim());
} catch (err) {
  console.error('Write failed:', err.message);
  process.exit(1);
}
