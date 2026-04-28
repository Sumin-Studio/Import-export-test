# Pratik chat — context and next steps

**What we're storing:** Conversation with Pratik (and Brett) on team dynamics, bills AI strategy, agent streams, ownership, and workshop prep.  
**Use for:** Ownership boundaries, Pratik's "crawl-walk-run" and three components/phases, why AI needs to be in the room, and concrete next steps.

---

## 1. Team dynamics and resourcing

- **Jenny, Peter, Pratik, Chong** meeting soon to figure out **ownership boundaries**.
- Resourcing split by: US/Melio focus, approval workflows emphasis; scope definition still in progress.
- **Parallel sprints** running.
- **Chong's team:** Strong payments expertise; building familiarity with **bills workflow end-to-end**.

---

## 2. AI automation strategy for bills (Pratik's framing)

**Crawl-walk-run** is essential (moving money = high risk).

**Three components** (all must be complete before customer is confident to pay):

| # | Component | What it is |
|---|-----------|------------|
| 1 | **Transaction data** | OCR extraction — total amount, supplier details |
| 2 | **Accounting** | Account codes for categorization |
| 3 | **Finance** | Tracking codes, project assignments for cashflow forecasting |

**Three opportunity phases:**

| Phase | Focus | Example |
|-------|--------|--------|
| **Creation** | Get all required data populated when bill is created | Auto-populate from OCR + defaults |
| **Protection** | Fraud and error detection | $500k loss from fraudulent bank account change; unusual amounts; duplicate bills; overpayment protection |
| **Post-payment** | Cleanup and verification | Remittance advice to suppliers; reconciliation (currently broken); payment success verification |

---

## 3. Current agent work streams (four)

1. **Payer chasing** — customers get paid quickly.  
2. **AB info and document chasing** — client readiness, docs to close month / sales tax.  
3. **Payroll / pay run inputs** — AI collecting timesheets and leave so pay run is ready.  
4. **Running the pay run** — not yet truly agentic (if/then flows); may be pulled unless it changes.

**Brett:** PE summit last week; agent platform board mapping end-to-end flows and failure modes. Next: standardize across flows, consistent patterns vs. areas that diverge.

---

## 4. Bills agent complexity (two streams)

- **Pratik** leading bill creation/automation stream.
- **Chong** leading bills approval agent (Payments Platform).
- Different timelines and constraints; ownership meeting in progress to resolve boundaries.

---

## 5. Process and workshop concerns

- Need **triad** (design, product, engineering) and **feasibility** in the mix, not desirability alone.
- **Workshops:** Starting from scratch — no defined opportunity areas or POV on what the agent should solve. Workshop series + Melio NYC offsite (Melio will show their agent work); need something to show.
- **Missing AI in workshops:** AI experiences are constrained by tech, not just desirability. Need technical constraints **further left** in design. Risk of designing on false assumptions.

---

## 6. Next steps (with owners)

| Owner | Action | Status |
|-------|--------|--------|
| **Jon** | Get **AI representation in workshops** | Open |
| **Jon** | Contact **Soon-Ee Cheah** (GM — AI Products; "Sune") for AI resourcing / representation in workshops | Open — context: [people-soon-ee-cheah.md](../people-soon-ee-cheah.md) |
| **Jon** | **Review Pratik's strategy document** | Open — link below |
| **Brett** | Pull all agent streams together; consolidate and standardize; coordinate designers across projects | Open |
| **Jon + Brett** | Stay connected as work progresses, mutual support | Ongoing |
| **Jenny, Peter, Pratik, Chong** | Resolve ownership boundaries (meeting in train) | In progress |

---

## 7. Who to contact for AI (Sune) + Pratik's links

**Soon-Ee Cheah** = GM/EGM AI Products ("Sune"). Pratik meant him for "get AI in the room." Role, relevance to bills/agents, and how to ask: [people-soon-ee-cheah.md](../people-soon-ee-cheah.md).


| Doc | Link |
|-----|------|
| **AI + Payments** (Opportunity 2 etc.) | [Google Doc](https://docs.google.com/document/d/1SShVmYd2ZMcvP7lp71eDcfjcmmHc7KtS_mNLBblOOvw/edit?tab=t.0#heading=h.3tba8zz2cw29) — already in [research-links.md](../research-links.md) |
| **Pratik's maturity model / early AI roadmap** | [Google Doc](https://docs.google.com/document/d/1JgC2Dyp9-z4v0j2aYQOwZsJz7_wRiyhKyODkVZiGdKA/edit?tab=t.0) — added to research-links |

---

## 9. How this connects to the repo

- **Ownership:** Aligns with Slack (Pratik/Chong "two halves") and principal brief. Boundary meeting = Jenny, Peter, Pratik, Chong.
- **Strategy:** Pratik's three components (transaction, accounting, finance) and three phases (creation, protection, post-payment) = input to Workshop 1/2 and to tagging pains (e.g. protection = "today" vs "once we have approval").
- **Workshop prep:** "Get AI in the room" and "technical constraints left" = principal move (Sune, Pratik's doc). Run sheet and "do we want a pain-points meeting?" still apply.
- **Crawl-walk-run / APIs:** Reinforces Angus and Chong's baseline-first and Melio API constraint in [strategic-context.md](../strategic-context.md).
