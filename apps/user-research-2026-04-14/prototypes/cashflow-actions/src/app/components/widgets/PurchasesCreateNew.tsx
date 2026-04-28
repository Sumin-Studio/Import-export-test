"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PURCHASES_OVERVIEW_V4_DIYA_DEFAULT_HREF } from "@/lib/purchases-overview-cashflow-prototype-path";
import { Plus } from "lucide-react";
import { Cycle, Invoice, Withdraw } from "@/app/components/ui/icons";
import { SuggestionCard } from "@/components/suggestion-card";
import { JustPayMelioMakePaymentCard } from "@/app/components/panels/JustPayMelioMakePaymentCard";
import { JustPayMelioPaymentScheduled } from "@/app/components/panels/JustPayMelioPaymentScheduled";
import { usePurchasesInteractiveLinking } from "@/app/contexts/PurchasesInteractiveLinkingContext";
import { getLinkMetaForName } from "./purchasesInteractiveLinking";

const DEFAULT_OPEN_PAYMENT_CHECKOUT = false;

const DEFAULT_CHECKOUT_DETAILS = {
  supplierName: "Kristen Waelchi",
  amountDisplay: "500.00",
  currencyCode: "USD",
} as const;

const rows: { id: "bill" | "payment" | "repeating-bill"; label: string; glyph: ReactNode }[] =
  [
  {
    id: "bill",
    label: "Bill",
    glyph: <Invoice className="size-7 shrink-0 text-content-secondary" />,
  },
  {
    id: "payment",
    label: "Payment",
    glyph: <Withdraw className="size-7 shrink-0 text-content-secondary" />,
  },
  {
    id: "repeating-bill",
    label: "Repeating bill",
    glyph: <Cycle className="size-7 shrink-0 text-content-secondary" />,
  },
  ];

export function PurchasesCreateNew({ className = "" }: { className?: string }) {
  const linking = usePurchasesInteractiveLinking();
  const pathname = usePathname();
  const [justPayOpen, setJustPayOpen] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState<{
    supplierName: string;
    amountDisplay: string;
    currencyCode: string;
    payDate?: string;
  } | null>(DEFAULT_OPEN_PAYMENT_CHECKOUT ? { ...DEFAULT_CHECKOUT_DETAILS } : null);
  const [scheduledState, setScheduledState] = useState<{
    supplierName: string;
    amountDisplay: string;
    currencyCode: string;
    returnHref: string;
    paymentId: string;
  } | null>(null);
  const [checkoutExpanded, setCheckoutExpanded] = useState(false);

  useEffect(() => {
    if (!checkoutDetails) {
      linking.setDraftPayment(null);
      setCheckoutExpanded(false);
      return;
    }
    // Stage the animation: white surface appears first, wait 2s, then height expands.
    const timer = setTimeout(() => setCheckoutExpanded(true), 2000);
    return () => clearTimeout(timer);
  }, [checkoutDetails]);

  if (checkoutDetails) {
    return (
      <div
        className={`relative w-full max-w-[440px] overflow-hidden rounded-[12px] border border-[#e6e7e9] bg-white transition-[max-height,background-color] duration-900 ease-in-out ${
          checkoutExpanded
            ? scheduledState
              ? "max-h-[1080px]"
              : "max-h-[2200px]"
            : "max-h-[180px]"
        } ${className}`}
      >
        <div>
          {scheduledState ? (
            <JustPayMelioPaymentScheduled
              supplierName={scheduledState.supplierName}
              amountDisplay={scheduledState.amountDisplay}
              currencyCode={scheduledState.currencyCode}
              returnHref={scheduledState.returnHref}
              paymentId={scheduledState.paymentId}
              align="left"
              onReturn={() => {
                linking.setDraftPayment(null);
                setScheduledState(null);
                setCheckoutDetails(null);
                setJustPayOpen(false);
              }}
              onMakeAnotherPayment={() => {
                linking.setDraftPayment(null);
                setScheduledState(null);
                setCheckoutDetails({
                  supplierName: "",
                  amountDisplay: "",
                  currencyCode: "USD",
                });
              }}
            />
          ) : (
            <JustPayMelioMakePaymentCard
              layout="page"
              surfaceStyle="flat"
              supplierName={checkoutDetails.supplierName}
              amountDisplay={checkoutDetails.amountDisplay}
              currencyCode={checkoutDetails.currencyCode}
              payDate={checkoutDetails.payDate}
              returnHref={pathname || PURCHASES_OVERVIEW_V4_DIYA_DEFAULT_HREF}
              onCancel={() => {
                linking.setDraftPayment(null);
                setCheckoutDetails(null);
                setJustPayOpen(false);
              }}
              onConfirmInline={(payload) => {
                linking.setDraftPayment(null);
                setScheduledState(payload);
              }}
              onDraftChange={
                linking.enabled
                  ? (draft) => {
                      if (!draft) {
                        linking.setDraftPayment(null);
                        return;
                      }
                      const meta = getLinkMetaForName(draft.supplierName);
                      linking.setDraftPayment(draft);
                      linking.setActiveLink(meta?.linkId ?? null, {
                        severity: meta?.severity ?? "normal",
                        dayIndex: draft.plannedDayIndex,
                        bandStart: Math.max(0, draft.plannedDayIndex - 1),
                        bandEnd: draft.plannedDayIndex + 1,
                      });
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-auto min-h-[210px] w-full max-w-[440px] flex-col rounded-xl bg-white ${className}`}
    >
      <div className="relative pl-6 pr-2 pt-[10px]">
        <h3 className="text-[17px]/[28px] font-bold">Create new</h3>
      </div>
      <ul className="mt-1.5 flex flex-col pb-3 pl-6 pr-2">
        {rows.map((row) => (
          <li key={row.label} className="border-b border-background-tertiary">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between py-1.5 pl-0 pr-3 text-left text-[13px]/[16px] text-content-primary hover:bg-background-primary"
              onClick={() => {
                if (row.id === "payment") {
                  setJustPayOpen((open) => !open);
                }
              }}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-8 flex-none items-center justify-center text-content-secondary">
                  {row.glyph}
                </span>
                <span className="truncate">{row.label}</span>
              </span>
              <span
                className={`inline-flex size-8 items-center justify-center rounded-full border border-[#ccced2] text-brand-primary transition-all duration-200 ${
                  row.id === "payment" && justPayOpen ? "rotate-45 bg-[#e8f4fb]" : ""
                }`}
                aria-hidden
              >
                <Plus className="size-4" strokeWidth={2.2} />
              </span>
            </button>
            {row.id === "payment" && justPayOpen ? (
              <div className="pb-3 pl-[42px] pr-3 pt-2">
                <SuggestionCard
                  showTitle={false}
                  paymentDetailsStep
                  openPaymentDetailsOnMount
                  showInlineCard={false}
                  paymentDetailsMode="inline"
                  returnHrefOverride={pathname || PURCHASES_OVERVIEW_V4_DIYA_DEFAULT_HREF}
                  onPaySupplier={(details) => {
                    if (!details) return;
                    setCheckoutDetails({
                      supplierName: details.supplierName,
                      amountDisplay: details.amountDisplay,
                      currencyCode: details.currencyCode,
                      payDate: details.payDate,
                    });
                    setScheduledState(null);
                  }}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PurchasesCreateNew;
