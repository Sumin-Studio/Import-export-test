export type BillStatus =
  | "draft"
  | "awaiting_approval"
  | "awaiting_payment"
  | "overdue"
  | "paid";

export type RiskType =
  | "first_time_supplier"
  | "anomalous_amount"
  | "duplicate"
  | "bank_detail_change";

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  account: string;
  taxRate: number;
  amount: number;
}

export type ActionVariant = "primary" | "secondary" | "destructive" | "ghost";

export interface SuggestedAction {
  id: string;
  label: string;
  description: string;
  icon: "network" | "search" | "check" | "x" | "eye" | "trash" | "chart" | "dollar" | "mail";
  variant: ActionVariant;
  /** Simulated agent result shown after the loading state */
  agentResult?: string;
  /** Confirmation message shown after the action is taken (non-agent actions) */
  confirmation?: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  supplier: string;
  supplierBillCount: number;
  issueDate: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: BillStatus;
  lineItems: LineItem[];
  creationChannel?: string;
  aiFlagged: boolean;
  aiReason?: string;
  riskLevel?: "low" | "medium" | "high";
  riskType?: RiskType;
  suggestedActions?: SuggestedAction[];
  /** For duplicate bills, the ID of the original bill */
  duplicateOfBillId?: string;
  /** Demo: extra risk lines for multi-risk UI (e.g. action centre + popover) */
  additionalRiskLabels?: string[];
  /** Short line for bills list hover (e.g. prototype 9); aligns with purchases overview tooltip density. */
  protectListSummary?: string;
  /** Short line(s) for bill detail alert (e.g. prototype 9). */
  protectDetailSummary?: string;
  /**
   * Prototype list hover: bank lines (matches purchases “last account” vs “this bill”).
   */
  protectBankLines?: { lastLine: string; thisLine: string };
  /**
   * Prototype list hover: unusual amount — typical vs this bill (amounts are display strings).
   */
  protectUnusualAmount?: {
    typical: string;
    /** Defaults to formatted bill total in UI if omitted. */
    thisBill?: string;
    comparison?: string;
  };
}

const lineItem = (
  description: string,
  quantity: number,
  unitPrice: number,
  account: string
): LineItem => ({
  description,
  quantity,
  unitPrice,
  account,
  taxRate: 10,
  amount: Math.round(quantity * unitPrice * 100) / 100,
});

const bill = (
  id: string,
  billNumber: string,
  supplier: string,
  supplierBillCount: number,
  issueDate: string,
  dueDate: string,
  amount: number,
  status: BillStatus,
  lineItems: LineItem[],
  flags?: {
    aiFlagged?: boolean;
    aiReason?: string;
    riskLevel?: "low" | "medium" | "high";
    riskType?: RiskType;
    suggestedActions?: SuggestedAction[];
    duplicateOfBillId?: string;
    creationChannel?: string;
    additionalRiskLabels?: string[];
    protectListSummary?: string;
    protectDetailSummary?: string;
    protectBankLines?: { lastLine: string; thisLine: string };
    protectUnusualAmount?: {
      typical: string;
      thisBill?: string;
      comparison?: string;
    };
  }
): Bill => {
  const tax = Math.round(amount * 0.1 * 100) / 100;

  return {
    id,
    billNumber,
    supplier,
    supplierBillCount,
    issueDate,
    dueDate,
    amount,
    tax,
    total: Math.round((amount + tax) * 100) / 100,
    status,
    lineItems,
    creationChannel: flags?.creationChannel,
    aiFlagged: flags?.aiFlagged ?? false,
    aiReason: flags?.aiReason,
    riskLevel: flags?.riskLevel,
    riskType: flags?.riskType,
    suggestedActions: flags?.suggestedActions,
    duplicateOfBillId: flags?.duplicateOfBillId,
    additionalRiskLabels: flags?.additionalRiskLabels,
    protectListSummary: flags?.protectListSummary,
    protectDetailSummary: flags?.protectDetailSummary,
    protectBankLines: flags?.protectBankLines,
    protectUnusualAmount: flags?.protectUnusualAmount,
  };
};

/* ── Reusable action templates per risk type ── */

const firstTimeSupplierActions = (supplier: string): SuggestedAction[] => [
  {
    id: "network-check",
    label: "Call supplier to verify",
    description: `Call ${supplier} on a trusted number and confirm this bill is expected`,
    icon: "network",
    variant: "primary",
    agentResult: `247 other businesses on Xero pay ${supplier}. Their average bill is $14,200. This bill is consistent with the network.`,
  },
  {
    id: "cross-reference",
    label: "Check supporting documents",
    description: "Check PO, quote, or contract details before approving",
    icon: "search",
    variant: "secondary",
    agentResult: `Found a signed engagement letter dated 12 Feb for this supplier. The agreed amount matches this bill.`,
  },
  {
    id: "approve-with-note",
    label: "Dismiss and approve",
    description: "If confirmed legitimate, dismiss this alert and continue",
    icon: "check",
    variant: "ghost",
    confirmation: "Bill approved. Decision recorded in audit trail.",
  },
  {
    id: "dismiss",
    label: "Report as suspicious",
    description: "If fraud is suspected, report and hold payment",
    icon: "x",
    variant: "ghost",
    confirmation: "Flag dismissed. Decision recorded.",
  },
];

const duplicateActions = (
  originalBillNumber: string,
  supplier: string
): SuggestedAction[] => [
  {
    id: "view-original",
    label: "Compare with existing bill",
    description: `Open ${originalBillNumber} and compare details side by side`,
    icon: "eye",
    variant: "primary",
    agentResult: `Original ${originalBillNumber} was uploaded via Hubdoc on 5 Feb. This copy arrived via email-to-bill on 7 Feb. Same PDF, different channel.`,
  },
  {
    id: "void-and-reconcile",
    label: "Void duplicate",
    description: "Void the duplicate if confirmed",
    icon: "trash",
    variant: "destructive",
    confirmation: `Voided this bill and created a $310.00 overpayment against ${supplier} for recovery.`,
  },
  {
    id: "not-duplicate",
    label: "Dismiss and pay both",
    description: "If both are genuine obligations, dismiss and pay both",
    icon: "x",
    variant: "ghost",
    confirmation: "Marked as not a duplicate. Decision recorded.",
  },
];

const anomalousAmountActions = (
  supplier: string,
  avgAmount: string,
  newItem: string
): SuggestedAction[] => [
  {
    id: "explain-spike",
    label: "Check PO, quote, or contract",
    description: "Validate the amount against approved commercial terms",
    icon: "chart",
    variant: "primary",
    agentResult: `${supplier} normally bills around ${avgAmount}/month. The difference is a new line item: '${newItem}'. No matching line item in previous bills.`,
  },
  {
    id: "cash-impact",
    label: "Contact supplier",
    description: `Contact ${supplier} to confirm the billed amount`,
    icon: "dollar",
    variant: "secondary",
    agentResult:
      "Paying this bill reduces your available balance to $3,200, which is below next week's payroll run of $8,400. Consider scheduling this payment after the 20th.",
  },
  {
    id: "approve-with-note",
    label: "Dismiss or edit",
    description: "If correct, dismiss and approve. If incorrect, edit or void",
    icon: "check",
    variant: "ghost",
    confirmation: "Bill approved. Decision recorded in audit trail.",
  },
];

const bankDetailChangeActions = (supplier: string): SuggestedAction[] => [
  {
    id: "confirm-details",
    label: "Call supplier to verify",
    description: `Call ${supplier} on a trusted number to confirm account details`,
    icon: "search",
    variant: "primary",
    agentResult: `Contact ${supplier} to confirm the new bank account. Use a known phone number or email from your records, not details from the invoice.`,
  },
  {
    id: "contact-supplier",
    label: "Check internal authorization",
    description: "Confirm the bank detail change was authorized internally",
    icon: "mail",
    variant: "secondary",
    agentResult: `Draft sent. Ask ${supplier} to confirm the account change and reason. Do not pay until you receive verification.`,
  },
  {
    id: "dismiss",
    label: "Report as suspicious",
    description: "If unauthorized, revert details, hold payment, and report fraud",
    icon: "x",
    variant: "ghost",
    confirmation: "Flag dismissed. Decision recorded.",
  },
];

const safetyShieldBillsSource: Bill[] = [
  bill(
    "1",
    "BILL-001",
    "Paper Plus Ltd",
    12,
    "2026-01-15",
    "2026-02-15",
    245.0,
    "paid",
    [lineItem("A4 Copy Paper x20", 20, 12.25, "Office Supplies")]
  ),
  bill(
    "2",
    "BILL-002",
    "City Power Co",
    24,
    "2026-01-20",
    "2026-02-20",
    892.5,
    "paid",
    [lineItem("Electricity - January", 1, 892.5, "Utilities")]
  ),
  bill(
    "3",
    "BILL-003",
    "Fresh Foods NZ",
    8,
    "2026-01-22",
    "2026-02-22",
    1340.0,
    "awaiting_payment",
    [lineItem("Catering supplies", 1, 1340.0, "Food & Beverage")]
  ),
  bill(
    "4",
    "BILL-004",
    "WebHost Pro",
    6,
    "2026-01-25",
    "2026-02-25",
    199.0,
    "paid",
    [lineItem("Monthly hosting", 1, 199.0, "IT & Software")]
  ),
  bill(
    "5",
    "BILL-005",
    "CleanRight Services",
    15,
    "2026-02-01",
    "2026-03-01",
    450.0,
    "awaiting_payment",
    [lineItem("Office cleaning - Feb", 1, 450.0, "Facilities")]
  ),
  bill(
    "6",
    "BILL-006",
    "Paper Plus Ltd",
    12,
    "2026-02-05",
    "2026-03-05",
    310.0,
    "awaiting_approval",
    [lineItem("Printer toner x5", 5, 62.0, "Office Supplies")]
  ),
  bill(
    "7",
    "BILL-007",
    "Metro Couriers",
    10,
    "2026-02-07",
    "2026-03-07",
    185.0,
    "awaiting_approval",
    [lineItem("Courier deliveries", 5, 37.0, "Shipping")]
  ),
  bill(
    "26",
    "BILL-026",
    "Metro Couriers",
    10,
    "2026-02-05",
    "2026-03-05",
    185.0,
    "paid",
    [lineItem("Courier deliveries", 5, 37.0, "Shipping")]
  ),
  bill(
    "8",
    "BILL-008",
    "City Power Co",
    24,
    "2026-02-10",
    "2026-02-28",
    945.0,
    "overdue",
    [lineItem("Electricity - February", 1, 945.0, "Utilities")]
  ),
  bill(
    "9",
    "BILL-009",
    "Fresh Foods NZ",
    8,
    "2026-02-12",
    "2026-03-12",
    1120.0,
    "awaiting_approval",
    [lineItem("Weekly catering order", 4, 280.0, "Food & Beverage")]
  ),
  bill(
    "10",
    "BILL-010",
    "TechSupply Direct",
    3,
    "2026-02-14",
    "2026-03-14",
    2850.0,
    "awaiting_approval",
    [
      lineItem("Monitors x3", 3, 650.0, "Equipment"),
      lineItem("Keyboard & mice x3", 3, 300.0, "Equipment"),
    ]
  ),
  bill(
    "11",
    "BILL-011",
    "CleanRight Services",
    15,
    "2026-02-15",
    "2026-03-15",
    450.0,
    "draft",
    [lineItem("Office cleaning - Mar", 1, 450.0, "Facilities")]
  ),
  bill(
    "12",
    "BILL-012",
    "Metro Couriers",
    10,
    "2026-02-16",
    "2026-03-16",
    222.0,
    "draft",
    [lineItem("Express deliveries", 6, 37.0, "Shipping")]
  ),
  // ── First-time supplier (standard) ──
  bill(
    "13",
    "BILL-013",
    "Quantum Consulting Group",
    0,
    "2026-02-17",
    "2026-03-17",
    18500.0,
    "awaiting_approval",
    [
      lineItem("Strategic advisory services", 1, 12000.0, "Professional Services"),
      lineItem("Market analysis report", 1, 6500.0, "Professional Services"),
    ],
    {
      aiFlagged: true,
      aiReason:
        "First-time supplier. You have never paid this supplier before. This amount is larger than your typical payment size. Call the supplier on a trusted number to verify before approving.",
      riskLevel: "high",
      riskType: "first_time_supplier",
      suggestedActions: firstTimeSupplierActions("Quantum Consulting Group"),
      protectDetailSummary:
        "No prior payments to this supplier. Confirm on a trusted number before approving.",
    }
  ),
  bill(
    "14",
    "BILL-014",
    "Apex Security Solutions",
    0,
    "2026-02-18",
    "2026-03-18",
    7200.0,
    "awaiting_approval",
    [
      lineItem("Security system installation", 1, 5500.0, "Equipment"),
      lineItem("12-month monitoring", 1, 1700.0, "Services"),
    ],
    {
      aiFlagged: true,
      aiReason:
        "First-time supplier. This bill came via Email-to-bill and there is no prior payment history. New suppliers and new channels increase risk. Verify legitimacy before approving.",
      riskLevel: "high",
      riskType: "first_time_supplier",
      creationChannel: "Email-to-bill",
      suggestedActions: firstTimeSupplierActions("Apex Security Solutions"),
      protectDetailSummary:
        "No prior payments to this supplier. Confirm the supplier and bank details before approving.",
    }
  ),
  bill(
    "15",
    "BILL-015",
    "GreenLeaf Office Plants",
    0,
    "2026-02-19",
    "2026-03-19",
    890.0,
    "awaiting_approval",
    [
      lineItem("Indoor plant hire - quarterly", 1, 690.0, "Office Supplies"),
      lineItem("Plant maintenance", 1, 200.0, "Facilities"),
    ]
  ),
  // ── Unusual amount (research hero bill — was duplicate BILL-019 vs BILL-006) ──
  bill(
    "19",
    "BILL-019",
    "Paper Plus Ltd",
    12,
    "2026-02-05",
    "2026-03-05",
    860.0,
    "awaiting_approval",
    [
      lineItem("Printer toner x5", 5, 62.0, "Office Supplies"),
      lineItem("Office equipment — display stands", 1, 550.0, "Office Supplies"),
    ],
    {
      aiFlagged: true,
      aiReason:
        "Unusually large bill. This amount is well above your typical monthly spend with this supplier (12-month average $310). New high-value line items appear on this bill. Check PO, quote, or contract before approval.",
      riskLevel: "high",
      riskType: "anomalous_amount",
      creationChannel: "Email-to-bill",
      suggestedActions: anomalousAmountActions(
        "Paper Plus Ltd",
        "$310",
        "Office equipment — display stands ($550)"
      ),
      protectUnusualAmount: {
        typical: "$310",
        comparison: "≈2.9× typical for this supplier",
      },
      protectDetailSummary:
        "This bill is much higher than usual for Paper Plus Ltd.",
      protectListSummary: "Bill is ≈2.9× this supplier’s typical amount.",
    }
  ),
  // ── Bank detail change ──
  bill(
    "22",
    "BILL-022",
    "SecurePay Solutions",
    8,
    "2026-02-21",
    "2026-03-21",
    4200.0,
    "awaiting_payment",
    [
      lineItem("Payment gateway integration", 1, 3500.0, "IT & Software"),
      lineItem("Annual support", 1, 700.0, "Services"),
    ],
    {
      aiFlagged: true,
      aiReason:
        "Bank details recently changed. Supplier payment account was updated 3 days ago. Bank detail changes are a common fraud vector. Verify the new account before paying.",
      riskLevel: "high",
      riskType: "bank_detail_change",
      suggestedActions: bankDetailChangeActions("SecurePay Solutions"),
      protectBankLines: {
        lastLine: "Last payment account: ···3104",
        thisLine: "This bill account: ···8822 (updated 3 days ago)",
      },
    }
  ),
  // ── Critical anomalous amount (>70% above supplier avg) ──
  bill(
    "23",
    "BILL-023",
    "City Power Co",
    24,
    "2026-02-25",
    "2026-03-25",
    2685.0,
    "awaiting_approval",
    [
      lineItem("Electricity - March", 1, 1850.0, "Utilities"),
      lineItem("Demand charge - peak", 1, 835.0, "Utilities"),
    ],
    {
      aiFlagged: true,
      aiReason:
        "Unusually large bill. This amount is 2.85x your typical level for this supplier (3-month average $940). It is also above the prior peak and should be confirmed before payment.",
      riskLevel: "high",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "City Power Co",
        "$940",
        "Demand charge - peak ($835)"
      ),
      protectUnusualAmount: {
        typical: "$940",
        comparison: "≈2.85× typical for this supplier",
      },
    }
  ),
  // ── Duplicate: invoice already paid ──
  bill(
    "24",
    "BILL-024",
    "Metro Couriers",
    10,
    "2026-02-26",
    "2026-03-26",
    185.0,
    "awaiting_approval",
    [lineItem("Courier deliveries", 5, 37.0, "Shipping")],
    {
      aiFlagged: true,
      aiReason:
        "Possible duplicate (exact match). Same supplier, reference, and amount as a bill already paid on 5 Feb. Paying this one too would likely be a duplicate payment.",
      riskLevel: "high",
      riskType: "duplicate",
      duplicateOfBillId: "26",
      suggestedActions: duplicateActions("BILL-026", "Metro Couriers"),
    }
  ),
  // ── Anomalous amount (warning band: 30–70% above avg) ──
  bill(
    "20",
    "BILL-020",
    "CleanRight Services",
    15,
    "2026-02-22",
    "2026-03-22",
    652.5,
    "awaiting_approval",
    [
      lineItem("Office cleaning - Mar", 1, 450.0, "Facilities"),
      lineItem("Deep clean — post-renovation", 1, 202.5, "Facilities"),
    ],
    {
      aiFlagged: true,
      aiReason:
        "Unusually large bill. This amount is 1.45x your normal level for this supplier (3-month average $450). A new line item appears on this bill. Check PO, quote, or contract before approval.",
      riskLevel: "medium",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "CleanRight Services",
        "$450",
        "Deep clean — post-renovation ($202.50)"
      ),
      protectUnusualAmount: {
        typical: "$450",
        comparison: "≈1.45× typical for this supplier",
      },
    }
  ),
  // ── Lookalike duplicate ──
  bill(
    "21",
    "BILL-021",
    "Fresh Foods NZ",
    8,
    "2026-01-22",
    "2026-02-22",
    1340.0,
    "awaiting_payment",
    [lineItem("Catering supplies", 1, 1340.0, "Food & Beverage")],
    {
      aiFlagged: true,
      aiReason:
        "Possible duplicate (fuzzy match). Same supplier with close reference, amount, and date to BILL-003. Bills are similar but not identical. Review both before paying.",
      riskLevel: "medium",
      riskType: "duplicate",
      duplicateOfBillId: "3",
      creationChannel: "Email-to-bill",
      suggestedActions: duplicateActions("BILL-003", "Fresh Foods NZ"),
    }
  ),
  // ── Below-average amount (>50% below supplier avg) ──
  bill(
    "25",
    "BILL-025",
    "WebHost Pro",
    6,
    "2026-02-27",
    "2026-03-27",
    75.0,
    "awaiting_approval",
    [lineItem("Partial hosting credit", 1, 75.0, "IT & Software")],
    {
      aiFlagged: true,
      aiReason:
        "Amount anomaly. This bill is below the normal amount for this supplier ($199 baseline). Lower amounts can be valid credits or partials, but should still be verified.",
      riskLevel: "medium",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "WebHost Pro",
        "$199",
        "Partial hosting credit ($75)"
      ),
      protectUnusualAmount: {
        typical: "$199",
        comparison: "Below usual — likely a credit or partial",
      },
    }
  ),
  // ── Purchases overview / Protect widget demo (named suppliers) ──
  bill(
    "27",
    "BILL-027",
    "Acme Supplies Ltd",
    14,
    "2026-03-01",
    "2026-03-10",
    11272.73,
    "awaiting_approval",
    [lineItem("Bulk inventory — Q1 restock", 1, 11272.73, "Inventory")],
    {
      aiFlagged: true,
      aiReason:
        "Unusually large bill. This amount is well above this supplier's typical monthly level. Verify PO, delivery, and pricing before approval.",
      riskLevel: "medium",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "Acme Supplies Ltd",
        "$3,200",
        "Bulk inventory — Q1 restock ($11,272.73)"
      ),
      protectUnusualAmount: {
        typical: "$3,200",
        comparison: "≈288% above 12-mo average",
      },
    }
  ),
  bill(
    "28",
    "BILL-028",
    "Tech Partners Ltd",
    6,
    "2026-03-02",
    "2026-03-12",
    590.91,
    "awaiting_payment",
    [lineItem("IT support — monthly", 1, 590.91, "IT & Software")],
    {
      aiFlagged: true,
      aiReason:
        "Bank details recently changed. Supplier payment account was updated recently. Bank detail changes are a common fraud vector. Verify the new account before paying.",
      riskLevel: "high",
      riskType: "bank_detail_change",
      suggestedActions: bankDetailChangeActions("Tech Partners Ltd"),
      protectBankLines: {
        lastLine: "Last payment account: ···4821",
        thisLine: "This bill account: ···5912 (updated 3 days ago)",
      },
    }
  ),
  bill(
    "30",
    "BILL-030",
    "Pacific Insurance",
    3,
    "2026-03-02",
    "2026-03-09",
    1909.09,
    "paid",
    [lineItem("Commercial liability premium", 1, 1909.09, "Insurance")]
  ),
  bill(
    "29",
    "BILL-029",
    "Pacific Insurance",
    3,
    "2026-03-12",
    "2026-03-19",
    1909.09,
    "awaiting_payment",
    [lineItem("Commercial liability premium", 1, 1909.09, "Insurance")],
    {
      aiFlagged: true,
      aiReason:
        "Possible duplicate (fuzzy match). Same supplier, amount, and line items as a policy payment already recorded. Review both before paying.",
      riskLevel: "medium",
      riskType: "duplicate",
      duplicateOfBillId: "30",
      creationChannel: "Email-to-bill",
      suggestedActions: duplicateActions("BILL-030", "Pacific Insurance"),
    }
  ),
];

/** Prototype 9 user research: keep the full bills list; only these rows show Protect shields. */
const RESEARCH_PROTOTYPE_FLAGGED_IDS = new Set<string>(["13", "19"]);

function stripResearchPrototypeProtectFields(b: Bill): Bill {
  if (RESEARCH_PROTOTYPE_FLAGGED_IDS.has(b.id)) return b;
  return {
    ...b,
    aiFlagged: false,
    aiReason: undefined,
    riskLevel: undefined,
    riskType: undefined,
    suggestedActions: undefined,
    duplicateOfBillId: undefined,
    additionalRiskLabels: undefined,
    protectListSummary: undefined,
    protectDetailSummary: undefined,
    protectBankLines: undefined,
    protectUnusualAmount: undefined,
    creationChannel: undefined,
  };
}

export const safetyShieldBills: Bill[] = safetyShieldBillsSource.map(stripResearchPrototypeProtectFields);

export function getSafetyShieldBillById(id: string) {
  return safetyShieldBills.find((entry) => entry.id === id);
}

/** Ordered bill IDs for prev/next navigation (same order as list). */
export function getSafetyShieldBillIds(): string[] {
  return safetyShieldBills.map((b) => b.id);
}

export function getSafetyShieldBillsByStatus(status: BillStatus) {
  return safetyShieldBills.filter((entry) => entry.status === status);
}

export function getFlaggedSafetyShieldBills() {
  return safetyShieldBills.filter((entry) => entry.aiFlagged);
}

export function getFlaggedCountsByRiskType() {
  const flagged = getFlaggedSafetyShieldBills();
  const counts: Partial<Record<RiskType, number>> = {};
  for (const bill of flagged) {
    if (bill.riskType) {
      counts[bill.riskType] = (counts[bill.riskType] ?? 0) + 1;
    }
  }
  return counts;
}

export const riskTypeLabels: Record<RiskType, string> = {
  first_time_supplier: "First-time supplier",
  anomalous_amount: "Bill value higher than normal",
  duplicate: "Duplicate",
  bank_detail_change: "Supplier bank details recently changed",
};

export function getAverageSafetyShieldBillAmount() {
  const unflagged = safetyShieldBills.filter((entry) => !entry.aiFlagged);
  const total = unflagged.reduce((sum, entry) => sum + entry.amount, 0);
  return Math.round(total / unflagged.length);
}
