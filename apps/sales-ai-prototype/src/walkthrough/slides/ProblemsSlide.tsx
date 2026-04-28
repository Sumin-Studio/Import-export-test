"use client";

import SlideLayout from "@/walkthrough/components/SlideLayout";
import { allProblems } from "@/walkthrough/data/problems";

const themes: Record<string, { bg: string; accent: string }> = {
  "Cash & Planning": { bg: "#f0fdf4", accent: "#166534" },
  "Efficiency & Load": { bg: "#eff6ff", accent: "#1d4ed8" },
  "Approvals & Risk": { bg: "#eef2ff", accent: "#4338ca" },
  "Adoption & Ease": { bg: "#fff7ed", accent: "#c2410c" },
  "Visibility & Control": { bg: "#faf5ff", accent: "#6b21a8" },
  Infrastructure: { bg: "#f8fafc", accent: "#475569" },
};


// Per-note: rotation (deg) and position (left %, top px) — spread ~50% more than before
const stickyLayout: { rot: number; left: number; top: number }[] = [
  { rot: -8, left: 0, top: 0 },
  { rot: 6, left: 18, top: 27 },
  { rot: -5, left: 36, top: 12 },
  { rot: 10, left: 12, top: 87 },
  { rot: -6, left: 30, top: 72 },
  { rot: 4, left: 48, top: 42 },
  { rot: -9, left: 6, top: 132 },
  { rot: 7, left: 24, top: 117 },
  { rot: -4, left: 42, top: 102 },
  { rot: 11, left: 54, top: 57 },
  { rot: -7, left: 3, top: 177 },
  { rot: 5, left: 21, top: 162 },
  { rot: -10, left: 39, top: 147 },
  { rot: 8, left: 51, top: 87 },
  { rot: -3, left: 9, top: 222 },
  { rot: 9, left: 27, top: 207 },
  { rot: -6, left: 45, top: 192 },
  { rot: 4, left: 57, top: 132 },
  { rot: -8, left: 15, top: 252 },
  { rot: 6, left: 33, top: 237 },
];

export default function ProblemsSlide() {
  return (
    <SlideLayout slideNumber={2}>
      <div className="flex-1 flex flex-col max-w-6xl mx-auto px-8 py-16 w-full">
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            We started with pain points
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl">
            Collated from 40+ input files across 8 contributors — VOC interviews, research summaries, product docs, support themes, workshop notes. Too many directions to pursue all at once.
          </p>
        </header>

        {/* Sticky notes — overlapping and rotated like a physical board */}
        <div className="relative w-full min-h-[380px]">
          {allProblems.map((item, i) => {
            const theme = themes[item.theme] ?? themes.Infrastructure;
            const layout = stickyLayout[i] ?? { rot: 0, left: (i % 5) * 20, top: Math.floor(i / 5) * 70 };
            return (
              <div
                key={item.id}
                className="absolute p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                style={{
                  left: `${layout.left}%`,
                  top: `${layout.top}px`,
                  transform: `rotate(${layout.rot}deg)`,
                  width: "min(180px, 22%)",
                  backgroundColor: theme.bg,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  zIndex: i,
                }}
              >
                <div
                  className="text-[10px] font-medium uppercase tracking-wider mb-1"
                  style={{ color: theme.accent }}
                >
                  {item.theme}
                </div>
                <p className="text-[13px] text-[#1d1d1f] leading-snug font-medium line-clamp-3">
                  {item.area}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
