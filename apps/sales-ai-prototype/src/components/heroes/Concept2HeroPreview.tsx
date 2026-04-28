"use client";

/**
 * Static hero preview for the front page: Concept 2 "second page" —
 * the build screen with all the details (JAX insight, Critical/Needs review, one expanded payment).
 */
export function Concept2HeroPreview() {
  return (
    <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[28px] bg-[#1f68dd] shadow-xl">
      {/* Blue spacer */}
      <div className="h-8 shrink-0" />
      {/* White content — build screen with expanded detail */}
      <div className="rounded-t-2xl bg-white px-4 py-3">
        <div className="mb-3">
          <p className="text-sm leading-relaxed text-[#000a1e]">
            <span className="text-lg font-bold">$24,070</span> across{" "}
            <span className="font-bold">6 payments</span>
          </p>
        </div>

        {/* JAX insight */}
        <div className="mb-3 rounded-lg border-2 border-[#7c3aed]/30 bg-[#f5f3ff] px-3 py-2">
          <div className="mb-1 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#7c3aed" />
            </svg>
            <span className="text-[11px] font-semibold text-[#7c3aed]">JAX</span>
          </div>
          <p className="text-[11px] text-[#1e3145] leading-relaxed">
            I&apos;ve checked all 6 payments.{" "}
            <span className="font-semibold text-slate-700">2 need your attention</span>
            — possible duplicate and bank details changed. 3 look good and can go straight through.
          </p>
        </div>

        {/* Needs review: $6,950 */}
        <div className="mb-2">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-700">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
            Critical: <span className="font-bold">$6,950</span>
          </p>

          {/* PowerDirect — expanded with full detail */}
          <div className="rounded-lg border border-slate-300 overflow-hidden bg-slate-50">
            <div className="flex items-start gap-2 px-2.5 py-2">
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-[#1e3145] bg-white" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1">
                  <span className="text-[11px] font-medium text-[#000a1e]">PowerDirect</span>
                  <span className="text-[11px] font-bold text-[#000a1e] shrink-0">$1,450</span>
                </div>
                <span className="mt-0.5 inline-flex items-center gap-0.5 rounded-full bg-white/80 px-1.5 py-0.5 text-[9px] font-medium text-[#000a1e]">
                  Possible duplicate
                </span>
              </div>
            </div>
            <div className="border-t border-[#e2e5e9] bg-[#fafbfc] px-2.5 pb-2 pt-1">
              <p className="mb-1.5 flex items-center gap-0.5 text-[10px] text-[#59606d]">
                Bill due: 22 Feb
              </p>
              <p className="mb-1 text-[10px] leading-relaxed text-[#1e3145]">
                A payment of $1,450 to PowerDirect was already sent on 22 Jan for the same invoice period.
              </p>
              <p className="text-[10px] leading-relaxed text-[#59606d]">
                Check if bill BILL-2026-0189 was already settled. This may be a double-up.
              </p>
            </div>
          </div>

          {/* Bayside — collapsed */}
          <div className="mt-1.5 rounded-lg border border-slate-300 bg-slate-50">
            <div className="flex items-start gap-2 px-2.5 py-2">
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-[#1e3145] bg-white" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1">
                  <span className="text-[11px] font-medium text-[#000a1e]">Bayside Wholesale</span>
                  <span className="text-[11px] font-bold text-[#000a1e] shrink-0">$5,500</span>
                </div>
                <span className="mt-0.5 inline-flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-medium text-red-800">
                  Bank details changed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimised / Auto-approved */}
        <div className="mb-3">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-[#59606d]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            Optimised: <span className="font-bold text-[#000a1e]">$8,400</span>
          </p>
        </div>

        <button
          type="button"
          disabled
          className="w-full rounded-lg px-4 py-2 text-[12px] font-medium text-white opacity-90"
          style={{ backgroundColor: "#1f68dd" }}
        >
          Submit for approval
        </button>
      </div>
    </div>
  );
}
