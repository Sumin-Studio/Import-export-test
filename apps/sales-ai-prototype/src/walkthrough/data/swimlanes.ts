export interface Swimlane {
  id: "sl1" | "sl2" | "sl3";
  number: number;
  name: string;
  tagline: string;
  color: string;
  lightBg: string;
  borderColor: string;
  problemStatement: string[];
  whyHighScore: string;
  agentDescription: string;
  workshopItems: number[];
}

export const swimlanes: Swimlane[] = [
  {
    id: "sl1",
    number: 1,
    name: "Cash-Aware Bill Pay Planner",
    tagline: '"I have bills to pay — what should I do, and can I afford it?"',
    color: "#2e7d50",
    lightBg: "#f0faf5",
    borderColor: "#c8e6d4",
    problemStatement: [
      "No cash-aware planning: There's no AI proposal of which bills to pay, when, why, which payment rail, or what the cash impact is.",
      "Half of bills paid late — around a week after due date, driving supplier friction and missed discounts.",
      '44% "caught short" by unexpected cash shortfalls. 35% say having enough to pay bills is a top challenge.',
      "15% of orgs process 40+ bills/month — real cognitive load deciding what to pay and when.",
    ],
    whyHighScore:
      '#1 voted problem in the room. Without the agent this is a dashboard; with the agent it\'s a proactive payment plan that reasons about cash, terms, and goals.',
    agentDescription:
      "Gathers all unpaid bills, current and projected cash position, supplier criticality, and delivery times. Lets users pick a strategy (Conservative / Standard / Growth). Generates a recommended payment run with clear reasoning: why certain bills are prioritized, deferred, or flagged. Shows the direct cash flow impact. The user reviews and approves — the agent plans, the human decides.",
    workshopItems: [1, 3, 4, 5, 6, 16, 18],
  },
  {
    id: "sl2",
    number: 2,
    name: "Approval Concierge",
    tagline: '"How do I get bills approved safely and quickly?"',
    color: "#1565c0",
    lightBg: "#f0f4fa",
    borderColor: "#c8d6e8",
    problemStatement: [
      '~120k orgs view "awaiting approval" monthly. Chasing managers, overdue payments sitting in limbo, manual repetitive follow-up, no smart reminders or escalation.',
      "No risk signal layer: real $500k fraud losses from bank detail changes. No anomaly detection, no duplicate flagging, no unusual-amount warnings.",
      'Auto-approval is all-or-nothing. No "approve when low risk" — no guardrailed auto-approve with clear audit trail.',
      "Approvers lack context: no cash balance, upcoming commitments, or budget status linked to the bill they're reviewing.",
    ],
    whyHighScore:
      "Three items in the top 7 of the Pugh chart (#8, #10, #19). Chasing + risk detection + auto-approval are all definitionally agentic. The payroll-chasing pattern already proves the model works.",
    agentDescription:
      'Learns approval patterns and org rules. Flags pre-identified risks: duplicate bills, supplier bank-detail changes, unusual amounts, policy violations. Routes approval requests as GenAI summary cards (email, mobile push, Slack) with one-click options: "Approve all safe items," "Approve except flagged," "Open in Xero." Escalates overdue approvals. Auto-approves low-risk bills within guardrails. All with clear audit trail.',
    workshopItems: [8, 10, 19],
  },
  {
    id: "sl3",
    number: 3,
    name: "Just Pay (No-Bill Pay)",
    tagline: '"Make the journey so light that the 90% who don\'t create bills today might start."',
    color: "#e65100",
    lightBg: "#fdf5f0",
    borderColor: "#f0d4c0",
    problemStatement: [
      "Only 10% of Xero users create bills; only 1% use bill payments. The effort-to-value ratio is too high for most.",
      "Meaningful share of SMB spend is ad-hoc: contractors, reimbursements, card statements, subscriptions. Users \"just want to pay someone\" without a full AP process.",
      'System doesn\'t learn: users re-enter the same details repeatedly. VOC: "Customers expect the system to learn."',
      "Obligations get missed: invoices from email, bank feeds, subscriptions, SMS/photo are not proactively detected.",
    ],
    whyHighScore:
      "Individual items score unevenly, but the cluster tells a story: make the journey so light that 90% of users who don't create bills today might start. \"Pay-first, account-second\" is the behavioural insight.",
    agentDescription:
      'Detects contacts from bank feeds and historical patterns. Accepts natural language input ("pay Joe $100 today"). Auto-fills supplier details from history, generates a cash flow outlook, optionally recommends deferral or recurring plans. Creates a soft bill in the background for the accounting trail. The user gets the "Venmo for business" experience; Xero gets the data it needs.',
    workshopItems: [7, 12, 20],
  },
];

export interface Prototype {
  swimlane: "sl1" | "sl2" | "sl3";
  number: number;
  name: string;
  description: string;
  whyItWorks: string;
}

export const prototypes: Prototype[] = [
  { swimlane: "sl1", number: 1, name: '"Plan My Payments" Dashboard', description: "A full planning view from the familiar Bills > Awaiting Payment screen. Cash timeline at top, bills sorted by AI-recommended priority, with pay/defer suggestions per bill.", whyItWorks: 'Gives the user a "control room" — they see the plan and the cash impact at once, within the screen they already visit. The CTA sits where users already look for action. Low learning curve, high information density.' },
  { swimlane: "sl1", number: 2, name: "JAX Conversational Planner", description: "User asks a natural language question in JAX chat. The agent responds with a structured payment analysis, clear recommendations, and a one-click action to create the payment run.", whyItWorks: "Meets users where they already ask questions. Natural language lowers the learning curve to zero — no new UI to learn, just ask. The conversational format makes complex cash flow trade-offs feel approachable." },
  { swimlane: "sl1", number: 3, name: "Homepage Spotlight Card", description: "A proactive notification card on the homepage dashboard. The agent surfaces what's due, the cash impact, and a specific recommendation — before the user even asks.", whyItWorks: 'Zero-effort awareness — the agent comes to you, not you to it. This is the "glanceable" version of cash-aware planning. Users who log in see the bill situation immediately.' },
  { swimlane: "sl1", number: 4, name: "Strategy Selector", description: "User picks one of three goals — Conservative, Standard, or Growth. The agent auto-generates an optimized payment plan for that strategy, showing which bills to pay now, which to defer, and the cash impact.", whyItWorks: 'Turns complex cash flow trade-offs into a simple choice. Users don\'t need to understand payment optimization — they just need to know what they care about. This is the "trust thermostat" David described.' },
  { swimlane: "sl1", number: 5, name: "Mobile Push + Quick Review", description: 'Push notification alerts the user about upcoming bills. Tapping opens a stripped-down mobile review with per-bill approve/defer and a single "Approve Payment Run" button.', whyItWorks: 'Bill management on the move. Reduces the "I\'ll do it later" gap that causes late payments. Push notifications reach users who don\'t log in daily, which is most of them.' },
  { swimlane: "sl2", number: 1, name: "Smart Summary Email", description: "An AI-generated approval email that summarizes the payment run: total, suppliers, cash impact, and per-bill risk assessment. One-click actions right in the email.", whyItWorks: 'Approvers live in email. This meets them where they are with everything they need to make a decision. The risk badges turn a wall of bills into a scannable list. "Approve all safe" reduces a 10-minute review to a 10-second click.' },
  { swimlane: "sl2", number: 2, name: "In-Xero Approval Hub", description: "A consolidated approval dashboard inside Xero. All pending approvals with risk scores, batch approve for safe items, and a full audit trail.", whyItWorks: "Single pane of glass for the operations person who needs control and auditability. The risk overview at the top gives instant situational awareness. Batch approve eliminates bill-by-bill clicking for the ~120k orgs with approval queues." },
  { swimlane: "sl2", number: 3, name: "Slack/Teams Action Card", description: "An approval request posted in a Slack channel or DM, with a context card showing the payment summary, risk flags, and action buttons.", whyItWorks: "Teams already use Slack for decisions. This makes approval as easy as responding to a message. The conversational context creates a natural audit trail. Flagged items are visible without clicking through." },
  { swimlane: "sl2", number: 4, name: "Mobile Swipe-to-Approve", description: "Push notification launches a card-stack UI. Swipe right to approve, left to flag. AI badges show risk signals on each card.", whyItWorks: "Designed for the approver who's on-site, traveling, or between meetings. The card stack format forces one decision at a time — no cognitive overload. 10-second approvals." },
  { swimlane: "sl2", number: 5, name: "Risk-Layered Review Screen", description: "The agent pre-sorts bills into Safe, Needs Review, and Flagged columns. Each flagged item includes a plain-English explanation of what triggered the flag.", whyItWorks: "Turns the approver into a reviewer, not a detective. Instead of scanning every bill for anomalies, the agent surfaces what matters and explains why. The three-column layout creates a clear triage workflow." },
  { swimlane: "sl3", number: 1, name: '"Pay Someone" Quick Action', description: 'A prominent "Pay Someone" button on the homepage. Type a name and amount; the agent auto-fills supplier details from payment history, shows cash impact, and routes to payment.', whyItWorks: 'The "Venmo for business" moment. Pay-first, account-second. The user\'s intent is simple — "I want to pay someone" — and the UI matches that simplicity. Three fields to pay; zero fields to create a bill.' },
  { swimlane: "sl3", number: 2, name: "Bank Feed Smart Suggestion", description: 'From the bank reconciliation screen, the agent detects recurring payment patterns and suggests: "Pay these through Xero so we can warn you before it hits your cash."', whyItWorks: 'Uses data the user already has to surface bills they never bothered creating. The bank feed is where users see their money leaving — this intercepts that moment and turns reactive reconciliation into proactive payment management.' },
  { swimlane: "sl3", number: 3, name: "Voice/Text Natural Input", description: '"Pay Joe $100 today" — the agent parses intent, matches the contact, shows cash impact, and presents a one-tap confirmation. A soft bill is created automatically in the background.', whyItWorks: "The lightest possible interaction. Lower barrier than any form — five words instead of ten fields. The agent does the heavy lifting: name resolution, bank detail lookup, delivery time calculation, cash impact check." },
  { swimlane: "sl3", number: 4, name: "Recurring Pattern Detection", description: "The agent notices recurring outflows from bank feeds and offers to convert them into managed, automatic payments with cash-aware scheduling.", whyItWorks: 'Turns invisible cash outflows into managed ones. The agent notices patterns the user doesn\'t — or doesn\'t bother to act on. The "Remind Me Instead" option respects users who want control but not automation.' },
  { swimlane: "sl3", number: 5, name: "Lite Bill with Background Accounting", description: "A minimal 3-field form: who, how much, when. The agent fills in account codes, tax, reference, and creates a soft bill in the background. The user gets simplicity; Xero gets the data.", whyItWorks: "The user gets the simple pay experience they want; Xero gets the accounting trail it needs. Account codes are learned from history, not asked for. The soft bill means the payment shows up correctly in reports and forecasts." },
];
