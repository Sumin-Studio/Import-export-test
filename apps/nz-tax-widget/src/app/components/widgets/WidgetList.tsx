"use client";

import { useRegion } from "@/app/contexts/RegionContext";
import { PROTOTYPE_EXCLUDED_WIDGET_IDS } from "@/app/lib/prototypeHiddenWidgets";
import {
  NZ_GA_OVERVIEW_WIDGET_ID_SET,
  NZ_TAX_INSIGHT_WIDGET_ID_SET,
  NZ_WIDGET_ORDER,
} from "@/app/lib/nzDashboardCanonical";
import type {
  PrototypeStageId,
  PrototypeWidgetScope,
} from "@/app/lib/prototypeSettings";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";

// Widget configurations - these should match the WIDGET_CONFIGS in dashboard.tsx
interface WidgetConfig {
  id: string;
  name: string;
  regions?: string[]; // Optional array of regions where this widget should be visible
}

const WIDGET_DISPLAY_NAMES: WidgetConfig[] = [
  {
    id: "quick-actions",
    name: "Quick actions",
  },
  {
    id: "jobs",
    name: "Jobs",
  },
  {
    id: "lodgements",
    name: "Filed tax returns",
    regions: ["AU", "NZ"],
  },
  {
    id: "time-summary",
    name: "Time summary",
  },
  {
    id: "billable-hours",
    name: "Billable hours",
  },
  {
    id: "bank-feed-alerts",
    name: "Bank feed alerts",
  },
  {
    id: "activity-statements",
    name: "Activity statements",
    regions: ["AU"],
  },
  {
    id: "annual-tax-returns",
    name: "Tax returns",
    regions: ["NZ", "REST_OF_WORLD"],
  },
  {
    id: "returns-by-status",
    name: "Tax returns",
    regions: ["AU", "NZ", "UK", "REST_OF_WORLD"],
  },
  {
    id: "us-economic-nexus-insights",
    name: "Economic nexus insights",
    regions: ["USA"],
  },
  {
    id: "us-1099-returns-pipeline",
    name: "1099s",
    regions: ["USA"],
  },
  {
    id: "returns-by-month-line",
    name: "Returns by month (trend)",
    regions: ["NZ"],
  },
  {
    id: "return-by-type",
    name: "Returns by type",
    regions: ["NZ"],
  },
  {
    id: "nz-tax-due-countdown",
    name: "Tax due countdown",
    regions: ["NZ"],
  },
  {
    id: "nz-gst-tracker",
    name: "GST tracker",
    regions: ["NZ"],
  },
  {
    id: "nz-client-compliance-health",
    name: "Client compliance",
    regions: ["NZ"],
  },
  {
    id: "tax-alerts-compact",
    name: "Tax alerts (compact)",
    regions: ["AU", "NZ", "UK", "USA", "REST_OF_WORLD"],
  },
  {
    id: "bank-reconciliation",
    name: "Bank reconciliation",
  },
  {
    id: "client-contact-information",
    name: "Client contact information",
  },
  {
    id: "favourite-xero-organisations",
    name: "Favourite Xero organisations",
  },
  {
    id: "xero-updates",
    name: "Xero updates",
  },
];

// Region-specific widget order configurations
const WIDGET_ORDER_BY_REGION: Record<string, string[]> = {
  AU: [
    "tax-alerts-compact",
    "returns-by-status",
    "activity-statements",
    "lodgements",
    "quick-actions",
    "jobs",
    "time-summary",
    "billable-hours",
    "bank-feed-alerts",
    "bank-reconciliation",
    "client-contact-information",
    "favourite-xero-organisations",
    "xero-updates",
  ],
  NZ: [...NZ_WIDGET_ORDER],
  UK: [
    "tax-alerts-compact",
    "returns-by-status",
    "quick-actions",
    "jobs",
    "bank-reconciliation",
    "time-summary",
    "billable-hours",
    "favourite-xero-organisations",
    "bank-feed-alerts",
    "xero-updates",
    "client-contact-information",
  ],
  USA: [
    "tax-alerts-compact",
    "us-economic-nexus-insights",
    "us-1099-returns-pipeline",
    "quick-actions",
    "jobs",
    "bank-reconciliation",
    "time-summary",
    "billable-hours",
    "favourite-xero-organisations",
    "bank-feed-alerts",
    "xero-updates",
    "client-contact-information",
  ],
  REST_OF_WORLD: [
    "tax-alerts-compact",
    "annual-tax-returns",
    "returns-by-status",
    "quick-actions",
    "jobs",
    "bank-reconciliation",
    "time-summary",
    "billable-hours",
    "favourite-xero-organisations",
    "bank-feed-alerts",
    "xero-updates",
    "client-contact-information",
  ],
};

/** NZ insight tiles are catalogued when they appear on the draggable grid (GA or revealed Tailor). */
function nzInsightWidgetInCatalog(
  region: string,
  stage: PrototypeStageId,
  widgetId: string,
  tailorNzTaxDashboardRevealed: boolean
): boolean {
  if (region !== "NZ" || !NZ_TAX_INSIGHT_WIDGET_ID_SET.has(widgetId)) {
    return true;
  }
  return stage === "ga" || (stage === "tailor" && tailorNzTaxDashboardRevealed);
}

/**
 * All catalog widget ids (except prototype-excluded), sorted by region order.
 */
export function getSortedWidgetIdsForRegion(
  region: string,
  stage: PrototypeStageId,
  tailorNzTaxDashboardRevealed: boolean,
  widgetScope: PrototypeWidgetScope
): string[] {
  const filtered = WIDGET_DISPLAY_NAMES.filter((widget) => {
    if (PROTOTYPE_EXCLUDED_WIDGET_IDS.has(widget.id)) {
      return false;
    }
    return nzInsightWidgetInCatalog(
      region,
      stage,
      widget.id,
      tailorNzTaxDashboardRevealed
    );
  });
  const order = WIDGET_ORDER_BY_REGION[region] || [];
  const orderMap = new Map(order.map((id, index) => [id, index]));
  const sortedWidgets = [...filtered].sort((a, b) => {
    const aOrder = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bOrder = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });
  const ids = sortedWidgets.map((w) => w.id);
  if (region === "NZ" && stage === "ga" && widgetScope === "tax") {
    return NZ_WIDGET_ORDER.filter(
      (id) => NZ_GA_OVERVIEW_WIDGET_ID_SET.has(id) && ids.includes(id)
    );
  }
  return ids;
}

interface WidgetListProps {
  hiddenWidgetIds: Set<string>;
  onSetWidgetVisible: (widgetId: string, visible: boolean) => void;
  /** When true, only tax overview widgets are shown on the dashboard */
  taxWidgetsOnlyMode: boolean;
  onTaxWidgetsOnlyChange: (on: boolean) => void;
}

export function WidgetList({
  hiddenWidgetIds,
  onSetWidgetVisible,
  taxWidgetsOnlyMode,
  onTaxWidgetsOnlyChange,
}: WidgetListProps) {
  const { region } = useRegion();
  const { stage, tailorNzTaxDashboardRevealed, widgetScope } =
    usePrototypeSettings();

  const sortedWidgetIds = getSortedWidgetIdsForRegion(
    region,
    stage,
    tailorNzTaxDashboardRevealed,
    widgetScope
  );
  const sortedWidgets = sortedWidgetIds
    .map((id) => WIDGET_DISPLAY_NAMES.find((w) => w.id === id))
    .filter((w): w is WidgetConfig => Boolean(w));

  return (
    <div className="px-5 pb-5">
      <div className="border-border-primary mb-4 rounded-lg border px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-content-primary text-[15px]/[24px] font-bold">
              Tax widgets only
            </p>
            <p className="text-content-secondary mt-0.5 text-[12px]/[16px]">
              Show only tax overview widgets. Off restores your previous
              visibility.
            </p>
          </div>
          <div className="relative inline-block h-5 w-9 shrink-0">
            <input
              type="checkbox"
              checked={taxWidgetsOnlyMode}
              className="peer sr-only"
              id="widget-master-tax-only"
              onChange={(e) => onTaxWidgetsOnlyChange(e.target.checked)}
            />
            <label
              htmlFor="widget-master-tax-only"
              className={`block h-5 w-9 cursor-pointer rounded-full transition-colors duration-200 ${
                taxWidgetsOnlyMode ? "bg-brand-primary" : "bg-[#ccd0d5]"
              }`}
            />
            <span
              className={`pointer-events-none absolute top-[2px] left-[2px] size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
                taxWidgetsOnlyMode ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>
      <ul className="border-border-primary space-y-0 rounded-lg border py-4">
        {sortedWidgets.map((widget) => {
          const isOn = !hiddenWidgetIds.has(widget.id);
          const displayName =
            widget.id === "lodgements" &&
            region === "AU" &&
            (stage === "ga" || stage === "ai")
              ? "Lodgements"
              : widget.name;
          return (
            <li
              key={widget.id}
              className="border-border-primary flex items-center justify-between border-b px-4 py-3 first:pt-0 last:border-b-0"
            >
              <span className="text-content-primary flex min-w-0 items-center gap-2 text-[15px]/[24px] font-bold">
                {displayName}
              </span>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  checked={isOn}
                  className="peer sr-only"
                  id={`widget-toggle-${widget.id}`}
                  onChange={(e) =>
                    onSetWidgetVisible(widget.id, e.target.checked)
                  }
                />
                <label
                  htmlFor={`widget-toggle-${widget.id}`}
                  className={`block h-5 w-9 cursor-pointer rounded-full transition-colors duration-200 ${
                    isOn ? "bg-brand-primary" : "bg-[#ccd0d5]"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute top-[2px] left-[2px] size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
                    isOn ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
