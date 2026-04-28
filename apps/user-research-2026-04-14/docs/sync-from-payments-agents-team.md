# Sync backlog: port changes from `payments-agents-team`

**Status:** Applied 2026-04-15 — synced from `payments-agents-team` branch `cursor/protect-widget-bills-full-view-navigation` (commit `5898ace`).

**Source of truth:** [`payments-agents-team`](file:///Users/jon.bell/cmd/payments-agents-team) (local path: `~/cmd/payments-agents-team`).

**Target:** This app (`user-research-2026-04-14`).

When porting, prefer **cherry-picking commits** or **diffing the listed paths** against `main` / the branch that contains the work (e.g. `cursor/protect-widget-bills-full-view-navigation`), then resolving conflicts. This repo may omit some hub-only routes (e.g. no `src/components/bills-home/*`).

---

## 1. Shared “latest Xero Protect prototype” constant

| payments-agents-team | Action |
|----------------------|--------|
| [`src/lib/xero-protect-latest-prototype.ts`](file:///Users/jon.bell/cmd/payments-agents-team/src/lib/xero-protect-latest-prototype.ts) | **Add** the same file here under `src/lib/` (tsconfig `@/*` should resolve `./src/*`). Bump `XERO_PROTECT_LATEST_PROTOTYPE_SLUG` when the default prototype changes. |

---

## 2. Cashflow prototype widgets (`prototypes/cashflow-actions/...`)

Copy or merge behavior from the hub into the same relative paths under this repo:

| File | What changed |
|------|----------------|
| `prototypes/cashflow-actions/src/app/components/widgets/purchasesInteractiveLinking.ts` | `targetBillId` on flags; tooltip `href`s use `XERO_PROTECT_LATEST_BILLS`; imports from `@/lib/xero-protect-latest-prototype`. |
| `prototypes/cashflow-actions/src/app/components/widgets/ProtectBillsWidget.tsx` | Bill links: `${XERO_PROTECT_LATEST_BILLS}/…?view=full&protectLink=…` (not hardcoded `/prototype/4`). |
| `prototypes/cashflow-actions/src/app/components/widgets/BillsHomeAgentTrio.tsx` | Xero Protect column uses `XERO_PROTECT_LATEST_ROOT`. |
| `prototypes/cashflow-actions/src/app/components/widgets/Spotlight.tsx` | `XERO_PROTECT_SUGGESTIONS` primaryHref uses `XERO_PROTECT_LATEST_BILLS`. |
| `prototypes/cashflow-actions/src/app/components/panels/JaxPanel.tsx` | All `/xero-protect/prototype/4/bills` links → `XERO_PROTECT_LATEST_BILLS`. |
| `prototypes/cashflow-actions/src/app/components/widgets/ActionPlanPanel.tsx` | On `/purchases-overview/prototype/4`, Protect chart dots only when `linking.activeLinkId` is set (hover Protect row or linked table row); deps include `linking.activeLinkId`. |
| `prototypes/cashflow-actions/src/app/components/charts/CashflowPlanChart.tsx` | Protect scatter `animation.duration` 300ms when `purchasesV4SingleOrange`. |
| `prototypes/cashflow-actions/src/app/components/charts/CashflowShortfallChart.tsx` | Same as Plan chart for Protect markers. |

---

## 3. Hub-only `src/` (skip or adapt)

These exist under **payments-agents-team** `src/` but **not** in this user-research app (no matching files today). Port only if you add the same surfaces:

| File | Notes |
|------|--------|
| `src/components/bills-home/BillsHomePurchasesExperience.tsx` | Uses `XERO_PROTECT_LATEST_BILLS` for demo links. |
| `src/components/bills-home/BillsHomePurchasesExperienceV2.tsx` | Same. |
| `src/components/bills-home/purchasesOverlapDemo.ts` | Demo `href`s under latest bills path. |

---

## 4. Xero Protect bill routes (hub has prototype 4 + 9)

| File | Notes |
|------|--------|
| `src/app/xero-protect/prototype/4/bills/layout.tsx` | Split quickview unless `?view=full` (full-width detail). |
| `src/app/xero-protect/prototype/4/bills/[billId]/page.tsx` | `protectLink` query; entry strip; `TrustStatusBanner` `startExpanded`; `persistentQueryNoProtect` drops `protectLink` for prev/next. |
| `src/components/xero-protect/TrustStatusBanner.tsx` | Optional `startExpanded` prop. |

**This repo:** prototype **9** bill UI lives at `src/app/xero-protect/prototype/9/bills/[billId]/page.tsx` — hub already added a **Purchases “Opened from Protect”** strip + `protectLink` handling there; re-diff against payments-agents-team if that file diverged.

**Layout:** `src/app/xero-protect/prototype/9/bills/layout.tsx` — verify `view=full` / split behavior matches hub (hub’s p9 layout regex may still reference `prototype/8` in one place; worth aligning when porting).

---

## 5. Quick verification after port

1. `/purchases-overview/prototype/4` — no orange Protect dots until hover on left Protect rows (or linked table rows); one dot with animation on hover.
2. Links from Protect widget / trio / spotlight / JAX → `/xero-protect/prototype/9/...` (or whatever `XERO_PROTECT_LATEST_PROTOTYPE_SLUG` is), not `/prototype/4`.
3. `?view=full` opens full-width bill where the split layout exists.

---

## 6. Reference commands (run from your machine)

```bash
# Diff a single file
diff ~/cmd/payments-agents-team/prototypes/cashflow-actions/src/app/components/widgets/ProtectBillsWidget.tsx \
     ~/cmd/design-internal/apps/user-research-2026-04-14/prototypes/cashflow-actions/src/app/components/widgets/ProtectBillsWidget.tsx
```

```bash
# List commits that touched Protect / xero-protect-latest (adjust branch)
cd ~/cmd/payments-agents-team && git log --oneline -20 --grep=protect
```

Last updated from assistant context — reconcile with actual `git log` / PRs before merging.

---

## Xero Protect: Discussion Guide (Confluence)

**Canonical page:** [Xero Protect: Discussion Guide](https://xero.atlassian.net/wiki/pages/viewpage.action?pageId=272111239207) (Confluence page ID `272111239207`).

**Pull latest storage HTML** (for diffing after in-browser edits; writes under `payments-agents-team`):

```bash
cd /Users/jon.bell/cmd/payments-agents-team && bun run scripts/confluence/pull-discussion-guide.ts
```

Or from this app directory:

```bash
bun run confluence:pull-discussion-guide
```

**Output:** `payments-agents-team/docs/research-briefs/_confluence-pull/272111239207-storage.html`

**Push from repo (after editing `payments-agents-team/scripts/confluence/discussion-guide-body.ts`):**

```bash
cd /Users/jon.bell/cmd/payments-agents-team && bun run confluence:push-discussion-guide
```

Or from this app: `bun run confluence:push-discussion-guide`

**Last synced:** Confluence **version 7** — streamlined (no facilitator-only blocks in body); source in `payments-agents-team/scripts/confluence/discussion-guide-body.ts`.
