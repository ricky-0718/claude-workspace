import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '..', 'data', 'sns-agent.db');

let db = null;

/**
 * SQLiteデータベースを初期化し、スキーマを適用する
 * @returns {Database} better-sqlite3のデータベースインスタンス
 */
export function initDB() {
  // dataディレクトリがなければ作成
  mkdirSync(join(__dirname, '..', 'data'), { recursive: true });

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // スキーマ適用
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  return db;
}

/**
 * 新しい企画（generation）を作成する
 * @param {Object} params
 * @param {string} params.theme - テーマ
 * @param {string} [params.targetAudience] - ターゲット層
 * @param {string[]} params.platforms - プラットフォーム一覧
 * @returns {string} 作成されたgenerationのID
 */
export function createGeneration({ theme, targetAudience, platforms }) {
  const id = uuidv4();
  const platformsStr = Array.isArray(platforms) ? platforms.join(',') : platforms;

  db.prepare(`
    INSERT INTO generations (id, theme, target_audience, platforms)
    VALUES (?, ?, ?, ?)
  `).run(id, theme, targetAudience || null, platformsStr);

  return id;
}

/**
 * generationのステータスと付随データを更新する
 * @param {string} id - generationのID
 * @param {string} status - 新しいステータス
 * @param {Object} [data] - 追加データ（trend_report, knowledge_report, content_plan等）
 */
export function updateGenerationStatus(id, status, data = {}) {
  const fields = ['status = ?'];
  const values = [status];

  if (data.trendReport !== undefined) {
    fields.push('trend_report = ?');
    values.push(data.trendReport);
  }
  if (data.knowledgeReport !== undefined) {
    fields.push('knowledge_report = ?');
    values.push(data.knowledgeReport);
  }
  if (data.contentPlan !== undefined) {
    fields.push('content_plan = ?');
    values.push(data.contentPlan);
  }
  if (status === 'completed') {
    fields.push('completed_at = CURRENT_TIMESTAMP');
  }

  values.push(id);

  db.prepare(`
    UPDATE generations SET ${fields.join(', ')} WHERE id = ?
  `).run(...values);
}

/**
 * SNS出力を保存する
 * @param {Object} params
 * @param {string} params.generationId - 紐づくgenerationのID
 * @param {string} params.platform - プラットフォーム名
 * @param {string} params.content - コンテンツ本文
 * @returns {string} 作成されたoutputのID
 */
export function saveOutput({ generationId, platform, content }) {
  const id = uuidv4();

  db.prepare(`
    INSERT INTO outputs (id, generation_id, platform, content)
    VALUES (?, ?, ?, ?)
  `).run(id, generationId, platform, content);

  return id;
}

/**
 * 企画を1件取得する
 * @param {string} id - generationのID
 * @returns {Object|undefined} generationオブジェクト
 */
export function getGeneration(id) {
  return db.prepare('SELECT * FROM generations WHERE id = ?').get(id);
}

/**
 * 企画一覧を新しい順で取得する
 * @param {number} [limit=20] - 取得件数
 * @returns {Object[]} generationオブジェクトの配列
 */
export function listGenerations(limit = 20) {
  return db.prepare('SELECT * FROM generations ORDER BY created_at DESC LIMIT ?').all(limit);
}

/**
 * 企画に紐づくSNS出力一覧を取得する
 * @param {string} generationId - generationのID
 * @returns {Object[]} outputオブジェクトの配列
 */
export function getOutputs(generationId) {
  return db.prepare('SELECT * FROM outputs WHERE generation_id = ? ORDER BY created_at').all(generationId);
}
