export interface Problem {
  id: number;
  area: string;
  severity: number;
  feasibility: number;
  aiBenefit: number;
  total: number;
  rank: number;
  pitch: string;
  swimlane?: "sl1" | "sl2" | "sl3";
  cut?: boolean;
}

export const rankedProblems: Problem[] = [
  {
    id: 7,
    rank: 1,
    area: "Manual, repetitive configuration (system doesn't learn)",
    severity: 4,
    feasibility: 4,
    aiBenefit: 5,
    total: 13,
    swimlane: "sl3",
    pitch:
      'Sev 4: VOC is explicit — "customers expect the system to learn." Repeated re-entry of account codes, contacts, and payment terms across every bill. Feas 4: We control the product and data; learning defaults and applying them is buildable without Melio. AI 5: "Learn and automate against preferences" is AI by definition. Natural language rules ("all Amazon → 310-COGS") don\'t exist without AI.',
  },
  {
    id: 8,
    rank: 1,
    area: "Chasing approvers / approval bottlenecks",
    severity: 4,
    feasibility: 4,
    aiBenefit: 5,
    total: 13,
    swimlane: "sl2",
    pitch:
      "Sev 4: ~120k orgs view \"awaiting approval\" monthly. Overdue payments sit in limbo while people manually chase managers. Feas 4: Notification rules, escalation, and in-product chase are in our scope. The payroll-chasing pattern already proves it works. AI 5: Knowing who to nudge, when, and how to escalate requires intelligence, not just timers.",
  },
  {
    id: 10,
    rank: 1,
    area: "Fraud and error risk with no risk signal layer",
    severity: 5,
    feasibility: 3,
    aiBenefit: 5,
    total: 13,
    swimlane: "sl2",
    pitch:
      "Sev 5: Real losses — $500k from a single fraudulent bank account change. Duplicates, unusual amounts, overpayment — no detection. Bills are where most AP fraud happens. Feas 3: Anomaly detection is buildable, but surfacing it in the approval flow needs the approval UX baseline to exist first. AI 5: Pattern recognition across vendor history, duplicate detection, and bank-detail change alerts are AI/ML problems. Rules alone can't catch subtle anomalies.",
  },
  {
    id: 3,
    rank: 1,
    area: "Time and cognitive load for high-volume bill processors",
    severity: 4,
    feasibility: 4,
    aiBenefit: 5,
    total: 13,
    swimlane: "sl1",
    pitch:
      'Sev 4: 11–100 bills/month for 15% of orgs (15% do 40+). Managing and deciding what to pay is real cognitive load in the high-value US segment. Feas 4: Bulk operations, defaults, and "system learns" are largely in our control. We can build the planning and proposal layer. AI 5: Proposing batches, auto-coding, and suggesting payment timing — AI reduces load from "decide everything" to "review proposals."',
  },
  {
    id: 1,
    rank: 5,
    area: "No cash-aware payment planning or prioritization",
    severity: 4,
    feasibility: 3,
    aiBenefit: 5,
    total: 12,
    swimlane: "sl1",
    pitch:
      "Sev 4: The #1 voted problem in the room. No proposal of which bills to pay, when, why, or what the cash impact is. Users are flying blind on payment decisions. Feas 3: Needs cash position data, supplier terms, and due dates wired together. Planning surface can be built without Melio APIs, but data integration is medium effort. AI 5: Without AI, this is a static dashboard. With AI, it's a proactive payment plan that reasons about trade-offs and recommends action.",
  },
  {
    id: 19,
    rank: 5,
    area: "Guardrailed auto-approval missing",
    severity: 4,
    feasibility: 3,
    aiBenefit: 5,
    total: 12,
    swimlane: "sl2",
    pitch:
      'Sev 4: Auto-approval today is all-or-nothing. No "auto-approve when low risk" with a clear audit trail. Forces manual approval even when the bill is routine. Feas 3: Needs a rules engine, risk signals, and the approval baseline. Can prototype the logic, but production depends on infra. AI 5: "Low risk = trusted vendor + in range + no anomaly + buffer OK" requires combining multiple signals intelligently. Rules alone aren\'t enough.',
  },
  {
    id: 20,
    rank: 5,
    area: 'Obligation detection / no "financial memory"',
    severity: 4,
    feasibility: 3,
    aiBenefit: 5,
    total: 12,
    swimlane: "sl3",
    pitch:
      "Sev 4: Invoices/obligations from email, bank feeds, subscriptions, SMS/photo are not detected. Things get missed or entered late. Feas 3: Requires ingestion from multiple channels, entity matching, and \"memory.\" Significant build — a stretch for v1. AI 5: Multi-source detection and matching is an AI/ML problem. No rules engine can parse an email attachment and match it to a supplier.",
  },
  {
    id: 5,
    rank: 5,
    area: 'Cash flow uncertainty and "caught short"',
    severity: 5,
    feasibility: 3,
    aiBenefit: 4,
    total: 12,
    swimlane: "sl1",
    pitch:
      'Sev 5: 44% of small businesses "caught short"; 35% say having enough to pay bills is a top challenge. The most broadly felt pain. Feas 3: Needs cash position and guardrails integrated — data + UX, not Melio-dependent for visibility. AI 4: AI can advise on timing and buffer impact, but "show the cash position" is also a product fix. AI adds prioritization and reasoning on top.',
  },
  {
    id: 2,
    rank: 5,
    area: "Late bill entry undermines cash flow forecasting",
    severity: 5,
    feasibility: 3,
    aiBenefit: 4,
    total: 12,
    pitch:
      "Sev 5: 25% of bills created after already paid. Distorts forecasting and planning. Core to the \"laborious → autonomous\" transformation. Feas 3: Entry automation (OCR, supplier matching, learned preferences) is buildable. Doesn't depend on Melio. AI 4: AI helps learn defaults, match suppliers, suggest account codes. But OCR and form-filling are also \"just fix\" with better UX.",
  },
  {
    id: 4,
    rank: 10,
    area: "Late payments and due-date miss",
    severity: 4,
    feasibility: 3,
    aiBenefit: 4,
    total: 11,
    swimlane: "sl1",
    pitch:
      'Sev 4: About half of bills paid ~1 week late, driving supplier friction and missed discounts. Widely cited. Feas 3: Scheduling and reminders need data + notifications; payment execution still touches Melio constraints. AI 4: AI can suggest "pay by X" and proactively nudge. But better due-date visibility and simple reminders also help — not exclusively an AI problem.',
  },
  {
    id: 16,
    rank: 10,
    area: "Early-pay discount value invisible",
    severity: 3,
    feasibility: 4,
    aiBenefit: 4,
    total: 11,
    swimlane: "sl1",
    pitch:
      'Sev 3: No discount value, annualized return, or "early pay ROI" lens. Real money left on the table, but lower urgency for most SMBs. Feas 4: Calculation and display are product + data. Straightforward to build. AI 4: AI can recommend "take this discount, it\'s a 31% effective return" and weigh it against cash flow. More than a calculator, less than a planner.',
  },
  {
    id: 6,
    rank: 10,
    area: "No clear cash position or simple guardrail before payment",
    severity: 4,
    feasibility: 4,
    aiBenefit: 3,
    total: 11,
    swimlane: "sl1",
    pitch:
      'Sev 4: Users don\'t see current/projected cash, major outflows, or the impact of a payment run. No "paying this leaves $X buffer before payroll." Feas 4: Largely a product + data problem: balance, projections, one guardrail view. Buildable without Melio APIs. AI 3: "Show the position" is a product fix. AI adds "should you pay this now?" but the baseline is product, not AI.',
  },
  {
    id: 18,
    rank: 13,
    area: "No cash scenario or stress testing",
    severity: 3,
    feasibility: 3,
    aiBenefit: 4,
    total: 10,
    swimlane: "sl1",
    pitch:
      'Sev 3: Users can\'t ask "what if I delay my top 5?" or "what if AR slips?" Useful, but few users actively request stress testing today. Latent need. Feas 3: Scenario modeling needs cash data and product work. No Melio dependency, but non-trivial. AI 4: Running scenarios and summarizing impact in plain English is a good AI use case. More than simple math, less than full planning.',
  },
  {
    id: 12,
    rank: 13,
    area: "Low bill pay adoption (effort > value)",
    severity: 5,
    feasibility: 2,
    aiBenefit: 3,
    total: 10,
    swimlane: "sl3",
    pitch:
      "Sev 5: Only 10% create bills; 1% use bill payments. The biggest strategic gap. But severity alone doesn't make it the right AI target. Feas 2: Fixing adoption touches the full journey, GTM, value prop, and Melio baseline gaps. A narrow PoC can't credibly move the needle. AI 3: AI reduces effort and improves the value side of the equation. But adoption is a product/GTM problem that AI supports, not solves.",
  },
];

export const cutItems: { id: number; area: string; reason: string }[] = [
  { id: 15, area: "Melio/US flow constraints", reason: "Feas 1 — constraint, not opportunity" },
  { id: 9, area: "Fragmented single-step approval", reason: "Feas 2 — needs workflow infra first" },
  { id: 17, area: "Payment rail/PSP choice opaque", reason: "All 3s — medium across every dimension" },
  { id: 11, area: "Post-payment mess", reason: "Product fix, not AI" },
  { id: 14, area: "Bulk operations", reason: "Straightforward product improvement" },
  { id: 13, area: "No visibility into when/how bills paid", reason: "Moderate — subsumed by planner" },
];

export interface ProblemBrief {
  id: number;
  area: string;
  theme: string;
}

export const allProblems: ProblemBrief[] = [
  { id: 1, area: "No cash-aware payment planning or prioritization", theme: "Cash & Planning" },
  { id: 5, area: 'Cash flow uncertainty and "caught short"', theme: "Cash & Planning" },
  { id: 6, area: "No clear cash position or simple guardrail before payment", theme: "Cash & Planning" },
  { id: 18, area: "No cash scenario or stress testing", theme: "Cash & Planning" },
  { id: 16, area: "Early-pay discount value invisible", theme: "Cash & Planning" },
  { id: 3, area: "Time and cognitive load for high-volume bill processors", theme: "Efficiency & Load" },
  { id: 2, area: "Late bill entry undermines cash flow forecasting", theme: "Efficiency & Load" },
  { id: 4, area: "Late payments and due-date miss", theme: "Efficiency & Load" },
  { id: 14, area: "Bulk operations and repetitive edits", theme: "Efficiency & Load" },
  { id: 8, area: "Chasing approvers / approval bottlenecks", theme: "Approvals & Risk" },
  { id: 10, area: "Fraud and error risk with no risk signal layer", theme: "Approvals & Risk" },
  { id: 19, area: "Guardrailed auto-approval missing", theme: "Approvals & Risk" },
  { id: 9, area: "Fragmented / single-step approval", theme: "Approvals & Risk" },
  { id: 12, area: "Low bill pay adoption (effort > value)", theme: "Adoption & Ease" },
  { id: 7, area: "Manual, repetitive configuration (system doesn't learn)", theme: "Adoption & Ease" },
  { id: 20, area: 'Obligation detection / no "financial memory"', theme: "Adoption & Ease" },
  { id: 13, area: "No visibility into when/how bills will be paid", theme: "Visibility & Control" },
  { id: 17, area: "Payment rail / PSP choice opaque", theme: "Visibility & Control" },
  { id: 15, area: "Melio / US flow constraints (feasibility ceiling)", theme: "Infrastructure" },
  { id: 11, area: "Post-payment mess (reconciliation, verification)", theme: "Infrastructure" },
];
