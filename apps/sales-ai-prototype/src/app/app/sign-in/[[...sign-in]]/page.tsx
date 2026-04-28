"use client";

import { SignIn, useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Page() {
  const { user, isSignedIn, isLoaded: isUserLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const hasHandledDisallowedRef = useRef(false);

  useEffect(() => {
    if (!isUserLoaded || !isSignedIn || hasHandledDisallowedRef.current) return;

    const email = (user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '').toLowerCase();

    // Only @xero.com emails are allowed
    const domain = email.split('@')[1];
    const isAllowed = !!email && domain === 'xero.com';

    if (!isAllowed) {
      hasHandledDisallowedRef.current = true;
      (async () => {
        try {
          await signOut({ sessionId: '*' });
        } finally {
          router.replace('/app/unauthorized');
        }
      })();
    } else {
      router.replace('/app');
    }
  }, [isUserLoaded, isSignedIn, user, router, signOut]);

  if (isUserLoaded && isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-white text-sm">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">The AI Design Swarm</h1>
        <p className="text-stone-400 text-sm">Sign in to read the full article</p>
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            headerTitle: { display: 'none' },
            headerSubtitle: { display: 'none' },
          }
        }}
        forceRedirectUrl="/"
      />
    </div>
  );
}
