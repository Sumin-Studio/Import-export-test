import { buildLinks } from "../graph/build-links";
import type { DependencyNode, GraphPayload, TeamNode } from "../types";

const teams: TeamNode[] = [
  {
    id: "team:platform-core",
    kind: "team",
    label: "Platform Core",
    division: "Technology",
    portfolio: "Platform",
    subPortfolio: "Foundations",
  },
  {
    id: "team:payments",
    kind: "team",
    label: "Payments",
    division: "Product & Technology",
    portfolio: "Growth",
    subPortfolio: "Monetisation",
  },
  {
    id: "team:identity",
    kind: "team",
    label: "Identity & Access",
    division: "Technology",
    portfolio: "Security",
    subPortfolio: "Trust",
  },
];

const deps: DependencyNode[] = [
  {
    id: "dep:dmpt-441",
    kind: "dependency",
    label: "Token vault hardening for new checkout path",
    jiraKey: "DMPT-441",
    type: "Platform",
    status: "Assess",
    proposedQuarter: "FY26Q1",
    confirmedQuarter: "TBC",
    impact: "NON_BLOCKING",
    lifecycle: "ACTIVE",
    requestingTeamId: "team:payments",
    deliveryTeamId: "team:platform-core",
  },
  {
    id: "dep:dmpt-512",
    kind: "dependency",
    label: "SCIM group sync for enterprise tenants",
    jiraKey: "DMPT-512",
    type: "Standard (1:1)",
    status: "Ready",
    proposedQuarter: "FY26Q1",
    confirmedQuarter: "TBC",
    impact: "NON_BLOCKING",
    lifecycle: "ACTIVE",
    requestingTeamId: "team:identity",
    deliveryTeamId: "team:platform-core",
  },
];

/** Local demo graph when Jira env is not configured. */
export function getFixtureGraph(): GraphPayload {
  return {
    nodes: [...teams, ...deps],
    links: buildLinks(deps),
    source: "fixtures",
  };
}
