/**
 * Shared layout for overflow menu sections: primary label + muted date range,
 * selected row with left accent bar (XUI-style list menus).
 *
 * Typography: primary label and right-aligned range both use 15px/24px; range keeps
 * text-content-secondary for hierarchy.
 */

export const overflowLabeledSectionTitleClass =
  "text-content-secondary px-5 py-2 text-[13px]/[16px] font-normal";

/** Row with left label and right-aligned range; selected = brand accent bar + blue text. */
export function overflowLabeledRangeRowClass(selected: boolean): string {
  return [
    "hover:bg-background-primary flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 border-l-4 py-2.5 pl-4 pr-5 text-left transition-[color,background-color] duration-200 ease-out",
    selected
      ? "border-[#0078c8] text-[#0078c8]"
      : "border-transparent text-content-primary",
  ].join(" ");
}

export const overflowLabeledPrimaryLabelClass =
  "shrink-0 text-[15px]/[24px] font-normal";

export const overflowLabeledRangeTextClass =
  "text-content-secondary min-w-0 shrink text-right text-[15px]/[24px] font-normal tabular-nums";
