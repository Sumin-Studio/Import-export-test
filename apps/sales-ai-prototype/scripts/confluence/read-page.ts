#!/usr/bin/env bun

import { getPageById, getConfluencePageUrl } from "../../src/lib/confluence/client";
import { extractManagedSections } from "../../src/lib/confluence/managed-sections";
import { getConfluenceConfig } from "../../src/lib/confluence/env";

async function main() {
  const pageId = process.argv[2];

  if (!pageId) {
    console.error("Usage: bun run scripts/confluence/read-page.ts <pageId>");
    process.exit(1);
  }

  const config = await getConfluenceConfig();
  const page = await getPageById(pageId, config);

  console.log(
    JSON.stringify(
      {
        id: page.id,
        title: page.title,
        version: page.version.number,
        url: getConfluencePageUrl(page.id, config.baseUrl),
        managedSections: extractManagedSections(page.body.storage.value ?? ""),
        html: page.body.storage.value,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
