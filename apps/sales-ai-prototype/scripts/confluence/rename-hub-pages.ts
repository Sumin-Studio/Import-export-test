#!/usr/bin/env bun
/**
 * One-off: rename Confluence hub pages from "Cursor Agent Hub Test" to "Payments Agents Hub".
 * Run once to fix existing page titles; after that the normal sync uses the new default.
 *
 * Usage: bun run scripts/confluence/rename-hub-pages.ts
 */

import { hubAgents } from "../../src/data/agent-hub";
import { getPageById, searchPagesByTitle, updatePage } from "../../src/lib/confluence/client";
import { getConfluenceConfig } from "../../src/lib/confluence/env";

const OLD_PREFIX = "Cursor Agent Hub Test";
const NEW_PREFIX = "Payments Agents Hub";

function buildOldTitles(): string[] {
  return [
    OLD_PREFIX,
    `${OLD_PREFIX} — Daily log`,
    ...hubAgents.map((a) => `${OLD_PREFIX} — ${a.pageTitleSuffix}`),
    `${OLD_PREFIX} — Safety Shield Working Brief`,
  ];
}

async function main() {
  const config = await getConfluenceConfig();
  const oldTitles = buildOldTitles();

  console.log(`Renaming pages from "${OLD_PREFIX}" to "${NEW_PREFIX}"…\n`);

  for (const oldTitle of oldTitles) {
    const newTitle = oldTitle.replace(OLD_PREFIX, NEW_PREFIX);
    if (oldTitle === newTitle) continue;

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
