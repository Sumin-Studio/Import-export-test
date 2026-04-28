"use client";

import { ActionPlanPanel } from "@/app/components/widgets/ActionPlanPanel";
import { ACTION_PLAN_CONFIGS } from "@/app/components/widgets/actionPlanModalConfigs";

/** Embedded insights use the `cashflow-low` scenario (shared with dashboard spotlight modal). */
const INSIGHTS_ACTION_PLAN = ACTION_PLAN_CONFIGS["cashflow-low"];

export function BillsInsightsClient() {
  return (
    <section
      className="w-full max-w-none overflow-hidden rounded-2xl border border-[#e1e2e5] bg-white shadow-sm"
      aria-labelledby="insights-outbound-heading"
    >
      <ActionPlanPanel
        config={INSIGHTS_ACTION_PLAN}
        className="px-6 py-5"
        chartHeaderTitle="Outbound cash flow"
        chartHeaderId="insights-outbound-heading"
        initialShowPlanned={false}
        proposedToggleOnLeft
      />
      <div className="flex justify-end gap-2 border-t border-background-tertiary px-6 py-4">
        <button
          type="button"
          className="inline-flex items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-[48px] bg-brand-primary px-4 py-2 text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
        >
          Apply plan
        </button>
      </div>
    </section>
  );
}
