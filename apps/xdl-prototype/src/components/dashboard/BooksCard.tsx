"use client";

import { useState } from "react";
import { Search, Filter, Grid3X3, HelpCircle, ChevronDown, ChevronRight, Calendar, Users, BookOpen, FileCheck, Receipt, DollarSign, TrendingUp, Plus, MoreHorizontal, Trash2, Lock, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  getThisMonthPeriod,
  getLastMonthPeriod,
  getThisQuarterPeriod,
  getThisYearPeriod,
  getLastYearPeriod,
  type GoalValue,
  type PeriodValue,
} from "@/lib/data-store";
import type { FilterState } from "@/lib/data-store";
import type { CustomView, ReadinessScope } from "@/lib/custom-views";
import type { DashboardMode } from "@/lib/dashboard-modes";
import { DASHBOARD_MODE_LABELS, DASHBOARD_MODES } from "@/lib/dashboard-modes";
import type { ColumnConfig, ColumnId } from "@/lib/dashboard-columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export type ViewTab = "all" | "incomplete" | "ready" | string;

export interface ActiveFilters {
  goal: GoalValue;
  period: PeriodValue | null;
  readinessTiers: FilterState["readinessTiers"];
  partners: FilterState["partners"];
}

const MODE_ICONS: Record<DashboardMode, React.ComponentType<{ className?: string }>> = {
  crm: Users,
  bookkeeping: BookOpen,
  tax: FileCheck,
  sales_tax: Receipt,
  payroll: DollarSign,
  advisory: TrendingUp,
};

interface BooksCardProps {
  viewTab: ViewTab;
  onViewTabChange: (tab: ViewTab) => void;
  customViews: CustomView[];
  filterState: FilterState;
  readinessScope: ReadinessScope;
  onCreateView: (name: string) => void;
  onUpdateView: (id: string, updates: Partial<Pick<CustomView, "name" | "filterState" | "readinessScope">>) => void;
  onDeleteView: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: ActiveFilters;
  onFilterChange: (updates: Partial<ActiveFilters>) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
  mode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
  baseColumns: ColumnConfig[];
  columnOrder: ColumnId[];
  visibleColumnIds: ColumnId[];
  onColumnVisibilityChange: (id: ColumnId, visible: boolean) => void;
  onColumnReorder: (order: ColumnId[]) => void;
  children: React.ReactNode;
  /** When provided, the Create custom view modal is controlled from the parent (e.g. opened from header). */
  createViewModalOpen?: boolean;
  onCreateViewModalOpenChange?: (open: boolean) => void;
  className?: string;
}

function ColumnsMenu({
  baseColumns,
  columnOrder,
  visibleColumnIds,
  onColumnVisibilityChange,
  onColumnReorder,
}: {
  baseColumns: ColumnConfig[];
  columnOrder: ColumnId[];
  visibleColumnIds: ColumnId[];
  onColumnVisibilityChange: (id: ColumnId, visible: boolean) => void;
  onColumnReorder: (order: ColumnId[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const byId = new Map(baseColumns.map((c) => [c.id, c]));
  const ordered = columnOrder.map((id) => byId.get(id)).filter(Boolean) as ColumnConfig[];

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.setData("application/json", JSON.stringify({ index }));
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedIndex(null);
    const raw = e.dataTransfer.getData("text/plain");
    const fromIndex = raw === "" ? -1 : parseInt(raw, 10);
    if (fromIndex < 0 || fromIndex === targetIndex) return;
    const newOrder = [...columnOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    onColumnReorder(newOrder);
  };
  const handleDragEnd = () => setDraggedIndex(null);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-8 px-2 rounded-medium border border-border-subtle text-text-default text-[12px] font-medium flex items-center gap-1.5 cursor-pointer hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)]"
          aria-label="Column settings"
        >
          <Grid3X3 className="size-4" aria-hidden />
          Columns
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[300px] min-w-[300px] max-h-[min(70vh,400px)] overflow-y-auto px-px py-[13px] rounded-medium border border-border-subtle bg-background-primary shadow-[var(--shadow-elevation-lift)]"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div role="menu" aria-label="Column settings">
          {ordered.map((col, index) => {
            const isLocked = col.id === "client_name";
            const visible = visibleColumnIds.includes(col.id);
            const label = col.label ?? col.id.replace(/_/g, " ");
            return (
              <div
                key={col.id}
                draggable={!isLocked}
                onDragStart={!isLocked ? handleDragStart(index) : undefined}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "min-h-[40px] px-3 py-2 flex items-center gap-2 rounded-none text-[15px] font-normal leading-[1.45] text-text-default cursor-default hover:bg-background-secondary focus-within:bg-background-secondary",
                  draggedIndex === index && "opacity-50"
                )}
              >
                <input
                  type="checkbox"
                  checked={visible}
                  disabled={isLocked}
                  onChange={(e) => onColumnVisibilityChange(col.id, e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 rounded border-border-subtle text-[var(--color-action-default)] focus:ring-2 focus:ring-[var(--color-action-focus)] focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 accent-[var(--color-action-default)]"
                  aria-label={isLocked ? `${label} (always visible)` : `Toggle ${label}`}
                />
                <span className="flex-1 min-w-0 truncate">{label}</span>
                <span className="flex items-center justify-center w-6 shrink-0 text-text-muted" aria-hidden>
                  {isLocked ? <Lock className="size-4" /> : <GripVertical className="size-4 cursor-grab active:cursor-grabbing" />}
                </span>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** CPA-relevant filter options per dashboard mode */
const FILTER_OPTIONS_BY_MODE: Record<
  DashboardMode,
  readonly { id: string; label: string; action?: "goal" | "period" }[]
> = {
  crm: [
    { id: "completion_risk", label: "Risk" },
    { id: "main_signal", label: "Main signal" },
    { id: "partner", label: "Partner" },
    { id: "staff", label: "Staff", action: "goal" },
    { id: "last_contact", label: "Last contact" },
    { id: "next_review", label: "Next review", action: "period" },
    { id: "service_line", label: "Service line" },
    { id: "more", label: "More" },
  ],
  bookkeeping: [
    { id: "completion_risk", label: "Risk" },
    { id: "main_signal", label: "Main signal" },
    { id: "collection_status", label: "Collection" },
    { id: "expected_start_date", label: "Start date", action: "period" },
    { id: "sales_tax_due_date", label: "Sales tax due", action: "period" },
    { id: "staff", label: "Staff", action: "goal" },
    { id: "more", label: "More" },
  ],
  tax: [
    { id: "completion_risk", label: "Risk" },
    { id: "main_signal", label: "Main signal" },
    { id: "w9_status", label: "W-9" },
    { id: "1099_due_date", label: "1099 due", action: "period" },
    { id: "extension_filed", label: "Extension" },
    { id: "staff", label: "Staff", action: "goal" },
    { id: "more", label: "More" },
  ],
  sales_tax: [
    { id: "completion_risk", label: "Risk" },
    { id: "main_signal", label: "Main signal" },
    { id: "filing_frequency", label: "Filing freq." },
    { id: "sales_tax_due_date", label: "Sales tax due", action: "period" },
    { id: "staff", label: "Staff", action: "goal" },
    { id: "more", label: "More" },
  ],
  payroll: [
    { id: "completion_risk", label: "Risk" },
    { id: "main_signal", label: "Main signal" },
    { id: "next_payroll_run", label: "Next payroll", action: "period" },
    { id: "941_due", label: "941 / tax", action: "period" },
    { id: "staff", label: "Staff", action: "goal" },
    { id: "more", label: "More" },
  ],
  advisory: [
    { id: "completion_risk", label: "Risk" },
    { id: "main_signal", label: "Main signal" },
    { id: "engagement_type", label: "Engagement" },
    { id: "next_review", label: "Next review", action: "period" },
    { id: "last_review", label: "Last review" },
    { id: "key_metrics_due", label: "KPI due", action: "period" },
    { id: "staff", label: "Staff", action: "goal" },
    { id: "partner", label: "Partner" },
    { id: "more", label: "More" },
  ],
};

function AddFilterButton({
  mode,
  onSelectGoal,
  onSelectPeriod,
}: {
  mode: DashboardMode;
  onSelectGoal: () => void;
  onSelectPeriod: () => void;
}) {
  const [open, setOpen] = useState(false);
  const options = FILTER_OPTIONS_BY_MODE[mode];
  const handleSelect = (id: string, action?: "goal" | "period") => {
    setOpen(false);
    if (action === "period") onSelectPeriod();
    else if (action === "goal") onSelectGoal();
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-8 pl-3 pr-3 rounded-medium border border-border-subtle bg-background-primary text-text-default text-[12px] font-medium flex items-center gap-1.5 cursor-pointer hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] focus:ring-offset-0"
          aria-label="Add filter"
        >
          <Plus className="size-4 text-text-muted" aria-hidden />
          Filter
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[240px] p-0 rounded-medium border border-border-subtle bg-background-primary shadow-[0px_3px_6px_0px_var(--color-shadow-default),0px_0px_0px_0px_var(--color-shadow-subtle)]"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="py-[13px]" role="menu" aria-label="Filter options">
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt.id}
              onSelect={(e) => {
                e.preventDefault();
                handleSelect(opt.id, opt.action);
              }}
              className="min-h-[40px] px-3 py-0 flex items-center justify-between gap-2 rounded-none text-[15px] font-normal leading-[1.45] text-text-default cursor-pointer focus:bg-background-secondary focus:outline-none"
              role="menuitem"
            >
              <span>{opt.label}</span>
              <ChevronRight className="size-5 shrink-0 text-text-muted" aria-hidden />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function BooksCard({
  viewTab,
  onViewTabChange,
  customViews,
  filterState,
  readinessScope,
  onCreateView,
  onUpdateView,
  onDeleteView,
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
  activeFilterCount,
  onClearFilters,
  mode,
  onModeChange,
  baseColumns,
  columnOrder,
  visibleColumnIds,
  onColumnVisibilityChange,
  onColumnReorder,
  children,
  createViewModalOpen: createViewModalOpenProp,
  onCreateViewModalOpenChange,
  className,
}: BooksCardProps) {
  const [goalDropdownOpen, setGoalDropdownOpen] = useState(false);
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [saveViewOpen, setSaveViewOpen] = useState(false);
  const [saveViewName, setSaveViewName] = useState("");
  const [createViewModalOpenLocal, setCreateViewModalOpenLocal] = useState(false);
  const [createViewName, setCreateViewName] = useState("");
  const [createViewDescription, setCreateViewDescription] = useState("");

  const createViewModalOpen = createViewModalOpenProp ?? createViewModalOpenLocal;
  const setCreateViewModalOpen = onCreateViewModalOpenChange ?? setCreateViewModalOpenLocal;

  const isCustomView = viewTab.startsWith("custom-");
  const activeView = isCustomView ? customViews.find((v) => v.id === viewTab) : null;

  const openSaveView = () => {
    setSaveViewName(activeView?.name ?? "");
    setSaveViewOpen(true);
  };

  const openAddView = () => {
    setSaveViewName("");
    setSaveViewOpen(true);
  };

  const handleSaveViewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = saveViewName.trim();
    if (!name) return;
    if (isCustomView && activeView) {
      onUpdateView(activeView.id, { name, filterState, readinessScope });
    } else {
      onCreateView(name);
    }
    setSaveViewOpen(false);
    setSaveViewName("");
  };

  const openCreateViewModal = () => {
    setCreateViewName("");
    setCreateViewDescription("");
    setCreateViewModalOpen(true);
  };

  const handleCreateViewModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = createViewName.trim() || createViewDescription.trim().slice(0, 40) || "My view";
    if (!name) return;
    onCreateView(name);
    setCreateViewModalOpen(false);
    setCreateViewName("");
    setCreateViewDescription("");
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-large border border-border-soft bg-background-primary overflow-hidden",
        className
      )}
    >
      <div className="flex flex-wrap gap-4 items-center justify-between min-w-0 p-3 border-b border-border-soft">
        <div className="flex gap-2">
          <ViewTabs
            value={viewTab}
            onChange={onViewTabChange}
            customViews={customViews}
            onDeleteView={onDeleteView}
          />
        </div>
        <div className="flex gap-2 items-center flex-1 justify-end min-w-[200px]">
          <div className="relative flex-1 max-w-[320px] min-w-[150px]">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-text-faint" aria-hidden />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              className="w-full h-8 rounded-medium border border-border-subtle bg-background-primary pl-8 pr-3 text-[12px] text-text-default placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)]"
              aria-label="Search"
            />
          </div>
          <button
            type="button"
            className="h-8 px-2 rounded-medium border border-[var(--color-action-default)] text-[var(--color-action-default)] text-[12px] font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <Filter className="size-4" />
            Hide filters ({activeFilterCount})
          </button>
          <ColumnsMenu
              baseColumns={baseColumns}
              columnOrder={columnOrder}
              visibleColumnIds={visibleColumnIds}
              onColumnVisibilityChange={onColumnVisibilityChange}
              onColumnReorder={onColumnReorder}
            />
          <DropdownMenu open={modeDropdownOpen} onOpenChange={setModeDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-8 w-8 rounded-medium border border-border-subtle flex items-center justify-center text-text-default cursor-pointer hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)]"
                aria-expanded={modeDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select dashboard mode"
              >
                <ChevronDown className="size-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="min-w-[280px] p-3">
              <div className="grid grid-cols-2 gap-2" role="listbox" aria-label="Dashboard modes">
                {DASHBOARD_MODES.map((m) => {
                  const Icon = MODE_ICONS[m];
                  const isSelected = mode === m;
                  return (
                    <DropdownMenuItem
                      key={m}
                      onSelect={() => {
                        onModeChange(m);
                        setModeDropdownOpen(false);
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-large border border-border-soft bg-background-primary p-4 min-h-[80px] cursor-pointer focus:bg-background-secondary",
                        isSelected && "ring-2 ring-[var(--color-action-default)] border-[var(--color-action-default)]"
                      )}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-medium",
                          isSelected ? "bg-[var(--color-action-default)]/15 text-[var(--color-action-default)]" : "bg-background-secondary text-text-muted"
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <span className={cn("text-[13px] font-medium", isSelected ? "text-[var(--color-action-default)]" : "text-text-default")}>
                        {DASHBOARD_MODE_LABELS[m]}
                      </span>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center p-3 border-b border-border-soft">
        <AddFilterButton
          mode={mode}
          onSelectGoal={() => setGoalDropdownOpen(true)}
          onSelectPeriod={() => setPeriodDropdownOpen(true)}
        />
        <GoalFilterPill
          value={activeFilters.goal}
          onChange={(v) => onFilterChange({ goal: v })}
          onRemove={() => onFilterChange({ goal: null })}
          open={goalDropdownOpen}
          onOpenChange={setGoalDropdownOpen}
          mode={mode}
        />
        <PeriodFilterPill
          value={activeFilters.period}
          onChange={(p) => onFilterChange({ period: p })}
          onRemove={() => onFilterChange({ period: null })}
          open={periodDropdownOpen}
          onOpenChange={setPeriodDropdownOpen}
          mode={mode}
        />

        {(activeFilters.goal || activeFilters.period || activeFilterCount > 0) && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-[12px] font-medium text-[var(--color-action-default)] hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        )}
        <div className="flex-1" />
        <DropdownMenu open={saveViewOpen} onOpenChange={setSaveViewOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={openSaveView}
              className="h-8 px-2 rounded-medium border border-border-subtle text-text-default text-[12px] font-medium flex items-center gap-1.5 cursor-pointer hover:bg-background-secondary"
            >
              Save view
              <HelpCircle className="size-4 text-text-faint" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-3" onCloseAutoFocus={(e) => e.preventDefault()}>
            <form onSubmit={handleSaveViewSubmit} className="flex flex-col gap-3">
              <label htmlFor="view-name" className="text-[12px] font-medium text-text-default">
                View name
              </label>
              <input
                id="view-name"
                type="text"
                value={saveViewName}
                onChange={(e) => setSaveViewName(e.target.value)}
                placeholder="e.g. My month-end list"
                className="h-8 w-full rounded-medium border border-border-subtle bg-background-primary px-3 text-[12px] text-text-default placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)]"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setSaveViewOpen(false)}
                  className="h-8 px-3 rounded-medium border border-border-subtle text-[12px] font-medium text-text-default cursor-pointer hover:bg-background-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!saveViewName.trim()}
                  className="h-8 px-3 rounded-medium bg-[var(--color-action-default)] text-[12px] font-medium text-white cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCustomView && activeView ? "Update view" : "Create view"}
                </button>
              </div>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {children}

      <Dialog open={createViewModalOpen} onOpenChange={setCreateViewModalOpen}>
        <DialogContent className="max-w-[520px] p-0 gap-0 overflow-hidden" showClose>
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>Create custom view</DialogTitle>
            <DialogDescription>
              Describe the view you want and give it a name. It will use your current filters and appear as a new tab.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateViewModalSubmit} className="flex flex-col gap-4 px-6 pb-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="create-view-description" className="text-[12px] font-medium text-text-default">
                What kind of view do you want?
              </label>
              <textarea
                id="create-view-description"
                value={createViewDescription}
                onChange={(e) => setCreateViewDescription(e.target.value)}
                placeholder="e.g. All my 1099 clients due this month, blocked on W-9, sorted by deadline"
                rows={4}
                className="w-full resize-none rounded-large border border-border-subtle bg-background-primary px-4 py-3 text-[14px] leading-[1.5] text-text-default placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] focus:border-transparent"
                aria-label="Describe the view you want"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="create-view-name" className="text-[12px] font-medium text-text-default">
                View name
              </label>
              <input
                id="create-view-name"
                type="text"
                value={createViewName}
                onChange={(e) => setCreateViewName(e.target.value)}
                placeholder="e.g. 1099 W-9 blocked"
                className="h-9 w-full rounded-medium border border-border-subtle bg-background-primary px-3 text-[13px] text-text-default placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)]"
                aria-label="View name"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setCreateViewModalOpen(false)}
                className="h-9 px-3 rounded-medium border border-border-subtle text-[12px] font-medium text-text-default cursor-pointer hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 px-3 rounded-medium bg-[var(--color-action-default)] text-[12px] font-medium text-[var(--color-text-inverse)] cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create view
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function goalDisplayLabel(value: GoalValue, mode: DashboardMode): string {
  if (value === "Year-end" && mode === "tax") return "1099 deadline";
  return value ?? "Select goal";
}

function GoalFilterPill({
  value,
  onChange,
  onRemove,
  open,
  onOpenChange,
  mode,
}: {
  value: GoalValue;
  onChange: (v: GoalValue) => void;
  onRemove: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DashboardMode;
}) {
  const options: ("Month-end" | "Year-end")[] = ["Month-end", "Year-end"];
  return (
    <div className="h-8 flex items-center rounded-medium border border-border-subtle bg-background-primary overflow-hidden">
      <span className="pl-3 pr-2 text-[12px] font-medium text-text-default">Goal</span>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="border-l border-border-soft pl-2 pr-1.5 h-full flex items-center gap-1 text-[12px] font-medium text-[var(--color-action-default)] hover:bg-background-secondary min-w-0 cursor-pointer"
          >
            <span className="truncate max-w-[120px]">{goalDisplayLabel(value, mode)}</span>
            <ChevronDown className="size-3.5 shrink-0 text-text-faint" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[140px]">
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt}
              onSelect={() => {
                onChange(opt);
                onOpenChange(false);
              }}
              className={cn(
                "cursor-pointer",
                value === opt && "border-l-2 border-[var(--color-action-default)] pl-6"
              )}
            >
              <span className={cn("text-[12px]", value === opt ? "text-[var(--color-action-default)] font-medium" : "text-text-default")}>
                {goalDisplayLabel(opt, mode)}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {value != null && (
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-text-faint hover:text-text-default h-full flex items-center cursor-pointer"
          aria-label="Remove Goal filter"
        >
          ×
        </button>
      )}
    </div>
  );
}

/** Period label shown in UI (CPA-friendly) per mode */
function periodSectionLabel(mode: DashboardMode): string {
  switch (mode) {
    case "tax":
      return "1099 filing period";
    case "sales_tax":
      return "Sales tax quarter / month";
    case "payroll":
    case "bookkeeping":
      return "Month";
    case "advisory":
      return "Review period";
    default:
      return "Suggested dates";
  }
}

function PeriodFilterPill({
  value,
  onChange,
  onRemove,
  open,
  onOpenChange,
  mode,
}: {
  value: PeriodValue | null;
  onChange: (p: PeriodValue) => void;
  onRemove: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DashboardMode;
}) {
  const thisMonth = getThisMonthPeriod();
  const lastMonth = getLastMonthPeriod();
  const thisQuarter = getThisQuarterPeriod();
  const thisYear = getThisYearPeriod();
  const lastYear = getLastYearPeriod();

  return (
    <div className="h-8 flex items-center rounded-medium border border-border-subtle bg-background-primary overflow-hidden">
      <span className="pl-3 pr-2 text-[12px] font-medium text-text-default">Period</span>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="border-l border-border-soft pl-2 pr-1.5 h-full flex items-center gap-1 text-[12px] font-medium text-[var(--color-action-default)] hover:bg-background-secondary min-w-0 cursor-pointer"
          >
            <span className="truncate max-w-[180px]">{value?.label ?? "Select period"}</span>
            <ChevronDown className="size-3.5 shrink-0 text-text-faint" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[220px]">
          <DropdownMenuLabel className="text-[11px] font-semibold text-text-muted normal-case">
            {periodSectionLabel(mode)}
          </DropdownMenuLabel>
          {(mode === "tax" || mode === "crm" || mode === "advisory") && (
            <>
              <DropdownMenuItem
                onSelect={() => {
                  onChange(thisYear);
                  onOpenChange(false);
                }}
                className="flex justify-between gap-4 text-[12px]"
              >
                <span>{mode === "tax" ? "This year (filing season)" : "This year"}</span>
                <span className="text-text-faint">{thisYear.label}</span>
              </DropdownMenuItem>
              {mode === "tax" && (
                <DropdownMenuItem
                  onSelect={() => {
                    onChange(lastYear);
                    onOpenChange(false);
                  }}
                  className="flex justify-between gap-4 text-[12px]"
                >
                  <span>Last year</span>
                  <span className="text-text-faint">{lastYear.label}</span>
                </DropdownMenuItem>
              )}
            </>
          )}
          {(mode === "sales_tax" || mode === "bookkeeping" || mode === "payroll" || mode === "crm" || mode === "advisory") && (
            <>
              {mode === "sales_tax" && (
                <DropdownMenuItem
                  onSelect={() => {
                    onChange(thisQuarter);
                    onOpenChange(false);
                  }}
                  className="flex justify-between gap-4 text-[12px]"
                >
                  <span>This quarter</span>
                  <span className="text-text-faint">{thisQuarter.label}</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onSelect={() => {
                  onChange(thisMonth);
                  onOpenChange(false);
                }}
                className="flex justify-between gap-4 text-[12px]"
              >
                <span>This month</span>
                <span className="text-text-faint">{thisMonth.label}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  onChange(lastMonth);
                  onOpenChange(false);
                }}
                className="flex justify-between gap-4 text-[12px]"
              >
                <span>Last month</span>
                <span className="text-text-faint">{lastMonth.label}</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-[12px] gap-2 cursor-default"
          >
            <Calendar className="size-4 text-text-faint" aria-hidden />
            Select custom date
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {value != null && (
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-text-faint hover:text-text-default h-full flex items-center cursor-pointer"
          aria-label="Remove Period filter"
        >
          ×
        </button>
      )}
    </div>
  );
}

function ViewTabs({
  value,
  onChange,
  customViews,
  onDeleteView,
}: {
  value: ViewTab;
  onChange: (tab: ViewTab) => void;
  customViews: CustomView[];
  onDeleteView: (id: string) => void;
}) {
  const standardTabs: { id: ViewTab; label: string }[] = [
    { id: "all", label: "All items" },
    { id: "incomplete", label: "Incomplete" },
    { id: "ready", label: "Ready" },
  ];
  return (
    <div className="flex gap-2 items-center flex-wrap" role="tablist" aria-label="View">
      {standardTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "h-8 px-2 rounded-medium text-[12px] font-medium min-w-[40px] cursor-pointer",
            value === tab.id
              ? "bg-background-primary border border-[var(--color-action-default)] text-[var(--color-action-default)]"
              : "bg-background-secondary text-text-default border border-transparent"
          )}
        >
          {tab.label}
        </button>
      ))}
      {customViews.map((view) => (
        <div key={view.id} className="flex items-center gap-0.5">
          <button
            type="button"
            role="tab"
            aria-selected={value === view.id}
            onClick={() => onChange(view.id)}
            className={cn(
              "h-8 pl-2 pr-1.5 rounded-medium text-[12px] font-medium max-w-[160px] truncate cursor-pointer",
              value === view.id
                ? "bg-background-primary border border-[var(--color-action-default)] text-[var(--color-action-default)]"
                : "bg-background-secondary text-text-default border border-transparent"
            )}
          >
            {view.name}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "h-8 w-6 flex items-center justify-center rounded-medium cursor-pointer",
                  value === view.id
                    ? "text-[var(--color-action-default)] hover:bg-[var(--color-action-default)]/10"
                    : "text-text-faint hover:text-text-default hover:bg-background-secondary"
                )}
                aria-label={`Options for view ${view.name}`}
              >
                <MoreHorizontal className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[140px]">
              <DropdownMenuItem
                onSelect={() => onDeleteView(view.id)}
                className="text-[12px] gap-2 cursor-pointer text-[var(--color-sentiment-negative-foreground)]"
              >
                <Trash2 className="size-4" />
                Delete view
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
