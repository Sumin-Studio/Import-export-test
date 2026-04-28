import type { IssueAiInsights } from "../types";
import type { JiraIssueDetails } from "../jira/issue-details";

export type IssueDetailsPayload = {
  jira: JiraIssueDetails;
  ai: IssueAiInsights | null;
  source: "fixtures" | "jira";
};

const DMPT441: IssueDetailsPayload = {
  source: "fixtures",
  jira: {
    key: "DMPT-441",
    summary: "Token vault hardening for new checkout path",
    statusName: "Assess dependency",
    updated: "2026-01-10T12:00:00.000+0000",
    dependencyDescriptionPlain:
      "Payments needs Platform Core to extend the token vault API before enabling the new checkout path. Target FY26Q1; no PII in this ticket.",
    proposedQuarter: "FY26Q1",
    parentKey: "SECD-8891",
    requestingDivision: "Product & Technology",
    requestingPortfolioLabels: ["Growth", "Monetisation"],
    deliveryDivision: "Technology",
    deliveryPortfolioLabels: ["Platform", "Foundations"],
    dependencyType: "Platform",
    workType: "Engineering",
    dependencyOwner: "payments-oncall",
    sensitivityLabel: "No",
  },
  ai: {
    keyPoints: [
      "Checkout path depends on token vault API extensions.",
      "Delivery team is Platform Core; requesting team is Payments.",
      "Target window FY26Q1.",
    ],
    risks: ["Schedule slip if vault API contract is not frozen early."],
    asks: ["Confirm API contract review date with Platform Core."],
  },
};

const DMPT512: IssueDetailsPayload = {
  source: "fixtures",
  jira: {
    key: "DMPT-512",
    summary: "SCIM group sync for enterprise tenants",
    statusName: "Ready for delivery",
    updated: "2026-01-08T09:30:00.000+0000",
    dependencyDescriptionPlain:
      "Identity needs directory sync improvements shipped by Platform Core for enterprise SCIM. HTML: <p>Non-sensitive rollout notes.</p>",
    proposedQuarter: "FY26Q1",
    parentKey: "SECD-8891",
    requestingDivision: "Technology",
    requestingPortfolioLabels: ["Security", "Trust"],
    deliveryDivision: "Technology",
    deliveryPortfolioLabels: ["Platform", "Foundations"],
    dependencyType: "Standard (1:1)",
    workType: "Engineering",
    dependencyOwner: "identity-pm",
    sensitivityLabel: "No",
  },
  ai: {
    keyPoints: ["SCIM group sync blocked on Platform Core directory changes.", "Enterprise tenant impact."],
    asks: ["Need a cutover checklist shared with CS."],
  },
};

const SECD8891: IssueDetailsPayload = {
  source: "fixtures",
  jira: {
    key: "SECD-8891",
    summary: "Checkout resilience programme",
    statusName: "In Progress",
    updated: "2025-12-01T08:00:00.000+0000",
    dependencyDescriptionPlain: "",
    proposedQuarter: "TBC",
    parentKey: undefined,
    requestingDivision: "Security",
    requestingPortfolioLabels: ["Customer Trust"],
    deliveryDivision: "",
    deliveryPortfolioLabels: [],
    dependencyType: "",
    workType: "",
    dependencyOwner: "",
    sensitivityLabel: "No",
  },
  ai: null,
};

const MAP: Record<string, IssueDetailsPayload> = {
  "DMPT-441": DMPT441,
  "DMPT-512": DMPT512,
  "SECD-8891": SECD8891,
};

export function getFixtureIssueDetails(key: string): IssueDetailsPayload | null {
  const k = key.trim().toUpperCase();
  return MAP[k] ?? null;
}
