import Link from "next/link";

export default function MenuItem({
  children,
  text,
  href,
  highlighted = false,
}: {
  children?: React.ReactNode;
  text?: string;
  href: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`${highlighted ? "border-white" : "border-transparent"} border-y-4 border-t-transparent py-2`}
    >
      <Link
        href={href}
        className={`rounded-medium hover:bg-theme-secondary-hover bg-theme-background text-size-15 active:bg-theme-secondary-active flex max-w-[200px] items-center gap-1 overflow-hidden px-3 py-2 leading-6 font-medium tracking-[0.1] text-ellipsis text-white focus:outline-none focus-visible:ring-2`}
      >
        {text}
        {children}
      </Link>
    </div>
  );
}
