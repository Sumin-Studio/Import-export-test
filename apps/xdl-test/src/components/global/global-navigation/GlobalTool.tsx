export default function MenuItem({
  className,
  children,
  open,
}: {
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
}) {
  return (
    <button
      className={`rounded-medium hover:bg-theme-secondary-hover bg-theme-background text-white ${open ? "bg-theme-secondary-hover" : ""} active:bg-theme-secondary-active flex items-center gap-1 overflow-hidden focus:outline-none focus-visible:ring-2 ${className}`}
    >
      {children}
    </button>
  );
}
