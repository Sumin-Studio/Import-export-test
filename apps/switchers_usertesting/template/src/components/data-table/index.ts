// Main DataTable component
export { DataTable, type DataTableProps } from "./data-table";

// Sub-components for building custom toolbars and columns
export { DataTableColumnHeader } from "./data-table-column-header";
export { DataTablePagination } from "./data-table-pagination";
export {
  DataTableFacetedFilter,
  type FacetedFilterOption,
} from "./data-table-faceted-filter";
export { DataTableViewOptions } from "./data-table-view-options";
export { DataTableRowActions, type RowAction } from "./data-table-row-actions";

// Re-export useful TanStack Table types
export type {
  ColumnDef,
  Column,
  Table,
  Row,
  RowSelectionState,
} from "@tanstack/react-table";
