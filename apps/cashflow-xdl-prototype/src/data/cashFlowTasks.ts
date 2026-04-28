export type TaskSeverity = 'warning' | 'critical' | 'opportunity';

export const SEVERITY_COLOR: Record<TaskSeverity, string> = {
  warning: '#F59E0B',
  critical: '#DE0E40',
  opportunity: '#13A972',
};

export type TaskActionVariant = 'secondary' | 'primary';

export interface TaskAction {
  label: string;
  variant: TaskActionVariant;
}

export interface CashFlowTask {
  id: string;
  severity: TaskSeverity;
  title: string;
  category: string;
  /** Number of weeks from today to compute the display date. */
  weekOffset: number;
  /** If set, overrides the computed date label for display. */
  dateLabel?: string;
  /** If set, overrides the chart balance at this task's week. */
  chartValue?: number;
  body: string | null;
  actions: TaskAction[];
  /** Cashflow impact in $ (positive = cash in, negative = cash out). Used for chart and display. */
  impactDelta: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function getTaskDate(weekOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + weekOffset * 7);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

export const CASH_FLOW_TASKS: CashFlowTask[] = [
  {
    id: 'task-pay-outgoing',
    severity: 'warning',
    title: 'Pay 2 large outgoing payments',
    category: 'Action needed',
    weekOffset: 1,
    dateLabel: 'April 20',
    body: null,
    actions: [],
    impactDelta: -6000,
  },
  {
    id: 'task-collect-invoices',
    severity: 'critical',
    title: 'Collect 3 overdue invoices totaling ~$27K',
    category: 'Action needed',
    weekOffset: 2,
    dateLabel: 'April 27',
    body: null,
    actions: [],
    impactDelta: 27000,
  },
  {
    id: 'task-adjust-payroll',
    severity: 'warning',
    title: "Adjust Sarah's first payroll date",
    category: 'Consider timing',
    weekOffset: 3,
    dateLabel: 'May 4',
    body: null,
    actions: [],
    impactDelta: 1000,
  },
  {
    id: 'task-prepay-vendors',
    severity: 'opportunity',
    title: 'Pre-pay 3 vendors for discount savings',
    category: 'Good window to act',
    weekOffset: 4,
    dateLabel: 'May 11',
    body: null,
    actions: [],
    impactDelta: 500,
  },
];
