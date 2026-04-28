import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReviewScenario } from '../../types/domain';
import { REVIEW_SCENARIOS, SCENARIO_LABELS } from '../../data/scenarios';
import { usePrototypeStore } from '../../store/prototypeStore';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';

/** Full URL to open the prototype on the landing page with the selected scenario (for participant links). */
function shareScenarioUrl(scenario: ReviewScenario): string {
  const base = new URL(import.meta.env.BASE_URL, window.location.origin);
  base.searchParams.set('scenario', scenario);
  return base.href;
}

/** Toggle with Ctrl+Shift+. (period) — no on-screen control for participants. */
const MOD_TOGGLE_KEY = '.';

export function ModeratorControls() {
  const navigate = useNavigate();
  const open = usePrototypeStore((s) => s.moderatorPanelOpen);
  const setOpen = usePrototypeStore((s) => s.setModeratorPanelOpen);
  const scenario = usePrototypeStore((s) => s.scenario);
  const setScenario = usePrototypeStore((s) => s.setScenario);
  const resetFlow = usePrototypeStore((s) => s.resetFlow);
  const [copied, setCopied] = useState(false);

  const participantLink = useMemo(() => shareScenarioUrl(scenario), [scenario]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === MOD_TOGGLE_KEY) {
        e.preventDefault();
        setOpen(!usePrototypeStore.getState().moderatorPanelOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title="Scenarios (moderator only)"
      footer={
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
      }
    >
      <p
        style={{
          marginTop: 0,
          fontSize: 'var(--x-text-sm)',
          color: 'var(--x-color-text-secondary)',
        }}
      >
        Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> to open or close.
        Participants do
        not see this panel. Use <strong>?scenario=</strong> in the URL to pre-select a scenario
        (e.g. <code>?scenario=smooth</code>).
      </p>

      <div className="x-mod-field">
        <span className="x-mod-label">Copy link for participants</span>
        <p className="x-mod-share-hint">
          Opens the overview with this scenario applied. Paste into chat or email.
        </p>
        <div className="x-mod-share-row">
          <input
            type="text"
            readOnly
            className="x-mod-share-input"
            value={participantLink}
            onFocus={(e) => e.target.select()}
            aria-label="Shareable URL for current scenario"
          />
          <Button
            type="button"
            variant="primary"
            className="x-mod-share-btn"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(participantLink);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              } catch {
                /* ignore */
              }
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>

      <div className="x-mod-field">
        <label className="x-mod-label" htmlFor="mod-scenario">
          Scenario
        </label>
        <select
          id="mod-scenario"
          className="x-mod-select"
          value={scenario}
          onChange={(e) => setScenario(e.target.value as ReviewScenario)}
        >
          {REVIEW_SCENARIOS.map((value) => (
            <option key={value} value={value}>
              {SCENARIO_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="x-mod-field">
        <span className="x-mod-label">Jump to step</span>
        <div className="x-mod-actions">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Overview
          </Button>
          <Button variant="secondary" onClick={() => navigate('/connect')}>
            Connect
          </Button>
          <Button variant="secondary" onClick={() => navigate('/processing')}>
            Processing
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              navigate(`/review?scenario=${encodeURIComponent(scenario)}`)
            }
          >
            Review
          </Button>
          <Button variant="secondary" onClick={() => navigate('/confirm')}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => navigate('/done')}>
            Done
          </Button>
        </div>
      </div>

      <Button
        variant="secondary"
        block
        onClick={() => {
          resetFlow();
          navigate('/');
        }}
      >
        Reset flow
      </Button>

      <style>{`
        .x-mod-field { margin-bottom: 16px; }
        .x-mod-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--x-color-text-secondary);
        }
        .x-mod-select {
          width: 100%;
          padding: 10px 12px;
          border-radius: var(--x-radius-sm);
          border: 1px solid var(--x-color-border);
          font-size: 14px;
          font-family: inherit;
        }
        .x-mod-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .x-mod-share-hint {
          margin: 0 0 8px;
          font-size: var(--x-text-xs);
          color: var(--x-color-text-secondary);
          line-height: 1.35;
        }
        .x-mod-share-row {
          display: flex;
          gap: 8px;
          align-items: stretch;
        }
        .x-mod-share-input {
          flex: 1;
          min-width: 0;
          padding: 10px 12px;
          border-radius: var(--x-radius-sm);
          border: 1px solid var(--x-color-border);
          font-size: 12px;
          font-family: ui-monospace, monospace;
          background: var(--x-color-surface-muted);
          color: var(--x-color-text);
        }
        .x-mod-share-btn {
          flex-shrink: 0;
        }
        kbd {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid var(--x-color-border);
          background: var(--x-color-surface-muted);
        }
      `}</style>
    </Drawer>
  );
}
