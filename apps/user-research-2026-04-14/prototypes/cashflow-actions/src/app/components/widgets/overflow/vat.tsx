interface ComponentProps {
  className?: string;
}

export default function VatOverflow({ className = "" }: ComponentProps) {
  return (
    <div className={className}>
      <nav className="border-border-primary text-[15px]/[24px]">
        <button
          className="flex w-full items-center px-5 py-1 text-left hover:bg-background-primary"
          type="button"
        >
          View activity statements
        </button>
        <button
          className="flex w-full items-center px-5 py-1 text-left hover:bg-background-primary"
          type="button"
        >
          Set up due date reminders
        </button>
      </nav>
    </div>
  );
}
