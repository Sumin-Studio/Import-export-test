# Changelog

Notable changes to this repo. Living doc — add new entries at the top.

---

## 2026-04-10

- **Dev scripts:** `dev:fast` now runs `clean` before `next dev` (same as `dev`), so the common `dev:fast` footgun that reused a mixed webpack/Turbopack `.next` cache is gone. Added **`dev:skip-clean`** for intentional fast restarts when the cache is known good. **`dev:clean`** ends with `dev:skip-clean` after it already cleaned. Docs and `doctor:dev-styles` updated.
- **Dev stability:** Figma `capture.js` is opt-in (`NEXT_PUBLIC_ENABLE_FIGMA_MCP_CAPTURE=true`). Added **`DevClientStability`** to suppress confusing dev-overlay **`[object Event]`** unhandled rejections (often a failed script/asset as a DOM `Event`). **`dev:turbo`** uses `node scripts/clean-next.mjs` like webpack `dev`.

## 2026-04-01

- **Next.js dev reliability:** Default `npm run dev` / `bun dev` now runs a cross-platform `clean` (`scripts/clean-next.mjs`) before `next dev` so `.next` is never shared between webpack and Turbopack runs (fixes recurring unstyled pages, missing `/_next` assets, and chunk load errors). Added `dev:fast` for quick restarts; `dev:turbo` and `dev:clean` aligned with the same rules. README and CLAUDE updated.

---

## 2026-03-09

- **Approvals automation resources index:** Added a reference doc indexing Bills approvals research (Drive folder), UK/US/AU payroll approval needs from design (Google Docs), and Bills approval Figma (Melio Approval workflow). Linked from INDEX and research-links Workflow & Approval section.
- **Confluence hub foundation:** Added a Cursor-native Confluence client and managed-section sync layer in `src/lib/confluence/`, plus Bun scripts to bootstrap the test hub tree and read a page back.
- **New `/app` landing page:** Replaced the redirect with a first internal payments agents hub and added child agent pages at `/app/agents/[slug]`.
- **Shared workflow docs:** Added a project skill for Confluence hub operations and repo docs describing the new setup and limits.
- **Team rollout hardening:** Added `.env.example`, removed Jon-specific env fallback from repo code, added dry-run and parent-page support, verified idempotent Confluence sync, and added a GitHub Actions workflow for shared manual or nightly sync.

---

## 2026-02-25

- **Storyboard homepage tucked away:** Original PNG-based storyboard gallery moved off `/` to `/app/storyboard-png` so it remains accessible but no longer the main entry.
- **New hero canvas homepage:** Root route (`/`) is now a simple white screen with three iPhone-sized rectangles to serve as canvases for the Bill Pay Planner, Intelligent Bill Approval, and Just Pay hero screens.

---

## 2026-02-20

- **Slack thread captured:** Lili divide-and-conquer (Cash-Flow Aware Planner, Intelligent Bill Approval, No-Bill Bill Pay), Tauqir/Chong SL2 clarification (payment approval = Melio), Jon status updates. See [docs/meeting-notes/2026-02-20-slack-thread-lili-chong-bharathi.md](docs/meeting-notes/2026-02-20-slack-thread-lili-chong-bharathi.md).
- **Chong/Bharathi strategic doc:** "AI payments for AB and SB, built once" — full content stored. AB ideas (cashflow autopilot, payer-chasing, smart bill-run planner, bill safety shield, onboarding, collections command center); SB mirror; product view (build once, serve both); differentiation vs Intuit/Sage. See [docs/reference/2026-02-20-chong-bharathi-ai-payments-ab-sb-built-once.md](docs/reference/2026-02-20-chong-bharathi-ai-payments-ab-sb-built-once.md).
- **Collaboration Vision FY26-27:** Summary stored. See [docs/reference/2026-02-20-collaboration-vision-fy26-27-summary.md](docs/reference/2026-02-20-collaboration-vision-fy26-27-summary.md).
- **Concept naming:** Clarified — Concept 2 = Intelligent Bill Approval / Bill Safety Shield (payment approval, flags: bank details, duplicates, unusual amounts); Concept 3 = No-Bill Bill Pay (intake → approval → payment UX flow, rough wireframes OK).

---

## 2026-02-17

- **Repo polish:** README now has "Where to start" (PROJECT-STATUS, INDEX, CHANGELOG) and "What's live" clarity. CONTRIBUTING mentions CHANGELOG and when to add entries. docs/README links to CHANGELOG. api and walkthrough `.env.example` files have copy/do-not-commit comments.
- **Walkthrough URL:** Production URL corrected to **https://blue-superfast-jellyfish.vercel.app** (was red-…). README and `artifacts/walkthrough/package.json` name updated to match.
- **Walkthrough in repo:** `artifacts/walkthrough/` is no longer a nested git repo; inner `.git` removed so the walkthrough is tracked as normal files and clones get full source.
- **Docs:** READMEs and web middleware updates committed and pushed.

---

## 2026-02-16

- **Repo cleanup:** Removed duplicate standalone HTML files from `artifacts/`; content lives in `artifacts/walkthrough/` and is deployed on Vercel.
- **Daily standups:** Cancelled; replaced with async updates in Slack.
- **Trio model:** Jon, Neeraj, Tauqir as core working group.

---

## Earlier

- **Workshop 1 (13 Feb):** Ranked 20 areas of opportunity; canonical output in Google Sheet. Synthetic user personas and quotes added.
- **API prototype:** Tauqir’s Bills Payment Agent (FastAPI + LLM Gateway) in `api/`; run locally with `make dev`.
- **Web app:** Concept explorer (Next.js) in `web/`; run locally with `bun run dev`. Walkthrough (slides) deployed on Vercel.
