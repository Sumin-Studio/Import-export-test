"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, X } from "lucide-react";
import {
  getAverageSafetyShieldBillAmount,
  getSafetyShieldBillById,
  type Bill,
} from "@/data/safety-shield";

export interface JaxBillReviewPanelProps {
  billId: string;
  onClose: () => void;
  buildBillHref: (id: string) => string;
}

function getContextualPrompts(bill: Bill): string[] {
  if (!bill.aiFlagged) {
    return [
      "Summarise this bill for me",
      "Anything I should double-check?",
      "Add a note for my records",
    ];
  }
  switch (bill.riskType) {
    case "duplicate":
      return [
        "Compare with original bill",
        "Is this a duplicate?",
        "What should I check before paying?",
      ];
    case "first_time_supplier":
      return [
        "What should I verify for a new supplier?",
        "Verify bank details",
        "Draft confirmation message",
      ];
    case "bank_detail_change":
      return [
        "What changed with the bank details?",
        "Verify the new account",
        "Draft message to confirm new account",
      ];
    case "anomalous_amount":
      return [
        "Explain this amount spike",
        "Compare to my usual bills from this supplier",
        "Is this normal for this supplier?",
      ];
    default:
      return [
        "What should I verify before approving this bill?",
        "Summarise the risk in plain English",
        "Draft a message to the supplier to confirm details",
      ];
  }
}

function getReplyForPrompt(
  prompt: string,
  bill: Bill,
  averageAmount: number
): string {
  const percentHigher = Math.round(
    ((bill.amount - averageAmount) / averageAmount) * 100
  );

  if (bill.supplierBillCount > 1) {
    return `Known supplier with ${bill.supplierBillCount} prior bills. Amount is within your usual range for ${bill.supplier}.`;
  }

  if (bill.riskType === "duplicate" && bill.duplicateOfBillId) {
    if (prompt.includes("duplicate") || prompt.includes("Compare")) {
      return `${bill.aiReason} This bill matches amounts and supplier from a bill you paid recently. View the original bill to compare before paying.`;
    }
    if (prompt.includes("check before paying")) {
      return `Confirm this isn't the same invoice you already paid. Check the original bill and invoice number. If it's a duplicate, void and reconcile.`;
    }
  }

  if (bill.riskType === "first_time_supplier") {
    if (prompt.includes("verify for a new supplier")) {
      return "Verify bank details via a trusted channel before paying. Confirm the work was done and the invoice is legitimate. Check the supplier's contact details match your records.";
    }
    if (prompt.includes("bank details")) {
      return "Request bank details from the supplier via their official contact or portal. Compare to any documentation you have. Avoid using details from emails or invoices that could be spoofed.";
    }
    if (prompt.includes("confirmation")) {
      return `Hi ${bill.supplier}, before we process payment for ${bill.billNumber}, can you please confirm the invoice details and the intended bank account? Thanks.`;
    }
  }

  if (bill.riskType === "bank_detail_change") {
    if (prompt.includes("changed") || prompt.includes("new account")) {
      return `${bill.aiReason} Confirm the new account via a trusted channel before paying — avoid using details from unsolicited emails.`;
    }
    if (prompt.includes("Draft")) {
      return `Hi ${bill.supplier}, we've noticed your bank details have changed. Before we process payment for ${bill.billNumber}, can you confirm the new account via your usual method? Thanks.`;
    }
  }

  if (bill.riskType === "anomalous_amount") {
    if (prompt.includes("spike") || prompt.includes("Compare") || prompt.includes("normal")) {
      return `${bill.aiReason}${percentHigher > 0 ? ` This bill is ${percentHigher}% above your average.` : ""} Worth checking — new contract, bulk order, or error?`;
    }
  }

  if (prompt.includes("Summarise")) {
    return bill.aiFlagged
      ? `${bill.aiReason} In short: this bill is unusual enough to pause and verify before payment.`
      : `Supplier and amount match your records. Nothing unusual detected.`;
  }

  if (prompt.includes("Summarise this bill")) {
    return `${bill.supplier} — ${bill.billNumber}, due ${bill.dueDate}. ${bill.lineItems.length} line item(s). Total ${bill.total.toFixed(2)}.`;
  }

  if (prompt.includes("double-check")) {
    return "Nothing stands out. Supplier and amount are in usual range. You're good to approve.";
  }

  if (prompt.includes("note for my records")) {
    return "I can add a note when you approve. What would you like it to say?";
  }

  return (
    bill.aiReason ??
    "Before approval: confirm supplier bank details match a known account, validate invoice number and amount against source docs, and check this bill is not a duplicate of an existing payable."
  );
}

export function JaxBillReviewPanel({
  billId,
  onClose,
  buildBillHref,
}: JaxBillReviewPanelProps) {
  const bill = getSafetyShieldBillById(billId);
  const averageAmount = getAverageSafetyShieldBillAmount();
  const [jaxPrompt, setJaxPrompt] = useState<string | null>(null);
  const [jaxSteps, setJaxSteps] = useState<
    Array<{ label: string; detail: string; status: "pending" | "running" | "done" }>
  >([]);
  const jaxTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const prompts = useMemo(() => (bill ? getContextualPrompts(bill) : []), [bill]);

  useEffect(() => {
    if (!bill) return;
    const steps = [
      {
        label: "Checking supplier and historical bill patterns",
        detail: `Reviewing previous payments and amount ranges for ${bill.supplier}.`,
      },
      {
        label: "Validating bank and identity risk signals",
        detail: "Comparing payment and contact details against known trusted records.",
      },
      {
        label: "Compiling recommendation for this bill",
        detail: `Prepared a review summary for ${bill.billNumber} with suggested next actions.`,
      },
    ];

    setJaxSteps(steps.map((step) => ({ ...step, status: "pending" })));

    steps.forEach((_, i) => {
      const startTimer = setTimeout(() => {
        setJaxSteps((prev) =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: "running" } : step
          )
        );
      }, i * 1800 + 200);

      const doneTimer = setTimeout(() => {
        setJaxSteps((prev) =>
          prev.map((step, idx) => (idx === i ? { ...step, status: "done" } : step))
        );
      }, (i + 1) * 1800);

      jaxTimersRef.current.push(startTimer, doneTimer);
    });

    return () => {
      jaxTimersRef.current.forEach(clearTimeout);
      jaxTimersRef.current = [];
    };
  }, [billId]);

  if (!bill) {
    return (
      <div className="flex flex-col h-full bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-semibold text-[#0a0a0a]">JAX</p>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8c919a] hover:text-[#333940] p-1 rounded hover:bg-[#f2f3f4]"
            aria-label="Close JAX panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-[13px] text-[#6b7280]">Bill not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-[#e1e2e5] overflow-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e1e2e5] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f0f4ff]">
            <Sparkles className="h-3.5 w-3.5 text-[#1c52de]" />
          </div>
          <p className="text-[14px] font-semibold text-[#0a0a0a]">JAX</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[#8c919a] hover:text-[#333940] p-1 rounded hover:bg-[#f2f3f4]"
          aria-label="Close JAX panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-3">
          {jaxSteps.map((step, index) => (
            <div
              key={`${step.label}-${index}`}
              className={step.status === "pending" ? "opacity-50" : "opacity-100"}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">
                  {step.status === "running" ? (
                    <Loader2 className="h-4 w-4 text-[#1c52de] animate-spin" />
                  ) : step.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-[#0b6e38]" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-[#d5d7da]" />
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#0a0a0a]">{step.label}</p>
                  {step.status === "running" ? (
                    <p className="text-[12px] text-[#8c919a] mt-1 italic">Thinking...</p>
                  ) : step.status === "done" ? (
                    <p className="text-[12px] text-[#6b7280] mt-1">{step.detail}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {jaxSteps.length > 0 && jaxSteps.every((step) => step.status === "done") && (
            <div className="pt-3 border-t border-[#e1e2e5]">
              <p className="text-[12px] text-[#6b7280] mb-2">Try asking JAX:</p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setJaxPrompt(prompt)}
                    className="rounded-full border border-[#d5d7da] bg-white px-3 py-1.5 text-[12px] text-[#333940] hover:bg-[#f7f8fa]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              {jaxPrompt && (
                <div className="mt-3 rounded border border-[#e1e2e5] bg-[#f7f8fa] px-3 py-2">
                  <p className="text-[12px] font-medium text-[#333940]">JAX</p>
                  <p className="text-[12px] text-[#333940] mt-1 leading-relaxed">
                    {getReplyForPrompt(jaxPrompt, bill, averageAmount)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
