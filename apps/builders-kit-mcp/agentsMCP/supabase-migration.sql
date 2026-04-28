-- agentsMCP: Usage analytics tables
-- Run this in your Supabase SQL editor

-- Tool call log — every MCP tool invocation
CREATE TABLE IF NOT EXISTS mcp_tool_calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  user_id TEXT NOT NULL,
  team TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  duration_ms INTEGER,
  status TEXT NOT NULL CHECK (status IN ('success', 'error')),
  error_message TEXT,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_mcp_tool_calls_tool ON mcp_tool_calls(tool_name);
CREATE INDEX IF NOT EXISTS idx_mcp_tool_calls_user ON mcp_tool_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_mcp_tool_calls_time ON mcp_tool_calls(timestamp);
CREATE INDEX IF NOT EXISTS idx_mcp_tool_calls_team ON mcp_tool_calls(team);

-- Tool registry — which tools exist and who owns them
CREATE TABLE IF NOT EXISTS mcp_tool_registry (
  tool_name TEXT PRIMARY KEY,
  description TEXT,
  service TEXT NOT NULL,
  owner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed registry with our tools
INSERT INTO mcp_tool_registry (tool_name, description, service, owner) VALUES
  ('figma_get_tokens', 'Extract design tokens from Figma file', 'figma', 'design-team'),
  ('figma_get_components', 'List components from Figma file', 'figma', 'design-team'),
  ('figma_get_file_structure', 'Get page/frame hierarchy from Figma', 'figma', 'design-team'),
  ('confluence_search', 'Search Confluence via CQL', 'confluence', 'design-team'),
  ('confluence_get_page', 'Get Confluence page content', 'confluence', 'design-team'),
  ('confluence_list_spaces', 'List Confluence spaces', 'confluence', 'design-team'),
  ('transcribe_file', 'Transcribe local audio/video file', 'transcription', 'design-team'),
  ('transcribe_url', 'Transcribe audio/video from URL', 'transcription', 'design-team'),
  ('userdata_query', 'Query user research data', 'user-data', 'design-team'),
  ('userdata_get_insights', 'Get insights from user research', 'user-data', 'design-team'),
  ('agents_mcp_usage_stats', 'Get server usage statistics', 'meta', 'platform')
ON CONFLICT (tool_name) DO UPDATE SET
  description = EXCLUDED.description,
  service = EXCLUDED.service;

-- === ANALYTICS VIEWS ===

-- Daily active users per tool
CREATE OR REPLACE VIEW mcp_dau AS
SELECT
  DATE(timestamp) AS day,
  tool_name,
  COUNT(DISTINCT user_id) AS unique_users,
  COUNT(*) AS total_calls
FROM mcp_tool_calls
GROUP BY DATE(timestamp), tool_name
ORDER BY day DESC, total_calls DESC;

-- Weekly active users
CREATE OR REPLACE VIEW mcp_wau AS
SELECT
  DATE_TRUNC('week', timestamp)::DATE AS week_start,
  COUNT(DISTINCT user_id) AS unique_users,
  COUNT(*) AS total_calls,
  COUNT(*) FILTER (WHERE status = 'error') AS errors
FROM mcp_tool_calls
GROUP BY DATE_TRUNC('week', timestamp)
ORDER BY week_start DESC;

-- Tool popularity (last 30 days)
CREATE OR REPLACE VIEW mcp_tool_popularity AS
SELECT
  tool_name,
  COUNT(*) AS total_calls,
  COUNT(DISTINCT user_id) AS unique_users,
  ROUND(AVG(duration_ms)) AS avg_duration_ms,
  ROUND(COUNT(*) FILTER (WHERE status = 'error') * 100.0 / NULLIF(COUNT(*), 0), 1) AS error_rate_pct
FROM mcp_tool_calls
WHERE timestamp > NOW() - INTERVAL '30 days'
GROUP BY tool_name
ORDER BY total_calls DESC;

-- Team usage breakdown
CREATE OR REPLACE VIEW mcp_team_usage AS
SELECT
  COALESCE(team, 'unknown') AS team,
  tool_name,
  COUNT(*) AS calls,
  COUNT(DISTINCT user_id) AS users
FROM mcp_tool_calls
WHERE timestamp > NOW() - INTERVAL '30 days'
GROUP BY team, tool_name
ORDER BY team, calls DESC;

-- Error log (recent errors for debugging)
CREATE OR REPLACE VIEW mcp_recent_errors AS
SELECT
  timestamp,
  tool_name,
  user_id,
  error_message,
  metadata
FROM mcp_tool_calls
WHERE status = 'error'
ORDER BY timestamp DESC
LIMIT 100;
