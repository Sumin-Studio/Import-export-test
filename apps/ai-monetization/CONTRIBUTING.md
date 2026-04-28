# Contributing to the AI Monetisation workspace

This is a shared workspace for the AI Monetisation (Credit Management) effort. It holds strategic context, meeting captures, source links, research briefs, and prototype thinking. Conventions mirror `~/cmd/payments-agents-team`.

## First Time Here?

1. Read **[docs/status/PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md)** — single source of truth for "what's happening now"
2. Skim **[docs/status/INDEX-whats-stored-and-next-steps.md](docs/status/INDEX-whats-stored-and-next-steps.md)** — inventory of everything stored
3. Browse **[AGENT.md](AGENT.md)** — project framing, stakeholders, timeline
4. Check **[CHANGELOG.md](CHANGELOG.md)** for recent notable changes

## Conventions

### File Naming

All dated documents use:

```
yyyy-mm-dd-description.md
```

**Living documents** (PROJECT-STATUS, INDEX) are not date-prefixed — update in place.

### Where to Put Things

| Type | Folder | Example |
|------|--------|---------|
| Meeting notes, Slack captures | `docs/meeting-notes/` | `2026-04-14-slack-andrew-crosby-kickoff.md` |
| Strategic context, briefs, GTM analysis | `docs/strategy/` | `2026-04-20-celt-gtm-outline.md` |
| Source links, research links, people briefs, how-tos | `docs/reference/` | `2026-04-14-source-links.md` |
| Formal user-research briefs | `docs/research-briefs/` | `2026-04-21-credit-management-research-brief.md` |
| Daily summaries | `docs/ai-daily-journal/` | `2026-04-14.md` |
| XDL design tokens | `.layout/` | `tokens.css`, `layout.md` |
| Cursor AI rules | `.cursor/rules/` | `project-conventions.mdc` |

### Keeping Status Current

When something material happens (meeting, decision, new artifact, action item), update **two** things:

1. **[PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md)**
2. **[INDEX](docs/status/INDEX-whats-stored-and-next-steps.md)** — add a row when you create a new doc

Optional: add an entry to **[CHANGELOG.md](CHANGELOG.md)** for notable workspace changes.

### Meeting Notes

- Format: `yyyy-mm-dd-topic.md` in `docs/meeting-notes/`
- Include: who was there, what was discussed, decisions, action items
- **Never include Granola transcript links** — strip them before committing
- Personal reflections do not belong in this shared workspace; keep those in your own notes

## Package Manager

Use **bun** (not npm) for any package management work that lands here.

## Deployment

This workspace lives inside the `design-internal` repo. Pushes to `main` are auto-deployed by GitHub Actions to Vercel as `ai-monetization-xro.vercel.app`. Currently the deploy serves only a minimal `index.html` landing page that points readers back to this folder on GitHub.
