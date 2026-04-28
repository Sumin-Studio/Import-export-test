"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Check, MessageSquare, ArrowLeft } from "lucide-react"

const bills = [
  { vendor: "Lumber Cutter Supply", amount: 2400, reason: "Monthly order, on schedule" },
  { vendor: "Net Connect NZ", amount: 890, reason: "Internet — due tomorrow" },
  { vendor: "PowerDirect", amount: 1450, reason: "Electricity — overdue 3 days" },
  { vendor: "SMART Agency", amount: 2100, reason: "Marketing retainer" },
  { vendor: "Swanston Security", amount: 1680, reason: "Quarterly service — early-pay discount" },
  { vendor: "Bayside Club", amount: 975, reason: "Team lunch account" },
  { vendor: "ABC Furniture", amount: 1850, reason: "Office fitout — final instalment" },
  { vendor: "Young Bros Transport", amount: 1655, reason: "Freight — regular weekly" },
]

const total = bills.reduce((s, b) => s + b.amount, 0)

export type Screen = "lock" | "expanded" | "teach" | "adjusted"

interface PhoneNotificationHeroProps {
  controlledScreen?: Screen
}

export function PhoneNotificationHero({ controlledScreen }: PhoneNotificationHeroProps) {
  const [screen, setScreen] = useState<Screen>(controlledScreen ?? "lock")

  useEffect(() => {
    if (!controlledScreen) return
    setScreen(controlledScreen)
  }, [controlledScreen])

  return (
    <div className="w-[320px] h-[640px] rounded-[40px] bg-black p-3 shadow-2xl">
      <div className="w-full h-full rounded-[32px] bg-gradient-to-b from-[#1a1a2e] to-[#16213e] overflow-hidden flex flex-col relative">
        {/* Home screen with widget */}
        {screen === "lock" && (
          <div className="flex-1 px-4 py-4">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span>9:41</span>
              <div className="h-5 w-24 rounded-full bg-black/70" />
            </div>

            {/* Widget */}
            <button
              type="button"
              onClick={() => setScreen("expanded")}
              className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-3.5 py-3 text-left backdrop-blur-md hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span className="font-medium uppercase tracking-[0.16em]">
                  Bills · Tomorrow · 8:00 pm
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                  Scheduled
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">
                8 bills · ${total.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] text-white/70 leading-relaxed">
                Auto-pay is queued for tomorrow night. You can open the plan any time before then.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-200">
                Review tomorrow&apos;s plan
                <ChevronRight className="h-3 w-3" />
              </span>
            </button>

            {/* App grid */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="flex h-12 items-center justify-center rounded-2xl bg-white/5">
                  <span className="text-[10px] text-white/40">W</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === "expanded" && (
          <div className="flex-1 bg-white rounded-t-2xl mt-4 flex flex-col overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setScreen("lock")} className="p-1 -ml-1 text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="w-6 h-6 rounded bg-[#0d47a1] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">X</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Auto-pay at 5pm</p>
                  <p className="text-xs text-gray-500">8 bills &middot; ${total.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-3">
                {bills.map((bill) => (
                  <div key={bill.vendor} className="flex items-center py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{bill.vendor}</p>
                      <p className="text-xs text-gray-500">{bill.reason}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 ml-3">${bill.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              {/* Teach the system */}
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={() => setScreen("teach")}
                  className="w-full flex items-center gap-3 rounded-xl bg-[#0d47a1]/5 border border-[#0d47a1]/15 px-4 py-3 text-left hover:bg-[#0d47a1]/10 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-[#0d47a1] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0d47a1]">Teach the system</p>
                    <p className="text-xs text-gray-500">Tell it about upcoming expenses</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#0d47a1]/50 shrink-0" />
                </button>
              </div>
            </div>
            {/* Confirm button */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <button type="button" className="w-full rounded-xl bg-[#0d47a1] py-3 text-sm font-semibold text-white hover:bg-[#0d47a1]/90 transition-colors flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                Looks good, pay at 5pm
              </button>
            </div>
          </div>
        )}

        {screen === "teach" && (
          <div className="flex-1 bg-white rounded-t-2xl mt-4 flex flex-col overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setScreen("expanded")} className="p-1 -ml-1 text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <p className="text-sm font-semibold text-gray-900">Teach the system</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-[#0d47a1] rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[240px]">
                  <p className="text-sm text-white">I&apos;m buying a $5,000 piece of equipment this week. Protect that cash flow.</p>
                </div>
              </div>
              {/* AI response */}
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[260px]">
                  <p className="text-sm text-gray-900 font-medium mb-1">Got it. I&apos;ve adjusted the plan:</p>
                  <ul className="text-xs text-gray-600 space-y-1.5 mt-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0d47a1] mt-0.5">→</span>
                      <span>Paying 5 bills now ($7,020)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-orange-500 mt-0.5">→</span>
                      <span>Deferring 3 bills ($5,980) to next week</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-600 mt-0.5">→</span>
                      <span>$5,200 protected for your purchase</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">None of the deferred bills will incur late fees.</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 bg-white flex gap-2">
              <button
                type="button"
                onClick={() => setScreen("adjusted")}
                className="flex-1 rounded-xl bg-[#0d47a1] py-3 text-sm font-semibold text-white hover:bg-[#0d47a1]/90 transition-colors"
              >
                Use adjusted plan
              </button>
            </div>
          </div>
        )}

        {screen === "adjusted" && (
          <div className="flex-1 bg-white rounded-t-2xl mt-4 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">Plan adjusted</p>
              <p className="text-sm text-gray-500 text-center mt-2">
                5 bills ($7,020) paying at 5pm.<br />
                3 bills deferred to next week.<br />
                $5,200 protected for your equipment.
              </p>
              <p className="text-xs text-gray-400 mt-4">
                I&apos;ll remember this preference for future plans.
              </p>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <button
                type="button"
                onClick={() => setScreen("lock")}
                className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
