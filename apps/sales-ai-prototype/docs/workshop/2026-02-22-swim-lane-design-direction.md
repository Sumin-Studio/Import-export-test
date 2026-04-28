# Swim lane design direction (22 Feb 2026)

**Purpose:** Capture the current narrative and structure for the three swim lanes so the team can align before implementation. Complements (does not replace) the [20 Feb prototype update checklist](2026-02-20-prototype-updates-from-workshop.md) and [20 Feb meeting notes](../meeting-notes/2026-02-20-bill-pay-agent-workshop-andrew.md). See also [story direction from transcript](2026-02-22-story-direction-from-transcript.md).

---

## Three distinct interaction models

1. **Dashboard-native** — SL1: do it in the bills screen, no chat required. 3-click path, status upfront, progressive disclosure on tap.
2. **Conversational AI** — SL2 (and SL3 entry): ChatGPT-style; natural language in, suggestion or action out.
3. **Proactive notification** — SL3 payoff: you get a WhatsApp (or similar) ping; approve or act from there. “That’s really powerful.”

---

## Swim Lane 1 — Bill Payment Planner

**Get it out of the chatbot.** SL1 should be a **3-click path on the dashboard**, not in the chatbot.

- Show **status upfront**, **progressive disclosure on tap**, conservative/standard/growth choice, checkboxes, pay.
- Can work as a **specialized bill screen** that gathers things up — **no JAX needed** for the core flow.
- Order: (1) Dashboard inline, (2) bills table with inline affordances, (3) chatbot only when user wants to go deeper. **Training** is a first-class idea across the flow.

---

## Swim Lane 2 — Approval / stress → suggestion

**Pure ChatGPT integration story.**

- e.g. “I’m stressed about money this week” → AI suggests low-priority bills to clear.
- Conversational entry; suggestion or action out. Can also show requester (chatbot) + approver (WhatsApp ping) as the two sides of the same flow.

---

## Swim Lane 3 — Just Pay

- **In the chatbot** — user says a thing, Xero offers to do it, user confirms.
- Then you **receive a WhatsApp message** (confirmation or next step). That’s the payoff: proactive notification. Simple, powerful.

---

## How this fits existing work

- **Andrew Goodman guidance** (LLM for NL only, chips/guided UI, embedded sparkle) still applies; this doc adds **story order** and **emphasis** (dashboard first, training everywhere, SL3 = pure chat, SL2 = chat + WhatsApp).
- **Concrete UI tasks** remain in the [prototype update checklist](2026-02-20-prototype-updates-from-workshop.md); use that when implementing.
- **Narrative order for prototypes:** SL1 = 3-click dashboard (no JAX required for core path). SL2 = ChatGPT story (e.g. stress → suggest bills to clear) or requester chat + approver WhatsApp. SL3 = chatbot then WhatsApp message. See transcript doc for the “get it out of the chatbot” and three interaction models.
