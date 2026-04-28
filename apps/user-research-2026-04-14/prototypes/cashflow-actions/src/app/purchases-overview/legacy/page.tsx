"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrototypeHref } from "@/app/contexts/PrototypeBasePathContext";

/** Static classic UI screenshot — entire image is one control back to the new overview. */
const LEGACY_IMAGE = {
  src: "/purchases-legacy-overview.png",
  width: 1024,
  height: 513,
} as const;

export default function PurchasesLegacyOverviewPage() {
  const backHref = usePrototypeHref("/purchases-overview") ?? "/purchases-overview";

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="mx-auto flex max-w-5xl justify-center">
        <Link
          href={backHref}
          className="inline-block max-w-full shadow-md ring-1 ring-black/5 transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
          aria-label="Return to new purchases overview"
        >
          <Image
            {...LEGACY_IMAGE}
            alt="Classic purchases overview. Select to return to the new purchases overview."
            className="h-auto w-full max-w-full"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </Link>
      </div>
    </div>
  );
}
