"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, AlertTriangle, TrendingUp, Clock, Check, ArrowLeft } from "lucide-react"

const bills = [
  { vendor: "PowerDirect", amount: 1450, reason: "Overdue 3 days. Your supplier terms allow 7 — pay now to stay in good standing.", priority: "overdue" as const, tag: "Overdue" },
  { vendor: "Lumber Cutter Supply", amount: 2400, reason: "Monthly order on schedule. Paying on time keeps your 5% trade discount.", priority: "due" as const, tag: "Due today" },
  { vendor: "Net Connect NZ", amount: 890, reason: "Due tomorrow. Auto-pay set — this will go out automatically unless you pause.", priority: "due" as const, tag: "Due tomorrow" },
  { vendor: "SMART Agency", amount: 2100, reason: "Marketing retainer. Consistent payment keeps the relationship strong and your campaigns uninterrupted.", priority: "due" as const, tag: "Due Fri" },
  { vendor: "Swanston Security", amount: 1680, reason: "Quarterly service. Paying 5 days early saves $84 (early-pay discount).", priority: "opportunity" as const, tag: "Discount" },
  { vendor: "Bayside Club", amount: 975, reason: "Team lunch account. Low priority — can defer to next week without impact.", priority: "low" as const, tag: "Deferrable" },
  { vendor: "ABC Furniture", amount: 1850, reason: "Final instalment for office fitout. Completing this closes out the PO.", priority: "due" as const, tag: "Due Mon" },
  { vendor: "Young Bros Transport", amount: 1655, reason: "Weekly freight. Regular cadence — paying on schedule.", priority: "due" as const, tag: "Due Mon" },
]

const total = bills.reduce((s, b) => s + b.amount, 0)

const priorityColors = {
  overdue: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertTriangle },
  due: { bg: "bg-white", text: "text-gray-700", border: "border-gray-200", icon: Clock },
  opportunity: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: TrendingUp },
  low: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200", icon: Clock },
}

const tagColors: Record<string, string> = {
  Overdue: "bg-red-100 text-red-700",
  "Due today": "bg-amber-100 text-amber-700",
  "Due tomorrow": "bg-amber-50 text-amber-600",
  "Due Fri": "bg-gray-100 text-gray-600",
  Discount: "bg-blue-100 text-blue-700",
  Deferrable: "bg-gray-100 text-gray-500",
  "Due Mon": "bg-gray-100 text-gray-600",
}

export function WebDashboardHero() {
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null)
  const [screen, setScreen] = useState<"dashboard" | "confirmed">("dashboard")

  if (screen === "confirmed") {
    return (
      <div className="w-[320px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Check className="h-7 w-7 text-green-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">All set</p>
          <p className="text-sm text-gray-500 text-center mt-2">
            8 bills totalling ${total.toLocaleString()} scheduled.<br />
            Auto-paying at 5pm.
          </p>
        </div>
        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={() => { setScreen("dashboard"); setExpandedVendor(null) }}
            className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to bills
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[320px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-gray-900">Bills This Week</p>
            <p className="text-xs text-gray-500 mt-0.5">8 bills &middot; ${total.toLocaleString()} &middot; auto-paying 5pm</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <Check className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </div>

      {/* Bills list */}
      <div className="max-h-[420px] overflow-y-auto">
        {bills.map((bill) => {
          const isExpanded = expandedVendor === bill.vendor
          const colors = priorityColors[bill.priority]

          return (
            <div key={bill.vendor} className={`border-b border-gray-50 last:border-0 ${isExpanded ? colors.bg : ""}`}>
              <button
                type="button"
                onClick={() => setExpandedVendor(isExpanded ? null : bill.vendor)}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{bill.vendor}</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${tagColors[bill.tag] || "bg-gray-100 text-gray-600"}`}>
                      {bill.tag}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 ml-3">${bill.amount.toLocaleString()}</span>
                {isExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5 text-gray-400 ml-2 shrink-0" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-gray-400 ml-2 shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 pb-3">
                  <div className={`rounded-lg border ${colors.border} px-3 py-2.5 ${colors.bg}`}>
                    <p className={`text-xs ${colors.text} leading-relaxed`}>
                      {bill.reason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
        <button
          type="button"
          onClick={() => setScreen("confirmed")}
          className="w-full rounded-lg bg-[#0d47a1] py-2.5 text-sm font-semibold text-white hover:bg-[#0d47a1]/90 transition-colors"
        >
          Approve all 8 bills
        </button>
      </div>
    </div>
  )
}
