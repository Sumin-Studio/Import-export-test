import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { Banner } from '../components/ui/Banner';
import { usePrototypeStore } from '../store/prototypeStore';

const STEPS = [
  'Connecting to QuickBooks',
  'Importing company details',
  'Importing employees',
  'Bringing over pay items',
  'Checking payroll history',
  'Preparing items for your review',
];

export function ProcessingPage() {
  const navigate = useNavigate();
  const variant = usePrototypeStore((s) => s.progressVariant);
  const scenario = usePrototypeStore((s) => s.scenario);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (cancelled) return;
        setActive(i);
        await new Promise((r) => window.setTimeout(r, 650));
      }
      if (cancelled) return;
      await new Promise((r) => window.setTimeout(r, 500));
      if (cancelled) return;
      navigate(`/review?scenario=${encodeURIComponent(scenario)}`);
    };
    void tick();
    return () => {
      cancelled = true;
    };
  }, [navigate, scenario]);

  return (
    <WizardShell step="authorize" backTo="/connect" narrow>
      <Card pad>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.375rem' }}>
          Preparing your payroll switch
        </h1>
        <p style={{ margin: '0 0 20px', color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
          You can follow each step while we import data from QuickBooks. The review screen will
          highlight anything that needs your attention.
        </p>

        {variant === 'hint' ? (
          <Banner variant="warning" title="Heads up">
            Some pay items or tax settings may need review after import. That is normal when systems
            classify earnings differently.
          </Banner>
        ) : null}

        <ol style={{ margin: '24px 0 0', paddingLeft: 20 }}>
          {STEPS.map((label, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li
                key={label}
                style={{
                  marginBottom: 12,
                  fontWeight: current ? 600 : 400,
                  color: done
                    ? 'var(--x-color-status-success)'
                    : current
                      ? 'var(--x-color-text)'
                      : 'var(--x-color-text-tertiary)',
                }}
              >
                {done ? '✓ ' : current ? '… ' : '○ '}
                {label}
              </li>
            );
          })}
        </ol>
      </Card>
    </WizardShell>
  );
}
