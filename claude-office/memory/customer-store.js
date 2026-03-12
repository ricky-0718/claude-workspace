// memory/customer-store.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CUSTOMERS_DIR = path.join(__dirname, "..", "data", "customers");

if (!fs.existsSync(CUSTOMERS_DIR)) fs.mkdirSync(CUSTOMERS_DIR, { recursive: true });

function customerKey(lineName) {
  // ファイル名に使える形に変換
  return lineName.replace(/[<>:"/\\|?*]/g, "_").substring(0, 50);
}

function customerPath(lineName) {
  return path.join(CUSTOMERS_DIR, `${customerKey(lineName)}.json`);
}

export function getCustomer(lineName) {
  try {
    return JSON.parse(fs.readFileSync(customerPath(lineName), "utf-8"));
  } catch {
    return null;
  }
}

export function upsertCustomer(lineName, updates) {
  const existing = getCustomer(lineName) || {
    lineName,
    createdAt: new Date().toISOString(),
    conversations: [],
    notes: "",
    status: "unknown",  // unknown, inquiry, applicant, enrolled, alumni
    tags: [],
  };

  const merged = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  fs.writeFileSync(customerPath(lineName), JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}

export function addConversation(lineName, entry) {
  const customer = getCustomer(lineName) || {
    lineName,
    createdAt: new Date().toISOString(),
    conversations: [],
    notes: "",
    status: "unknown",
    tags: [],
  };

  customer.conversations.push({
    ...entry,
    timestamp: new Date().toISOString(),
  });

  // 最新50件のみ保持
  if (customer.conversations.length > 50) {
    customer.conversations = customer.conversations.slice(-50);
  }

  customer.lastContactAt = new Date().toISOString();
  customer.updatedAt = new Date().toISOString();
  fs.writeFileSync(customerPath(lineName), JSON.stringify(customer, null, 2), "utf-8");
  return customer;
}

export function listCustomers() {
  try {
    const files = fs.readdirSync(CUSTOMERS_DIR).filter(f => f.endsWith(".json"));
    return files.map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(CUSTOMERS_DIR, f), "utf-8"));
      } catch {
        return null;
      }
    }).filter(Boolean).sort((a, b) =>
      new Date(b.lastContactAt || 0) - new Date(a.lastContactAt || 0)
    );
  } catch {
    return [];
  }
}
