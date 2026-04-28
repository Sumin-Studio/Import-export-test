# Bill AI Automation - Design Journal

A running log of design thinking, decisions, and progress.

---

## 2026-02-11

### Project Setup

Created project directory with research links, strategic context, and CLAUDE.md for ongoing work.

### Pre-Meeting Synthesis

**David's framing for the work:**
- Aggressive timeline
- Ambiguous scope
- New territory for agentic workflows

**Key concept discovered:** David's "Trust Thermostat" — users control automation level from suggestions to fully autonomous. Reduces cognitive load, not just clicks.

**"Zero Bill Entry" origin:** FY27 initiative planning, under cashflow automation workstream. Chris Andrews (PM) and Rohaan Hamid (Eng) associated.

**Jon's role (at kickoff):** Facilitation + IC work + connector (Thomas, Brett, Angus, Jenny). Michael and Jess stay on current work.

### 11am Kickoff Meeting (David, Angus)

**Sprint approach decided:**
1. Arm the group going to New York (Melio offsite Feb 23-26)
2. Generate unvalidated ideas with some prototypes
3. Human-centered design first, not technical feasibility
4. "Dream before reality-checking APIs"
5. Quality ideas require going through "the slob" of generic concepts

**Timeline pressure:**
- Melio team starts next week
- New York offsite following week
- Workshop delayed to early next week for proper prep (quality over speed)

**Core group:** Chong, Neeraj, Jenny, Angus, David, Kait

**Domain experts (not yet in these conversations):** Rob, Michael, Dillon, Pratik
- To be brought in as work progresses

**Success metrics for sprint:**
- Create structured customer-problem-rooted conversations
- Define misalignment areas clearly
- Align on proper sequencing

**Actions from kickoff:**
- Connect with Neeraj (daily standups being scheduled)
- Async communication continues

### Research directory recommendation (unverified)

Ran numbers against research directory; it recommended focusing the sprint on **two** agentic features:

1. **Intelligent Approval & Release Agent** — approval chasing + policy-based auto-approve (low-risk).
2. **Smart Payment Scheduling Agent** — optimal payment dates/methods from cash flow + terms; auto-schedule with minimal review.

Also suggested Workshop #1 prep: competitive/UI focus on auto-approval, approval-chasing, smart scheduling; agentic UI patterns (in-context recommendation, proactive action, natural-language rules).

**Status:** Stored in `docs/strategy/2026-02-10-poc-sprint-agent-bill-workflow.md` as **unverified** — to noodle on. Not yet adopted.

---

## 2026-02-12

### What happened

**Brett 1:1 (12pm)** — Critical context on the broader agent landscape:

Four active agent projects across Xero:
1. Payer chasing (get paid faster)
2. A/B info and document chasing (client readiness)
3. Payroll/pay run inputs (timesheets, leave)
4. Running the pay run (questionable if truly agentic)

**Bills agent complexity:** Two streams running independently:
- **Pratik** leading bill creation/automation stream
- **Chong** leading bill payment/approval stream
- Different timelines and constraints being resolved in ownership meeting

**Pratik's three data points for bills agents:**
1. Transaction data (OCR)
2. Accounting (account codes for prioritization)
3. Finance (tracking codes for project management)

**Three opportunity phases:**
1. Creating/setting up (getting ducks in a row)
2. Protection (preventing scams — $500k fake bill example)
3. Post-payment cleanup

**Workshop gap:** AI experiences limited by technical constraints, not just desirability. Need to pull constraints further left in design process.

---

**Standup (1pm) + Chong/Planning sessions:**

- Sprint runs until **Feb 25th** — prototype ready for presentation
- **Dating Game technique:** Individual pain point hunting (top 3-5), no sharing until workshop
- **90% of users don't use bill pay** — major adoption problem
- Average customer has **40 bills/month** (50-100 for larger SKUs)
- Chong flexible on timeline (3-4 weeks ok) — just needs concentrated progress

**Pay planner agent concept** — leverages existing data:
- Invoice payments coming in
- Bank reconciliation records
- Payroll information
- Complete money in/money out understanding

### Decisions made

**Workshop structure locked:**
- **Friday (today):** Problem definition — present 8-9 pre-researched problems, narrow to 1-2
- **Tuesday:** Solution exploration — deep dive, leverage Brett's agent pattern library

**Communication protocol:** All async in dedicated Slack channel. No side conversations.

### Open questions

1. How do we get AI team representation in workshops? (Soon-Ee contact?)
2. Where does Pratik's stream end and Chong's begin? (Ownership division meeting happened)
3. What does Melio plan to showcase at NYC offsite?

### Next actions

- [x] Create document for collecting pain points (Dating Game prep)
- [ ] Review Pratik's strategy document
- [ ] Reach out to Brett for workshop participation
- [ ] Connect with Soon-Ee from AI team

**Meeting notes:** [Brett 1:1](docs/meeting-notes/2026-02-12-brett-1on1.md) | [Standup](docs/meeting-notes/2026-02-12-standup.md) | [Chong/Planning](docs/meeting-notes/2026-02-12-chong-and-planning.md)

---

## 2026-02-16

### The AI Design Swarm Technique — a new way of working (from Brett's Feb 13 walkthrough)

Captured Brett's full agent ideation process and named it: **The AI Design Swarm Technique.** This is a new way of working we want to imitate for Bill AI. AI is a co-designer across every stage — not just generation and refinement.

**What makes it different:** 61 studies show teams only use AI for idea generation and refinement. The AI Design Swarm Technique uses it everywhere: scope, structuring, divergence, convergence, evaluation, and selection. 3 people, 4 days, ~90 ideas, two rounds of human testing, H2 vision + H1 buildable output.

**Stored (3 docs + slide images):**
- **Meeting note:** [2026-02-13-agent-ideation-walkthrough-brett.md](docs/meeting-notes/2026-02-13-agent-ideation-walkthrough-brett.md) — summary, key insights, video + Google doc links.
- **The AI Design Swarm Technique (plays + 11-prompt journey):** [2026-02-13-brett-agent-ideation-process.md](docs/reference/2026-02-13-brett-agent-ideation-process.md) — 3 phases, 7 stages, 11-prompt sequence, 6 plays with Bill AI adaptations, pre-sprint checklist.
- **Source files & templates:** [2026-02-13-design-swarm-source-files.md](docs/reference/2026-02-13-design-swarm-source-files.md) — Brett's actual markdown files (scope definition, personas with critique+testing profiles, journey maps, JAX vision, 10 ideation dimensions) + our draft Bill AI file inventory and 10 Bill AI dimensions.
- **Slide images:** 5 slides in `assets/` (experiment overview, the plan, context feeding, the journey, AI-specific actions).
- **Blog post:** [2026-02-16-ai-design-swarm-technique-blog-post.md](docs/reference/2026-02-16-ai-design-swarm-technique-blog-post.md) — why people should care, how to run one, the role shift.

**Key things we're adopting:**
1. **Curate a trusted context base** — markdown pack, not Glean; document accuracy is the main lever.
2. **Personas with critique + testing profiles** — so AI can both ideate *for* them and roleplay *as* them.
3. **Design spectrums/dimensions** — force variety along Pole A ↔ Pole B; push to extremes.
4. **Converge on value first, then risk**; use "never do" and scope in evaluation.
5. **Set stakeholder expectations** — vision vs buildable H1; fidelity of output.
6. **Designer = verifier** — domain expert essential; continuity into detailed design.

---

## 2026-02-17

### From 20 problems to 3 swimlanes — how we got here

This is the story of how a cross-functional team took 20 loosely-defined problem areas and turned them into three sharp, actionable agent use cases in under a week. It's a design process story — the kind of thing I want to be able to point people at and say: "This is how we made the call."

#### The starting point

We came into this sprint with an aggressive timeline (Xerocon June 2026), a cross-functional team, and a problem space that could go in twenty directions. David's brief was clear: shape the product, shepherd the team. Think options, not singular. Data points, validation, finding the innovation. Think shared narratives, campfire moments, artifacts that bring conversation.

The first week was about getting everyone looking at the same set of problems. Chong provided a detailed problem documentation exercise, we pulled from existing research (Opportunity 2, Confluence Approval Workflow docs, Pratik's phases, standup conversations, VOC), and we built a list of 20 distinct areas of opportunity — everything from "no cash-aware planning" to "Melio/US flow constraints."

#### Workshop 1: The process

On Friday Feb 13 we ran Workshop 1. The approach was deliberate:

1. **Individual pain point hunting ("Dating Game"):** Everyone came with their own top problems, independently, no groupthink. Only shared in the room.
2. **Scoring:** Each of the 20 items was scored on three dimensions — Severity (how much does this hurt?), Feasibility (can we actually build it?), and Benefit of AI (is an agent the right tool, or should we "just fix" this with better product?).
3. **2×2 mapping, three rounds:** We physically placed sticky notes on three different canvases:
   - **Good Agent vs. Less Good as Agent** — Which problems are natural fits for an AI agent, and which are better solved with traditional product improvements?
   - **Feasible vs. A Stretch** — What can we realistically build vs. what requires infrastructure we don't have?
   - **Real User Need vs. Nice-to-Have** — What do customers *actually* need vs. what sounds cool but isn't urgent?
4. **Voting:** I asked everyone to pick ONE vote for the top problem (the black stickies), then a second round where people could vote for any additional stickies they felt strongly about ("Love it" hearts).

#### What the data told us

The signal was strong. A few things jumped out:

**Cash-aware planning dominated.** "No cash-aware payment planning or prioritization" was the #1 voted problem. The cluster of items around cash flow — uncertainty, guardrails, late payments, scenario testing — formed a clear gravitational centre. The middle row of the black stickies was thematically very similar: late payments, early-pay discounts invisible, and the Tauqir quote ("No guidance such as 'pay critical or urgent supplier bills first'"). People kept orbiting cash awareness.

**Approval problems scored high on agent-fit.** Chasing approvers, fraud/risk detection, and guardrailed auto-approval all scored 5 on AI benefit and agent alignment. These are things agents are *born* to do: chase, flag, escalate, auto-approve within guardrails.

**The adoption gap is real but not agent-solvable.** "Low bill pay adoption" scored the highest raw severity (5 — only 10% of users create bills), but the lowest feasibility (2) and agent alignment (2). You can't agent your way out of a value proposition problem. But you *can* make the journey so dramatically light that people start using it — which is the "Just Pay" insight.

**The "Love it" votes** clustered heavily around approval bottlenecks, guardrailed auto-approval, fraud risk, cash position guardrails, and the "Pay without Bill" theme. Chong, Lili, and others felt the energy in the room shift when we talked about making the bill payment journey disappear for people who don't currently bother with it.

#### From scoring to convergence

After the workshop, I added a fourth scoring dimension — **Agent Alignment** — to separate "is AI the right technology?" from "does this fit the agentic interaction model?" (proactive, learning, planning, chasing vs. static). This gave us a 4-dimension Pugh matrix with 20 items.

I cut the 6 obvious low-scorers (Melio constraints, payment rail opacity, fragmented approval infra, post-payment reconciliation, bulk operations, payment visibility) — not because they don't matter, but because they either aren't agent problems or are blocked by infrastructure we don't have yet.

That left 14 items. Sorted by total score (Severity + Feasibility + AI Benefit + Agent Alignment), three natural clusters emerged:

1. **Cash/planning cluster** (#1, #3, #4, #5, #6, #16, #18) — all orbiting the same user moment: "I have bills to pay, what should I do, and can I afford it?"
2. **Approval/risk cluster** (#8, #10, #19) — the approval bottleneck, the fraud risk, the missing guardrails.
3. **Adoption/ease cluster** (#7, #12, #20) — the 90% who don't use bills, the system that doesn't learn, the obligations that get missed.

In follow-up conversations with Chong, Lili, David, and Angus, we mapped these clusters to three swimlanes. Chong drafted detailed spec documents for each.

#### The three swimlanes

**SL1: Cash-Aware Bill Pay Planner.** The agent gathers all unpaid bills, cash position, supplier criticality, and delivery times. User picks a strategy (Conservative, Standard, Growth). Agent generates a recommended payment run with clear reasoning and cash flow impact. User reviews and approves. The agent plans, the human decides.

**SL2: Approval Concierge.** The agent learns approval patterns, flags risks (duplicates, unusual amounts, vendor bank-detail changes), routes summary cards via email/mobile/Slack with one-click approve options, and enables guardrailed auto-approval for low-risk bills. Turns approvers into reviewers, not detectives.

**SL3: Just Pay (No-Bill Pay).** Capture the 90% who don't create bills. Natural language input ("pay Joe $100 today"), bank-feed pattern detection, background bill creation, cash impact preview. The "Venmo for business" moment: pay-first, account-second.

#### What's next

Each swimlane now needs prototyping. Lili asked each to have a rough artifact by Tuesday AU time — doc, prototype, or experiment results. The sprint runs to Feb 25 with a prototype ready for the NYC presentation. We're in the building phase now.

**Artifacts:**
- Pugh Matrix, Three Swimlanes Rationale, Graybox Prototypes — in `artifacts/walkthrough/` (deployed on Vercel)
- [Chong's Use Case Specs](https://docs.google.com/document/d/1BDgJYmNWgxYs41AjABFEWQIRpLZ1F2wY_ZMfge2yJ6s) — detailed agentic functionality, entry points, open questions

---

## Template for New Entries

```markdown
## YYYY-MM-DD

### What happened

### Decisions made

### Open questions

### Next actions
```
