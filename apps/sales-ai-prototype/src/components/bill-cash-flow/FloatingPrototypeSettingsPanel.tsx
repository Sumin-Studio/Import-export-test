"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { PayByBankEnableUiMode } from "@/components/bill-cash-flow/payByBankEnableUiPreference";
import Close from "../../../prototypes/payments-agents/src/app/components/ui/icons/Close";

/** Matches `payments-agents-team-main/.../PurchasesPrototypeSettingsButton.tsx` */
const PANEL_W = 400;

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

export type FloatingPrototypeSettingsPanelProps = {
  open: boolean;
  onClose: () => void;
  /** Current mode (from preference); updates apply immediately when the user picks an option. */
  mode: PayByBankEnableUiMode;
  onSelectMode: (mode: PayByBankEnableUiMode) => void;
  /** When set, first open positions the panel like purchases-overview (aligned to trigger). */
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

/**
 * Floating draggable “Prototype settings” — structure and tokens from
 * `prototypes/cashflow-actions/.../PurchasesPrototypeSettingsButton.tsx` (purchases-overview).
 * Content is New Invoice–specific (Akahu modal vs full-screen).
 */
export function FloatingPrototypeSettingsPanel({
  open,
  onClose,
  mode,
  onSelectMode,
  triggerRef,
}: FloatingPrototypeSettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPanelPos(null);
      return;
    }
    setPanelPos((prev) => {
      if (prev !== null) return prev;
      const pw = Math.min(PANEL_W, typeof window !== "undefined" ? window.innerWidth - 32 : PANEL_W);
      const btn = triggerRef?.current;
      const estH = 380;
      let x = 16;
      let y = 88;
      if (btn && typeof window !== "undefined") {
        const r = btn.getBoundingClientRect();
        x = Math.max(16, Math.min(r.right - pw, window.innerWidth - pw - 16));
        y = Math.max(16, r.top - estH - 8);
      } else if (typeof window !== "undefined") {
        x = Math.max(16, window.innerWidth - pw - 16);
        y = Math.max(16, window.innerHeight - estH - 72);
      }
      return clampPanelPos(x, y, pw);
    });
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    function onResize() {
      const pw = Math.min(PANEL_W, window.innerWidth - 32);
      setPanelPos((p) => (p ? clampPanelPos(p.x, p.y, pw) : p));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: PointerEvent) {
      const t = e.target as HTMLElement;
      if (t.closest("[data-prototype-configure-trigger]")) return;
      const el = panelRef.current;
      if (!el?.contains(e.target as Node)) onClose();
    }
    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () => document.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [open, onClose]);

  function onDragHandleDown(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (panelPos === null) return;
    const pw = Math.min(PANEL_W, typeof window !== "undefined" ? window.innerWidth - 32 : PANEL_W);
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = panelPos.x;
    const originY = panelPos.y;

    function onMove(ev: MouseEvent) {
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
    typeof window !== "undefined" ? Math.min(PANEL_W, window.innerWidth - 32) : PANEL_W;

  if (!mounted || !open || panelPos === null || typeof document === "undefined") return null;

  const panel = createPortal(
    <div
      ref={panelRef}
      className="fixed z-[100100] max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-lg border border-[#e1e2e5] bg-white shadow-xl"
      style={{
        left: panelPos.x,
        top: panelPos.y,
        width: pw,
      }}
      role="dialog"
      aria-labelledby="floating-prototype-settings-title"
    >
      {/* Drag strip + close — same as PurchasesPrototypeSettingsButton */}
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
          <span className="text-[11px] font-medium text-[#6b7280]">Drag to move</span>
        </div>
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-[3px] text-[#6b7280] transition-colors hover:bg-black/[0.06] hover:text-[#0a0a0a]"
          aria-label="Close prototype settings"
          onClick={onClose}
        >
          <Close className="size-5" />
        </button>
      </div>

      <div className="border-b border-[#e1e2e5] bg-[#f7f8fa] px-4 py-3">
        <p id="floating-prototype-settings-title" className="text-[13px] font-bold text-[#0a0a0a]">
          Prototype settings
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-[#6b7280]">
          Choose how the banner CTA opens the Akahu setup experience.
        </p>
      </div>

      <div className="p-3">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
          Enable Pay by Bank
        </p>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Akahu setup experience">
          {(
            [
              { id: "modal" as const, label: "Modal", description: "MVP experience" },
              { id: "fullscreen" as const, label: "Full-screen", description: "Ideal experience" },
            ] as const
          ).map((opt) => {
            const selected = mode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelectMode(opt.id)}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  selected
                    ? "border-[#1c52de] bg-[#e8f0fe]"
                    : "border-[#e1e2e5] bg-white hover:bg-[#f7f8fa]"
                }`}
              >
                <span
                  className={`text-[13px] font-semibold ${selected ? "text-[#1c52de]" : "text-[#0a0a0a]"}`}
                >
                  {opt.label}
                </span>
                <p className="mt-0.5 text-[11px] leading-snug text-[#6b7280]">{opt.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );

  return panel;
}
