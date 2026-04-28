# Bill Pay Agent Trio Session — Feb 17, 2026

**Participants:** Jon Bell, Neeraj Sahu, Tauqir Ahmed, Angus Tait, Jenny Nedanovski, Kate Givoni  
**Meeting:** Bill Pay Agent PoC | Trio (Design, Engg, Prod) (For AU / NZ)

*Open questions from this session are tracked in [../workshop/2026-02-17-open-questions-tracker.md](../workshop/2026-02-17-open-questions-tracker.md).*

**Outcome:** After sorting through the ideas (gut check on concepts, swim lane alignment), the team landed on **one prototype** for Friday.

---

## Debated and resolved

These items were discussed and explicitly resolved in this session.

| Topic | What was debated | Resolution |
|-------|-------------------|------------|
| **Scope: where the agent kicks in** | Tauqir: agent picks up post-approval? Angus: don’t ship the org chart — don’t put borders in now (onboarding vs post-approval). Jon: scope aggressively; remove onboarding. | Scope to **latter part of bill journey** (bill preparation and planning). No org-chart borders. Aggressive scope for this week. |
| **One prototype vs three** | Too hard to go much further with three. What does Friday need? | **Pick one** concept. Stress it’s a **proof of concept** to drive discussion. Jenny: prioritise one concept smartly for tangible progress. |
| **Gut check: which concepts** | Team gut-checked AI-ranked ideas. Some felt wrong or out of scope. | **Fine:** Cash runway watcher, Instant Pay intent capture, Early pay discount radar, Bill timing optimizer (maybe not discounts). **Not fine:** Policy-aware approval drafts, Risk tier routing (just logic), One-Tap Billets Pay (retrospective bills — confusion), Approval SLA nudger, Multi-account Liquidity Splitter. |
| **Which swim lane** | Three swim lanes (cash flow planner, intelligent approval, no bill pay). Relevance of approval lane given Melio. | **Swim lane 1** is the clear winner. All promising concepts sit in lane 1 (bill preparation and planning). Swim lane 2 (approval) overlaps with Melio’s out-of-the-box payment approval; approval concierge is bill-approval not payment-approval — scope is problematic there. |
| **Geography** | Where does this apply? | **US only** for now. Some patterns only exist in UK; POC design flexible to pivot to UK if API integration is better there. |
| **Framing for Melio / stakeholders** | Is it okay to show something that might get shot down or surprise them? | **Yes.** Jon: good if we show up, surprise them (good or bad) and it drives discussion. Angus: assume we’ll get shot down — that’s fine, it drives conversation. Frame as “what does good look like”; some concepts may highlight functionality Melio doesn’t have yet. |
| **Design: chatbot vs JAX** | POC looks like a generic chatbot. Consistency with Xero AI experience? | **JAX-aligned.** Tauqir to make prototype look like JAX (if purely UI change). Angus/Kate: move beyond chatbot — e.g. insights in list view, emergent banners, not just side-drawer. |

---

## Key Decisions

### 1. Scope: Swimlane 1 — Cash-Flow Aware Planner
- Aggressively scoping to the latter part of the bill journey: bill preparation and planning
- Gut-check exercise on 99 concepts confirmed the strongest ideas all fall under swimlane 1
- Swimlane 2 (approval concierge) has overlap issues with Melio's out-of-the-box payment approvals
- Thinking broadly is fine, but this week's prototype focuses on one lane

### 2. Promising Concepts (retained after gut check)
- **Cash runway watcher**
- **Instant Pay intent capture**
- **Early pay discount radar**
- **Bill timing optimizer**

Dismissed: Policy-aware approval drafts (too vague), Risk tier routing (just logic), One-Tap Billets Pay (retrospective bills — confusion), Approval SLA nudger (out of scope), Multi-account Liquidity Splitter.

### 3. One Prototype, Not Three
- Short timeline demands focus on one high-priority PoC
- Jenny emphasised: prioritise one concept smartly for tangible progress

### 4. Geography: US Only (for now)
- Agent currently US-focused
- Tauqir confirmed: PoC architecture flexible enough to pivot to UK if Melio API integration is difficult
- Angus raised concern about Melio's iframe/SDK structure

### 5. Design Direction: JAX Alignment, Beyond Chatbot
- Tauqir's PoC (payment assistant chatbot in bill UI) needs to **look like JAX** for design consistency
- Angus and Kate: move beyond typical chatbot paradigm
  - Emergent banners, list view integration (e.g. highlighting recommended payments)
  - Not just side-drawer chatbot
- Tauqir confirmed: UI change to JAX look is doable for Friday

### 6. Framing for Melio Presentation
- "What does good look like" exercise — even if it encroaches on other teams' areas
- Concepts serve as centrepiece for discussion, not final spec
- Goal: productive conversation pieces that drive next iteration

---

## Friday Deliverables

1. **Evolution story** — show the journey from problem statements → concepts → narrowing → proof
2. **Synthesised narrative** — the story we believe in
3. **Working prototype** — JAX-aligned, swimlane 1 focused

---

## Next Steps

| Owner | Action | When |
|-------|--------|------|
| Jon | End-of-day synthesis update | Today |
| Tauqir | Restyle PoC to look like JAX | By Friday |
| Jon | Build the story arc: problems → concepts → winnowing → prototype | This week |
| Team | Engage Toronto team (Pratik's) after prototype is ready | Post-Friday |

---

## Tauqir's PoC (demonstrated)

- Payment assistant chatbot interface embedded in bill UI
- Provides: high-level bill breakdowns, total amounts, overdue status, cash impact
- Currently works only with approved bills
- Architecture: Python API under `/api`, Portkey as LLM gateway
