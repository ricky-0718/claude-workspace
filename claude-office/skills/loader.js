// skills/loader.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { registerSkill } from "./registry.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadAllSkills() {
  const entries = fs.readdirSync(__dirname, { withFileTypes: true });
  let loaded = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const indexPath = path.join(__dirname, entry.name, "index.js");
    if (!fs.existsSync(indexPath)) continue;

    try {
      const module = await import(`file://${indexPath.replace(/\\/g, "/")}`);
      if (!module.default || !module.default.name) {
        console.warn(`[Skills] ${entry.name}/index.js: missing default export with 'name'`);
        continue;
      }
      registerSkill(module.default.name, module.default);
      loaded++;
    } catch (err) {
      console.error(`[Skills] Failed to load ${entry.name}:`, err.message);
    }
  }

  console.log(`[Skills] ${loaded} skill(s) loaded`);
}
