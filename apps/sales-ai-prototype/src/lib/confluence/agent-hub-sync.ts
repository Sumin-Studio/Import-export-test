import { getHubUpdates, hubAgents, hubOverview, hubSquadRows, type HubAgent, type HubUpdate } from "@/data/agent-hub";
import { safetyShieldUserResearchAndGapsMarkdown } from "@/data/safety-shield-user-research-and-gaps";
import { safetyShieldWorkingBriefMarkdown } from "@/data/safety-shield-working-brief";
import {
  findOrCreatePage,
  getConfluencePageUrl,
  getPageById,
  updatePage,
  type ConfluencePage,
} from "./client";
import {
  getConfluenceConfig,
  getConfluenceRuntimeOptions,
  type ConfluenceConfig,
} from "./env";
import {
  extractManagedSections,
  renderManagedSection,
  type ManagedSection,
  upsertManagedSections,
} from "./managed-sections";

export interface SyncedPage {
  title: string;
  pageId: string;
  url: string;
  created: boolean;
  updated: boolean;
}

export interface SyncAgentHubResult {
  root: SyncedPage;
  agents: SyncedPage[];
  safetyShieldWorkingBrief: SyncedPage;
  safetyShieldUserResearchAndGaps: SyncedPage;
}

export interface SyncAgentHubOptions {
  titlePrefix?: string;
  parentPageId?: string;
  dryRun?: boolean;
}

function getTitlePrefix(options?: SyncAgentHubOptions): string {
  return options?.titlePrefix?.trim() || "Payments Agents Hub";
}

function joinList(items: string[]): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function renderUpdates(updates: HubUpdate[]): string {
  return updates
    .map((update) => `- ${update.date} — **${update.title}**. ${update.detail}`)
    .join("\n");
}

function renderHubOverview(): string {
  return [
    hubOverview.strapline,
    "",
    hubOverview.intro,
  ].join("\n");
}

function renderHubPrinciples(): string {
  const bullets = hubOverview.principles.map((item) => `- ${item}`).join("\n");
  return bullets;
}

function renderHubNextSteps(): string {
  const bullets = hubOverview.nextSteps.map((item) => `- ${item}`).join("\n");
  return bullets;
}

/** Parses "Bill Runner (P0)" → { name: "Bill Runner", priority: "P0" }; no parens → priority "" */
function parseRoadmapItem(raw: string): { name: string; priority: string } {
  const match = raw.match(/^(.+?)\s*\((P\d+)\)\s*$/);
  if (match) {
    return { name: match[1].trim(), priority: match[2] };
  }
  return { name: raw.trim(), priority: "" };
}

export interface FlatAgentRow {
  name: string;
  squadLabel: string;
  priority: string;
}

/** One row per roadmap agent, ordered by squad then name; priority stripped from name. */
export function getFlatAgentList(): FlatAgentRow[] {
  const rows: FlatAgentRow[] = [];
  for (const squad of hubAgents) {
    const items = squad.roadmap.length > 0 ? squad.roadmap : [squad.title];
    for (const raw of items) {
      const { name, priority } = parseRoadmapItem(raw);
      rows.push({ name, squadLabel: squad.squadLabel, priority });
    }
  }
  rows.sort((a, b) => a.squadLabel.localeCompare(b.squadLabel) || a.name.localeCompare(b.name));
  return rows;
}

function renderHubSquadsTable(): string {
  const header = "| Pri | Agent | Squad | PRD / ERD | Design / mocks | Prototype |";
  const separator = "| --- | --- | --- | --- | --- | --- |";
  const body = hubSquadRows
    .map((row) => {
      const pri = row.priority || "—";
      const prd = row.prdCell ?? "";
      const design = row.designCell ?? "";
      const proto = row.protoCell ?? "";
      return `| ${pri} | ${row.agent} | ${row.squadLabel} | ${prd} | ${design} | ${proto} |`;
    })
    .join("\n");

  return [header, separator, body].join("\n");
}

function renderNarrative(agent: HubAgent): string {
  const roadmap = joinList(agent.roadmap);
  const focus = joinList(agent.focusAreas);

  return [
    `**Overview:** This page is for the ${agent.title} squad (${agent.squadLabel}). Current status: ${agent.status}. Use the key people table and links below for coordination and deep context.`,
    "",
    `${agent.title} is ${agent.squadLabel.toLowerCase()} in the current payments agents setup. The work is led by ${agent.owner}, with ${agent.pm} covering product, ${agent.eng} covering engineering, and ${agent.consult} in consult. This stream is oriented around ${roadmap}.`,
    "",
    `${agent.summary} Right now the team is concentrating on ${focus}. The center of gravity for this squad is ${agent.geography.toLowerCase()}, and the working timezone listed for coordination is ${agent.timezone}.`,
  ].join("\n");
}


function renderKeyPeopleTable(agent: HubAgent): string {
  return [
    "| Role | Person |",
    "| --- | --- |",
    `| Owner / Lead | ${agent.owner} |`,
    `| PM | ${agent.pm} |`,
    `| Engineering | ${agent.eng} |`,
    `| Consult | ${agent.consult} |`,
    `| Geography / timezone | ${agent.geography}, ${agent.timezone} |`,
  ].join("\n");
}

function buildAgentSections(agent: HubAgent): ManagedSection[] {
  return [
    {
      key: "summary",
      title: "Narrative",
      format: "markdown",
      content: renderNarrative(agent),
    },
    {
      key: "keypeople",
      title: "Key people",
      format: "markdown",
      content: renderKeyPeopleTable(agent),
    },
    {
      key: "focus",
      title: "Supporting context",
      format: "markdown",
      content: [
        `- Status: ${agent.status}`,
        `- Geography: ${agent.geography}`,
        `- In charge of: ${joinList(agent.roadmap)}`,
        ...agent.focusAreas.map((item) => `- ${item}`),
      ].join("\n"),
    },
    {
      key: "updates",
      title: "Narrative changelog",
      format: "markdown",
      content: renderUpdates(agent.updates),
    },
    {
      key: "links",
      title: "Reference links",
      format: "markdown",
      content: agent.docs
        .map((doc) => {
          if (doc.kind === "external") {
            return `- [${doc.label}](${doc.href})`;
          }

          return `- ${doc.label}: \`${doc.href}\``;
        })
        .join("\n"),
    },
  ];
}

function buildHubSections(agents: SyncedPage[], flatAgents: FlatAgentRow[]): ManagedSection[] {
  return [
    {
      key: "summary",
      title: "Summary",
      format: "markdown",
      content: renderHubOverview(),
    },
    {
      key: "principles",
      title: "How to use this hub",
      format: "markdown",
      content: renderHubPrinciples(),
    },
    {
      key: "nextsteps",
      title: "What’s happening next",
      format: "markdown",
      content: renderHubNextSteps(),
    },
    {
      key: "updates",
      title: "Recent updates",
      format: "markdown",
      content: renderUpdates(getHubUpdates(6)),
    },
    {
      key: "squads",
      title: "Squads, agents, and docs",
      format: "markdown",
      content: renderHubSquadsTable(),
    },
  ];
}

/** Returns the hub root sections as markdown for preview (no Confluence call). */
export function getHubRootSectionsPreview(): Array<{ title: string; content: string }> {
  return buildHubSections([], getFlatAgentList()).map((s) => ({
    title: s.title ?? s.key,
    content: s.content,
  }));
}

const PLACEHOLDER_SECTION_CONTENT =
  "This page is a placeholder. More content will be added as the squad work progresses.";

function buildPlaceholderSections(): ManagedSection[] {
  return [
    {
      key: "placeholder",
      title: "Overview",
      format: "markdown",
      content: PLACEHOLDER_SECTION_CONTENT,
    },
  ];
}

function normalizeStorageHtmlForComparison(html: string): string {
  return html
    .replace(
      /<p><span[^>]*>(\[cursor-managed:[^<]+\])<\/span><\/p>/g,
      "$1"
    )
    .replace(
      /<ac:structured-macro[^>]*ac:name="anchor"[^>]*>[\s\S]*?<ac:parameter[^>]*>(\[cursor-managed:[^<]+\])<\/ac:parameter>[\s\S]*?<\/ac:structured-macro>/g,
      "$1"
    )
    .replace(
      /<!--\s*(\[cursor-managed:[^<]+\])\s*-->/g,
      "$1"
    )
    .replace(
      /<div[^>]*>(\[cursor-managed:[^<]+\])<\/div>/g,
      "$1"
    )
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/<br\s*\/>/g, "<br/>")
    .replace(/\s+/g, " ")
    .replace(/> </g, "><")
    .trim();
}

function getRenderedSectionBody(section: ManagedSection): string {
  const extracted = extractManagedSections(renderManagedSection(section));
  return extracted[section.key] ?? "";
}

function countMarkerOccurrences(html: string, key: string): number {
  return (html.match(new RegExp(`\\[cursor-managed:${key}:start\\]`, "g")) ?? []).length;
}

function shouldUpdateManagedSections(existingHtml: string, sections: ManagedSection[]): boolean {
  const existingSections = extractManagedSections(existingHtml);

  for (const section of sections) {
    const existing = normalizeStorageHtmlForComparison(existingSections[section.key] ?? "");
    const expected = normalizeStorageHtmlForComparison(getRenderedSectionBody(section));

    if (existing !== expected) {
      return true;
    }

    if (countMarkerOccurrences(existingHtml, section.key) !== 1) {
      return true;
    }
  }

  return false;
}

async function ensureManagedPage(args: {
  title: string;
  sections: ManagedSection[];
  parentId?: string;
  targetParentId?: string;
  config: ConfluenceConfig;
  dryRun?: boolean;
}): Promise<SyncedPage> {
  const initialContent = upsertManagedSections("", args.sections);
  const ensured = await findOrCreatePage({
    title: args.title,
    content: initialContent,
    parentId: args.parentId,
    config: args.config,
  });

  const existingPage = await getPageById(ensured.pageId, args.config);
  const existingHtml = existingPage.body.storage.value ?? "";
  const existingSections = extractManagedSections(existingHtml);
  const expectedKeys = new Set(args.sections.map((section) => section.key));
  const existingKeys = Object.keys(existingSections);
  const hasOnlyExpectedManagedSections = existingKeys.every((key) => expectedKeys.has(key));
  const hasCompleteManagedSections = hasOnlyExpectedManagedSections && args.sections.every((section) => {
    return section.key in existingSections && countMarkerOccurrences(existingHtml, section.key) === 1;
  });
  const mergedContent = hasCompleteManagedSections
    ? upsertManagedSections(existingHtml, args.sections)
    : upsertManagedSections("", args.sections);
  const shouldUpdate = hasCompleteManagedSections
    ? shouldUpdateManagedSections(existingHtml, args.sections)
    : normalizeStorageHtmlForComparison(existingHtml) !== normalizeStorageHtmlForComparison(mergedContent);
  const shouldMove = Boolean(args.targetParentId);

  let page: ConfluencePage = existingPage;
  if ((shouldUpdate || shouldMove) && !args.dryRun) {
    page = await updatePage({
      pageId: existingPage.id,
      title: args.title,
      content: mergedContent,
      version: existingPage.version.number,
      ...(args.targetParentId ? { parentId: args.targetParentId } : {}),
      config: args.config,
    });
  }

  return {
    title: args.title,
    pageId: ensured.pageId,
    url: getConfluencePageUrl(ensured.pageId, args.config.baseUrl),
    created: ensured.created,
    updated: shouldUpdate || shouldMove,
  };
}

export async function syncAgentHub(options?: SyncAgentHubOptions): Promise<SyncAgentHubResult> {
  const config = await getConfluenceConfig();
  const runtimeOptions = await getConfluenceRuntimeOptions();
  const prefix = getTitlePrefix({
    ...runtimeOptions,
    ...options,
  });
  const parentPageId = options?.parentPageId ?? runtimeOptions.parentPageId;
  const dryRun = options?.dryRun ?? false;

  const flatAgents = getFlatAgentList();
  const root = await ensureManagedPage({
    title: prefix,
    sections: buildHubSections([], flatAgents),
    config,
    parentId: parentPageId,
    dryRun,
  });

  const safetyShield = await ensureManagedPage({
    title: "Safety Shield",
    sections: buildPlaceholderSections(),
    parentId: root.pageId,
    config,
    dryRun,
  });

  const safetyShieldWorkingBrief = await ensureManagedPage({
    title: "Safety Shield Working Brief",
    sections: [
      {
        key: "body",
        format: "markdown",
        content: safetyShieldWorkingBriefMarkdown,
      },
    ],
    parentId: safetyShield.pageId,
    targetParentId: safetyShield.pageId,
    config,
    dryRun,
  });

  const safetyShieldUserResearchAndGaps = await ensureManagedPage({
    title: "Safety Shield — User research and gaps",
    sections: [
      {
        key: "body",
        format: "markdown",
        content: safetyShieldUserResearchAndGapsMarkdown,
      },
    ],
    parentId: safetyShield.pageId,
    targetParentId: safetyShield.pageId,
    config,
    dryRun,
  });

  const agents: SyncedPage[] = [];
  for (const row of flatAgents) {
    const synced = await ensureManagedPage({
      title: row.name,
      sections: buildPlaceholderSections(),
      parentId: root.pageId,
      config,
      dryRun,
    });
    agents.push(synced);
  }

  const refreshedRoot = await ensureManagedPage({
    title: prefix,
    sections: buildHubSections(agents, flatAgents),
    config,
    dryRun,
  });

  return {
    root: refreshedRoot,
    agents,
    safetyShieldWorkingBrief,
    safetyShieldUserResearchAndGaps,
  };
}
