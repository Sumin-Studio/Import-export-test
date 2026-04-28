import type { ReactNode } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { ImportConfidence } from '../../lib/confidence';
import {
  confidenceBadgeTone,
  confidenceFromSeverity,
  confidenceLabel,
  worstSeverity,
  worstSeverityFromIds,
} from '../../lib/confidence';
import type { FlaggedIssue, ReviewBundle } from '../../types/domain';

export const IMPORT_SECTION_IDS: { id: string; label: string }[] = [
  { id: 'company', label: 'Company details' },
  { id: 'employees', label: 'Employees' },
  { id: 'schedules', label: 'Pay schedules' },
  { id: 'earnings', label: 'Earnings and deductions' },
  { id: 'ytd', label: 'YTD payroll history' },
  { id: 'tax', label: 'Tax-related totals' },
];

function earningsRowConfidence(
  status: 'imported' | 'needs-review' | 'confirmed',
): ImportConfidence {
  if (status === 'needs-review') return 'moderate';
  return 'high';
}

export function defaultImportSectionsExpanded(collapsed: boolean): Record<string, boolean> {
  const c = collapsed;
  return {
    company: !c,
    employees: !c,
    schedules: !c,
    earnings: !c,
    ytd: !c,
    tax: !c,
  };
}

function SectionBlock({
  id,
  title,
  copy,
  expanded,
  onToggle,
  onEdit,
  hideActions,
  sectionConfidence,
  children,
}: {
  id: string;
  title: string;
  copy: string;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  hideActions?: boolean;
  sectionConfidence?: ImportConfidence;
  children: ReactNode;
}) {
  return (
    <Card pad className="x-review-section" id={`sec-${id}`} style={{ marginBottom: 16 }}>
      <div className="x-section-head">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <h2 className="x-section-title">{title}</h2>
          {sectionConfidence !== undefined ? (
            <Badge tone={confidenceBadgeTone(sectionConfidence)}>
              {confidenceLabel(sectionConfidence)}
            </Badge>
          ) : null}
        </div>
        <button type="button" className="x-icon-btn" onClick={onToggle} aria-expanded={expanded}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <p className="x-section-copy">{copy}</p>
      {expanded ? (
        <>
          {children}
          {!hideActions ? (
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Button variant="secondary" size="md" onClick={onEdit}>
                Edit
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}

interface ImportReviewSectionsProps {
  bundle: ReviewBundle;
  resolvedMap: Record<string, boolean>;
  expanded: Record<string, boolean>;
  onToggleSection: (id: string) => void;
  onEditSection: (id: string) => void;
  /** When false, hides section and row confidence badges (e.g. confirm step after review). Default true. */
  showConfidenceBadges?: boolean;
}

export function ImportReviewSections({
  bundle,
  resolvedMap,
  expanded,
  onToggleSection,
  onEditSection,
  showConfidenceBadges = true,
}: ImportReviewSectionsProps) {
  const bySec: Record<string, FlaggedIssue[]> = (() => {
    const m: Record<string, FlaggedIssue[]> = {};
    for (const s of IMPORT_SECTION_IDS) m[s.id] = [];
    for (const i of bundle.issues) {
      if (resolvedMap[i.id]) continue;
      if (m[i.sectionId]) m[i.sectionId].push(i);
    }
    return m;
  })();

  const sectionConfidence = (sectionId: string): ImportConfidence =>
    confidenceFromSeverity(worstSeverity(bySec[sectionId] ?? [], resolvedMap));

  const secBadge = (id: string) =>
    showConfidenceBadges ? sectionConfidence(id) : undefined;

  const toggle = (id: string) => () => onToggleSection(id);

  return (
    <>
      <SectionBlock
        id="company"
        title="Company details"
        copy="Legal entity and filing context carried over from QuickBooks."
        expanded={expanded.company}
        onToggle={toggle('company')}
        onEdit={() => onEditSection('company')}
        sectionConfidence={secBadge('company')}
      >
        <dl className="x-dl">
          <dt>Legal business name</dt>
          <dd>{bundle.company.legalName}</dd>
          <dt>EIN</dt>
          <dd>{bundle.company.ein}</dd>
          <dt>Business address</dt>
          <dd>{bundle.company.address}</dd>
          <dt>Payroll start date</dt>
          <dd>{bundle.company.payrollStartDate}</dd>
          <dt>Filing frequency</dt>
          <dd>{bundle.company.filingFrequency}</dd>
        </dl>
      </SectionBlock>

      <SectionBlock
        id="employees"
        title="Employees"
        copy="Active employees and current pay setup."
        expanded={expanded.employees}
        onToggle={toggle('employees')}
        onEdit={() => onEditSection('employees')}
        sectionConfidence={secBadge('employees')}
      >
        <div className="x-table-wrap">
          <table className="x-table">
            <thead>
              <tr>
                <th scope="col">Employee</th>
                <th scope="col">Status</th>
                <th scope="col">Pay type</th>
                <th scope="col">Pay rate</th>
                <th scope="col">Deductions</th>
                {showConfidenceBadges ? <th scope="col">Confidence</th> : null}
              </tr>
            </thead>
            <tbody>
              {bundle.employees.map((emp) => {
                const sev = worstSeverityFromIds(emp.issueIds, bundle.issues, resolvedMap);
                const conf = confidenceFromSeverity(sev);
                return (
                  <tr key={emp.id} data-issue={showConfidenceBadges && conf !== 'high' ? true : undefined}>
                    <td>{emp.name}</td>
                    <td>{emp.status}</td>
                    <td>{emp.payType}</td>
                    <td>{emp.payRate}</td>
                    <td>{emp.deductionsCount}</td>
                    {showConfidenceBadges ? (
                      <td>
                        <Badge tone={confidenceBadgeTone(conf)}>{confidenceLabel(conf)}</Badge>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock
        id="schedules"
        title="Pay schedules"
        copy="Frequency, typical pay dates, and the next scheduled run."
        expanded={expanded.schedules}
        onToggle={toggle('schedules')}
        onEdit={() => onEditSection('schedules')}
        sectionConfidence={secBadge('schedules')}
      >
        <div className="x-table-wrap">
          <table className="x-table">
            <thead>
              <tr>
                <th scope="col">Schedule</th>
                <th scope="col">Frequency</th>
                <th scope="col">Pay dates</th>
                <th scope="col">Next run</th>
              </tr>
            </thead>
            <tbody>
              {bundle.paySchedules.map((p) => (
                <tr key={p.id}>
                  <td>{p.label}</td>
                  <td>{p.frequency}</td>
                  <td>{p.payDates}</td>
                  <td>{p.nextRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock
        id="earnings"
        title="Earnings and deductions"
        copy="Mapped pay items from QuickBooks to Xero categories."
        expanded={expanded.earnings}
        onToggle={toggle('earnings')}
        onEdit={() => onEditSection('earnings')}
        sectionConfidence={secBadge('earnings')}
      >
        <div className="x-table-wrap">
          <table className="x-table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">QuickBooks</th>
                <th scope="col">Imported to Xero</th>
                <th scope="col">Count</th>
                {showConfidenceBadges ? <th scope="col">Confidence</th> : null}
              </tr>
            </thead>
            <tbody>
              {bundle.earningsDeductions.map((row) => {
                const conf = earningsRowConfidence(row.status);
                return (
                  <tr key={row.id} data-issue={showConfidenceBadges && conf !== 'high' ? true : undefined}>
                    <td>{row.type}</td>
                    <td>{row.qbLabel}</td>
                    <td>{row.xeroLabel}</td>
                    <td>{row.count}</td>
                    {showConfidenceBadges ? (
                      <td>
                        <Badge tone={confidenceBadgeTone(conf)}>{confidenceLabel(conf)}</Badge>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      <SectionBlock
        id="ytd"
        title="Year-to-date payroll history"
        copy="Aggregated YTD figures from imported pay runs."
        expanded={expanded.ytd}
        onToggle={toggle('ytd')}
        onEdit={() => onEditSection('ytd')}
        sectionConfidence={secBadge('ytd')}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
            gap: 12,
          }}
        >
          <div className="x-kpi">
            <div className="x-kpi__label">Gross pay YTD</div>
            <div className="x-kpi__value">{bundle.ytd.gross}</div>
          </div>
          <div className="x-kpi">
            <div className="x-kpi__label">Taxes withheld YTD</div>
            <div className="x-kpi__value">{bundle.ytd.taxesWithheld}</div>
          </div>
          <div className="x-kpi">
            <div className="x-kpi__label">Deductions YTD</div>
            <div className="x-kpi__value">{bundle.ytd.deductions}</div>
          </div>
          <div className="x-kpi">
            <div className="x-kpi__label">Employer taxes YTD</div>
            <div className="x-kpi__value">{bundle.ytd.employerTaxes}</div>
          </div>
          <div className="x-kpi">
            <div className="x-kpi__label">Payroll runs imported</div>
            <div className="x-kpi__value">{bundle.ytd.runsImported}</div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="tax"
        title="Tax-related totals and filing setup"
        copy="High-level view of withheld and employer amounts."
        expanded={expanded.tax}
        onToggle={toggle('tax')}
        onEdit={() => onEditSection('tax')}
        sectionConfidence={secBadge('tax')}
      >
        <ul className="x-priority-list" style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Federal:</strong> {bundle.tax.federal}
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>State:</strong> {bundle.tax.state}
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Employer:</strong> {bundle.tax.employer}
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Filing setup detected:</strong> {bundle.tax.filingSetup}
          </li>
          <li>
            <strong>Items requiring confirmation:</strong> {bundle.tax.itemsNeedingConfirmation}
          </li>
        </ul>
      </SectionBlock>
    </>
  );
}
