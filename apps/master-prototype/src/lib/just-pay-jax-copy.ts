/** Copy for the Just Pay entry when opened from /just-pay/prototype (JAX sub-panel "just-pay"). */

/** Figma 8:10414 — new session headline (message canvas). */
export const JUST_PAY_JAX_NEW_SESSION_HEADLINE = "Just pay your supplier";

/** Figma — quick reply pill labels (order preserved). */
export const JUST_PAY_QUICK_REPLY_LABELS = [
  "I don't have an invoice",
  "I have a physical invoice",
  "I have a PDF",
  "I have an image",
] as const;

export type JustPayQuickReplyLabel = (typeof JUST_PAY_QUICK_REPLY_LABELS)[number];

/** Pill label — used to branch the no-invoice → name → review card flow. */
export const JUST_PAY_NO_INVOICE_LABEL = "I don't have an invoice" as const;

const PILL_REPLY_MAP: Record<string, string> = {
  [JUST_PAY_NO_INVOICE_LABEL]: `No problem — we can pay a supplier without a bill first.

**What's the supplier's name?** Type it below and I'll look them up in your contacts.`,

  "I have a physical invoice": `Got it. You can snap a quick photo or type the key details — supplier, amount, and due date if you have it. I'll turn that into a draft payment for you to review.

Want to start with who you're paying and the amount?`,

  "I have a PDF": `Great — upload the PDF and I'll pull supplier, amount, and due date where I can. You'll get a clear summary to approve before payment.

If anything's unclear in the file, I'll ask one short follow-up instead of making you re-type everything.`,

  "I have an image": `Perfect — share the image (photo or screenshot). I'll read what I can for supplier and amount and line up a draft payment for your approval.

If the image is hard to read, tell me the payee and amount in text and we'll still keep moving.`,
};

export function getJustPayPillAssistantReply(pillLabel: string): string {
  return PILL_REPLY_MAP[pillLabel] ?? JUST_PAY_JAX_REPLY_TO_USER;
}

/** Figma 8:10757 — intro line after the user types a supplier name (no-invoice path). */
export function getJustPayNoInvoiceAfterNameIntro(supplierName: string): string {
  const name = supplierName.trim() || "this supplier";
  return `Thanks — I've matched **${name}** using what you told me. Review the details below, then add the amount when you're ready.`;
}

/** First assistant reply when the user types in the composer without using a pill (empty thread → first message). */
export const JUST_PAY_JAX_ASSISTANT_REPLY = `I can help with that. Tell me who you're paying and how much — or choose someone from your contacts — and I'll line up the payment so you only confirm the details.

If there's already a bill in Xero, I'll match to it; if not, I'll create what we need so you're not re-keying data.`;

export const JUST_PAY_JAX_REPLY_TO_USER =
  "Got it. Say a supplier name and amount, or choose someone from your contacts — I'll line up the payment for you to confirm.";

export const JUST_PAY_JAX_FOLLOWUP =
  "Want to pick a supplier from your list, or tell me a new payee and amount to continue?";

/** After the user taps Confirm payment — ask them to pick a bank account in the card (prototype). */
export const JUST_PAY_SELECT_FUNDING_PROMPT = `Choose a **funding source** — select which bank account this payment should come from below.`;

/** After the user picks a bank account and confirms (prototype). */
export function getJustPayCongratulations(fundingAccountLabel: string): string {
  const label = fundingAccountLabel.trim() || "your account";
  return `Nice work — your payment is lined up from **${label}**.

You'll get a confirmation when it's sent. You can still make changes from your bank feed until it processes.`;
}
