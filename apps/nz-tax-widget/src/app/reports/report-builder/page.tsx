"use client";

import { useMemo, useState } from "react";
import { Search } from "@/app/components/ui/icons";
import { REPORT_BUILDER_MOCK_ROWS } from "@/app/lib/mockData/reportBuilder";

const SUB_TABS = [
  { id: "my", label: "My reports" },
  { id: "custom", label: "Custom reports" },
  { id: "samples", label: "Samples" },
] as const;

export default function ReportBuilderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSub, setActiveSub] =
    useState<(typeof SUB_TABS)[number]["id"]>("my");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return REPORT_BUILDER_MOCK_ROWS;
    return REPORT_BUILDER_MOCK_ROWS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.layout.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div>
      <div className="bg-[#f8f9fa] px-5 pt-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="font-national text-[24px]/[115%] font-bold text-[#0078c8]">
              Report builder
            </h1>
            <div
              className="mt-3 flex flex-wrap gap-1 border-b border-[#E1E2E5] pb-0"
              role="tablist"
              aria-label="Report builder sections"
            >
              {SUB_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSub === t.id}
                  onClick={() => setActiveSub(t.id)}
                  className={`relative px-3 py-2 text-[14px]/[20px] font-medium transition-colors ${
                    activeSub === t.id
                      ? "text-[#424F60] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-[#0078c8]"
                      : "text-[#0078c8] hover:text-[#0066a8]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded bg-[#13b5ea] px-4 py-2 text-[14px]/[20px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0fa5d6]"
          >
            New report
          </button>
        </div>
        <div className="mt-4 border-b border-[#E1E2E5]" aria-hidden />
      </div>

      <div className="bg-background-primary px-5 pb-10 pt-5">
        <div className="overflow-x-auto rounded border border-[#E1E2E5] bg-white">
          <div className="flex flex-wrap items-center gap-3 border-b border-[#e6e7e9] bg-[#F9FBFB] px-4 py-3">
            <div className="relative min-w-[200px] max-w-md flex-1">
              <Search className="text-content-secondary pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border-primary text-content-primary placeholder:text-content-tertiary w-full rounded border bg-white py-2 pr-3 pl-9 text-[13px]/[20px] outline-none focus-visible:ring-2 focus-visible:ring-[#0078c8]/40"
                aria-label="Search reports"
              />
            </div>
            <button
              type="button"
              className="text-content-primary inline-flex items-center gap-2 rounded border border-[#ccced2] bg-white px-3 py-2 text-[13px]/[20px] font-medium hover:bg-[#f5f6f7]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="size-4 text-[#0078c8]"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left text-[13px]/[20px]">
              <thead>
                <tr className="border-b border-[#E1E2E5] bg-[#f5f6f7] text-[#59606d]">
                  <th className="w-10 px-3 py-2.5" scope="col">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-3 py-2.5 font-medium" scope="col">
                    Title
                  </th>
                  <th className="px-3 py-2.5 font-medium" scope="col">
                    Type
                  </th>
                  <th className="px-3 py-2.5 font-medium" scope="col">
                    Layout
                  </th>
                  <th className="px-3 py-2.5 font-medium" scope="col">
                    Author
                  </th>
                  <th className="px-3 py-2.5 font-medium" scope="col">
                    <span className="inline-flex items-center gap-1">
                      Date Created
                      <span className="text-[#0078c8]" aria-hidden>
                        ▼
                      </span>
                    </span>
                  </th>
                  <th className="px-3 py-2.5 font-medium" scope="col">
                    Last Used
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={`${row.title}-${row.dateCreated}-${i}`}
                    className="border-b border-[#f0f1f2] hover:bg-[#fafbfb]"
                  >
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        className="rounded border-[#ccced2]"
                        aria-label={`Select ${row.title}`}
                      />
                    </td>
                    <td className="text-content-primary max-w-[min(360px,40vw)] px-3 py-2.5 font-medium">
                      {row.title}
                    </td>
                    <td className="text-content-secondary px-3 py-2.5">
                      {row.type}
                    </td>
                    <td className="text-content-secondary px-3 py-2.5">
                      {row.layout}
                    </td>
                    <td className="text-content-secondary px-3 py-2.5">
                      {row.author}
                    </td>
                    <td className="text-content-secondary px-3 py-2.5">
                      {row.dateCreated}
                    </td>
                    <td className="text-content-secondary px-3 py-2.5">
                      {row.lastUsed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 ? (
            <p className="text-content-secondary px-4 py-8 text-center text-[13px]/[20px]">
              No reports match your search.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
