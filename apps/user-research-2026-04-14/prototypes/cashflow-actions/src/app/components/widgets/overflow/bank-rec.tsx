"use-client";

interface ComponentProps {
  className?: string;
}

export default function BankRecOverflow({ className = "" }: ComponentProps) {
  return (
    <div className={className}>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          View account transactions
        </button>
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          View bank statements
        </button>
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Go to Reconciliation report
        </button>
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Import bank statement
        </button>
      </nav>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Spend money
        </button>
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Receive money
        </button>
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Transfer money
        </button>
      </nav>
      <nav className="text-[15px]/[24px]">
        <button
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          View bank feed status updates
        </button>
      </nav>
    </div>
  );
}
