#!/usr/bin/env bun
/**
 * Apply the Supabase migration for agentsMCP analytics tables.
 *
 * Since we can't run raw DDL through PostgREST, this script needs
 * the DATABASE_URL (direct Postgres connection) or you can paste the
 * SQL from supabase-migration.sql into the Supabase SQL Editor.
 *
 * Usage:
 *   bun run scripts/migrate.ts
 *
 * Or paste supabase-migration.sql into:
 *   https://supabase.com/dashboard/project/stmbjgygayliaaaqiqrz/sql
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env
const envPath = resolve(import.meta.dir, "../.env");
const envContent = readFileSync(envPath, "utf8");
const env: Record<string, string> = {};
for (const line of envContent.split("\n")) {
  const idx = line.indexOf("=");
  if (idx > 0) {
    env[line.slice(0, idx)] = line.slice(idx + 1).trim();
  }
}

const url = env.AGENTS_MCP_SUPABASE_URL;
const key = env.AGENTS_MCP_SUPABASE_KEY;

if (!url || !key) {
  console.error("Missing AGENTS_MCP_SUPABASE_URL or AGENTS_MCP_SUPABASE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

// Test connection
console.log("Testing Supabase connection...");
const { data, error } = await supabase.from("mcp_tool_calls").select("id").limit(1);

if (error && error.code === "42P01") {
  // Table doesn't exist yet — expected
  console.log("Table mcp_tool_calls doesn't exist yet (expected).");
  console.log("");
  console.log("⚠️  PostgREST can't run DDL (CREATE TABLE). You need to run the migration SQL manually.");
  console.log("");
  console.log("Option 1: Paste supabase-migration.sql into the Supabase SQL Editor:");
  console.log(`  https://supabase.com/dashboard/project/stmbjgygayliaaaqiqrz/sql`);
  console.log("");
  console.log("Option 2: Use psql with DATABASE_URL:");
  console.log("  psql $DATABASE_URL -f supabase-migration.sql");
  console.log("");

  const sqlPath = resolve(import.meta.dir, "../supabase-migration.sql");
  const sql = readFileSync(sqlPath, "utf8");
  console.log("--- Migration SQL (copy this) ---");
  console.log(sql);
} else if (error) {
  console.error("Unexpected error:", error);
} else {
  console.log("✓ Table mcp_tool_calls already exists!");

  // Try inserting a test record
  const testRecord = {
    tool_name: "_migration_test",
    user_id: "migrate-script",
    status: "success",
    duration_ms: 0,
    metadata: { test: true },
  };

  const { error: insertError } = await supabase.from("mcp_tool_calls").insert(testRecord);
  if (insertError) {
    console.error("Insert test failed:", insertError.message);
  } else {
    console.log("✓ Insert test passed — analytics pipeline works!");
    // Clean up test record
    await supabase.from("mcp_tool_calls").delete().eq("tool_name", "_migration_test");
    console.log("✓ Cleaned up test record");
  }
}
