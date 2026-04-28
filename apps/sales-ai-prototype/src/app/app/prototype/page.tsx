"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Bill = {
  id: string;
  supplier: string;
  amountDue: number;
  currencyCode: string;
  dueDate: string;
  risk: "low" | "medium" | "high";
  status: "ready" | "missing_info";
};

type PlanItem = {
  id: string;
  supplier: string;
  amountDue: number;
  dueDate: string;
  recommendedAction: "pay_now" | "schedule" | "hold";
  recommendedDate: string;
  reason: string;
};

type PlanResponse = {
  planId: string;
  generatedAt: string;
  cashOnHand: number;
  totalBills: number;
  totalAmountDue: number;
  recommendedNowAmount: number;
  recommendedLaterAmount: number;
  items: PlanItem[];
};

const demoBills: Bill[] = [
  {
    id: "B-203",
    supplier: "Bright Freight",
    amountDue: 1240,
    currencyCode: "GBP",
    dueDate: "2026-02-18",
    risk: "high",
    status: "ready",
  },
  {
    id: "B-341",
    supplier: "Northside Office Supplies",
    amountDue: 420,
    currencyCode: "GBP",
    dueDate: "2026-02-20",
    risk: "low",
    status: "ready",
  },
  {
    id: "B-188",
    supplier: "Crown Utilities",
    amountDue: 980,
    currencyCode: "GBP",
    dueDate: "2026-02-19",
    risk: "medium",
    status: "ready",
  },
  {
    id: "B-955",
    supplier: "Euro Components GmbH",
    amountDue: 760,
    currencyCode: "EUR",
    dueDate: "2026-02-22",
    risk: "medium",
    status: "missing_info",
  },
  {
    id: "B-741",
    supplier: "Wellington Logistics",
    amountDue: 1650,
    currencyCode: "GBP",
    dueDate: "2026-02-26",
    risk: "high",
    status: "ready",
  },
];

function badgeClassForAction(action: PlanItem["recommendedAction"]) {
  if (action === "pay_now") return "bg-emerald-100 text-emerald-800";
  if (action === "schedule") return "bg-blue-100 text-blue-800";
  return "bg-amber-100 text-amber-800";
}

function labelForAction(action: PlanItem["recommendedAction"]) {
  if (action === "pay_now") return "Pay now";
  if (action === "schedule") return "Schedule";
  return "Hold";
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
}

function daysUntil(dateIso: string) {
  const now = new Date();
  const due = new Date(dateIso);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function scoreBill(bill: Bill) {
  const dueScore = Math.max(0, 14 - daysUntil(bill.dueDate));
  const riskScore = bill.risk === "high" ? 6 : bill.risk === "medium" ? 3 : 1;
  const statusPenalty = bill.status === "missing_info" ? -10 : 0;
  return dueScore + riskScore + statusPenalty;
}

function generatePlanClientSide(bills: Bill[], cash: number): PlanResponse {
  const prioritized = [...bills].sort((a, b) => scoreBill(b) - scoreBill(a));
  let remainingCash = cash;
  const items: PlanItem[] = prioritized.map((bill) => {
    if (bill.status === "missing_info") {
      return {
        id: bill.id,
        supplier: bill.supplier,
        amountDue: bill.amountDue,
        dueDate: bill.dueDate,
        recommendedAction: "hold",
        recommendedDate: addDays(new Date(), 2),
        reason: "Missing info detected. Hold for review before scheduling payment.",
      };
    }
    if (remainingCash >= bill.amountDue) {
      remainingCash -= bill.amountDue;
      return {
        id: bill.id,
        supplier: bill.supplier,
        amountDue: bill.amountDue,
        dueDate: bill.dueDate,
        recommendedAction: "pay_now",
        recommendedDate: addDays(new Date(), 0),
        reason: "High confidence and enough available cash. Recommend immediate payment.",
      };
    }
    return {
      id: bill.id,
      supplier: bill.supplier,
      amountDue: bill.amountDue,
      dueDate: bill.dueDate,
      recommendedAction: "schedule",
      recommendedDate: addDays(new Date(), 3),
      reason: "Insufficient cash for immediate payment. Schedule to protect runway.",
    };
  });
  const totalAmountDue = bills.reduce((sum, b) => sum + b.amountDue, 0);
  const recommendedNowAmount = items.filter((i) => i.recommendedAction === "pay_now").reduce((sum, i) => sum + i.amountDue, 0);
  const recommendedLaterAmount = items.filter((i) => i.recommendedAction !== "pay_now").reduce((sum, i) => sum + i.amountDue, 0);
  return {
    planId: `demo-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    cashOnHand: cash,
    totalBills: bills.length,
    totalAmountDue,
    recommendedNowAmount,
    recommendedLaterAmount,
    items,
  };
}

export default function PrototypePage() {
  const [cashOnHand, setCashOnHand] = useState(3200);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlanResponse | null>(null);

  const totalDue = useMemo(
    () => demoBills.reduce((sum, bill) => sum + bill.amountDue, 0),
    []
  );

  function generatePlan() {
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(generatePlanClientSide(demoBills, cashOnHand));
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">
            ← A2A
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1.15fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Cash-Aware Bill Planner</h1>
          <p className="mt-2 text-sm text-slate-600">
            Final-slide prototype: realistic bills in, recommended payment actions out.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bills</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">{demoBills.length}</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total due</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">GBP {totalDue.toLocaleString()}</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cash on hand</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">GBP {cashOnHand.toLocaleString()}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Adjust cash</span>
              <input
                type="number"
                min={0}
                value={cashOnHand}
                onChange={(event) => setCashOnHand(Number(event.target.value) || 0)}
                className="w-44 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-[#1F68DD] focus:ring-2"
              />
            </label>
            <button
              onClick={generatePlan}
              disabled={loading}
              className="rounded-lg bg-[#1F68DD] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1756b8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate payment plan"}
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-100 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Supplier</th>
                  <th className="px-4 py-3 font-semibold">Due</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoBills.map((bill) => (
                  <tr key={bill.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{bill.supplier}</div>
                      <div className="text-xs text-slate-500">{bill.id}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{bill.dueDate}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {bill.currencyCode} {bill.amountDue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          bill.status === "ready"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {bill.status === "ready" ? "Ready" : "Needs review"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recommended plan</h2>
          <p className="mt-2 text-sm text-slate-600">
            Prioritized by due date, risk, and available cash.
          </p>

          {!plan ? (
            <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
              Generate a plan to see recommended payment actions.
            </div>
          ) : (
            <>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-100 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pay now</div>
                  <div className="mt-1 text-xl font-bold text-slate-900">
                    GBP {plan.recommendedNowAmount.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-100 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Schedule later</div>
                  <div className="mt-1 text-xl font-bold text-slate-900">
                    GBP {plan.recommendedLaterAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {plan.items.map((item) => (
                  <li key={item.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{item.supplier}</div>
                        <div className="mt-0.5 text-xs text-slate-500">
                          {item.id} · Due {item.dueDate}
                        </div>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClassForAction(item.recommendedAction)}`}>
                        {labelForAction(item.recommendedAction)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-700">
                      GBP {item.amountDue.toLocaleString()} on {item.recommendedDate}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{item.reason}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
