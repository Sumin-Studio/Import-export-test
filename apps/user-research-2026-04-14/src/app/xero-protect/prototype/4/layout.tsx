"use client";

import { usePathname } from "next/navigation";
import { SafetyShieldChrome } from "@/components/xero-protect/SafetyShieldChrome";

export default function Prototype4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === "/xero-protect/prototype/4";
  const isBills = pathname.includes("/bills");
  const isFeedbackResponses = pathname.includes("/feedback-responses");
  const breadcrumb = [
    { label: "Bills", href: "/xero-protect" },
    { label: "Prototypes", href: "/xero-protect/prototype" },
    { label: "Prototype 4", href: "/xero-protect/prototype/4" },
    ...(isBills ? [{ label: "Bills", href: "/xero-protect/prototype/4/bills" }] : []),
    ...(isFeedbackResponses ? [{ label: "Feedback responses", href: "/xero-protect/prototype/4/feedback-responses" }] : []),
  ];
  const pageTitle = isFeedbackResponses ? "Feedback responses" : isBills ? "Bills" : "Dashboard";

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <SafetyShieldChrome breadcrumb={breadcrumb} pageTitle={pageTitle}>
      {children}
    </SafetyShieldChrome>
  );
}
