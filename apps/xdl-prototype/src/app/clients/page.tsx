"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  MOCK_CLIENTS,
  INITIAL_FILTER_STATE,
  useFilteredClients,
  type FilterState,
  type SortKey,
  type Client,
} from "@/lib/data-store";
import {
  getCustomViews,
  addCustomView,
  updateCustomView,
  deleteCustomView,
  type CustomView,
  type ReadinessScope,
} from "@/lib/custom-views";
import {
  defaultGoal,
  defaultPeriod,
  defaultSortKey,
  type DashboardMode,
} from "@/lib/dashboard-modes";
import {
  getColumnsForMode,
  pinClientNameFirst,
  pinClientNameFirstIds,
  type ColumnConfig,
  type ColumnId,
} from "@/lib/dashboard-columns";
import {
  DashboardHeader,
  BooksCard,
  ClientTable,
  QuickViewSheet,
  EmptyState,
} from "@/components/dashboard";
import type { ViewTab } from "@/components/dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  parseSearchParamsIntoClientState,
  type ClientsSearchParams,
} from "@/lib/clients-route";
import {
  CLIENTS_TABLE_PREFS_KEY,
  resolveClientsTablePrefs,
  visibleIdsForMode,
} from "@/lib/clients-table-prefs";

const DEFAULT_MODE: DashboardMode = "crm";

function getReadinessScope(viewTab: ViewTab, customViews: CustomView[]): ReadinessScope {
  if (viewTab === "all") return "all";
  if (viewTab === "incomplete") return "incomplete";
  if (viewTab === "ready") return "ready";
  const view = customViews.find((v) => v.id === viewTab);
  return view?.readinessScope ?? "incomplete";
}

function searchParamsToObject(searchParams: ReturnType<typeof useSearchParams>): ClientsSearchParams {
  const params: ClientsSearchParams = {};
  const m = searchParams.get("mode"); if (m) params.mode = m;
  const v = searchParams.get("view"); if (v && (v === "all" || v === "ready" || v === "incomplete")) params.view = v;
  const r = searchParams.get("readiness"); if (r) params.readiness = r;
  const s = searchParams.get("search"); if (s) params.search = s;
  const p = searchParams.get("partner"); if (p) params.partner = p;
  return params;
}

function ClientsPageContent() {
  const searchParams = useSearchParams();
  const parsed = useMemo(
    () => parseSearchParamsIntoClientState(searchParamsToObject(searchParams)),
    [searchParams]
  );

  const [mode, setMode] = useState<DashboardMode>(() => parsed.mode);
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const base: FilterState = {
      ...INITIAL_FILTER_STATE,
      goal: defaultGoal(parsed.mode),
      period: defaultPeriod(parsed.mode),
      sortKey: defaultSortKey(parsed.mode),
      sortDirection: "asc",
    };
    const partial = parsed.filterState;
    if (partial?.searchQuery !== undefined) base.searchQuery = partial.searchQuery;
    if (partial?.readinessTiers?.length) base.readinessTiers = partial.readinessTiers;
    if (partial?.partners?.length) base.partners = partial.partners;
    return base;
  });
  const [viewTab, setViewTab] = useState<ViewTab>(() => parsed.viewTab);
  const [customViews, setCustomViews] = useState<CustomView[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [quickViewClient, setQuickViewClient] = useState<Client | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [columnPrefs, setColumnPrefs] = useState<
    Record<string, { order: ColumnId[]; hidden?: ColumnId[]; visible?: ColumnId[] }>
  >({});
  const [createViewModalOpen, setCreateViewModalOpen] = useState(false);

  useEffect(() => {
    setCustomViews(getCustomViews());
  }, []);

  useEffect(() => {
    const next = searchParamsToObject(searchParams);
    if (!next.mode && !next.view && !next.readiness && !next.search && !next.partner) return;
    const p = parseSearchParamsIntoClientState(next);
    setMode(p.mode);
    setViewTab(p.viewTab);
    setFilterState((prev) => {
      const base = { ...prev, goal: defaultGoal(p.mode), period: defaultPeriod(p.mode), sortKey: defaultSortKey(p.mode), sortDirection: "asc" as const };
      const partial = p.filterState;
      if (partial?.searchQuery !== undefined) base.searchQuery = partial.searchQuery;
      if (partial?.readinessTiers?.length) base.readinessTiers = partial.readinessTiers;
      if (partial?.partners?.length) base.partners = partial.partners;
      return base;
    });
    setPage(1);
  }, [searchParams]);

  const filteredByFilters = useFilteredClients(MOCK_CLIENTS, filterState);
  const readinessScope = getReadinessScope(viewTab, customViews);

  const filteredClients = useMemo(() => {
    if (readinessScope === "all") return filteredByFilters;
    if (readinessScope === "ready") return filteredByFilters.filter((c) => c.readinessTier === "ready");
    return filteredByFilters.filter((c) => c.readinessTier !== "ready");
  }, [filteredByFilters, readinessScope]);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filterState.searchQuery.trim()) n++;
    if (filterState.readinessTiers.length) n++;
    if (filterState.partners.length) n++;
    if (filterState.serviceLines.length) n++;
    if (filterState.nexusRisk.length) n++;
    if (filterState.complexityTiers.length) n++;
    if (filterState.bottleneckOwners.length) n++;
    if (filterState.goal) n++;
    if (filterState.period) n++;
    return n;
  }, [filterState]);

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
    setPage(1);
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => updateFilters({ searchQuery: value }),
    [updateFilters]
  );

  const handleSort = useCallback((key: SortKey, direction?: "asc" | "desc") => {
    setFilterState((prev) => ({
      ...prev,
      sortKey: key,
      sortDirection:
        direction ?? (prev.sortKey === key && prev.sortDirection === "asc" ? "desc" : "asc"),
    }));
  }, []);

  const handleQuickView = useCallback((client: Client) => {
    setQuickViewClient(client);
    setQuickViewOpen(true);
  }, []);

  const handleQuickViewOpenChange = useCallback((open: boolean) => {
    setQuickViewOpen(open);
    if (!open) setQuickViewClient(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilterState(INITIAL_FILTER_STATE);
    setPage(1);
  }, []);

  const handleModeChange = useCallback((newMode: DashboardMode) => {
    setMode(newMode);
    setFilterState((prev) => ({
      ...prev,
      goal: defaultGoal(newMode),
      period: defaultPeriod(newMode),
      sortKey: defaultSortKey(newMode),
      sortDirection: "asc",
    }));
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((updates: Partial<Pick<FilterState, "goal" | "period" | "readinessTiers" | "partners">>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
    setPage(1);
  }, []);

  const handleViewTabChange = useCallback(
    (tab: ViewTab) => {
      setViewTab(tab);
      setPage(1);
      if (tab.startsWith("custom-")) {
        const view = customViews.find((v) => v.id === tab);
        if (view) setFilterState(view.filterState);
      }
    },
    [customViews]
  );

  const handleCreateView = useCallback((name: string) => {
    const scope: ReadinessScope =
      viewTab === "all" ? "all" : viewTab === "ready" ? "ready" : "incomplete";
    const newView = addCustomView({
      name,
      filterState,
      readinessScope: scope,
    });
    setCustomViews(getCustomViews());
    setViewTab(newView.id);
    setFilterState(newView.filterState);
    setPage(1);
  }, [filterState, viewTab]);

  const handleUpdateView = useCallback((id: string, updates: { name?: string; filterState?: FilterState; readinessScope?: ReadinessScope }) => {
    updateCustomView(id, updates);
    setCustomViews(getCustomViews());
    if (updates.filterState) setFilterState(updates.filterState);
  }, []);

  const handleDeleteView = useCallback((id: string) => {
    deleteCustomView(id);
    setCustomViews(getCustomViews());
    if (viewTab === id) {
      setViewTab("incomplete");
      setFilterState(INITIAL_FILTER_STATE);
      setPage(1);
    }
  }, [viewTab]);

  const activeFilters = useMemo(
    () => ({
      goal: filterState.goal,
      period: filterState.period,
      readinessTiers: filterState.readinessTiers,
      partners: filterState.partners,
    }),
    [filterState.goal, filterState.period, filterState.readinessTiers, filterState.partners]
  );

  const baseColumns = useMemo(
    () => getColumnsForMode(mode, readinessScope),
    [mode, readinessScope]
  );
  const baseColumnIds = useMemo(() => baseColumns.map((c) => c.id), [baseColumns]);
  const prefsRaw = columnPrefs[CLIENTS_TABLE_PREFS_KEY];

  const { resolvedOrder, visibleColumnIdsForMenu } = useMemo(() => {
    const r = resolveClientsTablePrefs(prefsRaw, baseColumnIds);
    return {
      resolvedOrder: r.order,
      visibleColumnIdsForMenu: visibleIdsForMode(r.hiddenGlobal, baseColumnIds),
    };
  }, [prefsRaw, baseColumnIds]);

  const displayColumns = useMemo((): ColumnConfig[] => {
    const r = resolveClientsTablePrefs(prefsRaw, baseColumnIds);
    const visibleSet = new Set(visibleIdsForMode(r.hiddenGlobal, baseColumnIds));
    const byId = new Map(baseColumns.map((c) => [c.id, c]));
    const ordered = r.order
      .filter((id) => visibleSet.has(id))
      .map((id) => byId.get(id))
      .filter(Boolean) as ColumnConfig[];
    return pinClientNameFirst(ordered);
  }, [baseColumns, baseColumnIds, prefsRaw]);

  const columnOrderForMenu = useMemo(
    () => pinClientNameFirstIds(resolvedOrder.filter((id) => baseColumnIds.includes(id))),
    [resolvedOrder, baseColumnIds]
  );

  const handleColumnVisibilityChange = useCallback(
    (id: ColumnId, visible: boolean) => {
      if (id === "client_name") return;
      setColumnPrefs((prev) => {
        const raw = prev[CLIENTS_TABLE_PREFS_KEY];
        const { order, hiddenGlobal } = resolveClientsTablePrefs(raw, baseColumnIds);
        const nextHidden = new Set(hiddenGlobal);
        if (visible) nextHidden.delete(id);
        else nextHidden.add(id);
        return {
          ...prev,
          [CLIENTS_TABLE_PREFS_KEY]: {
            order: pinClientNameFirstIds(order),
            hidden: Array.from(nextHidden).filter((i) => i !== "client_name"),
          },
        };
      });
    },
    [baseColumnIds]
  );

  const handleColumnReorder = useCallback(
    (newOrder: ColumnId[]) => {
      const pinned = pinClientNameFirstIds(newOrder);
      setColumnPrefs((prev) => {
        const raw = prev[CLIENTS_TABLE_PREFS_KEY];
        const { hiddenGlobal } = resolveClientsTablePrefs(raw, baseColumnIds);
        return {
          ...prev,
          [CLIENTS_TABLE_PREFS_KEY]: {
            order: pinned,
            hidden: Array.from(hiddenGlobal).filter((i) => i !== "client_name"),
          },
        };
      });
    },
    [baseColumnIds]
  );

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-background-secondary">
        <DashboardHeader
          mode={mode}
          onModeChange={handleModeChange}
          onCreateCustomView={() => setCreateViewModalOpen(true)}
        />
        <main className="flex-1 p-5">
          <BooksCard
            viewTab={viewTab}
            onViewTabChange={handleViewTabChange}
            customViews={customViews}
            filterState={filterState}
            readinessScope={readinessScope}
            onCreateView={handleCreateView}
            onUpdateView={handleUpdateView}
            onDeleteView={handleDeleteView}
            searchQuery={filterState.searchQuery}
            onSearchChange={handleSearchChange}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            activeFilterCount={activeFilterCount}
            onClearFilters={handleClearFilters}
            mode={mode}
            onModeChange={handleModeChange}
            baseColumns={baseColumns}
            columnOrder={columnOrderForMenu}
            visibleColumnIds={visibleColumnIdsForMenu}
            onColumnVisibilityChange={handleColumnVisibilityChange}
            onColumnReorder={handleColumnReorder}
            createViewModalOpen={createViewModalOpen}
            onCreateViewModalOpenChange={setCreateViewModalOpen}
          >
            {filteredClients.length === 0 ? (
              <div className="p-8">
                <EmptyState onClearFilters={handleClearFilters} />
              </div>
            ) : (
              <ClientTable
                clients={filteredClients}
                filterState={filterState}
                onSort={handleSort}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onQuickView={handleQuickView}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
                columns={displayColumns}
                mode={mode}
              />
            )}
          </BooksCard>
        </main>
      </div>
      <QuickViewSheet
        client={quickViewClient}
        open={quickViewOpen}
        onOpenChange={handleQuickViewOpenChange}
      />
    </TooltipProvider>
  );
}

export default function ClientsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-background-secondary text-muted-foreground">
          Loading…
        </div>
      }
    >
      <ClientsPageContent />
    </Suspense>
  );
}
