"use client";

import { useRef, useEffect, type CSSProperties, type ReactNode } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, HelpCircle, MoreVertical } from "lucide-react";
import { Expand } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Client, FilterState, SortKey, SortDirection } from "@/lib/data-store";
import { getMainSignalForMode } from "@/lib/data-store";
import type { ColumnConfig, ColumnId } from "@/lib/dashboard-columns";
import {
  CHECKBOX_CELL_PAD,
  CHECKBOX_COLUMN_PX,
  CLIENT_NAME_CELL_GAP,
  CLIENT_NAME_CELL_PAD_X,
  CLIENT_NAME_COLUMN_PX,
  COLUMN_WIDTH_CLASSES,
  COLUMN_WIDTH_PX,
} from "@/lib/dashboard-columns";
import type { DashboardMode } from "@/lib/dashboard-modes";
import { ReadinessCell } from "./ReadinessCell";
import { PaginationBar } from "./PaginationBar";
import { Avatar, type AvatarColor } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ENTITY_AVATAR_COLORS: AvatarColor[] = [
  "blue",
  "violet",
  "turquoise",
  "grape",
  "mint",
  "green",
  "orange",
  "pink",
];

function entityAvatarColor(entityId: string): AvatarColor {
  let h = 0;
  for (let i = 0; i < entityId.length; i++) {
    h = (h * 31 + entityId.charCodeAt(i)) >>> 0;
  }
  return ENTITY_AVATAR_COLORS[h % ENTITY_AVATAR_COLORS.length];
}

/** Sum of nominal column widths so `table-fixed` cannot compress fixed cols when the last col is fluid. */
function clientTableMinWidthPx(columns: ColumnConfig[]): number {
  let sum = CHECKBOX_COLUMN_PX;
  for (const col of columns) {
    sum += COLUMN_WIDTH_PX[col.id as ColumnId] ?? 120;
  }
  return sum;
}

const clientNameColElStyle = {
  width: CLIENT_NAME_COLUMN_PX,
  minWidth: CLIENT_NAME_COLUMN_PX,
  maxWidth: CLIENT_NAME_COLUMN_PX,
} as const;

/** Matches `Avatar` `xsmall` so the header label lines up with entity name text in body rows. */
const CLIENT_NAME_HEADER_AVATAR_GUTTER = "size-[1.5rem] shrink-0";

const TABLE_SPACER_COL_KEY = "__table_spacer";

/** `minWidth` only so the column shares extra table width with other flex columns (`table-layout: fixed`). */
function flexDataColumnStyle(columnId: ColumnId): CSSProperties {
  return { minWidth: COLUMN_WIDTH_PX[columnId] ?? 120 };
}

function SortHeader({
  label,
  sortKey,
  currentSortKey,
  currentDirection,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSortKey: SortKey;
  currentDirection: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  const isActive = currentSortKey === sortKey;
  const Icon =
    !isActive ? ChevronsUpDown
    : currentDirection === "asc" ? ChevronUp
    : ChevronDown;
  const ariaSort = isActive
    ? (currentDirection === "asc" ? "ascending" : "descending")
    : undefined;

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      aria-sort={ariaSort}
      className={cn(
        "flex items-center gap-1 text-[12px] font-semibold leading-[1.3] hover:text-text-default focus:outline-none focus:ring-2 focus:ring-border-strong rounded-small cursor-pointer",
        isActive ? "text-text-default" : "text-text-muted"
      )}
    >
      {label}
      <Icon className="size-3.5 shrink-0" aria-hidden />
    </button>
  );
}

function ColumnHeader({
  label,
  children,
  helpTooltip,
  sortKey,
  currentSortKey,
  currentDirection,
  onSort,
  alignItems = "start",
}: {
  label?: string;
  children?: ReactNode;
  helpTooltip?: string;
  sortKey?: SortKey;
  currentSortKey?: SortKey;
  currentDirection?: SortDirection;
  onSort?: (key: SortKey, direction?: SortDirection) => void;
  /** Use `center` for the client column so the title lines up with the avatar row. */
  alignItems?: "start" | "center";
}) {
  const isSortable = sortKey != null && onSort != null;
  const isActive = isSortable && currentSortKey === sortKey;
  const rowAlign = alignItems === "center" ? "items-center" : "items-start";

  return (
    <div className={cn("flex justify-between gap-2 min-w-0 w-full", rowAlign)}>
      <div className={cn("min-w-0 flex-1 flex gap-1.5", rowAlign)}>
        {children ?? (
          <span className="block min-w-0 text-[12px] font-semibold leading-[1.25] text-text-default line-clamp-2 whitespace-normal break-words">
            {label}
          </span>
        )}
        {helpTooltip != null && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="shrink-0 text-text-faint hover:text-text-default focus:outline-none focus:ring-2 focus:ring-border-strong rounded-small p-0.5 cursor-pointer"
                  aria-label="What is risk?"
                >
                  <HelpCircle className="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[280px]">
                <p className="text-body-small-regular">{helpTooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {isSortable ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="shrink-0 text-text-faint hover:text-text-default focus:outline-none focus:ring-2 focus:ring-border-strong rounded-small p-0.5 cursor-pointer"
              aria-label="Column sort options"
              aria-haspopup="menu"
            >
              <MoreVertical className="size-3.5" aria-hidden />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[180px]">
            <DropdownMenuItem
              onSelect={() => onSort(sortKey!, "asc")}
              className="cursor-pointer text-[13px]"
              aria-selected={isActive && currentDirection === "asc"}
            >
              Sort ascending
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => onSort(sortKey!, "desc")}
              className="cursor-pointer text-[13px]"
              aria-selected={isActive && currentDirection === "desc"}
            >
              Sort descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          type="button"
          className="shrink-0 text-text-faint hover:text-text-default focus:outline-none focus:ring-2 focus:ring-border-strong rounded-small p-0.5 cursor-pointer"
          aria-label="Column options"
        >
          <MoreVertical className="size-3.5" aria-hidden />
        </button>
      )}
    </div>
  );
}

interface ClientTableProps {
  clients: Client[];
  filterState: FilterState;
  onSort: (key: SortKey, direction?: SortDirection) => void;
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onQuickView: (client: Client) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  columns: ColumnConfig[];
  mode: DashboardMode;
  className?: string;
}

function renderCell(
  client: Client,
  columnId: ColumnConfig["id"],
  onQuickView: (client: Client) => void,
  mode: DashboardMode
): React.ReactNode {
  switch (columnId) {
    case "client_name":
      return (
        <div
          className={cn("flex min-w-0 w-full items-center justify-between", CLIENT_NAME_CELL_GAP)}
        >
          <div className={cn("flex min-w-0 flex-1 items-center", CLIENT_NAME_CELL_GAP)}>
            <Avatar
              name={client.entityName}
              size="xsmall"
              variant="business"
              color={entityAvatarColor(client.id)}
              className="shrink-0"
              aria-hidden
            />
            <span className="text-body-small-regular text-text-default truncate min-w-0">
              {client.entityName}
            </span>
          </div>
          <div
            className="flex w-[52px] shrink-0 items-center justify-end gap-[var(--size-spacing-4)]"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onQuickView(client)}
              className="text-text-faint hover:text-text-default focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] rounded-small p-0.5 cursor-pointer"
              aria-label={`Expand ${client.entityName}`}
            >
              <Expand className="size-3.5 shrink-0" />
            </button>
            <button
              type="button"
              className="text-text-faint hover:text-text-default focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] rounded-small p-0.5 cursor-pointer"
              aria-label={`More options for ${client.entityName}`}
            >
              <MoreVertical className="size-3.5" />
            </button>
          </div>
        </div>
      );
    case "close_risk":
      return (
        <ReadinessCell
          tier={client.readinessTier}
          score={client.readinessScore}
          blockerReason={client.blockerReason}
          blockers={client.blockers}
        />
      );
    case "main_signal":
      return (
        <span className="text-body-small-regular text-text-default truncate block">
          {getMainSignalForMode(client, mode)}
        </span>
      );
    case "collection_status":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.blockers?.length ? "Pending" : "—"}
        </span>
      );
    case "lock_status":
      return (
        <span className="text-body-small-regular text-text-default">
          —
        </span>
      );
    case "tax_return_status":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.readinessTier === "ready" ? "Filed" : "—"}
        </span>
      );
    case "management_report":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.managementReportStatus ?? "—"}
        </span>
      );
    case "internal_due_date":
    case "filing_deadline":
      return (
        <span className="text-body-small-regular text-text-default">
          {formatDate(client.deadline)}
        </span>
      );
    case "sales_tax_due_date":
      return (
        <span className="text-body-small-regular text-text-default">
          {formatDate(client.salesTaxDueDate ?? client.deadline)}
        </span>
      );
    case "last_contact":
      return (
        <span className="text-body-small-regular text-text-default">
          {formatDate(client.lastActivity)}
        </span>
      );
    case "recon_status":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.reconStatus ?? "—"}
        </span>
      );
    case "last_sync":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.lastSync ? formatDate(client.lastSync) : "—"}
        </span>
      );
    case "extension_filed":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.extensionFiled === true ? "Yes" : client.extensionFiled === false ? "No" : "—"}
        </span>
      );
    case "organizer_received":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.organizerReceived === true ? "Yes" : client.organizerReceived === false ? "No" : "—"}
        </span>
      );
    case "w9_status":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.blockers?.some((b) => /W-9|w9/i.test(b))
            ? "Outstanding"
            : client.blockers?.length
              ? "Pending"
              : "—"}
        </span>
      );
    case "filing_frequency":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.salesTaxFilingFrequency ?? "—"}
        </span>
      );
    case "next_review":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.nextReview ? formatDate(client.nextReview) : "—"}
        </span>
      );
    case "payroll_frequency":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.payrollFrequency ?? "—"}
        </span>
      );
    case "next_payroll_run":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.nextPayrollRun ? formatDate(client.nextPayrollRun) : "—"}
        </span>
      );
    case "last_payroll_run":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.lastPayrollRun ? formatDate(client.lastPayrollRun) : "—"}
        </span>
      );
    case "payroll_tax_due":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.payrollTaxDue ? formatDate(client.payrollTaxDue) : "—"}
        </span>
      );
    case "last_review":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.lastReview ? formatDate(client.lastReview) : "—"}
        </span>
      );
    case "engagement_type":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.engagementType ?? "—"}
        </span>
      );
    case "key_metrics_due":
      return (
        <span className="text-body-small-regular text-text-default">
          {client.keyMetricsDue ? formatDate(client.keyMetricsDue) : "—"}
        </span>
      );
    case "staff":
      return (
        <div className="flex items-center gap-1.5">
          <Avatar name={client.partnerName} size="xsmall" />
          <span className="text-body-small-regular text-text-default">
            {client.partnerName}
          </span>
        </div>
      );
    default:
      return null;
  }
}

export function ClientTable({
  clients,
  filterState,
  onSort,
  selectedIds,
  onSelectionChange,
  onQuickView,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  columns,
  mode,
  className,
}: ClientTableProps) {
  const totalItems = clients.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageClients = clients.slice(start, start + pageSize);

  const allIds = pageClients.map((c) => c.id);
  const allSelected =
    pageClients.length > 0 && allIds.every((id) => selectedIds.has(id));

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selectedIds);
      allIds.forEach((id) => next.delete(id));
      onSelectionChange(next);
    } else {
      const next = new Set(selectedIds);
      allIds.forEach((id) => next.add(id));
      onSelectionChange(next);
    }
  };

  const headerCheckRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = headerCheckRef.current;
    if (el) el.indeterminate = selectedIds.size > 0 && !allSelected;
  }, [selectedIds.size, allSelected]);

  const checkboxColStyle = {
    width: CHECKBOX_COLUMN_PX,
    minWidth: CHECKBOX_COLUMN_PX,
    maxWidth: CHECKBOX_COLUMN_PX,
  } as const;

  const columnsAfterClient =
    columns[0]?.id === "client_name" ? columns.slice(1) : columns.filter((c) => c.id !== "client_name");
  const tableMinW = clientTableMinWidthPx(columns);
  const clientPinnedFirst = columns[0]?.id === "client_name";
  /** Trailing `<col />` only when nothing flexes after the fixed client column (avoids stretching client). */
  const needsTrailingSpacerCol =
    !clientPinnedFirst || columnsAfterClient.length === 0;

  return (
    <div
      className={cn("flex flex-col min-h-0 transition-opacity duration-200 ease-out", className)}
      role="region"
      aria-label="Client list"
    >
      <div className="overflow-auto flex-1 min-w-0 [scrollbar-gutter:stable]">
        <table
          className="w-full min-w-0 border-collapse text-left table-fixed [&_th]:box-border [&_td]:box-border"
          style={{ minWidth: tableMinW }}
        >
          <colgroup>
            <col style={{ width: CHECKBOX_COLUMN_PX }} />
            {columns[0]?.id === "client_name" ? (
              <>
                <col style={clientNameColElStyle} />
                {columnsAfterClient.map((col) => (
                  <col key={col.id} style={flexDataColumnStyle(col.id as ColumnId)} />
                ))}
                {needsTrailingSpacerCol ? <col /> : null}
              </>
            ) : (
              <>
                {columns.map((col) => (
                  <col
                    key={col.id}
                    style={{ width: COLUMN_WIDTH_PX[col.id as ColumnId] ?? 120 }}
                  />
                ))}
                <col />
              </>
            )}
          </colgroup>
          <thead>
            <tr className="border-b border-border-subtle bg-background-primary">
              <th className={cn(CHECKBOX_CELL_PAD, "py-2 align-middle")} style={checkboxColStyle}>
                <input
                  ref={headerCheckRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all visible clients"
                  className="size-3.5 rounded border-border-regular cursor-pointer"
                />
              </th>
              {columns.map((col) => {
                const isClientName = col.id === "client_name";
                const widthClass = COLUMN_WIDTH_CLASSES[col.id as ColumnId];
                const thClass = cn(
                  "py-2 align-middle",
                  isClientName &&
                    cn(CLIENT_NAME_CELL_PAD_X, "border-r border-border-regular overflow-hidden"),
                  !isClientName && cn("px-2", !clientPinnedFirst && widthClass),
                );
                const headerInner =
                  col.sortKey != null ? (
                    <ColumnHeader
                      sortKey={col.sortKey}
                      currentSortKey={filterState.sortKey}
                      currentDirection={filterState.sortDirection}
                      onSort={onSort}
                      alignItems={isClientName ? "center" : "start"}
                    >
                      <SortHeader
                        label={col.label ?? col.id}
                        sortKey={col.sortKey}
                        currentSortKey={filterState.sortKey}
                        currentDirection={filterState.sortDirection}
                        onSort={(key) => onSort(key)}
                      />
                    </ColumnHeader>
                  ) : (
                    <ColumnHeader
                      label={col.label}
                      helpTooltip={col.helpTooltip}
                      alignItems={isClientName ? "center" : "start"}
                    />
                  );

                const thStyle: CSSProperties | undefined = isClientName
                  ? clientNameColElStyle
                  : clientPinnedFirst
                    ? flexDataColumnStyle(col.id as ColumnId)
                    : undefined;

                return (
                  <th key={col.id} className={thClass} style={thStyle}>
                    {isClientName ? (
                      <div
                        className={cn(
                          "flex min-w-0 w-full items-center",
                          CLIENT_NAME_CELL_GAP,
                        )}
                      >
                        <span className={CLIENT_NAME_HEADER_AVATAR_GUTTER} aria-hidden />
                        <div className="min-w-0 flex-1">{headerInner}</div>
                      </div>
                    ) : (
                      headerInner
                    )}
                  </th>
                );
              })}
              {needsTrailingSpacerCol ? (
                <th
                  scope="col"
                  aria-hidden
                  className="p-0 border-0 border-b border-border-subtle bg-background-primary align-middle"
                />
              ) : null}
            </tr>
          </thead>
          <tbody>
            {pageClients.map((client) => (
              <tr
                key={client.id}
                role="button"
                tabIndex={0}
                onClick={() => onQuickView(client)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onQuickView(client);
                  }
                }}
                className={cn(
                  "border-b border-border-subtle transition-colors last:border-b-0 cursor-pointer",
                  "hover:bg-background-secondary focus-within:bg-background-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-action-focus)]"
                )}
                aria-label={`Open details for ${client.entityName}`}
              >
                <td
                  className={cn(CHECKBOX_CELL_PAD, "py-2 align-middle")}
                  style={checkboxColStyle}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(client.id)}
                    onChange={() => toggleOne(client.id)}
                    aria-label={`Select ${client.entityName}`}
                    className="size-3.5 rounded border-border-regular cursor-pointer"
                  />
                </td>
                {columns.map((col) => {
                  const isClientName = col.id === "client_name";
                  const widthClass = COLUMN_WIDTH_CLASSES[col.id as ColumnId];
                  const tdClass = cn(
                    "py-2 align-middle",
                    isClientName &&
                      cn(CLIENT_NAME_CELL_PAD_X, "border-r border-border-regular overflow-hidden"),
                    !isClientName && cn("px-2", !clientPinnedFirst && widthClass),
                  );
                  const tdStyle: CSSProperties | undefined = isClientName
                    ? clientNameColElStyle
                    : clientPinnedFirst
                      ? flexDataColumnStyle(col.id as ColumnId)
                      : undefined;
                  return (
                    <td key={col.id} className={tdClass} style={tdStyle}>
                      {renderCell(client, col.id, onQuickView, mode)}
                    </td>
                  );
                })}
                {needsTrailingSpacerCol ? (
                  <td
                    key={TABLE_SPACER_COL_KEY}
                    aria-hidden
                    className="p-0 border-0 border-b border-border-subtle align-middle bg-transparent"
                  />
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationBar
        page={safePage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
