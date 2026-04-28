import { Link } from 'react-router-dom';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function DonePage() {
  return (
    <WizardShell step="done" backTo="/confirm" narrow>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <Badge tone="success">Complete</Badge>
        </div>
        <h1 style={{ margin: '0 0 12px', fontSize: '1.5rem' }}>You&apos;re all set</h1>
        <p style={{ margin: '0 0 28px', color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
          Your payroll switch setup is finished for this session. Open Xero Payroll when you&apos;re ready
          to run your next steps, or return to the overview anytime.
        </p>
        <Card pad style={{ textAlign: 'left', marginBottom: 16 }}>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
            <li style={{ marginBottom: 8 }}>Connection and import are complete</li>
            <li style={{ marginBottom: 8 }}>Review confirmations are saved for this prototype</li>
            <li>You can revisit expert options from payroll settings in a live product</li>
          </ul>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" block size="lg" type="button">
            Open Xero Payroll
          </Button>
          <Link to="/">
            <Button variant="secondary" block size="lg" type="button">
              Back to overview
            </Button>
          </Link>
        </div>
      </div>
    </WizardShell>
  );
}
