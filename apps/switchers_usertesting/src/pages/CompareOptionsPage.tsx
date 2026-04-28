import { Link } from 'react-router-dom';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { switchConcepts } from '../data/researchContent';

export function CompareOptionsPage() {
  return (
    <WizardShell step="review" showStepper={false} backTo="/">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Compare switching approaches</h1>
        <p style={{ margin: '0 0 24px', color: 'var(--x-color-text-secondary)', maxWidth: 720 }}>
          For comparison only — not a commitment or checkout. Use these cards to discuss preferred
          service model and tradeoffs.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {switchConcepts.map((c) => (
            <Card key={c.id} pad>
              <h2 style={{ margin: '0 0 8px', fontSize: '1.0625rem' }}>{c.title}</h2>
              <p style={{ margin: '0 0 12px', fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
                {c.description}
              </p>
              <div style={{ fontWeight: 600, fontSize: 'var(--x-text-sm)', marginBottom: 6 }}>
                Benefits
              </div>
              <ul style={{ margin: '0 0 12px', paddingLeft: 18, fontSize: 'var(--x-text-sm)' }}>
                {c.benefits.map((b) => (
                  <li key={b} style={{ marginBottom: 4 }}>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ fontWeight: 600, fontSize: 'var(--x-text-sm)', marginBottom: 6 }}>
                Tradeoffs
              </div>
              <ul style={{ margin: '0 0 12px', paddingLeft: 18, fontSize: 'var(--x-text-sm)' }}>
                {c.tradeoffs.map((b) => (
                  <li key={b} style={{ marginBottom: 4 }}>
                    {b}
                  </li>
                ))}
              </ul>
              <dl style={{ margin: 0, fontSize: 'var(--x-text-sm)' }}>
                <dt style={{ color: 'var(--x-color-text-secondary)', fontWeight: 600 }}>Time</dt>
                <dd style={{ margin: '4px 0 8px' }}>{c.timeExpectation}</dd>
                <dt style={{ color: 'var(--x-color-text-secondary)', fontWeight: 600 }}>Your involvement</dt>
                <dd style={{ margin: '4px 0 8px' }}>{c.userInvolvement}</dd>
                <dt style={{ color: 'var(--x-color-text-secondary)', fontWeight: 600 }}>Expert involvement</dt>
                <dd style={{ margin: '4px 0 0' }}>{c.expertInvolvement}</dd>
              </dl>
            </Card>
          ))}
        </div>
        <p style={{ marginTop: 24, fontSize: 'var(--x-text-sm)' }}>
          <Link to="/">← Back to overview</Link>
        </p>
      </div>
    </WizardShell>
  );
}
