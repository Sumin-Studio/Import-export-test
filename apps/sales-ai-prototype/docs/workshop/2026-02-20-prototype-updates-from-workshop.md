# Prototype and story updates from 20 Feb workshop

**Purpose:** Map meeting and Figma feedback to concrete prototype and storytelling changes. Use this as a checklist when updating the three swim lane prototypes and the overall narrative.

**Status:** Jon will address this checklist later (not immediately).

**Sources:** Andrew Goodman AI discussion, Bill Pay Agent Workshop (20 Feb), Figma annotations from the call.

**Narrative order (22 Feb):** See [2026-02-22-swim-lane-design-direction.md](2026-02-22-swim-lane-design-direction.md). **SL1:** (1) Dashboard inline action, (2) bills table with inline affordances, (3) chatbot; emphasise “training” in each. **SL2:** Requester = chatbot; approver = WhatsApp (or similar) ping. **SL3:** Single conversational flow: say it → Xero offers to do it → confirm → done.

---

## Overall story / walkthrough

| Feedback | Where | Concrete change |
|----------|--------|------------------|
| Lead with 3-click simple path, then show complex planner | Storytelling + SL1 | In slide or intro copy: “Most months: 3 clicks and you’re done. When it’s complicated, we’ve got you covered.” Then show simple path first, then planner. |
| Show entry point — not just chatbot | All three lanes | Add a “starting point” frame or slide: e.g. Awaiting Payments screen with contextual sparkle/chip (“Can I pay my bills this week?”). Makes clear it’s embedded, not drawer-only. |
| Click reduction vs competitors (e.g. 23 clicks) | SL1 success or intro | Add a line: “3 clicks vs 23 elsewhere” or “Recommendation → Review → Pay” with click count. |
| Record interaction / animated GIF for Diya | Deliverable | Create short GIFs of key moments (e.g. 3-click path; anomaly callout; Sarah → Alex handover) so Diya can watch async. |
| Tiered SKU hint (simple vs high-end) | SL1 success or planner | Optional line: “Standard: simple questions. Higher tier: full planner (Conservative / Standard / Growth).” |

**Files:** `src/walkthrough/data/slides.ts`, `src/walkthrough/slides/*`, slide 6 / FinalPrototypeSlide if you add intro copy; any new “entry point” slide or asset.

---

## Swim Lane 1: Bill Payment Planner

**Component:** `src/components/concepts/bill-pay-panel.tsx`

| Feedback | Location in prototype | Concrete change |
|----------|------------------------|------------------|
| **Entry from awaiting payments + sparkle** | First screen (overview) | Add a small “From: Awaiting Payments” or “Opened from: Awaiting Payments” label, or a chip that says “Can I pay my bills this week?” so it reads as contextual trigger, not generic chat. |
| **3-click path vs planner path** | Flow structure | Option A: Add a branch. First screen offers two CTAs: “Pay my open bills this week” (→ 3-click flow) and “Plan my payments” (→ current Conservative/Standard/Growth flow). Option B: Keep one flow but add copy that says “3 clicks to pay” on the simple path and “Or plan in detail” for the planner. |
| **Pre-planted chips instead of open chat** | JustAskXeroFrame or overview | In frame or above content: chips like “Can I pay my 3 bills this week?” / “Show critical bills” / “I want to plan myself” (per Chong). Reduces open-field feel. |
| **Progressive disclosure — what to show** | Bill list | Keep “+N more bills”; consider adding a note “Showing bills due in next 4 weeks” or similar so the cutoff is explicit. |
| **Explain why (LLM)** | Anomaly row (e.g. Capital Cab Co) | Add a CTA: “Why 40% increase?” that opens or expands an LLM-style explanation (e.g. “Past 3 months you paid $4.4k–$4.6k; this one is $6.1k. Rate change or error?”). |
| **User can edit cash flow expectations** | Plan result screen | Add a line or control: “I’m okay with a lower buffer” / “Edit minimum balance” so it’s not only “deselect bills”. |
| **Trainability peek** | Success screen | Add one line: “In the future: we can do this automatically — you won’t need to ask.” or “Going forward, do this when I have the cash.” |
| **Trust thermostat** | “Looks good” vs “Needs attention” | In narrative/doc: “Looks good” = one-button approve; “Needs attention” = step-through. No code change required if already implied by flow. |

---

## Swim Lane 2: Intelligent Bill Approval

**Component:** `src/components/concepts/intelligent-bill-approval-panel.tsx`

| Feedback | Location in prototype | Concrete change |
|----------|------------------------|------------------|
| **Entry from Bill Safety Shield / awaiting payments** | Submitter first screen | Add context: e.g. “From: Awaiting Payments” or “Bill Safety Shield” so it’s clear where the sparkle lives. |
| **Fewer words; clear Sarah → Alex transition** | Submitter “Sent” screen and Approver first screen | Shorten copy. Add a simple visual: “Sarah → Sent → Alex” or “Step 1: Sarah sent. Step 2: Alex reviews.” so the handover is obvious without reading a lot. |
| **Group by problem type** | “Needs your review” list | Group flags by type (e.g. “Unusual amount”, “Duplicate”, “Bank details changed”) with counts, then list bills under each. |
| **Literal email workflow** | Submitter “Sent” and Approver | Add copy: “An email was sent to Alex” and “Alex receives an email with…” Show stages: “1. Email sent → 2. Alex responds → 3. …” |
| **Sarah signed off at 3:24 + note** | Approver “Looks good” items that were flagged | For items Sarah authorised from detail view, show “Sarah signed off 20 Feb, 3:24 pm” and “Note: [optional note]” so Alex sees the handover. (Partially there; ensure timestamp + note are prominent.) |
| **Chasing** | After “Sent” or in Approver | Add a line or state: “If Alex doesn’t respond, we’ll send a reminder” / “Chasing: reminder sent.” |
| **Stages in UI** | Approver run | Show steps: e.g. “Email sent” / “Email opened” / “Approved” (or similar) so the pipeline is visible. |
| **Swipe / WhatsApp / SMS** | Narrative or future slide | Note in doc or slide: “Approval could be via email, SMS, or WhatsApp” — no need to build all in prototype. |

---

## Swim Lane 3: Just Pay (No-Bill Bill Pay)

**Component:** `src/components/concepts/no-bill-bill-pay-panel.tsx`

| Feedback | Location in prototype | Concrete change |
|----------|------------------------|------------------|
| **Entry point (e.g. homepage “Just Pay”)** | Entry screen or story | Add a line: “From: Homepage — Just Pay” or “I want to pay my plumber today” so the entry is clear. Option: small “Starting point” label. |
| **Voice → review → one click** | Entry or narrative | Add a chip or line: “Or say: ‘Pay Joel $100’” / “Voice: ‘Pay Swanston Security $1,680’” to hint at voice without building it. |
| **Confirm in WhatsApp** | Success or narrative | Optional line on success: “We can send confirmation to your phone (e.g. WhatsApp).” |
| **“Repeat this” for Recently paid** | Entry screen, “Recently paid” list | Add a small action per row: “Repeat” or “Pay again” to imply scheduling/repeat. |
| **Primary CTAs blue, not orange** | All CTAs | Ensure every primary button uses JAX blue (`#0d47a1` / ACCENT / `bg-primary`). No orange for main actions. (Current code uses ACCENT; if any Figma asset was orange, align to blue.) |

---

## Shared frame (Just Ask Xero)

**Component:** `src/components/concepts/just-ask-xero-frame.tsx`

| Feedback | Location | Concrete change |
|----------|----------|------------------|
| **Pre-planted chips / guided, not open field** | Above or inside chat input | Add an optional row of chips (e.g. “Pay my bills this week” / “Show critical bills” / “Plan my payments”) that can be passed as props so each panel can show contextual chips. Reduces “open chatbot” feel. |

---

## Implementation priority (suggested)

1. **High impact, low effort:** Entry point labels (“From: Awaiting Payments”), trainability line on SL1 success, “3 clicks” and “23 elsewhere” in copy, blue CTAs check.
2. **Story / Diya:** Simple path vs planner path in storytelling; GIF or recorded flow for Diya.
3. **Medium effort:** Chips in frame or on overview; group by problem in SL2; email stages and chasing in SL2.
4. **Later / narrative only:** Voice, WhatsApp, UK open banking, tiered SKU — doc or slide note without full UI.

---

## File reference

| Area | File(s) |
|------|--------|
| Walkthrough slides | `src/walkthrough/data/slides.ts`, `src/walkthrough/slides/*.tsx` |
| SL1 Bill Pay Planner | `src/components/concepts/bill-pay-panel.tsx` |
| SL2 Approval | `src/components/concepts/intelligent-bill-approval-panel.tsx` |
| SL3 Just Pay | `src/components/concepts/no-bill-bill-pay-panel.tsx` |
| JAX frame | `src/components/concepts/just-ask-xero-frame.tsx` |
| Final prototypes slide | `src/walkthrough/slides/FinalPrototypeSlide.tsx` |
