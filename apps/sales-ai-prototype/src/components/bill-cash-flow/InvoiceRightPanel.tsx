"use client";

import type { ReactNode } from "react";

export type InvoiceRightPanelVariant = "rail" | "embedded";

type InvoiceRightPanelProps = {
  variant: InvoiceRightPanelVariant;
  /** Reserved for future sticky/fixed variants; unused for `rail` / `embedded`. */
  topOffsetPx: number;
  onClose: () => void;
  /** Branding theme, Currency, Amounts are — keep `overflow-visible` on wrappers so dropdowns are not clipped. */
  documentSettings: ReactNode;
  showAddContact: boolean;
  showMinTotal: boolean;
  showStripeOnly: boolean;
};

/**
 * Right task pane: document settings (prototype) + Deposit section.
 * - `rail`: lg+ right column in document flow (scrolls with the page next to the invoice).
 * - `embedded`: stacked below main invoice content on narrow viewports.
 */
export function InvoiceRightPanel({
  variant,
  topOffsetPx: _topOffsetPx,
  onClose,
  documentSettings,
  showAddContact,
  showMinTotal,
  showStripeOnly,
}: InvoiceRightPanelProps) {
  const messages: { key: string; text: string }[] = [];
  if (showAddContact) messages.push({ key: "contact", text: "Add a contact" });
  if (showMinTotal) messages.push({ key: "total", text: "Add a total of 1.00 or more" });
  if (showStripeOnly) messages.push({ key: "stripe", text: "Select only Stripe payment methods" });

  const isRail = variant === "rail";

  const shellClass =
    variant === "embedded"
      ? "mt-6 flex w-full flex-col overflow-hidden rounded-[3px] border border-[#e1e2e5] bg-white"
      : "flex w-full max-w-[400px] shrink-0 flex-col self-stretch min-h-0 border-l border-border-primary bg-white pb-10 shadow-[0_0_24px_rgba(0,10,30,0.06)]";

  return (
    <aside className={shellClass} role="complementary" aria-label="Invoice options and deposit">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-primary py-3 pl-5 pr-3">
        <h2 className="text-[17px]/[28px] font-bold text-content-primary">Invoice options</h2>
        {isRail ? (
          <div className="flex items-center gap-0">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary"
              aria-label="More options"
            >
              <svg className="size-5 text-content-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <circle cx="10" cy="4" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="10" cy="16" r="1.5" />
              </svg>
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary"
              onClick={onClose}
              aria-label="Close invoice options"
            >
              <span className="sr-only">Close</span>
              <svg className="size-5 text-content-secondary" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Document settings: no vertical scroll — avoids clipping absolutely positioned dropdowns */}
        <div className="shrink-0 overflow-visible border-b border-[#e8e9eb] px-5 py-4">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#59606d]">Document</p>
          <div className="flex flex-col gap-4">{documentSettings}</div>
        </div>

        {/* Deposit: scrollable if needed */}
        <div id="invoice-deposit-section" className="min-h-0 flex-1 overflow-y-auto">
          <div className="border-b border-border-primary px-5 py-3">
            <h3 className="text-[15px] font-bold text-content-primary">Deposit</h3>
          </div>
          <div className="flex flex-col items-center px-8 pb-10 pt-10 text-center">
            <div className="mb-6 flex w-full max-w-[280px] items-center justify-center">
              <img src="/Deposit-Empty-Panel.svg" alt="" className="h-[130px] w-auto max-w-full" />
            </div>
            <h4 className="mb-4 max-w-[320px] text-[15px]/[24px] font-bold text-content-primary">Add details to request a deposit</h4>
            {messages.length > 0 ? (
              <ul className="mb-6 max-w-[320px] space-y-1 text-[15px]/[24px] text-content-secondary" role="list">
                {messages.map((m) => (
                  <li key={m.key}>{m.text}</li>
                ))}
              </ul>
            ) : null}
            <button
              type="button"
              className="inline-flex items-center rounded-md border-0 bg-transparent px-3 py-2 text-[15px]/[24px] font-medium text-action-primary hover:bg-background-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
            >
              Get a quick overview
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
