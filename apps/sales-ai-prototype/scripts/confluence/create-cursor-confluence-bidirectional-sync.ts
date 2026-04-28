#!/usr/bin/env bun

import {
  findOrCreatePage,
  getConfluencePageUrl,
  getPageById,
  updatePage,
} from "../../src/lib/confluence/client";
import {
  getConfluenceConfig,
  getConfluenceRuntimeOptions,
  type ConfluenceConfig,
} from "../../src/lib/confluence/env";
import {
  type ManagedSection,
  upsertManagedSections,
} from "../../src/lib/confluence/managed-sections";

function readFlag(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }
  return process.argv[index + 1];
}

interface EnsureDocArgs {
  title: string;
  parentId?: string;
  config: ConfluenceConfig;
}

async function ensureBidirectionalSyncDoc(args: EnsureDocArgs) {
  const sections: ManagedSection[] = [
    {
      key: "body",
      format: "markdown",
      content: BIDIRECTIONAL_SYNC_MARKDOWN.trim(),
    },
  ];

  const initialContent = upsertManagedSections("", sections);
  const ensured = await findOrCreatePage({
    title: args.title,
    content: initialContent,
    parentId: args.parentId,
    config: args.config,
  });

  const existingPage = await getPageById(ensured.pageId, args.config);
  const existingHtml = existingPage.body.storage.value ?? "";
  const mergedContent = upsertManagedSections(existingHtml, sections);

  const shouldUpdate = mergedContent.trim() !== existingHtml.trim();

  let page = existingPage;
  if (shouldUpdate) {
    page = await updatePage({
      pageId: existingPage.id,
      title: args.title,
      content: mergedContent,
      version: existingPage.version.number,
      parentId: args.parentId,
      config: args.config,
    });
  }

  return {
    pageId: page.id,
    title: page.title,
    url: getConfluencePageUrl(page.id, args.config.baseUrl),
    created: ensured.created,
    updated: shouldUpdate,
  };
}

const BIDIRECTIONAL_SYNC_MARKDOWN = `
## Cursor prompt you can copy-paste

Copy everything in this section into Cursor in your own repo. You do not need access to any other repository; the instructions below are generic and tell the agent what to build from scratch.

You are helping me set up a Confluence and Cursor bi-directional sync for this repo. I want the repo to be the single source of truth for content that also appears on Confluence. Confluence should show that content so people can read and add free-form notes around it. I also want to be able to pull edits from Confluence back into the repo when needed.

Please walk me through step by step and make changes directly in this repo.

Step 1 — Create the Confluence client and managed-section helpers.

Check whether a folder like \`src/lib/confluence/\` (or equivalent for your project) exists. If not, create it and add small modules. An env module should read Confluence username, API token, base URL, space key, and optional parent page ID from environment variables and expose something like \`getConfluenceConfig()\`. A client module should wrap the Confluence REST API: search by title, get page by ID, create page, update page. A managed-sections module should know how to insert and extract blocks of content inside Confluence storage HTML using markers such as \`[cursor-managed:body:start]\` and \`[cursor-managed:body:end]\`. A storage module should convert simple markdown into Confluence storage HTML (headings, paragraphs, links, tables). Keep the code small and readable.

Step 2 — Choose a single source-of-truth data file.

Pick one data file in your repo that will hold the canonical text for your hub or docs. For example a file like \`src/data/hub-content.ts\` or \`content/docs-hub.ts\` depending on your structure. It should hold the overview text, any list of items or sections, and the markdown blocks you want to appear in Confluence. Nothing else should duplicate those strings; other code should import from this file.

Step 3 — Add a bootstrap script (repo to Confluence).

Create a script under a folder like \`scripts/confluence/\` (e.g. \`bootstrap-hub.ts\` or \`sync-docs.ts\`). It should read from the data file from Step 2, use the Confluence client and managed-sections helpers from Step 1, and for each page you care about find or create the Confluence page under a configurable parent page ID, then update only the content between the managed-section markers and leave everything else on the page unchanged. Wire it in \`package.json\` (e.g. \`confluence:bootstrap\` or \`confluence:sync\`) and support \`--dry-run\` (print changes without calling the API) and options like \`--parent-id\` and \`--prefix\` to override parent page and title prefix.

Step 4 — Add a read-page script (Confluence to repo).

Create a script that accepts a Confluence page ID as an argument, fetches the page via the client, uses the managed-sections helper to extract each named block, and prints JSON with page id, title, version, url, and a \`managedSections\` object keyed by section name. Wire it in \`package.json\` (e.g. \`confluence:read-page\`). Use it for inspection and when you want to copy updated text from Confluence back into the repo.

Step 5 — Document required environment variables.

Document that the scripts need at least Confluence username, API token, base URL, and space key (e.g. \`CONFLUENCE_USERNAME\`, \`CONFLUENCE_API_TOKEN\`, \`CONFLUENCE_URL\`, \`CONFLUENCE_SPACE_KEY\`), plus optional values like a hub prefix and parent page ID. Engineers should put these in \`.env.local\` (from a \`.env.example\` if you have one) and in CI secrets or variables if you run sync in automation. Do not ask the user to paste secrets into chat.

Step 6 — Give me a concrete first-run checklist.

Produce a short numbered checklist for someone with nothing configured yet: create or update the data file, add the Confluence helpers, add the bootstrap and read scripts and \`package.json\` entries, create \`.env.local\` with credentials, run the bootstrap with \`--dry-run\` then for real, open the Confluence pages to confirm managed sections updated and manual content is preserved, and optionally run the read-page script on one page to see the managed sections as JSON.

Step 7 — Add a Cursor skill for this pattern.

Create a skill file (e.g. under \`.cursor/skills/\`) that tells future agents where the source-of-truth data lives, which scripts to run for sync and for reading a page, and how managed sections work. Keep it short so anyone on the team can follow the pattern.

---

## Q&A: How this sync works

**What are we trying to do?**

The repo is the source of truth for content; Confluence is a readable surface. Scripts push repo content into managed sections on Confluence pages. A read script can pull those sections back when you want to bring Confluence edits into the repo. Everything else on the Confluence page (notes, layout) stays under human control.

**What is a managed section?**

A managed section is a block of page content that the repo owns. It is wrapped in markers in the Confluence storage HTML (e.g. \`[cursor-managed:body:start]\` and \`[cursor-managed:body:end]\`). The bootstrap script only replaces the content between those markers; it never wipes the whole page. Notes and formatting outside the markers are preserved.

**Where does the truth live in the repo?**

In one place only: a data file (e.g. \`src/data/hub-content.ts\` or similar) that holds the overview, section text, and any markdown you sync to Confluence. The app and the sync scripts both read from that file. Do not repeat the Confluence page title as the first heading in the body; avoid linking to repo file paths in synced content—link to other Confluence pages instead.

**How do we push from repo to Confluence?**

The bootstrap script reads the data file, builds markdown or HTML for each managed section, converts it to Confluence storage format, and uses the API to find or create each page and update only the marked blocks. Run it with \`--dry-run\` first to see what would change, then run it for real. Check in Confluence that managed sections updated and manual content is still there.

**How do we pull from Confluence into the repo?**

Run the read-page script with a page ID. It fetches the page and prints the managed sections as JSON. Use that output to copy updated text back into your data file or constants when you decide Confluence edits should become canonical. This is a manual step so repo history stays clear.

**When do we set up tokens and env vars?**

Once the scripts exist, add the required Confluence variables to \`.env.local\` and, if you use CI, to repository secrets or variables. Do not paste tokens in chat. Use a dedicated bot user for automation so page history shows who changed what.

**How does Cursor know what to do?**

A Cursor skill file documents where the data lives, which scripts to run (\`confluence:bootstrap\`, \`confluence:read-page\` or whatever you named them), and the managed-section rules. With that, any agent in the repo can sync safely without relying on one person's setup.
`;

async function main() {
  const config = await getConfluenceConfig();
  const runtime = await getConfluenceRuntimeOptions();
  const explicitParentId = readFlag("--parent-id");
  const parentId = explicitParentId ?? runtime.parentPageId;

  const title = "Cursor-Confluence Bi-directional Sync";

  const result = await ensureBidirectionalSyncDoc({
    title,
    parentId,
    config,
  });

  console.log(
    JSON.stringify(
      {
        ...result,
        parentId,
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
