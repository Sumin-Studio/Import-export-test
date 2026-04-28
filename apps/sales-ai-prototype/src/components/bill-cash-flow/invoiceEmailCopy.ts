import type { InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";

export const INVOICE_EMAIL_ORG_NAME = "Foxglove Studios";

export function buildInvoiceEmailSubject(invoiceNumber: string, contactLabel: string): string {
  return `Invoice ${invoiceNumber} from ${INVOICE_EMAIL_ORG_NAME} for ${contactLabel}`;
}

export function buildInvoiceEmailMessage(body: {
  greetingName: string;
  invoiceNumber: string;
  totalFormatted: string;
  dueDateFormatted: string;
  currencyCode: string;
}): string {
  const { greetingName, invoiceNumber, totalFormatted, dueDateFormatted, currencyCode } = body;
  return `Hi ${greetingName},

Please find attached invoice ${invoiceNumber} for ${totalFormatted} ${currencyCode}.

The amount outstanding of ${totalFormatted} ${currencyCode} is due on ${dueDateFormatted}.

View and pay your bill online: [Online Invoice Link]

From your online bill you can print a PDF, export a CSV, or create a free login and view your outstanding bills.

If you have any questions, please let us know.

Thanks and regards,

Alex Driver
CEO | Founder
${INVOICE_EMAIL_ORG_NAME}`;
}

/** Build message from persisted New Invoice / send flow snapshot. */
export function buildInvoiceEmailMessageFromSnapshot(s: InvoiceSentSnapshot): string {
  const greetingName = s.selectedContact?.trim() || "there";
  return buildInvoiceEmailMessage({
    greetingName,
    invoiceNumber: s.invoiceNumber,
    totalFormatted: s.totalFormatted,
    dueDateFormatted: s.dueDateDisplay,
    currencyCode: s.currencyCode,
  });
}

export function buildInvoiceEmailSubjectFromSnapshot(s: InvoiceSentSnapshot): string {
  const contactLabel = s.selectedContact?.trim() || "your contact";
  return buildInvoiceEmailSubject(s.invoiceNumber, contactLabel);
}
