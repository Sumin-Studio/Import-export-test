"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Chevron, Search, Arrow } from "@/app/components/ui/icons";
import {
  getFirmReturnsPageTabCounts,
  type ReturnsPageTabId,
} from "@/app/lib/mockData/annualTaxReturns";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import { useRegion } from "@/app/contexts/RegionContext";
import { type PrototypeStageId } from "@/app/lib/prototypeSettings";

function readyStartLabelForReturnsUi(
  region: string,
  prototypeStage: PrototypeStageId
): string {
  return region === "NZ" && (prototypeStage === "ga" || prototypeStage === "ai")
    ? "Not started"
    : "Ready to start";
}

function tabLabelsForStage(
  region: string,
  prototypeStage: PrototypeStageId,
  errorTabLabel: string
): { id: ReturnsPageTabId; label: string; isError?: boolean }[] {
  const readyStart = readyStartLabelForReturnsUi(region, prototypeStage);
  return [
    { id: "all", label: "All" },
    { id: "ready_to_start", label: readyStart },
    { id: "draft", label: "Draft" },
    {
      id: "completed",
      label: "Completed",
    },
    {
      id: "approved",
      label: "Approved",
    },
    {
      id: "signed",
      label: "Signed",
    },
    { id: "filed", label: "Filed" },
    { id: "assessed", label: "Assessed" },
    { id: "error", label: errorTabLabel, isError: true },
  ];
}

const TAX_TYPES = [
  "IR3NR",
  "IR526",
  "IR6",
  "IR4",
  "IR3",
  "IR7",
  "GST",
  "IR9",
  "IR8",
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
  "Harris Retail Co",
  "Thomas Industries",
  "Jackson Estate Trust",
  "Moore Accounting",
];

type RowTab = Exclude<ReturnsPageTabId, "all">;

function tabStatusLabelsForStage(
  region: string,
  prototypeStage: PrototypeStageId,
  errorStatusLabel: string
): Record<RowTab, string> {
  const readyStart = readyStartLabelForReturnsUi(region, prototypeStage);
  return {
    ready_to_start: readyStart,
    draft: "Draft",
    completed: "Completed",
    approved: "Approved",
    signed: "Signed",
    filed: "Filed",
    assessed: "Assessed",
    error: errorStatusLabel,
  };
}

function buildReturnsRows(tabStatusLabel: Record<RowTab, string>): {
  tab: RowTab;
  status: string;
  client: string;
  irdNumber: string;
  type: string;
  periodEnd: string;
  year: string;
  version: string;
  fileDate: string;
  edited: string;
}[] {
  const c = getFirmReturnsPageTabCounts();
  const segments: { tab: RowTab; n: number }[] = [
    { tab: "ready_to_start", n: c.ready_to_start },
    { tab: "draft", n: c.draft },
    { tab: "completed", n: c.completed },
    { tab: "approved", n: c.approved },
    { tab: "signed", n: c.signed },
    { tab: "filed", n: c.filed },
    { tab: "assessed", n: c.assessed },
    { tab: "error", n: c.error },
  ];

  const periodEnds = [
    "31 Dec 2024",
    "31 Mar 2024",
    "30 Jun 2024",
    "31 Jan 2025",
  ];
  const editedDates = [
    "19 Mar",
    "26 Feb",
    "18 Nov 2025",
    "10 Mar",
    "8 Mar",
    "5 Mar",
    "1 Mar",
    "28 Feb",
  ];
  const fileDates = [
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
    type: string;
    periodEnd: string;
    year: string;
    version: string;
    fileDate: string;
    edited: string;
  }[] = [];
  let globalIndex = 0;

  for (const { tab, n } of segments) {
    const status = tabStatusLabel[tab];
    for (let j = 0; j < n; j++) {
      const i = globalIndex++;
      const client = CLIENTS[i % CLIENTS.length];
      const suffix =
        i >= CLIENTS.length ? ` ${Math.floor(i / CLIENTS.length) + 1}` : "";
      const a = String((87 + i) % 1000).padStart(3, "0");
      const b = String((668 + i * 7) % 1000).padStart(3, "0");
      const c = String((223 + i * 11) % 1000).padStart(3, "0");
      rows.push({
        tab,
        status,
        client: `${client}${suffix}`,
        irdNumber: `${a}-${b}-${c}`,
        type: TAX_TYPES[i % TAX_TYPES.length],
        periodEnd: periodEnds[i % periodEnds.length],
        year: i % 3 === 0 ? "2025" : "2024",
        version: i % 4 === 0 ? String((i % 9) + 1).padStart(3, "0") : "",
        fileDate: fileDates[i % fileDates.length],
        edited: editedDates[i % editedDates.length],
      });
    }
  }

  return rows;
}

const PAGE_SIZES = [10, 25, 50, 100];

const VALID_TAB_IDS = new Set(
  tabLabelsForStage("AU", "ga", "Errors").map((t) => t.id)
);

function isNzXpacErrorCopy(
  region: string,
  prototypeStage: PrototypeStageId
): boolean {
  return region === "NZ" && prototypeStage === "xpac";
}

export default function AllReturnsPage() {
  const { region } = useRegion();
  const { stage } = usePrototypeSettings();
  const errorTabLabel = isNzXpacErrorCopy(region, stage)
    ? "Errors"
    : "Filing errors";
  const tabLabels = useMemo(
    () => tabLabelsForStage(region, stage, errorTabLabel),
    [region, stage, errorTabLabel]
  );
  const tabStatusLabel = useMemo(
    () => tabStatusLabelsForStage(region, stage, errorTabLabel),
    [region, stage, errorTabLabel]
  );
  const returnsData = useMemo(
    () => buildReturnsRows(tabStatusLabel),
    [tabStatusLabel]
  );

  const counts = getFirmReturnsPageTabCounts();
  const TABS = tabLabels.map((t) => ({
    ...t,
    count: counts[t.id],
  }));

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const initialTab: ReturnsPageTabId =
    tabFromUrl && VALID_TAB_IDS.has(tabFromUrl as ReturnsPageTabId)
      ? (tabFromUrl as ReturnsPageTabId)
      : "all";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && VALID_TAB_IDS.has(tab as ReturnsPageTabId)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchQuery]);

  const filteredData = useMemo(() => {
    let list = returnsData;
    if (activeTab !== "all") {
      list = returnsData.filter((r) => r.tab === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.client.toLowerCase().includes(q) ||
          r.irdNumber.includes(q) ||
          r.type.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery, returnsData]);

  const totalForView = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalForView / pageSize));

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div>
      {/* Header */}
      <div className="bg-[#f8f9fa] px-5 pt-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-[24px]/[115%] font-bold text-[#0078c8] hover:text-[#0066a8] transition-colors"
        >
          <h1 className="font-national">All Returns</h1>
          <Chevron className="h-5 w-5 shrink-0 -rotate-90" />
        </button>
        <div className="mt-4 border-b border-[#E1E2E5]" aria-hidden />
      </div>

      {/* Status tabs — full-width bordered bar, selected = white bg + dark text */}
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
                } ${tab.isError ? "!text-[#de0e40]" : ""}`}
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
          {/* Approve + selection (left, not on All tab) · Search (right) */}
          <div
            className={`flex flex-wrap items-center gap-3 border-b border-[#e6e7e9] bg-[#F9FBFB] px-4 py-3 ${
              activeTab === "all" ? "justify-end" : "justify-between"
            }`}
          >
            {activeTab !== "all" && (
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={selectedIds.size === 0}
                  className="rounded border border-[#ccced2] bg-white px-3 py-1.5 text-[13px]/[20px] font-medium text-[#0078c8] hover:bg-[#f5f6f7] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
                >
                  Approve
                </button>
                <span className="text-[13px]/[20px] text-[#59606d]">
                  {selectedIds.size === 0
                    ? "No items selected"
                    : `${selectedIds.size} item${selectedIds.size === 1 ? "" : "s"} selected`}
                </span>
              </div>
            )}
            <div
              className={`relative flex min-w-[12rem] max-w-[16rem] items-center ${
                activeTab === "all" ? "shrink-0" : "max-w-full flex-1 sm:flex-none"
              }`}
            >
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

          <table className="w-full min-w-[900px] table-fixed">
            <thead>
              <tr className="bg-[#f8f9fa] text-left text-[13px]/[20px] font-medium text-[#0078c8]">
                <th className="w-10 px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((_, i) =>
                        selectedIds.has((page - 1) * pageSize + i)
                      )
                    }
                    onChange={(e) => {
                      const base = (page - 1) * pageSize;
                      const next = new Set(selectedIds);
                      if (e.target.checked) {
                        paginatedData.forEach((_, i) => next.add(base + i));
                      } else {
                        paginatedData.forEach((_, i) => next.delete(base + i));
                      }
                      setSelectedIds(next);
                    }}
                    className="size-4 cursor-pointer rounded border-[#ccced2]"
                    aria-label="Select all on page"
                  />
                </th>
                <th className="w-[20%] px-4 py-2.5">Client</th>
                <th className="w-[12%] px-4 py-2.5">IRD #</th>
                <th className="w-[8%] px-4 py-2.5">Type</th>
                <th className="w-[10%] px-4 py-2.5">Period End</th>
                <th className="w-[6%] px-4 py-2.5">Year</th>
                <th className="w-[8%] px-4 py-2.5">Version</th>
                <th className="w-[12%] px-4 py-2.5">File Date</th>
                <th className="w-[10%] px-4 py-2.5">Status</th>
                <th className="w-[10%] px-4 py-2.5">Edited</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => {
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
                    {row.type}
                  </td>
                  <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                    {row.periodEnd}
                  </td>
                  <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                    {row.year}
                  </td>
                  <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                    {row.version || "—"}
                  </td>
                  <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                    {row.fileDate}
                  </td>
                  <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                    {row.status}
                  </td>
                  <td className="px-4 py-2 text-[13px]/[20px] text-[#000a1e]">
                    {row.edited}
                  </td>
                </tr>
              );})}
            </tbody>
          </table>

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
              {totalForView} total items
            </div>
            <div className="flex items-center gap-2">
              <button
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
