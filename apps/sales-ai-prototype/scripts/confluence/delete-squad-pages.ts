#!/usr/bin/env bun
/**
 * One-off: delete the five Confluence squad child pages (moved to trash).
 * Run after sync no longer creates these pages.
 *
 * Usage: bun run scripts/confluence/delete-squad-pages.ts [--purge]
 *   --purge  Permanently delete from trash (default: move to trash only)
 */

import { deletePage, searchPagesByTitle } from "../../src/lib/confluence/client";
import { getConfluenceConfig } from "../../src/lib/confluence/env";

const SQUAD_PAGE_TITLES = [
  "Payments Agents Hub — Bill Cash Flow Discover",
  "Payments Agents Hub — Bill Workflow 1 Discover",
  "Payments Agents Hub — Bill Workflow 2 Explore",
  "Payments Agents Hub — Approvals Foundations",
  "Payments Agents Hub — Smart Payment Request Agent",
  "Cursor Agent Hub Test — Bill Cashflow",
  "Cursor Agent Hub Test — Bill Workflow 1",
  "Cursor Agent Hub Test — Bill Workflow 2",
  "Cursor Agent Hub Test — Onboarding",
  "Cursor Agent Hub Test — Onboarding Explore",
];

async function main() {
  const config = await getConfluenceConfig();
  const purge = process.argv.includes("--purge");

  console.log(purge ? "Permanently deleting squad pages from trash…\n" : "Moving squad pages to trash…\n");

  for (const title of SQUAD_PAGE_TITLES) {
    const matches = await searchPagesByTitle(title, { config });
    if (matches.length === 0) {
      console.log(`Skip (not found): ${title}`);
      continue;
    }

    const pageId = matches[0].id;
    await deletePage(pageId, { purge, config });
    console.log(`${purge ? "Purged" : "Trashed"}: ${title} (${pageId})`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
