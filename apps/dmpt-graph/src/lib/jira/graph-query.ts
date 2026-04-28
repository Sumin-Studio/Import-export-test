import { CF } from "../constants/jira-fields";

/** Escape double quotes for JQL string literals. */
export function jqlEscapeString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const BASE_FIELDS = [
  "summary",
  "status",
  "parent",
  CF.dependencyDescription,
  CF.team,
  CF.requestingDivision,
  CF.requestingPortfolio,
  CF.deliveryDivision,
  CF.deliveryPortfolio,
  CF.dependencyType,
  CF.proposedQuarter,
  CF.workType,
  CF.dependencyOwner,
  CF.parentLink,
  CF.sensitive,
];

export function dmptSearchFields(): string[] {
  return BASE_FIELDS;
}

/**
 * Default status list for the graph JQL (labels must match Jira exactly).
 * Override with env `JIRA_GRAPH_STATUSES` (comma-separated).
 */
export const DEFAULT_GRAPH_STATUS_LIST = [
  "Escalation process",
  "Assess dependency",
  "Raise Dependency",
  "Deliver work",
  "Ready for Delivery",
] as const;

/** Parse comma-separated status names; empty / invalid env falls back to defaults. */
export function parseGraphStatuses(envValue: string | undefined): string[] {
  if (!envValue?.trim()) return [...DEFAULT_GRAPH_STATUS_LIST];
  const parsed = envValue
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : [...DEFAULT_GRAPH_STATUS_LIST];
}

/**
 * Graph JQL: project + status allow-list.
 * Note: `ORDER BY` is omitted — some Jira Cloud `/search/jql` responses behave poorly with ORDER BY;
 * sort in the UI if needed.
 */
export function buildDmptJql(opts: { projectKey: string; statuses: string[] }): string {
  const proj = opts.projectKey.trim();
  const statuses = opts.statuses.length > 0 ? opts.statuses : [...DEFAULT_GRAPH_STATUS_LIST];
  const quoted = statuses.map((s) => `"${jqlEscapeString(s)}"`).join(", ");
  return `project = ${proj} AND status in (${quoted})`;
}
