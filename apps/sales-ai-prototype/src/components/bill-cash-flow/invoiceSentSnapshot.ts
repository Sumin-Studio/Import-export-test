/**
 * Serializable view model for the read-only /sent-invoice screen after Send email from New Invoice.
 */

/** sessionStorage key — survives full-page navigation (avoids flaky client `router.push` + RSC/HMR in dev). */
export const INVOICE_SENT_STORAGE_KEY = "a2a-invoice-sent-snapshot-v1";

export function persistInvoiceSentSnapshot(s: InvoiceSentSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(INVOICE_SENT_STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota or private mode */
  }
}

/** Draft for /send-invoice (Approve & email → send page → Send email → /sent-invoice). */
export const PENDING_SEND_INVOICE_STORAGE_KEY = "a2a-pending-send-invoice-v1";

export type PendingSendInvoicePayload = {
  snapshot: InvoiceSentSnapshot;
  defaultToEmail: string;
  /** Short due date for email body, e.g. "17 Mar 2026" */
  dueDateFormattedShort: string;
  previewLineDescription: string;
  previewLineAmountFormatted: string;
  subtotalFormatted: string;
  gstFormatted: string;
  gstRowLabel: string;
};

export function persistPendingSendInvoice(p: PendingSendInvoicePayload): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PENDING_SEND_INVOICE_STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function readPendingSendInvoice(): PendingSendInvoicePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_SEND_INVOICE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingSendInvoicePayload;
  } catch {
    return null;
  }
}

export function clearPendingSendInvoice(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PENDING_SEND_INVOICE_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export type InvoiceSentColumnKey =
  | "item"
  | "quantity"
  | "price"
  | "discount"
  | "taxAmount"
  | "project";

export type InvoiceSentLineRow = {
  itemCode: string | null;
  itemTitle: string;
  description: string;
  qty: string;
  price: string;
  discount: string;
  accountLabel: string;
  taxRateLabel: string;
  taxAmountFormatted: string;
  amountFormatted: string;
};

export type InvoiceSentSnapshot = {
  invoiceNumber: string;
  selectedContact: string | null;
  contactAddressLines: string[];
  issueDateDisplay: string;
  dueDateDisplay: string;
  brandingTheme: string;
  taxMode: string;
  currencyCode: string;
  onlinePaymentMethod: "none" | "stripe" | "a2a";
  columnVisibility: Record<InvoiceSentColumnKey, boolean>;
  lines: InvoiceSentLineRow[];
  subtotalFormatted: string;
  totalGstFormatted: string;
  totalFormatted: string;
  hiddenColumnCount: number;
};

/** Prototype addresses for read-only sent view (Contact has no address on New Invoice). */
export function contactAddressLinesFor(contactName: string | null): string[] {
  if (!contactName) return ["No contact selected"];
  const map: Record<string, string[]> = {
    "Bayside Wholesale": ["Unit 12, 48 Triton Drive", "Albany", "Auckland 0632", "New Zealand"],
  };
  return map[contactName] ?? [`${contactName}`, "New Zealand"];
}

export function onlinePaymentsLabel(method: "none" | "stripe" | "a2a"): string {
  if (method === "stripe") return "Stripe";
  if (method === "a2a") return "Akahu Pay by Bank";
  return "None configured";
}

const DEMO_COLUMNS: Record<InvoiceSentColumnKey, boolean> = {
  item: true,
  quantity: true,
  price: true,
  discount: true,
  taxAmount: true,
  project: true,
};

/**
 * When /send-invoice is opened without sessionStorage (bookmark, refresh, cold link),
 * show the same defaults as the former full-screen Send email modal + typical New Invoice row.
 */
export function getDefaultDemoPendingSendPayload(): PendingSendInvoicePayload {
  const snapshot: InvoiceSentSnapshot = {
    invoiceNumber: "INV-0031",
    selectedContact: "Bayside Wholesale",
    contactAddressLines: contactAddressLinesFor("Bayside Wholesale"),
    issueDateDisplay: "Mar 17, 2026",
    dueDateDisplay: "17 Apr 2026",
    brandingTheme: "Standard",
    taxMode: "Tax exclusive",
    currencyCode: "NZD",
    onlinePaymentMethod: "none",
    columnVisibility: DEMO_COLUMNS,
    lines: [
      {
        itemCode: "UX",
        itemTitle: "User Experience Design",
        description:
          "Mapping wireframes and user flows to ensure an intuitive, logical, and efficient product structure.",
        qty: "1",
        price: "180.00",
        discount: "",
        accountLabel: "0500 - Sales",
        taxRateLabel: "GST on Income",
        taxAmountFormatted: "27.00",
        amountFormatted: "180.00",
      },
    ],
    subtotalFormatted: "180.00",
    totalGstFormatted: "27.00",
    totalFormatted: "207.00",
    hiddenColumnCount: 0,
  };

  return {
    snapshot,
    defaultToEmail: "accounts@baysidewholesale.co.nz",
    dueDateFormattedShort: "17 Apr 2026",
    previewLineDescription: "User Experience Design",
    previewLineAmountFormatted: "180.00",
    subtotalFormatted: "180.00",
    gstFormatted: "27.00",
    gstRowLabel: "Total GST",
  };
}
