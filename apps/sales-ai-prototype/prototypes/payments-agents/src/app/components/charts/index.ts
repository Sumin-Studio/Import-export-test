import { lazy } from "react";

export const InvoicesOwedChart = lazy(() => import("./InvoicesOwed"));
export const CashInAndOutChart = lazy(() => import("./CashInAndOut"));
export const NetProfitLossChart = lazy(() => import("./NetProfitLoss"));
export const BillsToPayChart = lazy(() => import("./BillsToPay"));
