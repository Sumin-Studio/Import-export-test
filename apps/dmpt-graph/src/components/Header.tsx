"use client";

type Props = {
  subtitle?: string;
};

export function Header({ subtitle }: Props) {
  return (
    <header
      className="app-header"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 18px",
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(180deg, #101826 0%, #0d121c 100%)",
      }}
    >
      <div
        className="app-header__brand"
        style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}
      >
        <div
          aria-hidden
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: "linear-gradient(135deg, #5b8cff, #3dd6c3)",
            boxShadow: "0 0 18px rgba(91,140,255,0.45)",
          }}
        />
        <div style={{ minWidth: 0, flex: "1 1 auto" }}>
          <div style={{ fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            DMPT Graph
          </div>
          <div
            className="app-header__subtitle"
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {subtitle ?? "MVP · read-only"}
          </div>
        </div>
      </div>

      <div className="app-header__spacer" style={{ flex: 1, minWidth: 8 }} />

      <label
        className="app-header__search"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: "var(--bg-panel-2)",
          minWidth: 0,
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Search</span>
        <input
          placeholder="Teams, keys, summaries…"
          disabled
          title="Search is not wired in the MVP build"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            minWidth: 0,
            fontSize: 13,
            opacity: 0.55,
          }}
        />
      </label>

      <button
        type="button"
        className="app-header__help"
        style={{
          padding: "8px 10px",
          borderRadius: 9,
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        Help
      </button>
    </header>
  );
}
