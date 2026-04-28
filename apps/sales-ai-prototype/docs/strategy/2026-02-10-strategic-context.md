# Bill AI Automation - Strategic Context

## The Transformation

```
BEFORE                          AFTER
─────────────────────────────────────────────────────
System of Record          →     System of Action
Laborious                 →     Autonomous
Data Entry                →     Review & Approval
Manual Workflow           →     Intelligent Agent
```

## The Problem

### Low Adoption Despite High Value
- **Only 10%** of Xero users create bills
- **Only 1%** use bill payments
- The manual effort required exceeds perceived value for most users

### Broken Cash Flow Visibility
- **25% of bills** are created *after* they've already been paid
- This breaks cash flow forecasting - the primary value proposition
- Users are doing just enough to reconcile, not plan

### The Effort-Value Mismatch
Current workflow requires users to:
1. Receive invoice (email, mail, portal)
2. Manually enter bill details
3. Match to existing contacts/accounts
4. Set payment terms
5. Route for approval
6. Schedule payment
7. Execute payment
8. Reconcile

**The ask is too high** for the perceived value, so users skip steps or skip the feature entirely.

## The Vision

### "Ready to Pay" on Creation

An AI agent that transforms bill creation into bill *arrival*:

1. **Capture**: Invoices arrive via email, upload, or API
2. **Extract**: AI pulls structured data from invoice
3. **Match**: Agent matches to existing contacts, accounts, prior bills
4. **Enrich**: Adds payment terms, due dates, coding suggestions
5. **Route**: Applies business rules for approval routing
6. **Present**: User sees a "ready to approve" bill, not a form to fill

### The User's New Job
- **Before**: Data entry clerk
- **After**: Approver and exception handler

## Strategic Positioning

### Connection to Payments-First Vision

This is the **"Pay Out" pillar** of interwoven payments:

```
┌─────────────────────────────────────────────────────────┐
│                 INTERWOVEN PAYMENTS                      │
├──────────────────┬──────────────────┬───────────────────┤
│     PAY IN       │    PAY OUT       │   MOVE MONEY      │
│                  │  ◄── THIS ───►   │                   │
│  Invoice → Paid  │   Bill → Pay     │  Rails & Routing  │
└──────────────────┴──────────────────┴───────────────────┘
```

### Market Differentiation
- **Current competitors**: Focus on extraction only
- **Xero opportunity**: End-to-end automation from receipt to payment
- **The moat**: Integration depth across bills, payments, bank feeds, and contacts

## Key Constraints

### The Melio API Problem
> "Without APIs, there is no meaningful AI - and Melio doesn't currently expose APIs"
> — Angus Tait

For US market specifically:
- Melio handles US bill pay
- Current integration is UI-based
- No programmatic access for AI agent patterns
- This constrains what's possible in H1 FY27

**Sprint scope (Chong):** Need clarity: are we generating ideas that *don’t* rely on APIs (this year), or concepts for *future* delivery once APIs exist? POC sprint doc captures this as an open question for the workshops.

### Timeline Pressure
- **Xerocon June 2026**: First public milestone
- **Aggressive timeline**: Requires focused scope
- **"Zero" Bill Entry** must be demonstrable, not complete

### Baseline Approvals Before AI (Angus & Chong)

**Reality:** We don't currently have a baseline approvals workflow in place. Many known customer pain points could be addressed by first shipping a **simple, deterministic approval model** (e.g. dual-approval, auto-pay bills under a threshold). Without that foundation, it's hard to define which problems AI can actually solve.

**The question:** Are we predicting problems that will arise once we have approval flows? Or defining AI-solvable problems without the foundational flows?

**Chong's alignment (explicit):**
1. **AI should solve existing problems**, not ones that don't exist yet.
2. **Baseline workflow must exist first.** We have a solid understanding of how the baseline looks (functionality); the workshop is to identify what we can build *on top* where AI can be highly impactful.
3. **Acknowledge the gap.** It can feel like "cart before the horse." Be intentional throughout: name the gap between what we have today vs. the near future.

Implication for the POC: Scope AI opportunities that either (a) don't depend on approval flows, or (b) are clearly "on top of" a defined baseline we're committed to shipping.

## Success Metrics (Proposed)

### Leading Indicators
- Time from invoice receipt to "ready to approve" status
- Accuracy of auto-extracted fields
- User acceptance rate of AI suggestions

### Lagging Indicators
- Increase in bill creation rate
- Decrease in "created after paid" bills
- Bill payment feature adoption

## Phased Approach

### Phase 1: "Zero" Bill Entry (Xerocon June 2026)
- Focus on extraction and matching
- Demonstrate the "bills arrive ready" experience
- Scope: Core markets, PDF invoices, existing contacts

### Phase 2: "Zero" Bill Approval (H2 FY27)
- Add workflow automation
- Smart routing based on amount, vendor, category
- Integration with approval chains

### Phase 3: "Zero" Bill Payment Scheduling (TBD)
- Optimal payment timing suggestions
- Cash flow-aware scheduling
- Multi-bill batch optimization

## Related Initiatives

- **POC Sprint (Feb 9–17):** Agent for Bill Workflow Automation — 2-week agentic prototype; US/Melio, post-approval journey. Workshops #1–5; core PM/ENG/DES/PMM. See [docs/poc-sprint-agent-bill-workflow.md](poc-sprint-agent-bill-workflow.md).
- **Naming:** Jenny asked Chong to confirm this work = "Bill Automation Agent" = **Opportunity 2** in AI Opportunities in Payments doc. Pending Chong's confirmation.

## Open Questions

1. **Xerocon Demo Scope**: What's the minimum viable demonstration?
2. **US Path**: How do we work around Melio API constraints?
3. **Agent Patterns**: Which of Brett's agent patterns apply?
4. **Approval Integration**: Sequence with or after entry automation?
5. **Sprint scope (Chong)**: Ideas that don’t rely on APIs (this year) vs. concepts for future delivery?
6. **Melio baseline metrics**: Request from Jenny — get baseline metrics from Melio to measure agent impact; Chong supportive if data exists.

## Key Stakeholders

| Stakeholder | Interest | Influence |
|-------------|----------|-----------|
| David Brown | Strategic alignment, FY27 planning | High |
| Angus Tait | Platform constraints, Melio reality | High |
| Chong Xu | AI opportunity identification | Medium |
| Pratik Rathod | AP platform roadmap | Medium |
| Jenny Nedanovski | Payments product integration | Medium |
| Brett Edmonds | Agent architecture patterns | Medium |
| Thomas | Direct product collaboration | High |
