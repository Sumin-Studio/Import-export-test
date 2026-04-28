# Bills / Pay Out: Three Agent Concepts

**For**: David checkpoint (Wed)
**Feeds into**: Chong's Payments Agent Vision deck (Diya review, Fri)
**Scope**: Bills / Pay Out slice (L2.7B.2)
**Date**: 25 February 2026

---

## 1. Why this, why now

Diya's mandate is clear: AI everywhere, not just "support some agentic flows." In the AI review, Payments was showing as **RED**. The wake-up call landed across the leadership team in the same week:

- **Bharathi**: Frame everything as **cashflow optimization** -- it's the main stressor for customers, and it transcends individual payment transactions and AR/AP concepts. Competitors can match us move-for-move on small business AI, but the **accountant-to-small-business connection is defensible and differentiated**.
- **Chong's three defensible pillars**: (1) **System of record** -- a cash-aware super-agent combining AR+AP against a cash goal, vs competitors' siloed agents. (2) **System of action** -- cross-client intelligence AND cross-client actions for accountants. (3) **System of engagement** -- fast onboarding, eliminate DIY config, AI-native bill experience.
- **Pratik**: "The map is not the territory." Xero thinks it has an accurate cash flow view but doesn't -- trade accounts, supplier credit, inventory disputes, PO quality issues never make it to Xero. The more we bridge map and territory (extending data models, enabling ecosystem partners), the better our AI can be.
- **Bharathi's closing energy**: "Unless we get on this train, en masse, we are going to piecemeal our way to some insipid, uninspired future. We need escape velocity."

A tiger team is forming. Product (Chong, Pete, Darren, Pratik, Neeraj, Prashant), Design (TBD -- David choosing), Eng (Luke, Lili). Twice-a-week meetings. Bharathi: "Let us be resource poor, not imagination poor."

This is the Facebook mobile moment -- Zuck wanting a mobile version of every product idea, but for AI.

---

## 2. The reframe: we were automating the easiest part

Today's meeting surfaced something we need to sit with:

> "We're not grappling with feasibility vs ambition anymore, it's actually more 'is this even good?' Like... pressing the pay button is the easiest part of this whole process. We have an agent doing the easiest bit. Versus all the teeth gnashing and toil leading up until that moment."

The real toil in bills is upstream of the pay button:

- **Bill entry**: uploading bills, checking details, matching to the right contact
- **Account coding**: getting the right account codes, splitting line items
- **Approval workflows**: chasing approvers, waiting for sign-off, managing exceptions
- **Context sorting**: figuring out what's urgent, what can wait, what's an anomaly

An agent that presses "pay" on three ready-to-go bills is a chatbot wearing an agent costume. An agent that can **make sense of the million steps of a bill** -- dragging and dropping tons of context into a window and having the agent sort it out -- that is a real user need.

Each of the three concepts below addresses this reframe. They don't just automate the last click. They tackle the upstream chaos.

---

## 3. The Hollywood slide: three hero moments

One slide. Three images. Intent, not mechanics.

| | Image | Moment |
|---|---|---|
| **1** | Alert on phone | **"Bills have been paid. Click to learn more."** |
| **2** | Alert on WhatsApp | **"Items have been auto-approved. Click to learn more."** |
| **3** | Conversation in ChatGPT | **"Paid from chat, no bill needed."** |

The test (from Brett): *"Can Diya get up on main stage at Xerocon and announce this idea and get a standing ovation from the crowd? If not, it's probably a bland idea."*

Lead with what it looks like once users trust it and sensible org-wide policies are in place. That's a way more compelling story than "AI you can't trust and still have to check."

---

## 4. The three concepts

### Concept 1: Bill Payment Planner

**Elevator pitch**: "We tell you which bills to pay this week and when, so you don't have to think. You see a recommendation upfront (e.g. on the dashboard or bills screen), tap to accept or tweak, then pay. Three clicks when you trust it; you can always drill in for plan mode, anomaly checks, and cash impact. The agent does the planning; you approve. Over time we can make it automatic -- 'do this every week.'"

**Why it matters**: Cuts 21+ clicks to 3. Reduces cognitive load. Turns bills from manual triage into "review and approve." Fits Zero Bill Entry and Do It For You.

**Upstream toil it addresses**: The agent handles the prepare-and-decide steps -- which bills to pay, when, in what order, against what cash position. Today this is manual spreadsheet work or gut instinct. The planner replaces cognitive load with a recommendation you approve.

**Delivery**: Dashboard / bills view first (inline, not side panel). Optional chat for "show your work" or deeper planning.

**JTBD positioning (L2.7B.2 Pay bills)**: Sits in the **Prepare bills to pay** + **Decide when to pay** (and into **Schedule**) job steps. "Which bills to pay this week and when." We recommend; you approve. The planning/prioritisation slice.

**Agent flow** (from workshop): Context gathering (bills, cash position, supplier criticality, delivery times) -> Goal setting (Conservative / Standard / Growth strategy) -> Generate recommendations (which bills to pay when, which to defer, with reasoning) -> Review gate -> Batch for payment.

---

### Concept 2: Intelligent Bill Approval

**Elevator pitch**: "When bills need a second pair of eyes, we flag what's risky and route approval to the right person -- but they don't have to open Xero. The approver gets a WhatsApp (or email): 'Here are 5 items; 4 look good, 1 needs a look.' One tap to approve the clean ones, link to Xero for the exception. No more chasing; the agent sends the nudge."

**Why it matters**: Approval becomes a 30-second task in the channel they already use, not a login-and-click workflow. Safety Shield (anomalies) + approval automation in one story.

**Upstream toil it addresses**: Today approvers are chased via email, Slack, or in person. Bills sit in limbo. The agent flags anomalies (duplicates, bank detail changes, unusual amounts, policy violations), routes with a GenAI summary card, and lets the approver act without opening Xero. The toil of chasing and waiting disappears.

**Delivery**: Requester may use in-product (bills/chat). Approver experience is **alternative channel** (WhatsApp/email). Not everything in a side panel.

**JTBD positioning (L2.7B.2 Pay bills)**: Sits in the **Get approval** job step. "When bills need a second pair of eyes." We flag risk and route to the right person; they approve in WhatsApp. The approval slice.

**Agent flow** (from workshop): Context gathering (approval rules, historical patterns, unpaid bills) -> Risk detection (duplicates, bank detail changes, unusual amounts, policy violations) -> Routing with GenAI summary card (email/mobile push) -> One-click approve/exclude -> Review gate -> Batch payment.

---

### Concept 3: Just Pay

**Elevator pitch**: "Pay someone without creating a bill first. You say it -- in Xero or in your agent (e.g. ChatGPT) -- we create the record and run the payment. Review, confirm, done. The 'wow' is the agent just doing it: 'Pay Joel $500' -> 'Done. I've created the bill and scheduled the payment.'"

**Why it matters**: Removes the biggest friction for small, one-off payments. Speaks to "zero bill entry" and agent-led experience. Fits where the industry is going (agents, not just in-product UI).

**Upstream toil it addresses**: Only 10% of Xero users use bills. Meaningful SMB spend is ad-hoc -- contractors, reimbursements, subscriptions. The full AP process (create bill, add line items, code accounts, approve, schedule, pay) is overkill for "just pay Joe $500." The agent compresses or skips those upstream steps entirely.

**Delivery**: Can be in-product (Just Pay entry) or **in an agent** (ChatGPT, etc.). Payoff can include a confirmation in WhatsApp. Varied by use case.

**JTBD positioning (L2.7B.2 Pay bills)**: Acts as a shortcut into **Make payment** (often skipping or compressing **Receive -> Prepare -> Decide -> Approve**). "Pay someone without creating a bill first." Say it -> we create the record and pay. Still L2.7B.2 Pay bills but a different entry: pay-first, minimal prior steps.

**Agent flow** (from workshop): Context from bank feeds + contact list + free text/voice -> Confirm inputs, match contacts -> Cash flow outlook -> Optional: defer or set up recurring -> Direct to prep/pay screen.

---

### One-liner summary

> Three concepts: (1) Bill Payment Planner -- we recommend, you approve, 3 clicks. (2) Intelligent Bill Approval -- we flag risk and send approval to the right person in WhatsApp; they tap, done. (3) Just Pay -- you say it (in Xero or in your agent), we create the bill and pay; no forms. The delivery mechanic varies: dashboard for 1, WhatsApp for 2, agent or in-product for 3 -- not everything in a side panel.

---

## 5. Where this fits

### JTBD arc (Pay Out)

Our bills proposal sits in the Pay Out job: **L2.7B.2 Pay bills**. We're not changing the job -- the customer still needs to pay bills. We're changing **how** it's done.

The Pay Out arc (job steps):

1. **Receive bill** -- *Bill enrichment (L2.7B.1) sits here*
2. **Prepare bills to pay** -- *Bill Payment Planner starts here*
3. **Decide when to pay** -- *Bill Payment Planner continues here*
4. **Get approval** -- *Intelligent Bill Approval sits here*
5. **Schedule / select for payment**
6. **Make payment** -- *Just Pay shortcuts to here*
7. **Record / track payment**

| Concept | JTBD / Job Step | What we're helping with |
|---------|-----------------|-------------------------|
| **Bill Payment Planner** | Prepare + Decide (into Schedule) | "Which bills to pay this week and when." The planning/prioritisation slice. |
| **Intelligent Bill Approval** | Get approval | "When bills need a second pair of eyes." The approval slice. |
| **Just Pay** | Shortcut into Make payment | "Pay someone without creating a bill first." A different entry point. |

### Scope boundaries

| What | Where |
|------|-------|
| **These three concepts** | Bills / Pay Out slice (L2.7B.2). This is our proposal. |
| **Bill enrichment** (zero bill entry, one-click entry) | Earlier in the arc: L2.7B.1 Receive invoices/bills. Pratik leading. |
| **Chasing agent** (get invoices paid) | Pay In, not Pay Out. Committed separately. Prashant leading. |
| **Full vision** (onboarding, invoicing, practice) | Chong's Payments Agent Vision deck carries the end-to-end narrative. |
| **End-to-end bills journey** | Being aligned with the Bills x Making Payments working group. |

### Cashflow optimization framing

Per Bharathi's direction, this is **cashflow optimization for Pay Out**: three ways we make bills simple -- plan which bills to pay (Planner), approve in one tap (Approval), or just say it and pay (Just Pay). The umbrella framing connects our Bills slice to the broader cashflow story that spans onboarding, invoicing, chasing, and practice intelligence.

### How the three concepts connect to channel terminology

| Channel term | Our concept |
|--------------|-------------|
| **Bill runner** | Bill Payment Planner (approve + schedule in one flow) |
| **Bill enrichment** | Not a starring concept in our three -- sits in L2.7B.1 (Pratik). Our Planner and Just Pay both speak to zero bill entry from different angles. |
| **Chasing agent** | Not in our three -- that's Pay In (Prashant). Our Intelligent Bill Approval chases *approvers*, not *customers*. |
| **Safety Shield** | Folded into Intelligent Bill Approval (anomaly detection + policy enforcement). |

---

## 6. What's next

| When | What |
|------|------|
| **Wednesday** | David checkpoint on this write-up. Lock the narrative. |
| **Thursday-Friday** | Minimal visuals: one window / couple of components per concept (not full UI). Enough to complement the ideas. |
| **Friday** | Diya review via Chong's deck. Our three concepts are the Bills section. |
| **Ongoing** | Tiger team twice-a-week. Xerocon target: 90 days for 2+ agents. |
| **Keep pushing** | The reframe (upstream toil, not just the pay button) opens up v2 thinking -- deeper into bill entry intelligence, coding assistance, exception handling. |

---

### Deck-ready one-liner

> "We're proposing cashflow optimization for Pay Out: three ways we make bills simple -- plan which bills to pay (Planner), approve in one tap (Approval), or just say it and pay (Just Pay). This is the Bills slice; the full vision (onboarding, invoicing, chasing, practice) is in Chong's Payments Agent Vision. How this fits the end-to-end bills journey is being aligned with the Bills x Making Payments working group."

### JTBD positioning paragraph (copy-paste ready)

> Our bills proposal sits in the Pay Out job: **L2.7B.2 Pay bills**. We're not changing the job -- the customer still needs to pay bills. We're changing how it's done. **Bill Payment Planner** helps them prepare and decide when to pay (we recommend, they approve in 3 clicks). **Intelligent Bill Approval** handles the get approval step when bills need a second pair of eyes (we flag risk and send to the approver in WhatsApp). **Just Pay** lets them pay without the full receive-prepare-approve flow (say it, we create and pay). Earlier in the same arc, **bill enrichment** (one-click entry) lives in **L2.7B.1 Receive invoices/bills**. How this connects to the rest of the bills journey is being aligned in the Bills x Making Payments working group.

As Peter put it: the **tasks** don't radically change (small business wants to get paid, customer needs to pay). The shift we're proposing is **how** they're done: *from laborious and emotional to as simple as a prompt or a click.*
