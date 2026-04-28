"use client"

import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { FigmaCheckbox } from "@/components/figma-checkbox"
// ─── Types ───────────────────────────────────────────────────────────────────

type BillCategory = "critical" | "recommended" | "not-recommended"
type ReasonType = "overdue" | "due-soon" | "early-pay" | "can-defer" | "grace-period"

interface BillItem {
  vendor: string
  amount: number
  reason: string
  category: BillCategory
  reasonType: ReasonType
  dueDate: string
  method: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const BALANCE = 8200
const BUFFER_DEFAULT = 2000
const BUFFER_MAX = 5000
const BUFFER_STEP = 250

// All upcoming bills — total ~$10K against $8.2K balance ($45K/mo turnover business)
const ALL_BILLS: BillItem[] = [
  { vendor: "Officeworks", amount: 185, reason: "Your landlord. You always pay on time.", category: "critical", reasonType: "overdue", dueDate: "Today", method: "Bank transfer" },
  { vendor: "SMART Agency", amount: 1800, reason: "You always pay this supplier on time", category: "critical", reasonType: "overdue", dueDate: "Today", method: "Bank transfer" },
  { vendor: "Net Connect", amount: 320, reason: "Paid on time 12 of last 12 months", category: "critical", reasonType: "due-soon", dueDate: "28 Feb", method: "Direct debit" },
  { vendor: "PowerDirect", amount: 480, reason: "Critical supplier", category: "recommended", reasonType: "due-soon", dueDate: "3 Mar", method: "Bank transfer" },
  { vendor: "ABC Furniture", amount: 2400, reason: "5% early-pay discount saves you $120", category: "recommended", reasonType: "early-pay", dueDate: "10 Mar", method: "Bank transfer" },
  { vendor: "Young Bros Transport", amount: 3100, reason: "30-day terms. You usually pay at day 25", category: "not-recommended", reasonType: "grace-period", dueDate: "15 Mar", method: "Bank transfer" },
  { vendor: "Bayside Wholesale", amount: 2800, reason: "Flexible supplier, deferred 3 times before", category: "not-recommended", reasonType: "can-defer", dueDate: "20 Mar", method: "Bank transfer" },
]

const TOTAL_UPCOMING = ALL_BILLS.reduce((s, b) => s + b.amount, 0)

function getBillsByBuffer(
  buffer: number,
  afterBalance: number
): { critical: BillItem[]; recommended: BillItem[]; notRecommended: BillItem[] } {
  let critical = ALL_BILLS.filter((b) => b.category === "critical")
  let recommended = ALL_BILLS.filter((b) => b.category === "recommended")
  let notRecommended = ALL_BILLS.filter((b) => b.category === "not-recommended")

  // Low buffer / flush cash → promote deferred bills to recommended
  if (buffer <= 500 || afterBalance >= 5000) {
    const youngBros = ALL_BILLS.find((b) => b.vendor === "Young Bros Transport")!
    if (notRecommended.some((b) => b.vendor === youngBros.vendor)) {
      recommended = [...recommended, youngBros]
      notRecommended = notRecommended.filter((b) => b.vendor !== youngBros.vendor)
    }
  }
  if (buffer <= 0 || afterBalance >= 6500) {
    const bayside = ALL_BILLS.find((b) => b.vendor === "Bayside Wholesale")!
    if (notRecommended.some((b) => b.vendor === bayside.vendor)) {
      recommended = [...recommended, bayside]
      notRecommended = notRecommended.filter((b) => b.vendor !== bayside.vendor)
    }
  }

  // ABC Furniture (early-pay): only in "pay now" when buffer is $0; otherwise in defer so it "pops up" at $0
  if (buffer > 0) {
    const abc = recommended.find((b) => b.vendor === "ABC Furniture")
    if (abc) {
      notRecommended = [...notRecommended, abc]
      recommended = recommended.filter((b) => b.vendor !== abc.vendor)
    }
  }

  // High buffer → demote recommended bills to defer (most deferrable first)
  if (buffer >= 4000) {
    const abc = recommended.find((b) => b.vendor === "ABC Furniture")
    if (abc) {
      notRecommended = [...notRecommended, abc]
      recommended = recommended.filter((b) => b.vendor !== abc.vendor)
    }
    const pd = recommended.find((b) => b.vendor === "PowerDirect")
    if (pd) {
      notRecommended = [...notRecommended, pd]
      recommended = recommended.filter((b) => b.vendor !== pd.vendor)
    }
  } else if (buffer >= 3000) {
    const abc = recommended.find((b) => b.vendor === "ABC Furniture")
    if (abc) {
      notRecommended = [...notRecommended, abc]
      recommended = recommended.filter((b) => b.vendor !== abc.vendor)
    }
  }

  // Very high buffer → even a critical bill can wait if it's just "due soon"
  if (buffer >= 4500) {
    const nc = critical.find((b) => b.vendor === "Net Connect")
    if (nc) {
      notRecommended = [...notRecommended, nc]
      critical = critical.filter((b) => b.vendor !== nc.vendor)
    }
  }

  // Cap so we never recommend more than we can afford (avoid overdraft)
  const available = BALANCE - buffer
  let payNowTotal = critical.reduce((s, b) => s + b.amount, 0) + recommended.reduce((s, b) => s + b.amount, 0)
  if (payNowTotal > available) {
    // Defer promoted/optional first so ABC (early-pay) can stay in "pay now" at $0 buffer and show purple
    const deferOrder: ReasonType[] = ["grace-period", "can-defer", "early-pay", "due-soon"]
    const byDeferrability = [...recommended].sort(
      (a, b) => deferOrder.indexOf(a.reasonType) - deferOrder.indexOf(b.reasonType)
    )
    let recommendedFiltered = [...recommended]
    for (const bill of byDeferrability) {
      if (payNowTotal <= available) break
      recommendedFiltered = recommendedFiltered.filter((b) => b.vendor !== bill.vendor)
      notRecommended = [...notRecommended, bill]
      payNowTotal -= bill.amount
    }
    recommended = recommendedFiltered
  }

  return { critical, recommended, notRecommended }
}

// ─── Cash Flow Graph ─────────────────────────────────────────────────────────

const LINE_PLAN = "#1e3145"
const LINE_CURRENT = "#1e3145"

function GearIcon({ active }: { active?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M6.5 1L6.1 3.1C5.6 3.3 5.2 3.5 4.8 3.8L2.8 3L1.3 5.6L3 7C3 7.3 3 7.7 3 8C3 8.3 3 8.7 3 9L1.3 10.4L2.8 13L4.8 12.2C5.2 12.5 5.6 12.7 6.1 12.9L6.5 15H9.5L9.9 12.9C10.4 12.7 10.8 12.5 11.2 12.2L13.2 13L14.7 10.4L13 9C13 8.7 13 8.3 13 8C13 7.7 13 7.3 13 7L14.7 5.6L13.2 3L11.2 3.8C10.8 3.5 10.4 3.3 9.9 3.1L9.5 1H6.5ZM8 5.5C9.4 5.5 10.5 6.6 10.5 8C10.5 9.4 9.4 10.5 8 10.5C6.6 10.5 5.5 9.4 5.5 8C5.5 6.6 6.6 5.5 8 5.5Z"
        fill={active ? "#1e3145" : "#94a3b8"} />
    </svg>
  )
}

function CashFlowGraph({
  balance,
  totalPay,
  bufferTarget,
  showPlan = true,
  onBufferChange,
}: {
  balance: number
  totalPay: number
  bufferTarget: number
  showPlan?: boolean
  onBufferChange?: (v: number) => void
}) {
  const [dragging, setDragging] = useState(false)
  const [bufferEditing, setBufferEditing] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const smartAfter = balance - totalPay

  const withoutPlan = useMemo(() => [
    { label: "Today", value: balance },
    { label: "+1 wk", value: balance - 2000 },
    { label: "+2 wk", value: balance - 5200 },
    { label: "+3 wk", value: balance - 8300 },
    { label: "+30 d", value: balance - TOTAL_UPCOMING },
  ], [balance])

  const deferred = TOTAL_UPCOMING - totalPay
  const withPlan = useMemo(() => [
    { label: "Today", value: balance },
    { label: "+1 wk", value: balance - totalPay * 0.4 },
    { label: "+2 wk", value: smartAfter },
    { label: "+3 wk", value: smartAfter + 1200 + deferred * 0.15 },
    { label: "+30 d", value: smartAfter + 3000 + deferred * 0.3 },
  ], [balance, totalPay, smartAfter, deferred])

  // Predicted receivables — invoices being paid by customers (AR)
  const receivables = useMemo(() => [
    { label: "Today", value: 0 },
    { label: "+1 wk", value: 600 },
    { label: "+2 wk", value: 1800 },
    { label: "+3 wk", value: 3200 },
    { label: "+30 d", value: 5400 },
  ], [])

  // Combined: plan + receivables (for green area and top line)
  const withPlanAndReceivables = useMemo(() =>
    withPlan.map((p, i) => ({ ...p, value: p.value + receivables[i].value })),
    [withPlan, receivables]
  )

  const labels = ["Today", "+1 wk", "+2 wk", "+3 wk", "+30 d"]
  const numPts = labels.length

  const gW = 260
  const gH = 120
  const gPad = { top: 16, right: 14, bottom: 22, left: 38 }
  const gChartW = gW - gPad.left - gPad.right
  const gChartH = gH - gPad.top - gPad.bottom

  const allValues = [
    ...withoutPlan.map(p => p.value),
    ...withPlan.map(p => p.value),
    ...(showPlan ? withPlanAndReceivables.map(p => p.value) : []),
  ]
  const gMin = Math.min(...allValues) - 2000
  const gMax = Math.max(...allValues) + 3000

  const toX = (i: number) => gPad.left + (i / (numPts - 1)) * gChartW
  const toY = (v: number) => gPad.top + gChartH - ((v - gMin) / (gMax - gMin)) * gChartH

  const bufferY = toY(bufferTarget)
  const zeroY = toY(0)

  const toPath = (pts: { value: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.value)}`).join(" ")

  // Green area: between combined plan+receivables and buffer
  const greenArea = useMemo(() => {
    const source = showPlan ? withPlanAndReceivables : withPlan
    const pts = source.map((p, i) => ({ x: toX(i), y: toY(Math.max(p.value, bufferTarget)) }))
    const bufY = toY(bufferTarget)
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x} ${pts[i].y}`
    d += ` L ${pts[pts.length - 1].x} ${bufY} L ${pts[0].x} ${bufY} Z`
    return d
  }, [withPlan, withPlanAndReceivables, bufferTarget, toX, toY, showPlan])

  const redArea = useMemo(() => {
    const pts = withoutPlan.map((p, i) => ({ x: toX(i), y: toY(Math.min(p.value, bufferTarget)) }))
    const bufY = toY(bufferTarget)
    let d = `M ${pts[0].x} ${bufY}`
    for (let i = 0; i < pts.length; i++) d += ` L ${pts[i].x} ${pts[i].y}`
    d += ` L ${pts[pts.length - 1].x} ${bufY} Z`
    return d
  }, [withoutPlan, bufferTarget, toX, toY])

  const worstValue = withoutPlan[withoutPlan.length - 1].value

  const yToBuffer = useCallback((clientY: number) => {
    if (!svgRef.current || !onBufferChange) return
    const rect = svgRef.current.getBoundingClientRect()
    const svgY = ((clientY - rect.top) / rect.height) * gH
    const value = gMin + ((gChartH - (svgY - gPad.top)) / gChartH) * (gMax - gMin)
    const clamped = Math.round(Math.max(0, Math.min(BUFFER_MAX, value)) / BUFFER_STEP) * BUFFER_STEP
    onBufferChange(clamped)
  }, [onBufferChange, gMin, gMax, gChartH, gPad.top, gH])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!onBufferChange) return
    setDragging(true)
    ;(e.target as Element).setPointerCapture(e.pointerId)
    yToBuffer(e.clientY)
  }, [onBufferChange, yToBuffer])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    yToBuffer(e.clientY)
  }, [dragging, yToBuffer])

  const handlePointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  return (
    <div className="rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[#1e3145]">Cash position</p>
        {onBufferChange && (
          <button
            type="button"
            onClick={() => setBufferEditing((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5 transition-colors hover:bg-slate-200"
            title="Adjust buffer"
          >
            <span className="text-[11px] font-medium text-[#1e3145]">${bufferTarget.toLocaleString()}</span>
            <GearIcon active={bufferEditing} />
          </button>
        )}
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${gW} ${gH}`}
        className={`w-full h-[150px] ${bufferEditing ? "cursor-ns-resize" : ""}`}
        preserveAspectRatio="xMidYMid meet"
        onPointerDown={bufferEditing ? handlePointerDown : undefined}
        onPointerMove={bufferEditing ? handlePointerMove : undefined}
        onPointerUp={bufferEditing ? handlePointerUp : undefined}
        style={{ touchAction: bufferEditing ? "none" : undefined }}
      >
        <defs>
          <linearGradient id="planFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {showPlan && <path d={greenArea} fill="url(#planFill)" />}
        <path d={redArea} fill="url(#currentFill)" />

        {zeroY < gH - gPad.bottom && zeroY > gPad.top && (
          <line x1={gPad.left} y1={zeroY} x2={gW - gPad.right} y2={zeroY}
            stroke="#1e3145" strokeWidth="0.8" opacity={0.15} />
        )}

        {/* Buffer line — purple (agent/safety net in graph) */}
        <line x1={gPad.left} y1={bufferY} x2={gW - gPad.right} y2={bufferY}
          stroke="#7c3aed" strokeWidth={bufferEditing ? 2 : 1}
          opacity={bufferEditing ? (dragging ? 0.9 : 0.8) : 0.7} />
        {bufferEditing && (
          <circle cx={gW - gPad.right} cy={bufferY} r={4}
            fill="white" stroke="#7c3aed" strokeWidth={1.5}
            className="cursor-grab active:cursor-grabbing" opacity={0.8} />
        )}

        {/* Buffer label — left side, black */}
        <text x={gPad.left - 6} y={bufferY} fill="#6d28d9" fontSize="9" fontWeight="600" textAnchor="end" dominantBaseline="middle">
          ${bufferTarget.toLocaleString()}
        </text>

        {/* Current trajectory — dashed */}
        <path d={toPath(withoutPlan)} fill="none" stroke={LINE_CURRENT}
          strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" opacity={0.6} />

        {/* JAX plan — solid dark */}
        {showPlan && (
          <path d={toPath(withPlan)} fill="none" stroke={LINE_PLAN}
            strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* End labels */}
        <text x={toX(numPts - 1) + 1} y={toY(worstValue) + 3} fill={LINE_CURRENT} fontSize="8" fontWeight="600" textAnchor="end">
          -${Math.abs(Math.round(worstValue / 1000))}k
        </text>
        {showPlan && (
          <text x={toX(numPts - 1) + 1} y={toY(withPlan[withPlan.length - 1].value) - 4} fill={LINE_PLAN} fontSize="8" fontWeight="600" textAnchor="end">
            ${Math.round(withPlan[withPlan.length - 1].value / 1000)}k
          </text>
        )}

        {labels.map((l, i) => (
          <text key={l} x={toX(i)} y={gH - 5} textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="500">
            {l}
          </text>
        ))}

        <text x={10} y={gPad.top + 3} fill="#64748b" fontSize="8" fontWeight="500">
          ${Math.round(gMax / 1000)}k
        </text>
      </svg>
      <div className="flex gap-4 px-3 pb-3 pt-2 border-t border-[#e1e2e5]">
        <div className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full border-t-2 border-dashed" style={{ borderColor: LINE_CURRENT, opacity: 0.6 }} />
          <span className="text-[11px] font-medium text-[#616b7a]">Current trajectory</span>
        </div>
        {showPlan && (
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: LINE_PLAN }} />
            <span className="text-[11px] font-medium text-[#616b7a]">JAX plan</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Animated Bill Row ───────────────────────────────────────────────────────

function BillRow({
  bill,
  isChecked,
  onToggle,
  delay,
  visible,
  isLast,
  bufferTarget = 0,
}: {
  bill: BillItem
  isChecked: boolean
  onToggle: () => void
  delay: number
  visible: boolean
  isLast: boolean
  bufferTarget?: number
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!visible) { setShow(false); return }
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [visible, delay])

  const isEarlyPayAtZero = bill.reasonType === "early-pay" && bufferTarget === 0
  const reasonText = isEarlyPayAtZero
    ? bill.reason
    : bill.reasonType === "early-pay"
      ? "Not due for 14 days — safe to defer"
      : bill.reason
  const reasonClass = isEarlyPayAtZero ? "text-[12px] mt-0.5 text-[#7c3aed] font-medium" : "text-[12px] mt-0.5 text-[#616b7a]"

  return (
    <label
      className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer transition-all duration-300 hover:bg-slate-50/70 ${
        !isLast ? "border-b border-border" : ""
      } ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <FigmaCheckbox checked={isChecked} onChange={onToggle} className="mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[13px] font-semibold text-[#1e3145] flex items-center gap-1.5">
            {bill.vendor}
          </span>
          <span className="text-[13px] font-semibold text-[#1e3145]">${bill.amount.toLocaleString()}</span>
        </div>
        <p className={reasonClass}>{reasonText}</p>
      </div>
    </label>
  )
}

// ─── Bill Section ────────────────────────────────────────────────────────────

function BillSection({
  title,
  bills,
  checkedVendors,
  onToggle,
  revealed,
  startIndex,
  totalColor,
  accentDot,
  bufferTarget,
}: {
  title: string
  bills: BillItem[]
  checkedVendors: Set<string>
  onToggle: (vendor: string) => void
  revealed: boolean
  startIndex: number
  totalColor?: string
  accentDot?: string
  bufferTarget?: number
}) {
  if (bills.length === 0) return null
  const sectionTotal = bills.reduce((s, b) => s + b.amount, 0)
  return (
    <div className="w-full">
      <p className="text-[13px] font-semibold text-[#1e3145] mb-1.5 flex items-center gap-1.5">
        {accentDot && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accentDot }} />}
        {title}: <span style={{ color: totalColor }}>${sectionTotal.toLocaleString()}</span>
      </p>
      <div className="rounded-lg bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] overflow-hidden w-full">
        {bills.map((bill, i) => (
          <BillRow
            key={bill.vendor}
            bill={bill}
            isChecked={checkedVendors.has(bill.vendor)}
            onToggle={() => onToggle(bill.vendor)}
            delay={(startIndex + i) * 120}
            visible={revealed}
            isLast={i === bills.length - 1}
            bufferTarget={bufferTarget}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export function BillPayPanel() {
  const [bufferTarget, setBufferTarget] = useState(BUFFER_DEFAULT)
  const [revealed, setRevealed] = useState(false)
  const [analysing, setAnalysing] = useState(false)
  const [planReady, setPlanReady] = useState(false)
  const [committed, setCommitted] = useState(false)
  const [manualOverrides, setManualOverrides] = useState<Record<string, boolean>>({})

  const handleAnalyse = useCallback(() => {
    setAnalysing(true)
    setTimeout(() => {
      setPlanReady(true)
      setTimeout(() => {
        setRevealed(true)
        setAnalysing(false)
      }, 1200)
    }, 2000)
  }, [])

  const { critical, recommended, notRecommended } = useMemo(() => {
    const base = getBillsByBuffer(bufferTarget, 0)
    const basePay = [...base.critical, ...base.recommended].reduce((s, b) => s + b.amount, 0)
    return getBillsByBuffer(bufferTarget, BALANCE - basePay)
  }, [bufferTarget])

  const payNow = useMemo(() => [...critical, ...recommended], [critical, recommended])
  const canDefer = notRecommended

  const checkedVendors = useMemo(() => {
    const set = new Set([...payNow].map((b) => b.vendor))
    for (const [vendor, checked] of Object.entries(manualOverrides)) {
      if (checked) set.add(vendor)
      else set.delete(vendor)
    }
    return set
  }, [payNow, manualOverrides])

  const totalPay = useMemo(() => {
    return ALL_BILLS.filter((b) => checkedVendors.has(b.vendor)).reduce((sum, b) => sum + b.amount, 0)
  }, [checkedVendors])
  const afterBalance = BALANCE - totalPay

  const handleBufferChange = useCallback((newBuffer: number) => {
    setBufferTarget(newBuffer)
    setManualOverrides({})
  }, [])

  const toggleVendor = useCallback((vendor: string) => {
    setManualOverrides((prev) => ({
      ...prev,
      [vendor]: prev[vendor] !== undefined ? !prev[vendor] : !checkedVendors.has(vendor),
    }))
  }, [checkedVendors])

  const allBills = useMemo(() => [...payNow, ...canDefer], [payNow, canDefer])
  const selectedBills = useMemo(
    () => allBills.filter((b) => checkedVendors.has(b.vendor)),
    [allBills, checkedVendors]
  )
  const isOverdrawn = afterBalance < 0

  return (
    <div className="relative flex flex-col min-h-[480px] max-w-[400px] mx-auto w-full">
      <div className="absolute inset-x-0 -top-[300px] h-[430px] bg-[#1f68dd]" />

      <div className="relative z-10 flex flex-col gap-4 px-4 pt-5 pb-4">
        <div className="min-w-0">
          <CashFlowGraph balance={BALANCE} totalPay={totalPay} bufferTarget={bufferTarget} showPlan={revealed} onBufferChange={revealed ? handleBufferChange : undefined} />
        </div>

        {/* JAX insight — first-person agent voice */}
        <div
          className={`rounded-lg border-2 border-[#7c3aed]/30 bg-[#f5f3ff] p-3 transition-all duration-500 ease-in-out overflow-hidden ${
            revealed ? "opacity-0 max-h-0 !p-0 !border-0 !-mb-4" : "opacity-100 max-h-[300px]"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#7c3aed" />
            </svg>
            <span className="text-[12px] font-semibold text-[#7c3aed]">JAX</span>
          </div>
          <p className="text-[13px] text-[#1e3145] leading-relaxed">
            I&apos;ve analysed your upcoming cashflow. Paying all upcoming due bills would push you{" "}
            <span className="font-medium text-[#c31230]">${(TOTAL_UPCOMING - BALANCE + bufferTarget).toLocaleString()} below your buffer</span>.{" "}
            I recommend paying {payNow.length} bills now and deferring {canDefer.length} to maintain your{" "}
            <span className="font-medium">${bufferTarget.toLocaleString()} safety net</span>
            , which is based on your average cashflow buffer over the last two months.
          </p>
          {!revealed && (
            <div className="mt-3">
              <style>{`
                @keyframes star-movement-bottom {
                  0% { transform: translate(0%, 0%); opacity: 1; }
                  100% { transform: translate(-100%, 0%); opacity: 0; }
                }
                @keyframes star-movement-top {
                  0% { transform: translate(0%, 0%); opacity: 1; }
                  100% { transform: translate(100%, 0%); opacity: 0; }
                }
              `}</style>
              <div className="relative inline-block w-full rounded-full overflow-hidden" style={{ padding: analysing || planReady ? "2px 0" : "0" }}>
                {(analysing || planReady) && (
                  <>
                    <div className="absolute w-[300%] h-[50%] opacity-70 -bottom-[12px] -right-[250%] rounded-[50%] z-0"
                      style={{
                        background: "radial-gradient(circle, #7c3aed, transparent 10%)",
                        animation: "star-movement-bottom 3s linear infinite alternate",
                      }}
                    />
                    <div className="absolute w-[300%] h-[50%] opacity-70 -top-[12px] -left-[250%] rounded-[50%] z-0"
                      style={{
                        background: "radial-gradient(circle, #7c3aed, transparent 10%)",
                        animation: "star-movement-top 3s linear infinite alternate",
                      }}
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={handleAnalyse}
                  disabled={analysing}
                  className={`relative z-10 w-full rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                    planReady
                      ? "bg-[#7c3aed] text-white"
                      : analysing
                        ? "bg-[#f5f3ff] text-[#7c3aed] border border-[#7c3aed]/20"
                        : "bg-[#6d28d9] text-white hover:bg-[#5b21b6]"
                  }`}
                >
                  {planReady ? "Plan ready \u2714" : analysing ? "Analysing your cashflow\u2026" : "Review plan"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bill sections: Pay now / Defer */}
        {revealed && !committed && (
          <>
            <BillSection
              title="Bills to pay now"
              bills={payNow}
              checkedVendors={checkedVendors}
              onToggle={toggleVendor}
              revealed={revealed}
              startIndex={0}
              totalColor="#c31230"
              bufferTarget={bufferTarget}
            />

            <BillSection
              title="Bills you should defer"
              bills={canDefer}
              checkedVendors={checkedVendors}
              onToggle={toggleVendor}
              revealed={revealed}
              startIndex={payNow.length}
              totalColor="#16a34a"
              bufferTarget={bufferTarget}
            />

            <button
              type="button"
              disabled={selectedBills.length === 0 || isOverdrawn}
              onClick={() => setCommitted(true)}
              className="w-full rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-[#1f68dd] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedBills.length === 0
                ? "Select bills to pay"
                : isOverdrawn
                  ? "Uncheck some bills \u2014 would overdraw"
                  : `Commit to this plan \u00b7 $${totalPay.toLocaleString()}`}
            </button>
          </>
        )}

        {/* Payment plan after committed */}
        {revealed && committed && (
          <>
            {/* Success banner */}
            <div className="rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 px-3 py-2.5 flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#22c55e]/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#16a34a]" aria-hidden>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#1e3145]">Plan saved</p>
                <p className="text-[11px] text-[#616b7a]">
                  ${totalPay.toLocaleString()} across {selectedBills.length} bill{selectedBills.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {/* Paying now — timeline */}
            <div>
              <p className="text-[13px] font-semibold text-[#1e3145] mb-2">Paying now</p>
              <div className="rounded-lg bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] overflow-hidden">
                {selectedBills.map((bill, i) => (
                  <div key={bill.vendor} className={`flex items-center gap-3 px-3 py-2.5 ${i < selectedBills.length - 1 ? "border-b border-[#e1e2e5]" : ""}`}>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f68dd]/10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="#1f68dd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[13px] font-semibold text-[#1e3145]">{bill.vendor}</span>
                        <span className="text-[13px] font-semibold text-[#1e3145]">${bill.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between gap-1.5 mt-0.5">
                        <span className="text-[11px] text-[#616b7a]">{bill.dueDate} &middot; {bill.method}</span>
                        <span className="text-[11px] text-[#16a34a] font-medium">Scheduled</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deferred — what's waiting */}
            {allBills.filter(b => !checkedVendors.has(b.vendor)).length > 0 && (
              <div>
                <p className="text-[13px] font-semibold text-[#1e3145] mb-2">Deferred</p>
                <div className="rounded-lg bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] overflow-hidden">
                  {allBills.filter(b => !checkedVendors.has(b.vendor)).map((bill, i, arr) => (
                    <div key={bill.vendor} className={`flex items-center gap-3 px-3 py-2.5 ${i < arr.length - 1 ? "border-b border-[#e1e2e5]" : ""}`}>
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9]">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.5" />
                          <path d="M8 5v3.5l2.5 1.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[13px] font-medium text-[#616b7a]">{bill.vendor}</span>
                          <span className="text-[13px] font-medium text-[#616b7a]">${bill.amount.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-[#94a3b8] mt-0.5">{bill.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* After balance */}
            <div className="rounded-lg bg-[#f8fafc] border border-[#e1e2e5] px-3 py-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#616b7a]">Balance after payments</span>
                <span className="font-semibold text-[#1e3145]">${afterBalance.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] mt-1">
                <span className="text-[#94a3b8]">Buffer target</span>
                <span className="text-[#7c3aed] font-medium">${bufferTarget.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BillPayPanel
