import { lazy } from "react";

export const TimeSummaryChart = lazy(() => import("./TimeSummary"));
export const BillableHoursChart = lazy(() => import("./BillableHours"));
export const AnnualTaxReturnsChart = lazy(() => import("./AnnualTaxReturns"));
export const ActivityStatementsChart = lazy(
  () => import("./ActivityStatements")
);
export const LodgementsChart = lazy(() => import("./Lodgements"));
export const WorkloadInsightsChart = lazy(() => import("./WorkloadInsights"));
