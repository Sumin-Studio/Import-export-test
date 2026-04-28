---
name: confluence-agent-hub
description: Sync the payments agents hub between this repo, the Next.js app, and Confluence. Use when the user asks to read a Confluence page, update a Confluence page, refresh the shared agent hub, bootstrap a test page tree, or keep repo and Confluence content aligned.
---

# Confluence Agent Hub

## What this skill covers

This repo has a shared Cursor-native Confluence workflow for the four payments agents.

- Local source data lives in `src/data/agent-hub.ts`
- Confluence sync logic lives in `src/lib/confluence/`
- Bootstrap and read scripts live in `scripts/confluence/`
- The internal hub UI lives under `src/app/app/`

## Default workflow

When asked to update the agent hub or its Confluence pages:

1. Update the local source of truth first.
   - For agent summaries, links, focus areas, and update logs, edit `src/data/agent-hub.ts`
   - For broader explanation or onboarding, edit the relevant docs in `docs/`
2. Sync to Confluence with:

```bash
bun run confluence:bootstrap-hub
```

3. If the user wants a specific existing page inspected, read it with:

```bash
bun run confluence:read-page <pageId>
```

4. Prefer `--dry-run` first when the user wants safety or when targeting a new test area:

```bash
bun run confluence:bootstrap-hub --dry-run
```

## Important constraints

- **Read before edit.** Before editing ANY Confluence page (especially the hub root), read the page first so you don’t overwrite layout, column widths, titles, or other manual formatting. Use `bun run confluence:read-page <pageId>` (e.g. hub root: `271924854819`) and inspect `managedSections` and `html` before changing sync logic or running bootstrap.
- The sync is intentionally based on managed sections, not full-page overwrite.
- Manual edits outside the managed markers should be preserved on push.
- Manual edits inside managed sections may be replaced by the repo-managed content on the next sync.
- Credentials come from `CONFLUENCE_USERNAME`, `CONFLUENCE_API_TOKEN`, `CONFLUENCE_URL`, and `CONFLUENCE_SPACE_KEY`, usually via `.env.local`.
- Optional routing controls are `CONFLUENCE_AGENT_HUB_PREFIX` and `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID`.

## Content rules

- **No duplicate page title in synced content.** Do not repeat the Confluence page title as the first heading (H1 or section title) in the body. Start with metadata/overview or a lower-level heading (e.g. `## …`) so the page title is the only top-level title.
- **No repo .md links in Confluence.** Content synced to Confluence must not link to or cite repo file paths (e.g. `docs/*.md`). Confluence readers cannot open them. Either point to the equivalent Confluence page in the hub (e.g. "see the … page under X in this hub") or omit the reference.

## Page naming

By default, the bootstrap script creates or updates:

- `Payments Agents Hub`
- `Payments Agents Hub — Daily log`
- `Payments Agents Hub — Bill Cashflow`
- `Payments Agents Hub — Bill Workflow 1`
- `Payments Agents Hub — Bill Workflow 2`
- `Payments Agents Hub — Onboarding`

To use a different prefix:

```bash
bun run confluence:bootstrap-hub --prefix "My Team Hub"
```

To place the hub under an existing parent page:

```bash
bun run confluence:bootstrap-hub --parent-id "123456789"
```

## When a user says “run this query and put it on the page”

Default approach:

1. Decide which agent page or hub page should receive the update.
2. Add the new content to `src/data/agent-hub.ts` in the relevant section.
3. Preview with `bun run confluence:bootstrap-hub --dry-run`.
4. Sync with `bun run confluence:bootstrap-hub`.
5. Return the resulting page URLs or page IDs if the script created or updated pages.
