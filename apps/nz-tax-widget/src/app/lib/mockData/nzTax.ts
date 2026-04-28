/**
 * Prototype mock data for NZ tax dashboard widgets.
 * Replace with API integration when available.
 */

export type GstFilingStatus = "due_soon" | "ok" | "overdue";

export interface GstTrackerMock {
  periodLabel: string;
  dueDate: string;
  daysUntilDue: number;
  status: GstFilingStatus;
  clients: { name: string; gstToPay: number; filingStatus: GstFilingStatus }[];
}

export interface TaxDueCountdownMock {
  label: string;
  dueDate: string;
  daysRemaining: number;
  taxType: "GST" | "Provisional tax" | "Income tax";
}

export type ComplianceLevel = "on_track" | "attention" | "at_risk";

export interface ClientComplianceMock {
  onTrack: number;
  attention: number;
  atRisk: number;
  clients: { name: string; level: ComplianceLevel; detail: string }[];
}

export const nzGstTrackerMock: GstTrackerMock = {
  periodLabel: "1 Nov 2025 – 31 Jan 2026",
  dueDate: "7 April 2026",
  daysUntilDue: 18,
  status: "due_soon",
  clients: [
    { name: "Kauri Cafe Ltd", gstToPay: 4120.5, filingStatus: "ok" },
    { name: "Southern Lights Trust", gstToPay: 0, filingStatus: "due_soon" },
    { name: "Bay Accounting Co.", gstToPay: 2840.0, filingStatus: "ok" },
  ],
};

export const nzTaxDueCountdownMock: TaxDueCountdownMock = {
  label: "Next payment",
  dueDate: "7 April 2026",
  daysRemaining: 18,
  taxType: "GST",
};

export const nzClientComplianceMock: ClientComplianceMock = {
  onTrack: 42,
  attention: 5,
  atRisk: 1,
  clients: [
    {
      name: "Kauri Cafe Ltd",
      level: "on_track",
      detail: "GST and PAYE up to date",
    },
    {
      name: "Harbour View Holdings",
      level: "attention",
      detail: "Provisional tax estimate changed",
    },
    {
      name: "Coastal Drycleaners",
      level: "at_risk",
      detail: "Overdue income tax return",
    },
  ],
};

export function formatCurrencyNzd(amount: number): string {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 0,
  }).format(amount);
}
