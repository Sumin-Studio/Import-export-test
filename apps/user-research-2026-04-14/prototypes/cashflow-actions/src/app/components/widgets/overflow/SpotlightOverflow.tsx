interface SpotlightOverflowProps {
  onDismiss: () => void;
  className?: string;
}

export default function SpotlightOverflow({
  onDismiss,
  className = "",
}: SpotlightOverflowProps) {
  return (
    <div className={className}>
      <nav className="text-[15px]/[24px]">
        <button
          type="button"
          className="w-full px-5 py-2 text-left hover:bg-background-primary"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </nav>
    </div>
  );
}
