"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GripVertical } from "lucide-react";
import { useDupeOption } from "./DupeOptionContext";

const PANEL_W = 440;

function clampPanelPos(x: number, y: number, panelWidth: number) {
  const m = 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 800;
  const vh = typeof window !== "undefined" ? window.innerHeight : 600;
  const maxX = vw - panelWidth - m;
  const maxY = vh - m;
  return {
    x: Math.max(m, Math.min(x, maxX)),
    y: Math.max(m, Math.min(y, maxY)),
  };
}

export function DupeGearButton() {
  const { config, setConfig } = useDupeOption();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openWithDefaultPos = useCallback(() => {
    const btn = triggerRef.current;
    const pw = Math.min(PANEL_W, typeof window !== "undefined" ? window.innerWidth - 32 : PANEL_W);
    let x = 16;
    let y = 88;
    if (btn && typeof window !== "undefined") {
      const r = btn.getBoundingClientRect();
      x = Math.max(16, Math.min(r.right - pw, window.innerWidth - pw - 16));
      y = r.bottom + 8;
    }
    setPanelPos((prev) => (prev === null ? clampPanelPos(x, y, pw) : prev));
    setOpen(true);
  }, []);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      openWithDefaultPos();
    }
  };

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      const inTrigger = shellRef.current?.contains(t);
      const inPanel = panelRef.current?.contains(t);
      if (!inTrigger && !inPanel) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onResize() {
      const pw = Math.min(PANEL_W, window.innerWidth - 32);
      setPanelPos((p) => (p ? clampPanelPos(p.x, p.y, pw) : p));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  function onDragHandleDown(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (panelPos === null) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = panelPos.x;
    const originY = panelPos.y;

    function onMove(ev: MouseEvent) {
      const pw = Math.min(PANEL_W, window.innerWidth - 32);
      const nx = originX + (ev.clientX - startX);
      const ny = originY + (ev.clientY - startY);
      setPanelPos(clampPanelPos(nx, ny, pw));
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  const pw = typeof window !== "undefined" ? Math.min(PANEL_W, window.innerWidth - 32) : PANEL_W;

  const panel =
    mounted &&
    open &&
    panelPos !== null &&
    createPortal(
      <div
        ref={panelRef}
        className="fixed bg-white rounded-lg shadow-xl border border-[#e1e2e5] z-[100100] overflow-hidden max-h-[85vh] overflow-y-auto"
        style={{
          left: panelPos.x,
          top: panelPos.y,
          width: pw,
        }}
        role="dialog"
        aria-label="Prototype settings"
      >
        <div
          role="button"
          tabIndex={0}
          className="flex items-center gap-2 px-3 py-2 bg-[#eef0f2] border-b border-[#e1e2e5] cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onDragHandleDown}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") e.preventDefault();
          }}
        >
          <GripVertical className="w-4 h-4 text-[#6b7280] shrink-0" aria-hidden />
          <span className="text-[11px] font-medium text-[#6b7280]">Drag to move</span>
        </div>

        <div className="p-3 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
            Show alerts
          </p>
          <div className="flex gap-1 border border-[#e1e2e5] rounded px-1 py-1" aria-label="Show alerts placement">
            {([
              { key: "top", label: "Top" },
              { key: "middle", label: "Middle" },
              { key: "cta", label: "Combined CTA" },
            ] as const).map((opt) => {
              const isActive =
                (config.detailPlacement ??
                  (config.optInListBannerTop ? "top" : config.releaseStage === "ga" ? "cta" : "middle")) === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setConfig({ detailPlacement: opt.key })}
                  className={`flex-1 rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#e8f0fe] text-[#1c52de]"
                      : "bg-white text-[#333940] hover:bg-[#f7f8fa]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 space-y-2 border-t border-[#e1e2e5]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
            Show summary banner
          </p>
          <p className="text-[10px] text-[#8c919a] leading-snug px-0.5 -mt-1">
            GA list only: summary strip and Protect action centre above the bills table.
          </p>
          <div
            className="flex gap-1 border border-[#e1e2e5] rounded px-1 py-1"
            aria-label="Show summary banner"
          >
            {(["yes", "no"] as const).map((opt) => {
              const on = opt === "yes" ? config.showSummaryBanner : !config.showSummaryBanner;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setConfig({ showSummaryBanner: opt === "yes" })}
                  className={`flex-1 rounded px-2 py-1.5 text-[11px] font-medium capitalize transition-colors ${
                    on
                      ? "bg-[#e8f0fe] text-[#1c52de]"
                      : "bg-white text-[#333940] hover:bg-[#f7f8fa]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <div ref={shellRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        title="Prototype settings"
        className="flex h-8 shrink-0 cursor-pointer items-center rounded-full px-4 text-[13px] font-medium whitespace-nowrap transition-colors"
        style={{
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          border: "none",
          boxShadow: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1e3145";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#0a0a0a";
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        Prototype settings
      </button>
      {panel}
    </div>
  );
}
