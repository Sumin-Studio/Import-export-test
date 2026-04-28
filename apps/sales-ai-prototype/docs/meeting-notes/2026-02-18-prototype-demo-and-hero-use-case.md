# Bill Pay Agent — Prototype Demo & Hero Use Case (18 Feb 2026)

**Attendees:** Jon Bell, Neeraj Sahu, Tauqir Ahmed, Chong (and others)
**Meeting:** Bill Pay Agent PoC — Prototype walkthrough and hero use case definition

---

## Tauqir's Demo

- **Slide-in panel** (JAX-like experience) — replaced bottom-right chat icon based on Angus/Jon feedback
- Running locally with mocked bill data via Portkey LLM gateway
- Demo flow:
  1. Bill overview with unpaid totals across suppliers
  2. Immediate attention section (2 overdue bills — 13 and 8 days)
  3. Upcoming bills due within next few days
  4. Current bank balance integration from mocked bank feed
  5. Cash position analysis showing inability to pay everything at once

### Supplier Intelligence

- Historical payment pattern analysis (7 payments to recurring supplier)
- Anomaly detection (supplier billing 67% more than usual $3,000 average)
- Payment timing insights (typically pays 1–2 days before due date)

### Planning Goals

- Three goal options: **Conservative**, **Standard**, **Growth**
  - Conservative: Protect cash buffer, pay only urgent bills
- User selects goal → system readjusts recommendations
- Cash impact breakdown: which suppliers get paid immediately, which deferred, cash flow position warning

---

## Feedback

### Neeraj
- Great start but **information overload** concern
- Suggests predefined question categories/sections
- Need specific follow-up questions for planning

### Chong
- Explore **different UI approaches beyond chatbot**
- Table format with hyperlinks for actions
- User editing capabilities for cash reserves and supplier preferences
- **Plan mode before execution** (backstage concept)

### Team consensus
- Need approval/confirmation flow before actual payments

---

## Hero Use Case (defined)

Core user journey:
1. Analysis of overdue and upcoming bills
2. Anomaly flagging for attention
3. Recommendations for immediate vs deferred payments
4. User review and fine-tuning capability
5. Cash flow position shown throughout
6. Final payment execution

Three entry points:
- "Can I afford to pay my bills this week?"
- "Show me high-risk/critical bills"
- "Give me payment recommendations"

---

## Technical Notes

- Multi-turn conversational agent with flexible backend
- API response payload shapes UI variations
- Portkey LLM gateway integration
- Local env challenges: FortiClient vs GlobalProtect VPN
- **No actual payment execution** — Melio integration requires handoff to iframe/web SDK
- Cash flow data possibilities: existing Cash Flow Manager (SIFT), payroll data, historical payments

---

## Next Steps

| Owner | Action |
|-------|--------|
| Jon | Get local environment running for rapid Cursor-based prototyping |
| Jon | Generate multiple UI variations quickly via Cursor |
| Team | Presentation approach: aspirational demo showing end-to-end + static screens showing full journey |
| Team | Separate mock prototype for aspirational "payment complete" moment |
| Team | NY workshop (Feb 23–26) as progress sharing, not endpoint |

---

Chat with meeting transcript: [Granola link](https://notes.granola.ai/t/5fea31b6-c724-4843-8dcb-02a9696c5c2d)
