#!/usr/bin/env node
/**
 * Stops any process listening on the given TCP port (default 3000).
 * Avoids EADDRINUSE when restarting Next without manually killing the old dev server.
 * Unix/macOS: lsof + kill. Windows: no-op with a hint (install WSL or free the port manually).
 */
import { execSync } from "node:child_process";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const port = Number(process.argv[2] ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("[free-port] usage: node scripts/free-port.mjs [port]");
  process.exit(1);
}

if (process.platform === "win32") {
  console.log("[free-port] Windows: skip automatic free; close the process on the port or use WSL.");
  process.exit(0);
}

let pids;
try {
  pids = execSync(`lsof -ti :${port}`, { encoding: "utf8" }).trim();
} catch {
  process.exit(0);
}

if (!pids) process.exit(0);

for (const pid of pids.split(/\s+/).filter(Boolean)) {
  try {
    execSync(`kill -9 ${pid}`, { stdio: "ignore" });
  } catch {
    /* ignore */
  }
}

console.log(`[free-port] freed port ${port}`);
// Brief pause so the OS releases the socket before Next binds.
await delay(1000);
