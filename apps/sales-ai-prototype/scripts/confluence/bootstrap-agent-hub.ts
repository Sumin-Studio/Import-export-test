#!/usr/bin/env bun

import { syncAgentHub } from "../../src/lib/confluence/agent-hub-sync";

function readFlag(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }

  return process.argv[index + 1];
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function main() {
  const titlePrefix = readFlag("--prefix");
  const parentPageId = readFlag("--parent-id");
  const dryRun = hasFlag("--dry-run");
  const result = await syncAgentHub({ titlePrefix, parentPageId, dryRun });

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
