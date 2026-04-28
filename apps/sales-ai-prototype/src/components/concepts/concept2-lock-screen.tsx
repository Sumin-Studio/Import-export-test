"use client"

import { useState } from "react"
import IntelligentBillApprovalPanel from "./intelligent-bill-approval-panel"

const ATTENTION_COUNT = 2

export function Concept2WithLockScreen() {
  const [unlocked, setUnlocked] = useState(false)

  if (unlocked) {
    return <IntelligentBillApprovalPanel />
  }

  // iPhone-style lock screen: dark gradient, time, date, notification-style CTA
  return (
    <div className="min-h-[600px] flex flex-col bg-gradient-to-b from-[#0d0d0f] via-[#1a1a1e] to-[#0d0d0f] text-white">
      {/* Status bar area */}
      <div className="flex justify-between items-center px-8 pt-11 text-[13px] font-medium text-white/90">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
          </svg>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17 4.18V2h-2v2.18C11.61 4.56 9 7.71 9 11.5c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.79-2.61-6.94-6-7.32zM12 16c-2.48 0-4.5-2.02-4.5-4.5S9.52 7 12 7s4.5 2.02 4.5 4.5S14.48 16 12 16z" />
          </svg>
        </div>
      </div>

      {/* Time + date */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 -mt-8">
        <p className="text-[76px] font-extralight tracking-tight leading-none">
          9:41
        </p>
        <p className="text-[20px] font-medium text-white/95 mt-1">
          Friday, 27 February
        </p>
      </div>

      {/* Notification-style card: "2 items need your attention" */}
      <div className="px-5 pb-8">
        <button
          type="button"
          onClick={() => setUnlocked(true)}
          className="w-full rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 overflow-hidden text-left hover:bg-white/18 active:bg-white/22 transition-colors"
        >
          <div className="px-5 py-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1f68dd] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[15px] font-semibold text-white">
                Bill Approval Protector
              </p>
              <p className="text-[13px] text-white/80 mt-0.5">
                There are {ATTENTION_COUNT} items that need your attention.
              </p>
              <p className="text-[15px] font-semibold text-[#1f68dd] mt-2">
                Review now
              </p>
            </div>
            <svg className="w-5 h-5 text-white/50 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>

      {/* Home indicator */}
      <div className="pb-3 flex justify-center">
        <div className="w-32 h-1 rounded-full bg-white/35" aria-hidden />
      </div>
    </div>
  )
}

export default Concept2WithLockScreen
