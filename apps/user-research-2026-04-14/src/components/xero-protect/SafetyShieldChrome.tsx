"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PURCHASES_OVERVIEW_V4_DIYA_DEFAULT_HREF } from "@/lib/purchases-overview-cashflow-prototype-path";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import {
  Plus,
  Search,
  Star,
  Sparkles,
  HelpCircle,
  Bell,
  LayoutGrid,
  ChevronDown,
  MoreVertical,
} from "lucide-react";

const navItems = [
  "Home",
  "Sales",
  "Purchases",
  "Reporting",
  "Payroll",
  "Accounting",
  "Tax",
  "Contacts",
  "Projects",
];

function rightNavIcons(useSparkleAssistant: boolean) {
  return [
    { Icon: Plus, label: "Add" },
    { Icon: Search, label: "Search" },
    {
      Icon: useSparkleAssistant ? Sparkles : Star,
      label: useSparkleAssistant ? "Assistant" : "Favourites",
    },
    { Icon: HelpCircle, label: "Help" },
    { Icon: Bell, label: "Notifications" },
    { Icon: LayoutGrid, label: "Apps" },
  ];
}

/** Canonical purchases experience URL (iteration 5 default: Melio path). */
export const PURCHASES_OVERVIEW_HREF_DEFAULT = PURCHASES_OVERVIEW_V4_DIYA_DEFAULT_HREF;

/**
 * Inline “Jump to” line — bills list first (top-level work surface), then purchases overview.
 */
export function JumpToPurchasesNav({
  billsListHref,
  purchasesOverviewHref = PURCHASES_OVERVIEW_HREF_DEFAULT,
  className = "mb-1",
}: {
  billsListHref: string;
  purchasesOverviewHref?: string;
  className?: string;
}) {
  return (
    <nav className={`flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[13px] ${className}`}>
      <span className="text-[#6b7280]">Jump to:</span>
      <Link href={billsListHref} className="text-[#1c52de] hover:underline">
        Bills list
      </Link>
      <span className="text-[#8c919a]" aria-hidden>
        |
      </span>
      <Link href={purchasesOverviewHref} className="text-[#1c52de] hover:underline">
        Purchases overview
      </Link>
    </nav>
  );
}

/**
 * Purchases Overview / cashflow chart — `PROTECT_MEDIUM` (`cashflowProtectTooltipHtml.ts`).
 * Same hex everywhere Protect appears so list, chart, and tooltips match.
 */
export const protectPurchasesAccentHex = "#FF8F33";

/** Risk shield icon colour — must match {@link protectPurchasesAccentHex}. */
export const protectShieldIconClassName = "text-[#FF8F33]";

/** Lucide icons need explicit `color` in some stacks (e.g. table cells) — use with `className`. */
export const protectShieldIconStyle: CSSProperties = { color: "#FF8F33" };

/** Shield in list tooltip header — same accent as list shields ({@link protectPurchasesAccentHex}). */
export const protectPurchasesTooltipHeaderShieldClassName = protectShieldIconClassName;

export const protectPurchasesTooltipHeaderShieldStyle: CSSProperties = {
  ...protectShieldIconStyle,
};

/**
 * List tooltip header row — white strip, dark-orange title + shield (lighter than a solid bar).
 */
export const protectPurchasesTooltipHeaderBarClassName =
  "bg-white text-[#FF8F33]";

/**
 * Inline header fill + label colour — portaled popovers keep white + orange even if Tailwind
 * arbitrary classes are not applied (same pattern as {@link protectPurchasesTooltipBodyStyle}).
 */
export const protectPurchasesTooltipHeaderBarStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  color: protectPurchasesAccentHex,
};

/** Primary label colour inside Protect tooltips (`colors.textDark` in chart theme). */
export const protectPurchasesTooltipTextPrimaryClassName = "text-[#000A1E]";

/** Secondary/meta lines (dates, account copy) in Protect tooltips. */
export const protectPurchasesTooltipMetaClassName = "text-[#5c6670]";

/**
 * Tooltip outer shell — rounded card + border + shadow only (no padding; header/body handle inset).
 */
export const protectPurchasesTooltipShellClassName =
  "overflow-hidden rounded-[12px] border border-[rgba(0,10,30,0.08)] shadow-[0_4px_24px_rgba(0,10,30,0.07),0_1px_3px_rgba(0,10,30,0.04)]";

/** Base card fill under border/shadow so the shell is never visually transparent when portaled. */
export const protectPurchasesTooltipShellStyle: CSSProperties = {
  backgroundColor: "#ffffff",
};

/**
 * Tooltip body (below header) — matches chart content area fill.
 */
export const protectPurchasesTooltipBodyClassName =
  "bg-white px-[14px] py-3";

/** Inline fill for tooltip body so portaled panels stay opaque. */
export const protectPurchasesTooltipBodyStyle: CSSProperties = {
  backgroundColor: "#fcfcfd",
};

/** @deprecated Use {@link protectPurchasesTooltipShellClassName} + header/body split. */
export const protectPurchasesTooltipSurfaceClassName =
  "bg-white rounded-[12px] border border-[rgba(0,10,30,0.08)] px-[14px] py-3 shadow-[0_4px_24px_rgba(0,10,30,0.07),0_1px_3px_rgba(0,10,30,0.04)]";

/** @deprecated Use {@link protectPurchasesTooltipBodyStyle}. */
export const protectPurchasesTooltipSurfaceStyle: CSSProperties = {
  backgroundColor: "#fcfcfd",
};

/** Inline Xero wordmark — using the official SVG paths from the design system */
function XeroLogo() {
  return (
    <svg
      className="block shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="67"
      height="18"
      fill="none"
      aria-hidden
    >
      <path
        fill="white"
        d="M46.84 0c-1.67 0-3.45 1.296-4.36 4.119V1.697a1.697 1.697 0 0 0-3.392 0v14.607a1.697 1.697 0 0 0 3.392 0V9.443c0-3.3 1.864-5.258 4.725-5.899.915-.205 1.483-.895 1.483-1.802C48.688.716 47.928 0 46.84 0m10.778 0c-4.962 0-9 4.037-9 9 0 4.962 4.038 8.999 9 8.999s9-4.037 9-9c0-4.962-4.038-8.999-9-8.999m0 14.609A5.615 5.615 0 0 1 52.01 9a5.615 5.615 0 0 1 5.608-5.608A5.615 5.615 0 0 1 63.226 9a5.615 5.615 0 0 1-5.608 5.609"
      />
      <path
        fill="white"
        d="M57.618 6.758A2.244 2.244 0 0 0 55.377 9a2.244 2.244 0 0 0 2.241 2.24A2.244 2.244 0 0 0 59.86 9a2.244 2.244 0 0 0-2.24-2.242ZM27.486 0c-4.964 0-9.003 4.037-9.003 9 0 4.962 3.92 8.999 9.34 8.999 2.646 0 4.831-.805 6.679-2.46.2-.2.54-.632.54-1.25 0-.935-.697-1.647-1.62-1.647-.476 0-.747.14-1.048.38-1.349 1.07-2.8 1.633-4.48 1.633-2.864 0-5.205-1.685-5.845-4.226h12.439c1.147-.005 1.978-.929 1.978-2.202C36.466 5.15 33.448 0 27.487 0zm-5.442 7.565c.602-2.485 2.752-4.257 5.443-4.257s4.82 1.585 5.437 4.257zm-4.045-5.89A1.675 1.675 0 0 0 15.139.49L9 6.63 2.86.49A1.675 1.675 0 0 0 .49 2.86L6.631 9 .49 15.14a1.673 1.673 0 1 0 2.37 2.37L9 11.368l6.14 6.14a1.674 1.674 0 1 0 2.37-2.37L11.368 9l6.14-6.14c.316-.316.49-.737.49-1.184Z"
      />
    </svg>
  );
}

const ICON_PILL =
  "flex items-center justify-center shrink-0 w-10 h-10 rounded-[20px]";
const ICON_PILL_BG = "rgba(0,10,30,0.1)";

export interface SafetyShieldChromeProps {
  children: React.ReactNode;
  /** Breadcrumb segments; default is Purchases Overview → `/purchases-overview/prototype` */
  breadcrumb?: Array<{ label: string; href: string }>;
  /** Alias for breadcrumb (merged from remote) */
  breadcrumbs?: Array<{ label: string; href: string }>;
  /**
   * When set, replaces breadcrumb with “Jump to: Bills list | Purchases overview”
   * (bills list links to the prototype bills root).
   */
  jumpToNav?: { billsListHref: string; purchasesOverviewHref?: string };
  /** Page title in the header; default "Bills" */
  pageTitle?: string;
  /** Alias for pageTitle (merged from remote) */
  title?: string;
  /** Optional tabs to show in header (e.g. status filters) */
  tabs?: React.ReactNode;
  hideActions?: boolean;
  /** Robb layout: hide the green "New bill" split button only (keeps overflow menu). */
  hideNewBillButton?: boolean;
  /** Optional custom element to replace the + button in the nav bar */
  navAddButtonOverride?: React.ReactNode;
  /** Override default h1 classes (Robb page header title) */
  pageTitleClassName?: string;
  /** After breadcrumb links, show a trailing › (matches prod “Purchases overview ›”) */
  breadcrumbTrailingChevron?: boolean;
}

const DEFAULT_BREADCRUMB: Array<{ label: string; href: string }> = [
  { label: "Purchases Overview", href: PURCHASES_OVERVIEW_HREF_DEFAULT },
];

export function SafetyShieldChrome({
  children,
  breadcrumb,
  breadcrumbs,
  jumpToNav,
  pageTitle,
  title,
  tabs,
  hideActions = false,
  hideNewBillButton = false,
  navAddButtonOverride,
  pageTitleClassName,
  breadcrumbTrailingChevron = false,
}: SafetyShieldChromeProps) {
  const pathname = usePathname();
  const isPrototype3 = pathname.startsWith("/xero-protect/prototype/3");
  const isPrototype4 = pathname.startsWith("/xero-protect/prototype/4");
  const isPrototype5 = pathname.startsWith("/xero-protect/prototype/5");
  const isPrototype8 = pathname.startsWith("/xero-protect/prototype/8");
  const isPrototype9 = pathname.startsWith("/xero-protect/prototype/9");
  const isPrototype8Or9 = isPrototype8 || isPrototype9;
  const isBillsHomeExperience =
    pathname.startsWith("/purchases-overview") ||
    pathname.startsWith("/experience/bills-home") ||
    pathname.startsWith("/home/prototype");
  const useRobbLayout = isPrototype3 || isPrototype4 || isBillsHomeExperience;
  const segs = breadcrumb ?? breadcrumbs ?? DEFAULT_BREADCRUMB;
  const heading = pageTitle ?? title ?? "Bills";
  const pageHeadingClass =
    pageTitleClassName ??
    "text-[18px] font-semibold text-[#0a0a0a] leading-tight pb-3 shrink-0";

  if (useRobbLayout) {
    return (
      <RobbShell showPreviewBanner={false}>
        <div className="safety-shield-xero min-h-screen bg-[#f2f3f4]">
          {/* ─── Page header (breadcrumb + title + actions) ─── */}
          <div className="bg-white border-b border-[#e1e2e5]">
            <div className={`px-4 ${tabs ? "pt-2" : "pt-4"} pb-0`}>
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  {jumpToNav ? (
                    <JumpToPurchasesNav
                      billsListHref={jumpToNav.billsListHref}
                      purchasesOverviewHref={jumpToNav.purchasesOverviewHref}
                    />
                  ) : (
                    segs.length > 0 && (
                      <nav className="mb-1 flex flex-wrap items-center gap-1 text-[13px]">
                        {segs.map((seg, i) => (
                          <span key={i} className="inline-flex items-center gap-1">
                            {i > 0 && (
                              <svg
                                width="8"
                                height="12"
                                viewBox="0 0 8 12"
                                fill="none"
                                className="text-[#8c919a]"
                              >
                                <path
                                  d="M1.5 1l5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                            <Link
                              href={seg.href}
                              className="text-[#1c52de] hover:underline"
                            >
                              {seg.label}
                            </Link>
                          </span>
                        ))}
                      </nav>
                    )
                  )}
                  <div className="flex items-end gap-10">
                    <h1 className={pageHeadingClass}>
                      {heading}
                    </h1>
                    {tabs}
                  </div>
                </div>
                {!hideActions && (
                  <div className="flex items-center gap-2 pt-2 shrink-0">
                    {!hideNewBillButton && (
                      <div className="flex">
                        <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-[13px] font-medium px-4 h-8 rounded-l-[3px] flex items-center gap-1.5 transition-colors">
                          New bill
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <button className="w-10 h-10 flex items-center justify-center text-[#6b7280] hover:text-[#0a0a0a] rounded transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <main className="min-h-[calc(100vh-10rem)] flex flex-col">{children}</main>
        </div>
      </RobbShell>
    );
  }

  return (
    <div className="safety-shield-xero min-h-screen bg-[#f2f3f4]">
      {/* Robb-style preview banner (prototype 3 only) */}
      {isPrototype3 && (
        <div className="sticky top-0 z-40 flex flex-col bg-[#F2F8FC] px-5 py-2 text-[13px]/[24px] text-[#404756] xl:flex-row xl:items-center xl:justify-center xl:gap-3 xl:text-center">
          <div className="flex items-center gap-3 xl:contents">
            <p className="overflow-ellipsis md:whitespace-nowrap">
              This design is a preview and may change as we get your feedback. The prototype uses sample data only, no real customer data is shown.
            </p>
          </div>
        </div>
      )}

      {/* ─── Global navigation bar ─── */}
      <nav className="bg-[#0078c8] h-16 w-full">
        <div
          className="relative h-16 mx-auto"
          style={{ maxWidth: 1728 }}
        >
          {/* Xero logo — pinned left, vertically centered in bar (match prod) */}
          <div
            className="absolute left-3 top-0 flex h-16 items-center px-1"
            style={{ width: 72 }}
          >
            <XeroLogo />
          </div>

          {/* Main container (company + nav) */}
          <div
            className="absolute top-0 h-16"
            style={{ left: 84, width: 1296 }}
          >
            {/* Company selector */}
            <div
              className="absolute top-0 h-16"
              style={{ left: 0, width: 196.75 }}
            >
              <button
                className="flex items-center gap-2 h-[42px] rounded-[20px] w-full"
                style={{
                  marginTop: 11,
                  background: ICON_PILL_BG,
                  border: "1px solid transparent",
                  paddingLeft: 16,
                  paddingRight: 12,
                }}
              >
                <span
                  className="text-[15px] text-white whitespace-nowrap leading-6 flex-1 text-left"
                  style={{ fontWeight: 500 }}
                >
                  {isPrototype3 ? "FS" : "Demo Company (NZ)"}
                </span>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M0.5 0.5L5 4.5L9.5 0.5"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav items list */}
            <div
              className="absolute top-0 h-16 flex items-center"
              style={{ left: 196.75 }}
            >
              {navItems.map((item) => {
                const isActive = item === "Purchases";
                return (
                  <button
                    key={item}
                    className="h-16 flex items-center relative"
                  >
                    <div className="h-10 rounded-[20px] flex items-center px-3">
                      <span
                        className="text-[15px] text-white leading-6 whitespace-nowrap"
                        style={{ fontWeight: 500 }}
                      >
                        {item}
                      </span>
                    </div>
                    {isActive && (
                      <div
                        className="absolute inset-0 pointer-events-none rounded-[inherit]"
                        style={{
                          boxShadow:
                            "inset 0px -4px 0px 0px rgba(255,255,255,0.75)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right-side container (add + icons + avatar) */}
          <div
            className="absolute top-0 h-16 flex items-center"
            style={{ right: 16 }}
          >
            {/* Add button (or custom override) */}
            {navAddButtonOverride ?? (
              <button
                className={ICON_PILL}
                style={{ background: ICON_PILL_BG }}
                aria-label="Add"
              >
                <Plus className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>
            )}

            {/* Icon row */}
            <div className="flex items-center ml-2 gap-2">
              {rightNavIcons(isPrototype8Or9).slice(1).map(({ Icon, label }) => (
                <button
                  key={label}
                  className={ICON_PILL}
                  style={{ background: ICON_PILL_BG }}
                  aria-label={label}
                >
                  <Icon
                    className="w-5 h-5 text-white"
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>

            {/* User avatar */}
            <div className="ml-3 shrink-0">
              <div
                className="flex items-center justify-center rounded-[20px] overflow-hidden"
                style={{ width: 40, height: 40, background: "#9eeefd" }}
              >
                <span
                  className="text-[15px] uppercase"
                  style={{
                    fontWeight: 700,
                    color: "#154d58",
                    lineHeight: "13px",
                  }}
                >
                  {isPrototype3 ? "FS" : "JB"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Page header (breadcrumb + title + actions) ─── */}
      <div
        className={`bg-white ${
          isPrototype8Or9 && tabs ? "" : "border-b border-[#e1e2e5]"
        }`}
      >
        <div
          className={`${
            isPrototype8Or9
              ? "max-w-[1728px] mx-auto px-5 md:px-8 lg:px-10 xl:px-12"
              : "px-4"
          } ${tabs ? "pt-2" : "pt-4"} pb-0`}
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              {/* Breadcrumb or jump-to line */}
              {jumpToNav ? (
                <JumpToPurchasesNav
                  billsListHref={jumpToNav.billsListHref}
                  purchasesOverviewHref={jumpToNav.purchasesOverviewHref}
                />
              ) : (
                <nav className="flex items-center gap-1 text-[13px] mb-1 flex-wrap">
                  {segs.map((seg, i) => (
                    <span key={i} className="inline-flex items-center gap-1">
                      {i > 0 && (
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          className="text-[#8c919a]"
                        >
                          <path
                            d="M1.5 1l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <Link
                        href={seg.href}
                        className="text-[#1c52de] hover:underline"
                      >
                        {seg.label}
                      </Link>
                    </span>
                  ))}
                  {breadcrumbTrailingChevron && segs.length > 0 && (
                    <span className="text-[#8c919a] pl-0.5" aria-hidden>
                      &gt;
                    </span>
                  )}
                </nav>
              )}
              {isPrototype8Or9 && tabs ? (
                <>
                  <h1 className={pageHeadingClass}>{heading}</h1>
                  <div className="flex w-full min-w-0 border-b border-[#e1e2e5]">
                    {tabs}
                  </div>
                </>
              ) : (
                <div className="flex items-end gap-10">
                  <h1 className={pageHeadingClass}>{heading}</h1>
                  {tabs}
                </div>
              )}
            </div>
            {!hideActions && (
              <div className="flex items-center gap-2 pt-2 shrink-0">
                <div className="flex">
                  <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-[13px] font-medium px-4 h-8 rounded-l-[3px] flex items-center gap-1.5 transition-colors">
                    New bill
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
                <button className="w-10 h-10 flex items-center justify-center text-[#6b7280] hover:text-[#0a0a0a] rounded transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="min-h-[calc(100vh-10rem)] flex flex-col">{children}</main>
    </div>
  );
}

export type StatusPillVisual = "default" | "xui7438";

/**
 * Status pill — `default`: compact capsule for older prototypes.
 * `xui7438`: Xero Protect Figma XUI editable table (node 7438:419+) — 20px height, 13px type, 3px radius.
 */
export function statusPill(status: string, visual: StatusPillVisual = "default") {
  const normalized = status.replace(/_/g, " ");
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  if (visual === "xui7438") {
    const xui: Record<string, string> = {
      awaiting_payment:
        "bg-[#a6d3bb] text-[#002e15] shadow-[inset_0_0_0_1px_#80c19e]",
      paid: "bg-white text-[rgba(0,10,30,0.75)] shadow-[inset_0_0_0_1px_rgba(0,10,30,0.5)]",
      overdue: "bg-[#fde8e8] text-[#c31230] shadow-[inset_0_0_0_1px_#f5bcbc]",
      awaiting_approval: "bg-[#e6f0ff] text-[#0078c8] shadow-[inset_0_0_0_1px_#b4d4f0]",
      draft: "bg-[#f3f4f5] text-[rgba(0,10,30,0.75)] shadow-[inset_0_0_0_1px_#d5d7da]",
    };
    const tone =
      xui[status] ?? "bg-[#f3f4f5] text-[rgba(0,10,30,0.75)] shadow-[inset_0_0_0_1px_#d5d7da]";
    return (
      <span
        className={`inline-flex min-h-5 items-center justify-center whitespace-nowrap rounded-[3px] px-2 text-[13px] font-normal leading-5 ${tone}`}
      >
        {label}
      </span>
    );
  }

  const styles: Record<string, string> = {
    paid: "bg-[#f3f4f5] text-[#495058] border border-[#d5d7da]",
    overdue: "bg-[#fde8e8] text-[#c31230] border border-transparent",
    awaiting_approval: "bg-[#e6f0ff] text-[#1c52de] border border-transparent",
    awaiting_payment: "bg-[#e0f2e9] text-[#1a5632] border border-[#b8dcc8]",
    draft: "bg-[#f3f4f5] text-[#495058] border border-[#d5d7da]",
  };

  const tone = styles[status] ?? "bg-[#f3f4f5] text-[#495058] border border-[#d5d7da]";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-sm h-4 px-1.5 text-[12px] font-medium leading-none ${tone}`}
    >
      {label}
    </span>
  );
}

/**
 * Risk flag — inline red flag in the Reference column, matching Figma layout.
 */
export function riskFlag(label: string) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-sm h-4 px-1.5 text-[12px] font-medium leading-none bg-[#fde8e8] text-[#c31230] border border-transparent ml-3">
      ⚑ {label}
    </span>
  );
}

const riskTypeConfig: Record<
  string,
  { label: string; icon: string; tone: string }
> = {
  first_time_supplier: {
    label: "First-time supplier",
    icon: "👤",
    tone: protectShieldIconClassName,
  },
  duplicate: {
    label: "Duplicate",
    icon: "📋",
    tone: protectShieldIconClassName,
  },
  anomalous_amount: {
    label: "Unusual amount",
    icon: "📊",
    tone: "text-[#856404]",
  },
  bank_detail_change: {
    label: "Bank detail change",
    icon: "🏦",
    tone: protectShieldIconClassName,
  },
};

export function riskTypePill(riskType: string) {
  const config = riskTypeConfig[riskType];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap text-[12px] font-medium ${config.tone}`}
    >
      <span className="text-[11px]">{config.icon}</span>
      {config.label}
    </span>
  );
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 2,
  }).format(value);
}
