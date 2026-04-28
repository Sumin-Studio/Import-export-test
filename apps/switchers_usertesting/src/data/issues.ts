import type { FlaggedIssue, ReviewScenario } from '../types/domain';

const happyOptional: FlaggedIssue[] = [
  {
    id: 'iss-happy-1',
    severity: 'optional',
    category: 'other',
    title: 'Optional: confirm pay schedule labels',
    description:
      'Labels matched automatically. You can rename schedules in Xero Payroll after the switch if needed.',
    sourceValue: 'Twice monthly (24) — "Primary"',
    suggestedValue: 'Twice monthly — Primary',
    primaryConfirmLabel: 'Keep suggested label',
    alternateActions: [
      {
        id: 'rename-later',
        type: 'stub_navigate',
        label: 'Rename in Xero later',
        description: 'Skip for now and edit schedule names after you switch.',
        stubMessage:
          'In the full product you would finish import, then open Payroll settings to rename pay schedules.',
      },
    ],
    sectionId: 'schedules',
  },
];

const lowConfidence: FlaggedIssue[] = [
  {
    id: 'iss-lc-1',
    severity: 'critical',
    category: 'deduction',
    title: 'Help us confirm this deduction mapping',
    description:
      'QuickBooks labels do not always line up one-to-one with Xero pay items. Please confirm this suggested match or choose another mapping that fits how you pay your team.',
    sourceValue: 'Wellness stipend (QBO)',
    suggestedValue: 'Allowance (taxable)',
    primaryConfirmLabel: 'Use recommended match',
    alternateActions: [
      {
        id: 'remap-nontax',
        type: 'remap',
        label: 'Map to a different pay item',
        description: 'Pick how this should appear in Xero.',
        remapTargets: [
          'Reimbursement (non-taxable)',
          'Other earnings',
          'Bonus (taxable)',
        ],
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Get help from a payroll specialist',
        description: 'We can review this mapping with you before you continue.',
      },
    ],
    sectionId: 'earnings',
    rowRef: 'Wellness stipend',
  },
  {
    id: 'iss-lc-2',
    severity: 'recommended',
    category: 'payroll-history',
    title: 'We found payroll history to double-check',
    description:
      'Two pay runs in QuickBooks used a legacy pay item. A quick review helps make sure totals match what you expect in Xero.',
    sourceValue: 'Runs: Mar 1 and Mar 15 — legacy "Misc pay"',
    suggestedValue: 'Map to "Bonus (taxable)" for both runs',
    primaryConfirmLabel: 'Confirm mapping for both runs',
    alternateActions: [
      {
        id: 'review-runs',
        type: 'stub_navigate',
        label: 'Open payroll run details',
        description: 'Compare each run before deciding.',
        stubMessage:
          'In the full product this would open each affected pay run so you can verify gross, net, and line items side by side.',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Get help from a payroll specialist',
      },
    ],
    sectionId: 'ytd',
  },
  {
    id: 'iss-lc-3',
    severity: 'recommended',
    category: 'employee',
    title: 'Two employee records worth a quick look',
    description:
      'Historical payroll entries differ slightly from current employee setup. Confirming rates and statuses keeps everything aligned.',
    sourceValue: 'Mike Williams — hourly tiers; Emily Brown — stipend',
    suggestedValue: 'Use current employee rates as source of truth',
    primaryConfirmLabel: 'Confirm for both employees',
    alternateActions: [
      {
        id: 'open-employees',
        type: 'stub_navigate',
        label: 'Review employee records first',
        description: 'Open each profile to verify rates and pay templates.',
        stubMessage:
          'In the full product this would deep-link to Mike Williams and Emily Brown so you can reconcile history vs current setup.',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Get help from a payroll specialist',
      },
    ],
    sectionId: 'employees',
    employeeName: 'Mike Williams, Emily Brown',
  },
  {
    id: 'iss-lc-4',
    severity: 'critical',
    category: 'tax',
    title: 'Confirm this tax setting matches how you file today',
    description:
      'State unemployment rate in QuickBooks differs from the default Xero detected for California. Pick the version that matches your current filings.',
    sourceValue: 'SUI rate 3.4% (QBO)',
    suggestedValue: 'SUI rate 3.5% (Xero default 2026)',
    primaryConfirmLabel: 'Use Xero default rate (3.5%)',
    alternateActions: [
      {
        id: 'qb-rate',
        type: 'resolve_as',
        label: 'Use QuickBooks rate (3.4%)',
        description: 'Match what you file in QuickBooks today.',
        resolvedSummary: 'Applied QuickBooks SUI rate (3.4%)',
        resolvedXeroLabel: 'SUI rate 3.4% (QuickBooks)',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Get help from a payroll specialist',
      },
    ],
    sectionId: 'tax',
  },
];

const corrections: FlaggedIssue[] = [
  {
    id: 'iss-co-1',
    severity: 'critical',
    category: 'deduction',
    title: 'Help us confirm this deduction mapping',
    description:
      'This item needs a quick confirmation. Choose the suggested mapping or pick another pay item that fits.',
    sourceValue: 'Tech stipend (QBO)',
    suggestedValue: 'Stipend (taxable)',
    primaryConfirmLabel: 'Confirm suggested mapping',
    alternateActions: [
      {
        id: 'remap',
        type: 'remap',
        label: 'Choose a different mapping',
        remapTargets: ['Reimbursement (non-taxable)', 'Bonus (taxable)', 'Allowance (taxable)'],
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Expert help',
        description: 'We can recommend the right pay item for this stipend.',
      },
    ],
    sectionId: 'earnings',
  },
  {
    id: 'iss-co-2',
    severity: 'critical',
    category: 'employee',
    title: 'Help us confirm local tax for this employee',
    description:
      'Local tax was withheld in QuickBooks — please confirm the work location in Xero so withholding stays correct.',
    sourceValue: 'John Smith — local tax "City OLF"',
    suggestedValue: 'Assign San Francisco local tax',
    primaryConfirmLabel: 'Confirm San Francisco local tax',
    alternateActions: [
      {
        id: 'remap-jurisdiction',
        type: 'remap',
        label: 'Use a different local jurisdiction',
        remapTargets: ['Oakland local tax', 'No local tax (verify)', 'Other — specify in Xero'],
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Expert help',
      },
    ],
    sectionId: 'employees',
    employeeName: 'John Smith',
  },
  {
    id: 'iss-co-3',
    severity: 'critical',
    category: 'payroll-history',
    title: 'One payroll run needs a quick reconciliation check',
    description:
      'Net pay on one imported run does not match gross minus taxes and deductions. You can accept the adjustment or dig into the details.',
    sourceValue: 'Run dated Apr 1 — net variance $12.40',
    suggestedValue: 'Adjust to match QuickBooks net (recommended)',
    primaryConfirmLabel: 'Accept adjustment to match QuickBooks net',
    alternateActions: [
      {
        id: 'review-lines',
        type: 'stub_navigate',
        label: 'Review line items in detail',
        stubMessage:
          'In the full product this would open the run breakdown so you can edit earnings, taxes, and deductions before accepting.',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Expert help',
      },
    ],
    sectionId: 'ytd',
  },
  {
    id: 'iss-co-4',
    severity: 'recommended',
    category: 'tax',
    title: 'Filing frequency differs between federal and state',
    description:
      'QuickBooks shows monthly state deposits while Xero suggests quarterly based on liability.',
    sourceValue: 'State: Monthly (QBO)',
    suggestedValue: 'State: Quarterly (Xero suggestion)',
    primaryConfirmLabel: 'Switch state deposits to quarterly (Xero)',
    alternateActions: [
      {
        id: 'keep-monthly',
        type: 'resolve_as',
        label: 'Keep monthly state deposits (QuickBooks)',
        resolvedSummary: 'Kept monthly state deposit schedule',
        resolvedXeroLabel: 'State: Monthly (deposits)',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Expert help',
      },
    ],
    sectionId: 'tax',
  },
  {
    id: 'iss-co-5',
    severity: 'recommended',
    category: 'earnings',
    title: 'Overtime rule may need verification',
    description:
      'California daily OT rules detected. Confirm overtime earnings mapped with correct multipliers.',
    sourceValue: 'OT 1.5x / double-time mix',
    suggestedValue: 'Map to Xero CA overtime templates',
    primaryConfirmLabel: 'Confirm CA overtime mapping',
    alternateActions: [
      {
        id: 'edit-rules',
        type: 'stub_navigate',
        label: 'Adjust overtime rules after switch',
        stubMessage:
          'In the full product you would open Earnings rules to fine-tune daily vs weekly OT and double-time thresholds.',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Expert help',
      },
    ],
    sectionId: 'earnings',
  },
  {
    id: 'iss-co-6',
    severity: 'optional',
    category: 'other',
    title: 'Optional: employer contribution naming',
    description: 'Names differ but tax treatment matches. You can standardize labels later.',
    sourceValue: '401(k) ER match',
    suggestedValue: '401(k) employer contribution',
    primaryConfirmLabel: 'Use Xero label',
    alternateActions: [
      {
        id: 'keep-qb',
        type: 'resolve_as',
        label: 'Keep QuickBooks name',
        resolvedSummary: 'Kept QuickBooks contribution label',
        resolvedXeroLabel: '401(k) ER match',
      },
    ],
    sectionId: 'earnings',
  },
  {
    id: 'iss-co-7',
    severity: 'optional',
    category: 'other',
    title: 'Optional: next run date is close to a holiday',
    description: 'Your next biweekly pay date falls on a public holiday. Confirm the adjusted date.',
    sourceValue: 'Next run May 9',
    suggestedValue: 'Move to May 8 (business day prior)',
    primaryConfirmLabel: 'Use adjusted date (May 8)',
    alternateActions: [
      {
        id: 'keep-may9',
        type: 'resolve_as',
        label: 'Keep May 9',
        resolvedSummary: 'Kept original pay date (May 9)',
        resolvedXeroLabel: 'Next run May 9',
      },
    ],
    sectionId: 'schedules',
  },
  {
    id: 'iss-co-8',
    severity: 'recommended',
    category: 'employee',
    title: 'Sarah Johnson — benefit class mismatch',
    description:
      'Medical plan tier in QuickBooks does not match the class selected in Xero during import.',
    sourceValue: 'Tier II (QBO)',
    suggestedValue: 'Tier I (Xero)',
    primaryConfirmLabel: 'Use Xero tier (Tier I)',
    alternateActions: [
      {
        id: 'keep-qb-tier',
        type: 'resolve_as',
        label: 'Keep QuickBooks tier (Tier II)',
        resolvedSummary: 'Kept QuickBooks benefit tier (Tier II)',
        resolvedXeroLabel: 'Tier II (QuickBooks)',
      },
      {
        id: 'expert',
        type: 'expert',
        label: 'Expert help',
      },
    ],
    sectionId: 'employees',
    employeeName: 'Sarah Johnson',
  },
];

export function getIssuesForScenario(scenario: ReviewScenario): FlaggedIssue[] {
  switch (scenario) {
    case 'smooth':
      return happyOptional;
    case 'few-review':
    case 'review-expert':
      return lowConfidence;
    case 'many-review':
      return corrections;
    default:
      return happyOptional;
  }
}
