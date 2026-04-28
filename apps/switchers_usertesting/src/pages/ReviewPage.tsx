import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Banner } from '../components/ui/Banner';
import { Button } from '../components/ui/Button';
import { IssueDetailDrawer } from '../components/review/IssueDetailDrawer';
import { PendingApprovalsList } from '../components/review/PendingApprovalsList';
import { IMPORT_SECTION_IDS } from '../components/review/ImportReviewSections';
import { buildReviewBundle } from '../data/reviewBundle';
import { usePrototypeStore } from '../store/prototypeStore';
import type { FlaggedIssue, IssueSeverity } from '../types/domain';
import { attentionReviewLeadCopy, getReviewLayoutState } from '../review/reviewLayout';
import { qbSourceTitle } from '../lib/matchPercent';
import './review.css';

const SEV_ORDER: Record<IssueSeverity, number> = {
  critical: 0,
  recommended: 1,
  optional: 2,
};

function pickNextOpenIssue(openIssues: FlaggedIssue[]): FlaggedIssue | null {
  if (openIssues.length === 0) return null;
  const order = IMPORT_SECTION_IDS.map((s) => s.id);
  return (
    [...openIssues].sort((a, b) => {
      const ai = order.indexOf(a.sectionId);
      const bi = order.indexOf(b.sectionId);
      if (ai !== bi) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      return SEV_ORDER[a.severity] - SEV_ORDER[b.severity];
    })[0] ?? null
  );
}

function statusHeader(bundle: ReturnType<typeof buildReviewBundle>, resolved: Record<string, boolean>) {
  const unresolvedLow = bundle.issues.filter(
    (i) => i.severity === 'critical' && !resolved[i.id],
  );
  const anyOpen = bundle.issues.some((i) => !resolved[i.id]);
  if (unresolvedLow.length)
    return { label: 'Some items need review', tone: 'warning' as const };
  if (!anyOpen) return { label: 'Ready for full review', tone: 'success' as const };
  return { label: 'Attention needed', tone: 'info' as const };
}

export function ReviewPage() {
  const scenario = usePrototypeStore((s) => s.scenario);
  return <ReviewPageInner key={scenario} />;
}

function ReviewPageInner() {
  const navigate = useNavigate();
  const scenario = usePrototypeStore((s) => s.scenario);
  const resolvedMap = usePrototypeStore((s) => s.resolvedIssueIds);
  const setExpertOpen = usePrototypeStore((s) => s.setExpertHelpOpen);
  const expertReviewChoice = usePrototypeStore((s) => s.expertReviewChoice);
  const resolveIssue = usePrototypeStore((s) => s.resolveIssue);
  const setIssueAdjustment = usePrototypeStore((s) => s.setIssueAdjustment);

  const bundle = useMemo(() => buildReviewBundle(scenario), [scenario]);
  const layout = useMemo(
    () => getReviewLayoutState(scenario, bundle, resolvedMap),
    [scenario, bundle, resolvedMap],
  );
  const lead = attentionReviewLeadCopy(
    bundle.issues.filter((i) => !resolvedMap[i.id]).length,
    bundle.issues.filter((i) => i.severity === 'critical' && !resolvedMap[i.id]).length,
  );

  const [selectedIssue, setSelectedIssue] = useState<FlaggedIssue | null>(null);

  const openIssues = useMemo(
    () => bundle.issues.filter((i) => !resolvedMap[i.id]),
    [bundle.issues, resolvedMap],
  );

  const nextIssue = useMemo(() => pickNextOpenIssue(openIssues), [openIssues]);

  const unresolvedCritical = bundle.issues.filter(
    (i) => i.severity === 'critical' && !resolvedMap[i.id],
  );
  const canContinue = unresolvedCritical.length === 0;
  const status = statusHeader(bundle, resolvedMap);

  const approveIssueInline = (issue: FlaggedIssue) => {
    const choice = issue.primaryConfirmLabel.trim();
    const label = issue.suggestedValue.trim();
    if (!choice || !label) return;
    setIssueAdjustment(issue.id, {
      resolutionChoice: choice,
      effectiveXeroLabel: label,
    });
    resolveIssue(issue.id, true);
  };

  const approveAllInline = () => {
    for (const issue of openIssues) {
      approveIssueInline(issue);
    }
  };

  const jumpToAttentionList = () => {
    if (!nextIssue && openIssues.length === 0) return;
    requestAnimationFrame(() => {
      document.getElementById('pending-approvals')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const kpiStrip = layout.compactKpis ? (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
        gap: 12,
      }}
    >
      <div className="x-kpi">
        <div className="x-kpi__label">Employees imported</div>
        <div className="x-kpi__value">{bundle.summaries.employeesImported}</div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Items needing attention</div>
        <div className="x-kpi__value">{openIssues.length}</div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Last payroll period</div>
        <div className="x-kpi__value" style={{ fontSize: '1rem' }}>
          {bundle.summaries.lastPayrollPeriod}
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
        gap: 12,
      }}
    >
      <div className="x-kpi">
        <div className="x-kpi__label">Employees imported</div>
        <div className="x-kpi__value">{bundle.summaries.employeesImported}</div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Pay schedules</div>
        <div className="x-kpi__value">{bundle.summaries.paySchedulesFound}</div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Items needing attention</div>
        <div className="x-kpi__value">{openIssues.length}</div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Last payroll period</div>
        <div className="x-kpi__value" style={{ fontSize: '1rem' }}>
          {bundle.summaries.lastPayrollPeriod}
        </div>
      </div>
    </div>
  );

  const attentionBanners = (
    <>
      {unresolvedCritical.length > 0 ? (
        <div style={{ marginBottom: 16 }}>
          <Banner variant="warning" title="Confirm items marked Needs review first">
            {unresolvedCritical.length}{' '}
            {unresolvedCritical.length === 1 ? 'place' : 'places'} tagged <strong>Needs review</strong>{' '}
            should be confirmed or edited before you continue.
          </Banner>
        </div>
      ) : openIssues.length > 0 ? (
        <div style={{ marginBottom: 16 }}>
          <Banner variant="info" title="Quick review">
            Amber tags mean a quick review is suggested. You can still continue when you are comfortable.
          </Banner>
        </div>
      ) : null}
    </>
  );

  const attentionEmpty =
    openIssues.length === 0 ? (
      <Card pad style={{ marginBottom: 16, borderColor: 'var(--x-color-border-subtle)' }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>You are all caught up</div>
        <p style={{ margin: 0, fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
          No flagged mappings need action here. On the next step you will review the full import —
          company, employees, schedules, earnings, YTD, and tax — before finishing.
        </p>
      </Card>
    ) : null;

  const nextHint = nextIssue ? (
    <p className="x-review-nav__next-hint">Next: {qbSourceTitle(nextIssue)}</p>
  ) : openIssues.length === 0 ? (
    <p className="x-review-nav__next-hint x-review-nav__next-hint--muted">
      Continue to the full import review.
    </p>
  ) : (
    <p className="x-review-nav__next-hint x-review-nav__next-hint--muted">
      Scroll the list to work through each item.
    </p>
  );

  const mainColumn = (
    <div>
      {attentionBanners}
      <Card pad style={{ marginBottom: 16 }}>
        {kpiStrip}
      </Card>
      {attentionEmpty}
      <PendingApprovalsList
        issues={openIssues}
        onApprove={approveIssueInline}
        onApproveAll={approveAllInline}
        onEdit={(issue) => setSelectedIssue(issue)}
      />
    </div>
  );

  return (
    <WizardShell step="review" narrow={false}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', flex: '1 1 auto' }}>
              Review what needs attention
            </h1>
            <Badge tone={status.tone}>{status.label}</Badge>
          </div>
          <p style={{ margin: '10px 0 0', color: 'var(--x-color-text-secondary)', maxWidth: 720 }}>
            {lead}
          </p>
        </div>

        <div className="x-review-layout x-review-layout--simple">
          <div className="x-review-main">{mainColumn}</div>

          <aside className="x-review-rail" aria-label="Progress and next steps">
            {layout.slimRail ? (
              <Card className="x-rail-card">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Next step</div>
                <p style={{ margin: '0 0 12px', fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
                  When you are done here, confirm reviews every imported detail on the next screen.
                </p>
                {expertReviewChoice === 'requested' ? (
                  <p style={{ margin: '0 0 12px', fontSize: 'var(--x-text-xs)', color: 'var(--x-color-text-secondary)' }}>
                    <Badge tone="info">Specialist follow-up requested</Badge>
                  </p>
                ) : null}
                {openIssues.length > 0 ? (
                  <div style={{ marginTop: 12 }}>
                    <Button variant="ghost" block type="button" onClick={jumpToAttentionList}>
                      Scroll to attention list
                    </Button>
                    {nextHint}
                  </div>
                ) : (
                  <div style={{ marginTop: 12 }}>{nextHint}</div>
                )}
                <div style={{ marginTop: 12 }}>
                  <Button variant="primary" block size="lg" onClick={() => navigate('/confirm')}>
                    Continue to full review
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <Card className="x-rail-card">
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Progress</div>
                  <ul className="x-priority-list" style={{ listStyle: 'none', padding: 0 }}>
                    <li>Needs review (open): {unresolvedCritical.length}</li>
                    <li>Items needing attention: {openIssues.length}</li>
                  </ul>
                </Card>

                {expertReviewChoice === 'requested' ? (
                  <Card className="x-rail-card">
                    <Badge tone="info">Specialist follow-up requested</Badge>
                    <p
                      style={{
                        margin: '8px 0 0',
                        fontSize: 'var(--x-text-xs)',
                        color: 'var(--x-color-text-secondary)',
                      }}
                    >
                      Next steps are on the final screens.
                    </p>
                  </Card>
                ) : null}

                {openIssues.length > 0 ? (
                  <Card className="x-rail-card">
                    <Button variant="secondary" block type="button" onClick={jumpToAttentionList}>
                      Scroll to attention list
                    </Button>
                    {nextHint}
                  </Card>
                ) : (
                  <Card className="x-rail-card">{nextHint}</Card>
                )}

                <Button
                  variant="primary"
                  block
                  size="lg"
                  disabled={!canContinue}
                  onClick={() => navigate('/confirm')}
                >
                  Continue to full review
                </Button>
                {!canContinue ? (
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontSize: 'var(--x-text-xs)',
                      color: 'var(--x-color-text-secondary)',
                    }}
                  >
                    Confirm items tagged Needs review first — then you can continue.
                  </p>
                ) : null}
              </>
            )}
          </aside>
        </div>
      </div>

      <IssueDetailDrawer
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onOpenExpert={() => {
          setSelectedIssue(null);
          setExpertOpen(true);
        }}
      />
    </WizardShell>
  );
}
