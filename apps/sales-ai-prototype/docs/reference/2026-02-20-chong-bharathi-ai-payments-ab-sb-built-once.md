# AI payments for AB and SB, built once

**Authors:** Bharathi Ramavarjula, Chong Xu  
**Date:** Feb 19 2026  
**Source:** Slack (Chong to team, 20 Feb 2026)  
**Purpose:** Outline AI payments ideas in a way that is practice-led, SB relevant, and differentiated in the market.

---

## Objective

Outline the AI payments ideas in a way that is practice led, SB relevant, and differentiated in the market.

---

## 1. AB AI payments ideas

### 1.1 Practice-wide cashflow autopilot

**What it is (AB view):**
- A practice-level dashboard that highlights which clients will hit cash stress when, and proposes a concrete weekly plan
- Uses invoices, bills, bank feeds, payroll and scheduled payments to forecast crunches and actions
- **Problem size:** Nearly half of invoices and around half of bills paid after due date, representing roughly 63% of TPV sitting unpaid past due

**AB value:**
- Lets firms productise "managed cashflow" instead of reactive clean up
- Clear outcome to sell: "These are the 5 clients at risk this month, here is the plan JAX has drafted, we will run it for you"

### 1.2 Payer-chasing agent (collections desk for the practice)

**What it is (AB view):**
- A JAX powered payer-chasing agent that creates a tailored "get paid plan" for each contact: channel, timing and tone; statements vs reminders; incentives and late fees; consolidation where payers have multiple invoices
- **Context:** 39–54% of invoices are paid after due date, and only ~18.5% of invoicing orgs use reminders, despite clear uplift in win rate when reminders are enabled

**AB value:**
- AB sets strategy per client, reviews and approves plans, JAX executes the playbook
- Converts X hours per week per client of chasing into a repeatable, billable Client Advisory service

### 1.3 Smart bill-run planner

**What it is (AB view):**
- A bill-pay agent that proposes the optimal weekly bill run per client: which suppliers to pay now vs later; which rails to use, and on which date; impact on buffer vs upcoming payroll and tax
- **Grounded in VoC:** High volume bill processors, roughly half of bills paid late, 44% of SBs "caught short" on cash

**AB value:**
- Moves AB work from "posting bills" to "cash stewardship"
- Easy to package as a monthly "managed AP and cash planning" offer

**Mapping:** This is our **SL1 (Cash-Flow Aware Planner)**.

### 1.4 Bill safety shield (like Google Googles)

**What it is (AB view):**
- An AP safety agent that flags: suspicious bank detail changes; duplicate or lookalike invoices; unusual amounts and timing vs history and peer patterns
- Uses the combination of bills, payments and bank reconciliation signals already identified in Bills AI and Payments planning

**AB value:**
- Lets ABs credibly claim "we are your payments fraud safety layer"
- Reduces write offs and supports tighter internal controls, especially for higher end clients

**Mapping:** This is our **SL2 (Intelligent Bill Approval)**.

### 1.5 One touch payments onboarding copilot

**What it is (AB view):**
- An onboarding copilot that pre fills KYB, business data and default payment settings from registries and existing Xero org data (REF: UK law re: AB need to KYB their clients)
- Today the payments path requires X fields, Y screens, Z flows and 4 tabs just to turn payments on.

**AB value:**
- Comply with the UK and AU KYB laws
- Lets ABs promise "we will switch on online payments in a single session"
- Scales attach and TPV across the book with minimal AB time

### 1.6 Advisor collections command center

**What it is (AB view):**
- A Partner Hub and JAX based collections view across the practice: which clients have deteriorating DSO or win rate; where high value invoices are going late; recommended levers: reminders, deposits, scheduled payments, autopay, statements

**AB value:**
- Becomes the Monday morning stand up for CAS and collections teams
- Tightens the AB to SB "do it together" story: the firm orchestrates, the agents execute

---

## 2. SB AI payments ideas

Same engines, different story. For SBs, the value is speed, simplicity, and confidence in cash.

### 2.1 SB cashflow autopilot
- Weekly summary: projected cash, a simple red / amber / green view to payroll and tax, and one click "apply plan"
- That plan: schedules invoice chasing; sequences this week's bill run; suggests card vs bank vs FX vs PayTo where relevant

### 2.2 SB payer-chasing agent
- On invoice approval, Xero proposes a get paid plan per contact
- SB can accept, tweak per customer, or let JAX run within clearly defined limits

### 2.3 SB smart bill-run planner
- Inside Bills and bill pay, SB chooses "plan my week"
- Xero proposes: which bills to pay now vs later; specific dates and rails; a pre payment cash check such as "paying this today will leave $X before payroll"

### 2.4 SB bill safety shield
- SB sees clear flags on bills and payment screens like: new bank account for this supplier; looks like a duplicate of Bill #123
- Safe next steps: trust and pay, hold and review, or fix details

### 2.5 SB one touch payments onboarding
- Most fields already populated from Xero data and registries
- The copilot only asks for missing or ambiguous items in plain language
- Links directly to claims such as "get paid up to four times faster when you send online invoices via SMS" where those are valid

### 2.6 SB collections overview
- On web and mobile: who owes the most this week; which invoices are at risk of going very late; a single control to enable the chasing agent for a specific group of customers

---

## 3. Product view: build once, serve SB and AB

For each of the top ideas, the core agents and platform services are shared. The differences are in surface, controls and aggregation.

### 3.1 Payer-chasing agent
- **Shared:** JAX based payer-chasing agent for planning and orchestration; uses existing reminders, statements and messaging rails
- **SB:** Embedded in Invoices, Statements and on homepage tiles; starts in "review and send" mode, moves to auto run once trust is built
- **AB:** Same engine, surfaced in Partner Hub with cross client lists and filters; firm wide defaults and templates; explicit "run on behalf of client" controls and audit

### 3.2 Smart bill-run planner
- **Shared:** Bill and cash optimiser built on bills, bank feeds, Cashflow Manager and payment methods
- **SB:** Single org flows such as "plan this run"
- **AB:** Ability to stage and review recommended runs across many orgs; bulk handling of exceptions and clear notes for client conversations

### 3.3 Bill safety shield
- **Shared:** AP anomaly and fraud models trained on bills, payments and bank reconciliation across the Xero network; backed by a Payment Data Verification service at platform level
- **SB:** In context flags and short explanations on bills and make payments
- **AB:** Practice view of risk across the portfolio; evidence and patterns that support audit, controls and potentially insurance

### 3.4 One touch payments onboarding
- **Shared:** One Onboarding and unified payment settings for AU, UK and US; AI pre fill of KYB, business data, default settings, and human readable explanations of choices
- **SB:** Guided flows in Xero Blue and Xero Accounting app; almost all fields pre filled, with simple "confirm or correct" steps
- **AB:** Status and orchestration in Partner Hub; ability to push multiple clients through setup with firm defaults and light follow up

### 3.5 Cashflow autopilot
- **Shared:** Built on Cashflow Manager, JAX, Payer-chasing agent, Bill planner and signals. Aligns directly with the FY27 AI goal to "assist customers in predicting, planning and optimising their cash flow management with zero click execution"
- **SB:** Narrative, single business view: "here is what to do this week"
- **AB:** Triage view across many clients and an ordered list of the highest leverage interventions for the firm this month

---

## 4. Differentiation vs Intuit and Sage

### AB and SB together, not AB on the side
- Xero's FY27 AI roadmap treats AB workflows as first class: books, tax, advisory and Partner Hub, not just "a user type" inside an SB product
- Intuit and Sage are building strong in product agents, largely at the single company level. They do not operate a multi org AB hub with embedded AI agents and payments across the practice in the same way

### Network and ledger advantages
- The XeroGraph strategy is to build a knowledge graph of the small business economy from first party documents, bank feeds and ecosystem integrations
- That graph powers payer chasing, bill safety, cashflow and eventually Xero to Xero flows. It is hard to copy without similar breadth of data, depth in bills and invoices, and an advisor centric model

### Payments in the ledger, not bolted on
- Xero is already first in the UK to offer on platform bill payments using open banking
- Recent launches like Deposits, Scheduled payments and Statements pay address real VoC gaps while exceeding QuickBooks on flexibility for payers
- Sage and Intuit lead with AP automation, close acceleration and card led flows. Xero's position is bank to bank, multi rail and network driven cashflow management, with ABs supervising the agents

### Roadmap alignment, not opportunistic features
- Payments agents, bill pay agents, cashflow modelling and AB tools are already in the AI strategy and FY27 planning, not side projects
- That alignment of strategy, infrastructure and VoC allows Xero to ship these ideas once, reuse them across AB and SB journeys, and keep extending the moat while others are still stitching agents onto existing product lines

---

## Sources

- FY27 AI strategy & roadmap
- Bill AI Workshop Ideation
- PRD-Collecting Payments - Scheduled Payment - Global
- PRD - Direct Growth & AI - Payer-chasing agent
- Bills AI
- Payments claims & customer quotes
- Xero Bills And Its AI Maturity Model - 2025 July
- FY27 Payments Planning - Platform
- OKR12 | AI for Customers - Fortnightly Business Update w/Diya (Live Updates)
- WBR with Diya - 30012026
- FY27 Payments Planning - AP & PAY OUT PLATFORM
