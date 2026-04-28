# Bill Pay Agent PoC — Workshop (Andrew Goodman follow-up)

**Date:** 20 Feb 2026  
**Meeting:** Bill Pay Agent PoC | Workshop  
**Attendees:** Jiten Taluja, Neeraj Sahu, Tauqir Ahmed, David Brown, Chong Xu, Kate Givoni, Jenny Nedanovski, Jon Bell

---

## Purpose

Follow-up to Andrew Goodman (Director of Product AI) discussion: align prototype direction with his guidance and lock next steps for three swim lanes and DIA presentation.

---

## Andrew Goodman AI guidance (recap)

- **Avoid LLM for core data processing** — Use traditional code for number crunching and calculations; LLM only for natural-language UI translation. Reduces non-deterministic errors and guardrails.
- **Chatbot interface** — Significant work required. Prefer pre-planted questions/chips over open field; dynamic but guided interactions.
- **Entry points** — Embedded sparkle triggers (e.g. in awaiting payments) more effective than drawer-based chat. Contextual trigger, then structured UI; user can close and return to existing flow.

---

## Design prototype progress

- **Jon:** Delivering three swim lane prototypes (whiteboard sketch level) by end of day; URL for async team review.
- **Storytelling:** Dorothy and Peter impressed; Pete requested similar approach for other projects. Strong foundation for DIA.

---

## Swim Lane 1: Bill Payment Planner

**Feedback applied:**

- **Entry point:** Start from awaiting payments with contextual sparkle (e.g. “Can I pay my bills this week?”). Not just a chatbot — natively integrated. Show the actual starting point.
- **Two tracks:** (1) **3-click simple path** — one click recommendation, one review, one pay; lead with this as the “wow” moment. (2) **Planner path** for more complex/sophisticated users.
- **Click reduction:** Call out vs competitors (e.g. 23 clicks on Bill.com). “3 clicks: look at recommendation, review, pay.”
- **Progressive disclosure:** Show complexity when needed (e.g. “Show more”); don’t overload first screen. Consider time window (e.g. bills due next 2–4 weeks).
- **Trust thermostat:** “Looks good” can be one-button fast; “Needs attention” needs more care. Balance speed vs control.
- **LLM use:** Explain anomalies in natural language (e.g. “Why 40% increase?” — historical context). Not for number crunching.
- **Trainability peek:** Hint at “Going forward, do this automatically” / “You don’t need to ask next time” without building full UI. Tiered: simple for standard SKU, advanced for high-end.
- **User editing:** Allow editing cash flow expectations and supplier criticality, not just deselecting bills.
- **Three scenario angles:** “Can I pay my 3 bills this week?”; “Show me critical bills”; “I want to plan myself.” First two = faster; third = full planner.

---

## Swim Lane 2: Approval Workflow

**Feedback applied:**

- **Entry:** From awaiting payments or a “Bill Safety Shield” / “Bill Risk” column — contextual sparkle.
- **Simplification:** Fewer words; make Sarah → Alex transition visually clear (what happened between steps).
- **Group by problem:** Structure “Needs attention” by type of problem, not just by bill.
- **Email workflow:** Literal email — Sarah confirms in Xero → email to Alex; Alex can act from email; chasing = email reminders. Show stages: e.g. (1) Email sent, (2) Email responded.
- **Chasing:** Agent sends reminders to Alex (“truly agentic”).
- **Handover:** “Sarah signed off yesterday at 3:24” + optional note for Alex.
- **Channels:** Consider email, SMS, WhatsApp for approval (e.g. “Swipe to approve” in app; approval via WhatsApp).
- **Split framing:** (1) Risk detection / flagging (isolated). (2) Batch approval + email + chasing. Milio iframe/API constraints to be documented in PRD.

---

## Swim Lane 3: Just Pay

**Feedback applied:**

- **Entry:** Show starting point (e.g. homepage “Just Pay” / “I want to pay my plumber today”). Reference what Intuit does.
- **Voice:** Voice → review → one-click pay as aspirational “Hollywood” moment. Confirm (e.g. in WhatsApp) for trust.
- **“Repeat this”:** For “Recently paid” — suggest repeat/schedule.
- **Primary CTAs:** Blue (JAX), not orange.
- **UK open banking:** Future possibility to skip traditional auth (e.g. ~50% confidence by end of year); document as future step.

---

## Next steps

| Owner    | Action |
|----------|--------|
| **Jon**  | Deliver prototype URL by end of day (20 Feb); async feedback next week. |
| **Team** | Async feedback throughout next week (Jenny, Kate, Chong, J less available). |
| **Neeraj** | Start PRD for first two swim lanes; share link for updates. |
| **Tauqir** | Refine PoC architecture per Andrew’s guidance (code for crunching, LLM for NL UI). |
| **Chong** | Strategy deck for Diya presentation. |
| **Team** | Feasibility assessment for Melio integration (week after next). |

---

## Xerocon / Diya

- **Timeline:** ~90 days to delivery of 2+ agents (bill pay and approval variants) for Xerocon.
- **Diya:** Chong syncing with Pete and Darryl on overall payments agent; finalise which concepts to prototype for Diya. More concepts = better.
- **Takeaway for Diya:** Record interaction or use animated GIF so Diya can watch on her own; compact “aha” moments.

---

## Technical notes

- Anomaly detection and duplicate identification; heuristic rules for risk flagging.
- Tiered approach: simple features for standard users, advanced for sophisticated users.
- Milio: no API for iframe modifications; user roles/permissions for approval still being defined — capture in PRD.
