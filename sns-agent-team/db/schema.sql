CREATE TABLE IF NOT EXISTS generations (
  id TEXT PRIMARY KEY,
  theme TEXT NOT NULL,
  target_audience TEXT,
  platforms TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  trend_report TEXT,
  knowledge_report TEXT,
  content_plan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);

CREATE TABLE IF NOT EXISTS outputs (
  id TEXT PRIMARY KEY,
  generation_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (generation_id) REFERENCES generations(id)
);

CREATE TABLE IF NOT EXISTS gpts_config (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  gpts_url TEXT NOT NULL,
  gpts_name TEXT
);
