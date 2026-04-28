"use client";

/**
 * Static hero preview for the front page: Concept 1 (Cash Flow Planner) —
 * cash position graph, JAX insight, and Review plan.
 */
export function Concept1HeroPreview() {
  const gW = 260;
  const gH = 120;
  const gPad = { top: 16, right: 14, bottom: 22, left: 38 };
  const gChartW = gW - gPad.left - gPad.right;
  const gChartH = gH - gPad.top - gPad.bottom;
  const bufferTarget = 2000;
  const balance = 8200;
  const withoutPlan = [
    { value: balance },
    { value: balance - 2000 },
    { value: balance - 5200 },
    { value: balance - 8300 },
    { value: balance - 11085 },
  ];
  const gMin = -2000;
  const gMax = 11000;
  const toX = (i: number) => gPad.left + (i / 4) * gChartW;
  const toY = (v: number) => gPad.top + gChartH - ((v - gMin) / (gMax - gMin)) * gChartH;
  const bufferY = toY(bufferTarget);
  const toPath = (pts: { value: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.value)}`).join(" ");
  const redArea = `M ${toX(0)} ${bufferY} L ${withoutPlan.map((p, i) => `${toX(i)} ${toY(p.value)}`).join(" L ")} L ${toX(4)} ${bufferY} Z`;

  return (
    <div className="relative mx-auto w-full max-w-[390px] overflow-hidden rounded-[28px] bg-[#1f68dd] shadow-xl">
      <div className="absolute inset-x-0 -top-24 h-48 bg-[#1f68dd]" />
      <div className="relative z-10 flex flex-col gap-3 px-4 pt-4 pb-4">
        {/* Graph card */}
        <div className="rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <p className="text-[13px] font-semibold text-[#1e3145]">Cash position</p>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-[#1e3145]">
              $2,000
            </span>
          </div>
          <svg
            viewBox={`0 0 ${gW} ${gH}`}
            className="h-[120px] w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="heroCurrentFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d={redArea} fill="url(#heroCurrentFill)" />
            <line
              x1={gPad.left}
              y1={bufferY}
              x2={gW - gPad.right}
              y2={bufferY}
              stroke="#7c3aed"
              strokeWidth={1}
              opacity={0.7}
            />
            <path
              d={toPath(withoutPlan)}
              fill="none"
              stroke="#1e3145"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeLinecap="round"
              opacity={0.6}
            />
            <text
              x={toX(4) + 1}
              y={toY(withoutPlan[4].value) + 3}
              fill="#1e3145"
              fontSize="8"
              fontWeight="600"
              textAnchor="end"
            >
              -$3k
            </text>
            {["Today", "+1 wk", "+2 wk", "+3 wk", "+30 d"].map((l, i) => (
              <text
                key={l}
                x={toX(i)}
                y={gH - 5}
                textAnchor="middle"
                fill="#64748b"
                fontSize="8"
                fontWeight="500"
              >
                {l}
              </text>
            ))}
          </svg>
          <div className="flex gap-4 border-t border-[#e1e2e5] px-3 pb-3 pt-2">
            <div className="flex items-center gap-1.5">
              <span
                className="h-0.5 w-4 rounded-full border-t-2 border-dashed border-[#1e3145] opacity-60"
              />
              <span className="text-[11px] font-medium text-[#616b7a]">Current trajectory</span>
            </div>
          </div>
        </div>

        {/* JAX insight */}
        <div className="rounded-lg border-2 border-[#7c3aed]/30 bg-[#f5f3ff] p-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#7c3aed" />
            </svg>
            <span className="text-[12px] font-semibold text-[#7c3aed]">JAX</span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#1e3145]">
            I&apos;ve analysed your upcoming cashflow. Paying all upcoming due bills would push you{" "}
            <span className="font-medium text-[#c31230]">$4,885 below your buffer</span>. I recommend
            paying 5 bills now and deferring 2 to maintain your{" "}
            <span className="font-medium">$2,000 safety net</span>, which is based on your average
            cashflow buffer over the last two months.
          </p>
          <div className="mt-3">
            <div className="w-full rounded-full bg-[#6d28d9] px-4 py-2.5 text-center text-[13px] font-semibold text-white">
              Review plan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
