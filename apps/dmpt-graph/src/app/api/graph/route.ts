import { NextResponse } from "next/server";
import { getFixtureGraph } from "@/lib/fixtures/graph-data";
import { normalizeGraph } from "@/lib/graph/normalize";
import { buildDmptJql, dmptSearchFields, parseGraphStatuses } from "@/lib/jira/graph-query";
import { searchIssues } from "@/lib/jira/client";
import { hasJiraEnv } from "@/lib/jira/env";
import type { GraphPayload } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const debugEnabled =
    url.searchParams.get("debug") === "1" || process.env.JIRA_GRAPH_DEBUG === "1";
  const max = Math.min(
    200,
    Math.max(1, Number.parseInt(process.env.MAX_GRAPH_ISSUES ?? "80", 10) || 80),
  );

  if (!hasJiraEnv()) {
    return NextResponse.json({
      ...getFixtureGraph(),
      warning:
        "Jira env is missing or blank (JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN). Values are trimmed — remove accidental spaces or newlines. Put secrets in web/.env.local and restart the dev server after edits.",
    });
  }

  try {
    const projectKey = process.env.JIRA_DMPT_PROJECT ?? "DMPT";
    const statuses = parseGraphStatuses(process.env.JIRA_GRAPH_STATUSES);
    const customJql = process.env.JIRA_GRAPH_JQL?.trim();
    const jql = customJql ?? buildDmptJql({ projectKey, statuses });
    const fields = dmptSearchFields();
    const res = await searchIssues(jql, max, fields);
    const { nodes, links } = normalizeGraph(res.issues);
    const payload: GraphPayload = { nodes, links, source: "jira" };
    if (debugEnabled) {
      payload.debug = {
        jql,
        projectKey,
        statuses: [...statuses],
        customJql: Boolean(customJql),
        maxResults: max,
      };
    }
    if (res.issues.length === 0) {
      if (customJql) {
        payload.hint = `Jira returned no issues for JIRA_GRAPH_JQL. Use ?debug=1 to echo the query, or fix the JQL in your environment.`;
      } else {
        payload.hint = `Jira returned no issues for project ${projectKey} with the configured status filter (max ${max}). Status names must match Jira exactly — set JIRA_GRAPH_STATUSES or JIRA_GRAPH_JQL. Append ?debug=1 for the primary JQL.`;
      }

      if (process.env.JIRA_GRAPH_SKIP_PROBE !== "1") {
        try {
          const probeJql = `project = ${projectKey.trim()} ORDER BY updated DESC`;
          const pr = await searchIssues(probeJql, 40, ["summary", "status"]);
          const names = pr.issues
            .map((i) => (i.fields.status as { name?: string } | undefined)?.name)
            .filter((n): n is string => Boolean(n?.trim()));
          const statusesSeen = [...new Set(names)];
          payload.probe = {
            jql: probeJql,
            issueCount: pr.issues.length,
            statusesSeen,
            sampleKeys: pr.issues.slice(0, 10).map((i) => i.key),
          };
          if (pr.issues.length > 0) {
            const seen = statusesSeen.join(" | ");
            payload.hint += ` Recent issues in this project use these status names: ${seen}. Copy the ones you need into JIRA_GRAPH_STATUSES (comma-separated). Examples: ${payload.probe.sampleKeys.join(", ")}.`;
          } else {
            payload.hint += ` A broad probe (${probeJql}) also returned no rows — check JIRA_DMPT_PROJECT and that the Jira API user can browse project ${projectKey}.`;
          }
        } catch (probeErr) {
          const pe = probeErr instanceof Error ? probeErr.message : String(probeErr);
          payload.hint += ` (Project probe failed: ${pe})`;
        }
      }
    }
    return NextResponse.json(payload);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ...getFixtureGraph(), warning: message });
  }
}
