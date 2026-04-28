# Design Swarm — Source files from Brett's payer-chasing sprint

**Origin:** Brett Edmonds, Di Pierce, Darryl Powell — Nov/Dec 2025 agent ideation experiment.  
**Purpose:** These are the actual markdown files Brett's team fed into ChatGPT as the "knowledge base" for their 4-day Design Swarm. We store them here as **templates to adapt for Bill AI**.

> "Without accurate documents, the model over-indexes on the wrong things. Document accuracy is the most important thing you're going to do." — Brett

---

## File inventory

Brett's ChatGPT project folder contained these files (visible in slide 3):

| File | Type | Purpose |
|------|------|---------|
| `00_MASTER_SETUP_PROMPT.md` | Master prompt | Loads knowledge base; defines the 7-stage prompt sequence |
| `01_SCOPE_DEFINITION.md` | Guidelines & criteria | Problem, goals, metrics, scope, constraints, definitions |
| `02a_Persona_Payer.md` | Persona | Payer receiving invoices — needs, pains, evaluation profile |
| `02a_Persona_SB_Business_Service_Providers.md` | Persona | SB segment |
| `02a_Persona_SB_Goods_Services.md` | Persona | SB segment |
| `02a_Persona_SB_Producers_Suppliers.md` | Persona | SB segment |
| `02a_Persona_SB_Subscriptions_Retainers.md` | Persona | SB segment |
| `02b_Journey_Map_Payer.md` | Journey map | L1 → L2 → L3 task hierarchy |
| `02b_Journey_Map_SB.md` | Journey map | SB journeys |
| `02c_Sitemap_Current.md` | Background | Current Xero sitemap |
| `02d_Competitive_Analysis.md` | Background | Competitive landscape |
| `02e_Technical_Constraints.md` | Background | Technical boundaries |
| `02f_Agent_Vision.md` | Ideation material | JAX superagent vision |
| `02g_Agent_Voice_Tone.md` | Ideation material | Agent voice/tone guidelines |
| `02h_Agent_Playbook.md` | Ideation material | Agent playbook patterns |
| `03_IDEATION_METHODS.md` | Ideation material | 10 design spectrums/dimensions |

**Five types of context** (from slide 3):
1. Guidelines & criteria (principles, success metrics, dos/don'ts)
2. Background info (domain context, constraints, market)
3. Personas (user types, roles, modes, journey maps)
4. Data collections (CX cases, research study data)
5. Ideation materials (visions, scenarios, failure cases, edge cases)

---

## Source file: 01_SCOPE_DEFINITION.md

> Template for how to define the problem, goals, metrics, scope, constraints, and vocabulary for an AI Design Swarm.

### 1. The Core Problem: The Invoice-to-Cash Lifecycle is Broken

Small businesses (SBs) face critical cash flow challenges because the entire process of getting paid is inefficient.

* **Data:** On average, 39.2% of invoices in Xero are paid late.
* **Cash Flow is Critical:** 82% of small businesses that shut down cite cash flow issues as the primary reason.
* **Xero's Gaps (Generic):** Xero reminders are "generic and impersonal." They don't account for *who* the payer is or *what* works when chasing them.
* **Xero's Gaps (B2B):** It's hard to know *who* to chase and *when*, which is a major issue as B2B transactions make up over 80% of invoice payments from Xero.
* **Impact:** Chasing payments is a major "time sink," a source of "stress," and a "manual effort" that "drains time and resources."
* **Why an agent is the right solution:** Chasing involves timing, tone, sequencing, and context-awareness → all ideal for agentic automation.

### 2. The AI Agent Opportunity (Our Solution)

This design sprint is about creating an **AI-driven agentic experience** to automate and optimize the *entire* invoice-to-cash lifecycle.

This agent will replace the current rules-based reminder system with an intelligent, trusted partner that manages the process, freeing the SB owner from the manual, emotional labor of getting paid.

### 3. Primary Business Goals (The "Why")

This "Smart Agent" is the **primary value proposition** to achieve our key business goal:

1. **Increase Win Rate**
   * **How:** The agent will be more effective at getting invoices paid for customers that have 1 or many payment services attached.
   * **Revenue:** ~$800,700 in new monthly revenue.
   * **Metric:** Drive Payments Revenue growth to $122.5M.

### 4. Success Metrics (Our Measures)

**Lead Indicators**
* **Uptake:** What % of new invoices are created using proactive features (e.g., deposits, progress payments, authorization for a merchant to debit funds from payers bank account at due date)?
* **Uptake (Chase):** What % of new invoices have an agent-driven "Chasing Plan" connected?
* **Retention:** What % of SBs who activate the agent are still using it 30 and 90 days later?

**Lag Indicators**
* **Invoice Payment:** Reduction in % of overdue invoices.
* **Win Rate:** The agent's direct impact on the invoice payment win rate.
* **Time to Pay:** Compare the % of invoices paid on time/early (Agent vs. No Agent).

**Agent Performance Indicators**
* % of agent actions executed without user intervention.
* % of actions users override or reject.
* Drop-off rates from plan creation to invoices paid.

### 5. Experience Goals

* **Proactive Confidence:** Give users confidence in their cash flow *at the point of sale* by securing deposits or payment authorization.
* **Reactive Relief:** Reduce the emotional discomfort of chasing.
* **Trust & Transparency:** Increase clarity around what the agent will do and give users confidence it won't harm customer relationships.

### 6. Project Scope (The "What")

**IN SCOPE (Proactive Payment Assurance - At Creation)**
* **Agent-Suggestions:** The agent gives suggestions *during invoice creation* to help users get paid the way they want.
* **Payment Authorization:** Designing the flow for an SB to get authorization from a payer to automatically debit their bank account/card on the invoice due date.

**IN SCOPE (Reactive Chasing - Post-Due Date)**
* **The Agent's "Playbook":** Designing the logic for "Chasing Plans".
* **The Agent's "Voice":** Using AI (JAX) for AI-generated content and adjustable tones.
* **The Agent's "Tools":** Integrating other channels (e.g. SMS).
* **The Owner's "Control Panel":** The UX for the SB owner to set agent rules and boundaries.
* **The "Escalation Path":** The UX for the agent to "pause" and hand off a conversation to the human.

**OUT OF SCOPE (Do Not Suggest)**
* [Placeholder]

### 7. Key Constraints (The "Rules")

* [Placeholder — e.g., Must use existing payment partners]

### 8. Key Product Definitions (Our Language)

* **"Get Paid":** Suite of features that help a small business (SB) receive money.
* **"JAX":** Xero's AI financial 'Superagent' delivering automation and insights.
* **"Payment Service":** A third-party payment processor (e.g., Stripe, GoCardless) that users can "attach" to invoices.
* **"SB Organisation":** A Small Business company account in Xero.
* **"SB":** Small business owner with an active paid subscription in Xero.
* **"AB":** Accountant or Bookkeeper that supports 1 or many SB clients.
* **"Active orgs (Attach rate)":** Active SB Organisations that have connected a payments service.
* **"Paid Invoices Per Org":** Number of invoices paid (via any means) per org.
* **"Win rate (%)":** Xero invoices paid with a payment service / total Xero invoices paid within the same timeframe via any means.

---

## Source file: 02a_Persona_Payer.md

> Template for how to write personas that AI can both use for ideation AND roleplay as synthetic users.

### Persona: Payer (Online Invoice Payments)

**1. Summary & Role**
* **Role:** Receives a Xero-issued invoice and completes payment via the online invoice experience using an attached payment service (e.g., Stripe, GoCardless, PayPal). Does not need a Xero account to pay.
* **Quick Fact:** The first-time payment experience strongly shapes future behaviour; increasing perceived trust, clarity, and safety at the first payment materially shifts long-term method choice.

**2. Core Problem & Job to be Done (JTBD)**
* **Core Problem:** Payers want to settle invoices safely with minimal friction and full transparency (especially around fees and security), across channels they already use (email, SMS, mobile browser), without creating extra admin for themselves.
* **Job to be Done:** "When I receive an invoice, I want to pay it using a method I trust and prefer (card, direct debit, PayPal, bank rails, etc.) via channels I already use (email, SMS, mobile browser), with clear fee visibility and instant confirmation, so I can complete the task confidently and retain a usable record/receipt."

**3. Needs, Wants & Pains**

*Needs (Must-Haves):*
* **Trust & Security signals:** Recognisable providers, clear legitimacy to reduce first-time anxiety and phishing concerns.
* **Speed & convenience:** Minimal steps from open → pay, with instant confirmation and receipt.
* **Transparency:** Transparency on fees and payment options so the payer can choose an acceptable method and avoid surprise charges.
* **Method:** Availability that matches preference and context (card, direct debit, PayPal, supported bank rails like ACH/PayTo, BNPL where available).

*Wants (Nice-to-Haves):*
* Wallets / saved details / autopay for repeat payments, to "set and forget" or streamline recurring use cases.
* Payment scheduling for pay-later behaviour while keeping the transaction online.
* Multi-channel access (email/SMS/link).
* Clear records for reimbursement/accounting.

*Pain Points (To Address):*
* **Fee transparency** drives drop-off and negative sentiment; unclear "no fee" vs "surcharge" labelling reduces trust and conversion.
* **First-time distrust** of digital payment UI and storage of card details (privacy/safety concerns) suppresses online selection on first pay.

**4. Refinement & Critique Profile (How this persona evaluates ideas)**
*(Use this for Stage 5: Idea Refinement — "Multiple Perspectives")*

* **Primary Filter (Gut Check):** Does this feel safe and legitimate (known provider, secure UI) while making paying obviously faster?
* **Key Questions:**
  * How many steps is this from open → pay?
  * Are fees (if any) clear before I commit?
  * Will my card be stored automatically, and can I control that?
  * Do I receive instant confirmation and a usable receipt?
  * Can I switch to another trusted method without starting over?

**5. Evaluation & "Testing" Profile (Virtual Persona Feedback)**

This section allows the LLM to *roleplay* as this user to test an idea.

* **Persona's Success Criteria:**
  * "Win": I can pay in one simple flow with clear trust cues, no surprises, and instant confirmation.
  * "Win": I'm offered a familiar method I prefer (e.g., card, PayPal, direct debit, bank rails) and can change methods easily.
  * "Fail": Hidden or confusing fees; unclear security; method dead-ends or restarts; unclear outcome/receipt.

---

## Source file: 02b_Journey_Map_Payer.md

> Template for hierarchical journey maps (L1 → L2 → L3) that give the AI task-level context.

**Persona:** Payer

**Level 1 (L1): High-Level Goal**

| L1 Journey | Description |
|:---|:---|
| **Pay for sales and/or services** | The primary overarching goal of the user. |

**Level 2 (L2): Core Jobs to be Done**

| L2 JTBD | Description |
|:---|:---|
| **Make Payment** | The payer wants to make a payment. |

**Level 3 (L3): Detailed Tasks and Flows**

1. **Receive request (via SMS or email):** Payer views the request and clicks on the digital invoice link.
2. **Make Payment:** Payer completes the payment transaction via the online invoice (checkout page).

---

## Source file: 02f_Agent_Vision.md

> The JAX superagent vision — gives AI the long-term north star and framing for "what kind of agent are we building."

**JAX — your AI financial 'Superagent' delivering the automation and insights you and your advisor need to supercharge your business together.**

The future of business and your accountant's practice isn't about more software — it's about smarter software. This is the era of autonomous business and practice, powered by Xero's agentic AI platform.

At its core is JAX, a financial superagent that works as your AI business companion, bringing our vision to life to be the most trusted and insightful platform for small businesses and advisors.

**The Challenge:** One in four small business owners are overwhelmed by managing more than six different platforms each day.

**The Goal:** Automate over 90% of routine tasks for SBs and ABs, freeing up time and delivering more actionable insights.

**Four Unique Benefits:**
1. **From scattered tools to Xero reimagined experiences** — one intelligent interface, learns your rhythms.
2. **From manual busywork to automated actions ("Just Done")** — data entry, reconciliations, getting paid — completed in seconds with accountant-level accuracy.
3. **From static reports to actionable insights** — trusted data from business + web + apps delivers personalized, timely insights.
4. **From generic AI to a trusted partner** — built on trust (security, privacy, expertise, built with you).

**JAX Differentiators:**
* **Reimagined Experience:** Orchestrates multiple AI agents; learns how you work; hands-free management.
* **Work "Just Done":** Clean data, automated entry, proactive handling — only bothers you with genuine exceptions.
* **Personalized Real-Time Insights:** Enterprise-level intelligence; empowers advisors; strengthens SB-AB relationship.

---

## Source file: 03_IDEATION_METHODS.md — Design Spectrums

> Template for the ideation dimensions the AI uses to diverge. Each is a Pole A ↔ Pole B spectrum.

| # | Dimension | Pole A | Pole B |
|---|-----------|--------|--------|
| 1 | **Level of Autonomy** | Fully autonomous (execute plans, basic reminders) | Supervised (user approves any step) |
| 2 | **How the Plan Updates** | Fixed (updates only on user edit or completion) | Self-adjusting (events update cadence, tone, channel) |
| 3 | **Required Input Signals** | Minimal (invoice, due date, amount) | Full context (prior comms, payer history, cash position) |
| 4 | **Aggressiveness** | Protective (protect payer relationship at all costs) | Aggressive (get paid at all costs) |
| 5 | **User Shaping of Plan** | Rigid (delete & start again only) | Configurable (cadence, decisions, wording, thresholds) |
| 6 | **Response to Failure** | Pause and notify user | Triage → propose resolution → continue when safe |
| 7 | **Plan Adaptation** | All payers treated equally | Plans tuned by value/loyalty/risk |
| 8 | **Level of Auditability** | Agent actions only | Actions + calculations + classifications + rationale |
| 9 | **Boundary Rules** | Simple (compliance, Xero) | Complex (compliance + Xero org + user + contract + payer) |
| 10 | **Anthropomorphisation** | Third-person/impersonal ("automated reminder from [Company]") | First-person/sender replication ("Hi [Payer], I'm following up…") |

**How they used these:**  
"For each idea group and individual idea, generate 3 ideas using the dimensions most relevant to the idea — exploring both Pole A and Pole B."  
Then later: "Take Pole B of the spectrums for each idea group and push it to the extreme."

---

## Adapting these for Bill AI

When we build **our** context pack for a Bill AI Design Swarm, we'd create equivalent files:

| Brett's file | Our equivalent |
|--------------|----------------|
| `01_SCOPE_DEFINITION.md` | Scope: "Zero Bill Entry" goal, Xerocon June 2026, success metrics (adoption, time saved, accuracy), "never do" |
| `02a_Persona_*.md` | Bill creator personas (segment-based); supplier/vendor personas; approver personas — **created:** [02a_Persona_Bill_Creator_Small_High_Volume.md](02a_Persona_Bill_Creator_Small_High_Volume.md), [02a_Persona_Cautious_Approver.md](02a_Persona_Cautious_Approver.md), [02a_Persona_AP_Clerk.md](02a_Persona_AP_Clerk.md) |
| `02b_Journey_Map_*.md` | L1→L3 for bill creation, approval, payment scheduling |
| `02c_Sitemap_Current.md` | Current bills UX flow, Melio flow (US), approval flow |
| `02d_Competitive_Analysis.md` | QBO, Ramp, Brex, BILL.com — how they handle bill entry/approval |
| `02e_Technical_Constraints.md` | Melio API gap (Angus), OCR capabilities, JAX integration points |
| `02f_Agent_Vision.md` | JAX vision (reuse) + bill-specific framing (system of action, not record) |
| `03_IDEATION_METHODS.md` | Bill-specific dimensions (see below) |

**Bill AI dimensions (draft):**

| # | Dimension | Pole A | Pole B |
|---|-----------|--------|--------|
| 1 | **Entry autonomy** | Suggest fields, human fills | Fully auto-populate, human reviews |
| 2 | **Approval autonomy** | Always human approval | Rules-based auto-approve (low-risk) |
| 3 | **Data source** | Manual upload / email forward | Full API + bank feed + OCR + matching |
| 4 | **Trust / fraud** | No automation (user verifies everything) | Full protection agent (flag anomalies, block suspicious) |
| 5 | **Supplier matching** | Suggest existing contact | Auto-match + auto-create + learn patterns |
| 6 | **Payment timing** | User sets date manually | Agent optimizes based on terms + cash flow + discounts |
| 7 | **Configurability** | One-size-fits-all defaults | Per-supplier rules, per-amount thresholds, custom workflows |
| 8 | **Learning / adaptation** | Static rules | Learns from corrections, adapts over time |
| 9 | **Auditability** | Actions only | Full rationale (why this account code, why this supplier match) |
| 10 | **Scope of action** | Bill entry only | Entry + approval + scheduling + payment execution |
