import { useState } from 'react';
import type { FlaggedIssue, IssueAlternateAction } from '../../types/domain';
import '../ui/ui.css';
import './issueDrawer.css';
import { usePrototypeStore } from '../../store/prototypeStore';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface IssueDetailDrawerProps {
  issue: FlaggedIssue | null;
  onClose: () => void;
  onOpenExpert: () => void;
}

export function IssueDetailDrawer({
  issue,
  onClose,
  onOpenExpert,
}: IssueDetailDrawerProps) {
  if (!issue) return null;
  return (
    <IssueDetailDrawerInner
      key={issue.id}
      issue={issue}
      onClose={onClose}
      onOpenExpert={onOpenExpert}
    />
  );
}

function IssueDetailDrawerInner({
  issue,
  onClose,
  onOpenExpert,
}: {
  issue: FlaggedIssue;
  onClose: () => void;
  onOpenExpert: () => void;
}) {
  const resolveIssue = usePrototypeStore((s) => s.resolveIssue);
  const resolvedMap = usePrototypeStore((s) => s.resolvedIssueIds);
  const applied = usePrototypeStore((s) => s.issueAdjustments[issue.id]);
  const setIssueAdjustment = usePrototypeStore((s) => s.setIssueAdjustment);

  const [expandedAlternateId, setExpandedAlternateId] = useState<string | null>(null);
  const [remapSelected, setRemapSelected] = useState('');

  const [effectiveXeroLabel, setEffectiveXeroLabel] = useState(
    () => applied?.effectiveXeroLabel ?? issue.suggestedValue,
  );
  const [note, setNote] = useState(() => applied?.note ?? '');

  const resolved = !!resolvedMap[issue.id];

  const hasExpertAlternate = issue.alternateActions.some((a) => a.type === 'expert');

  const primaryDisabled = !issue.primaryConfirmLabel.trim() || !effectiveXeroLabel.trim();

  const applyAndClose = (resolutionChoice: string, xeroLabel: string, noteVal?: string) => {
    setIssueAdjustment(issue.id, {
      resolutionChoice: resolutionChoice.trim(),
      effectiveXeroLabel: xeroLabel.trim(),
      note: noteVal?.trim() || undefined,
    });
    resolveIssue(issue.id, true);
    onClose();
  };

  const handlePrimaryConfirm = () => {
    applyAndClose(issue.primaryConfirmLabel, effectiveXeroLabel, note);
  };

  const handleResolveAs = (alt: IssueAlternateAction) => {
    const choice = alt.resolvedSummary ?? alt.label;
    const label = alt.resolvedXeroLabel ?? issue.suggestedValue;
    applyAndClose(choice, label, note);
  };

  const toggleAlternate = (alt: IssueAlternateAction) => {
    if (expandedAlternateId === alt.id) {
      setExpandedAlternateId(null);
      return;
    }
    setExpandedAlternateId(alt.id);
    if (alt.type === 'remap' && alt.remapTargets?.length) {
      setRemapSelected(alt.remapTargets[0]!);
    }
  };

  const handleRemapApply = (alt: IssueAlternateAction) => {
    if (!remapSelected.trim() || !alt.remapTargets?.includes(remapSelected)) return;
    applyAndClose(`Mapped to: ${remapSelected}`, remapSelected, note);
  };

  const handleExpertAlternate = () => {
    onOpenExpert();
    onClose();
  };

  return (
    <Modal
      open
      size="lg"
      onClose={onClose}
      title="Confirm this detail"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>{issue.title}</h3>
      <p
        style={{
          margin: '0 0 16px',
          fontSize: 'var(--x-text-sm)',
          color: 'var(--x-color-text-secondary)',
        }}
      >
        {issue.description}
      </p>

      <div
        style={{
          display: 'grid',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="x-kpi">
          <div className="x-kpi__label">QuickBooks value</div>
          <div className="x-kpi__value" style={{ fontSize: '1rem' }}>
            {issue.sourceValue}
          </div>
        </div>
        <div className="x-kpi">
          <div className="x-kpi__label">Suggested in Xero</div>
          <div className="x-kpi__value" style={{ fontSize: '1rem' }}>
            {issue.suggestedValue}
          </div>
        </div>
      </div>

      {!resolved ? (
        <>
          <div className="x-issue-section-title x-issue-section-title--flush">Suggested match</div>
          <p
            style={{
              margin: '0 0 12px',
              fontSize: 'var(--x-text-sm)',
              color: 'var(--x-color-text-secondary)',
            }}
          >
            Confirm the suggested import, or adjust the label below. Most teams start here when the
            suggestion looks right.
          </p>

          <div className="x-issue-field">
            <label className="x-issue-field__label" htmlFor={`xero-label-${issue.id}`}>
              Effective import label in Xero
            </label>
            <input
              id={`xero-label-${issue.id}`}
              className="x-issue-input"
              value={effectiveXeroLabel}
              onChange={(e) => setEffectiveXeroLabel(e.target.value)}
              aria-describedby={`xero-label-hint-${issue.id}`}
            />
            <p className="x-issue-field__hint" id={`xero-label-hint-${issue.id}`}>
              Edit how this item should appear after the switch. Starts from the suggested value.
            </p>
          </div>

          <div className="x-issue-field">
            <label className="x-issue-field__label" htmlFor={`note-${issue.id}`}>
              Note for your records (optional)
            </label>
            <textarea
              id={`note-${issue.id}`}
              className="x-issue-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. confirmed with accountant on tax treatment"
            />
          </div>

          <Button
            variant="primary"
            block
            disabled={primaryDisabled}
            onClick={handlePrimaryConfirm}
            style={{ marginBottom: 8 }}
          >
            {issue.primaryConfirmLabel}
          </Button>
          <p style={{ fontSize: 'var(--x-text-xs)', color: 'var(--x-color-text-tertiary)', margin: 0 }}>
            Saves your choices and marks this item resolved.
          </p>

          {issue.alternateActions.length > 0 ? (
            <>
              <div className="x-issue-section-title">Other ways to proceed</div>
              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: 'var(--x-text-sm)',
                  color: 'var(--x-color-text-secondary)',
                }}
              >
                These options are different flows—not the same as confirming the suggestion above.
              </p>
              <div className="x-issue-alt-actions">
                {issue.alternateActions.map((alt) => (
                  <div key={alt.id} className="x-issue-alt-block">
                    {alt.type === 'resolve_as' ? (
                      <>
                        <Button variant="secondary" block onClick={() => handleResolveAs(alt)}>
                          {alt.label}
                        </Button>
                        {alt.description ? (
                          <p className="x-issue-alt-desc">{alt.description}</p>
                        ) : null}
                      </>
                    ) : null}

                    {alt.type === 'expert' ? (
                      <>
                        <Button variant="secondary" block onClick={handleExpertAlternate}>
                          {alt.label}
                        </Button>
                        {alt.description ? (
                          <p className="x-issue-alt-desc">{alt.description}</p>
                        ) : null}
                      </>
                    ) : null}

                    {alt.type === 'stub_navigate' ? (
                      <>
                        <Button
                          variant="secondary"
                          block
                          onClick={() => toggleAlternate(alt)}
                          aria-expanded={expandedAlternateId === alt.id}
                        >
                          {alt.label}
                        </Button>
                        {alt.description ? (
                          <p className="x-issue-alt-desc">{alt.description}</p>
                        ) : null}
                        {expandedAlternateId === alt.id && alt.stubMessage ? (
                          <div className="x-issue-alt-panel" role="note">
                            {alt.stubMessage}
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    {alt.type === 'remap' ? (
                      <>
                        <Button
                          variant="secondary"
                          block
                          onClick={() => toggleAlternate(alt)}
                          aria-expanded={expandedAlternateId === alt.id}
                        >
                          {alt.label}
                        </Button>
                        {alt.description ? (
                          <p className="x-issue-alt-desc">{alt.description}</p>
                        ) : null}
                        {expandedAlternateId === alt.id && alt.remapTargets?.length ? (
                          <div className="x-issue-alt-panel">
                            <span className="x-issue-field__label" id={`remap-${issue.id}-${alt.id}`}>
                              Map to
                            </span>
                            <ul
                              className="x-issue-radio-list"
                              role="radiogroup"
                              aria-labelledby={`remap-${issue.id}-${alt.id}`}
                              style={{ marginTop: 8 }}
                            >
                              {alt.remapTargets.map((t) => (
                                <li key={t}>
                                  <label
                                    className="x-issue-radio-row"
                                    data-selected={remapSelected === t}
                                  >
                                    <input
                                      type="radio"
                                      name={`remap-${issue.id}-${alt.id}`}
                                      value={t}
                                      checked={remapSelected === t}
                                      onChange={() => setRemapSelected(t)}
                                    />
                                    <span style={{ fontSize: 'var(--x-text-sm)' }}>{t}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="primary"
                              block
                              style={{ marginTop: 12 }}
                              disabled={!remapSelected}
                              onClick={() => handleRemapApply(alt)}
                            >
                              Apply mapping and resolve
                            </Button>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        applied && (
          <div className="x-issue-applied">
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Recorded adjustment</div>
            <div style={{ fontSize: 'var(--x-text-sm)' }}>
              <div>
                <strong>Choice:</strong> {applied.resolutionChoice}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>Xero label:</strong> {applied.effectiveXeroLabel}
              </div>
              {applied.note ? (
                <div style={{ marginTop: 6 }}>
                  <strong>Note:</strong> {applied.note}
                </div>
              ) : null}
            </div>
          </div>
        )
      )}

      {!resolved && !hasExpertAlternate ? (
        <div style={{ marginTop: 20 }}>
          <Button variant="secondary" block onClick={onOpenExpert}>
            Get help from an expert
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}
