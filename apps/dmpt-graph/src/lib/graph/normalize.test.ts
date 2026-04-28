import test from "node:test";
import assert from "node:assert/strict";
import { normalizeGraph } from "./normalize";
import type { JiraIssue } from "../jira/client";
import { CF } from "../constants/jira-fields";

function issue(
  key: string,
  fields: Record<string, unknown>,
): JiraIssue & { updated?: string } {
  return { id: "1", key, fields, updated: "2026-01-01T00:00:00.000+0000" };
}

test("normalizeGraph builds stable team ids from division + portfolio cascade", () => {
  const dmpt = issue("DMPT-1", {
    summary: "Example dependency",
    status: { name: "Raise dependency" },
    [CF.requestingDivision]: { value: "Technology" },
    [CF.requestingPortfolio]: { value: "Platform", child: { value: "Foundations" } },
    [CF.deliveryDivision]: { value: "Technology" },
    [CF.deliveryPortfolio]: { value: "Security" },
    [CF.dependencyType]: { value: "Standard (1:1)" },
    [CF.proposedQuarter]: { value: "FY26Q1" },
  });
  const { nodes, links } = normalizeGraph([dmpt]);
  const teams = nodes.filter((n) => n.kind === "team");
  assert.ok(teams.some((t) => t.id === "team:req:technology__platform__foundations"));
  assert.ok(teams.some((t) => t.id === "team:del:technology__security"));
  assert.ok(links.length > 0);
});
