import type { FlaggedIssue } from '../../types/domain';
import { Button } from '../ui/Button';
import { matchPercentForIssue, qbSourceTitle } from '../../lib/matchPercent';
import './pendingApprovals.css';

interface PendingApprovalsListProps {
  issues: FlaggedIssue[];
  onApprove: (issue: FlaggedIssue) => void;
  onApproveAll: () => void;
  onEdit: (issue: FlaggedIssue) => void;
}

export function PendingApprovalsList({
  issues,
  onApprove,
  onApproveAll,
  onEdit,
}: PendingApprovalsListProps) {
  const n = issues.length;
  if (n === 0) return null;

  const anyCanApprove = issues.some(
    (i) => !!i.primaryConfirmLabel.trim() && !!i.suggestedValue.trim(),
  );

  return (
    <div id="pending-approvals" className="x-pending">
      <div className="x-pending__header">
        <strong className="x-pending__heading">
          {n} {n === 1 ? 'Item' : 'Items'} Need Your Approval
        </strong>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="x-pending__approve-all"
          disabled={!anyCanApprove}
          onClick={onApproveAll}
        >
          <span className="x-pending__approve-all-icon" aria-hidden>
            ✓
          </span>
          Approve all
        </Button>
      </div>
      <ul className="x-pending__list">
        {issues.map((issue) => {
          const canApprove =
            !!issue.primaryConfirmLabel.trim() && !!issue.suggestedValue.trim();
          return (
            <li key={issue.id} className="x-pending__row">
              <div className="x-pending__main">
                <div className="x-pending__title">{qbSourceTitle(issue)}</div>
                <div className="x-pending__mapping">
                  <span className="x-pending__arrow" aria-hidden>
                    →
                  </span>
                  <span>{issue.suggestedValue}</span>
                  <span className="x-pending__pct">{matchPercentForIssue(issue)}% match</span>
                </div>
              </div>
              <div className="x-pending__actions">
                <button
                  type="button"
                  className="x-pending__edit-link"
                  onClick={() => onEdit(issue)}
                >
                  Edit
                </button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  disabled={!canApprove}
                  onClick={() => onApprove(issue)}
                >
                  Approve
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
