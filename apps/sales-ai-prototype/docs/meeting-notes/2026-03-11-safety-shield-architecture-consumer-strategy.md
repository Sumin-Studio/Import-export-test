# Safety Shield Architecture & Consumer Strategy — 11 Mar 2026

Meeting notes: architectural pivot, phased approach, UX/prototype direction, and next steps. Attendees and exact format of discussion not specified in the source; actions attributed below.

---

## Safety Shield Architecture & Consumer Strategy

- **Major architectural pivot** identified for dashboard-level anomaly detection:
  - **Current thinking:** subset of bills (bill planner / cash flow manager use cases).
  - **New requirement:** org-wide dashboard showing all anomalies across the entire organization.
  - Complexity increases by an order of magnitude — latency, data sourcing, dependencies.
- **Phased approach** proposed:
  - **V1:** Start with subset of bills (e.g. awaiting payment screen, max ~200 bills).
  - **Later:** Expand to organization-wide view with unknown bill volumes.
- **Agreement:** Define “what good looks like” first, then walk back to technical constraints.
  - Prototype to include a **technical storytelling sidebar** showing limitations and dependencies.
  - **Clear boundaries:** Safety Shield flags anomalies; other teams handle actions.

---

## User Experience & Prototype Direction

- **“Bubble up, drill down”** pattern confirmed for risk identification:
  - List view highlights risky bills (e.g. in red).
  - Click-through reveals detailed evidence and context.
- **Prototype enhancement plan:**
  - Make it look like the **actual Xero interface** (not generic).
  - Include **technical reality documentation** alongside UI mockups.
  - Show **clear handoff points** between Safety Shield and other services.
- **Three-phase vision** emerging:
  1. **Crawl:** Basic risk flagging with Xero-styled interface.
  2. **Walk:** Binary approve/defer decisions.
  3. **Run:** Intelligent recommendations with full workflow support.

---

## Next Steps

| Owner | Action |
|-------|--------|
| **Jon** | Develop crawl/walk/run prototype by end of week (out Friday). |
| **Rory & Tauqir** | Continue scenario definition work in parallel. |
| **Team** | Sync on UI requirements once scenario list is finalized. |
| **Tauqir** | Incorporate findings into architectural documentation. |
| **Future** | Address list view integration complexities after core experience alignment. |

---

## Related

- [2026-03-11-rory-prd-sparring-chong-jenny-safety-shield.md](2026-03-11-rory-prd-sparring-chong-jenny-safety-shield.md) — PRD alignment and evolution story.
- [2026-03-09-rory-safety-shield-bill-approval-daily.md](2026-03-09-rory-safety-shield-bill-approval-daily.md) — Working session and 5-slide/Friday prototype goal.
- [../reference/2026-03-10-safety-shield-detection-scenarios-and-logic-flows.md](../reference/2026-03-10-safety-shield-detection-scenarios-and-logic-flows.md) — Detection scenarios and logic flows.
