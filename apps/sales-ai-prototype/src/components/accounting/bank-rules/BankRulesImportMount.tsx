"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  BankRulesPageChrome,
  BankRulesImportWizardSteps,
  BANK_RULES_PAGE_CONTENT,
} from "./BankRulesPageChrome";
import { BankRulesReviewStep } from "./BankRulesReviewStep";

const btnSecondary =
  "inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5] focus:outline-none";
const btnPrimary =
  "inline-flex h-8 min-w-[88px] items-center justify-center rounded-[3px] bg-[#0078C8] px-4 text-[13px] font-bold text-white hover:bg-[#006bb3] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#9099a5]";
const linkText =
  "text-[13px] font-bold text-[#0078C8] underline decoration-solid hover:no-underline";

export type BankRulesImportOption = 1 | 2 | 3;

// INITIAL_RULES has 3 total unresolved mappings (1 + 2)
const INITIAL_UNRESOLVED = 3;
const OPTION_1_IMPORTED_RULES = [
  { name: "BP fuel purchases", type: "Spend money", account: "429 - General Expenses" },
  { name: "Wilson Parking", type: "Spend money", account: "493 - Travel and parking" },
  { name: "Xero subscription", type: "Spend money", account: "404 - IT & Software" },
  { name: "ANZ merchant fees", type: "Spend money", account: "404 - Bank fees" },
];
const OPTION_1_ERROR_RULES = [
  {
    row: "6",
    rule: "Officeworks supplies",
    error: "Account code could not be mapped",
    sourceAccount: "604 - Office supplies",
  },
  {
    row: "9",
    rule: "Uber trip receipts",
    error: "Account code could not be mapped",
    sourceAccount: "493 - Travel",
  },
  { row: "12", rule: "Supplier refund", error: "Payee condition value can't be blank" },
];
const OPTION_1_ACCOUNT_OPTIONS = [
  "404 - Bank fees",
  "404 - IT & Software",
  "429 - General Expenses",
  "493 - Travel and parking",
  "604 - Office expenses",
  "850 - Suspense",
];
const OPTION_3_ERROR_RULES = [
  { row: "2", rule: "Monthly office rent", error: "Contact could not be found" },
  { row: "5", rule: "Payroll clearing", error: "Allocation percent must total 100%" },
  { row: "10", rule: "Bank interest received", error: "Tax rate is not available in this organisation" },
];

/**
 * Import bank rules flow.
 * Option 2: Upload bank rules, resolve mappings, then review rules.
 * Stepper and primary actions live in the page header.
 */
export function BankRulesImportMount({
  importOption = 2,
  onBackToList,
}: {
  importOption?: BankRulesImportOption;
  onBackToList?: () => void;
} = {}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [unresolvedCount, setUnresolvedCount] = useState(INITIAL_UNRESOLVED);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [imported, setImported] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canImport = unresolvedCount === 0;

  const onFiles = (files: FileList | null) => {
    const f = files?.[0];
    setFileName(f ? f.name : null);
  };

  const handleCancel = onBackToList
    ? onBackToList
    : () => { window.location.href = "/accounting/bank-rules"; };

  const handleImportClick = () => {
    if (canImport) {
      setImported(true);
    } else {
      setShowWarningModal(true);
    }
  };

  const handleOptionTwoImportClick = () => {
    if (canImport) {
      setWizardStep(3);
    } else {
      setShowWarningModal(true);
    }
  };

  // Close modal on Escape
  useEffect(() => {
    if (!showWarningModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowWarningModal(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showWarningModal]);

  // ── Post-import success ────────────────────────────────────────────────────

  if (imported) {
    return (
      <BankRulesPageChrome surface="import">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4f5e6]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="#0b6e38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[18px] font-bold text-[#000a1e]">Rules imported successfully</p>
          <p className="text-[13px] text-[#59606d]">Your bank rules are now active and ready to use.</p>
          <a
            href="/accounting/bank-rules"
            className="mt-1 text-[13px] font-bold text-[#0078C8] hover:underline"
          >
            Back to bank rules
          </a>
        </div>
      </BankRulesPageChrome>
    );
  }

  // ── Step 2: Review & confirm ───────────────────────────────────────────────

  if (wizardStep === 3 && importOption === 1) {
    return <BankRulesImportOptionOneSummary onBackToList={handleCancel} />;
  }

  if (wizardStep === 3 && importOption === 2) {
    return <BankRulesImportOptionTwoSummary unresolvedCount={unresolvedCount} onBackToList={handleCancel} />;
  }

  if (wizardStep === 2) {
    if (importOption === 1) {
      return (
        <BankRulesImportOptionOneReview
          onBack={() => setWizardStep(1)}
          onComplete={() => setWizardStep(3)}
        />
      );
    }

    if (importOption === 3) {
      return (
        <BankRulesImportOptionThreeReview
          onBack={() => setWizardStep(1)}
          onComplete={() => setImported(true)}
        />
      );
    }

    return (
      <>
        <BankRulesPageChrome
          surface="import"
          stepContent={<BankRulesImportOptionTwoSteps activeStep={2} compact />}
          headerActions={
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setWizardStep(1)} className={btnSecondary}>
                Back
              </button>
              <button type="button" onClick={handleOptionTwoImportClick} className={btnPrimary}>
                Import rules
              </button>
            </div>
          }
        >
          <BankRulesReviewStep onUnresolvedCountChange={setUnresolvedCount} />
        </BankRulesPageChrome>
        {showWarningModal && (
          <UnresolvedMappingsWarningModal
            unresolvedCount={unresolvedCount}
            onClose={() => setShowWarningModal(false)}
            onImportAnyway={() => {
              setShowWarningModal(false);
              setWizardStep(3);
            }}
          />
        )}
      </>
    );
  }

  // ── Step 1: Upload bank rules ──────────────────────────────────────────────

  return (
    <BankRulesPageChrome
      surface="import"
      stepContent={
        importOption === 1
          ? <BankRulesImportOptionOneSteps activeStep={1} compact />
          : importOption === 2
            ? <BankRulesImportOptionTwoSteps activeStep={1} compact />
            : <BankRulesImportWizardSteps activeStep={1} compact />
      }
      headerActions={
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleCancel} className={btnSecondary}>
            Cancel
          </button>
          {/* Prototype: Next always enabled — simulates a successful upload */}
          <button type="button" onClick={() => setWizardStep(2)} className={btnPrimary}>
            Next
          </button>
        </div>
      }
    >
      <div className={`${BANK_RULES_PAGE_CONTENT} px-4`}>
        <div className="mx-auto w-full max-w-[720px] space-y-6 py-6">
          <section className="space-y-3" aria-labelledby="import-prepare-heading">
            <h2
              id="import-prepare-heading"
              className="m-0 pb-5 text-[18px] font-bold leading-6 text-[#000a1e]"
            >
              Prepare file to import
            </h2>
            <p className="m-0 text-[15px] leading-6 text-[#000a1e]">
              Download the template and add your bank rules. Don&apos;t delete the column headings —
              they are needed for the import to succeed.
            </p>
            <p className="m-0 pb-5 text-[13px] leading-5 text-[#59606d]">
              Up to 1,000 items can be imported each time.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button type="button" className={btnSecondary}>
                Download template
              </button>
              {onBackToList ? (
                <button
                  type="button"
                  onClick={onBackToList}
                  className={`self-start bg-transparent p-0 text-left sm:self-center ${linkText}`}
                >
                  Export rules to csv
                </button>
              ) : (
                <a href="/accounting/bank-rules" className={`self-start sm:self-center ${linkText}`}>
                  Export rules to csv
                </a>
              )}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0078C8] hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Read our instructions on how to fill out the template
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
          </section>

          <section className="space-y-2" aria-labelledby="import-upload-heading">
            <h2
              id="import-upload-heading"
              className="m-0 pb-5 text-[18px] font-bold leading-6 text-[#000a1e]"
            >
              Upload bank rules
            </h2>
            <p className="m-0 text-[13px] font-medium text-[#59606d]">File to upload (required)</p>
            <div className="overflow-hidden rounded-[3px] border border-[#ccced2] bg-white p-6">
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                className="sr-only"
                onChange={(e) => onFiles(e.target.files)}
              />
              <div
                className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-[3px] border border-dashed border-[#7E848F] bg-[#f2f3f4] px-4 py-8"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onFiles(e.dataTransfer.files);
                }}
              >
                <p className="m-0 text-center text-[15px] leading-6 text-[#404756]">
                  {fileName ? `Selected: ${fileName}` : "Drag and drop file or select manually"}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    className={btnSecondary}
                    onClick={() => inputRef.current?.click()}
                  >
                    Select file
                  </button>
                  {fileName && (
                    <button
                      type="button"
                      className={`${linkText} bg-transparent`}
                      onClick={() => {
                        setFileName(null);
                        if (inputRef.current) inputRef.current.value = "";
                      }}
                    >
                      Remove file
                    </button>
                  )}
                </div>
              </div>
              <p className="mb-0 mt-3 text-center text-[13px] leading-5 text-[#59606d]">
                2 MB max size. File should end in .csv or .txt.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BankRulesPageChrome>
  );
}

function BankRulesImportOptionOneReview({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const importedCount = OPTION_1_IMPORTED_RULES.length;
  const [showReadyRules, setShowReadyRules] = useState(true);
  const [showErrorRules, setShowErrorRules] = useState(true);
  const [mappedAccounts, setMappedAccounts] = useState<Record<string, string>>({});
  const mappingIssueCount = OPTION_1_ERROR_RULES.filter((rule) => "sourceAccount" in rule).length;
  const resolvedMappingCount = OPTION_1_ERROR_RULES.filter(
    (rule) => "sourceAccount" in rule && mappedAccounts[rule.row],
  ).length;

  return (
    <BankRulesPageChrome
      surface="import"
      stepContent={<BankRulesImportOptionOneSteps activeStep={2} compact />}
      headerActions={
        <div className="flex items-center gap-2">
          <button type="button" onClick={onBack} className={btnSecondary}>
            Back
          </button>
          <button type="button" onClick={onComplete} className={btnPrimary}>
            Complete import
          </button>
        </div>
      }
    >
      <div className={`${BANK_RULES_PAGE_CONTENT} px-4`}>
        <div className="mx-auto w-full max-w-[720px] space-y-6 py-6">
          <section aria-labelledby="option-1-summary-heading">
            <h2 id="option-1-summary-heading" className="m-0 pb-2 text-[20px] font-bold leading-7 text-[#000a1e]">
              Review rules
            </h2>
            <p className="m-0 mt-4 text-[14px] leading-6 text-[#000a1e]">
              Check the rules found in your file before importing. Map any accounts you can resolve here,
              then complete the import to add the ready rules.
            </p>
          </section>

          <section className="overflow-hidden rounded-[3px] border border-[#ccced2] bg-white" aria-labelledby="option-1-success-heading">
            <button
              type="button"
              aria-expanded={showReadyRules}
              aria-controls="option-1-success-panel"
              onClick={() => setShowReadyRules((open) => !open)}
              className="flex min-h-[64px] w-full items-center gap-4 border-b border-[#e1e2e5] px-4 py-3 text-left hover:bg-[#f7f8fa]"
            >
              <AccordionChevron open={showReadyRules} />
              <SuccessIcon />
              <div className="min-w-0 flex-1">
                <h3 id="option-1-success-heading" className="m-0 text-[16px] font-bold leading-6 text-[#000a1e]">
                  Rules ready to import
                </h3>
                <p className="m-0 text-[13px] leading-5 text-[#59606d]">
                  These rules will be added when you complete the import.
                </p>
              </div>
              <span className="text-[13px] font-bold text-[#0b6e38]">{importedCount} ready</span>
            </button>
            <div id="option-1-success-panel" hidden={!showReadyRules}>
              <table className="w-full border-collapse text-left text-[13px] leading-5">
                <thead className="bg-[#f7f8fa] text-[#59606d]">
                  <tr>
                    <th className="border-b border-[#e1e2e5] px-4 py-3 font-normal">Rule name</th>
                  </tr>
                </thead>
                <tbody className="text-[#000a1e]">
                  {OPTION_1_IMPORTED_RULES.map((rule) => (
                    <tr key={rule.name} className="border-b border-[#e1e2e5] last:border-b-0">
                      <td className="px-4 py-3 font-bold">{rule.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="overflow-hidden rounded-[3px] border border-[#ccced2] bg-white" aria-labelledby="option-1-errors-heading">
            <button
              type="button"
              aria-expanded={showErrorRules}
              aria-controls="option-1-errors-panel"
              onClick={() => setShowErrorRules((open) => !open)}
              className="flex min-h-[64px] w-full items-center gap-4 border-b border-[#e1e2e5] px-4 py-3 text-left hover:bg-[#f7f8fa]"
            >
              <AccordionChevron open={showErrorRules} />
              <ErrorIcon />
              <div className="min-w-0 flex-1">
                <h3 id="option-1-errors-heading" className="m-0 text-[16px] font-bold text-[#000a1e]">
                  Errors
                </h3>
                <p className="m-0 text-[13px] leading-5 text-[#59606d]">
                  {mappingIssueCount} can be fixed by mapping accounts here.{" "}
                  {OPTION_1_ERROR_RULES.length - mappingIssueCount} needs changes in the file.
                </p>
              </div>
              <span className="text-[13px] font-bold text-[#c31230]">
                {resolvedMappingCount} of {mappingIssueCount} mapped
              </span>
            </button>
            <div id="option-1-errors-panel" hidden={!showErrorRules}>
              <table className="w-full border-collapse text-left text-[13px] leading-5">
                <thead className="bg-[#f7f8fa] text-[#59606d]">
                  <tr>
                    <th className="w-[32%] border-b border-[#e1e2e5] px-4 py-3 font-normal">Rule</th>
                    <th className="border-b border-[#e1e2e5] px-4 py-3 font-normal">Error</th>
                    <th className="w-[300px] border-b border-[#e1e2e5] px-4 py-3 font-normal">Resolve</th>
                  </tr>
                </thead>
                <tbody className="text-[#000a1e]">
                  {OPTION_1_ERROR_RULES.map((rule) => (
                    <tr key={rule.row} className="border-b border-[#e1e2e5] last:border-b-0">
                      <td className="px-4 py-3 font-bold">{rule.rule}</td>
                      <td className="px-4 py-3">
                        <span>{rule.error}</span>
                        {"sourceAccount" in rule && (
                          <span className="mt-1 block text-[12px] text-[#59606d]">
                            Source: {rule.sourceAccount}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {"sourceAccount" in rule ? (
                          <select
                            aria-label={`Map account for ${rule.rule}`}
                            value={mappedAccounts[rule.row] ?? ""}
                            onChange={(e) => setMappedAccounts((prev) => ({ ...prev, [rule.row]: e.target.value }))}
                            className="h-8 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-[13px] text-[#000a1e] focus:border-[#0078C8] focus:outline-none focus:ring-1 focus:ring-[#0078C8]"
                          >
                            <option value="">Map to account...</option>
                            {OPTION_1_ACCOUNT_OPTIONS.map((account) => (
                              <option key={account} value={account}>
                                {account}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-flex rounded-[3px] bg-[#f2f3f4] px-2 py-1 text-[12px] font-bold text-[#59606d]">
                            Fix in file
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </BankRulesPageChrome>
  );
}

function BankRulesImportOptionOneSummary({ onBackToList }: { onBackToList: () => void }) {
  return (
    <BankRulesPageChrome
      surface="import"
      stepContent={<BankRulesImportOptionOneSteps activeStep={3} compact />}
      headerActions={
        <button type="button" onClick={onBackToList} className={btnPrimary}>
          Back to bank rules
        </button>
      }
    >
      <div className={`${BANK_RULES_PAGE_CONTENT} px-4`}>
        <div className="mx-auto w-full max-w-[720px] space-y-6 py-6">
          <section aria-labelledby="option-1-import-summary-heading">
            <h2 id="option-1-import-summary-heading" className="m-0 pb-2 text-[20px] font-bold leading-7 text-[#000a1e]">
              Import summary
            </h2>
            <div className="mt-4 space-y-2 text-[14px] leading-5 text-[#000a1e]">
              <p className="mx-0 mb-1 mt-0 font-bold">
                {OPTION_1_IMPORTED_RULES.length} of {OPTION_1_IMPORTED_RULES.length + OPTION_1_ERROR_RULES.length} rules were imported:
              </p>
              <p className="m-0 flex items-start gap-2">
                <SuccessIcon />
                <span>{OPTION_1_IMPORTED_RULES.length} rules were imported successfully</span>
              </p>
              <p className="m-0 flex items-start gap-2">
                <ErrorIcon />
                <span>{OPTION_1_ERROR_RULES.length} rules weren&apos;t imported</span>
              </p>
            </div>
            <p className="m-0 mt-5 text-[14px] leading-6 text-[#000a1e]">
              The imported rules are now active. Fix the rules that weren&apos;t imported, then upload the file again.
            </p>
          </section>

        </div>
      </div>
    </BankRulesPageChrome>
  );
}

function BankRulesImportOptionTwoSummary({
  unresolvedCount,
  onBackToList,
}: {
  unresolvedCount: number;
  onBackToList: () => void;
}) {
  const importedCount = unresolvedCount > 0 ? 3 : 5;
  const skippedCount = unresolvedCount > 0 ? 2 : 0;

  return (
    <BankRulesPageChrome
      surface="import"
      stepContent={<BankRulesImportOptionTwoSteps activeStep={3} compact />}
      headerActions={
        <button type="button" onClick={onBackToList} className={btnPrimary}>
          Back to bank rules
        </button>
      }
    >
      <div className={`${BANK_RULES_PAGE_CONTENT} px-4`}>
        <div className="mx-auto w-full max-w-[720px] space-y-6 py-6">
          <section aria-labelledby="option-2-import-summary-heading">
            <h2 id="option-2-import-summary-heading" className="m-0 pb-2 text-[20px] font-bold leading-7 text-[#000a1e]">
              Import summary
            </h2>
            <div className="mt-4 space-y-2 text-[14px] leading-5 text-[#000a1e]">
              <p className="mx-0 mb-1 mt-0 font-bold">
                {importedCount} rules were imported:
              </p>
              <p className="m-0 flex items-start gap-2">
                <SuccessIcon />
                <span>{importedCount} rules were imported successfully</span>
              </p>
              {skippedCount > 0 && (
                <p className="m-0 flex items-start gap-2">
                  <ErrorIcon />
                  <span>{skippedCount} rules weren&apos;t imported because they still have unresolved mappings</span>
                </p>
              )}
            </div>
            <p className="m-0 mt-5 text-[14px] leading-6 text-[#000a1e]">
              The imported rules are now active. Fix the skipped rules, then upload the file again.
            </p>
          </section>
        </div>
      </div>
    </BankRulesPageChrome>
  );
}

function BankRulesImportOptionThreeReview({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const importedCount = 20;
  const totalCount = 28;

  return (
    <BankRulesPageChrome
      surface="import"
      stepContent={<BankRulesImportWizardSteps activeStep={2} compact />}
    >
      <div className={`${BANK_RULES_PAGE_CONTENT} px-4 pb-28 pt-8`}>
        <div className="mx-auto w-full max-w-[720px] space-y-7 py-6">
          <section aria-labelledby="option-3-summary-heading">
            <h2 id="option-3-summary-heading" className="m-0 text-[20px] font-bold leading-7 text-[#000a1e]">
              Import summary
            </h2>
            <div className="mt-6 space-y-2 text-[14px] leading-5 text-[#000a1e]">
              <p className="m-0 font-bold">
                {importedCount} of {totalCount} rules will be imported:
              </p>
              <p className="m-0 flex items-start gap-2">
                <SuccessIcon />
                <span>{importedCount} existing rules will be updated, with empty fields ignored</span>
              </p>
              <p className="m-0 flex items-start gap-2">
                <ErrorIcon />
                <span>{totalCount - importedCount} rules have errors and can&apos;t be imported</span>
              </p>
            </div>
            <p className="m-0 mt-5 text-[14px] leading-6 text-[#000a1e]">
              If you&apos;re happy to continue, complete the import. Otherwise, fix the issues in the file
              then re-upload it. For help,{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-[#0078C8] underline hover:no-underline">
                read our guide on importing bank rules
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="option-3-errors-heading">
            <h3 id="option-3-errors-heading" className="m-0 text-[16px] font-bold leading-6 text-[#000a1e]">
              Errors
            </h3>
            <div className="mt-6 flex items-start gap-4">
              <button
                type="button"
                aria-label="Collapse errors"
                className="mt-2 flex size-4 items-center justify-center text-[#59606d]"
              >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[13px] font-bold leading-5 text-[#000a1e]">
                  {OPTION_3_ERROR_RULES.length} rules could not be edited properly
                </p>
                <p className="m-0 text-[13px] leading-5 text-[#c31230]">
                  The import has failed. Fix these errors in your file, then upload it again.
                </p>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[3px] border border-[#ccced2] bg-white">
              <table className="w-full border-collapse text-left text-[13px] leading-5">
                <thead className="bg-[#f7f8fa] text-[#59606d]">
                  <tr>
                    <th className="w-[112px] border-b border-[#e1e2e5] px-4 py-3 font-normal">Line number</th>
                    <th className="border-b border-[#e1e2e5] px-4 py-3 font-normal">Rule name</th>
                    <th className="border-b border-[#e1e2e5] px-4 py-3 font-normal">Error description</th>
                  </tr>
                </thead>
                <tbody className="text-[#000a1e]">
                  {OPTION_3_ERROR_RULES.map((rule) => (
                    <tr key={rule.row} className="border-b border-[#e1e2e5] last:border-b-0">
                      <td className="px-4 py-3">Line {rule.row}</td>
                      <td className="px-4 py-3 font-bold">{rule.rule}</td>
                      <td className="px-4 py-3">{rule.error}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex items-center justify-between pt-1">
            <button type="button" onClick={onBack} className={btnSecondary}>
              Back
            </button>
            <button type="button" onClick={onComplete} className={btnPrimary}>
              Complete import
            </button>
          </div>
        </div>
      </div>
    </BankRulesPageChrome>
  );
}

function BankRulesImportOptionOneSteps({
  activeStep,
  compact = false,
}: {
  activeStep: 1 | 2 | 3;
  compact?: boolean;
}) {
  const steps = [
    { n: 1, label: "Upload bank rules" },
    { n: 2, label: "Review rules" },
    { n: 3, label: "Import summary" },
  ];

  return (
    <div
      className={
        compact
          ? "flex items-center gap-x-3"
          : "mb-1 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 py-8 sm:mb-1.5 sm:gap-x-4"
      }
      role="navigation"
      aria-label="Import progress"
    >
      {steps.map((step, i) => {
        const active = activeStep === step.n;
        return (
          <div key={step.n} className="flex items-center gap-x-3">
            {i > 0 && (
              <div className="h-0.5 w-8 flex-none bg-[#ccced2]" aria-hidden />
            )}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full text-[12px] font-bold leading-none tabular-nums ${
                  active ? "bg-[#0078C8] text-white" : "bg-[#e1e2e5] text-[#59606d]"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {step.n}
              </span>
              <span
                className={`font-bold leading-5 ${compact ? "text-[13px]" : "text-[15px]"} ${
                  active ? "text-[#0078C8]" : "text-[#59606d]"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BankRulesImportOptionTwoSteps({
  activeStep,
  compact = false,
}: {
  activeStep: 1 | 2 | 3;
  compact?: boolean;
}) {
  const steps = [
    { n: 1, label: "Upload bank rules" },
    { n: 2, label: "Review rules" },
    { n: 3, label: "Import summary" },
  ];

  return (
    <div
      className={
        compact
          ? "flex items-center gap-x-3"
          : "mb-1 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 py-8 sm:mb-1.5 sm:gap-x-4"
      }
      role="navigation"
      aria-label="Import progress"
    >
      {steps.map((step, i) => {
        const active = activeStep === step.n;
        return (
          <div key={step.n} className="flex items-center gap-x-3">
            {i > 0 && (
              <div className="h-0.5 w-8 flex-none bg-[#ccced2]" aria-hidden />
            )}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full text-[12px] font-bold leading-none tabular-nums ${
                  active ? "bg-[#0078C8] text-white" : "bg-[#e1e2e5] text-[#59606d]"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {step.n}
              </span>
              <span
                className={`font-bold leading-5 ${compact ? "text-[13px]" : "text-[15px]"} ${
                  active ? "text-[#0078C8]" : "text-[#59606d]"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function UnresolvedMappingsWarningModal({
  unresolvedCount,
  onClose,
  onImportAnyway,
}: {
  unresolvedCount: number;
  onClose: () => void;
  onImportAnyway: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-warning-title"
    >
      <div className="absolute inset-0 bg-[#000a1e]/50" aria-hidden onClick={onClose} />

      <div
        className="relative w-full max-w-[480px] rounded-[3px] bg-white shadow-[0_8px_32px_rgba(0,10,30,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 border-b border-[#e1e2e5] px-6 py-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fde8e8]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#c31230]" aria-hidden>
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7.25 5a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0V5zm.75 6.5a.875.875 0 110-1.75.875.875 0 010 1.75z" fill="currentColor" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="import-warning-title" className="m-0 text-[16px] font-bold leading-snug text-[#000a1e]">
              Import with unresolved mappings?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#59606d] hover:bg-[#f0f2f4] hover:text-[#000a1e]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="m-0 text-[13px] leading-5 text-[#404756]">
            <span className="font-bold text-[#000a1e]">
              {unresolvedCount} account mapping{unresolvedCount !== 1 ? "s" : ""} couldn&apos;t be resolved.
            </span>{" "}
            Rules with unresolved mappings won&apos;t be imported. Only rules that are ready will be imported.
          </p>

        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[#e1e2e5] px-6 py-4">
          <button type="button" onClick={onClose} className={btnSecondary}>
            Go back and fix
          </button>
          <button type="button" onClick={onImportAnyway} className={btnPrimary}>
            Import ready rules
          </button>
        </div>
      </div>
    </div>
  );
}

function AccordionChevron({ open }: { open: boolean }) {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center text-[#59606d]" aria-hidden>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path
          d={open ? "M1.5 6.25 6 1.75l4.5 4.5" : "M1.5 1.75 6 6.25l4.5-4.5"}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SuccessIcon() {
  return (
    <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#12b76a] text-white" aria-hidden>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ErrorIcon() {
  return (
    <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#d92d20] text-white text-[11px] font-bold leading-none" aria-hidden>
      !
    </span>
  );
}
