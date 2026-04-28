"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
import Jax from "@/app/assets/images/JAX-panel.svg";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { useJaxChat } from "@/app/contexts/JaxChatContext";
import { Close, ExternalLink } from "@/app/components/ui/icons";
import { XERO_PROTECT_LATEST_BILLS } from "@/lib/xero-protect-latest-prototype";
import {
  getSafetyShieldBillById,
  getAverageSafetyShieldBillAmount,
} from "@/data/safety-shield";
import {
  JUST_PAY_JAX_ASSISTANT_REPLY,
  JUST_PAY_JAX_FOLLOWUP,
  JUST_PAY_JAX_REPLY_TO_USER,
  JUST_PAY_NO_INVOICE_LABEL,
  JUST_PAY_SELECT_FUNDING_PROMPT,
  getJustPayCongratulations,
  getJustPayPillAssistantReply,
  getJustPayNoInvoiceAfterNameIntro,
} from "@/lib/just-pay-jax-copy";
import type { JustPayJaxChatVariant } from "@/app/contexts/JustPayJaxUiContext";
import { JustPayJaxNewSession } from "@/app/components/panels/JustPayJaxNewSession";
import { JustPayContactAmountCard } from "@/app/components/panels/JustPayContactAmountCard";
import { JustPayFundingSourceCard } from "@/app/components/panels/JustPayFundingSourceCard";
import { JustPayMelioMakePaymentCard } from "@/app/components/panels/JustPayMelioMakePaymentCard";

// Highcharts requires window; load charts only on client to avoid SSR error
const JaxCashflowThresholdChart = dynamic(
  () => import("@/app/components/charts/JaxCashflowThreshold"),
  { ssr: false }
);

const CashflowShortfallChart = dynamic(
  () => import("@/app/components/charts/CashflowShortfallChart"),
  { ssr: false }
);

/** Renders text with **bold** converted to <strong> */
function renderWithBold(text: string) {
  const parts = text.split(/\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

const CASHFLOW_SEED_MESSAGE =
  "Help me create a plan to smooth out cash flow over the next few weeks";

const MOCK_ASSISTANT_REPLY =
  "Based on your cash flow projections, you have about 8 days of cash on hand starting next week. Here are your upcoming bills:\n\n• Acme Supplies — $1,200 due Wed\n• Office Rent — $2,400 due Fri\n• Beta Co — $800 due Thu\n\nI recommend paying these on their due dates to keep supplier relationships strong. If you'd like to ease the pinch, we could move Acme Supplies to Fri—see the action below.";

const CASHFLOW_SHORTFALL_SEED_MESSAGE =
  "My cash is projected to go below zero next week. Help me make a plan to avoid an overdraft.";

const MOCK_SHORTFALL_ASSISTANT_REPLY =
  "Your projected cash balance drops below $0 by Thu. The shortfall is mainly from:\n\n• Acme Supplies — $1,200 due Wed\n• Office Rent — $2,400 due Fri\n\nYou also have $800 overdue from Beta Co (invoice due Thu). I suggest delaying Acme until after expected income, and chasing the Beta Co invoice. I can move Acme's payment date for you—see the action below.";

const CASHFLOW_CRITICAL_SEED_MESSAGE =
  "I have a mandatory tax payment due next week but insufficient funds to cover it. Help me make a plan to avoid immediate penalties.";

const MOCK_CRITICAL_ASSISTANT_REPLY =
  "Your tax payment leaves you about $4,000 short. I recommend drawing a line of credit against Xero Capital of $5,000 to cover the gap and avoid penalties. You can apply below when you’re ready.";

const MOCK_FOLLOWUP_CASHFLOW =
  "Want me to adjust another payment date or run a different scenario?";
const MOCK_FOLLOWUP_SHORTFALL =
  "I can also help you draft reminder messages for Beta Co or tweak the plan.";
const MOCK_FOLLOWUP_CRITICAL =
  "If you'd like to explore other options (e.g. delaying the tax payment), say how you'd like to proceed.";

// Bills review (8 bills / Xero Protect)
const BILLS_REVIEW_SEED_MESSAGE =
  "I saw 8 bills need review. Help me understand what's going on.";

const MOCK_BILLS_REVIEW_REPLY =
  "8 bills on your list need a closer look before you approve payment. Here's the breakdown:\n\n• **3 possible duplicates** — Acme Supplies ($1,240), Metro Office ($890), and Digital Print Co ($425). These match amounts and suppliers from bills you've paid in the last 90 days. Worth confirming they're genuine before paying twice.\n\n• **2 first-time suppliers** — Swanston Security ($1,680) and Bay Plumbing ($540). New to your books; good moment to verify bank details and that the work was done.\n\n• **3 unusual amounts** — Tech Rentals ($2,100 — 40% higher than last month), Office Depot ($1,890), and CloudHost ($99). The spikes might be legitimate (new contract, bulk order) but worth a quick check.\n\nI'd start with the duplicates — they're the costliest to get wrong. Want me to open the bills list filtered to these, or walk through each one with you?";

const BILLS_HIGH_RISK_SEED = "3 high-risk bills need a decision. What should I do?";
const MOCK_BILLS_HIGH_RISK_REPLY =
  "Three bills are marked high risk and need your call before payment:\n\n• Swanston Security ($1,680) — bank details changed since last payment. Confirm the new account is correct.\n\n• Tech Rentals ($2,100) — amount is 40% higher than your usual. Could be a new contract or an error.\n\n• Metro Office ($890) — possible duplicate of a bill paid 6 weeks ago.\n\nFor each, you can approve (with an audit note if you want), or dismiss the flag. I recommend confirming Swanston's bank details first — that's the highest-stakes one. Want me to open the bills list so you can work through them?";

const BILLS_QUICKVIEW_SEED = "How do I use quickview to resolve flagged bills?";
const MOCK_BILLS_QUICKVIEW_REPLY =
  "Quickview lets you review bills without leaving the list. Open any bill and you'll see the risk context side-by-side — duplicates, first-time suppliers, unusual amounts — so you can approve, dismiss, or drill in for more detail.\n\nFor your 8 flagged bills, I'd open the list and use quickview on the possible duplicates first (Acme Supplies, Metro Office, Digital Print Co). You can compare them to past payments and clear the flag or approve in one place. Want me to open the bills list for you?";

const TYPEWRITER_MS = 4;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 2,
  }).format(value);
}

function buildBillAnalysisReply(billId: string): string | null {
  const bill = getSafetyShieldBillById(billId);
  if (!bill) return null;
  const avg = getAverageSafetyShieldBillAmount();
  const percentHigher =
    avg > 0 ? Math.round(((bill.amount - avg) / avg) * 100) : 0;
  const dueDate = new Date(bill.dueDate).toLocaleDateString("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const lineItems =
    bill.lineItems.length > 0
      ? bill.lineItems
          .map(
            (li) =>
              `• ${li.description} — ${formatCurrency(li.amount)} (${li.account})`
          )
          .join("\n")
      : "No line items";

  const riskBlurb = bill.aiFlagged
    ? `**Why we flagged it:** ${bill.aiReason}`
    : "No risk flags on this bill.";

  const comparison =
    percentHigher > 0 && bill.riskType !== "duplicate"
      ? ` This bill is **${percentHigher}%** above your average (${formatCurrency(avg)}).`
      : "";

  const recommendation =
    bill.riskType === "duplicate" && bill.duplicateOfBillId
      ? `**My take:** Check the original bill before paying — likely a duplicate. Use "View bill" to jump to it.`
      : bill.riskType === "first_time_supplier"
        ? `**My take:** New supplier, no history. Verify bank details and that the work was done before approving.`
        : bill.riskType === "bank_detail_change"
          ? `**My take:** Bank details changed recently. Confirm the new account via a trusted channel before paying.`
          : bill.riskType === "anomalous_amount"
            ? `**My take:** Unusual amount for this supplier. Worth a quick check — new contract, bulk order, or error?`
            : `**My take:** Review the details above. Approve when ready or use Analyse with JAX if you need more.`;

  return `**${bill.supplier}** — ${formatCurrency(bill.total)} (${bill.billNumber})

${riskBlurb}${comparison}

**Line items:**
${lineItems}

**Due:** ${dueDate} · **Status:** ${bill.status.replace(/_/g, " ")}

${recommendation}`;
}

const MOCK_FOLLOWUP_BILLS_REVIEW =
  "I can open the bills list for you, or we can go through any specific bill. What would help most?";

type ActionCardConfig = {
  title: string;
  impactLine?: string;
  dueDateLabel?: string;
  dueDateValue?: string;
  buttonLabel: string;
  confirmMessage: string;
};

const ACTION_CARD_BY_ENTRY: Record<string, ActionCardConfig> = {
  cashflow: {
    title: "Acme Supplies",
    impactLine: "Moving payment to Fri keeps cash above your $2,000 threshold.",
    dueDateLabel: "Due date",
    dueDateValue: "Fri (moved from Wed)",
    buttonLabel: "Looks good",
    confirmMessage: "Done. I've updated the payment date for Acme Supplies.",
  },
  "cashflow-shortfall": {
    title: "Acme Supplies",
    impactLine: "Paying on Fri instead of Wed keeps you above $0 until income arrives.",
    dueDateLabel: "Due date",
    dueDateValue: "Fri (moved from Wed)",
    buttonLabel: "Looks good",
    confirmMessage: "Done. I've updated the payment date.",
  },
  "cashflow-critical": {
    title: "Xero Capital (line of credit)",
    impactLine: "Draw $5,000 to cover the $4,000 shortfall and avoid penalties.",
    buttonLabel: "Apply",
    confirmMessage: "Done. Line of credit applied.",
  },
};

export default function JaxPanel({
  justPayChatVariant = "v2",
}: {
  justPayChatVariant?: JustPayJaxChatVariant;
} = {}) {
  const justPayDashboardHref = "/just-pay/prototype/2";
  const { openPanel, openSubPanel, activePanel, activeSubPanel } =
    useNavigation();
  const { getMessages, appendMessage, seedIfEmpty, patchJustPayEmbed } =
    useJaxChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [footerShadow, setFooterShadow] = useState(false);

  const isJustPay = activeSubPanel === "just-pay";
  const isCashflow = activeSubPanel === "cashflow";
  const isCashflowShortfall = activeSubPanel === "cashflow-shortfall";
  const isCashflowCritical = activeSubPanel === "cashflow-critical";
  const isBillsReview =
    activeSubPanel === "xero-protect-review" ||
    activeSubPanel === "xero-protect-high-risk" ||
    activeSubPanel === "xero-protect-quickview";
  const isBillDetail = activeSubPanel?.startsWith("xero-protect-bill-");
  const billDetailId = isBillDetail
    ? activeSubPanel?.replace("xero-protect-bill-", "")
    : null;
  const billsEntryKey = isBillsReview ? activeSubPanel : null;
  const billEntryKey = isBillDetail ? activeSubPanel : null;
  const messages = isBillDetail && billEntryKey
    ? getMessages(billEntryKey)
    : isJustPay
      ? getMessages("just-pay")
      : isCashflow
        ? getMessages("cashflow")
        : isCashflowShortfall
          ? getMessages("cashflow-shortfall")
          : isCashflowCritical
            ? getMessages("cashflow-critical")
            : isBillsReview && billsEntryKey
              ? getMessages(billsEntryKey)
              : [];
  /** Index of the assistant message that carries the payment-details embed (patch target). */
  const justPayContactReviewIndex = isJustPay
    ? messages.findIndex((m) => m.embed?.type === "contact_amount_review")
    : -1;
  const justPayContactEmbed =
    justPayContactReviewIndex >= 0
      ? messages[justPayContactReviewIndex]?.embed
      : undefined;
  const showChat =
    (isJustPay ||
      isCashflow ||
      isCashflowShortfall ||
      isCashflowCritical ||
      isBillsReview ||
      isBillDetail) &&
    messages.length > 0;

  /** No-invoice pill → assistant prompt; next user message is treated as supplier name (Figma 8:10757). */
  const justPayAwaitingSupplierName =
    isJustPay &&
    messages.length === 2 &&
    messages[0]?.role === "user" &&
    messages[0]?.content === JUST_PAY_NO_INVOICE_LABEL &&
    messages[1]?.role === "assistant";

  const lastMessage = messages[messages.length - 1];
  const lastIsAssistant = lastMessage?.role === "assistant";
  const lastContent = lastIsAssistant ? lastMessage.content : "";
  const [typedLength, setTypedLength] = useState(0);
  /** Embed-only assistant messages (e.g. Melio checkout) have no text — treat as ready to show UI. */
  const typewriterDone =
    !lastIsAssistant ||
    lastContent.length === 0 ||
    typedLength >= lastContent.length;
  const typewriterIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!lastIsAssistant || lastContent.length === 0) return;
    const len = lastContent.length;
    if (isBillDetail || isJustPay) {
      queueMicrotask(() => setTypedLength(len));
      return;
    }
    const id = setTimeout(() => {
      setTypedLength(0);
      typewriterIntervalRef.current = setInterval(() => {
        setTypedLength((n) => {
          if (n >= len) {
            if (typewriterIntervalRef.current) {
              clearInterval(typewriterIntervalRef.current);
              typewriterIntervalRef.current = null;
            }
            return n;
          }
          return n + 1;
        });
      }, TYPEWRITER_MS);
    }, 0);
    return () => {
      clearTimeout(id);
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current);
        typewriterIntervalRef.current = null;
      }
    };
  }, [messages.length, lastIsAssistant, lastContent.length, isBillDetail, isJustPay]);

  useEffect(() => {
    if (activePanel === "jax" && isCashflow) {
      const seeded = seedIfEmpty("cashflow", {
        role: "user",
        content: CASHFLOW_SEED_MESSAGE,
      });
      if (seeded) {
        appendMessage("cashflow", {
          role: "assistant",
          content: MOCK_ASSISTANT_REPLY,
        });
      }
    }
  }, [activePanel, isCashflow, seedIfEmpty, appendMessage]);

  useEffect(() => {
    if (activePanel === "jax" && isCashflowShortfall) {
      const seeded = seedIfEmpty("cashflow-shortfall", {
        role: "user",
        content: CASHFLOW_SHORTFALL_SEED_MESSAGE,
      });
      if (seeded) {
        appendMessage("cashflow-shortfall", {
          role: "assistant",
          content: MOCK_SHORTFALL_ASSISTANT_REPLY,
        });
      }
    }
  }, [activePanel, isCashflowShortfall, seedIfEmpty, appendMessage]);

  useEffect(() => {
    if (activePanel === "jax" && isCashflowCritical) {
      const seeded = seedIfEmpty("cashflow-critical", {
        role: "user",
        content: CASHFLOW_CRITICAL_SEED_MESSAGE,
      });
      if (seeded) {
        appendMessage("cashflow-critical", {
          role: "assistant",
          content: MOCK_CRITICAL_ASSISTANT_REPLY,
        });
      }
    }
  }, [activePanel, isCashflowCritical, seedIfEmpty, appendMessage]);

  useEffect(() => {
    if (activePanel === "jax" && isBillsReview && billsEntryKey) {
      const { userMsg, assistantMsg } =
        billsEntryKey === "xero-protect-high-risk"
          ? { userMsg: BILLS_HIGH_RISK_SEED, assistantMsg: MOCK_BILLS_HIGH_RISK_REPLY }
          : billsEntryKey === "xero-protect-quickview"
            ? { userMsg: BILLS_QUICKVIEW_SEED, assistantMsg: MOCK_BILLS_QUICKVIEW_REPLY }
            : { userMsg: BILLS_REVIEW_SEED_MESSAGE, assistantMsg: MOCK_BILLS_REVIEW_REPLY };
      const seeded = seedIfEmpty(billsEntryKey, { role: "user", content: userMsg });
      if (seeded) {
        appendMessage(billsEntryKey, { role: "assistant", content: assistantMsg });
      }
    }
  }, [activePanel, isBillsReview, billsEntryKey, seedIfEmpty, appendMessage]);

  useEffect(() => {
    if (
      activePanel === "jax" &&
      isBillDetail &&
      billEntryKey &&
      billDetailId
    ) {
      const reply = buildBillAnalysisReply(billDetailId);
      if (reply) {
        const seeded = seedIfEmpty(billEntryKey, {
          role: "user",
          content: "Analyse this bill",
        });
        if (seeded) {
          appendMessage(billEntryKey, {
            role: "assistant",
            content: reply,
          });
        }
      }
    }
  }, [
    activePanel,
    isBillDetail,
    billEntryKey,
    billDetailId,
    seedIfEmpty,
    appendMessage,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || !showChat) {
      queueMicrotask(() => setFooterShadow(false));
      return;
    }
    const scheduleCheck = () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      queueMicrotask(() => setFooterShadow(hasScroll));
    };
    scheduleCheck();
    const ro = new ResizeObserver(scheduleCheck);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showChat, messages.length]);

  const handleJustPayPill = useCallback(
    (label: string) => {
      appendMessage("just-pay", { role: "user", content: label });
      appendMessage("just-pay", {
        role: "assistant",
        content: getJustPayPillAssistantReply(label),
      });
    },
    [appendMessage]
  );

  const handleJustPayConfirmPayment = useCallback(
    (messageIndex: number) => {
      patchJustPayEmbed("just-pay", messageIndex, { cardPhase: "funding" });
      appendMessage("just-pay", { role: "user", content: "Confirm payment" });
      appendMessage("just-pay", {
        role: "assistant",
        content: JUST_PAY_SELECT_FUNDING_PROMPT,
      });
    },
    [appendMessage, patchJustPayEmbed]
  );

  const handleJustPayFundingSelected = useCallback(
    (messageIndex: number, bankAccountLabel: string) => {
      patchJustPayEmbed("just-pay", messageIndex, {
        cardPhase: "done",
        selectedFundingLabel: bankAccountLabel,
      });
      appendMessage("just-pay", {
        role: "user",
        content: `Pay from ${bankAccountLabel}`,
      });
      appendMessage("just-pay", {
        role: "assistant",
        content: getJustPayCongratulations(bankAccountLabel),
      });
    },
    [appendMessage, patchJustPayEmbed]
  );

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;
    const useFollowUp = messages.length >= 2;
    if (isCashflow) {
      appendMessage("cashflow", { role: "user", content: text });
      appendMessage("cashflow", {
        role: "assistant",
        content: useFollowUp ? MOCK_FOLLOWUP_CASHFLOW : MOCK_ASSISTANT_REPLY,
      });
    } else if (isCashflowShortfall) {
      appendMessage("cashflow-shortfall", { role: "user", content: text });
      appendMessage("cashflow-shortfall", {
        role: "assistant",
        content: useFollowUp ? MOCK_FOLLOWUP_SHORTFALL : MOCK_SHORTFALL_ASSISTANT_REPLY,
      });
    } else if (isCashflowCritical) {
      appendMessage("cashflow-critical", { role: "user", content: text });
      appendMessage("cashflow-critical", {
        role: "assistant",
        content: useFollowUp ? MOCK_FOLLOWUP_CRITICAL : MOCK_CRITICAL_ASSISTANT_REPLY,
      });
    } else if (isBillDetail && billEntryKey && billDetailId) {
      const reply = buildBillAnalysisReply(billDetailId);
      if (reply) {
        appendMessage(billEntryKey, { role: "user", content: text });
        appendMessage(billEntryKey, {
          role: "assistant",
          content: useFollowUp
            ? "I can dig deeper into any part of this bill. What would you like to know?"
            : reply,
        });
      }
    } else if (isBillsReview && billsEntryKey) {
      const assistantReply =
        billsEntryKey === "xero-protect-high-risk"
          ? MOCK_BILLS_HIGH_RISK_REPLY
          : billsEntryKey === "xero-protect-quickview"
            ? MOCK_BILLS_QUICKVIEW_REPLY
            : MOCK_BILLS_REVIEW_REPLY;
      appendMessage(billsEntryKey, { role: "user", content: text });
      appendMessage(billsEntryKey, {
        role: "assistant",
        content: useFollowUp ? MOCK_FOLLOWUP_BILLS_REVIEW : assistantReply,
      });
    } else if (isJustPay) {
      appendMessage("just-pay", { role: "user", content: text });
      if (justPayAwaitingSupplierName) {
        appendMessage("just-pay", {
          role: "assistant",
          content: getJustPayNoInvoiceAfterNameIntro(text),
          embed: { type: "contact_amount_review", supplierName: text },
        });
      } else {
        const assistantContent =
          messages.length === 0
            ? JUST_PAY_JAX_ASSISTANT_REPLY
            : messages.length <= 2
              ? JUST_PAY_JAX_REPLY_TO_USER
              : JUST_PAY_JAX_FOLLOWUP;
        appendMessage("just-pay", { role: "assistant", content: assistantContent });
      }
    } else return;
    setInputValue("");
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  }, []);

  const entryKey = isCashflow
    ? "cashflow"
    : isCashflowShortfall
      ? "cashflow-shortfall"
      : isCashflowCritical
        ? "cashflow-critical"
        : isBillDetail && billEntryKey
          ? billEntryKey
          : isBillsReview && billsEntryKey
            ? billsEntryKey
            : null;

  const handleApplyAction = useCallback(() => {
    if (!entryKey) return;
    const card = ACTION_CARD_BY_ENTRY[entryKey];
    if (!card) return;
    appendMessage(entryKey, {
      role: "user",
      content: card.buttonLabel === "Apply" ? "Apply" : "Looks good",
    });
    appendMessage(entryKey, {
      role: "assistant",
      content: card.confirmMessage,
    });
  }, [entryKey, appendMessage]);

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex shrink-0 items-center justify-between gap-2 border-b border-border-primary py-3 pl-5 pr-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px]/[28px] font-bold capitalize">
            Just Ask Xero
          </h2>
          <span className="rounded-[3px] border border-[#80C19E] bg-[#A6D3BB] px-1 text-[13px] leading-[20px] text-[#002E15]">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="rounded-[3px] px-3 py-[6px] cursor-pointer text-[13px]/[20px] font-bold text-brand-primary hover:bg-background-primary"
            onClick={() => {
              if (!isJustPay) openSubPanel("more-features");
            }}
            type="button"
          >
            {isJustPay ? "Settings" : "More features"}
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
            onClick={() => openPanel(null)}
            type="button"
          >
            <span className="sr-only">Close</span>
            <Close fill="fill-content-secondary" />
          </button>
        </div>
      </div>

      {showChat ? (
        <div
          ref={scrollAreaRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-5 pb-4 nav-1049:w-[400px]"
        >
          <div className="flex flex-col gap-6">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[343px] rounded-bl-[12px] rounded-br-[2px] rounded-tl-[12px] rounded-tr-[12px] bg-[#0078C8] px-[14px] py-2 text-[15px]/[24px] text-white">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex flex-col gap-[14px] rounded-bl-[2px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px]">
                  {msg.content ? (
                    <p className="min-h-[1.5em] whitespace-pre-line text-[15px]/[24px] text-[#000A1E]">
                      {i === messages.length - 1 && lastIsAssistant && !typewriterDone
                        ? (
                            <>
                              {renderWithBold(lastContent.slice(0, typedLength))}
                              <span
                                className="inline-block w-0.5 h-[1.1em] align-middle bg-brand-primary ml-0.5 cursor-blink"
                                aria-hidden
                              />
                            </>
                          )
                        : renderWithBold(msg.content)}
                    </p>
                  ) : null}
                  {(isJustPay ||
                    isCashflow ||
                    isCashflowShortfall ||
                    isCashflowCritical) &&
                    msg.embed?.type === "make_payment_checkout" &&
                    ((i === messages.length - 1 && typewriterDone) ||
                      i < messages.length - 1) && (
                      <JustPayMelioMakePaymentCard
                        supplierName={msg.embed.supplierName}
                        amountDisplay={msg.embed.amountDisplay}
                        currencyCode={msg.embed.currencyCode}
                      />
                    )}
                  {isJustPay &&
                    msg.embed?.type === "contact_amount_review" &&
                    ((i === messages.length - 1 && typewriterDone) ||
                      i < messages.length - 1) && (
                      <JustPayContactAmountCard
                        embed={msg.embed}
                        supplierName={msg.embed.supplierName}
                        onConfirmPayment={() =>
                          handleJustPayConfirmPayment(i)
                        }
                      />
                    )}
                  {isJustPay &&
                    msg.content === JUST_PAY_SELECT_FUNDING_PROMPT &&
                    justPayContactEmbed?.type === "contact_amount_review" &&
                    (justPayContactEmbed.cardPhase === "funding" ||
                      justPayContactEmbed.cardPhase === "done") &&
                    justPayContactReviewIndex >= 0 &&
                    ((i === messages.length - 1 && typewriterDone) ||
                      i < messages.length - 1) && (
                      <JustPayFundingSourceCard
                        embed={justPayContactEmbed}
                        onFundingSourceSelected={(label) =>
                          handleJustPayFundingSelected(
                            justPayContactReviewIndex,
                            label
                          )
                        }
                      />
                    )}
                  {((i === messages.length - 1 && typewriterDone) || i < messages.length - 1) &&
                    !isJustPay &&
                    !isBillsReview &&
                    !isBillDetail &&
                    msg.embed?.type !== "make_payment_checkout" && (
                    <div
                      className="my-1 w-full min-w-0 overflow-hidden rounded-[12px] border border-[#ccced2] bg-[#f6f6f8] px-5 py-4 jax-chart-enter"
                    >
                      {isCashflowShortfall || isCashflowCritical ? (
                        <CashflowShortfallChart />
                      ) : (
                        <JaxCashflowThresholdChart />
                      )}
                    </div>
                  )}
                  {entryKey &&
                    (i === messages.length - 1 ? typewriterDone : true) &&
                    messages.findIndex((m) => m.role === "assistant") === i &&
                    msg.embed?.type !== "make_payment_checkout" &&
                    (() => {
                      const card = ACTION_CARD_BY_ENTRY[entryKey];
                      if (!card) return null;
                      return (
                        <div className="my-2 w-full rounded-[12px] border border-[#ccced2] bg-[#f6f6f8] px-5 py-4">
                          <p className="text-[15px]/[24px] font-bold text-[#000A1E]">
                            {card.title}
                          </p>
                          {card.impactLine && (
                            <p className="mt-1 text-[13px]/[20px] text-[#000A1E]">
                              {card.impactLine}
                            </p>
                          )}
                          {card.dueDateLabel != null && card.dueDateValue != null && (
                            <div className="mt-2 flex items-baseline gap-2">
                              <span className="text-[13px] font-bold text-[#424f60]">
                                {card.dueDateLabel}
                              </span>
                              <span className="text-[13px] text-[#1e3145]">
                                {card.dueDateValue}
                              </span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={handleApplyAction}
                            className="mt-3 rounded-[48px] bg-brand-primary px-4 py-2 text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
                          >
                            {card.buttonLabel}
                          </button>
                        </div>
                      );
                    })()}
                  {((i === messages.length - 1 && typewriterDone) || i < messages.length - 1) && (
                  <>
                  {isBillDetail ? (
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={
                          billDetailId
                            ? `${XERO_PROTECT_LATEST_BILLS}/${billDetailId}`
                            : XERO_PROTECT_LATEST_BILLS
                        }
                        className="inline-flex items-center gap-2 rounded-[48px] bg-brand-primary px-4 py-[6px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
                      >
                        Approve bill
                      </Link>
                      <Link
                        href={
                          billDetailId
                            ? `${XERO_PROTECT_LATEST_BILLS}/${billDetailId}`
                            : XERO_PROTECT_LATEST_BILLS
                        }
                        className="inline-flex items-center gap-2 rounded-[48px] border border-border-primary bg-white px-4 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
                      >
                        Dismiss flag
                      </Link>
                      <Link
                        href={`${XERO_PROTECT_LATEST_BILLS}?tab=all`}
                        className="inline-flex items-center gap-2 rounded-[48px] border border-border-primary bg-white px-4 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
                      >
                        Back to bills list
                      </Link>
                    </div>
                  ) : isJustPay ? (
                    <Link
                      href={justPayDashboardHref}
                      className="inline-flex w-fit items-center gap-2 rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
                    >
                      Back to Just Pay dashboard
                      <ExternalLink stroke="stroke-brand-primary" className="flex-shrink-0" />
                    </Link>
                  ) : (
                    <Link
                      href={
                        isBillsReview
                          ? `${XERO_PROTECT_LATEST_BILLS}?tab=all&from=spotlight`
                          : "/cashflow"
                      }
                      className="inline-flex w-fit items-center gap-2 rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
                    >
                      {isBillsReview ? "View bills" : "Go to cash flow manager"}
                      <ExternalLink stroke="stroke-brand-primary" className="flex-shrink-0" />
                    </Link>
                  )}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(msg.content)}
                      className="flex size-8 items-center justify-center rounded hover:bg-[#E6E7E9] text-[#404756]"
                      aria-label="Copy response"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.15487e-05 11.1818C-0.00742845 11.5909 0.576833 12 0.750072 12H8.25007C8.62507 12 9.00007 11.625 9.00007 11.1818V10.5H8.25007V11.1818H0.750072V3.75L1.5 3.73663V3H0.750072C0.375 3 0 3.375 7.15487e-05 3.73663V11.1818ZM3 9.75C2.625 9.75 2.25 9.34091 2.2575 8.93182L2.25 1.56818C2.25 1.15909 2.625 0.75 3 0.75H10.5C10.875 0.75 11.25 1.15909 11.25 1.56818V8.93182C11.25 9.375 10.875 9.75 10.5 9.75H3ZM3 1.5V9H10.5V1.5H3Z" fill="currentColor" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded hover:bg-[#E6E7E9] text-[#404756]"
                      aria-label="Export"
                    >
                      <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath={`url(#clip0_export_${i})`}>
                          <path d="M10.3125 7.96875V9.84375C10.3125 10.6204 9.6829 11.25 8.90625 11.25H1.40625C0.629597 11.25 0 10.6204 0 9.84375V7.96875C0 7.70986 0.209885 7.5 0.46875 7.5C0.727615 7.5 0.9375 7.70986 0.9375 7.96875V9.84375C0.9375 10.1026 1.14738 10.3125 1.40625 10.3125H8.90625C9.16512 10.3125 9.375 10.1026 9.375 9.84375V7.96875C9.375 7.70986 9.58488 7.5 9.84375 7.5C10.1026 7.5 10.3125 7.70986 10.3125 7.96875ZM2.0123 3.61267C2.19535 3.79573 2.49215 3.79573 2.6752 3.61267L4.6875 1.60038V8.4375C4.6875 8.69638 4.89736 8.90625 5.15625 8.90625C5.41512 8.90625 5.625 8.69638 5.625 8.4375V1.60038L7.63727 3.6127C7.82035 3.79575 8.11712 3.79575 8.3002 3.6127C8.48325 3.42964 8.48328 3.13279 8.30023 2.94973L5.48767 0.137286C5.30462 -0.0457621 5.00785 -0.0457621 4.82477 0.137286L2.01227 2.94971C1.8292 3.13278 1.82922 3.42961 2.0123 3.61267Z" fill="currentColor" />
                        </g>
                        <defs>
                          <clipPath id={`clip0_export_${i}`}>
                            <rect width="10.3125" height="11.25" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded hover:bg-[#E6E7E9] text-[#404756]"
                      aria-label="Good response"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath={`url(#clip0_thumbup_${i})`}>
                          <path d="M10.125 6.27643H10.725C11.225 6.27643 11.625 6.67643 11.625 7.17642C11.625 7.67642 11.225 8.07642 10.725 8.07642H10.125" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.125 9.87305H10.275C10.775 9.87305 11.175 9.47304 11.175 8.97304C11.175 8.47304 10.775 8.07304 10.275 8.07304H10.125" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.1269 6.27539H10.4769C10.9769 6.27539 11.3769 5.87539 11.3769 5.37539C11.3769 4.87539 10.9769 4.47539 10.4769 4.47539H7.4769L7.5269 4.37539C8.0269 3.52539 8.3269 2.52539 8.3769 1.47539C8.4269 1.12539 8.2769 0.825391 7.9769 0.625391C7.7769 0.475391 7.5769 0.475391 7.3269 0.525391C7.0769 0.575391 6.8769 0.725391 6.7769 0.925391C5.75715 2.70989 5.0783 4.96049 3.3269 6.22539H2.12695" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.127 9.875H9.77695C10.327 9.875 10.727 10.325 10.627 10.875C10.577 11.325 10.177 11.625 9.72695 11.625H6.47695C6.27695 11.625 6.02695 11.625 5.82695 11.575L3.17695 11.125H2.12695" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2.125 5.37499H0.375V11.625H2.125V5.37499Z" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                          <clipPath id={`clip0_thumbup_${i}`}>
                            <rect width="12" height="12" fill="white" transform="matrix(1 0 0 -1 0 12)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded hover:bg-[#E6E7E9] text-[#404756]"
                      aria-label="Poor response"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath={`url(#clip0_thumbdown_${i})`}>
                          <path d="M10.125 5.72357H10.725C11.225 5.72357 11.625 5.32357 11.625 4.82358C11.625 4.32358 11.225 3.92358 10.725 3.92358H10.125" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.125 2.12695H10.275C10.775 2.12695 11.175 2.52696 11.175 3.02696C11.175 3.52696 10.775 3.92696 10.275 3.92696H10.125" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.1269 5.72461H10.4769C10.9769 5.72461 11.3769 6.12461 11.3769 6.62461C11.3769 7.12461 10.9769 7.52461 10.4769 7.52461H7.4769L7.5269 7.62461C8.0269 8.47461 8.3269 9.47461 8.3769 10.5246C8.4269 10.8746 8.2769 11.1746 7.9769 11.3746C7.7769 11.5246 7.5769 11.5246 7.3269 11.4746C7.0769 11.4246 6.8769 11.2746 6.7769 11.0746C5.75715 9.29011 5.0783 7.03951 3.3269 5.77461H2.12695" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.127 2.125H9.77695C10.327 2.125 10.727 1.675 10.627 1.125C10.577 0.674998 10.177 0.375 9.72695 0.375H6.47695C6.27695 0.375 6.02695 0.375003 5.82695 0.425003L3.17695 0.874998H2.12695" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2.125 6.62501H0.375V0.375H2.125V6.62501Z" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                          <clipPath id={`clip0_thumbdown_${i}`}>
                            <rect width="12" height="12" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                  </>
                  )}
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : isJustPay && messages.length === 0 ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto nav-1049:w-[400px]">
          <JustPayJaxNewSession onSelectPill={handleJustPayPill} />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center nav-1049:w-[400px]">
          <Image alt=" Jax" priority={false} src={Jax} />
          <span className="mt-6 max-w-[268px] text-[21px]/[32px] font-bold text-[#404756]">
            What business task can I help with today?
          </span>
        </div>
      )}

      <div
        className={`flex shrink-0 flex-col bg-white md:w-[400px] ${footerShadow ? "shadow-[0_-2px_8px_rgba(0,10,30,0.06)]" : ""}`}
      >
        {!showChat && !isJustPay && (
          <div className="flex flex-wrap justify-end gap-x-[10px] gap-y-3 px-5 py-3">
            <button
              className="rounded-[30px] border border-brand-primary px-4 py-2 text-[15px]/[24px] text-brand-primary hover:bg-background-primary"
              type="button"
            >
              How much am I owed?
            </button>
            <button
              className="rounded-[30px] border border-brand-primary px-4 py-2 text-[15px]/[24px] text-brand-primary hover:bg-background-primary"
              type="button"
            >
              Send invoice
            </button>
            <button
              className="rounded-[30px] border border-brand-primary px-4 py-2 text-[15px]/[24px] text-brand-primary hover:bg-background-primary"
              type="button"
            >
              Create invoice
            </button>
            <button
              className="rounded-[30px] border border-brand-primary px-4 py-2 text-[15px]/[24px] text-brand-primary hover:bg-background-primary"
              type="button"
            >
              What invoices haven’t been paid?
            </button>
          </div>
        )}
        <div className="relative mx-5 my-3">
          {isJustPay &&
          (justPayChatVariant === "v3" || !showChat) ? (
            <div className="relative z-10 flex items-center gap-2 rounded-[28px] border border-[#ccced2] bg-white px-3 py-2 pl-3 pr-2 text-[15px]/[24px]">
              <button
                type="button"
                className="flex size-9 flex-none items-center justify-center rounded-full text-[#404756] hover:bg-[#E6E7E9]"
                aria-label="Attach"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M10 4.167v11.666M4.167 10h11.666"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <input
                className="min-w-0 flex-1 bg-transparent py-1 text-[#000] outline-none placeholder:text-content-secondary"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter message"
                type="text"
                value={inputValue}
              />
              <button
                className="group flex-none p-1"
                type="button"
                onClick={handleSend}
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9.5"
                    className="stroke-[#59606D] group-hover:stroke-[#0078C8] group-hover:fill-[#0078C8]"
                    transform="rotate(90 10 10)"
                  />
                  <path
                    className="stroke-[#59606D] group-hover:stroke-white"
                    strokeLinecap="round"
                    d="M13.571 9.286 10 5.714m0 0L6.428 9.286M10 5.714v8.572"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <span className="jax-input absolute inset-0 flex" />
              <div className="relative z-10 flex items-end gap-3 rounded-[20px] border border-[#3CDCFA] bg-white pl-4 pr-2 text-[15px]/[24px]">
                <input
                  className="w-full bg-transparent py-2 text-[#000] outline-none placeholder:text-content-secondary"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your message..."
                  type="text"
                  value={inputValue}
                />
                <button
                  className="flex-none group mb-2.5"
                  type="button"
                  onClick={handleSend}
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9.5"
                      className="stroke-[#59606D] group-hover:stroke-[#0078C8] group-hover:fill-[#0078C8] group-data-[thinking=true]:stroke-[#0078C8] group-data-[thinking=true]:fill-[#0078C8]"
                      transform="rotate(90 10 10)"
                    ></circle>
                    <path
                      className="stroke-[#59606D] group-hover:stroke-white group-data-[thinking=true]:stroke-white"
                      strokeLinecap="round"
                      d="M13.571 9.286 10 5.714m0 0L6.428 9.286M10 5.714v8.572"
                    ></path>
                  </svg>
                </button>
              </div>
              <span className="jax-bg absolute bottom-0 left-5 right-5 top-0 z-0 block rounded-[20px] opacity-100" />
            </>
          )}
        </div>
        <p className="mb-4 mt-2 text-center text-[11px]/[16px] text-[#404756]">
          JAX can make mistakes. Outputs are not financial, tax or legal advice.
          <br />
          Review{" "}
          <button type="button" className="underline hover:no-underline">
            JAX disclaimer
          </button>{" "}
          |{" "}
          <span className="inline-flex items-center gap-1">
            <button type="button" className="underline hover:no-underline">
              JAX Beta Terms
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
            >
              <path
                fill="#404756"
                fillRule="evenodd"
                d="M1.01 2.09C1 1.546 1.5 1 2 1h5v1H2v10h10V7h1v4.91c0 .544-.5 1.09-1 1.09H2c-.5 0-1-.546-1-1.09zm9.24.16L9 1h4v4l-1.25-1.25L8 7.5 6.5 6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </p>
      </div>

      {/* General Settings Sub-Panel */}
      {/* {activeSubPanel === "more-features" && (
        <SlidingSubPanel title="Just Ask Xero">
          <article className="px-5 py-5 text-[15px]/[24px]">
            <h1 className="text-[21px]/[32px] font-bold">More features</h1>
            <h2 className="mb-2 mt-5 text-[17px]/[28px] font-bold">
              Just Ask Xero wherever you are
            </h2>
            <p className="mb-2">
              Driven by advanced generative AI and securely linked to your Xero
              data.
            </p>
            <button
              className="flex items-center gap-2 text-brand-primary"
              type="button"
            >
              Frequently asked questions
              <ExternalLink stroke="stroke-brand-primary" />
            </button>
            <h2 className="mb-2 mt-5 text-[17px]/[28px] font-bold">Email</h2>
            <p className="mb-2">
              Forward your email conversations to Xero and they’ll be
              automatically turned into a quote or an invoice.
            </p>
            <input
              className="w-full rounded-[3px] border border-[#A6A9B0] px-4 py-2 text-[rgba(0,10,30,0.65)]"
              type="text"
              defaultValue="jax.oz73-s.krxwiyal9h9zn5zo@xero.com"
            />
            <button
              className="py-[6px] font-bold text-brand-primary"
              type="button"
            >
              Register my number
            </button>
            <h2 className="mb-2 mt-5 text-[17px]/[28px] font-bold">
              Chat via SMS or Whatsapp
            </h2>
            <p className="mb-2">
              Send Xero an SMS or Whatsapp message to create or update a draft
              quote or invoice.
            </p>
            <button
              className="rounded-[3px] bg-brand-primary px-4 py-2 text-[15px]/[24px] font-bold text-white"
              type="button"
            >
              Register my number
            </button>
          </article>
        </SlidingSubPanel>
      )} */}
    </div>
  );
}
