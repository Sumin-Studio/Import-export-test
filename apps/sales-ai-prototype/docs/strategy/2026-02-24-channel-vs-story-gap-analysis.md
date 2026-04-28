# Channel vs Jon’s story — gap analysis

**Purpose:** Compare what the canonical Slack channel (C0AGMBC51U0) is talking about vs what Jon’s story (three concepts, Diya elevator pitches, swim lanes) proposes. Find gaps so the story can be aligned.

**Sources:** [Channel snapshot (24 Feb)](../meeting-notes/2026-02-24-slack-channel-C0AGMBC51U0-from-glean.md); [David feedback + elevator pitches](../meeting-notes/2026-02-23-david-feedback-elevator-pitches.md); [Swim lane design direction](../workshop/2026-02-22-swim-lane-design-direction.md); Chong/Bharathi strategy in repo.

---

## Is the channel pull “everything”?

**Short answer: probably the main threads, not every message.**

- Glean was queried with `app: slack`, `channel: C0AGMBC51U0`, and both keyword search (“bill ai automation”) and exhaustive `*` + recency. That returned a finite set of documents (threads/messages).
- **What we likely have:** The main conversations from 19–23 Feb: Chong/Bharathi/Peter strategy and themes, Diya drumbeats, resourcing, Pratik “map vs territory,” Peter’s “prototypes together” and committed scope, Jon’s check-in.
- **What we might be missing:** Very short replies, threads that didn’t rank, messages after the pull, or DMs/other channels. For a single “source of truth” view of the channel, the snapshot is strong; for “every word ever said,” run another Glean pull (or export from Slack) and append.

---

## What the channel is talking about

| Theme | Who | What they’re saying |
|-------|-----|----------------------|
| **Committed scope** | Peter (23 Feb) | **Chasing agent** and **zero bill entry** — call these out as committed. |
| **Overarching theme** | Bharathi (21 Feb) | Frame as **cashflow optimization** (not “payment-super-agent”). Customer pain is cashflow; it transcends the single payment transaction and AR/AP. |
| **Story / prototypes together** | Peter (23 Feb) | Keep all related prototypes in one narrative: (1) **Onboarding + cashflow planner** — take pain out of onboarding, connect bank → we predict bills, accurate cashflow view. (2) **Bills** — one-click **bill enrichment**, **bill runner** (approve + schedule = second click). (3) **Invoicing** — JAX create invoice, **chasing agent** for personalised “get paid” plan. (4) **Practice supercharge** — one prompt, personalised cashflow plans for clients. |
| **JBTD** | Peter (23 Feb) | Map which parts of the customer journey the agents operate in; use jobs-to-be-done. Example: invoicing agents ↔ “getting paid” JBTD. Shift: laborious → as simple as a prompt or a click. |
| **Diya** | Chong (20 Feb), Bharathi (21 Feb) | Drumbeats to Diya review (next Thursday). Resourcing kept open; focus on **selling the ideas**. Don’t talk resource until feasibility/value is understood. |
| **Strategy / decks** | Chong (19–20 Feb) | Payments strategy (Four Actions), AI vision and roadmap — early drafts; align with Peter, Darren. |
| **Map vs territory** | Pratik (20 Feb), Chong | Platform data often incomplete (map ≠ territory); ecosystem/data discussion. Chong: orthogonal to AI approach for now. |

**Channel “committed” in plain language:**  
(1) **Zero bill entry** = bills: get to one-click entry (enrichment) and easy approve/schedule (bill runner).  
(2) **Chasing agent** = **invoicing / get paid**: chase *customers* to pay *invoices* (Pay In), not chasing *approvers* for *bills* (Pay Out).

---

## What Jon’s story is proposing

| Concept | One-line | Delivery |
|--------|----------|----------|
| **Bill Payment Planner (SL1)** | We recommend which bills to pay this week; you approve in 3 clicks (or tweak in plan mode). | Dashboard / bills view first (inline); optional chat for “show your work.” |
| **Intelligent Bill Approval (SL2)** | We flag risk and send approval to the right person; they get WhatsApp (or email), tap to approve or open Xero. | Requester in-product; **approver in WhatsApp** (alternative channel). |
| **Just Pay (SL3)** | Pay without creating a bill first. Say it (in Xero or in an agent); we create the record and pay. | In-product or in agent (e.g. ChatGPT); confirmation e.g. WhatsApp. |

**Framing:** Three product concepts for Diya; elevator pitches for what/why; delivery varies (dashboard / WhatsApp / agent), not everything in a side panel. **Scope:** Bills / Pay Out only (planner, approval, just pay). No onboarding, no invoicing/chasing, no practice supercharge in the three concepts.

---

## Gaps (channel vs story)

### 1. **“Chasing agent” = Pay In, not Pay Out**

- **Channel:** “Chasing agent” is committed and is described in the **Invoicing** theme: “once the invoice is sent use the **chasing agent** to create a personalised plan … to get you paid on time.” That’s **Pay In** (invoice → get paid).
- **Jon’s story:** SL2 is **Intelligent Bill Approval** — we chase the *approver* (WhatsApp) so they approve *bills*. That’s **Pay Out** (bill → approve → pay).
- **Gap:** The channel’s “chasing agent” and your “approval + WhatsApp” are different: channel = chase *customers* to pay *invoices*; story = chase *approvers* to approve *bills*. Your story doesn’t include the Pay In chasing agent; the channel commits to it. So either (a) the story explicitly says “we’re focusing on Pay Out today; chasing agent (Pay In) is committed separately,” or (b) the full narrative (e.g. Peter’s four themes) is the one that includes both.

---

### 2. **Zero bill entry: enrichment vs planner vs Just Pay**

- **Channel:** “Zero bill entry” + **Bills** theme = “one click” **bill enrichment** + **bill runner** (approve/schedule second click). So “zero bill entry” in channel = reducing *entry* (enrichment) and *approval/scheduling* (runner).
- **Jon’s story:** “Zero Bill Entry” appears in vision/CLAUDE; the **three concepts** are: (1) **Planner** — which bills to pay when (planning, not entry). (2) **Approval** — flag risk, route to approver. (3) **Just Pay** — pay without creating a bill (no-bill pay).
- **Gap:** **Bill enrichment** (one-click entry from invoice/document) is not a starring concept in your three. Your SL1 is “plan which bills to pay” (cognitive load, 3 clicks); the channel’s “one-click bill enrichment” is *creating/filling the bill* with one click. So “zero bill entry” in the channel spans **enrichment** (entry) + **runner** (approve/schedule); your story leads with **planner** (when to pay) and **approval** (who approves) and **Just Pay** (no bill). To align: either add “bill enrichment / one-click entry” as a clear beat in the story, or state explicitly that “zero bill entry” in this pitch is represented by planner + approval + Just Pay (and enrichment is in the same Bills theme elsewhere).

---

### 3. **Story scope: four themes vs three concepts**

- **Channel (Peter):** One narrative with **four** areas: (1) Onboarding + cashflow planner, (2) Bills (enrichment + bill runner), (3) Invoicing (JAX + chasing agent), (4) Practice supercharge.
- **Jon’s story:** **Three** concepts, all Bills/Pay Out: Bill Payment Planner, Intelligent Bill Approval, Just Pay. No onboarding, no invoicing/chasing, no practice.
- **Gap:** Your story is a **subset** of what the channel wants “together.” For Diya, that can be intentional (“we’re deep on Pay Out / bills today; the full vision is in Chong’s deck”). The risk: if Diya or David expect the **full** narrative (onboarding, bills, invoicing, practice), your three concepts can look like only one slice. **Recommendation:** One line in the pitch: “These three are the Bills / Pay Out slice; the full story (onboarding, bills, invoicing, practice) is in [Chong’s AI vision deck].”

---

### 4. **Cashflow optimization as umbrella**

- **Channel (Bharathi):** Lead with **cashflow optimization**; customer pain is cashflow; it transcends payment and AR/AP.
- **Jon’s story:** Concepts are “Bill Payment Planner,” “Intelligent Bill Approval,” “Just Pay” — product-led. The planner is cashflow-aware (which bills when) but the **umbrella** isn’t “cashflow optimization.”
- **Gap:** If the channel wants the **theme** to be cashflow optimization, your story could add a single opening line, e.g. “We’re proposing cashflow optimization for Pay Out: three ways we make bills simple — plan, approve, or just pay.”

---

### 5. **JBTD and journey mapping**

- **Channel (Peter):** Use jobs-to-be-done to show where agents operate; link e.g. invoicing agents to “getting paid” JBTD; “laborious → prompt or click.”
- **Jon’s story:** No explicit JBTD or journey map in the elevator pitches or design direction.
- **Gap:** Small. Adding one slide or sentence that maps “Bill Pay Planner → pay bills on time / manage cashflow,” “Approval → get bills approved without chasing,” “Just Pay → pay without data entry” to JBTD would align with Peter’s ask.

---

### 6. **Naming consistency**

- **Channel:** “Bill enrichment,” “bill runner,” “chasing agent,” “onboarding + cashflow planner,” “practice supercharge.”
- **Jon’s story:** “Bill Payment Planner,” “Intelligent Bill Approval,” “Just Pay.”
- **Gap:** “Bill runner” (channel) ≈ approve + schedule in one flow — overlaps your Planner (approve plan) and Approval (approve batch). Naming isn’t wrong but could be clarified: e.g. “Bill runner = approve/schedule; in our story that shows up in Planner (approve plan) and Approval (approve batch).”

---

## Summary table

| Dimension | Channel | Jon’s story | Gap |
|-----------|---------|-------------|-----|
| **Committed** | Chasing agent (Pay In) + zero bill entry (Bills) | — | Story doesn’t include chasing agent (Pay In); need to position. |
| **Zero bill entry** | Enrichment (one click) + bill runner (approve/schedule) | Planner + Approval + Just Pay | Enrichment not a starring concept in the three. |
| **Scope** | Four themes (onboarding, bills, invoicing, practice) | Three concepts (bills only) | Story is bills slice; full narrative elsewhere. |
| **Umbrella theme** | Cashflow optimization | Three product concepts | Add one-line cashflow framing if desired. |
| **JBTD** | Map agents to jobs-to-be-done | Not explicit | Optional: one slide/sentence mapping concepts to JBTD. |
| **Naming** | Bill enrichment, bill runner, chasing agent | Bill Pay Planner, Intelligent Bill Approval, Just Pay | Clarify how runner/enrichment map to your three. |

---

## Recommended next steps

1. **Explicitly position scope:** “These three concepts are the Bills / Pay Out slice. Chasing agent (Pay In) and full vision (onboarding, invoicing, practice) are in Chong’s deck / channel.”
2. **Zero bill entry:** Either add “bill enrichment / one-click entry” as a clear beat, or state how zero bill entry is represented today (planner + approval + Just Pay) and that enrichment sits in the same Bills theme.
3. **One-line cashflow umbrella:** Add a single sentence framing the three as cashflow optimization for Pay Out (optional but aligned to Bharathi).
4. **Optional JBTD:** One slide or sentence mapping the three concepts to “get bills paid / manage cashflow,” “get approval without chasing,” “pay without entry” (aligns with Peter).

After that, the channel pull and this gap doc can be refreshed when new channel content or story changes land.
