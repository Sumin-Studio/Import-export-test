#!/usr/bin/env node
/**
 * Quick local check when the app looks "unstyled" (plain HTML / default browser fonts).
 * Does not start a server — only inspects the last `next build` output under `.next/`.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = join(root, ".next");
const cssDir = join(nextDir, "static", "css");
const sampleHtml = join(nextDir, "server", "app", "sales", "new-invoice.html");

console.log("[doctor:dev-styles] sales-ai-prototype — unstyled / missing layout checklist\n");

if (!existsSync(nextDir)) {
  console.log("  • No `.next/` folder — run `npm run build` or start dev once so output exists.");
  process.exit(0);
}

if (!existsSync(cssDir)) {
  console.log("  • `.next/static/css/` missing — build may be incomplete or corrupted.");
} else {
  const files = readdirSync(cssDir).filter((f) => f.endsWith(".css"));
  console.log(`  • CSS chunks in .next: ${files.length} file(s) under static/css/`);
  if (files.length === 0) {
    console.log("    (none — unusual for a successful Tailwind build)");
  }
}

if (existsSync(sampleHtml)) {
  const html = readFileSync(sampleHtml, "utf8");
  const sheets = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map((m) => m[1]);
  console.log(`  • Prerendered /sales/new-invoice references ${sheets.length} stylesheet URL(s).`);
  if (sheets.length > 0) {
    console.log(`    Example: ${sheets[0]}`);
  }
} else {
  console.log("  • Sample HTML not found (path may differ after Next upgrade) — ignore.");
}

console.log(`
  If the browser still looks unstyled while dev is running:
  1. DevTools → Network → filter "CSS" — any 404 on /_next/static/css/*.css?
  2. Stop dev server, then: npm run dev:clean   (or: npm run dev / npm run dev:fast — both wipe .next first)
  3. Avoid \`npm run dev:skip-clean\` right after switching webpack ↔ turbopack; run \`clean\` or full \`dev\` first.
`);
