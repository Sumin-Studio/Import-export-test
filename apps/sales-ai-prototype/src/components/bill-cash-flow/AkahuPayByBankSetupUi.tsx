"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useDropdownFlip } from "@/hooks/useDropdownFlip";
import { AKAHU_NZ_ACCOUNTS, type AkahuNzAccount } from "@/components/bill-cash-flow/akahuNzAccounts";
import { EnablePayByBankFormColumn } from "@/components/bill-cash-flow/EnablePayByBankFormColumn";

const AKAHU_ENABLE_PAY_BY_BANK_MS = 5_000;
const SETTLEMENT_DROPDOWN_GAP_PX = 4;

const SALES_UI_FONT = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" } as const;

export type AkahuPayByBankSetupUiProps = {
  layout: "modal" | "fullscreen";
  onClose: () => void;
  onEnableComplete: () => void;
};

export function AkahuPayByBankSetupUi({ layout, onClose, onEnableComplete }: AkahuPayByBankSetupUiProps) {
  const enableTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [akahuEnableProcessing, setAkahuEnableProcessing] = useState(false);
  const [akahuSelectedAccount, setAkahuSelectedAccount] = useState(0);
  const [akahuAccountDropdownOpen, setAkahuAccountDropdownOpen] = useState(false);
  const akahuAccountRef = useRef<HTMLDivElement>(null);
  const akahuAccountDropdownAnchorRef = useRef<HTMLDivElement>(null);
  const akahuDropdownMenuRef = useRef<HTMLDivElement>(null);
  const akahuAccountFlip = useDropdownFlip(akahuAccountDropdownOpen, () => akahuAccountDropdownAnchorRef.current);

  const bankAccountFieldId = useId();

  const [fullscreenDropdownRect, setFullscreenDropdownRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const selected: AkahuNzAccount = AKAHU_NZ_ACCOUNTS[akahuSelectedAccount];

  function pickSettlementAccount(i: number) {
    setAkahuSelectedAccount(i);
    setAkahuAccountDropdownOpen(false);
  }

  useEffect(() => {
    return () => {
      if (enableTimeoutRef.current) clearTimeout(enableTimeoutRef.current);
    };
  }, []);

  /** Fullscreen scroll column uses overflow-y-auto, which clips position:absolute menus. */
  useLayoutEffect(() => {
    if (layout !== "fullscreen" || !akahuAccountDropdownOpen) {
      setFullscreenDropdownRect(null);
      return;
    }
    const anchor = akahuAccountDropdownAnchorRef.current;
    if (!anchor) {
      setFullscreenDropdownRect(null);
      return;
    }
    const update = () => {
      const r = anchor.getBoundingClientRect();
      setFullscreenDropdownRect({
        top: r.bottom + SETTLEMENT_DROPDOWN_GAP_PX,
        left: r.left,
        width: r.width,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(anchor);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [layout, akahuAccountDropdownOpen]);

  useEffect(() => {
    if (!akahuAccountDropdownOpen) return;
    function closeOnClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (akahuAccountRef.current?.contains(t)) return;
      if (akahuDropdownMenuRef.current?.contains(t)) return;
      setAkahuAccountDropdownOpen(false);
    }
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, [akahuAccountDropdownOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape" || akahuEnableProcessing) return;
      if (akahuAccountDropdownOpen) {
        setAkahuAccountDropdownOpen(false);
        return;
      }
      onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [akahuEnableProcessing, onClose, akahuAccountDropdownOpen]);

  const runAkahuEnablePayByBank = () => {
    if (akahuEnableProcessing) return;
    setAkahuEnableProcessing(true);
    if (enableTimeoutRef.current) clearTimeout(enableTimeoutRef.current);
    enableTimeoutRef.current = setTimeout(() => {
      enableTimeoutRef.current = null;
      setAkahuEnableProcessing(false);
      onEnableComplete();
    }, AKAHU_ENABLE_PAY_BY_BANK_MS);
  };

  const formColumnProps = {
    layout,
    bankAccountFieldId,
    selected,
    akahuSelectedAccount,
    akahuAccountDropdownOpen,
    setAkahuAccountDropdownOpen,
    pickSettlementAccount,
    akahuAccountRef,
    akahuAccountDropdownAnchorRef,
    akahuDropdownMenuRef,
    akahuAccountFlip,
    fullscreenDropdownRect,
    akahuEnableProcessing,
    runAkahuEnablePayByBank,
    onClose,
  };

  if (layout === "modal") {
    return (
      <div style={SALES_UI_FONT} className="flex max-h-[min(90vh,920px)] flex-col overflow-y-auto">
        <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h2 id="akahu-modal-title" className="text-xl font-bold leading-none text-[#1e3145]">
              Enable Pay by Bank
            </h2>
            <span className="shrink-0 rounded-[3px] border border-content-secondary px-1 text-[13px]/[20px] text-content-secondary">
              Beta
            </span>
          </div>
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded text-[#333] hover:bg-[#f0f0f0] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (!akahuEnableProcessing) onClose();
            }}
            disabled={akahuEnableProcessing}
            aria-label="Close"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
        <div className="mx-auto w-full max-w-[520px] pb-1">
          <EnablePayByBankFormColumn {...formColumnProps} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden bg-white antialiased"
      style={SALES_UI_FONT}
    >
      <header className="flex h-[56px] shrink-0 items-center gap-3 border-b border-[#e1e2e5] bg-white px-4 shadow-[0_1px_0_0_rgba(0,10,30,0.2)]">
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-[3px] text-[#404756] hover:bg-[#f2f3f4] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (!akahuEnableProcessing) onClose();
          }}
          disabled={akahuEnableProcessing}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold leading-7 text-[#000a1e]">Enable Pay by Bank</h1>
        <span className="rounded-[3px] border border-content-secondary px-1 text-[13px]/[20px] text-content-secondary">
          Beta
        </span>
      </header>

      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 lg:grid-cols-2">
        <div className="min-h-0 min-w-0 overflow-y-auto bg-white px-6 py-8 lg:pl-[100px] lg:pr-12">
          <div className="mx-auto max-w-[520px]">
            <EnablePayByBankFormColumn {...formColumnProps} />
          </div>
        </div>

        <div
          className="hidden min-h-0 min-w-0 items-center justify-center bg-[#f2f3f4] px-8 py-12 lg:flex"
          aria-hidden
        >
          <img
            src="/Pay-by-Bank-illus.png"
            alt=""
            className="h-auto max-h-[min(72vh,520px)] w-auto max-w-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
}
