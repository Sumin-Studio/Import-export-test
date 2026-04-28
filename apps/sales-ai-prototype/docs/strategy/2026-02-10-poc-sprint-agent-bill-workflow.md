# POC Sprint: Agent for Bill Workflow Automation

**Source:** [POC Sprint Doc](https://docs.google.com/document/d/18ZY3rkW63k442phwSGaYmCCbPwd3nk5OwX_jP9z2vKI/edit)  
**Region:** US market (Melio / bill approval workflow momentum). Agentic features are region-agnostic.

## Goal

Run a 2-week sprint to rapidly explore and iterate an **agentic** prototype for bill workflow automation, with a tight timeline to operationalize in the next few months to meet Xerocon.

## Scope

- **User persona:** SMB and ABs — ease of tools, reduced toil, cash flow efficiency, profitability. See also: Business Segments (for payments).
- **User journey (this sprint):** *After* bill approval → payments onboarding, prepping bills, approving payments.
- **Handoff:** Pratik Rathod’s team owns bill creation and approval. Post-sprint, knowledge exchange and integration will align agents for the full end-to-end bill journey.

## Principles

1. **Solve a real customer problem** — Save time, prevent errors, optimize cash flow. Customer value drives adoption and revenue.
2. **AI power on existing roadmap** — Use AI to make roadmap outcomes simpler and more automated (e.g. “Do it for me / Catch it if I fall” vs “Do it myself”).
3. **Agentic vs automation** — Self-driving (agentic): dynamic, adaptable, “what if” and script-creating. Cruise control (traditional): rigid, rule-based, “what is.”

### Baseline first, then AI (Angus & Chong)

- **No baseline approvals workflow exists today.** Many pain points could be fixed by shipping a simple deterministic model first (dual-approval, auto-pay under $X).
- **AI should solve existing problems**, not hypothetical ones. Without the foundation, we can't clearly define which problems AI solves.
- **Baseline is understood** (functionality); this workshop is about what to build *on top* where AI is highly impactful.
- **Be intentional** about the gap: today vs. near future. Avoid "cart before the horse" — name it when we're designing for a baseline that isn't live yet.

## Mini-Workshop Plan (Feb 9–17)

| # | Focus | Date (PST) | PoC / Lead |
|---|--------|------------|------------|
| 1 | **User problem** | Feb 10 | Design – pain points, competitive bill approval, JTBD, QBO approval, agent dashboard, proposal, segments |
| 2 | **Agent opportunity** | Feb 11 | Neeraj Sahu, Jenny Nedanovski – agentic opportunities, features, user journeys |
| 3 | **Agent prototyping** | Feb 12 | Tauqir Ahmed – job/workflow/logic per agent, Miro |
| 4 | **Coding and finalization** | Feb 16 | Tauqir Ahmed – prototype demo, building blocks, API, customer validation |
| 5 | **Buffer** | Feb 17 | Tauqir Ahmed – same as #4 |

**Core attendees:** Chong Xu, Neeraj Sahu, Jenny Nedanovski (PM); Lili Kan, Kate Givoni, Tauqir Ahmed (ENG); David Brown, Angus Tait (DES); Katrina McComb (PMM).  
**Slack:** `temp-poc-sprint-agent-for-bill-workflow-automation`

### Scope & delivery expectations (from team chats, Feb 2026)

**Melio baseline metrics (Jenny, Chong)**  
- Ask Melio for baseline metrics — the experience lives in the Melio flow. Having this would let us show agent impact. Chong: if they have available data, that would be great.

**Sprint scope clarity (Chong)**  
- AI opportunities in Xero depend on underlying APIs; Melio don’t have the APIs we’d need. Need clarity on intended scope: If this is part of this year’s roadmap, is the task to **generate ideas that don’t rely on APIs**? Or to **come up with concepts we could deliver in the future**?

**Melio in workshops? (Jenny, Chong)**  
- Chong: Hours are very challenging across 3–4 timezones; prefer to keep it more manageable among us first (no Melio in workshops for now).

**UAT vs prototype (ENG → Kate/Chong, Kate)**  
- To get this live in UAT would need changes in Bills UI, Bills BFF, and likely other backend services (all behind flags) — a lot for a 2‑week sprint.  
- **Kate:** Go as light as possible to prove the concept. Work on local / other test env to start; then assess if there’s a need to get to UAT.  
- **Implied outcome:** Sandboxed prototype with mostly mocked data is sufficient for this sprint; UAT-deployed experience is a later decision.

## Prep for Workshop #1 (User problem)

- [Design] Top bill workflow pain points + competitive bill approval features
- [Product] Bill agents in market and key capabilities
- [Design/Product] How agentic UI can look (e.g. how agents are triggered)
- Define swimlanes: journey, personas (entry point, workflow action, AB/SB, new vs repeating), aligned to current approval workflow proposal

**Compiled prep (pulled from Glean + QuickBooks + project):** [docs/workshop-1-prep-compiled.md](workshop-1-prep-compiled.md) — pain points, competitive (QB, Ramp, Dext, ApprovalMax, etc.), QBO approval/payment release workflows, agent capabilities, agentic UI trigger ideas. Sheet not in index; Miro links need browser.

## Agent Ideas (from sprint doc)

- **Policy agent** — Auto-enforce spending policies, low-risk auto-approve, escalate risky, “Can I expense this?” style policy Q&A
- **Card payments agent** — Identify card-eligible bills, auto-enter into vendor payment portals
- **Personalised automation agents**
- **Payments approval release agent**
- **Approval chasing** (e.g. chasing agent patterns)

---

## Naming alignment: “Bill Automation Agent” vs “Opportunity 2”

**Jenny’s question to Chong (Feb 2026):**  
*“Just wanting to make sure I understand correctly here — this is the ‘Bill Automation Agent’ right? Opportunity 2.”*

- **Link Chong’s doc (Opportunity 2):** [AI Opportunities in Payments – Opportunity 2](https://docs.google.com/document/d/1SShVmYd2ZMcvP7lp71eDcfjcmmHc7KtS_mNLBblOOvw/edit?tab=t.0#heading=h.z7h45yi0n5bp)

**For this repo:** We use **“Bill Automation Agent”** as the umbrella for the vision (make every bill “ready to pay” on creation; see CLAUDE.md and strategic-context). The POC sprint above is the **agent-for-bill-workflow** sprint (post-approval journey, US/Melio). Confirmation that this POC = “Bill Automation Agent” = **Opportunity 2** in Chong’s AI Opportunities doc is for Chong to confirm with Jenny.

*Once confirmed, this section can be updated to state the alignment explicitly.*

---

## Unverified recommendation: Research directory analysis (Feb 2026)

**Status:** Unverified — for consideration / noodling. Based on goal, scope, principles, and identified pain points from the research directory.

**Recommendation:** Focus the prototyping sprint on **two** core agentic features that solve high-value problems in the post-approval journey.

### 1. Recommended agentic focus

| Agent focus | Pain point addressed | Agentic approach (self-driving) |
|-------------|----------------------|----------------------------------|
| **Intelligent Approval & Release Agent** | Approval workflows and visibility (chasing managers, lack of visibility). Manual configuration (repetitive, low-risk approvals). | Not just deterministic rules. Uses reasoning to: (1) **Proactively chase approvers** (approval chasing idea); (2) **Auto-apply pre-defined policies** to auto-approve low-risk bills (policy agent idea). Reduces manual toil, accelerates process. |
| **Smart Payment Scheduling Agent** | Cash flow & scheduling friction: customers struggle to set optimal payment runs; inaccurate forecasting. | Beyond fixed payment terms. Uses predictive insights to: (1) **Recommend optimal payment dates/methods** (supplier terms, customer cash flow, due date); (2) **Automatically schedule the payment run** with minimal user review. |

### 2. Suggested mini-workshop agenda (Workshop #1 prep)

**Prep 1 – Bill workflow pain points**  
Synthesize competitive features around:
- Conditional auto-approval
- Approval-chasing / escalation
- Smart payment scheduling / forecasting  

*Scope:* Process **after** bill data is entered, up until payment execution.

**Prep 3 – Agentic UI ideas**  
Research how agentic UIs are triggered in context of:
- **In-context recommendation:** e.g. “This $100 bill from Supplier X can be auto-approved based on policy.”
- **Proactive action:** e.g. “Approver Jon is late; I have sent a reminder SMS.”
- **Custom rule creation:** e.g. user says “Set a rule that all bills under $50 from a returning supplier are auto-approved.”

### Rationale (from analysis)

By focusing on these two agent themes, the sprint directly tackles the most frustrating, time-consuming parts of the bills journey for SMBs, moving Xero toward the “self-driving car” experience.
