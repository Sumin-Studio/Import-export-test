# Payments Agent Prototype

## Same repo as `payments-agents-team`?

This folder is a **standalone Next.js app**. Run install and dev **from this directory** (`prototypes/cashflow-actions`), not from the monorepo root. The root app at `payments-agents-team/` is a different shell (different `package.json`, different dev server). Mixing the two (e.g. root `node_modules` + prototype dev, or copied env) can cause confusing React / hook errors.

---

This project is a **Payments Agent** prototype. It uses the **Spotlight widget** as the main entry point into actionable insights—surfacing suggestions (e.g. bills due, overdue invoices, bank reconciliation) and letting users take action or discuss with JAX (Just Ask Xero).

This repo is forked from the [homepage prototype](https://github.com/xero-internal-actions-poc/homepage-pb).

## App structure

- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.
- **Entry:** The app shell is in `src/app/layout.tsx` (region detection, navigation, sliding panels, welcome popup). The main dashboard is loaded from `src/app/page.tsx` → `src/app/dashboard.tsx`.
- **Dashboard:** A draggable grid of widgets (`src/contexts/DraggableGrid.tsx`). The **Spotlight** widget is first; other widgets include Bank reconciliation, Invoices owed, Bills to pay, Tasks, Cash in/out, and region-specific content.
- **Widgets:** Implementations live in `src/app/components/widgets/` (e.g. `Spotlight.tsx`, `BankRec.tsx`). Each widget can have an overflow menu under `overflow/`, and shared UI is in `components/global/` and `components/ui/`.
- **Panels:** Header actions open sliding panels (Search, JAX, Notifications, Help, Apps) defined in `src/app/components/panels/` and rendered by `SlidingPanel.tsx`.
- **Region support:** Content and navigation can vary by region (AU, NZ, UK, USA, etc.) via `RegionContext` and `src/app/lib/RegionContent.ts`.
- **Routes:** App Router pages under `src/app/` (e.g. `purchases/bills`, `sales/invoices`, `accounts`) provide the destinations for widget actions (reconcile and card/account links go to `/accounts`).

## Getting started

Use any of the supported package managers (npm, pnpm, or Bun).

**Install dependencies:**

```bash
# npm
npm install

# pnpm
pnpm install

# Bun
bun install
```

**Run the development server:**

```bash
# npm
npm run dev

# pnpm
pnpm dev

# Bun
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Other commands:**

- `npm run build` / `pnpm build` / `bun run build` — Production build
- `npm run start` / `pnpm start` / `bun run start` — Run production server after building
- `npm run lint` / `pnpm lint` / `bun run lint` — Run ESLint
