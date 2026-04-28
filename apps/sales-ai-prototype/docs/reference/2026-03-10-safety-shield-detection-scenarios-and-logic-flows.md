# Safety Shield: Detection Scenarios & Logic Flows

**Target audience:** Product, Design, Engineering, and Data Science teams  
**Purpose:** Outline the expected detection behavior, evidence requirements, and user interaction loops for **Safety Shield**, the bill-risk detection layer for Accounts Payable.

---

## The pain

Customers should not have to inspect every bill with the same level of effort just to avoid obvious mistakes, fraud, or financially damaging misses.

Current pain points include:

- duplicate bills slipping into the workflow
- first-time or low-trust suppliers appearing without enough context
- abnormal bill values that require manual checking
- approvers being forced into blind review rather than evidence-backed decisions
- risk only being discovered late, close to payment, or after the fact

The core customer story is:

- a business owner or finance approver wants to move quickly
- but does not want to accidentally pay the wrong thing, pay twice, or miss a suspicious change
- so they need Xero to elevate the few bills that deserve attention instead of making every bill feel equally risky

## The stakes

This matters because Safety Shield protects more than a single transaction.

- It helps protect **cash flow** from fraud, duplicates, and poor spend decisions.
- It improves trust in Xero as a system that can actively watch for problems, not just record them.
- It reduces cognitive load in approvals by reframing the work as **exception handling**.

Current working competitive read:

- duplicate detection and audit logging are close to table stakes
- stronger differentiation is more likely in:
  - anomalous invoice detection
  - supplier trust and change detection
  - bank-detail-change signals
  - network-powered fraud intelligence
  - making action easy, not just surfacing alerts

## Outcomes we are seeking

### Customer outcomes

- Help approvers focus on the small number of bills that actually deserve scrutiny.
- Prevent or reduce accidental duplicate payments and suspicious approvals.
- Increase confidence that approving and paying through Xero is safe.

### Xero outcomes

- Create a credible safety layer for bill approval and payment workflows.
- Strengthen the broader "protect cash flow" story alongside Bill Runner and Approval Automation.
- Establish a reusable detection service that can surface value in multiple product entry points.

## Target customer and problems to solve first

The initial target user is likely a person approving or preparing bills for payment in a small or medium business.

The most promising first problems to solve, roughly sequenced, are:

1. obvious duplicate or repeat-risk bills
2. first-time suppliers with unusually large values
3. familiar suppliers with abnormal amount spikes
4. higher-context fraud or trust signals such as bank-detail changes
5. grouped or pattern-based risks across multiple bills

---

## Core framing

Safety Shield is **not** the same thing as Bill Approval or Bill Runner.

- **Safety Shield** scans bills and related signals for risk, then explains and routes the issue.
- **Bill Approval** handles approval rules, routing, and handoff once a bill needs a decision.
- **Bill Runner / Cashflow** handles timing, liquidity, and payment-plan optimization.

The job of Safety Shield is to answer:

- Does this bill deserve a second look?
- Why?
- How certain is the system?
- What is the safest next action before money moves?

## Where the agent remit starts and stops

### Safety Shield starts here

- detect risky bills or risky patterns
- explain why the system is concerned
- assign a risk level and confidence posture
- route the bill into the safest next action lane

### Safety Shield stops here

- it does not own general approval policy design
- it does not own approval routing rules as a whole
- it does not optimize cash timing or payment plans
- it does not replace external fraud investigation or capital products

### Adjacent capabilities

- **Bill Approval:** receives flagged work and handles routing, review, and handoff
- **Bill Runner / Cashflow:** handles timing, liquidity, and planning decisions
- **Spotlight / homepage surfaces:** pull urgent Safety Shield issues into view proactively

## How we might solve it

The likely first-pass approach is:

1. monitor bills and related signals continuously
2. run deterministic checks and simple heuristics
3. produce plain-language evidence, not just a score
4. interrupt flow only when the signal is strong enough
5. give the user a clear next action:
   - approve anyway
   - request review
   - hold / remove from flow
   - investigate externally

## High-level journey steps

The current preferred journey is:

1. **Monitor**
2. **Detect / flag**
3. **Provide evidence**
4. **Take action**
5. **Capture audit trail and learn from the outcome**

## How and where this could appear in Xero

This work should likely show up in three experience shapes:

1. **Inline risk surfacing**
   Flags in list views, detail views, and approval queues

2. **Evidence-first review**
   A bill detail or side panel that explains why the system intervened

3. **Proactive summaries**
   Spotlight-style summaries that pull important issues to the top before the user discovers them manually

This is why Safety Shield should be treated as a **shared detection layer** with multiple UI consumers, not only a single moment in the payment flow.

## Prototype inputs for this week

If the near-term target is a usable experience prototype, the minimum helpful inputs are:

- outcomes we are seeking for customers and Xero
- target customer and the first few problems worth solving
- how the system might solve those problems
- the high-level journey steps
- where those steps appear in Xero
- a short list of assumptions and constraints to prototype against

---

## What needs to be true

These are the current big assumptions / hairy questions to align on before going much further:

1. Xero-only data is sufficient to produce a believable first version for at least a few high-confidence scenarios.
2. Users will trust an interruption if the evidence is simple, specific, and tied to bill history they recognize.
3. Safety Shield should remain a distinct detection layer even if the user experiences it inside approval or payment moments.
4. The first release should prefer human-in-the-loop review over quiet automation.
5. The initial launch surfaces should be narrow enough to feel coherent, rather than trying to appear everywhere at once.

## Universal trigger context

In all scenarios below, the user is in Xero and Safety Shield has already run in the background across the bill lifecycle.

Potential entry points include:

- Bills list
- Bill detail
- Awaiting approval / awaiting payment queue
- Spotlight or proactive homepage surfaces
- Approval review moments immediately before a payment decision

## Primary alert logic

The core trigger for action is when a bill or related supplier/payment event crosses a defined **risk threshold** or matches a deterministic **hard-rule condition**.

Examples:

- Exact or likely duplicate detected
- First-time supplier with unusually large value
- Supplier payment details changed close to due date
- Bill amount materially outside expected range
- Cluster of bills creates unusual business or cash-flow risk

The first version should likely combine:

- **Deterministic rules** for high-confidence problems
- **Heuristics / risk scoring** for lower-confidence anomaly detection
- **Human-in-the-loop review** for anything with meaningful downside

## Working risk categories

1. **Duplicate / repeat risk**  
   The system believes the same obligation may be represented twice.

2. **Supplier trust / fraud risk**  
   The bill is associated with unfamiliar or suspicious supplier behavior.

3. **Business impact / spend risk**  
   The bill may be real, but paying it without review could harm cash position, break policy, or create operational risk.

---

## Scenario A1: Exact Duplicate Before Approval (Highly Solvable)

The system can confidently prevent an accidental double payment.

1. **The notification**
   Bills list badge or approval-lane banner: "Possible duplicate detected. This bill closely matches another bill already in Xero."

2. **Current position**
   - `Bill-101` from `Metro Couriers` for `$1,240`, due in 3 days
   - Matching bill already exists with same supplier, invoice number, amount, and near-identical issue date
   - Existing bill status: `awaiting payment`

3. **The AI plan**
   - Mark `Bill-101` as **high duplicate risk**
   - Show the matching bill side-by-side
   - Recommend: **Do not approve this bill until the duplicate is resolved**

4. **User interaction**
   - User reviews the evidence and confirms it is a duplicate
   - User selects `Archive duplicate` or `Send back for correction`

5. **System action**
   - The duplicate bill is removed from the normal approval/payment path
   - An audit note is added explaining why it was blocked

## Scenario A2: First-Time Supplier + Unusually Large Bill (Highly Solvable)

The system cannot prove fraud, but the bill clearly deserves explicit review.

1. **The notification**
   Bill detail banner: "This is the first bill from this supplier and it is much larger than normal."

2. **Current position**
   - `Quantum Consulting Group` submits a bill for `$18,500`
   - Supplier has `0` prior bills in Xero
   - Bill value is far above the typical historical bill amount

3. **The AI plan**
   - Assign **high risk**
   - Explain the evidence in plain language:
     - no prior supplier history
     - unusually large amount
     - outside normal bill range
   - Recommend: **Route for explicit review before approval**

4. **User interaction**
   - User opens the flagged bill
   - User either approves anyway or requests review from a finance lead

5. **System action**
   - The bill is either released back into flow or diverted into a manual review lane
   - The chosen action is logged for traceability

---

## Scenario B1: Bank Detail Change on a Critical Supplier (Trade-Off)

The system detects a strong fraud signal, but holding payment creates operational risk.

1. **The notification**
   Approval warning: "Payment details changed for a critical supplier 1 day before payment is due."

2. **Current position**
   - `AWS` bill for `$4,000` due tomorrow
   - Supplier is marked or inferred as operationally critical
   - Bank account details changed since the last successful payment

3. **The AI plan**
   The system cannot safely optimize both fraud protection and continuity. It presents two clear options.

   - **Option 1: Hold and verify**
     - Pause payment
     - Trigger a supplier verification step
     - Reduce fraud risk, increase risk of service interruption or late payment

   - **Option 2: Proceed with explicit override**
     - Continue payment despite the risk signal
     - Record that payment was approved against the warning

4. **User interaction**
   - User compares the options and supporting evidence
   - User decides whether fraud risk or operational continuity matters more in this moment

5. **System action**
   - Safety Shield records the chosen action and confidence context
   - Approval flow continues or pauses accordingly

## Scenario B2: Recurring Supplier, Unusual Amount Spike (Trade-Off)

The supplier is familiar, but the bill looks wrong enough to deserve interruption.

1. **The notification**
   Approval banner: "This bill is 4.8x larger than the normal range for this supplier."

2. **Current position**
   - `City Power Co` usually bills between `$850` and `$1,100`
   - New bill arrives for `$4,950`
   - Supplier history is legitimate, but the amount is materially abnormal

3. **The AI plan**
   - Show the normal supplier range and the current outlier
   - Recommend either:
     - **Pause for review**
     - **Approve with override**

4. **User interaction**
   - User checks whether this is a seasonal spike, a meter correction, or a mistake
   - User decides whether to interrupt the payment flow

5. **System action**
   - The bill is either approved with an explicit audit trail or diverted to review

## Scenario B3: Many Small Bills, One Bigger Pattern (Aggregate Risk)

No individual bill is extreme enough on its own, but together they create a risk pattern worth surfacing.

1. **The notification**
   Spotlight or list insight: "Unusual cluster detected: six new marketing spend bills this week exceed your normal monthly pattern."

2. **Current position**
   - Six separate bills from new or low-history suppliers
   - Each bill is moderate on its own
   - Combined value is materially above the normal category or period spend

3. **The AI plan**
   - Group the bills into a single review set
   - Explain that the risk is in the aggregate pattern, not one bill alone
   - Recommend: **Review together before approval or payment**

4. **User interaction**
   - User inspects the cluster as one story instead of six isolated records
   - User decides whether the spend is expected campaign work or something that needs intervention

5. **System action**
   - Bills are either released together, held together, or selectively reviewed

---

## Scenario C1: Helpful but Inconclusive (Unsolvable, but Useful)

The system sees enough smoke to interrupt, but not enough evidence to recommend one confident resolution.

1. **The notification**
   Bill detail banner: "This bill looks unusual, but the system does not have enough evidence to determine whether it is legitimate."

2. **Current position**
   - Supplier has very limited history
   - Amount is somewhat unusual, but not clearly fraudulent
   - No duplicate match is found

3. **The AI plan**
   - Mark the bill as **medium risk**
   - Explain uncertainty instead of overstating confidence
   - Recommend: **Request review or gather more evidence**

4. **User interaction**
   - User requests internal review or checks external context
   - User may add business knowledge not visible in Xero

5. **System action**
   - Safety Shield records the uncertainty and sends the bill into a review path
   - No hard block is applied unless a person confirms it

## Scenario C2: Too Late to Prevent, But Still Worth Catching (Fail Gracefully)

The system detects a problem after payment is already scheduled or completed.

1. **The notification**
   Post-payment warning: "Potential issue detected after payment was scheduled."

2. **Current position**
   - A suspicious or duplicate bill has already moved past the best intervention point
   - Payment may already be queued or sent

3. **The AI plan**
   Safety Shield cannot stop the original event, so it shifts from prevention to containment.

   - Create an incident trail
   - Notify the relevant person
   - Recommend next steps such as supplier outreach, bank follow-up, or internal audit review

4. **User interaction**
   - User acknowledges the issue and begins remediation

5. **System action**
   - The system logs the event, creates follow-up tasks or notifications, and improves the risk history for future checks

---

## Common interaction pattern across scenarios

1. Monitor continuously across the bill lifecycle.
2. Detect a rule violation, anomaly, or risky pattern.
3. Explain the evidence in plain language.
4. Assign a risk level and confidence posture.
5. Route the bill into the safest next action lane.
6. Capture the human decision and audit trail.

The first version should prefer **clear interruption and explanation** over invisible automation.

---

## Data inputs likely required

- Bill header fields: supplier, date, due date, amount, tax, reference number
- Line items and account coding
- Supplier history and frequency
- Historical amount ranges by supplier and category
- Approval and payment status
- Payment method and bank-detail history
- User actions: overrides, review requests, approvals against warnings
- Potential future signals:
  - document similarity / OCR-level duplicate detection
  - network fraud signals
  - cross-customer supplier trust patterns

---

## Open questions

- Which risk signals are strong enough to hard-stop a bill versus merely warn?
- What is the minimum evidence needed for users to trust an interruption?
- How much can be done from Xero-only data in V1?
- Which scenarios should stay in Safety Shield versus belong in Approval Automation or Bill Runner?
- Which surfaces should be first-class in the initial release: bills list, detail, approval queue, Spotlight, or some combination?
- How should the system learn from overrides without becoming opaque?

---

## Working recommendation for first slice

If a narrow first cut is needed, the cleanest likely starting set is:

1. Exact or near-duplicate bills
2. First-time supplier + unusually large amount
3. Familiar supplier + materially abnormal amount spike

These are comparatively explainable, map well to the existing prototype direction, and create a believable human-in-the-loop safety story before moving into richer fraud or network intelligence.
