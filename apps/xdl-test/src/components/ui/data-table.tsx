import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { usePendingValue } from "@/hooks/use-pending-value";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  Column,
  SortingState,
  ColumnPinningState,
  ColumnFiltersState,
  FilterFn,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
  Switch,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FilterConfig,
  FilterValue,
  ActiveFilter,
  FilterDropdown,
  ActiveFilterBadges,
} from "./filters";

function SortableColumnItem({
  column,
  isLocked,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>;
  isLocked: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id, disabled: isLocked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between px-3 ${isLocked ? "pointer-events-none cursor-not-allowed text-neutral-300" : ""}`}
    >
      <div className="flex items-center gap-1">
        <label className={`flex cursor-pointer items-center gap-1`}>
          <div className="flex size-9 items-center justify-center">
            <Checkbox
              className="size-5"
              checked={column.getIsVisible()}
              disabled={isLocked}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            />
          </div>
          <span className="capitalize">
            {column.id.replace(/([A-Z])/g, " $1").trim()}
          </span>
        </label>
      </div>
      <div
        {...(!isLocked ? attributes : {})}
        {...(!isLocked ? listeners : {})}
        className={`flex size-6 items-center justify-center ${isLocked ? "" : "text-text-faint hover:text-text-default cursor-grab active:cursor-grabbing"}`}
      >
        {isLocked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="17"
            fill="none"
            viewBox="0 0 13 17"
          >
            <path
              fill="#616b7a"
              d="M11.875 5.625H10V3.75A3.754 3.754 0 0 0 6.25 0 3.754 3.754 0 0 0 2.5 3.75v1.875H.625A.625.625 0 0 0 0 6.25v9.375c0 .345.28.625.625.625h11.25c.345 0 .625-.28.625-.625V6.25a.625.625 0 0 0-.625-.625M3.75 3.75c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5v1.875h-5zM11.25 15h-10V6.875h10zM7.5 10c0 .461-.253.86-.625 1.077V12.5a.625.625 0 0 1-1.25 0v-1.423A1.25 1.25 0 0 1 5 10a1.25 1.25 0 1 1 2.5 0"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="7"
            fill="none"
            viewBox="0 0 14 7"
          >
            <path
              fill="#1e3145"
              d="M13.75 5.625c0 .345-.28.625-.625.625H.625a.625.625 0 1 1 0-1.25h12.5c.345 0 .625.28.625.625M13.125 0H.625a.625.625 0 0 0 0 1.25h12.5a.625.625 0 1 0 0-1.25m0 2.5H.625a.625.625 0 1 0 0 1.25h12.5a.625.625 0 1 0 0-1.25"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
}

// --- Editable cell components ---

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type SelectProps = SearchableDropdownProps;

function SaveCancelButtons({
  onCancel,
  onConfirm,
  saveDisabled,
  className,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  saveDisabled?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`text-button-small-medium border-border-soft bg-background-primary shadow-lift absolute top-full right-0 z-50 mt-1 flex w-full items-center justify-end gap-1 rounded-lg border p-2 ${className ?? ""}`}
    >
      <Button variant="secondary" size="xs" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="xs" onClick={onConfirm} disabled={saveDisabled}>
        Save
      </Button>
    </div>
  );
}

function DropdownOptions({
  options,
  currentValue,
  onSelect,
}: {
  options: string[];
  currentValue: string;
  onSelect: (option: string) => void;
}) {
  return (
    <div className="max-h-48 overflow-y-auto">
      {options.length > 0 ? (
        options.map((option, index) => (
          <div
            key={index}
            className={`text-text-default hover:bg-background-secondary cursor-pointer overflow-hidden px-3 py-1.5 text-[13px] text-ellipsis whitespace-nowrap ${
              option === currentValue ? "bg-background-secondary" : ""
            }`}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))
      ) : (
        <div className="text-text-faint px-3 py-1.5 text-[13px]">
          No options found
        </div>
      )}
    </div>
  );
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, options]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    setSearchTerm("");
  }, []);

  const handleSelect = (option: string) => {
    if (option !== value) {
      onChange(option);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className={`focus-within:ring-action-default focus-within:inset-ring-action-default absolute inset-0 h-full w-full focus-within:rounded-sm focus-within:ring-1 focus-within:inset-ring-1 ${
        isOpen
          ? "ring-action-default inset-ring-action-default rounded-sm ring-1 inset-ring-1"
          : ""
      }`}
      ref={dropdownRef}
      tabIndex={0}
    >
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-text-default truncate overflow-hidden px-3 py-2 text-[13px] text-ellipsis whitespace-nowrap">
          {value || placeholder}
          <div className="bg-background-secondary absolute top-1/2 right-3 flex h-8 -translate-y-1/2 items-center justify-center opacity-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                fill="#1e3145"
                d="M9.818 1.067 5.443 5.442a.625.625 0 0 1-.884 0L.184 1.067A.625.625 0 0 1 .626 0h8.75c.555 0 .834.674.442 1.067"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-border-soft bg-background-primary absolute top-full right-0 left-0 z-50 mt-1 max-h-60 w-50 overflow-hidden rounded-md border shadow-lg">
          <div className="border-border-soft border-b p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="focus:ring-action-default border-border-soft w-full rounded border px-2 py-1 text-[13px] focus:ring-2 focus:ring-offset-1 focus:outline-none"
              autoFocus
            />
          </div>
          <DropdownOptions
            options={filteredOptions}
            currentValue={value}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

interface EditableDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export function EditableDescription({
  value,
  onChange,
}: EditableDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    setPendingValue,
    displayValue,
    hasPendingChange,
    handleConfirm,
    handleCancel: pendingCancel,
  } = usePendingValue(value, onChange);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useClickOutside(containerRef, () => {
    if (isEditing) {
      setEditValue(value);
      setIsEditing(false);
    }
  }, [isEditing, value]);

  const handleCancel = () => {
    pendingCancel();
    setEditValue(value);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (isEditing && editValue !== value) {
      onChange(editValue);
    } else if (hasPendingChange) {
      handleConfirm();
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (editValue !== value) {
        onChange(editValue);
      }
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    if (!hasPendingChange) {
      setEditValue(displayValue);
      setIsEditing(true);
    }
  };

  return (
    <div
      className={`focus-within:ring-action-default focus-within:inset-ring-action-default absolute inset-0 h-full w-full focus-within:rounded-sm focus-within:ring-1 focus-within:inset-ring-1 ${
        isEditing
          ? "ring-action-default inset-ring-action-default rounded-sm ring-1 inset-ring-1"
          : ""
      }`}
      ref={containerRef}
      tabIndex={0}
    >
      {isEditing ? (
        <div className="flex h-full w-full items-center px-3">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-text-default w-full bg-transparent text-[13px] outline-none"
          />
        </div>
      ) : (
        <div className="group relative cursor-pointer" onClick={startEditing}>
          <div className="text-text-default truncate overflow-hidden px-3 py-2 text-[13px] text-ellipsis whitespace-nowrap">
            {displayValue}
            <div className="bg-background-secondary absolute top-1/2 right-3 flex h-8 -translate-y-1/2 items-center justify-center opacity-0 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="14"
                fill="none"
                viewBox="0 0 7 14"
              >
                <path
                  fill="#1e3145"
                  d="M3.75 7.5v3.125c0 1.034.841 1.875 1.875 1.875a.625.625 0 0 1 0 1.25 3.12 3.12 0 0 1-2.5-1.258 3.12 3.12 0 0 1-2.5 1.258.625.625 0 0 1 0-1.25A1.877 1.877 0 0 0 2.5 10.625V7.5H.625a.625.625 0 0 1 0-1.25H2.5V3.125A1.877 1.877 0 0 0 .625 1.25a.625.625 0 0 1 0-1.25c1.023 0 1.93.496 2.5 1.258A3.12 3.12 0 0 1 5.625 0a.625.625 0 0 1 0 1.25A1.877 1.877 0 0 0 3.75 3.125V6.25h1.875a.625.625 0 0 1 0 1.25z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
      {(isEditing || hasPendingChange) && (
        <SaveCancelButtons
          onCancel={handleCancel}
          onConfirm={handleSave}
          saveDisabled={isEditing ? editValue === value : false}
        />
      )}
    </div>
  );
}

export function Select({ options, value, onChange, placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  }, []);

  const handleSelect = (option: string) => {
    if (option !== value) {
      onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`focus-within:ring-action-default focus-within:inset-ring-action-default absolute inset-0 h-full w-full focus-within:rounded-sm focus-within:ring-1 focus-within:inset-ring-1 ${
        isOpen
          ? "ring-action-default inset-ring-action-default rounded-sm ring-1 inset-ring-1"
          : ""
      }`}
      ref={dropdownRef}
      tabIndex={0}
    >
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-text-default truncate overflow-hidden px-3 py-2 text-[13px] text-ellipsis whitespace-nowrap">
          {value || placeholder}
          <div className="bg-background-secondary absolute top-1/2 right-3 flex h-8 -translate-y-1/2 items-center justify-center opacity-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                fill="#1e3145"
                d="M9.818 1.067 5.443 5.442a.625.625 0 0 1-.884 0L.184 1.067A.625.625 0 0 1 .626 0h8.75c.555 0 .834.674.442 1.067"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-border-soft bg-background-primary absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-hidden rounded-md border shadow-lg">
          <DropdownOptions
            options={options}
            currentValue={value}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export interface ColumnFilterConfig {
  [columnId: string]: FilterConfig;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: React.ReactNode;
  enableRowSelection?: boolean;
  lockedColumns?: string[];
  columnFilters?: ColumnFilterConfig;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
  enableRowSelection = true,
  lockedColumns = [],
  columnFilters: columnFilterConfig = {},
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: enableRowSelection ? ["select"] : [],
  });
  const [columnOptionsView, setColumnOptionsView] = useState<"main" | "sort">(
    "main"
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const parseDateString = (dateStr: string): Date | null => {
    // Try parsing common date formats
    // Format: "9 Mar 2026" or "25 Feb 2026"
    const monthMap: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const parts = dateStr.trim().split(" ");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = monthMap[parts[1]];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }

    // Try ISO format or any other format that Date can parse
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const customFilterFn = useCallback<FilterFn<TData>>(
    (row, columnId, filterValue) => {
      const filter = filterValue as FilterValue;
      const cellValue = row.getValue(columnId);

      if (!filter) return true;

      switch (filter.type) {
        case "text": {
          const strValue = String(cellValue ?? "").toLowerCase();
          return strValue.includes(filter.value.toLowerCase());
        }
        case "number": {
          const numValue = parseFloat(
            String(cellValue ?? "").replace(/,/g, "")
          );
          if (isNaN(numValue)) return false;
          if (filter.min !== undefined && numValue < filter.min) return false;
          if (filter.max !== undefined && numValue > filter.max) return false;
          return true;
        }
        case "date": {
          const dateValue = String(cellValue ?? "");
          if (!dateValue) return false;

          const cellDate = parseDateString(dateValue);
          if (!cellDate) return false;

          if (filter.from) {
            const fromDate = new Date(filter.from);
            fromDate.setHours(0, 0, 0, 0);
            cellDate.setHours(0, 0, 0, 0);
            if (cellDate < fromDate) return false;
          }

          if (filter.to) {
            const toDate = new Date(filter.to);
            toDate.setHours(23, 59, 59, 999);
            const checkDate = new Date(cellDate);
            checkDate.setHours(23, 59, 59, 999);
            if (checkDate > toDate) return false;
          }

          return true;
        }
        case "multiSelect": {
          const strValue = String(cellValue ?? "");
          return filter.values.includes(strValue);
        }
        default:
          return true;
      }
    },
    []
  );

  const filterableColumns = useMemo(() => {
    return columns
      .filter((col) => {
        const colId =
          col.id || ("accessorKey" in col ? String(col.accessorKey) : null);
        return colId && columnFilterConfig[colId];
      })
      .map((col) => {
        const colId =
          col.id || ("accessorKey" in col ? String(col.accessorKey) : "");
        return {
          id: colId,
          label:
            typeof col.header === "string"
              ? col.header
              : colId.replace(/([A-Z])/g, " $1").trim(),
          filterConfig: columnFilterConfig[colId],
        };
      });
  }, [columns, columnFilterConfig]);

  const handleFilterChange = (columnId: string, filter: FilterValue | null) => {
    if (filter) {
      setColumnFilters((prev) => {
        const existing = prev.filter((f) => f.id !== columnId);
        return [...existing, { id: columnId, value: filter }];
      });

      setActiveFilters((prev) => {
        const existing = prev.filter((f) => f.columnId !== columnId);
        const column = filterableColumns.find((c) => c.id === columnId);
        return [
          ...existing,
          {
            columnId,
            columnLabel: column?.label ?? columnId,
            filter,
          },
        ];
      });
    } else {
      setColumnFilters((prev) => prev.filter((f) => f.id !== columnId));
      setActiveFilters((prev) => prev.filter((f) => f.columnId !== columnId));
    }
  };

  const handleRemoveFilter = (columnId: string) => {
    handleFilterChange(columnId, null);
  };

  const handleClearAllFilters = () => {
    setColumnFilters([]);
    setActiveFilters([]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const defaultSelectColumn: ColumnDef<TData, unknown> = {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          className="size-5"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          className="size-5"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
    size: 36,
  };

  const columnsWithFilters = useMemo(() => {
    return columns.map((col) => {
      const colId =
        col.id || ("accessorKey" in col ? String(col.accessorKey) : null);
      if (colId && columnFilterConfig[colId]) {
        return {
          ...col,
          filterFn: customFilterFn,
          enableColumnFilter: true,
        };
      }
      return col;
    });
  }, [columns, columnFilterConfig, customFilterFn]);

  const finalColumns = enableRowSelection
    ? [defaultSelectColumn, ...columnsWithFilters]
    : columnsWithFilters;

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      rowSelection,
      globalFilter,
      columnVisibility,
      sorting,
      columnOrder,
      columnPinning,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="bg-background-primary flex items-center justify-end gap-2 rounded-t-lg p-3">
          <div className="focus-within:ring-action-default border-border-subtle relative flex h-8 items-center gap-2 rounded-md border pr-8 pl-2 ring-2 ring-transparent ring-offset-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 15 15"
            >
              <path
                fill="#1e3145"
                d="m14.817 13.933-4.264-4.264a5.937 5.937 0 1 0-.884.884l4.264 4.264a.625.625 0 1 0 .884-.884m-8.88-3.308a4.687 4.687 0 1 1 0-9.375 4.687 4.687 0 0 1 0 9.375"
              ></path>
            </svg>
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="text-input-regular text-content-default placeholder:text-text-faint w-56 focus:outline-none"
              placeholder="Search"
            />
            {globalFilter && (
              <button
                className="hover:bg-tertiary absolute top-0.75 right-1 flex size-6 items-center justify-center rounded-sm"
                onClick={() => setGlobalFilter("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="#1e3145"
                    d="M10.594 5.29 8.384 7.5l2.21 2.21a.625.625 0 1 1-.884.884L7.5 8.384l-2.21 2.21a.625.625 0 1 1-.884-.884l2.21-2.21-2.21-2.21a.625.625 0 0 1 .884-.884l2.21 2.21 2.21-2.21a.625.625 0 0 1 .884.884M15 7.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-1.25 0a6.25 6.25 0 1 0-12.5 0 6.25 6.25 0 0 0 12.5 0"
                  ></path>
                </svg>
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
        </div>

        <div className="border-border-soft bg-background-primary flex items-center justify-between border-t p-3">
          <div className="flex items-center gap-2">
            {activeFilters.length > 0 && (
              <ActiveFilterBadges
                filters={activeFilters}
                columns={filterableColumns}
                onRemove={handleRemoveFilter}
                onFilterChange={handleFilterChange}
              />
            )}
            {filterableColumns.length > 0 && (
              <FilterDropdown
                columns={filterableColumns}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            )}
            {activeFilters.length > 1 && (
              <button
                onClick={handleClearAllFilters}
                className="text-button-small-medium text-action-default hover:text-action-hover"
              >
                Clear filters
              </button>
            )}
          </div>
          <Popover className="relative">
            <Button asChild variant="secondary" size="xs">
              <PopoverButton onClick={() => setColumnOptionsView("main")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3.5"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="#1e3145"
                    d="M6.25.625v12.5c0 .345-.28.625-.625.625h-5A.625.625 0 0 1 0 13.125V.625C0 .28.28 0 .625 0h5c.345 0 .625.28.625.625m7.5 0v12.5c0 .345-.28.625-.625.625h-5a.625.625 0 0 1-.625-.625V.625C7.5.28 7.78 0 8.125 0h5c.345 0 .625.28.625.625m-1.25.625H8.75V12.5h3.75z"
                  ></path>
                </svg>
                Column options
              </PopoverButton>
            </Button>
            <PopoverPanel
              anchor={{ to: "bottom end" }}
              className="text-input-regular border-border-soft bg-background-primary shadow-lift z-30 w-75 origin-top translate-y-0 overflow-hidden! rounded-lg border opacity-100 transition ease-in-out [--anchor-gap:8px] data-closed:translate-y-1 data-closed:opacity-0"
              transition
            >
              <div className="relative overflow-hidden">
                {/* Main view */}
                <div
                  className={`py-3 transition-all duration-200 ease-in-out ${
                    columnOptionsView === "main"
                      ? "relative translate-x-0 opacity-100"
                      : "absolute inset-x-0 top-0 -translate-x-full opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {/* Sort by trigger */}
                    <button
                      onClick={() => setColumnOptionsView("sort")}
                      className="text-body-standard-semibold mb-1 flex w-full cursor-pointer items-center justify-between px-3 text-left hover:bg-neutral-50"
                    >
                      <div className="flex items-center">
                        <span className="flex size-10 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="14"
                            fill="none"
                            viewBox="0 0 18 14"
                          >
                            <path
                              fill="currentColor"
                              d="M8.567 4.817a.625.625 0 0 1-.884 0L5 2.134v10.991a.625.625 0 1 1-1.25 0V2.134L1.067 4.817a.625.625 0 1 1-.884-.884l3.75-3.75a.625.625 0 0 1 .884 0l3.75 3.75a.625.625 0 0 1 0 .884m8.75 4.116a.625.625 0 0 0-.884 0l-2.683 2.683V.625a.625.625 0 0 0-1.25 0v10.991L9.817 8.933a.625.625 0 1 0-.884.884l3.75 3.75c.244.244.64.244.884 0l3.75-3.75a.625.625 0 0 0 0-.884"
                            ></path>
                          </svg>
                        </span>
                        Sort by
                      </div>
                      <span className="flex h-10 w-8 rotate-180 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 12"
                        >
                          <path
                            fill="#1e3145"
                            d="M13.75 5.625c0 .345-.28.625-.625.625H2.134l3.933 3.933a.625.625 0 0 1-.884.884l-5-5a.625.625 0 0 1 0-.884l5-5a.625.625 0 1 1 .884.884L2.134 5h10.991c.345 0 .625.28.625.625"
                          ></path>
                        </svg>
                      </span>
                    </button>

                    <div className="mb-2 h-px w-full bg-neutral-100" />

                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event: DragEndEvent) => {
                        const { active, over } = event;
                        if (!active || !over || active.id === over.id) return;
                        if (lockedColumns.includes(active.id as string)) return;

                        const currentOrder =
                          table.getState().columnOrder.length > 0
                            ? table.getState().columnOrder
                            : table.getAllLeafColumns().map((c) => c.id);

                        const oldIndex = currentOrder.indexOf(
                          active.id as string
                        );
                        const newIndex = currentOrder.indexOf(
                          over.id as string
                        );

                        table.setColumnOrder(
                          arrayMove(currentOrder, oldIndex, newIndex)
                        );
                      }}
                    >
                      <SortableContext
                        items={(table.getState().columnOrder.length > 0
                          ? table.getState().columnOrder
                          : table.getAllLeafColumns().map((c) => c.id)
                        ).filter((id) => id !== "select" && id !== "file")}
                        strategy={verticalListSortingStrategy}
                      >
                        {[...table.getAllLeafColumns()]
                          .sort((a, b) => {
                            const order =
                              table.getState().columnOrder.length > 0
                                ? table.getState().columnOrder
                                : table.getAllLeafColumns().map((c) => c.id);
                            return order.indexOf(a.id) - order.indexOf(b.id);
                          })
                          .map((column) => {
                            if (column.id === "select" || column.id === "file")
                              return null;
                            return (
                              <SortableColumnItem
                                key={column.id}
                                column={column}
                                isLocked={lockedColumns.includes(column.id)}
                              />
                            );
                          })}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>

                {/* Sort submenu view */}
                <div
                  className={`py-3 transition-all duration-200 ease-in-out ${
                    columnOptionsView === "sort"
                      ? "relative translate-x-0 opacity-100"
                      : "absolute inset-x-0 top-0 translate-x-full opacity-0"
                  }`}
                >
                  <div className="text-input-regular flex flex-col">
                    <button
                      onClick={() => setColumnOptionsView("main")}
                      className="text-body-standard-semibold mb-2 flex w-full cursor-pointer items-center justify-start px-3 text-left hover:bg-neutral-50"
                    >
                      <span className="flex h-10 w-8 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 12"
                        >
                          <path
                            fill="#1e3145"
                            d="M13.75 5.625c0 .345-.28.625-.625.625H2.134l3.933 3.933a.625.625 0 0 1-.884.884l-5-5a.625.625 0 0 1 0-.884l5-5a.625.625 0 1 1 .884.884L2.134 5h10.991c.345 0 .625.28.625.625"
                          ></path>
                        </svg>
                      </span>
                      Sort by
                    </button>
                    <div className="h-px w-full bg-neutral-100" />
                    <span className="text-label-small-semibold text-text-faint px-4 pt-3 pb-2 tracking-wide">
                      Column
                    </span>
                    <RadioGroup
                      value={sorting.length > 0 ? sorting[0].id : ""}
                      onChange={(columnId: string) => {
                        const currentDesc =
                          sorting.length > 0 && sorting[0].id === columnId
                            ? sorting[0].desc
                            : false;
                        setSorting([{ id: columnId, desc: currentDesc }]);
                      }}
                    >
                      {table
                        .getAllLeafColumns()
                        .filter(
                          (column) =>
                            column.id !== "select" &&
                            column.id !== "file" &&
                            column.getCanSort()
                        )
                        .map((column) => (
                          <Radio
                            key={column.id}
                            value={column.id}
                            className="group flex cursor-pointer items-center gap-1 px-3 hover:bg-neutral-50"
                          >
                            <span className="flex size-10 items-center justify-center">
                              <span className="border-border-subtle group-data-checked:border-action-default group-data-checked:bg-action-default flex size-5 items-center justify-center rounded-full border transition-colors">
                                <span className="bg-background-primary size-2 scale-0 rounded-full transition-transform group-data-checked:scale-100" />
                              </span>
                            </span>
                            <span className="capitalize">
                              {typeof column.columnDef.header === "string"
                                ? column.columnDef.header
                                : column.id.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                          </Radio>
                        ))}
                    </RadioGroup>

                    <div className="border-border-soft mt-2 border-t">
                      <span className="text-label-small-semibold text-text-faint block w-full px-4 pt-3 pb-2 tracking-wide">
                        Direction
                      </span>
                      <RadioGroup
                        value={
                          sorting.length > 0 && sorting[0].desc ? "desc" : "asc"
                        }
                        onChange={(dir: string) => {
                          if (sorting.length > 0) {
                            setSorting([
                              { ...sorting[0], desc: dir === "desc" },
                            ]);
                          }
                        }}
                      >
                        <Radio
                          value="asc"
                          className="group flex cursor-pointer items-center gap-1 px-3 hover:bg-neutral-50"
                        >
                          <span className="flex size-10 items-center justify-center">
                            <span className="border-border-subtle group-data-checked:border-action-default group-data-checked:bg-action-default flex size-5 items-center justify-center rounded-full border transition-colors">
                              <span className="bg-background-primary size-2 scale-0 rounded-full transition-transform group-data-checked:scale-100" />
                            </span>
                          </span>
                          <span>Ascending</span>
                        </Radio>
                        <Radio
                          value="desc"
                          className="group flex cursor-pointer items-center gap-1 px-3 hover:bg-neutral-50"
                        >
                          <span className="flex size-10 items-center justify-center">
                            <span className="border-border-subtle group-data-checked:border-action-default group-data-checked:bg-action-default flex size-5 items-center justify-center rounded-full border transition-colors">
                              <span className="bg-background-primary size-2 scale-0 rounded-full transition-transform group-data-checked:scale-100" />
                            </span>
                          </span>
                          <span>Descending</span>
                        </Radio>
                      </RadioGroup>
                    </div>

                    {sorting.length > 0 && (
                      <div className="border-border-soft mt-2 border-t pt-2">
                        <button
                          onClick={() => setSorting([])}
                          className="text-sentiment-negative-foreground flex w-full items-center gap-1 px-3 text-left hover:bg-neutral-50"
                        >
                          <span className="flex size-10 items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              fill="none"
                              viewBox="0 0 10 10"
                            >
                              <path
                                fill="currentColor"
                                d="M9.022 8.138a.625.625 0 0 1-.884.884L4.602 5.486 1.067 9.022a.625.625 0 0 1-.884-.884l3.536-3.536L.183 1.067a.625.625 0 0 1 .884-.884L4.602 3.72 8.138.183a.625.625 0 1 1 .884.884L5.486 4.602z"
                              ></path>
                            </svg>
                          </span>
                          Clear sort
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>

      <div className="bg-background-primary rounded-b-lg">
        <table className="border-border-soft text-text-default! min-w-full table-fixed border-t">
          <colgroup>
            {table.getFlatHeaders().map((header) => (
              <col key={header.id} style={{ width: header.getSize() }} />
            ))}
          </colgroup>
          <thead className="text-label-small-semibold bg-background-secondary">
            {table.getSelectedRowModel().rows.length > 0 ? (
              <tr>
                {/* Checkbox column */}
                <th
                  scope="col"
                  className="border-border-soft relative h-9 border-r px-0 text-left last-of-type:border-r-0"
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                    width: table
                      .getFlatHeaders()
                      .find((h) => h.id === "select")
                      ?.getSize(),
                  }}
                >
                  <div className="flex items-center justify-center">
                    <Checkbox
                      className="size-5"
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                      }
                      onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                      }
                    />
                  </div>
                </th>
                {/* Actions & selection count spanning remaining columns */}
                <th
                  colSpan={table.getVisibleFlatColumns().length - 1}
                  scope="col"
                  className="border-border-soft relative h-9 border-r px-3 text-left last-of-type:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-body-small-regular text-text-faint">
                        {table.getSelectedRowModel().rows.length} selected
                      </span>
                      {actions}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field className="flex cursor-pointer items-center gap-2">
                        <Switch
                          checked={showSelectedOnly}
                          onChange={setShowSelectedOnly}
                          className="group data-checked:bg-action-default relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-neutral-100 transition-colors duration-200 ease-in-out"
                        >
                          <span className="bg-background-primary pointer-events-none inline-block size-4 translate-x-0 transform rounded-full shadow ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-4"></span>
                        </Switch>
                        <Label className="text-body-small-regular text-text-faint font-normal whitespace-nowrap">
                          Only show selected
                        </Label>
                      </Field>
                      {/* <button
                        className="button-secondary flex items-center gap-1"
                        onClick={() => {
                          table.toggleAllRowsSelected(false);
                          setShowSelectedOnly(false);
                        }}
                      >
                        Clear selection
                      </button> */}
                    </div>
                  </div>
                </th>
              </tr>
            ) : (
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className={`group has-data-focus:ring-action-default has-data-focus:inset-ring-action-default border-border-soft relative h-9 border-r text-left last-of-type:border-r-0 has-data-focus:rounded-sm has-data-focus:ring-1 has-data-focus:inset-ring-2 has-data-focus:outline-0 has-data-open:bg-neutral-50 ${header.column.id === "select" ? "px-0" : "px-3"}`}
                      style={{
                        position: header.column.getIsPinned()
                          ? "sticky"
                          : "relative",
                        left:
                          header.column.getIsPinned() === "left"
                            ? `${header.column.getStart("left")}px`
                            : undefined,
                        right:
                          header.column.getIsPinned() === "right"
                            ? `${header.column.getAfter("right")}px`
                            : undefined,
                        zIndex: header.column.getIsPinned() ? 2 : 1,
                        ...(header.column.id === "select" && {
                          width: header.column.getSize(),
                          maxWidth: header.column.getSize(),
                        }),
                      }}
                    >
                      {header.isPlaceholder ? null : header.column.getCanFilter() ? (
                        <Popover as="div" className="relative w-full">
                          <PopoverButton className="flex w-full items-center justify-between focus:outline-none">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="3"
                              height="13"
                              fill="none"
                              viewBox="0 0 3 13"
                              className="mr-0.5"
                            >
                              <path
                                fill="currentColor"
                                d="M0 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M1.25 5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0 5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
                              ></path>
                            </svg>{" "}
                          </PopoverButton>
                          <PopoverPanel
                            anchor={{ to: "bottom start" }}
                            className="text-input-regular border-border-soft bg-background-primary shadow-lift z-30 -ml-3 flex w-75 origin-top translate-y-0 flex-col rounded-lg border py-3 opacity-100 transition ease-in-out [--anchor-gap:13px] data-closed:translate-y-1 data-closed:opacity-0"
                            transition
                          >
                            <div>
                              <button
                                onClick={() =>
                                  table.setSorting([
                                    { id: header.column.id, desc: false },
                                  ])
                                }
                                className={`flex w-full cursor-pointer items-center justify-start rounded-none border-r-2 border-l-2 border-transparent px-2 text-left hover:bg-neutral-50 ${
                                  header.column.getIsSorted() === "asc"
                                    ? "text-action-default border-l-action-default"
                                    : ""
                                }`}
                              >
                                <span className="flex size-10 items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="14"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M7.5 6.875c0 .345-.28.625-.625.625H.625a.625.625 0 0 1 0-1.25h6.25c.345 0 .625.28.625.625m-.625 4.375H.625a.625.625 0 1 0 0 1.25h6.25a.625.625 0 1 0 0-1.25m0-10H.625a.625.625 0 1 0 0 1.25h6.25a.625.625 0 0 0 0-1.25m9.817 7.683a.625.625 0 0 0-.884 0l-2.683 2.683V.625a.625.625 0 1 0-1.25 0v10.991L9.192 8.933a.625.625 0 1 0-.884.884l3.75 3.75c.244.244.64.244.884 0l3.75-3.75a.625.625 0 0 0 0-.884"
                                    ></path>
                                  </svg>
                                </span>
                                Sort Ascending
                              </button>
                              <button
                                onClick={() =>
                                  table.setSorting([
                                    { id: header.column.id, desc: true },
                                  ])
                                }
                                className={`flex w-full cursor-pointer items-center justify-start rounded-none border-r-2 border-l-2 border-transparent px-2 text-left hover:bg-neutral-50 ${
                                  header.column.getIsSorted() === "desc"
                                    ? "text-action-default border-l-action-default"
                                    : ""
                                }`}
                              >
                                <span className="flex size-10 items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="14"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M7.5 11.875c0 .345-.28.625-.625.625H.625a.625.625 0 1 1 0-1.25h6.25c.345 0 .625.28.625.625M6.875 6.25H.625a.625.625 0 1 0 0 1.25h6.25a.625.625 0 0 0 0-1.25m0-5H.625a.625.625 0 1 0 0 1.25h6.25a.625.625 0 0 0 0-1.25m9.817 2.683-3.75-3.75a.625.625 0 0 0-.884 0l-3.75 3.75a.625.625 0 0 0 .884.884l2.683-2.683v10.991a.625.625 0 1 0 1.25 0V2.134l2.683 2.683a.625.625 0 1 0 .884-.884"
                                    ></path>
                                  </svg>
                                </span>
                                Sort Descending
                              </button>
                              <div className="my-2 h-px w-full bg-neutral-100" />
                              <button
                                onClick={() => {
                                  const isPinned = header.column.getIsPinned();
                                  header.column.pin(isPinned ? false : "left");
                                }}
                                disabled={lockedColumns.includes(
                                  header.column.id
                                )}
                                className={`flex w-full cursor-pointer items-center justify-start rounded-none border-r-2 border-l-2 border-transparent px-2 text-left hover:bg-neutral-50 ${
                                  header.column.getIsPinned()
                                    ? "text-action-default border-l-action-default"
                                    : ""
                                }`}
                              >
                                <span className="flex size-10 items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="7"
                                    height="15"
                                    fill="none"
                                    viewBox="0 0 7 15"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M6.875 3.438A3.44 3.44 0 0 0 3.438 0 3.44 3.44 0 0 0 0 3.438a3.44 3.44 0 0 0 2.813 3.377v7.56a.625.625 0 0 0 1.25 0v-7.56a3.44 3.44 0 0 0 2.812-3.378M3.438 5.624A2.19 2.19 0 0 1 1.25 3.438 2.19 2.19 0 0 1 3.438 1.25a2.19 2.19 0 0 1 2.187 2.188 2.19 2.19 0 0 1-2.187 2.187"
                                    ></path>
                                  </svg>
                                </span>
                                {header.column.getIsPinned() ? "Unpin" : "Pin"}
                              </button>
                              <div className="my-2 h-px w-full bg-neutral-100" />
                              <button
                                onClick={() => {
                                  const currentOrder =
                                    table.getState().columnOrder.length > 0
                                      ? table.getState().columnOrder
                                      : table
                                          .getAllLeafColumns()
                                          .map((c) => c.id);
                                  const currentIndex = currentOrder.indexOf(
                                    header.column.id
                                  );
                                  const minIndex = enableRowSelection ? 1 : 0;

                                  let targetIndex = currentIndex - 1;
                                  while (
                                    targetIndex >= minIndex &&
                                    (lockedColumns.includes(
                                      currentOrder[targetIndex]
                                    ) ||
                                      currentOrder[targetIndex] === "select" ||
                                      currentOrder[targetIndex] === "file")
                                  ) {
                                    targetIndex--;
                                  }

                                  if (targetIndex >= minIndex) {
                                    const newOrder = [...currentOrder];
                                    // Swap the two unlocked columns
                                    [
                                      newOrder[currentIndex],
                                      newOrder[targetIndex],
                                    ] = [
                                      newOrder[targetIndex],
                                      newOrder[currentIndex],
                                    ];
                                    table.setColumnOrder(newOrder);
                                  }
                                }}
                                disabled={
                                  lockedColumns.includes(header.column.id) ||
                                  (() => {
                                    const currentOrder =
                                      table.getState().columnOrder.length > 0
                                        ? table.getState().columnOrder
                                        : table
                                            .getAllLeafColumns()
                                            .map((c) => c.id);
                                    const currentIndex = currentOrder.indexOf(
                                      header.column.id
                                    );
                                    const minIndex = enableRowSelection ? 1 : 0;
                                    let targetIndex = currentIndex - 1;
                                    while (
                                      targetIndex >= minIndex &&
                                      (lockedColumns.includes(
                                        currentOrder[targetIndex]
                                      ) ||
                                        currentOrder[targetIndex] ===
                                          "select" ||
                                        currentOrder[targetIndex] === "file")
                                    ) {
                                      targetIndex--;
                                    }
                                    return targetIndex < minIndex;
                                  })()
                                }
                                className="disabled:text-action-disabled flex w-full cursor-pointer items-center justify-start px-3 text-left hover:bg-neutral-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                              >
                                <span className="flex size-10 items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="12"
                                    fill="none"
                                    viewBox="0 0 14 12"
                                  >
                                    <path
                                      className="fill-current"
                                      d="M13.75 5.625c0 .345-.28.625-.625.625H2.134l3.933 3.933a.625.625 0 0 1-.884.884l-5-5a.625.625 0 0 1 0-.884l5-5a.625.625 0 1 1 .884.884L2.134 5h10.991c.345 0 .625.28.625.625"
                                    ></path>
                                  </svg>
                                </span>
                                Move left
                              </button>
                              <button
                                onClick={() => {
                                  const currentOrder =
                                    table.getState().columnOrder.length > 0
                                      ? table.getState().columnOrder
                                      : table
                                          .getAllLeafColumns()
                                          .map((c) => c.id);
                                  const currentIndex = currentOrder.indexOf(
                                    header.column.id
                                  );

                                  let targetIndex = currentIndex + 1;
                                  while (
                                    targetIndex < currentOrder.length &&
                                    (lockedColumns.includes(
                                      currentOrder[targetIndex]
                                    ) ||
                                      currentOrder[targetIndex] === "select" ||
                                      currentOrder[targetIndex] === "file")
                                  ) {
                                    targetIndex++;
                                  }

                                  if (targetIndex < currentOrder.length) {
                                    const newOrder = [...currentOrder];
                                    // Swap the two unlocked columns
                                    [
                                      newOrder[currentIndex],
                                      newOrder[targetIndex],
                                    ] = [
                                      newOrder[targetIndex],
                                      newOrder[currentIndex],
                                    ];
                                    table.setColumnOrder(newOrder);
                                  }
                                }}
                                disabled={
                                  lockedColumns.includes(header.column.id) ||
                                  (() => {
                                    const currentOrder =
                                      table.getState().columnOrder.length > 0
                                        ? table.getState().columnOrder
                                        : table
                                            .getAllLeafColumns()
                                            .map((c) => c.id);
                                    const currentIndex = currentOrder.indexOf(
                                      header.column.id
                                    );
                                    let targetIndex = currentIndex + 1;
                                    while (
                                      targetIndex < currentOrder.length &&
                                      (lockedColumns.includes(
                                        currentOrder[targetIndex]
                                      ) ||
                                        currentOrder[targetIndex] ===
                                          "select" ||
                                        currentOrder[targetIndex] === "file")
                                    ) {
                                      targetIndex++;
                                    }
                                    return targetIndex >= currentOrder.length;
                                  })()
                                }
                                className="disabled:text-action-disabled flex w-full cursor-pointer items-center justify-start px-3 text-left hover:bg-neutral-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                              >
                                <span className="flex size-10 items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="12"
                                    fill="none"
                                    viewBox="0 0 14 12"
                                  >
                                    <path
                                      className="fill-current"
                                      d="M0 5.625C0 5.28.28 5 .625 5h10.991L7.683 1.067a.625.625 0 0 1 .884-.884l5 5a.625.625 0 0 1 0 .884l-5 5a.625.625 0 1 1-.884-.884l3.933-3.933H.625A.625.625 0 0 1 0 5.625"
                                    ></path>
                                  </svg>
                                </span>
                                Move right
                              </button>
                              <button
                                onClick={() =>
                                  header.column.toggleVisibility(false)
                                }
                                disabled={lockedColumns.includes(
                                  header.column.id
                                )}
                                className="flex w-full cursor-pointer items-center justify-start px-3 text-left hover:bg-neutral-50"
                              >
                                <span className="flex size-10 items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="13"
                                    fill="none"
                                    viewBox="0 0 18 13"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M17.438 5.979C17.321 5.735 14.494 0 8.75 0 3.007 0 .18 5.735.062 5.979a.62.62 0 0 0 0 .542C.18 6.765 3.007 12.5 8.75 12.5s8.57-5.735 8.688-5.979a.62.62 0 0 0 0-.542M8.75 11.25c-4.29 0-6.805-3.92-7.416-5 .611-1.08 3.126-5 7.416-5s6.806 3.922 7.416 5c-.61 1.08-3.126 5-7.416 5m0-8.437A3.44 3.44 0 0 0 5.313 6.25 3.44 3.44 0 0 0 8.75 9.688a3.44 3.44 0 0 0 3.438-3.438A3.44 3.44 0 0 0 8.75 2.813m0 5.624A2.19 2.19 0 0 1 6.563 6.25 2.19 2.19 0 0 1 8.75 4.063a2.19 2.19 0 0 1 2.188 2.187A2.19 2.19 0 0 1 8.75 8.438"
                                    ></path>
                                  </svg>
                                </span>
                                Hide
                              </button>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ) : (
                        <div
                          className={`flex items-center ${header.column.id === "select" ? "justify-center" : "justify-between"}`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))
            )}
          </thead>
          <tbody className="text-body-small-regular bg-background-primary">
            {table
              .getRowModel()
              .rows.filter((row) => !showSelectedOnly || row.getIsSelected())
              .map((row) => (
                <tr
                  key={row.id}
                  className={`border-border-soft hover:bg-background-secondary border-t ${row.getIsSelected() ? "bg-[#E8F0FE] hover:bg-[#E8F0FE]!" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`border-border-soft relative h-9 border-r bg-inherit last-of-type:border-0 ${cell.column.id === "select" ? "px-0" : "px-3"}`}
                      style={{
                        position: cell.column.getIsPinned()
                          ? "sticky"
                          : "relative",
                        left:
                          cell.column.getIsPinned() === "left"
                            ? `${cell.column.getStart("left")}px`
                            : undefined,
                        right:
                          cell.column.getIsPinned() === "right"
                            ? `${cell.column.getAfter("right")}px`
                            : undefined,
                        zIndex: cell.column.getIsPinned() ? 1 : undefined,
                        ...(cell.column.id === "select" && {
                          width: cell.column.getSize(),
                          maxWidth: cell.column.getSize(),
                        }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="text-body-small-regular border-border-soft flex items-center justify-between border-t px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-text-faint">Items per page</span>
            <Popover className="relative">
              <PopoverButton className="focus:ring-action-default text-body-small-regular data-active:ring-action-default border-border-soft bg-background-primary text-text-default data-active:border-action-default flex cursor-pointer items-center gap-1 rounded border py-1 pr-2 pl-2 ring-2 ring-transparent ring-offset-1 outline-none">
                {table.getState().pagination.pageSize}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  fill="none"
                  viewBox="0 0 10 6"
                  className="ml-1"
                >
                  <path
                    fill="#1E3145"
                    d="M5 5.625a.62.62 0 0 1-.442-.183l-4.375-4.375a.625.625 0 0 1 .884-.884L5 4.116 8.933.183a.625.625 0 1 1 .884.884l-4.375 4.375A.62.62 0 0 1 5 5.625"
                  />
                </svg>
              </PopoverButton>
              <PopoverPanel
                anchor={{ to: "bottom start" }}
                className="border-border-primary bg-background-primary shadow-lift z-30 w-25 rounded-lg border py-1 transition ease-in-out [--anchor-gap:4px] data-closed:opacity-0"
                transition
              >
                {[10, 20, 50, 100].map((pageSize) => (
                  <CloseButton
                    key={pageSize}
                    as="button"
                    onClick={() => table.setPageSize(pageSize)}
                    className={`text-input-regular relative w-full cursor-pointer px-5 py-2 text-left before:absolute before:top-0 before:left-0 before:h-full before:w-0.75 hover:bg-neutral-50 ${
                      table.getState().pagination.pageSize === pageSize
                        ? "before:bg-action-default text-action-default"
                        : "text-text-default"
                    }`}
                  >
                    {pageSize}
                  </CloseButton>
                ))}
              </PopoverPanel>
            </Popover>
            <span className="text-text-faint ml-1 flex items-center gap-1">
              Showing items
              <span>
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
                –
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{" "}
                of {table.getFilteredRowModel().rows.length}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                className="group flex size-6 items-center justify-center"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="12"
                  fill="none"
                  viewBox="0 0 14 12"
                  className="rotate-180"
                >
                  <path
                    className="fill-text-default group-disabled:fill-text-faint"
                    d="M0 5.625C0 5.28.28 5 .625 5h10.991L7.683 1.067a.625.625 0 0 1 .884-.884l5 5a.625.625 0 0 1 0 .884l-5 5a.625.625 0 1 1-.884-.884l3.933-3.933H.625A.625.625 0 0 1 0 5.625"
                  ></path>
                </svg>
              </button>
              <Popover className="relative">
                <PopoverButton className="text-body-small-regular focus:ring-action-default data-active:ring-action-default bg-background-primary text-text-default flex cursor-pointer items-center gap-1 rounded py-1 pr-2 pl-2 ring-2 ring-transparent ring-offset-1 outline-none">
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="6"
                    fill="none"
                    viewBox="0 0 10 6"
                    className="ml-1"
                  >
                    <path
                      fill="#1E3145"
                      d="M5 5.625a.62.62 0 0 1-.442-.183l-4.375-4.375a.625.625 0 0 1 .884-.884L5 4.116 8.933.183a.625.625 0 1 1 .884.884l-4.375 4.375A.62.62 0 0 1 5 5.625"
                    />
                  </svg>
                </PopoverButton>
                <PopoverPanel
                  anchor={{ to: "bottom start" }}
                  className="border-border-primary bg-background-primary shadow-lift z-30 w-25 overflow-y-auto rounded-lg border py-1 transition ease-in-out [--anchor-gap:4px] data-closed:opacity-0"
                  transition
                >
                  {Array.from({ length: table.getPageCount() }).map((_, i) => (
                    <CloseButton
                      key={i}
                      as="button"
                      onClick={() => table.setPageIndex(i)}
                      className={`text-input-regular relative w-full cursor-pointer px-5 py-2 text-left before:absolute before:top-0 before:left-0 before:h-full before:w-0.75 hover:bg-neutral-50 ${
                        table.getState().pagination.pageIndex === i
                          ? "before:bg-action-default text-action-default"
                          : "text-text-default"
                      }`}
                    >
                      {i + 1} of {table.getPageCount()}
                    </CloseButton>
                  ))}
                </PopoverPanel>
              </Popover>
              <button
                className="group flex size-6 items-center justify-center"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="12"
                  fill="none"
                  viewBox="0 0 14 12"
                >
                  <path
                    className="fill-text-default group-disabled:fill-text-faint"
                    d="M0 5.625C0 5.28.28 5 .625 5h10.991L7.683 1.067a.625.625 0 0 1 .884-.884l5 5a.625.625 0 0 1 0 .884l-5 5a.625.625 0 1 1-.884-.884l3.933-3.933H.625A.625.625 0 0 1 0 5.625"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
