interface ComponentProps {
  className?: string;
}

export default function ExpensesOverflow({ className = "" }: ComponentProps) {
  return (
    <div className={className}>
      <nav className="border-border-primary text-[15px]/[24px]">
        <button
          className="flex w-full justify-between items-center px-5 py-1 text-left hover:bg-background-primary"
          type="button"
        >
          Learn about Expenses
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
    </div>
  );
}
