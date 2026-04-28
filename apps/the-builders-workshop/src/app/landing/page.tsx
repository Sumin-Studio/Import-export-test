"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
// TODO: Re-enable Activity Chat when OpenAI integration is working
// import { ActivityChat } from "@/components/landing/activity-chat";

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),transparent_70%)]"></div>
      </div>

      <div className="min-h-screen relative z-10">
        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <div className="flex gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-3 sm:py-4 items-center justify-between">
            {/* Left: logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Logo className="h-8 w-8 sm:h-10 sm:w-10 text-brand" />
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">The Builders Workshop</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col px-4 sm:px-8 max-w-7xl mr-auto ml-auto pt-20 sm:pt-24 pb-8 sm:pb-12 relative">
          <div className="z-10 grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-stretch relative flex-1 min-h-0">
            {/* Left column - half screen width */}
            <div className="space-y-4 sm:space-y-8 flex flex-col justify-center min-h-0">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">About</h2>
                <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
                  For decades, we&apos;ve split tech roles into categories: designer, engineer, product, marketing, sales. We learned to work together to make things happen. It worked ok.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
                  Now we&apos;re seeing the rise of the builder: people who can effortlessly switch from strategy to delivery, pixels to code, idea to shipping.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
                  The Builders Workshop is a group of people building these skills together.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Primary Button */}
                <button
                  onClick={handleLogin}
                  className="group inline-flex shadow-blue-500/30 transition-all duration-300 hover:bg-blue-500 text-sm sm:text-base font-semibold text-white bg-blue-600 border-blue-500 border rounded-full py-3 px-6 relative shadow-lg gap-3 items-center cursor-pointer"
                >
                  <span>Start building</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right column - Activity Chat (commented out for now) */}
            {/* TODO: Re-enable Activity Chat when OpenAI integration is working */}
            {/* 
            <div className="flex flex-col min-h-0 lg:mt-0 mt-10">
              <div className="flex-1 min-h-0">
                <ActivityChat />
              </div>
            </div>
            */}
          </div>
        </section>
      </div>
    </div>
  );
}
