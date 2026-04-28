"use client";

import dynamic from "next/dynamic";
import { DashboardGreeting } from "@/app/components/global/DashboardGreeting";

const Dashboard = dynamic(() => import("./dashboard"), {
  ssr: false,
  loading: () => (
    <div className="bg-background-primary min-h-screen">
      <DashboardGreeting isLoading />
      <div className="container mx-auto overflow-x-auto scroll-smooth px-5 lg:overflow-x-visible lg:px-0">
        <div className="3xl:grid-cols-4 grid animate-pulse grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  return <Dashboard />;
}
