import type { ClassifiedFile, XeroLink } from "@/lib/store";

/** Fictitious Xero entities per client – how documents would attach in Xero. */
const FAKE_ENTITIES: Record<string, XeroLink[]> = {
  "1": [
    { type: "invoice", id: "INV-2024-001", label: "Invoice INV-2024-001" },
    { type: "invoice", id: "INV-2024-002", label: "Invoice INV-2024-002" },
    { type: "bill", id: "BILL-2024-001", label: "Bill BILL-2024-001" },
    { type: "bill", id: "BILL-2024-002", label: "Bill BILL-2024-002" },
    { type: "bank_transaction", id: "TXN-03-12", label: "Bank Txn 12 Mar" },
    { type: "bank_transaction", id: "TXN-03-15", label: "Bank Txn 15 Mar" },
    { type: "job", id: "JOB-Q1-TAX", label: "Job: Q1 Tax Preparation" },
    { type: "job", id: "JOB-AUDIT-24", label: "Job: Annual Audit 2024" },
  ],
  "2": [
    { type: "invoice", id: "INV-2024-101", label: "Invoice INV-2024-101" },
    { type: "bill", id: "BILL-2024-101", label: "Bill BILL-2024-101" },
    { type: "bank_transaction", id: "TXN-03-01", label: "Bank Txn 1 Mar" },
    { type: "job", id: "JOB-PAYROLL", label: "Job: Payroll" },
  ],
  "3": [
    { type: "invoice", id: "INV-2024-201", label: "Invoice INV-2024-201" },
    { type: "bill", id: "BILL-2024-201", label: "Bill BILL-2024-201" },
    { type: "bank_transaction", id: "TXN-03-08", label: "Bank Txn 8 Mar" },
    { type: "job", id: "JOB-YE-2024", label: "Job: Year-end 2024" },
  ],
  "4": [
    { type: "invoice", id: "INV-2024-301", label: "Invoice INV-2024-301" },
    { type: "bill", id: "BILL-2024-301", label: "Bill BILL-2024-301" },
    { type: "bank_transaction", id: "TXN-03-10", label: "Bank Txn 10 Mar" },
    { type: "job", id: "JOB-GST", label: "Job: GST Return" },
  ],
  "5": [
    { type: "invoice", id: "INV-2024-401", label: "Invoice INV-2024-401" },
    { type: "bill", id: "BILL-2024-401", label: "Bill BILL-2024-401" },
    { type: "bank_transaction", id: "TXN-03-05", label: "Bank Txn 5 Mar" },
    { type: "job", id: "JOB-DESIGN-RET", label: "Job: Design Retainer" },
  ],
};

/** Category → preferred Xero link types (in order). */
const CATEGORY_TO_TYPES: Record<string, XeroLink["type"][]> = {
  Invoices: ["invoice"],
  Receipts: ["bill", "bank_transaction"],
  "Bank Statements": ["bank_transaction"],
  "Tax Documents": ["job", "invoice"],
  Payroll: ["job", "bill"],
  Other: ["bill", "bank_transaction", "job"],
};

function getEntitiesForClient(clientId: string): XeroLink[] {
  return (
    FAKE_ENTITIES[clientId] ??
    FAKE_ENTITIES["1"].map((e) => ({
      ...e,
      id: `${e.id}-${clientId}`,
      label: `${e.label} (${clientId})`,
    }))
  );
}

/** Pick a deterministic entity for a file based on category and path. */
function pickEntity(
  clientId: string,
  category: string,
  pathDisplay: string,
  indexInCategory: number
): XeroLink | undefined {
  const entities = getEntitiesForClient(clientId);
  const preferredTypes = CATEGORY_TO_TYPES[category] ?? CATEGORY_TO_TYPES.Other;
  const byType = preferredTypes.map((t) => entities.filter((e) => e.type === t)).flat();
  const pool = byType.length > 0 ? byType : entities;
  return pool[indexInCategory % pool.length];
}

/**
 * Assign each classified file a fictitious Xero transaction or job it would attach to.
 * Mirrors how documents are consumed and linked in Xero.
 */
export function linkDocumentsToXero(
  clientId: string,
  files: ClassifiedFile[]
): ClassifiedFile[] {
  const categoryIndex: Record<string, number> = {};
  return files.map((file) => {
    const idx = (categoryIndex[file.category] ?? 0);
    categoryIndex[file.category] = idx + 1;
    const linkedTo = pickEntity(clientId, file.category, file.path_display, idx);
    return { ...file, linkedTo };
  });
}
