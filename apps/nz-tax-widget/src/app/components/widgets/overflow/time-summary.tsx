import { ExternalLink } from "@/app/components/ui/icons";

interface ComponentProps {
  className?: string;
}

export default function TimeSummaryOverflow({
  className = "",
}: ComponentProps) {
  return (
    <div className={className}>
      <nav className="text-[15px]/[24px]">
        <button
          className="hover:bg-background-primary flex w-full items-baseline justify-between px-5 py-2 text-left"
          type="button"
        >
          Learn about capacity
          <span className="text-right">
            <ExternalLink />
          </span>
        </button>
      </nav>
    </div>
  );
}
