"use-client";

interface ComponentProps {
  className?: string;
}

export default function BankRecOverflow({ className = "" }: ComponentProps) {
  return (
    <div className={className}>
      <nav className="border-border-primary mb-[11px] border-b pb-3 text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          View account transactions
        </button>
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          View bank statements
        </button>
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          Go to Reconciliation report
        </button>
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          Import bank statement
        </button>
      </nav>
      <nav className="border-border-primary mb-[11px] border-b pb-3 text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          Spend money
        </button>
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          Receive money
        </button>
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          Transfer money
        </button>
      </nav>
      <nav className="text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary w-full px-5 py-2 text-left"
          type="button"
        >
          View bank feed status updates
        </button>
      </nav>
    </div>
  );
}
