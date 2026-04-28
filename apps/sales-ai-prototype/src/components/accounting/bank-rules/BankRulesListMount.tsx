"use client";

import Link from "next/link";
import { useState } from "react";
import { GripVertical, Search, X } from "lucide-react";
import {
  BankRulesPageChrome,
  BANK_RULES_PAGE_CONTENT,
  type BankRulesTabId,
} from "./BankRulesPageChrome";

const EXAMPLE_RULES: { name: string; condition: string }[] = [
  { name: "BP fuel purchases", condition: 'Payee contains "BP"' },
  { name: "Wilson Parking", condition: 'Payee contains "Wilson Parking"' },
  { name: "Xero subscription", condition: 'Payee contains "Xero"' },
  { name: "ANZ merchant fees", condition: 'Reference contains "MERCHANT FEE"' },
];

export function BankRulesListMount({ onOpenImport }: { onOpenImport?: () => void } = {}) {
  const [activeTab, setActiveTab] = useState<BankRulesTabId>("spend");
  const [search, setSearch] = useState("");

  const filtered = EXAMPLE_RULES.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.condition.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <BankRulesPageChrome
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isImportView={false}
      onOpenImport={onOpenImport}
    >
      <div className={`${BANK_RULES_PAGE_CONTENT} space-y-4 px-4 py-6`}>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#59606d]">
            <Search className="size-[18px]" strokeWidth={1.3} aria-hidden />
          </span>
          <input
            type="search"
            name="q"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="h-10 w-full rounded-[3px] border border-[#A6A9B0] bg-white pl-10 pr-10 text-[15px] leading-6 text-[#000a1e] shadow-[inset_0_1px_0_0_rgba(0,0,0,0.04)] placeholder:text-[#8c95a1] focus:border-[#0078C8] focus:outline-none focus:ring-1 focus:ring-[#0078C8]"
            aria-label="Search"
          />
          {search ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#59606d] hover:bg-[#e8eaed] hover:text-[#000a1e]"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X className="size-4" strokeWidth={1.75} />
            </button>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-tl-[3px] rounded-tr-[3px] border border-[#ccced2] bg-white">
          <div className="flex items-start gap-2 border-b border-[#ccced2] bg-[#e1eef8] px-2 py-2.5 sm:px-3">
            <input
              type="checkbox"
              className="ml-0.5 mt-1.5 size-4 shrink-0 rounded border-[#A6A9B0] accent-[#0078C8]"
              aria-label="Select all"
            />
            <p className="mb-0 flex-1 text-[13px] leading-5 text-[#000a1e]">
              No rules selected. Drag and drop to set their order so they run in the right sequence.
            </p>
          </div>
          <ul className="divide-y divide-[#e1e2e5]">
            {filtered.length === 0 ? (
              <li className="px-4 py-8 text-center text-[15px] text-[#59606d]">No rules match your search.</li>
            ) : (
              filtered.map((rule) => (
                <li
                  key={rule.name}
                  className="flex min-h-[64px] items-stretch border-b border-[#e1e2e5] last:border-b-0"
                >
                  <div className="flex w-10 shrink-0 items-center justify-center text-[#8c95a1] sm:w-12">
                    <span className="cursor-grab p-1 active:cursor-grabbing" title="Drag to reorder" aria-hidden>
                      <GripVertical className="size-4" strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="flex w-8 shrink-0 items-center sm:w-10">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-[#A6A9B0] accent-[#0078C8]"
                      aria-label={`Select ${rule.name}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1 self-center py-3 pr-2">
                    <p className="mb-0.5 text-[15px] font-bold leading-6 text-[#000a1e]">{rule.name}</p>
                    <p className="mb-0 text-[13px] leading-5 text-[#59606d]">{rule.condition}</p>
                  </div>
                  <div className="flex shrink-0 items-center pl-1 pr-3 sm:pr-4">
                    <Link
                      href="#"
                      className="inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
                      onClick={(e) => e.preventDefault()}
                    >
                      Edit
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </BankRulesPageChrome>
  );
}
