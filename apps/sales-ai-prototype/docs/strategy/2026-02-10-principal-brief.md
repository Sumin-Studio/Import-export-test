# Principal Brief: Bill AI Automation

**For:** Design lead / facilitator  
**Use:** Pre-workshop read, alignment conversations, deciding where to spend time.

---

## 1. What You Need to See (One Page)

### The vision vs the ground truth

| Layer | Vision (documents) | Ground truth (team chats) |
|-------|--------------------|----------------------------|
| **North star** | Bill Automation Agent — every bill "ready to pay" on creation; system of record → system of action | Same, but **no baseline approvals workflow exists today**. Many pains could be fixed by shipping a simple deterministic model first. |
| **This sprint** | 2-week agentic POC for bill workflow (post-approval); US/Melio; workshops Feb 9–17 | **Scope unclear:** Ideas that don’t need APIs (this year)? Or concepts for future delivery? **Delivery:** Prototype / mocked data is enough; UAT is a later call (Kate). |
| **US / Melio** | Build on Melio bill approval momentum | **Melio don’t have the APIs we’d need.** Experience is in Melio flow; no Melio in workshops (timezones). Ask Melio for baseline metrics to show impact (Jenny + Chong). |
| **AI** | Agentic = self-driving, adaptable; solve real problems | **AI must solve existing problems**, not hypothetical ones (Chong). Be explicit about "cart before the horse" when designing for a baseline that isn’t live yet. |

So: **vision is clear; foundations (approval workflow, APIs) and sprint scope are not.** The sprint is explicitly exploration; the principal job is to keep that honest and turn exploration into clear decisions.

---

## 2. The Tensions (Key Risks to Manage)

### Tension A: Sprint scope is underspecified

- **Chong’s question (unresolved):** Are we generating **API-free ideas for this year** or **concepts for future delivery**?
- **Why it matters:** Without answering this, Workshop #2 (Agent opportunity) can produce a backlog that’s either impossible (needs Melio APIs) or vague (“someday”).
- **Resolution needed:** State the intended outcome of the sprint clearly before or at the start of Workshop #2. Option A: "A shortlist of agent ideas we could ship without new Melio APIs." Option B: "Concepts and a roadmap for when APIs exist." Option C: "Both, clearly labeled."

### Tension B: "Post-approval" journey but no approval baseline

- **POC scope:** After bill approval → payments onboarding, prepping bills, approving payments.
- **Reality:** No baseline approvals workflow in production. Baseline is "understood" (functionality), not shipped.
- **Approach:** In Workshop #1 and #2, every agent idea should be tagged: *depends on baseline approval flow* vs *doesn't*. Keep the handoff boundary visible (we're designing "on top of" their future baseline).

### Tension C: Xerocon vs "as light as possible"

- **Xerocon June 2026** = first public milestone; "Zero Bill Entry" must be demonstrable.
- **Kate:** Prove the concept as light as possible; local/test env; then assess UAT.
- **Approach:** Keep the 2-week sprint focused on **concept + prototype**. The path to Xerocon is a separate plan (roadmap, Melio). The goal is clarity and a compelling prototype, not a delivery plan for UAT.

### Tension D: Naming and ownership

- **Jenny → Chong:** Is this the "Bill Automation Agent" (Opportunity 2)? Pending confirmation.
- **Approach:** Once confirmed, use "Bill Automation Agent" and "Opportunity 2" consistently in all docs and Slack. Avoid two names for the same thing.

---

## 3. Stakeholder Map (Who Cares About What)

| Person | What they care about |
||--------|----------------------|
|| **David** | Strategy, alignment, "proactive autonomous engine"; exploration not locked roadmap |
|| **Angus** | APIs, Melio reality, baseline before AI |
|| **Chong** | AI opportunity framing, scope clarity |
|| **Jenny** | Payments product, Melio flow, baseline metrics, naming |
|| **Pratik** | AP platform, bill creation & approval roadmap |
|| **Kate** | Delivery reality (light prototype, no UAT promise in 2 weeks) |
|| **Brett** | Agent patterns |
|| **Thomas** | Direct product collaboration |

---

## 4. Workshop-by-Workshop: What to Guard

- **#1 User problem (Feb 10)**  
  - **Choice:** Pure pain-points *discovery* vs **alignment on a pre-made list + scope** (see [workshop-1-do-we-want-pain-points.md](workshop-1-do-we-want-pain-points.md)). Pains are already in the prep; the gap may be agreement and prioritisation, not discovery.  
  - **Guard:** Pain points and swimlanes are tagged by "needs baseline approval flow" vs "doesn’t." Don’t let the room assume the baseline is live.  
  - **Output you want:** Shared list of problems + which ones are "today" vs "once we have approval flow" (+ optional: which are in scope for this POC).

- **#2 Agent opportunity (Feb 11)**  
  - **Guard:** Chong’s scope question is answered (API-free vs future). Agent ideas are tagged the same way.  
  - **Output you want:** Shortlist of agent opportunities with a clear "this year vs later" and "needs APIs vs not."

- **#3 Agent prototyping (Feb 12)**  
  - **Guard:** Tauqir’s job/workflow/logic and Miro stay consistent with that shortlist. No feature creep into full UAT build.  
  - **Output you want:** Agent specs that a light prototype can demonstrate.

- **#4 & #5 Coding / buffer (Feb 16–17)**  
  - **Guard:** "Light as possible" holds. Demo = prototype with mocked data; no commitment to Bills UI/BFF/backend in this sprint.  
  - **Output you want:** Working prototype + a short "building blocks and challenges" doc (APIs, gaps) for follow-up.

---

## 5. Key Practices

1. **Name the gaps out loud.** Baseline approval, Melio APIs, and sprint scope are the three gaps. State them at the start of workshops.

2. **One decision per workshop.** #1: problems + tagging. #2: scope (API-free vs future) + shortlist. #3: agent specs. #4/#5: prototype + blockers.

3. **Prototype ≠ roadmap.** The sprint proves concept and surfaces constraints.

4. **Connect the dots in writing.** After each workshop: "We decided X. We deferred Y. Open: Z."

5. **Use the docs you have.** Point people to one source of truth.

6. **Melio baseline metrics.** Small and high-value ask. Request baseline metrics from Melio so agent impact can be measured later.

---
## 6. Quick Reference: Where Things Live

| Need | Doc |
|------|-----|
| Vision, problem, constraints, open questions | `docs/strategic-context.md` |
| Sprint plan, principles, scope, delivery expectations, naming | `docs/poc-sprint-agent-bill-workflow.md` |
| **Unverified:** Research-directory recommendation (2 agent focuses + Workshop #1 prep) — for noodling | `docs/poc-sprint-agent-bill-workflow.md` § end |
| Your role, project goal, stakeholders | `CLAUDE.md` |
| David’s framing, exploration posture | `docs/meeting-notes/2026-02-11-kickoff-context.md` |
| Links to Glean/Confluence/Miro, Melio, approval workflows | `docs/research-links.md` |
| This brief | `docs/principal-brief.md` |
| **What’s stored + next steps (consolidated)** | `docs/INDEX-whats-stored-and-next-steps.md` |
