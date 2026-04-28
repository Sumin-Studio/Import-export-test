import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ToolCallRecord } from "./types.js";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.AGENTS_MCP_SUPABASE_URL;
  const key = process.env.AGENTS_MCP_SUPABASE_KEY;

  if (!url || !key) {
    console.error("[analytics] AGENTS_MCP_SUPABASE_URL and AGENTS_MCP_SUPABASE_KEY required for analytics");
    return null;
  }

  client = createClient(url, key);
  return client;
}

export async function logToolCall(record: ToolCallRecord): Promise<void> {
  const db = getClient();
  if (!db) {
    // Fail open — don't break tool calls if analytics is down
    console.error("[analytics] Supabase not configured, skipping log");
    return;
  }

  const { error } = await db.from("mcp_tool_calls").insert({
    tool_name: record.tool_name,
    user_id: record.user_id,
    team: record.team,
    timestamp: record.timestamp,
    duration_ms: record.duration_ms,
    status: record.status,
    error_message: record.error_message,
    metadata: record.metadata ?? {},
  });

  if (error) {
    console.error("[analytics] Failed to log tool call:", error.message);
  }
}

export async function getUsageStats(days: number = 7) {
  const db = getClient();
  if (!db) return null;

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await db
    .from("mcp_tool_calls")
    .select("tool_name, user_id, status, duration_ms, timestamp")
    .gte("timestamp", since)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("[analytics] Failed to fetch stats:", error.message);
    return null;
  }

  // Aggregate in memory for now
  const tools = new Map<string, { calls: number; errors: number; users: Set<string>; totalMs: number }>();

  for (const row of data ?? []) {
    const entry = tools.get(row.tool_name) ?? { calls: 0, errors: 0, users: new Set(), totalMs: 0 };
    entry.calls++;
    if (row.status === "error") entry.errors++;
    entry.users.add(row.user_id);
    entry.totalMs += row.duration_ms ?? 0;
    tools.set(row.tool_name, entry);
  }

  return Array.from(tools.entries()).map(([name, stats]) => ({
    tool_name: name,
    total_calls: stats.calls,
    unique_users: stats.users.size,
    error_rate: stats.calls > 0 ? (stats.errors / stats.calls * 100).toFixed(1) + "%" : "0%",
    avg_duration_ms: stats.calls > 0 ? Math.round(stats.totalMs / stats.calls) : 0,
  }));
}
