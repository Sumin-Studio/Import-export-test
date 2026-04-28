#!/usr/bin/env node
/**
 * Scaffold a new XDL-based prototype under apps/{slug}/ using the official
 * xdl-components installer, then register it in apps.json.
 *
 * The xdl-components CLI is interactive (template prompts). This script runs
 * it with stdio inherited so you can complete the wizard in your terminal.
 *
 * Usage:
 *   node scripts/scaffold-xdl-prototype.mjs <slug> \
 *     --name "Display name" \
 *     --description "Short description" \
 *     [--authors "Full Name,Other Name"]  (defaults to git config user.name)
 *
 * Extra arguments after `--` are forwarded to pnpm dlx (e.g. future CLI flags).
 *
 * Prerequisites: pnpm on PATH, network access to GitHub for the package.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const APPS_DIR = join(REPO_ROOT, "apps");
const APPS_JSON = join(REPO_ROOT, "apps.json");
const XDL_PACKAGE = "github:xero-internal-actions-poc/xdl-components";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function usage() {
  console.error(`
Usage:
  node scripts/scaffold-xdl-prototype.mjs <slug> \\
    --name "Display name" \\
    --description "Short description" \\
    [--authors "Author One,Author Two"] \\
    [--latest-update "YYYY MMM DD"]

  Optional: append -- <extra args passed to pnpm dlx ... xdl-components>

Example:
  node scripts/scaffold-xdl-prototype.mjs my-xdl-demo \\
    --name "My XDL demo" \\
    --description "Exploring checkout flows" \\
    --authors "Robb Schiller"
`);
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  let i = 0;
  while (i < argv.length) {
    const a = argv[i];
    if (a === "--") {
      flags.extra = argv.slice(i + 1);
      break;
    }
    if (a.startsWith("--")) {
      const key = a.slice(2).replace(/-/g, "");
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        flags[key] = true;
        i += 1;
        continue;
      }
      flags[key] = next;
      i += 2;
      continue;
    }
    positional.push(a);
    i += 1;
  }
  return { positional, flags };
}

function defaultLatestUpdate() {
  const d = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
}

function getGitUserName() {
  const r = spawnSync("git", ["config", "user.name"], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
}

function ensurePnpm() {
  const r = spawnSync("pnpm", ["--version"], {
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (r.error || r.status !== 0) {
    console.error("Error: pnpm is required on PATH for this scaffold.");
    process.exit(1);
  }
}

function main() {
  const raw = process.argv.slice(2);
  const { positional, flags } = parseArgs(raw);

  if (flags.help || flags.h || positional.length < 1) {
    usage();
    process.exit(flags.help || flags.h ? 0 : 1);
  }

  const slug = positional[0];
  const name = flags.name;
  const description = flags.description;
  const authorsRaw = flags.authors;

  if (!SLUG_RE.test(slug)) {
    console.error(
      "Error: slug must be kebab-case (lowercase letters, numbers, single hyphens).",
    );
    process.exit(1);
  }
  if (!name || !description) {
    console.error("Error: --name and --description are required.");
    usage();
    process.exit(1);
  }

  const authors = authorsRaw
    ? authorsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [getGitUserName()].filter(Boolean);

  if (authors.length === 0) {
    console.error("Error: could not determine author. Pass --authors explicitly.");
    process.exit(1);
  }

  const latestUpdate =
    typeof flags.latestupdate === "string" ? flags.latestupdate : defaultLatestUpdate();

  const appDir = join(APPS_DIR, slug);

  if (existsSync(appDir) && readdirSync(appDir).length > 0) {
    console.error(`Error: ${appDir} already exists and is not empty.`);
    process.exit(1);
  }

  let registry = JSON.parse(readFileSync(APPS_JSON, "utf8"));
  if (Object.prototype.hasOwnProperty.call(registry, slug)) {
    console.error(`Error: apps.json already has an entry for "${slug}".`);
    process.exit(1);
  }

  ensurePnpm();

  if (!existsSync(appDir)) {
    mkdirSync(appDir, { recursive: true });
  }

  const dlxArgs = ["dlx", XDL_PACKAGE, ...(flags.extra ?? [])];

  console.log(`\nRunning in ${appDir}:\n  pnpm ${dlxArgs.join(" ")}\n`);
  console.log(
    "Complete the interactive prompts from xdl-components. When it finishes successfully, this script will update apps.json.\n",
  );

  const result = spawnSync("pnpm", dlxArgs, {
    cwd: appDir,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`\nxdl-components exited with code ${result.status}. apps.json was not modified.`);
    process.exit(result.status ?? 1);
  }

  registry = JSON.parse(readFileSync(APPS_JSON, "utf8"));
  if (Object.prototype.hasOwnProperty.call(registry, slug)) {
    console.warn(
      `Warning: apps.json already contains "${slug}" — skipping registry write (merge manually if needed).`,
    );
  } else {
    registry[slug] = {
      name,
      description,
      latestUpdate,
      vercelProjectId: null,
      url: null,
      tags: ["prototype"],
      authors,
    };
    writeFileSync(APPS_JSON, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
    console.log(`\nAdded "${slug}" to apps.json.`);
  }

  const branch = `add-${slug}`;
  console.log(`
Next steps:
  1. Review and commit: git add apps/${slug} apps.json && git commit -m "Add ${slug} XDL prototype"
  2. Use a branch for the PR (if not already): git checkout -b ${branch}
  3. Open a PR: https://github.com/xero-internal-actions-poc/design-internal/pull/new/${encodeURIComponent(branch)}

CI will deploy a preview on the PR and production when merged to main.
`);
}

main();
