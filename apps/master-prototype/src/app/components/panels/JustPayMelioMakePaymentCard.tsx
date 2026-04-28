"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formatJustPayMelioMoney } from "@/app/lib/just-pay-melio-format";
import { JUST_PAY_DEMO_CONTACTS } from "@/app/lib/just-pay-demo-contacts";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { useJaxChat } from "@/app/contexts/JaxChatContext";
import { dateIndexFromLabel } from "@/app/components/widgets/actionPlanModalConfigs";

export type JustPayMelioLayout = "embedded" | "page";

type JustPayMelioMakePaymentCardProps = {
  supplierName: string;
  amountDisplay: string;
  currencyCode: string;
  /** Optional preselected pay date from entry modal. */
  payDate?: string;
  /** `page` = full-route Make payment (no JAX chat). */
  layout?: JustPayMelioLayout;
  /** Used when `layout` is `page` for Cancel / after Confirm. */
  returnHref?: string;
  /** Optional inline host callback to close/dismiss without navigation. */
  onCancel?: () => void;
  /** Render mode for embedding surfaces. */
  surfaceStyle?: "card" | "flat";
  /** Optional inline host callback to show scheduled state without route navigation. */
  onConfirmInline?: (payload: {
    supplierName: string;
    amountDisplay: string;
    currencyCode: string;
    returnHref: string;
    paymentId: string;
  }) => void;
  onDraftChange?: (draft: {
    supplierName: string;
    amountNumeric: number;
    plannedDayIndex: number;
  } | null) => void;
  /**
   * Hide inner “Make payment” chrome when the route already renders the Xero page header
   * (Figma Single payment flow 7 — node 96:41194).
   */
  hideEmbeddedHeader?: boolean;
};

const ACH_FEE = 0.5;

/**
 * Figma JustPay “Make payment” (Melio) — full checkout-style block inside JAX or full page.
 * @see https://www.figma.com/design/kb0eqW7roOcxynLDhTRFS3/JustPay?node-id=35-96565
 * @see https://www.figma.com/design/kb0eqW7roOcxynLDhTRFS3/JustPay?node-id=96-41194 (page + `hideEmbeddedHeader`)
 */
export function JustPayMelioMakePaymentCard({
  supplierName,
  amountDisplay,
  currencyCode,
  payDate,
  layout = "embedded",
  returnHref = "/just-pay/prototype/2",
  onCancel,
  surfaceStyle = "card",
  onConfirmInline,
  onDraftChange,
  hideEmbeddedHeader = false,
}: JustPayMelioMakePaymentCardProps) {
  const baseId = useId();
  const router = useRouter();
  const { openPanel } = useNavigation();
  const { appendMessage } = useJaxChat();
  const [supplierDraft, setSupplierDraft] = useState(supplierName);
  const [amountDraft, setAmountDraft] = useState(amountDisplay);
  const [supplierMenuOpen, setSupplierMenuOpen] = useState(false);
  const supplierWrapRef = useRef<HTMLDivElement>(null);
  const [memo, setMemo] = useState("");
  const [deliveryChoice, setDeliveryChoice] = useState<"standard" | "custom">(
    "standard"
  );

  const isPage = layout === "page";

  const paymentAmount = useMemo(() => {
    const n = Number.parseFloat(amountDraft.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [amountDraft]);

  const total = paymentAmount + ACH_FEE;
  const supplierSuggestions = useMemo(() => {
    const q = supplierDraft.trim().toLowerCase();
    if (!q) return JUST_PAY_DEMO_CONTACTS;
    return JUST_PAY_DEMO_CONTACTS.filter((c) =>
      c.name.toLowerCase().includes(q)
    );
  }, [supplierDraft]);

  useEffect(() => {
    setSupplierDraft(supplierName);
  }, [supplierName]);

  useEffect(() => {
    setAmountDraft(amountDisplay);
  }, [amountDisplay]);

  useEffect(() => {
    if (!supplierMenuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!supplierWrapRef.current?.contains(e.target as Node)) {
        setSupplierMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [supplierMenuOpen]);

  useEffect(() => {
    if (!onDraftChange) return;
    const supplier = supplierDraft.trim();
    const amountNumeric = Number.isFinite(paymentAmount) ? paymentAmount : 0;
    const dayIndex = payDate ? dateIndexFromLabel(payDate) : -1;
    if (!supplier || amountNumeric <= 0 || dayIndex < 0) {
      onDraftChange(null);
      return;
    }
    onDraftChange({
      supplierName: supplier,
      amountNumeric,
      plannedDayIndex: dayIndex,
    });
  }, [onDraftChange, supplierDraft, paymentAmount, payDate]);

  const goBack = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    router.push(returnHref);
  };

  const handleConfirm = () => {
    if (isPage) {
      const paymentId = String(
        Math.floor(10_000_000 + Math.random() * 89_999_999)
      );
      if (onConfirmInline) {
        onConfirmInline({
          supplierName: supplierDraft.trim(),
          amountDisplay: amountDraft.trim(),
          currencyCode,
          returnHref,
          paymentId,
        });
        return;
      }
      const q = new URLSearchParams({
        supplier: supplierDraft.trim(),
        amount: amountDraft.trim(),
        currency: currencyCode,
        returnTo: returnHref,
        paymentId,
      });
      if (payDate) {
        q.set("payDate", payDate);
      }
      router.push(`/just-pay/payment-scheduled?${q.toString()}`);
      return;
    }
    appendMessage("just-pay", {
      role: "user",
      content: "Confirm and pay",
    });
    appendMessage("just-pay", {
      role: "assistant",
      content: `**Payment scheduled.** ${formatJustPayMelioMoney(total, currencyCode)} will debit your selected account. You’ll get a confirmation email shortly.`,
    });
    openPanel(null);
  };

  return (
    <div
      className={`w-full min-w-0 bg-white ${
        surfaceStyle === "flat"
          ? "overflow-visible rounded-[12px] border-0 shadow-none"
          : "overflow-hidden rounded-[12px] border border-[#ccced2] shadow-sm"
      }`}
    >
      {hideEmbeddedHeader ? null : (
        <div className="border-b border-[#e6e7e9] px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[19px] font-bold leading-7 text-[#000a1e]">
              Make payment
            </h2>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#59606d]">
              Powered by{" "}
              <span className="text-[#7047eb]">Melio</span>
            </span>
          </div>
        </div>
      )}

      <div className="space-y-5 px-4 py-4">
        <section>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#59606d]">
            Payment details
          </p>
          <p className="mt-0.5 text-[12px] text-[#59606d]">
            <span className="text-[#de0e40]">*</span> Indicates a required field
          </p>
          <div className="mt-3">
            <label
              className="text-[13px] font-bold text-[#424f60]"
              htmlFor={`${baseId}-supplier`}
            >
              Supplier business name <span className="text-[#de0e40]">*</span>
            </label>
            <div ref={supplierWrapRef} className="relative mt-1">
              <input
                id={`${baseId}-supplier`}
                className="w-full rounded-[8px] border border-[#ccced2] bg-white px-3 py-2.5 pr-10 text-[15px] text-[#000a1e]"
                value={supplierDraft}
                onChange={(e) => {
                  setSupplierDraft(e.target.value);
                  setSupplierMenuOpen(true);
                }}
                onFocus={() => setSupplierMenuOpen(true)}
                placeholder="Search or add a supplier"
                autoComplete="off"
              />
              <button
                type="button"
                aria-label="Toggle supplier suggestions"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#59606d] hover:bg-[#f2f3f4]"
                onClick={() => setSupplierMenuOpen((o) => !o)}
              >
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                  <path
                    d="M1 1.5 6 6.5 11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {supplierMenuOpen && supplierSuggestions.length > 0 ? (
                <ul className="absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-auto rounded-[8px] border border-[#ccced2] bg-white py-1 shadow-lg">
                  {supplierSuggestions.map((contact) => (
                    <li key={contact.id}>
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left text-[15px] text-[#000a1e] hover:bg-[#f2f3f4]"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setSupplierDraft(contact.name);
                          setSupplierMenuOpen(false);
                        }}
                      >
                        {contact.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="mt-3">
            <label
              className="text-[13px] font-bold text-[#424f60]"
              htmlFor={`${baseId}-amt`}
            >
              Payment amount <span className="text-[#de0e40]">*</span>
            </label>
            <div className="mt-1 flex overflow-hidden rounded-[8px] border border-[#ccced2]">
              <input
                id={`${baseId}-amt`}
                type="text"
                value={amountDraft}
                onChange={(e) => setAmountDraft(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-white px-3 py-2.5 text-[15px] text-[#000a1e] outline-none placeholder:text-[#8c919a]"
              />
              <div className="flex items-center gap-1 border-l border-[#ccced2] bg-white px-3 py-2 text-[13px] font-bold text-[#000a1e]">
                {currencyCode}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path
                    d="M1 1.2 5 5 9 1.2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          {payDate ? (
            <div className="mt-3">
              <label className="text-[13px] font-bold text-[#424f60]">
                Requested pay date
              </label>
              <input
                readOnly
                className="mt-1 w-full rounded-[8px] border border-[#ccced2] bg-[#f6f6f8] px-3 py-2.5 text-[15px] text-[#000a1e]"
                value={payDate}
              />
            </div>
          ) : null}
        </section>

        <section>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#59606d]">
            How you pay
          </p>
          <button
            type="button"
            className="mt-2 flex w-full items-center gap-3 rounded-[10px] border border-[#ccced2] bg-[#f6f6f8] px-3 py-3 text-left transition-colors hover:bg-[#eef0f2]"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#e8f4fb] text-brand-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 6h16v12H4V6Zm2 2v8h12V8H6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-[#000a1e]">
                My private checking account
              </span>
              <span className="block text-[13px] text-[#59606d]">
                Bank account •••7134
              </span>
            </span>
            <svg width="10" height="6" viewBox="0 0 10 6" className="shrink-0 text-[#59606d]" aria-hidden>
              <path
                d="M1 1.2 5 5 9 1.2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </section>

        <section>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#59606d]">
            What your supplier receives
          </p>
          <button
            type="button"
            className="mt-2 flex w-full items-center gap-3 rounded-[10px] border border-[#ccced2] bg-[#f6f6f8] px-3 py-3 text-left transition-colors hover:bg-[#eef0f2]"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#f0f2f4] text-[#59606d]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 21V3h16v18H4Zm2-2h12V5H6v14Zm2-2h8v-2H8v2Zm0-4h8v-2H8v2Zm0-4h5V7H8v2Z" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-[#000a1e]">
                ACH transfer
              </span>
              <span className="block text-[13px] text-[#59606d]">
                Account •••2742
              </span>
            </span>
            <svg width="10" height="6" viewBox="0 0 10 6" className="shrink-0 text-[#59606d]" aria-hidden>
              <path
                d="M1 1.2 5 5 9 1.2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <fieldset className="mt-3">
            <legend className="text-[13px] font-bold text-[#424f60]">
              Delivery date <span className="text-[#de0e40]">*</span>
            </legend>
            <label className="mt-2 flex cursor-pointer gap-2 rounded-[8px] border border-[#ccced2] bg-white p-3 has-[:checked]:border-[#0078c8] has-[:checked]:bg-[#e8f4fb]">
              <input
                type="radio"
                name={`${baseId}-delivery`}
                checked={deliveryChoice === "standard"}
                onChange={() => setDeliveryChoice("standard")}
                className="mt-1"
              />
              <span>
                <span className="block text-[14px] font-bold text-[#000a1e]">
                  Friday, Apr 11, 2026
                </span>
                <span className="mt-1 block text-[12px] leading-4 text-[#59606d]">
                  Debit on Apr 8, 2026 — 3 business days, {formatJustPayMelioMoney(ACH_FEE, currencyCode)} fee — Deliver by Apr 11, 2026
                </span>
              </span>
            </label>
            <label className="mt-2 flex cursor-pointer gap-2 rounded-[8px] border border-[#ccced2] bg-white p-3 has-[:checked]:border-[#0078c8] has-[:checked]:bg-[#e8f4fb]">
              <input
                type="radio"
                name={`${baseId}-delivery`}
                checked={deliveryChoice === "custom"}
                onChange={() => setDeliveryChoice("custom")}
                className="mt-1"
              />
              <span className="text-[14px] font-bold text-[#000a1e]">Custom date</span>
            </label>
          </fieldset>

          <div className="mt-3">
            <label
              className="text-[13px] font-bold text-[#424f60]"
              htmlFor={`${baseId}-memo`}
            >
              Memo to supplier
            </label>
            <textarea
              id={`${baseId}-memo`}
              rows={2}
              maxLength={50}
              placeholder="e.g. invoice #, office supplies"
              value={memo}
              onChange={(e) => setMemo(e.target.value.slice(0, 50))}
              className="mt-1 w-full resize-none rounded-[8px] border border-[#ccced2] px-3 py-2 text-[15px] text-[#000a1e] outline-none placeholder:text-[#59606d]"
            />
            <div className="mt-1 flex justify-between text-[12px] text-[#59606d]">
              <span>Memos appear on checks and payment notifications.</span>
              <span>{memo.length}/50</span>
            </div>
          </div>
        </section>

        <section className="rounded-[8px] bg-[#f6f6f8] px-3 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#59606d]">
            Payment summary
          </p>
          <ul className="mt-2 space-y-1.5 text-[13px] text-[#000a1e]">
            <li className="flex justify-between">
              <span>Payment amount</span>
              <span>{formatJustPayMelioMoney(paymentAmount, currencyCode)}</span>
            </li>
            <li className="flex justify-between">
              <span>ACH fee</span>
              <span>{formatJustPayMelioMoney(ACH_FEE, currencyCode)}</span>
            </li>
            <li className="flex justify-between border-t border-[#e6e7e9] pt-2 text-[15px] font-bold">
              <span>Total amount</span>
              <span>{formatJustPayMelioMoney(total, currencyCode)}</span>
            </li>
          </ul>
          <p className="mt-2 text-[12px] leading-4 text-[#59606d]">
            Payment fees will be charged separately.{" "}
            <button type="button" className="font-bold text-brand-primary hover:underline">
              See pricing plan
            </button>
          </p>
        </section>
      </div>

      <div className="flex justify-end gap-2 border-t border-[#e6e7e9] px-4 py-3">
        <button
          type="button"
          onClick={isPage ? goBack : () => openPanel(null)}
          className="h-[36px] rounded-full border border-[#cdd5e0] bg-white px-4 text-[13px] font-bold text-[#000a1e] hover:bg-[#eff1f2]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="h-[36px] rounded-full bg-[#7047eb] px-4 text-[13px] font-bold text-white hover:bg-[#5f3ad4]"
        >
          Confirm and pay
        </button>
      </div>
    </div>
  );
}
