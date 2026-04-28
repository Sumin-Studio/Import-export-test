"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

/**
 * Figma nested/card (node 30:19930) — compact “Pay a supplier” row above Available today.
 * Opens [Create new payment](https://www.figma.com/design/kb0eqW7roOcxynLDhTRFS3/JustPay?node-id=96-41099) (`/just-pay/create-payment`).
 */
export function PaySupplierQuickLinkCard({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const returnTo =
    pathname && pathname.startsWith("/just-pay") && pathname.length > 0
      ? pathname
      : "/just-pay/prototype/3";
  const href = `/just-pay/create-payment?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <Link
      href={href}
      className={`block w-full max-w-[300px] rounded-xl bg-white shadow-sm ring-1 ring-[#e6e7e9] transition-colors hover:bg-[#fafafa] ${className}`}
    >
      <div className="flex flex-col px-5 pb-3 pt-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[17px] font-[700] leading-7 text-[#0078c8]">Pay a supplier</span>
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#0078c8]"
            aria-hidden
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </span>
        </div>
        <p className="mt-1 text-[15px] leading-6 text-[#404756]">
          Skip the manual data entry and pay your suppliers in seconds
        </p>
      </div>
    </Link>
  );
}
