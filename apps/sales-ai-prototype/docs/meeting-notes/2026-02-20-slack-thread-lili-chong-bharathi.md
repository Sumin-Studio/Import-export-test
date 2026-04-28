# Slack thread — Lili divide-and-conquer, Chong/Bharathi doc, Tauqir/Chong clarification

**Dates:** 2026-02-17 to 2026-02-20  
**Source:** #temp-poc-sprint-agent-for-bill-workflow-automation  
**Purpose:** Capture key Slack content for repo context — Lili's divide-and-conquer, Chong/Bharathi strategic doc, Tauqir/Chong SL2 clarification, Jon's status updates.

---

## Lili Kan — Divide-and-conquer (17 Feb, 6:10 AM)

Great workshop — really energizing to see how aligned we are on the opportunities across the three swimlanes. Let's keep the momentum going async rather than waiting for everyone to be back in workshops.

**Suggested divide-and-conquer approach:**

**1. Cash-Flow Aware Planner**
- Eng: explore what AI models might support cash-aware recommendations. If possible, feed in some sample historical data and compare outputs.
- Product/Eng: also take a look at what the existing Cash Flow Analyzer can already do so we build on, rather than duplicate, current capability.

**2. Intelligent Bill Approval**
- Explore what capabilities Xero already has today (e.g., duplicate bill detection, abnormal bill detection, etc.).
- Use sample bills with different approval rulesets and test whether AI can generate sensible, explainable insights to support approval decisions.

**3. No-Bill Bill Pay**
- It would be great to see a lightweight UX flow or clickable prototype showing how this could feel end-to-end (intake → approval → payment). Rough wireframes are totally fine — clarity over polish.

**By the end of Tuesday AU time:** Each swimlane can share a rough artifact (doc, prototype, or experiment results) and key learnings or open questions. Goal isn't perfection — just progress and insight.

---

## Jon Bell — Status updates (17–20 Feb)

**17 Feb (9:06 AM):** Happy (NZ) Monday! Async standup — project is #1 priority, lots of synthesis to work through. By EOD will share synthesis and next steps.

**17 Feb (11:23 AM):** Finding lots of great insights in synthesis process. Sneak peek in thread.

**17 Feb (4:48 PM):** End of day update. Jon, Neeraj, Tauqir chatting and doing synthesis. Tomorrow trio meeting. Video shared showing story arc coming together. Workshops throughout week to explore swim lanes and narrow down most promising ideas.

**18 Feb (12:13 PM):** What to expect today/this week — 99 concepts to present. Trio sync in about an hour. Neeraj out on wellbeing leave. Workshops Tue–Fri. Tauqir and Jon aligned.

**18 Feb (4:24 PM):** Status update. From 20 pain points → 3 swim lanes → 99 concepts → one prototype. Details: Cash-Aware Bill Pay Planner. Synthesis + Chong's thinking + Tauqir's prototype all pointing same direction. For NYC: story (how we got here) + prototype (here's what we propose). Tomorrow: show story and prototype, gather ideas to iterate.

**18 Feb (2:50 PM) — Workshop summary:** Thanks to Tauqir for something to react to in real time. Team feels good about direction; strong sense of feasibility. Flow: click entry point → pre-canned options → plan mode → insights and tweaks (trust) → implications (trust) → really working (trust) → result. Paying part = Hollywood moment, aspirational. Figma likely better/faster than code at this stage.

**19 Feb (8:59 AM) — Thursday morning:** Figma will be faster — sticking with Figma. Pulling together AI agent precedent, bills precedent into one big Figma. "Plan" pattern researched; Xero hasn't landed on one yet. Flow could skip explicit plan step. Feasibility vs aspirational: don't show pie-in-the-sky without feasibility; but also don't "lead with vegetables." Best approach: static Figma screens for story, then real demo as follow-on. Mic drop.

**19 Feb (2:55 PM) — Meeting notes:** Significant day. Chong chatted with Diya Jolly — need differentiation, not checklist features. New deadline: next AU Friday, pitch with Diya alongside other agents. NYC still a thing, more feasibility-focused. Angus: JAX apps dealing with cashflow are common — set ourselves apart.

**Who's doing what:**
- Jon: Top priority = finish swim lane 1. Webpage story (99→3 swimlanes). Visualise swim lanes 2 and 3 (risk — will report back).
- Tauqir: Deep on SL1 technical feasibility. Porting to Xero's AI agent template (Play).
- Team: Flesh out SL2 and SL3; docs exist, confirming approach.

**20 Feb (9:22 AM) — Friday/Thursday status:** Number one priority = getting swim lane 1 to good enough state. May propose someone else leads meeting while Jon races on design. Or cancel in favour of async.

---

## Tauqir Ahmed — Updates (17–19 Feb)

**17 Feb (4:58 PM):** Started building PoC iteratively. Mocking key data sources (bills) per alignment with Kate G. Prototype reviews bills and recommends which to pay based on cashflow view, mocked bank feed data. "Brain" via Portkey LLM gateway; cheapest model for dev. Shared repo with Jon for POC + investigation findings.

**18 Feb (4:17 PM):** If agent answers "Can I afford to pay these bills now?" it must consider all major outgoing expenses (bills, payroll, tax, one-off) — not just bills. Cashflow Manager interface = big win; for now keeping POC bill-specific. Continuing POC code efficiency.

**19 Feb (2:54 PM) — Question for Chong:** Are we referring to pre-payment bill approval or the Melio payment approval feature? Initial pitch suggested Pratik's team would handle general bill approval flow.

---

## Chong Xu — Clarification (19 Feb, 5:51 PM)

**Re: Tauqir's question:** "This is the payment approval feature." — SL2 = Melio payment approval, not Pratik's pre-payment bill approval.

---

## Chong Xu — Strategic doc share (20 Feb, 6:59 AM)

Sending useful related info for exploring next use cases:

1. **AB and SB collaboration:** Vision deck on how collaboration might look between AB and SB to simplify information exchange. Clear and visual. Will get in contact with that team to explore potential collaboration.

2. **Payments agent future and differentiation:** Chong and Bharathi Ramavarjula collaborated on write-up. Full content captured in [../reference/2026-02-20-chong-bharathi-ai-payments-ab-sb-built-once.md](../reference/2026-02-20-chong-bharathi-ai-payments-ab-sb-built-once.md).

3. **Collaboration Vision FY26-27:** PDF shared (local copy). Summary in [../reference/2026-02-20-collaboration-vision-fy26-27-summary.md](../reference/2026-02-20-collaboration-vision-fy26-27-summary.md).

---

## Lili Kan — Technical spike questions (19 Feb, 9:06 AM)

Two buckets of technical questions for evaluation/spike. Full detail in [../reference/2026-02-19-lili-technical-spike-questions.md](../reference/2026-02-19-lili-technical-spike-questions.md).

**Q1:** Can AI reliably reason over structured financial context? Inputs: approved bills, due dates, cash balance, payroll, buffer, user goal. Outputs: which bills to pay/defer, when, why. Measure: logical correctness, hallucination rate, stability. Agent must never recommend impossible payments, ignore constraints, fabricate, or invent vendors.

**Q2:** Can AI infer supplier criticality (critical/strategic/deferrable) from historical data? Operational definition → heuristics baseline → LLM classification → examine AI vs heuristics → explainability and stability.

**19 Feb (6:45 PM):** Asked Andrew Goodman for eng/DS contact for model selection/evaluation. DS contact responded; Lili shared high-level spike and example model questions. Andrew asked good questions: before trying models, frame the problem and define key thresholds (e.g. "if model is correct 85% of the time, how do we design the use case?"). Andrew has open slot 3:30pm PST / 10:30am AEST; Chong and Tauqir available. Lili on PTO.

---

## Kate Givoni (19 Feb, 2:09 PM)

Crezco deck — yet to understand the value.

---

## Neeraj Sahu (17 Feb, 1:23 PM)

Cancelled this week's stand-ups (daily workshops same time). Upcoming sessions: Tue/Mon — Trio catchup (sync on themes, next steps); Wed/Tue — Deep dive top 3 swim lanes; Thu/Wed — Pick one key theme for refinement & PoC; Fri/Thu — Prototyping. Tomorrow = closed design/engg/prod session; invite extended.

---

## Chong Xu (20 Feb, 6:48 AM)

AI summit in Melbourne (Mar 23) organised by central AI team. Asked them to add team; let Chong know if invite not received.
