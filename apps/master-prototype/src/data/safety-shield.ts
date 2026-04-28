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
  };
};

/* ── Reusable action templates per risk type ── */

const firstTimeSupplierActions = (supplier: string): SuggestedAction[] => [
  {
    id: "network-check",
    label: "Check Xero network",
    description: `See if other businesses on Xero pay ${supplier}`,
    icon: "network",
    variant: "primary",
    agentResult: `247 other businesses on Xero pay ${supplier}. Their average bill is $14,200. This bill is consistent with the network.`,
  },
  {
    id: "cross-reference",
    label: "Cross-reference your records",
    description: "Search quotes, POs, bank feed, and contacts for matches",
    icon: "search",
    variant: "secondary",
    agentResult: `Found a signed engagement letter dated 12 Feb for this supplier. The agreed amount matches this bill.`,
  },
  {
    id: "approve-with-note",
    label: "Approve with note",
    description: "Approve and record your reasoning in the audit trail",
    icon: "check",
    variant: "ghost",
    confirmation: "Bill approved. Decision recorded in audit trail.",
  },
  {
    id: "dismiss",
    label: "Dismiss flag",
    description: "Acknowledge the risk and remove the flag",
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
    label: "View original bill",
    description: `Compare side-by-side with ${originalBillNumber}`,
    icon: "eye",
    variant: "primary",
    agentResult: `Original ${originalBillNumber} was uploaded via Hubdoc on 5 Feb. This copy arrived via email-to-bill on 7 Feb. Same PDF, different channel.`,
  },
  {
    id: "void-and-reconcile",
    label: "Void and reconcile",
    description: "Void this bill and clean up any linked payments",
    icon: "trash",
    variant: "destructive",
    confirmation: `Voided this bill and created a $310.00 overpayment against ${supplier} for recovery.`,
  },
  {
    id: "not-duplicate",
    label: "Not a duplicate",
    description: "Mark as separate bill and remove the flag",
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
    label: "Explain the spike",
    description: "Compare line items to recent bills from this supplier",
    icon: "chart",
    variant: "primary",
    agentResult: `${supplier} normally bills around ${avgAmount}/month. The difference is a new line item: '${newItem}'. No matching line item in previous bills.`,
  },
  {
    id: "cash-impact",
    label: "Show cash impact",
    description: "See how this payment affects your cash position",
    icon: "dollar",
    variant: "secondary",
    agentResult:
      "Paying this bill reduces your available balance to $3,200, which is below next week's payroll run of $8,400. Consider scheduling this payment after the 20th.",
  },
  {
    id: "approve-with-note",
    label: "Approve with note",
    description: "Approve and record your reasoning in the audit trail",
    icon: "check",
    variant: "ghost",
    confirmation: "Bill approved. Decision recorded in audit trail.",
  },
];

const bankDetailChangeActions = (supplier: string): SuggestedAction[] => [
  {
    id: "confirm-details",
    label: "Confirm bank details",
    description: "Verify the new account with the supplier before paying",
    icon: "search",
    variant: "primary",
    agentResult: `Contact ${supplier} to confirm the new bank account. Use a known phone number or email from your records, not details from the invoice.`,
  },
  {
    id: "contact-supplier",
    label: "Contact supplier",
    description: "Reach out via a trusted channel to validate the change",
    icon: "mail",
    variant: "secondary",
    agentResult: `Draft sent. Ask ${supplier} to confirm the account change and reason. Do not pay until you receive verification.`,
  },
  {
    id: "dismiss",
    label: "Dismiss flag",
    description: "Acknowledge the risk and remove the flag",
    icon: "x",
    variant: "ghost",
    confirmation: "Flag dismissed. Decision recorded.",
  },
];

export const safetyShieldBills: Bill[] = [
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
        "First bill from this supplier. No prior payment history to verify. Amount is significantly higher than your average bill.",
      riskLevel: "high",
      riskType: "first_time_supplier",
      suggestedActions: firstTimeSupplierActions("Quantum Consulting Group"),
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
        "First bill from this supplier, submitted via Email-to-bill. No prior payment history. Fabricated invoices most likely enter through this combination of new contact and auto channel.",
      riskLevel: "high",
      riskType: "first_time_supplier",
      creationChannel: "Email-to-bill",
      suggestedActions: firstTimeSupplierActions("Apex Security Solutions"),
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
  // ── Exact duplicate ──
  bill(
    "19",
    "BILL-019",
    "Paper Plus Ltd",
    12,
    "2026-02-05",
    "2026-03-05",
    310.0,
    "awaiting_approval",
    [lineItem("Printer toner x5", 5, 62.0, "Office Supplies")],
    {
      aiFlagged: true,
      aiReason:
        "Exact duplicate of BILL-006. Same supplier, reference, amount, and date. Original uploaded via Hubdoc; this copy arrived via email-to-bill. Same PDF, different channel.",
      riskLevel: "high",
      riskType: "duplicate",
      duplicateOfBillId: "6",
      creationChannel: "Email-to-bill",
      suggestedActions: duplicateActions("BILL-006", "Paper Plus Ltd"),
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
        "Supplier bank account was changed 3 days ago. No prior payment to this account. Confirm details before paying.",
      riskLevel: "high",
      riskType: "bank_detail_change",
      suggestedActions: bankDetailChangeActions("SecurePay Solutions"),
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
        "Bill is 185% above this supplier's 3-month average of $940/month. No matching line item in recent bills. Verify before paying.",
      riskLevel: "high",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "City Power Co",
        "$940",
        "Demand charge - peak ($835)"
      ),
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
        "Same invoice number (INV-2026-042) was already paid to this supplier on 5 Feb. Possible double payment.",
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
        "Bill is 45% above this supplier's 3-month average of $450/month. New line item 'Deep clean — post-renovation' not seen in previous bills.",
      riskLevel: "medium",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "CleanRight Services",
        "$450",
        "Deep clean — post-renovation ($202.50)"
      ),
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
        "Similar to BILL-003: same supplier, amount, and line items. Original entered manually; this copy via email-to-bill two weeks later. Possible duplicate.",
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
        "Bill is 62% below this supplier's usual amount of $199/month. May indicate partial payment, credit note, or data entry error.",
      riskLevel: "medium",
      riskType: "anomalous_amount",
      suggestedActions: anomalousAmountActions(
        "WebHost Pro",
        "$199",
        "Partial hosting credit ($75)"
      ),
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

function safeDecodeURIComponent(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/**
 * Resolves a bill from a URL segment (numeric id, zero-padded id, or bill reference e.g. BILL-003).
 * Protect/Jax deep links often use the human-visible reference rather than the internal id.
 */
export function getSafetyShieldBillById(id: string) {
  const raw = safeDecodeURIComponent(id).trim();
  if (!raw) return undefined;

  const byId = safetyShieldBills.find((entry) => entry.id === raw);
  if (byId) return byId;

  const lower = raw.toLowerCase();
  const byBillNumber = safetyShieldBills.find(
    (entry) => entry.billNumber.toLowerCase() === lower
  );
  if (byBillNumber) return byBillNumber;

  if (/^\d+$/.test(raw)) {
    const normalized = String(parseInt(raw, 10));
    return safetyShieldBills.find((entry) => entry.id === normalized);
  }

  return undefined;
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
  anomalous_amount: "Unusual amount",
  duplicate: "Duplicate",
  bank_detail_change: "Bank detail change",
};

export function getAverageSafetyShieldBillAmount() {
  const unflagged = safetyShieldBills.filter((entry) => !entry.aiFlagged);
  const total = unflagged.reduce((sum, entry) => sum + entry.amount, 0);
  return Math.round(total / unflagged.length);
}
