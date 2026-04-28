interface ComponentProps {
  className?: string;
}

export default function BankFeedAlertsOverflow({
  className = "",
}: ComponentProps) {
  return (
    <div className={className}>
      <nav className="border-border-primary mb-[11px] border-b pb-3 text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary flex w-full items-center px-5 py-2 text-left"
          type="button"
        >
          View all disruptions
        </button>
        <button
          className="hover:bg-background-primary flex w-full items-center px-5 py-2 text-left"
          type="button"
        >
          Set up notifications
        </button>
      </nav>
      <nav className="border-border-primary mb-[11px] border-b pb-3 text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary flex w-full items-center justify-between py-1 pr-3 pl-5 text-left"
          type="button"
        >
          Learn about bank feeds
          <svg
            className="flex-none"
            fill="none"
            height="8"
            viewBox="0 0 8 8"
            width="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 4L4 6.75L1.25 4"
              stroke="#59606D"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              transform="rotate(-90 4 4)"
            />
          </svg>
        </button>
      </nav>
      <nav className="text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary flex w-full items-center px-5 py-2 text-left"
          type="button"
        >
          Bank feed settings
        </button>
        <button
          className="hover:bg-background-primary flex w-full items-center px-5 py-2 text-left"
          type="button"
        >
          Contact support
        </button>
      </nav>
    </div>
  );
}
