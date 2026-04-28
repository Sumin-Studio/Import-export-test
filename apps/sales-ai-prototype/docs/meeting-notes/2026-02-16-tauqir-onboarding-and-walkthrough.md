# Tauqir Onboarding & Walkthrough — Feb 16, 2026

**Participants:** Jon Bell, Tauqir Ahmed, Neeraj Sahu (async in Slack)

---

## Context

Tauqir is the dedicated engineer for prototyping during the Bills Agent sprint.

## Tauqir's Progress

- Already building a crude PoC locally for one use case
- Runnable on local machine
- Offered to demo after standup (standup was cancelled — moved to async)

## Actions Taken

1. **Repo shared:** [bills-agent-feb2026](https://github.com/xero-internal-actions-poc/bills-agent-feb2026) — Tauqir given admin rights
2. **Walkthrough video sent** covering:
   - Docs structure (daily journal, meeting notes, references, strategies)
   - Three prioritised swimlanes with scoring dimensions (Severity, Feasibility, AI Benefit)
   - Five concept variations per swimlane
   - Interactive web app in `artifacts/walkthrough/`
3. **Neeraj scheduling 90-min trio session** for tomorrow (Tue)

## Key Alignment

- Tauqir's prototyping work dovetails with the concept thinking from the swimlanes
- Goal: take concept descriptions and incorporate into the prototype
- Sprint focus: deliver one strong use case with working prototype

## Technical Notes

- Web app runs from `artifacts/walkthrough/` directory
- Uses Bun (not NPM) — `bun run dev`
- Repo contains all context docs that can be fed to AI tools for further synthesis
