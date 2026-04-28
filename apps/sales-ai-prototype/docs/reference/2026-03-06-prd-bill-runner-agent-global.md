# PRD — Payments: Bill Runner Agent (Global)

**Source:** [Xero Confluence — PRD Payments Bill Runner Agent Global](https://xero.atlassian.net/wiki/spaces/XFS/pages/271910174842/PRD+-+Payments+-+Bill+Runner+Agent+-+Global)  
**Added to Confluence:** Dillon Gearing (PM), March 2026.  
**Purpose:** Capture the official PRD summary for cross-reference with this repo’s strategy, prototypes, and committed scope.

---

## Executive snapshot

| Field | Content |
|--------|--------|
| **Division/Portfolio** | Payments |
| **PRD Owner** | Dillon Gearing |
| **Engineering Lead / Team Lead** | Mugdha Kulkarni |
| **Design Lead** | TBD |
| **OKR** | O12 — AI for customers |
| **Estimated delivery start** | Q1 FY27 |
| **Product release category** | Standard feature release |
| **RSG category** | Change to high impact existing product experience |
| **Customer journey** | L0.7 Manage accounts, cash flow and finance |
| **Segments** | Small and medium businesses |

---

## The why

- **Problem:** Small business owners face intense stress and cognitive overload managing short-term cash flow; they resort to reactive, manual “firefighting” across spreadsheets to decide which bills to pay and when.
- **Importance:** Addresses the number one source of anxiety for SBs; elevates Xero from a reactive, historical ledger to a daily financial co-pilot.
- **Solution:** “Bill Runner” — an AI agent that projects a **90-day cash flow window** and recommends **actionable, optimized payment schedules** for accounts payable. Phase 1 focuses on AP because businesses have more immediate control over deferring outgoing funds than forcing incoming revenue.
- **Success:** Users trust and consistently commit to the AI’s proposed payment plans without double-checking the math in external spreadsheets. Value: reclaimed time, protected cash buffers, peace of mind.

---

## The how (high level)

- **Release strategy:** TBD  
- **Product experience:** TBD  
- **Technical design summary:** TBD  
- **Out of scope / Dependencies / Risks:** TBD  

---

## Understand — background & opportunity

- **Wider context:** SBs rank cashflow as top stress; managing AR/AP is fragmented and manual (Xero + spreadsheets + bank portals). Demand for a proactive “Financial Co-Pilot” between what happened and what to do next.
- **Customer problem:** Reactive firefighting; cognitive overload (e.g. buffer vs supplier relationship); data blind spots (unreconciled feeds, untracked recurring, missing tax projections).
- **Business value:** Market differentiation (reactive ledger → strategic advisory); engagement & retention (insights and planned payment dates in Xero); foundation for future agentic capabilities (invoice chasing, loan recommendations, bank payment execution).
- **Bill Runner functionality:**  
  - Analyze historical data and upcoming obligations → **90-day cashflow projection**.  
  - **Actionable advice:** e.g. delay non-critical payments, take early-pay discounts; respect custom cash buffer and supplier relationships.  
  - **Self-awareness:** Target 90–95% forecasting accuracy; flag incomplete data (e.g. unreconciled); “show its work” so users can trust before committing.

Supporting research cited: Finsights V2 user testing, Xero x One Picture Cashflow CVP debrief, Project Nova deep dive, AI lit review, USCP profiling, action flows one-pager.

---

## Who we’re solving for

- **Segment:** Small, employing businesses (2–19 employees), primarily service sector. Mindset: shift from working *in* to working *on* the business. High cognitive load; daily bank checks; mental math or spreadsheets; cautious optimism toward AI as “Analyst” — demand transparency and audit trail.
- **Persona — Sarah:** Founder, 10-person boutique marketing agency. Weekly “cashflow check”: $15K in bank, payroll next week, three large bills due (software $2K, freelancer $3.5K, landlord $4K), $10K invoice overdue. **Current:** Exports AP/AR to spreadsheet, 45 min manual scenarios, gut-feel decisions, lingering anxiety. **With Bill Runner:** JAX flags cash flow dip; clear plan (pay landlord + freelancer today, defer software 4 days, preserve $5K payroll buffer); “view the math”; “Commit to Plan”; reclaim time and peace of mind.

*(PRD includes concept images for where the experience could occur; surface not yet defined.)*

---

## Assumptions & open questions (from PRD)

| Theme | Assumption | Open questions |
|--------|------------|----------------|
| Scope | AP first; “extra brain” to remove stress | AR-heavy users — basic AR (e.g. “chase these 3”) in Phase 1? |
| Prediction window | 90 days | Flat 90 days or scale by transaction volume? |
| Data accuracy & trust | 90–95% accuracy; JAX self-aware, flags missing data | How intrusive when asking for data? Block vs caveated forecast? |
| GIGO | Unreconciled → prompt to clean books | Threshold that invalidates forecast? |
| Showing the work | Audit trail; “see JAX’s thinking” and math | Expose logic without spreadsheet overload? |
| AI logic / critical supplier | Weigh buffer vs critical supplier; explain deviations | How is “critical” defined from ledger? Onboarding to tag VIP suppliers? |
| Learning | From history + setup; adapt over time | Ease of manual override when relationship changes? |
| Positive incentives | Multiple plan options (e.g. Maximize Buffer vs Early-Pay Discounts) | How many options before analysis paralysis? |
| User control | SB sets cash buffer; JAX uses as constraint | Ever recommend breaching buffer, under what conditions? |
| Execution | Phase 1: update planned payment dates in Xero; future: schedule bank payments | If user still logs into bank to change 10 transfers, does Phase 1 save time? |
| Reversibility | JAX aware of scheduled payments; warn about manual reschedule | Can Xero reliably detect all bank-scheduled payments? |
| Unsolvable | Empathy + suggest external (loans, chase invoices) | Most actionable “off-ramp” in UI when in the red? |

---

## Alignment with this repo

- **Naming:** PRD uses **“Bill Runner”**; this repo and channel use **Bill Pay Planner**, **Cash-Flow Aware Planner**, **zero bill entry**, **chasing agent**. Bill Runner in the PRD is the same strategic direction: AP-focused, 90-day cash flow, recommended payment plans, JAX, “commit to plan.”
- **Committed scope (from channel):** Chasing agent + zero bill entry; theme = cashflow optimization. Bill Runner PRD is the formal product framing for the cashflow / payment-planning pillar (SL1).
- **Persona:** “Sarah” aligns with Bill Creator / Cautious Approver and hero scenarios in workshop and prototype (e.g. bill timing optimizer, cash runway).
- **Deliverables:** PRD is DRAFT/WIP; Define/Develop/Deliver sections (approach, out of scope, success metrics, technical approach, phasing, UAT, compliance, etc.) are placeholders to be completed.

---

## Checklist for this repo

- [ ] Ensure prototype and story language can map to “Bill Runner” where appropriate for stakeholder/Confluence alignment.
- [ ] Feed PRD open questions into discovery/design (e.g. Lili’s technical spikes, supplier criticality, “show the work” UX).
- [ ] When PRD is updated (phasing, scope, success metrics), re-sync this reference or link to Confluence as single source of truth.
