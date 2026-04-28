import type { EngagementType } from "./engagements";

export interface ExpectedItemTemplate {
  id: string;
  engagementType: EngagementType;
  label: string;
  /** Classified file category that matches this item (e.g. "Tax Documents", "Bank Statements"). */
  category: string;
}

/** Hard-coded expected-item templates for ANNUAL_TAX engagement. */
export const ANNUAL_TAX_TEMPLATES: ExpectedItemTemplate[] = [
  {
    id: "ANNUAL_TAX_1099",
    engagementType: "ANNUAL_TAX",
    label: "All 1099 forms",
    category: "Tax Documents",
  },
  {
    id: "ANNUAL_TAX_BANK_STATEMENTS",
    engagementType: "ANNUAL_TAX",
    label: "Year-end bank statements",
    category: "Bank Statements",
  },
];

export function getTemplatesForEngagementType(
  type: EngagementType
): ExpectedItemTemplate[] {
  if (type === "ANNUAL_TAX") return ANNUAL_TAX_TEMPLATES;
  return [];
}
