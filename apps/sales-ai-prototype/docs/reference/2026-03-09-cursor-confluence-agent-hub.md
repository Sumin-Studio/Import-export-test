# Cursor Confluence Agent Hub (Mar 9, 2026)

**Purpose:** Make the existing Confluence capability usable from Cursor and shareable with the rest of the team, not just local Claude Code workflows.

## What was added

- A repo-native Confluence client in `src/lib/confluence/`
- A managed-section sync model so repo-owned blocks can be updated without replacing the whole page
- A first internal hub at `/app` with child pages for the four agents
- A project skill at `.cursor/skills/confluence-agent-hub/SKILL.md`
- Bun scripts for creating/updating the hub tree and inspecting a page

## Source of truth

The first shared source of truth is:

- `src/data/agent-hub.ts` for agent summaries, links, focus areas, and update log entries

The Next.js hub and the Confluence sync scripts both read from that file.

## Commands

Bootstrap or refresh the test page tree:

```bash
bun run confluence:bootstrap-hub
```

Use a different title prefix:

```bash
bun run confluence:bootstrap-hub --prefix "Payments Agents Hub"
```

Preview changes without writing:

```bash
bun run confluence:bootstrap-hub --dry-run
```

Create the tree under an existing parent page:

```bash
bun run confluence:bootstrap-hub --parent-id "123456789"
```

Inspect a Confluence page and extract managed sections:

```bash
bun run confluence:read-page <pageId>
```

## Confluence setup

The scripts expect:

- `CONFLUENCE_USERNAME`
- `CONFLUENCE_API_TOKEN`
- `CONFLUENCE_URL`
- `CONFLUENCE_SPACE_KEY`

The shared expected setup is:

- copy `.env.example` to `.env.local`
- add the Confluence credentials there for local runs
- optionally set `CONFLUENCE_AGENT_HUB_PREFIX`
- optionally set `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID`

The code no longer depends on a Jon-specific home-directory fallback.

## How the sync works

The sync uses explicit marker blocks inside Confluence storage-format HTML:

- `[cursor-managed:summary:start]`
- `[cursor-managed:summary:end]`

Each repo-owned section is replaced independently. This means:

- Manual edits outside those sections should survive a sync
- Repo-driven updates stay predictable
- The page can still carry human-authored content around the managed blocks

## Current limitation

This is not yet a perfect arbitrary rich-text round-trip system.

- Managed sections are the safe boundary
- Pulling a page is currently best for inspection and debugging
- If people heavily edit inside the managed blocks, the repo sync will still win on the next push

That is acceptable for the first test tree, but it should be validated before treating the model as the final long-term Confluence editing experience.

## Suggested team workflow

1. Update `src/data/agent-hub.ts`
2. Run `bun run confluence:bootstrap-hub --dry-run`
3. If the preview looks right, run `bun run confluence:bootstrap-hub`
4. Review the resulting pages in Confluence
5. Keep free-form human notes outside the managed sections until the richer round-trip model is proven

## Shared automation path

The recommended team path is GitHub Actions:

- workflow file: `.github/workflows/confluence-agent-hub-sync.yml`
- secrets: `CONFLUENCE_USERNAME`, `CONFLUENCE_API_TOKEN`
- repository variables: `CONFLUENCE_URL`, `CONFLUENCE_SPACE_KEY`, `CONFLUENCE_AGENT_HUB_PREFIX`, optional `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID`

This gives the team a single shared execution path for nightly refresh instead of depending on one local machine.

## Current status

- The managed-section sync is now idempotent in local and live verification.
- The app and sync code are shareable from the repo.
- The remaining organizational step is agreeing on the production target space / parent page and setting the shared repository secrets and variables.

## Open questions

- Is managed-section preservation sufficient, or do we need richer page diff/merge?
- Should nightly automation run from GitHub Actions, a local cron job, or another shared service?
- Should NotebookLM consume repo markdown exports, Confluence pages, or a dedicated daily digest artifact?
