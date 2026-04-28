"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  usePurchasesPrototypeScenario,
  type PurchasesBankBalanceScenarioId,
} from "@/app/contexts/PurchasesPrototypeScenarioContext";
import { Close } from "@/app/components/ui/icons";

const PANEL_W = 400;

const SCENARIO_OPTIONS: {
  id: PurchasesBankBalanceScenarioId;
  label: string;
  description: string;
}[] = [
  {
    id: "chart-only",
    label: "Projected balance only",
    description:
      "Chart only — no current / proposed toggle and no bills table.",
  },
  {
    id: "running-low",
    label: "Cash flow running low",
    description: "Plan-style chart with recommended deferrals.",
  },
  {
    id: "shortfall",
    label: "Cash flow shortfall",
    description: "Shortfall chart, toggle, and scrollable proposed changes.",
  },
  {
    id: "critical",
    label: "Critical cash flow shortage",
    description: "Emergency recommended actions and shortfall chart.",
  },
];

function GripVerticalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

export function PurchasesPrototypeSettingsButton() {
  const pathname = usePathname();
  const isPurchasesV4 =
    pathname?.includes("/purchases-overview/prototype/4") ?? false;
  const bankWidgetLabel = isPurchasesV4 ? "Available cash" : "Bank balance";

  const {
    bankBalanceScenario,
    setBankBalanceScenario,
    bankBalanceWidgetColumnSpan,
    setBankBalanceWidgetColumnSpan,
    hidePurchasesSupportingWidgets,
    setHidePurchasesSupportingWidgets,
    showBillsStatusSummaryBanner,
    setShowBillsStatusSummaryBanner,
  } = usePurchasesPrototypeScenario();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const shellRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openWithDefaultPos = useCallback(() => {
    const btn = triggerRef.current;
    const pw = Math.min(
      PANEL_W,
      typeof window !== "undefined" ? window.innerWidth - 32 : PANEL_W
    );
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
    if (open) setOpen(false);
    else openWithDefaultPos();
  };

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

  const pw =
    typeof window !== "undefined"
      ? Math.min(PANEL_W, window.innerWidth - 32)
      : PANEL_W;

  const panel =
    mounted &&
    open &&
    panelPos !== null &&
    createPortal(
      <div
        ref={panelRef}
        className="fixed z-[100100] max-h-[85vh] overflow-y-auto overflow-hidden rounded-lg border border-[#e1e2e5] bg-white shadow-xl"
        style={{
          left: panelPos.x,
          top: panelPos.y,
          width: pw,
        }}
        role="dialog"
        aria-label="Prototype settings"
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#e1e2e5] bg-[#eef0f2] px-2 py-1.5 pl-3">
          <div
            role="button"
            tabIndex={0}
            className="flex min-w-0 flex-1 cursor-grab select-none items-center gap-2 py-0.5 active:cursor-grabbing"
            onMouseDown={onDragHandleDown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") e.preventDefault();
            }}
          >
            <GripVerticalIcon className="shrink-0 text-[#6b7280]" />
            <span className="text-[11px] font-medium text-[#6b7280]">
              Drag to move
            </span>
          </div>
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-[3px] text-[#6b7280] transition-colors hover:bg-black/[0.06] hover:text-[#0a0a0a]"
            aria-label="Close prototype settings"
            onClick={() => setOpen(false)}
          >
            <Close className="size-5" fill="fill-current" />
          </button>
        </div>

        <div className="border-b border-[#e1e2e5] bg-[#f7f8fa] px-4 py-3">
          <p className="text-[13px] font-bold text-[#0a0a0a]">
            Prototype settings
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-[#6b7280]">
            {isPurchasesV4
              ? "Choose how the Available cash widget behaves on this page."
              : "Choose how the Bank balance widget behaves on this page."}
          </p>
        </div>

        <div className="p-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
            {bankWidgetLabel} scenario
          </p>
          <div
            className="flex flex-col gap-2"
            role="radiogroup"
            aria-label={`${bankWidgetLabel} scenario`}
          >
            {SCENARIO_OPTIONS.map((opt) => {
              const selected = bankBalanceScenario === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setBankBalanceScenario(opt.id);
                  }}
                  className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    selected
                      ? "border-[#1c52de] bg-[#e8f0fe]"
                      : "border-[#e1e2e5] bg-white hover:bg-[#f7f8fa]"
                  }`}
                >
                  <span
                    className={`text-[13px] font-semibold ${
                      selected ? "text-[#1c52de]" : "text-[#0a0a0a]"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#6b7280]">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
              {bankWidgetLabel} width
            </p>
            <div
              className="flex shrink-0 rounded-full border border-[#e1e2e5] bg-white p-0.5 text-[11px]/[16px]"
              role="radiogroup"
              aria-label={`${bankWidgetLabel} widget column span`}
            >
              {(
                [
                  { span: 1 as const, label: "1 column" },
                  { span: 2 as const, label: "2 columns" },
                ] as const
              ).map((opt) => {
                const selected = bankBalanceWidgetColumnSpan === opt.span;
                return (
                  <button
                    key={opt.span}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setBankBalanceWidgetColumnSpan(opt.span)}
                    className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                      selected
                        ? "bg-[#e8f0fe] text-[#1c52de]"
                        : "text-[#6b7280] hover:text-[#0a0a0a]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p className="max-w-[220px] text-[11px] font-bold uppercase leading-snug tracking-wider text-[#6b7280]">
              Bills status summary banner
            </p>
            <div
              className="flex shrink-0 rounded-full border border-[#e1e2e5] bg-white p-0.5 text-[11px]/[16px]"
              role="radiogroup"
              aria-label="Show or hide the four-column bills status summary strip"
            >
              <button
                type="button"
                role="radio"
                aria-checked={showBillsStatusSummaryBanner}
                onClick={() => setShowBillsStatusSummaryBanner(true)}
                className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                  showBillsStatusSummaryBanner
                    ? "bg-[#e8f0fe] text-[#1c52de]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Show
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={!showBillsStatusSummaryBanner}
                onClick={() => setShowBillsStatusSummaryBanner(false)}
                className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                  !showBillsStatusSummaryBanner
                    ? "bg-[#e8f0fe] text-[#1c52de]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Hide
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p className="max-w-[220px] text-[11px] font-bold uppercase leading-snug tracking-wider text-[#6b7280]">
              Money going out, customers & purchase orders
            </p>
            <div
              className="flex shrink-0 rounded-full border border-[#e1e2e5] bg-white p-0.5 text-[11px]/[16px]"
              role="radiogroup"
              aria-label="Show or hide Money going out, Customers you owe most, and purchase orders section"
            >
              <button
                type="button"
                role="radio"
                aria-checked={!hidePurchasesSupportingWidgets}
                onClick={() => setHidePurchasesSupportingWidgets(false)}
                className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                  !hidePurchasesSupportingWidgets
                    ? "bg-[#e8f0fe] text-[#1c52de]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Show
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={hidePurchasesSupportingWidgets}
                onClick={() => setHidePurchasesSupportingWidgets(true)}
                className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                  hidePurchasesSupportingWidgets
                    ? "bg-[#e8f0fe] text-[#1c52de]"
                    : "text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                Hide
              </button>
            </div>
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
        className="flex h-10 shrink-0 cursor-pointer items-center rounded-full px-4 text-[13px] font-medium whitespace-nowrap transition-colors"
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
