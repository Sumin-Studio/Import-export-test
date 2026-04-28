import { CF } from "../constants/jira-fields";
import { pickCascadeLabels, pickSelectValue } from "./fields";
import { richTextToPlain } from "./rich-text-to-plain";
import type { JiraIssue } from "./client";

function pickParentKey(fields: Record<string, unknown>): string | undefined {
  const pl = fields[CF.parentLink];
  if (typeof pl === "string" && pl.trim()) return pl.trim();
  if (pl && typeof pl === "object" && "key" in pl) return String((pl as { key: string }).key);
  return undefined;
}

export function isSensitiveIssue(fields: Record<string, unknown>): boolean {
  const v = pickSelectValue(fields[CF.sensitive]).toLowerCase();
  return v === "yes" || v === "y" || v === "true";
}

export type JiraIssueDetails = {
  key: string;
  summary: string;
  statusName: string;
  updated: string;
  dependencyDescriptionPlain: string;
  proposedQuarter: string;
  parentKey?: string;
  requestingDivision: string;
  requestingPortfolioLabels: string[];
  deliveryDivision: string;
  deliveryPortfolioLabels: string[];
  dependencyType: string;
  workType: string;
  dependencyOwner: string;
  sensitivityLabel: string;
};

export function buildJiraIssueDetails(issue: JiraIssue & { updated?: string }): JiraIssueDetails {
  const f = issue.fields;
  const fromDmpt = richTextToPlain(f[CF.dependencyDescription]);
  const fromNative = richTextToPlain(f.description);
  const dependencyDescriptionPlain = (fromDmpt || fromNative).trim();
  const updated = issue.updated ?? "";

  return {
    key: issue.key,
    summary: String(f.summary ?? issue.key),
    statusName: (f.status as { name?: string } | undefined)?.name ?? pickSelectValue(f.status),
    updated,
    dependencyDescriptionPlain,
    proposedQuarter: pickSelectValue(f[CF.proposedQuarter]).replace(/\s+/g, "") || "TBC",
    parentKey: pickParentKey(f),
    requestingDivision: pickSelectValue(f[CF.requestingDivision]),
    requestingPortfolioLabels: pickCascadeLabels(f[CF.requestingPortfolio]),
    deliveryDivision: pickSelectValue(f[CF.deliveryDivision]),
    deliveryPortfolioLabels: pickCascadeLabels(f[CF.deliveryPortfolio]),
    dependencyType: pickSelectValue(f[CF.dependencyType]),
    workType: pickSelectValue(f[CF.workType]),
    dependencyOwner: pickSelectValue(f[CF.dependencyOwner]),
    sensitivityLabel: pickSelectValue(f[CF.sensitive]),
  };
}
