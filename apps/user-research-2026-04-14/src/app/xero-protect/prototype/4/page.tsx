"use client";

import dynamic from "next/dynamic";
import { RobbShell } from "@/components/prototype-shell/RobbShell";

const Dashboard = dynamic(() => import("@/app/dashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background-primary">
      <div className="mb-6 overflow-hidden bg-white py-4 sm:py-5 2xl:py-7">
        <div className="container mx-auto max-w-full md:flex md:items-center md:justify-between 2xl:w-[1424px] 3xl:w-[1900px]">
          <div className="flex items-center gap-4">
            <div className="flex size-8 items-center justify-center overflow-hidden rounded-[3px] bg-[#9EEEFD] text-[13px]/[20px] font-bold text-[#154D58] md:size-10 md:text-[17px]/[28px]">
              FS
            </div>
            <h1 className="text-[21px]/[26px] font-bold sm:text-[24px]/[32px] 2xl:text-[32px]/[32px]">
              Foxglove Studios
            </h1>
          </div>
          <div className="ml-12 text-[13px]/[20px] text-content-secondary md:ml-0">
            Last login: Loading...
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full sm:!w-[480px] lg:!w-[964px] 2xl:!w-[1424px] 3xl:!w-[1900px]">
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-64" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function XeroProtectPrototype4LandingPage() {
  return (
    <RobbShell>
      <Dashboard />
    </RobbShell>
  );
}
