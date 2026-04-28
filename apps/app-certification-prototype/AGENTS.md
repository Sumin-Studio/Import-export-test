# Agent notes — app-certification-prototype

Self-contained Next.js prototype. All rules from the monorepo `AGENTS.md` apply (no cross-app imports, keep it deployable on its own).

## Shape

- **Shell**: `src/components/nav/` holds the Developer top nav, page header, and left nav.
- **Mock data**: `src/lib/mock/app.ts` defines a single example app (`foxglove`). `src/lib/mock/analysis.ts` returns the deterministic "AI analysis" for that app.
- **Form primitives**: `src/components/form/` (Field, TextInput, Textarea, RadioGroup, CheckboxGroup, MultiSelect, Button).
- **AI components**: `src/components/ai/` (FieldSuggestion, SourceBadge, ConfidencePill, AnalysisProgress).
- **Certification flow**: `src/components/certification/` — `CertificationModal.tsx` orchestrates the wizard; sections in `sections/`, steps in `steps/`. Entry points use `CertificationLauncher` from app details (`CertificationBanner`) and Manage plan (`ManagePlanContent`).
- **Cert status**: `src/lib/certification/status.ts` — localStorage-backed client hook that drives the left-nav badge and Manage plan banner.

## Adding more mock apps

1. Add a new `MockApp` to `mockApps` in `src/lib/mock/app.ts`.
2. Extend `analyzeApp()` in `src/lib/mock/analysis.ts` to branch on `app.id` if you want different suggestions, or tweak values in-place.
3. The My Apps list at `/` will pick them up automatically.

## Changing the form

- Shape: `src/lib/certification/schema.ts` (`CertificationFormValues`, `CERT_SECTIONS`).
- Analysis output shape: `AnalysisOutput` in `src/lib/mock/analysis.ts` — keep the two in sync.
- Section UIs: `src/components/certification/sections/`.

## Out of scope for this prototype

- Reviewer experience (planned follow-up).
- Real scraping / LLM calls — everything is hand-authored.
- Auth, multiple orgs, multiple apps (only Foxglove).
