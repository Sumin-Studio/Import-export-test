"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Same content column as `BankReconciliationMount` */
export const BANK_RULES_PAGE_CONTENT = "mx-auto w-full px-0";

export function XuiCaretDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type BankRulesTabId = "spend" | "receive" | "transfer";

const TABS: { id: BankRulesTabId; label: string }[] = [
  { id: "spend", label: "Spend money rules" },
  { id: "receive", label: "Receive money rules" },
  { id: "transfer", label: "Transfer money rules" },
];

/**
 * Import wizard step indicator.
 * - Default: centered row with large vertical padding (used standalone on the upload page).
 * - `compact`: inline, no padding — sits inside the page header alongside title + actions.
 */
export function BankRulesImportWizardSteps({
  activeStep,
  compact = false,
}: {
  activeStep: 1 | 2;
  compact?: boolean;
}) {
  const steps = [
    { n: 1, label: "Upload bank rules", active: activeStep === 1 },
    { n: 2, label: "Import summary", active: activeStep === 2 },
  ];

  return (
    <div
      className={
        compact
          ? "flex items-center gap-x-3"
          : "mb-1 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 py-8 sm:mb-1.5 sm:gap-x-4"
      }
      role="navigation"
      aria-label="Import progress"
    >
      {steps.map((step, i) => (
        <div key={step.n} className="flex items-center gap-x-3">
          {i > 0 && (
            <div className="h-0.5 w-8 flex-none bg-[#ccced2]" aria-hidden />
          )}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full text-[12px] font-bold leading-none tabular-nums ${
                step.active ? "bg-[#0078C8] text-white" : "bg-[#e1e2e5] text-[#59606d]"
              }`}
              aria-current={step.active ? "step" : undefined}
            >
              {step.n}
            </span>
            <span
              className={`font-bold leading-5 ${compact ? "text-[13px]" : "text-[15px]"} ${
                step.active ? "text-[#0078C8]" : "text-[#59606d]"
              }`}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

type BankRulesPageChromeListProps = {
  surface?: "list";
  children: ReactNode;
  activeTab?: BankRulesTabId;
  importHref?: string;
  isImportView?: boolean;
  bankAccountsHref?: string;
  onTabChange?: (tab: BankRulesTabId) => void;
  tabs?: { id: BankRulesTabId; label: string }[];
  /**
   * When set, Import is a client button (no navigation) — use on the bank rules list so embedded
   * / IDE previews that break client-side route transitions can still open the import flow.
   */
  onOpenImport?: () => void;
  /** Ignored for list (use import surface for title override). */
  importPageTitle?: never;
  importBreadcrumb?: never;
  stepContent?: never;
  headerActions?: never;
};

type BankRulesPageChromeImportProps = {
  surface: "import";
  children: ReactNode;
  /** Main heading (Figma: "Import bank rules"). */
  importPageTitle?: string;
  /** Breadcrumb label + href. */
  importBreadcrumb?: { label: string; href: string };
  /** Compact stepper rendered inline in the header between title and actions. */
  stepContent?: ReactNode;
  /** Action buttons rendered in the header's right slot. */
  headerActions?: ReactNode;
  activeTab?: never;
  importHref?: never;
  isImportView?: never;
  bankAccountsHref?: never;
  onOpenImport?: never;
  onTabChange?: never;
  tabs?: never;
};

export type BankRulesPageChromeProps = BankRulesPageChromeListProps | BankRulesPageChromeImportProps;

export function BankRulesPageChrome(props: BankRulesPageChromeProps) {
  const { children, surface = "list" } = props;

  // ── Import surface ────────────────────────────────────────────────────────

  if (surface === "import") {
    const {
      importPageTitle = "Import bank rules",
      importBreadcrumb = { label: "Bank rules", href: "/accounting/bank-rules" },
      stepContent,
      headerActions,
    } = props;

    return (
      <div className="min-h-screen bg-background-primary">
        {/* Header */}
        <div className="w-full border-b border-[#ccced2] bg-white">
          <div className={`${BANK_RULES_PAGE_CONTENT} px-4`}>
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1 pt-3 text-[13px] text-[#0078C8]"
              aria-label="Breadcrumb"
            >
              {importBreadcrumb.href === "#" ? (
                <a href="#" className="hover:underline" onClick={(e) => e.preventDefault()}>
                  {importBreadcrumb.label}
                </a>
              ) : (
                <Link href={importBreadcrumb.href} className="hover:underline">
                  {importBreadcrumb.label}
                </Link>
              )}
            </nav>

            {/* Title row — center column stays anchored to the full header width. */}
            <div className="grid min-h-[52px] w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 pb-3 pt-1.5">
              <h1 className="min-w-0 justify-self-start text-[20px] font-bold leading-none text-[#000a1e]">
                {importPageTitle}
              </h1>

              {stepContent && (
                <div className="flex items-center justify-center justify-self-center">
                  {stepContent}
                </div>
              )}

              {headerActions && (
                <div className="flex items-center gap-2 justify-self-end">
                  {headerActions}
                </div>
              )}
            </div>
          </div>
        </div>

        {children}
      </div>
    );
  }

  // ── List surface ──────────────────────────────────────────────────────────

  const {
    activeTab = "spend",
    importHref = "/accounting/bank-rules?import=1",
    isImportView = false,
    bankAccountsHref = "/accounting/bank-reconciliation",
    onOpenImport,
    onTabChange,
    tabs = TABS,
  } = props as BankRulesPageChromeListProps;

  return (
    <div className="min-h-0 min-h-screen bg-background-primary">
      <div className="w-full bg-white">
        <div className={`${BANK_RULES_PAGE_CONTENT} flex flex-col pt-3`}>
          <nav
            className="mb-2.5 flex items-center gap-1 text-[13px] text-[#0078C8]"
            aria-label="Breadcrumb"
          >
            <Link href={bankAccountsHref} className="hover:underline">
              Bank accounts
            </Link>
          </nav>

          <div className="grid w-full min-h-[52px] items-end gap-x-2 gap-y-2 border-b border-[#ccced2] px-4 pb-0 sm:min-h-[48px] sm:grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] sm:items-end sm:gap-x-4 md:gap-x-6">
            <h1 className="mt-0 mx-0 mb-[5px] flex shrink-0 items-center self-end text-[24px] font-bold leading-none text-[#000a1e] sm:min-h-[32px] sm:pr-2 sm:pb-0.5 md:pr-3">
              Bank rules
            </h1>

            <div
              className="flex min-w-0 flex-wrap items-end justify-center justify-self-stretch -mb-px sm:flex-nowrap sm:pb-0"
              role="tablist"
              aria-label="Bank rule type"
            >
              {tabs.map((tab) => {
                const selected = activeTab === tab.id;
                const base =
                  "relative box-border flex h-[48px] min-w-0 shrink-0 items-end justify-center px-2.5 pb-2.5 text-center text-[15px] leading-5 sm:px-4 sm:pb-3 md:px-5";
                const className = `${base} ${
                  selected
                    ? "text-[#0078C8] shadow-[inset_0_-3px_0_0_#0078c8]"
                    : isImportView
                      ? "text-[#59606d] hover:bg-[#fafafa]"
                      : "text-[#000a1e] hover:bg-[#fafafa]"
                }`;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={className}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => onTabChange?.(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mb-[6px] flex w-full min-w-0 flex-shrink-0 flex-wrap items-end justify-end gap-2 self-end justify-self-stretch sm:w-auto sm:justify-self-end sm:pl-1">
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1 rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
              >
                <span>Reconcile</span>
                <XuiCaretDown className="h-[6px] w-[10px] shrink-0 text-[#0078C8]" />
              </button>
              {isImportView ? (
                <span
                  className="inline-flex h-8 items-center rounded-[3px] border border-[#0078C8] bg-[#e8f4fc] px-3 text-[13px] font-bold text-[#006bb3]"
                  title="Current screen"
                >
                  Import
                </span>
              ) : onOpenImport ? (
                <button
                  type="button"
                  onClick={onOpenImport}
                  className="inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
                >
                  Import
                </button>
              ) : (
                <a
                  href={importHref}
                  className="inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
                >
                  Import
                </a>
              )}
              <button
                type="button"
                className="inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
              >
                Export
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center rounded-[3px] bg-[#0078C8] px-3 text-[13px] font-bold text-white hover:bg-[#006bb3]"
              >
                Create rule
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
