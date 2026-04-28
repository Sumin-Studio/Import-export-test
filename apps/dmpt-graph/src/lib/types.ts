export type NodeKind = "team" | "dependency";

export type DependencyStatus =
  | "Raise"
  | "Assess"
  | "Ready"
  | "Deliver"
  | "Closed"
  | "Escalation";

export type Impact = "BLOCKING" | "NON_BLOCKING";

export type LifecycleState = "ACTIVE" | "ARCHIVED";

export type DependencyType = "Standard (1:1)" | "Multi-team (1:many)" | "Platform";

export type EdgeType = "REQUESTS" | "DELIVERS";

export type TeamNode = {
  id: string;
  kind: "team";
  label: string;
  division: string;
  portfolio: string;
  subPortfolio: string;
};

export type DependencyNode = {
  id: string;
  kind: "dependency";
  label: string;
  jiraKey: string;
  type: DependencyType;
  status: DependencyStatus;
  proposedQuarter: string;
  confirmedQuarter: string;
  impact: Impact;
  lifecycle: LifecycleState;
  archivedAt?: string;
  requestingTeamId: string;
  deliveryTeamId: string;
};

export type GraphNode = TeamNode | DependencyNode;

export type GraphLink = {
  id: string;
  source: string;
  target: string;
  edgeType: EdgeType;
  impact: Impact | null;
};

/** Present when `?debug=1` or `JIRA_GRAPH_DEBUG=1` — copy `jql` into Jira issue search. */
export type GraphPayloadDebug = {
  jql: string;
  projectKey: string;
  statuses: string[];
  customJql: boolean;
  maxResults: number;
};

/** When the status-filtered graph search returns nothing, we re-query the project with minimal fields. */
export type GraphPayloadProbe = {
  jql: string;
  issueCount: number;
  statusesSeen: string[];
  sampleKeys: string[];
};

export type GraphPayload = {
  nodes: GraphNode[];
  links: GraphLink[];
  source: "fixtures" | "jira";
  /** Present when Jira was configured but the graph request failed; payload is fixtures. */
  warning?: string;
  /** Present when Jira responded successfully but the JQL matched no issues. */
  hint?: string;
  debug?: GraphPayloadDebug;
  /** Extra diagnostics when the primary graph JQL matched no issues. */
  probe?: GraphPayloadProbe;
};

/** Structured AI block returned by GET /api/issues/[key]. */
export type IssueAiInsights = {
  keyPoints: string[];
  risks?: string[];
  asks?: string[];
};
