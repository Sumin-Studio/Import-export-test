# Action Plan Modal: Multi-select table and reactive chart (plan)

**Created:** 2026-03-16  
**Update:** Includes hoverable chart annotations for payment dates.

---

## Scope and out-of-scope

- **In scope:** Strategic variant only (cashflow-low, cashflow-shortfall): two-section table with checkboxes, reactive chart from included set, and **hoverable annotations on the chart** that indicate payment dates (in scope, not a later enhancement). Emergency variant (cashflow-critical) keeps current single card / non-table UI and no annotations.
- **Out of scope:** Emergency variant does not get the table or chart annotations.

---

## 1. Data model: two sections and chart inputs

- Split from two flat arrays into two **sections**: **Pay as scheduled** (top, all checked) and **Recommend deferring** (bottom, all unchecked).
- Each row: `id`, `billName`, `amount`, `payDate`, `action`, `payDayIndex` (0–7), `amountNumeric`.
- Config: `payAsScheduled` / `recommendDefer` (and base cash curve per lens) for strategic configs; emergency unchanged.

---

## 2. Modal state and chart computation

- **Included set** of bill IDs; checking a “Recommend deferring” row adds to set and moves row to top; unchecking moves back to bottom.
- **Projected series** = base curve minus outflows for included bills by `payDayIndex`. Pass `projectedData` to chart when in strategic mode.

---

## 3. Chart components: optional dynamic data

- Add `projectedData?: number[]` to CashflowPlanChart and CashflowShortfallChart; use when provided, else keep lens-based static data.

---

## 4. Hoverable annotations on the chart (payment dates)

- **Goal:** Show when bills are being paid directly on the chart via annotations that indicate payment dates and are **hoverable** for detail.
- **Approach:**
  - For each **included** bill (rows in “Pay as scheduled” / checked), add a **chart annotation** (or point marker) at the corresponding day on the x-axis (using `payDayIndex`). Optionally place the marker at the projected cash value for that day (y) so it sits on the line, or use a vertical line/label at the day.
  - Use Highcharts **annotations** API (e.g. `xAxis: payDayIndex`, label with bill name and amount) or **point markers** with custom `dataLabels` / **tooltip** so that hovering shows which bill(s) are paid on that day (e.g. “Wed: Acme Supplies $1,200”).
  - **Hover behaviour:** Annotations or markers must be **hoverable**: on hover, show a tooltip (or highlight) with bill name, amount, and pay date. If multiple bills fall on the same day, list them in the tooltip.
- **Data flow:** Modal passes `projectedData` plus a list of **payment events**: `{ payDayIndex: number; billName: string; amount: string; amountNumeric: number }[]` for included bills. Chart component plots the line from `projectedData` and renders annotations/markers from the payment-events list; each annotation is associated with the event so the tooltip can show bill details.
- **Scope:** Same as dynamic chart — strategic variant only when modal is in table mode; JAX panel and emergency modal keep current chart without annotations.

---

## 5. Table UI in the modal

- Replace recommended-actions cards with a **table**: Checkbox (left) | Bill name | Amount | Pay date | Action.
- Two labelled sections: “Pay as scheduled” (checked rows) and “Recommend deferring” (unchecked). Toggling checkbox moves row between sections and updates chart + annotations.

---

## 6. Implementation order

1. Config and types — payAsScheduled / recommendDefer, base curve, payment event fields.
2. Charts — `projectedData?: number[]`; when provided, use for series. Add optional **payment events** prop and render hoverable annotations (Highcharts annotations or markers + tooltip).
3. Modal state and computation — included set, `projectedData`, and payment-events list for included bills; pass both to chart.
4. Table UI — Two-section table with checkboxes; wire to included set and row order.

---

## 7. Edge cases

- Emergency variant: no table, no annotations.
- Empty sections: show section header or hide section.
- Lens switch: re-derive sections and included set from new lens so table, chart, and annotations stay in sync.
- Multiple bills on same day: annotation/tooltip lists all bills for that day.
