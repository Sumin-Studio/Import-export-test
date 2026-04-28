#!/usr/bin/env bun
/**
 * One-off: rename Confluence hub child pages to short titles (no prefix).
 * Run once so sync can then use "Daily log" and "Safety Shield Working Brief".
 *
 * Usage: bun run scripts/confluence/rename-hub-child-pages.ts
 */

import { getPageById, searchPagesByTitle, updatePage } from "../../src/lib/confluence/client";
import { getConfluenceConfig } from "../../src/lib/confluence/env";

const RENAMES: { oldTitle: string; newTitle: string }[] = [
  { oldTitle: "Payments Agents Hub — Daily log", newTitle: "Daily log" },
  { oldTitle: "Payments Agents Hub — Safety Shield Working Brief", newTitle: "Safety Shield Working Brief" },
];

async function main() {
  const config = await getConfluenceConfig();

  console.log("Renaming hub child pages to short titles…\n");

  for (const { oldTitle, newTitle } of RENAMES) {
    const matches = await searchPagesByTitle(oldTitle, { config });
    if (matches.length === 0) {
      console.log(`Skip (not found): ${oldTitle}`);
      continue;
    }

    const pageId = matches[0].id;
    const page = await getPageById(pageId, config);
    const content = page.body.storage.value ?? "";

    await updatePage({
      pageId,
      title: newTitle,
      content,
      version: page.version.number,
      config,
    });
    console.log(`Renamed: "${oldTitle}" → "${newTitle}" (${pageId})`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
