# CLAUDE.md

This file provides guidance to AI assistants (Claude Code, Cursor, etc.) when working on the Bill AI Automation project. It is intended for **any team member** — not specific to one person.

## Project Goal

**Bill Automation Agent** — Make every bill "ready to pay" on creation.

Transform the bills workflow from a laborious data-entry process to an autonomous system where the user's job becomes "review and approval" rather than manual entry.

## Timeline & Milestones

| Priority | Milestone | Target | Status |
|----------|-----------|--------|--------|
| **P0** | "Zero" Bill Entry | Xerocon June 2026 | Active — aggressive timeline |
| **P0** | "Zero" Bill Approval | H2 FY27 | Planning |
| **P1** | "Zero" Bill Payment Scheduling | TBD | Future |

**Critical date**: Xerocon June 2026 is the first major public milestone.

## Key Stakeholders

| Person | Role | Focus Area |
|--------|------|------------|
| David Brown | Leadership | Sponsorship, strategy alignment |
| Angus Tait | Platform Strategy | API constraints, Melio integration |
| Chong Xu | PM | AI Opportunities in Payments |
| Pratik Rathod | PM | AP & Pay Out Platform FY27 |
| Jenny Nedanovski | PM | Payments Product |
| Brett Edmonds | Engineering | Agent Platform patterns |
| Thomas | Product | Direct collaborator |
| Neeraj | Design | Team member |
| Tauqir | Engineering | Dedicated to prototyping concepts |
| Darryl | Design | JAX holistic design (handing off to Maarten) |
| Maarten | Design | Taking over from Darryl |
| Britt | Design | Holistic JAX oversight, design patterns |
| Emma Dalman | PM/Research | Finsights / Syft work |

## Strategic Framing

### The Transformation
- **From**: "System of record" → **To**: "System of action"
- **From**: "Laborious" → **To**: "Autonomous"

### The Problem
- 25% of bills created after already paid
- Cash flow forecasting undermined
- Only 10% of users create bills, 1% use bill payments
- Current workflow is too manual to be worth the effort for most users

### The Vision
AI agent that:
1. Extracts data from invoices automatically
2. Matches to existing suppliers/contacts
3. Suggests payment timing based on terms and cash flow
4. Routes for approval based on business rules
5. Schedules payment when approved

### Key Constraint (from Angus)
> "Without APIs, there is no meaningful AI — and Melio doesn't currently expose APIs"

This API constraint is critical for the US/Melio integration path.

## Project Structure

```
payments-agents-team/
├── CLAUDE.md              # This file — AI assistant context
├── CONTRIBUTING.md        # Team conventions and onboarding
├── README.md              # Quick overview
├── design-journal.md      # Running log of design thinking
├── docs/
│   ├── README.md          # Doc convention: yyyy-mm-dd-(name).md, subfolders by type
│   ├── status/            # Single source of truth (PROJECT-STATUS, INDEX)
│   ├── ai-daily-journal/  # One file per day: detailed "what was discussed"
│   ├── meeting-notes/     # Meeting and Slack captures (yyyy-mm-dd-*.md)
│   ├── workshop/          # Run sheets, prep, problem lists, rationale (yyyy-mm-dd-*.md)
│   ├── strategy/          # Strategic context, principal brief, POC scope (yyyy-mm-dd-*.md)
│   └── reference/         # Research links, people briefs, how-tos (yyyy-mm-dd-*.md)
├── src/                   # Next.js app (App Router: src/app/; / → /app)
├── scripts/               # Automation scripts (Google Sheets, etc.)
└── personal-notes/        # (gitignored) Private per-person notes — see below
```

## Connection to Payments-First Vision

Bill AI Automation is the **"Pay Out" pillar** of the interwoven payments vision:
- **Pay In**: Invoice → Get Paid flows
- **Pay Out**: Bill → Pay flows (this project)
- **Move Money**: Core payment rails and orchestration

## Deployment

**Manual deploy only.** No auto-deploy webhook. After pushing to git, always run:

```bash
cd ~/cmd/payments-agents-team && vercel --prod --scope lot23
```

The Vercel project is `blue-superfast-jellyfish` under the `lot23` team. Never deploy to hobby.

## Working in This Repo

### Next.js: unstyled pages in dev (CSS looks broken)
Avoid `next/dynamic` with `{ ssr: false }` for **entire pages** or **large shells** (home dashboard, `/sales`, RobbShell children). It often leads to missing styles, stale chunk errors after branch or Turbopack switches, and plain HTML. Prefer **static imports**; `DraggableGrid` already loads `react-grid-layout` on the client inside `useEffect`. Reserve `ssr: false` for **small leaf** modules that truly require `window` at import time (for example chart libraries). Keep **Clerk `middleware` matcher** scoped (e.g. `/app/:path*` only); a catch-all matcher runs on most requests and can contribute to flaky dev CSS or RSC. **`npm run dev` and `npm run dev:fast` remove `.next` before starting** so webpack and Turbopack do not share a broken cache. If something still looks wrong: `npm run dev:clean` or `npm run clean && npm run dev:skip-clean`. Do not alternate `dev` and `dev:turbo` without a clean in between; use `dev:skip-clean` only when the cache is known good.

### File Naming Convention
All dated documents use `yyyy-mm-dd-(description).md` and live in type-based subfolders under `docs/`. See [docs/README.md](docs/README.md).

### Where to Start
- **Current state**: [docs/status/PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md) — read this first
- **North star**: [Bill AI canonical channel C0AGMBC51U0](https://xero.enterprise.slack.com/archives/C0AGMBC51U0) — all status, decisions, and prototypes aim here; see [docs/reference/2026-02-24-slack-channel-canonical.md](docs/reference/2026-02-24-slack-channel-canonical.md) and channel snapshot [docs/meeting-notes/2026-02-24-slack-channel-C0AGMBC51U0-from-glean.md](docs/meeting-notes/2026-02-24-slack-channel-C0AGMBC51U0-from-glean.md)
- **Full inventory**: [docs/status/INDEX-whats-stored-and-next-steps.md](docs/status/INDEX-whats-stored-and-next-steps.md)
- **Recent changes**: [CHANGELOG.md](CHANGELOG.md)
- **Research links**: [docs/reference/2026-02-10-research-links.md](docs/reference/2026-02-10-research-links.md)
- **Strategic context**: [docs/strategy/2026-02-10-strategic-context.md](docs/strategy/2026-02-10-strategic-context.md)

### Meeting Notes Convention
Store meeting notes in `docs/meeting-notes/` with format: `YYYY-MM-DD-meeting-topic.md`

**Source links**: Never include Granola transcript links in meeting notes or any docs. Strip them from input before writing.

### Personal Notes Routing
When processing meeting notes, conversations, or insights that are **personal** in nature — working style reflections, career observations, interpersonal dynamics, private strategic thinking — route those to `personal-notes/` (gitignored, local only). Project-level facts go in `docs/`. If a meeting contains both, split accordingly: project facts in `docs/meeting-notes/`, personal reflections in `personal-notes/`.

### Updating Status
When something material happens (new meeting, decision, artifact, or action), update:
1. **PROJECT-STATUS.md** — always keep this current
2. **INDEX** — when adding new docs or closing actions
3. **AI daily journal** — add or update the file for today

## Key Questions to Explore

1. What's the minimum viable "Zero Bill Entry" for Xerocon demo?
2. How do we handle the Melio API constraint for US market?
3. What agent patterns from Brett's work apply here?
4. How does approval workflow automation sequence with entry automation?
