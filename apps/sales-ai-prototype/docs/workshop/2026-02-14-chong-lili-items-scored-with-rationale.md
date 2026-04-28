# Chong & Lili's items — predicted scores and rationale

**Source:** Bill Workflow Agent: Areas of opportunity (Google Sheet).  
**Scale:** 1 = low → 5 = high. Opinion only — use to spark debate and replace with room consensus.

**Definitions (for this pass):**
- **Severity:** How much of an issue is this? (customer pain, strategic impact, scale of harm)
- **Feasibility:** How hard to fix? (1 = very hard / blocked, 5 = we can do it with current levers)
- **Benefit of AI:** Is this best fixed with an agent/AI or “just fix” with product/UX? (5 = strong agent opportunity; 1 = fix with rules/UI, no agent needed)

---

## Full table (all 20 items)

| # | Area of opportunity | Sev | Feas | AI | **Severity rationale** | **Feasibility rationale** | **Benefit of AI rationale** |
|---|----------------------|-----|------|-----|------------------------|---------------------------|-----------------------------|
| 1 | No cash-aware payment planning or prioritization | 4 | 3 | 5 | High strategic pain: no proposal of which bills to pay, when, why, or cash impact; no view of reserve or projected position. Directly undermines “ready to pay” and cash confidence. | Needs data (cash, terms, due dates) and UX; some logic can be built without Melio APIs (planning surface). Agent that *proposes* a plan is the differentiator. | Strong agent fit: “AI proposal” of what to pay and when is the value. Without agent = just a dashboard; with agent = proactive plan for review. |
| 2 | Late bill entry undermines cash flow forecasting | 5 | 3 | 4 | 25% created after paid; ~half paid ~1 week late. Distorts forecasting and planning. Core to “laborious → autonomous” and adoption story. | Entry automation (OCR, matching, learn preferences) is buildable; ties to zero bill entry. Melio doesn’t block entry. | Agent can learn defaults, match suppliers, suggest coding; but “fix” is also better UX and system that learns. High AI benefit for learning, medium for pure automation. |
| 3 | Time and cognitive load for high-volume bill processors | 4 | 4 | 5 | 11–100 bills/month for 15%; real time and cognitive load. Direct efficiency and capacity story. | Bulk operations, defaults, and “system learns” are largely in our control. Approval chasing and planning help. | Agent excels: reduce load by proposing batches, auto-coding, chasing approvers, suggesting payment timing. Clear agent opportunity. |
| 4 | Late payments and due-date miss | 4 | 3 | 4 | Half of bills paid late, ~1 week after due; risk, supplier friction, missed discounts. Widely cited. | Scheduling and reminders need data + notifications; payment execution touches Melio. Planning and nudges are feasible. | Agent can suggest “pay by X” and chase; also “just fix” with better due-date visibility and reminders. Agent adds proactive nudging. |
| 5 | Cash flow uncertainty and “caught short” | 5 | 3 | 4 | 44% “caught short”; 35% say top challenge is having enough to pay bills. Core SMB pain. | Needs cash position and simple guardrails; data and UX, not Melio-dependent for visibility. | Agent can surface “pay this vs that” and buffer impact; also fix with clear cash position and guardrails. AI helps prioritization. |
| 6 | No clear cash position or simple guardrail before payment | 4 | 4 | 3 | Users don’t see current/projected cash, major outflows, or impact of a payment run. No “paying this leaves $X buffer.” | Largely product + data: balance, projections, one guardrail view. No agent required for v1. | “Just fix” first: show position and a simple check. Agent later for “should you pay this now?” recommendations. |
| 7 | Manual, repetitive configuration (system doesn’t learn) | 4 | 4 | 5 | VOC: “Customers expect the system to learn and automate against their preferences.” Repeated entry of accounts, contacts, terms. | We control product and data; learning defaults and applying them is buildable. | Strong agent fit: “learn and automate against preferences” is agentic by definition. Natural language rules (e.g. “all Amazon → 310-COGS”) are AI. |
| 8 | Chasing approvers / approval bottlenecks | 4 | 4 | 5 | Chasing managers; overdue approvals; no smart reminders or escalation. ~120k orgs view “awaiting approval” monthly. | Notifications, escalation rules, and in-product chase are in our scope. Payroll-chasing pattern exists. | Agent is the natural fit: proactive reminders, escalation, “who to chase,” in-context nudge. High agent alignment. |
| 9 | Fragmented / single-step approval | 4 | 2 | 3 | No multi-step, conditions, or rules; approval before payment details. “Two signatories,” Ramp envy. | Baseline gap: needs event streaming, rules DB, Melio integration for multi-step execution. Hard in short term. | Fix is “build the workflow” first; AI can then route and suggest. So feasibility blocks; AI benefit comes after baseline. |
| 10 | Fraud and error risk with no risk signal layer in approval | 5 | 3 | 5 | Real losses ($500k example); unusual amounts, duplicates, overpayment; no anomaly detection. Bills = where most fraud can happen. | Anomaly detection and signals are buildable; surfacing in approval flow needs approval UX. Option C (Confluence) = AI-powered approval automation. | Agent excels: “risk signal layer” = AI/ML for anomaly, duplicate, vendor change. Human approver + AI context. Strong agent fit. |
| 11 | Post-payment mess (reconciliation, verification) | 4 | 4 | 3 | Reconciliation “currently broken”; remittance advice and payment verification missing or weak. Clean-up painful. | We own reconciliation and verification flows; product and integrations. Not primarily an agent problem. | “Just fix” reconciliation and verification first; agent could chase missing remittance or match payments later. |
| 12 | Low bill pay adoption (effort > value) | 5 | 2 | 3 | Only 10% create bills; 1% use bill payments. Strategic adoption gap. | Fixing adoption touches journey, GTM, and value prop; Melio and baseline gaps make narrow PoC hard to tie to adoption. | AI can reduce effort (entry, approval, planning) and thus improve value; but “fix” is broad product/GTM. Agent supports, doesn’t own adoption. |
| 13 | No visibility into when/how bills will be paid | 3 | 4 | 4 | Users want clear “when and how” and chance to intervene. “Set and forget” without losing control. | Visibility and control are product; scheduling and status can be improved without Melio APIs for planning. | Agent can “tell you the plan” and “let you intervene”; combines visibility with proactive communication. |
| 14 | Bulk operations and repetitive edits | 3 | 4 | 4 | No bulk approve or bulk edit; lots of bill-by-bill work. | Straightforward product: bulk actions, multi-select, batch apply. | Agent can suggest batches and apply in one go; also “just fix” with bulk UI. Agent adds intelligence to *what* to batch. |
| 15 | Melio / US flow constraints (feasibility ceiling) | 4 | 1 | 2 | Embedded, disconnected experience; no APIs for agentic “paying bills.” Limits US automation. | Constraint, not something we “solve” in PoC. Design within it; API-free ideas vs future. | Without APIs, agent can’t “pay” in Melio flow; agent fits planning, approval, chasing—not execution in US. |
| 16 | Early-pay discount value invisible | 3 | 4 | 4 | No discount value, annualized return, or “early pay ROI” lens. | Calculation and display are product + data. | Agent can “suggest take this discount” and explain ROI; combines visibility with recommendation. |
| 17 | Payment rail / PSP choice opaque | 3 | 3 | 3 | Users don’t know cheapest vs fastest vs best for float; no optimization or PSP routing. | Routing and optimization depend on PSP/Melio capabilities and data. Partly out of our hands. | Could be “just fix” (explain options) or agent (recommend rail). Medium either way. |
| 18 | No cash scenario or stress testing | 3 | 3 | 4 | Can’t ask “what if I delay top 5 / AR slips / FX moves?” | Scenario modeling needs data and product; no Melio dependency. | Agent can run scenarios and summarize “if you delay these, here’s the impact.” Good agent use case. |
| 19 | Guardrailed auto-approval missing | 4 | 3 | 5 | Auto-approval is all-or-nothing. No “auto-approve when low risk” with clear audit. | Needs rules engine, risk signals, and approval baseline. Feasibility tied to #9 and #10. | Agent is the natural owner: “when low risk (trusted vendor, in range, no anomaly, buffer OK)” = agent + rules. |
| 20 | Obligation detection / no “financial memory” | 4 | 3 | 5 | Invoices/obligations not detected from email, bank, subscriptions, SMS/photo. Things get missed or entered late. | Requires ingestion, matching, and “memory”; significant build. | Strong agent fit: “financial memory” and proactive detection are agentic. High AI benefit. |

---

## Summary by total (Sev + Feas + AI)

| Rank | # | Area of opportunity | Sev | Feas | AI | Total |
|------|---|----------------------|-----|------|-----|-------|
| 1 | 8 | Chasing approvers / approval bottlenecks | 4 | 4 | 5 | 13 |
| 1 | 7 | Manual, repetitive configuration (system doesn’t learn) | 4 | 4 | 5 | 13 |
| 1 | 3 | Time and cognitive load for high-volume bill processors | 4 | 4 | 5 | 13 |
| 4 | 1 | No cash-aware payment planning or prioritization | 4 | 3 | 5 | 12 |
| 4 | 10 | Fraud and error risk with no risk signal layer | 5 | 3 | 5 | 13* (high severity) |
| 4 | 19 | Guardrailed auto-approval missing | 4 | 3 | 5 | 12 |
| 4 | 20 | Obligation detection / no “financial memory” | 4 | 3 | 5 | 12 |
| 8 | 2 | Late bill entry undermines cash flow forecasting | 5 | 3 | 4 | 12 |
| 8 | 4 | Late payments and due-date miss | 4 | 3 | 4 | 11 |
| 8 | 5 | Cash flow uncertainty and “caught short” | 5 | 3 | 4 | 12 |
| 11 | 13 | No visibility into when/how bills will be paid | 3 | 4 | 4 | 11 |
| 11 | 14 | Bulk operations and repetitive edits | 3 | 4 | 4 | 11 |
| 11 | 16 | Early-pay discount value invisible | 3 | 4 | 4 | 11 |
| 14 | 6 | No clear cash position or simple guardrail | 4 | 4 | 3 | 11 |
| 14 | 18 | No cash scenario or stress testing | 3 | 3 | 4 | 10 |
| 16 | 9 | Fragmented / single-step approval | 4 | 2 | 3 | 9 |
| 16 | 11 | Post-payment mess (reconciliation, verification) | 4 | 4 | 3 | 11 |
| 16 | 17 | Payment rail / PSP choice opaque | 3 | 3 | 3 | 9 |
| 19 | 12 | Low bill pay adoption (effort > value) | 5 | 2 | 3 | 10 |
| 20 | 15 | Melio / US flow constraints | 4 | 1 | 2 | 7 |

---

## Chong & Lili focus: top agent-aligned, feasible items

**Highest Sev + Feas + AI (agent vs just fix):**
- **Chasing approvers (#8)** — Severity 4, Feasibility 4, AI 5. Clear agent fit; we can do reminders, escalation, in-product chase.
- **Manual, repetitive configuration (#7)** — Severity 4, Feasibility 4, AI 5. “System learns” = agent; natural language rules and defaults.
- **Time and cognitive load (#3)** — Severity 4, Feasibility 4, AI 5. Agent reduces load via batching, proposals, chasing.

**High severity but harder or more “fix first”:**
- **Fraud and error risk (#10)** — Severity 5, AI 5, but Feasibility 3 (needs risk layer + approval UX).
- **Low bill pay adoption (#12)** — Severity 5, but Feasibility 2, AI 3; broad GTM/journey fix.
- **Melio / US flow (#15)** — Feasibility 1; constraint to design within, not solve in PoC.

Use this table in the room to debate scores and pick the **one opportunity** to tackle (likely one of #3, #7, #8 for agent + feasibility, or #10 if the room wants to lean into fraud/risk).
