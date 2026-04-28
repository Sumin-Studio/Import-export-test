# AGENT.md

This file provides guidance to AI coding assistants when working in the **AI Monetisation** workspace. It is intended for any team member.

## Project Goal

**AI Monetisation — Credit Management.** Design the platform capabilities and the user-facing experiences that let Xero customers buy, hold, and spend credits for AI-powered features.

The strategic intent (per Andrew Crosby): **decouple the generic platform capabilities** (where most of the build complexity sits) **from the wraparound experiences**, so we have time to deeply consider how to educate and inform users — making sure they understand what they're signing up for.

## Timeline & Milestones

| Priority | Milestone | Target | Status |
|----------|-----------|--------|--------|
| **P0** | Working-draft PRD up for review | ASAP (April 2026) | In progress (Andrew) |
| **P0** | GTM plan ready for CELT | May 2026 | In progress (Andrew) |
| **P1** | User-research brief + customer questions | Pre-CELT | Capturing |
| **P1** | Jon's deep design engagement | Early May 2026 onward | Pending — Jon has ~3 weeks of low availability from 2026-04-14 |

## Key Stakeholders

| Person | Role |
|--------|------|
| Andrew Crosby | PM — owns the PRD, GTM plan, and overall direction |
| Jon Bell | Design — joining 2026-04-14, deep engagement starts ~early May |
| Courtney Martyn | Initial brief participant (problem-space framing) |
| Rahul Sharma | Initial brief participant (problem-space framing) |
| Natalie Sewhoy | Initial brief participant (problem-space framing) |

## Strategic Framing

- **Platform capabilities** vs **wraparound experiences** — keep these decoupled.
- **User-facing credit ledger in-product** is one prototype concept under consideration (Andrew has framed early sniff-test prototypes as "what we shouldn't do" — useful as anti-patterns).
- **Education and informed consent** are the high-stakes design problem. Customers should understand what they're paying for and how spend behaves before opting in.
- **CELT review** next month is the forcing function for a fully-realised GTM (not just experiments).

## Source Material (as of 2026-04-14)

See [docs/reference/2026-04-14-source-links.md](docs/reference/2026-04-14-source-links.md) for the four canonical links Andrew shared:

1. Payments Eco Foundations transition plan (Confluence)
2. Monetisation bible (Google Slides) — "incredibly user-unfriendly but worth a read"
3. PRD draft — AI Monetisation - Credit Management (Confluence)
4. Initial GTM scratchings (Google Slides)

Kickoff Slack thread captured in [docs/meeting-notes/2026-04-14-slack-andrew-crosby-kickoff.md](docs/meeting-notes/2026-04-14-slack-andrew-crosby-kickoff.md).

## Workspace Structure

```
apps/ai-monetization/
├── AGENT.md                         # This file
├── CONTRIBUTING.md                  # Conventions and onboarding
├── README.md                        # Quick navigation
├── CHANGELOG.md                     # Notable workspace changes
├── index.html                       # Minimal landing page (Vercel deploy target)
├── docs/
│   ├── status/                      # PROJECT-STATUS, INDEX (living docs)
│   ├── meeting-notes/               # yyyy-mm-dd-*.md captures
│   ├── strategy/                    # Strategic briefs, GTM thinking
│   ├── reference/                   # Source links, people briefs, how-tos
│   ├── research-briefs/             # Formal user-research briefs
│   └── ai-daily-journal/            # Optional daily summaries
├── .cursor/rules/                   # Cursor AI rules (copied from payments-agents-team)
└── .layout/                         # XDL design tokens (copied from payments-agents-team)
```

## Where to Start

- **Current state:** [docs/status/PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md)
- **Inventory:** [docs/status/INDEX-whats-stored-and-next-steps.md](docs/status/INDEX-whats-stored-and-next-steps.md)
- **Source material:** [docs/reference/2026-04-14-source-links.md](docs/reference/2026-04-14-source-links.md)
- **Kickoff context:** [docs/meeting-notes/2026-04-14-slack-andrew-crosby-kickoff.md](docs/meeting-notes/2026-04-14-slack-andrew-crosby-kickoff.md)

## Conventions (summary)

- Dated docs use `yyyy-mm-dd-description.md` and live in type-based subfolders under `docs/`.
- Living docs (PROJECT-STATUS, INDEX) are not date-prefixed — update in place.
- Update PROJECT-STATUS and INDEX whenever something material happens.
- **Never include Granola transcript links** — strip them before committing.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full set.
