import type { Metadata } from "next";
import Link from "next/link"
import { HeroScreens } from "@/components/heroes/hero-screens"

export const metadata: Metadata = {
  title: "Hero screens",
};

export default function HeroesPage() {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/app/walkthrough"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            &larr; Back
          </Link>
          <span className="text-sm font-medium text-foreground">
            Three Hero Screens
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">The agent just does it.</h1>
          <p className="mt-2 text-base text-muted-foreground max-w-xl mx-auto">
            Three ways to experience bill payment that&apos;s dissolved into the background. Zero taps, zero stress.
          </p>
        </div>
        <HeroScreens />
      </main>
    </div>
  )
}
