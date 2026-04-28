# Confluence connection — technical reference (10 Mar 2026)

**Overview:** Technical reference for repo–Confluence sync (credentials, client, managed sections, agent hub). For implementers and anyone extending the hub.

**Purpose:** Single technical reference for how this repo connects to Confluence. Use this when implementing, debugging, or extending the sync (e.g. new pages, new sections, or different Confluence spaces).

## Connection stack (file map)

| Layer | File | Role |
|-------|------|------|
| **Credentials & config** | `src/lib/confluence/env.ts` | Reads `.env.local` / `.env`; exports `getConfluenceConfig()`, `getConfluenceRuntimeOptions()`; validates username + API token |
| **HTTP client** | `src/lib/confluence/client.ts` | Confluence REST API: Basic auth, `fetch`, JSON; search, get, create, update pages |
| **Content format** | `src/lib/confluence/storage.ts` | Markdown → Confluence storage HTML (headings, bold, links, lists, tables, paragraphs) |
| **Managed sections** | `src/lib/confluence/managed-sections.ts` | `[cursor-managed:key:start/end]` markers; upsert/extract sections; preserves manual content outside blocks |
| **Sync orchestration** | `src/lib/confluence/agent-hub-sync.ts` | Builds hub tree from `agent-hub.ts` + Safety Shield brief; `ensureManagedPage` → find-or-create, diff, update only when needed |
| **Data source** | `src/data/agent-hub.ts` | Hub agents, overview, changelog, doc links |
| **Safety Shield page** | `src/data/safety-shield-working-brief.ts` | Markdown string synced as one managed section to Confluence |
| **CLI entrypoints** | `scripts/confluence/bootstrap-agent-hub.ts`, `read-page.ts` | `bun run confluence:bootstrap-hub`, `bun run confluence:read-page <pageId>` |

## Authentication

- **Method:** HTTP Basic (username + API token).
- **Client side:** `client.ts` builds `Authorization: Basic ${Buffer.from(`${username}:${apiToken}`).toString("base64")}`.
- **Env vars:** `CONFLUENCE_USERNAME`, `CONFLUENCE_API_TOKEN` (required). Optional: `CONFLUENCE_URL` (default `https://xero.atlassian.net/wiki`), `CONFLUENCE_SPACE_KEY` (default personal space key in code).
- **Loading order:** `env.ts` reads `process.env` first, then merges from `.env.local`, then `.env` (later files do not overwrite earlier). No home-directory or global config.

## API usage

- **Base:** `config.baseUrl` (e.g. `https://xero.atlassian.net/wiki`).
- **Endpoints used:**
  - `GET /rest/api/content?spaceKey=&title=` — search by title (used for find-or-create).
  - `GET /rest/api/content/{id}?expand=body.storage,version` — get page HTML and version.
  - `POST /rest/api/content` — create page (type, title, space, ancestors, body.storage).
  - `PUT /rest/api/content/{id}` — update page (version.number + 1, body.storage).
- **Content representation:** `body.storage.representation: "storage"` (Confluence storage XML/HTML).
- **Errors:** Non-2xx response → `throw new Error(\`Confluence request failed (${status}): ${text}\`)`. No retries or backoff in current client.

## Managed-section model

- **Markers:** `[cursor-managed:<key>:start]` and `[cursor-managed:<key>:end]` (e.g. `summary`, `log`, `body`).
- **In storage:** Markers are wrapped in Confluence anchor macros or equivalent so they survive round-trip; `managed-sections.ts` normalizes several wrapper forms for comparison.
- **Sync behavior:** For each page, sync computes desired sections from repo data, fetches current body, extracts existing managed sections, compares normalized HTML; only `PUT`s when content or marker count differs. Manual content outside markers is left intact; content inside markers is replaced by repo content.

## What gets synced (page tree)

1. **Root** — title from prefix (e.g. "Payments Agents Hub"); "Squads" section with the hub table.
2. **Per-agent pages** — one per `hubAgents` entry; sections: Narrative, Supporting context, Narrative changelog, Reference links.
3. **Safety Shield Working Brief** — single section from `safetyShieldWorkingBriefMarkdown`.
4. **Safety Shield — User research and gaps** — single section from `safetyShieldUserResearchAndGapsMarkdown`.
5. **Root (refreshed)** — root page updated again with the latest "Squads" section listing links to all agent pages.

### Safety Shield pages not managed by the hub sync

There are older Safety Shield pages in the XFS space that are **kept for context but are not managed by this repo’s Confluence sync**. They can be edited, moved, or archived manually without affecting the hub:

- **Safety Shield Working Brief (legacy)** — [`XFS-271928755158`](https://xero.atlassian.net/wiki/spaces/XFS/pages/271928755158/Safety+Shield+Working+Brief)
- **Safety Shield — User research and gaps (legacy)** — [`XFS-271928591827`](https://xero.atlassian.net/wiki/spaces/XFS/pages/271928591827/Safety+Shield+User+research+and+gaps)

Optional runtime: `CONFLUENCE_AGENT_HUB_PREFIX`, `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID` (from env or `.env.local`).

## Where to put the hub (moving out of a personal space)

The **default space** in code is a **personal Confluence space** (key `~7120203a284903dee44e3bb59ae3c82b170146` in `src/lib/confluence/env.ts`). With no overrides, the hub root and all child pages (Daily log, Safety Shield, agent pages, etc.) are created in that space — i.e. "Jon's area."

To **move the hub to a team location**:

1. **Pick a team space**  
   Use a shared space where the Payments / Bill AI team has access (e.g. **XFS** for Payments, or the space your team already uses). In Confluence, open that space and note its **space key** (in the space URL or space settings).

2. **Optionally pick a parent page**  
   To nest the hub under an existing page (e.g. "Payments" or "Bill AI" or "Agents"):
   - Open that page in Confluence.
   - Get its **page ID** from the URL (`...pageId=123456789`) or from the page info.

3. **Set env (local and/or CI)**  
   - **`.env.local`** (for local `bun run confluence:bootstrap-hub`):
     - `CONFLUENCE_SPACE_KEY=<team-space-key>` (e.g. `XFS`).
     - `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID=<parent-page-id>` (optional; omit to put the hub root at the space root).
   - **GitHub Actions** (for the scheduled/manual sync): set the same **repository variables** `CONFLUENCE_SPACE_KEY` and `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID` so the workflow targets the same location.

4. **Run the sync**  
   The next `bun run confluence:bootstrap-hub` (or the workflow run) will **create or update** the hub in the **new** space and under the new parent. Pages in the old personal space are **not** moved or deleted; you can archive or leave them.

**Summary:** Set `CONFLUENCE_SPACE_KEY` (and optionally `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID`) to the team space and parent where the hub should live; then run the bootstrap. The repo does not hardcode a team space so the team can choose the right space and parent in Confluence and configure them via env.

**Production:** The hub lives under **XFS → Payments Agents Team** (page ID `271928754915`). Set `CONFLUENCE_SPACE_KEY=XFS` and `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID=271928754915` in `.env.local` and in the repo’s GitHub Actions variables so local and scheduled sync both target this location.

## Scripts and automation

- **Local:** `bun run confluence:bootstrap-hub [--dry-run] [--prefix "…"] [--parent-id "…"]`; `bun run confluence:read-page <pageId>`.
- **GitHub Actions:** `.github/workflows/confluence-agent-hub-sync.yml` — `workflow_dispatch` (inputs: dry_run, title_prefix, parent_page_id) and schedule `0 7 * * *`. Uses secrets `CONFLUENCE_USERNAME`, `CONFLUENCE_API_TOKEN` and vars `CONFLUENCE_URL`, `CONFLUENCE_SPACE_KEY`, `CONFLUENCE_AGENT_HUB_PREFIX`, `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID`. Dry-run is implemented by running the step that passes `--dry-run` when `dry_run` input is true.

## Quick checklist for “super awesome” Confluence work

1. **Read before edit.** Before changing any Confluence page (especially the hub root), read it first so you don't overwrite manual formatting (column widths, title, layout). Use `bun run confluence:read-page <pageId>` — hub root: `271924854819`. Inspect `managedSections` and `html` before editing sync logic or running bootstrap.
2. **Change hub content** → Edit `src/data/agent-hub.ts` (or `safety-shield-working-brief.ts` for that page); run `bun run confluence:bootstrap-hub --dry-run` then `bun run confluence:bootstrap-hub`.
3. **Add a new managed section to a page** → Add a new `ManagedSection` in the right builder in `agent-hub-sync.ts` (e.g. `buildAgentSections`, `buildHubSections`); ensure key is unique and used in start/end markers.
4. **Add a new page to the tree** → Add a new `ensureManagedPage` call in `syncAgentHub()` with the right parent and sections; optionally extend `SyncAgentHubResult` and return it.
5. **Debug what’s in Confluence** → `bun run confluence:read-page <pageId>` to get JSON with `managedSections` and raw `html`.
6. **New space or parent** → Set `CONFLUENCE_SPACE_KEY` and/or `CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID` (env or `.env.local`); use a test prefix first.

## Content rules for synced pages

- Do not duplicate the page title in the first heading of synced content; start with body or a lower-level heading.
- Do not link to or cite repo `.md` paths in Confluence; point to Confluence pages or omit.

For workflow and team conventions, see [2026-03-09-cursor-confluence-agent-hub.md](2026-03-09-cursor-confluence-agent-hub.md) and the skill at `.cursor/skills/confluence-agent-hub/SKILL.md`.
