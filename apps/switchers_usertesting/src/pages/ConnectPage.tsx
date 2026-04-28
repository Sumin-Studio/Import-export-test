import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Banner } from '../components/ui/Banner';
import { usePrototypeStore } from '../store/prototypeStore';

export function ConnectPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const setConnectComplete = usePrototypeStore((s) => s.setConnectComplete);

  const connect = () => {
    setBusy(true);
    setConnectComplete(true);
    window.setTimeout(() => {
      navigate('/processing');
    }, 1400);
  };

  return (
    <WizardShell step="authorize" backTo="/" narrow>
      <Card pad>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.375rem' }}>
          Connect your QuickBooks payroll account
        </h1>
        <p style={{ margin: '0 0 20px', color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
          We need read access to payroll-related data in QuickBooks Online so we can prepare your
          switch to Xero Payroll. You will review imports before anything is finalized.
        </p>

        <Banner variant="info" title="How we use this access">
          We’ll only use your data to prepare your payroll switch. You’ll be able to review
          important details before continuing. No changes are made to QuickBooks from this step.
        </Banner>

        <div style={{ marginTop: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 20,
              border: '1px dashed var(--x-color-border)',
              borderRadius: 'var(--x-radius-sm)',
              background: '#fafafa',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: 'var(--x-color-qb)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              QB
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>QuickBooks Online</div>
              <div style={{ fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
                Payroll data · read-only connection
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Button variant="primary" block size="lg" disabled={busy} onClick={connect}>
            {busy ? 'Connecting…' : 'Connect QuickBooks →'}
          </Button>
        </div>
      </Card>
    </WizardShell>
  );
}
