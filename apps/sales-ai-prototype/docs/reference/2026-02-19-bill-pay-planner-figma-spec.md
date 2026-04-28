# Bill Pay Planner — Figma build spec

**Purpose:** Detailed spec for building the Bill Pay Planner (JAX-style) screens in Figma. Use this to build static screens that tell the hero story: entry → overview → anomalies → plan choice → plan result → (aspirational) pay.

**Context:** Right-side panel on Xero Bills “Awaiting payment” page. Panel is narrow; content must be scannable. Direction: **quicker and sharper** — headlines + minimal support, no walls of text. Reference: Tauqir’s demo (Bill Pay Planner), JAX visual language.

**Last updated:** 2026-02-19

---

## 1. Panel and entry

### 1.1 Panel container
- **Location:** Right side of Bills UI; overlays or sits beside the bill list.
- **Width:** ~360–400px (comfortable reading; not full-width).
- **Background:** White or near-white (#FFFFFF or #FAFAFA). Subtle right border or shadow to separate from main content.
- **Scroll:** Content scrolls vertically; header and primary CTA can be sticky if desired.

### 1.2 Header
- **Title:** “Bill Pay Planner” (or “Just Ask Xero” if matching JAX exactly).
- **Optional:** “Beta” pill, Settings icon, Close (X).
- **Spacing:** Adequate padding from top and sides (e.g. 16–24px).

### 1.3 Entry / first message
- **Single primary CTA button:**  
  **“Help me pay my bills”**  
  - Full-width or prominent; primary blue (#06b3e8 or Xero primary). Rounded corners (e.g. 8px).
- **Below the button (optional):** 2–3 smaller, secondary prompts as text links or chips:
  - “Can I afford to pay my bills this week?”
  - “Which bills are critical right now?”
  - “Give me a payment plan”
- **Rationale:** One obvious first action; other entry points visible for storytelling.

---

## 2. Screen A — “Pay this stuff” (bill overview + cash reality)

**User goal:** See what’s owed, what’s urgent, and that cash doesn’t cover everything — in seconds.

### 2.1 Headline (one line)
- **Copy:**  
  **“$27,020** across **10 bills** · **$4,800** overdue”
- **Treatment:** Bold numbers; “overdue” can be red or with a small red dot. No sentence before or after; this is the only headline for the section.

### 2.2 Cash position (visual)
- **Component:** Horizontal stacked bar or “cash meter.”
  - **Full bar** = current bank balance (e.g. $12,500).
  - **Segments (left to right):**
    - Red: amount overdue (e.g. $4,800).
    - Amber: amount due this week/soon (e.g. $8,400).
    - Remaining: green or grey = what’s left after paying overdue + soon.
  - **Label under bar:**  
    “**$13,200** due now/soon · **$–700** short”  
    (or “**$350** left” if positive.)
- **Do:** One glance shows “can’t pay everything.”  
- **Don’t:** Long paragraph about strategic prioritisation.

### 2.3 Bills table (compact)
- **Columns:** Vendor | Amount | Due (or Status).
- **Rows:** Only bills that matter for “pay this stuff” — e.g. overdue + due in next 7–10 days. 5–7 rows max.
- **Status/due:** Overdue in red (e.g. “6 days overdue”); due date for rest (e.g. “Due Feb 20”).
- **Optional:** Light row striping or hover state. No heavy card per row.

### 2.4 One-line warning (optional)
- **Copy:** “Your cash doesn’t cover all bills — pick a strategy below to prioritise.”
- **Treatment:** Small “Important” or info icon; amber or neutral. Single line only.

### 2.5 Section spacing
- 16–24px between headline, cash bar, table, and warning. Clear grouping; no extra “Bill Overview” or “Cash Position” long titles unless a single short label (e.g. “Cash”).

---

## 3. Screen B — “Here are anomalies” (supplier watch list)

**User goal:** See what to double-check before paying — one line per issue.

### 3.1 Section label
- **Copy:** “Verify before paying” or “Watch”
- **Icon:** Magnifying glass or small alert/warning icon (not overwhelming).

### 3.2 Anomaly rows (one line each)
- **Layout:** List or compact cards; each row = one supplier + one sentence.
- **Copy pattern:**  
  **Supplier name** — [what’s wrong or notable]. [Optional: one short action.]
- **Examples:**
  - **RentCo Property** — 50% higher than usual ($3k → $4.5k). Rate change or error?
  - **Tech Solutions Inc** — ~50% lower than usual. Service change or split bill?
  - **Global Widgets Ltd** — In line with history; you usually pay 1–2 days early.
- **Treatment:** Anomalies (up/down) with subtle red/amber left border or dot; “in line” neutral or green. No paragraph per supplier; no “Recurring monthly supplier (7 payments).”

### 3.3 Optional “no issues” state
- If no anomalies: “No unusual amounts this time — amounts match recent history.”

### 3.4 Spacing
- 12–16px between rows. Section 24px below Screen A content.

---

## 4. Screen C — “Let’s set up a plan” (choose strategy)

**User goal:** Pick how to prioritise (conservative / standard / growth) and get a plan.

### 4.1 Intro line
- **Copy:** “Choose how you want to prioritise — I’ll build the plan.”
- **Single line only.**

### 4.2 Three strategy cards (tappable)
- **Layout:** Three horizontal cards or stacked buttons; equal weight. Icon + label + one short subline each.
- **Content:**

| Strategy     | Icon (suggested) | Label              | Subline                                      |
|-------------|------------------|--------------------|----------------------------------------------|
| Conservative| Shield           | Conservative       | Protect buffer · pay urgent only              |
| Standard    | Scale/balance    | Standard           | Balance · pay on time, keep margin            |
| Growth      | Rocket           | Growth             | Maximise value · discounts, relationships     |

- **Treatment:** Cards have hover/selected state (e.g. border or background tint). Selected = clear “chosen” state (checkmark or filled background).
- **Don’t:** Long paragraphs describing each strategy; the **result** screen explains.

### 4.3 Optional closing line
- **Copy:** “I’ll show what to pay now, what to defer, and your cash position.”
- **Placement:** Below the three cards, small text.

---

## 5. Screen D — Plan result (Conservative / Standard / Growth applied)

**User goal:** See what to pay now, what’s deferred, and the cash impact — and trust it before acting.

### 5.1 Strategy applied
- **Copy:** “**Conservative** strategy applied” (or Standard / Growth).
- **Subline:** One sentence, e.g. “Protecting your cash buffer by paying only critical and overdue bills.”
- **Icon:** Same as chosen strategy (shield / scale / rocket).

### 5.2 Cash impact (compact)
- **Component:** 2–3 lines or a tiny summary block, not a long paragraph.
- **Example:**
  - Current balance: **$12,500**
  - After these payments: **$3,200**
  - Buffer: **25.6%** (within 25–30% target)
- **Treatment:** Numbers bold; optional green check if buffer in range.

### 5.3 “Pay these” (recommended payments)
- **Label:** “Pay now” or “Recommended — 3 bills, $9,300”
- **Content:** Table or list: Vendor | Amount | Reason (one short phrase).
- **Example rows:**
  - Tech Solutions Inc — $1,850 — 13 days overdue, critical
  - Global Widgets Ltd — $2,950 — 8 days overdue
  - RentCo Property — $4,500 — Due Feb 20, rent
- **Do:** Short reason per row. **Don’t:** Long prose.

### 5.4 “Deferred”
- **Label:** “Deferred — 7 bills, $17,720”
- **Content:** List or table: Vendor | Amount | Suggestion (e.g. “Defer 1–2 weeks”, “Due Feb 22”).
- **Show 2–3 rows**; “+5 more” or collapse if needed to keep screen sharp.

### 5.5 Key insights / anomalies (optional repeat)
- If needed for context: same one-line anomaly style as Screen B (e.g. “RentCo — verify 50% increase before paying”).

### 5.6 Next step CTA
- **Primary button:** “Pay these 3 bills” or “Schedule these payments”
- **Treatment:** Primary button; clear that this is the “do it” action.
- **Rationale:** Leads into aspirational “pay” moment (next screen or overlay).

### 5.7 Optional: strategy switcher
- **Component:** Three small chips or tabs: Conservative (selected) | Standard | Growth.
- **Behaviour:** Switching recalculates and updates 5.2–5.5 (in spec, show one state; note “content updates on switch” for build).

---

## 6. Screen E — Aspirational “Pay” (confirmation / success)

**User goal:** “I did it — the bills are paid” (aspirational; not implemented today).

### 6.1 Success state
- **Headline:** “Payments scheduled” or “3 bills paid”
- **Subline:** “$9,300 sent to Tech Solutions Inc, Global Widgets Ltd, RentCo Property.”
- **Visual:** Success checkmark or confirmation icon; optional subtle celebration (e.g. confetti or checkmarks per bill).

### 6.2 Optional “what’s next”
- **Copy:** “Revisit in 7–10 days when you have clearer cash flow. Focus on the $17,720 deferred.”
- **Or:** “View in Payments” / “Back to bills”

### 6.3 Caveat (for demos)
- **Small print:** “Today this step would hand off to your bank or payment provider. We’re showing the target experience.”
- **Placement:** Footer of panel or below CTA so aspiration vs reality is explicit.

---

## 7. Global rules and tokens

### 7.1 Typography
- **Headlines / numbers:** Bold, one size up from body (e.g. 16–18px).
- **Body:** 14px; comfortable line height (1.4–1.5).
- **Supporting:** 12–13px for “Due Feb 20”, “25.6% buffer”, etc.
- **Font:** Xero product font (as per design system).

### 7.2 Colour
- **Primary action:** Xero blue (#06b3e8 or design-system primary).
- **Overdue / alert:** Red (#D32F2F or semantic error).
- **Warning / due soon:** Amber (#F57C00 or semantic warning).
- **Success / in range:** Green (semantic success).
- **Neutral text:** Greys (e.g. #333 body, #666 secondary).

### 7.3 Spacing
- **Section gaps:** 24px between major sections (overview vs anomalies vs plan).
- **In-section:** 12–16px between elements (headline, bar, table).
- **Panel padding:** 16–24px from edges.

### 7.4 Components to create
- Cash position bar (stacked segments).
- Compact bills table (Vendor | Amount | Due/Status).
- Anomaly row (icon/dot + one line).
- Strategy card (icon + label + subline, selected state).
- Primary and secondary buttons.
- Optional: “Important” / “Watch” callout strip.

---

## 8. Flow summary (for Figma frames)

| Frame | Name (suggested) | Content |
|-------|-------------------|--------|
| 1 | Entry | Panel with “Help me pay my bills” + 3 secondary prompts |
| 2 | Overview | Headline + cash bar + bills table + one-line warning |
| 3 | Anomalies | “Verify before paying” + 3 one-line anomaly rows |
| 4 | Choose strategy | Intro line + Conservative / Standard / Growth cards |
| 5 | Plan result | Strategy applied + cash impact + pay these + deferred + “Pay these 3 bills” |
| 6 | Pay (aspirational) | Success headline + subline + optional caveat |

**Optional:** Variant of Frame 5 for “Standard” and “Growth” so strategy switcher has something to show.

---

## 9. Copy checklist (quick reference)

- **Entry:** “Help me pay my bills” (+ 3 entry-point prompts).
- **Overview headline:** “$27,020 across 10 bills · $4,800 overdue”.
- **Cash bar label:** “$13,200 due now/soon · $–700 short” (or “$350 left”).
- **Warning:** “Your cash doesn’t cover all bills — pick a strategy below to prioritise.”
- **Anomalies label:** “Verify before paying”.
- **Anomaly examples:** RentCo 50% higher; Tech Solutions ~50% lower; Global Widgets in line.
- **Plan intro:** “Choose how you want to prioritise — I’ll build the plan.”
- **Strategies:** Conservative / Standard / Growth + sublines (protect buffer; balance; maximise value).
- **Plan result:** Strategy applied + cash impact (3 lines) + “Pay now” table + “Deferred” list + “Pay these 3 bills”.
- **Success:** “Payments scheduled” + “$9,300 sent to…” + optional caveat.

---

## 10. References in repo

- Hero use case and flow: `docs/meeting-notes/2026-02-18-prototype-demo-and-hero-use-case.md`
- Slack workshop summary (Figma-first, plan pattern): `docs/meeting-notes/2026-02-19-slack-workshop-summary-and-status.md`
- Xero-style palette: `docs/reference/2026-02-16-xero-style-color-palette.md`
- Next steps (API + visuals): `docs/strategy/2026-02-17-next-steps-prototype-and-visuals.md`

---

*End of spec. Use this document as the single source of truth for building the Bill Pay Planner screens in Figma.*
