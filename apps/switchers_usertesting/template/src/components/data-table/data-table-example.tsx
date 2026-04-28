"use client";

import * as React from "react";
import { type Table } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  CircleDotIcon,
  CircleOffIcon,
  HelpCircleIcon,
  XIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTableRowActions,
  DataTableViewOptions,
  type ColumnDef,
  type FacetedFilterOption,
  type RowAction,
} from "./index";

// =============================================================================
// EXAMPLE DATA TYPES
// =============================================================================

interface Task {
  id: string;
  title: string;
  status: "backlog" | "todo" | "in-progress" | "done" | "canceled";
  priority: "low" | "medium" | "high";
  label: "bug" | "feature" | "documentation";
}

// =============================================================================
// FILTER OPTIONS
// =============================================================================

const statuses: FacetedFilterOption[] = [
  { value: "backlog", label: "Backlog", icon: HelpCircleIcon },
  { value: "todo", label: "Todo", icon: CircleIcon },
  { value: "in-progress", label: "In Progress", icon: CircleDotIcon },
  { value: "done", label: "Done", icon: CheckCircleIcon },
  { value: "canceled", label: "Canceled", icon: CircleOffIcon },
];

const priorities: FacetedFilterOption[] = [
  { value: "low", label: "Low", icon: ArrowDownIcon },
  { value: "medium", label: "Medium", icon: ArrowRightIcon },
  { value: "high", label: "High", icon: ArrowUpIcon },
];

const labels: FacetedFilterOption[] = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];

// =============================================================================
// SAMPLE DATA
// =============================================================================

const sampleTasks: Task[] = [
  {
    id: "TASK-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD",
    status: "in-progress",
    priority: "medium",
    label: "documentation",
  },
  {
    id: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel",
    status: "backlog",
    priority: "medium",
    label: "documentation",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source sensor",
    status: "backlog",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-8686",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel",
    status: "canceled",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-1280",
    title: "Use the digital TLS panel, then you can transmit the haptic system",
    status: "done",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-7262",
    title: "The UTF8 application is down, parse the neural bandwidth",
    status: "done",
    priority: "high",
    label: "feature",
  },
  {
    id: "TASK-1138",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p",
    status: "in-progress",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-7184",
    title: "We need to program the back-end THX pixel!",
    status: "todo",
    priority: "low",
    label: "feature",
  },
  {
    id: "TASK-5160",
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end",
    status: "in-progress",
    priority: "high",
    label: "documentation",
  },
  {
    id: "TASK-5618",
    title:
      "Generating the driver won't do anything, we need to index the online SSL",
    status: "done",
    priority: "medium",
    label: "documentation",
  },
  {
    id: "TASK-6699",
    title:
      "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD",
    status: "backlog",
    priority: "medium",
    label: "documentation",
  },
  {
    id: "TASK-2858",
    title: "We need to override the online UDP bus!",
    status: "backlog",
    priority: "medium",
    label: "bug",
  },
  {
    id: "TASK-9864",
    title:
      "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive",
    status: "done",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-8404",
    title: "We need to generate the virtual HEX alarm!",
    status: "in-progress",
    priority: "low",
    label: "bug",
  },
];

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

function createColumns(): ColumnDef<Task>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px] font-mono text-xs">{row.getValue("id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const label = labels.find((l) => l.value === row.original.label);
        return (
          <div className="flex gap-2">
            {label && <Badge variant="outline">{label.label}</Badge>}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statuses.find((s) => s.value === row.getValue("status"));
        if (!status) return null;
        return (
          <div className="flex w-[120px] items-center gap-2">
            {status.icon && (
              <status.icon className="text-muted-foreground size-4" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = priorities.find(
          (p) => p.value === row.getValue("priority"),
        );
        if (!priority) return null;
        return (
          <div className="flex items-center gap-2">
            {priority.icon && (
              <priority.icon className="text-muted-foreground size-4" />
            )}
            <span>{priority.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const actions: RowAction[] = [
          { label: "Edit", onClick: () => console.log("Edit", row.original) },
          {
            label: "Make a copy",
            onClick: () => console.log("Copy", row.original),
          },
          {
            label: "Favorite",
            onClick: () => console.log("Favorite", row.original),
          },
          {
            label: "Delete",
            onClick: () => console.log("Delete", row.original),
            variant: "destructive",
            shortcut: "⌘⌫",
            separator: true,
          },
        ];
        return <DataTableRowActions actions={actions} />;
      },
    },
  ];
}

// =============================================================================
// TOOLBAR COMPONENT
// =============================================================================

function TasksToolbar({ table }: { table: Table<Task> }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <XIcon />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">Add Task</Button>
      </div>
    </div>
  );
}

// =============================================================================
// EXAMPLE COMPONENT
// =============================================================================

export function DataTableExample() {
  const columns = React.useMemo(() => createColumns(), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>
          A list of tasks with sorting, filtering, and pagination.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={sampleTasks}
          toolbar={(table) => <TasksToolbar table={table} />}
          defaultPageSize={10}
        />
      </CardContent>
    </Card>
  );
}
