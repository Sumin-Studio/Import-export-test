#!/usr/bin/env bun
/**
 * Prints the hub root content that would be synced to Confluence.
 * No API calls. Use this to verify the front page content before/without running bootstrap.
 *
 *   bun run confluence:preview-hub-root
 */

import { getHubRootSectionsPreview } from "../../src/lib/confluence/agent-hub-sync";

function main() {
  const sections = getHubRootSectionsPreview();
  for (const { title, content } of sections) {
    console.log("\n" + "=".repeat(60));
    console.log("## " + title);
    console.log("=".repeat(60));
    console.log(content);
  }
  console.log("\n");
}

main();
