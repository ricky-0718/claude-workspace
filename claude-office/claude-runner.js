// ============================================
// Claude CLI Execution Engine
// claude -p でヘッドレス実行し、結果をJSON保存
// ============================================
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESULTS_DIR = path.join(__dirname, "data", "results");

if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });

const CLAUDE_CLI = "C:/Users/newgo/.local/bin/claude.exe";
const DEFAULT_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const DEFAULT_MAX_TURNS = 10;

/**
 * Claude CLI をヘッドレスモードで実行
 * @param {string} prompt - 実行するプロンプト
 * @param {object} opts - オプション
 * @param {number} opts.timeout - タイムアウト(ms)
 * @param {number} opts.maxTurns - 最大ターン数
 * @param {string[]} opts.allowedTools - 許可するツール
 * @returns {Promise<{ok: boolean, result?: string, error?: string, duration: number}>}
 */
export async function runClaude(prompt, opts = {}) {
  const timeout = opts.timeout || DEFAULT_TIMEOUT;
  const maxTurns = opts.maxTurns || DEFAULT_MAX_TURNS;
  const startTime = Date.now();

  const args = [
    "-p", prompt,
    "--output-format", "text",
    "--max-turns", String(maxTurns),
  ];

  if (opts.allowedTools && opts.allowedTools.length > 0) {
    for (const tool of opts.allowedTools) {
      args.push("--allowedTools", tool);
    }
  }

  // 入れ子セッション防止: CLAUDECODE と CLAUDE_CODE_ENTRYPOINT のみ削除
  const env = { ...process.env };
  delete env.CLAUDECODE;
  delete env.CLAUDE_CODE_ENTRYPOINT;

  return new Promise((resolve) => {
    const child = spawn(CLAUDE_CLI, args, {
      stdio: ["ignore", "pipe", "pipe"],
      env,
      cwd: path.join(__dirname, ".."),
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({
        ok: false,
        error: "Timeout after " + (timeout / 1000) + "s",
        duration: Date.now() - startTime,
      });
    }, timeout);

    child.on("close", (code) => {
      clearTimeout(timer);
      const duration = Date.now() - startTime;

      if (code === 0) {
        resolve({ ok: true, result: stdout.trim(), duration });
      } else {
        resolve({
          ok: false,
          error: stderr.trim() || `Exit code ${code}`,
          result: stdout.trim(),
          duration,
        });
      }
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({
        ok: false,
        error: err.message,
        duration: Date.now() - startTime,
      });
    });
  });
}

/**
 * 結果をファイルに保存
 */
export function saveResult(taskId, result) {
  const filePath = path.join(RESULTS_DIR, `${taskId}.json`);
  const data = {
    taskId,
    ...result,
    savedAt: new Date().toISOString(),
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return filePath;
}

/**
 * 保存済みの結果を取得
 */
export function getResult(taskId) {
  const filePath = path.join(RESULTS_DIR, `${taskId}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}
