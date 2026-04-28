# David feedback (23 Feb) — analysis and elevator pitches

**Context:** Jon sent async update to David and Angus (story spine, 3-click dashboard-first, WhatsApp for approver, agent surfaces for Just Pay). David replied with top-line reflections. He had not yet seen the new storyboard/story stuff.

**Source:** David Brown, Slack, 23 Feb (approx).

---

## What David said (paraphrased + direct)

1. **What/why for Diya:** Agree that "how we got there" isn't important for Diya/exec meeting. It's the **what** we're proposing that's being evaluated. Also make sure the **why** is clear.

2. **Three concepts — elevator pitch:** "I'm trying to understand the 3 concepts. We have: Bill pay planner. Intelligent Bill Pay. No Bill, Bill pay. Correct? What's the elevator pitch for each of these ideas."

3. **XUI:** Don't stress XUI at this point. Directional UI is key.

4. **Delivery interface mechanic (main design point):** Don't put everything in a side panel. For some use cases, given the real estate, consider:
   - **Integrated into a workflow** (in-context, not drawer)
   - **Alternative channels** (e.g. WhatsApp, other surfaces)
   - JAX has evolved: e.g. **embedded into the invoice flow**, or **larger (double-width) JAX panel** for more complex interactions.
   - The **ideal** is "simple 2–3 click and done" — the **how** (how it's communicated, how it becomes an interaction experience) **varies by use case**.

5. **Checkpoint and visibility:** Review checkpoint with David prior to Diya, this week. Send to **Che** for visibility (not a pre-check).

---

## Analysis

- **Alignment:** David is endorsing the "2–3 click and done" ideal and is open to **varied** delivery (dashboard, WhatsApp, agent). That matches the story spine (dashboard-first for SL1, WhatsApp for approver, agent for Just Pay).
- **Gap he's flagging:** Right now the prototypes are all "side panel." He wants the **delivery interface** to be explicit and varied: inline / embedded vs alternative channels vs larger panel, depending on the use case. So the pitch to him (and Diya) should **name the mechanic** per concept: e.g. "This one we show in the dashboard and bills view; this one the approver sees in WhatsApp; this one could be in ChatGPT."
- **Ask:** He explicitly wants **elevator pitches** for the three ideas so he can evaluate the "what" and "why." Providing those below.
- **Actions:** (1) David review checkpoint this week. (2) Send to Che for visibility.

---

## Elevator pitches (for David / Diya)

**Concept 1 — Bill Payment Planner**

*"We tell you which bills to pay this week and when, so you don't have to think. You see a recommendation upfront (e.g. on the dashboard or bills screen), tap to accept or tweak, then pay. Three clicks when you trust it; you can always drill in for plan mode, anomaly checks, and cash impact. The agent does the planning; you approve. Over time we can make it automatic — 'do this every week.'"*

**Why it matters:** Cuts 21+ clicks to 3, reduces cognitive load, turns bills from manual triage into "review and approve." Fits Zero Bill Entry and Do It For You.

**Delivery:** Dashboard / bills view first (inline, not side panel); optional chat for "show your work" or deeper planning.

---

**Concept 2 — Intelligent Bill Approval (David said "Intelligent Bill Pay"; same idea)**

*"When bills need a second pair of eyes, we flag what's risky and route approval to the right person — but they don't have to open Xero. The approver gets a WhatsApp (or email): 'Here are 5 items; 4 look good, 1 needs a look.' One tap to approve the clean ones, link to Xero for the exception. No more chasing; the agent sends the nudge."*

**Why it matters:** Approval becomes a 30-second task in the channel they already use, not a login-and-click workflow. Safety Shield (anomalies) + approval automation in one story.

**Delivery:** Requester may use in-product (bills/chat); approver experience is **alternative channel** (WhatsApp/email). Not everything in a side panel.

---

**Concept 3 — No-Bill Bill Pay (Just Pay)**

*"Pay someone without creating a bill first. You say it — in Xero or in your agent (e.g. ChatGPT) — we create the record and run the payment. Review, confirm, done. The 'wow' is the agent just doing it: 'Pay Joel $500' → 'Done. I've created the bill and scheduled the payment.'"*

**Why it matters:** Removes the biggest friction for small, one-off payments; speaks to "zero bill entry" and agent-led experience. Fits where the industry is going (agents, not just in-product UI).

**Delivery:** Can be in-product (Just Pay entry) or **in an agent** (ChatGPT, etc.). Payoff can include a confirmation in WhatsApp. Varied by use case.

---

## One-liner for David

*"Three concepts: (1) Bill Payment Planner — we recommend, you approve, 3 clicks. (2) Intelligent Bill Approval — we flag risk and send approval to the right person in WhatsApp; they tap, done. (3) Just Pay — you say it (in Xero or in your agent), we create the bill and pay; no forms. The delivery mechanic varies: dashboard for 1, WhatsApp for 2, agent or in-product for 3 — not everything in a side panel."*

---

## Suggested next steps

- Share elevator pitches (or one-liner) with David in reply or at checkpoint.
- At checkpoint: show story spine + **explicitly call out delivery interface per concept** (dashboard / WhatsApp / agent).
- Add Che to distribution for Diya send; note "for visibility, not pre-check."
- Update PROJECT-STATUS with checkpoint and Che visibility.
