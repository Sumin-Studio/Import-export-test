import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePrototypeStore } from '../../store/prototypeStore';
import { XeroMark } from './XeroMark';
import { WizardStepper, type WizardStepKey } from './WizardStepper';
import './wizard.css';

interface WizardShellProps {
  step: WizardStepKey;
  showStepper?: boolean;
  /** Show “Get expert help” in the stepper bar (opens specialist modal). Default true when the stepper is shown. */
  showExpertHelpCta?: boolean;
  backTo?: string;
  children: ReactNode;
  narrow?: boolean;
}

export function WizardShell({
  step,
  showStepper = true,
  showExpertHelpCta,
  backTo,
  children,
  narrow,
}: WizardShellProps) {
  const setExpertHelpOpen = usePrototypeStore((s) => s.setExpertHelpOpen);
  const expertCtaVisible = showStepper && (showExpertHelpCta ?? true);

  return (
    <div className="x-wizard-shell">
      <header className="x-wizard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {backTo ? (
            <Link
              to={backTo}
              style={{
                fontSize: 'var(--x-text-sm)',
                fontWeight: 600,
                color: 'var(--x-color-status-info)',
              }}
            >
              ← Back
            </Link>
          ) : null}
          <Link
            to="/"
            className="x-wizard-header__brand"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <XeroMark />
            <span className="x-brand-switcher-pro">Switcher Pro</span>
          </Link>
        </div>
        <button type="button" className="x-icon-btn" aria-label="Close">
          ✕
        </button>
      </header>
      {showStepper ? (
        <div className="x-stepper-bar">
          <WizardStepper current={step} />
          {expertCtaVisible ? (
            <button
              type="button"
              className="x-stepper-bar__cta"
              onClick={() => setExpertHelpOpen(true)}
            >
              Get expert help
            </button>
          ) : null}
        </div>
      ) : null}
      <main
        className={`x-wizard-body ${narrow ? 'x-wizard-body--narrow' : ''}`.trim()}
      >
        {children}
      </main>
    </div>
  );
}
