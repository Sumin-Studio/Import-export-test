# Slack — Workshop summary and Thursday status

**Dates:** 2026-02-18 (afternoon), 2026-02-19 (morning)  
**Source:** Slack thread (#help-bills / payout-product-tech-collab). Captured for repo context.

---

## Jon — Workshop summary (Wed 18 Feb, 2:50 PM)

- Thanks to Tauqir for something to react to in real time.
- Team feels good about general direction; strong sense of feasibility and real code doing real things.
- **Next:** Design to make screens that balance aspiration and feasibility and tell the story we want.
- **Flow (from Jon’s whiteboard sketch video):**
  1. Click an entry point → see pre-canned options.
  2. Click one → go into **plan mode**.
  3. After plan mode → see insights and be able to make **tweaks** (important for trust).
  4. See **implications** of what is about to happen (important for trust).
  5. See that **it’s really working** (important for trust).
  6. Then the **result**.
- **Paying part:** “Hollywood moment” to show aspirationally how great that would be → leads to “this isn’t possible today, but this is what customers would want if we had a magic wand.”
- **Delivery:** Discussed getting Jon’s code up and running; likely **static screens in Figma are better/faster** for this. To be explored.

---

## Tauqir — Reply (Wed 18 Feb, 4:17 PM)

- If the agent answers “Can I afford to pay these bills now?” it must consider **all major outgoing expenses**: bills, payroll, tax, one-off expenses — not just bills. Bills are one slice of total outflow. **Interfacing with Cashflow Manager** would be a big win; for now keeping the POC bill-specific to keep the wheels turning.
- While UI is refined with Jon, Tauqir will continue making the POC code more efficient.

---

## Jon — Thursday morning status (Thu 19 Feb, 8:59 AM)

- **Figma vs code:** Decided — **Figma will be faster** at this stage. Jon is sticking with Figma.
- **Precedent:** Pulling together AI agent precedent, bills precedent, etc. into one big Figma.
- **“Plan” pattern:** Researched how other AI apps use it; other Xero teams are exploring but Xero hasn’t landed on one yet — gives room for rough guidelines without being painted into a corner.
- **Plan vs skip-plan:** Flow could skip an explicit “plan” step and go straight from “Do the thing” to “Here are our super smart recommendations that you can agree or disagree with.” Plans are valuable when needed but can feel like an extra admin step; Brett (AI Design Sherpa) input to be shared later.
- **Feasibility vs aspirational:** “We have done our homework and have access to x, y, z” is critical — don’t show pie-in-the-sky without feasibility. Flip side: easy to lead with tech/features and under-present the work (“real estate tour” / “leading with your vegetables”). **Approach:** Static Figma screens tuned to tell a compelling story (e.g. three static screens side by side); then switch to **real demo** as follow-on. Demo doesn’t need to match pixel-perfect Figma; it’s there to show “this is possible.” Mic drop.
- Jon has many screens to pull together; questions/comments welcome.

---

## Lili — Technical spike questions (Thu 19 Feb, 9:06 AM)

Lili outlined two buckets of technical questions for evaluation / spike. Full detail is in **[docs/reference/2026-02-19-lili-technical-spike-questions.md](../reference/2026-02-19-lili-technical-spike-questions.md)**.

**Summary:**

| Bucket | Focus |
|--------|--------|
| **Q1** | Can the AI reliably reason over structured financial context? Deterministic, explainable outputs? Reliable interpretation of user goals? Inputs: approved bills, due dates, cash balance, payroll, buffer, user goal. Outputs: which bills to pay/defer, when, why. Measure: logical correctness, hallucination rate, stability across runs. Agent must never recommend impossible payments, ignore constraints, or fabricate. |
| **Q2** | Can an AI agent reliably infer **supplier criticality** (critical / strategic / deferrable) from historical data and possibly vertical standards? Operational definition → heuristics baseline from historical payment behavior → LLM classification on structured features → examine AI vs heuristics → explainability and stability. Success: reasonable accuracy, AI adds value beyond heuristics, reasoning trusted and explainable. |

---

## Decisions and next steps (from this thread)

| Decision / direction | Owner |
|----------------------|--------|
| **Figma-first for pitch** — static screens for story; real demo as follow-on | Jon / Design |
| **POC stays bill-specific for now**; Cashflow Manager integration called out as future win | Tauqir |
| **Plan pattern** — optional depending on flow; avoid “one more admin step”; Brett’s thoughts to be shared | Jon / Brett |
| **Technical spikes** — Lili’s Q1 (reasoning/hallucination) and Q2 (supplier criticality) documented for evaluation | Lili / Eng |
