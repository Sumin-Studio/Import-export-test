import type { Employee, ReviewBundle, ReviewScenario } from '../types/domain';
import {
  baseCompany,
  baseEmployees,
  baseEarnings,
  basePaySchedules,
  baseTax,
  baseYtd,
} from './baseEntities';
import { getIssuesForScenario } from './issues';

function cloneEmployees(employees: Employee[]): Employee[] {
  return employees.map((e) => ({ ...e, issueIds: [...e.issueIds] }));
}

function attachEmployeeIssues(scenario: ReviewScenario, employees: Employee[]): Employee[] {
  const list = cloneEmployees(employees);
  if (scenario === 'few-review' || scenario === 'review-expert') {
    const mw = list.find((x) => x.id === 'e3');
    const eb = list.find((x) => x.id === 'e4');
    if (mw) mw.issueIds.push('iss-lc-3');
    if (eb) eb.issueIds.push('iss-lc-3');
  }
  if (scenario === 'many-review') {
    const js = list.find((x) => x.id === 'e1');
    const sj = list.find((x) => x.id === 'e2');
    if (js) js.issueIds.push('iss-co-2');
    if (sj) sj.issueIds.push('iss-co-8');
  }
  return list;
}

function earningsForScenario(scenario: ReviewScenario) {
  const rows = baseEarnings.map((r) => ({ ...r }));
  if (scenario === 'few-review' || scenario === 'review-expert') {
    const w = rows.find((x) => x.qbLabel === 'Performance bonus');
    if (w) w.status = 'needs-review';
  }
  if (scenario === 'many-review') {
    rows.forEach((r) => {
      if (r.type === 'Pretax deduction' || r.type === 'Overtime') r.status = 'needs-review';
    });
  }
  return rows;
}

function taxForScenario(scenario: ReviewScenario) {
  const t = { ...baseTax };
  if (
    scenario === 'few-review' ||
    scenario === 'many-review' ||
    scenario === 'review-expert'
  ) {
    t.itemsNeedingConfirmation = scenario === 'many-review' ? 2 : 1;
  }
  return t;
}

export function buildReviewBundle(scenario: ReviewScenario): ReviewBundle {
  const issues = getIssuesForScenario(scenario);
  const employees = attachEmployeeIssues(scenario, baseEmployees);
  const earningsDeductions = earningsForScenario(scenario);
  const tax = taxForScenario(scenario);
  const critical = issues.filter((i) => i.severity === 'critical').length;
  const recommended = issues.filter((i) => i.severity === 'recommended').length;
  const optional = issues.filter((i) => i.severity === 'optional').length;

  return {
    company: { ...baseCompany },
    employees,
    paySchedules: basePaySchedules.map((p) => ({ ...p })),
    earningsDeductions,
    ytd: { ...baseYtd },
    tax,
    issues,
    summaries: {
      employeesImported: employees.length,
      paySchedulesFound: basePaySchedules.length,
      lastPayrollPeriod: 'Apr 1 – Apr 15, 2026',
      issuesNeedingReview: issues.length,
      criticalCount: critical,
      recommendedCount: recommended,
      optionalCount: optional,
    },
  };
}
