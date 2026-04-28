"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  DependencyNode,
  DependencyStatus,
  GraphLink,
  GraphNode,
  GraphPayload,
  TeamNode,
} from "@/lib/types";
import { buildLinks } from "@/lib/graph/build-links";
import { DetailsDrawer } from "./DetailsDrawer";
import { GraphCanvas, type GraphCanvasHandle } from "./GraphCanvas";
import { Header } from "./Header";
import { LeftRail } from "./LeftRail";

type Props = {
  jiraBrowseBase: string;
};

function matchesFilters(
  d: DependencyNode,
  opts: {
    showArchived: boolean;
    statusFilter: Set<DependencyStatus>;
    quarterFilter: Set<string>;
  },
) {
  if (!opts.showArchived && d.lifecycle === "ARCHIVED") return false;
  if (opts.statusFilter.size > 0 && !opts.statusFilter.has(d.status)) return false;
  if (opts.quarterFilter.size > 0 && !opts.quarterFilter.has(d.proposedQuarter)) return false;
  return true;
}

function relatedKeysForTeam(teamId: string, links: GraphLink[], nodes: GraphNode[]): string[] {
  const keys = new Set<string>();
  const depById = new Map(
    nodes.filter((n): n is DependencyNode => n.kind === "dependency").map((d) => [d.id, d]),
  );
  for (const l of links) {
    const s = typeof l.source === "object" ? (l.source as { id: string }).id : String(l.source);
    const t = typeof l.target === "object" ? (l.target as { id: string }).id : String(l.target);
    if (l.edgeType === "REQUESTS" && s === teamId) {
      const d = depById.get(t);
      if (d) keys.add(d.jiraKey);
    }
    if (l.edgeType === "DELIVERS" && t === teamId) {
      const d = depById.get(s);
      if (d) keys.add(d.jiraKey);
    }
  }
  return [...keys].sort();
}

export function RadarApp({ jiraBrowseBase }: Props) {
  const [graph, setGraph] = useState<GraphPayload | null>(null);
  const [graphError, setGraphError] = useState<string | null>(null);
  const [focusTeamId, setFocusTeamId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Set<DependencyStatus>>(() => {
    const all: DependencyStatus[] = ["Raise", "Assess", "Ready", "Deliver", "Closed", "Escalation"];
    return new Set(all.filter((s) => s !== "Closed"));
  });
  const [quarterFilter, setQuarterFilter] = useState<Set<string>>(() => new Set());
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(true);
  const graphRef = useRef<GraphCanvasHandle>(null);

  const allTeams = useMemo(
    () => graph?.nodes.filter((n): n is TeamNode => n.kind === "team") ?? [],
    [graph],
  );
  const allDeps = useMemo(
    () => graph?.nodes.filter((n): n is DependencyNode => n.kind === "dependency") ?? [],
    [graph],
  );

  const teamLabels = useMemo(() => new Map(allTeams.map((t) => [t.id, t.label])), [allTeams]);

  const quarterOptions = useMemo(() => {
    const s = new Set<string>();
    for (const d of allDeps) {
      if (d.proposedQuarter && d.proposedQuarter !== "TBC") s.add(d.proposedQuarter);
    }
    return [...s].sort();
  }, [allDeps]);

  useEffect(() => {
    const url = "/api/graph";
    const ac = new AbortController();
    setGraphError(null);
    fetch(url, { signal: ac.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json() as Promise<GraphPayload>;
      })
      .then(setGraph)
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setGraphError(e instanceof Error ? e.message : "Failed to load graph");
        setGraph(null);
      });
    return () => ac.abort();
  }, []);

  const filterOpts = useMemo(
    () => ({ showArchived, statusFilter, quarterFilter }),
    [showArchived, statusFilter, quarterFilter],
  );

  const visibleDeps = useMemo(
    () => allDeps.filter((d) => matchesFilters(d, filterOpts)),
    [allDeps, filterOpts],
  );

  const graphData = useMemo(() => {
    const usedTeamIds = new Set<string>();
    for (const d of visibleDeps) {
      usedTeamIds.add(d.requestingTeamId);
      usedTeamIds.add(d.deliveryTeamId);
    }
    const teams = allTeams.filter((t) => usedTeamIds.has(t.id));
    const nodes: GraphNode[] = [...teams, ...visibleDeps];
    const links = buildLinks(visibleDeps);
    return { nodes, links };
  }, [allTeams, visibleDeps]);

  useEffect(() => {
    if (!selected || selected.kind !== "dependency") return;
    const stillVisible = visibleDeps.some((d) => d.id === selected.id);
    if (!stillVisible) setSelected(null);
  }, [selected, visibleDeps]);

  const toggleStatus = useCallback((s: DependencyStatus) => {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }, []);

  const toggleQuarter = useCallback((q: string) => {
    setQuarterFilter((prev) => {
      const next = new Set(prev);
      if (next.has(q)) next.delete(q);
      else next.add(q);
      return next;
    });
  }, []);

  const focusIdsForZoom = useCallback((): string[] => {
    if (focusTeamId) {
      const ids = new Set<string>([focusTeamId]);
      for (const d of visibleDeps) {
        if (d.requestingTeamId === focusTeamId || d.deliveryTeamId === focusTeamId) {
          ids.add(d.id);
        }
      }
      return [...ids];
    }
    return graphData.nodes.map((n) => n.id);
  }, [focusTeamId, visibleDeps, graphData.nodes]);

  const relatedIssueKeys = useMemo(() => {
    if (!selected || selected.kind !== "team") return [];
    return relatedKeysForTeam(selected.id, graphData.links, graphData.nodes);
  }, [selected, graphData.links, graphData.nodes]);

  const headerSubtitle = useMemo(() => {
    if (graphError) return graphError;
    if (!graph) return "Loading graph…";
    const bits: string[] = [graph.source === "fixtures" ? "Fixtures" : "Jira", "read-only"];
    if (graph.warning) bits.push("degraded");
    else if (graph.hint) bits.push("no matching issues");
    return bits.join(" · ");
  }, [graph, graphError]);

  return (
    <div
      className="app-shell"
      style={{
        height: "100dvh",
        maxHeight: "100dvh",
        display: "grid",
        gridTemplateRows: graph?.warning || graph?.hint ? "auto auto 1fr" : "auto 1fr",
        minHeight: 0,
      }}
    >
      <Header subtitle={headerSubtitle} />

      {graph?.warning ? (
        <div
          className="app-degraded-banner"
          style={{
            padding: "10px 18px",
            fontSize: 13,
            lineHeight: 1.45,
            borderBottom: "1px solid var(--border)",
            background: "rgba(245, 180, 0, 0.12)",
            color: "var(--text)",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          <strong>Degraded mode.</strong> Showing fixtures while Jira was unavailable: {graph.warning}
        </div>
      ) : graph?.hint ? (
        <div
          className="app-hint-banner"
          style={{
            padding: "10px 18px",
            fontSize: 13,
            lineHeight: 1.45,
            borderBottom: "1px solid var(--border)",
            background: "rgba(100, 149, 237, 0.1)",
            color: "var(--text)",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          <strong>No graph data.</strong> {graph.hint}
          {graph.probe && graph.probe.issueCount > 0 ? (
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
              <div style={{ fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>
                Probe: {graph.probe.jql}
              </div>
              <div style={{ marginTop: 4 }}>
                {graph.probe.issueCount} issue(s) · statuses: {graph.probe.statusesSeen.join(" · ")}
              </div>
            </div>
          ) : graph.probe && graph.probe.issueCount === 0 ? (
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
              Probe returned 0 issues: <span style={{ fontFamily: "var(--font-mono)" }}>{graph.probe.jql}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={`workspace workspace--drawer${detailsPanelOpen ? "" : " workspace--drawer-collapsed"}`}
        style={{ minHeight: 0 }}
      >
        <div className="workspace__rail">
          <LeftRail
            teams={allTeams}
            focusTeamId={focusTeamId}
            onFocusTeam={setFocusTeamId}
            showArchived={showArchived}
            onToggleArchived={setShowArchived}
            statusFilter={statusFilter}
            onToggleStatus={toggleStatus}
            quarterFilter={quarterFilter}
            onToggleQuarter={toggleQuarter}
            quarterOptions={quarterOptions}
            onFitFocus={() => graphRef.current?.fitToIds(focusIdsForZoom())}
            onResetView={() => graphRef.current?.fitAll()}
          />
        </div>

        <div className="workspace__graph">
          <GraphCanvas
            ref={graphRef}
            data={graphData}
            selectedId={selected?.id ?? null}
            onSelectNode={(n) => {
              setSelected(n);
              if (n) setDetailsPanelOpen(true);
            }}
          />
        </div>

        {detailsPanelOpen ? (
          <div className="workspace__details">
            <DetailsDrawer
              node={selected}
              onClose={() => {
                setDetailsPanelOpen(false);
                setSelected(null);
              }}
              jiraBrowseBase={jiraBrowseBase}
              relatedIssueKeys={relatedIssueKeys}
              graphLinks={graphData.links}
              teamLabels={teamLabels}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

