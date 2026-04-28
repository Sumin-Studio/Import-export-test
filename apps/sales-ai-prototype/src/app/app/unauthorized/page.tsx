import type { Metadata } from "next";
import { SignOutButton } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Unauthorized",
};

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto text-white/80">
        <h1 className="text-2xl font-semibold mb-4 text-white">Access Denied</h1>
        <p className="mb-6 text-stone-400">
          Only @xero.com email addresses are allowed to access this app.
        </p>
        <div className="flex justify-center">
          <SignOutButton>
            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-md border border-white/20 transition-colors">
              Sign out &amp; try again
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
