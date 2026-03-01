require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Claude Code CLIのパスを自動検出
function findClaudeExe() {
  // APPDATA が未設定の場合のフォールバック（複数候補を試行）
  const candidates = [
    process.env.APPDATA,
    process.env.USERPROFILE && path.join(process.env.USERPROFILE, 'AppData', 'Roaming'),
    process.env.HOME && path.join(process.env.HOME, 'AppData', 'Roaming'),
    'C:/Users/newgo/AppData/Roaming',
  ].filter(Boolean);

  for (const appData of candidates) {
    const claudeDir = path.join(appData, 'Claude', 'claude-code');
    if (!fs.existsSync(claudeDir)) continue;

    const versions = fs.readdirSync(claudeDir)
      .filter(d => fs.statSync(path.join(claudeDir, d)).isDirectory())
      .sort()
      .reverse();

    for (const ver of versions) {
      const exe = path.join(claudeDir, ver, 'claude.exe');
      if (fs.existsSync(exe)) return exe;
    }
  }
  return null;
}

const config = {
  // Asana設定
  ASANA_PAT: process.env.ASANA_PAT,
  ASANA_PROJECT_GID: process.env.ASANA_PROJECT_GID,

  // AsanaセクションのGID
  SECTION_WAITING: process.env.SECTION_WAITING,
  SECTION_APPROVAL: process.env.SECTION_APPROVAL,
  SECTION_RUNNING: process.env.SECTION_RUNNING,
  SECTION_DONE: process.env.SECTION_DONE,
  SECTION_ERROR: process.env.SECTION_ERROR,

  // サーバー設定
  PORT: parseInt(process.env.PORT || '3000', 10),
  POLL_INTERVAL_MS: 30 * 1000,

  // Claude Code CLI
  CLAUDE_EXE: findClaudeExe(),
  CLAUDE_WORKING_DIR: path.resolve(__dirname, '..'),
  CLAUDE_MAX_BUDGET_USD: process.env.CLAUDE_MAX_BUDGET_USD || '2.00',

  // 検証
  validate() {
    const required = [
      ['ASANA_PAT', this.ASANA_PAT],
      ['ASANA_PROJECT_GID', this.ASANA_PROJECT_GID],
      ['SECTION_WAITING', this.SECTION_WAITING],
      ['SECTION_APPROVAL', this.SECTION_APPROVAL],
      ['SECTION_RUNNING', this.SECTION_RUNNING],
      ['SECTION_DONE', this.SECTION_DONE],
      ['SECTION_ERROR', this.SECTION_ERROR],
    ];

    const missing = required.filter(([, val]) => !val).map(([name]) => name);
    if (missing.length > 0) {
      console.error('=== 設定エラー ===');
      console.error('以下の必須設定が .env ファイルにありません:');
      missing.forEach(name => console.error(`  - ${name}`));
      console.error('\n.env.example を参考に .env ファイルを設定してください。');
      process.exit(1);
    }

    if (!this.CLAUDE_EXE) {
      console.error('=== 設定エラー ===');
      console.error('Claude Code CLI が見つかりません。');
      console.error('Claude Code がインストールされているか確認してください。');
      process.exit(1);
    }

    console.log('[Config] 設定OK');
    console.log(`  Claude CLI: ${this.CLAUDE_EXE}`);
    console.log(`  作業ディレクトリ: ${this.CLAUDE_WORKING_DIR}`);
    console.log(`  予算上限: $${this.CLAUDE_MAX_BUDGET_USD}/タスク`);
  }
};

module.exports = config;
