import type { DependencyNode, GraphLink } from "../types";

export function buildLinks(deps: DependencyNode[]): GraphLink[] {
  const links: GraphLink[] = [];
  for (const d of deps) {
    links.push({
      id: `${d.id}:requests`,
      source: d.requestingTeamId,
      target: d.id,
      edgeType: "REQUESTS",
      impact: d.impact,
    });
    links.push({
      id: `${d.id}:delivers`,
      source: d.id,
      target: d.deliveryTeamId,
      edgeType: "DELIVERS",
      impact: d.impact,
    });
  }
  return links;
}
