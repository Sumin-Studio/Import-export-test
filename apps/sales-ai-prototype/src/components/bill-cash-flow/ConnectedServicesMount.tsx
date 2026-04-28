"use client";

import Link from "next/link";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { OnlinePaymentsHistoryNotes } from "@/components/bill-cash-flow/OnlinePaymentsHistoryNotes";

const TABS = [
  { id: "methods", label: "Payment methods", href: "/settings/online-payments" },
  { id: "defaults", label: "Default settings", href: "/settings/online-payments/default-settings" },
  { id: "connected", label: "Connected services", href: "/settings/online-payments/connected-services", active: true },
  { id: "add-service", label: "Add a new service", href: "/settings/online-payments?tab=add-service" },
] as const;

export function ConnectedServicesMount() {
  return (
    <RobbShell showPreviewBanner>
      <div
        className="min-h-screen bg-[#f2f3f4]"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
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
          <div className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white">
            <div className="px-[30px] pt-6 pb-2">
              <h2 className="text-[18px] font-bold leading-tight text-content-primary">Connected payment services</h2>
            </div>

            <div className="overflow-x-auto px-[30px] pb-6">
              <table className="w-full min-w-[640px] border-collapse text-left text-[13px] text-[#000A1E]">
                <thead>
                  <tr className="bg-[#f5f5f5]">
                    <th className="border border-solid border-[#ccced2] px-3 py-3 font-bold text-[#333]">
                      Account name
                    </th>
                    <th className="border border-solid border-[#ccced2] px-3 py-3 font-bold text-[#333]">Service</th>
                    <th className="border border-solid border-[#ccced2] px-3 py-3 font-bold text-[#333]">
                      Branding themes using this service
                    </th>
                    <th className="w-[120px] border border-solid border-[#ccced2] px-3 py-3 text-right font-bold text-[#333]">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-solid border-[#ccced2] align-top px-3 py-4">
                      <div className="font-bold text-[#000A1E]">Akahu Pay by Bank</div>
                    </td>
                    <td className="border border-solid border-[#ccced2] align-top px-3 py-4" />
                    <td className="border border-solid border-[#ccced2] align-top px-3 py-4 text-[13px] text-[#000A1E]">
                      Standard
                    </td>
                    <td className="border border-solid border-[#ccced2] align-top px-3 py-4 text-right">
                      <a
                        href="#"
                        className="text-[13px] font-medium text-brand-primary hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end border-t border-[#e1e2e5] px-[30px] py-5">
              <button
                type="button"
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-[3px] border border-solid border-brand-primary bg-white px-4 text-[13px] font-bold text-brand-primary hover:bg-[#f5f9fc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
              >
                Manage themes
              </button>
            </div>
          </div>

          <OnlinePaymentsHistoryNotes />
        </div>
      </div>
    </RobbShell>
  );
}
