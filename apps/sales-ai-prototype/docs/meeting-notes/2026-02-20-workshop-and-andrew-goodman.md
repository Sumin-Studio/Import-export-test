# Bill Pay Agent — Workshop & Andrew Goodman AI Discussion (20 Feb 2026)

**Meeting:** Bill Pay Agent PoC Workshop
**Transcript:** [Granola](https://notes.granola.ai/t/db26e83b-8fe3-4aba-b443-e8de007ae481)

---

## Andrew Goodman AI Discussion Insights

- Director of Product AI provided guidance on LLM usage for bill pay agent
- Key recommendation: avoid LLM for core data processing
  - Use traditional code for number crunching and calculations
  - LLM only for natural language UI translation
  - Reduces non-deterministic errors and need for extensive guardrails
- Chatbot interface requires significant work
  - Recommend pre-planted questions/chips instead of open field
  - Dynamic but guided interactions preferred
- Embedded sparkle triggers (like awaiting payments) more effective than drawer-based chat

## Design Prototype Progress

- Jon delivered three swim lane prototypes
  - 15+ screens in working Figma prototype
  - Team reaction: "You're hired" and "AI super weapon"
  - Generated 30+ actionable comments for iteration
- Storytelling framework impressed Dorothy and Peter
  - Pete requesting similar approach for other projects
  - Strong foundation for DIA presentation

## Design Evolution

- Team realized initial approach too wordy and multi-step
- Shifted from checklist approach to dashboard-first experience
- Exploring 2-3 click flows instead of complex multi-screen journeys
- Considering email/WhatsApp integration for approvals

## Swim Lane 1: Bill Payment Planner

- Conservative/Standard/Growth scenarios with cash flow visualization
- Progressive disclosure approach — show complexity when needed
- Key recommendations:
  1. Start from awaiting payments with contextual sparkle
  2. Show 3-click simple path vs complex planner path
  3. Demonstrate click reduction (vs current 23 clicks in competitors)
- Trust thermostat concept — balance speed vs control based on user comfort
- LLM integration for explaining anomalies (40% payment increases, new suppliers)

## Swim Lane 2: Approval Workflow

- Two-person flow: Sarah (requester) and Alex (approver)
- Technical challenges with Melio integration
  - No API access for iframe modifications
  - User roles/permissions still being defined
- Proposed split into two agents:
  1. Risk detection/anomaly flagging (isolated from approval)
  2. Batch approval with email notifications and chasing
- Email-based workflow with structured communication

## Swim Lane 3: Just Pay Feature

- Voice-activated payment initiation
- Simple flow: voice → review → one-click payment
- WhatsApp integration potential for approvals
- UK open banking developments may enable smoother authorization
  - 50% confidence ready by end of year
  - Could skip traditional payment authorization steps

## Next Steps

| Owner | Action |
|-------|--------|
| **Jon** | Deliver prototype URL by end of day |
| **Team** | Async feedback throughout next week |
| **Neeraj** | Start PRD documentation for SL1 and SL2 |
| **Tauqir** | Refine PoC architecture based on Andrew's guidance |
| **Chong** | Strategy deck for DIA presentation |
| **Team** | Feasibility assessment for Melio integration post-next week |

## Key Technical Notes

- Anomaly detection and duplicates identification
- Define heuristic rules for risk flagging
- Tiered approach: simple features for standard users, advanced for sophisticated users
- Xerocon timeline: 90 days for delivery of 2+ agents (bill pay and approval variants)
