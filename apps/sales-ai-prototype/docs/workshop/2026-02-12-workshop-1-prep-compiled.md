# Workshop 1 (User Problem) — Compiled Prep

**Purpose:** Pre-read and prep for Bill Pay Agent PoC Workshop 1. Content pulled from internal docs (Glean), QuickBooks (public), and project docs. Use for Prep 1 (Design), Prep 2 (Product), Prep 3 (Design/Product).

**What was pulled:** AI Opportunities in Payments (Opportunity 2), Business Model Segments deck, QuickBooks bill approval/payment release workflows, Confluence Approval Workflow competitive landscape.  
**Miros:** Summarized below from shared boards. Screenshots saved under `assets/` (image-*.png).  
**Still open in browser:** [Brett’s Agent board](https://miro.com/app/board/uXjVGNBGq7k=/?moveToWidget=3458764656238274241&cot=14) | [Share link](https://miro.com/app/board/uXjVKxF6cn4=/?share_link_id=890261347127). Google Sheet not in index.

---

## Miro boards summary (from shared boards)

### 1. Agent Dashboard

- **Model:** Global entry point (navigation) → **Agent Job Dashboard** (global view of all agentic jobs: Upcoming, In Progress, Blocked, Paused, Completed) ↔ Create New Job → Define Job → Job Created. Jobs then surface on **Product Surfaces:** Payment Chasing, Payroll, **Pay Bills**, Doc & Info Chasing.
- **Open question (red sticky):** What is the shared vocabulary/taxonomy of agentic work? Tasks, Jobs, Workflows, Plans.
- **UI concept:** Header with “Filter Jobs” and “Create New”; columns by status (Upcoming, In Progress, Blocked, Paused, Complete); **Detailed Job View** (Job Overview, when created, who created/approved, timing & sequencing, custom configuration, dependencies; modify or cancel). “Abacus?” linked to Create New (rules engine / job creation).
- **Use for Workshop 1:** Central place for “where do bill agent jobs live?” and how Pay Bills fits alongside Payment Chasing and other surfaces. Tag pain points that map to Blocked / need approval.

### 2. Payer-chasing agent (bill/payment focus)

- **Pain points called out:** Chasing managers for approvals; chasing overdue payments; manual and repetitive payment tasks; inaccurate cash flow forecasting.
- **Agent actions (TDD):** Auto-approval, Payment-chasing, Auto-scheduler, Risk-based payment timing, Approval/release workflows, Escalations. Also: In-situ feedback, Proactive reminders, In-product chase note, Webhooks, Emails, SMS.
- **Ideas (Jon):** Proactive reminder to send email/SMS; suggest new payment plan; suggest bulk/partial payment; suggest hold payments.
- **Key questions:** What are the triggers/flows for Bill Pay chasing? What data/insights for a proactive payment reminder agent? Flow for modifying a launched agent? What if payment is received while agent is still chasing? Best way to notify? Relevant metrics? Errors/exceptions the agent would handle?
- **User flow (high level):** Entry/Discovery → Setup (admin reviews/sets up agent, preferences, contacts to chase, selection basis, activates chasing) → Flow execution (creates contact, sends reminder/message, escalating) → If payment received (menu profiles, pay via card/bank, pause plan, etc.) → Plan completion (updates plan, review bank, removes bill, pauses plan). Separate thread: Plan changed by user (view/update invoice, edit/delete plan).
- **Target audience:** (1) General SMBs & service-SMEs — operational overhead of bill paying, forecast cashflow, spend control and approval processes, supplier relationships, multi-payment plans. (2) Freelancers/Suppliers — automated payment reminders/chasing, multi-payment reminders, reconciliation confidence, segmentation by customer reliability.
- **Key pages (UI):** In-context setup (dashboard, “Agent settings” modal with toggles/dropdowns); Escalations (“Rules to follow for chasing”; “What info is needed to create a rule?”); Audit history (Date, Action, Status); Payment request (e.g. “Pay now”); Online invoice view.
- **Use for Workshop 1:** Direct input to Prep 1 (pain points), Prep 2 (capabilities), Prep 3 (triggering, in-context setup, proactive reminders, rules).

### 3. AB Information chasing agent

- **Purpose:** Extends AB client work by building and executing communication plans for missing information/documents (bookkeeping, tax, advisory).
- **Core objects:** Client, Contact, Request/Question, Missing document/information, Communication, Activity/Tasks, Agent rule, Rule/policy, Event, User action, Workflow, Integration, Document.
- **User flow:** Initial setup → Create and execute communication plan (identify issues, batch missing, draft comms, schedule, send) → Client response (receives comms, uploads/replies) → Plan completion or escalate to AB.
- **Key pages:** Client trigger / team client readmes (agent status per client, “View plan”, “Agent config”); Agent tasks (Pending approval, Completed, Scheduled); Agent config (name, description, status, rules); Comms plan and steps (e.g. Welcome email, Follow-up, Call); Client comms and reply (chat-like thread); Client uploading documents (e.g. Xero Files); mobile integration.
- **Use for Workshop 1:** Pattern for “chasing” and configurable rules; relevance to bill workflow when AB is chasing for approvals or missing bill info.

### 4. Pay run orchestration

- **Core objects:** Employer, People, Employment, Settlement, Leave, Payrun, Payments, Government filings.
- **Flow stages:** Set up/config (Create/Edit Pay Schedule, “Agent”, turn on/adjust Leave, Timesheet, Post pay run, Government filings, Pension, Payments, Pay slips → Save pay schedule) → Before pay run posted (Leave request, Timesheet → Notify user or Auto-approve; Anomaly found) → Review (X days ahead; Email user, Notify, Review pay run, Auto-post or Post) → Pay run posted (Notify, Government/Pension/Payments/Pay slips → Re-issue or No issue → Success / submitted/sent → FINISH).
- **Key pages:** Pay schedule screen; **Action required email** (“You have a Bill for X to approve” — View details, Approve); Manual review required; Upcoming payroll email; Review pay run; Payroll posted email.
- **Use for Workshop 1:** Parallel to bill approval/release (approval notifications, review, auto-post vs manual). Agent in config and in review/post stages.

### 5. Payroll-chasing agent

- **User stories (pain points):** Inconsistent approvers (don’t blindly chase); employee needs simple nudge (e.g. SMS, reply YES to verify); manager needs to be told about outstanding timesheets; manager needs reminder for outstanding approvals and workflow to proceed after approval; **auto-approve low-risk**, payroll manager supervises and stops/takes over if risk; agent flags repeat missed approvals so less time chasing.
- **Agent job dashboard:** Global view — All, Pending Approval, Needs Input, On-going, Upcoming, In-Progress, Blocked, Completed.
- **Flow:** Set up/config (Create/Edit Pay Schedule, “User wants automation?” → preferences, review) → Plan execution / data trigger (Checks Payroll Plan → Identifies missing data? → Sends message, Saves entry; Reply? → Escalates per preferences; Plan completed? → Notify, Create plan) → Plan completed (Resolve, Notify Payroll, Payroll can be sent).
- **Key pages:** Pending payroll input / **Auto-Approve all pending payroll**; UI automation prompt (e.g. “Payroll input is required… Reply with date”); Payroll admin chasing SMS (Approve/Deny); Payroll inputs complete notification (Publish Now / Later).
- **Use for Workshop 1:** Strong pattern for approval chasing, auto-approve low-risk, reminders (SMS/in-app), and dashboard status. Map “Blocked” and “Pending Approval” to bill workflow.

---

## Prep 1: [Design] Bill workflow pain points + competitive approval features

### 1.1 Voice of the customer / pain points (from AI Opportunities – Opportunity 2)

**Source:** [AI Opportunities in Payments](https://docs.google.com/document/d/1SShVmYd2ZMcvP7lp71eDcfjcmmHc7KtS_mNLBblOOvw) (Chong Xu, Peter O’Malley). Opportunity 2: The Bill Automation Agent.

- **Cash flow & scheduling friction:** Customers struggle to set and manage payment runs based on terms and due dates for on-time payment. ~25% of bills are created *after* they’ve been paid → inaccurate cash-flow forecasting.
- **Manual configuration:** Customers expect the system to learn and automate against their preferences over time instead of manually setting details repetitively.

**Regional impact:**

- **US:** Large DIY base; GTM via CAS = manual data entry savings and accounting simplification; efficiency for owners, more client capacity for bookkeepers.
- **UK:** Bill management is a top 3 job; automating bill toil could save hours/month for ~40% of Bills users; bill automation + on-platform payments address cash flow and scheduling friction.
- **AU:** ~40% of Bills users in AU; penetration sub-40% among BE orgs; automation for high-volume orgs = more bills managed on platform.

### 1.2 Xero internal reality (from Confluence Approval Workflow)

**Source:** [Product Opportunity Brief: Multi-User, Multi-Step Approval Workflow](https://xero.atlassian.net/wiki/spaces/BIL/pages/271708291115) (Pratik Rathod).

- **Current gaps:** Basic approval exists but not widely adopted: single approval step only; no conditions/workflow rules; approval happens before payment details are set. ~120k orgs view “awaiting approval” tab monthly; ~95k view an individual bill awaiting approval. Multi-user execution notifies via email but anyone with permission can pay → single-step only.
- **Customer quotes:** “As a charity we should have two signatories…”; “Create Payment CTA is off-screen when many bills selected…”; “Ramp’s got some cool tech… Ramp has an extensive approval workflow.”
- **Technical:** Event streaming needed; new DBs for rules/sub-statuses; Melio integration = embedded, disconnected payment experience, not scalable.

### 1.3 Competitive: Bill workflow / approval features

**Source:** Same Confluence Approval Workflow doc (competitive landscape).

| Competitor | How they address it | Strengths | Weaknesses |
|------------|----------------------|-----------|------------|
| **QuickBooks** | Multi-condition, multi-level approval for bills; visual workflow builder (drag-and-drop). | Included at $90/mo (Advanced); amount, location, project routing. | Advanced tier only; users report glitchy, limited flexibility. |
| **Dext** | Workflow templates for AP, payroll, bookkeeping; up to 5 approval stages. | Deep Xero/QB integration; expense claims multi-stage; region-specific. | Primarily for accountants; full AP approval needs ApprovalMax. |
| **Ramp** | Approval workflows for bills and expenses; auto-routing, fraud prevention, vendor verification; **AI-generated summaries for faster approval**. | Basic approval free; advanced ~$15/mo; spend cards + AP + controls. | US-focused; separate accounting integration. |
| **Revolut** | Approval workflows at £19/mo; multi-user payment authorization. | Integrated business banking; multi-currency. | Limited accounting integration; not full AP. |
| **Mercury** | Approvals for free; multi-user payment controls. | No extra cost; strong US startup adoption. | Not full AP/accounting; limited workflow customization. |
| **ApprovalMax** | Multi-step, multi-role for bills, invoices, POs; Xero, QB, NetSuite. | ~25% bills approved in 2h, 50% in 1 day; audit trails, fraud detection. | Separate subscription; adds complexity for “native” desire. |

**QuickBooks (detail from public help):** [Set up and use bill approval and payment release workflows](https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-workflows/set-use-bill-approval-payment-release-workflows/L1IOLL9hv_US_en_US)

- **Roles:** Bill approver (approve only), Bill clerk (add bills, mark paid, add/edit vendors; can’t approve or pay), Bill payer (view and pay bills, edit vendors; can’t add bills). QuickBooks Bill Pay Elite or QBO Advanced.
- **Bill approval workflow:** Lightning bolt → Templates → “Bill Multi-Condition Approval.” **When this happens:** conditions on amount, vendor, location (or combo). **Do this:** select approver; optional “Email to your team.” Multiple When/Do blocks. Bills not reviewed in 30 days = auto-denied. Clerk saves bill → “Send for approval” or “Close” (saved as needs approval).
- **Payment release workflow:** Separate “Set up bill payments release approval” template. When this happens: amount, vendor (or combo). Do this: select approver (admins only). 30-day auto-deny. Clerk creates payment meeting conditions → schedule and submit for approval; approvers notified. Approvers: Expenses → Bill Payments → **Pending Approvals** tab; Action: Approve / Reject / View Details.
- **Visibility:** Tasks widget on Dashboard; Tasks menu; Bills page → Unpaid tab → “Approval Status” column.

**Miro cross-ref:** Pain points → **Payer-chasing agent** (chasing managers, overdue payments, manual/repetitive tasks, cash flow forecasting); **Payroll-chasing agent** (user stories: auto-approve low-risk, reminders, inconsistent approvers). Status/visibility → **Agent Dashboard** (Blocked, In Progress, etc.).

---

## Prep 2: [Product] Bill agents from the market and key capabilities

### 2.1 Xero’s Bill Workflow Agent (from AI Opportunities)

- **Vision:** JAX operates on behalf of customers to automate bill approvals, enrich bill data, and set planned payment run dates. Users define rules for which bills to auto-approve via **natural language**; JAX approves and schedules planned payment dates as appropriate.
- **VOC:** High toil for business insights, especially high-volume; improves payment attach.
- **Agentic angle:** Natural language rules; automated approval and scheduling.

### 2.2 Competitive / adjacent agent capabilities (from Confluence + AI Opportunities)

- **Ramp:** AI-generated summaries for faster approval (mentioned in competitive landscape).
- **Option C (Confluence):** AI-powered approval automation — auto-route, anomaly detection, one-click approval with AI-suggested coding and payment timing, proactive fraud/compliance alerts.
- **Opportunity 2 AI capabilities:** Natural language rule creation (“All bills from Amazon should have 310-COGS”, “set default contacts for all the bills”); Agentic reasoning + ML prediction (supplier defaults, OCR, predictive insights for ready-to-pay).

### 2.3 To research further (not in pulled content)

- Other **bill/AP agents** in market (e.g. BILL, Brex, other SMB AP tools) and how they position “agent” or AI (chasing, scheduling, approval, coding).
- **JAX** and Agent Platform patterns (Brett’s Miro) for job design and triggers.

**Miro cross-ref:** **Payer-chasing agent** — agent actions (auto-approval, payment-chasing, auto-scheduler, risk-based timing, approval/release, escalations); in-situ feedback, proactive reminders, channels (email, SMS, webhooks). **Pay run orchestration** — Agent in set-up and in review/post. **AB Information chasing** — comms plans, rules, client-facing agent. **Payroll-chasing** — auto-approve low-risk, escalation, preferences.

---

## Prep 3: [Design/Product] How agentic UI can look / how agents are triggered

### 3.1 From AI Opportunities and project (unverified) recommendation

**Natural language rules:**  
Customers create automation rules via language, e.g. “All bills from Amazon should have 310-Cost Of Goods Sold applied”, “set default contacts for all the bills”. Agent then applies rules and schedules.

**Agentic UI trigger ideas (from research-directory recommendation, unverified):**

1. **In-context recommendation:** Agent suggests in place, e.g. “This $100 bill from Supplier X can be auto-approved based on policy.”
2. **Proactive action:** Agent takes or proposes action and informs user, e.g. “Approver Jon is late; I have sent a reminder SMS.”
3. **Custom rule creation:** User talks to the agent to set rules, e.g. “Set a rule that all bills under $50 from a returning supplier are auto-approved.”

### 3.2 From Confluence (Option C – AI-powered approval)

- AI-powered **auto-routing** (supplier, amount, history).
- **Anomaly detection** (“red flags”) in approval workflow.
- **One-click approval** with AI-suggested coding and payment timing.
- Proactive **fraud/compliance** alerts.

### 3.3 From Opportunity 3 (Fast Pass) – generative UI

- **Generative UI:** Personalized, contextual UI; fewer screens/flows/tabs; can be triggered in context. (Relevant for “how agents show up” in UI.)

**Miro cross-ref:** **Agent Dashboard** — global entry, Filter Jobs, Create New, status columns, Detailed Job View (overview, who created/approved, timing, config, dependencies). **Payer-chasing** — in-context setup (Agent settings modal), escalations/rules UI, audit history, payment request (“Pay now”), proactive SMS/email. **Pay run orchestration** — Action required email (View details, Approve), Manual review required, Upcoming/Posted emails. **Payroll-chasing** — Auto-Approve all pending, UI automation prompt (Reply with date), chasing SMS (Approve/Deny), completion notification (Publish Now / Later). **AB Information chasing** — client trigger dashboard, agent config, comms plan and steps, client comms/reply (chat-like).

---

## Business Model / Payment Segments (personas and journey)

**Source:** [Business Model Segments (Payments) deck](https://docs.google.com/presentation/d/1nQ7Y_yaubQ-kbuQvh-ljmt2PrZ2xMLQug2TxVpPkJq4) (Lana Kinney et al.). Retrieved via Glean.

- **8 segments:** Producers & Suppliers, Business Service Providers, Project Builders, Scoped Consumer Goods & Services, Direct to Customer, Subscriptions & Retainers, Nonprofits & Charities, Accountants & Bookkeepers. Segment deep dives include **bill volume**, **approvals**, **payment services**, **chasing**, etc.
- **Use for Workshop 1:** Personas (SMB/AB), which segments have most bill/approval volume, and swimlanes (entry point, workflow action, AB vs SB, new vs returning). Align to “current approval workflow proposal” as baseline.

---

## Links quick reference

| Resource | URL |
|----------|-----|
| AI Opportunities in Payments (Opportunity 2) | https://docs.google.com/document/d/1SShVmYd2ZMcvP7lp71eDcfjcmmHc7KtS_mNLBblOOvw |
| Business Model Segments deck | https://docs.google.com/presentation/d/1nQ7Y_yaubQ-kbuQvh-ljmt2PrZ2xMLQug2TxVpPkJq4 |
| QuickBooks bill approval & payment release | https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-workflows/set-use-bill-approval-payment-release-workflows/L1IOLL9hv_US_en_US |
| Confluence: Approval Workflow opportunity | https://xero.atlassian.net/wiki/spaces/BIL/pages/271708291115 |
| Miro – Brett’s Agent board (widget) | https://miro.com/app/board/uXjVGNBGq7k=/?moveToWidget=3458764656238274241&cot=14 |
| Miro – share link | https://miro.com/app/board/uXjVKxF6cn4=/?share_link_id=890261347127 |
| Google Sheet (not in index – open directly) | https://docs.google.com/spreadsheets/d/1CShAOrYa6m1YaLWqghNX2U1XMLBYTrtJf2Z66HaBlNE/edit?gid=934268544 |

---

## Workshop 1 focus (reminder)

- **Tag every pain:** **Today** (exists in current state) vs **Once we have approval flow** (assumes baseline).
- **Journey slice:** Post data-entry → payment execution (approval, release, scheduling). Not bill creation/entry (Pratik’s team).
- **One decision:** Shared, tagged pain list as input to Workshop 2.
