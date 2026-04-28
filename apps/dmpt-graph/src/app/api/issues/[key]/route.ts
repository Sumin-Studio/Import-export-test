import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { summarizeIssue } from "@/lib/ai/summarize-issue";
import { getFixtureIssueDetails } from "@/lib/fixtures/issue-details";
import { getIssue } from "@/lib/jira/client";
import { hasJiraEnv } from "@/lib/jira/env";
import { CF } from "@/lib/constants/jira-fields";
import { buildJiraIssueDetails, isSensitiveIssue } from "@/lib/jira/issue-details";

export const runtime = "nodejs";

/** Bumps Next.js data cache when AI parsing / gateway env semantics change (avoids stale `ai: null`). */
const AI_SUMMARY_CACHE_VERSION = "3";

const ISSUE_FIELDS = [
  "summary",
  "status",
  "updated",
  "description",
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

export async function GET(_req: Request, ctx: { params: Promise<{ key: string }> }) {
  const { key: rawKey } = await ctx.params;
  const key = rawKey.trim().toUpperCase();
  if (!/^[A-Z][A-Z0-9]+-\d+$/.test(key)) {
    return NextResponse.json({ error: "Invalid issue key" }, { status: 400 });
  }

  if (!hasJiraEnv()) {
    const fx = getFixtureIssueDetails(key);
    if (fx) return NextResponse.json(fx);
    return NextResponse.json(
      {
        error:
          "Jira is not configured (set JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN in web/.env.local — values are trimmed) or this key has no fixture.",
      },
      { status: 404 },
    );
  }

  try {
    const issue = await getIssue(key, ISSUE_FIELDS);
    const jira = buildJiraIssueDetails(issue);
    const sensitive = isSensitiveIssue(issue.fields);
    const plain = jira.dependencyDescriptionPlain;
    const minLen = 20;

    let ai = null as Awaited<ReturnType<typeof summarizeIssue>>;
    if (!sensitive && plain.length >= minLen && process.env.PORTKEY_API_KEY) {
      const updated = jira.updated || issue.updated || "";
      const model = process.env.PORTKEY_MODEL?.trim() ?? "";
      const gateway = process.env.PORTKEY_BASE_URL?.trim() ?? "";
      const cached = unstable_cache(
        async () => summarizeIssue(plain),
        ["dmpt-issue-ai", AI_SUMMARY_CACHE_VERSION, key, updated, model, gateway],
        { revalidate: 86_400 },
      );
      ai = await cached();
    }

    return NextResponse.json({ jira, ai, source: "jira" as const });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    if (/404/.test(message)) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
