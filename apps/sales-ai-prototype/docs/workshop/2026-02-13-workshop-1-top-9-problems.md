# Top 9 problems to work from (Workshop 1)

**Purpose:** One list to rank and narrow in Friday’s workshop. **Source:** Synthesized from existing research (Opportunity 2, Confluence Approval Workflow, Miros, Pratik’s phases, standup).  
**Note:** Chong was to provide detailed problem documentation (8–9 problems) for Friday — if that lands, use hers as the canonical list and tag/merge with this. This doc is the **fallback / pre-read** so the room can work from a shared set even before Chong’s doc.

---

## The 9 problem areas

| # | Problem | One-line | Where it comes from |
|---|---------|----------|----------------------|
| **1** | **Cash flow & scheduling friction** | Users struggle to set and manage payment runs from terms/due dates; ~25% of bills created *after* paid → broken cash flow forecasting. | Opportunity 2, strategic context |
| **2** | **Manual, repetitive configuration** | System doesn’t learn; users manually set details over and over instead of automation against preferences. | Opportunity 2 |
| **3** | **Low bill pay adoption** | ~90% of users don’t use bill pay; effort exceeds perceived value; only 1% use bill payments. | Standup, strategic context |
| **4** | **Fragmented / single-step approval** | No multi-step, no conditions or workflow rules; approval before payment details set; “two signatories,” “Create Payment off-screen,” Ramp envy. | Confluence Approval Workflow |
| **5** | **Chasing approvers / overdue approvals** | Chasing managers for approvals; overdue payments; manual repetitive chasing; no smart reminders or escalation. | Payer-chasing / Payroll-chasing Miros |
| **6** | **No smart payment planning (pay planner gap)** | Awaiting payment tab → click each bill; no pre-built plan from due dates, critical suppliers, cash flow, or user goals (pay all vs buffer). | Standup pay planner concept |
| **7** | **Fraud and error risk (protection)** | $500k loss from fraudulent bank account change; unusual amounts; duplicate bills; overpayment; no anomaly detection or proactive alerts. | Pratik Protection phase, Confluence Option C |
| **8** | **Post-payment mess (reconciliation, verification)** | Remittance advice to suppliers; reconciliation “currently broken”; payment success verification missing. | Pratik Post-payment phase |
| **9** | **Melio / US flow constraints** | Embedded, disconnected payment experience; no APIs for agentic “paying bills”; challenges for agentic capabilities in Melio flow. | Confluence, Tauqir, Angus |

---

## Scores against Chong's four metrics (1–5, discussion starter)

**Scale:** 1 = low (white) → 5 = high (red). Opinion only — use to spark debate and replace with room consensus.

<table>
<thead>
<tr>
<th>Rank</th>
<th>#</th>
<th>Problem</th>
<th>Severity</th>
<th>AI alignment</th>
<th>Feasibility</th>
<th>Agent alignment</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>5</td>
<td>Chasing approvers / overdue approvals</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#c62828;color:#fff">5</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#c62828;color:#fff">5</td>
<td style="background-color:#c62828;color:#fff">18</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>Manual, repetitive configuration</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#c62828;color:#fff">5</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#e57373;color:#000">17</td>
</tr>
<tr>
<td>3</td>
<td>6</td>
<td>No smart payment planning</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#c62828;color:#fff">5</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">16</td>
</tr>
<tr>
<td>3</td>
<td>7</td>
<td>Fraud and error risk</td>
<td style="background-color:#c62828;color:#fff">5</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">16</td>
</tr>
<tr>
<td>5</td>
<td>1</td>
<td>Cash flow & scheduling friction</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#e57373;color:#000">15</td>
</tr>
<tr>
<td>6</td>
<td>8</td>
<td>Post-payment mess</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#ffcdd2;color:#000">14</td>
</tr>
<tr>
<td>7</td>
<td>3</td>
<td>Low bill pay adoption</td>
<td style="background-color:#c62828;color:#fff">5</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#ffcdd2;color:#000">2</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#ffcdd2;color:#000">13</td>
</tr>
<tr>
<td>8</td>
<td>4</td>
<td>Fragmented / single-step approval</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#ffcdd2;color:#000">2</td>
<td style="background-color:#ef9a9a;color:#000">3</td>
<td style="background-color:#ffcdd2;color:#000">12</td>
</tr>
<tr>
<td>9</td>
<td>9</td>
<td>Melio / US flow constraints</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ffcdd2;color:#000">2</td>
<td style="background-color:#ffffff;color:#000;border:1px solid #eee">1</td>
<td style="background-color:#e57373;color:#000">4</td>
<td style="background-color:#ffffff;color:#000;border:1px solid #eee">11</td>
</tr>
</tbody>
</table>

**Color scale:** 1 = `#ffffff` (white) → 2 = `#ffcdd2` → 3 = `#ef9a9a` → 4 = `#e57373` → 5 = `#c62828` (red). Total column uses the same scale (11→white, 18→red).

**Rough take:** #5 (chasing) and #2 (manual config) score high on AI + feasibility + agent fit. #3 (adoption) and #7 (fraud) are highest severity but feasibility or agent fit are lower. #9 is the feasibility ceiling (Melio), not something we "solve" in the same way — it's the constraint to design within.

---

## How to use in the workshop

1. **Walk in with these 9** (or Chong’s 8–9 if she’s sent them). Add any critical missing one from the room (short “what are we missing?”).
2. **Rank/narrow** using the four criteria: severity, AI alignment, feasibility, agent alignment.
3. **Tag each** (or the shortlist): **Today** vs **Once we have approval flow**; optionally **Needs Melio APIs**.
4. **Leave with** one (or two) opportunity we’re solving — might not be highest severity if it’s strong on AI + feasible + agent-aligned.

---

## Cross-references

- **Problem filter (4 criteria):** [2026-02-12-standup-and-workshop-planning.md](../meeting-notes/2026-02-12-standup-and-workshop-planning.md) §4  
- **Prep (VOC, competitive, agent capabilities):** [2026-02-12-workshop-1-prep-compiled.md](2026-02-12-workshop-1-prep-compiled.md)  
- **Pratik’s phases (Creation / Protection / Post-payment):** [2026-02-12-pratik-context-and-next-steps.md](../meeting-notes/2026-02-12-pratik-context-and-next-steps.md) §2  
- **Feasibility caveats:** Tauqir (Melio “paying bills”), Angus (APIs) — [2026-02-13-slack-channel-schedule-and-prework.md](../meeting-notes/2026-02-13-slack-channel-schedule-and-prework.md), [2026-02-10-strategic-context.md](../strategy/2026-02-10-strategic-context.md)
