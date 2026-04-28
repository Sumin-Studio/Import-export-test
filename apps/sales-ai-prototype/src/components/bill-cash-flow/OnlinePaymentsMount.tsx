"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Check, ExternalLink } from "lucide-react";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { OnlinePaymentsHistoryNotes } from "@/components/bill-cash-flow/OnlinePaymentsHistoryNotes";

const TABS = [
  { id: "methods", label: "Payment methods" },
  { id: "defaults", label: "Default settings" },
  { id: "connected", label: "Connected services" },
  { id: "add-service", label: "Add a new service" },
] as const;

type MethodRow = {
  id: string;
  title: string;
  titleSuffix?: string;
  subtitle: string;
  action: { type: "button"; label: string } | { type: "status"; label: string };
  icon: React.ReactNode;
};

function StripeCardIcon() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-[3px] bg-[#635BFF] p-1"
      aria-hidden
    >
      <img
        src="/icons/Card.svg"
        alt=""
        className="h-full w-full object-contain brightness-0 invert"
        width={32}
        height={32}
        aria-hidden
      />
    </div>
  );
}

function ApplePayIcon() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-[#635BFF] p-1"
      aria-hidden
    >
      <img
        src="/icons/ApplePay.svg"
        alt=""
        className="h-full w-full object-contain"
        width={35}
        height={22}
        aria-hidden
      />
    </div>
  );
}

function GooglePayIcon() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-[#635BFF] p-1"
      aria-hidden
    >
      <img
        src="/icons/GooglePay.svg"
        alt=""
        className="h-full w-full object-contain"
        width={35}
        height={22}
        aria-hidden
      />
    </div>
  );
}

function LinkIconBrand() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-[#19DFB6] p-1"
      aria-hidden
    >
      <img
        src="/icons/Link.svg"
        alt=""
        className="h-full w-full object-contain"
        width={35}
        height={22}
        aria-hidden
      />
    </div>
  );
}

function KlarnaIcon() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-[3px] bg-[#FFB3C7] text-[10px] font-bold text-[#0a0a0a]"
      aria-hidden
    >
      K
    </div>
  );
}

const CARD_ROWS: MethodRow[] = [
  {
    id: "card",
    title: "Card",
    titleSuffix: "by Stripe",
    subtitle: "Popular globally",
    action: { type: "button", label: "Complete Stripe set up" },
    icon: <StripeCardIcon />,
  },
];

const WALLET_ROWS: MethodRow[] = [
  {
    id: "apple-pay",
    title: "Apple Pay",
    titleSuffix: "by Stripe",
    subtitle: "Popular globally",
    action: { type: "button", label: "Complete Stripe set up" },
    icon: <ApplePayIcon />,
  },
  {
    id: "google-pay",
    title: "Google Pay",
    titleSuffix: "by Stripe",
    subtitle: "Popular globally",
    action: { type: "button", label: "Complete Stripe set up" },
    icon: <GooglePayIcon />,
  },
  {
    id: "link-stripe",
    title: "Link",
    titleSuffix: "by Stripe",
    subtitle: "Popular globally",
    action: { type: "button", label: "Complete Stripe set up" },
    icon: <LinkIconBrand />,
  },
];

const BNPL_ROWS: MethodRow[] = [
  {
    id: "klarna",
    title: "Klarna",
    titleSuffix: "by Stripe",
    subtitle: "Reach customers who want to pay over time",
    action: { type: "button", label: "Complete Stripe set up" },
    icon: <KlarnaIcon />,
  },
];

/** When present, section title icons are 32×32 assets. */
type SectionHeader = {
  headingId: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

function AccordionSectionBlock({
  header,
  rows,
  openId,
  setOpenId,
  showTopRule,
}: {
  header: SectionHeader;
  rows: MethodRow[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
  showTopRule: boolean;
}) {
  return (
    <section aria-labelledby={header.headingId}>
      <div
        className={`border-b border-[#e1e2e5] bg-white px-8 py-8 ${showTopRule ? "border-t border-[#e1e2e5]" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h2 id={header.headingId} className="text-[18px] font-bold leading-tight text-content-primary">
            {header.title}
          </h2>
          {header.icon ? (
            <span className="flex shrink-0 items-center text-content-primary" aria-hidden>
              {header.icon}
            </span>
          ) : null}
        </div>
        <p className="mt-0 text-[15px] leading-6 text-content-primary">{header.description}</p>
      </div>
      <ul className="divide-y divide-[#e1e2e5]">
        {rows.map((row) => {
          const open = openId === row.id;
          return (
            <li key={row.id}>
              <button
                type="button"
                className="group flex w-full items-center gap-3 px-[18px] py-[20px] text-left transition-colors hover:bg-[#F2F3F4]"
                onClick={() => setOpenId(open ? null : row.id)}
                aria-expanded={open}
              >
                <ChevronDown
                  className={`size-[18px] shrink-0 text-content-secondary transition-transform duration-200 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden
                />
                <span className="ml-[12px] shrink-0">{row.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0 leading-tight">
                    <span className="text-[15px] font-bold text-content-primary transition-colors group-hover:text-brand-secondary">
                      {row.title}
                    </span>
                    {row.titleSuffix ? (
                      <span className="text-[13px] font-normal text-content-primary">{row.titleSuffix}</span>
                    ) : null}
                  </div>
                  <p className="text-[13px] leading-snug text-content-secondary">{row.subtitle}</p>
                </div>
                <div
                  className="shrink-0 pl-2"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {row.action.type === "button" ? (
                    <span
                      className="inline-flex min-h-8 items-center justify-center rounded-[3px] bg-brand-primary px-3 py-1.5 text-[13px] font-bold text-white"
                      role="presentation"
                    >
                      {row.action.label}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-content-primary">
                      <span className="flex size-5 items-center justify-center rounded-full bg-[#13B57B]">
                        <Check className="size-3 text-white" strokeWidth={2.5} />
                      </span>
                      {row.action.label}
                    </span>
                  )}
                </div>
              </button>
              {open ? (
                <div
                  className="border-t border-[#e1e2e5] bg-white px-[60px] py-5 text-[15px] leading-relaxed text-[#000A1E]"
                  style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                  {row.titleSuffix?.includes("Stripe") ? (
                    <>
                      <h3 className="mb-2 text-[15px] font-bold text-[#000A1E]">About this payment method</h3>
                      <p className="mb-4 text-[15px] leading-relaxed text-[#000A1E]">
                        Card payments are offered and powered by <strong className="font-semibold text-[#000A1E]">Stripe</strong>.
                        Accept Visa, Mastercard, American Express, Discover, Diners Club, JCB, and China UnionPay payments from
                        customers worldwide.
                      </p>
                      <h3 className="mb-2 text-[15px] font-bold text-[#000A1E]">Pricing</h3>
                      <p className="mb-1 text-[15px] leading-relaxed text-[#000A1E]">
                        1.8% + 0.30 AUD for domestic cards, GST inclusive cost per transaction
                      </p>
                      <p className="mb-3 text-[15px] leading-relaxed text-[#000A1E]">
                        3.5% + 0.30 AUD for international cards, GST inclusive cost per transaction. Additional 2.2% fee
                        inclusive of GST applies if currency conversion is required.
                      </p>
                      <a
                        href="https://stripe.com/pricing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-primary underline hover:no-underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit our Stripe pricing page for more details
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      </a>
                      <p className="mt-4 text-[15px] leading-relaxed text-[#000A1E]">
                        In some jurisdictions, businesses can charge customers a processing fee to recover some costs.
                        It&apos;s your responsibility to comply with surcharging laws.
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#000A1E]">
                        We&apos;ll only show Card as a payment option when the invoice is in a currency the payment option
                        supports.
                      </p>
                    </>
                  ) : (
                    <>
                      Expandable details for {row.title}. In production this would show setup steps, fees, and
                      configuration for this payment method.
                    </>
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function getInitialTab(searchParams: ReturnType<typeof useSearchParams>): (typeof TABS)[number]["id"] {
  const tab = searchParams.get("tab");
  if (tab === "add-service") return tab;
  return "methods";
}

export function OnlinePaymentsMount() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>(() =>
    getInitialTab(searchParams)
  );
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const tabParam = searchParams.get("tab");
  useEffect(() => {
    setActiveTab(tabParam === "add-service" ? "add-service" : "methods");
  }, [tabParam]);

  return (
    <RobbShell showPreviewBanner>
      <div
        className="min-h-screen bg-[#f2f3f4]"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {/* Title bar — 62px; title + Prototype vertically centred; tabs bottom-aligned */}
        <div className="relative z-20 box-border h-[62px] border-b border-[#C2C4CB] bg-white">
          <div className="mx-auto flex h-full max-w-full items-stretch px-4 md:px-5">
            <div className="flex shrink-0 items-center gap-3">
              <h1 className="text-[21px] font-bold leading-tight text-content-primary md:text-[24px]/[28px]">
                Online payments
              </h1>
              <span className="rounded-[3px] border border-content-secondary px-1 text-[13px]/[20px] text-content-secondary">
                Prototype
              </span>
            </div>
            <nav
              className="ml-4 flex h-full min-w-0 flex-1 flex-nowrap items-end justify-start gap-0 overflow-x-auto sm:ml-6"
              aria-label="Online payments sections"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const href =
                  tab.id === "defaults"
                    ? "/settings/online-payments/default-settings"
                    : tab.id === "methods"
                      ? "/settings/online-payments"
                      : tab.id === "connected"
                        ? "/settings/online-payments/connected-services"
                        : `/settings/online-payments?tab=${tab.id}`;
                return (
                  <Link
                    key={tab.id}
                    href={href}
                    className={`inline-flex w-auto shrink-0 justify-center border-b-[3px] px-[20px] py-[18px] text-center text-[15px] leading-5 transition-colors hover:bg-[#F2F2F3] ${
                      isActive
                        ? "border-brand-primary font-normal text-brand-primary"
                        : "border-transparent text-content-primary"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1264px] px-6 pb-16 pt-[20px] md:px-8">
          {activeTab === "methods" ? (
            <>
              <div className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white">
                <AccordionSectionBlock
                  showTopRule={false}
                  header={{
                    headingId: "pay-cards",
                    title: "Cards",
                    description: "Popular for consumers and businesses to pay online.",
                    icon: (
                      <img
                        src="/icons/Card.svg"
                        alt=""
                        className="h-[32px] w-[32px] min-h-[32px] min-w-[32px] shrink-0 object-contain"
                        width={32}
                        height={32}
                      />
                    ),
                  }}
                  rows={CARD_ROWS}
                  openId={openAccordion}
                  setOpenId={setOpenAccordion}
                />
                <AccordionSectionBlock
                  showTopRule
                  header={{
                    headingId: "pay-wallets",
                    title: "Wallets",
                    description:
                      "Improve conversion and reduce fraud on mobile. Customers pay with a stored Card or balance.",
                    icon: (
                      <img
                        src="/icons/Mobile.svg"
                        alt=""
                        className="h-[32px] w-[32px] min-h-[32px] min-w-[32px] shrink-0 object-contain"
                        width={32}
                        height={32}
                      />
                    ),
                  }}
                  rows={WALLET_ROWS}
                  openId={openAccordion}
                  setOpenId={setOpenAccordion}
                />
                <AccordionSectionBlock
                  showTopRule
                  header={{
                    headingId: "pay-bnpl",
                    title: "Buy now, pay later",
                    description:
                      "Reach customers who want to spread the cost over time. You get paid up front in full, minus any fees.",
                  }}
                  rows={BNPL_ROWS}
                  openId={openAccordion}
                  setOpenId={setOpenAccordion}
                />
              </div>

              <OnlinePaymentsHistoryNotes />
            </>
          ) : (
            <div className="rounded-[4px] border border-[#C2C4CB] bg-white p-8 text-center text-[15px] text-content-secondary">
              {activeTab === "add-service"
                ? "Add a new service — prototype placeholder."
                : null}
            </div>
          )}
        </div>
      </div>
    </RobbShell>
  );
}
