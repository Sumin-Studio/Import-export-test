interface ComponentProps {
  className?: string;
}

export default function VatOverflow({ className = "" }: ComponentProps) {
  return (
    <div className={className}>
      <nav className="border-border-primary text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary flex w-full items-center px-5 py-1 text-left"
          type="button"
        >
          View activity statements
        </button>
        <button
          className="hover:bg-background-primary flex w-full items-center px-5 py-1 text-left"
          type="button"
        >
          Set up due date reminders
        </button>
      </nav>
    </div>
  );
}
