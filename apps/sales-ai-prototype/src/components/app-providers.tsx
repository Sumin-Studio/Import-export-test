"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { EmailDomainGuard } from "@/components/email-domain-guard";

/**
 * Client ClerkProvider so the root layout does not use the async RSC Clerk path
 * (which can 500 in production when combined with auth / env edge cases).
 */
export function ClerkAppProviders({
  publishableKey,
  children,
}: {
  publishableKey: string;
  children: ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <EmailDomainGuard>{children}</EmailDomainGuard>
    </ClerkProvider>
  );
}
