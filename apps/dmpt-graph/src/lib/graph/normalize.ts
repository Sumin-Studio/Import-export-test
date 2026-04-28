import { CF } from "../constants/jira-fields";
import type { JiraIssue } from "../jira/client";
import { pickCascadeLabels, pickSelectValue, pickTeam } from "../jira/fields";
import { mapJiraStatus } from "../jira/status-map";
import type { DependencyNode, DependencyType, GraphNode, LifecycleState, TeamNode } from "../types";
import { buildLinks } from "./build-links";

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "na";
}

function teamNodeId(prefix: "req" | "del", division: string, cascade: string[]): string {
  const parts = [slug(division), ...cascade.map(slug)].filter((p) => p !== "na");
  return `team:${prefix}:${parts.join("__")}`;
}

const TYPE_VALUES: DependencyType[] = ["Standard (1:1)", "Multi-team (1:many)", "Platform"];

function mapDependencyType(raw: string): DependencyType {
  const t = TYPE_VALUES.find((x) => x === raw);
  return t ?? "Standard (1:1)";
}

function dependencyFromIssue(issue: JiraIssue): DependencyNode {
  const f = issue.fields;
  const reqDiv = pickSelectValue(f[CF.requestingDivision]);
  const reqCas = pickCascadeLabels(f[CF.requestingPortfolio]);
  const delDiv = pickSelectValue(f[CF.deliveryDivision]);
  const delCas = pickCascadeLabels(f[CF.deliveryPortfolio]);
  const requestingTeamId = teamNodeId("req", reqDiv, reqCas);
  const deliveryTeamId = teamNodeId("del", delDiv, delCas);
  const statusName =
    (f.status as { name?: string } | undefined)?.name ?? pickSelectValue(f.status);
  const status = mapJiraStatus(statusName);
  const proposed = pickSelectValue(f[CF.proposedQuarter]) || "TBC";
  const typeRaw = pickSelectValue(f[CF.dependencyType]);
  const lifecycle: LifecycleState =
    status === "Closed" || /close dependency/i.test(statusName ?? "") ? "ARCHIVED" : "ACTIVE";

  return {
    id: `dep:${issue.key.toLowerCase()}`,
    kind: "dependency",
    label: String(f.summary ?? issue.key),
    jiraKey: issue.key,
    type: mapDependencyType(typeRaw),
    status,
    proposedQuarter: proposed.replace(/\s+/g, ""),
    confirmedQuarter: "TBC",
    impact: "NON_BLOCKING",
    lifecycle,
    requestingTeamId,
    deliveryTeamId,
  };
}

function teamNodeFromPath(
  prefix: "req" | "del",
  division: string,
  cascade: string[],
  atlassianTeam: { id: string; name: string } | null,
): TeamNode {
  const id = teamNodeId(prefix, division, cascade);
  const sub = cascade.slice(1).join(" · ");
  const primary = cascade[0] ?? "";
  const labelFromPath = primary ? `${primary}${sub ? ` — ${sub}` : ""}` : division || "Team";
  const label =
    prefix === "del" && atlassianTeam && divisionMatchesTeamContext(deliverPathLabel(division, cascade), atlassianTeam)
      ? atlassianTeam.name
      : labelFromPath;

  return {
    id,
    kind: "team",
    label,
    division: division || "—",
    portfolio: primary || "—",
    subPortfolio: sub || "—",
  };
}

function deliverPathLabel(division: string, cascade: string[]): string {
  return [division, ...cascade].join(" ").toLowerCase();
}

/** Heuristic: use Atlassian Team name on delivery node when team name appears related to delivery path. */
function divisionMatchesTeamContext(pathLower: string, team: { name: string }): boolean {
  const n = team.name.toLowerCase();
  return pathLower.includes(n) || n.split(/\s+/).some((w) => w.length > 3 && pathLower.includes(w));
}

export function collectTeamNodes(
  deps: DependencyNode[],
  issues: JiraIssue[],
): TeamNode[] {
  const map = new Map<string, TeamNode>();
  const issueByKey = new Map(issues.map((i) => [i.key, i]));

  for (const d of deps) {
    const issue = issueByKey.get(d.jiraKey);
    const f = issue?.fields ?? {};
    const reqDiv = pickSelectValue(f[CF.requestingDivision]);
    const reqCas = pickCascadeLabels(f[CF.requestingPortfolio]);
    const delDiv = pickSelectValue(f[CF.deliveryDivision]);
    const delCas = pickCascadeLabels(f[CF.deliveryPortfolio]);
    const tm = pickTeam(f[CF.team]);

    const req = teamNodeFromPath("req", reqDiv, reqCas, null);
    const del = teamNodeFromPath("del", delDiv, delCas, tm);
    map.set(req.id, req);
    map.set(del.id, del);
  }
  return [...map.values()];
}

export function normalizeGraph(dmptIssues: JiraIssue[]) {
  const deps = dmptIssues.map(dependencyFromIssue);
  const teams = collectTeamNodes(deps, dmptIssues);
  const nodes: GraphNode[] = [...teams, ...deps];
  const links = buildLinks(deps);
  return { nodes, links };
}
