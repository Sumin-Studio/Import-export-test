"use client";

import type { ReactNode } from "react";
import type { DependencyStatus, TeamNode } from "@/lib/types";
import { statusColor } from "./theme";

const ALL_STATUSES: DependencyStatus[] = [
  "Raise",
  "Assess",
  "Ready",
  "Deliver",
  "Closed",
  "Escalation",
];

type Props = {
  teams: TeamNode[];
  focusTeamId: string | null;
  onFocusTeam: (id: string | null) => void;
  showArchived: boolean;
  onToggleArchived: (v: boolean) => void;
  statusFilter: Set<DependencyStatus>;
  onToggleStatus: (s: DependencyStatus) => void;
  quarterFilter: Set<string>;
  onToggleQuarter: (q: string) => void;
  quarterOptions: string[];
  onFitFocus: () => void;
  onResetView: () => void;
};

function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "5px 9px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
        background: active ? "var(--accent-soft)" : "transparent",
        color: active ? "var(--text)" : "var(--text-muted)",
        boxShadow: active && color ? `inset 0 0 0 1px ${color}55` : undefined,
      }}
    >
      {children}
    </button>
  );
}

export function LeftRail({
  teams,
  focusTeamId,
  onFocusTeam,
  showArchived,
  onToggleArchived,
  statusFilter,
  onToggleStatus,
  quarterFilter,
  onToggleQuarter,
  quarterOptions,
  onFitFocus,
  onResetView,
}: Props) {
  return (
    <aside
      style={{
        height: "100%",
        background: "var(--bg-panel)",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: 0,
        overflow: "auto",
      }}
    >
      <section>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Focus
        </div>
        <select
          value={focusTeamId ?? ""}
          onChange={(e) => onFocusTeam(e.target.value || null)}
          style={{
            width: "100%",
            padding: "10px 10px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "var(--bg-panel-2)",
          }}
        >
          <option value="">All teams (overview)</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button
            type="button"
            onClick={onFitFocus}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-strong)",
              background: "var(--bg-panel-2)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Fit to focus
          </button>
          <button
            type="button"
            onClick={onResetView}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px dashed var(--border)",
              color: "var(--text-muted)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Reset camera
          </button>
        </div>
      </section>

      <section>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Lifecycle
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "var(--bg-panel-2)",
            fontSize: 13,
          }}
        >
          <span style={{ display: "grid", gap: 4, minWidth: 0 }}>
            <span>Show archived</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500, lineHeight: 1.35 }}>
              Restores dependencies marked complete / archived in Jira. Off by default so the map stays
              focused on active delivery.
            </span>
          </span>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => onToggleArchived(e.target.checked)}
            style={{ marginTop: 2 }}
          />
        </label>
      </section>

      <section>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Status
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
          Empty selection shows all statuses. Default excludes Closed.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ALL_STATUSES.map((s) => (
            <Chip
              key={s}
              active={statusFilter.has(s)}
              color={statusColor[s]}
              onClick={() => onToggleStatus(s)}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: statusColor[s],
                  }}
                />
                {s}
              </span>
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Proposed quarter
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
          Uses Proposed Delivery Quarter only. Pick one chip to narrow the server query; multiple
          chips filter in the browser.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {quarterOptions.length === 0 ? (
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>No quarters in graph yet</span>
          ) : (
            quarterOptions.map((q) => (
              <Chip key={q} active={quarterFilter.has(q)} onClick={() => onToggleQuarter(q)}>
                {q}
              </Chip>
            ))
          )}
        </div>
      </section>

      <section style={{ marginTop: "auto" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Legend
        </div>
        <div
          style={{
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--bg-panel-2)",
            padding: 10,
            display: "grid",
            gap: 8,
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              aria-hidden
              style={{
                width: 14,
                height: 10,
                borderRadius: 3,
                background: "#2f80ed",
                border: "1px solid #8ab8ff",
              }}
            />
            Team
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              aria-hidden
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: statusColor.Assess,
                border: "1px solid #ffffff55",
              }}
            />
            Dependency (fill = status)
          </div>
          <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
          <div style={{ fontSize: 11, lineHeight: 1.45, color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>Direction:</strong> solid arrows run{" "}
            <span style={{ fontFamily: "var(--font-mono)" }}>requesting team → dependency → delivery team</span>.
            The <em>requesting</em> team needs the work; the <em>delivery</em> team is the one being depended on.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden style={{ width: 22, height: 3, background: "#8fa3bf", borderRadius: 2 }} />
            Dependency flow (neutral)
          </div>
        </div>
      </section>
    </aside>
  );
}
