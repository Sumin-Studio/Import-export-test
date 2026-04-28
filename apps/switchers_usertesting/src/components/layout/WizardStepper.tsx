import './wizard.css';

export type WizardStepKey = 'authorize' | 'review' | 'confirm' | 'done';

const STEPS: { key: WizardStepKey; label: string }[] = [
  { key: 'authorize', label: 'Authorize' },
  { key: 'review', label: 'Review' },
  { key: 'confirm', label: 'Confirm' },
  { key: 'done', label: 'Done' },
];

interface WizardStepperProps {
  current: WizardStepKey;
}

export function WizardStepper({ current }: WizardStepperProps) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <nav className="x-stepper" aria-label="Switch progress">
      <ol className="x-stepper__list">
        {STEPS.map((step, i) => {
          const state = i < idx ? 'done' : i === idx ? 'current' : 'upcoming';
          return (
            <li key={step.key} className={`x-stepper__item x-stepper__item--${state}`}>
              <span className="x-stepper__dot" aria-hidden>
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span className="x-stepper__label">{step.label}</span>
              {i < STEPS.length - 1 ? (
                <span className="x-stepper__line" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
