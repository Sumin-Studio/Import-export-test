# Confluence Scripts

These scripts create, refresh, and inspect the shared payments agents hub in Confluence.

## Who this is for

Anyone on the team who needs to:

- update the shared agent hub from this repo
- inspect what the sync wrote to Confluence
- run the same workflow from Cursor without depending on Jon's local Claude setup

## First-time setup

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `CONFLUENCE_USERNAME`
   - `CONFLUENCE_API_TOKEN`
   - `CONFLUENCE_URL`
   - `CONFLUENCE_SPACE_KEY`
3. Optionally set:
   - `CONFLUENCE_AGENT_HUB_PREFIX`
   - `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID`

Use a personal space or safe test area first. Do not point shared automation at a team-facing page tree until the structure looks right.

To **move the hub out of a personal space** into a team space: set `CONFLUENCE_SPACE_KEY` to the team space key (e.g. XFS) and optionally `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID` to a parent page ID. See [Where to put the hub](../docs/reference/2026-03-10-confluence-connection-technical-reference.md#where-to-put-the-hub-moving-out-of-a-personal-space) in the technical reference.

## Source of truth

The shared hub content comes from:

- `src/data/agent-hub.ts`

Both the app UI and the Confluence sync logic read from that file.

## Commands

Preview whether anything would change:

```bash
bun run confluence:bootstrap-hub --dry-run
```

Create or refresh the hub tree:

```bash
bun run confluence:bootstrap-hub
```

Override the page title prefix:

```bash
bun run confluence:bootstrap-hub --prefix "Payments Agents Hub"
```

Create the tree under an existing parent page:

```bash
bun run confluence:bootstrap-hub --parent-id "123456789"
```

Read back a page and print its managed sections:

```bash
bun run confluence:read-page <pageId>
```

Rename hub child pages to short titles (one-off, after changing sync):

```bash
bun run confluence:rename-hub-child-pages
```

Delete the five squad child pages (moves to Space Trash; add `--purge` to script to purge):

```bash
bun run confluence:delete-squad-pages
```

## Safe editing model

The sync only replaces repo-managed sections, marked in Confluence with:

- `[cursor-managed:...:start]`
- `[cursor-managed:...:end]`

Rules for humans:

- Manual edits outside the managed blocks should survive a sync.
- Manual edits inside the managed blocks will be replaced on the next push.
- If a page needs permanent free-form notes, keep those above, below, or between managed blocks.

## Shared automation

The repo includes a GitHub Actions workflow at `.github/workflows/confluence-agent-hub-sync.yml`.

To enable it, add these repository secrets:

- `CONFLUENCE_USERNAME`
- `CONFLUENCE_API_TOKEN`

And these repository variables:

- `CONFLUENCE_URL`
- `CONFLUENCE_SPACE_KEY`
- `CONFLUENCE_AGENT_HUB_PREFIX`
- `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID` (optional)

Once configured, the workflow can be run manually or on a schedule for nightly refresh.
