# Bill Pay Agent — David Review & Approach Reframe (25 Feb 2026)

**Meeting:** David review + team alignment
**Transcript:** [Granola](https://notes.granola.ai/t/c4d7760e-05c7-46ae-aba7-b0ad353490ba)

---

## Core Problem with Current Approach

- We're automating the **easiest part** of the workflow (final payment step)
  - All manual work still required: uploading bills, checking details, account codes, approval verification
  - Agent only handles last step where bills are already ready to pay
  - Minimal value add since bills due are typically paid anyway
- Missing the real toil points:
  - Bill entry and OCR scanning
  - Account code verification
  - Approval workflow management
  - Cash flow planning and prioritization
- Key reframe: "Is this even good?" — pressing the pay button is not an agent opportunity. An agent that makes sense of the million steps of a bill (dragging and dropping context into a window and having it sorted out) is the real user need.

## Current Bill Agent Concepts

- **Auto Bill Pay (Bill Runner)**
  - Widget shows "we're handling this for you tomorrow"
  - User can click through to see details and reasoning
  - High confidence items first, lower confidence below
  - "Teach the system" functionality for new scenarios
- **Auto Approval Flow**
  - Widget-based approach for approvals
  - Shows AI reasoning behind decisions
- **Just Pay**
  - Streamlined payment interface concept

## Agent Definition and Realistic Scope

- Brett/Thomas definition: discrete actions with predefined behavioral patterns
- Real agent opportunities in bills workflow:
  - Auto-coding intelligence at bill entry
  - Approval workflow automation and chasing
  - Fraud detection and anomaly flagging
  - Policy-based decision making within defined limits
- Small business reality check:
  - Supplier relationships exist in WhatsApp, personal connections, barbecue conversations
  - Margin pressures mean zero tolerance for payment errors
  - Knowledge graph will never capture relationship nuances

## David's Guidance

- **Homework for deck**: Hollywood slide with 3 hero moments, then use cases and mechanics
- **Keep pushing/thinking**: Jon's call on how deep to go
- Circus tent analogy: banner hooks them in, main event is use cases. Both in tandem.
- For Friday: don't need full UI, could be a window (couple of components) to indicate what each agent is
- "My read is that our CPO will want even more AI (but the focus on agents)"
- David dumping cashflow/AP research from NotebookLM as "Validation Engine"

## Next Steps

| Owner | Action |
|-------|--------|
| **Jon** | 3 hours of drop-in meetings booked tomorrow (Thu) with David and Angus |
| **Jon** | Screenshare walkthrough video for the tiger team channel |
| **Jon** | Push from payment automation to workflow intelligence |
| **Chong** | Presentation deck for Friday DIA meeting |
| **Team** | Follow-up session to redesign approach |
| **Team** | Target bill entry/coding assistance, approval optimization, exception handling |
