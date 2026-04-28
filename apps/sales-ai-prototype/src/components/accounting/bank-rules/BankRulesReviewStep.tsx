"use client";

import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type RuleStatus = "ready" | "needsAttention";

type Condition = {
  field: string;
  condition: string;
  value: string;
};

type LineItem = {
  description: string;
  account: string | null;
  taxRate: string;
  region: string;
  percent: string;
};

type AccountMapping = {
  sourceCode: string;
  targetAccount: string | null;
};

type Rule = {
  id: string;
  name: string;
  conditionSummary: string;
  status: RuleStatus;
  unresolvedCount: number;
  conditionMatch: "any" | "all";
  conditions: Condition[];
  contact: string;
  lineItems: LineItem[];
  mappings: AccountMapping[];
};

// ─── Prototype data ───────────────────────────────────────────────────────────

const INITIAL_RULES: Rule[] = [
  {
    id: "bp-fuel",
    name: "BP fuel purchases",
    conditionSummary: 'Payee contains "BP"',
    status: "ready",
    unresolvedCount: 0,
    conditionMatch: "all",
    conditions: [{ field: "Payee", condition: "contains", value: "BP" }],
    contact: "BP",
    lineItems: [
      { description: "Fuel", account: "429 – General Expenses", taxRate: "15% GST on Expenses", region: "—", percent: "100.00%" },
    ],
    mappings: [],
  },
  {
    id: "officeworks",
    name: "Officeworks supplies",
    conditionSummary: 'Payee contains "Officeworks"',
    status: "needsAttention",
    unresolvedCount: 1,
    conditionMatch: "all",
    conditions: [
      { field: "Payee", condition: "contains", value: "Officeworks" },
      { field: "Amount", condition: "less than", value: "500" },
    ],
    contact: "Officeworks",
    lineItems: [
      { description: "Office supplies", account: null, taxRate: "15% GST on Expenses", region: "—", percent: "100.00%" },
    ],
    mappings: [{ sourceCode: "604 – Office supplies (source file)", targetAccount: null }],
  },
  {
    id: "xero-subscription",
    name: "Xero subscription",
    conditionSummary: 'Payee contains "Xero"',
    status: "ready",
    unresolvedCount: 0,
    conditionMatch: "any",
    conditions: [{ field: "Payee", condition: "contains", value: "Xero" }],
    contact: "Xero",
    lineItems: [
      { description: "Software subscription", account: "404 – IT & Software", taxRate: "15% GST on Expenses", region: "—", percent: "100.00%" },
    ],
    mappings: [],
  },
  {
    id: "payroll-clearing",
    name: "Payroll clearing",
    conditionSummary: 'Reference contains "PAYROLL"',
    status: "needsAttention",
    unresolvedCount: 2,
    conditionMatch: "all",
    conditions: [{ field: "Reference", condition: "contains", value: "PAYROLL" }],
    contact: "Smart Payroll",
    lineItems: [
      { description: "Wages", account: null, taxRate: "No GST", region: "—", percent: "80.00%" },
      { description: "PAYE", account: null, taxRate: "No GST", region: "—", percent: "20.00%" },
    ],
    mappings: [
      { sourceCode: "477 – Wages (NZ org)", targetAccount: null },
      { sourceCode: "825 – PAYE Payable (NZ org)", targetAccount: null },
    ],
  },
  {
    id: "merchant-fees",
    name: "ANZ merchant fees",
    conditionSummary: 'Reference contains "MERCHANT FEE"',
    status: "ready",
    unresolvedCount: 0,
    conditionMatch: "all",
    conditions: [{ field: "Reference", condition: "contains", value: "MERCHANT FEE" }],
    contact: "ANZ Bank",
    lineItems: [
      { description: "Merchant service fee", account: "404 – Bank fees", taxRate: "15% GST on Expenses", region: "—", percent: "100.00%" },
    ],
    mappings: [],
  },
];

const FIELD_OPTIONS = ["Description", "Amount", "Reference", "Payee", "Bank account"];
const TEXT_CONDITIONS = ["contains", "starts with", "ends with", "is", "is not", "does not contain"];
const AMOUNT_CONDITIONS = ["equals", "greater than", "less than", "is between"];
const ACCOUNT_OPTIONS = [
  "200 – Sales",
  "404 – Bank fees",
  "404 – IT & Software",
  "429 – General Expenses",
  "493 – Travel and parking",
  "604 – Office expenses",
  "477 – Wages",
  "825 – PAYE Payable",
  "960 – Suspense",
];

// ─── Design tokens ────────────────────────────────────────────────────────────

const pillReady = "inline-flex items-center rounded-sm h-4 px-1.5 text-[11px] font-medium leading-none bg-[#d4f5e6] text-[#0b6e38]";
const pillAttention = "inline-flex items-center rounded-sm h-4 px-1.5 text-[11px] font-medium leading-none bg-[#fde8e8] text-[#c31230]";
const inputBase = "h-9 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] text-[#000a1e] focus:border-[#0078C8] focus:outline-none focus:ring-1 focus:ring-[#0078C8]";
const selectBase = "h-9 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-[13px] text-[#000a1e] focus:border-[#0078C8] focus:outline-none focus:ring-1 focus:ring-[#0078C8]";
const selectError = "h-9 w-full rounded-[3px] border border-[#c31230] bg-[#fde8e8] px-2 text-[13px] text-[#59606d] focus:outline-none focus:ring-1 focus:ring-[#c31230]";

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return (
    <h3 className={`mb-3 text-[15px] font-bold ${error ? "text-[#c31230]" : "text-[#000a1e]"}`}>
      {children}
    </h3>
  );
}

// ─── Table shell ──────────────────────────────────────────────────────────────

function XTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[3px] border border-[#ccced2]">
      {children}
    </div>
  );
}

function XTableHeader({ cols, children }: { cols: string; children: React.ReactNode }) {
  return (
    <div className={`grid ${cols} border-b border-[#ccced2] bg-[#f2f3f4] px-3 py-2 text-[13px] font-semibold text-[#59606d]`}>
      {children}
    </div>
  );
}

function XTableRow({ cols, children, last }: { cols: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`grid ${cols} items-center gap-2 px-3 py-2 ${last ? "" : "border-b border-[#e1e2e5]"}`}>
      {children}
    </div>
  );
}

function XTableAddRow({ onClick, label }: { onClick?: () => void; label: string }) {
  return (
    <div className="border-t border-[#e1e2e5] px-3 py-2.5">
      <button
        type="button"
        onClick={onClick}
        className="text-[13px] font-semibold text-[#0078C8] hover:underline"
      >
        {label}
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface BankRulesReviewStepProps {
  onUnresolvedCountChange?: (count: number) => void;
}

export function BankRulesReviewStep({ onUnresolvedCountChange }: BankRulesReviewStepProps) {
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [selectedId, setSelectedId] = useState<string>("officeworks");
  const [filter, setFilter] = useState<"all" | "ready" | "needsAttention">("all");

  const selected = rules.find((r) => r.id === selectedId) ?? rules[0];
  const readyCount = rules.filter((r) => r.status === "ready").length;
  const attentionCount = rules.filter((r) => r.status === "needsAttention").length;
  const totalUnresolved = rules.reduce((sum, r) => sum + r.unresolvedCount, 0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onUnresolvedCountChange?.(totalUnresolved); }, [totalUnresolved]);

  const filtered = rules.filter((r) => {
    if (filter === "ready") return r.status === "ready";
    if (filter === "needsAttention") return r.status === "needsAttention";
    return true;
  });
  const visibleRules = [...filtered].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "ready" ? -1 : 1;
  });

  // ── State updaters ──────────────────────────────────────────────────────────

  const updateSelected = (updater: (r: Rule) => Rule) =>
    setRules((prev) => prev.map((r) => (r.id === selectedId ? updater(r) : r)));

  const setConditionMatch = (match: "any" | "all") =>
    updateSelected((r) => ({ ...r, conditionMatch: match }));

  const setConditionField = (idx: number, key: keyof Condition, val: string) =>
    updateSelected((r) => ({
      ...r,
      conditions: r.conditions.map((c, i) => (i === idx ? { ...c, [key]: val } : c)),
    }));

  const addCondition = () =>
    updateSelected((r) => ({
      ...r,
      conditions: [...r.conditions, { field: "Description", condition: "contains", value: "" }],
    }));

  const removeCondition = (idx: number) =>
    updateSelected((r) => ({
      ...r,
      conditions: r.conditions.filter((_, i) => i !== idx),
    }));

  const resolveMapping = (idx: number, targetAccount: string) =>
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== selectedId) return r;
        const newMappings = r.mappings.map((m, i) =>
          i === idx ? { ...m, targetAccount: targetAccount || null } : m
        );
        const unresolvedCount = newMappings.filter((m) => !m.targetAccount).length;
        return {
          ...r,
          mappings: newMappings,
          unresolvedCount,
          status: unresolvedCount === 0 ? "ready" : "needsAttention",
        };
      })
    );

  // ── Resolve mappings block ──────────────────────────────────────────────────

  const ResolveMappingsBlock = selected.mappings.length > 0 ? (
    <div className="mb-8">
      <SectionHeading error={selected.unresolvedCount > 0}>
        Resolve account mappings
      </SectionHeading>
      <p className="mb-3 text-[13px] text-[#59606d]">
        Map each account from the source organisation to an account in this organisation.
      </p>
      <XTable>
        <XTableHeader cols="grid-cols-[1fr_28px_1fr]">
          <span>Source account</span>
          <span />
          <span>Maps to in this org</span>
        </XTableHeader>
        {selected.mappings.map((mapping, idx) => (
          <XTableRow key={idx} cols="grid-cols-[1fr_28px_1fr]" last={idx === selected.mappings.length - 1}>
            <div className="flex h-9 items-center truncate rounded-[3px] border border-[#e1e2e5] bg-[#f3f4f5] px-3 text-[13px] text-[#59606d]">
              {mapping.sourceCode}
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0 text-[#A6A9B0]">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <select
              value={mapping.targetAccount ?? ""}
              onChange={(e) => resolveMapping(idx, e.target.value)}
              className={mapping.targetAccount ? selectBase : selectError}
            >
              <option value="">Select in this org…</option>
              {ACCOUNT_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </XTableRow>
        ))}
      </XTable>
    </div>
  ) : null;

  // ── Layout ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 148px)" }}>

      {/* ── Left: Rule list ─────────────────────────────────────────── */}
      <aside className="flex w-[340px] shrink-0 flex-col border-r border-[#e1e2e5] bg-[#f9fafb]">

        <div className="border-b border-[#e1e2e5] px-4 py-3">
          <div className="mb-2.5 flex items-baseline justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#59606d]">
              {rules.length} rules
            </p>
            <p className="text-[11px] text-[#59606d]">
              <span className="font-semibold text-[#0b6e38]">{readyCount}</span> of {rules.length} ready
            </p>
          </div>
          <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-[#e1e2e5]">
            <div
              className="h-full rounded-full bg-[#0b6e38] transition-all duration-300"
              style={{ width: `${(readyCount / rules.length) * 100}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(["all", "ready", "needsAttention"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-[3px] border px-2 py-0.5 text-[12px] font-semibold transition-colors ${
                  filter === f
                    ? f === "all"
                      ? "border-[#0078C8] bg-[#e8f4fc] text-[#0078C8]"
                      : f === "ready"
                      ? "border-transparent bg-[#d4f5e6] text-[#0b6e38]"
                      : "border-transparent bg-[#fde8e8] text-[#c31230]"
                    : "border-[#d5d7da] bg-[#f3f4f5] text-[#495058] hover:bg-[#e8eaed]"
                }`}
              >
                {f === "all" ? "All" : f === "ready" ? `${readyCount} ready` : `${attentionCount} need attention`}
              </button>
            ))}
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto" role="listbox" aria-label="Rules">
          {visibleRules.map((rule) => {
            const isSelected = rule.id === selectedId;
            return (
              <li key={rule.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => setSelectedId(rule.id)}
                  className={`relative w-full border-b border-[#e1e2e5] px-4 py-3 text-left transition-colors ${
                    isSelected ? "bg-[#e8f4fc]" : "hover:bg-[#f0f2f5]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute inset-y-0 left-0 w-[3px] bg-[#0078C8]" aria-hidden />
                  )}
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className={`truncate text-[13px] font-semibold ${isSelected ? "text-[#0078C8]" : "text-[#000a1e]"}`}>
                      {rule.name}
                    </p>
                    <span className={rule.status === "ready" ? pillReady : pillAttention}>
                      {rule.status === "ready" ? "Ready" : "Action needed"}
                    </span>
                  </div>
                  <p className="truncate text-[12px] text-[#59606d]">{rule.conditionSummary}</p>
                  {rule.unresolvedCount > 0 && (
                    <p className="mt-1 text-[11px] font-semibold text-[#c31230]">
                      {rule.unresolvedCount} unresolved mapping{rule.unresolvedCount !== 1 ? "s" : ""}
                    </p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ── Right: Edit panel ───────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[780px] px-6 py-6">

            {/* Rule title + status */}
            <div className="mb-6 flex items-center gap-3 border-b border-[#e1e2e5] pb-5">
              <h2 className="m-0 text-[18px] font-bold text-[#000a1e]">{selected.name}</h2>
              <span className={selected.status === "ready" ? pillReady : pillAttention}>
                {selected.status === "ready" ? "Ready" : "Action needed"}
              </span>
            </div>

            {/* Error banner */}
            {selected.unresolvedCount > 0 && (
              <div className="mb-6 flex items-start gap-3 rounded-[3px] border border-[#f5c0c6] bg-[#fde8e8] px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-[#c31230]" aria-hidden>
                  <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7.25 5a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0V5zm.75 6.5a.875.875 0 110-1.75.875.875 0 010 1.75z" fill="currentColor" />
                </svg>
                <p className="m-0 text-[13px] text-[#000a1e]">
                  <span className="font-bold">
                    {selected.unresolvedCount} account mapping{selected.unresolvedCount !== 1 ? "s" : ""} need attention.
                  </span>{" "}
                  Map them to accounts in this organisation before importing.
                </p>
              </div>
            )}

            {/* Resolve mappings — top when unresolved */}
            {selected.unresolvedCount > 0 && ResolveMappingsBlock}

            {/* ── 1. Apply a bank rule ─────────────────────────────── */}
            <div className="mb-8">
              <SectionHeading>1. Apply a bank rule</SectionHeading>

              {/* Radio buttons */}
              <div className="mb-4 overflow-hidden rounded-[3px] border border-[#ccced2]">
                {(["any", "all"] as const).map((opt, i) => (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-2.5 px-3 py-2.5 text-[13px] text-[#000a1e] hover:bg-[#f9fafb] ${
                      i === 0 ? "border-b border-[#e1e2e5]" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`match-${selected.id}`}
                      value={opt}
                      checked={selected.conditionMatch === opt}
                      onChange={() => setConditionMatch(opt)}
                      className="accent-[#0078C8]"
                    />
                    {opt === "any" ? "Any conditions match" : "All conditions match"}
                  </label>
                ))}
              </div>

              <p className="mb-2 text-[13px] text-[#59606d]">Add conditions</p>

              {/* Conditions table */}
              <XTable>
                <XTableHeader cols="grid-cols-[1fr_1fr_1fr_32px]">
                  <span>Field</span>
                  <span>Condition</span>
                  <span>Value</span>
                  <span />
                </XTableHeader>
                {selected.conditions.map((cond, idx) => (
                  <XTableRow key={idx} cols="grid-cols-[1fr_1fr_1fr_32px]">
                    <select
                      value={cond.field}
                      onChange={(e) => setConditionField(idx, "field", e.target.value)}
                      className={selectBase}
                    >
                      {FIELD_OPTIONS.map((f) => <option key={f}>{f}</option>)}
                    </select>
                    <select
                      value={cond.condition}
                      onChange={(e) => setConditionField(idx, "condition", e.target.value)}
                      className={selectBase}
                    >
                      {(cond.field === "Amount" ? AMOUNT_CONDITIONS : TEXT_CONDITIONS).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={cond.value}
                      onChange={(e) => setConditionField(idx, "value", e.target.value)}
                      className={inputBase}
                    />
                    <button
                      type="button"
                      onClick={() => removeCondition(idx)}
                      disabled={selected.conditions.length === 1}
                      aria-label="Remove condition"
                      className="flex h-8 w-8 items-center justify-center rounded text-[#59606d] hover:bg-[#f0f2f4] hover:text-[#000a1e] disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                      </svg>
                    </button>
                  </XTableRow>
                ))}
                <XTableAddRow onClick={addCondition} label="Add condition" />
              </XTable>
            </div>

            {/* ── 2. Set the contact ───────────────────────────────── */}
            <div className="mb-8">
              <SectionHeading>2. Set the contact</SectionHeading>
              <div className="flex gap-2">
                <select className={selectBase} style={{ flexShrink: 0, width: "220px" }}>
                  <option>To an existing or new contact</option>
                  <option>To an existing contact</option>
                </select>
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#59606d]">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6a5 5 0 0110 0H3z" fill="currentColor" />
                    </svg>
                  </span>
                  <input
                    key={selected.id + "-contact"}
                    type="text"
                    defaultValue={selected.contact}
                    className={inputBase + " pl-8"}
                  />
                </div>
              </div>
            </div>

            {/* ── 3. Allocate line items ───────────────────────────── */}
            <div className="mb-8">
              <SectionHeading>3. Allocate line items</SectionHeading>
              <p className="mb-3 text-[13px] text-[#59606d]">
                Allocate ratios using percent line items
              </p>
              <XTable>
                <XTableHeader cols="grid-cols-[2fr_2fr_2fr_1fr_1fr]">
                  <span>Description</span>
                  <span>Account</span>
                  <span>Tax rate</span>
                  <span>Region</span>
                  <span>Percent</span>
                </XTableHeader>
                {selected.lineItems.map((item, idx) => (
                  <XTableRow key={selected.id + "-li-" + idx} cols="grid-cols-[2fr_2fr_2fr_1fr_1fr]">
                    <input
                      key={selected.id + "-desc-" + idx}
                      type="text"
                      defaultValue={item.description}
                      className={inputBase}
                    />
                    <div
                      className={`flex h-9 items-center rounded-[3px] border px-3 text-[13px] ${
                        item.account === null
                          ? "border-[#A6A9B0] bg-white italic text-[#8c95a1]"
                          : "border-[#A6A9B0] bg-white text-[#000a1e]"
                      }`}
                    >
                      <span className="truncate">{item.account ?? "Map account…"}</span>
                    </div>
                    <input key={selected.id + "-tax-" + idx} type="text" defaultValue={item.taxRate} className={inputBase} />
                    <input key={selected.id + "-reg-" + idx} type="text" defaultValue={item.region} className={inputBase} />
                    <input key={selected.id + "-pct-" + idx} type="text" defaultValue={item.percent} className={inputBase} />
                  </XTableRow>
                ))}
                <XTableAddRow label="Add a new line" />
              </XTable>
              <div className="mt-2 flex justify-end pr-1 text-[13px] text-[#59606d]">
                <span className="mr-3">Total</span>
                <span className="font-bold text-[#000a1e]">
                  {selected.lineItems.reduce((sum, item) => {
                    const n = parseFloat(item.percent.replace("%", ""));
                    return sum + (isNaN(n) ? 0 : n);
                  }, 0).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Resolve mappings — bottom when all resolved */}
            {selected.unresolvedCount === 0 && ResolveMappingsBlock}

          </div>
        </div>
      </div>
    </div>
  );
}
