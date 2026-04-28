"use client";

import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { GraphLink, GraphNode } from "@/lib/types";
import { canvasBg, edgeNeutral, statusColor } from "./theme";

/** Zoomed in past this scale (1 = default) → show full team name pills. */
const TEAM_FULL_LABEL_ZOOM = 0.74;

function linkEndpointIds(link: GraphLink): { src: string; tgt: string } {
  const src = typeof link.source === "object" ? (link.source as { id: string }).id : String(link.source);
  const tgt = typeof link.target === "object" ? (link.target as { id: string }).id : String(link.target);
  return { src, tgt };
}

function teamInitials(label: string, max = 3): string {
  const parts = label.split(/[\s–—-]+/).filter(Boolean);
  const chars: string[] = [];
  for (const p of parts) {
    const m = p.match(/[A-Za-z0-9]/);
    if (m) chars.push(m[0].toUpperCase());
    if (chars.length >= max) break;
  }
  if (chars.length > 0) return chars.join("").slice(0, max);
  const flat = label.match(/[A-Za-z0-9]/g);
  return (flat?.join("") ?? "?").slice(0, max).toUpperCase();
}

/** Rounded “chip” for zoomed-out teams — same visual language as full pills. */
function teamCompactChipDims(
  ctx: CanvasRenderingContext2D,
  gs: number,
  label: string,
): { w: number; h: number; initials: string } {
  ctx.font = `${11 / gs}px IBM Plex Sans, system-ui, sans-serif`;
  const initials = teamInitials(label);
  const padX = 14 / gs;
  const h = 26 / gs;
  const tw = ctx.measureText(initials).width;
  const w = Math.max(tw + padX * 2, 52 / gs);
  return { w, h, initials };
}

function truncateToWidth(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  const ellipsis = "…";
  for (let end = text.length; end > 0; end -= 1) {
    const t = `${text.slice(0, end)}${ellipsis}`;
    if (ctx.measureText(t).width <= maxWidth) return t;
  }
  return ellipsis;
}

export type GraphCanvasHandle = {
  fitToIds: (ids: string[]) => void;
  fitAll: () => void;
  reheat: () => void;
};

type Props = {
  data: { nodes: GraphNode[]; links: GraphLink[] };
  selectedId: string | null;
  onSelectNode: (node: GraphNode | null) => void;
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export const GraphCanvas = forwardRef<GraphCanvasHandle, Props>(function GraphCanvas(
  { data, selectedId, onSelectNode },
  ref,
) {
  const fgRef = useRef<ForceGraphMethods>(undefined);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const expandedTeamIds = useMemo(() => {
    const out = new Set<string>();
    if (hoveredId) {
      const hn = data.nodes.find((n) => n.id === hoveredId);
      if (hn?.kind === "team") out.add(hoveredId);
      if (hn?.kind === "dependency") {
        out.add(hn.requestingTeamId);
        out.add(hn.deliveryTeamId);
      }
    }
    if (!selectedId) return out;
    const sn = data.nodes.find((n) => n.id === selectedId);
    if (!sn) return out;

    if (sn.kind === "team") {
      out.add(selectedId);
      const nearDeps = new Set<string>();
      for (const l of data.links) {
        const { src, tgt } = linkEndpointIds(l);
        if (l.edgeType === "REQUESTS" && src === selectedId) nearDeps.add(tgt);
        if (l.edgeType === "DELIVERS" && tgt === selectedId) nearDeps.add(src);
      }
      for (const l of data.links) {
        const { src, tgt } = linkEndpointIds(l);
        if (l.edgeType === "DELIVERS" && nearDeps.has(src)) out.add(tgt);
        if (l.edgeType === "REQUESTS" && nearDeps.has(tgt)) out.add(src);
      }
    } else if (sn.kind === "dependency") {
      out.add(sn.requestingTeamId);
      out.add(sn.deliveryTeamId);
    }
    return out;
  }, [data.links, data.nodes, hoveredId, selectedId]);

  useImperativeHandle(ref, () => ({
    fitToIds(ids: string[]) {
      const inst = fgRef.current;
      if (!inst) return;
      inst.zoomToFit(650, 72, (n: object) => ids.includes((n as { id: string }).id));
    },
    fitAll() {
      fgRef.current?.zoomToFit(650, 96);
    },
    reheat() {
      fgRef.current?.d3ReheatSimulation?.();
    },
  }));

  const neighborLinkIds = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>();
    for (const l of data.links) {
      const src = typeof l.source === "object" ? (l.source as { id: string }).id : String(l.source);
      const tgt = typeof l.target === "object" ? (l.target as { id: string }).id : String(l.target);
      if (src === selectedId || tgt === selectedId) set.add(l.id);
    }
    return set;
  }, [data.links, selectedId]);

  useEffect(() => {
    const t = window.setTimeout(() => fgRef.current?.d3ReheatSimulation?.(), 0);
    return () => window.clearTimeout(t);
  }, [data]);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const applyForces = () => {
      if (cancelled) return;
      attempts += 1;
      const inst = fgRef.current;
      if (!inst) {
        if (attempts < 200) requestAnimationFrame(applyForces);
        return;
      }
      const charge = inst.d3Force("charge");
      if (charge && typeof charge.strength === "function") charge.strength(-920);
      const link = inst.d3Force("link");
      if (link && typeof link.distance === "function") {
        link.distance(168);
      }
      const center = inst.d3Force("center");
      if (center && typeof center.strength === "function") center.strength(0.06);
      inst.d3ReheatSimulation?.();
    };
    applyForces();
    return () => {
      cancelled = true;
    };
  }, [data]);

  return (
    <div
      className="graph-canvas-root"
      style={{ position: "relative", height: "100%", minHeight: 0, background: canvasBg }}
    >
      <ForceGraph2D
        ref={fgRef}
        backgroundColor={canvasBg}
        graphData={data}
        nodeId="id"
        linkSource="source"
        linkTarget="target"
        linkLineDash={() => null}
        linkDirectionalArrowLength={() => 5}
        linkDirectionalArrowRelPos={1}
        linkColor={() => edgeNeutral}
        linkWidth={(link) => {
          const l = link as GraphLink;
          if (!neighborLinkIds) return 1.8;
          return neighborLinkIds.has(l.id) ? 3.2 : 0.9;
        }}
        linkDirectionalParticles={0}
        onBackgroundClick={() => onSelectNode(null)}
        onNodeClick={(node) => onSelectNode(node as GraphNode)}
        onNodeHover={(node) => setHoveredId(node ? (node as GraphNode).id : null)}
        cooldownTicks={200}
        warmupTicks={80}
        d3VelocityDecay={0.38}
        minZoom={0.15}
        maxZoom={12}
        nodePointerAreaPaint={(node, color, ctx, globalScale) => {
          const n = node as GraphNode & { x?: number; y?: number };
          const x = n.x ?? 0;
          const y = n.y ?? 0;
          const gs = globalScale;
          ctx.fillStyle = color;
          if (n.kind === "team") {
            const showFullPill =
              gs >= TEAM_FULL_LABEL_ZOOM || expandedTeamIds.has(n.id) || n.id === selectedId;
            ctx.save();
            ctx.translate(x, y);
            if (showFullPill) {
              ctx.font = `${12 / gs}px IBM Plex Sans, system-ui, sans-serif`;
              const w = Math.min(ctx.measureText(n.label).width + 22 / gs, 200 / gs);
              const h = 28 / gs;
              roundRect(ctx, -w / 2, -h / 2, w, h, 8 / gs);
              ctx.fill();
            } else {
              const { w, h } = teamCompactChipDims(ctx, gs, n.label);
              roundRect(ctx, -w / 2, -h / 2, w, h, 8 / gs);
              ctx.fill();
            }
            ctx.restore();
            return;
          }
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const n = node as GraphNode & { x?: number; y?: number };
          const x = n.x ?? 0;
          const y = n.y ?? 0;
          const gs = globalScale;
          const selected = n.id === selectedId;
          const archived = n.kind === "dependency" && n.lifecycle === "ARCHIVED";

          ctx.save();
          ctx.translate(x, y);
          ctx.globalAlpha = archived ? 0.38 : 1;

          if (n.kind === "team") {
            const showFullPill =
              gs >= TEAM_FULL_LABEL_ZOOM || expandedTeamIds.has(n.id) || selected;
            ctx.fillStyle = "#13294a";
            ctx.strokeStyle = selected ? "#d7e6ff" : "#2f5fbf";
            ctx.lineWidth = selected ? 2 / gs : 1 / gs;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (!showFullPill) {
              const { w, h, initials } = teamCompactChipDims(ctx, gs, n.label);
              roundRect(ctx, -w / 2, -h / 2, w, h, 8 / gs);
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = "#e8eef7";
              ctx.fillText(initials, 0, 0);
            } else {
              ctx.font = `${12 / gs}px IBM Plex Sans, system-ui, sans-serif`;
              const maxTextW = 188 / gs - 18 / gs;
              const text = truncateToWidth(ctx, n.label, maxTextW);
              const w = Math.min(ctx.measureText(text).width + 18 / gs, 188 / gs);
              const h = 26 / gs;
              roundRect(ctx, -w / 2, -h / 2, w, h, 8 / gs);
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = "#e8eef7";
              ctx.fillText(text, 0, 0);
            }
          } else {
            const r = 10 / gs;
            const fill = statusColor[n.status];
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.fillStyle = fill;
            ctx.fill();
            ctx.lineWidth = selected ? 3 / gs : 1.5 / gs;
            ctx.strokeStyle = archived ? "#6b7a90" : "#0b1020";
            ctx.stroke();
            const keyPx = gs < 0.52 ? 8.5 / gs : 10 / gs;
            ctx.font = `${keyPx}px IBM Plex Mono, ui-monospace, monospace`;
            ctx.fillStyle = "#071018";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const short = n.jiraKey.includes("-") ? n.jiraKey.split("-").pop() ?? n.jiraKey : n.jiraKey;
            ctx.fillText(short, 0, 0.5 / gs);
          }

          ctx.restore();
        }}
      />

      <div
        className="graph-hud-zoom"
        style={{
          position: "absolute",
          right: 14,
          bottom: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(10,14,20,0.72)",
            backdropFilter: "blur(10px)",
            padding: 8,
            display: "grid",
            gap: 6,
            width: 132,
          }}
        >
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>Graph</div>
          <button
            type="button"
            onClick={() => fgRef.current?.zoom(fgRef.current.zoom() * 1.2)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text)",
              fontWeight: 700,
              fontSize: 12,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Zoom in
          </button>
          <button
            type="button"
            onClick={() => fgRef.current?.zoom(fgRef.current.zoom() / 1.2)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text)",
              fontWeight: 700,
              fontSize: 12,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Zoom out
          </button>
          <button
            type="button"
            onClick={() => fgRef.current?.zoomToFit(650, 96)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text)",
              fontWeight: 700,
              fontSize: 12,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Fit all
          </button>
        </div>
      </div>

      <div
        className="graph-canvas-hint"
        style={{
          position: "absolute",
          left: 14,
          bottom: 14,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(10,14,20,0.72)",
          backdropFilter: "blur(10px)",
          padding: "10px 12px",
          /* Use % of graph panel — avoid 100vw (wider than layout when scrollbars exist) */
          maxWidth: "min(380px, calc(100% - 160px))",
          fontSize: 12,
          color: "var(--text-muted)",
          lineHeight: 1.45,
        }}
      >
        <span style={{ color: "var(--text)", fontWeight: 700 }}>DMPT Graph (MVP).</span> Team
        names stay compact when zoomed out; zoom in, hover a team, or select a node to expand nearby labels.
      </div>
    </div>
  );
});
