# AI Monetisation

Shared workspace for the **AI Monetisation — Credit Management** effort. PM: Andrew Crosby. Design: Jon Bell (joined 2026-04-14).

This is an **Astro + Starlight** docs site. Markdown lives in `src/content/docs/`. Conventions mirror `~/cmd/payments-agents-team`.

## Start here

- **[AGENT.md](AGENT.md)** — project framing, stakeholders, timeline, strategic constraints
- **[Project status](src/content/docs/status/project-status.md)** — current state, open decisions
- **[Inventory & next steps](src/content/docs/status/inventory.md)** — index of every doc here plus open checklist
- **[Source links](src/content/docs/reference/2026-04-14-source-links.md)** — the four canonical source links
- **[Kickoff Slack thread](src/content/docs/meeting-notes/2026-04-14-slack-andrew-crosby-kickoff.md)**
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — naming conventions, where to put things

## Run locally

```bash
bun install
bun run dev   # http://localhost:4321
```

## Folder layout

```
src/content/docs/
  index.md              # Splash homepage
  status/               # Living docs (project-status, inventory)
  meeting-notes/        # yyyy-mm-dd-*.md
  reference/            # Source links, people briefs
astro.config.mjs        # Starlight config (sidebar)
src/content.config.ts   # Starlight content collection
.cursor/rules/          # Cursor AI rules
.layout/                # XDL design tokens
vercel.json             # framework: astro
```

## Deploy

Auto-deployed via GitHub Actions to `ai-monetization-xro.vercel.app` when merged to `main`.
