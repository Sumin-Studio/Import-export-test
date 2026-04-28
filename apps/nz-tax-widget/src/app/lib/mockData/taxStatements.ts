/**
 * Mock data for Tax Statements page (`/tax/statements`).
 * Tabs and summary cards align with NZ Tax Statements reference.
 */

import type { TaxYearId } from "./annualTaxReturns";
import { getScaledDisputedStatementsForTaxYear } from "./annualTaxReturns";

export type StatementsPageTabId =
  | "all"
  | "disputed"
  | "transfers"
  | "transfers_different"
  | "notices"
  | "tax_pooling"
  | "notices_different";

export function getStatementsSummaryCards(taxYearId: TaxYearId = "fy26") {
  const { notices_different: noticesDifferent } =
    firmStatementPipelineCounts(taxYearId);
  return {
    disputedStatements: getScaledDisputedStatementsForTaxYear(taxYearId),
    noticesDifferent,
    noticesSame: 0,
  } as const;
}

/** Older tax years: less open transfers / notices / pooling (work largely settled). */
function firmStatementPipelineCounts(taxYearId: TaxYearId): {
  transfers: number;
  transfers_different: number;
  notices: number;
  tax_pooling: number;
  notices_different: number;
} {
  if (taxYearId === "fy26") {
    return {
      transfers: 18,
      transfers_different: 6,
      notices: 42,
      tax_pooling: 5,
      notices_different: 4,
    };
  }
  if (taxYearId === "fy25") {
    return {
      transfers: 10,
      transfers_different: 4,
      notices: 30,
      tax_pooling: 4,
      notices_different: 3,
    };
  }
  return {
    transfers: 4,
    transfers_different: 2,
    notices: 14,
    tax_pooling: 2,
    notices_different: 2,
  };
}

/** Tab counts — firm view (disputed count follows annual tax widget tax year). */
export function getFirmStatementsPageTabCounts(taxYearId: TaxYearId = "fy26") {
  const disputed = getScaledDisputedStatementsForTaxYear(taxYearId);
  const {
    transfers,
    transfers_different: transfersDifferent,
    notices,
    tax_pooling: taxPooling,
    notices_different: noticesDifferent,
  } = firmStatementPipelineCounts(taxYearId);
  return {
    all:
      disputed +
      transfers +
      transfersDifferent +
      notices +
      taxPooling +
      noticesDifferent,
    disputed,
    transfers,
    transfers_different: transfersDifferent,
    notices,
    tax_pooling: taxPooling,
    notices_different: noticesDifferent,
  } as const;
}
