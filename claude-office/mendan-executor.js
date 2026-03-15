// ============================================
// Mendan Executor
// Claude CLIのstdout（区切りタグ付き）を解析し、
// ナレッジファイルに追記 + git commit + push
// ============================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const FILES = {
  report: path.join(ROOT, 'knowledge/students/面談分析まとめ.md'),
  line: path.join(ROOT, 'knowledge/students/LINE下書きまとめ.md'),
  customer: path.join(ROOT, 'knowledge/students/顧客コンテキスト.md'),
};

// ============================================
// stdout解析
// ============================================
export function parseClaudeOutput(stdout) {
  const extract = (tag) => {
    const re = new RegExp(`===${tag}_START===\\n?([\\s\\S]*?)\\n?===${tag}_END===`);
    const m = stdout.match(re);
    return m ? m[1].trim() : null;
  };

  return {
    report: extract('REPORT'),
    line: extract('LINE'),
    customer: extract('CUSTOMER'),
  };
}

// ============================================
// 目次にリンク追加
// ============================================
function addToTableOfContents(content, tocEntry) {
  // 目次セクション: "- [" で始まる行の最後に追加
  const lines = content.split('\n');
  let lastTocIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('- [')) {
      lastTocIndex = i;
    }
    // 目次の後に空行+区切り線が来たら目次終了
    if (lastTocIndex >= 0 && lines[i].startsWith('---') && i > lastTocIndex) {
      break;
    }
  }

  if (lastTocIndex >= 0) {
    lines.splice(lastTocIndex + 1, 0, tocEntry);
    return lines.join('\n');
  }

  return content;
}

// ============================================
// ファイル追記
// ============================================
function appendToReport(reportText) {
  if (!reportText) return false;

  let content = fs.readFileSync(FILES.report, 'utf-8');

  // 目次エントリを抽出（最初の行 "## 名前（日付）"）
  const headerMatch = reportText.match(/^## (.+?)（(.+?)）/m);
  if (headerMatch) {
    const name = headerMatch[1];
    const date = headerMatch[2];
    const tocEntry = `- [${name}（${date}）](#${name})`;
    content = addToTableOfContents(content, tocEntry);
  }

  // 末尾に追記
  content = content.trimEnd() + '\n\n---\n\n' + reportText + '\n';
  fs.writeFileSync(FILES.report, content, 'utf-8');
  return true;
}

function appendToLine(lineText) {
  if (!lineText) return false;

  let content = fs.readFileSync(FILES.line, 'utf-8');

  // 目次エントリを抽出
  const headerMatch = lineText.match(/^## (.+?)（(.+?)）/m);
  if (headerMatch) {
    const name = headerMatch[1];
    const date = headerMatch[2];
    const tocEntry = `- [${name}（${date}）](#${name})`;
    content = addToTableOfContents(content, tocEntry);
  }

  // 末尾に追記
  content = content.trimEnd() + '\n\n---\n\n' + lineText + '\n';
  fs.writeFileSync(FILES.line, content, 'utf-8');
  return true;
}

function appendToCustomer(customerText) {
  if (!customerText) return false;

  let content = fs.readFileSync(FILES.customer, 'utf-8');

  // 「検討中」セクションの末尾に追加
  const sectionPattern = /^## 検討中/m;
  const nextSectionPattern = /^## (?!検討中)/gm;

  const sectionMatch = sectionPattern.exec(content);
  if (sectionMatch) {
    // 次のセクションの位置を探す
    nextSectionPattern.lastIndex = sectionMatch.index + sectionMatch[0].length;
    const nextMatch = nextSectionPattern.exec(content);

    const insertPos = nextMatch ? nextMatch.index : content.length;
    content = content.slice(0, insertPos).trimEnd() + '\n\n' + customerText + '\n\n' + content.slice(insertPos);
  } else {
    // セクションが見つからなければ末尾に追加
    content = content.trimEnd() + '\n\n' + customerText + '\n';
  }

  // 最終更新日を今日に更新
  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
  content = content.replace(/最終更新.*/, `最終更新: ${today}`);

  fs.writeFileSync(FILES.customer, content, 'utf-8');
  return true;
}

// ============================================
// git commit + push
// ============================================
function gitCommitAndPush(name, date) {
  try {
    const files = Object.values(FILES).map(f => `"${f}"`).join(' ');
    execSync(`git add ${files}`, { cwd: ROOT, stdio: 'pipe' });
    execSync(
      `git commit -m "feat: ${name}さん（${date}）面談分析・LINE下書き・顧客カード自動追記"`,
      { cwd: ROOT, stdio: 'pipe' }
    );
    execSync('git push', { cwd: ROOT, stdio: 'pipe', timeout: 30000 });
    return true;
  } catch (err) {
    console.error('[Executor] git操作エラー:', err.message);
    return false;
  }
}

// ============================================
// メイン実行
// ============================================
export async function executeMendan(claudeOutput, name, date) {
  console.log('[Executor] ファイル書き込み開始');

  const sections = parseClaudeOutput(claudeOutput);

  if (!sections.report && !sections.line && !sections.customer) {
    console.error('[Executor] Claude出力から区切りタグが見つかりません');
    return false;
  }

  const results = {
    report: appendToReport(sections.report),
    line: appendToLine(sections.line),
    customer: appendToCustomer(sections.customer),
  };

  console.log(`[Executor] 書き込み結果: レポート=${results.report} LINE=${results.line} 顧客=${results.customer}`);

  // git commit + push
  const pushed = gitCommitAndPush(name || '不明', date || '不明');
  console.log(`[Executor] git push: ${pushed}`);

  return results.report || results.line || results.customer;
}
