# Bill Pay Agent — Team Meeting (19 Feb 2026)

**Meeting:** Bill Pay Agent team sync
**Transcript:** [Granola](https://notes.granola.ai/t/e9bd7032-446d-4c16-a572-255a46bfcfa7)

---

## Key news: DIA review deadline

- Chong spoke with Diya Jolly
- Need to show **differentiation**, not just table-stakes features
- **New deadline:** Next AU Friday (DIA review), 30–45 min pitch alongside other agents
- Volume expectation: **5–6 agents minimum** (currently have 2)
- Payments team seen as underperforming compared to other areas
- DIA: "Don't worry about trade-offs, go big and bold" — willing to help prioritise and resource

## NYC meeting

- Wednesday 2pm US (6am AU), 30 min with Melio team
- More feasibility-focused than marketing/aha moment

## Design Prototype (demo'd today)

- Entry point: JAX integration — "Jax can help with your upcoming bills"
  - Avoids hidden button problem (low discovery)
  - Hedge with traditional "Open Bills" option
- Cash flow visualisation showing bill coverage
  - Conservative / Standard / Growth plan options
  - Interactive bill selection with real-time cash flow impact
  - Anomaly detection (75% increase example)
  - Overdraft protection preventing dangerous payments
- **Plan mode scrapped** — wizard fatigue, going direct instead

## Three Swim Lane Strategy

- **SL1: Cash flow planning** (current focus) — high-level summary → plan selection → bill approval with insights
- **SL2: Approval/flagging** (separate from payment execution) — compliance, overpayment prevention
- **SL3: Payment chasing agent**
- Additional: AB-to-SB cross-client intelligence, onboarding automation

## Presentation approach for DIA

- Show breadth over depth: three screens + demo for SL1, prototype for SL2, conceptual for rest
- Integrate with broader payments agent story (invoices, etc.)
- Angus: pivoted from AI approval without clear explanation — need to address

## Who's doing what

| Owner | Action |
|-------|--------|
| **Jon** | Finish SL1 polished screens (top priority). Massage 99→3 swimlane webpage story. Visualise SL2 and SL3 (risk — will report back). |
| **Tauqir** | Deep on SL1 technical feasibility (best use of time). Porting to Xero's AI agent template (Play). |
| **Team** | Flesh out SL2 and SL3 — docs exist, confirming approach. |
| **Chong** | Coordinate DIA review materials. Share GRA payment agent insights. |

## Technical notes

- Tauqir porting to Xero's standardised AI agent template (Play) — includes OpenAI, logging with Brain Trust
- Model evaluation concerns for financial accuracy — Andrew Goodman contacted, plus JP (payments) and Sunni's team (data science)
- Jon's Figma crashing during demo prep
