import Link from "next/link";

const navClass =
  "rounded-[20px] bg-transparent hover:bg-[#1e3145] active:bg-[#424f60] flex items-center justify-center gap-1 overflow-hidden px-4 py-2 min-h-[40px] min-w-0 max-w-[200px] text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neutral-750)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-neutral-750)] font-medium leading-[24px] text-[15px] cursor-pointer";

type MenuItemProps = {
  children?: React.ReactNode;
  text?: string;
  highlighted?: boolean;
  href?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href">;

export default function MenuItem({
  children,
  text,
  highlighted = false,
  href,
  ...buttonProps
}: MenuItemProps) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      {href ? (
        <Link
          href={href}
          className={navClass}
          aria-current={highlighted ? "page" : undefined}
        >
          {text}
          {children}
        </Link>
      ) : (
        <button {...buttonProps} className={navClass}>
          {text}
          {children}
        </button>
      )}
      {highlighted && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#eff0f3]"
          aria-hidden
        />
      )}
    </div>
  );
}
