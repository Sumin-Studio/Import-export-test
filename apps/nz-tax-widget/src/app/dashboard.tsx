"use client";

import {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import dynamic from "next/dynamic";
import { Close } from "@/app/components/ui/icons";
import { RegionText } from "@/app/components/global/RegionText";
import { DashboardGreeting } from "@/app/components/global/DashboardGreeting";
import { useRegion } from "@/app/contexts/RegionContext";
import DraggableGrid from "@/app/contexts/DraggableGrid";
import {
  WidgetList,
  getSortedWidgetIdsForRegion,
} from "@/app/components/widgets/WidgetList";
import {
  filterIdsToNzGaOverviewIfApplicable,
  isWidgetIdOnNzOverviewForStage,
} from "@/app/lib/nzDashboardCanonical";
import { isTaxOnlyLayout } from "@/app/lib/taxBetaWidgetIds";
import {
  buildTaxOnlyOrderFromFullOrder,
  clearTaxOnlyWidgetOrder,
  loadTaxOnlyWidgetOrder,
  normalizeTaxOnlyWidgetOrder,
  saveTaxOnlyWidgetOrder,
} from "@/app/lib/dashboardTaxOnlyWidgetOrder";
import {
  clearWidgetOrder,
  loadWidgetOrder,
  mergeSavedWithBase,
  saveWidgetOrder,
} from "@/app/lib/dashboardWidgetOrder";
import {
  loadHiddenWidgets,
  saveHiddenWidgets,
} from "@/app/lib/dashboardHiddenWidgets";
import {
  appendSavedView,
  loadSavedViews,
  type SavedDashboardView,
} from "@/app/lib/dashboardSavedViews";
import {
  getDefaultHiddenWidgetIds,
  getHiddenWidgetIdsForAllWidgetScope,
  getTaxOnlyVisibleWidgetIdsForRegion,
  isNzInsightWidgetForcedHiddenForStage,
  reconcileSavedHiddenWidgetsWithStage,
} from "@/app/lib/dashboardDefaultHiddenWidgets";
import {
  readInitialPrototypeSettings,
  type PrototypeStageId,
} from "@/app/lib/prototypeSettings";
import { NZ_WIDGET_ORDER } from "@/app/lib/nzDashboardCanonical";
import { PROTOTYPE_EXCLUDED_WIDGET_IDS } from "@/app/lib/prototypeHiddenWidgets";
import {
  AU_TAX_ONLY_PRESET_LAYOUTS,
  AU_TAX_ONLY_PRESET_LAYOUTS_AGENTIC,
  isAuTaxOnlyDefaultFourTileSet,
} from "@/app/lib/auTaxDashboardLayout";
import {
  CustomizationContext,
  WidgetIdContext,
} from "@/app/contexts/DashboardWidgetCustomizationContext";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import { TailorPrototypeView } from "@/app/components/global/TailorPrototypeView";
import clsx from "clsx";

// Dynamically import Highcharts-based widgets (below the fold, ~99 KiB savings)
const TimeSummary = dynamic(
  () =>
    import("@/app/components/widgets").then((mod) => ({
      default: mod.TimeSummary,
    })),
  { ssr: false }
);
const BillableHours = dynamic(
  () =>
    import("@/app/components/widgets").then((mod) => ({
      default: mod.BillableHours,
    })),
  { ssr: false }
);
const AnnualTaxReturns = dynamic(
  () =>
    import("@/app/components/widgets").then((mod) => ({
      default: mod.AnnualTaxReturns,
    })),
  { ssr: false }
);
const ActivityStatements = dynamic(
  () =>
    import("@/app/components/widgets").then((mod) => ({
      default: mod.ActivityStatements,
    })),
  { ssr: false }
);
const Lodgements = dynamic(
  () =>
    import("@/app/components/widgets").then((mod) => ({
      default: mod.Lodgements,
    })),
  { ssr: false }
);
const WorkloadInsights = dynamic(
  () =>
    import("@/app/components/widgets").then((mod) => ({
      default: mod.WorkloadInsights,
    })),
  { ssr: false }
);

// Regular imports for non-Highcharts widgets (lighter, needed immediately)
import {
  BankRec,
  BankReconciliation,
  Jobs,
  BankFeedAlerts,
  TaxAlerts,
  QuickActions,
  XeroUpdates,
  Organisations,
  ClientContactInformation,
  NzTaxDueCountdown,
  NzGstTracker,
  NzClientComplianceHealth,
  UsEconomicNexusInsights,
} from "@/app/components/widgets";

interface GridItem {
  id: string;
  component: React.ReactNode;
  width: number;
  height: number;
  colSpan?: 1 | 2;
}

// Widget configuration types
type WidgetConfig = {
  id: string;
  type:
    | "BankRec"
    | "TimeSummary"
    | "BillableHours"
    | "BankReconciliation"
    | "Jobs"
    | "AnnualTaxReturns"
    | "BankFeedAlerts"
    | "TaxAlerts"
    | "ActivityStatements"
    | "QuickActions"
    | "XeroUpdates"
    | "Organisations"
    | "ClientContactInformation"
    | "Lodgements"
    | "WorkloadInsights"
    | "NzTaxDueCountdown"
    | "NzGstTracker"
    | "NzClientComplianceHealth"
    | "UsEconomicNexusInsights";
  props: Record<string, unknown>;
  width: number;
  height: number;
  colSpan?: 1 | 2;
  regions?: string[]; // Optional array of regions where this widget should be visible
};

// Widget IDs that are initially defined with colSpan: 2 and can be resized
const RESIZABLE_WIDGETS = new Set([
  "time-summary",
  "jobs",
  "annual-tax-returns",
  "returns-by-status",
  "us-1099-returns-pipeline",
  "returns-by-month-line",
  "return-by-type",
  "activity-statements",
  "favourite-xero-organisations",
]);

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

// Widget configurations - moved outside component to prevent recreation
const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    id: "quick-actions",
    type: "QuickActions",
    props: {},
    width: 440,
    height: 251,
    colSpan: 1,
  },
  {
    id: "jobs",
    type: "Jobs",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
  },
  {
    id: "lodgements",
    type: "Lodgements",
    props: {},
    width: 440,
    height: 251,
    colSpan: 1,
    regions: ["AU", "NZ"],
  },
  {
    id: "time-summary",
    type: "TimeSummary",
    props: {},
    width: 440,
    height: 522,
    colSpan: 2,
  },
  {
    id: "billable-hours",
    type: "BillableHours",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
  },
  {
    id: "bank-feed-alerts",
    type: "BankFeedAlerts",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
  },
  {
    id: "tax-alerts-compact",
    type: "TaxAlerts",
    props: { compact: true },
    width: 440,
    height: 251,
    colSpan: 1,
    regions: ["AU", "NZ", "UK", "USA", "REST_OF_WORLD"],
  },
  {
    id: "activity-statements",
    type: "ActivityStatements",
    props: {},
    width: 440,
    height: 522,
    colSpan: 2,
    regions: ["AU"], // Only show in Australia
  },
  {
    id: "annual-tax-returns",
    type: "AnnualTaxReturns",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
    /** Hidden in AU; UK uses returns-by-status only. NZ and RoW use this four-tile variant (not US). */
    regions: ["NZ", "REST_OF_WORLD"],
  },
  {
    id: "returns-by-status",
    type: "AnnualTaxReturns",
    props: {
      title: "Tax returns",
      showNoticesDifferentTile: false,
      overflowRadioGroupPrefix: "returns-by-status",
    },
    width: 440,
    height: 522,
    colSpan: 1,
    regions: ["AU", "NZ", "UK", "REST_OF_WORLD"],
  },
  {
    id: "us-economic-nexus-insights",
    type: "UsEconomicNexusInsights",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
    regions: ["USA"],
  },
  {
    id: "us-1099-returns-pipeline",
    type: "AnnualTaxReturns",
    props: {
      title: "1099s",
      showNoticesDifferentTile: false,
      overflowRadioGroupPrefix: "us-1099-returns-pipeline",
      us1099Pipeline: true,
    },
    width: 440,
    height: 522,
    colSpan: 1,
    regions: ["USA"],
  },
  {
    id: "returns-by-month-line",
    type: "WorkloadInsights",
    props: {
      initialViewMode: "monthLine",
      title: "Returns by month",
    },
    width: 440,
    height: 522,
    colSpan: 1,
    regions: ["NZ"],
  },
  {
    id: "return-by-type",
    type: "WorkloadInsights",
    props: {
      initialViewMode: "returnType",
      title: "Returns by type",
    },
    width: 440,
    height: 522,
    colSpan: 1,
    regions: ["NZ"],
  },
  {
    id: "bank-reconciliation",
    type: "BankReconciliation",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
  },
  {
    id: "client-contact-information",
    type: "ClientContactInformation",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
    regions: [], // Hidden in all regions
  },
  {
    id: "favourite-xero-organisations",
    type: "Organisations",
    props: {},
    width: 440,
    height: 522,
    colSpan: 2,
  },
  {
    id: "xero-updates",
    type: "XeroUpdates",
    props: {},
    width: 440,
    height: 251,
    colSpan: 1,
  },
  {
    id: "nz-tax-due-countdown",
    type: "NzTaxDueCountdown",
    props: {},
    width: 440,
    height: 251,
    colSpan: 1,
    regions: ["NZ"],
  },
  {
    id: "nz-gst-tracker",
    type: "NzGstTracker",
    props: {},
    width: 900,
    height: 522,
    colSpan: 2,
    regions: ["NZ"],
  },
  {
    id: "nz-client-compliance-health",
    type: "NzClientComplianceHealth",
    props: {},
    width: 440,
    height: 522,
    colSpan: 1,
    regions: ["NZ"],
  },
];

function isWidgetVisibleForRegion(
  widgetId: string,
  currentRegion: string,
  configs: WidgetConfig[]
): boolean {
  if (widgetId === "vat" && currentRegion === "USA") return false;
  const config = configs.find((c) => c.id === widgetId);
  if (!config?.regions) return true;
  return config.regions.includes(currentRegion);
}

/** Fresh copy of default widget configs (width/colSpan/props) for reset. */
function cloneDefaultWidgetConfigs(): WidgetConfig[] {
  return WIDGET_CONFIGS.map((c) => ({
    ...c,
    props: { ...c.props },
  }));
}

/**
 * Agentic: Tax alerts tile becomes full-height “Actions” (522px) in every region, like Jobs.
 */
function patchNzAiTaxAlertsCompact(
  configs: WidgetConfig[],
  _region: string,
  stage: PrototypeStageId
): WidgetConfig[] {
  return configs.map((c) => {
    if (c.id !== "tax-alerts-compact") return c;
    if (stage === "ai") {
      if (c.height === 522 && c.props.compact === false) return c;
      return { ...c, height: 522, props: { ...c.props, compact: false } };
    }
    if (c.height === 251 && c.props.compact === true) return c;
    return { ...c, height: 251, props: { ...c.props, compact: true } };
  });
}

function sortWidgetConfigsByRegion(
  configs: WidgetConfig[],
  currentRegion: string
): WidgetConfig[] {
  const order = WIDGET_ORDER_BY_REGION[currentRegion] || [];
  const orderMap = new Map(order.map((id, index) => [id, index]));
  return [...configs].sort((a, b) => {
    const aOrder = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bOrder = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });
}

/** Visible widget ids in region order — same as the default layout after reset. */
function widgetIdSetsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const id of a) {
    if (!b.has(id)) return false;
  }
  return true;
}

function getCanonicalVisibleOrderedIds(
  currentRegion: string,
  configs: WidgetConfig[],
  hiddenIds: Set<string>
): string[] {
  return sortWidgetConfigsByRegion(configs, currentRegion)
    .filter(
      (c) =>
        isWidgetVisibleForRegion(c.id, currentRegion, configs) &&
        !hiddenIds.has(c.id) &&
        !PROTOTYPE_EXCLUDED_WIDGET_IDS.has(c.id)
    )
    .map((c) => c.id);
}

function getInitialHiddenWidgetIdsForRegion(region: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  const loaded = loadHiddenWidgets(region);
  const { stage, tailorNzTaxDashboardRevealed } = readInitialPrototypeSettings();
  if (loaded !== null) {
    return new Set(
      reconcileSavedHiddenWidgetsWithStage(
        region,
        stage,
        loaded,
        tailorNzTaxDashboardRevealed
      )
    );
  }
  const defaults = getDefaultHiddenWidgetIds(region, stage);
  return new Set(
    reconcileSavedHiddenWidgetsWithStage(
      region,
      stage,
      defaults,
      tailorNzTaxDashboardRevealed
    )
  );
}

export default function Dashboard() {
  const { region } = useRegion();
  const {
    stage,
    displayMode,
    widgetScope,
    setWidgetScope,
    tailorNzTaxDashboardRevealed,
    consumeTailorDashboardEntrance,
  } = usePrototypeSettings();
  const [isCustomising, setIsCustomising] = useState(false);
  const [tailorEntranceReveal, setTailorEntranceReveal] = useState(false);

  const showNzTailorTaxDashboard =
    stage === "tailor" && region === "NZ" && tailorNzTaxDashboardRevealed;

  const [isOpen, setIsOpen] = useState(false);
  const [widgetConfigs, setWidgetConfigs] =
    useState<WidgetConfig[]>(WIDGET_CONFIGS);
  const [hiddenWidgetIds, setHiddenWidgetIds] = useState<Set<string>>(() =>
    getInitialHiddenWidgetIdsForRegion(region)
  );
  const hiddenWidgetIdsRef = useRef(hiddenWidgetIds);
  hiddenWidgetIdsRef.current = hiddenWidgetIds;

  const snapshotBeforeTaxOnlyRef = useRef<Set<string> | null>(null);
  /** Full visible widget order before Tax widgets only was turned on (restore when toggling off). */
  const orderedIdsSnapshotBeforeTaxOnlyRef = useRef<string[] | null>(null);

  const sortedWidgetIdsForRegion = useMemo(
    () =>
      getSortedWidgetIdsForRegion(
        region,
        stage,
        tailorNzTaxDashboardRevealed,
        widgetScope
      ),
    [region, stage, tailorNzTaxDashboardRevealed, widgetScope]
  );

  const taxOnlyVisibleSet = useMemo(
    () =>
      new Set(
        getTaxOnlyVisibleWidgetIdsForRegion(
          region,
          stage,
          sortedWidgetIdsForRegion,
          (id) => isWidgetVisibleForRegion(id, region, widgetConfigs),
          tailorNzTaxDashboardRevealed
        )
      ),
    [region, stage, sortedWidgetIdsForRegion, widgetConfigs, tailorNzTaxDashboardRevealed]
  );

  const taxWidgetsOnlyActive = useMemo(
    () =>
      isTaxOnlyLayout(
        hiddenWidgetIds,
        sortedWidgetIdsForRegion,
        taxOnlyVisibleSet
      ),
    [hiddenWidgetIds, sortedWidgetIdsForRegion, taxOnlyVisibleSet]
  );

  useEffect(() => {
    const loaded = loadHiddenWidgets(region);
    if (loaded !== null) {
      const next = reconcileSavedHiddenWidgetsWithStage(
        region,
        stage,
        loaded,
        tailorNzTaxDashboardRevealed
      );
      setHiddenWidgetIds(new Set(next));
      saveHiddenWidgets(region, next);
    } else {
      const defaults = getDefaultHiddenWidgetIds(region, stage);
      const next = reconcileSavedHiddenWidgetsWithStage(
        region,
        stage,
        defaults,
        tailorNzTaxDashboardRevealed
      );
      setHiddenWidgetIds(new Set(next));
      saveHiddenWidgets(region, next);
    }
    snapshotBeforeTaxOnlyRef.current = null;
  }, [region, stage, tailorNzTaxDashboardRevealed]);

  /** Agentic: Tax alerts (compact) → tall “Actions” tile to match grid (all regions). */
  useEffect(() => {
    setWidgetConfigs((prev) => {
      const t = prev.find((c) => c.id === "tax-alerts-compact");
      if (!t) return prev;
      const wantTall = stage === "ai";
      const ok = wantTall
        ? t.height === 522 && t.props.compact === false
        : t.height === 251 && t.props.compact === true;
      if (ok) return prev;
      return patchNzAiTaxAlertsCompact(prev, region, stage);
    });
  }, [region, stage]);

  useEffect(() => {
    if (
      !isTaxOnlyLayout(
        hiddenWidgetIds,
        sortedWidgetIdsForRegion,
        taxOnlyVisibleSet
      )
    ) {
      snapshotBeforeTaxOnlyRef.current = null;
      orderedIdsSnapshotBeforeTaxOnlyRef.current = null;
    }
  }, [hiddenWidgetIds, sortedWidgetIdsForRegion, taxOnlyVisibleSet]);

  // Handle column span toggle
  const handleToggleColSpan = (widgetId: string) => {
    setWidgetConfigs((prev) =>
      prev.map((config) => {
        if (config.id === widgetId) {
          const newColSpan = config.colSpan === 1 ? 2 : 1;
          return {
            ...config,
            colSpan: newColSpan,
            width: newColSpan === 2 ? 900 : 440, // Update width based on span
          };
        }
        return config;
      })
    );
  };

  function wrapWithWidgetId(
    config: WidgetConfig,
    node: ReactNode
  ): ReactNode {
    return (
      <WidgetIdContext.Provider value={config.id}>{node}</WidgetIdContext.Provider>
    );
  }

  /**
   * Renders one dashboard tile. The enclosing `Dashboard` holds `stage` from
   * `usePrototypeSettings()` — use it here when XPAC-specific variants diverge.
   */
  function WidgetComponent({ config }: { config: WidgetConfig }) {
    const { isCustomising: customising } = useContext(CustomizationContext);
    const commonProps = {
      ...config.props,
      isCustomising: customising,
      onToggleColSpan: () => handleToggleColSpan(config.id),
      colSpan: config.colSpan || 1,
      canToggleSize: RESIZABLE_WIDGETS.has(config.id),
    };

    switch (config.type) {
      case "BankRec":
        return wrapWithWidgetId(config, <BankRec {...commonProps} />);
      case "TimeSummary":
        return wrapWithWidgetId(config, <TimeSummary {...commonProps} />);
      case "BillableHours":
        return wrapWithWidgetId(config, <BillableHours {...commonProps} />);
      case "BankReconciliation":
        return wrapWithWidgetId(config, <BankReconciliation {...commonProps} />);
      case "Jobs":
        return wrapWithWidgetId(config, <Jobs {...commonProps} />);
      case "AnnualTaxReturns":
        return wrapWithWidgetId(config, <AnnualTaxReturns {...commonProps} />);
      case "BankFeedAlerts":
        return wrapWithWidgetId(config, <BankFeedAlerts {...commonProps} />);
      case "TaxAlerts":
        return wrapWithWidgetId(config, <TaxAlerts {...commonProps} />);
      case "ActivityStatements":
        return wrapWithWidgetId(config, <ActivityStatements {...commonProps} />);
      case "QuickActions":
        return wrapWithWidgetId(config, <QuickActions {...commonProps} />);
      case "XeroUpdates":
        return wrapWithWidgetId(config, <XeroUpdates {...commonProps} />);
      case "Organisations":
        return wrapWithWidgetId(config, <Organisations {...commonProps} />);
      case "ClientContactInformation":
        return wrapWithWidgetId(
          config,
          <ClientContactInformation {...commonProps} />
        );
      case "Lodgements":
        return wrapWithWidgetId(config, <Lodgements {...commonProps} />);
      case "WorkloadInsights":
        return wrapWithWidgetId(config, <WorkloadInsights {...commonProps} />);
      case "NzTaxDueCountdown":
        return wrapWithWidgetId(
          config,
          <NzTaxDueCountdown {...commonProps} />
        );
      case "NzGstTracker":
        return wrapWithWidgetId(config, <NzGstTracker {...commonProps} />);
      case "NzClientComplianceHealth":
        return wrapWithWidgetId(
          config,
          <NzClientComplianceHealth {...commonProps} />
        );
      case "UsEconomicNexusInsights":
        return wrapWithWidgetId(
          config,
          <UsEconomicNexusInsights {...commonProps} />
        );
      default:
        return wrapWithWidgetId(config, <div>Unknown widget type</div>);
    }
  }

  const sortWidgetsByRegion = (
    configs: WidgetConfig[],
    currentRegion: string
  ): WidgetConfig[] =>
    sortWidgetConfigsByRegion(configs, currentRegion);

  // Create widget components without Suspense boundaries
  const widgets = useMemo(() => {
    // Sort widgets based on current region
    const sortedConfigs = sortWidgetsByRegion(widgetConfigs, region);

    return sortedConfigs.map((config) => ({
      id: config.id,
      component: <WidgetComponent key={config.id} config={config} />,
      width: config.width,
      height: config.height,
      colSpan: config.colSpan,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetConfigs, region, stage]);

  const visibleBaseIds = useMemo(
    () =>
      widgets
        .filter(
          (w) =>
            isWidgetVisibleForRegion(w.id, region, widgetConfigs) &&
            !hiddenWidgetIds.has(w.id) &&
            !PROTOTYPE_EXCLUDED_WIDGET_IDS.has(w.id) &&
            !isNzInsightWidgetForcedHiddenForStage(
              region,
              stage,
              w.id,
              tailorNzTaxDashboardRevealed
            ) &&
            isWidgetIdOnNzOverviewForStage(w.id, region, stage, widgetScope)
        )
        .map((w) => w.id),
    [
      widgets,
      region,
      widgetConfigs,
      hiddenWidgetIds,
      stage,
      tailorNzTaxDashboardRevealed,
      widgetScope,
    ]
  );

  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const loadedRegionRef = useRef<string | null>(null);

  const handleTaxWidgetsOnlyToggle = useCallback(
    (on: boolean) => {
      if (!on) return;
      const fullOrder = mergeSavedWithBase(
        orderedIds.length > 0 ? orderedIds : visibleBaseIds,
        visibleBaseIds
      );
      orderedIdsSnapshotBeforeTaxOnlyRef.current = fullOrder;
      const taxOnlyOrder = buildTaxOnlyOrderFromFullOrder(
        region,
        fullOrder,
        sortedWidgetIdsForRegion,
        taxOnlyVisibleSet
      );
      setHiddenWidgetIds((prev) => {
        snapshotBeforeTaxOnlyRef.current = new Set(prev);
        const nextHidden = new Set(
          sortedWidgetIdsForRegion.filter((id) => !taxOnlyVisibleSet.has(id))
        );
        saveHiddenWidgets(region, [...nextHidden]);
        return nextHidden;
      });
      setOrderedIds(taxOnlyOrder);
      saveTaxOnlyWidgetOrder(region, taxOnlyOrder);
    },
    [
      region,
      sortedWidgetIdsForRegion,
      orderedIds,
      visibleBaseIds,
      taxOnlyVisibleSet,
    ]
  );

  const handleTaxWidgetsOnlyToggleRef = useRef(handleTaxWidgetsOnlyToggle);
  handleTaxWidgetsOnlyToggleRef.current = handleTaxWidgetsOnlyToggle;

  /** Keep widget scope in sync without listing `hiddenWidgetIds` / toggle in deps (avoids update loops). */
  useEffect(() => {
    const hid = hiddenWidgetIdsRef.current;
    const applyTaxOnly = handleTaxWidgetsOnlyToggleRef.current;

    if (widgetScope === "tax") {
      if (
        !isTaxOnlyLayout(
          hid,
          sortedWidgetIdsForRegion,
          taxOnlyVisibleSet
        )
      ) {
        applyTaxOnly(true);
      }
      return;
    }

    const targetHiddenArr = getHiddenWidgetIdsForAllWidgetScope(
      region,
      stage,
      (id) => isWidgetVisibleForRegion(id, region, widgetConfigs)
    );
    const targetHidden = new Set(targetHiddenArr);
    const inTaxOnlyView = isTaxOnlyLayout(
      hid,
      sortedWidgetIdsForRegion,
      taxOnlyVisibleSet
    );

    if (inTaxOnlyView) {
      clearWidgetOrder(region);
      clearTaxOnlyWidgetOrder(region);
      snapshotBeforeTaxOnlyRef.current = null;
      orderedIdsSnapshotBeforeTaxOnlyRef.current = null;
      setHiddenWidgetIds((prev) =>
        widgetIdSetsEqual(prev, targetHidden) ? prev : targetHidden
      );
      saveHiddenWidgets(region, targetHiddenArr);
      const canonical = filterIdsToNzGaOverviewIfApplicable(
        region,
        stage,
        getCanonicalVisibleOrderedIds(region, widgetConfigs, targetHidden),
        widgetScope
      );
      setOrderedIds(canonical);
      saveWidgetOrder(region, canonical);
      return;
    }

    let optionalTaxHidden = true;
    for (const id of targetHidden) {
      if (!hid.has(id)) {
        optionalTaxHidden = false;
        break;
      }
    }
    if (optionalTaxHidden) {
      return;
    }

    const nextHidden = new Set(hid);
    for (const id of targetHidden) {
      nextHidden.add(id);
    }
    setHiddenWidgetIds((prev) =>
      widgetIdSetsEqual(prev, nextHidden) ? prev : nextHidden
    );
    saveHiddenWidgets(region, [...nextHidden]);
    setOrderedIds((prev) => prev.filter((id) => !nextHidden.has(id)));
  }, [
    widgetScope,
    region,
    stage,
    sortedWidgetIdsForRegion,
    widgetConfigs,
    taxOnlyVisibleSet,
  ]);

  useLayoutEffect(() => {
    if (!showNzTailorTaxDashboard) {
      setTailorEntranceReveal(false);
      return;
    }
    if (!consumeTailorDashboardEntrance()) {
      return;
    }
    setTailorEntranceReveal(true);
    const tid = window.setTimeout(() => setTailorEntranceReveal(false), 920);
    return () => window.clearTimeout(tid);
  }, [showNzTailorTaxDashboard, consumeTailorDashboardEntrance]);

  const hideWidget = useCallback(
    (id: string) => {
      setHiddenWidgetIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        saveHiddenWidgets(region, [...next]);
        return next;
      });
      setOrderedIds((prev) => prev.filter((x) => x !== id));
    },
    [region]
  );

  const setWidgetVisible = useCallback(
    (widgetId: string, visible: boolean) => {
      setHiddenWidgetIds((prev) => {
        const next = new Set(prev);
        if (visible) next.delete(widgetId);
        else next.add(widgetId);
        saveHiddenWidgets(region, [...next]);
        return next;
      });
      if (!visible) {
        setOrderedIds((prev) => prev.filter((x) => x !== widgetId));
      }
    },
    [region]
  );

  useEffect(() => {
    if (loadedRegionRef.current === region) {
      setOrderedIds((prev) => {
        const merged = mergeSavedWithBase(prev, visibleBaseIds);
        return taxWidgetsOnlyActive
          ? normalizeTaxOnlyWidgetOrder(
              region,
              merged,
              sortedWidgetIdsForRegion,
              taxOnlyVisibleSet
            )
          : merged;
      });
      return;
    }
    loadedRegionRef.current = region;
    const taxOnly = isTaxOnlyLayout(
      hiddenWidgetIds,
      sortedWidgetIdsForRegion,
      taxOnlyVisibleSet
    );
    const saved = loadWidgetOrder(region);
    const taxSaved = loadTaxOnlyWidgetOrder(region);

    if (taxOnly) {
      const merged =
        taxSaved && taxSaved.length
          ? mergeSavedWithBase(taxSaved, visibleBaseIds)
          : [...visibleBaseIds];
      setOrderedIds(
        normalizeTaxOnlyWidgetOrder(
          region,
          merged,
          sortedWidgetIdsForRegion,
          taxOnlyVisibleSet
        )
      );
    } else {
      setOrderedIds(
        saved && saved.length
          ? mergeSavedWithBase(saved, visibleBaseIds)
          : [...visibleBaseIds]
      );
    }
  }, [
    region,
    visibleBaseIds,
    hiddenWidgetIds,
    sortedWidgetIdsForRegion,
    taxWidgetsOnlyActive,
    taxOnlyVisibleSet,
  ]);

  const filteredWidgets = useMemo(() => {
    const byId = new Map(widgets.map((w) => [w.id, w]));
    const merged =
      orderedIds.length > 0
        ? mergeSavedWithBase(orderedIds, visibleBaseIds)
        : visibleBaseIds;
    const ids = taxWidgetsOnlyActive
      ? normalizeTaxOnlyWidgetOrder(
          region,
          merged,
          sortedWidgetIdsForRegion,
          taxOnlyVisibleSet
        )
      : merged;
    const list = ids
      .map((id) => byId.get(id))
      .filter(Boolean) as GridItem[];

    const auTaxFourTileLayout =
      taxWidgetsOnlyActive &&
      region === "AU" &&
      isAuTaxOnlyDefaultFourTileSet(new Set(list.map((w) => w.id)));

    if (auTaxFourTileLayout) {
      return list.map((item) =>
        item.id === "activity-statements"
          ? { ...item, width: 440, colSpan: 1 as const }
          : item
      );
    }

    return list;
  }, [
    widgets,
    orderedIds,
    visibleBaseIds,
    taxWidgetsOnlyActive,
    sortedWidgetIdsForRegion,
    region,
    taxOnlyVisibleSet,
  ]);

  const auTaxPresetLayouts = useMemo(() => {
    if (!taxWidgetsOnlyActive || region !== "AU") return null;
    const ids = new Set(filteredWidgets.map((w) => w.id));
    if (!isAuTaxOnlyDefaultFourTileSet(ids)) return null;
    return stage === "ai"
      ? AU_TAX_ONLY_PRESET_LAYOUTS_AGENTIC
      : AU_TAX_ONLY_PRESET_LAYOUTS;
  }, [taxWidgetsOnlyActive, region, filteredWidgets, stage]);

  const handleSave = (): void => {
    const merged =
      orderedIds.length > 0
        ? mergeSavedWithBase(orderedIds, visibleBaseIds)
        : visibleBaseIds;
    const toSave = taxWidgetsOnlyActive
      ? normalizeTaxOnlyWidgetOrder(
          region,
          merged,
          sortedWidgetIdsForRegion,
          taxOnlyVisibleSet
        )
      : merged;
    if (taxWidgetsOnlyActive) {
      saveTaxOnlyWidgetOrder(region, toSave);
    } else {
      saveWidgetOrder(region, toSave);
    }
    saveHiddenWidgets(region, [...hiddenWidgetIds]);
    setIsCustomising(false);
  };

  const [saveViewStatus, setSaveViewStatus] = useState<string | null>(null);
  useEffect(() => {
    if (!saveViewStatus) return;
    const t = window.setTimeout(() => setSaveViewStatus(null), 4000);
    return () => window.clearTimeout(t);
  }, [saveViewStatus]);

  const [saveViewDialogOpen, setSaveViewDialogOpen] = useState(false);
  const [saveViewNameDraft, setSaveViewNameDraft] = useState("");
  const saveViewInputRef = useRef<HTMLInputElement>(null);

  const openSaveViewDialog = useCallback((): void => {
    const existingCount = loadSavedViews(region).length;
    setSaveViewNameDraft(`View ${existingCount + 1}`);
    setSaveViewDialogOpen(true);
  }, [region]);

  useEffect(() => {
    if (!saveViewDialogOpen) return;
    const id = window.requestAnimationFrame(() => {
      saveViewInputRef.current?.focus();
      saveViewInputRef.current?.select();
    });
    return () => window.cancelAnimationFrame(id);
  }, [saveViewDialogOpen]);

  const commitSaveNamedView = useCallback((): void => {
    const trimmed = saveViewNameDraft.trim();
    if (!trimmed) return;

    const merged =
      orderedIds.length > 0
        ? mergeSavedWithBase(orderedIds, visibleBaseIds)
        : visibleBaseIds;
    const toSaveOrder = taxWidgetsOnlyActive
      ? normalizeTaxOnlyWidgetOrder(
          region,
          merged,
          sortedWidgetIdsForRegion,
          taxOnlyVisibleSet
        )
      : merged;

    const view: SavedDashboardView = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `view-${Date.now()}`,
      name: trimmed,
      savedAt: Date.now(),
      region,
      stage,
      orderedIds: toSaveOrder,
      hiddenWidgetIds: [...hiddenWidgetIds],
      taxWidgetsOnly: taxWidgetsOnlyActive,
      widgetScope,
      widgetConfigs: widgetConfigs.map((c) => ({
        id: c.id,
        type: c.type,
        props: c.props,
        width: c.width,
        height: c.height,
        colSpan: c.colSpan,
        regions: c.regions,
      })),
    };
    appendSavedView(region, view);
    setSaveViewStatus(`Layout saved as “${trimmed}”.`);
    setSaveViewDialogOpen(false);
  }, [
    saveViewNameDraft,
    region,
    stage,
    orderedIds,
    visibleBaseIds,
    hiddenWidgetIds,
    taxWidgetsOnlyActive,
    widgetScope,
    widgetConfigs,
    sortedWidgetIdsForRegion,
    taxOnlyVisibleSet,
  ]);

  const handleResetToDefault = useCallback((): void => {
    clearWidgetOrder(region);
    clearTaxOnlyWidgetOrder(region);
    const defaultHidden = getDefaultHiddenWidgetIds(region, stage);
    const reconciledHidden = reconcileSavedHiddenWidgetsWithStage(
      region,
      stage,
      defaultHidden,
      tailorNzTaxDashboardRevealed
    );
    const nextHidden = new Set(reconciledHidden);
    setHiddenWidgetIds(nextHidden);
    saveHiddenWidgets(region, reconciledHidden);
    const freshConfigs = patchNzAiTaxAlertsCompact(
      cloneDefaultWidgetConfigs(),
      region,
      stage
    );
    setWidgetConfigs(freshConfigs);
    const canonical = filterIdsToNzGaOverviewIfApplicable(
      region,
      stage,
      getCanonicalVisibleOrderedIds(region, freshConfigs, nextHidden),
      widgetScope
    );
    const taxOnlyVisibleFresh = new Set(
      getTaxOnlyVisibleWidgetIdsForRegion(
        region,
        stage,
        sortedWidgetIdsForRegion,
        (id) => isWidgetVisibleForRegion(id, region, freshConfigs),
        tailorNzTaxDashboardRevealed
      )
    );
    setOrderedIds(
      isTaxOnlyLayout(nextHidden, sortedWidgetIdsForRegion, taxOnlyVisibleFresh)
        ? normalizeTaxOnlyWidgetOrder(
            region,
            canonical,
            sortedWidgetIdsForRegion,
            taxOnlyVisibleFresh
          )
        : canonical
    );
  }, [
    region,
    stage,
    sortedWidgetIdsForRegion,
    tailorNzTaxDashboardRevealed,
    widgetScope,
  ]);

  const showMainDashboardGrid =
    region !== "NZ" || stage !== "tailor" || tailorNzTaxDashboardRevealed;

  /** Save view: Tailor stage only (hidden on i3 (XPAC), GA, and Agentic). */
  const showSaveViewForStage = stage === "tailor";

  useEffect(() => {
    if (!showSaveViewForStage) setSaveViewDialogOpen(false);
  }, [showSaveViewForStage]);

  return (
    <>
      <div
        className={clsx(displayMode === "highlight" && "grayscale")}
      >
        <DashboardGreeting />
        {showNzTailorTaxDashboard ? (
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Your tax overview is ready.
          </p>
        ) : null}
        {saveViewStatus ? (
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {saveViewStatus}
          </p>
        ) : null}
        {stage === "tailor" && region === "NZ" && !tailorNzTaxDashboardRevealed ? (
          <TailorPrototypeView />
        ) : null}
        {showMainDashboardGrid ? (
        <div className="container mx-auto overflow-x-auto scroll-smooth px-5 lg:overflow-x-visible lg:px-0">
        <div className="mb-2 flex items-center justify-between gap-3 lg:mb-7">
          <div className="flex gap-3">
            <h2 className="text-[19px]/[32px] font-bold lg:text-[21px]/[32px]">
              Your overview
            </h2>
          </div>
          {isCustomising ? (
            <div className="flex gap-3">
              <button
                aria-label="Reset to default layout"
                className="transtion-all text-content-secondary hover:text-content-primary flex size-8 flex-none cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-[13px]/[16px] font-normal duration-200 ease-in-out hover:bg-[rgba(0,10,30,.05)] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                onClick={handleResetToDefault}
                type="button"
              >
                <span className="hidden lg:flex">Reset layout</span>
              </button>
              <div className="relative">
                <button
                  aria-label="Add widget"
                  className="transtion-all text-brand-primary z-10 flex size-8 flex-none cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-[13px]/[20px] font-bold duration-200 ease-in-out hover:bg-[rgba(0,10,30,.05)] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  type="button"
                >
                  <svg
                    fill="none"
                    height="12"
                    viewBox="0 0 12 12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 5H12V7H7V12H5V7H0V5H5V0H7V5Z" fill="#3376c2" />
                  </svg>
                  <span className="hidden lg:flex">Add widget</span>
                </button>
                {/* Show the hint to the right of the Add widget button on first customise */}
                {/* <GridHintPopover
                  openOnMount
                  containerClassName="absolute left-0 top-0 w-px"
                /> */}
              </div>
              <button
                aria-label="Save dashboard"
                className="transtion-all bg-brand-primary flex size-8 flex-none cursor-pointer items-center justify-center gap-2 rounded-full text-[13px]/[20px] font-bold text-white duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                onClick={handleSave}
                type="button"
              >
                <svg
                  fill="none"
                  height="10"
                  viewBox="0 0 13 10"
                  width="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 5.714L1.444 4.286L4.334 7.143L11.555 0L13 1.429L4.333 10L0 5.714Z"
                    fill="white"
                  />
                </svg>
                <span className="hidden lg:flex">Save</span>
              </button>
              <Dialog
                transition
                className="fixed inset-0 z-60 flex w-screen items-center justify-center bg-black/70 p-4 opacity-100 transition-all duration-200 ease-in-out data-closed:opacity-0"
                onClose={() => {
                  setIsOpen(false);
                }}
                open={isOpen}
                aria-labelledby="widget-dialog-title"
                aria-describedby="widget-dialog-description"
              >
                <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto p-4">
                  <DialogPanel className="relative z-10 max-h-[90vh] w-[400px] overflow-y-auto rounded-[10px] bg-white">
                    <div className="sticky top-0 z-10 mb-4 flex h-16 w-full items-center justify-between bg-white pr-3 pl-5">
                      <h2
                        id="widget-dialog-title"
                        className="text-xl font-bold"
                      >
                        Show and hide widgets
                      </h2>
                      <button
                        className="hover:bg-background-primary flex size-10 items-center justify-center rounded-full"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        type="button"
                        aria-label="Close dialog"
                      >
                        <span className="sr-only">Close</span>
                        <Close className="text-[#5a606c]" />
                      </button>
                    </div>
                    <div id="widget-dialog-description" className="sr-only">
                      Dialog to add or remove widgets from your dashboard
                    </div>
                    <WidgetList
                      hiddenWidgetIds={hiddenWidgetIds}
                      onSetWidgetVisible={setWidgetVisible}
                      taxWidgetsOnlyMode={taxWidgetsOnlyActive}
                      onTaxWidgetsOnlyChange={(on) =>
                        setWidgetScope(on ? "tax" : "all")
                      }
                    />

                    <div className="border-border-secondary text-content-secondary sticky bottom-0 z-10 border-t bg-white px-5 py-4 text-[13px]/[20px]">
                      Turn widgets on to add them back to your overview. Choose
                      Save on the dashboard when you’re done customising.
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          ) : (
            <div className="flex flex-none items-center gap-2">
              {showSaveViewForStage ? (
                <button
                  aria-label="Save current layout as a named view"
                  className="transtion-all text-brand-primary flex size-8 flex-none cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-[13px]/[20px] font-bold duration-200 ease-in-out hover:bg-[rgba(0,10,30,.05)] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                  onClick={openSaveViewDialog}
                  type="button"
                >
                  <span className="lg:hidden text-[11px] leading-none font-bold">
                    Save
                  </span>
                  <span className="hidden lg:flex">Save view</span>
                </button>
              ) : null}
              <button
                aria-label={
                  region === "USA" ? "Customize dashboard" : "Customise dashboard"
                }
                className="transtion-all text-brand-primary flex size-8 flex-none cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-[13px]/[20px] font-bold duration-200 ease-in-out hover:bg-[rgba(0,10,30,.05)] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                onClick={() => {
                  setIsCustomising(true);
                }}
                type="button"
              >
                <svg
                  fill="none"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M10.085 7H1v1h9.085a1.5 1.5 0 0 0 2.83 0H15V7h-2.085a1.5 1.5 0 0 0-2.83 0m-7 4H1v1h2.085a1.5 1.5 0 0 0 2.83 0H15v-1H5.915a1.5 1.5 0 0 0-2.83 0m0-8H1v1h2.085a1.5 1.5 0 0 0 2.83 0H15V3H5.915a1.5 1.5 0 0 0-2.83 0"
                    fill="#0078C8"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="hidden lg:flex">
                  {region === "USA" ? "Customize" : "Customise"}
                </span>
              </button>
            </div>
          )}
        </div>
        <Dialog
          transition
          className="fixed inset-0 z-60 flex w-screen items-center justify-center bg-black/70 p-4 opacity-100 transition-all duration-200 ease-in-out data-closed:opacity-0"
          onClose={() => setSaveViewDialogOpen(false)}
          open={saveViewDialogOpen && showSaveViewForStage}
          aria-labelledby="save-view-dialog-title"
          aria-describedby="save-view-dialog-description"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto p-4">
            <DialogPanel className="relative z-10 w-full max-w-[400px] rounded-[10px] bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-[rgba(0,10,30,.08)] px-5 py-4">
                <h2
                  id="save-view-dialog-title"
                  className="text-xl font-bold text-content-primary"
                >
                  Save view
                </h2>
                <button
                  className="hover:bg-background-primary flex size-10 flex-none items-center justify-center rounded-full"
                  onClick={() => setSaveViewDialogOpen(false)}
                  type="button"
                  aria-label="Close dialog"
                >
                  <span className="sr-only">Close</span>
                  <Close className="text-[#5a606c]" />
                </button>
              </div>
              <p id="save-view-dialog-description" className="sr-only">
                Name and save a snapshot of your current dashboard layout.
              </p>
              <form
                className="px-5 pt-4 pb-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  commitSaveNamedView();
                }}
              >
                <label
                  className="text-content-secondary mb-2 block text-[13px]/[20px] font-semibold"
                  htmlFor="save-view-name"
                >
                  View name
                </label>
                <input
                  ref={saveViewInputRef}
                  autoComplete="off"
                  className="border-border-secondary text-content-primary focus:border-brand-primary focus:ring-brand-primary/20 mb-6 w-full rounded-lg border px-3 py-2 text-[15px]/[24px] outline-none focus:ring-2"
                  id="save-view-name"
                  onChange={(e) => setSaveViewNameDraft(e.target.value)}
                  value={saveViewNameDraft}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="text-brand-primary hover:bg-[rgba(0,10,30,.05)] cursor-pointer rounded-full px-4 py-2 text-[13px]/[20px] font-bold"
                    onClick={() => setSaveViewDialogOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-brand-primary hover:border-[#0073BF] hover:bg-[#0073BF] cursor-pointer rounded-full border border-transparent px-4 py-2 text-[13px]/[20px] font-bold text-white"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
        ) : null}
      </div>

      {showMainDashboardGrid ? (
      <CustomizationContext.Provider
        value={{ isCustomising, onRemoveWidget: hideWidget }}
      >
        <div className="container mx-auto mb-10 min-h-screen overflow-x-auto scroll-smooth px-5 lg:overflow-x-visible lg:px-0">
          <DraggableGrid
            isCustomising={isCustomising}
            items={filteredWidgets}
            presetLayouts={auTaxPresetLayouts}
            tailorEntranceReveal={tailorEntranceReveal}
            onItemsChange={(items) => {
              const ids = items.map((item) => item.id);
              setOrderedIds(
                taxWidgetsOnlyActive
                  ? normalizeTaxOnlyWidgetOrder(
                      region,
                      ids,
                      sortedWidgetIdsForRegion,
                      taxOnlyVisibleSet
                    )
                  : ids
              );
            }}
            onSave={handleSave}
            onToggleColSpan={(itemId) => {
              handleToggleColSpan(itemId);
            }}
          />
        </div>
      </CustomizationContext.Provider>
      ) : null}
    </>
  );
}
