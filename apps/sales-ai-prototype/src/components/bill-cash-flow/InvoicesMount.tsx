"use client";

import { useState } from "react";
import { RobbShell } from "@/components/prototype-shell/RobbShell";

const TABS = [
  { label: "All", count: null, active: true },
  { label: "Draft", count: 2 },
  { label: "Awaiting Approval", count: 0 },
  { label: "Awaiting Payment", count: 9 },
  { label: "Paid", count: null },
  { label: "Repeating", count: null },
];

const TOOLBAR = [
  { label: "New Repeating Invoice" },
  { label: "New Credit Note" },
  { label: "Send Statements" },
  { label: "Import" },
  { label: "Export" },
];

const INVOICES = [
  { number: "INV-0028", ref: "GB1-White", to: "Bayside Club", date: "30 Dec 2025", due: "18 Jan 2026", paid: "0.00", owing: "234.00", status: "Awaiting Payment", sent: "" },
  { number: "INV-0027", ref: "Ref MK815", to: "Marine Systems", date: "30 Dec 2025", due: "5 Jan 2026", paid: "0.00", owing: "396.00", status: "Awaiting Payment", sent: "" },
  { number: "INV-0026", ref: "", to: "Basket Case", date: "30 Dec 2025", due: "9 Jan 2026", paid: "0.00", owing: "914.55", status: "Awaiting Payment", sent: "" },
  { number: "INV-0030", ref: "Monthly support", to: "Rex Media Group", date: "29 Dec 2025", due: "13 Jan 2026", paid: "0.00", owing: "550.00", status: "Draft", sent: "" },
  { number: "INV-0029", ref: "Monthly support", to: "Hamilton Smith Ltd", date: "29 Dec 2025", due: "13 Jan 2026", paid: "0.00", owing: "550.00", status: "Draft", sent: "" },
  { number: "INV-0024", ref: "P/O 9711", to: "City Limousines", date: "25 Dec 2025", due: "9 Jan 2026", paid: "0.00", owing: "703.63", status: "Awaiting Payment", sent: "Sent" },
  { number: "CN-0015", ref: "Monthly Support", to: "Hamilton Smith Ltd", date: "10 Dec 2025", due: "", paid: "", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0025", ref: "P/O CRM08-12", to: "Ridgeway University", date: "9 Dec 2025", due: "30 Dec 2025", paid: "0.00", owing: "6,187.50", status: "Awaiting Payment", sent: "Sent" },
  { number: "CN-0023", ref: "Yr Ref W08-143", to: "DIISR - Small Business Services", date: "5 Dec 2025", due: "", paid: "", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0022", ref: "Yr Ref W08-143", to: "DIISR - Small Business Services", date: "30 Nov 2025", due: "10 Dec 2025", paid: "216.50", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0021", ref: "Monthly Support", to: "Rex Media Group", date: "30 Nov 2025", due: "10 Dec 2025", paid: "541.25", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0020", ref: "Monthly Support", to: "Port & Philip Freight", date: "30 Nov 2025", due: "10 Dec 2025", paid: "541.25", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0019", ref: "Monthly Support", to: "Young Bros Transport", date: "30 Nov 2025", due: "10 Dec 2025", paid: "541.25", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0018", ref: "Monthly Support", to: "Hamilton Smith Ltd", date: "30 Nov 2025", due: "10 Dec 2025", paid: "541.25", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0016", ref: "Yr Ref W08-143", to: "DIISR - Small Business Services", date: "20 Nov 2025", due: "30 Nov 2025", paid: "568.31", owing: "270.63", status: "Awaiting Payment", sent: "Sent" },
  { number: "INV-0017", ref: "Book", to: "City Limousines", date: "18 Nov 2025", due: "28 Nov 2025", paid: "0.00", owing: "21.70", status: "Awaiting Payment", sent: "Sent" },
  { number: "INV-0013", ref: "Training", to: "Boom FM", date: "18 Nov 2025", due: "30 Nov 2025", paid: "1,082.50", owing: "0.00", status: "Paid", sent: "" },
  { number: "CN-0014", ref: "Training", to: "Boom FM", date: "18 Nov 2025", due: "", paid: "", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0012", ref: "P/O 9711", to: "City Limousines", date: "15 Nov 2025", due: "25 Nov 2025", paid: "0.00", owing: "216.50", status: "Awaiting Payment", sent: "Sent" },
  { number: "INV-0011", ref: "Portal Proj", to: "Petrie McLoud Watson & Associates", date: "13 Nov 2025", due: "30 Nov 2025", paid: "1,407.25", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0009", ref: "P/O CRM08-12", to: "Ridgeway University", date: "8 Nov 2025", due: "30 Nov 2025", paid: "6,187.50", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0010", ref: "Training", to: "Boom FM", date: "7 Nov 2025", due: "20 Nov 2025", paid: "", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0007", ref: "Workshop", to: "City Agency", date: "2 Nov 2025", due: "13 Nov 2025", paid: "593.23", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0008", ref: "Training", to: "Bank West", date: "1 Nov 2025", due: "12 Nov 2025", paid: "1,299.00", owing: "0.00", status: "Paid", sent: "" },
  { number: "INV-0005", ref: "Monthly Support", to: "Hamilton Smith Ltd", date: "31 Oct 2025", due: "10 Nov 2025", paid: "0.00", owing: "0.00", status: "Paid", sent: "" },
];

const toolbarBtn = "inline-flex h-[29px] items-center justify-center rounded-[3px] border border-[#cfd2d4] bg-gradient-to-b from-white to-[#e6eaec] px-[7px] text-[12px] font-bold text-[#048fc2] hover:shadow-[inset_0_0_0_100px_rgba(0,0,0,0.04)]";

function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-[#eee]">
      <div className="border-b border-[#dadddf] bg-gradient-to-b from-white to-[#f8f8f8]">
        <div className="mx-auto w-[930px] pt-4">
          <div className="flex items-center text-[11px]">
            <a href="/sales" className="text-[#048fc2] hover:underline">Sales overview</a>
            <span className="ml-1.5 text-[#333]">›</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-bold leading-normal text-[#515151]">Invoices</h1>
            <span className="text-[13px]/[20px] text-content-secondary border border-content-secondary rounded-[3px] px-1">Prototype</span>
          </div>

          <div className="flex flex-wrap items-center gap-[5px] border-t border-[#eaeaea] pt-[11px] pb-[28px]">
            <div className="flex">
              <a href="/sales/new-invoice" className={`${toolbarBtn} rounded-r-none border-r-0`}>
                <span className="px-[5px]">New Invoice</span>
              </a>
              <button type="button" className={`${toolbarBtn} w-[25px] rounded-l-none border-l border-l-[#ddd] px-0`} aria-label="New Invoice options">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z" fill="#048fc2" />
                </svg>
              </button>
            </div>
            {TOOLBAR.map((btn) => (
              <button key={btn.label} type="button" className={toolbarBtn}>
                {btn.label}
              </button>
            ))}
            <button type="button" className={toolbarBtn}>
              <span className="mr-1.5 inline-block size-2 rounded-full bg-[#ccc]" />
              Invoice Reminders: Off
            </button>
            <button type="button" className={toolbarBtn}>
              Online Payments
            </button>
          </div>

          <div className="flex">
            {TABS.map((tab, index) => {
              const isActive = activeTab === tab.label;
              const isLast = index === TABS.length - 1;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-baseline gap-0.5 border-l border-t px-4 py-3 text-[14px] leading-[18px] ${isLast ? "border-r" : ""} ${
                    isActive
                      ? "border-[#ddd] bg-white text-black -mb-px border-b border-b-white"
                      : "border-[#ddd] -mb-px border-b border-b-[#eee] text-[#048fc2] hover:text-[#036fa0]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className="text-[11px] leading-[14px]">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white pt-5">
        <div className="mx-auto w-[1320px] pb-5">
          <div className="rounded border border-[#ddd] bg-white">
            <div className="flex items-center justify-end gap-3 border-b border-[#ddd] bg-[#fafafa] px-3 py-[7px]">
              <span className="text-[12px] text-[#666]">30 items</span>
              <button type="button" className={toolbarBtn}>
                Search
              </button>
            </div>

            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="h-[30px] border-b border-[#ddd] bg-gradient-to-b from-white to-[#fafafa] text-[12px] font-bold">
                  <th className="border-r border-[#ddd] px-2 text-left text-[#048fc2]">Number</th>
                  <th className="border-r border-[#ddd] px-2 text-left text-[#048fc2]">Ref</th>
                  <th className="w-[30px] border-r border-[#ddd] px-1" />
                  <th className="border-r border-[#ddd] px-2 text-left text-[#048fc2]">To</th>
                  <th className="border-r border-[#ddd] px-2 text-left text-[#048fc2]">
                    Date <span className="text-[10px] font-normal text-black">▼</span>
                  </th>
                  <th className="border-r border-[#ddd] px-2 text-left text-[#048fc2]">Due Date</th>
                  <th className="border-r border-[#ddd] px-2 text-right text-[#048fc2]">Paid</th>
                  <th className="border-r border-[#ddd] px-2 text-right text-[#048fc2]">Due</th>
                  <th className="border-r border-[#ddd] px-2 text-left text-[#048fc2]">Status</th>
                  <th className="px-2 text-left text-[#048fc2]">Sent</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr key={inv.number + inv.ref} className="border-b border-[#eee] hover:bg-[#f5f7f7]">
                    <td className="px-2 py-[6px]">
                      <a href="#" className="text-[#048fc2] hover:underline">{inv.number}</a>
                    </td>
                    <td className="px-2 py-[6px] text-[#333]">{inv.ref}</td>
                    <td className="px-1 py-[6px] text-center">
                      <input type="checkbox" className="size-3.5 accent-[#048fc2]" />
                    </td>
                    <td className="px-2 py-[6px]">
                      <a href="#" className="text-[#048fc2] hover:underline">{inv.to}</a>
                    </td>
                    <td className="px-2 py-[6px] text-[#333]">{inv.date}</td>
                    <td className="px-2 py-[6px] text-[#333]">{inv.due}</td>
                    <td className="px-2 py-[6px] text-right text-[#333]">{inv.paid}</td>
                    <td className="px-2 py-[6px] text-right text-[#333]">{inv.owing}</td>
                    <td className="px-2 py-[6px] text-[#333]">{inv.status}</td>
                    <td className="px-2 py-[6px]">
                      {inv.sent && <span className="text-[#048fc2]">{inv.sent}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-[#ddd] px-3 py-2 text-[12px] text-[#333]">
              <div className="flex items-center gap-1">
                <span>Page</span>
                <input type="text" defaultValue="1" className="w-6 rounded border border-[#ccc] px-1 py-0.5 text-center text-[12px]" />
                <span>of 2 (30 total items)</span>
                <span className="ml-3">Showing</span>
                <input type="text" defaultValue="25" className="w-7 rounded border border-[#ccc] px-1 py-0.5 text-center text-[12px]" />
                <span>items per page</span>
              </div>
              <div className="flex items-center gap-2 text-[#048fc2]">
                <span className="font-bold text-black">1</span>
                <a href="#" className="hover:underline">2</a>
                <a href="#" className="hover:underline">Next ›</a>
                <a href="#" className="hover:underline">End »</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesMount() {
  return (
    <RobbShell>
      <InvoicesPage />
    </RobbShell>
  );
}
