# Do we want a pain-points meeting?

**Short answer:** Only if the goal is **discovery** or **shared ownership** of the list. If the goal is **alignment on what we’re solving and what we’re not**, you might want a different meeting.

---

## What we already have

The prep is full of pains:

- **AI Opportunities (Opportunity 2):** Cash flow & scheduling friction; ~25% bills created after paid; manual configuration; regional impact (US/UK/AU).
- **Confluence Approval Workflow:** Fragmented approval, no multi-step, Melio constraints; customer quotes (“two signatories”, “Create Payment off-screen”, “Ramp’s approval workflow”).
- **Payer-chasing / Payroll-chasing Miros:** Chasing managers for approvals; chasing overdue payments; manual repetitive payment tasks; inaccurate cash flow forecasting; auto-approve low-risk; reminders and escalation.

So we’re not short on **candidate pain points**. The open question is whether the room needs to *find* more or to *choose and scope* from what we have.

---

## When a “pain-points meeting” makes sense

- **Discovery:** You believe there are important pains that aren’t in the docs (e.g. recent feedback, edge cases, AB vs SB differences) and the room is the right place to surface them.
- **Ownership:** You want the room to co-create the list so they’re bought in and use the same language.
- **Tagging as ritual:** You want everyone to go through “Today vs Once we have approval flow” so the gaps become real for them.

**Risk:** Spending 90 minutes re-deriving a list that’s already in the prep, and still not answering “so which of these are we actually tackling?”

---

## When a different meeting makes more sense

- **Alignment on problems and constraints:** “Here’s the pain list we’ve compiled. Do we agree these are the right ones? What are we assuming vs not assuming (baseline, APIs)? Which pains are in scope for this sprint?” Shorter; starts from the prep; ends with “we agree these are the problems we’re designing for.”
- **Prioritisation and scope:** “We have pains A, B, C… Which do we want the POC agent to address? What’s API-free vs not? What depends on a baseline we don’t have?” No discovery; just choice and tagging.
- **Merge with Workshop 2:** One session: “Given the pains we’ve documented, what agent ideas could address them? Tag by API and baseline dependency.” Problems are input; output is agent shortlist + scope.

---

## How to decide

Ask:

1. **Do we need more pains, or a chosen subset?** If subset → alignment/prioritisation meeting, not discovery.
2. **Is the main gap “we don’t know the problems” or “we haven’t agreed what we’re solving”?** If the latter → alignment/scope meeting.
3. **Is the value of Workshop 1 the tagging (Today vs Once we have approval flow)?** If yes, you can still do that on a *pre-made* list: “Here are the pains from research; let’s tag them and agree which are in scope.” That’s not a “pain-points meeting”; it’s an **alignment on problems and scope** meeting.

---

## Recommendation

**Default to an alignment-on-problems-and-scope meeting**, not a pure pain-points discovery meeting:

- **Pre-read:** The compiled prep (pains already summarised).
- **In the room:** Name the three gaps (5 min). Walk through the **existing** pain list; add only what’s missing (10–15 min). **Tag** each: Today vs Once we have approval flow, and optionally Needs APIs (15 min). **Choose:** Which of these are we willing to say are “in scope” for this POC given our constraints? (10–15 min). Close with one artefact: **tagged pain list + in-scope subset** and owner for sharing.

You still get the tagged list and shared language. You avoid spending the session rediscovering what’s already in the doc. You get one step closer to “what are we actually solving?” which Workshop 2 can then turn into agent ideas.

If you have strong reason to believe the room has critical pains that aren’t in the prep, add a short “what are we missing?” burst (5–10 min) before tagging. But don’t assume the main job is to find pains. It might be to **agree** on them and **scope** them.
