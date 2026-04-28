const SECTIONS = [
  { key: "draft", label: "Draft", count: 60, amount: "15,677.60" },
  { key: "approval", label: "Awaiting approval", count: 0, amount: "0.00" },
  { key: "payment", label: "Awaiting payment", count: 110, amount: "35,809.01" },
  { key: "overdue", label: "Overdue", count: 109, amount: "35,811.01", overdue: true },
] as const;

/**
 * Four-column bills summary: status + count on top, amount below; short vertical dividers; overdue label in red.
 */
export function BillsStatusSummaryBanner() {
  return (
    <div
      role="region"
      aria-label="Bills by status"
      className="mb-4 w-full overflow-x-auto rounded-xl bg-white sm:mb-5 [-webkit-overflow-scrolling:touch]"
    >
      <div className="flex w-full min-w-0 flex-col divide-y divide-background-tertiary sm:flex-row sm:divide-y-0">
        {SECTIONS.map((section, index) => (
          <div key={section.key} className="flex min-w-0 flex-1 sm:items-stretch">
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-4 sm:px-5 sm:py-5">
              <p
                className={
                  section.overdue
                    ? "text-[13px]/[18px] font-normal text-[#c62828]"
                    : "text-[13px]/[18px] font-normal text-content-secondary"
                }
              >
                {section.label} ({section.count})
              </p>
              <p className="text-[24px]/[30px] font-semibold tabular-nums tracking-tight text-content-primary subpixel-antialiased">
                {section.amount}
              </p>
            </div>
            {index < SECTIONS.length - 1 ? (
              <div
                className="hidden shrink-0 items-center self-stretch sm:flex sm:py-6"
                aria-hidden
              >
                <div className="h-11 w-px bg-background-tertiary" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
