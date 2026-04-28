"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  PaymentCtaWarningPreview,
  StandardPaymentsPreview,
  WorkflowCtaWarningPreview,
} from "@/components/xero-protect/BillDetailCtaPreviews";

type BillStatus =
  | "draft"
  | "awaiting_approval"
  | "submitted_queue"
  | "awaiting_payment"
  | "overdue"
  | "paid";

type AuditScenario = {
  id: string;
  title: string;
  subtitle: string;
  status: BillStatus;
  flagged: boolean;
  dismissed: boolean;
  node: ReactNode;
};

type StatusMeta = {
  group: "workflow" | "payment";
  uiLabel: string;
  ctaUndismissed: string;
  ctaDismissed: string;
  bullets: string[];
};

const statusMeta: Record<BillStatus, StatusMeta> = {
  draft: {
    group: "workflow",
    uiLabel: "Draft",
    ctaUndismissed: "Submit for approval anyway",
    ctaDismissed: "Submit for approval",
    bullets: [
      "First bill from this supplier",
      "No prior payment history to verify",
      "Amount is significantly higher than your average bill",
    ],
  },
  awaiting_approval: {
    group: "workflow",
    uiLabel: "Awaiting approval",
    ctaUndismissed: "Approve anyway",
    ctaDismissed: "Approve",
    bullets: [
      "First bill from this supplier",
      "No prior payment history to verify",
      "Amount is significantly higher than your average bill",
    ],
  },
  submitted_queue: {
    group: "workflow",
    uiLabel: "Submitted / in approval queue",
    ctaUndismissed: "Approve anyway",
    ctaDismissed: "Approve",
    bullets: [
      "Same invoice number was already paid to this supplier last month",
      "Possible double payment",
    ],
  },
  awaiting_payment: {
    group: "payment",
    uiLabel: "Awaiting payment",
    ctaUndismissed: "Record payment anyway",
    ctaDismissed: "Record payment",
    bullets: [
      "First bill from this supplier",
      "No prior payment history to verify",
      "Amount is significantly higher than your average bill",
    ],
  },
  overdue: {
    group: "payment",
    uiLabel: "Overdue (unpaid)",
    ctaUndismissed: "Record payment anyway",
    ctaDismissed: "Record payment",
    bullets: [
      "Invoice overdue by 16 days",
      "No prior payment history to verify",
      "Amount is significantly higher than your average bill",
    ],
  },
  paid: {
    group: "payment",
    uiLabel: "Paid (edge)",
    ctaUndismissed: "Record payment anyway",
    ctaDismissed: "Record payment",
    bullets: [
      "Payment was entered manually",
      "No prior payment history to verify",
      "Amount is significantly higher than your average bill",
    ],
  },
};

function PlainWorkflowActionPreview({ label }: { label: string }) {
  return (
    <div className="border border-[#e1e2e5] rounded bg-white p-4">
      <button
        type="button"
        className="h-9 px-5 rounded text-[14px] font-bold text-white bg-[#2e7d32] hover:bg-[#1b5e20]"
      >
        {label}
      </button>
    </div>
  );
}

function buildScenarioNode(
  status: BillStatus,
  flagged: boolean,
  dismissed: boolean,
): ReactNode {
  const meta = statusMeta[status];
  const isPayment = meta.group === "payment";

  if (!flagged) {
    return isPayment ? (
      <StandardPaymentsPreview total={2051} />
    ) : (
      <PlainWorkflowActionPreview label={meta.ctaDismissed} />
    );
  }

  const warningMessage = meta.bullets.join(" · ");
  return isPayment ? (
    <PaymentCtaWarningPreview
      warningMessage={warningMessage}
      total={2051}
      allowDismiss={false}
      initialDismissed={dismissed}
    />
  ) : (
    <WorkflowCtaWarningPreview
      warningMessage={warningMessage}
      ctaLabelUndismissed={meta.ctaUndismissed}
      ctaLabelDismissed={meta.ctaDismissed}
      allowDismiss={false}
      initialDismissed={dismissed}
    />
  );
}

function buildScenarios(): AuditScenario[] {
  const statuses: BillStatus[] = [
    "draft",
    "awaiting_approval",
    "submitted_queue",
    "awaiting_payment",
    "overdue",
    "paid",
  ];
  const all: AuditScenario[] = [];

  for (const status of statuses) {
    const meta = statusMeta[status];

    all.push({
      id: `${status}__unflagged`,
      title: `${meta.uiLabel}`,
      subtitle: "Unflagged (standard — no Xero Protect CTA)",
      status,
      flagged: false,
      dismissed: false,
      node: buildScenarioNode(status, false, false),
    });

    for (const dismissed of [false, true]) {
      all.push({
        id: `${status}__flagged__${dismissed ? "dismissed" : "active"}`,
        title: `${meta.uiLabel}`,
        subtitle: dismissed ? "Flagged — combined CTA (dismissed / cleared)" : "Flagged — combined CTA",
        status,
        flagged: true,
        dismissed,
        node: buildScenarioNode(status, true, dismissed),
      });
    }
  }

  return all;
}

export default function XeroProtectCtaAuditPage() {
  const scenarios = useMemo(() => buildScenarios(), []);
  const [status, setStatus] = useState<BillStatus>("awaiting_approval");
  const [flagged, setFlagged] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const activeScenarioId = flagged
    ? `${status}__flagged__${dismissed ? "dismissed" : "active"}`
    : `${status}__unflagged`;

  return (
    <div className="min-h-full bg-[#f4f5f7] px-6 py-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-[30px] font-bold text-[#172b4d]">Bill detail — CTA audit</h1>
          <p className="text-[14px] text-[#42526e]">
            Grid of bill-detail CTA states. Use controls to pick a combo; matching tile lights up.
          </p>
        </header>

        <section className="bg-white border border-[#dfe1e6] rounded-lg p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-[12px] font-semibold text-[#42526e] block mb-1">Bill status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BillStatus)}
                className="w-full h-9 rounded border border-[#c1c7d0] bg-white px-3 text-[13px]"
              >
                {Object.entries(statusMeta).map(([value, meta]) => (
                  <option key={value} value={value}>
                    {meta.uiLabel}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#42526e] block mb-1">Xero Protect flag</span>
              <select
                value={flagged ? "flagged" : "unflagged"}
                onChange={(e) => setFlagged(e.target.value === "flagged")}
                className="w-full h-9 rounded border border-[#c1c7d0] bg-white px-3 text-[13px]"
              >
                <option value="flagged">Flagged</option>
                <option value="unflagged">Unflagged</option>
              </select>
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#42526e] block mb-1">Dismiss state</span>
              <select
                value={dismissed ? "dismissed" : "active"}
                onChange={(e) => setDismissed(e.target.value === "dismissed")}
                disabled={!flagged}
                className="w-full h-9 rounded border border-[#c1c7d0] bg-white px-3 text-[13px] disabled:bg-[#f4f5f7] disabled:text-[#6b778c]"
              >
                <option value="active">Active warning</option>
                <option value="dismissed">Dismissed / cleared</option>
              </select>
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {scenarios.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <article
                key={scenario.id}
                className={`rounded-lg border bg-white p-4 transition ${
                  isActive
                    ? "border-[#0052cc] ring-2 ring-[#4c9aff] shadow-[0_0_0_2px_rgba(76,154,255,0.2)]"
                    : "border-[#dfe1e6]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-[18px] font-semibold text-[#172b4d]">{scenario.title}</h2>
                    <p className="text-[12px] text-[#6b778c]">{scenario.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus(scenario.status);
                      setFlagged(scenario.flagged);
                      setDismissed(scenario.dismissed);
                    }}
                    className="h-8 px-3 rounded border border-[#c1c7d0] bg-white text-[12px] font-semibold text-[#0052cc] hover:bg-[#f4f5f7]"
                  >
                    Select
                  </button>
                </div>
                {scenario.node}
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
