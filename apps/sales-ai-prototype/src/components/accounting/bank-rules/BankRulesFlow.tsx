"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { BankRulesImportMount, type BankRulesImportOption } from "./BankRulesImportMount";
import { BankRulesListMount } from "./BankRulesListMount";

const BASE = "/accounting/bank-rules";
const IMPORT_OPTIONS: BankRulesImportOption[] = [1, 2, 3];

function getImportOption(value: string | null): BankRulesImportOption {
  return value === "1" || value === "3" ? Number(value) as BankRulesImportOption : 2;
}

function syncUrl(view: "list" | "import", importOption: BankRulesImportOption) {
  const params = new URLSearchParams();
  if (view === "import") params.set("import", "1");
  params.set("flow", String(importOption));

  const query = params.toString();
  try {
    window.history.replaceState(null, "", query ? `${BASE}?${query}` : BASE);
  } catch {
    /* no-op */
  }
}

/**
 * Renders list vs import in one document — no second route, so client-side RSC fetches
 * to another URL (which many IDE / simple browsers block as “connect failed”) are avoided.
 * `?import=1` is synced for refresh and for redirects from `/accounting/bank-rules/import`.
 */
export function BankRulesFlow() {
  const [view, setView] = useState<"list" | "import">("list");
  const [importOption, setImportOption] = useState<BankRulesImportOption>(2);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setImportOption(getImportOption(params.get("flow")));
    if (params.get("import") === "1") {
      setView("import");
    }
  }, []);

  const openImport = useCallback(() => {
    setView("import");
    syncUrl("import", importOption);
  }, [importOption]);

  const closeImport = useCallback(() => {
    setView("list");
    syncUrl("list", importOption);
  }, [importOption]);

  const selectImportOption = useCallback((option: BankRulesImportOption) => {
    setImportOption(option);
    syncUrl(view, option);
  }, [view]);

  const content = view === "import" ? (
    <BankRulesImportMount
      key={importOption}
      importOption={importOption}
      onBackToList={closeImport}
    />
  ) : (
    <BankRulesListMount onOpenImport={openImport} />
  );

  return (
    <>
      {content}
      <div className="fixed inset-x-0 bottom-12 z-40 flex justify-center px-4 py-3">
        <div
          className="inline-flex rounded-[3px] border border-[#A6A9B0] bg-white p-0.5 shadow-[0_4px_16px_rgba(0,10,30,0.16)]"
          role="group"
          aria-label="Bank rules import flow option"
        >
          {IMPORT_OPTIONS.map((option) => {
            const selected = importOption === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => selectImportOption(option)}
                className={`h-8 min-w-[88px] rounded-[2px] px-3 text-[13px] font-bold transition ${
                  selected
                    ? "bg-[#0078C8] text-white"
                    : "text-[#0078C8] hover:bg-[#f2f3f4]"
                }`}
              >
                Option {option}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
