const CATEGORIES = [
  "Tax Documents",
  "Payroll",
  "Receipts",
  "Invoices",
  "Bank Statements",
  "Other",
] as const;

export type DocumentCategory = (typeof CATEGORIES)[number];

export interface ClassifyResult {
  category: DocumentCategory;
  confidence: number;
  /** When confidence < 80, optional short explanation of what's ambiguous. */
  lowConfidenceReason?: string;
  /** Short "why" for this category (e.g. "Filename contains 'invoice'", "Obvious tax form") — shown in tooltip. */
  reason?: string;
}

import { getAgentConfig } from "@/lib/agent-config";

/** Map accountant-style document names and LLM responses to our categories. Exported for tests. */
export function normalizeCategory(raw: string): DocumentCategory {
  const lower = raw.trim().toLowerCase();
  for (const c of CATEGORIES) {
    if (c.toLowerCase() === lower) return c;
  }
  // Tax Documents: tax forms and related (1099, W-2, 1040, K-1, etc.)
  if (
    lower.includes("tax") ||
    lower.includes("1099") ||
    /\bw-?2\b/.test(lower) ||
    /\bw-?9\b/.test(lower) ||
    lower.includes("w-9") ||
    lower.includes("w9") ||
    lower.includes("1040") ||
    lower.includes("k-1") ||
    lower.includes("w-4") ||
    lower.includes("w4") ||
    lower.includes("tax form") ||
    lower.includes("tax return") ||
    lower.includes("irs")
  )
    return "Tax Documents";
  if (lower.includes("payroll") || lower.includes("pay stub") || lower.includes("payslip")) return "Payroll";
  if (lower.includes("receipt")) return "Receipts";
  if (lower.includes("invoice")) return "Invoices";
  if (lower.includes("bank") || lower.includes("statement")) return "Bank Statements";
  return "Other";
}

/** Content keywords that suggest the file is not a document (travel, scenery, etc.). */
function hasNonDocumentContent(contentLower: string): boolean {
  const terms = [
    "bali", "vacation", "holiday", "travel", "trip", "beach", "resort",
    "instagram", "facebook", "twitter", "social media", "selfie", "sunset", "sunrise",
  ];
  return terms.some((t) => contentLower.includes(t));
}

/** If filename clearly indicates a category, return a result and skip the LLM call (fast path). Exported so scan can try this first and skip content fetch + Ollama. */
export function classifyFromFilenameOnly(fileName: string): ClassifyResult | null {
  const nameLower = fileName.toLowerCase();
  if (
    nameLower.includes("1099") ||
    /\bw-?2\b/.test(nameLower) ||
    /\bw-?9\b/.test(nameLower) ||
    nameLower.includes("w-9") ||
    nameLower.includes("w9") ||
    nameLower.includes("1040") ||
    nameLower.includes("k-1") ||
    nameLower.includes("w-4") ||
    nameLower.includes("w4") ||
    nameLower.includes("tax form") ||
    nameLower.includes("tax return") ||
    nameLower.includes("irs")
  ) {
    return { category: "Tax Documents", confidence: 95, reason: "Filename indicates tax document." };
  }
  if (
    nameLower.includes("pay stub") ||
    nameLower.includes("payslip") ||
    nameLower.includes("payroll") ||
    nameLower.includes("wage") ||
    nameLower.includes("pay_stub")
  ) {
    return { category: "Payroll", confidence: 95, reason: "Filename indicates payroll." };
  }
  if (
    (nameLower.includes("bank") || nameLower.includes("statement")) &&
    !nameLower.includes("invoice") &&
    !nameLower.includes("of account")
  ) {
    return { category: "Bank Statements", confidence: 95, reason: "Filename indicates bank statement." };
  }
  if (nameLower.includes("receipt") && !nameLower.includes("invoice")) {
    return { category: "Receipts", confidence: 95, reason: "Filename indicates receipt." };
  }
  if (nameLower.includes("invoice") || nameLower.includes("bill ")) {
    return { category: "Invoices", confidence: 95, reason: "Filename indicates invoice." };
  }
  return null;
}

/** True if content has clear document indicators (receipt, invoice, tax, amounts, etc.). */
function hasStrongDocumentContent(content: string): boolean {
  const contentLower = content.toLowerCase();
  return (
    contentLower.includes("subtotal") ||
    contentLower.includes("total") && (contentLower.includes("tax") || contentLower.includes("$") || contentLower.includes("amount")) ||
    contentLower.includes("invoice") ||
    contentLower.includes("receipt") ||
    contentLower.includes("1099") ||
    /\bw-?2\b/.test(contentLower) ||
    /\bw-?9\b/.test(contentLower) ||
    contentLower.includes("w-9") ||
    contentLower.includes("w9") ||
    contentLower.includes("thank you for shopping") ||
    contentLower.includes("customer copy") ||
    contentLower.includes("account #") ||
    contentLower.includes("routing") ||
    contentLower.includes("statement")
  );
}

export async function classifyDocument(
  fileName: string,
  textPreview?: string
): Promise<ClassifyResult> {
  const fast = classifyFromFilenameOnly(fileName);
  if (fast) return fast;

  const prompt = `You are classifying documents for an accountant. Use these categories only:

- **Tax Documents**: Tax forms and related (e.g. 1099, 1099-MISC, 1099-NEC, 1099-INT, 1099-DIV, W-2, W-4, W-9, 1040, K-1, tax returns, IRS notices, estimated tax, extension).
- **Payroll**: Pay stubs, payslips, payroll summaries, wage statements.
- **Receipts**: Purchase receipts, expense receipts, payment confirmations (must show amounts, items, or vendor).
- **Invoices**: Invoices from vendors or to customers (bill, statement of account).
- **Bank Statements**: Bank statements, credit card statements, account statements.
- **Other**: Anything that is NOT a clear financial/accounting document. Put here: photos, screenshots of non-documents (e.g. travel, scenery, social media, UI, random images), vacation pictures, and any file where you cannot see clear document structure (line items, totals, vendor, account numbers). When in doubt, choose Other.

Document name: ${fileName}
${textPreview ? `Document text preview (from file content): ${textPreview.slice(0, getAgentConfig().classificationPreviewChars)}` : ""}

Reply with exactly 3 lines:
- Line 1: exactly one category name from the list above.
- Line 2: your confidence as a number 0-100 (how sure you are about this category).
- Line 3: one short sentence explaining why you chose this category (e.g. "Filename contains 'invoice'", "Document has line items and vendor", "Image is a photo/screenshot with no document structure").`;

  const { ollamaHost, ollamaModel } = getAgentConfig();
  const timeoutMs = 30_000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ollamaModel,
        prompt,
        stream: false,
        options: { num_predict: 200 },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Ollama returned ${res.status}`);
    }

    const data = (await res.json()) as { response?: string };
    const raw = (data.response || "").trim();
    const lines = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

    let category: DocumentCategory;
    let confidence: number;
    let lowConfidenceReason: string | undefined;
    let reason: string | undefined;

    if (lines.length >= 2) {
      category = normalizeCategory(lines[0]);
      const parsed = parseInt(lines[1], 10);
      confidence = Number.isNaN(parsed) ? 75 : Math.min(100, Math.max(0, parsed));
      if (lines.length >= 3 && lines[2]) {
        const line3 = lines[2].slice(0, 200);
        reason = line3;
        if (confidence < getAgentConfig().lowConfidenceThreshold) lowConfidenceReason = line3;
      }
    } else {
      category = normalizeCategory(raw);
      confidence = CATEGORIES.includes(category as DocumentCategory) ? 85 : 60;
    }

    // Filename is a strong signal: prefer category from obvious filename cues so LLM misclassifications are corrected.
    const nameLower = fileName.toLowerCase();
    if (nameLower.includes("1099") || /\bw-?2\b/.test(nameLower) || /\bw-?9\b/.test(nameLower) || nameLower.includes("w-9") || nameLower.includes("w9") || nameLower.includes("1040") || nameLower.includes("k-1") || nameLower.includes("w-4") || nameLower.includes("w4") || nameLower.includes("tax form") || nameLower.includes("tax return") || nameLower.includes("irs")) {
      category = "Tax Documents";
      reason = reason ?? "Filename indicates tax document.";
    } else if (nameLower.includes("receipt") && !nameLower.includes("invoice")) {
      category = "Receipts";
      reason = reason ?? "Filename indicates receipt.";
    } else if (nameLower.includes("invoice") && !nameLower.includes("receipt")) {
      category = "Invoices";
      reason = reason ?? "Filename indicates invoice.";
    }

    // Content is a strong signal when present: use extracted text (e.g. from PDF or OCR of receipt images) to classify.
    if (textPreview && textPreview.length > 0) {
      const contentLower = textPreview.toLowerCase();
      // Tax forms
      if (
        contentLower.includes("1099") ||
        /\bw-?2\b/.test(contentLower) ||
        /\bw-?9\b/.test(contentLower) ||
        contentLower.includes("w-9") ||
        contentLower.includes("w9") ||
        contentLower.includes("1040") ||
        contentLower.includes("form 1040") ||
        contentLower.includes("k-1") ||
        contentLower.includes("irs") ||
        contentLower.includes("internal revenue") ||
        contentLower.includes("tax year") ||
        contentLower.includes("social security administration")
      ) {
        category = "Tax Documents";
        reason = reason ?? "Document content indicates tax form.";
      }
      // Receipts: store receipt, purchase receipt (from OCR or PDF text)
      else if (
        contentLower.includes("subtotal") ||
        contentLower.includes("thank you for shopping") ||
        contentLower.includes("customer copy") ||
        contentLower.includes("items sold") ||
        contentLower.includes("credit tend") ||
        contentLower.includes("change due") ||
        (contentLower.includes("approval") && contentLower.includes("#")) ||
        (contentLower.includes("ref #") || contentLower.includes("ref#")) ||
        (contentLower.includes("receipt") && !contentLower.includes("invoice"))
      ) {
        category = "Receipts";
        reason = reason ?? "Document content indicates receipt (e.g. subtotal, total, store info).";
      }
      // Non-document content: travel, scenery, place names, etc. → Other
      else if (hasNonDocumentContent(contentLower)) {
        category = "Other";
        reason = reason ?? "Content suggests image is not a document (e.g. travel, photo).";
      }
    }

    // Generic screenshot/photo filenames with no document content → Other (e.g. "Screenshot 2026-03-05 at 3.19.03 PM.png")
    if (
      (nameLower.includes("screenshot") || nameLower.includes("screen shot") || nameLower.includes("photo") || /^img[_\-]?\d/i.test(fileName)) &&
      !hasStrongDocumentContent(textPreview ?? "")
    ) {
      category = "Other";
      reason = reason ?? "Filename suggests screenshot/photo with no document content.";
    }

    return { category: category as DocumentCategory, confidence, lowConfidenceReason, reason };
  } catch (e) {
    clearTimeout(timeoutId);
    const isNetworkOrTimeout =
      (e instanceof TypeError &&
        (e.message.includes("fetch") || e.message.includes("ECONNREFUSED"))) ||
      (e instanceof Error && e.name === "AbortError");
    if (isNetworkOrTimeout) {
      return { category: "Other", confidence: 0 };
    }
    throw e;
  }
}

/** Categories that are accounting and bookkeeping-related; files classified as "Other" are excluded from the accountant view. */
export const ACCOUNTING_CATEGORIES = [
  "Tax Documents",
  "Payroll",
  "Receipts",
  "Invoices",
  "Bank Statements",
] as const;

export type AccountingCategory = (typeof ACCOUNTING_CATEGORIES)[number];

export function isAccountingCategory(category: string): boolean {
  return (ACCOUNTING_CATEGORIES as readonly string[]).includes(category);
}

export { CATEGORIES };
