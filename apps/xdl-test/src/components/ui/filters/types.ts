export type FilterType = "text" | "number" | "date" | "select" | "multiSelect";

export interface FilterConfig {
  type: FilterType;
  label?: string;
  options?: string[];
}

export interface TextFilter {
  type: "text";
  value: string;
}

export interface NumberFilter {
  type: "number";
  min?: number;
  max?: number;
}

export interface DateFilter {
  type: "date";
  from?: string;
  to?: string;
}

export interface SelectFilter {
  type: "select";
  value: string;
}

export interface MultiSelectFilter {
  type: "multiSelect";
  values: string[];
}

export type FilterValue =
  | TextFilter
  | NumberFilter
  | DateFilter
  | SelectFilter
  | MultiSelectFilter;

export interface ActiveFilter {
  columnId: string;
  columnLabel: string;
  filter: FilterValue;
}
