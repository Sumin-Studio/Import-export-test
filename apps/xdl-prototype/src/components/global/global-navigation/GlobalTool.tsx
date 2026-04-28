export default function GlobalTool({
  className,
  children,
  open,
  ...rest
}: {
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded-[20px] bg-[#1e3145] hover:bg-[#12283d] active:bg-[#424f60] text-white p-2 size-10 flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neutral-750)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-neutral-750)] cursor-pointer ${open ? "bg-[#12283d]" : ""} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
