# Contributing to Bill AI Automation

This repo is a shared workspace for the Bill AI Automation team. It holds strategic context, workshop materials, meeting captures, design artifacts, and project status. Here's how to work in it effectively.

## First Time Here?

1. Read **[docs/status/PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md)** — the single source of truth for "what's happening now"
2. Skim **[docs/status/INDEX-whats-stored-and-next-steps.md](docs/status/INDEX-whats-stored-and-next-steps.md)** — inventory of everything stored
3. Browse **[docs/README.md](docs/README.md)** — explains the folder structure and naming conventions
4. Check **[CHANGELOG.md](CHANGELOG.md)** for recent notable changes

## Conventions

### File Naming

All dated documents use this format:

```
yyyy-mm-dd-description.md
```

Examples: `2026-02-13-workshop-1-run-sheet.md`, `2026-02-16-darryl-strategy-chat.md`

**Living documents** (like PROJECT-STATUS.md and INDEX) are not date-prefixed — they get updated in place.

### Where to Put Things

| Type | Folder | Example |
|------|--------|---------|
| Meeting notes, Slack captures | `docs/meeting-notes/` | `2026-02-12-brett-1on1.md` |
| Workshop prep, run sheets, scored items | `docs/workshop/` | `2026-02-13-workshop-1-top-9-problems.md` |
| Strategic context, briefs, analysis | `docs/strategy/` | `2026-02-10-principal-brief.md` |
| Research, people briefs, how-tos | `docs/reference/` | `2026-02-10-research-links.md` |
| Daily summaries (what happened today) | `docs/ai-daily-journal/` | `2026-02-14.md` |
| Design artifacts, prototypes | `artifacts/` | `walkthrough/` |
| Private/personal notes | `personal-notes/` | *(gitignored — local only)* |

### Keeping Status Current

When something material happens (meeting, decision, new artifact, action item), update **two** things:

1. **[PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md)** — "What's the latest? What's this week? What's open?"
2. **[INDEX](docs/status/INDEX-whats-stored-and-next-steps.md)** — add a row if you created a new doc

Optionally:
- Update the **AI daily journal** (`docs/ai-daily-journal/yyyy-mm-dd.md`) with a summary of the day's discussions.
- Add an entry at the top of **[CHANGELOG.md](CHANGELOG.md)** for notable repo changes (URL fixes, new apps, structure changes).

### Meeting Notes

- Store in `docs/meeting-notes/` as `yyyy-mm-dd-topic.md`
- Include: who was there, what was discussed, decisions, action items
- **Never include Granola transcript links** — strip them before committing
- Split personal reflections into `personal-notes/` (gitignored); keep project facts in `docs/`

### Design Journal

`design-journal.md` at the root is a running log of design thinking and decisions. Use the template at the bottom of the file for new entries:

```markdown
## YYYY-MM-DD

### What happened

### Decisions made

### Open questions

### Next actions
```

## Using AI Assistants (Cursor / Claude Code)

This repo includes `CLAUDE.md` which automatically gives AI assistants project context. If you use Cursor, there are also `.cursor/rules/` files that enforce conventions.

**What this means for you:** Your AI assistant already knows the project goal, stakeholders, timeline, and file structure. You can ask it things like "where are the workshop materials?" or "summarize today's meetings" and it will know where to look.

## Personal Notes

Each team member can have a local `personal-notes/` directory for private working notes. It's in `.gitignore` so it never gets committed. Nothing in the project depends on it.

## Package Manager

Use **bun** (not npm) for any package management:

```bash
bun install        # not npm install
bun run <script>   # not npm run <script>
bun add <pkg>      # not npm add <pkg>
```

## Scripts

| Command | What it does |
|---------|-------------|
| `bun run update-sheet` | Update the Google Sheets opportunity tracker |

Scripts live in `scripts/` and use the Google Sheets API with a service account. See [docs/reference/2026-02-17-google-sheets-automation.md](docs/reference/2026-02-17-google-sheets-automation.md) for setup details.
