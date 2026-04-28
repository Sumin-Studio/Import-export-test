"use client"

import { useState } from "react"

// ─── Chatbot-style Just Pay (pay without creating a bill first) ───────────────
// Reference: OPENCLAW-style chat — agent (cream/yellow left), user (dark blue right)

type Step = "intro" | "proposal" | "confirm" | "done"

export function NoBillBillPayPanel() {
  const [step, setStep] = useState<Step>("intro")

  return (
    <div className="relative flex h-full min-h-[calc(100vh-2rem)] w-full max-w-[400px] flex-col overflow-hidden bg-[#1a5c2a]">

      {/* OpenClaw header */}
      <div className="shrink-0 px-4 pt-4 pb-2">
        <p className="text-[20px] font-extrabold text-white/90 tracking-wide uppercase">OpenClaw</p>
        <div className="mt-2 border-t border-white/15" />
      </div>

      {/* Chat area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* User: opener */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/90 px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-slate-900">
              Hey, I need to remember to pay Amanda. Do I have anything else pending?
            </p>
          </div>
        </div>

        {/* Agent: proposal */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#A8EED5] px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-slate-900">
              Got it. I can pay Amanda end of month, like usual.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-900">
              <span className="underline decoration-slate-800 decoration-1">According to Xero</span>, things are doing ok with the books. If you pay LumberCo before Friday you&apos;ll get a 5% discount.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-900">
              What do you think?
            </p>
          </div>
        </div>

        {/* User: confirmation */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/90 px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-slate-900">
              Sounds good
            </p>
          </div>
        </div>

        {/* Agent: done */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#A8EED5] px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-slate-900">
              Done. LumberCo will be paid EOD and Amanda will be paid in six days.
            </p>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="shrink-0 px-4 pt-3 pb-6">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
          <input
            type="text"
            placeholder="Message OpenClaw..."
            readOnly
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-slate-400 text-slate-900"
          />
          <button
            type="button"
            onClick={() => setStep(step === "intro" ? "done" : "intro")}
            className="rounded-full bg-[#1a5c2a]/10 p-1.5 text-[#1a5c2a] hover:opacity-90 transition-opacity"
            aria-label="Send"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoBillBillPayPanel
