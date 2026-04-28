import { Link } from 'react-router-dom';
import { SCENARIO_LABELS } from '../data/scenarios';
import { issueReviewTypeLabel } from '../lib/issueLabels';
import { buildReviewBundle } from '../data/reviewBundle';
import { usePrototypeStore } from '../store/prototypeStore';

/**
 * Screenshot / printable snapshot for moderators (nice-to-have).
 */
export function SummaryPage() {
  const scenario = usePrototypeStore((s) => s.scenario);
  const resolved = usePrototypeStore((s) => s.resolvedIssueIds);
  const bundle = buildReviewBundle(scenario);
  const open = bundle.issues.filter((i) => !resolved[i.id]);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 32,
        background: '#fff',
        minHeight: '100vh',
        fontFamily: 'var(--x-font-sans)',
      }}
      className="x-print-root"
    >
      <h1 style={{ marginTop: 0 }}>Switch review snapshot</h1>
      <p style={{ color: 'var(--x-color-text-secondary)' }}>
        Scenario: <strong>{SCENARIO_LABELS[scenario]}</strong> · Employees:{' '}
        {bundle.summaries.employeesImported} · Open items: {open.length} / {bundle.issues.length}
      </p>
      <h2 style={{ fontSize: '1rem' }}>Company</h2>
      <p>{bundle.company.legalName}</p>
      <h2 style={{ fontSize: '1rem' }}>Open items</h2>
      <ul>
        {open.map((i) => (
          <li key={i.id}>
            [{issueReviewTypeLabel(i.severity)}] {i.title}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 32, fontSize: 'var(--x-text-sm)' }}>
        <Link to="/">Overview</Link>
      </p>
      <style>{`
        @media print {
          .x-print-root { padding: 0; }
          a { color: inherit; text-decoration: none; }
        }
      `}</style>
    </div>
  );
}
