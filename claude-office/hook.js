#!/usr/bin/env node

// Claude Code hook script
// Reads hook payload from stdin, sends state update to the dashboard server,
// and outputs {} to stdout to approve the tool use.

const SERVER = "http://localhost:3848/set_state";

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf-8");

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.stdout.write("{}");
    return;
  }

  // Build the body to send to the dashboard server
  let body = {};

  // Include session_id if available
  if (payload.session_id) {
    body.session_id = payload.session_id;
  }

  if (payload.event === "Stop" || payload.event === "stop") {
    body.state = "idle";
  } else if (payload.tool_name) {
    body.tool_name = payload.tool_name;
  } else {
    body.state = "idle";
  }

  // Fire-and-forget POST to dashboard server
  try {
    await fetch(SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(2000),
    });
  } catch {
    // Server might not be running — silently ignore
  }

  // Output valid JSON to approve the tool use
  process.stdout.write("{}");
}

main().catch(() => {
  process.stdout.write("{}");
});
