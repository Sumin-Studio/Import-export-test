"use client";

import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import { useRegion } from "@/app/contexts/RegionContext";
import type {
  PrototypeDisplayMode,
  PrototypeStageId,
  PrototypeWidgetScope,
} from "@/app/lib/prototypeSettings";
import { REGIONS, type Region } from "@/app/lib/regions";

const PANEL_POSITION_KEY = "nz-tax-widget-prototype-panel-position";
const PANEL_WIDTH = 360;
const GAP = 8;

const settingGroupClassName =
  "border-border-secondary bg-background-primary rounded-xl border px-3.5 py-3";

const DISPLAY_OPTIONS: { id: PrototypeDisplayMode; label: string }[] = [
  { id: "color", label: "Color" },
  { id: "grayscale", label: "Grayscale" },
  { id: "highlight", label: "Highlight" },
];

const REGION_OPTIONS: { id: Region; label: string }[] = [
  { id: REGIONS.NZ, label: "NZ" },
  { id: REGIONS.AU, label: "AU" },
  { id: REGIONS.UK, label: "UK" },
  { id: REGIONS.USA, label: "US" },
];

const WIDGET_SCOPE_OPTIONS: { id: PrototypeWidgetScope; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tax", label: "Tax" },
];

function clampPosition(
  left: number,
  top: number,
  panelW: number,
  panelH: number
): { left: number; top: number } {
  const pad = 8;
  const maxL = Math.max(pad, window.innerWidth - panelW - pad);
  const maxT = Math.max(pad, window.innerHeight - panelH - pad);
  return {
    left: Math.min(Math.max(pad, left), maxL),
    top: Math.min(Math.max(pad, top), maxT),
  };
}

function DragHandleIcon() {
  return (
    <svg
      aria-hidden
      className="text-content-muted shrink-0"
      width={18}
      height={14}
      viewBox="0 0 18 14"
    >
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={3 + col * 6}
            cy={3 + row * 4}
            r={1.75}
            fill="currentColor"
          />
        ))
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4l8 8M12 4L4 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function SegmentedRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; disabled?: boolean; title?: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="text-content-muted text-[11px] font-semibold tracking-[0.06em] uppercase">
        {label}
      </div>
      <div className="bg-background-tertiary/60 flex rounded-lg p-0.5">
        {options.map((opt) => {
          const active = value === opt.id;
          const disabled = Boolean(opt.disabled);
          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              aria-disabled={disabled}
              title={opt.title}
              className={clsx(
                "min-w-0 flex-1 rounded-md px-2 py-1.5 text-[13px]/[18px] font-medium transition-[color,background-color,box-shadow]",
                disabled &&
                  "text-content-muted cursor-not-allowed opacity-40 hover:bg-transparent",
                !disabled &&
                  (active
                    ? "bg-background-secondary text-brand-primary shadow-sm ring-1 ring-[rgba(0,10,30,0.06)]"
                    : "text-content-secondary hover:text-content-primary")
              )}
              onClick={() => {
                if (!disabled) onChange(opt.id);
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PrototypeSettingsTrigger() {
  const { togglePrototypePanel, prototypeSettingsTriggerRef } =
    usePrototypeSettings();
  return (
    <button
      ref={prototypeSettingsTriggerRef}
      type="button"
      onClick={togglePrototypePanel}
      className="tab-focus bg-[#0a0a0a] hover:bg-[#1a1a1a] shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-[13px]/[18px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      aria-haspopup="dialog"
    >
      Prototype settings
    </button>
  );
}

export function PrototypeSettingsPanel() {
  const {
    displayMode,
    setDisplayMode,
    stage,
    setStage,
    widgetScope,
    setWidgetScope,
    isPrototypePanelOpen,
    setPrototypePanelOpen,
    prototypeSettingsTriggerRef,
  } = usePrototypeSettings();
  const { region, setRegion } = useRegion();

  /** i3 (XPAC) and Tailor are NZ-only; GA / Agentic allow every region. */
  const regionLockedToNz = stage === "xpac" || stage === "tailor";

  const stageOptions = useMemo(
    () =>
      [
        { id: "xpac" as const, label: "i3 (XPAC)" },
        { id: "ga" as const, label: "GA" },
        { id: "ai" as const, label: "Agentic" },
        {
          id: "tailor" as const,
          label: "Tailor",
          disabled: region !== REGIONS.NZ,
          title:
            region !== REGIONS.NZ
              ? "Tailor is only available in NZ"
              : undefined,
        },
      ] satisfies {
        id: PrototypeStageId;
        label: string;
        disabled?: boolean;
        title?: string;
      }[],
    [region]
  );

  const handleStageChange = useCallback(
    (id: PrototypeStageId) => {
      setStage(id);
      if (id === "tailor") setRegion(REGIONS.NZ);
    },
    [setStage, setRegion]
  );

  const regionOptions = useMemo(
    () =>
      REGION_OPTIONS.map((o) => ({
        ...o,
        disabled: regionLockedToNz && o.id !== REGIONS.NZ,
        title:
          regionLockedToNz && o.id !== REGIONS.NZ
            ? stage === "tailor"
              ? "Only NZ is available for Tailor"
              : "Only NZ is available for i3 (XPAC)"
            : undefined,
      })),
    [regionLockedToNz, stage]
  );

  useEffect(() => {
    if (regionLockedToNz && region !== REGIONS.NZ) {
      setRegion(REGIONS.NZ);
    }
  }, [regionLockedToNz, region, setRegion]);

  /** Full overview (“All”) is NZ-only; other regions use the tax subset. */
  const widgetScopeOptions = useMemo(
    () =>
      WIDGET_SCOPE_OPTIONS.map((o) => ({
        ...o,
        disabled: o.id === "all" && region !== REGIONS.NZ,
        title:
          o.id === "all" && region !== REGIONS.NZ
            ? "Full overview is only available for NZ"
            : undefined,
      })),
    [region]
  );

  useEffect(() => {
    if (region !== REGIONS.NZ && widgetScope === "all") {
      setWidgetScope("tax");
    }
  }, [region, widgetScope, setWidgetScope]);

  const panelRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ left: 0, top: 0 });
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [panelSize, setPanelSize] = useState({
    w: PANEL_WIDTH,
    h: 580,
  });

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
  } | null>(null);
  /** After the user drags, ignore scroll/resize re-anchoring until the panel closes. */
  const skipAnchorRef = useRef(false);

  const applyPosition = useCallback((left: number, top: number) => {
    const el = panelRef.current;
    const pw = el?.offsetWidth ?? PANEL_WIDTH;
    const ph = el?.offsetHeight ?? panelSize.h;
    const next = clampPosition(left, top, pw, ph);
    positionRef.current = next;
    setPosition(next);
  }, [panelSize.h]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Open: restore saved position, or anchor under trigger + track scroll/resize.
  useLayoutEffect(() => {
    if (!isPrototypePanelOpen) {
      skipAnchorRef.current = false;
      return;
    }

    let useSaved = false;
    try {
      const raw = localStorage.getItem(PANEL_POSITION_KEY);
      if (raw) {
        const p = JSON.parse(raw) as { top?: unknown; left?: unknown };
        if (
          typeof p.top === "number" &&
          typeof p.left === "number" &&
          Number.isFinite(p.top) &&
          Number.isFinite(p.left)
        ) {
          useSaved = true;
          const left = p.left;
          const top = p.top;
          requestAnimationFrame(() => {
            applyPosition(left, top);
          });
        }
      }
    } catch {
      /* ignore */
    }

    if (useSaved) {
      return;
    }

    const anchorUnderTrigger = () => {
      if (skipAnchorRef.current) return;
      const btn = prototypeSettingsTriggerRef.current;
      const el = panelRef.current;
      const pw = el?.offsetWidth ?? Math.min(PANEL_WIDTH, window.innerWidth - 16);
      if (!btn) {
        applyPosition(window.innerWidth - pw - GAP, 64 + GAP);
        return;
      }
      const r = btn.getBoundingClientRect();
      const w = Math.min(pw, window.innerWidth - 16);
      const left = Math.max(GAP, r.right - w);
      const top = r.bottom + GAP;
      applyPosition(left, top);
    };

    anchorUnderTrigger();
    window.addEventListener("resize", anchorUnderTrigger);
    window.addEventListener("scroll", anchorUnderTrigger, true);
    return () => {
      window.removeEventListener("resize", anchorUnderTrigger);
      window.removeEventListener("scroll", anchorUnderTrigger, true);
    };
  }, [isPrototypePanelOpen, applyPosition, prototypeSettingsTriggerRef]);

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el || !isPrototypePanelOpen) return;
    const ro = new ResizeObserver(() => {
      setPanelSize({
        w: el.offsetWidth,
        h: el.offsetHeight,
      });
    });
    ro.observe(el);
    setPanelSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, [isPrototypePanelOpen]);

  useLayoutEffect(() => {
    if (!isPrototypePanelOpen) return;
    const p = positionRef.current;
    applyPosition(p.left, p.top);
  }, [panelSize.w, panelSize.h, isPrototypePanelOpen, applyPosition]);

  const onDragPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const cur = positionRef.current;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originLeft: cur.left,
      originTop: cur.top,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const nextLeft = d.originLeft + (e.clientX - d.startX);
    const nextTop = d.originTop + (e.clientY - d.startY);
    applyPosition(nextLeft, nextTop);
  };

  const onDragPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    dragRef.current = null;
    const moved =
      Math.abs(e.clientX - d.startX) > 2 ||
      Math.abs(e.clientY - d.startY) > 2;
    if (moved) {
      skipAnchorRef.current = true;
      try {
        const p = positionRef.current;
        localStorage.setItem(
          PANEL_POSITION_KEY,
          JSON.stringify({ top: p.top, left: p.left })
        );
      } catch {
        /* ignore */
      }
    }
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    if (!isPrototypePanelOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setPrototypePanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPrototypePanelOpen, setPrototypePanelOpen]);

  if (!isPrototypePanelOpen) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className="border-border-secondary bg-background-secondary fixed z-[60] flex max-h-[min(100vh-1rem,720px)] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl border shadow-[0_16px_48px_-12px_rgba(0,10,30,0.2)]"
      style={{
        left: position.left,
        top: position.top,
      }}
      role="dialog"
      aria-labelledby="prototype-settings-title"
    >
      <div className="border-border-secondary flex shrink-0 items-stretch border-b">
        <div
          className="text-content-secondary hover:bg-background-hover/60 flex min-w-0 flex-1 cursor-grab touch-none items-center gap-2.5 px-3 py-2.5 active:cursor-grabbing"
          onPointerDown={onDragPointerDown}
          onPointerMove={onDragPointerMove}
          onPointerUp={onDragPointerUp}
          onPointerCancel={onDragPointerUp}
        >
          <DragHandleIcon />
          <div className="min-w-0 flex-1">
            <h2
              id="prototype-settings-title"
              className="text-content-primary truncate text-[14px]/[18px] font-semibold tracking-tight"
            >
              Prototype settings
            </h2>
            <p className="text-content-muted mt-0.5 text-[11px]/[14px]">
              Drag header to reposition
            </p>
          </div>
        </div>
        <button
          type="button"
          className="tab-focus text-content-secondary hover:bg-background-hover hover:text-content-primary border-border-secondary flex shrink-0 items-center justify-center border-l px-3 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,120,200,0.35)] focus-visible:ring-inset"
          aria-label="Close prototype settings"
          onClick={() => setPrototypePanelOpen(false)}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        <p className="text-content-secondary mb-3.5 text-[12px]/[16px]">
          Display, demo stage, region, and widget scope. Settings persist in this
          browser.
        </p>

        <div className="space-y-2.5">
          <div className={settingGroupClassName}>
            <SegmentedRow
              label="Display"
              options={DISPLAY_OPTIONS}
              value={displayMode}
              onChange={setDisplayMode}
            />
          </div>
          <div className={settingGroupClassName}>
            <SegmentedRow
              label="Stage"
              options={stageOptions}
              value={stage}
              onChange={handleStageChange}
            />
          </div>
          <div className={settingGroupClassName}>
            <SegmentedRow
              label="Region"
              options={regionOptions}
              value={region}
              onChange={setRegion}
            />
          </div>
          <div className={settingGroupClassName}>
            <SegmentedRow
              label="Widgets"
              options={widgetScopeOptions}
              value={widgetScope}
              onChange={setWidgetScope}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
