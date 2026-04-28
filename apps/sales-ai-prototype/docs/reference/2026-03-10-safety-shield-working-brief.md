# Safety Shield
## Working Brief

**Date:** 2026-03-10  
**Audience:** Product, Design, Engineering, Data Science, and Leadership  
**Status:** Working draft  
**Purpose:** Define the problem Safety Shield solves, how it should work at a high level, where it fits in Xero, and which scenarios are most useful for an initial prototype.

---

## Research basis

This brief is **not** based on cited user research. It is grounded in product and stakeholder alignment (kickoff with Rory, Tauqir, Jon; Chong/Bharathi strategy; Bill AI workshop problem scoring), competitive framing (Ramp, BILL, QBO, Brex safety/fraud features), and related internal work on approvals and duplicate detection. A customer research plan for the agent suite — including Safety Shield — was called out at the AI Agent Squad kickoff (2026-03-06) as required (Merv/David); that plan is the intended follow-up to validate assumptions with users.

For a full picture of what existing research is relevant, what we do not yet know, and recommended next steps, see **[Safety Shield: user research and gaps](2026-03-10-safety-shield-user-research-and-gaps.md)**.

---

## Executive Summary

Safety Shield is a bill-risk detection layer designed to help customers avoid paying the wrong thing, paying twice, or missing a suspicious signal before money moves. Its role is not to optimize payment timing or own approval workflow end to end. Its role is to identify bills and bill patterns that deserve a second look, explain why they are risky, and route the user into the safest next action.

The opportunity is to shift bill approval from a manual, flat review process into an exception-based experience. Instead of making approvers inspect every bill with equal effort, Safety Shield should elevate the small number of bills that look duplicated, unfamiliar, abnormal, or operationally risky.

The recommended first slice is narrow and explainable:

1. Exact or near-duplicate bills
2. First-time suppliers with unusually large bill values
3. Familiar suppliers with materially abnormal amount spikes

These scenarios map well to the current prototype direction, are easier to explain to users, and create a credible human-in-the-loop story for an initial release.

---

## The Problem

Customers currently carry too much responsibility for catching obvious AP risk manually. In practice, this means:

- duplicate bills can slip through the workflow
- unusual supplier behavior can appear without enough context
- abnormal bill values require manual checking and judgment
- approvers are often forced into blind review rather than evidence-backed decisions
- some risks are only discovered close to payment time, or after the fact

For a business owner, finance lead, or approver, the problem is simple: they want to move quickly, but they do not want to accidentally approve a duplicate, miss a suspicious change, or send money where it should not go.

Safety Shield exists to reduce that cognitive burden by helping Xero surface the bills that matter most.

---

## Why It Matters

This work matters for both customers and Xero.

### Customer value

- Protects cash flow from avoidable loss caused by duplicates, suspicious bills, or poor approval decisions
- Reduces the effort required to review bills safely
- Improves confidence in using Xero as a place to approve and pay

### Business value for Xero

- Strengthens Xero’s position as an active system of protection, not just a passive system of record
- Supports the broader “protect cash flow” narrative alongside Bill Runner and Approval Automation
- Creates a reusable detection capability that can appear across multiple surfaces

### Competitive value

Some capabilities in this space are already table stakes, particularly duplicate detection and basic audit logging. More differentiated value is likely to come from:

- anomaly detection that is easy to understand
- supplier trust and change detection
- suspicious payment-detail changes
- grouping risky activity into a coherent story
- making the next action easy, rather than simply raising an alert

---

## What Safety Shield Is

Safety Shield is a shared detection and evidence layer for bill risk.

Its job is to answer four questions:

1. Does this bill deserve a second look?
2. Why does it deserve a second look?
3. How certain is the system?
4. What is the safest next action before money moves?

At a high level, Safety Shield should:

- monitor bills and related signals continuously
- detect anomalies, suspicious patterns, or hard-rule violations
- explain the evidence in plain language
- assign a risk level and confidence posture
- route the bill into the safest next action lane

---

## What Safety Shield Is Not

Safety Shield should remain distinct from adjacent capabilities.

### Not Bill Approval

Bill Approval owns routing, approval policy, review flow, and handoff decisions once a bill needs human action.

### Not Bill Runner

Bill Runner owns payment timing, liquidity management, and plan optimization.

### Not a full fraud investigation system

Safety Shield can detect and elevate risk, but it does not replace deeper verification, external remediation, or capital solutions.

This distinction matters because Safety Shield may appear inside approval or payment moments, but its remit is still detection, explanation, and routing.

---

## Product Shape

Safety Shield works best as a shared capability with multiple UI consumers, not as a single isolated feature.

The most likely experience shapes are:

### 1. Inline risk surfacing

Flags in bills lists, approval queues, and payment preparation moments.

### 2. Evidence-first review

A bill detail or side panel that explains why the system intervened and what the user should do next.

### 3. Proactive summaries

Spotlight-style surfaces that pull the most important issues to the top before the user discovers them manually.

This leads to a simple journey:

1. Monitor
2. Detect or flag
3. Provide evidence
4. Take action
5. Capture the decision and audit trail

---

## Target User

The initial target user is likely a small or medium business customer who is approving or preparing bills for payment.

This could include:

- business owners
- finance managers
- office managers
- approvers responsible for releasing supplier payments

The common need is not deep forensic analysis. It is quick, trustworthy support at the moment a decision matters.

---

## Initial Problems To Solve

The first set of problems should be narrow, believable, and easy to explain.

### Recommended sequence

1. Duplicate or repeat-risk bills
2. First-time suppliers with unusually large bill values
3. Familiar suppliers with abnormal amount spikes
4. Higher-context fraud signals, such as bank-detail changes
5. Pattern-based risk across multiple bills

The first three are the strongest candidates for an initial prototype because they are concrete, understandable, and already align with the current Safety Shield prototype direction.

---

## Scenario Summary

### Highly solvable scenarios

**Exact duplicate before approval**  
The system identifies a likely duplicate with strong evidence and recommends blocking or removing it from the normal flow.

**First-time supplier with unusually large bill**  
The system cannot prove fraud, but the bill is clearly risky enough to require explicit review.

### Trade-off scenarios

**Bank-detail change on a critical supplier**  
The system detects a strong fraud signal, but delaying payment introduces operational risk.

**Recurring supplier with an abnormal amount spike**  
The supplier is known, but the bill value is outside the normal range and needs explanation.

**Many small bills, one bigger pattern**  
No single bill is alarming by itself, but a cluster creates a meaningful risk story.

### Fail-gracefully scenarios

**Helpful but inconclusive**  
The system sees enough to interrupt, but not enough to recommend one confident path.

**Too late to prevent, but still worth catching**  
The system identifies a problem after scheduling or payment, so the value shifts from prevention to containment and follow-up.

---

## Logic Principles

The first version should likely combine three things:

### Deterministic rules

Use high-confidence checks where the system can act strongly and explain clearly.

Examples:

- exact or near-duplicate matches
- known hard-rule violations
- payment-detail changes close to due date

### Heuristics and risk scoring

Use lighter anomaly logic where certainty is lower but the signal is still worth surfacing.

Examples:

- first-time suppliers
- abnormal supplier amount ranges
- unusual clustered spend patterns

### Human-in-the-loop control

The early experience should favor interruption, explanation, and traceability over invisible automation.

Likely actions include:

- approve anyway
- request review
- hold or remove from flow
- investigate externally

---

## Data Inputs Likely Required

The first version will likely depend on:

- supplier identity and bill history
- invoice or reference numbers
- bill amount, tax, due date, and status
- line items and coding context
- historical amount ranges by supplier or category
- approval and payment state
- payment method and bank-detail history
- override and review decisions captured in-product

Future versions may benefit from:

- OCR-level duplicate detection
- cross-customer trust or fraud signals
- broader network intelligence

---

## What Needs To Be True

The main assumptions to align on are:

1. Xero-only data is enough to produce a believable first version for a few high-confidence scenarios.
2. Users will trust an interruption if the evidence is simple, specific, and recognizable.
3. Safety Shield should remain a distinct detection layer even when embedded inside other experiences.
4. The first release should prefer human review over quiet automation.
5. The launch surfaces should be narrow enough to feel coherent.

---

## Open Questions

- Which signals should hard-stop a bill versus simply warn?
- How much evidence is enough for users to trust the interruption?
- Which scenarios belong in Safety Shield versus Approval Automation or Bill Runner?
- Where should the first release live: bills list, detail, approval queue, Spotlight, or some combination?
- How should the system learn from overrides without becoming opaque?

---

## Recommendation

The best next move is to treat Safety Shield as a focused, explainable protection layer and prototype a narrow first version around the three strongest scenarios:

1. duplicates
2. first-time supplier plus unusually large bill
3. familiar supplier plus abnormal amount spike

From there, the team can test:

- whether the evidence feels trustworthy
- whether the interaction pattern feels useful in-product
- where the experience should live in Xero
- which additional signals are worth investing in next

---

## Related Documents

- [Safety Shield: user research and gaps](2026-03-10-safety-shield-user-research-and-gaps.md) — what this brief is based on, related research, known gaps, next steps
- [Safety Shield detection scenarios and logic flows](2026-03-10-safety-shield-detection-scenarios-and-logic-flows.md)
- [2026-03-09 Rory Safety Shield / Bill Approval daily](../meeting-notes/2026-03-09-rory-safety-shield-bill-approval-daily.md)
- [2026-03-06 Safety Shield kickoff](../meeting-notes/2026-03-06-safety-shield-kickoff.md)
