"use client"

import { useState, useRef, useEffect } from "react"
import { FigmaCheckbox } from "@/components/figma-checkbox"
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Send,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "submitter" | "approver"
type SubmitterScreen = "build" | "detail" | "email" | "sent"
type ApproverScreen = "run" | "detail" | "authorize" | "confirmed"

/** Ramp-inspired: different levels of concern for anomaly detection */
type AnomalySeverity = "critical" | "warning" | "review"

type PaymentPriority = "critical" | "optimised"

interface ScheduledPayment {
  id: string
  vendor: string
  amount: number
  scheduledDate: string
  method: string
  priority: PaymentPriority
  riskFlag?: {
    type: "unusual-amount" | "duplicate" | "bank-change"
    severity: AnomalySeverity
    label: string
    detail: string
    recommendation: string
  }
  history: { date: string; amount: number }[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ACCENT = "#1f68dd"
const ANOMALY_HIGHLIGHT = "#475569"
const ANOMALY_RED = "#c31230"

function getAnomalyStyle(severity: AnomalySeverity): {
  border: string
  bg: string
  text: string
  icon: typeof AlertTriangle
} {
  switch (severity) {
    case "critical":
      return { border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-800", icon: ShieldAlert }
    case "warning":
      return { border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-800", icon: AlertTriangle }
    case "review":
      return { border: "border-slate-200", bg: "bg-slate-50/80", text: "text-slate-700", icon: AlertTriangle }
  }
}

/** Wraps content and animates in on mount (opacity + slide) */
function AnimateIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])
  return (
    <div
      className={`transition-all duration-300 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} ${className}`}
    >
      {children}
    </div>
  )
}

const scheduledPayments: ScheduledPayment[] = [
  {
    id: "p1",
    vendor: "SMART Agency",
    amount: 8400,
    scheduledDate: "21 Feb",
    method: "Bank transfer",
    priority: "optimised",
    riskFlag: {
      type: "unusual-amount",
      severity: "warning",
      label: "Unusual amount",
      detail: "This payment is 120% higher than your average ($3,800) for SMART Agency over the past 12 months.",
      recommendation: "Verify the invoice amount before authorising.",
    },
    history: [
      { date: "Jan", amount: 3800 },
      { date: "Dec", amount: 4100 },
      { date: "Nov", amount: 3600 },
      { date: "Oct", amount: 3900 },
      { date: "Sep", amount: 3700 },
      { date: "Aug", amount: 4000 },
      { date: "Jul", amount: 3800 },
      { date: "Jun", amount: 3600 },
      { date: "May", amount: 3900 },
      { date: "Apr", amount: 3700 },
      { date: "Mar", amount: 4000 },
    ],
  },
  {
    id: "p2",
    vendor: "Net Connect",
    amount: 890,
    scheduledDate: "22 Feb",
    method: "Bank transfer",
    priority: "optimised",
    history: [
      { date: "22 Jan", amount: 890 },
      { date: "22 Dec", amount: 890 },
      { date: "22 Nov", amount: 890 },
    ],
  },
  {
    id: "p3",
    vendor: "PowerDirect",
    amount: 1450,
    scheduledDate: "22 Feb",
    method: "Bank transfer",
    priority: "critical",
    riskFlag: {
      type: "duplicate",
      severity: "review",
      label: "Possible duplicate",
      detail: "A payment of $1,450 to PowerDirect was already sent on 22 Jan for the same invoice period.",
      recommendation: "Check if bill BILL-2026-0189 was already settled. This may be a double-up.",
    },
    history: [
      { date: "22 Jan", amount: 1450 },
      { date: "22 Dec", amount: 1450 },
      { date: "22 Nov", amount: 1420 },
    ],
  },
  {
    id: "p4",
    vendor: "Swanston Security",
    amount: 1680,
    scheduledDate: "23 Feb",
    method: "Bank transfer",
    priority: "optimised",
    history: [
      { date: "22 Jan", amount: 1680 },
      { date: "22 Dec", amount: 1680 },
      { date: "22 Nov", amount: 1650 },
    ],
  },
  {
    id: "p5",
    vendor: "Bayside Wholesale",
    amount: 5500,
    scheduledDate: "25 Feb",
    method: "Bank transfer",
    priority: "critical",
    riskFlag: {
      type: "bank-change",
      severity: "critical",
      label: "Bank details changed",
      detail: "Bayside Wholesale updated their bank account 3 days ago. The new BSB and account number don\u2019t match any previous payments.",
      recommendation: "Contact the supplier to confirm the new bank details before this payment goes out.",
    },
    history: [
      { date: "22 Jan", amount: 5500 },
      { date: "22 Dec", amount: 5200 },
      { date: "22 Nov", amount: 5500 },
    ],
  },
  {
    id: "p6",
    vendor: "Capital Cab Co",
    amount: 6150,
    scheduledDate: "25 Feb",
    method: "Bank transfer",
    priority: "optimised",
    history: [
      { date: "9 Jan", amount: 4400 },
      { date: "9 Dec", amount: 4600 },
      { date: "9 Nov", amount: 4200 },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BAR_NEUTRAL = "#e2e8f0"
const BAR_CURRENT_NORMAL = "#94a3b8"

function AnomalyChart({
  payment,
  isAnomaly,
  variant = "default",
}: {
  payment: ScheduledPayment
  isAnomaly?: boolean
  variant?: "default" | "infographic"
}) {
  const history = [...payment.history].reverse()
  const current = payment.amount
  const allAmounts = [...history.map((h) => h.amount), current]
  const maxAmount = Math.max(...allAmounts)
  const labels = [...history.map((h) => h.date), "This payment"]
  const barMaxHeight = 64

  if (variant === "infographic" && isAnomaly && allAmounts.length >= 12) {
    const historicalAmounts = allAmounts.slice(0, -1)
    const avg = historicalAmounts.reduce((s, a) => s + a, 0) / historicalAmounts.length
    const avgHeight = maxAmount > 0 ? (avg / maxAmount) * barMaxHeight : 0
    return (
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
        <div className="relative flex items-end gap-0.5" style={{ height: barMaxHeight }}>
          {/* Dotted average line */}
          <div
            className="absolute left-0 right-0 border-t border-dashed border-slate-400 opacity-70"
            style={{ bottom: avgHeight, height: 0 }}
            aria-hidden
          />
          {allAmounts.map((amt, i) => {
            const isCurrent = i === allAmounts.length - 1
            const barHeight = maxAmount > 0 ? (amt / maxAmount) * barMaxHeight : 4
            return (
              <div
                key={i}
                className="flex-1 min-w-0 rounded-t"
                style={{
                  height: Math.max(barHeight, 4),
                  backgroundColor: isCurrent ? ANOMALY_HIGHLIGHT : BAR_NEUTRAL,
                }}
                aria-hidden
              />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-lg border border-[#ccced2] bg-[#f2f3f4] p-4">
      <p className="text-[11px] font-medium text-foreground mb-3">Amount over time</p>
      <div className="flex items-end gap-3" style={{ height: barMaxHeight + 36 }}>
        {allAmounts.map((amt, i) => {
          const isCurrent = i === allAmounts.length - 1
          const barHeight = maxAmount > 0 ? (amt / maxAmount) * barMaxHeight : 4
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 min-w-0">
              <div
                className="w-full rounded-t min-w-[12px]"
                style={{
                  height: Math.max(barHeight, 4),
                  backgroundColor: isCurrent && isAnomaly ? ANOMALY_HIGHLIGHT : isCurrent ? BAR_CURRENT_NORMAL : "#ccced2",
                }}
                title={`${labels[i]}: $${amt.toLocaleString()}`}
              />
              <span className="text-[10px] text-muted-foreground font-medium">
                ${amt.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                {labels[i]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RoleToggle({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="flex items-center gap-1 w-full max-w-[400px] mt-3 rounded-lg bg-[#f2f3f4] p-1">
      <button
        type="button"
        onClick={() => onChange("submitter")}
        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          role === "submitter"
            ? "bg-white text-[#000a1e] shadow-sm"
            : "text-[#59606d] hover:text-[#000a1e]"
        }`}
      >
        Sarah &middot; AP Clerk
      </button>
      <button
        type="button"
        onClick={() => onChange("approver")}
        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          role === "approver"
            ? "bg-white text-[#000a1e] shadow-sm"
            : "text-[#59606d] hover:text-[#000a1e]"
        }`}
      >
        Alex &middot; Manager
      </button>
    </div>
  )
}

// ─── Submitter Screens ───────────────────────────────────────────────────────

function InlineDetail({ payment }: { payment: ScheduledPayment }) {
  // Only "unusual-amount" gets the full chart treatment — the visual spike tells the story.
  // Other risk types (duplicate, bank-change) already explain themselves in text.
  // Clean payments don't expand at all (handled by caller).
  const showChart = payment.riskFlag?.type === "unusual-amount"
  return (
    <div className="px-3 pb-3 pt-1 border-t border-[#e2e5e9] bg-[#fafbfc]">
      <p className="text-[11px] text-[#59606d] mb-2 flex items-center gap-1">
        <Clock className="h-3 w-3 shrink-0" />
        Bill due: {payment.scheduledDate}
      </p>
      {payment.riskFlag?.detail && (
        <p className="text-[11px] leading-relaxed text-[#1e3145] mb-2">
          {payment.riskFlag.detail}
        </p>
      )}
      {payment.riskFlag && (
        <p className="text-[11px] leading-relaxed text-[#59606d] mb-1">
          {payment.riskFlag.recommendation}
        </p>
      )}
      {showChart && (
        <AnomalyChart payment={payment} isAnomaly variant="infographic" />
      )}
    </div>
  )
}

function SubmitterBuild({
  selectedIds,
  onToggleSelected,
  expandedId,
  onToggleExpanded,
  onSend,
}: {
  selectedIds: Set<string>
  onToggleSelected: (id: string) => void
  expandedId: string | null
  onToggleExpanded: (id: string) => void
  onSend: () => void
}) {
  const flaggedForApproval = scheduledPayments.filter((p) => selectedIds.has(p.id))
  const autoApproved = scheduledPayments.filter((p) => !selectedIds.has(p.id))
  const totalAmount = scheduledPayments.reduce((s, p) => s + p.amount, 0)
  const needsReviewOnly = needsReviewPayments.filter((p) => !selectedIds.has(p.id))
  const manuallyApproved = needsReviewPayments.filter((p) => selectedIds.has(p.id))

  const renderNeedsReviewCard = (p: ScheduledPayment) => {
    const style = getAnomalyStyle(p.riskFlag!.severity)
    const Icon = style.icon
    const isExpanded = expandedId === p.id
    const isCritical = p.priority === "critical" || p.riskFlag!.severity === "warning"
    return (
      <div
        key={p.id}
        className={`rounded-lg border overflow-hidden ${style.border} ${style.bg}`}
      >
        <div className="flex items-start gap-3 px-3 py-2.5">
          <label className="cursor-pointer shrink-0 mt-0.5" onClick={(e) => e.stopPropagation()}>
            <FigmaCheckbox checked={selectedIds.has(p.id)} onChange={() => onToggleSelected(p.id)} />
          </label>
          <button
            type="button"
            onClick={() => onToggleExpanded(p.id)}
            className="flex-1 min-w-0 text-left hover:opacity-90 transition-opacity flex items-start gap-2"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="text-xs font-medium text-[#000a1e]">{p.vendor}</span>
                <span className="text-xs font-bold text-[#000a1e] shrink-0">${p.amount.toLocaleString()}</span>
              </div>
              {p.riskFlag && (
                <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium mt-1 ${isCritical ? "bg-red-100 text-red-800" : "bg-white/80 text-[#000a1e]"}`}>
                  <Icon className="h-3 w-3 shrink-0" />
                  {p.riskFlag.label}
                </span>
              )}
            </div>
          </button>
        </div>
        {isExpanded && (
          <div className="border-t border-slate-200">
            <InlineDetail payment={p} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <div>
        <p className="text-sm leading-relaxed text-foreground">
          <span className="text-lg font-bold">${totalAmount.toLocaleString()}</span> across{" "}
          <span className="font-bold">{scheduledPayments.length} payments</span>
        </p>
      </div>

      {/* JAX insight */}
      <div className="rounded-lg border-2 border-[#7c3aed]/30 bg-[#f5f3ff] px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#7c3aed" />
          </svg>
          <span className="text-[12px] font-semibold text-[#7c3aed]">JAX</span>
        </div>
        <p className="text-xs text-[#1e3145] leading-relaxed">
          I&apos;ve checked all {scheduledPayments.length} payments. <span className="font-semibold text-slate-700">{needsReviewOnly.length} need your attention</span>
          {needsReviewOnly.length > 0 ? ` — ${needsReviewOnly.map(p => p.riskFlag?.label?.toLowerCase()).filter(Boolean).join(" and ")}.` : "."} {autoApprovedClean.length} look good and can go straight through.
        </p>
      </div>

      {/* Needs review — flagged items not yet manually approved */}
      {needsReviewOnly.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-1.5 flex items-center gap-1.5 text-red-700">
            <span className="w-2 h-2 rounded-full shrink-0 bg-red-500" />
            Needs review: <span className="font-bold">${needsReviewOnly.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
          </p>
          <div className="rounded-lg overflow-hidden space-y-2">
            {needsReviewOnly.map((p) => renderNeedsReviewCard(p))}
          </div>
        </div>
      )}

      {/* Manually approved — checked items from needs review (above Auto-approved) */}
      {manuallyApproved.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-1.5 flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Manually approved: <span className="font-bold">${manuallyApproved.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
          </p>
          <div className="rounded-lg overflow-hidden space-y-2">
            {manuallyApproved.map((p) => (
              <AnimateIn key={p.id}>
                {renderNeedsReviewCard(p)}
              </AnimateIn>
            ))}
          </div>
        </div>
      )}

      {/* Auto-approved — pattern-matched, no action needed */}
      {autoApprovedClean.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Auto-approved: <span className="font-bold">${autoApprovedClean.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
          </p>
          <p className="text-[11px] text-[#59606d] mb-1.5">
            These match historical patterns. No action needed.
          </p>
          <div className="rounded-lg border border-[#ccced2] overflow-hidden">
            {autoApprovedClean.map((p, i) => (
              <label key={p.id} className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer ${i < autoApprovedClean.length - 1 ? "border-b border-[#ccced2]" : ""}`}>
                <FigmaCheckbox checked={selectedIds.has(p.id)} onChange={() => onToggleSelected(p.id)} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-[#000a1e]">{p.vendor}</span>
                    <span className="text-xs font-bold text-[#000a1e] shrink-0">${p.amount.toLocaleString()}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onSend}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        style={{ backgroundColor: ACCENT }}
      >
        Submit for approval
      </button>
    </div>
  )
}

function SubmitterEmail({
  payments,
  selectedIds,
  onSend,
  onBack,
}: {
  payments: ScheduledPayment[]
  selectedIds: Set<string>
  onSend: () => void
  onBack: () => void
}) {
  // Three buckets matching the UI: need your approval (flagged, not checked), I manually approved (flagged + checked), auto-approved (no flag)
  const needYourApproval = payments.filter((p) => p.riskFlag && !selectedIds.has(p.id))
  const manuallyApproved = payments.filter((p) => p.riskFlag && selectedIds.has(p.id))
  const autoApproved = payments.filter((p) => !p.riskFlag)
  const totalAmount = payments.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="flex flex-col bg-[#f2f3f4] min-h-full">
      {/* Scrollable email content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-[#59606d]">Personalised approval email</p>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-[#59606d] hover:text-[#000a1e] transition-colors"
          >
            Back
          </button>
        </div>

        <div className="rounded-lg border border-[#ccced2] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#ccced2] bg-[#f8f9fa] px-3 py-2 flex items-center gap-2">
            <span className="text-[10px] text-[#59606d]">To:</span>
            <span className="text-xs font-medium text-[#000a1e]">Alex (Manager)</span>
          </div>
          <div className="p-3 space-y-3 text-xs leading-relaxed text-[#000a1e]">
            <p>Hi Alex,</p>
            <p>
              I&apos;ve got a payment run ready — <strong>${totalAmount.toLocaleString()}</strong> across{" "}
              <strong>{payments.length} payments</strong>.
            </p>

            {needYourApproval.length > 0 && (
              <>
                <p>
                  <strong style={{ color: "#c31230" }}>
                    {needYourApproval.length} {needYourApproval.length === 1 ? "needs" : "need"} your approval
                  </strong>{" "}
                  for these reasons:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {needYourApproval.map((p) => (
                    <li key={p.id}>
                      <strong>{p.vendor}</strong> (${p.amount.toLocaleString()})
                      {p.riskFlag ? ` — ${p.riskFlag.label.toLowerCase()}` : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {manuallyApproved.length > 0 && (
              <>
                <p>
                  <strong>
                    {manuallyApproved.length} {manuallyApproved.length === 1 ? "has" : "have"} been flagged but I manually approved{" "}
                    {manuallyApproved.length === 1 ? "it" : "them"}:
                  </strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {manuallyApproved.map((p) => (
                    <li key={p.id}>
                      <strong>{p.vendor}</strong> (${p.amount.toLocaleString()}) — {p.riskFlag!.label.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {autoApproved.length > 0 && (
              <p>
                <strong>{autoApproved.length}</strong> {autoApproved.length === 1 ? "was" : "were"} auto-approved
                {autoApproved.length <= 3 ? ` (${autoApproved.map((p) => p.vendor).join(", ")})` : ""}.
              </p>
            )}

            <p>If I don&apos;t hear back within 24 hours I&apos;ll chase you up.</p>
            <p>Sarah</p>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground">
          AI-drafted from payment context. You can edit before sending.
        </p>
      </div>

      {/* Pinned buttons at bottom */}
      <div className="shrink-0 px-5 py-4 border-t border-[#e1e2e5] bg-[#f2f3f4]">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onSend}
            className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            style={{ backgroundColor: ACCENT }}
          >
            <Send className="h-3.5 w-3.5" />
            Send to Alex
          </button>
        </div>
      </div>
    </div>
  )
}

function SubmitterSent({ sentPayments, onReset }: { sentPayments: ScheduledPayment[]; onReset: () => void }) {
  const flagged = sentPayments.filter((p) => p.riskFlag)
  const totalAmount = sentPayments.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f68dd]/10">
          <Send className="h-5 w-5 text-[#1f68dd]" />
        </div>
        <p className="text-base font-semibold text-[#000a1e]">Sent for authorisation</p>
        <p className="mt-1 text-sm text-[#59606d] text-center">
          ${totalAmount.toLocaleString()} across {sentPayments.length} payments sent to Alex.
        </p>
      </div>

      {/* What Alex will see */}
      <div className="rounded-lg border border-[#ccced2] bg-[#f2f3f4] px-3 py-2.5">
        <p className="text-xs font-medium text-[#000a1e] mb-1.5">What Alex will see</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#59606d]">Payments</span>
            <span className="text-[#000a1e] font-medium">{sentPayments.length} total</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#59606d]">AI flags attached</span>
            <span className="text-slate-700 font-medium">{flagged.length} items</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#59606d]">Clear to authorise</span>
            <span className="text-emerald-600 font-medium">{sentPayments.length - flagged.length} items</span>
          </div>
        </div>
      </div>

      {/* Chasing agent */}
      <div className="rounded-lg border-2 border-[#7c3aed]/30 bg-[#f5f3ff] px-3 py-2.5">
        <p className="text-xs font-medium text-[#000a1e] mb-1 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#7c3aed" }} />
          Chasing agent enabled
        </p>
        <p className="text-xs text-[#59606d] leading-relaxed">
          If Alex hasn&apos;t opened the email within 24 hours or the due date is within 3 days, the agent will send a reminder automatically. No chasing from your side — ever.
        </p>
      </div>

    </div>
  )
}

// ─── Approver Screens ────────────────────────────────────────────────────────

function formatTime() {
  const d = new Date()
  return d.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit", hour12: true })
}

function ApproverRun({
  onAuthorizeSelected,
  onAuthoriseSingle,
  selectedIds,
  onToggleSelected,
  expandedId,
  onToggleExpanded,
  individuallyAuthorised,
  paymentNotes,
  onAddNote,
  editingNoteId,
  onStartEditNote,
}: {
  onAuthorizeSelected: (ids: string[]) => void
  onAuthoriseSingle: (id: string) => void
  selectedIds: Set<string>
  onToggleSelected: (id: string) => void
  expandedId: string | null
  onToggleExpanded: (id: string) => void
  individuallyAuthorised: Record<string, { by: string; at: string }>
  paymentNotes: Record<string, string>
  onAddNote: (id: string, note: string) => void
  editingNoteId: string | null
  onStartEditNote: (id: string | null) => void
}) {
  const flagged = scheduledPayments.filter((p) => p.riskFlag)
  const clean = scheduledPayments.filter((p) => !p.riskFlag)
  const needsReview = flagged.filter((p) => !individuallyAuthorised[p.id])
  const looksGood = [
    ...clean,
    ...flagged.filter((p) => individuallyAuthorised[p.id]),
  ]
  const selectedAmount = scheduledPayments
    .filter((p) => selectedIds.has(p.id))
    .reduce((s, p) => s + p.amount, 0)

  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <div className="flex items-start gap-2 rounded-lg px-3 py-2.5" style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}>
        <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
        <div>
          <span className="text-xs font-medium">
            Sarah sent {scheduledPayments.length} payments for authorisation
          </span>
          <p className="text-[11px] mt-0.5" style={{ color: `${ACCENT}99` }}>
            {needsReview.length} need review &middot; {looksGood.length} look good
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm leading-relaxed text-foreground">
          <span className="text-lg font-bold">${scheduledPayments.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span> payment run
        </p>
      </div>

      {/* Needs review — flagged items, expand inline */}
      {needsReview.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-slate-600" />
            Needs your review ({needsReview.length})
          </p>
          {needsReview.map((p) => {
            const style = getAnomalyStyle(p.riskFlag!.severity)
            const Icon = style.icon
            const isExpanded = expandedId === p.id
            const isCritical = p.riskFlag!.severity === "critical" || p.riskFlag!.severity === "warning"
            return (
              <div key={p.id} className={`rounded-lg border overflow-hidden ${style.border} ${style.bg}`}>
                <button
                  type="button"
                  onClick={() => onToggleExpanded(p.id)}
                  className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:opacity-90 transition-opacity"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-xs font-medium text-foreground">{p.vendor}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${isCritical ? "bg-red-100 text-red-800" : "bg-white/80 text-foreground"}`}>
                        <Icon className="h-3 w-3 shrink-0" />
                        {p.riskFlag!.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-foreground block mt-0.5">${p.amount.toLocaleString()}</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="border-t border-[#e2e5e9] bg-[#fafbfc]">
                    <InlineDetail payment={p} />
                    <div className="flex gap-2 px-3 pb-3">
                      <button
                        type="button"
                        onClick={() => onToggleExpanded(p.id)}
                        className="flex-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        Hold payment
                      </button>
                      <button
                        type="button"
                        onClick={() => onAuthoriseSingle(p.id)}
                        className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: ACCENT }}
                      >
                        Authorise
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Looks good — clean items + individually authorised */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          Looks good ({looksGood.length})
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          {looksGood.map((p, i) => {
            const auth = individuallyAuthorised[p.id]
            const isAuthorisedFromDetail = auth && p.riskFlag
            return (
              <div
                key={p.id}
                className={`flex items-start gap-3 px-3 py-2.5 ${
                  i < looksGood.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <FigmaCheckbox checked={auth ? true : selectedIds.has(p.id)} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-foreground">{p.vendor}</span>
                    <span className="text-xs font-bold text-foreground shrink-0">${p.amount.toLocaleString()}</span>
                  </div>
                  {isAuthorisedFromDetail && (
                    <p className="text-[11px] mt-1 text-emerald-700">
                      Authorised by {auth!.by} at {auth!.at}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAuthorizeSelected([...selectedIds])}
        disabled={selectedIds.size === 0}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: ACCENT }}
      >
        Review &amp; authorise all
      </button>
      {selectedIds.size > 0 && (
        <p className="text-[10px] text-muted-foreground text-center">
          Authorising {selectedIds.size} payment{selectedIds.size !== 1 ? "s" : ""} (${selectedAmount.toLocaleString()})
        </p>
      )}
    </div>
  )
}

function SubmitterDetail({
  payment,
  onBack,
}: {
  payment: ScheduledPayment
  onBack: () => void
}) {
  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>
      <div>
        <p className="text-base font-semibold text-foreground">{payment.vendor}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{payment.method} &middot; Scheduled {payment.scheduledDate}</p>
      </div>

      <div className="rounded-lg border border-border px-3 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Payment amount</span>
          <span className="text-lg font-bold text-foreground">${payment.amount.toLocaleString()}</span>
        </div>
      </div>

      {payment.riskFlag ? (
        payment.riskFlag.type === "unusual-amount" ? (
          <>
            <p className="text-sm font-medium" style={{ color: ANOMALY_RED }}>
              This is 120% higher than usual.
            </p>
            <AnomalyChart payment={payment} isAnomaly variant="infographic" />
            <p className="text-[11px] text-[#59606d] leading-relaxed">
              {payment.riskFlag.recommendation}
            </p>
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Flag for Alex&apos;s review
            </button>
          </>
        ) : (
          (() => {
            const style = getAnomalyStyle(payment.riskFlag!.severity)
            const Icon = style.icon
            return (
              <>
                <div className={`rounded-lg border px-3 py-2.5 ${style.border} ${style.bg}`}>
                  <p className="text-xs font-medium flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span className={style.text}>{payment.riskFlag!.label}</span>
                  </p>
                  <p className={`text-[11px] leading-relaxed mt-1 ${style.text}`}>{payment.riskFlag!.detail}</p>
                </div>
                <AnomalyChart payment={payment} isAnomaly />
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: ACCENT }}
                >
                  Flag for Alex&apos;s review
                </button>
              </>
            )
          })()
        )
      ) : (
        <>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Amount, timing, and bank details all match historical patterns for {payment.vendor}. No issues detected.
            </p>
          </div>
          <AnomalyChart payment={payment} />
        </>
      )}
    </div>
  )
}

function ApproverDetail({
  payment,
  onBack,
  onAuthorise,
}: {
  payment: ScheduledPayment
  onBack: () => void
  onAuthorise: () => void
}) {
  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>
      <div>
        <p className="text-base font-semibold text-foreground">{payment.vendor}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{payment.method} &middot; Scheduled {payment.scheduledDate} &middot; Submitted by Sarah</p>
      </div>

      <div className="rounded-lg border border-border px-3 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Payment amount</span>
          <span className="text-lg font-bold text-foreground">${payment.amount.toLocaleString()}</span>
        </div>
      </div>

      {payment.riskFlag ? (
        payment.riskFlag.type === "unusual-amount" ? (
          <>
            <p className="text-sm font-medium" style={{ color: ANOMALY_RED }}>
              This is 120% higher than usual.
            </p>
            <AnomalyChart payment={payment} isAnomaly variant="infographic" />
            <p className="text-[11px] text-[#59606d] leading-relaxed">
              {payment.riskFlag.recommendation}
            </p>
          </>
        ) : (
          (() => {
            const style = getAnomalyStyle(payment.riskFlag!.severity)
            const Icon = style.icon
            return (
              <>
                <div className={`rounded-lg border px-3 py-2.5 ${style.border} ${style.bg}`}>
                  <p className="text-xs font-medium flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span className={style.text}>{payment.riskFlag!.label}</span>
                  </p>
                  <p className={`text-[11px] leading-relaxed mt-1 ${style.text}`}>{payment.riskFlag!.detail}</p>
                </div>
                <AnomalyChart payment={payment} isAnomaly />
              </>
            )
          })()
        )
      ) : (
        <>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Amount, timing, and bank details all match historical patterns for {payment.vendor}. No issues detected.
            </p>
          </div>
          <AnomalyChart payment={payment} />
        </>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Hold payment
        </button>
        <button
          type="button"
          onClick={onAuthorise}
          className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT }}
        >
          Authorise
        </button>
      </div>
    </div>
  )
}

function ApproverAuthorize({
  payments,
  onConfirm,
  onBack,
}: {
  payments: ScheduledPayment[]
  onConfirm: () => void
  onBack: () => void
}) {
  const totalAmount = payments.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>
      <p className="text-sm font-medium text-foreground">Authorise {payments.length} payment{payments.length !== 1 ? "s" : ""}</p>

      <div className="rounded-lg border border-border overflow-hidden">
        {payments.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center justify-between px-3 py-2 ${
              i < payments.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <p className="text-xs font-medium text-foreground">{p.vendor}</p>
            <span className="text-xs font-medium text-foreground">${p.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-muted/50 px-3 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Total</span>
          <span className="text-base font-bold text-foreground">${totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        style={{ backgroundColor: ACCENT }}
      >
        Authorise {payments.length} payment{payments.length !== 1 ? "s" : ""}
      </button>
    </div>
  )
}

function ApproverConfirmed({
  payments,
  flaggedCount,
  onReset,
}: {
  payments: ScheduledPayment[]
  flaggedCount: number
  onReset: () => void
}) {
  const totalAmount = payments.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}15` }}>
          <ShieldCheck className="h-6 w-6" style={{ color: ACCENT }} />
        </div>
        <p className="text-base font-semibold text-foreground">{payments.length} payment{payments.length !== 1 ? "s" : ""} authorised</p>
        <p className="mt-1 text-sm text-muted-foreground text-center">${totalAmount.toLocaleString()} will be sent on schedule.</p>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        {payments.map((p, i) => (
          <div key={p.id} className={`flex items-center gap-2 px-3 py-2 ${i < payments.length - 1 ? "border-b border-border" : ""}`}>
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
            <span className="flex-1 text-xs font-medium text-foreground">{p.vendor}</span>
            <span className="text-xs text-muted-foreground">{p.scheduledDate}</span>
            <span className="text-xs text-muted-foreground">${p.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-muted px-3 py-2.5">
        <p className="text-xs font-medium text-foreground mb-1 flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3" style={{ color: ACCENT }} />
          Safety audit
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {flaggedCount > 0
            ? `${flaggedCount} payment${flaggedCount !== 1 ? "s" : ""} still need review. `
            : ""}
          Sarah has been notified. Full audit trail available in payment history.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Done
        </button>
        <button
          type="button"
          className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT }}
        >
          View payment run
        </button>
      </div>
    </div>
  )
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

const cleanIds = new Set(scheduledPayments.filter((p) => !p.riskFlag).map((p) => p.id))
const flaggedIds = new Set(scheduledPayments.filter((p) => p.riskFlag).map((p) => p.id))

const allIds = new Set(scheduledPayments.map((p) => p.id))

const flaggedPayments = scheduledPayments.filter((p) => p.riskFlag)
const cleanPayments = scheduledPayments.filter((p) => !p.riskFlag)
const criticalPayments = scheduledPayments.filter((p) => p.priority === "critical")
const optimisedPayments = scheduledPayments.filter((p) => p.priority === "optimised" && p.riskFlag)
const autoApprovedClean = scheduledPayments.filter((p) => p.priority === "optimised" && !p.riskFlag)
/** All flagged payments in one list (Needs review): critical first, then optimised-with-flag */
const needsReviewPayments = [...criticalPayments, ...optimisedPayments]

export function IntelligentBillApprovalPanel() {
  const [role, setRole] = useState<Role>("submitter")
  const [submitterScreen, setSubmitterScreen] = useState<SubmitterScreen>("build")
  const [approverScreen, setApproverScreen] = useState<ApproverScreen>("run")
  const [selectedPayment, setSelectedPayment] = useState<ScheduledPayment | null>(null)
  const [expandedPaymentId, setExpandedPaymentId] = useState<string | null>(null)
  // Submitter: flagged + auto-approved start checked
  const [submitterSelectedIds, setSubmitterSelectedIds] = useState<Set<string>>(() => new Set(autoApprovedClean.map(p => p.id)))
  // Approver: starts with clean ones pre-checked
  const [approverSelectedIds, setApproverSelectedIds] = useState<Set<string>>(() => new Set(cleanIds))
  const [authorizedPayments, setAuthorizedPayments] = useState<ScheduledPayment[]>([])
  const [sentPayments, setSentPayments] = useState<ScheduledPayment[]>([])
  const [individuallyAuthorised, setIndividuallyAuthorised] = useState<Record<string, { by: string; at: string }>>({})
  const [paymentNotes, setPaymentNotes] = useState<Record<string, string>>({})
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedPaymentId((prev) => (prev === id ? null : id))
  }

  const handleRoleChange = (r: Role) => {
    setRole(r)
    setExpandedPaymentId(null)
    if (r === "submitter") {
      setSubmitterScreen("build")
      setSubmitterSelectedIds(new Set(autoApprovedClean.map(p => p.id)))
    }
    if (r === "approver") {
      setApproverScreen("run")
      setSelectedPayment(null)
      setApproverSelectedIds(new Set(cleanIds))
      setIndividuallyAuthorised({})
      setPaymentNotes({})
      setEditingNoteId(null)
    }
  }

  const toggleSubmitterSelected = (id: string) => {
    setSubmitterSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleApproverSelected = (id: string) => {
    setApproverSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [submitterScreen, approverScreen])

  return (
    <div className="-mt-[54px] pt-[54px] flex flex-col items-center min-h-full bg-[#1f68dd]">
      <div className="relative flex w-full max-w-[400px] flex-col overflow-hidden min-h-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Blue spacer — scrolls away */}
          <div className="h-4 shrink-0" />
          {/* White content card */}
          <div className="bg-white rounded-t-2xl min-h-[calc(100vh-5rem)]">
        {/* ── Submitter flow ── */}
        {role === "submitter" && submitterScreen === "build" && (
          <SubmitterBuild
            selectedIds={submitterSelectedIds}
            onToggleSelected={toggleSubmitterSelected}
            expandedId={expandedPaymentId}
            onToggleExpanded={toggleExpanded}
            onSend={() => {
              setSentPayments(scheduledPayments)
              setSubmitterScreen("email")
            }}
          />
        )}
        {role === "submitter" && submitterScreen === "email" && (
          <SubmitterEmail
            payments={sentPayments}
            selectedIds={submitterSelectedIds}
            onSend={() => setSubmitterScreen("sent")}
            onBack={() => setSubmitterScreen("build")}
          />
        )}
        {role === "submitter" && submitterScreen === "sent" && (
          <SubmitterSent
            sentPayments={sentPayments}
            onReset={() => {
              setSubmitterScreen("build")
              setSubmitterSelectedIds(new Set(autoApprovedClean.map(p => p.id)))
            }}
          />
        )}

        {/* ── Approver flow ── */}
        {role === "approver" && approverScreen === "run" && (
          <ApproverRun
            onAuthorizeSelected={(ids) => {
              const payments = scheduledPayments.filter((p) => ids.includes(p.id))
              setAuthorizedPayments(payments)
              setApproverScreen("authorize")
            }}
            onAuthoriseSingle={(id) => {
              setIndividuallyAuthorised((prev) => ({
                ...prev,
                [id]: { by: "Alex", at: formatTime() },
              }))
              setExpandedPaymentId(null)
            }}
            selectedIds={approverSelectedIds}
            onToggleSelected={toggleApproverSelected}
            expandedId={expandedPaymentId}
            onToggleExpanded={toggleExpanded}
            individuallyAuthorised={individuallyAuthorised}
            paymentNotes={paymentNotes}
            onAddNote={(id, note) => setPaymentNotes((prev) => ({ ...prev, [id]: note }))}
            editingNoteId={editingNoteId}
            onStartEditNote={setEditingNoteId}
          />
        )}
        {role === "approver" && approverScreen === "authorize" && (
          <ApproverAuthorize
            payments={authorizedPayments}
            onConfirm={() => setApproverScreen("confirmed")}
            onBack={() => setApproverScreen("run")}
          />
        )}
        {role === "approver" && approverScreen === "confirmed" && (
          <ApproverConfirmed
            payments={authorizedPayments}
            flaggedCount={scheduledPayments.filter((p) => p.riskFlag).length}
            onReset={() => {
              setApproverScreen("run")
              setSelectedPayment(null)
              setApproverSelectedIds(new Set(cleanIds))
            }}
          />
        )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntelligentBillApprovalPanel
