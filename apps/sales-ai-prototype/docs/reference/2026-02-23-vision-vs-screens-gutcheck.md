# Vision vs screens — gut check (Chong’s Payments Agent Vision)

**Date:** 2026-02-23  
**Purpose:** Fine-toothed alignment of current screens (Bill Pay Planner 1–5, Intelligent Bill Approval, Just Pay 1–2) against Chong’s Payments “Super” Agent vision, stakeholder guidance, and presentation risk. Use when prepping for Diya or internal reviews.

**Sources:** [Payments Agent Vision](https://docs.google.com/presentation/d/1EXwgPuXxWq9TFgkxhVdl7WnapkaOodoOuipjotMQhwg/edit?slide=id.g38ca174e81a_1_492) (Chong, Feb 2026), workshop notes (20 Feb), Chong/Bharathi built-once doc, David’s kickoff framing, prototype-updates checklist.

---

## Chong’s vision (PDF) — what you’re being measured against

- **Super Agent:** Orchestrates AR + AP against one ledger, one cash flow goal. Differentiated vs QBO, Sage, Ramp.
- **Zero Frictions (SB):** “Reimagine every step by eliminating manual entry (DIY → Do It For You).”
- **Pain points to solve:** 21+ clicks per bill; 44% SBs “caught short”; 50% payments late; time sink and cognitive load; cash flow risk before payments.
- **Prototype buckets:** Prototype I = Cash Flow Planner, Bill Enrichment, Payment Chasing, Bill Runner. Prototype II = **Just Pay, Safety Shield, Approval Automation**, Fast Pass. Prototype III = Prediction/Collection, Smart Collect.
- **Your three lanes map cleanly:** SL1 = Cash Flow Planner / Bill Runner; SL2 = Safety Shield + Approval Automation; SL3 = Just Pay.

So the brief is: **differentiation** (not parity), **zero frictions** (clicks/cognitive load), **system of action** (do it for you), and **clear agent portfolio** (table stake vs differentiated).

---

## What isn’t agent enough

### Bill Pay Planner (1–5)

- **Planner-1–3:** “Upload & Add Bill” is the hero CTA. That’s **manual-first**. The vision is “Do It For You” — agent should feel like it’s already working (suggestions, pre-fill, “we’ve got this”) with upload as one input among many (Email, Connect App, Scan). If the first thing people see is “add a bill,” it reads as incremental, not agent-led.
- **AI Suggestions box:** Right now it’s a **separate** pink callout with internal design questions (“Reconsider some of data build up…”, “Progressive, obnoxious and not a one-off”). For “agent enough,” suggestions need to be **in the flow** — e.g. inline in the bill list, on the dashboard widgets, or as a clear “AI suggests: pay these 3 this week” with one tap to accept. The workshop direction is “dashboard-native, 3-click path, not just chatbot.”
- **Planner-4:** “Show progressive snippet by AI with clear CTA” is a **direction**, not a designed moment. Without a concrete example (e.g. “Pay these 2 by Friday to keep $X buffer — [Accept plan]”), it can look like a placeholder. Same for “AI ASSIST” — what does it do in one sentence?
- **Planner-5 (mobile):** “We have NO IDEA how AI will manifest itself on mobile” is honest but **presentation risk**. The vision doc and Chong/Bharathi both call out SB and mobile. Either (a) frame these as “candidate patterns we’re testing” with one clear agent moment (e.g. pre-filled Add Bill from photo/email), or (b) add one mobile frame that *does* show AI (e.g. “3 bills ready to pay — tap to pay” with one tap).

### Intelligent Bill Approval

- **Call out / drill-down:** “Call out what needs attention” and “Drill-down to show things that don’t look quite right” are **correct** and hit Safety Shield. What’s missing: **what the agent suggests next**. E.g. “Agent suggests: Hold payment until you confirm new bank details” or “Likely duplicate of Bill #123 — [Merge] [Dismiss].” Right now it’s “here’s a flag”; agent-enough is “here’s the flag + suggested action.”
- **WhatsApp:** Strong. Proactive notification to approve is “system of action.” Make sure the **link into Xero** is explicit (Chong’s doc: “with links to Xero of course”) and that the one-tap action (e.g. Approve / Reject) is visible, not buried in copy.

### Just Pay (1–2)

- **Content mismatch:** Screens show **“Xero, show me average revenue per employee…”** and **“how are my sales trending?”** — i.e. **reporting/analytics**, not bill payment. The brief is **Just Pay**: say it → we pay (or create bill + pay). If these are “how we show up in agents” (Opus, Recruitment agent, ChatGPT+), that’s a **different story** (distribution/channel). For the **Payments Agent Vision** and Diya, you need at least one flow that is **bill/payment-specific**: e.g. “Pay Joel $100” or “Pay Swanston Security $1,680” → review → confirm. Otherwise it looks like you’re showing generic JAX, not the Pay Out pillar.
- **“Ah-ha moment where we are magically providing value”:** The moment needs to be **payment value** (bill created, payment scheduled, approval sent), not “here’s a chart.” Swap in a payment outcome for the same UI pattern.

---

## What did Chong say about “too agent” / balance?

There’s no direct quote in the repo like “Chong said don’t be too agent.” What **is** in the record:

- **Pre-planted chips over open chat** (workshop + Andrew): Guided, not open field. So “too agent” in one sense = **overwhelming or vague** (generic chat) vs **focused and scoped** (chips, clear CTAs).
- **Differentiation, not checklist** (Diya): Chong’s deck for Diya is about **differentiation**. “Too agent” could mean “so many features it’s a checklist” rather than a clear, bold story. Your screens should tell **one or two** strong stories per lane, not every possible feature.
- **Your pink callouts:** “Progressive, obnoxious and not a one-off” is **your** internal tension: how visible/pushy should the agent be? Chong’s vision is “Do It For You” and “zero frictions” — so the bar is **helpful and proactive**, not passive. The risk is **obnoxious** = interrupting without value. So: **progressive and persistent is good**; **obnoxious** = tone and relevance. Frame as “we’re testing the right level of persistence” and show one version that’s clearly helpful (e.g. “3 bills due this week — pay in one click?”).

So: **Chong is pushing for bold, differentiated, proactive agent** — not “too much,” but **clear value**. The thing to avoid is **vague chatbot** or **checklist of small features**.

---

## What has David been guiding?

From kickoff and project framing:

- **Proactive, autonomous cash flow engine** (not reactive).
- **Trust thermostat:** Users control level from suggestions to fully autonomous. Your “Looks good” vs “Needs attention” and trainability peek (“going forward, do this automatically”) line up.
- **Reduce cognitive load**, not just clicks. So screens that **reduce decisions** (e.g. “we recommend this”) are on-strategy; screens that add more options without guidance are not.
- **System of record → System of action.** So: agent that **does things** (suggests, routes, chases, pays) rather than just storing data. Intelligent Bill Approval’s WhatsApp and “call out what needs attention” hit this; Bill Pay Planner needs a clear “agent recommended this” moment.
- **Exploration, alignment, human-centered first.** So presenting **options** (e.g. “we’re testing how AI shows up on mobile”) is fine if you’re clear it’s exploration and you tie it back to the vision.

**Bottom line:** David wants **bold, proactive, trust-aware** — your screens should show the agent **taking useful action** and the user **confirming or adjusting**, not the user doing the work and the agent watching.

---

## What makes you look bad if you present this?

1. **Just Pay screens = reporting, not payments.** If you don’t swap in a payment example, it looks like the wrong brief or that Just Pay is undercooked.
2. **“We have NO IDEA how AI will manifest on mobile.”** Sounds like no strategy. Reframe: “We’re testing these candidate patterns; the agent moment we’re betting on is [X].”
3. **Pink callouts as final UI.** “Reconsider some of data build up…”, “Progressive, obnoxious…” read as internal notes. Either replace with real copy or move to a “design questions we’re testing” slide and show **one resolved** version that’s clearly agent-led.
4. **SL2 = bill approval vs payment approval.** Chong/Tauqir clarified: SL2 is **payment approval** (Melio). If your Safety Shield screens are only “approve this bill,” someone may say “that’s Pratik’s space.” So: either (a) frame as “Bill Safety Shield (risk) + approval workflow (payment)” and show the payment step, or (b) call out that approval automation is the payment-release step post–Safety Shield.
5. **Lots of entry points, no single “wow” path.** Vision and workshop say: lead with **3-click path**, then show complexity. If the deck is all options and no “here’s the one flow that nails it,” Diya’s “go big and bold” can feel scattered. Pick one hero flow per lane and lead with it.
6. **No explicit “vs 23 clicks” or “Do It For You.”** Add one slide or caption that states the shift: “3 clicks vs 21+ elsewhere” and “From DIY to Do It For You” so the vision is verbal, not implied.

---

## What hits the brief?

- **Bill Pay Planner:** Dashboard + bills + AI suggestions **concept**; Email/Connect/Scan as inputs; “suggestions for how to pay” and data/supplier matching in the callouts. **Fix:** Make one path clearly 3-click and one suggestion clearly “agent recommended.”
- **Intelligent Bill Approval:** “Call out what needs attention” and “drill-down to show what doesn’t look right” = **Bill Safety Shield**. WhatsApp approval = **system of action**, out-of-app. **Fix:** Add one explicit “agent suggests: [action]” and ensure link-to-Xero is visible.
- **Just Pay:** Agent **form factor** (conversation, “magically providing value”) is right. **Fix:** Use a **payment** example and outcome so it’s clearly Pay Out.
- **Chong’s portfolio:** Cash Flow Planner (SL1), Safety Shield + Approval (SL2), Just Pay (SL3) are all in the PDF. You’re in the right lanes.
- **Zero frictions / 21+ clicks:** Your workshop story (3 clicks, 23 elsewhere) and “Do It For You” directly address the vision. Just make sure it’s **said** in the deck or script.

---

## Confidence

- **Strategy fit:** The three lanes map to Chong’s Prototype I/II and to David’s proactive, trust-thermostat, system-of-action framing. You’re not off-brief.
- **Concrete next steps:** The [2026-02-20 prototype-updates checklist](2026-02-20-prototype-updates-from-workshop.md) already turns workshop feedback into UI tasks (entry points, 3-click path, chips, stages, blue CTAs). The gap is **execution and framing**, not direction.
- **What to do before presenting:** (1) Replace or reframe internal pink callouts. (2) Add one payment-specific Just Pay flow. (3) Add one “agent recommends” moment in Planner and one “agent suggests [action]” in Approval. (4) One slide or line: “3 clicks vs 21+ elsewhere” and “Do It For You.” (5) Frame mobile as “candidate patterns” with one clear agent moment. (6) Decide SL2 framing: Safety Shield + payment approval, and say it.

You’re close. The vision and stakeholder guidance are aligned with what you’re building; the main risk is **presentation clarity** (wrong example in Just Pay, internal notes on screen, mobile uncertainty stated as lack of strategy) and **one or two missing “agent did the thing” moments** in the flows. Fix those and you’re in a strong position.
