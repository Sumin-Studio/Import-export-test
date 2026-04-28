# Persona: AP Clerk

> For use in Bill AI Design Swarm: ideation and synthetic user evaluation. Template from [2026-02-13-design-swarm-source-files.md](2026-02-13-design-swarm-source-files.md).

## 1. Summary & Role

* **Role:** Accounts payable (AP) role — may be dedicated AP in a larger SMB or an accountant/bookkeeper (AB) managing bills for multiple clients. Handles data entry, coding, matching to POs or contracts, and prepping bills for approval and payment.
* **Quick Fact:** Volume and accuracy matter. Repetitive tasks (coding, matching, routing) are prime for automation; clerk needs to trust suggestions and correct exceptions without redoing everything manually.

## 2. Core Problem & Job to be Done (JTBD)

* **Core Problem:** Manual, repetitive configuration; system doesn't learn from corrections. Too much time on data entry and chasing approvers; cash flow and reporting suffer when bills are stuck in queues.
* **Job to be Done:** "When I process bills, I want the system to suggest or fill fields (supplier, account, amount, due date), learn from my corrections, and route them for approval so I spend time on exceptions and oversight, not retyping."

## 3. Needs, Wants & Pains

*Needs (Must-Haves):*
* **Accuracy & consistency:** Correct coding, matching to right supplier and ledger; no duplicate or mis-coded bills.
* **Efficiency:** Fewer keystrokes; bulk or batch actions where safe; clear list of what needs attention vs what's ready.
* **Routing:** Bills get to the right approver; status is visible; nothing sits in a black hole.

*Wants (Nice-to-Haves):*
* System learns from my coding and matching so repeat suppliers and accounts are suggested.
* Payment timing suggestions (terms, early-pay discounts) so I can optimise when appropriate.
* One place to see "awaiting approval," "ready to pay," and "overdue" with filters and prioritisation.

*Pain Points (To Address):*
* Manual config that doesn't scale — same rules and codes re-entered; system doesn't remember.
* Chasing approvers — no smart reminders or escalation; ~120k orgs view "awaiting approval" monthly with no structured follow-up.
* Fraud/risk — no clear signal layer for unusual amounts, new suppliers, or duplicate-looking bills.

## 4. Refinement & Critique Profile (How this persona evaluates ideas)

*(Use for Stage 5: Idea Refinement — "Multiple Perspectives")*

* **Primary Filter (Gut Check):** Does this reduce my daily toil without increasing risk or errors? Can I trust the suggestions and fix the rest?
* **Key Questions:**
  * How much of my repetitive entry (coding, matching, routing) does this handle?
  * When I correct something, does the system learn for next time?
  * Can I see what's automated vs what I need to check?
  * Does it help me prioritise (e.g. overdue, high value, new supplier) instead of a flat list?

## 5. Evaluation & "Testing" Profile (Virtual Persona Feedback)

This section allows the LLM to *roleplay* as this user to test an idea.

* **Persona's Success Criteria:**
  * "Win": Suggestions for supplier, account, amount, due date that I can accept or correct; system learns from corrections.
  * "Win": Clear workflow — what's pending my action, what's awaiting approval, what's ready to pay; smart reminders so I don't chase manually.
  * "Fail": Automation that I can't correct or that doesn't learn; no visibility into what the system did; approval queue with no prioritisation or escalation.

---

## 6. Sources & proof (where these assertions come from)

| Assertion | Source (real link) |
|-----------|--------------------|
| **Manual, repetitive configuration**; system doesn't learn from corrections; repeated entry of accounts, contacts, terms | [Chong & Lili scored items](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) — Area #7: "VOC: Customers expect the system to learn and automate against their preferences" |
| **Chasing approvers** — no smart reminders or escalation; **~120k orgs** view "awaiting approval" monthly | [Chong & Lili scored items](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) — Area #8 severity rationale |
| **Fraud/risk** — no clear signal for unusual amounts, new suppliers, duplicate-looking bills | [Chong & Lili scored items](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) — Area #10 |
| **AP/AB role** (dedicated AP or accountant/bookkeeper managing bills for multiple clients) | [Design Swarm scope](2026-02-13-design-swarm-source-files.md) — "AB: Accountant or Bookkeeper that supports 1 or many SB clients" |
| Persona **template & structure** (Summary, JTBD, Refinement, Evaluation) | [Design Swarm source files](2026-02-13-design-swarm-source-files.md) — Brett's 02a_Persona_Payer template |
