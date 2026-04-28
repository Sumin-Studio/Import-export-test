/** Jira Cloud REST client. Server/Data Center use different search paths (e.g. POST /rest/api/2/search). */

import { readJiraEnv } from "./env";

/**
 * Request body for
 * [Search for issues using JQL enhanced search (POST)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-post)
 * — `POST /rest/api/3/search/jql`.
 */
export type JiraEnhancedSearchJqlPostBody = {
  jql: string;
  maxResults: number;
  fields: string[];
  /** Use when `fields` contains custom field keys (`customfield_*`). */
  fieldsByKeys?: boolean;
  expand?: string;
  nextPageToken?: string;
  properties?: string[];
  /** Issue IDs for [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency. */
  reconcileIssues?: number[];
};

/** One page of `SearchAndReconcileResults` from enhanced JQL search. */
export type JiraJqlSearchPage = {
  issues: JiraIssue[];
  isLast?: boolean;
  nextPageToken?: string;
};

export type JiraSearchResponse = {
  issues: JiraIssue[];
  /** Not returned by /search/jql; kept for callers that expect the old shape. */
  total: number;
};

export type JiraIssue = {
  id: string;
  key: string;
  /** Present on GET issue responses; used for AI cache invalidation. */
  updated?: string;
  fields: Record<string, unknown>;
};

function authHeader(): string {
  const e = readJiraEnv();
  if (!e) throw new Error("JIRA_EMAIL, JIRA_API_TOKEN, and JIRA_BASE_URL must be set (non-empty after trim)");
  return `Basic ${Buffer.from(`${e.email}:${e.apiToken}`).toString("base64")}`;
}

function baseUrl(): string {
  const e = readJiraEnv();
  if (!e) throw new Error("JIRA_BASE_URL must be set (e.g. https://your-domain.atlassian.net)");
  return e.baseUrl;
}

export async function jiraFetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authHeader(),
      ...(init?.headers as Record<string, string>),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 401 || res.status === 403) {
      throw new Error(
        `Jira ${res.status} (auth/permission): check JIRA_EMAIL matches the Atlassian account for the token, ` +
          `JIRA_API_TOKEN is a valid API token with Browse projects on the relevant sites, and JIRA_BASE_URL is correct. ${text.slice(0, 400)}`,
      );
    }
    throw new Error(`Jira ${res.status}: ${text.slice(0, 500)}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Runs JQL enhanced search until `maxResults` issues are collected (cursor pages via `nextPageToken`).
 * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-post
 */
function asIssueArray(value: unknown): JiraIssue[] {
  if (!Array.isArray(value)) return [];
  return value as JiraIssue[];
}

function assertNoJiraSearchErrors(payload: unknown): void {
  if (!payload || typeof payload !== "object") return;
  const o = payload as { errorMessages?: unknown; errors?: unknown };
  const msgs: string[] = [];
  if (Array.isArray(o.errorMessages)) {
    for (const m of o.errorMessages) if (typeof m === "string" && m.trim()) msgs.push(m.trim());
  }
  if (o.errors && typeof o.errors === "object") {
    for (const v of Object.values(o.errors as Record<string, unknown>)) {
      if (typeof v === "string" && v.trim()) msgs.push(v.trim());
    }
  }
  if (msgs.length > 0) throw new Error(`Jira search: ${msgs.join("; ")}`);
}

export async function searchIssues(jql: string, maxResults: number, fields: string[]) {
  const issues: JiraIssue[] = [];
  let nextPageToken: string | undefined;
  const maxPages = 25;

  for (let page = 0; page < maxPages && issues.length < maxResults; page++) {
    const body: JiraEnhancedSearchJqlPostBody = {
      jql,
      maxResults: maxResults - issues.length,
      fields,
    };
    if (nextPageToken) body.nextPageToken = nextPageToken;

    const pageRes = await jiraFetchJson<unknown>("/rest/api/3/search/jql", {
      method: "POST",
      body: JSON.stringify(body),
    });

    assertNoJiraSearchErrors(pageRes);
    const pageObj = pageRes as JiraJqlSearchPage;
    const batch = asIssueArray(pageObj.issues);
    issues.push(...batch);
    if (pageObj.isLast || !pageObj.nextPageToken) break;
    nextPageToken = pageObj.nextPageToken;
  }

  return { issues: issues.slice(0, maxResults), total: issues.length };
}

export async function getIssue(key: string, fields: string[]) {
  const params = new URLSearchParams({ fields: fields.join(",") });
  return jiraFetchJson<JiraIssue>(`/rest/api/3/issue/${encodeURIComponent(key)}?${params}`);
}
