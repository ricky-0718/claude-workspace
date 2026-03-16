import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import os from "os";
import { execSync, spawn } from "child_process";
import config from "./config.js"; // .env → process.env 反映
import { getMessages } from "./chatwork-poller.js";
import { getDrafts, updateDraftStatus } from "./draft-generator.js";
import { startPipeline, stopPipeline, getPipelineStats } from "./pipeline.js";
import { runClaude } from "./claude-runner.js";
import { loadAllSkills } from "./skills/loader.js";
import { listSkills } from "./skills/registry.js";
import { listCustomers, getCustomer, upsertCustomer } from "./memory/customer-store.js";
import { verifySignature, handleWebhookEvents } from "./webhook/line-handler.js";
import { listApprovals, getLatestPending } from "./approval/manager.js";
import { startInvoicePoller } from "./invoice-poller.js";
import { startSlackListener } from "./slack-listener.js";
import { runMorningBriefing } from "./morning-briefing-slack.js";
import { startSalaryScheduler } from "./salary-task-creator.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3848;

// ---------------------------------------------------------------------------
// Data persistence
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(__dirname, "data");
const AGENTS_FILE = path.join(DATA_DIR, "agents.json");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity.json");
const INSTRUCTIONS_FILE = path.join(DATA_DIR, "instructions.json");
const NOTIFY_FILE = path.join(os.homedir(), ".claude", "office-notifications.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function loadJSON(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return fallback;
  }
}

function saveJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed to save ${file}:`, e.message);
  }
}

// ---------------------------------------------------------------------------
// State stores (loaded from disk)
// ---------------------------------------------------------------------------
// agents: { [session_id]: { name, state, detail, color, updatedAt, toolCounts } }
const agents = new Map(Object.entries(loadJSON(AGENTS_FILE, {})));
// activity: [{ agent, state, detail, time }]
let activityLog = loadJSON(ACTIVITY_FILE, []);
// instructions: [{ id, text, createdAt, status }]
let instructions = loadJSON(INSTRUCTIONS_FILE, []);

function persistAgents() {
  saveJSON(AGENTS_FILE, Object.fromEntries(agents));
}

function persistActivity() {
  saveJSON(ACTIVITY_FILE, activityLog);
}

function persistInstructions() {
  saveJSON(INSTRUCTIONS_FILE, instructions);
  // Also write notification file for statusline
  const pending = instructions.filter((i) => i.status === "pending").length;
  saveJSON(NOTIFY_FILE, { pending, updatedAt: new Date().toISOString() });
}

// ---------------------------------------------------------------------------
// Tool name → state mapping
// ---------------------------------------------------------------------------
const TOOL_STATE_MAP = {
  Edit: "writing",
  Write: "writing",
  NotebookEdit: "writing",
  Grep: "researching",
  Glob: "researching",
  Read: "researching",
  Agent: "researching",
  Bash: "executing",
  TaskCreate: "executing",
  TaskUpdate: "executing",
  WebFetch: "syncing",
  WebSearch: "syncing",
};

// Tool → counting category
const TOOL_CATEGORY = {
  Edit: "code",
  Write: "code",
  NotebookEdit: "code",
  Grep: "research",
  Glob: "research",
  Read: "research",
  Agent: "research",
  Bash: "execute",
  TaskCreate: "execute",
  TaskUpdate: "execute",
  WebFetch: "comm",
  WebSearch: "comm",
};

// Category → auto name & color
const CATEGORY_NAMES = {
  code: { name: "コード班", color: "#4A90D9" },
  research: { name: "調査班", color: "#6B8E23" },
  execute: { name: "実行班", color: "#DAA520" },
  comm: { name: "通信班", color: "#9370DB" },
  mixed: { name: "総合班", color: "#E8956A" },
};

function determineNameAndColor(toolCounts) {
  const entries = Object.entries(toolCounts || {});
  if (entries.length === 0) return CATEGORY_NAMES.mixed;
  entries.sort((a, b) => b[1] - a[1]);
  const top = entries[0];
  if (top[1] <= 0) return CATEGORY_NAMES.mixed;
  return CATEGORY_NAMES[top[0]] || CATEGORY_NAMES.mixed;
}

// ---------------------------------------------------------------------------
// Agent management
// ---------------------------------------------------------------------------
const OFFLINE_MS = 5 * 60 * 1000; // 5 minutes
const IDLE_MS = 30_000; // 30 seconds
const idleTimers = new Map();

function getOrCreateAgent(sessionId) {
  if (!sessionId) sessionId = "default";
  if (!agents.has(sessionId)) {
    agents.set(sessionId, {
      name: "総合班",
      state: "idle",
      detail: "",
      color: "#E8956A",
      updatedAt: new Date().toISOString(),
      toolCounts: {},
    });
  }
  return agents.get(sessionId);
}

function setAgentState(sessionId, state, detail = "", toolName = null) {
  const agent = getOrCreateAgent(sessionId);
  const prevState = agent.state;

  agent.state = state;
  agent.detail = detail;
  agent.updatedAt = new Date().toISOString();

  // Track tool counts
  if (toolName) {
    const cat = TOOL_CATEGORY[toolName];
    if (cat) {
      agent.toolCounts[cat] = (agent.toolCounts[cat] || 0) + 1;
      const info = determineNameAndColor(agent.toolCounts);
      agent.name = info.name;
      agent.color = info.color;
    }
  }

  persistAgents();

  // Activity log
  if (prevState !== state) {
    activityLog.unshift({
      agent: agent.name,
      agentId: sessionId,
      state,
      detail,
      time: new Date().toISOString(),
    });
    if (activityLog.length > 100) activityLog = activityLog.slice(0, 100);
    persistActivity();
  }

  // Reset idle timer
  resetIdleTimer(sessionId);
}

function resetIdleTimer(sessionId) {
  if (idleTimers.has(sessionId)) clearTimeout(idleTimers.get(sessionId));
  const agent = agents.get(sessionId);
  if (agent && agent.state !== "idle") {
    idleTimers.set(
      sessionId,
      setTimeout(() => {
        if (agent.state !== "idle") {
          agent.state = "idle";
          agent.detail = "";
          agent.updatedAt = new Date().toISOString();
          persistAgents();
          activityLog.unshift({
            agent: agent.name,
            agentId: sessionId,
            state: "idle",
            detail: "auto-idle",
            time: new Date().toISOString(),
          });
          if (activityLog.length > 100) activityLog = activityLog.slice(0, 100);
          persistActivity();
        }
      }, IDLE_MS)
    );
  }
}

function getAgentsArray() {
  const now = Date.now();
  const result = [];
  for (const [id, a] of agents) {
    const elapsed = now - new Date(a.updatedAt).getTime();
    result.push({
      id,
      name: a.name,
      state: a.state,
      detail: a.detail,
      color: a.color,
      updatedAt: a.updatedAt,
      online: elapsed < OFFLINE_MS,
    });
  }
  return result;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// LINE Webhook route BEFORE express.json() (needs raw body for signature verification)
app.post("/webhook/line", express.raw({ type: "*/*" }), async (req, res) => {
  const signature = req.headers["x-line-signature"];
  const rawBody = typeof req.body === "string" ? req.body : req.body.toString();

  if (!verifySignature(rawBody, signature, config.line.channelSecret)) {
    console.warn("[Webhook] Invalid signature");
    return res.status(403).send("Invalid signature");
  }

  const body = JSON.parse(rawBody);

  // LINE は 200 を即返さないとリトライする
  res.status(200).send("OK");

  // イベント処理（非同期）
  if (body.events && body.events.length > 0) {
    handleWebhookEvents(body.events).catch(err => {
      console.error("[Webhook] Unhandled error:", err);
    });
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------------------------------------------------------
// Routes: Status
// ---------------------------------------------------------------------------
app.get("/status", (_req, res) => {
  const agentsArr = getAgentsArray();
  const pending = instructions.filter((i) => i.status === "pending").length;
  res.json({ agents: agentsArr, pendingInstructions: pending });
});

app.post("/set_state", (req, res) => {
  const body = req.body || {};
  const sessionId = body.session_id || "default";

  if (body.state) {
    setAgentState(sessionId, body.state, body.detail || "");
  } else if (body.tool_name) {
    const mapped = TOOL_STATE_MAP[body.tool_name] || "researching";
    setAgentState(sessionId, mapped, body.tool_name, body.tool_name);
  } else {
    setAgentState(sessionId, "idle");
  }

  const agent = agents.get(sessionId);
  res.json({
    ok: true,
    state: agent.state,
    detail: agent.detail,
    name: agent.name,
    updatedAt: agent.updatedAt,
  });
});

// ---------------------------------------------------------------------------
// Routes: Activity log
// ---------------------------------------------------------------------------
app.get("/activity", (_req, res) => {
  res.json(activityLog);
});

// ---------------------------------------------------------------------------
// Routes: Instructions
// ---------------------------------------------------------------------------
app.post("/instructions", (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }
  const instruction = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  instructions.unshift(instruction);
  persistInstructions();
  res.json({ ok: true, instruction });
});

app.get("/instructions", (_req, res) => {
  res.json(instructions);
});

app.get("/instructions/count", (_req, res) => {
  const count = instructions.filter((i) => i.status === "pending").length;
  res.json({ count });
});

app.post("/instructions/:id/done", (req, res) => {
  const inst = instructions.find((i) => i.id === req.params.id);
  if (!inst) return res.status(404).json({ error: "not found" });
  inst.status = "done";
  inst.doneAt = new Date().toISOString();
  persistInstructions();
  res.json({ ok: true, instruction: inst });
});

// ---------------------------------------------------------------------------
// Routes: Messages (LINE via Chatwork)
// ---------------------------------------------------------------------------
app.get("/api/messages", (_req, res) => {
  const limit = parseInt(_req.query.limit) || 50;
  res.json(getMessages(limit));
});

// ---------------------------------------------------------------------------
// Routes: Drafts (reply suggestions)
// ---------------------------------------------------------------------------
app.get("/api/drafts", (_req, res) => {
  const limit = parseInt(_req.query.limit) || 50;
  res.json(getDrafts(limit));
});

app.post("/api/drafts/:id/approve", (req, res) => {
  const draft = updateDraftStatus(req.params.id, "approved");
  if (!draft) return res.status(404).json({ error: "not found" });
  res.json({ ok: true, draft });
});

app.post("/api/drafts/:id/reject", (req, res) => {
  const draft = updateDraftStatus(req.params.id, "rejected");
  if (!draft) return res.status(404).json({ error: "not found" });
  res.json({ ok: true, draft });
});

// ---------------------------------------------------------------------------
// Routes: Pipeline control
// ---------------------------------------------------------------------------
app.get("/api/pipeline/stats", (_req, res) => {
  res.json(getPipelineStats());
});

app.post("/api/pipeline/start", (_req, res) => {
  startPipeline();
  res.json({ ok: true, status: "started" });
});

app.post("/api/pipeline/stop", (_req, res) => {
  stopPipeline();
  res.json({ ok: true, status: "stopped" });
});

// ---------------------------------------------------------------------------
// Routes: Skills
// ---------------------------------------------------------------------------
app.get("/api/skills", (_req, res) => {
  res.json(listSkills());
});

// ---------------------------------------------------------------------------
// Routes: Customers (memory)
// ---------------------------------------------------------------------------
app.get("/api/customers", (_req, res) => {
  res.json(listCustomers());
});

app.get("/api/customers/:name", (req, res) => {
  const customer = getCustomer(decodeURIComponent(req.params.name));
  if (!customer) return res.status(404).json({ error: "not found" });
  res.json(customer);
});

app.post("/api/customers/:name/notes", (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { notes, status, tags } = req.body || {};
  const updates = {};
  if (notes !== undefined) updates.notes = notes;
  if (status !== undefined) updates.status = status;
  if (tags !== undefined) updates.tags = tags;
  const customer = upsertCustomer(name, updates);
  res.json({ ok: true, customer });
});

// ---------------------------------------------------------------------------
// Routes: Approvals
// ---------------------------------------------------------------------------
app.get("/api/approvals", (_req, res) => {
  res.json(listApprovals());
});

app.get("/api/approvals/pending", (_req, res) => {
  const pending = getLatestPending();
  res.json(pending || { none: true });
});

// ---------------------------------------------------------------------------
// Routes: Claude CLI (ad-hoc execution)
// ---------------------------------------------------------------------------
app.post("/api/claude/run", async (req, res) => {
  const { prompt, maxTurns, timeout } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  const result = await runClaude(prompt, {
    maxTurns: maxTurns || 5,
    timeout: timeout || 120000,
    allowedTools: [],
  });
  res.json(result);
});

// ---------------------------------------------------------------------------
// Routes: Tunnel URL
// ---------------------------------------------------------------------------
app.get("/api/tunnel-url", (_req, res) => {
  const urlFile = path.join(DATA_DIR, "url.txt");
  try {
    const url = fs.readFileSync(urlFile, "utf-8").trim();
    res.json({ ok: true, url });
  } catch {
    res.json({ ok: false, url: null, error: "url.txt not found" });
  }
});

app.get("/api/tunnel-log", (_req, res) => {
  const logFile = path.join(DATA_DIR, "tunnel.log");
  try {
    const log = fs.readFileSync(logFile, "utf-8");
    res.type("text/plain").send(log);
  } catch {
    res.status(404).send("tunnel.log not found");
  }
});

// ---------------------------------------------------------------------------
// Routes: Morning Briefing
// ---------------------------------------------------------------------------
app.post("/api/briefing", async (_req, res) => {
  try {
    const result = await runMorningBriefing();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Routes: Deploy (remote git pull + restart)
// ---------------------------------------------------------------------------
app.post("/api/deploy", (req, res) => {
  const secret = req.body?.secret;
  if (!secret || secret !== process.env.DEPLOY_SECRET) {
    return res.status(403).json({ error: "invalid secret" });
  }

  try {
    const repoRoot = path.resolve(__dirname, "..");
    const pullResult = execSync("git pull", {
      cwd: repoRoot,
      encoding: "utf-8",
      timeout: 30000,
    });

    res.json({ ok: true, pull: pullResult.trim(), restarting: true });

    // restart.batをバックグラウンドで起動してからサーバー終了
    setTimeout(() => {
      spawn("cmd", ["/c", path.join(__dirname, "restart.bat")], {
        detached: true,
        stdio: "ignore",
      }).unref();
      setTimeout(() => process.exit(0), 500);
    }, 1000);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, async () => {
  console.log(`Claude Office server running on http://localhost:${PORT}`);
  console.log(`Agents: ${agents.size}, Activity: ${activityLog.length}, Instructions: ${instructions.length}`);

  // Load Skills plugin system
  await loadAllSkills();
  console.log(`Skills: ${listSkills().length}`);

  // Start the Chatwork polling pipeline
  startPipeline();

  // Start invoice auto-save (every 2 hours)
  startInvoicePoller(2 * 60 * 60 * 1000);

  // Start Slack bidirectional listener
  startSlackListener();

  // Schedule morning briefing (daily 8:00 JST)
  scheduleMorningBriefing();

  // Start salary task auto-creator (checks every 6h, creates on 1st-3rd)
  startSalaryScheduler();
});

// ---------------------------------------------------------------------------
// Cron: Morning Briefing (毎朝 8:00 JST)
// ---------------------------------------------------------------------------
function scheduleMorningBriefing() {
  function msUntilNext8am() {
    const now = new Date();
    const next = new Date(now);
    next.setHours(8, 0, 0, 0);
    if (now >= next) next.setDate(next.getDate() + 1);
    return next - now;
  }

  function schedule() {
    const ms = msUntilNext8am();
    const hours = (ms / 3600000).toFixed(1);
    console.log(`[Cron] Next morning briefing in ${hours}h`);

    setTimeout(async () => {
      try {
        await runMorningBriefing();
      } catch (err) {
        console.error("[Cron] Morning briefing error:", err.message);
      }
      schedule();
    }, ms);
  }

  schedule();
}
