"use client";

import Link from "next/link";
import { SafetyShieldChrome } from "@/components/xero-protect/SafetyShieldChrome";

const PROTOTYPES = [
  {
    id: "1",
    title: "Prototype 1",
    description: "Bills list with risk flags (Possible dupe, Unusual amount, Bank # changed) and bill detail with approve/review actions.",
    href: "/xero-protect/prototype/1",
  },
  {
    id: "2",
    title: "Prototype 2 (Rory)",
    description: "Rory's Xero Protect prototype: header tabs, duplicate examples, risk levels, JAX investigate flow.",
    href: "/xero-protect/prototype/2",
  },
  {
    id: "3",
    title: "Prototype 3",
    description: "Landing with spotlight (8 bills to review), split-screen bills list and Quickview.",
    href: "/xero-protect/prototype/3",
  },
];

export default function XeroProtectPrototypeIndexPage() {
  return (
    <SafetyShieldChrome
      breadcrumb={[
        { label: "Xero Protect", href: "/xero-protect" },
        { label: "Prototypes", href: "/xero-protect/prototype" },
      ]}
      pageTitle="Prototypes"
    >
      <div className="px-4 py-8">
        <div className="max-w-2xl space-y-6">
          <p className="text-[15px] text-[#333940]">
            Xero Protect prototypes: bills list, risk callouts, and bill detail flows.
          </p>
          <ul className="space-y-4">
            {PROTOTYPES.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  className="block rounded-lg border border-[#e1e2e5] bg-white p-5 transition-colors hover:border-[#1c52de] hover:bg-[#f7f9fc]"
                >
                  <span className="text-[17px] font-semibold text-[#0a0a0a]">
                    {p.title}
                  </span>
                  <p className="mt-2 text-[13px] text-[#6b7280] leading-relaxed">
                    {p.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SafetyShieldChrome>
  );
}
