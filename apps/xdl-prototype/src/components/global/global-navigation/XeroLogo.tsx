import { Xero } from "@/components/ui/icons";
import Link from "next/link";

export default function XeroLogo() {
  return (
    <Link
      href="/"
      className="flex h-10 shrink-0 items-center justify-center rounded-[20px] px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neutral-750)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-neutral-750)] cursor-pointer"
    >
      <Xero className="h-[15px] w-14 text-white" />
    </Link>
  );
}
