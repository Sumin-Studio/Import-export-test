"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldAlert, X } from "lucide-react";
import { protectShieldIconClassName } from "@/components/xero-protect/SafetyShieldChrome";

export type WorkflowCtaWarningPreviewProps = {
  /** Single primary line of warning copy (substantive detail, not a generic headline). */
  warningMessage: string;
  /** Primary button label when risk is showing (e.g. "Approve anyway"). */
  ctaLabelUndismissed: string;
  /** Primary button label after dismiss (e.g. "Approve"). */
  ctaLabelDismissed: string;
  allowDismiss?: boolean;
  /** Initial state for demo tiles (e.g. dismissed/cleared audit). */
  initialDismissed?: boolean;
};

export function WorkflowCtaWarningPreview({
  warningMessage,
  ctaLabelUndismissed,
  ctaLabelDismissed,
  allowDismiss = true,
  initialDismissed = false,
}: WorkflowCtaWarningPreviewProps) {
  const [dismissed, setDismissed] = useState(initialDismissed);

  return (
    <div
      data-xp-highlight
      className={`rounded overflow-hidden mb-0 ${dismissed ? "border border-[#e1e2e5]" : "border-2 border-[#f59e0b]"}`}
    >
      {!dismissed && (
        <div className="bg-[#fffbeb] px-4 py-3 flex items-start gap-3">
          <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
          <div className="flex-1 min-w-0">
            <p className="m-0 text-[15px] font-semibold leading-snug text-[#92400e]">{warningMessage}</p>
          </div>
          {allowDismiss && (
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="shrink-0 text-[#8c919a] hover:text-[#333940] p-1"
              aria-label="Dismiss warning"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
      <div className={`bg-white px-4 py-3 ${!dismissed ? "border-t border-[#fde68a]" : ""}`}>
        <button
          type="button"
          className={`h-9 px-5 rounded text-[14px] font-bold text-white flex items-center gap-2 ${
            dismissed ? "bg-[#2e7d32] hover:bg-[#1b5e20]" : "bg-[#d97706] hover:bg-[#b45309]"
          }`}
        >
          {!dismissed && <ShieldAlert className={`h-4 w-4 ${protectShieldIconClassName}`} />}
          {dismissed ? ctaLabelDismissed : ctaLabelUndismissed}
        </button>
      </div>
    </div>
  );
}

export type PaymentCtaWarningPreviewProps = {
  warningMessage: string;
  total: number;
  allowDismiss?: boolean;
  initialDismissed?: boolean;
};

export function PaymentCtaWarningPreview({
  warningMessage,
  total,
  allowDismiss = true,
  initialDismissed = false,
}: PaymentCtaWarningPreviewProps) {
  const [dismissed, setDismissed] = useState(initialDismissed);
  const [open, setOpen] = useState(true);

  return (
    <div
      data-xp-highlight
      className={`rounded overflow-hidden mb-0 ${dismissed ? "border border-[#e1e2e5]" : "border-2 border-[#f59e0b]"}`}
    >
      {!dismissed && (
        <div className="bg-[#fffbeb] px-4 py-3 flex items-start gap-3">
          <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
          <div className="flex-1 min-w-0">
            <p className="m-0 text-[15px] font-semibold leading-snug text-[#92400e]">{warningMessage}</p>
          </div>
          {allowDismiss && (
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="shrink-0 text-[#8c919a] hover:text-[#333940] p-1"
              aria-label="Dismiss warning"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
      <div className={`bg-white ${!dismissed ? "border-t border-[#fde68a]" : ""}`}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-semibold text-[#000a1e]"
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Payments
        </button>
        {open && (
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-4 text-[13px]">
              <div className="flex-1 min-w-[140px]">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Date paid</label>
                <input type="date" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" readOnly />
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Account</label>
                <select className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]">
                  <option>Select account</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Amount paid(Required)</label>
                <input
                  type="text"
                  defaultValue={total.toFixed(2)}
                  className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Reference</label>
                <input type="text" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" readOnly />
              </div>
            </div>
            <button
              type="button"
              className={`mt-3 h-8 px-4 rounded text-[13px] font-bold text-white flex items-center gap-2 ${
                dismissed ? "bg-[#0078c8] hover:bg-[#006bb3]" : "bg-[#d97706] hover:bg-[#b45309]"
              }`}
            >
              {!dismissed && <ShieldAlert className={`h-3.5 w-3.5 ${protectShieldIconClassName}`} />}
              {dismissed ? "Record payment" : "Record payment anyway"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export type StandardPaymentsPreviewProps = {
  total: number;
};

export function StandardPaymentsPreview({ total }: StandardPaymentsPreviewProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#e1e2e5] rounded mb-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-semibold text-[#000a1e]"
      >
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Payments
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-4 text-[13px]">
            <div className="flex-1 min-w-[140px]">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Date paid</label>
              <input type="date" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" readOnly />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Account</label>
              <select className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]">
                <option>Select account</option>
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Amount paid(Required)</label>
              <input
                type="text"
                defaultValue={total.toFixed(2)}
                className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]"
                readOnly
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Reference</label>
              <input type="text" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" readOnly />
            </div>
          </div>
          <button
            type="button"
            className="mt-3 h-8 px-4 rounded bg-[#0078c8] text-[13px] font-bold text-white hover:bg-[#006bb3]"
          >
            Record payment
          </button>
        </div>
      )}
    </div>
  );
}
