# Three Concept Demos — Pre-Show Critique

**Date:** 2026-02-20
**Context:** Built three JAX concept demos (`/app/concept/1`, `/app/concept/2`, `/app/concept/3`) sharing a "Just Ask Xero" frame. This doc captures what's likely to land well vs. get pushback, before showing stakeholders.

---

## What people will probably like

**Concept 1 (Bill Pay Planner) is strong.** It has real depth — strategy selection, interactive checkboxes, cash impact math that updates, anomaly warnings. It tells a story: "here's your mess, pick an approach, see the trade-offs, act." That's the SL1 vision working.

**The shared JAX frame sells consistency.** Three demos that look like one product, not three disconnected ideas. The header/chat/disclaimer pattern makes it feel like a real feature, not a wireframe.

**Concept 2's risk flags are immediately tangible.** "Unusual amount", "possible duplicate", "bank details changed" — people can see themselves in those moments. Maps cleanly to Chong/Bharathi's "Bill Safety Shield" (section 1.4). The flagged-vs-clean split in approve-all is a nice touch.

**Concept 3 is genuinely novel.** It directly addresses the 25%-of-bills-created-after-paid problem. "Just pay, we'll create the record" flips the mental model. The "Xero will automatically" list in the confirm screen is the best single moment across all three demos — it shows the system working *for* you.

**They're interactive, not slides.** Clicking through beats a Figma walkthrough for the DIA pitch or Melio offsite.

---

## What people will probably push back on

**Concept 2 and 3 are noticeably thinner than Concept 1.** Concept 1 has four meaningful screens with real interactions (expandable rows, checkboxes, strategy switching). Concepts 2 and 3 are more linear click-throughs. If you show them side by side, the quality gap is visible.

**The SL2 scope might be wrong.** PROJECT-STATUS.md says explicitly:

> Tauqir/Chong SL2 clarification (19 Feb): SL2 = **payment approval feature** (Melio), not pre-payment bill approval (Pratik's team).

What we built is pre-payment bill approval (should I approve this bill?), not payment approval (should this payment go through?). Chong may flag this as the wrong problem for SL2.

**These are chatbot panels — but the design direction says "beyond chatbot."** From PROJECT-STATUS.md:

> Design direction: JAX-aligned, beyond chatbot paradigm (emergent banners, list view integration)

All three concepts are a side panel with a chat input at the bottom. Neeraj and Britt may ask "where's the list view integration? Where are the emergent banners?" The decorative chat input reinforces this — it's `readOnly` and does nothing, which could undermine credibility if someone tries to type.

**The random history data in Concept 2 is a landmine.** The detail screen generates payment history with `Math.random()`, so the numbers change every render. If someone navigates back and forth, the amounts shift. Small thing, but it looks broken.

**Concept 3 might alarm Angus.** Paying without a bill requires payment APIs. Angus's constraint is "without APIs, there is no meaningful AI — and Melio doesn't currently expose APIs." Concept 3 is the most API-dependent of the three. He may ask "how does this actually work?"

**None of these show AI *doing* anything.** The mock data is static. There's no moment where you see the AI analyze, reason, or learn. For the DIA pitch ("go big and bold, 5-6 agents"), these could feel like UI mockups with an AI label rather than agent demonstrations.

**Neeraj flagged information overload.** Concept 1's overview screen is dense — a stat line, a stacked bar, a legend grid, a table, action buttons, and a CTA. That feedback may resurface.

---

## Known bugs to fix before showing

1. **`Math.random()` in Concept 2** — payment history amounts in the detail screen change on every render. Use deterministic amounts based on the bill data.

---

## Strategic considerations

- **DIA pitch needs 5–6 agents.** These are 3 concepts, not 6 agents. Framing matters.
- **Concept 1 alone may be stronger** for some audiences than showing all three, given the depth gap between 1 and 2/3.
- **"But this isn't AI" rebuttal needed.** These demos show what AI *enables*, not the AI itself. Have that framing ready.
- **SL2 scope decision.** Either reframe Concept 2 as "bill safety shield" (which is what it actually is) or rebuild to match payment approval. The Chong/Bharathi doc calls this "Bill Safety Shield" (1.4) — that framing may work.

---

## Files involved

| File | What |
|------|------|
| `src/components/concepts/just-ask-xero-frame.tsx` | Shared JAX frame (header + children + chat input) |
| `src/components/concepts/bill-pay-panel.tsx` | Concept 1 — refactored to use shared frame |
| `src/components/concepts/intelligent-bill-approval-panel.tsx` | Concept 2 — bill approval with risk flags |
| `src/components/concepts/no-bill-bill-pay-panel.tsx` | Concept 3 — pay without creating a bill |
| `src/app/app/concept/[id]/page.tsx` | Route handler for all three |
| `src/walkthrough/slides/FinalPrototypeSlide.tsx` | Updated with three launch buttons |
