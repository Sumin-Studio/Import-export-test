/**
 * Demo invoice line items for the checkout preview — amounts are tax-inclusive and sum to 1,000.00.
 * Tax breakdown uses the region’s standard rate (see {@link getInvoiceTaxMeta}).
 */

export interface InvoicePreviewLine {
  description: string;
  itemCode: string;
  qty: number;
  unit: number;
  /** Line total (tax-inclusive) */
  line: number;
}

export const INVOICE_PREVIEW_LINES: InvoicePreviewLine[] = [
  {
    description: "Consulting services",
    itemCode: "SERV-001",
    qty: 5,
    unit: 65,
    line: 325,
  },
  {
    description: "Software subscription (annual)",
    itemCode: "SUB-ANNUAL",
    qty: 2,
    unit: 200,
    line: 400,
  },
  {
    description: "On-site support",
    itemCode: "SUPP-ONSITE",
    qty: 1,
    unit: 275,
    line: 275,
  },
];

/** Standard demo tax rate (%) for summary — inclusive pricing. */
export function getInvoiceTaxMeta(region: string): { label: string; ratePercent: number } {
  switch (region) {
    case "United States":
      return { label: "Sales tax", ratePercent: 8 };
    case "Australia":
      return { label: "GST", ratePercent: 10 };
    case "New Zealand":
      return { label: "GST", ratePercent: 15 };
    case "Canada":
      return { label: "GST", ratePercent: 5 };
    case "South Africa":
      return { label: "VAT", ratePercent: 15 };
    case "United Kingdom":
    default:
      return { label: "VAT", ratePercent: 20 };
  }
}

export function formatInvoiceAmount(
  amount: number,
  dateLocale: string,
): string {
  if (!Number.isFinite(amount)) {
    return "—";
  }
  const rounded = Math.round(amount * 100) / 100;
  return new Intl.NumberFormat(dateLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

/** Net and tax components when the total is tax-inclusive at `ratePercent`. */
export function splitInclusiveTax(
  totalInclusive: number,
  ratePercent: number,
): { net: number; tax: number } {
  if (ratePercent <= 0) {
    return { net: totalInclusive, tax: 0 };
  }
  const net = totalInclusive / (1 + ratePercent / 100);
  const tax = totalInclusive - net;
  return { net, tax };
}
