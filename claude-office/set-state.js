#!/usr/bin/env node

// CLI tool for manual state changes and instruction management
// Usage:
//   node set-state.js <state> [detail]           — set state
//   node set-state.js instructions               — show pending instructions
//   node set-state.js instructions done <id>     — mark instruction done

const VALID_STATES = ["idle", "writing", "researching", "executing", "syncing", "error"];
const BASE = "http://localhost:3848";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage:");
    console.error("  node set-state.js <state> [detail]");
    console.error("  node set-state.js instructions");
    console.error("  node set-state.js instructions done <id>");
    console.error(`\nValid states: ${VALID_STATES.join(", ")}`);
    process.exit(1);
  }

  // --- Instructions subcommand ---
  if (args[0] === "instructions") {
    if (args[1] === "done" && args[2]) {
      // Mark instruction as done
      try {
        const res = await fetch(`${BASE}/instructions/${args[2]}/done`, { method: "POST" });
        if (!res.ok) {
          console.error(`Error: ${res.status} ${res.statusText}`);
          process.exit(1);
        }
        const data = await res.json();
        console.log(`Marked as done: "${data.instruction.text}"`);
      } catch (err) {
        console.error(`Failed to connect: ${err.message}`);
        process.exit(1);
      }
      return;
    }

    // List pending instructions
    try {
      const res = await fetch(`${BASE}/instructions`);
      if (!res.ok) {
        console.error(`Error: ${res.status}`);
        process.exit(1);
      }
      const all = await res.json();
      const pending = all.filter((i) => i.status === "pending");
      if (pending.length === 0) {
        console.log("No pending instructions.");
        return;
      }
      console.log(`\n--- ${pending.length} pending instruction(s) ---\n`);
      for (const inst of pending) {
        const date = new Date(inst.createdAt).toLocaleString("ja-JP");
        console.log(`[${inst.id}] ${date}`);
        console.log(`  ${inst.text}\n`);
      }
    } catch (err) {
      console.error(`Failed to connect: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  // --- State change ---
  const state = args[0];
  const detail = args.slice(1).join(" ") || "";

  if (!VALID_STATES.includes(state)) {
    console.error(`Invalid state: "${state}"`);
    console.error(`Valid states: ${VALID_STATES.join(", ")}`);
    process.exit(1);
  }

  try {
    const res = await fetch(`${BASE}/set_state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, detail }),
    });

    if (!res.ok) {
      console.error(`Server returned ${res.status}: ${res.statusText}`);
      process.exit(1);
    }

    const data = await res.json();
    console.log(`State set to "${data.state}" (detail: "${data.detail}")`);
    console.log(`Agent: ${data.name}`);
    console.log(`Updated at: ${data.updatedAt}`);
  } catch (err) {
    console.error(`Failed to connect: ${err.message}`);
    console.error("Is the server running? Start it with: npm start");
    process.exit(1);
  }
}

main();
