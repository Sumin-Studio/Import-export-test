"use client";

import { useCallback, useId, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FeedbackModal } from "@/app/components/global/FeedbackModal";
import { usePrototypeHref } from "@/app/contexts/PrototypeBasePathContext";
import { usePurchasesPrototypeScenario } from "@/app/contexts/PurchasesPrototypeScenarioContext";
import {
  PURCHASES_OVERVIEW_LEFT_COLUMN,
  PURCHASES_OVERVIEW_RIGHT_COLUMN,
  PURCHASES_OVERVIEW_WIDGETS_ROW,
  getPurchasesOverviewBankShellClassName,
  getPurchasesOverviewSecondaryWidgetsGridClassName,
} from "@/app/purchases-overview/widgetGridClassNames";
import { Search, Settings, Caret } from "@/app/components/ui/icons";
import {
  PurchasesCreateNew,
  MoneyGoingOut,
  CustomersYouOweMost,
  CashflowActionPlanWidget,
  ProtectBillsWidget,
} from "@/app/components/widgets";
import { BillsStatusSummaryBanner } from "./BillsStatusSummaryBanner";
import { PurchaseOrdersStatusSummaryBanner } from "./PurchaseOrdersStatusSummaryBanner";
import {
  type DraftPaymentImpact,
  PurchasesInteractiveLinkingContext,
  type LinkSeverity,
} from "@/app/contexts/PurchasesInteractiveLinkingContext";

/** Inline SVG — avoids `@/app/assets` resolving to repo root `src/app` when this module is bundled from the monorepo. */
function PurchasesOverviewBannerMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const maskId = `purchases-banner-mask-${uid}`;
  return (
    <svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <mask
        id={maskId}
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={28}
        height={24}
      >
        <path d="M27.3953 0H0V24H27.3953V0Z" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d="M11.3456 18.6814C10.6151 18.1607 9.8857 17.597 9.1649 16.9921C7.8696 15.9053 6.69981 14.768 5.67578 13.6211"
          stroke="#0078C8"
          strokeWidth={1.53838}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M15.7852 21.3169C19.9886 23.3154 23.6818 23.6097 25.2607 21.728C26.6393 20.0851 26.1043 17.143 24.1505 13.8984"
          stroke="#0078C8"
          strokeWidth={1.53838}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M21.1799 9.95109C20.1822 8.84554 19.0496 7.75034 17.8003 6.70202C17.0646 6.0847 16.3199 5.51006 15.5742 4.98047"
          stroke="#0078C8"
          strokeWidth={1.53838}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M2.93526 9.98348C0.885639 6.66277 0.301383 3.63615 1.70729 1.96067C3.26407 0.105369 6.87616 0.365552 11.0064 2.2888"
          stroke="#0078C8"
          strokeWidth={1.53838}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M5.83594 22.9513C9.13141 22.6395 13.6119 20.5087 17.8014 16.9932C22.9219 12.6967 26.081 7.61271 26.0295 4.25781"
          stroke="#13B5EA"
          strokeWidth={1.53838}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M22.8485 0.757644C19.524 0.302777 14.1417 2.5247 9.16925 6.69702C4.49492 10.6193 1.45511 15.1975 1 18.5178"
          stroke="#13B5EA"
          strokeWidth={1.53838}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M1.73817 23.2888C2.50181 23.2888 3.12087 22.6698 3.12087 21.9061C3.12087 21.1425 2.50181 20.5234 1.73817 20.5234C0.974527 20.5234 0.355469 21.1425 0.355469 21.9061C0.355469 22.6698 0.974527 23.2888 1.73817 23.2888Z"
          fill="#50DCAA"
        />
        <path
          d="M25.7304 2.7654C26.494 2.7654 27.113 2.14634 27.113 1.3827C27.113 0.619059 26.494 0 25.7304 0C24.9667 0 24.3477 0.619059 24.3477 1.3827C24.3477 2.14634 24.9667 2.7654 25.7304 2.7654Z"
          fill="#FDCC08"
        />
        <path
          d="M15.7276 8.71861C14.4996 8.6189 13.903 9.50958 13.7657 10.3054C13.76 10.3422 13.7071 10.3422 13.7013 10.3054C13.564 9.50958 12.9675 8.6189 11.7395 8.71861C10.8203 8.79559 9.84078 9.51608 9.83594 10.7009C9.83594 12.6506 12.3174 14.4486 13.6506 15.4146C13.6757 15.4328 13.7042 15.4437 13.7335 15.4478C13.7628 15.4437 13.7913 15.4328 13.8164 15.4146C15.1496 14.4486 17.631 12.6506 17.631 10.7009C17.6262 9.51608 16.6468 8.79559 15.7276 8.71861Z"
          fill="#FF8CAE"
        />
      </g>
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 2.25v8.25m0 0 2.25-2.25M9 10.5 6.75 8.25M3 12.75v2.25A1.5 1.5 0 0 0 4.5 16.5h9a1.5 1.5 0 0 0 1.5-1.5v-2.25"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PurchasesOverview() {
  const pathname = usePathname();
  const interactiveEnabled =
    pathname.includes("/purchases-overview/prototype/3") ||
    pathname.includes("/purchases-overview/prototype/4");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);
  const [activeSeverity, setActiveSeverity] = useState<LinkSeverity>("normal");
  const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);
  const [activeBandStart, setActiveBandStart] = useState<number | null>(null);
  const [activeBandEnd, setActiveBandEnd] = useState<number | null>(null);
  const [draftPayment, setDraftPayment] = useState<DraftPaymentImpact | null>(null);

  const setActiveLink = useCallback(
    (
      linkId: string | null,
      meta?: {
        severity?: LinkSeverity;
        dayIndex?: number | null;
        bandStart?: number | null;
        bandEnd?: number | null;
      }
    ) => {
      if (!interactiveEnabled) return;
      setActiveLinkId(linkId);
      setActiveSeverity(meta?.severity ?? "normal");
      setActiveDayIndex(meta?.dayIndex ?? null);
      setActiveBandStart(meta?.bandStart ?? null);
      setActiveBandEnd(meta?.bandEnd ?? null);
    },
    [interactiveEnabled]
  );

  const linkingValue = useMemo(
    () => ({
      enabled: interactiveEnabled,
      activeLinkId,
      activeSeverity,
      activeDayIndex,
      activeBandStart,
      activeBandEnd,
      draftPayment,
      setActiveLink,
      setDraftPayment,
    }),
    [
      interactiveEnabled,
      activeLinkId,
      activeSeverity,
      activeDayIndex,
      activeBandStart,
      activeBandEnd,
      draftPayment,
      setActiveLink,
    ]
  );
  const billsHref = usePrototypeHref("/bills") ?? "/bills";
  const legacyOverviewHref =
    usePrototypeHref("/purchases-overview/legacy") ?? "/purchases-overview/legacy";
  const {
    bankBalanceWidgetColumnSpan,
    hidePurchasesSupportingWidgets,
    showBillsStatusSummaryBanner,
  } = usePurchasesPrototypeScenario();
  const bankShellClass = getPurchasesOverviewBankShellClassName(
    bankBalanceWidgetColumnSpan
  );
  const secondaryGridClass = getPurchasesOverviewSecondaryWidgetsGridClassName();

  const iconButtonClass =
    "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[48px] border border-border-primary bg-white text-content-primary transition-colors hover:bg-[#eff1f2]";

  return (
    <PurchasesInteractiveLinkingContext.Provider value={linkingValue}>
      <>
      <div className="mb-6 overflow-hidden bg-white py-4">
        <div className="mx-auto flex max-w-full flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[21px]/[26px] font-bold md:text-[24px]/[32px]">Purchases overview</h1>
            <span className="rounded-[3px] border border-content-secondary px-1 text-[13px]/[20px] text-content-secondary">
              Prototype
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button type="button" className={iconButtonClass} aria-label="Download">
              <DownloadIcon />
            </button>
            <button
              type="button"
              className="flex h-9 cursor-pointer items-center gap-2 rounded-[48px] border border-border-primary bg-white px-3 text-[13px]/[16px] font-bold text-content-primary transition-colors hover:bg-[#eff1f2]"
            >
              <Search className="shrink-0 text-content-primary" stroke="stroke-current" />
              Search
            </button>
            <Popover className="relative">
              <PopoverButton className="flex h-9 cursor-pointer items-center gap-2 rounded-[48px] border border-brand-primary bg-brand-primary px-3 text-[13px]/[16px] font-bold text-white outline-none transition-colors hover:border-[#0073BF] hover:bg-[#0073BF] data-[open]:border-[#0073BF] data-[open]:bg-[#0073BF]">
                Create
                <Caret className="text-white" fill="fill-current" />
              </PopoverButton>
              <PopoverPanel
                transition
                anchor={{ to: "bottom end", gap: "4px" }}
                className="z-20 flex w-[220px] origin-top translate-y-0 flex-col rounded-lg border border-border-primary bg-background-secondary py-2 text-[15px]/[20px] shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition data-[closed]:translate-y-1 data-[closed]:opacity-0"
              >
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-background-primary"
                >
                  Bill
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-background-primary"
                >
                  Payment
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-background-primary"
                >
                  Repeating bill
                </button>
              </PopoverPanel>
            </Popover>
            <button type="button" className={iconButtonClass} aria-label="Settings">
              <Settings stroke="stroke-current" className="text-content-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Banner: +8px vs .container widths from globals.css (440/900/1360/1820) */}
      <div className="mx-auto mb-4 w-full max-w-[448px] min-[1000px]:max-w-[908px] min-[1440px]:max-w-[1368px] min-[1900px]:max-w-[1828px]">
        <div className="rounded-xl bg-white px-4 py-[13px] sm:px-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 text-[13px]/[20px] text-content-primary sm:min-w-0 sm:flex-1">
              <PurchasesOverviewBannerMark className="shrink-0" />
              <p>
                You&apos;re using the new purchases overview experience. For a short time, you can
                switch back.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
              <Link
                href={legacyOverviewHref}
                className="text-[13px]/[20px] font-bold text-brand-primary hover:underline"
              >
                Switch to old
              </Link>
              <button
                type="button"
                className="rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
                onClick={() => setFeedbackOpen(true)}
              >
                Give feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Widget grid: dense packing at 1-col bank width; explicit placement when bank is 2 columns wide */}
      <div className="container mx-auto mb-10 min-h-screen overflow-x-auto scroll-smooth lg:overflow-x-visible">
        <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:mb-4">
          <h2 className="text-[19px]/[32px] font-bold lg:text-[21px]/[32px]">Bills and payments</h2>
          <nav className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px]/[20px]">
            <Link href={billsHref} className="font-bold text-brand-primary hover:underline">
              Bills
            </Link>
            <a
              href="#"
              className="font-bold text-brand-primary hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Repeating bills
            </a>
            <a
              href="#"
              className="font-bold text-brand-primary hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Payments
            </a>
          </nav>
        </div>

        {!hidePurchasesSupportingWidgets && showBillsStatusSummaryBanner && (
          <BillsStatusSummaryBanner />
        )}

        {/** Left rail: Create + Protect. Right: bank, then Money + Customers in a grid. */}
        <div className={PURCHASES_OVERVIEW_WIDGETS_ROW}>
          <aside className={PURCHASES_OVERVIEW_LEFT_COLUMN}>
            <PurchasesCreateNew />
            <ProtectBillsWidget />
          </aside>
          <div className={PURCHASES_OVERVIEW_RIGHT_COLUMN}>
            <div className={bankShellClass}>
              <CashflowActionPlanWidget />
            </div>
            {!hidePurchasesSupportingWidgets && (
              <div className={secondaryGridClass}>
                <div className="relative min-h-0 min-w-0">
                  <MoneyGoingOut />
                </div>
                <div className="relative min-h-0 min-w-0">
                  <CustomersYouOweMost />
                </div>
              </div>
            )}
          </div>
        </div>

        {!hidePurchasesSupportingWidgets && (
          <div className="mt-8 lg:mt-10">
            <h2 className="mb-2 text-[19px]/[32px] font-bold lg:mb-4 lg:text-[21px]/[32px]">
              Purchase orders
            </h2>
            <PurchaseOrdersStatusSummaryBanner />
          </div>
        )}
      </div>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      </>
    </PurchasesInteractiveLinkingContext.Provider>
  );
}
