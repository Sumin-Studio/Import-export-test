# Slack channel C0AGMBC51U0 — from Glean

**Channel:** [C0AGMBC51U0](https://xero.enterprise.slack.com/archives/C0AGMBC51U0) (Bill AI canonical, all hands)  
**Display name in Slack:** temp-payments-ai-everywhere  
**Source:** Glean search (app: slack, channel: C0AGMBC51U0).  
**Date captured:** 2026-02-24.

---

## Summary (alignment for the repo)

- **North star:** This channel is the single source of truth for Bill AI / Payments AI. All status, decisions, prototypes, and coordination aim here.
- **Committed scope (Peter, 23 Feb):** **Chasing agent** and **zero bill entry** — call these out as committed. Other ideas stay “selling the ideas” until feasibility/value is understood.
- **Theme (Bharathi):** Consider framing as **cashflow optimization** vs “payment-super-agent” — customer pain is cashflow; it transcends the payment transaction and accounting-AR-AP concepts.
- **Story / prototypes together (Peter, 23 Feb):** Keep all related prototypes in one narrative: onboarding + cashflow planner, Bills (enrichment + bill runner), Invoicing (JAX + chasing agent), Practice supercharge.
- **Diya review:** Drumbeats leading to next Thursday; async for now (travel). Resourcing kept open; focus on selling the ideas.

---

## Threads and messages (chronological)

### 2026-02-19

- **Chong:** Following Bharathi’s vision, did competitive analysis (Intuit, Sage) and detailed Payments [strategy](https://docs.google.com/document/d/1BDgJYmNWgxYs41AjABFEWQIRpLZ1F2wY_ZMfge2yJ6s/edit?tab=t.mprm97oprra) using the Four Actions framework. Comments welcome.
- **Bharathi:** Tried to move conversation to this channel; something went wrong and the conversation disappeared. Apologised.
- **Chong:** Shared [early draft](https://docs.google.com/presentation/d/1EXwgPuXxWq9TFgkxhVdl7WnapkaOodoOuipjotMQhwg/edit?slide=id.g38ca174e81a_1_492#slide=id.g38ca174e81a_1_492) of AI vision and roadmap. Asked Peter, Darren to meet to align on agent roadmap.
- **Bharathi:** What is xpu? → **Chong:** Sorry, should be **XPH** (Xero Partner Hub).
- **Peter:** Tagged Pratik; later tagged prashant.ranchhod.
- **Luke:** Added a couple into [this deck](https://docs.google.com/presentation/d/1RimHhumBIo5g5ZFqxuKnOHnwg5DfSx_zqyCvCjUfdT4/edit?slide=id.p#slide=id.p); will keep adding more.

### 2026-02-20

- **Peter (to Chong):** Is the strategy doc the bills sprint outcome or separate thinking?  
  **Chong:** Separate thinking; added into the existing AI workshop doc.  
  **Peter:** All good.
- **Peter:** On the creation line we already do that today for invoices — you ask JAX to create one; it works pretty well.
- **Pratik:** Catching up. One thought: the accounting platform as “system of record” is often not an accurate representation of the business — info in heads, emails, docs, other platforms never makes it to Xero, or is too late to action. “The map is not the territory.” Examples: trade accounts/supplier credit in construction; inventory/ERPs (e.g. Cin7) with POs, deliveries, quality that affect whether bills get paid. The more we bridge map and territory (data models, ecosystem), the better for AI.  
  **Chong:** Is this an ecosystem discussion we can have re bringing in the data? Regardless, seems orthogonal to our AI approach; thoughts?
- **Chong:** Drumbeats for Diya review next Thursday. Moving pieces and action items; many traveling so async for now. On **resourcing/trade-offs:** Decided not to highlight Xerocon vs within buffer vs unplanned — many at early stage, feasibility unclear. Keep resourcing support open; focus on selling the ideas. Bharathi, thoughts?

### 2026-02-21

- **Bharathi:** Agree — we don’t know feasibility for most, so no point talking resource till we understand feasibility/value.
- **Bharathi:** Thanks for jumping on. This is another swarming exercise, but unless we get on this train en masse we’ll piecemeal our way to an insipid future. We need escape velocity; this is our “yet-another-reinvention” moment.
- **Bharathi:** On overarching theme: lean in on **cashflow optimization** vs payment-super-agent. Customers frame pain as “I need to collect money ahead of delivering the service” and other cashflow themes. Cashflow transcends the payment transaction and accounting-AR-AP; it’s the main stressor.

### 2026-02-23

- **Peter (to Chong, Jon, David):** As we prototype and tell the story, we should have all related prototypes together. E.g.  
  - **Theme 1:** Onboarding + cashflow planner — take pain out of onboarding, get you on a cashflow plan; connect bank and we predict bills for an accurate cashflow view.  
  - **Bills:** Reduce bill entry to one click (bill enrichment); approving and scheduling as simple as a second click (bill runner).  
  - **Invoicing:** Create invoice in one sentence with JAX; once sent, chasing agent creates a personalised plan to get you paid on time.  
  - **Practice supercharge:** Scale with one prompt; personalised cashflow plans for clients so you focus on connection.
- **Peter:** For the two we have **committed** to — **chasing agent** and **zero bill entry** — we can call these out as committed.
- **Peter:** We could visualise which parts of the customer journey the agents operate in. Using the jobs-to-be-done framework is a simple way to articulate tasks. [Example](https://docs.google.com/presentation/d/1EXwgPuXxWq9TFgkxhVdl7WnapkaOodoOuipjotMQhwg/edit?slide=id.g3ca43dd3105_0_133#slide=id.g3ca43dd3105_0_133): invoicing agents linking back to “getting paid” JBTD. The tasks aren’t radically changing (SB wants to get paid, customer needs to pay) but we’re proposing a fundamental shift: from laborious and emotional to as simple as a prompt or a click.
- **Jon:** Hi team, look for some updates tomorrow. Following along here and working with Chong, Lili, David and team in other channels. Great context, very helpful.

---

## Key links from channel

| Description | URL |
|-------------|-----|
| Payments strategy (Four Actions) | https://docs.google.com/document/d/1BDgJYmNWgxYs41AjABFEWQIRpLZ1F2wY_ZMfge2yJ6s/edit?tab=t.mprm97oprra |
| AI vision and roadmap (early draft) | https://docs.google.com/presentation/d/1EXwgPuXxWq9TFgkxhVdl7WnapkaOodoOuipjotMQhwg/edit?slide=id.g38ca174e81a_1_492 |
| Invoicing agents ↔ JBTD example | https://docs.google.com/presentation/d/1EXwgPuXxWq9TFgkxhVdl7WnapkaOodoOuipjotMQhwg/edit?slide=id.g3ca43dd3105_0_133 |
| Luke’s deck (adding items) | https://docs.google.com/presentation/d/1RimHhumBIo5g5ZFqxuKnOHnwg5DfSx_zqyCvCjUfdT4/edit |

---

## How to refresh this doc

1. In **Glean**, search with `app: slack`, `channel: C0AGMBC51U0`, and keywords or `*` with `exhaustive` + `sort_by_recency` for full channel pull.
2. Paste new threads/messages into a new section or a new dated file (e.g. `yyyy-mm-dd-slack-channel-C0AGMBC51U0-from-glean.md`).
3. Add the snapshot to the [canonical Slack doc](../reference/2026-02-24-slack-channel-canonical.md) table.
