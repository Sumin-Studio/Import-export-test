# How to run a great pain-points meeting

**Use when:** You’ve decided the goal is to **find and tag** bill workflow pain points (see [Do we want a pain-points meeting?](workshop-1-do-we-want-pain-points.md) for the alternative: alignment on a pre-made list + scope).

---

## 1. One outcome

**By the end:** A single artefact — a **tagged list of pain points** (post data-entry → payment). Each pain has:
- A short label + one line of what’s wrong.
- A tag: **Today** (exists in current state) or **Once we have approval flow** (assumes baseline we don’t have yet). Optionally: **Needs Melio APIs** if it’s obviously API-dependent.

If you leave without that list, the meeting didn’t land. Add it async and send it round.

---

## 2. Open so the room doesn’t design in a vacuum (5 min)

**Say it out loud.** Otherwise people will name pains that assume a world we don’t have.

- **“We don’t have a baseline approvals workflow in production.”** We’re designing for what we’ll build on top of. Pratik’s team owns creation/approval; we’re post-approval.
- **“Melio don’t have the APIs we’d need.”** So we’ll note when a pain or idea depends on APIs.
- **“Sprint scope is still open.”** We’re not deciding today whether we’re doing API-free ideas this year or concepts for later. We *are* making every pain taggable.

**Optional:** One slide or Miro frame: **What we have today | What we’re assuming | What we’re not assuming.** Fill the first column together in one sentence each.

**Facilitation move:** “We’re going to name pains and tag them. We’re not solving them yet. If we catch ourselves designing a feature, we’ll write the pain and move on.”

---

## 3. Lock the slice (5–10 min)

**Otherwise** people will bring bill creation, data entry, or reconciliation and you’ll lose focus.

- **Who:** SMBs and ABs; toil, cash flow, profitability (from POC scope / Business Model Segments).
- **Where:** Journey *after* the bill is in the system → through to **payment execution**. So: approval (or lack of), release, scheduling, runs, visibility, chasing — not “entering the bill” or “matching the invoice.”

**Say:** “We’re only naming pains in this slice: bill is in Xero, now what happens until payment is executed?”

**If someone names a creation/entry pain:** “That’s real — can we park it and put it on the ‘upstream’ list for Pratik’s team? Today we’re post data-entry.”

---

## 4. Elicit pains without groupthink or solutioneering (20–25 min)

### Structure

- **One pain per sticky** (or row). Short label + one line. No solutions yet.
- **Go round in small bursts:** e.g. “Two pains each,” then “Anyone have something that hasn’t been said?”
- **Use the prep as prompts**, not as the answer. You’re surfacing what *this* room believes and has heard.

### Prompts that work

- “Where do SMBs or ABs **waste time or get stuck** after the bill is already in the system?”
- “What do we hear about **chasing approvers** — who’s late, who’s missing, visibility?”
- “What’s painful about **approval and release** — manual steps, repetitive config, no rules?”
- “What about **payment scheduling and cash flow** — wrong dates, wrong runs, can’t forecast?”
- “When do people say **‘I wish the system would just…’** in this part of the journey?”

### If they jump to solutions

- “What’s the **pain** that would make you want that?” Write the pain; put the idea in a parking lot for Workshop 2.
- “Let’s capture the problem first. We’ll get to what an agent could do in the next workshop.”

### If they’re generic

- “Can we make it **concrete**? Who exactly is stuck — the owner, the bookkeeper, the approver? Doing what?”
- “Is that **today** — with how things work now — or **once we have** an approval workflow?”

### Use the compiled prep to nudge, not dominate

- If the room goes quiet: “From research we’ve heard things like: chasing managers for approvals, manual repetitive payment tasks, inaccurate cash flow forecasting. Do those show up for you?”
- If someone says “we don’t have approvals”: “Right — so some pains are ‘we don’t have this at all’ and some are ‘we have it but it’s painful.’ We’ll tag both.”

**Output:** A board (Miro or doc) with 8–15 pain points, each one line. No solutions on the stickies.

---

## 5. Tag each pain (10–15 min)

**Don’t debate.** Tag fast; note “unclear” and move on.

For each pain, ask:

- **“Is this a problem *today* — with how things work right now — or does the *solution* assume we already have an approval workflow in place?”**

- **Today** = the pain exists in current state; we could imagine addressing it without a full baseline approval workflow.
- **Once we have approval flow** = the pain or the fix assumes that baseline exists (e.g. “approvers don’t get reminded” only matters once we have approvers and a workflow).

Optional third tag: **Needs Melio APIs** when it’s clearly API-dependent (e.g. “agent releases payment in Melio”).

**If stuck:** Default to “Once we have approval flow” and add “(unclear)” so Workshop 2 can tighten.

**Facilitation move:** “We’re not deciding if it’s important. We’re deciding *when* it’s a problem — today or once we have the baseline. Both are valid.”

**Output:** Same list, now with tags. That’s the **one decision** for the meeting.

---

## 6. Quick prioritisation (optional, 5 min)

If you have time and want to set up Workshop 2:

- **“Which of these, if we fixed them, would matter most to SMBs or ABs?”** Dot-vote or “top 3.”
- Or: **“Which are ‘today’ pains we could tackle without an approval baseline?”** Highlight those.

Don’t over-build. A short “these feel biggest” is enough.

---

## 7. Close so it sticks (5 min)

- **Recap:** “We have a tagged pain list: today vs once we have approval flow. This is the input to Workshop 2 (agent opportunities).”
- **Next step:** “Workshop 2 we’ll turn these into agent ideas and answer the scope question — API-free this year vs concepts for later.”
- **Owner:** “Who’s writing this up / putting it in Miro and sharing in Slack?” (Name someone.)
- **Late joiners:** “If you joined late, the doc/slides will have the list and the three gaps we opened with.”

---

## 8. Facilitation habits

- **Time-box.** Announce “we have 20 minutes for pains, then we tag.” When you’re at 18 min, say “two more then we tag.”
- **One conversation.** If two people go deep on one pain, “let’s capture that and park the detail; we can come back if we have time.”
- **Use the constraint voice.** If someone assumes Melio APIs or a live approval workflow, whoever holds that constraint (e.g. Angus for APIs) can say “we don’t have that yet” so the room tags correctly.
- **No “we already do that.”** If someone says “we already do X,” respond with “so the pain might be adoption or UX — can we phrase it as a pain and tag it?”
- **Late joiners.** One sentence: “We named three gaps, we’re in the middle of tagging pain points. Here’s the board.”

---

## 9. Room setup (practical)

- **Miro/digital:** One frame with three columns: **Pain (label + one line)** | **Today / Once we have approval flow** | **Needs APIs?** Optional: a second frame for “What we have today | What we’re assuming | What we’re not assuming.”
- **Stickies:** If hybrid, same structure on a board; someone types into the doc/Miro as you go.
- **Pre-read:** Send the [compiled prep](workshop-1-prep-compiled.md) and the [run sheet](meeting-notes/2026-02-workshop-1-user-problem-run-sheet.md) so the “journey slice” and “tag” logic are clear before people show up.

---

## 10. What “great” looks like

- **Honest:** Pains are tagged so we’re not pretending we have a baseline we don’t.
- **Concrete:** Pains are specific (who, what part of the journey), not vague.
- **Bounded:** Only post data-entry → payment; upstream pains are parked.
- **Actionable:** The list is the input to the next workshop; someone owns writing it up and sharing it.

You’ve run a great pain-points meeting when the room leaves with one shared, tagged list and a clear next step — and when nobody’s designing solutions yet.
