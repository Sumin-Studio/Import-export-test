"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Chevron, Search, Arrow } from "@/app/components/ui/icons";
import type { TaxYearId } from "@/app/lib/mockData/annualTaxReturns";
import {
  getFirmStatementsPageTabCounts,
  getStatementsSummaryCards,
  type StatementsPageTabId,
} from "@/app/lib/mockData/taxStatements";

const TAB_LABELS: { id: StatementsPageTabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "disputed", label: "Disputed statements" },
  { id: "transfers", label: "Transfers" },
  { id: "transfers_different", label: "Transfers that are different" },
  { id: "notices", label: "Notices" },
  { id: "tax_pooling", label: "Tax pooling" },
  { id: "notices_different", label: "Notices that are different" },
];

const STATEMENT_TYPES = [
  "Income tax",
  "GST",
  "Provisional tax",
  "PAYE",
  "FBT",
];

const CLIENTS = [
  "Individual client test TC2",
  "NK Andrew Individual",
  "Smith Family Trust",
  "Johnson Trading Ltd",
  "Williams Partnership",
  "Davis Holdings",
  "GST Client Co",
  "NK Overseas Trust",
  "Martinez Family Trust",
  "Brown & Associates",
  "Lee Holdings Pty",
  "Wilson Tax Services",
  "Taylor Property Group",
  "Anderson Consulting",
  "Clark Financial Ltd",
  "White & Sons Partnership",
];

type RowTab = Exclude<StatementsPageTabId, "all">;

const TAB_STATUS_LABEL: Record<RowTab, string> = {
  disputed: "Disputed",
  transfers: "Transfer pending",
  transfers_different: "Transfer differs",
  notices: "Notice issued",
  tax_pooling: "In pool",
  notices_different: "Differs from notice",
};

type TransferReturnState = "Approved" | "Archived" | "Assessed" | "Filed";

type TransferTableRow = {
  fromLabel: string;
  returnState: TransferReturnState;
  toLabel: string;
  expected: number;
  transferred: number;
  remaining: number;
};

function formatMoneyNz(n: number): string {
  return n.toLocaleString("en-NZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function irdFromSeed(seed: number): string {
  const a = String((seed * 17 + 91) % 1000).padStart(3, "0");
  const b = String((seed * 31 + 672) % 1000).padStart(3, "0");
  const c = String((seed * 13 + 229) % 1000).padStart(3, "0");
  return `${a}-${b}-${c}`;
}

/** Realistic From / To labels for transfer tabs: Entity Type - Mon-YYYY (IRD#). */
function buildTransferRows(
  taxYearId: TaxYearId,
  kind: "transfers" | "transfers_different"
): TransferTableRow[] {
  const tabCounts = getFirmStatementsPageTabCounts(taxYearId);
  const n =
    kind === "transfers"
      ? tabCounts.transfers
      : tabCounts.transfers_different;

  const entities = [
    "Priya Nair",
    "James Chen",
    "Wiremu Kingi",
    "Aroha Williams",
    "Kauri Holdings Ltd",
    "Southern Cross Trust",
    "Rātā Family Trust",
    "Pākehā Consulting Ltd",
    "Ngāti Holdings Ltd",
    "Henderson Family Trust",
    "Flynn & Partners",
    "Rachel Mitchell",
    "Oliver Patel",
    "Emma Thompson",
    "Northland Orchard Co",
    "Bay Tax Services Ltd",
  ] as const;
  const returnTypes = ["INC", "GST", "FAM", "PAYE", "FBT"] as const;
  const months = [
    "Mar-2024",
    "Jun-2024",
    "Sep-2024",
    "Dec-2024",
    "Mar-2025",
    "Jan-2026",
    "Mar-2026",
  ] as const;
  const states: TransferReturnState[] = ["Approved", "Filed", "Archived"];

  const rows: TransferTableRow[] = [];
  for (let i = 0; i < n; i++) {
    const salt = kind === "transfers_different" ? 1000 : 0;
    const fromName = entities[i % entities.length];
    const toName = entities[(i + 4) % entities.length];
    const rtFrom = returnTypes[i % returnTypes.length];
    const rtTo = returnTypes[(i + 2) % returnTypes.length];
    const periodFrom = months[i % months.length];
    const periodTo = months[(i + 3) % months.length];
    const irdFrom = irdFromSeed(i + salt);
    const irdTo = irdFromSeed(i + 17 + salt);

    const fromLabel = `${fromName} ${rtFrom} - ${periodFrom} (${irdFrom})`;
    const toLabel = `${toName} ${rtTo} - ${periodTo} (${irdTo})`;
    const returnState: TransferReturnState =
      kind === "transfers_different" ? "Assessed" : states[i % states.length];

    const base = 620 + ((i * 419) % 8800) + (i % 9) * 33.4;
    const expected = Math.round(base * 100) / 100;

    let transferred = 0;
    if (kind === "transfers") {
      const phase = i % 6;
      if (phase === 2 || phase === 3) {
        transferred = Math.round(expected * (0.35 + (i % 3) * 0.1) * 100) / 100;
      } else if (phase === 5) {
        transferred = expected;
      }
    } else {
      transferred = Math.round((250 + (i % 5) * 180.25 + (i % 2) * 99.99) * 100) / 100;
      if (transferred > expected * 0.95) transferred = Math.round(expected * 0.45 * 100) / 100;
    }
    transferred = Math.min(transferred, expected);

    let remaining = Math.round((expected - transferred) * 100) / 100;
    if (kind === "transfers_different" && i % 4 === 1) {
      remaining = Math.round((remaining + 127.5 + (i % 3) * 10) * 100) / 100;
    }

    rows.push({
      fromLabel,
      returnState,
      toLabel,
      expected,
      transferred,
      remaining,
    });
  }
  return rows;
}

function buildStatementRows(taxYearId: TaxYearId): {
  tab: RowTab;
  status: string;
  client: string;
  irdNumber: string;
  statementType: string;
  period: string;
  updated: string;
}[] {
  const tabCounts = getFirmStatementsPageTabCounts(taxYearId);
  const segments: { tab: RowTab; n: number }[] = [
    { tab: "disputed", n: tabCounts.disputed },
    { tab: "transfers", n: tabCounts.transfers },
    { tab: "transfers_different", n: tabCounts.transfers_different },
    { tab: "notices", n: tabCounts.notices },
    { tab: "tax_pooling", n: tabCounts.tax_pooling },
    { tab: "notices_different", n: tabCounts.notices_different },
  ];

  const periods = [
    "Apr 2025",
    "Jan – Mar 2025",
    "Year ended 31 Mar 2025",
    "GST period Feb 2025",
  ];
  const updatedDates = [
    "19 Mar 2026",
    "15 Feb 2026",
    "10 Mar 2026",
    "8 Mar 2026",
    "5 Mar 2026",
    "1 Mar 2026",
    "28 Feb 2026",
  ];

  const rows: {
    tab: RowTab;
    status: string;
    client: string;
    irdNumber: string;
    statementType: string;
    period: string;
    updated: string;
  }[] = [];
  let globalIndex = 0;

  for (const { tab, n } of segments) {
    const status = TAB_STATUS_LABEL[tab];
    for (let j = 0; j < n; j++) {
      const i = globalIndex++;
      const client = CLIENTS[i % CLIENTS.length];
      const suffix =
        i >= CLIENTS.length ? ` ${Math.floor(i / CLIENTS.length) + 1}` : "";
      const a = String((91 + i) % 1000).padStart(3, "0");
      const b = String((672 + i * 7) % 1000).padStart(3, "0");
      const cPart = String((229 + i * 11) % 1000).padStart(3, "0");
      rows.push({
        tab,
        status,
        client: `${client}${suffix}`,
        irdNumber: `${a}-${b}-${cPart}`,
        statementType: STATEMENT_TYPES[i % STATEMENT_TYPES.length],
        period: periods[i % periods.length],
        updated: updatedDates[i % updatedDates.length],
      });
    }
  }

  return rows;
}

const PAGE_SIZES = [10, 25, 50, 100];

const VALID_TAB_IDS = new Set(TAB_LABELS.map((t) => t.id));
const VALID_TAX_YEAR_IDS = new Set<TaxYearId>(["fy26", "fy25", "fy24"]);

export default function TaxStatementsPage() {
  const searchParams = useSearchParams();
  const yearFromUrl = searchParams.get("year");
  const taxYearId: TaxYearId =
    yearFromUrl && VALID_TAX_YEAR_IDS.has(yearFromUrl as TaxYearId)
      ? (yearFromUrl as TaxYearId)
      : "fy26";

  const statementsData = useMemo(
    () => buildStatementRows(taxYearId),
    [taxYearId]
  );

  const summary = useMemo(
    () => getStatementsSummaryCards(taxYearId),
    [taxYearId]
  );

  const TABS = useMemo(() => {
    const counts = getFirmStatementsPageTabCounts(taxYearId);
    return TAB_LABELS.map((t) => ({
      ...t,
      count: counts[t.id],
    }));
  }, [taxYearId]);

  const tabFromUrl = searchParams.get("tab");
  const initialTab: StatementsPageTabId =
    tabFromUrl && VALID_TAB_IDS.has(tabFromUrl as StatementsPageTabId)
      ? (tabFromUrl as StatementsPageTabId)
      : "all";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && VALID_TAB_IDS.has(tab as StatementsPageTabId)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchQuery, taxYearId]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [taxYearId, activeTab]);

  const isTransferTabView =
    activeTab === "transfers" || activeTab === "transfers_different";

  const transferRowsSource = useMemo(() => {
    if (activeTab === "transfers") {
      return buildTransferRows(taxYearId, "transfers");
    }
    if (activeTab === "transfers_different") {
      return buildTransferRows(taxYearId, "transfers_different");
    }
    return [] as TransferTableRow[];
  }, [taxYearId, activeTab]);

  const filteredStatementData = useMemo(() => {
    let list = statementsData;
    if (activeTab !== "all") {
      list = statementsData.filter((r) => r.tab === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.client.toLowerCase().includes(q) ||
          r.irdNumber.includes(q) ||
          r.statementType.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery, statementsData]);

  const filteredTransferRows = useMemo(() => {
    let list = transferRowsSource;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.fromLabel.toLowerCase().includes(q) ||
          r.toLabel.toLowerCase().includes(q) ||
          r.returnState.toLowerCase().includes(q)
      );
    }
    return list;
  }, [transferRowsSource, searchQuery]);

  const filteredForActiveTab = isTransferTabView
    ? filteredTransferRows
    : filteredStatementData;

  const totalForView = filteredForActiveTab.length;
  const totalPages = Math.max(1, Math.ceil(totalForView / pageSize));

  const paginatedStatementData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStatementData.slice(start, start + pageSize);
  }, [filteredStatementData, page, pageSize]);

  const paginatedTransferData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTransferRows.slice(start, start + pageSize);
  }, [filteredTransferRows, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div>
      <div className="bg-[#f8f9fa] px-5 pt-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-[24px]/[115%] font-bold text-[#0078c8] transition-colors hover:text-[#0066a8]"
        >
          <h1 className="font-national">Tax Statements</h1>
          <Chevron className="h-5 w-5 shrink-0 -rotate-90" />
        </button>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border border-[#E1E2E5] bg-white px-4 py-3">
            <p className="text-[13px]/[20px] text-[#59606d]">
              Disputed statements
            </p>
            <p className="mt-1 text-[24px]/[28px] font-light text-[#0078c8]">
              {summary.disputedStatements}
            </p>
          </div>
          <div className="rounded border border-[#E1E2E5] bg-white px-4 py-3">
            <p className="text-[13px]/[20px] text-[#59606d]">
              Notices that are different
            </p>
            <p className="mt-1 text-[24px]/[28px] font-light text-[#0078c8]">
              {summary.noticesDifferent}
            </p>
          </div>
          <div className="rounded border border-[#E1E2E5] bg-white px-4 py-3">
            <p className="text-[13px]/[20px] text-[#59606d]">
              Notices that are the same
            </p>
            <p className="mt-1 text-[24px]/[28px] font-light text-[#0078c8]">
              {summary.noticesSame}
            </p>
          </div>
        </div>

        <div className="mt-4 border-b border-[#E1E2E5]" aria-hidden />
      </div>

      <div className="border-b border-[#E1E2E5] bg-[#f8f9fa] px-5 pb-4 pt-4">
        <div className="flex min-w-0 items-stretch overflow-x-auto rounded border border-[#ccced2]">
          {TABS.map((tab, idx) => (
            <Fragment key={tab.id}>
              {idx > 0 && (
                <span
                  className="w-px shrink-0 self-center bg-[#ccced2]"
                  aria-hidden
                />
              )}
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-[3.25rem] min-w-0 flex-1 basis-0 flex-col items-center justify-center gap-0.5 px-2 py-2 text-center text-[14px]/[130%] font-normal transition-colors first:rounded-l last:rounded-r sm:px-3 ${
                  activeTab === tab.id
                    ? "bg-white text-[#424F60]"
                    : "bg-[#f5f6f7] text-[#0078c8] hover:bg-[#ebebec]"
                }`}
              >
                <span className="w-full break-words hyphens-auto">
                  {tab.label}
                </span>
                <span className="font-normal opacity-90">({tab.count})</span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="bg-background-primary px-5 pb-10 pt-5">
        <div className="overflow-x-auto rounded border border-[#E1E2E5] bg-white">
          <div className="flex flex-wrap items-center justify-end gap-3 border-b border-[#e6e7e9] bg-[#F9FBFB] px-4 py-3">
            <div className="relative flex min-w-[12rem] max-w-[16rem] shrink-0 items-center">
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-[#ccced2] bg-white py-2 pl-4 pr-10 text-[14px]/[20px] text-[#000a1e] placeholder:text-[#59606d] focus:border-[#0078c8] focus:outline-none focus:ring-1 focus:ring-[#0078c8]"
              />
              <Search className="pointer-events-none absolute right-3 h-4 w-4 shrink-0 text-[#59606d]" />
            </div>
          </div>

          {isTransferTabView ? (
            <table className="w-full min-w-[960px] table-fixed">
              <thead>
                <tr className="bg-[#f8f9fa] text-left text-[13px]/[20px] font-medium text-[#0078c8]">
                  <th className="w-10 px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={
                        paginatedTransferData.length > 0 &&
                        paginatedTransferData.every((_, i) =>
                          selectedIds.has((page - 1) * pageSize + i)
                        )
                      }
                      onChange={(e) => {
                        const base = (page - 1) * pageSize;
                        const next = new Set(selectedIds);
                        if (e.target.checked) {
                          paginatedTransferData.forEach((_, i) =>
                            next.add(base + i)
                          );
                        } else {
                          paginatedTransferData.forEach((_, i) =>
                            next.delete(base + i)
                          );
                        }
                        setSelectedIds(next);
                      }}
                      className="size-4 cursor-pointer rounded border-[#ccced2]"
                      aria-label="Select all on page"
                    />
                  </th>
                  <th className="w-[24%] px-4 py-2.5">
                    <span className="inline-flex items-center gap-1">
                      From
                      <Chevron
                        className="h-3 w-3 shrink-0"
                        fill="fill-current"
                        aria-hidden
                      />
                    </span>
                  </th>
                  <th className="w-[12%] px-4 py-2.5">Return State</th>
                  <th className="w-[24%] px-4 py-2.5">To</th>
                  <th className="w-[12%] px-4 py-2.5 text-right">Expected</th>
                  <th className="w-[12%] px-4 py-2.5 text-right">
                    Transferred
                  </th>
                  <th className="w-[12%] px-4 py-2.5 text-right">
                    Remaining
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransferData.map((row, index) => {
                  const globalIndex = (page - 1) * pageSize + index;
                  const isSelected = selectedIds.has(globalIndex);
                  return (
                    <tr
                      key={`transfer-${globalIndex}`}
                      className="border-t border-[#e6e7e9] transition-colors hover:bg-[#e8f0f8]"
                    >
                      <td className="w-10 px-4 py-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const next = new Set(selectedIds);
                            if (isSelected) next.delete(globalIndex);
                            else next.add(globalIndex);
                            setSelectedIds(next);
                          }}
                          className="size-4 cursor-pointer rounded border-[#ccced2]"
                          aria-label={`Select transfer ${globalIndex + 1}`}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href="#"
                          className="text-[13px]/[20px] font-normal text-[#0078c8] hover:underline"
                        >
                          {row.fromLabel}
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href="#"
                          className="text-[13px]/[20px] font-normal text-[#0078c8] hover:underline"
                        >
                          {row.returnState}
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href="#"
                          className="text-[13px]/[20px] font-normal text-[#0078c8] hover:underline"
                        >
                          {row.toLabel}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-right text-[13px]/[20px] text-[#000a1e] tabular-nums">
                        {formatMoneyNz(row.expected)}
                      </td>
                      <td className="px-4 py-2 text-right text-[13px]/[20px] text-[#000a1e] tabular-nums">
                        {formatMoneyNz(row.transferred)}
                      </td>
                      <td className="px-4 py-2 text-right text-[13px]/[20px] text-[#000a1e] tabular-nums">
                        {formatMoneyNz(row.remaining)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[800px] table-fixed">
              <thead>
                <tr className="bg-[#f8f9fa] text-left text-[13px]/[20px] font-medium text-[#0078c8]">
                  <th className="w-10 px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={
                        paginatedStatementData.length > 0 &&
                        paginatedStatementData.every((_, i) =>
                          selectedIds.has((page - 1) * pageSize + i)
                        )
                      }
                      onChange={(e) => {
                        const base = (page - 1) * pageSize;
                        const next = new Set(selectedIds);
                        if (e.target.checked) {
                          paginatedStatementData.forEach((_, i) =>
                            next.add(base + i)
                          );
                        } else {
                          paginatedStatementData.forEach((_, i) =>
                            next.delete(base + i)
                          );
                        }
                        setSelectedIds(next);
                      }}
                      className="size-4 cursor-pointer rounded border-[#ccced2]"
                      aria-label="Select all on page"
                    />
                  </th>
                  <th className="w-[22%] px-4 py-2.5">Client</th>
                  <th className="w-[14%] px-4 py-2.5">IRD #</th>
                  <th className="w-[16%] px-4 py-2.5">Type</th>
                  <th className="w-[20%] px-4 py-2.5">Period</th>
                  <th className="w-[14%] px-4 py-2.5">Status</th>
                  <th className="w-[14%] px-4 py-2.5">Updated</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStatementData.map((row, index) => {
                  const globalIndex = (page - 1) * pageSize + index;
                  const isSelected = selectedIds.has(globalIndex);
                  return (
                    <tr
                      key={`${row.tab}-${globalIndex}`}
                      className="border-t border-[#e6e7e9] transition-colors hover:bg-[#e8f0f8]"
                    >
                      <td className="w-10 px-4 py-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const next = new Set(selectedIds);
                            if (isSelected) next.delete(globalIndex);
                            else next.add(globalIndex);
                            setSelectedIds(next);
                          }}
                          className="size-4 cursor-pointer rounded border-[#ccced2]"
                          aria-label={`Select ${row.client}`}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href="#"
                          className="text-[13px]/[20px] font-normal text-[#0078c8] hover:underline"
                        >
                          {row.client}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                        {row.irdNumber}
                      </td>
                      <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                        {row.statementType}
                      </td>
                      <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                        {row.period}
                      </td>
                      <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                        {row.status}
                      </td>
                      <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                        {row.updated}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e6e7e9] bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded border border-[#ccced2] bg-white px-3 py-1.5 text-[13px]/[20px] text-[#000a1e] focus:border-[#0078c8] focus:outline-none"
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size} items per page
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[13px]/[20px] text-[#424F60]">
              Page {page} of {totalPages} ({totalForView} total items)
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 rounded border border-[#ccced2] bg-white px-3 py-1.5 text-[13px]/[20px] font-medium text-[#0078c8] hover:bg-[#f5f6f7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="rotate-180">
                  <Arrow className="h-4 w-4 shrink-0" />
                </span>
                Previous
              </button>
              <select
                value={Math.min(page, totalPages)}
                onChange={(e) => setPage(Number(e.target.value))}
                className="rounded border border-[#ccced2] bg-white px-3 py-1.5 text-[13px]/[20px] text-[#000a1e] focus:border-[#0078c8] focus:outline-none"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i} value={i + 1}>
                    Page {i + 1} of {totalPages}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 rounded border border-[#ccced2] bg-white px-3 py-1.5 text-[13px]/[20px] font-medium text-[#0078c8] hover:bg-[#f5f6f7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <Arrow className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
