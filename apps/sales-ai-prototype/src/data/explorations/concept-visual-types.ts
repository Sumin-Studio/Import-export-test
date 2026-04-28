/**
 * Maps each concept title to a visual type. Each type has a dedicated
 * screenshot-style component that looks like the feature being described.
 */
export type ConceptVisualType =
  | "runway_chart"
  | "discount_radar"
  | "calendar_heatmap"
  | "liquidity_split"
  | "alert_trigger"
  | "meter_gauge"
  | "priority_ladder"
  | "approval_queue"
  | "policy_draft"
  | "intent_capture"
  | "brief_digest"
  | "deferral_advisor"
  | "batch_sequence"
  | "cluster_planner"
  | "narrative"
  | "guard_checklist"
  | "template_form"
  | "reminder_nudger"
  | "triage_queue"
  | "capture_flow";

const TITLE_TO_TYPE: Record<string, ConceptVisualType> = {
  // Cash-Aware Bill Pay Planner
  "Cash Runway Watcher": "runway_chart",
  "Early Pay Discount Radar": "discount_radar",
  "Bill Timing Optimizer": "calendar_heatmap",
  "Multi-account Liquidity Splitter": "liquidity_split",
  "Payroll Collision Alert": "alert_trigger",
  "Tax Reserve Shield": "meter_gauge",
  "Cash Shock Simulator": "runway_chart",
  "Vendor Priority Ladder": "priority_ladder",
  "Due-Date Heatmap Planner": "calendar_heatmap",
  "Payment Deferral Advisor": "deferral_advisor",
  "Dynamic Float Controller": "meter_gauge",
  "Invoice Clustering Planner": "cluster_planner",
  "Week Ahead Cash Brief": "brief_digest",
  "Emergency Hold Trigger": "alert_trigger",
  "Seasonal Spend Balancer": "liquidity_split",
  "Currency Exposure Planner": "liquidity_split",
  "Spend Cap Enforcer": "meter_gauge",
  "Scenario Compare Board": "liquidity_split",
  "Loan Drawdown Recommender": "brief_digest",
  "Surplus Deployment Coach": "brief_digest",
  "Auto-partial Payment Builder": "template_form",
  "Subscription Renewal Smoother": "calendar_heatmap",
  "Margin Guard Payment Plan": "guard_checklist",
  "Owner Draw Protection": "guard_checklist",
  "Reforecast on New Bill": "runway_chart",
  "Deadline Conflict Resolver": "alert_trigger",
  "Bill Batch Sequencer": "batch_sequence",
  "Confidence Based Scheduling": "batch_sequence",
  "Cash Position Narrative": "narrative",
  "Collections-Aware Timing": "calendar_heatmap",
  "High-Risk Bill Sentinel": "alert_trigger",
  "Weekend Buffer Planner": "meter_gauge",
  "Quarter Close Cash Guard": "guard_checklist",
  // Approval Concierge
  "Policy-Aware Approval Drafts": "policy_draft",
  "Risk Tier Routing": "triage_queue",
  "Approval SLA Nudger": "reminder_nudger",
  "Delegation Auto-Suggest": "approval_queue",
  "Context Snapshot Composer": "brief_digest",
  "Receipt Gap Detector": "alert_trigger",
  "Duplicate Bill Explainer": "policy_draft",
  "Approver Workload Balancer": "approval_queue",
  "Escalation Path Finder": "approval_queue",
  "Approval Confidence Badge": "approval_queue",
  "CFO Exception Digest": "brief_digest",
  "One-Click Policy Citation": "policy_draft",
  "Last-Minute Change Tracker": "reminder_nudger",
  "After-Hours Approval Queue": "approval_queue",
  "Mobile Approval Brief": "brief_digest",
  "Trust Signal Summary": "brief_digest",
  "Approval Simulation Sandbox": "liquidity_split",
  "Vendor History Context Pack": "brief_digest",
  "Spend Threshold Forecaster": "runway_chart",
  "Team Absence Rerouter": "approval_queue",
  "Approval Chain Simplifier": "approval_queue",
  "Urgency Triage Queue": "triage_queue",
  "Audit-Ready Decision Log": "narrative",
  "Multi-Entity Approval Switch": "approval_queue",
  "Approval Delay Predictor": "batch_sequence",
  "Sensitive Category Redaction": "policy_draft",
  "Approval Coaching Tips": "reminder_nudger",
  "Smart Reminder Cadence": "reminder_nudger",
  "Exception Reason Classifier": "triage_queue",
  "Procurement Link Resolver": "policy_draft",
  "Approval Variance Alert": "alert_trigger",
  "Human Override Spotlight": "guard_checklist",
  "Approval Outcome Learning Loop": "narrative",
  // Just Pay (No-Bill Pay)
  "Instant Pay Intent Capture": "intent_capture",
  "One-Tap Billless Pay": "intent_capture",
  "Supplier Autofill Assistant": "capture_flow",
  "Payment Purpose Templates": "template_form",
  "Contactless Invoice Drop-in": "capture_flow",
  "SMS Pay Request Ingest": "intent_capture",
  "Email-to-Pay Parser": "intent_capture",
  "Voice Note Payment Draft": "intent_capture",
  "OCR Lite Quick Capture": "capture_flow",
  "Favorite Supplier Shortcuts": "template_form",
  "Repeat Payment Memory": "template_form",
  "Receipt Attach Later Flow": "capture_flow",
  "Smart Category Guess": "capture_flow",
  "Last Amount Suggestion": "capture_flow",
  "Split Payment Builder": "template_form",
  "Team Card Reconciliation Hook": "brief_digest",
  "Geo-tagged Expense to Pay": "capture_flow",
  "Pay Link Resolver": "intent_capture",
  "Due Date from Message": "capture_flow",
  "Confidence Flag Before Send": "guard_checklist",
  "Just Pay Undo Window": "guard_checklist",
  "Approval Bypass Guard": "guard_checklist",
  "Payment Rail Auto Pick": "template_form",
  "Fees Transparency Banner": "brief_digest",
  "Payment ETA Predictor": "batch_sequence",
  "Supplier Identity Check": "guard_checklist",
  "Duplicate Payment Guard": "guard_checklist",
  "Fraud Signal Precheck": "alert_trigger",
  "Weekend Payment Planner": "calendar_heatmap",
  "Cross-border Quick Pay": "intent_capture",
  "Recurring Billless Setup": "template_form",
  "Cashflow Impact Peek": "runway_chart",
  "Payment Completion Narrative": "narrative",
};

export function getVisualTypeForConcept(conceptTitle: string): ConceptVisualType {
  return TITLE_TO_TYPE[conceptTitle] ?? "brief_digest";
}
