# David meeting — strategy, design feedback, and execution notes (26 Feb)

**Date:** 2026-02-26  
**Attendees:** David Brown, Jon  
**Purpose:** Align on strategy, review current design work (three concepts), establish feedback protocol, and capture design execution notes for CPO/Diya and beyond.

---

## Meeting context & feedback approach

- David provided air cover with Chong before the meeting — helped align her on cash flow focus.
- Feedback protocol agreed: quick 15-minute reviews vs lengthy discussions; use David as sounding board ("I'm confused about something" / "what do you think?").
- Tomorrow's CPO review is conceptual only; outcome uncertain given "lot going on upstairs."
- Jon: balance between "let me cook" and needing feedback; deadlines are sacred; will filter feedback selectively and form a tighter trust circle (e.g. Jon, Chong, Andrew Crosby).

---

## Strategic direction: end-to-end cash flow

- **Brett's insight:** "End-to-end cash flow problem is the most compelling story we could tell."
  - Potential "Xero main stage moment."
  - Extremely ambitious — could pivot half the company.
  - Requires integration across countries, Sift, cash flow, dashboard, payments.
- **Agent framework (four themes):**
  1. Predicting cash flow needs  
  2. Optimizing payment timing  
  3. Executing payments  
  4. Protecting against fraud / anomalies  

- **Executing is "the easy part"** — prediction and protection are the harder challenges.  
- **Duality:** Cash flow as the hub / system of record; payment enablement / agent enablement as the system of action. User experience shifts from do-it-yourself → do-it-with-me → do-it-for-me.

---

## Organizational dynamics & challenges

- Peter (payments) vs Chong alignment improved via David's narrative rewrite; Chong and Peter now aligned on cash flow framing.
- Lisa's strategy document doesn't mention agent work; felt like "Vegas casino with 10 tables" — many bets, unclear which wins.
- Some existing projects failing validation: Nova "probably dead in the water"; Abacus rejected by both customers and executives.
- Tighter trust circle needed: e.g. Jon, Chong, Andrew Crosby as core.
- Expect "no shortage of opinion"; Jon's role is to filter and trust selectively. Darryl's journey (August–December): at some point she mapped job tasks and when human vs agent does what — "we were getting lost" without that.

---

## Design leadership & communication

- **Stakeholder orbits (solar system metaphor):** Inner orbit = daily collaborators (Chong, Kate, Jenny); middle = quarterly check-ins; outer = annual/infrequent. Create windows for each orbit — not everyone can digest the same level of detail.
- **Campfire moments:** Create collaboration moments, not just one-way storytelling. Artifacts can be prototypes, sketches, workshops, frameworks, spreadsheets to comment on. Meet people where they work (e.g. Pete likes slides so he can collaborate in a slide).
- **Evidence vs story:** Sometimes show the work or evidence; invite collaboration (e.g. spreadsheet to comment on) rather than only presenting. Principle = best designers on hardest problems, setting gold standard in craft; 60% of role is doing whatever it takes to get the outcome (workshop, coordination, or pixels).
- **Stay humbled:** When storytelling at altitude (e.g. CPO at 4500m), conditions change hourly; read tea leaves, have contingencies, take feedback and continue.

---

## Current design work review (three concepts)

Design review focused on the three concept screens: Bill Planner, Intelligent Bill Approval, Just Pay.

### 1. Bill Planner (cash flow crisis / "you're about to be in a hole")

- **Intent:** Interactive graph showing cash position vs buffer threshold (e.g. $1,000); recommendations for which bills to pay/defer with reasoning; "augmenting intuition" — Xero suggests, human decides.
- **David:** Make it clear we are **recommending** — not just a form with boxes. Show insights then the right action. Explain **why**; you can't just jump to payment. Consider:
  - **Traffic light system** (or similar metadata) to explain why each bill is recommended.
  - **Agentic framing:** e.g. "Based on our analysis we recommend paying these bills…" — purple outline or sparkle so it's obvious the agent has done the work.
  - **Sift / Xero Short Term Cash Flow:** We don't have algorithmic forecasting today; Xero Short Term Cash Flow failed / no one likes it. Don't replace Sift; consider a **Sift-style forecasting placeholder** in designs so the "JAX moment" is clear (we're combining insights with action in the same place).
  - **Break out of mobile** when the idea goes forward — e.g. intelligent table or plan view with metadata (why we chose these bills).
- **Positive friction:** The checkboxes and confirmations are "reassuring" — human in the loop is good. Frame as: agent as associate — "I've gone through all our bills, I might be wrong, I reckon we pay these."
- **Mid-tier business:** Design for volume that makes cash flow critical: e.g. **40+ bills/week**, **$45K monthly turnover**, **$25K for payroll** — need enough cash to cover payroll. Low-volume (e.g. sole trader, 4 bills/month) won't need this; dial up numbers in scenarios.

### 2. Intelligent Bill Approval (needs attention vs looks good)

- **Intent:** Bill monitoring dashboard; anomaly detection (unusual amounts, duplicates, bank detail changes); "needs attention" vs "looks good" categories; send for authorisation.
- **David:** Chong wants the **email moment** — status updates via email. For anomaly detection, **reference Ramp:** look at Ramp's YouTube / anomaly detection; they've "sweated the details" — use as inspiration for how to render anomalies and levels of alertness ("bower bird" — take best-in-class from others). Show **different levels of concern** (e.g. colours, metadata) — fraud, malicious actors, disputes, errant payments; bigger companies have more at stake. **Protection** is a power move (Predict / Protect / Execute).

### 3. Just Pay (chat / natural language)

- **Intent:** Conversational interface — user asks "How's the business doing?"; Xero summarizes cash, bills due, payroll; suggests paying regular suppliers Friday; user confirms "Yup, thanks."
- **David:** This will happen, but likely via partnerships (Claude, etc.) — "we can build the rails." **Caveat:** Chat-to-send-invoice previously "went down like a lead balloon" when demoed (people could click faster than speaking). So ensure the story is strong: **execute on the work** in the same place you do the work. Headline: you can do the work and then execute on the work.

---

## Technical integration & Plans pattern

- Jon assigned to **Plans** pattern work with Brett. **Plans** = whole execution framework for agents (cron jobs, success criteria, permissions, multi-step runs) — applies across all Xero agents (payroll, chasing, bills, etc.). "Plan" may be the wrong word per use case (e.g. execution, request).
- **Agents don't orchestrate together today** — they need contextual awareness. Example: Bill Planner should know anomaly detection results and not recommend a bill that has an anomaly. Brett / James Wright / Sunni: moving toward "super agent" with interconnected capabilities; currently agents are "contractors" in their own domain.

---

## Design execution notes (checklist)

| Note | Source |
|------|--------|
| Make it clear we are **recommending** — not just a form with boxes; explain **why**. | David |
| **Traffic light system** (or metadata) to explain why we recommend each bill. | David |
| **Sift-style forecasting placeholder** in designs (we don't have it; don't replace Sift). | David |
| **Mid-tier scenario:** 40+ bills/week, $45K/month turnover, $25K payroll. | David |
| **"Based on your last 60 days, we recommend"** — purple outline / sparkle for agentic moment. | David |
| **Positive friction** is good — human in the loop is reassuring. | David |
| **Ramp** — anomaly detection; YouTube / how they surface it; different levels of concern, colours. | David |
| **Email moment** for approval flow (Chong's ask). | David / Chong |
| **Three pillars:** Predict your cash flow / Protect your cash flow / Execute on your cash flow. | David |
| **Payments home** — possible new information architecture (separate from main dashboard); Intuit Money example (users started using it as primary dashboard). Not on roadmap now; hold the thought. | David |
| **Campfire / collaboration:** Evidence and collaborative artifacts (e.g. slides for Pete to comment on), not only storytelling. | David |

---

## Framing for Diya / exec

- **Predict / Protect / Execute** ties to Chong's themes (predicting, optimizing, executing, protecting) and fits the cash flow agent story.
- Bill Planner → recommend what to pay (insights + action).  
- Anomaly / Approval → protect.  
- Just Pay → execute.  
- Ensure it's clear this is **payments + agent** combining insights with action, not only a Sift-style forecast view.

---

## Reference: three concept screens

The current top-level concept screens (Bill Planner, Intelligent Bill Approval, Just Pay) are reflected in the app at `/app/walkthrough/6`, `/` (home), and `/app/concept/1`–`3`: cash flow buffer + recommendations, needs attention vs looks good with anomaly reasons, and chat-style Just Pay. Design notes above apply to the next iteration of those screens and to the process/story pages.
