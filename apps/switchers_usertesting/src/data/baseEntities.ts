import type {
  Company,
  Employee,
  EarningsRow,
  PaySchedule,
  TaxSummary,
  YtdSummary,
} from '../types/domain';

export const baseCompany: Company = {
  legalName: 'Northline Studio LLC',
  ein: 'XX-XXX4567',
  address: '1200 Market St, Suite 400, San Francisco, CA 94102',
  payrollStartDate: 'January 1, 2024',
  filingFrequency: 'Semi-weekly (federal), Monthly (state)',
};

export const baseEmployees: Employee[] = [
  {
    id: 'e1',
    name: 'John Smith',
    status: 'Active',
    payType: 'Salary',
    payRate: '$5,200.00 / month',
    deductionsCount: 3,
    issueIds: [],
  },
  {
    id: 'e2',
    name: 'Sarah Johnson',
    status: 'Active',
    payType: 'Salary',
    payRate: '$4,800.00 / month',
    deductionsCount: 2,
    issueIds: [],
  },
  {
    id: 'e3',
    name: 'Mike Williams',
    status: 'Active',
    payType: 'Hourly',
    payRate: '$38.50 / hour',
    deductionsCount: 4,
    issueIds: [],
  },
  {
    id: 'e4',
    name: 'Emily Brown',
    status: 'Active',
    payType: 'Salary',
    payRate: '$5,500.00 / month',
    deductionsCount: 2,
    issueIds: [],
  },
];

export const basePaySchedules: PaySchedule[] = [
  {
    id: 'ps1',
    label: 'Primary schedule',
    frequency: 'Twice monthly (24)',
    payDates: '1st and 15th of each month',
    nextRun: 'May 15, 2026',
  },
  {
    id: 'ps2',
    label: 'Hourly staff',
    frequency: 'Biweekly (26)',
    payDates: 'Every other Friday',
    nextRun: 'May 9, 2026',
  },
];

export const baseEarnings: EarningsRow[] = [
  {
    id: 'er1',
    type: 'Salary',
    qbLabel: 'Salary',
    xeroLabel: 'Ordinary earnings',
    count: 3,
    status: 'imported',
  },
  {
    id: 'er2',
    type: 'Hourly',
    qbLabel: 'Hourly wages',
    xeroLabel: 'Ordinary earnings (hourly)',
    count: 1,
    status: 'imported',
  },
  {
    id: 'er3',
    type: 'Overtime',
    qbLabel: 'OT 1.5x',
    xeroLabel: 'Overtime',
    count: 1,
    status: 'imported',
  },
  {
    id: 'er4',
    type: 'Bonus',
    qbLabel: 'Performance bonus',
    xeroLabel: 'Bonus (taxable)',
    count: 2,
    status: 'imported',
  },
  {
    id: 'er5',
    type: 'Pretax deduction',
    qbLabel: '401(k) deferral',
    xeroLabel: '401(k) employee',
    count: 4,
    status: 'imported',
  },
  {
    id: 'er6',
    type: 'Post-tax deduction',
    qbLabel: 'Garnishment — support',
    xeroLabel: 'Court-ordered deduction',
    count: 1,
    status: 'imported',
  },
  {
    id: 'er7',
    type: 'Employer contribution',
    qbLabel: '401(k) match',
    xeroLabel: '401(k) employer',
    count: 4,
    status: 'imported',
  },
];

export const baseYtd: YtdSummary = {
  gross: '$21,500.00',
  taxesWithheld: '$4,300.00',
  deductions: '$1,075.00',
  employerTaxes: '$1,634.00',
  runsImported: 8,
};

export const baseTax: TaxSummary = {
  federal: '$2,890.00 withheld YTD',
  state: '$1,410.00 withheld YTD',
  employer: '$1,634.00 liability YTD',
  filingSetup: 'Federal Form 941, California DE 9/DE 9C',
  itemsNeedingConfirmation: 0,
};
