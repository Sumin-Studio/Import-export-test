import { Link } from 'react-router-dom';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { pricingPackages } from '../data/researchContent';

export function PricingPage() {
  return (
    <WizardShell step="review" showStepper={false} backTo="/">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Pricing and packaging concepts</h1>
        <p style={{ margin: '0 0 24px', color: 'var(--x-color-text-secondary)', maxWidth: 680 }}>
          Estimates for comparison — not a quote, cart, or binding offer. Use these cards to discuss
          willingness to pay and perceived value of expert support.
        </p>
        <div style={{ display: 'grid', gap: 16 }}>
          {pricingPackages.map((p) => (
            <Card key={p.id} pad>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline' }}>
                <h2 style={{ margin: 0, fontSize: '1.0625rem' }}>{p.headline}</h2>
                {p.priceHint ? (
                  <span style={{ fontSize: 'var(--x-text-sm)', color: 'var(--x-color-status-info)', fontWeight: 600 }}>
                    {p.priceHint}
                  </span>
                ) : null}
              </div>
              <p style={{ margin: '8px 0', fontWeight: 600, color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
                {p.name}
              </p>
              <p style={{ margin: '0 0 8px', fontSize: 'var(--x-text-sm)' }}>{p.description}</p>
              <p style={{ margin: 0, fontSize: 'var(--x-text-xs)', color: 'var(--x-color-text-tertiary)' }}>
                {p.notes}
              </p>
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
