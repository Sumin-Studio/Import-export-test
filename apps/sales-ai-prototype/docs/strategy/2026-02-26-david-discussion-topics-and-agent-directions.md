# David's Discussion Topics & Agent Directions

**Purpose:** Consolidated checklist of everything David said we should discuss or do, plus the latest direction and clear agent descriptions.

**Sources:** 23 Feb (elevator pitches, delivery), 24 Feb (action items), 25 Feb (review & reframe)

**Last updated:** 26 February 2026

---

## Part 1: David's Discussion Topics (Consolidated Checklist)

These are the items David has explicitly asked us to address or discuss. Use this as the running checklist.

### For Diya / Executive Review

| Topic | What David said | Status |
|-------|-----------------|--------|
| **What we're proposing** | The eval is the *what*, not the *how we got there* | Locked in three concepts |
| **Why it matters** | Make sure the *why* is clear | In elevator pitches and agent descriptions |
| **XUI fidelity** | Don't stress XUI at this point — directional UI is fine | Acknowledged |
| **CPO appetite** | "My read is that our CPO will want even more AI (but the focus on agents)" | Note for deck tone |

### Delivery & Presentation

| Topic | What David said | Status |
|-------|-----------------|--------|
| **Delivery interface** | Don't put everything in a side panel. Vary by use case: embedded in workflow, alternative channels (WhatsApp, push), larger JAX, or 2–3 click and done | Per-concept delivery defined |
| **Hollywood slide** | Circus tent: banner (3 hero moments) hooks them; main event is use cases and mechanics. Both in tandem | Three heroes + use cases |
| **Friday visuals** | Don't need full UI — a window (couple of components) per concept to indicate what each agent is | Minimal visuals approach |
| **Story structure** | One slide, three images. Intent, not mechanics. Candy first, vegetables second | Bing/UK Lending pattern |

### Actions & Follow-through

| Topic | What David said | Owner | Status |
|-------|-----------------|-------|--------|
| **Checkpoint** | Review checkpoint with David before Diya | Jon | Done (25 Feb) |
| **Che visibility** | Send to Che for visibility (not a pre-check) | Jon | Open |
| **Map to known insights** | David dumping cashflow/AP research from NotebookLM as "Validation Engine" | Team | Open |
| **Identify segments** | Who: larger SBs, high volume bills, goods vs service. Even gut-vibe helps ground the value | Team | Open |
| **SBG/Charlene homepage UI** | David asked if it's from that space | Jon | Clarify if needed |
| **Keep pushing** | Jon's call on how deep to go | Jon | Ongoing |

### Strategic Reframe (25 Feb)

| Topic | What David said | Implication |
|-------|-----------------|-------------|
| **"Is this even good?"** | Pressing the pay button is the easiest part. We had an agent doing the easiest bit. The real toil is upstream. | Reframe all concepts around upstream toil |
| **Real agent opportunities** | Auto-coding at bill entry, approval workflow automation, fraud/anomaly flagging, policy-based decisions within limits | Target v2: bill entry, coding, exception handling |
| **Small business reality** | Supplier relationships in WhatsApp, barbecue conversations. Margin pressures = zero tolerance for errors. Knowledge graph won't capture nuances | Ground in real SMB behavior |

---

## Part 2: Latest Direction (25 Feb Reframe)

### The Core Insight

> "We're not grappling with feasibility vs ambition anymore, it's actually more 'is this even good?' Like... pressing the pay button is the easiest part of this whole process. We have an agent doing the easiest bit. Versus all the teeth gnashing and toil leading up until that moment."

### Where the Real Toil Is

| Toil point | What it means |
|------------|----------------|
| **Bill entry** | Uploading bills, checking details, matching to the right contact |
| **Account coding** | Getting the right account codes, splitting line items |
| **Approval workflows** | Chasing approvers, waiting for sign-off, managing exceptions |
| **Context sorting** | Figuring out what's urgent, what can wait, what's an anomaly |

### The Test

An agent that presses "pay" on three ready-to-go bills = chatbot wearing an agent costume.

An agent that **makes sense of the million steps of a bill** — dragging and dropping tons of context into a window and having it sorted out — that is a real user need.

### v2 Targets (from David/team)

- Bill entry / coding assistance
- Approval optimization
- Exception handling

---

## Part 3: What Each Agent Does (Clear Descriptions)

### Agent 1: Bill Payment Planner

**What it does:** The agent gathers all unpaid bills, cash position, supplier criticality, and delivery times. It applies a strategy (Conservative / Standard / Growth) and generates a recommendation: which bills to pay this week, when, and in what order. It surfaces anomalies before you approve. You see the plan, tap to accept or tweak, then batch for payment. When you trust it: three clicks. When you don't: drill into plan mode, anomaly checks, and cash impact.

**Where it lives:** Dashboard and bills view (inline, not side panel). Optional chat for "show your work" or deeper planning.

**Upstream toil it tackles:** Today this is manual spreadsheet work or gut instinct — "which bills, when, in what order?" The planner replaces that cognitive load with a recommendation you approve.

**Job step (JTBD):** Prepare bills to pay + Decide when to pay (into Schedule).

---

### Agent 2: Intelligent Bill Approval

**What it does:** The agent monitors bills that need approval. It detects risks: duplicates, bank detail changes, unusual amounts, policy violations. It routes a summary to the right approver via WhatsApp (or email): "Here are 5 items; 4 look good, 1 needs a look." The approver taps to approve the clean ones and gets a link to Xero for the exception. No login required. The agent chases approvers so the requester doesn't have to.

**Where it lives:** Requester may use in-product (bills/chat). Approver experience is **alternative channel** (WhatsApp/email) — not in Xero.

**Upstream toil it tackles:** Today approvers are chased via email, Slack, or in person. Bills sit in limbo. The agent flags anomalies, routes with a GenAI summary, and lets the approver act in 30 seconds without opening Xero.

**Job step (JTBD):** Get approval.

---

### Agent 3: Just Pay

**What it does:** The agent lets you pay someone without creating a bill first. You say it — in Xero or in an external agent (e.g. ChatGPT): "Pay Joel $500." The agent confirms the contact, checks cash flow, creates the bill record, and runs the payment. You review and confirm. Done. For recurring or one-off: "Pay Joel $500 every month" — agent sets it up. The wow is the agent compressing or skipping the full receive-prepare-approve flow.

**Where it lives:** In-product (Just Pay entry point) or **in an agent** (ChatGPT, voice). Confirmation can go to WhatsApp.

**Upstream toil it tackles:** Only 10% of Xero users use bills. Meaningful SMB spend is ad-hoc — contractors, reimbursements, subscriptions. The full AP process is overkill for "just pay Joe $500." The agent skips or compresses those steps.

**Job step (JTBD):** Shortcut into Make payment (often skipping Receive → Prepare → Decide → Approve).

---

## One-Liner Summary (for David / Diya)

> Three agents: (1) **Bill Payment Planner** — we recommend which bills to pay this week and when; you approve in 3 clicks. (2) **Intelligent Bill Approval** — we flag risk and send approval to the right person in WhatsApp; they tap, done. (3) **Just Pay** — you say it (in Xero or in your agent), we create the bill and pay; no forms. Delivery varies: dashboard for 1, WhatsApp for 2, agent or in-product for 3 — not everything in a side panel.

---

## Related Documents

| Doc | Purpose |
|-----|---------|
| [2026-02-25-vision-narrative-for-diya.md](./2026-02-25-vision-narrative-for-diya.md) | Full vision narrative, JTBD arc, scope boundaries |
| [2026-02-25-david-review-and-reframe.md](../meeting-notes/2026-02-25-david-review-and-reframe.md) | 25 Feb meeting notes |
| [2026-02-24-david-feedback-three-concepts.md](../meeting-notes/2026-02-24-david-feedback-three-concepts.md) | 24 Feb action items |
| [2026-02-23-david-feedback-elevator-pitches.md](../meeting-notes/2026-02-23-david-feedback-elevator-pitches.md) | Elevator pitches and delivery analysis |
