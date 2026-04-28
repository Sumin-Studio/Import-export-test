"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { OnlinePaymentsHistoryNotes } from "@/components/bill-cash-flow/OnlinePaymentsHistoryNotes";

const TABS = [
  { id: "methods", label: "Payment methods", href: "/settings/online-payments" },
  { id: "defaults", label: "Default settings", href: "/settings/online-payments/default-settings", active: true },
  { id: "connected", label: "Connected services", href: "/settings/online-payments/connected-services" },
  { id: "add-service", label: "Add a new service", href: "/settings/online-payments?tab=add-service" },
] as const;

export function DefaultSettingsMount() {
  return (
    <RobbShell showPreviewBanner>
      <div
        className="min-h-screen bg-[#f2f3f4]"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {/* Title bar — 62px; same as Online payments */}
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
                const isActive = tab.active === true;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
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
          <div className="flex flex-col gap-6">
            {/* Card 1: Pass on processing fees */}
            <div className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white">
              <div className="flex flex-col gap-6 px-[30px] pt-[24px] pb-[24px] md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="min-w-0 flex-1">
                  <h2 className="text-[18px] font-bold leading-tight text-content-primary">
                    Pass on processing fees
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#000A1E]">
                    Automatically cover card processing fees by adding a surcharge directly to your
                    customer&apos;s invoice with Stripe.
                  </p>
                  <button
                    type="button"
                    className="mt-[22px] inline-flex h-9 items-center gap-2 rounded-[3px] bg-brand-primary px-4 text-[14px] font-bold text-white hover:bg-[#005fa3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
                  >
                    <img
                    src="/icons/Lock.svg"
                    alt=""
                    className="size-8 shrink-0 brightness-0 invert"
                    width={32}
                    height={32}
                    aria-hidden
                  />
                    Complete Stripe set up to access
                  </button>
                </div>
                <div className="flex shrink-0 justify-center md:w-[161px]">
                  <img
                    src="/pass-on-processing-fees.svg"
                    alt=""
                    className="h-auto w-full max-w-[161px] object-contain"
                    width={161}
                    height={113}
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Customers can schedule payment */}
            <div className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white">
              <div className="flex flex-col gap-6 px-[30px] pt-[24px] pb-[24px] md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[18px] font-bold leading-tight text-content-primary">
                      Customers can schedule payment
                    </h2>
                    <span className="rounded-[3px] bg-[#000A1E] px-1.5 py-0.5 text-[11px] font-bold leading-tight text-white">
                      New
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#000A1E]">
                    Improve cash flow predictability by allowing customers to schedule an invoice
                    payment on or before the due date with Stripe.
                  </p>
                  <a
                    href="#"
                    className="mt-2 inline-flex items-center gap-1 text-[15px] font-medium text-brand-primary underline hover:no-underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn more about scheduled payments
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                  <div className="mt-2" aria-hidden />
                  <button
                    type="button"
                    className="mt-[14px] inline-flex h-9 items-center gap-2 rounded-[3px] bg-brand-primary px-4 text-[14px] font-bold text-white hover:bg-[#005fa3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
                  >
                    <img
                    src="/icons/Lock.svg"
                    alt=""
                    className="size-8 shrink-0 brightness-0 invert"
                    width={32}
                    height={32}
                    aria-hidden
                  />
                    Complete Stripe set up to access
                  </button>
                </div>
                <div className="flex shrink-0 justify-center md:w-[181px]">
                  <img
                    src="/customers-can-schedule.svg"
                    alt=""
                    className="h-auto w-full max-w-[181px] object-contain"
                    width={181}
                    height={127}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>

          <OnlinePaymentsHistoryNotes />
        </div>
      </div>
    </RobbShell>
  );
}
