import { getPitch } from "./pitches";

export const SWIM_LANES = [
  "Cash-Aware Bill Pay Planner",
  "Approval Concierge",
  "Just Pay (No-Bill Pay)",
] as const;

export type SwimLane = (typeof SWIM_LANES)[number];

/** Short display labels for table/export. */
export const SWIM_LANE_LABELS: Record<SwimLane, string> = {
  "Cash-Aware Bill Pay Planner": "Swimlane1",
  "Approval Concierge": "Swimlane2",
  "Just Pay (No-Bill Pay)": "Swimlane3",
};

export type ConfidenceLevel = "low" | "medium" | "high";

export type ExplorationStatus =
  | "draft"
  | "shortlisted"
  | "in-review"
  | "selected"
  | "archived";

export type GreyboxRepresentationType = "placeholder" | "wireframe" | "prototype";

export type QuoteSentiment = "positive" | "negative" | "neutral";

export interface SyntheticUserQuote {
  persona: string;
  quote: string;
  /** Drives UI color: green (positive), red (negative), black (neutral). */
  sentiment?: QuoteSentiment;
}

export interface ExplorationSeed {
  conceptTitle: string;
  overrideScores?: Partial<{
    desirability: number;
    agenticPotential: number;
    feasibility: number;
    recommendationRank: number;
    confidenceScore: number;
  }>;
  /** Optional notable quote(s) from synthetic user evaluation. */
  syntheticUserQuotes?: SyntheticUserQuote[];
  /** Strongest argument for why this idea sucks (Detractor POV). */
  redTeam?: string;
}

export interface SwimLaneSeed {
  name: SwimLane;
  concepts: ExplorationSeed[];
}

export interface ExplorationSeedDataset {
  version: string;
  generatedAt: string;
  lanes: SwimLaneSeed[];
}

export interface GreyboxDefinition {
  representationType: GreyboxRepresentationType;
  preview1000: {
    width: number;
    height: number;
    assetPath: string;
    viewportHint: string;
  };
  layoutNotes: string;
}

export interface ExplorationExportPayload {
  cardTitle: string;
  cardDescription: string;
  tags: string[];
  metadata: Record<string, string | number>;
}

export interface ExplorationConcept {
  id: string;
  swimLane: SwimLane;
  conceptTitle: string;
  problemStatement: string;
  targetUser: string;
  valueHypothesis: string;
  /** Full pitch: value + agent alignment + feasibility. Shown in Pitch column (top 20) and confidence content. */
  pitch: string;
  desirability: number;
  agenticPotential: number;
  feasibility: number;
  recommendationRank: number;
  confidenceLevel: ConfidenceLevel;
  confidenceScore: number;
  explainer: string;
  /** Quote(s) from synthetic user evaluation; always at least 2 (generated if not in seed). */
  syntheticUserQuotes: SyntheticUserQuote[];
  /** Strongest argument for why this idea sucks (Detractor POV). */
  redTeam: string;
  assumptions: string[];
  risks: string[];
  dependencies: string[];
  evidenceLinks: string[];
  status: ExplorationStatus;
  searchTokens: string[];
  searchText: string;
  greybox: GreyboxDefinition;
  exportPayload: ExplorationExportPayload;
}

const LANE_SCORE_BIAS: Record<
  SwimLane,
  { desirability: number; agenticPotential: number; feasibility: number }
> = {
  "Cash-Aware Bill Pay Planner": {
    desirability: 2,
    agenticPotential: 5,
    feasibility: -2,
  },
  "Approval Concierge": {
    desirability: 1,
    agenticPotential: 3,
    feasibility: 2,
  },
  "Just Pay (No-Bill Pay)": {
    desirability: 4,
    agenticPotential: 1,
    feasibility: 4,
  },
};

function clampScore(score: number): number {
  return Math.max(1, Math.min(100, Math.round(score)));
}

function toConfidenceLevel(confidenceScore: number): ConfidenceLevel {
  if (confidenceScore >= 76) {
    return "high";
  }

  if (confidenceScore >= 51) {
    return "medium";
  }

  return "low";
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeConceptId(swimLane: SwimLane, conceptIndex: number): string {
  const lanePrefixByName: Record<SwimLane, string> = {
    "Cash-Aware Bill Pay Planner": "cabp",
    "Approval Concierge": "apc",
    "Just Pay (No-Bill Pay)": "jpbp",
  };

  return `${lanePrefixByName[swimLane]}-${String(conceptIndex + 1).padStart(2, "0")}`;
}

function buildSearchTokens(swimLane: SwimLane, conceptTitle: string): string[] {
  const rawTokens = `${swimLane} ${conceptTitle}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return Array.from(new Set(rawTokens));
}

function validateSeedEntry(seed: ExplorationSeed, context: string): void {
  if (!seed || typeof seed !== "object") {
    throw new Error(`${context} must be an object.`);
  }

  if (typeof seed.conceptTitle !== "string" || !seed.conceptTitle.trim()) {
    throw new Error(`${context}.conceptTitle must be a non-empty string.`);
  }
}

export function validateSeedDataset(data: unknown): ExplorationSeedDataset {
  if (!data || typeof data !== "object") {
    throw new Error("Explorations dataset must be an object.");
  }

  const candidate = data as Partial<ExplorationSeedDataset>;

  if (typeof candidate.version !== "string" || !candidate.version.trim()) {
    throw new Error("Explorations dataset requires a non-empty version.");
  }

  if (typeof candidate.generatedAt !== "string" || !candidate.generatedAt.trim()) {
    throw new Error("Explorations dataset requires a non-empty generatedAt timestamp.");
  }

  if (!Array.isArray(candidate.lanes) || candidate.lanes.length !== SWIM_LANES.length) {
    throw new Error(`Explorations dataset must include exactly ${SWIM_LANES.length} lanes.`);
  }

  const seenLaneNames = new Set<string>();
  const validatedLanes = candidate.lanes.map((lane, laneIndex) => {
    if (!lane || typeof lane !== "object") {
      throw new Error(`Lane at index ${laneIndex} must be an object.`);
    }

    if (!SWIM_LANES.includes(lane.name)) {
      throw new Error(`Lane "${String(lane.name)}" is not an allowed swim lane.`);
    }

    if (seenLaneNames.has(lane.name)) {
      throw new Error(`Lane "${lane.name}" is duplicated.`);
    }
    seenLaneNames.add(lane.name);

    if (!Array.isArray(lane.concepts) || lane.concepts.length !== 33) {
      throw new Error(`Lane "${lane.name}" must contain exactly 33 concepts.`);
    }

    lane.concepts.forEach((seed, conceptIndex) => {
      validateSeedEntry(seed, `lane[${lane.name}].concepts[${conceptIndex}]`);
    });

    return lane as SwimLaneSeed;
  });

  return {
    version: candidate.version,
    generatedAt: candidate.generatedAt,
    lanes: validatedLanes,
  };
}

/** Pool of varied quotes by persona and sentiment so each concept gets a distinct mix. */
const BILL_CREATOR_QUOTES: SyntheticUserQuote[] = [
  { persona: "Bill Creator", quote: "This is exactly what I've been missing.", sentiment: "positive" },
  { persona: "Bill Creator", quote: "I'd use this tomorrow if it shipped.", sentiment: "positive" },
  { persona: "Bill Creator", quote: "Finally something that gets how I actually work.", sentiment: "positive" },
  { persona: "Bill Creator", quote: "This could actually change how I do bills.", sentiment: "positive" },
  { persona: "Bill Creator", quote: "Sign me up — this is the first thing that's felt right.", sentiment: "positive" },
  { persona: "Bill Creator", quote: "Could be useful. I'd have to try it.", sentiment: "neutral" },
  { persona: "Bill Creator", quote: "Maybe. Depends how much it adds to my flow.", sentiment: "neutral" },
  { persona: "Bill Creator", quote: "I guess I'd give it a shot.", sentiment: "neutral" },
  { persona: "Bill Creator", quote: "Sounds fine if it's not another screen to click through.", sentiment: "neutral" },
  { persona: "Bill Creator", quote: "Not sure I'd notice the difference either way.", sentiment: "neutral" },
  { persona: "Bill Creator", quote: "Another thing to learn. I'm already overwhelmed.", sentiment: "negative" },
  { persona: "Bill Creator", quote: "I'd probably ignore it.", sentiment: "negative" },
  { persona: "Bill Creator", quote: "Sounds like more complexity, not less.", sentiment: "negative" },
  { persona: "Bill Creator", quote: "Hard pass — I just want to pay the bill.", sentiment: "negative" },
];

const CAUTIOUS_APPROVER_QUOTES: SyntheticUserQuote[] = [
  { persona: "Cautious Approver", quote: "This would cut my approval time in half.", sentiment: "positive" },
  { persona: "Cautious Approver", quote: "I'd trust this if the controls are clear.", sentiment: "positive" },
  { persona: "Cautious Approver", quote: "Exactly what I need — visibility without the busywork.", sentiment: "positive" },
  { persona: "Cautious Approver", quote: "This could finally make the queue manageable.", sentiment: "positive" },
  { persona: "Cautious Approver", quote: "I'm in. Show me the guardrails and I'm good.", sentiment: "positive" },
  { persona: "Cautious Approver", quote: "Worth a look. Need to see the details.", sentiment: "neutral" },
  { persona: "Cautious Approver", quote: "Could help if it doesn't hide the important stuff.", sentiment: "neutral" },
  { persona: "Cautious Approver", quote: "I'm open to it if the audit trail is there.", sentiment: "neutral" },
  { persona: "Cautious Approver", quote: "Sure, if it doesn't add more steps for me.", sentiment: "neutral" },
  { persona: "Cautious Approver", quote: "Neutral. Would need to see it in context.", sentiment: "neutral" },
  { persona: "Cautious Approver", quote: "If this auto-approves anything, we have a problem.", sentiment: "negative" },
  { persona: "Cautious Approver", quote: "I need to see everything. No black boxes.", sentiment: "negative" },
  { persona: "Cautious Approver", quote: "This could make my job harder if it's wrong.", sentiment: "negative" },
  { persona: "Cautious Approver", quote: "I'd block this without manual override.", sentiment: "negative" },
];

const AP_CLERK_QUOTES: SyntheticUserQuote[] = [
  { persona: "AP Clerk", quote: "This would save me hours every week.", sentiment: "positive" },
  { persona: "AP Clerk", quote: "Finally a feature that matches how we actually operate.", sentiment: "positive" },
  { persona: "AP Clerk", quote: "I'd roll this out to the team tomorrow.", sentiment: "positive" },
  { persona: "AP Clerk", quote: "This is the kind of thing that gets adoption.", sentiment: "positive" },
  { persona: "AP Clerk", quote: "Real impact. I'd champion this.", sentiment: "positive" },
  { persona: "AP Clerk", quote: "Might help. Would depend on the implementation.", sentiment: "neutral" },
  { persona: "AP Clerk", quote: "Could go either way.", sentiment: "neutral" },
  { persona: "AP Clerk", quote: "I'd need to live with it for a bit.", sentiment: "neutral" },
  { persona: "AP Clerk", quote: "Not opposed. Not excited either.", sentiment: "neutral" },
  { persona: "AP Clerk", quote: "We could try it and see.", sentiment: "neutral" },
  { persona: "AP Clerk", quote: "Another system to keep in sync. No thanks.", sentiment: "negative" },
  { persona: "AP Clerk", quote: "We've seen features like this fall flat.", sentiment: "negative" },
  { persona: "AP Clerk", quote: "Would rather keep the current workflow.", sentiment: "negative" },
  { persona: "AP Clerk", quote: "Too much change for uncertain gain.", sentiment: "negative" },
];

const ALL_QUOTE_POOLS = [BILL_CREATOR_QUOTES, CAUTIOUS_APPROVER_QUOTES, AP_CLERK_QUOTES];

/** Detractor POV: strongest argument for why this idea sucks — competitors, Xero sentiment, risk. */
const RED_TEAM_BILL_CREATOR: string[] = [
  "QuickBooks already does this and my accountant lives there. Why would I trust Xero to get it right when I've had to work around Xero's quirks for years?",
  "Xero keeps adding stuff I don't use. This feels like another half-baked feature that'll change in six months. I'm tired of being the guinea pig.",
  "My bank does payment scheduling and I trust them more with my cash. Xero's not where I think 'payments' — it's where I think 'books'.",
  "Ramp and Brex are built for this. If I cared about this problem I'd already be on a card. Xero coming late with an AI story doesn't move me.",
  "I don't feel like Xero gets small business. This sounds like enterprise theatre. I just need to pay the bill and move on.",
  "Honestly? I'm one bad experience away from switching. If this goes wrong or feels like bloat, I'm looking at alternatives.",
];
const RED_TEAM_CAUTIOUS_APPROVER: string[] = [
  "Audit and compliance will never accept 'the AI recommended it'. Our auditors want a clear, human-led process. Xero pushing automation here undermines trust.",
  "We've seen Xero's track record on approvals — fragmented, different in every region. Why would I bet on another layer that might not integrate with our bank or our rules?",
  "Competitors like ApprovalMax and Dext already own this space. Xero bolting on AI feels like catch-up, not a reason to stay. I need something that's built for control.",
  "If one payment goes wrong, the board asks me — not Xero. I need to see everything and own every decision. Black-box AI is a non-starter for my role.",
  "Xero's strength is books, not payments. Pushing me to approve in Xero when my bank and our policies live elsewhere adds risk I don't need.",
  "I don't trust Xero to get approval workflows right. We've had to build workarounds. Adding AI on top of a shaky base is how we get burned.",
];
const RED_TEAM_AP_CLERK: string[] = [
  "We've already standardised on [other tool] for approvals. Xero coming in with another workflow means double entry, more training, and more things that break. Not worth the switch.",
  "Intuit and Sage are ahead on AI in accounting. If Xero's play is 'we've got AI too', that's not a differentiator — it's a reason to re-evaluate who we use for the full stack.",
  "Xero keeps changing the product. My team just got used to the last update. Rolling out another 'smart' feature that might change or get deprecated is a support nightmare.",
  "Our accountants and our bank are in different ecosystems. Xero trying to own the approval step in the middle doesn't fit how we actually work. It's Xero-centric, not us-centric.",
  "I've seen features like this get hyped and then neglected. Unless Xero commits to this for the long term and it works in my region, it's just noise.",
  "The problem isn't that we need more Xero — it's that we need less friction from the tools we already use. This feels like more Xero, not less friction.",
];

const RED_TEAM_POOLS: string[][] = [RED_TEAM_BILL_CREATOR, RED_TEAM_CAUTIOUS_APPROVER, RED_TEAM_AP_CLERK];
const RED_TEAM_PERSONAS = ["Bill Creator", "Cautious Approver", "AP Clerk"] as const;

function pickRedTeamQuote(laneIndex: number, conceptIndex: number): string {
  const n = laneIndex * 33 + conceptIndex;
  const poolIdx = n % RED_TEAM_POOLS.length;
  const pool = RED_TEAM_POOLS[poolIdx];
  const quoteIdx = Math.floor(n / RED_TEAM_POOLS.length) % pool.length;
  const persona = RED_TEAM_PERSONAS[poolIdx];
  return `${persona}: ${pool[quoteIdx]}`;
}

function pickVariedQuotes(
  _swimLane: SwimLane,
  laneIndex: number,
  conceptIndex: number
): SyntheticUserQuote[] {
  const n = laneIndex * 33 + conceptIndex;
  return ALL_QUOTE_POOLS.map((pool, poolIdx) => {
    const i = (n + poolIdx * 7) % pool.length;
    const q = pool[i];
    return { ...q, sentiment: q.sentiment ?? "neutral" };
  });
}

export function normalizeConcept(
  swimLane: SwimLane,
  seed: ExplorationSeed,
  laneIndex: number,
  conceptIndex: number
): ExplorationConcept {
  const baseDesirability = 82 - conceptIndex * 0.75 + laneIndex * 0.2;
  const baseAgenticPotential = 86 - conceptIndex * 0.65 + laneIndex * 0.1;
  const baseFeasibility = 76 - conceptIndex * 0.55 + laneIndex * 0.4;
  const baseRecommendationRank = 95 - conceptIndex;
  const baseConfidenceScore = 78 - conceptIndex * 0.9;
  const scoreBias = LANE_SCORE_BIAS[swimLane];

  const desirability = clampScore(
    seed.overrideScores?.desirability ?? baseDesirability + scoreBias.desirability
  );
  const agenticPotential = clampScore(
    seed.overrideScores?.agenticPotential ??
      baseAgenticPotential + scoreBias.agenticPotential
  );
  const feasibility = clampScore(
    seed.overrideScores?.feasibility ?? baseFeasibility + scoreBias.feasibility
  );
  const recommendationRank = clampScore(
    seed.overrideScores?.recommendationRank ?? baseRecommendationRank
  );
  const confidenceScore = clampScore(
    seed.overrideScores?.confidenceScore ?? baseConfidenceScore
  );
  const confidenceLevel = toConfidenceLevel(confidenceScore);

  const id = makeConceptId(swimLane, conceptIndex);
  const searchTokens = buildSearchTokens(swimLane, seed.conceptTitle);
  const searchText = `${swimLane} ${seed.conceptTitle} ${searchTokens.join(" ")}`.toLowerCase();

  const problemStatement = `Teams need clearer decisions for "${seed.conceptTitle}" in the ${swimLane} lane without adding manual workflow overhead.`;
  const targetUser =
    swimLane === "Approval Concierge"
      ? "Finance approvers and controllers"
      : swimLane === "Cash-Aware Bill Pay Planner"
        ? "AP managers balancing due dates and liquidity"
        : "Small business operators who need to pay quickly";
  const valueHypothesis = `"${seed.conceptTitle}" can reduce friction while improving confidence in payment decisions for ${targetUser.toLowerCase()}.`;
  const pitch = getPitch(seed.conceptTitle, swimLane, feasibility);
  const explainer = "";
  const redTeam = seed.redTeam?.trim() ?? pickRedTeamQuote(laneIndex, conceptIndex);

  const assumptions = [
    "Invoice and contact data quality is sufficient for guided automation.",
    "Users allow recommendations before final approval.",
  ];
  const risks = [
    "Policy exceptions may require manual override paths.",
    "Confidence can drop when supplier metadata is incomplete.",
  ];
  const dependencies = [
    "Reliable bill ingestion and supplier matching",
    "Approval and payment APIs available for orchestration",
  ];

  const greyboxAssetSlug = toSlug(seed.conceptTitle);
  const greybox: GreyboxDefinition = {
    representationType: "placeholder",
    preview1000: {
      width: 1000,
      height: 640,
      assetPath: `/greyboxes/${toSlug(swimLane)}/${greyboxAssetSlug}.png`,
      viewportHint: "Desktop 1000px review viewport",
    },
    layoutNotes:
      "Header with concept summary, central decision canvas, and right rail metadata chips.",
  };

  const exportPayload: ExplorationExportPayload = {
    cardTitle: seed.conceptTitle,
    cardDescription: explainer,
    tags: [swimLane, confidenceLevel, "draft"],
    metadata: {
      desirability,
      agenticPotential,
      feasibility,
      recommendationRank,
      confidenceScore,
    },
  };

  const PERSONA_ORDER = ["Bill Creator", "Cautious Approver", "AP Clerk"] as const;
  const seedQuotes = seed.syntheticUserQuotes?.length
    ? seed.syntheticUserQuotes.map((q) => ({
        persona: q.persona,
        quote: q.quote,
        sentiment: q.sentiment ?? "neutral",
      }))
    : [];
  const poolQuotes = pickVariedQuotes(swimLane, laneIndex, conceptIndex);
  const byPersona = new Map<string, SyntheticUserQuote>();
  seedQuotes.forEach((q) => byPersona.set(q.persona, q));
  poolQuotes.forEach((q) => {
    if (!byPersona.has(q.persona)) byPersona.set(q.persona, q);
  });
  const syntheticUserQuotes: SyntheticUserQuote[] = PERSONA_ORDER.map(
    (p) => byPersona.get(p) ?? poolQuotes[PERSONA_ORDER.indexOf(p)]!
  );

  return {
    id,
    swimLane,
    conceptTitle: seed.conceptTitle,
    problemStatement,
    targetUser,
    valueHypothesis,
    pitch,
    desirability,
    agenticPotential,
    feasibility,
    recommendationRank,
    confidenceLevel,
    confidenceScore,
    explainer,
    syntheticUserQuotes,
    assumptions,
    risks,
    dependencies,
    evidenceLinks: [],
    status: "draft",
    searchTokens,
    searchText,
    redTeam,
    greybox,
    exportPayload,
  };
}
