// skills/registry.js
// Skill登録・コマンドルーティングを管理するシンプルなレジストリ

const skills = new Map();     // skillName → skillModule
const commands = new Map();   // commandPattern → skillName
const triggers = new Map();   // triggerType → [skillName]

export function registerSkill(name, module) {
  skills.set(name, module);

  // コマンド登録
  if (module.commands) {
    for (const cmd of module.commands) {
      commands.set(cmd, name);
    }
  }

  // トリガー登録（"message", "schedule" など）
  if (module.triggers) {
    for (const trigger of module.triggers) {
      if (!triggers.has(trigger)) triggers.set(trigger, []);
      triggers.get(trigger).push(name);
    }
  }

  console.log(`[Skills] Registered: ${name} (commands: ${module.commands?.join(", ") || "none"})`);
}

export function findSkillByCommand(text) {
  for (const [pattern, skillName] of commands) {
    if (text.startsWith(pattern) || text.includes(pattern)) {
      return { skill: skills.get(skillName), name: skillName, matchedCommand: pattern };
    }
  }
  return null;
}

export function getSkillsByTrigger(triggerType) {
  const names = triggers.get(triggerType) || [];
  return names.map(n => ({ name: n, skill: skills.get(n) }));
}

export function listSkills() {
  return Array.from(skills.entries()).map(([name, mod]) => ({
    name,
    description: mod.description || "",
    commands: mod.commands || [],
    triggers: mod.triggers || [],
  }));
}
