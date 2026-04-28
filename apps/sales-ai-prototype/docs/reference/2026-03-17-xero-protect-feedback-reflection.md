# Xero Protect prototype: feedback reflection

**Date:** 2026-03-17  
**Context:** Post–prototype-3 implementation; mapping stakeholder feedback to what was addressed vs. not.

---

## What we addressed (in prototype 3)

| Feedback theme | How we addressed it |
|----------------|---------------------|
| **Spotlight-style entry / isolation review flow** | P3 landing has a spotlight card (top left) that calls out “X bills that may need review” and a primary CTA “Review bills” that steps into a dedicated bills flow. |
| **Bring insights to customers instead of scattering** | Single spotlight entry point on the dashboard; “Review bills” takes users into one place (split-screen bills list + Quickview) rather than sprinkling risk in many screens. |
| **Quick view as default bills interaction** | P3 bills experience is split-screen: list left, Quickview-style detail right when you click a row. No full-page bill view by default. |
| **Lean into quick view and new bills page** | We implemented the split (list | detail) and did not embed new components into a legacy full-page table. |
| **Remove the eyeball / View column** | View column removed from the P3 bills table; row click opens detail in the right pane. |
| **Consistent surfacing / meet customers where they are** | Spotlight on the dashboard (where they land) and risk in the bills list (in context) with one clear path into review. |
| **Name: Xero Protect** | Rebrand from “safety-shield” to “xero-protect” everywhere in the app (URLs, UI, component folder). Old URLs redirect. |
| **Explicit risk type instead of just low/medium/high** | P2 (and data) already use risk types (first-time supplier, unusual amount, duplicate, bank detail change); P3 list shows risk level (High/Med) and the detail pane shows the typed reason. |

---

## What we did not address (yet)

| Feedback theme | Why not / next step |
|----------------|---------------------|
| **Combine with JAX** | “Review with JAX” / JAX sidebar not wired in P3. Feedback was to think about how the JAX panel works with Quickview; we have the split and the detail pane but no JAX entry point. |
| **CTAs** | You explicitly said to hold off on CTA behaviour; we only have “Review bills” and in-pane Approve/Dismiss. |
| **Competitor reverse-engineering** | You said hold off on competitors (e.g. Ramp). So no alert layers, resolution patterns, or audit trails from others yet. |
| **Risk for all bill-paying customers vs. payment-enabled only** | No product/segment logic in the prototype; it’s demo data. Needs product/backend clarity. |
| **Permanent risk column wasting space if risks are rare** | We removed the View column and put risk in a compact column; we didn’t yet explore “only show risk column when there are flags” or conditional real estate. |
| **Xero Protect approval/dismiss vs standard bill approval, JAX, spotlight** | We have approve/dismiss in the detail pane but didn’t map how that plays with standard approval workflow, JAX, and spotlight in a single diagram or flow. |
| **Human-in-the-loop before hands-off** | Philosophy only; prototype doesn’t encode “earn the right” explicitly. |
| **JAX as opt-in drill-down, not auto Clippy** | No JAX in P3, so we didn’t demonstrate “opt-in” vs “pop-up”; when we add JAX, we should keep it as a user-triggered action. |
| **Boring basics (smarter extraction, repeated actions, duplicates/PO matching)** | Out of scope for this UI prototype. |
| **AI suggestion as key communication moment / replace action area** | “Consider turning the main action button (e.g. ‘Approve’) into the key communication moment.” We didn’t change the primary button to be the risk message; we kept a separate banner and Approve/Dismiss. |
| **Xero Protect vs “Zero Protect” name** | Not validated in prototype; naming sanity-check is a separate decision. |

---

## Summary

- **Addressed:** Spotlight entry, single “isolation” review flow, Quickview as default (split-screen), no eyeball column, Xero Protect naming, consistent entry point, explicit risk types in data/UI.
- **Not addressed:** JAX integration, CTAs, competitors, segment (all vs payment-enabled), risk column conditional UI, full approval/dismiss/JAX/spotlight orchestration, human-in-the-loop framing, making the main action button the risk moment, and “Zero Protect” naming check.
- **Landing feel:** Feedback that the default homepage felt sparse (one panel, two dimmed) is being addressed by making the P3 dashboard more like Robb’s: multiple real-looking widgets so it feels like a real overview, not a single card and placeholders.
