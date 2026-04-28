"use client";

import { useMemo, useState } from "react";
import { BookText, ClipboardList, FileWarning, ListChecks } from "lucide-react";

type ScenarioId =
  | "first_time_supplier"
  | "anomalous_amount"
  | "duplicate_exact"
  | "duplicate_fuzzy"
  | "bank_details_recently_changed"
  | "bill_bank_mismatch"
  | "budget_overrun"
  | "po_exceeds"
  | "goods_not_receipted";

type Phase = "alpha" | "beta" | "ga" | "future";

type ScenarioDef = {
  id: ScenarioId;
  title: string;
  phase: Phase;
  contextLines: string[];
  actionLines: string[];
};

type CopyMode = "placeholders" | "examples";

const exampleTokenValues: Record<string, string> = {
  SupplierName: "Acme Supplies Ltd",
  DaysSinceCreated: "5",
  ContactCreatedDate: "03 Apr 2026",
  Currency: "$",
  Amount: "4,250.00",
  Channel: "Email-to-bill",
  BillCreatedDate: "08 Apr 2026",
  OrgMedianBillAmount: "1,950.00",
  NetworkRecognitionDescriptor: "well established and widely paid",
  AvgAmount: "1,800.00",
  NumBills: "14",
  Multiplier: "2.4",
  MaxPriorAmount: "3,100.00",
  NetworkAvgAmount: "1,920.00",
  InvoiceRef: "INV-4021",
  BillDate: "07 Apr 2026",
  ExistingBillCreatedDate: "04 Apr 2026",
  ExistingBillChannel: "Hubdoc",
  ExistingBillStatus: "awaiting payment",
  PaidDate: "05 Apr 2026",
  ExistingRef: "INV4021",
  ExistingAmount: "4,215.00",
  AmountDifference: "$ 35.00",
  ExistingDate: "03 Apr 2026",
  DaysDiff: "4",
  OldAccountSuffix: "4821",
  NewAccountSuffix: "5912",
  UserName: "Jordan Lee",
  ChangeDate: "06 Apr 2026",
  ChangeTime: "2:00 pm",
  AffectedBillCount: "3",
  AffectedTotal: "9,780.00",
  BillAccountSuffix: "5912",
  ContactAccountSuffix: "4821",
  ContactBankLastUpdated: "12 Mar 2026",
  AccountName: "Office Supplies",
  Month: "April",
  BudgetAmount: "15,000.00",
  SpentAmount: "12,850.00",
  SpentPercent: "86",
  ProjectedTotal: "17,100.00",
  PercentOfBudget: "114",
  PORef: "PO-1842",
  POAmount: "8,000.00",
  POApprover: "Mia Chen",
  BillAmount: "9,400.00",
  Overage: "1,400.00",
  OveragePercent: "17.5",
  ItemName: "Laser toner",
  BilledQty: "20",
  Unit: "units",
  ReceivedQty: "12",
  ShortfallQty: "8",
  UnreceivedValue: "1,920.00",
};

function applyExampleTokens(text: string): string {
  return text.replace(/\{([A-Za-z0-9_]+)\}/g, (_, tokenName: string) => {
    return exampleTokenValues[tokenName] ?? `{${tokenName}}`;
  });
}

const scenarioDefs: ScenarioDef[] = [
  {
    id: "first_time_supplier",
    title: "Anomalous: First-time supplier",
    phase: "alpha",
    contextLines: [
      "You have never paid {SupplierName} before. They were added to your contacts {DaysSinceCreated} days ago ({ContactCreatedDate})",
      "This bill is for {Currency} {Amount}, submitted via {Channel} on {BillCreatedDate}",
      "(if amount > 2x org median) This is larger than your typical payment — you usually pay around {Currency} {OrgMedianBillAmount}",
      '(if network data available) This supplier is {NetworkRecognitionDescriptor} across Xero',
    ],
    actionLines: [
      "Call {SupplierName} on a number you already hold to verify this bill is expected and legitimate",
      "If confirmed, dismiss this alert and approve payment",
      "If you suspect fraud, tap Report as suspicious",
    ],
  },
  {
    id: "anomalous_amount",
    title: "Anomalous: Bill value higher than normal",
    phase: "alpha",
    contextLines: [
      "You typically pay {SupplierName} around {Currency} {AvgAmount} (based on {NumBills} prior bills). This bill is {Multiplier}x that",
      "(if prior peak exists) Your largest previous bill from this supplier was {Currency} {MaxPriorAmount}",
      "(if network anomaly confirmed) Other Xero customers typically pay {Currency} {NetworkAvgAmount} — this also appears high compared to the market",
      "(if network-wide increase) Other Xero customers have also seen higher bills from {SupplierName} recently — this may be a legitimate price increase",
      "(if unusual channel) This bill arrived via {Channel}, which differs from your usual channel for this supplier",
    ],
    actionLines: [
      "Check against any PO, quote, or contract. Contact {SupplierName} if you need to confirm the amount",
      "If the amount is correct, dismiss this alert and approve payment",
      "If it's an error, edit or void the bill",
    ],
  },
  {
    id: "duplicate_exact",
    title: "Duplicates: Exact duplicate",
    phase: "beta",
    contextLines: [
      "Bill {InvoiceRef} for {Currency} {Amount} (dated {BillDate}) matches an existing bill created on {ExistingBillCreatedDate} via {ExistingBillChannel}",
      "The existing bill is currently {ExistingBillStatus}",
      "(if already paid) That bill was paid on {PaidDate} — paying this one too would be a duplicate payment",
      "(if awaiting payment) Both bills are awaiting payment. Only one should be paid",
    ],
    actionLines: [
      "Open the existing bill and compare details side by side",
      "Void the duplicate if confirmed, or contact {SupplierName} if unsure which is correct",
      "If both are genuinely separate obligations, dismiss this alert and pay both",
    ],
  },
  {
    id: "duplicate_fuzzy",
    title: "Duplicates: Fuzzy match duplicate",
    phase: "ga",
    contextLines: [
      "Bill {InvoiceRef} from {SupplierName} for {Currency} {Amount} is similar to an existing bill. Here's how they compare",
      "Reference: {InvoiceRef} vs {ExistingRef}",
      "Amount: {Currency} {Amount} vs {Currency} {ExistingAmount} ({AmountDifference} difference)",
      "Date: {BillDate} vs {ExistingDate} ({DaysDiff} days apart)",
      "Status: New vs {ExistingBillStatus}",
      "These are close but not identical. Review before paying",
    ],
    actionLines: [
      "Compare both bills against the original invoice document",
      "Contact {SupplierName} to confirm if unsure",
      "Void the duplicate if confirmed, or dismiss if both are genuine",
    ],
  },
  {
    id: "bank_details_recently_changed",
    title: "Fraud: Supplier bank details recently changed",
    phase: "ga",
    contextLines: [
      "The account was updated from ...{OldAccountSuffix} to ...{NewAccountSuffix} by {UserName} on {ChangeDate} at {ChangeTime}",
      "{AffectedBillCount} bill(s) totalling {Currency} {AffectedTotal} are scheduled to pay to the new account",
      "(if network: unrecognised) This account is not recognised by other Xero customers paying {SupplierName}",
      "(if network: recognised) This account is used by other Xero customers paying {SupplierName} — the change may be legitimate",
      "Bank detail changes are a common fraud vector. Verify before paying",
    ],
    actionLines: [
      "Call {SupplierName} on a number you already hold and check internally whether {UserName}'s change was authorised",
      "If legitimate, dismiss this alert and approve payment. If unauthorised, revert the bank details and hold all payments",
      "If you suspect fraud, tap Report as suspicious and contact your bank immediately",
    ],
  },
  {
    id: "bill_bank_mismatch",
    title: "Fraud: Bill bank details differ from supplier record",
    phase: "ga",
    contextLines: [
      "This bill shows payment to account ending ...{BillAccountSuffix}. Your contact record has ...{ContactAccountSuffix} (last updated {ContactBankLastUpdated})",
      "(if network: bill matches) The bill account is recognised by other Xero customers — your contact record may be out of date",
      "(if network: neither matches) Neither account is recognised by other Xero customers. Treat this with caution",
      "(if network not yet available) Network data is not yet available. Verify which account is correct before paying",
    ],
    actionLines: [
      "Call {SupplierName} to confirm which account is correct. Do not pay until resolved",
      "If the bill is correct, update the contact record in Xero, then dismiss and pay",
      "If you suspect tampering, tap Report as suspicious and contact your bank immediately",
    ],
  },
  {
    id: "budget_overrun",
    title: "Anomalous: Budget overrun",
    phase: "future",
    contextLines: [
      "Your {AccountName} budget for {Month} is {Currency} {BudgetAmount}",
      "You have spent {Currency} {SpentAmount} so far ({SpentPercent}%)",
      "Paying this bill would bring total spend to {Currency} {ProjectedTotal} — {PercentOfBudget}% of budget",
    ],
    actionLines: [
      "Seek approval from the relevant budget owner, or recode this bill to a different account",
      "Update the {AccountName} budget if it needs revising",
      "If the overspend is authorised, dismiss this alert and approve payment",
    ],
  },
  {
    id: "po_exceeds",
    title: "PO / Receipt mismatch: Bill exceeds purchase order",
    phase: "future",
    contextLines: [
      "PO {PORef} was approved for {Currency} {POAmount} by {POApprover}",
      "This bill is {Currency} {BillAmount} — {Currency} {Overage} ({OveragePercent}%) above the PO",
      "Payment at this amount may require additional approval",
    ],
    actionLines: [
      "Query the overage with {SupplierName} and obtain approval before paying",
      "Raise an amended PO if your process requires it, then dismiss and pay",
      "If only the PO amount is valid, pay that and dispute the rest",
    ],
  },
  {
    id: "goods_not_receipted",
    title: "PO / Receipt mismatch: Goods not fully receipted",
    phase: "future",
    contextLines: [
      "This bill includes items that have not been marked as received",
      "Per-item comparison: {ItemName}, {BilledQty} {Unit}, {ReceivedQty} {Unit}, {ShortfallQty} {Unit}",
      "The value of unreceived items is {Currency} {UnreceivedValue}. Consider holding payment until delivery is confirmed",
    ],
    actionLines: [
      "Confirm delivery with your team before paying. Update the goods receipt in Xero once goods arrive",
      "If items won't be delivered, request a credit note from {SupplierName}",
      "Hold payment or agree a partial amount with the supplier until resolved",
    ],
  },
];

export default function ContentAuditGridPage() {
  const [phase, setPhase] = useState<Phase | "all">("all");
  const [query, setQuery] = useState("");
  const [copyMode, setCopyMode] = useState<CopyMode>("examples");

  const filteredScenarios = useMemo(() => {
    const q = query.trim().toLowerCase();
    const textForMode = (value: string) =>
      copyMode === "examples" ? applyExampleTokens(value) : value;
    return scenarioDefs.filter((scenario) => {
      if (phase !== "all" && scenario.phase !== phase) return false;
      if (!q) return true;
      return (
        scenario.title.toLowerCase().includes(q) ||
        scenario.contextLines.some((line) => textForMode(line).toLowerCase().includes(q)) ||
        scenario.actionLines.some((line) => textForMode(line).toLowerCase().includes(q))
      );
    });
  }, [phase, query, copyMode]);

  return (
    <div className="min-h-full bg-[#f4f5f7] px-6 py-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <h1 className="text-[30px] font-bold text-[#172b4d]">Xero Protect blurb library</h1>
              <p className="text-[14px] text-[#42526e]">
                Plain list of alert copy options we may show: summary, context, and recommended actions.
              </p>
            </div>
            <div className="rounded border border-[#dfe1e6] bg-white p-1">
              <div className="text-[11px] font-semibold text-[#42526e] px-2 pt-1 pb-1">Display mode</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCopyMode("placeholders")}
                  className={`rounded px-3 py-1.5 text-[12px] font-semibold ${
                    copyMode === "placeholders"
                      ? "bg-[#e9f2ff] text-[#0052cc]"
                      : "bg-white text-[#42526e] hover:bg-[#f4f5f7]"
                  }`}
                >
                  Placeholders
                </button>
                <button
                  type="button"
                  onClick={() => setCopyMode("examples")}
                  className={`rounded px-3 py-1.5 text-[12px] font-semibold ${
                    copyMode === "examples"
                      ? "bg-[#e9f2ff] text-[#0052cc]"
                      : "bg-white text-[#42526e] hover:bg-[#f4f5f7]"
                  }`}
                >
                  Example text
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-lg border border-[#dfe1e6] bg-white p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-[12px] font-semibold text-[#42526e]">Phase</span>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as Phase | "all")}
                className="h-9 w-full rounded border border-[#c1c7d0] bg-white px-3 text-[13px]"
              >
                <option value="all">All phases</option>
                <option value="alpha">Alpha</option>
                <option value="beta">Beta</option>
                <option value="ga">GA</option>
                <option value="future">Future</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[12px] font-semibold text-[#42526e]">Search blurbs</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scenario or copy text"
                className="h-9 w-full rounded border border-[#c1c7d0] bg-white px-3 text-[13px]"
              />
            </label>
          </div>
          <div className="mt-3 text-[12px] text-[#42526e]">
            Showing {filteredScenarios.length} scenario{filteredScenarios.length === 1 ? "" : "s"}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredScenarios.map((scenario) => (
            <article key={scenario.id} className="rounded-lg border border-[#dfe1e6] bg-white p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <FileWarning className="h-4 w-4 text-[#5e6c84]" aria-hidden />
                <span className="text-[18px] font-bold text-[#172b4d]">{scenario.title}</span>
                <span className="rounded border border-[#dfe1e6] bg-[#f7f8f9] px-2 py-0.5 text-[11px] uppercase text-[#42526e]">
                  {scenario.phase}
                </span>
              </div>

              <div className="space-y-4 text-[13px]">
                <div>
                  <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-[#344563]">
                    <BookText className="h-3.5 w-3.5" aria-hidden />
                    Context block
                  </p>
                  <ul className="mt-1 space-y-1.5 rounded border border-[#ebecf0] bg-[#fafbfc] p-2 text-[#172b4d]">
                    {scenario.contextLines.map((line) => (
                      <li key={line} className="flex items-start gap-1.5">
                        <ClipboardList className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#5e6c84]" aria-hidden />
                        - {copyMode === "examples" ? applyExampleTokens(line) : line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-[#344563]">
                    <ListChecks className="h-3.5 w-3.5" aria-hidden />
                    Recommended actions
                  </p>
                  <ul className="mt-1 space-y-1.5 rounded border border-[#ebecf0] bg-[#fafbfc] p-2 text-[#172b4d]">
                    {scenario.actionLines.map((line) => (
                      <li key={line} className="flex items-start gap-1.5">
                        <ClipboardList className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#5e6c84]" aria-hidden />
                        - {copyMode === "examples" ? applyExampleTokens(line) : line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filteredScenarios.length === 0 && (
          <section className="rounded-lg border border-[#dfe1e6] bg-white p-6 text-[13px] text-[#42526e]">
            No blurbs match your current filter/search.
          </section>
        )}
      </div>
    </div>
  );
}
