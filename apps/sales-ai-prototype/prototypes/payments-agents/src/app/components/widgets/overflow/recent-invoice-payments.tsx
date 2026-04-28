interface ComponentProps {
  className?: string;
}

export default function RecentInvoicePaymentsOverflow({
  className = "",
}: ComponentProps) {
  return (
    <div className={className}>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Manage invoice reminders
        </button>
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Manage online payments
        </button>
      </nav>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="flex w-full items-center justify-between py-1 pl-5 pr-3 text-left hover:bg-background-primary"
          type="button"
        >
          Learn about invoices
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
        <button
          className="flex w-full items-center justify-between py-1 pl-5 pr-3 text-left hover:bg-background-primary"
          type="button"
        >
          Get paid faster
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
      <div className="px-5 pb-1 text-[13px]/[20px] text-[#404756]">
        This widget includes partial and full payments made on invoices and
        excludes credit notes.
      </div>
    </div>
  );
}
