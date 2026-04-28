"use client";

import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Close } from "../../../prototypes/payments-agents/src/app/components/ui/icons";
import WidgetsAU from "../../../prototypes/payments-agents/src/app/assets/images/widgetsAU.svg";
import WidgetsCA from "../../../prototypes/payments-agents/src/app/assets/images/widgetsCA.svg";
import WidgetsUK from "../../../prototypes/payments-agents/src/app/assets/images/widgetsUK.svg";
import { useRegion } from "../../../prototypes/payments-agents/src/app/contexts/RegionContext";
import GridHintPopover from "../../../prototypes/payments-agents/src/app/components/global/GridHintPopover";
import DraggableGrid from "../../../prototypes/payments-agents/src/app/contexts/DraggableGrid";
import { RobbShell } from "@/components/prototype-shell/RobbShell";

import {
  Spotlight,
  InvoicesOwed,
  CashInAndOut,
  BillsToPay,
  NetProfitLoss,
  BankRec,
  RecentInvoicePayments,
  Tasks,
  ChartOfAccounts,
  ExpensesToReview,
  YourExpenses,
} from "../../../prototypes/payments-agents/src/app/components/widgets";

const CustomizationContext = createContext<{ isCustomising: boolean }>({
  isCustomising: false,
});

interface GridItem {
  id: string;
  component: React.ReactNode;
  width: number;
  height: number;
}

type WidgetConfig = {
  id: string;
  type:
    | "Spotlight"
    | "BankRec"
    | "Tasks"
    | "InvoicesOwed"
    | "BillsToPay"
    | "NetProfitLoss"
    | "CashInAndOut"
    | "RecentInvoicePayments"
    | "ChartOfAccounts"
    | "ExpensesToReview"
    | "YourExpenses"
    | "OnlinePayments";
  props: Record<string, unknown>;
  width: number;
  height: number;
};

const WIDGET_CONFIGS: WidgetConfig[] = [
  { id: "spotlight", type: "Spotlight", props: {}, width: 440, height: 320 },
  { id: "bills-to-pay", type: "BillsToPay", props: {}, width: 440, height: 522 },
  { id: "expenses-to-review", type: "ExpensesToReview", props: {}, width: 440, height: 522 },
  { id: "online-payments", type: "OnlinePayments", props: {}, width: 440, height: 251 },
];

type OnlinePaymentsMode = "stripe" | "no-service";

/** Shared No service tile body. Logo grid top aligns with title (custom body starts under header; top −28px ≈ title baseline row). */
function OnlinePaymentsNoServiceBody() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="relative">
        <div
          className="absolute right-0 top-[-28px] grid w-[112px] shrink-0 grid-cols-3"
          style={{ columnGap: 8, rowGap: 1 }}
          aria-hidden
        >
          {[
            "/icons/Visa.svg",
            "/icons/MC.svg",
            "/icons/Amex.svg",
            "/icons/ApplePay.svg",
            "/icons/GooglePay.svg",
            "/icons/Link.svg",
          ].map((src) => (
            <img key={src} src={src} alt="" className="size-8 object-contain" width={32} height={32} />
          ))}
        </div>
        <p className="max-w-[calc(100%-7.5rem)] text-[13px]/[20px] text-content-secondary">
          Powered by Stripe
        </p>
      </div>
      <div className="mt-2">
        <span className="text-[13px]/[20px] text-content-secondary">Total balance</span>
        <div className="mt-[20px] h-px w-[20px] bg-[#59606E]" aria-hidden />
      </div>
      <div className="mt-2 flex flex-col gap-0">
        <div className="flex items-center justify-between text-[15px]/[24px]">
          <span className="text-content-primary">Available to pay out</span>
          <span
            className="h-[10px] min-w-[88px] max-w-[40%] shrink-0 rounded-[5px] bg-[#ececee]"
            aria-hidden
          />
        </div>
        <div className="flex items-center justify-between text-[15px]/[24px]">
          <span className="text-content-primary">Next payout</span>
          <span
            className="h-[10px] min-w-[88px] max-w-[40%] shrink-0 rounded-[5px] bg-[#ececee]"
            aria-hidden
          />
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex w-auto flex-none items-center rounded-[48px] bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
        >
          Complete Stripe setup
        </button>
        <button
          type="button"
          className="inline-flex w-auto flex-none items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

function OnlinePaymentsTile({
  variant,
  commonProps,
}: {
  variant: OnlinePaymentsMode;
  commonProps: Record<string, unknown>;
}) {
  if (variant === "stripe") {
    return (
      <Spotlight
        {...commonProps}
        hideSparkle
        hideCarousel
        hideContent
        hideDivider
        title="Online payments"
        customContent={
          <div className="flex min-h-0 flex-1 flex-col px-6 pb-5">
            <p className="text-[13px]/[20px] text-content-secondary">Powered by Stripe</p>
            <div className="mt-2">
              <span className="text-[13px]/[20px] text-content-secondary">Total balance</span>
              <p className="text-[24px]/[32px] font-light text-content-primary">$568.04</p>
            </div>
            <div className="mt-2 flex flex-col gap-0">
              <div className="flex items-center justify-between text-[15px]/[24px]">
                <span className="text-content-primary">Available to pay out</span>
                <span className="font-medium text-content-primary">$585.08</span>
              </div>
              <div className="flex items-center justify-between text-[15px]/[24px]">
                <span className="text-content-primary">Next payout</span>
                <span className="flex items-center gap-2">
                  <span className="font-medium text-content-primary">28 Sep 2025</span>
                  <a href="#" className="font-medium text-brand-primary hover:underline">Update</a>
                </span>
              </div>
            </div>
            <div className="mt-auto flex gap-2">
              <button type="button" className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]">
                Pay out
              </button>
              <button type="button" className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]">
                See details
              </button>
            </div>
          </div>
        }
      />
    );
  }
  return (
    <Spotlight
      {...commonProps}
      contentOverflowVisible
      hideSparkle
      hideCarousel
      hideContent
      hideDivider
      title="Online payments"
      customContent={
        <div className="flex min-h-0 flex-1 flex-col px-6 pb-5">
          <OnlinePaymentsNoServiceBody />
        </div>
      }
    />
  );
}

function SalesDashboard() {
  const { region } = useRegion();
  const [isCustomising, setIsCustomising] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [onlinePaymentsMode, setOnlinePaymentsMode] = useState<OnlinePaymentsMode>("stripe");
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [configureDraft, setConfigureDraft] = useState<OnlinePaymentsMode>("stripe");
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [searchDocType, setSearchDocType] = useState<"invoices" | "quotes">("invoices");
  const [unsentOnly, setUnsentOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const createMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!createMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (createMenuRef.current && !createMenuRef.current.contains(e.target as Node)) {
        setCreateMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [createMenuOpen]);

  useEffect(() => {
    if (configureModalOpen) setConfigureDraft(onlinePaymentsMode);
  }, [configureModalOpen, onlinePaymentsMode]);

  const widgetImage = useMemo(() => {
    switch (region) {
      case "AU":
      case "NZ":
        return WidgetsAU;
      case "UK":
        return WidgetsUK;
      case "USA":
      case "CA":
      default:
        return WidgetsCA;
    }
  }, [region]);

  function WidgetComponent({
    config,
    onlinePaymentsMode: paymentsMode,
  }: {
    config: WidgetConfig;
    onlinePaymentsMode: OnlinePaymentsMode;
  }) {
    const { isCustomising: customising } = useContext(CustomizationContext);
    const commonProps = { ...config.props, isCustomising: customising };

    switch (config.type) {
      case "Spotlight":
        return (
          <Spotlight
            {...commonProps}
            hideSparkle
            hideCarousel
            hideContent
            title="Create new"
            customContent={
              <div className="flex flex-col">
                {[
                  { icon: "/icons/Invoice.svg", label: "Invoice", href: "/sales/new-invoice" },
                  { icon: "/icons/PaymentLink.svg", label: "Payment link", href: "#" },
                  { icon: "/icons/Cycle.svg", label: "Repeating invoice", href: "#" },
                ].map((row, i) => (
                  <a
                    key={row.label}
                    href={row.href}
                    className={`flex h-10 items-center gap-2 ${i > 0 ? "border-t border-[#E6E7E9]" : ""} px-3 text-left hover:bg-[#f3f4f5]`}
                  >
                    <img src={row.icon} alt="" className="size-8 shrink-0 object-contain" />
                    <span className="flex-1 text-[13px]/[20px] text-content-primary">{row.label}</span>
                    <span className="flex size-8 shrink-0 items-center justify-center">
                      <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M8 2v12M2 8h12" stroke="#0078C8" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            }
          />
        );
      case "BankRec":
        return <BankRec {...commonProps} />;
      case "Tasks":
        return <Tasks {...commonProps} />;
      case "InvoicesOwed":
        return <InvoicesOwed {...commonProps} />;
      case "BillsToPay":
        return <BillsToPay {...commonProps} title="Money coming in" primaryAmount="612.00" primaryLabel="Due this week" secondaryAmount="891.56" secondaryLabel="Due next week" secondaryLinkStyle evenSplit hideFooter hideOverflow chartVariant="sales" />;
      case "NetProfitLoss":
        return <NetProfitLoss {...commonProps} />;
      case "CashInAndOut":
        return <CashInAndOut {...commonProps} />;
      case "RecentInvoicePayments":
        return <RecentInvoicePayments {...commonProps} />;
      case "ChartOfAccounts":
        return <ChartOfAccounts {...commonProps} />;
      case "ExpensesToReview":
        return (
          <ExpensesToReview
            {...commonProps}
            title="Customers owing the most"
            hideStats
            firstColumnLabel="Customer"
            squareAvatars
            footerLabel="View all statements"
            hideOthersRow
            secondColumnLabel="Due"
            showSortArrow
            thirdColumnLabel="Overdue"
            hideOverflow
            customRows={[
              { initials: "QC", name: "Quantum Consultants", color: "#80bce4", textColor: "#002a46", due: "10,295.00", overdue: "5,995.00", isOverdue: true },
              { initials: "AE", name: "Alana Edwards", color: "#adadf3", textColor: "#202051", due: "4,326.10", overdue: "1,240.60", isOverdue: true },
              { initials: "HSP", name: "Hamilton Smith Pty", color: "#80c19e", textColor: "#002e15", due: "1,320.00", overdue: "0.00" },
              { initials: "PP", name: "Portal project", color: "#80bce4", textColor: "#002a46", due: "1,155.20", overdue: "1,155.20", isOverdue: true },
              { initials: "KJ", name: "Kinnet & Jones", color: "#fdc180", textColor: "#582e00", due: "840.12", overdue: "0.00" },
              { initials: "AW", name: "Abby & Wells", color: "#fdd580", textColor: "#583c00", due: "680.90", overdue: "0.00" },
              { initials: "JD", name: "Jane Doe", color: "#ffb2cb", textColor: "#592335", due: "612.00", overdue: "0.00" },
              { initials: "SSB", name: "Sunny Side Bakery", color: "#9eeefd", textColor: "#154d58", due: "589.50", overdue: "589.50", isOverdue: true },
            ]}
          />
        );
      case "OnlinePayments":
        return (
          <OnlinePaymentsTile
            variant={paymentsMode}
            commonProps={{ ...config.props, isCustomising: customising }}
          />
        );
      case "YourExpenses":
        return <YourExpenses {...commonProps} />;
      default:
        return <div>Unknown widget type</div>;
    }
  }

  const widgets = useMemo(() => {
    return WIDGET_CONFIGS.map((config) => ({
      id: config.id,
      component: (
        <WidgetComponent
          key={config.id === "online-payments" ? `${config.id}-${onlinePaymentsMode}` : config.id}
          config={config}
          onlinePaymentsMode={onlinePaymentsMode}
        />
      ),
      width: config.width,
      height: config.height,
    }));
  }, [onlinePaymentsMode]);

  /** Derive from `widgets` only (no copy + useEffect). A separate widgetOrder state was one frame behind and could keep stale pre-rendered elements after Apply. */
  const filteredWidgets = useMemo(() => {
    return widgets.filter((widget) => {
      if (widget.id === "vat" && region === "USA") {
        return false;
      }
      return true;
    });
  }, [widgets, region]);

  const handleSave = (): void => {
    setIsCustomising(false);
  };

  const closeConfigureModal = () => setConfigureModalOpen(false);

  const applyConfigure = () => {
    setOnlinePaymentsMode(configureDraft);
    setConfigureModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={configureModalOpen}
        onClose={closeConfigureModal}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000A1E]/50 p-4 outline-none"
      >
        <DialogPanel
          className="relative w-full max-w-[440px] rounded-xl border border-[#e1e2e5] bg-white shadow-[0px_8px_24px_rgba(0,10,30,0.15)]"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#e1e2e5] px-5 py-4">
            <h2 className="text-[18px] font-bold text-content-primary">Configure prototype</h2>
            <button
              type="button"
              aria-label="Close"
              className="flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-[#A6A9B0] bg-white text-content-primary hover:bg-[#f5f5f5]"
              onClick={closeConfigureModal}
            >
              <span className="text-xl leading-none" aria-hidden>
                ×
              </span>
            </button>
          </div>
          <div className="px-5 py-4">
            <h3 className="text-[15px] font-bold text-content-primary">Online payments</h3>
            <div className="mt-3 flex flex-row flex-wrap items-center gap-x-8 gap-y-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="configure-online-payments"
                  checked={configureDraft === "stripe"}
                  onChange={() => setConfigureDraft("stripe")}
                  className="size-4 accent-brand-primary"
                />
                <span className="text-[15px] text-content-primary">Stripe</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="configure-online-payments"
                  checked={configureDraft === "no-service"}
                  onChange={() => setConfigureDraft("no-service")}
                  className="size-4 accent-brand-primary"
                />
                <span className="text-[15px] text-content-primary">No service</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#e1e2e5] px-5 py-4">
            <button
              type="button"
              className="inline-flex h-8 items-center rounded-[3px] border border-border-primary bg-white px-4 text-[13px] font-medium text-content-primary hover:bg-[#eff1f2]"
              onClick={closeConfigureModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center rounded-[3px] bg-brand-primary px-4 text-[13px] font-bold text-white hover:bg-[#005fa3]"
              onClick={applyConfigure}
            >
              Apply
            </button>
          </div>
        </DialogPanel>
      </Dialog>

      <button
        type="button"
        aria-label="Configure prototype"
        className="fixed bottom-[20px] right-[20px] z-[90] flex size-10 items-center justify-center rounded-full border border-[#e6e7e9] bg-white shadow-[0_2px_12px_rgba(0,10,30,0.14)] transition hover:bg-[#f7f8f9] hover:shadow-[0_4px_16px_rgba(0,10,30,0.18)]"
        onClick={() => setConfigureModalOpen(true)}
      >
        <img src="/icons/Configure.svg" alt="" width={32} height={32} className="size-8 object-contain" />
      </button>

      <div className="relative z-20 mb-6 bg-white py-4">
        <div className="mx-auto px-4 md:px-5 max-w-full md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-3.5 mb-1 md:mb-0">
            <h1 className="text-[21px]/[26px] font-bold md:text-[24px]/[32px]">
              Sales overview
            </h1>
            <span className="text-[13px]/[20px] text-content-secondary border border-content-secondary rounded-[3px] px-1">
              Prototype
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-border-primary bg-white hover:bg-[#eff1f2]">
              <img src="/icons/Import.svg" alt="Import" className="size-8" />
            </button>
            <button
              type="button"
              onClick={() => setSearchPanelOpen((v) => !v)}
              aria-expanded={searchPanelOpen}
              aria-controls="sales-overview-search-panel"
              className="flex h-8 items-center gap-2 rounded border border-border-primary bg-white px-3 text-[13px]/[16px] font-medium text-content-primary hover:bg-[#eff1f2]"
            >
              <img src="/icons/Search.svg" alt="" className="h-5 w-5" />
              Search
            </button>
            <div className="relative" ref={createMenuRef}>
              <button type="button" className="flex h-8 items-center gap-1.5 rounded bg-[#0078C8] px-4 text-[13px]/[16px] font-bold text-white hover:bg-[#005fa3]" onClick={() => setCreateMenuOpen((v) => !v)}>
                Create
                <img src="/icons/Caret.svg" alt="" className="h-[6px] w-[10px]" />
              </button>
              {createMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[300px] rounded-lg border border-[#e1e2e5] bg-white py-2 shadow-[0px_3px_6px_rgba(0,10,30,0.2)]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  {[
                    { label: "Invoice", href: "/sales/new-invoice" },
                    { label: "Payment link" },
                    { label: "Repeating invoice" },
                  ].map((item) => (
                    <a key={item.label} href={item.href ?? "#"} className="block px-5 py-2.5 text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]" onClick={() => setCreateMenuOpen(false)}>
                      {item.label}
                    </a>
                  ))}
                  <div className="my-1 h-px bg-[#e1e2e5]" />
                  {[
                    { label: "Quote" },
                    { label: "Credit note" },
                  ].map((item) => (
                    <button key={item.label} type="button" className="block w-full px-5 py-2.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]" onClick={() => setCreateMenuOpen(false)}>
                      {item.label}
                    </button>
                  ))}
                  <div className="my-1 h-px bg-[#e1e2e5]" />
                  <div className="px-5 pt-2 pb-1 text-[13px] text-[#8c919a]">Contact group invoices</div>
                  <button type="button" className="flex w-full items-center justify-between px-5 py-2.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]" onClick={() => setCreateMenuOpen(false)}>
                    <span className="flex items-center gap-2">
                      <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Create contact group
                    </span>
                    <svg className="size-4 shrink-0 text-[#8c919a]" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M12 8.5v5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h5M9 2h5v5M7.5 8.5L14 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-border-primary bg-white hover:bg-[#eff1f2]">
              <img src="/icons/Settings.svg" alt="Settings" className="size-8" />
            </button>
          </div>
        </div>
      </div>

      {searchPanelOpen ? (
        <div className="container mx-auto mb-4 overflow-x-auto px-4 md:px-5 scroll-smooth lg:overflow-x-visible lg:px-6">
          <div
            id="sales-overview-search-panel"
            className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {/* Top row: title, radios, actions */}
            <div className="flex flex-wrap items-center gap-3 border-b border-[#C2C4CB] px-4 py-3 md:px-5 md:py-4">
              <h2 className="text-[15px] font-bold text-content-primary md:text-[16px]">Search</h2>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="sales-search-doc-type"
                    checked={searchDocType === "invoices"}
                    onChange={() => setSearchDocType("invoices")}
                    className="size-4 accent-brand-primary"
                  />
                  <span className="text-[15px] text-content-primary">Invoices</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="sales-search-doc-type"
                    checked={searchDocType === "quotes"}
                    onChange={() => setSearchDocType("quotes")}
                    className="size-4 accent-brand-primary"
                  />
                  <span className="text-[15px] text-content-primary">Quotes</span>
                </label>
              </div>
              <div className="ml-auto flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="text-[15px] font-medium text-brand-primary hover:underline"
                  onClick={() => {
                    setSearchDocType("invoices");
                    setUnsentOnly(false);
                    setSearchQuery("");
                  }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="rounded-[3px] bg-brand-primary px-4 py-2 text-[13px] font-bold text-white hover:bg-[#005fa3]"
                >
                  Search
                </button>
                <button
                  type="button"
                  aria-label="Close search"
                  className="flex size-8 shrink-0 items-center justify-center rounded border border-[#A6A9B0] bg-white text-content-primary hover:bg-[#f5f5f5]"
                  onClick={() => setSearchPanelOpen(false)}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    ×
                  </span>
                </button>
              </div>
            </div>
            {/* Bottom row: filters */}
            <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:flex-wrap md:items-end md:gap-4 md:px-5 md:py-5">
              <div className="min-w-0 flex-1 md:basis-[min(100%,48%)] md:max-w-[50%]">
                <label className="mb-1 block text-[13px] text-content-secondary" htmlFor="sales-search-query">
                  Search
                </label>
                <div className="relative">
                  <img
                    src="/icons/Search.svg"
                    alt=""
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-60"
                    aria-hidden
                  />
                  <input
                    id="sales-search-query"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a contact, amount, reference or number"
                    className="h-9 w-full rounded-[3px] border border-[#A6A9B0] bg-white py-2 pl-9 pr-3 text-[13px] text-content-primary placeholder:text-[#8c919a] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
                  />
                </div>
              </div>
              <div className="w-full min-w-[120px] md:w-auto md:flex-1 md:max-w-[140px]">
                <span className="mb-1 block text-[13px] text-content-secondary">Start date</span>
                <button
                  type="button"
                  className="flex h-9 w-full items-center gap-2 rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-left text-[13px] text-content-primary hover:bg-[#f5f5f5]"
                >
                  <img src="/Date-start.svg" alt="" className="size-5 shrink-0" width={20} height={20} />
                </button>
              </div>
              <div className="w-full min-w-[120px] md:w-auto md:flex-1 md:max-w-[140px]">
                <span className="mb-1 block text-[13px] text-content-secondary">End date</span>
                <button
                  type="button"
                  className="flex h-9 w-full items-center gap-2 rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-left text-[13px] text-content-primary hover:bg-[#f5f5f5]"
                >
                  <img src="/Date-end.svg" alt="" className="size-5 shrink-0" width={20} height={20} />
                </button>
              </div>
              <div className="w-full min-w-[140px] md:w-auto md:flex-1 md:max-w-[160px]">
                <label className="mb-1 block text-[13px] text-content-secondary" htmlFor="sales-search-date-type">
                  Date type
                </label>
                <div className="relative">
                  <select
                    id="sales-search-date-type"
                    defaultValue="any"
                    className="h-9 w-full appearance-none rounded-[3px] border border-[#A6A9B0] bg-white py-2 pl-3 pr-8 text-[13px] text-content-primary focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
                  >
                    <option value="any">Any date</option>
                    <option value="issue">Issue date</option>
                    <option value="due">Due date</option>
                  </select>
                  <img
                    src="/icons/Caret.svg"
                    alt=""
                    className="pointer-events-none absolute right-3 top-1/2 h-[6px] w-[10px] -translate-y-1/2 opacity-70"
                    aria-hidden
                  />
                </div>
              </div>
              <div className="flex w-full items-center pb-1 md:w-auto md:flex-none md:self-end">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={unsentOnly}
                    onChange={(e) => setUnsentOnly(e.target.checked)}
                    className="size-4 rounded border-[#A6A9B0] accent-brand-primary"
                  />
                  <span className="text-[15px] text-content-primary">Unsent only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mx-auto overflow-x-auto scroll-smooth lg:overflow-x-visible">
        <div className="mb-2 flex items-center justify-between gap-3 lg:mb-4">
          <div className="flex items-baseline gap-5">
            <h2 className="text-[19px]/[32px] font-bold lg:text-[21px]/[32px]">
              Invoices &amp; payments
            </h2>
            <a href="/sales/invoices" className="text-[15px]/[24px] font-medium text-brand-primary hover:underline">Invoices</a>
            <a href="#" className="text-[15px]/[24px] font-medium text-brand-primary hover:underline">Repeating invoices</a>
            <a href="#" className="text-[15px]/[24px] font-medium text-brand-primary hover:underline">Payment links</a>
            <a href="#" className="text-[15px]/[24px] font-medium text-brand-primary hover:underline">Statements</a>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-5 overflow-x-auto scroll-smooth lg:overflow-x-visible">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-2 lg:grid-cols-4">
          {[
            { label: "Drafts (27)", value: "5,280.50" },
            { label: "Awaiting approval (2)", value: "490.00" },
            { label: "Awaiting payment (52)", value: "28,529.20" },
            { label: "Overdue (3)", value: "736.30", isOverdue: true },
          ].map((metric, i, arr) => (
            <div key={metric.label} className="flex items-center">
              <div className="flex flex-1 flex-col gap-1 px-4 py-3">
                <span className={`text-[13px]/[16px] ${metric.isOverdue ? "text-[#c31230]" : "text-[#404756]"}`}>
                  {metric.label}
                </span>
                <span className="text-[24px]/[28px] font-light text-[#404756]">
                  {metric.value}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden h-full w-px bg-[#ccced2] lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      <CustomizationContext.Provider value={{ isCustomising }}>
        <div className="container mx-auto mb-10 min-h-screen overflow-x-auto scroll-smooth lg:overflow-x-visible">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {filteredWidgets.map((widget) => (
              <div
                key={
                  widget.id === "online-payments"
                    ? `online-payments-${onlinePaymentsMode}`
                    : widget.id
                }
                className={`relative ${widget.height === 522 ? "lg:row-span-2" : ""}`}
              >
                {widget.component}
              </div>
            ))}
          </div>
        </div>
      </CustomizationContext.Provider>
    </>
  );
}

export function SalesOverviewMount() {
  return (
    <RobbShell>
      <SalesDashboard />
    </RobbShell>
  );
}
