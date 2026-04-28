export type HubDocKind = "repo" | "external" | "route";

export interface HubDocLink {
  label: string;
  href: string;
  kind: HubDocKind;
}

export interface HubUpdate {
  date: string;
  title: string;
  detail: string;
}

export interface SquadResourceDirectory {
  label: string;
  directory: string;
  keywords: string[];
  limit?: number;
}

export interface HubSquadRow {
  priority: string;
  agent: string;
  squadLabel: string;
  /** Optional markdown fragments for the hub table cells. */
  prdCell?: string;
  designCell?: string;
  protoCell?: string;
}

export interface HubAgent {
  slug: string;
  title: string;
  squadLabel: string;
  trackLabel: string;
  trackColor: string;
  owner: string;
  ba?: string;
  em?: string;
  eng: string;
  consult: string;
  pm: string;
  design?: string;
  geography: string;
  status: "Defining" | "Exploring" | "Active";
  summary: string;
  pageTitleSuffix: string;
  roadmap: string[];
  teamLine: string;
  timezone: string;
  focusAreas: string[];
  docs: HubDocLink[];
  updates: HubUpdate[];
  resourceDirectories: SquadResourceDirectory[];
}

export const hubOverview = {
  title: "Safer A2A Tiger Team",
  strapline:
    "A simple home for the squads rushing to define, pitch, and build the next wave of payments agents.",
  intro:
    "Each squad has a focused page with the best links first, then a raw list of repo materials from the mapped directories underneath.",
  principles: [
    "Keep the front page simple and team-readable.",
    "Use squad pages for deeper context and resource lists.",
    "Keep the change log lightweight and day-by-day.",
  ],
  nextSteps: [
    "Confirm the screenshot structure against the live squad list.",
    "Keep adding mapped resources as each squad picks up more artifacts.",
    "Decide which squad pages should become richer working spaces next.",
  ],
};

export const hubSquadRows: HubSquadRow[] = [
  {
    priority: "P0",
    agent: "Bill Enrichment",
    squadLabel: "Squad 01",
  },
  {
    priority: "P0",
    agent: "Cash Flow Actions",
    squadLabel: "Squad 01",
    prdCell:
      "[Bill Runner PRD](https://xero.atlassian.net/wiki/spaces/XFS/pages/271910174842/PRD+-+Payments+-+Bill+Runner+Agent+-+Global)",
  },
  {
    priority: "P1",
    agent: "Cash Flow Optimizer",
    squadLabel: "Squad 01",
  },
  {
    priority: "P1",
    agent: "Approval Automation",
    squadLabel: "Squad 02",
    prdCell: "[PRD](https://xero.atlassian.net/wiki/spaces/XFS/pages/edit-v2/271752921366?)",
    protoCell: "[Prototype](https://blue-superfast-jellyfish.vercel.app/xero-protect/prototype)",
  },
  {
    priority: "P0",
    agent: "Safety Shield",
    squadLabel: "Squad 02",
    prdCell: "[Safety Shield PRD](https://xero.atlassian.net/wiki/spaces/XFS/pages/271930622046)",
    designCell:
      "[Safety Shield ERD](https://xero.atlassian.net/wiki/spaces/XFS/pages/271947628554/Safety+Shield+Architectural+Discovery)",
    protoCell:
      "[Figma mocks](https://www.figma.com/design/eYIir5hHzM4afedKJkTwM3/Agents-%E2%80%93---March-12-?node-id=7001-168712)<br/>[Prototype](https://blue-superfast-jellyfish.vercel.app/xero-protect/prototype)",
  },
  {
    priority: "P0",
    agent: "Just Pay for Bills",
    squadLabel: "Squad 03",
    prdCell:
      "[PRD](https://xero.atlassian.net/wiki/spaces/XFS/pages/271903392336/PRD+-+Just+Pay+Your+AI-powered+Payment+Product+WIP)",
  },
  {
    priority: "P0",
    agent: "Approval workflow enablement",
    squadLabel: "Squad 04",
  },
  {
    priority: "P0",
    agent: "Approvals engine foundations",
    squadLabel: "Squad 04",
  },
  {
    priority: "P1",
    agent: "Roster and scope alignment",
    squadLabel: "Squad 04",
  },
  {
    priority: "P2",
    agent: "Pending squad definition",
    squadLabel: "Squad 05",
  },
  {
    priority: "P0",
    agent: "[Global onboarding] Payments first Xero Onboarding",
    squadLabel: "Onboarding",
    prdCell:
      "[PRD 1](https://xero.atlassian.net/wiki/spaces/XFS/pages/271903392336/PRD+-+Just+Pay+Your+AI-powered+Payment+Product+WIP)<br/>[PRD 2](https://xero.atlassian.net/wiki/spaces/XFS/pages/271936029124/PRD+-+Payments+Platform+-+Fast+Pass+Onboarding+-+US)",
    designCell:
      "[WIP mocks](https://drive.google.com/file/d/17V76XdX8VCPcCUpdesTlgMMXoVFwkrIJ/view?resourcekey)",
    protoCell:
      "[Prototype](https://drive.google.com/file/d/1MdgcWvmjlF_C7CJqmZ4OBp9PKeMnW6LO/view?resourcekey)",
  },
  {
    priority: "P0",
    agent: "Universal Cashflow Protocol",
    squadLabel: "Cross-team",
    designCell:
      "[Product strategy](https://docs.google.com/presentation/d/1VFmnuez-11sCkxntFAkrVVs_KK015jmz5b5yU_dDldo/edit)",
    protoCell:
      "[Prototype](https://drive.google.com/file/d/1fOcj70oIXG5_aP6aFMQms6fZgXlqJN9E/view)",
  },
  {
    priority: "P0",
    agent: "[Invoice] Payment Chasing Agent",
    squadLabel: "Invoices",
    prdCell:
      "[PRD](https://xero.atlassian.net/wiki/spaces/JAX/pages/271523184840/PRD+-+Payer-chasing+agent+-+Front-end+s)",
    designCell: "[Miro board](https://miro.com/app/board/uXjVGGfXNd4=/)",
  },
];

export const initialPitchLinks: HubDocLink[] = [
  {
    label: "The February Pitch Prototypes",
    href: "/february-pitch",
    kind: "route",
  },
  {
    label: "Behind the scenes: how we went from 99 concepts to one direction",
    href: "/app/walkthrough/1",
    kind: "route",
  },
];

/** Link to the Safety Shield prototypes index (list of all prototypes). */
export const latestPrototypesLink: HubDocLink = {
  label: "Latest prototypes",
  href: "/xero-protect/prototype",
  kind: "route",
};

export const hubAgents: HubAgent[] = [
  {
    slug: "a2a",
    title: "Bill · Cash Flow",
    squadLabel: "Squad 01",
    trackLabel: "Discover",
    trackColor: "#2DD4BF",
    owner: "Darren Alvares",
    ba: "Eddy Horwood",
    em: "Kai Shum",
    pm: "Joe Armstrong",
    eng: "Primin Schuermann",
    design: "Dale Thornton",
    consult: "",
    geography: "",
    status: "Active",
    summary:
      "Bill Runner, bill enrichment, and cash flow optimization grouped into one cash-flow-heavy squad.",
    pageTitleSuffix: "Bill Cash Flow Discover",
    roadmap: ["Bill Runner (P0)", "Bill Enrichment (P0)", "Cash Flow Optimizer (P1)"],
    teamLine: "Dillon / ? / Mugdha / Jon (+ Robb consult)",
    timezone: "New Zealand",
    focusAreas: [
      "Bill Runner framing and cashflow story",
      "Bill enrichment connection to the squad roadmap",
      "How planning, prediction, and optimization fit together",
    ],
    docs: [
      {
        label: "A2A prototype",
        href: "/",
        kind: "route",
      },
      {
        label: "Four agents assignment",
        href: "docs/strategy/2026-03-06-four-agents-assignment.md",
        kind: "repo",
      },
      {
        label: "Bill Runner PRD summary",
        href: "docs/reference/2026-03-06-prd-bill-runner-agent-global.md",
        kind: "repo",
      },
      {
        label: "Bill Runner PRD (Confluence)",
        href: "https://xero.atlassian.net/wiki/spaces/XFS/pages/271910174842/PRD+-+Payments+-+Bill+Runner+Agent+-+Global",
        kind: "external",
      },
      {
        label: "Cashflow as hook note",
        href: "docs/reference/2026-03-06-philip-cashflow-hook.md",
        kind: "repo",
      },
      {
        label: "Cashflow workshop note",
        href: "docs/meeting-notes/2026-03-06-cashflow-payments-agents-workshop.md",
        kind: "repo",
      },
    ],
    updates: [
      {
        date: "2026-03-09",
        title: "Cash flow squad page live",
        detail: "The squad now has a simpler team-facing page with links and mapped repo resources.",
      },
      {
        date: "2026-03-06",
        title: "Bill Runner aligned",
        detail: "The official Bill Runner PRD became the strongest current reference for this stream.",
      },
    ],
    resourceDirectories: [
      {
        label: "Strategy",
        directory: "docs/strategy",
        keywords: ["four-agents-assignment", "vision-narrative-for-diya"],
      },
      {
        label: "Reference",
        directory: "docs/reference",
        keywords: ["bill-runner", "cashflow-hook", "david-slack-four-agents"],
      },
      {
        label: "Meeting notes",
        directory: "docs/meeting-notes",
        keywords: ["cashflow", "agents-huddle", "emma-scenario", "david-1on1"],
      },
    ],
  },
  {
    slug: "bill-workflow-1-discover",
    title: "Bill · Workflow (1)",
    squadLabel: "Squad 02",
    trackLabel: "Discover",
    trackColor: "#60A5FA",
    owner: "Jon Bell",
    eng: "Tauqir",
    consult: "Audrey Chen",
    pm: "Rory",
    geography: "AU skew",
    status: "Active",
    summary:
      "Safety Shield and approval automation grouped into the first workflow squad, focused on risk, routing, and approvals.",
    pageTitleSuffix: "Bill Workflow 1 Discover",
    roadmap: ["Safety Shield (P0)", "Approval Automation (P1)"],
    teamLine: "Rory / ? / Tauqir / Jon (+ Audrey consult)",
    timezone: "AU",
    focusAreas: [
      "Approval routing and chasing",
      "Safety Shield and approval boundaries",
      "Exception handling and low-risk automation",
    ],
    docs: [
      {
        label: "Safety Shield kickoff",
        href: "docs/meeting-notes/2026-03-06-safety-shield-kickoff.md",
        kind: "repo",
      },
      {
        label: "Safety Shield working brief",
        href: "docs/reference/2026-03-10-safety-shield-working-brief.md",
        kind: "repo",
      },
      {
        label: "Safety Shield PRD (Confluence, WIP)",
        href: "https://xero.atlassian.net/wiki/spaces/XFS/pages/271910929566/PRD+-+Payments+-+Safety+Shield+Agent+-+Global",
        kind: "external",
      },
      {
        label: "Recipient consent pattern",
        href: "docs/reference/2026-03-06-recipient-consent-gate-agent-pattern-spec.md",
        kind: "repo",
      },
      {
        label: "Agents huddle",
        href: "docs/meeting-notes/2026-03-06-agents-huddle.md",
        kind: "repo",
      },
      latestPrototypesLink,
      {
        label: "Safety Shield prototypes",
        href: "/xero-protect/prototype",
        kind: "route",
      },
    ],
    updates: [
      {
        date: "2026-03-09",
        title: "Workflow 1 page rewritten around the real work",
        detail:
          "The page was reshaped to read less like a placeholder and more like an active squad log. Instead of generic Confluence framing, it now points back to the kickoff, huddle, async follow-up, and the source docs that show how the team is separating Safety Shield from approval automation and building a working rhythm around that split.",
      },
      {
        date: "2026-03-06",
        title: "Kickoff split Safety Shield from approval routing",
        detail:
          "Jon, Rory, and Tauqir used the Safety Shield kickoff to separate the anomaly-detection service from the approval agent itself. The important insight was that Safety Shield should scan for duplicates, unusual amounts, and first-time suppliers across the bill lifecycle, while the approval agent handles rules, routing, and handoff, which gave the team a cleaner mental model and a clearer shipping path.",
      },
      {
        date: "2026-03-06",
        title: "Agents huddle aligned the story and entry point",
        detail:
          "In the agents huddle with Audrey and Robb, the team mapped Jon's existing approval to handover to chasing prototype onto Bill Workflow 1, clarified the naming against the broader four-agent setup, and treated Spotlight as the likely Xerocon entry point for now. That meeting also surfaced the unresolved questions around desktop fit, ownership boundaries, and where this work should live in the real Xero experience.",
      },
      {
        date: "2026-03-06",
        title: "Async follow-up created momentum, not just notes",
        detail:
          "The Rory and Tauqir follow-up in Slack turned the initial conversations into operating cadence: pre-reads were shared, Rory circulated a first-cut Safety Shield PRD, an existing Lovable prototype was surfaced as useful stimulus, and daily standups were proposed for the following week. The main open question left intentionally alive was whether Safety Shield and Bill Approval should stay independent capabilities or converge later into one broader agent experience.",
      },
    ],
    resourceDirectories: [
      {
        label: "Meeting notes",
        directory: "docs/meeting-notes",
        keywords: ["xero-protect", "safety-shield", "agents-huddle", "rory-tauqir", "david-1on1"],
      },
      {
        label: "Reference",
        directory: "docs/reference",
        keywords: ["recipient-consent", "ramp-ai", "david-slack-four-agents"],
      },
      {
        label: "Prototype routes",
        directory: "src/app/xero-protect",
        keywords: ["page", "prototype"],
      },
    ],
  },
  {
    slug: "bill-workflow-2-explore",
    title: "Bill · Workflow (2)",
    squadLabel: "Squad 03",
    trackLabel: "Explore",
    trackColor: "#F59E0B",
    owner: "Katrina Li",
    eng: "TBD",
    consult: "Angus Tait",
    pm: "Merv",
    geography: "AU skew",
    status: "Exploring",
    summary:
      "The second workflow squad is still exploratory, so the page should stay lightweight and easy to reshape.",
    pageTitleSuffix: "Bill Workflow 2 Explore",
    roadmap: ["Just Pay for Bills (P0)"],
    teamLine: "Merv / ? / (TBD) / Katrina (+ Angus consult)",
    timezone: "AU",
    focusAreas: [
      "Clarify scope distinct from Workflow 1",
      "Map Just Pay to the right team story",
      "Collect early inputs without overcommitting the structure",
    ],
    docs: [
      latestPrototypesLink,
      {
        label: "Four agents assignment",
        href: "docs/strategy/2026-03-06-four-agents-assignment.md",
        kind: "repo",
      },
      {
        label: "Just Pay PRD snapshot",
        href: "docs/reference/2026-03-10-prd-just-pay.md",
        kind: "repo",
      },
      {
        label: "Just Pay PRD (Confluence)",
        href: "https://xero.atlassian.net/wiki/x/UIK0Tj8",
        kind: "external",
      },
      {
        label: "Assumptions to verify",
        href: "docs/workshop/2026-03-06-assumptions-to-verify.md",
        kind: "repo",
      },
      {
        label: "Vision narrative for Diya",
        href: "docs/strategy/2026-02-25-vision-narrative-for-diya.md",
        kind: "repo",
      },
    ],
    updates: [
      {
        date: "2026-03-09",
        title: "Workflow 2 now visible on the home page",
        detail: "The screenshot-driven front page calls this out explicitly as an explore stream.",
      },
      {
        date: "2026-03-06",
        title: "Exploratory lane recorded",
        detail: "Workflow 2 was called out as exploratory in the Mar 6 assignment and huddle materials.",
      },
    ],
    resourceDirectories: [
      {
        label: "Strategy",
        directory: "docs/strategy",
        keywords: ["four-agents-assignment", "vision-narrative-for-diya"],
      },
      {
        label: "Meeting notes",
        directory: "docs/meeting-notes",
        keywords: ["agents-huddle", "ai-agent-squad-kickoff", "angus-agent-concepts"],
      },
      {
        label: "Workshop",
        directory: "docs/workshop",
        keywords: ["assumptions-to-verify"],
      },
    ],
  },
  {
    slug: "onboarding-explore",
    title: "Approvals Foundations",
    squadLabel: "Squad 04",
    trackLabel: "Foundation",
    trackColor: "#A78BFA",
    owner: "Michael But",
    eng: "Shawn Wilson (TBC)",
    consult: "Angus Tait",
    pm: "Neeraj",
    geography: "US skew",
    status: "Active",
    summary:
      "A Michael-led pod connected to the approvals engine, treated here as foundational work that other bill-side flows can build on.",
    pageTitleSuffix: "Approvals Foundations",
    roadmap: ["Approvals engine foundations (P0)", "Approval workflow enablement (P0)", "Roster and scope alignment (P1)"],
    teamLine: "Neeraj / ? / Shawn Wilson (TBC) / Michael (+ Angus consult)",
    timezone: "US",
    focusAreas: [
      "Foundational approvals engine decisions",
      "How the pod connects to Bill Workflow 1 and approval automation",
      "Making the current pod roster visible while details are still settling",
    ],
    docs: [
      latestPrototypesLink,
      {
        label: "Michael But approvals pod",
        href: "docs/reference/2026-03-10-michael-but-approvals-pod.md",
        kind: "repo",
      },
      {
        label: "Four agents assignment",
        href: "docs/strategy/2026-03-06-four-agents-assignment.md",
        kind: "repo",
      },
      {
        label: "Project status",
        href: "docs/status/PROJECT-STATUS.md",
        kind: "repo",
      },
      {
        label: "AI Agent Squad kickoff",
        href: "docs/meeting-notes/2026-03-06-ai-agent-squad-kickoff.md",
        kind: "repo",
      },
    ],
    updates: [
      {
        date: "2026-03-10",
        title: "Approvals pod context added",
        detail:
          "The Michael-owned squad entry was updated to reflect the current approvals-engine emphasis instead of leaving the repo on the older onboarding-only framing. Neeraj is now listed as PM, Shawn Wilson appears as a tentative engineering pod member, and the hub points back to the new reference note that explains how this pod relates to the Mar 6 squad map without rewriting it.",
      },
      {
        date: "2026-03-06",
        title: "Michael stream first appeared in the Mar 6 assignment",
        detail:
          "David's Mar 6 assignment captured Michael But under the exploratory onboarding stream. That historical mapping still matters, but it no longer gives enough visibility to the approvals-engine connection that is now important in the repo's working view.",
      },
    ],
    resourceDirectories: [
      {
        label: "Meeting notes",
        directory: "docs/meeting-notes",
        keywords: ["ai-agent-squad-kickoff", "bill-approval", "agents-huddle"],
      },
      {
        label: "Reference",
        directory: "docs/reference",
        keywords: ["michael-but-approvals-pod", "david-slack-four-agents", "xero-ai-product-roadmap"],
      },
      {
        label: "Strategy",
        directory: "docs/strategy",
        keywords: ["four-agents-assignment", "approval"],
      },
    ],
  },
  {
    slug: "smart-payment-request-agent",
    title: "Smart Payment Request Agent",
    squadLabel: "Squad 05",
    trackLabel: "Request",
    trackColor: "#FB7185",
    owner: "TBD",
    eng: "TBD",
    consult: "TBD",
    pm: "TBD",
    geography: "TBD",
    status: "Defining",
    summary:
      "A placeholder squad from the March squad table that deserves its own page even before the repo resources fully catch up.",
    pageTitleSuffix: "Smart Payment Request Agent",
    roadmap: ["Pending squad definition"],
    teamLine: "TBD",
    timezone: "TBD",
    focusAreas: [
      "Clarify whether this is a separate squad or a framing row from the squad table",
      "Collect early pitch materials and related approval-request concepts",
      "Keep the page ready for future repo resources",
    ],
    docs: [
      {
        label: "Initial pitch archive",
        href: "/february-pitch",
        kind: "route",
      },
      {
        label: "David feedback and elevator pitches",
        href: "docs/meeting-notes/2026-02-23-david-feedback-elevator-pitches.md",
        kind: "repo",
      },
      {
        label: "Angus agent concepts",
        href: "docs/meeting-notes/2026-02-24-angus-agent-concepts.md",
        kind: "repo",
      },
    ],
    updates: [
      {
        date: "2026-03-09",
        title: "Placeholder squad added",
        detail: "The front page now matches the screenshot structure even where the repo resources are still thin.",
      },
    ],
    resourceDirectories: [
      {
        label: "Pitch notes",
        directory: "docs/meeting-notes",
        keywords: ["elevator-pitches", "angus-agent-concepts", "vision-level-slack-thread"],
      },
      {
        label: "Pitch strategy",
        directory: "docs/strategy",
        keywords: ["vision-narrative-for-diya"],
      },
      {
        label: "Pitch routes",
        directory: "src/app/february-pitch",
        keywords: ["page"],
      },
    ],
  },
];

export const homeChangelog: Array<HubUpdate & { agentSlug?: string; agentTitle?: string }> = [
  {
    date: "2026-03-10",
    title: "Confluence hub as primary update path",
    detail: "Using repo-to-Confluence sync for hub and daily log updates instead of Google Docs MCP.",
  },
  {
    date: "2026-03-09",
    title: "Simplified squad home",
    detail: "Reset the front page to a cleaner squad list, a straightforward changelog, and a dedicated Initial Pitch section.",
  },
  {
    date: "2026-03-09",
    title: "Safety Shield folded into Workflow (1)",
    detail: "Safety Shield is now being carried inside the Workflow (1) squad instead of being called out as a standalone imported prototype.",
    agentSlug: "bill-workflow-1-discover",
    agentTitle: "Bill · Workflow (1)",
  },
  {
    date: "2026-03-06",
    title: "Four-agent assignment locked",
    detail: "David's Mar 6 note clarified the four main squads and their running points.",
  },
  {
    date: "2026-03-06",
    title: "AI Agent Squad kickoff",
    detail: "The broader payments AI squad structure was formalized, with bills work split across multiple streams.",
  },
];

export function getHubAgentBySlug(slug: string): HubAgent | null {
  return hubAgents.find((agent) => agent.slug === slug) ?? null;
}

export function getHubUpdates(limit?: number): Array<HubUpdate & { agentSlug: string; agentTitle: string }> {
  const updates = homeChangelog
    .filter((entry): entry is HubUpdate & { agentSlug: string; agentTitle: string } => {
      return typeof entry.agentSlug === "string" && typeof entry.agentTitle === "string";
    })
    .concat(
      hubAgents.flatMap((agent) =>
        agent.updates.map((update) => ({
          ...update,
          agentSlug: agent.slug,
          agentTitle: agent.title,
        }))
      )
    );

  const sorted = updates.sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }

    return a.agentTitle.localeCompare(b.agentTitle);
  });

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
