# Bill AI Automation — Project status (single source of truth)

**Last updated:** 2026-03-17. Update this file whenever something material changes so it stays the one place for "what's true right now."

**North star:** [Bill AI canonical channel C0AGMBC51U0](https://xero.enterprise.slack.com/archives/C0AGMBC51U0) (temp-payments-ai-everywhere). All status, decisions, prototypes, and coordination aim here. See [../reference/2026-02-24-slack-channel-canonical.md](../reference/2026-02-24-slack-channel-canonical.md). **Channel snapshot (24 Feb):** [../meeting-notes/2026-02-24-slack-channel-C0AGMBC51U0-from-glean.md](../meeting-notes/2026-02-24-slack-channel-C0AGMBC51U0-from-glean.md).

**Committed scope (from channel, 23 Feb):** **Chasing agent** and **zero bill entry** — call these out as committed. Theme: **cashflow optimization** (customer pain transcends payment transaction; Bharathi). Story: keep prototypes together — onboarding + cashflow planner, Bills (enrichment + bill runner), Invoicing (JAX + chasing agent), Practice supercharge (Peter).

---

## What’s live (Vercel / deployed)

| Thing | Status | URL / notes |
|--------|--------|-------------|
| **App (walkthrough, explorations, prototype)** | Deploy from repo root | **Prod:** https://blue-superfast-jellyfish.vercel.app. Single Next.js app at repo root. **/** redirects to **/app**; all content under `/app`. Run `bun run dev` → http://localhost:3000. Vercel: connect project to repo with root directory blank. **Walkthrough:** `/app/walkthrough/1` … `6`. **Diya review (one screen per step):** `/app/story/1` … `6`. **Process demo:** `/app/process` — clickable hero flow (analysis → execute); linked from walkthrough footer. |

---

## Latest (Mar 12–17)

- **Safety Shield validation sprint findings published (14 Mar):** Rory’s data report is now captured in-repo with key quantified inputs for phasing and narrative quality: 19% of bill-paying orgs create at least one duplicate monthly (~163K), paid-then-voided upper-bound proxy of 2.1M bills / $4.4B (with explicit non-addressable caveat), ~1,050 Safety Shield-related CX cases/month, strong customer pull for bank-detail-change alerts (761 XPI votes), and target-segment sizing of ~396K orgs in named markets (10-200 bills/month). The note also preserves caveats, data gaps (notably bank-detail history outside Snowflake), and conservative framing guidance for PRD storytelling. See [../reference/2026-03-14-safety-shield-validation-sprint-findings.md](../reference/2026-03-14-safety-shield-validation-sprint-findings.md).
- **Safety Shield prototype review (16 Mar):** Rory’s prototype validated (list column, popover, detail). Design refinements agreed: Ramp competitive screenshots, quick-view/split-screen check, duplicates integration (understand existing API), Jacks actions and best practices. Tauqir exploring duplicate API + Horizon events (Dylan’s doc); session with Sunny (Bills) and Chris (Just Pay) planned. Jon: prototype-first UX, progressive disclosure, subtle dismiss (X in corner), no duplicate approve; send 1-min video to design/stakeholders; review Jacks patterns; schedule Andrew Goodman re LLM explanation. Rory: refinements + stakeholder naming/storytelling. Show and Tell Wednesday (Tauqir unavailable). See [../meeting-notes/2026-03-16-safety-shield-prototype-review.md](../meeting-notes/2026-03-16-safety-shield-prototype-review.md).
- **Safety Shield/Xero Protect design feedback synthesis (17 Mar):** Consolidated feedback from design, product and leadership across Slack threads and video comments into quotable, per-person bullets and shared patterns. Themes: surface AI in context via Spotlight and Quick view; keep JAX opt-in rather than auto-deployed; balance rarity of risky bills against permanent table real estate; treat the surfacing → trigger → JAX sidebar pattern as reusable across bills, tax and payroll; and nail the “boring basics” of extraction, duplicates, PO matching and learned behaviours as the trust foundation. See [../meeting-notes/2026-03-17-xero-protect-feedback.md](../meeting-notes/2026-03-17-xero-protect-feedback.md).
- **Smart Payment Request Agent discovery kicked off:** Darren Alvares (Payments Growth) and Johnathan Rivera (PM) are running a 4-week discovery (10 Mar–4 Apr) for Pillar 2 of the Payments Agent Vision — an agent that auto-drafts the right financial document (Quote, Invoice, Deposit, Payment Link) from business data. Overlaps with Quote-to-Cash, Flexible Payments, and Chasing Agent. See [../strategy/2026-03-16-smart-payment-request-agent-discovery-brief.md](../strategy/2026-03-16-smart-payment-request-agent-discovery-brief.md).
- **Safety Shield sprint (12–15 Mar):** Tauqir locked P0 scenarios (first-time supplier, exact duplicate, bill above historical avg) and P1 (bank-details change, fuzzy duplicate); architecture discussion (sync vs event-driven). Jon focused on design explanation doc; Rory's "two boxes, one arrow" / thin-slice framing. Channel roundup: Chong on milestones, QBO ChatGPT test, global onboarding; David's response to Jon (Diya sees differential in end-to-end data-in to payment; Che tasked Thomas with Brett on surface areas). See [../meeting-notes/2026-03-12-to-15-slack-threads-safety-shield-sprint.md](../meeting-notes/2026-03-12-to-15-slack-threads-safety-shield-sprint.md), [../meeting-notes/2026-03-15-payments-agents-team-channel-roundup.md](../meeting-notes/2026-03-15-payments-agents-team-channel-roundup.md).
- **Phil/Robb agent chat (11 Mar):** US cash flow strategy, homepage widget as agent launch point, Spotlight/JAX integration; Phil's research guidance (early concepts, generative feedback). Weekly DLT (11 Mar): Jon shared agents initiative; FY27 planning tensions; US "payments first" theme. See [../meeting-notes/2026-03-11-agent-chat-phil-robb.md](../meeting-notes/2026-03-11-agent-chat-phil-robb.md), [../meeting-notes/2026-03-11-weekly-dlt-payments-eco.md](../meeting-notes/2026-03-11-weekly-dlt-payments-eco.md).

## Latest (Mar 11)

- **Safety Shield architecture & consumer strategy:** Major architectural pivot identified — from subset of bills (bill planner/cash flow use cases) to a future **org-wide dashboard** of all anomalies (complexity, latency, data sourcing increase by an order of magnitude). **Phased approach:** V1 = subset (e.g. awaiting payment, max ~200 bills); later = org-wide. Team agreed to define “what good looks like” first, then walk back to technical constraints; prototype should include a **technical storytelling sidebar** (limitations/dependencies) and **clear handoff points** (Shield flags anomalies, other teams handle actions). **UX:** “Bubble up, drill down” — list view highlights risky bills, click-through for evidence. **Prototype direction:** Xero-styled interface (not generic), technical reality doc alongside UI, crawl/walk/run vision (Crawl = risk flagging + Xero styling; Walk = approve/defer; Run = recommendations + full workflow). **Next steps:** Jon = crawl/walk/run prototype by end of week (Friday); Rory & Tauqir = scenario definition in parallel; team = sync on UI once scenarios finalized; Tauqir = incorporate into architectural documentation. See [../meeting-notes/2026-03-11-safety-shield-architecture-consumer-strategy.md](../meeting-notes/2026-03-11-safety-shield-architecture-consumer-strategy.md).
- **Rory PRD sparring with Chong and Jenny (Safety Shield):** Rory ran a walkthrough of the Safety Shield PRD with Chong and Jenny, focusing on risk categories, target customers, differentiation, and where to surface the agent. **Alignment:** short-term surfacing in Bills List + Bill Detail, then extending to other agent workflows; target segment (SMB + AB) agreed; AB cross-client risky-bills packaging = future state; consider exposing Safety Shield data to the **Abacus** agent platform workstream for ABs. Rory also shared an evolution story: **Beta (pre–Xerocon)** = background scan + list/detail risk + recommended actions; **GA (Xerocon + 90)** = Shield as input to bill approval + cashflow agents, with JAX/Shield able to fix issues (e.g. vendor email, COP check); **Long term** = Shield across other Xero areas (e.g. payroll), configurable rules or learned behaviour, synergy with bill approval agent rules. See [../meeting-notes/2026-03-11-rory-prd-sparring-chong-jenny-safety-shield.md](../meeting-notes/2026-03-11-rory-prd-sparring-chong-jenny-safety-shield.md).

## Latest (Mar 10)

- **Michael But approvals pod is now explicitly tracked in the repo:** A separate Michael-led pod connected to the approvals engine is now captured as current working context, with **Neeraj** listed as PM and **Shawn Wilson** recorded as a tentative pod member pending confirmation. This adds visibility without overwriting David Brown's Mar 6 four-agent assignment, which still stands as the historical source for that table. See [../reference/2026-03-10-michael-but-approvals-pod.md](../reference/2026-03-10-michael-but-approvals-pod.md).
- **Bill Cashflow is being grounded in scenario-based planning:** Dillon asked the team to challenge and extend a working set of **easy, medium, and hard cash-flow scenarios** that the agent should solve, with explicit alignment requested from **Jon, Lili, and Chong**. This scenario set is now a key input to both UI thinking and agent architecture. Important constraint: **Syft models buffer in days, not dollars**. See [../meeting-notes/2026-03-10-dillon-bill-cashflow-scenarios-and-daily-wrap.md](../meeting-notes/2026-03-10-dillon-bill-cashflow-scenarios-and-daily-wrap.md).
- **Bill Cashflow delivery is currently leaning toward a multi-surface MFE path:** Robb is spinning up an **MFE** to host the agent UI because plans are expected to surface in multiple places. At the same time, the team has paused the previously proven Syft API → Bills → Cash Flow Manager implementation path so effort can focus on scenario definition, UX direction, and architecture gaps. See [../meeting-notes/2026-03-10-dillon-bill-cashflow-scenarios-and-daily-wrap.md](../meeting-notes/2026-03-10-dillon-bill-cashflow-scenarios-and-daily-wrap.md).
- **The Bill Cashflow scenario logic is now captured as a durable repo reference:** Dillon's "Cashflow: Algorithmic Scenarios & Logic Flows" doc has been summarized in the repo, including solvable, trade-off, and unsolvable cases plus the shared alert → explain → adjust → commit interaction loop. Current repo read: strong logic map for engineering/data discussion, but still needs MVP prioritization, clearer data-confidence rules, and sharper product-boundary decisions. See [../reference/2026-03-10-cashflow-algorithmic-scenarios-and-logic-flows.md](../reference/2026-03-10-cashflow-algorithmic-scenarios-and-logic-flows.md).
- **Jon and Chong gave Slack feedback on Dillon's plan:** Jon asked for a visual representation of each scenario in a prototype and flagged data quality as the main sticking point. Chong: (1) always allow customers to override the plan (and use as algorithm feedback); (2) accurate due-date options (early discount, late fees, grace period) = critical trust moment; (3) start with bill criticality by supplier type and customer preference; then layer Syft for top scenarios. See [../meeting-notes/2026-03-10-slack-feedback-dillon-plan-jon-chong.md](../meeting-notes/2026-03-10-slack-feedback-dillon-plan-jon-chong.md).
- **Safety Shield now has a parallel scenario-and-logic draft in the repo:** A new repo-authored note mirrors Dillon's scenario format but adapts it for Shield's actual job: detect risk, explain evidence, and route to the safest next action rather than optimize payment timing. The draft frames Shield as a shared detection layer across list/detail/approval/Spotlight surfaces, with a recommended first slice of duplicates, first-time supplier + unusually large bill, and familiar supplier amount spikes. See [../reference/2026-03-10-safety-shield-detection-scenarios-and-logic-flows.md](../reference/2026-03-10-safety-shield-detection-scenarios-and-logic-flows.md).
- **Status-sharing playbook in place:** Confluence hub now has context block, squad status table, and per-squad key-people tables; Safety Shield working brief includes a UX risk register and overview block. Repo references added for Slack (short summary + link + @mentions), Miro (Agents status / Xerocon board), and an optional **Agents design sync** ritual (Confluence-ready definition). See [../reference/2026-03-10-sharing-updates-slack-and-confluence.md](../reference/2026-03-10-sharing-updates-slack-and-confluence.md), [../reference/2026-03-10-miro-agents-status-xerocon-board.md](../reference/2026-03-10-miro-agents-status-xerocon-board.md), [../reference/2026-03-10-agents-design-sync-ritual.md](../reference/2026-03-10-agents-design-sync-ritual.md).
- **Safety Shield research basis and gaps documented:** A single reference doc now captures what the Safety Shield brief is based on (product/stakeholder alignment, not cited user research), a table of related existing research (approvals synthesis, Melio approvals, duplicate detection PRD, AU Bill Pay, Lana permissions, etc.), and known gaps (quantification, trust/evidence, advisor adoption, product scope). The Safety Shield working brief (md + rtf) has been updated with a **Research basis** section and a link to this doc. See [../reference/2026-03-10-safety-shield-user-research-and-gaps.md](../reference/2026-03-10-safety-shield-user-research-and-gaps.md).

## Latest (Mar 9)

- **Rory working session clarified Safety Shield story and team rhythm:** Jon and Rory aligned on a protect-cash-flow framing for Safety Shield, with three risk buckets (fraud, duplicates, cash-flow risk) and a four-step journey of monitor → detect → provide evidence → take action. They also agreed to favor "show don't tell" artifacts, with a 5-slide story deck targeted for Wednesday and a working prototype as the stretch goal for Friday. [../meeting-notes/2026-03-09-rory-safety-shield-bill-approval-daily.md](../meeting-notes/2026-03-09-rory-safety-shield-bill-approval-daily.md)
- **Safety Shield prototype imported into repo:** Jagmeet Cheema's `smart-payment-shield` Lovable prototype has been adapted into the local Next.js app as native routes under `/safety-shield/prototype`, including the bills list, bill detail, and AI insights views. This avoids adding more `app/app` nesting and sets a cleaner path pattern for agent-specific prototypes.
- **Cursor-native Confluence hub foundation added:** Repo now has a shared Confluence client + managed-section sync model in `src/lib/confluence/`, a first internal hub UI at `/app`, a project skill at `.cursor/skills/confluence-agent-hub/SKILL.md`, and Bun scripts for creating/updating a Confluence test tree and reading a page back. See [../reference/2026-03-09-cursor-confluence-agent-hub.md](../reference/2026-03-09-cursor-confluence-agent-hub.md) and [../ai-daily-journal/2026-03-09.md](../ai-daily-journal/2026-03-09.md).
- **Confluence hub rollout hardened for team use:** Local setup is now `.env.example` → `.env.local`, Jon-specific env fallback was removed from repo code, `--dry-run` and parent-page targeting were added, idempotent sync was verified against live pages, and `.github/workflows/confluence-agent-hub-sync.yml` now provides a shared manual/nightly execution path via repository secrets and variables. See [../reference/2026-03-09-cursor-confluence-agent-hub.md](../reference/2026-03-09-cursor-confluence-agent-hub.md).

## Previous (Mar 6)

- **AI Forecast #4 shipped:** Nick Baillie's Devin story, Design Swarm playbook (Di/Brett), Erin Casali's Design Playground beta. Distribution expanding to all DLT per Lauren's request.
- **Safety Shield = separate agent (confirmed):** David, Dillon, Rory all agree. Safety Shield is a radar/scanning service used across many screens; Bill Approval is one consumer. Rory's first-cut Safety Shield PRD shared. Lovable prototype by Jagmeet Cheema (Bills team): smart-payment-shield.lovable.app.
- **Recipient Consent Gate agent pattern drafted:** Deterministic consent gate for recipient-facing chasing workflows, with Human-Led initiation (Null→Pending), Active/Pending/Revoked state machine, pre-flight consent checks, “Stop/Opt-out” handling, and reusable patterns across agents and channels. See [../reference/2026-03-06-recipient-consent-gate-agent-pattern-spec.md](../reference/2026-03-06-recipient-consent-gate-agent-pattern-spec.md).
- **Robb taking east coast point** on agent work with DG, Mugdha — daily alignment with Jon (timezone optimization).
- **Daily standups next week** with Rory/Tauqir (1hr, booked by Rory). Monday catch-up booked.
- **Channel renamed to #payments-agents-team** — official kickoff day.
- **Safety Shield kickoff (Jon, Tauqir, Rory):** Agent architecture clarified — Safety Shield (anomaly detection, fraud, supplier trust) vs Bill Approval (routing/rules) as separate services. Spotlight as entry point. Next: Rory shares PRD, Tuesday follow-up. [../meeting-notes/2026-03-06-safety-shield-kickoff.md](../meeting-notes/2026-03-06-safety-shield-kickoff.md).
- **David 1:1:** Three agents confirmed for Jon: (1) Cash flow prediction with Dylan, (2) Safety shield with Rory, (3) Approval automation with Rory. MFA UX escalation path discussed. Dev Day "drive-through" concept pitched. Design Day AI pitch to Lauren (pending Shay). [../meeting-notes/2026-03-06-david-1on1.md](../meeting-notes/2026-03-06-david-1on1.md).
- **Helped Audrey with dev environment setup:** Terminal basics, Docker running, needs Robb for auth/SPA. [../meeting-notes/2026-03-06-audrey-dev-setup-help.md](../meeting-notes/2026-03-06-audrey-dev-setup-help.md).
- **Design audit tool startup demo:** Product feedback given, designer confidence positioning discussed. [../meeting-notes/2026-03-06-design-audit-tool-demo.md](../meeting-notes/2026-03-06-design-audit-tool-demo.md).
- **AI Agent Squad kick-off (6 Mar):** Full team kickoff (Chong, David, Rory, Dillon, Dhruv, Tauqir, Mugdha, Merv, Mike, Lili, Jon, others). Squad model (lean cross-functional, 100% for key members); aggressive timeline (half of features in beta before July Xero Con); agent suite: Bill Enrichment (Dhruv), Approval Automation + Bill Runner (Jon/Tauqir squad), Safety Shield, Zero Onboarding; cash flow–centric orchestration; next steps: Slack channel (Jon), weekly leadership updates, PRD/feasibility, customer research plan, timeline validation. [../meeting-notes/2026-03-06-ai-agent-squad-kickoff.md](../meeting-notes/2026-03-06-ai-agent-squad-kickoff.md).
- **Four agents assignment (David, Slack):** Bill Cashflow (Jon/Robb/Dillon, US), Bill Workflow 1 (Jon/Audrey/Rory, AU), Bill Workflow 2 (Katrina/Angus/Merv, AU), Onboarding (Michael But/Angus/Mike, US). First two = definitive (Day 0→1, thin slice/specs/validation); second two = explorative. Chong kicking off early AM/PM 6 Mar. See [../strategy/2026-03-06-four-agents-assignment.md](../strategy/2026-03-06-four-agents-assignment.md) and [../reference/2026-03-06-david-slack-four-agents.md](../reference/2026-03-06-david-slack-four-agents.md).
- **Agents huddle (6 Mar):** Jon, Audrey, Robb — naming (Prototype 1 = Bill Cashflow, Prototype 2 = Bill Workflow 1), mapping of Jon's prototypes, Spotlight as entry-point assumption, desktop/US vs non-US, related product (Scenario Planner, SIFT/Cash Flow Manager, Jonathan's cash position). Open questions and assumptions captured. [../meeting-notes/2026-03-06-agents-huddle.md](../meeting-notes/2026-03-06-agents-huddle.md), [../workshop/2026-03-06-assumptions-to-verify.md](../workshop/2026-03-06-assumptions-to-verify.md).
- **Philip (Slack, 6 Mar):** Wants to connect with Jon on Cashflow; US Product Leadership unlocking "Cashflow as Hook"; AI Agents foundational; Payer Chasing Agent "probably even more impactful." [../reference/2026-03-06-philip-cashflow-hook.md](../reference/2026-03-06-philip-cashflow-hook.md).
- **Emma (via Robb, Slack, 6 Mar):** Clarified Cash Flow Manager (Syft, 180d, transaction-level, "can I pay my bills") vs Scenario Planner (1–2y, account-level monthly, P&L modelling); investigating whether cash flow manager can feed scenario planning's cash flow impact; ensure clear differences and seamless handoff for customers. [../meeting-notes/2026-03-06-emma-scenario-planner-cash-flow-manager-update.md](../meeting-notes/2026-03-06-emma-scenario-planner-cash-flow-manager-update.md).

### Four agents (Mar 6) — agent map

| Agent | Running point | Consult | PM | One-line |
|-------|----------------|--------|-----|----------|
| **Bill Cashflow** | Jon | Robb | Dillon (Toronto/US) | Cash flow position / "can I afford?" via Spotlight; desktop TBD. |
| **Bill Workflow 1** | Jon | Audrey | Rory (Sydney) | Approval → handover → chasing. |
| **Bill Workflow 2** | Katrina Li | Angus | Merv (AU) | Explorative. |
| **Onboarding** | Michael But | Angus | Mike (US) | Explorative; onboarding + cashflow view. |

Full table and aliases: [../strategy/2026-03-06-four-agents-assignment.md](../strategy/2026-03-06-four-agents-assignment.md).

### Michael But approvals pod (Mar 10) — connected pod view

This does **not** replace the Mar 6 four-agent assignment above. It captures the additional Michael-led pod context that now needs to be visible in current repo surfaces.

| Pod | Lead | PM | Other known members | Relationship to current squads |
|-----|------|----|---------------------|--------------------------------|
| **Michael But approvals pod** | Michael But | Neeraj | Shawn Wilson (**tentative**) | Connected to the approvals engine as a foundational layer; tracked separately so the repo can show current working context without rewriting the Mar 6 Bill Workflow 1 / Onboarding table. |

Reference note: [../reference/2026-03-10-michael-but-approvals-pod.md](../reference/2026-03-10-michael-but-approvals-pod.md).

- **Bill Runner PRD (Confluence, Dillon):** Official PRD for Payments — Bill Runner Agent (Global) added. Bill Runner = 90-day cash flow projection + optimized AP payment plans; Q1 FY27 delivery start; Sarah persona; JAX “show the work,” 90–95% accuracy, multiple plan options. Repo reference and alignment: [../reference/2026-03-06-prd-bill-runner-agent-global.md](../reference/2026-03-06-prd-bill-runner-agent-global.md). Confluence: [PRD — Payments — Bill Runner Agent — Global](https://xero.atlassian.net/wiki/spaces/XFS/pages/271910174842/PRD+-+Payments+-+Bill+Runner+Agent+-+Global).

---

## Previous (25–26 Feb)

- **David meeting (26 Feb):** Strategy alignment (Brett: end-to-end cash flow = most compelling story; Predict / Protect / Execute framing), design review of all three concepts with concrete execution notes (traffic light metadata, Ramp anomaly reference, Sift placeholder, mid-tier numbers 40 bills/week / $45K turnover / $25K payroll). Plans pattern work with Brett; campfire/collaboration and stakeholder orbits. See [../meeting-notes/2026-02-26-david-meeting-notes-and-design-feedback.md](../meeting-notes/2026-02-26-david-meeting-notes-and-design-feedback.md).
- **David review & reframe (25 Feb):** "Is this even good?" — pressing pay is the easiest part; real toil is upstream (bill entry, coding, approval chasing, context sorting). Target v2: bill entry/coding assistance, approval optimization, exception handling. See [../meeting-notes/2026-02-25-david-review-and-reframe.md](../meeting-notes/2026-02-25-david-review-and-reframe.md).
- **Consolidated David discussion topics (26 Feb):** Doc pulls together all David's discussion topics, action items, latest reframe, and **clear agent descriptions** for each of the three concepts. [../strategy/2026-02-26-david-discussion-topics-and-agent-directions.md](../strategy/2026-02-26-david-discussion-topics-and-agent-directions.md).

---

## This week (22–23 Feb)

- **Design direction (22 Feb):** SL1 = dashboard → inline bills → chatbot + training; SL2 = chatbot (requester) + WhatsApp (approver); SL3 = pure chat (say it → we do it). See [../workshop/2026-02-22-swim-lane-design-direction.md](../workshop/2026-02-22-swim-lane-design-direction.md). **Diya review flow:** One screen per step at `/app/story/1` … `/app/story/6` for the exec review.
- **David feedback (23 Feb):** Focus Diya on **what** we're proposing and **why**; don't stress "how we got there." He asked for **elevator pitches** for the three concepts (Bill Payment Planner, Intelligent Bill Approval, Just Pay). **Delivery interface:** Don't put everything in a side panel — vary by use case: integrated into workflow, alternative channels (e.g. WhatsApp), embedded vs larger panel; "2–3 click and done" is the ideal, the *how* varies. **Actions:** David review checkpoint prior to Diya (this week); send to **Che** for visibility (not pre-check). Elevator pitches and analysis: [../meeting-notes/2026-02-23-david-feedback-elevator-pitches.md](../meeting-notes/2026-02-23-david-feedback-elevator-pitches.md).

---

## Previous (20 Feb)

- **Andrew Goodman (Director of Product AI):** LLM only for natural-language UI; core data processing in code. Pre-planted chips / guided interactions over open chat. Embedded sparkle (e.g. awaiting payments) over drawer-only.
- **Three swim lane prototypes:** Jon delivering URL by EOD 20 Feb — Bill Payment Planner, Intelligent Bill Approval, Just Pay (whiteboard sketch level). Storytelling framework (problems → concepts → prototype) landed well with Dorothy and Peter.
- **SL1:** Entry from awaiting payments; 3-click simple path vs planner path; click reduction (e.g. 23 → 3); trainability peek; LLM for explaining anomalies. **SL2:** Entry from Bill Safety Shield; group by problem; literal email workflow and chasing; Sarah → Alex handover with timestamp/note. **SL3:** Entry (e.g. Just Pay on homepage); voice → review → pay; blue CTAs; “Repeat this” hint.
- **Next:** Neeraj PRD (first two lanes); Tauqir PoC refinement (code for crunching, LLM for NL); Chong strategy deck for Diya. Melio feasibility assessment week after next. Xerocon: ~90 days for 2+ agents.
- **Meeting notes:** [../meeting-notes/2026-02-20-bill-pay-agent-workshop-andrew.md](../meeting-notes/2026-02-20-bill-pay-agent-workshop-andrew.md). **Prototype update checklist:** [../workshop/2026-02-20-prototype-updates-from-workshop.md](../workshop/2026-02-20-prototype-updates-from-workshop.md).

---

## Previous week (17 Feb)

- **Scope locked: Swimlane 1 — Cash-Flow Aware Planner** (bill preparation & planning)
- **One prototype, not three** — focus on quality over breadth
- **Promising concepts:** Cash runway watcher, Instant Pay intent capture, Early pay discount radar, Bill timing optimizer
- **Geography:** US only (flexible to pivot UK if Melio API is difficult)
- **Design direction:** JAX-aligned, beyond chatbot paradigm (emergent banners, list view integration)
- **Friday deliverables:** Evolution story + synthesised narrative + working prototype
- **Tauqir** demoed JAX slide-in panel (Wed 18 Feb) — working locally with mocked data
- **Hero use case defined:** Analysis → anomaly flagging → recommendations → user fine-tuning → cash flow position → payment execution
- **Three entry points:** "Can I afford to pay my bills?" / "Show me high-risk bills" / "Give me payment recommendations"
- **Feedback:** Neeraj (information overload, predefined categories), Chong (table format, user editing, plan mode before execution)
- **Jon** getting local env running for rapid Cursor-based UI iterations
- **Presentation approach:** Aspirational end-to-end demo + static screens for NY workshop
- **Daily standups cancelled** — async updates in Slack
- **Melio NYC offsite:** Feb 23–26 — arm the group with prototypes and recommendations
- **Xero Reimagine announcement Wed/Thu** — no major design changes but engineering/PM adjustments expected
- **Post-Friday:** Engage Toronto team (Pratik's) on the prototype
- **Post–Workshop 3 (18–19 Feb), Slack:** Jon: Figma-first for pitch — static screens to tell the story, then real demo as follow-on ("mic drop"). Plan pattern: optional; avoid "one more admin step"; Brett's thoughts to be shared. Tauqir: POC stays bill-specific; Cashflow Manager integration called out as future win; continuing POC code efficiency. **Lili:** Two technical spike buckets documented — Q1 (LLM reasoning over financial context, hallucination/correctness/stability), Q2 (supplier criticality inference from history + LLM classification). See [../meeting-notes/2026-02-19-slack-workshop-summary-and-status.md](../meeting-notes/2026-02-19-slack-workshop-summary-and-status.md) and [../reference/2026-02-19-lili-technical-spike-questions.md](../reference/2026-02-19-lili-technical-spike-questions.md).
- **Diya review deadline (19 Feb):** Chong spoke with Diya Jolly. Need differentiation, not checklist features. **New deadline:** Next AU Friday — 30–45 min pitch alongside other agents. Volume expectation: 5–6 agents minimum. Diya: "Don't worry about trade-offs, go big and bold."
- **Chong/Bharathi strategic doc (20 Feb):** "AI payments for AB and SB, built once" — AB ideas (cashflow autopilot, payer-chasing, smart bill-run planner, bill safety shield, onboarding, collections); SB mirror; product view (build once, serve both); differentiation vs Intuit/Sage. Full content in [../reference/2026-02-20-chong-bharathi-ai-payments-ab-sb-built-once.md](../reference/2026-02-20-chong-bharathi-ai-payments-ab-sb-built-once.md).
- **Tauqir/Chong SL2 clarification (19 Feb):** SL2 = **payment approval feature** (Melio), not pre-payment bill approval (Pratik's team).
- **Lili naming (17 Feb):** 1. Cash-Flow Aware Planner; 2. Intelligent Bill Approval; 3. No-Bill Bill Pay (lightweight UX flow: intake → approval → payment, rough wireframes OK).

---

## Latest state (what’s come through)

### Workshop 1 (Fri 13 Feb) — outcome

- **Decision:** Ranked list of 20 "areas of opportunity" on Severity, Feasibility, Benefit of AI (scores 1–5). No formal "Decided / Deferred / Open" write-up was captured in the repo; the **canonical output is the Google Sheet**.
- **Sheet:** [Bill Workflow Agent: Areas of opportunity](https://docs.google.com/spreadsheets/d/1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM) — tab "Bill Workflow Agent: Areas of opportunity" (note: sheet name has a leading zero-width space in the UI).
- **Top 4 (score 13):** Time/cognitive load, Manual config (system doesn’t learn), Chasing approvers, Fraud/risk signal layer.
- **Chong’s input:** "Manual, repetitive configuration" (Opportunity 2) landed in top 4. Scoring framework = Chong’s (Severity, Feasibility, Benefit of AI).
- **Lili’s input:** Full strategic doc (Segment A/B/C, Phases 1–4, Approval Intelligence Layer) — most problem-level ideas map to sheet items; see rationale/pitch docs. Lili’s doc is not stored in repo (lives in Slack/email).
- **Known sheet bug:** Row "Chasing approvers" has wrong description (copy of Manual config). Correct text: chasing managers, overdue approvals, no smart reminders/escalation, ~120k orgs view "awaiting approval" monthly.

### Bill AI synthetic user personas and concept quotes

- **Three persona files** in `docs/reference/`: Bill Creator (small high-volume), Cautious Approver, AP Clerk. Each includes Refinement & Critique Profile and Evaluation & Testing Profile so the AI can roleplay as them and evaluate ideas (synthetic users).
- **Synthetic user quotes (raw data):** All 20 workshop concepts run through the 3 personas — crisp first-person quotes, tough critic. In [../raw-data/2026-02-17-synthetic-user-quotes-by-concept.md](../raw-data/2026-02-17-synthetic-user-quotes-by-concept.md). Re-run process: [../reference/2026-02-17-synthetic-user-evaluation-process.md](../reference/2026-02-17-synthetic-user-evaluation-process.md).

### Artifacts in repo (post–Workshop 1)

**Repo cleanup (16 Feb):** Removed duplicate standalone HTML files (`pugh-chart.html`, `graybox-prototypes.html`, `three-use-cases-rationale.html`) from `artifacts/`. That content lives in `artifacts/walkthrough/` (Pugh Matrix, swimlanes, graybox prototypes) and is deployed on Vercel.

**Walkthrough no longer a nested repo (17 Feb):** `artifacts/walkthrough/` was previously an embedded git repo (had its own `.git`), so clones did not get its contents. The inner `.git` was removed; the walkthrough is now tracked as normal files in this repo. Anyone who clones gets the full walkthrough source—no submodule init needed.

| Thing | Where | Purpose |
|--------|--------|--------|
| Ranked list + rationale | [../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) | Scores and rationale for all 20 items; Chong & Lili focus callouts |
| HTML version | [../workshop/2026-02-14-chong-lili-items-scored-with-rationale.html](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.html) | Same, browsable |
| Top 9 + full 20 table | [../workshop/2026-02-13-workshop-1-top-9-problems.md](../workshop/2026-02-13-workshop-1-top-9-problems.md) / [.html](../workshop/2026-02-13-workshop-1-top-9-problems.html) | Original 9 + extended table; row click for rationale |
| Pitches ("why choose this one") | Not yet in repo | One-pitch-per-item (feasible / important / AI) — was generated in conversation; can be added to a doc if needed |
| Lili → sheet mapping | Not yet in repo | Which Lili concepts map to which sheet rows — can be added if useful |
| Google Sheets automation | [../reference/2026-02-17-google-sheets-automation.md](../reference/2026-02-17-google-sheets-automation.md) | How to update the sheet from scripts; service account; find-and-replace vs Values API |
| **Next steps: prototype + visuals** | Connect to real API; align visuals with design deck | [../strategy/2026-02-17-next-steps-prototype-and-visuals.md](../strategy/2026-02-17-next-steps-prototype-and-visuals.md) |

---

## What we’re tracking (open actions)

| Owner | Action | Status |
|-------|--------|--------|
| **Jon** | Sync with **Dillon** (Bill Cashflow), **Rory** (Bill Workflow 1); verify assumptions with David/Chong | Open — 6 Mar huddle |
| **Jon** | Align Wednesday group format with **Chong** so teams present concise, artifact-driven updates (target: short pitch / 5-slide rhythm) | Open — 9 Mar Rory session |
| **Jon** | Connect with **Philip** on Cashflow (US Product Leadership, Cashflow as Hook deck) | Open — 6 Mar |
| **Jon** | Verify assumptions in [../workshop/2026-03-06-assumptions-to-verify.md](../workshop/2026-03-06-assumptions-to-verify.md) (Spotlight entry, workflow prototype = Workflow 1) | Open |
| **Rory** | Draft a 5-slide Safety Shield / Bill Approval story deck for Wednesday review | Open — 9 Mar Rory session |
| **Jon** | Develop Safety Shield crawl/walk/run prototype by end of week (out Friday) — [../meeting-notes/2026-03-11-safety-shield-architecture-consumer-strategy.md](../meeting-notes/2026-03-11-safety-shield-architecture-consumer-strategy.md) | Open — 11 Mar |
| **Rory & Tauqir** | Continue Safety Shield scenario definition work in parallel | Open — 11 Mar |
| **Team** | Sync on Safety Shield UI requirements once scenario list finalized | Open — 11 Mar |
| **Tauqir** | Incorporate Safety Shield architecture meeting findings into architectural documentation | Open — 11 Mar |
| **Team** | Use async discussion with **Tauqir** to define feasibility spikes and data-quality constraints for the first cut | Open — 9 Mar Rory session |
| **Jon** | Address prototype updates from 20 Feb workshop (see [../workshop/2026-02-20-prototype-updates-from-workshop.md](../workshop/2026-02-20-prototype-updates-from-workshop.md)) — **to be done later** | Open |
| **Jon** | Get AI representation in workshops (e.g. Soon-Ee) | Open |
| **Jon** | Pain points collection doc (Dating Game) — may be superseded by sheet | Open |
| **Jon** | Reach out to Brett for workshop participation | Open |
| **Jon** | Review Pratik’s strategy doc (maturity model / early AI roadmap) | Open |
| **Jon / Lili / Chong** | Review Dillon's Bill Cashflow scenario document and challenge whether the easy / medium / hard cases reflect the right agent problem space | Open — 10 Mar |
| **Dillon** | Meet with Syft PM on algorithmic gaps and report back on where the AI team may need to bridge them | Planned — 11 Mar |
| **Robb** | Explore MFE-based UI delivery and connect with Syft designers plus Spotlight team on likely UX direction | In progress — 10 Mar |
| **Jon** | Post–Workshop 1: Decided/Deferred/Open write-up; fix Chasing approvers row in sheet | Open |
| **Jon** | Export-for-NotebookLM: curated file export for NotebookLM | Idea |
| **Chong** | Provide 8–9 problems for Friday — sheet now has 20; list evolved | Superseded |
| **Jenny, Peter, Pratik, Chong** | Ownership boundaries (bills vs payments) | In progress |
| **Neeraj / Jiten** | Melio stats (time on screens, errors) | Asked |
| **Workshop 2** | Deep dive + sketching from tagged list | Tue 17 Feb |
| **Workshop 3** | Prototyping | Wed 18 Feb |

---

## Single source of truth — how to use this

- **This file (PROJECT-STATUS.md):** Read this first. "What’s the latest? What’s this week? What’s open?" Update whenever something material happens (new meeting, decision, artifact, or action).
- **INDEX ([INDEX-whats-stored-and-next-steps.md](INDEX-whats-stored-and-next-steps.md)):** Full inventory of what’s stored and where. Update when you add new docs or close actions.
- **AI daily journal ([../ai-daily-journal/](../ai-daily-journal/)):** One file per day (yyyy-mm-dd.md) with a detailed summary of what was discussed that day.
- **Personal notes:** Each team member can keep private notes in `personal-notes/` (gitignored). See [CONTRIBUTING.md](../../CONTRIBUTING.md).

---

## One-line "what this repo is"

**Bill AI Automation** — Make every bill "ready to pay" on creation. This repo holds strategic context, POC sprint scope, workshop prep and run sheets, meeting captures, the ranked opportunity list (and rationale), and project status so the team has one place for the latest truth.
