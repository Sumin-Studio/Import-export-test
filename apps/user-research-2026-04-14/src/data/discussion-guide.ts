export type GuideTag = "P" | "S" | "T";

/** String, or an object with optional Robb highlight (red on /discussion-guide). */
export type GuideLine = string | { text: string; robbHighlight: true };

export function guideLineText(line: GuideLine): string {
  return typeof line === "string" ? line : line.text;
}

export type GuideSection = {
  id: string;
  title: string;
  duration?: string;
  tags?: GuideTag[];
  primary: GuideLine[];
  secondary?: GuideLine[];
  ifTime?: GuideLine[];
};

export const DISCUSSION_GUIDE_SPINE = [
  "Learn about them",
  "Show me their setup",
  "Xero Protect — list then detail",
  "Purchases Overview — agent home + cashflow",
  "Done — wrap",
] as const;

export const DISCUSSION_GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "before",
    title: "Before the session",
    tags: ["P"],
    primary: [
      "PAF/NDA signed",
      "Prototype tabs open, not shared",
      "PO: Prototype settings → Cash flow shortfall (then running low only if needed for threshold)",
      "Default purchases overview uses Apply plan → JAX + Melio (`?scenario=diya-demo` on links). Use ?scenario=in-product only if you need Apply plan to stay in-product (no Melio). **Make a plan** expands the plan; **Apply plan** opens Melio — not the same button",
      "Observers / recording",
    ],
  },
  {
    id: "intro",
    title: "1. Intro & consent",
    duration: "~5 min",
    tags: ["P"],
    primary: [
      "Your world first; early ideas; honest reactions help",
      "Consent to record; pause anytime",
      "60 minutes, sound good?",
    ],
  },
  {
    id: "warmup",
    title: "2. Warm up — who they are",
    duration: "~5 min",
    tags: ["P"],
    primary: [
      "Business / practice — what do you do, how many people?",
      "Role on bills — enter, approve, pay?",
      "Invoicing today — same person or separate person?",
      "Rough monthly supplier bill volume?",
    ],
  },
  {
    id: "setup",
    title: "3. Show me their setup",
    duration: "~15 min",
    tags: ["P"],
    primary: [
      "Screen share: bill arrives → review → approve → pay",
      "Where do bills come from?",
      "What do you check when reviewing?",
      "Tell me a story about things going wrong",
      "What do you wish Xero noticed?",
    ],
  },
  {
    id: "desirability",
    title: "4. Desirability — feelings first",
    duration: "~5–7 min",
    tags: ["P", "S", "T"],
    primary: [
      "If Xero could flag risky bills before you paid (duplicates, unusual amounts, new supplier details) — how would that make you feel?",
    ],
    secondary: [
      "Valuable vs annoying? Change how you feel about paying bills in Xero?",
      "Nice-to-have vs actively want?",
      "AI in this workflow?",
    ],
    ifTime: ["Other AP tools alongside Xero? (e.g. ApprovalMax, Ramp)"],
  },
  {
    id: "protect-list",
    title: "5. Xero Protect — bills list",
    duration: "~5 min",
    tags: ["P"],
    primary: [
      "What are you noticing?",
      "What is the icon/alert telling you?",
      "Trust? What would increase or decrease trust?",
      "What would you do next?",
    ],
  },
  {
    id: "protect-detail",
    title: "6. Xero Protect — bill detail",
    duration: "~5 min",
    tags: ["P", "S"],
    primary: [
      "What’s the alert saying — enough? too much?",
      "Pay, pause, investigate, ignore?",
      "Dismiss — just you or everyone in the org?",
    ],
    secondary: [
      "CTA placement — one variant if behind: where does your eye go?",
    ],
  },
  {
    id: "dupes",
    title: "7. Coexistence — duplicate detection",
    duration: "~3–5 min",
    tags: ["S"],
    primary: [
      "Org-level duplicate help vs per-bill Protect — fit together or same job?",
      "If both stayed — one story or two?",
    ],
  },
  {
    id: "po",
    title: "8. Purchases Overview",
    duration: "~20–25 min",
    tags: ["P", "S"],
    primary: [
      "8a Framing: where do you start when bills are on your mind? One screen — what on it? (note before reveal)",
      "8b Unguided first look",
      {
        text: '8d — Robb: What do you think about a cashflow threshold? Or do you try to maintain a certain amount of available cash? (Show cash flow running low if needed — threshold toggle.)',
        robbHighlight: true,
      },
      {
        text: "8d — Robb: How many days would you feel comfortable delaying a bill payment?",
        robbHighlight: true,
      },
      {
        text: "8d — Robb: How do you think about how critical certain bills are to pay over others?",
        robbHighlight: true,
      },
      {
        text: '8e — Robb: After clicking “Make a plan”, is it clear you’re only changing the planned payment date of the bill? Is that a feature you currently use?',
        robbHighlight: true,
      },
      "8f Visit: scenario that brings you here? how often? where chart + suggested plans fit?",
      "8h If using ?scenario=diya-demo: after Apply plan → Melio prep — does this feel like Xero, Melio, or a handoff you’d trust? US bill pay only in this prototype; what would you expect for your region?",
    ],
    secondary: ["8c Comprehension / trust", "8g Co-design"],
  },
  {
    id: "wrap",
    title: "9. Wrap up",
    duration: "~5 min",
    tags: ["P"],
    primary: [
      "Biggest standout?",
      "One thing you’d change?",
      "Anything we didn’t ask?",
      "Follow-up ok?",
      "Thanks + incentive",
    ],
  },
];

/** Parses "~5 min", "~5–7 min", "~20–25 min" into a single number (minutes). */
export function parseDurationToMinutes(duration: string | undefined): number {
  if (!duration) return 0;
  const t = duration.replace(/\s/g, "");
  const range = t.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (range) {
    const a = Number(range[1]);
    const b = Number(range[2]);
    return Math.round((a + b) / 2);
  }
  const single = t.match(/(\d+)/);
  return single ? Number(single[1]) : 0;
}

export type SectionScheduleSlot = {
  sectionId: string;
  /** Minutes from session anchor to this section’s planned start. */
  startOffsetMinutes: number;
  durationMinutes: number;
};

/** Builds cumulative offsets in guide order (before = 0 min offset, 0 duration). */
export function buildSectionScheduleSlots(): SectionScheduleSlot[] {
  let offset = 0;
  return DISCUSSION_GUIDE_SECTIONS.map((section) => {
    const durationMinutes = parseDurationToMinutes(section.duration);
    const slot: SectionScheduleSlot = {
      sectionId: section.id,
      startOffsetMinutes: offset,
      durationMinutes,
    };
    offset += durationMinutes;
    return slot;
  });
}
