# Agent Ecosystem Analysis — Where Bill AI Fits

**Date:** Feb 17, 2026
**Status:** Working insight — to discuss with team. Not yet shared.

---

## The Five Agent Streams at Xero

| Stream | Designer(s) | Maturity | Core Pattern |
|--------|------------|----------|--------------|
| **Payer-chasing** (Get Paid) | Darryl Powell (former) + TBC | Most mature. PRDs in draft. | Chase external contacts (customers) to pay invoices |
| **AB Info/Doc chasing** | Brett's orbit | Core objects + flows defined | Chase external contacts (clients) to submit documents |
| **Payroll-chasing** | TBD | User stories + flows | Chase internal contacts (employees/managers) for timesheets + approvals |
| **Pay run orchestration** | TBD | Flow + key pages | Orchestrate a multi-step internal workflow with approval gates |
| **Bill AI Agent** (us) | Jon, David, Angus | Concept stage (3 swimlanes) | Plan, approve, and pay bills with cash-aware intelligence |

Also: **Compliance Partner** (lighter detail) and **Agent Dashboard** (shared infrastructure layer).

---

## Shared Patterns Across All Streams

### 1. Chasing / Nudging
The dominant pattern. Payer-chasing, AB doc chasing, and payroll-chasing are all the same structural play: identify what's missing or overdue, select channel + timing + tone, send, monitor response, escalate if no response. Our **SL2 Approval Concierge** is this exact pattern applied to *internal* approvers rather than external contacts.

### 2. Risk / Anomaly Detection
Payroll-chasing has "auto-approve low-risk" with the agent flagging repeat missed approvals. Our **SL2** has fraud detection, duplicate bills, bank-detail changes. Same pattern: the agent pre-scores risk and surfaces signals to the human.

### 3. Agent Configuration / Rules
Every stream has a setup phase: preferences, rules, escalation policies, channel preferences. The open questions about "which parameters are mutable vs fixed," "can ABs define their own goals," and "what level of customizability" apply to ALL streams including ours. The **Settings/config** cluster on the coordination map is the shared need.

### 4. Agent Dashboard / Job Status
Global view: Upcoming, In Progress, Blocked, Paused, Complete. Every agent creates "jobs" that appear here. Our payment plans and approval runs would be jobs too.

### 5. Multi-channel Communication
FY27: Email (must), Web (must), Xero Files (must), XAA (nice-to-have). Post-FY27: SMS, WhatsApp, Inbox fetch. The channels are the same across streams; the *content* differs.

### 6. Human-in-the-loop Gates
Every stream has "review before sending" and "approve before executing." The approval pattern in pay run orchestration (action required email, View details, Approve) is structurally identical to our approval concierge.

---

## What's UNIQUE to Bill AI

### SL1: Cash-Aware Planner — unlike anything else in the ecosystem
No other agent does *planning and reasoning about trade-offs.* The payer-chasing agent chases; our planner *thinks*. It gathers context (cash position, supplier criticality, terms, goals), reasons about trade-offs (Conservative vs Growth), and proposes a plan. This is a qualitatively different kind of agent behavior — it's not "do this thing repeatedly until done," it's "analyze the situation and recommend a course of action."

### SL2: Approval Concierge — overlaps with existing patterns but adds unique risk intelligence
The chasing part (nudge approvers) is the same pattern as payer-chasing and payroll-chasing. But the fraud/anomaly detection and cash-context-in-approval is new. The "Approve all safe items" one-click is new. The existing streams don't have the concept of the agent *pre-sorting by risk.*

### SL3: Just Pay — a new type of agent entirely
It's not chasing anyone. It's not orchestrating a workflow. It's *reducing friction to zero* for an action the user wants to take but currently doesn't bother with. The "financial memory" and pattern detection from bank feeds is a capability no other stream has explored.

---

## The Strategic Tension

Items that align with existing chasing/approval patterns (like #8 Chasing approvers) score high on platform leverage — the infrastructure is being built by other teams. Items that require novel agent capabilities (like #1 Cash-aware planning) are highly agentic but require us to *pioneer* the pattern rather than reuse it.

This creates two valid strategic positions:

**Position A: "Speak with one voice"** — Lean into the shared patterns. SL2 (Approval Concierge) is the strongest fit here. At Xerocon, the agent story is coherent: Xero agents chase, protect, and approve across invoices, bills, payroll, and documents. Bill AI extends the same model to a new domain.

**Position B: "Be differentiated"** — Lean into SL1 (Cash-Aware Planner) as the hero. This is the one thing no other stream is doing. At Xerocon, the bill agent stands out: not just another chaser, but a *planner* that reasons about your cash flow. The risk is that it's harder to build because there's no existing pattern to ride on.

**Position C: "Both"** — SL1 is the hero (differentiated, wow-factor), SL2 leverages platform patterns (faster to build, proves the model), SL3 is the vision play (adoption story).

**To discuss:** Which position for Xerocon? Does the team want coherence or differentiation? Does David want to show "one agent platform" or "look what this specific agent can do"?

---

## Open Questions That Apply to Us

From the agent coordination boards and sticky notes:

- **"Should the agent decide the contact person to reach?"** — For SL2: which approver to chase?
- **"How do we handle approval steps? (Before sending, email me a draft to approve)"** — Our "review gates" pattern exactly.
- **"What permissions management should there be?"** — Who can modify the payment plan? Override risk assessment?
- **"What is the flow for modifying a launched agent vs setting the agent up?"** — If the planner proposes a run and the user changes it, what happens?
- **"Can we detect negative sentiment?"** — Can the agent detect when an approver is repeatedly blocking bills?
- **"Potentially new AuthZ Policy?"** — If our agent auto-approves low-risk bills, that's a new authorization model.
- **"Agents are at an org level"** — Planner and approval concierge are org-level. "Just Pay" might be per-user.

---

## Source Material

- Figma boards: Agent Dashboard, Payer-chasing agent, AB Information chasing agent, Pay run orchestration, Payroll-chasing agent, Compliance Partner
- Coordination workshop: "Why we're here," "Where everyone is at," "What everyone is planning next," "Coordination map"
- Open questions sticky notes (AuthZ, permissions, channels, error handling)
- Brett 1:1 (Feb 12): four active streams, agent platform board, standardization next step
- AI Payments channel synthesis: three opportunities, current state, constraints
- Workshop 1 prep compiled: Miro board summaries for all five agent streams
