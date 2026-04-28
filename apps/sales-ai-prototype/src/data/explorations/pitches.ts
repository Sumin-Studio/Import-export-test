import type { SwimLane } from "./schema";

/**
 * One-sentence value proposition per concept: what it does and why it matters.
 * Used with alignment and feasibility to build the full pitch.
 */
export const PITCH_VALUE: Record<string, string> = {
  "Cash Runway Watcher": "Shows how many weeks of runway you have so you can prioritise which bills to pay first.",
  "Early Pay Discount Radar": "Surfaces which vendors offer early-pay discounts so you don’t leave money on the table.",
  "Bill Timing Optimizer": "Suggests when to pay each bill so you balance due dates, discounts, and cash flow.",
  "Multi-account Liquidity Splitter": "Recommends how to split payments across accounts so liquidity and limits are respected.",
  "Payroll Collision Alert": "Alerts when payroll and bill runs could collide so you can hold or move payments.",
  "Tax Reserve Shield": "Helps reserve cash for tax so bill payments don’t put you short at quarter end.",
  "Cash Shock Simulator": "Lets you see how a big payment or late invoice would affect runway before you commit.",
  "Vendor Priority Ladder": "Ranks which bills to pay first by impact, terms, and risk so you decide with clarity.",
  "Due-Date Heatmap Planner": "Shows when bills cluster so you can smooth out spikes and avoid crunch weeks.",
  "Payment Deferral Advisor": "Suggests which bills to defer and by how long so runway stays healthy without missing critical payments.",
  "Dynamic Float Controller": "Uses forecast and timing to keep float predictable so you avoid last-minute shortfalls.",
  "Invoice Clustering Planner": "Groups invoices by due date or vendor so you can batch pay and plan cash.",
  "Week Ahead Cash Brief": "Gives a short, actionable summary of what’s due and what’s at risk in the next seven days.",
  "Emergency Hold Trigger": "Lets you pause or hold payments when something unexpected hits so you stay in control.",
  "Seasonal Spend Balancer": "Adjusts payment suggestions for seasonal patterns so you don’t over-commit in thin months.",
  "Currency Exposure Planner": "Surfaces FX exposure across bills and accounts so you can time or hedge if needed.",
  "Spend Cap Enforcer": "Keeps recommended payments within caps and budgets so you don’t overshoot.",
  "Scenario Compare Board": "Lets you compare “pay this week” vs “defer these” so you see the trade-offs side by side.",
  "Loan Drawdown Recommender": "Suggests when to draw down credit lines for bill runs so you optimise cost and runway.",
  "Surplus Deployment Coach": "Suggests when to pay early or extra when you have surplus so you capture discounts or reduce load.",
  "Auto-partial Payment Builder": "Proposes partial payments when full pay isn’t possible so you keep relationships and runway.",
  "Subscription Renewal Smoother": "Surfaces renewals and suggests timing so you don’t get surprise spikes.",
  "Margin Guard Payment Plan": "Warns when a payment plan would push margins or targets so you can adjust.",
  "Owner Draw Protection": "Flags when owner draws and bill runs could conflict so you protect both.",
  "Reforecast on New Bill": "Updates your runway and forecast as soon as a new bill lands so the picture is always current.",
  "Deadline Conflict Resolver": "Highlights when due dates and approval or cash constraints conflict so you can resolve them.",
  "Bill Batch Sequencer": "Suggests the order and timing of batches so you optimise cash and processing.",
  "Confidence Based Scheduling": "Schedules suggested payments by confidence in data so low-confidence items get review first.",
  "Cash Position Narrative": "Turns your cash and bill data into a short narrative so you can quickly explain the position.",
  "Collections-Aware Timing": "Adjusts payment timing when collections are late so you don’t over-commit.",
  "High-Risk Bill Sentinel": "Flags high-value or unusual bills so they get extra checks before payment.",
  "Weekend Buffer Planner": "Ensures enough buffer before weekends or holidays so you’re not caught short.",
  "Quarter Close Cash Guard": "Guards cash and payment timing around quarter close so you hit targets and avoid surprises.",
  "Policy-Aware Approval Drafts": "Pre-fills approval requests with policy citations and amounts so approvers can sign off in one click.",
  "Risk Tier Routing": "Routes bills by risk tier so high-risk items get the right scrutiny and low-risk flow fast.",
  "Approval SLA Nudger": "Nudges when approvals are nearing SLA so nothing slips without a conscious choice.",
  "Delegation Auto-Suggest": "Suggests who to delegate to when you’re away so the queue keeps moving.",
  "Context Snapshot Composer": "Packs bill, supplier, and history into a short snapshot so approvers have context at a glance.",
  "Receipt Gap Detector": "Flags when receipts or supporting docs are missing so you fix before approval.",
  "Duplicate Bill Explainer": "Surfaces possible duplicates and explains why so you don’t pay twice.",
  "Approver Workload Balancer": "Spreads approvals across the team so no one is overloaded and SLAs are met.",
  "Escalation Path Finder": "Suggests escalation paths when policy or amount triggers so you know who to ask.",
  "Approval Confidence Badge": "Shows how confident the system is in the recommendation so approvers know when to dig in.",
  "CFO Exception Digest": "Summarises exceptions and overrides for the CFO so they can spot patterns and policy gaps.",
  "One-Click Policy Citation": "Attaches the right policy and clause to the approval so approvers don’t have to search.",
  "Last-Minute Change Tracker": "Tracks last-minute changes to bills or amounts so approvers see what changed and why.",
  "After-Hours Approval Queue": "Surfaces what’s waiting and what’s urgent outside hours so you can triage from anywhere.",
  "Mobile Approval Brief": "Puts a short, mobile-friendly approval brief in your hand so you can approve on the go.",
  "Trust Signal Summary": "Summarises trust signals (supplier, history, match) so approvers know the bill is legit.",
  "Approval Simulation Sandbox": "Lets you simulate “what if I approve these” so you see impact before committing.",
  "Vendor History Context Pack": "Bundles vendor payment history and notes so approvers have context without leaving the queue.",
  "Spend Threshold Forecaster": "Forecasts when you’ll hit spend thresholds so you can plan approvals and exceptions.",
  "Team Absence Rerouter": "Reroutes approvals when someone’s away so the queue doesn’t stall.",
  "Approval Chain Simplifier": "Shows a simple chain of who needs to approve so everyone knows their step.",
  "Urgency Triage Queue": "Orders the queue by urgency and impact so the most important items surface first.",
  "Audit-Ready Decision Log": "Keeps a clear log of who approved what and why so audit and compliance are covered.",
  "Multi-Entity Approval Switch": "Lets you switch context across entities so multi-entity approvers don’t get lost.",
  "Approval Delay Predictor": "Predicts when approvals might slip so you can nudge or escalate in time.",
  "Sensitive Category Redaction": "Redacts sensitive line items for the right eyes so approval is safe and compliant.",
  "Approval Coaching Tips": "Surfaces short tips (policy, exception, risk) so approvers learn as they go.",
  "Smart Reminder Cadence": "Reminds at the right time so approvers act before SLA without feeling spammed.",
  "Exception Reason Classifier": "Classifies why something is an exception so you can report and improve policy.",
  "Procurement Link Resolver": "Links bills to POs and procurement so approvers see the full story.",
  "Approval Variance Alert": "Alerts when an approval deviates from pattern or policy so you catch errors and fraud.",
  "Human Override Spotlight": "Surfaces overrides and explains them so you can learn and refine the agent.",
  "Approval Outcome Learning Loop": "Uses approval outcomes to improve future recommendations so the agent gets better.",
  "Instant Pay Intent Capture": "Lets you say or type “pay X” and capture intent first, fix details later, so paying is fast.",
  "One-Tap Billless Pay": "One tap to pay without a bill so repeat or trusted payments don’t need a full flow.",
  "Supplier Autofill Assistant": "Autofills supplier and account from a few keystrokes so you don’t re-type the same thing.",
  "Payment Purpose Templates": "Templates for purpose and category so billless payments are consistent and auditable.",
  "Contactless Invoice Drop-in": "Drop an invoice (image or link) and the system suggests payee and amount so entry is minimal.",
  "SMS Pay Request Ingest": "Turns SMS pay requests into draft payments so you can approve and pay without re-keying.",
  "Email-to-Pay Parser": "Parses “please pay” emails into draft payments so you capture intent from the inbox.",
  "Voice Note Payment Draft": "Turns a voice note into a payment draft so you can capture on the go.",
  "OCR Lite Quick Capture": "Quick OCR on a receipt or invoice so you get payee and amount without full data entry.",
  "Favorite Supplier Shortcuts": "Shortcuts for favourite suppliers so repeat payments are one or two taps.",
  "Repeat Payment Memory": "Remembers last payment to a supplier so you can repeat with one confirm.",
  "Receipt Attach Later Flow": "Pay first, attach receipt later so speed isn’t blocked by paperwork.",
  "Smart Category Guess": "Guesses category and purpose from payee and history so you rarely pick from scratch.",
  "Last Amount Suggestion": "Suggests last amount paid to this payee so you can confirm and pay fast.",
  "Split Payment Builder": "Splits one payment across categories or cost centres so allocation is right at pay time.",
  "Team Card Reconciliation Hook": "Links card spend to billless pay so you can reconcile and clear in one place.",
  "Geo-tagged Expense to Pay": "Uses location to suggest payee or category so expense-to-pay is smoother.",
  "Pay Link Resolver": "Resolves pay links from messages or emails into a payment draft so you don’t copy-paste.",
  "Due Date from Message": "Pulls due date from the request so the payment is scheduled correctly.",
  "Confidence Flag Before Send": "Flags when payee or amount is low-confidence so you double-check before sending.",
  "Just Pay Undo Window": "Short window to undo after pay so mistakes are fixable without a long process.",
  "Approval Bypass Guard": "Only allows bypass when policy and limits are met so speed doesn’t compromise control.",
  "Payment Rail Auto Pick": "Picks the right rail (e.g. same-day vs standard) so you balance speed and cost.",
  "Fees Transparency Banner": "Shows fees before you confirm so you know the cost of the payment.",
  "Payment ETA Predictor": "Predicts when the payment will land so you and the supplier know what to expect.",
  "Supplier Identity Check": "Checks payee against known suppliers so you don’t pay the wrong party.",
  "Duplicate Payment Guard": "Warns when this looks like a duplicate so you don’t pay twice.",
  "Fraud Signal Precheck": "Runs basic fraud signals before send so obvious risks are caught early.",
  "Weekend Payment Planner": "Plans payment timing around weekends and cut-offs so funds arrive when needed.",
  "Cross-border Quick Pay": "Simplifies FX and cross-border so international payments aren’t a separate workflow.",
  "Recurring Billless Setup": "Sets up recurring billless payments so subscriptions and repeat pay are automatic.",
  "Cashflow Impact Peek": "Shows how this payment affects cash and runway so you confirm with context.",
  "Payment Completion Narrative": "Summarises what was paid, when, and how so you have a clear record.",
};

const ALIGNMENT_BY_LANE: Record<SwimLane, string> = {
  "Cash-Aware Bill Pay Planner":
    "It aligns with Approval Concierge (recommendations are ready for sign-off) and Just Pay (informed, fast pay decisions without re-keying).",
  "Approval Concierge":
    "It aligns with Cash-Aware (approvers see runway and timing) and Just Pay (fewer bottlenecks so pay can stay fast).",
  "Just Pay (No-Bill Pay)":
    "It aligns with Cash-Aware (impact on runway is visible) and Approval Concierge (exceptions and policy stay in the loop).",
};

function feasibilityLine(score: number): string {
  if (score >= 80) return `Feasibility is high (${score}): we have the data and patterns to build this without new integrations.`;
  if (score >= 60) return `Feasibility is solid (${score}): some work on data or UX, but no fundamental blockers.`;
  return `Feasibility is moderate (${score}): worth doing with clear scope; may depend on API or data access.`;
}

export function getPitch(
  conceptTitle: string,
  swimLane: SwimLane,
  feasibility: number
): string {
  const value = PITCH_VALUE[conceptTitle] ?? `"${conceptTitle}" reduces friction and improves confidence in payment decisions.`;
  const alignment = ALIGNMENT_BY_LANE[swimLane];
  const feasibilityText = feasibilityLine(feasibility);
  return `${value} ${alignment} ${feasibilityText}`;
}
