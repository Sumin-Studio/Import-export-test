import Icon from "@/components/ui/icon";

export default function MobileMenuButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      className={`bg-[#1e3145] hover:bg-[#12283d] flex flex-col justify-center gap-1 p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neutral-750)] focus-visible:ring-inset focus-visible:ring-offset-0 cursor-pointer ${className}`}
      aria-label="Open mobile menu"
    >
      <Icon name="Menu" size="large" className="text-white" />
    </button>
  );
}
