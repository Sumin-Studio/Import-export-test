# Bill Pay Agent PoC | Workshop 1 (User Problem) — Run Sheet

**Workshop:** User Problem  
**Organiser:** Neeraj Sahu  
**Principal/facilitation:** Jon (facilitation + IC; name the gaps, get one decision)

**Pre-read:** [2026-02-12-workshop-1-prep-compiled.md](2026-02-12-workshop-1-prep-compiled.md). **Do we want a pain-points meeting?** [2026-02-12-workshop-1-do-we-want-pain-points.md](2026-02-12-workshop-1-do-we-want-pain-points.md). **If yes, how to run it:** [2026-02-12-how-to-run-pain-points-meeting.md](2026-02-12-how-to-run-pain-points-meeting.md).

**Schedule:** Meeting 1 = **Friday 11:30am** (problem selection); W2 = **Tue 17 Feb** (deep dive + sketching); W3 = **Wed 18 Feb** (prototyping). Full series: [2026-02-13-slack-channel-schedule-and-prework.md](../meeting-notes/2026-02-13-slack-channel-schedule-and-prework.md). Pre-work: 3–5 private, present in real time; Jon sends synthesis doc. Pre-work: individual pain point hunting (“Dating Game” — no sharing until workshop). **Top 9 problems to work from:** [2026-02-13-workshop-1-top-9-problems.md](2026-02-13-workshop-1-top-9-problems.md). **Problem filter:** [2026-02-12-standup-and-workshop-planning.md](../meeting-notes/2026-02-12-standup-and-workshop-planning.md) §4 (severity, AI alignment, feasibility, agent alignment). Time/facilitation: [2026-02-13-slack-workshop-brett-chong.md](../meeting-notes/2026-02-13-slack-workshop-brett-chong.md).

---

## Who’s in the room

| Person | Note |
|--------|------|
| Neeraj Sahu | Organiser |
| Jon Bell | **Facilitating** |
| Brett Edmonds | **First half only** (unavailable midday); bringing AI opportunity frameworks; not substitute for Applied Science |
| Angus Tait | Constraint voice (APIs, baseline) |
| Chong Xu | PM / AI opportunity — **joining from different timezone** |
| David Brown | Strategy, alignment |
| Jenny Nedanovski | **Late** — legal meeting on Melio |
| Kate Givoni | **Out of office** |
| Lili Kan | ENG |
| Tauqir Ahmed | ENG (leads Workshop #3–5) |
| Jiten Taluja | — |
| Katrina McComb | PMM |

**Heads-up:** Chong may have limited availability; Jenny will join late. When Jenny joins, do a 2-minute catch-up: "We're on [current block]. We've named three gaps and are tagging pain points as today vs once we have approval flow." **Framing:** Bills = trust, fraud risk, revenue engine -- crawl-walk-run approach essential (Pratik; [2026-02-13-slack-workshop-brett-chong.md](../meeting-notes/2026-02-13-slack-workshop-brett-chong.md)). **Feasibility:** Tauqir: tech exploration in parallel (looking good); challenges for agentic "paying bills" in Melio flow -- [2026-02-13-slack-channel-schedule-and-prework.md](../meeting-notes/2026-02-13-slack-channel-schedule-and-prework.md).

---

## One decision for this workshop

**By end of session we have:** A shared list of **bill workflow pain points** (post data-entry → payment) with each tagged:

- **Today** — problem exists with current state; could be solved without a full approval baseline.
- **Once we have approval flow** — problem or solution assumes baseline approval workflow exists.

If you leave without that tagged list, the principal move is to add it async (e.g. in Miro or this doc) and send to the group.

---

## How to run it (agenda)

### 0. Open (5 min) — Name the gaps

**Who:** Jon or Neeraj.

Say it out loud so the room doesn’t design in a vacuum:

1. **No baseline approvals workflow in production today.** We’re designing for “on top of” a baseline we understand but haven’t shipped. Pratik’s team owns creation/approval.
2. **Melio don’t have the APIs we’d need** for full agentic automation in their flow. So we’ll tag which problems/ideas depend on APIs vs don’t.
3. **Sprint scope is still open:** Are we generating API-free ideas for this year, or concepts for later? We don’t have to resolve that today; we *do* want every pain point to be taggable.

Optional: One slide or one Miro frame: **What we have today | What we’re assuming | What we’re not assuming.**

---

### 1. Journey and personas (10–15 min)

**Goal:** Shared picture of *who* and *which part* of the journey we’re focusing on.

- **Personas:** SMB / AB; reduce toil, cash flow, profitability (from POC scope).
- **Journey slice for this sprint:** *After* bill approval → payments onboarding, prepping bills, approving payments (not bill creation/approval itself).
- **Swimlanes (if time):** Entry point, workflow action, AB vs SB, new vs returning. Align to “current approval workflow proposal” where it exists.

**Output:** Everyone aligned on “post-approval” and personas. No need to over-detail; enough to scope pain points.

---

### 2. Pain points (25–35 min) — Core of the workshop

**Goal:** Get pain points on the table, then tag them.

**2a. Elicit pain points (15–20 min)**

- Focus: **Bill workflow** from “bill data entered” through to **payment execution** (per research-directory suggestion: conditional auto-approval, approval-chasing/escalation, smart payment scheduling/forecasting).
- Prompts:
  - “Where do SMBs/ABs waste time or get stuck after the bill is in the system?”
  - “What do we hear about chasing approvers, visibility, manual approval config?”
  - “What about payment scheduling and cash flow — wrong dates, wrong runs, forecasting?”
- Capture in Miro (or doc): one sticky/card per pain point, short label + one line.

**2b. Tag each pain (10–15 min)**

- For each pain, ask: **“Is this a problem *today* (current state), or does the solution assume we already have an approval workflow in place?”**
- Tag: **Today** | **Once we have approval flow** (and optionally **Needs Melio APIs** if it’s obviously API-dependent).
- No long debate; if unclear, tag “Once we have approval flow” and note “unclear” so Workshop #2 can tighten.

**Output:** Shared list of pain points with tags. This is the **one decision** for Workshop 1.

---

### 3. Competitive / agentic UI (10–15 min) — If time

- **Competitive:** Who does conditional auto-approval, approval-chasing, or smart scheduling well? (Feeds Workshop #2.)
- **Agentic UI:** How could an agent show up? (In-context suggestion, proactive nudge, natural-language rule.) No need to solve; just seed ideas for Workshop #2 and #3.

If time is short, make this **prep for Workshop #2** and assign owners (Design/Product) to bring a short synthesis next time.

---

### 4. Close (5 min)

- **Recap:** “We have a tagged pain list: today vs once we have approval flow. That’s our input to Workshop #2 (Agent opportunity).”
- **Next:** Workshop #2 — agent opportunities and scope (API-free vs future); Chong’s question should be answered there.
- **Capture:** Who updates the POC doc or Miro with the final list? (Jon or Neeraj can do a short “We decided X, deferred Y, open Z” in this run sheet or in `poc-sprint-agent-bill-workflow.md`.)

---

## Facilitation notes

- **Chong (timezone):** May have limited availability. If needed, Neeraj/Jon can carry the scope question forward to Workshop #2.
- **Jenny (late):** When she joins, 2-minute catch-up: current block, three gaps, tagging approach.
- **Angus:** Brings technical constraint context (APIs, baseline). Useful for reinforcing tagging.
- **David:** Exploration posture — framing “today vs once we have approval flow” supports this.
- **Tauqir:** Leads Workshops #3–5; hearing the problems and tags today feeds his agent specs.

---

## Optional: Research-directory focus (unverified)

If the room needs a starting structure, you can offer this as *one* lens (marked unverified):

- **Two agent areas** to prioritise for the sprint: (1) **Intelligent Approval & Release** — chasing + policy auto-approve; (2) **Smart Payment Scheduling** — optimal dates/methods, auto-schedule.
- **Prep for next time:** Competitive view on auto-approval, approval-chasing, smart scheduling; agentic UI patterns (in-context, proactive, natural-language rules).

Don’t lock the workshop to only these; use them to spark and focus if the room is stuck.

---

## After the meeting

- [ ] Finalise the pain list and tags in Miro or doc.
- [ ] Add 1–2 paragraphs to this file or the POC doc: **Decided / Deferred / Open.**
- [ ] Share the tagged list and run sheet (or link) in `temp-poc-sprint-agent-for-bill-workflow-automation` so Jenny, Kate, and Chong can read async.
