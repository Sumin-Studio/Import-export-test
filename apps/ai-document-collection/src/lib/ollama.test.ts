import { describe, it, expect } from "vitest";
import { normalizeCategory, isAccountingCategory } from "./ollama";

describe("normalizeCategory", () => {
  it("maps exact category names to themselves", () => {
    expect(normalizeCategory("Tax Documents")).toBe("Tax Documents");
    expect(normalizeCategory("Bank Statements")).toBe("Bank Statements");
    expect(normalizeCategory("Payroll")).toBe("Payroll");
    expect(normalizeCategory("Receipts")).toBe("Receipts");
    expect(normalizeCategory("Invoices")).toBe("Invoices");
    expect(normalizeCategory("Other")).toBe("Other");
  });

  it("maps tax-related strings to Tax Documents", () => {
    expect(normalizeCategory("1099-MISC")).toBe("Tax Documents");
    expect(normalizeCategory("W-2 form")).toBe("Tax Documents");
    expect(normalizeCategory("1040")).toBe("Tax Documents");
    expect(normalizeCategory("K-1")).toBe("Tax Documents");
    expect(normalizeCategory("tax return")).toBe("Tax Documents");
    expect(normalizeCategory("IRS notice")).toBe("Tax Documents");
  });

  it("maps bank/statement strings to Bank Statements", () => {
    expect(normalizeCategory("bank statement")).toBe("Bank Statements");
    expect(normalizeCategory("year-end statement")).toBe("Bank Statements");
  });

  it("maps receipt/invoice strings correctly", () => {
    expect(normalizeCategory("receipt")).toBe("Receipts");
    expect(normalizeCategory("invoice")).toBe("Invoices");
  });

  it("maps unknown strings to Other", () => {
    expect(normalizeCategory("random file")).toBe("Other");
    expect(normalizeCategory("")).toBe("Other");
  });
});

describe("isAccountingCategory", () => {
  it("returns true for accounting categories", () => {
    expect(isAccountingCategory("Tax Documents")).toBe(true);
    expect(isAccountingCategory("Bank Statements")).toBe(true);
    expect(isAccountingCategory("Invoices")).toBe(true);
  });

  it("returns false for Other", () => {
    expect(isAccountingCategory("Other")).toBe(false);
  });
});
