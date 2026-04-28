#!/usr/bin/env node
/**
 * Removes `.next` (Next.js build + dev output). Cross-platform (Windows/macOS/Linux).
 * Stale or mixed webpack/Turbopack caches here cause 500s, missing chunks, and unstyled pages in dev.
 */
import { existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = join(root, ".next");

if (!existsSync(nextDir)) {
  process.exit(0);
}

rmSync(nextDir, { recursive: true, force: true });
console.log(
  "[clean-next] removed .next — plain/unstyled pages after switching webpack ↔ turbopack? run: bun run dev:clean"
);
