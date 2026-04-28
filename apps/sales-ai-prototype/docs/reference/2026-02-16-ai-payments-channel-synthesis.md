# AI Payments Coordination Channel Synthesis

**Channel:** `#ai-payments-coordination` ([C095W2MT96W](https://xero.enterprise.slack.com/archives/C095W2MT96W))
**Owner:** Peter O'Malley
**Strategy Doc POC:** Chong Xu
**Created:** July 2025, resurrected Jan 27, 2026

## The "Zero Frictions" Strategy

**Vision doc:** [AI Opportunities in Payments: Xero Pay for "Zero" Frictions](https://docs.google.com/document/d/1SShVmYd2ZMcvP7lp71eDcfjcmmHc7KtS_mNLBblOOvw) (Chong Xu, last updated Feb 5, 2026)

### Vision
Elevate Xero from traditional ledger system to proactive cash flow engine.
- **Near term:** Reduce frictions to "zero" — alleviate operational pressure and manual data collection
- **Long term:** "Zero" click execution with trusted autonomous capability — predict, plan, optimize cash flow

### Principles
1. Solve a real customer problem (not automation for its own sake)
2. Approach existing roadmap with AI Power ("Do it for me / Catch it if I fall" instead of "Do it myself")
3. Adopt developer-friendly advanced technology (Reasoning, Memory, Generative UI)

---

## Three Opportunities

### Opportunity 1: The Collection Agent (Get Paid)

**PM:** Prashant Ranchhod | **Eng:** Kenny Jang | **Design:** Darryl Powell (former) + TBC

**Status:** Most mature of the three workstreams.

**Vision:** Autonomous receivables assistant that understands every nuance of AR — payers, habits, relationships, options. Surfaces intelligent, context-aware recommendations and executes follow-up on your behalf.

**AI Capabilities:** Autonomous Reasoning & Planning — combines data points to generate recommendations on how to chase a payer, create content, optimize timing for customer approval.

**FY27 Deliverable:** Payer Chasing Agent (JAX) — proactive, optimizes tone/channel/timing to get invoices paid on time.

**Current State (Jan 28):**
- Shared scheduling system design approved
- Pals + Chicken Little collaborating on API/DB strategy
- PRDs in draft: [frontend](https://xero.atlassian.net/wiki/x/yAALOD8) and [planner/orchestrator](https://xero.atlassian.net/wiki/x/ZgD6JT8)
- Review in 2-3 weeks

**Success Metric:** X% reduction in average Time-to-Pay for overdue invoices

**Working boards:**
- [Payer chasing agent working board (Darryl)](https://miro.com/app/board/uXjVGdaJYwI=)
- [JAX Payments payer-chasing (Andrew Crosby)](https://miro.com/app/board/uXjVJHbDCmo=)

---

### Opportunity 2: The Bill Automation Agent (Pay Bills) -- THIS IS OUR SPRINT

**PM:** Pratik Rathod + Jenny Nedanovski | **Eng:** Lili Kan, Kate Givoni, Tauqir Ahmed, Jiten Taluja | **Design:** David Brown, Angus Tait, Jon Bell

**Goal:** Make every bill "ready to pay" on creation, regardless of channel (web, mobile, Email-to-Bills, Files, JAX).

**AI Capabilities:**
- Natural Language Rule Creation — "All bills from Amazon should have 310-Cost Of Goods Sold applied"
- Agentic Reasoning + ML Prediction — use supplier purchase defaults, extended OCR, predictive insights

**Three Phases:**

| Phase | Priority | Region | Timeline | Scope |
|-------|----------|--------|----------|-------|
| Zero Bill Entry | P0 | Global | Xerocon (June) | Bill enrichment of account code, tracking category, currency, due date via supplier purchase rules across all channels |
| Zero Bill Approval | P0 | Global | H2 FY27 | Rules for bill approval + planned dates, automated approval pipeline, UX for how data was entered/approved |
| Zero Bill Payment Scheduling | P1 | US, UK | TBD | Auto-schedule bills for payment, manage by exception, automated remittance + reconciliation |

**Current State (Jan 28 + Feb 13):**
- Supplier rules for on-platform bills are live (resolves 2 product ideas)
- Detailing Files API support (Data In team)
- PRD being fleshed out for "Automation Agent" logic and UX
- Andrew confirmed: "automation agent" = "Zero Bill Approval"

**VOC (resolves):**
- Bills: Apply contact defaults when automating bill creation
- Email to Bills: Apply rules to line items
- Bills: Bulk approve and bulk edit accounts on draft bills
- Auto-planned dates for payment runs
- Net30/60 support requests
- Allow payments to be scheduled

**Success Metrics:**
- % of bills created automatically on platform (27% baseline)
- % of bills scheduled for bill payment

**Working board:** [FY27 Bills Planning - AI + Integrated Payments (Pratik)](https://miro.com/app/board/uXjVGC6Xteo=)

---

### Opportunity 3: The "Fast Pass" Onboarding

**PM:** Jenny Nedanovski

**Vision:** Single, simple, contextual onboarding experience — personalized, flexible, automates data collection and real-time verification.

**Pain:** 63 form fields, 36 screens, 3 user flows, 4 tabs just to turn payments on.

**AI Capabilities:**
- Zero Entry Data Crawling — LLMs parse public registries (IRS, Secretary of State) + Xero org data to pre-fill ~100% of KYC/KYB
- Generative UI — personalized, ubiquitous UI reducing screens/flows/tabs
- Intelligent Vision & Risk Modeling — real-time feedback on document uploads, risk modeling

**Current State (Jan 28):**
- Foundation build kicked off for AU Pay Out launch (beta May, GA August)
- LLMs extracting data from public registries (ABR) and existing Xero org info
- Contextual UI with dynamic UBO-driven flows
- Next: KYB/C risk modeling with Sardine

**Success Metrics:** X% reduction in document rejection rate, Y days decrease in time-to-approval, Z days decrease in onboarding time. Improves payments attach rate.

---

## Below the Line (P1/P2)

| Category | Feature | Priority | Description |
|----------|---------|----------|-------------|
| Proactive Insights | Smart Awareness | P1 | Anomaly detection: bill duplicates, likely failures, cash-flow-aware payment suggestions |
| Cash Flow | Cashflow Agent (AP/AR) | P1 | Customize scheduling + payment methods to meet customer's cash flow goal |
| Pay Bills | Negotiation Agent | P2 | Facilitate/automate negotiation processes related to payments |
| JAX Chat | Bills/Invoices Answers | P1 | Enable JAX to answer more bills/invoices questions (~25% of negative sentiment) |
| Get Paid | Invoice Creation | P? | Invoice creation based on historical context and pattern |
| Get Paid | V2 Collections Agent | P2 | Optimize payment method and request type |
| Get Paid | V3 Collections Agent | P2 | Suggest early payment discounts / late fees |

---

## Critical Constraint: LLM Extraction Gap

**From Pratik Rathod (Feb 13, 2026):**

> "New LLM extractions (account code and line items) are currently planned exclusively for the Files workflow. Bills: Using existing deterministic rules (contact defaults). Bills: Using a legacy account code prediction. When the new LLM extractions become accessible for all domains, we'll leverage it."

**Translation:** The AI extraction layer isn't available to Bills yet — only Files. Bills are running on legacy deterministic rules + old ML prediction model. Our swimlanes need to account for this constraint. The agentic layer we're designing sits on top of what's available today, not on top of the future LLM pipeline.

---

## Channel Timeline

| Date | Who | What |
|------|-----|------|
| Jul 15, 2025 | Peter O'Malley | Created channel — exploring AI use cases for FY26 Xerocon |
| Jul 15, 2025 | Andrew Goodman | Pulling together AI use case list, payment agent concept |
| Jul 15, 2025 | Areti Connell | Shared sales conversation playbook deck |
| Jan 27, 2026 | Peter O'Malley | Resurrected channel for FY26 AI alignment. Asked for status paragraphs from each workstream |
| Jan 28, 2026 | Kenny Jang | Collection Agent status: scheduling system approved, PRDs in draft |
| Jan 28, 2026 | Pratik Rathod | Bill Automation: supplier rules live, PRD in progress, Xerocon Phase 1 |
| Jan 28, 2026 | Jenny Nedanovski | Fast Pass Onboarding: AU Pay Out foundation, beta May, GA August |
| Jan 28, 2026 | Andrew Goodman | Confirmed "automation agent" = "Zero Bill Approval" |
| Feb 13, 2026 | Pratik Rathod | Clarified LLM extraction gap — Files only, Bills on legacy rules |
