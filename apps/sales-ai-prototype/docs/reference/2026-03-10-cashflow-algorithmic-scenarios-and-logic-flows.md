# Cashflow: Algorithmic Scenarios & Logic Flows (10 Mar 2026)

**Overview:** Durable repo summary of Dillon's cashflow agent scenarios and logic (buffer-in-days, solvable vs trade-off vs unsolvable, alert → explain → adjust → commit). For engineering and data science.

**Source:** Google Doc shared by Dillon Gearing  
**URL:** https://docs.google.com/document/d/1i64JYeANTFKcEOKEdaT0fB0Ha4fVnJAQpW8y7jdhUcs/edit?tab=t.0  
**Target audience:** Engineering and Data Science teams  
**Purpose:** Outline the expected algorithmic behavior, data inputs, and user interaction loops for the Phase 1 Accounts Payable AI agent ("Cashflow Agent").

---

## Core framing

- Universal trigger: user logs into Xero after the AI has already run a background cashflow check.
- Primary alert logic: trigger action when **`cash_buffer_days`** is projected to fall below a configurable threshold `X`.
- Initial assumption: `X = 30` days, but customers can change the threshold.
- Important Syft-aligned modeling detail: the system frames cash safety in **days of buffer**, not just dollars.

## Scenario set

### A-series: Solvable with straightforward bill timing changes

- **A1 - Perfect Fit:** Delay non-critical bills until after a known incoming invoice lands; user accepts the plan and Xero updates planned payment dates.
- **A2 - Minor Tweak:** AI proposes delaying several bills, but the user overrides one recommendation based on out-of-system relationship knowledge; the system recalculates instantly and commits the adjusted subset.

### B-series: Strategic trade-offs

- **B1 - Buffer vs Critical Supplier:** User must choose between maintaining the cash buffer and paying a tagged critical supplier on time.
- **B2 - Tempting Discount:** User must choose between preserving short-term liquidity and taking an early-payment discount with positive ROI.
- **B3 - Future Liability / Liquidity Trap:** AI breaks chronological payment order to prioritize a large future liability that would otherwise create a hard shortfall.

### C-series: Unsolvable or partially solvable

- **C1 - Bleeding Mitigation:** AI cannot prevent an overdraft, but can delay non-critical bills to reduce the gap and then point the user toward external funding.
- **C2 - Brick Wall:** No optimization is possible because only mandatory payments remain; the system fails gracefully and immediately routes the user to external options.

---

## Common interaction pattern across scenarios

1. Surface a proactive alert or opportunity in-product.
2. Show current cash position and the relevant AP / AR timing problem.
3. Generate either a single recommendation or a small set of options.
4. Explain the logic in plain language.
5. Let the user accept, adjust, or choose between options.
6. Commit by updating **`PlannedPaymentDate`** values in Xero where applicable.

---

## What this document is good at

- It makes the Bill Runner / Cashflow Agent problem concrete enough for engineering and data conversations.
- It captures several important decision types already visible in the PRD's open questions:
  - buffer vs supplier criticality
  - early-pay discount vs liquidity
  - user override and fast recalculation
  - graceful handling of unsolvable states
- It helps separate **highly solvable**, **trade-off**, and **unsolvable** cases, which is useful for scoping.
- It reinforces the need for a trust layer: show the work, explain the recommendation, and keep the human in control.

## Open tensions this raises for the repo

- **Data quality and confidence are mostly assumed rather than modeled.** The scenarios often rely on clean tags like "critical supplier," confidence in AR timing, and known maximum delayability.
- **Phase 1 execution may still feel thin.** Several flows end with updating planned payment dates only; the PRD already flags the risk that customers may still need to do too much work elsewhere.
- **Product boundaries need to stay clear.** This logic overlaps with Cash Flow Manager, Scenario Planner, and Spotlight-adjacent experiences; surfaces and handoffs are still unresolved.
- **This is closer to an optimization engine spec than a full agent experience spec.** It is strong on scenarios and logic, but lighter on entry points, UI behavior across surfaces, and the broader story of how the agent shows up in Xero.
- **Not all scenarios are equally likely to be MVP material.** The document is useful as a full scenario map, but a thinner first slice is still needed for prototype and delivery focus.

---

## Relevance for Bill AI

- Strong alignment with the Bill Runner PRD's AP-first, 90-day, "show your work," commit-to-plan framing.
- Supports the "cashflow as hook" direction by grounding it in real customer trade-offs rather than abstract forecasting alone.
- Gives the team a workable basis for design, architecture, and feasibility discussions, but still needs prioritization into:
  - first-cut scenarios
  - required inputs and confidence rules
  - surfaces and handoffs
  - what qualifies as meaningful user value in Phase 1
