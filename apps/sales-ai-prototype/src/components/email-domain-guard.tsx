"use client";

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function EmailDomainGuard({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const hasHandledDisallowedRef = useRef(false);

  useEffect(() => {
    const isPublicRoute =
      pathname === '/' ||
      pathname === '/send-invoice' ||
      pathname === '/sent-invoice' ||
      pathname === '/gmail-invoice' ||
      pathname?.startsWith('/online-invoice') ||
      pathname?.startsWith('/concept') ||
      pathname?.startsWith('/sales') ||
      pathname?.startsWith('/accounting') ||
      pathname?.startsWith('/purchases') ||
      pathname?.startsWith('/accounts') ||
      pathname?.startsWith('/safety-shield') ||
      pathname?.startsWith('/xero-protect') ||
      pathname?.startsWith('/app/walkthrough') ||
      pathname?.startsWith('/app/explorations') ||
      pathname?.startsWith('/app/process') ||
      pathname?.startsWith('/app/explainer') ||
      pathname?.startsWith('/app/sign-in') ||
      pathname?.startsWith('/sign-up') ||
      pathname?.startsWith('/app/unauthorized');

    if (isPublicRoute || !isLoaded || !isSignedIn || hasHandledDisallowedRef.current) {
      return;
    }

    const email = (
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      ''
    ).toLowerCase();

    // On Vercel/demo: set NEXT_PUBLIC_ALLOW_ALL_EMAIL_DOMAINS=true to allow any signed-in user
    const allowAllDomains = process.env.NEXT_PUBLIC_ALLOW_ALL_EMAIL_DOMAINS === 'true';
    const domain = email.split('@')[1];
    const isAllowed =
      !!email &&
      (allowAllDomains || domain === 'xero.com');

    if (!isAllowed) {
      hasHandledDisallowedRef.current = true;
      (async () => {
        try {
          await signOut({ sessionId: '*' });
        } finally {
          router.replace('/app/unauthorized');
        }
      })();
    }
  }, [isLoaded, isSignedIn, user, router, signOut, pathname]);

  return <>{children}</>;
}
