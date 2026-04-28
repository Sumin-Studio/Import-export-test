"use client";

import { Header } from "@/components/layout/Header";
import { useDatabaseStatus } from "@/providers/database-status";

const WHALE_ASCII = `
           .
          ":"
        ___:____     |"\\/"|
      ,'        \`.    \\  /
      |  O        \\___/  |
    ~^~^~^~^~^~^~^~^~^~^~^~^~
`;

export function FailWhale() {
  const { lastCheck } = useDatabaseStatus();

  return (
    <div className="h-screen bg-white text-slate-900 antialiased overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),transparent_70%)]"></div>
      </div>

      <div className="h-screen relative z-10 overflow-hidden">
        <Header />

        <div className="h-screen flex flex-col items-center justify-center px-8">
          <pre
            className="text-slate-400 text-xs sm:text-sm font-mono leading-tight mb-8 overflow-x-auto"
            aria-hidden="true"
          >
            {WHALE_ASCII}
          </pre>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Oops, fail whale.
          </h1>
          <p className="text-lg leading-relaxed text-neutral-700 mb-6">
            Sorry for the inconvenience! We&apos;re working on it.
          </p>

          {lastCheck?.error && (
            <pre className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 font-mono max-w-lg overflow-x-auto whitespace-pre-wrap">
              {lastCheck.error}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
