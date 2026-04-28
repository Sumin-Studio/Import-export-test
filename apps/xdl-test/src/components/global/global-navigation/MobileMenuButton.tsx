import Icon from "@/components/ui/icon";

export default function MobileMenuButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      className={`bg-theme-secondary-default hover:bg-theme-secondary-hover flex flex-col justify-center gap-1 p-3 focus-within:ring-2 focus-within:ring-inset focus:outline-none ${className}`}
      aria-label="Open mobile menu"
    >
      <Icon name="Menu" size="large" className="text-white" />
    </button>
  );
}
