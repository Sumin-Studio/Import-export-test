"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import { WorkshopMark } from "@/components/workshop-mark";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/getting-started");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) {
    return <div className="min-h-screen bg-white" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    const domain = trimmed.split("@")[1];
    const allowedDomains = (
      process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS ?? "xero.com"
    )
      .split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);

    if (!domain || !allowedDomains.includes(domain)) {
      setError("Please use your @xero.com email address.");
      return;
    }

    signIn(trimmed);
    router.replace("/getting-started");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex shrink-0 justify-center px-6 pt-10">
        <WorkshopMark className="h-24 w-24" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
            The Builders Workshop
          </h1>
          <p className="text-sm text-neutral-600 text-center">
            Sign in with your Xero email address
          </p>
          <div
            className="mx-auto mt-6 mb-6 w-4/5 border-t border-neutral-200"
            aria-hidden
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="you@xero.com"
              className="mx-auto block w-4/5 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button
              type="submit"
              className="mx-auto block w-4/5 rounded-md bg-brand py-2 text-sm font-semibold text-white transition-colors hover:brightness-95 active:brightness-90"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
