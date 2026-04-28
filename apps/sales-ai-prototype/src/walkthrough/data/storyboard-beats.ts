export interface StoryboardBeat {
  id: string;
  order: number;
  section: string;
  /** For "screens" section: groups screens by concept (bill-pay, approval, just-pay) */
  conceptId?: string;
  title: string;
  subtitle?: string;
  body: string;
}

export const SCREEN_CONCEPT_LABELS: Record<string, string> = {
  "bill-pay": "Bill Pay Planner",
  approval: "Intelligent Bill Approval",
  "just-pay": "Just Pay",
};

export const STORYBOARD_SECTIONS = [
  { id: "background", title: "Background thinking" },
  { id: "screens", title: "The actual screens" },
] as const;

export const storyboardBeats: StoryboardBeat[] = [
  {
    id: "opening",
    order: 1,
    section: "background",
    title: "Opening",
    subtitle: "From 99 concepts to one direction",
    body: "How we moved from a broad problem space to focused swimlanes and a prototype choice. Set the stage: this is the story of narrowing and deciding.",
  },
  {
    id: "problems",
    order: 2,
    section: "background",
    title: "The problems",
    subtitle: "20 pain points we started with",
    body: "The broad landscape — manual entry, chasing approvers, no visibility, trust and risk. We didn’t invent the list; we ranked it and used it to focus.",
  },
  {
    id: "scoring",
    order: 3,
    section: "background",
    title: "Scoring",
    subtitle: "Severity, feasibility, benefit of AI",
    body: "Stack-ranked so we could compare apples to apples. The matrix is how we got from 20 areas to the ones that are both important and AI-relevant.",
  },
  {
    id: "swimlanes",
    order: 4,
    section: "background",
    title: "3 Swimlanes",
    subtitle: "Backed by data",
    body: "Bill Payment Planner, Approval Workflow, Just Pay. Each lane resolves a different bottleneck. We didn’t pick one and forget the rest — we’re showing the full picture.",
  },
  {
    id: "explorations",
    order: 5,
    section: "background",
    title: "Concept explorations",
    subtitle: "Compare and rank",
    body: "Concepts generated across the three swimlanes, scored and ranked. This is where we turned ideas into a shortlist and synthetic user feedback into a filter.",
  },
  {
    id: "concepts",
    order: 6,
    section: "background",
    title: "Our 3 concepts",
    subtitle: "Final recommendation",
    body: "The three we’re taking forward: Bill Pay Planner, Intelligent Bill Approval, Just Pay. Launch point for the prototype and the Diya pitch.",
  },
  // Bill Pay Planner — multiple screens
  { id: "bill-pay-1", order: 7, section: "screens", conceptId: "bill-pay", title: "Overview", subtitle: "Help me pay the bills in this screen", body: "Dashboard view. Status upfront: total across bills, overdue. Progressive disclosure on tap. Make a plan: Conservative / Standard / Growth." },
  { id: "bill-pay-2", order: 8, section: "screens", conceptId: "bill-pay", title: "Strategy selected", subtitle: "Standard · Pay what's due this week", body: "Cash flow summary: balance, paying now, after payment. Pay now list with checkboxes; deferred list. User can toggle bills and see impact." },
  { id: "bill-pay-3", order: 9, section: "screens", conceptId: "bill-pay", title: "Plan result", subtitle: "Anomaly callout", body: "If a bill is unusual (e.g. 40% higher), we call it out inline. Verify before paying. Overdraw warning if selections would overdraw. Pay N bills CTA." },
  { id: "bill-pay-4", order: 10, section: "screens", conceptId: "bill-pay", title: "Payments scheduled", subtitle: "Success", body: "Confirmation: amount and suppliers. What's next (deferred bills). Back to bills / View in Payments. Training peek: in the future we can do this automatically." },
  // Intelligent Bill Approval — multiple screens
  { id: "approval-1", order: 11, section: "screens", conceptId: "approval", title: "Sarah — Schedule payment run", subtitle: "Needs attention + Looks good", body: "Sarah (AP Clerk) sees bills grouped: needs attention (anomalies, duplicate, bank change) and looks good. Send N payments for authorization." },
  { id: "approval-2", order: 12, section: "screens", conceptId: "approval", title: "Sarah sent", subtitle: "Email to Alex", body: "Confirmation that the batch was sent. What Alex will see. Literal email (and chasing) in the story." },
  { id: "approval-3", order: 13, section: "screens", conceptId: "approval", title: "Alex — Review list", subtitle: "Needs your review / Looks good", body: "Alex (Manager) sees Sarah's run. Needs review items with flags; looks good items. Can open detail for anomaly (e.g. SMART Agency 40% higher, amount over time chart)." },
  { id: "approval-4", order: 14, section: "screens", conceptId: "approval", title: "Alex — Authorise", subtitle: "Hold or authorise", body: "Detail view: Hold payment or Authorise. Batch authorise for looks-good items. Sarah signed off at 3:24 + note for handover." },
  // Just Pay — multiple screens
  { id: "just-pay-1", order: 15, section: "screens", conceptId: "just-pay", title: "Entry", subtitle: "Recently paid / AI suggestion", body: "Pay someone without creating a bill first. Search or recently paid list. AI suggestion (e.g. Swanston Security due monthly)." },
  { id: "just-pay-2", order: 16, section: "screens", conceptId: "just-pay", title: "Amount & context", subtitle: "Payment context", body: "Supplier, amount, last payment, usual range, frequency. Optional reference. Review payment." },
  { id: "just-pay-3", order: 17, section: "screens", conceptId: "just-pay", title: "Confirm payment", subtitle: "Xero will automatically…", body: "Pay from / to / when. Xero will: create bill record, match contact, reconcile when it clears. Cancel or Pay $X." },
  { id: "just-pay-4", order: 18, section: "screens", conceptId: "just-pay", title: "Payment sent", subtitle: "WhatsApp payoff", body: "Status: Processing. Bill created. Expected arrival. What's next. Then: confirmation or follow-up via WhatsApp — proactive notification." },
];

export function getStoryboardBeat(id: string): StoryboardBeat | undefined {
  return storyboardBeats.find((b) => b.id === id);
}

export function getStoryboardBeatIds(): string[] {
  return storyboardBeats.map((b) => b.id);
}

export function getBeatsBySection(): { sectionId: string; sectionTitle: string; beats: StoryboardBeat[] }[] {
  return STORYBOARD_SECTIONS.map(({ id, title }) => ({
    sectionId: id,
    sectionTitle: title,
    beats: storyboardBeats.filter((b) => b.section === id),
  }));
}

/** For "screens" section only: group beats by concept for display (Bill Pay Planner, Approval, Just Pay). */
export function getScreenBeatsByConcept(): { conceptId: string; conceptTitle: string; beats: StoryboardBeat[] }[] {
  const screenBeats = storyboardBeats.filter((b) => b.section === "screens" && b.conceptId);
  const byConcept = new Map<string, StoryboardBeat[]>();
  for (const beat of screenBeats) {
    const id = beat.conceptId!;
    if (!byConcept.has(id)) byConcept.set(id, []);
    byConcept.get(id)!.push(beat);
  }
  return (["bill-pay", "approval", "just-pay"] as const).filter((id) => byConcept.has(id)).map((id) => ({
    conceptId: id,
    conceptTitle: SCREEN_CONCEPT_LABELS[id] ?? id,
    beats: byConcept.get(id)!.sort((a, b) => a.order - b.order),
  }));
}
