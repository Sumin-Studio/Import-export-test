"use client";

import { useEffect, useMemo, useState } from "react";
import type { IssueAiInsights } from "@/lib/types";
import type { JiraIssueDetails } from "@/lib/jira/issue-details";
import type { GraphLink, GraphNode } from "@/lib/types";
import { statusColor } from "./theme";

type IssuePayload = {
  jira: JiraIssueDetails;
  ai: IssueAiInsights | null;
  source: "fixtures" | "jira";
};

type Props = {
  node: GraphNode | null;
  onClose: () => void;
  jiraBrowseBase: string;
  relatedIssueKeys: string[];
  graphLinks: GraphLink[];
  /** Team node id → display label (for dependency requesting/delivery rows). */
  teamLabels: ReadonlyMap<string, string>;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{label}</div>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.35,
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function DetailsDrawer({
  node,
  onClose,
  jiraBrowseBase,
  relatedIssueKeys,
  graphLinks,
  teamLabels,
}: Props) {
  const [payload, setPayload] = useState<IssuePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const jiraKey = useMemo(() => {
    if (!node) return null;
    if (node.kind === "team") return null;
    return node.jiraKey;
  }, [node]);

  useEffect(() => {
    if (!jiraKey) {
      setPayload(null);
      setError(null);
      setLoading(false);
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`/api/issues/${encodeURIComponent(jiraKey)}`, { signal: ac.signal })
      .then(async (r) => {
        if (!r.ok) {
          const t = await r.text();
          throw new Error(t || r.statusText);
        }
        return r.json() as Promise<IssuePayload>;
      })
      .then(setPayload)
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load issue");
        setPayload(null);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [jiraKey]);

  const browseUrl =
    jiraBrowseBase && jiraKey ? `${jiraBrowseBase}/browse/${encodeURIComponent(jiraKey)}` : "";

  return (
    <aside
      style={{
        height: "100%",
        background: "var(--bg-panel)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>Selection</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, lineHeight: 1.25 }}>
            {node ? node.label : "Nothing selected"}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          style={{
            padding: "6px 8px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: 12,
          }}
        >
          Close
        </button>
      </div>

      <div
        style={{
          padding: 16,
          paddingBottom: "max(16px, env(safe-area-inset-bottom, 0px))",
          overflow: "auto",
          display: "grid",
          gap: 14,
        }}
      >
        {!node && (
          <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.5 }}>
            Click a node in the graph to inspect teams or DMPT dependencies.
          </div>
        )}

        {node?.kind === "team" && (
          <>
            <Row label="Team" value={node.label} />
            <Row label="Division" value={node.division} />
            <Row label="Portfolio" value={node.portfolio} />
            <Row label="Sub-portfolio" value={node.subPortfolio} />
            <div
              style={{
                padding: 12,
                borderRadius: "var(--radius-sm)",
                border: "1px dashed var(--border)",
                color: "var(--text-muted)",
                fontSize: 12,
                lineHeight: 1.45,
              }}
            >
              Team nodes aggregate activity from the current graph slice. Related DMPT issue keys
              (read-only) are listed below; open them in Jira for full workflow context.
            </div>
            {relatedIssueKeys.length > 0 ? (
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>
                  Related issues ({relatedIssueKeys.length})
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                  {relatedIssueKeys.map((k) => (
                    <li key={k} style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                      {jiraBrowseBase ? (
                        <a href={`${jiraBrowseBase}/browse/${encodeURIComponent(k)}`} style={{ color: "var(--accent)" }}>
                          {k}
                        </a>
                      ) : (
                        k
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>No adjacent dependencies in the current view.</div>
            )}
            <Row label="Edges in view" value={String(graphLinks.length)} />
          </>
        )}

        {node?.kind === "dependency" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                aria-hidden
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: statusColor[node.status],
                  border: "1px solid #ffffff55",
                }}
              />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600 }}>
                {node.jiraKey}
              </div>
            </div>
            <div
              style={{
                padding: 12,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-panel-2)",
                fontSize: 12,
                lineHeight: 1.45,
                color: "var(--text)",
              }}
            >
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, marginBottom: 6 }}>
                Who depends on whom
              </div>
              <span style={{ fontWeight: 600 }}>{teamLabels.get(node.requestingTeamId) ?? node.requestingTeamId}</span>{" "}
              needs delivery from{" "}
              <span style={{ fontWeight: 600 }}>{teamLabels.get(node.deliveryTeamId) ?? node.deliveryTeamId}</span>
              . The delivery team is the side being depended on; the requesting team is waiting on that work.
            </div>
            <Row
              label="Requesting team"
              value={teamLabels.get(node.requestingTeamId) ?? node.requestingTeamId}
            />
            <Row
              label="Delivery team (depended on)"
              value={teamLabels.get(node.deliveryTeamId) ?? node.deliveryTeamId}
            />
            <Row label="Type" value={node.type} />
            <Row label="Status (graph)" value={node.status} />
            <Row label="Proposed quarter" value={node.proposedQuarter} />
            <Row label="Confirmed quarter" value={node.confirmedQuarter} />
            <Row label="Lifecycle" value={node.lifecycle} />
            {node.archivedAt && <Row label="Archived at" value={node.archivedAt} />}
            {loading && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Loading Jira fields…</div>}
            {error && <div style={{ fontSize: 12, color: "var(--danger)" }}>{error}</div>}
            {payload && (
              <>
                <Row label="Summary (Jira)" value={payload.jira.summary} />
                <Row label="Workflow status (Jira)" value={payload.jira.statusName} />
                <Row label="Requesting division" value={payload.jira.requestingDivision || "—"} />
                <Row
                  label="Requesting portfolio"
                  value={payload.jira.requestingPortfolioLabels.join(" · ") || "—"}
                />
                <Row label="Delivery division" value={payload.jira.deliveryDivision || "—"} />
                <Row
                  label="Delivery portfolio"
                  value={payload.jira.deliveryPortfolioLabels.join(" · ") || "—"}
                />
                <Row label="Dependency type" value={payload.jira.dependencyType || "—"} />
                <Row label="Work type" value={payload.jira.workType || "—"} />
                <Row label="Dependency owner" value={payload.jira.dependencyOwner || "—"} />
                <Row label="Parent" value={payload.jira.parentKey ?? "—"} />
                {payload.jira.dependencyDescriptionPlain ? (
                  <Row label="Dependency description (plain)" value={payload.jira.dependencyDescriptionPlain} />
                ) : null}
                <Row label="Sensitive (Jira)" value={payload.jira.sensitivityLabel || "—"} />
              </>
            )}
            {browseUrl ? (
              <a
                href={browseUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-strong)",
                  background: "var(--bg-panel-2)",
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: "left",
                  color: "var(--text)",
                  textDecoration: "none",
                }}
              >
                Open in Jira
              </a>
            ) : null}
            <AiBlock payload={payload} loading={loading} />
          </>
        )}
      </div>
    </aside>
  );
}

function AiBlock({ payload, loading }: { payload: IssuePayload | null; loading: boolean }) {
  if (loading && !payload) return null;
  if (!payload) return null;
  const ai = payload.ai;
  if (!ai) {
    return (
      <div
        style={{
          borderRadius: "var(--radius-sm)",
          border: "1px dashed var(--border)",
          padding: 12,
          fontSize: 12,
          color: "var(--text-muted)",
          lineHeight: 1.45,
        }}
      >
        No AI summary for this issue (sensitive flag, empty description, missing Portkey configuration, or
        summarisation skipped).
      </div>
    );
  }
  return (
    <div
      style={{
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bg-panel-2)",
        padding: 12,
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700 }}>Key information (AI)</div>
      <div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>Key points</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {ai.keyPoints.map((k) => (
            <li key={k} style={{ fontSize: 13, lineHeight: 1.35 }}>
              {k}
            </li>
          ))}
        </ul>
      </div>
      {ai.risks && ai.risks.length > 0 ? (
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>Risks</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {ai.risks.map((k) => (
              <li key={k} style={{ fontSize: 13, lineHeight: 1.35 }}>
                {k}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {ai.asks && ai.asks.length > 0 ? (
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>Asks</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {ai.asks.map((k) => (
              <li key={k} style={{ fontSize: 13, lineHeight: 1.35 }}>
                {k}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.45 }}>
        AI runs only on the server via Portkey; dependency text is stripped to plain before the model sees it.
        Do not paste secrets into Jira descriptions.
      </div>
    </div>
  );
}
