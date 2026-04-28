interface ComponentProps {
  className?: string;
}

export default function CashInAndOutOverflow({
  className = "",
}: ComponentProps) {
  return (
    <div className={className}>
      <h3 className="px-5 py-2 text-[11px]/[16px] text-content-secondary">
        Chart visualisation
      </h3>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Compare cash in and out
        </button>
        <button
          className="relative w-full px-5 py-2 text-left text-brand-primary before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-brand-primary before:content-[''] hover:bg-background-primary"
          type="button"
        >
          Difference between cash in and out
        </button>
      </nav>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="flex w-full items-center justify-between py-1 pl-5 pr-3 text-left hover:bg-background-primary"
          type="button"
        >
          Reconciliation report
          <svg
            fill="none"
            height="32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10.01 11.09C10 10.547 10.5 10 11 10h5v1h-5v10h10v-5h1v4.91c0 .544-.5 1.09-1 1.09H11c-.5 0-1-.546-1-1.09l.01-9.82zm9.24.16L18 10h4v4l-1.25-1.25L17 16.5 15.5 15l3.75-3.75z"
              fill="#59606D"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </nav>
      <div className="px-5 pb-2 text-[13px]/[20px] text-[#404756]">
        This widget shows transactions from all bank accounts, including;
        <ul className="list-disc pl-5">
          <li>spend and receive money transactions</li>
          <li>payments on invoices, bills or expense claims</li>
        </ul>
      </div>
    </div>
  );
}
