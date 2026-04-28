interface ComponentProps {
  className?: string;
}

export default function PolicyOverflow({
  className = "",
}: ComponentProps) {
  return (
    <div className={className}>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Edit policy
        </button>
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Duplicate policy
        </button>
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Disable policy
        </button>
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary text-negative"
          type="button"
        >
          Delete policy
        </button>
      </nav>
    </div>
  );
}

