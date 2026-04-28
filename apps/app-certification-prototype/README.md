# App Certification Prototype

AI-assisted certification submission flow for Xero apps, embedded in a mock of the Xero Developer **My Apps** experience.

## Why this exists

Certification asks developers for structured evidence (scopes, UX, AI use, and so on). This prototype explores what it would feel like if **analysis of public materials and app registration** could pre-fill much of that work, with clear **sources**, **confidence**, and **editable** suggestions—while staying inside the familiar Developer console, not a detached form.

## Approach (what we built toward)

1. **Believable shell first** — Reproduce the Developer **My Apps** list and **App details** chrome so reviewers and PMs can react to flow and density in context, not a standalone wizard.
2. **Reuse established patterns** — Design tokens and navigation patterns from the internal **`homepage-pb`** Xero navigation prototype; page layout and density informed by **`dev-onboarding-prototype`** in the same monorepo.
3. **Certification as a focused task** — Entry points on **App details** (banner) and **Manage plan** (primary and secondary CTAs) open a **modal** submission flow (intro → themed sections → review → submitted), so developers never leave the app shell.
4. **Mock “AI analysis”** — Deterministic, hand-authored suggestions (website, policies, registration, and so on) with **source badges**, **confidence pills**, and a short **analysis progress** moment—**no** real scraping or LLM calls.
5. **Session-local state** — Submission status is stored in **localStorage** so the banner, Manage plan copy, and **Prototype settings** reset behave predictably in demos.

## Goals

- Reproduce the Xero Developer “App details” page as the surrounding shell.
- Surface **Certification** where developers already look (banner, Manage plan), opening the simplified submission wizard in a modal.
- Pre-populate the form with simulated analysis, per-field provenance, and editable suggestions.
- Keep all data mocked; nothing is sent to a server.

## Stack

- Next.js 15 (app router) + React 19 + Tailwind 4.
- Design tokens and nav patterns adapted from the `homepage-pb` Xero navigation prototype.
- Layout inspired by the existing `dev-onboarding-prototype` in this monorepo.

## Repo and contributing

This app lives in the **design-internal** monorepo (not the `certification` workspace folder by itself). Clone that repository and work under:

`apps/app-certification-prototype/`

Repository: [github.com/xero-internal-actions-poc/design-internal](https://github.com/xero-internal-actions-poc/design-internal)

Monorepo conventions (Turbo, no cross-app imports, CI) are documented in the root [**AGENTS.md**](https://github.com/xero-internal-actions-poc/design-internal/blob/main/AGENTS.md) there. This app is also listed in **`apps.json`** for the internal catalog.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployed demo

Production-style URL on Vercel (same app as CI deploys from `main`):

[https://app-certification-prototype-xro.vercel.app/](https://app-certification-prototype-xro.vercel.app/)

Internal catalog entry may show `url: null` in **`apps.json`** until the registry is updated; the link above is the usual live demo.

## Routes (shell)

- `/` — My Apps list (mock app: **Foxglove Invoicing**).
- `/apps/foxglove` — App details (includes the **Ready for certification?** banner; opens the modal).
- `/apps/foxglove/configuration` — Stubbed configuration page.
- `/apps/foxglove/collaborators` — Stubbed collaborators page.
- `/apps/foxglove/manage-plan` — Manage plan, including **Complete certification** / **View submission** CTAs (opens the same modal).

The certification **wizard itself is not a separate URL**; it opens from those entry points via `CertificationLauncher` → `CertificationModal`.

## Wizard structure (content)

Sections follow `CERT_SECTIONS` in `src/lib/certification/schema.ts`: **About your app**, **Access & scopes**, **User experience**, **AI & data handling**, plus intro, review, and submitted steps inside the modal.

## Scope

This prototype covers the **developer submission journey** only. The **reviewer** experience is a planned follow-up.

For implementation layout (folders, how to extend mock apps and the form), see **AGENTS.md** in this directory.
