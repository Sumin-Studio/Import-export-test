# Bill Pay Agent — Design Brief for Prototype Screens

## What this is

A cash-flow aware bill payment agent for Xero. It analyses your bills, flags anomalies, recommends what to pay now vs defer, and lets you fine-tune the plan before executing. US market, Swimlane 1 (bill preparation and planning).

This prototype is static screens telling the story for the Melio NYC offsite (Feb 23–26). The real working demo (Tauqir's API) follows as the "mic drop."

## The experience has three modes

### 1. Homepage Spotlight (entry point — the user didn't ask for this)

A proactive card on the Xero dashboard/homepage. The user logs in and immediately sees their bill situation. This is the discovery moment — they don't know they need the agent yet.

Content:
- "You have X bills due this week totalling $Y"
- "2 bills are overdue (13 and 8 days)"
- "Your current balance is $Z — you can't cover everything"
- A clear CTA: "See payment plan" or "Review bills"

This is NOT tucked in the nav. It's front and centre. The assertion is: the agent comes to you.

### 2. JAX Panel (small — side panel interaction)

The user clicks the spotlight card or opens JAX and asks about bills. The agent responds in the existing JAX side panel.

Content:
- Bill overview: unpaid totals by supplier
- Anomaly flags: "Supplier X is billing 67% more than their $3,000 average"
- Quick recommendations: "Pay these 3 now, defer these 2"
- Entry points (user can ask): "Can I afford to pay my bills this week?" / "Show me high-risk bills" / "Give me payment recommendations"

Key feedback to address:
- Neeraj: information overload risk — use predefined sections/categories, not a wall of text
- Chong: table format with hyperlinks, not just chat bubbles

### 3. Big JAX / Full Experience (modal or full-screen — the planning workspace)

The user wants to actually work with the plan. This is where they review, fine-tune, and confirm.

Content:
- **Goal selection**: Conservative (protect cash buffer) / Standard / Growth
- **Payment plan table**: columns for Supplier, Amount, Due Date, Status (Pay Now / Defer / Overdue), Recommended Action
- User can edit: change cash reserve amount, override supplier priority, drag bills between pay-now and defer
- **Cash flow position**: running total showing balance after each payment
- **Anomaly detail**: expandable rows showing supplier history, payment patterns, why something is flagged
- **Confirm and execute**: final review before payment (aspirational — Melio handoff in reality)

## Hero use case flow (the story these screens tell)

1. Log in → homepage spotlight shows bill situation (Screen 1)
2. Click through → JAX panel with overview and anomaly flags (Screen 2)
3. Expand to full experience → goal selection and plan table (Screen 3)
4. Fine-tune the plan → edit cash reserves, override recommendations (Screen 3 variation)
5. Cash flow position updates in real-time as you adjust (shown throughout)
6. Confirm → payment execution (Screen 4 — aspirational)

## Data to show in the prototype

### Bills
- 5–8 bills from 4–5 suppliers
- 2 overdue (one 13 days, one 8 days)
- 3 upcoming (due within 5 days)
- 1–2 not urgent (due in 2+ weeks)
- Total unpaid: ~$47,000

### Suppliers (with intelligence)
- **Acme Corp**: recurring, 7 previous payments, average $3,000 — current bill $5,000 (67% anomaly)
- **CloudSync Solutions**: consistent, always paid 1–2 days before due
- **Metro Office Supplies**: small, low priority
- **TechParts Inc**: overdue 13 days, critical supplier

### Cash position
- Current bank balance: ~$32,000
- Total bills: ~$47,000
- Gap: ~$15,000 shortfall
- After conservative plan: ~$8,000 remaining

## Design direction

- **JAX-aligned** — match Xero's AI experience visual language
- **Beyond chatbot** — tables, cards, structured data. Not just chat bubbles.
- Multimodal: the same agent shows up as a spotlight card, a JAX response, and a full planning workspace
- The story is: it comes to you, it's smart, and it lets you stay in control

## What exists already

- Tauqir's working API: FastAPI + Portkey LLM gateway, returns bill analysis, supplier intelligence, payment plans with conservative/standard/growth modes
- JAX component library (JAX and Big JAX patterns)
- Homepage spotlight card pattern from the concept catalog
- Walkthrough slides on Vercel: https://blue-superfast-jellyfish.vercel.app
