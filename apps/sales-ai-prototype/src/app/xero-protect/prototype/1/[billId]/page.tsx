"use client";

import Link from "next/link";
import { use, useState } from "react";
import { CheckCircle2, AlertTriangle, Send, ShieldCheck } from "lucide-react";
import {
  getAverageSafetyShieldBillAmount,
  getSafetyShieldBillById,
} from "@/data/safety-shield";
import {
  SafetyShieldChrome,
  formatCurrency,
} from "@/components/xero-protect/SafetyShieldChrome";

const BILLS_BASE = "/xero-protect/prototype/1";

/* ── helpers ── */
function fmtDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-NZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtNum(n: number) {
  return n.toLocaleString("en-NZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ── risk flags (mirrors the list page) ── */
const DETAIL_RISK_FLAGS: Record<
  string,
  { label: string; reason: string }
> = {
  "2": {
    label: "Possible dupe",
    reason:
      "This invoice from City Power Co closely matches BILL-008 (same supplier, similar amount) dated 10 Feb 2026. Review both invoices before authorising to avoid duplicate payment.",
  },
  "6": {
    label: "Unusual amount",
    reason:
      "This payment is 120% higher than your average ($3,800) for Paper Plus Ltd over the past 12 months. Verify the invoice amount before authorising.",
  },
  "10": {
    label: "Bank # changed",
    reason:
      "The bank account for TechSupply Direct was changed on 12 Feb 2026 — just 2 days before this bill was submitted. Confirm the new bank details directly with the supplier.",
  },
};

/* ── page ── */
export default function XeroProtectBillDetailPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const [actionTaken, setActionTaken] = useState<
    "approved" | "review" | null
  >(null);
  const resolvedParams = use(params);
  const bill = getSafetyShieldBillById(resolvedParams.billId);

  const breadcrumb = [
    { label: "Prototypes", href: "/xero-protect/prototype" },
    { label: "Prototype 1", href: BILLS_BASE },
  ];

  if (!bill) {
    return (
      <SafetyShieldChrome breadcrumb={breadcrumb} pageTitle="Bills">
        <div className="px-4 py-8">
          <div className="bg-white rounded border border-[#e1e2e5] p-8">
            <p className="text-[15px] font-semibold text-[#0a0a0a]">
              Bill not found.
            </p>
            <Link
              href={BILLS_BASE}
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#1c52de]"
            >
              &larr; Back to bills
            </Link>
          </div>
        </div>
      </SafetyShieldChrome>
    );
  }

  const riskFlag = DETAIL_RISK_FLAGS[bill.id];
  const isFlagged = !!(riskFlag || bill.aiFlagged);
  const flagLabel = riskFlag?.label ?? "Risk flagged";
  const flagReason = riskFlag?.reason ?? bill.aiReason ?? "";

  const averageAmount = getAverageSafetyShieldBillAmount();
  const percentHigher = Math.round(
    ((bill.amount - averageAmount) / averageAmount) * 100
  );
  const statusLabel = bill.status.replace(/_/g, " ");
  const statusCapital =
    statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1);

  return (
    <SafetyShieldChrome breadcrumb={breadcrumb} pageTitle="Bills">
      <div
        className="min-h-[calc(100vh-10rem)]"
        style={{
          background:
            "linear-gradient(180deg, #fff 0%, #f8f8f8 100%)",
        }}
      >
        <div
          className="border-b border-[#dadddf] px-6 pt-2.5 pb-px"
          style={{
            background:
              "linear-gradient(180deg, #fff 0%, #f8f8f8 100%)",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: 970, paddingLeft: 20 }}>
            <p className="text-[11px] leading-normal">
              <Link
                href={BILLS_BASE}
                className="text-[#048fc2] hover:underline"
              >
                Purchases overview
              </Link>
              <span className="text-[#333]"> &rsaquo; </span>
              <Link
                href={BILLS_BASE}
                className="text-[#048fc2] hover:underline"
              >
                Bills to pay
              </Link>
              <span className="text-[#333]"> &rsaquo; </span>
            </p>
            <h1
              className="text-[24px] text-[#515151] leading-normal overflow-hidden"
              style={{ fontWeight: 700 }}
            >
              Bill {bill.billNumber}
            </h1>
          </div>
        </div>

        <div className="mx-auto py-5" style={{ maxWidth: 1202, paddingLeft: 263 - 263, paddingRight: 0 }}>
          <div className="mx-auto" style={{ maxWidth: 1202 }}>

            {isFlagged && !actionTaken && (
              <div className="mb-4 rounded-[3px] border border-[#dc3246] bg-[#fde7e9] overflow-hidden">
                <div className="p-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-[#c31230] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-bold text-[#1e3145]">
                        ⚑ {flagLabel}
                      </p>
                      <p className="text-[13px] text-[#424f60] mt-1">
                        {flagReason}
                      </p>
                      <div className="flex gap-5 mt-2 text-[12px] text-[#444]">
                        <span>
                          Average bill:{" "}
                          <strong>{formatCurrency(averageAmount)}</strong>
                        </span>
                        <span>
                          This bill:{" "}
                          <strong>{formatCurrency(bill.amount)}</strong>
                        </span>
                        {percentHigher > 0 && (
                          <span className="text-[#c31230] font-semibold">
                            +{percentHigher}% higher
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActionTaken("approved")}
                      className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#5cac00] px-4 h-[30px] text-[12px] font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(180deg, #7bd000 0%, #6bb101 100%)",
                      }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve anyway
                    </button>
                    <button
                      type="button"
                      onClick={() => setActionTaken("review")}
                      className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#cfd2d4] px-4 h-[30px] text-[12px] font-bold text-[#048fc2]"
                      style={{
                        background:
                          "linear-gradient(180deg, #fff 0%, #e6eaec 100%)",
                      }}
                    >
                      <Send className="h-3.5 w-3.5" />
                      Request review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {actionTaken && (
              <div className="mb-4 rounded-[3px] border border-[#5cac00] bg-[#edf9d8] p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#5cac00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-bold text-[#333]">
                      {actionTaken === "approved"
                        ? "Bill approved"
                        : "Review requested"}
                    </p>
                    <p className="mt-1 text-[12px] text-[#666]">
                      {actionTaken === "approved"
                        ? `${bill.billNumber} has been approved for payment despite the risk flag.`
                        : `A review request has been sent for ${bill.billNumber}. The approver will be notified.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-[#ddd] rounded-t-[3px]">
              <div className="flex items-center justify-between h-[53px] px-3">
                <span className="text-[12px] font-bold text-[#999] uppercase tracking-wide">
                  {statusCapital}
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    className="rounded-[3px] border border-[#cfd2d4] px-3 h-[30px] text-[12px] font-bold text-[#048fc2]"
                    style={{
                      background:
                        "linear-gradient(180deg, #fff 0%, #e6eaec 100%)",
                    }}
                  >
                    Print PDF
                  </button>
                  <button
                    className="rounded-[3px] border border-[#cfd2d4] px-3 h-[30px] text-[12px] font-bold text-[#048fc2]"
                    style={{
                      background:
                        "linear-gradient(180deg, #fff 0%, #e6eaec 100%)",
                    }}
                  >
                    Bill Options ▾
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] border-l border-r border-b border-[#ddd]">
              <div className="px-3 pt-[30px] pb-5">
                <div className="flex gap-0">
                  <div className="min-w-[112px]">
                    <p className="text-[12px] font-bold text-[#444]">From</p>
                    <p className="mt-1.5 text-[12px] text-[#048fc2]">
                      {bill.supplier}
                    </p>
                    <p className="text-[12px] text-[#333] italic">No address</p>
                    <p className="text-[12px] text-[#048fc2]">Add address</p>
                  </div>

                  <div className="min-w-[78px]">
                    <p className="text-[12px] font-bold text-[#444]">Date</p>
                    <p className="mt-1.5 text-[12px] text-[#333]">
                      {fmtDate(bill.issueDate)}
                    </p>
                  </div>

                  <div className="min-w-[78px]">
                    <p className="text-[12px] font-bold text-[#444]">
                      Due Date
                    </p>
                    <p className="mt-1.5 text-[12px] text-[#333]">
                      {fmtDate(bill.dueDate)}
                    </p>
                  </div>

                  <div className="min-w-[70px]">
                    <p className="text-[12px] font-bold text-[#444]">
                      Reference
                    </p>
                    <p className="mt-1.5 text-[12px] text-[#333]">
                      {bill.billNumber}
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="text-right">
                    <p className="text-[12px] font-bold text-[#444]">Total</p>
                    <p className="mt-1.5 text-[12px] text-[#333]">
                      {fmtNum(bill.total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e1e1e1] px-3 pt-3 pb-3 text-right text-[12px] text-[#444]">
                Amounts are <strong>Tax Exclusive</strong>
              </div>

              <div className="mx-2.5 mb-4 border border-[#ddd]">
                <table
                  className="w-full text-[12px] text-[#444]"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr
                      style={{
                        background:
                          "linear-gradient(180deg, #fff 0%, #fafafa 100%)",
                      }}
                    >
                      {[
                        "Item Code",
                        "Description",
                        "Quantity",
                        "Unit Price",
                        "Account",
                        "Tax Rate",
                      ].map((h) => (
                        <th
                          key={h}
                          className="border border-[#ddd] px-2 py-2 text-left font-normal"
                        >
                          {h}
                        </th>
                      ))}
                      <th className="border border-[#ddd] px-2 py-2 text-right font-normal">
                        Amount NZD
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.lineItems.map((item, i) => (
                      <tr key={i} className="bg-white">
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5">
                          {bill.billNumber}
                        </td>
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5">
                          {item.description}
                        </td>
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5">
                          {fmtNum(item.quantity)}
                        </td>
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5">
                          {fmtNum(item.unitPrice)}
                        </td>
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5">
                          {item.account}
                        </td>
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5">
                          {item.taxRate}% GST on Expenses
                        </td>
                        <td className="border-b border-r border-[#e1e1e1] px-2.5 py-2.5 text-right">
                          {fmtNum(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end px-3 pb-6">
                <div style={{ width: 395 }}>
                  <div className="flex justify-between py-1 text-[12px] text-[#444]">
                    <span className="text-right" style={{ width: 250 }}>
                      Subtotal
                    </span>
                    <span style={{ width: 145 }} className="text-right">
                      {fmtNum(bill.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 text-[12px] text-[#444]">
                    <span className="text-right" style={{ width: 250 }}>
                      Total GST {bill.lineItems[0]?.taxRate ?? 10}%
                    </span>
                    <span style={{ width: 145 }} className="text-right">
                      {fmtNum(bill.tax)}
                    </span>
                  </div>
                  <div className="border-t border-black border-b-[3px] mt-1 pt-2 pb-2 flex justify-between items-baseline">
                    <span
                      className="text-[24px] text-[#444] text-right"
                      style={{ width: 250, fontWeight: 700 }}
                    >
                      TOTAL
                    </span>
                    <span
                      className="text-[24px] text-[#444] text-right"
                      style={{ width: 145, fontWeight: 700 }}
                    >
                      {fmtNum(bill.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[#f5f5f5] border border-[#ddd] rounded-[3px] p-2.5">
              <p className="text-[12px] font-bold text-[#333] mb-3">
                Make a payment
              </p>
              <div className="flex items-end gap-3">
                <div>
                  <label className="block text-[12px] text-[#444] mb-1">
                    Amount Paid
                  </label>
                  <input className="h-[27px] w-[104px] border border-[#ddd] bg-white px-2 text-[12px]" />
                </div>
                <div>
                  <label className="block text-[12px] text-[#444] mb-1">
                    Date Paid
                  </label>
                  <input className="h-[27px] w-[114px] border border-[#bdbfc3] bg-white px-2 text-[12px]" />
                </div>
                <div>
                  <label className="block text-[12px] text-[#444] mb-1">
                    Paid From
                  </label>
                  <select className="h-[27px] w-[159px] border border-[#bdbfc3] bg-white px-2 text-[12px]">
                    <option />
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] text-[#444] mb-1">
                    Reference
                  </label>
                  <input className="h-[27px] w-[104px] border border-[#ddd] bg-white px-2 text-[12px]" />
                </div>
                <button
                  className="rounded-[3px] border border-[#5cac00] h-[30px] px-4 text-[12px] font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(180deg, #7bd000 0%, #6bb101 100%)",
                  }}
                >
                  Add Payment
                </button>
              </div>
            </div>

            <div className="mt-6 mb-8">
              <p className="text-[12px] font-bold text-[#666] mb-2">
                History &amp; Notes
              </p>
              <div className="border-t border-b border-[#e3e3e3] py-2.5">
                <p className="text-[12px] text-[#999]">
                  Created on {fmtDate(bill.issueDate)}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="rounded-[3px] border border-[#cfd2d4] px-3 h-[30px] text-[12px] font-bold text-[#048fc2]"
                  style={{
                    background:
                      "linear-gradient(180deg, #fff 0%, #e6eaec 100%)",
                  }}
                >
                  Show History
                </button>
                <button
                  className="rounded-[3px] border border-[#cfd2d4] px-3 h-[30px] text-[12px] font-bold text-[#048fc2]"
                  style={{
                    background:
                      "linear-gradient(180deg, #fff 0%, #e6eaec 100%)",
                  }}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SafetyShieldChrome>
  );
}
