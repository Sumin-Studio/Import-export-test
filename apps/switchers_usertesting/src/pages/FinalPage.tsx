import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { WizardShell } from '../components/layout/WizardShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Banner } from '../components/ui/Banner';
import { Modal } from '../components/ui/Modal';
import {
  ImportReviewSections,
  IMPORT_SECTION_IDS,
  defaultImportSectionsExpanded,
} from '../components/review/ImportReviewSections';
import { buildReviewBundle } from '../data/reviewBundle';
import { expertReviewModalCopy } from '../data/researchContent';
import { confirmImportLeadCopy, getReviewLayoutState } from '../review/reviewLayout';
import { usePrototypeStore } from '../store/prototypeStore';
import type { FlaggedIssue } from '../types/domain';
import './review.css';

const erc = expertReviewModalCopy;

export function FinalPage() {
  const scenario = usePrototypeStore((s) => s.scenario);
  return <FinalPageInner key={scenario} />;
}

function FinalPageInner() {
  const navigate = useNavigate();
  const scenario = usePrototypeStore((s) => s.scenario);
  const variant = usePrototypeStore((s) => s.finalVariant);
  const expertChoice = usePrototypeStore((s) => s.expertReviewChoice);
  const setExpertReviewChoice = usePrototypeStore((s) => s.setExpertReviewChoice);

  const resolvedMap = usePrototypeStore((s) => s.resolvedIssueIds);

  const bundle = useMemo(() => buildReviewBundle(scenario), [scenario]);

  const layout = useMemo(
    () => getReviewLayoutState(scenario, bundle, resolvedMap),
    [scenario, bundle, resolvedMap],
  );

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    defaultImportSectionsExpanded(false),
  );
  const [activeSection, setActiveSection] = useState('company');
  const [editSection, setEditSection] = useState<string | null>(null);
  const [confirmImportAccurate, setConfirmImportAccurate] = useState(false);

  const toggle = (id: string) =>
    setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const issuesBySection = useMemo(() => {
    const m: Record<string, FlaggedIssue[]> = {};
    for (const s of IMPORT_SECTION_IDS) m[s.id] = [];
    for (const i of bundle.issues) {
      if (resolvedMap[i.id]) continue;
      if (m[i.sectionId]) m[i.sectionId].push(i);
    }
    return m;
  }, [bundle.issues, resolvedMap]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setExpanded((e) => ({ ...e, [id]: true }));
    requestAnimationFrame(() =>
      document.getElementById(`sec-${id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      }),
    );
  };

  const showExpertSummary = expertChoice === 'requested' || variant === 'expert-sent';

  const statusLead =
    variant === 'expert-sent'
      ? 'We will follow up with next steps — review the full import below, then finish when you are ready.'
      : variant === 'follow-up'
        ? 'We still need a short follow-up on one tax identifier after you finish here.'
        : null;

  const kpiGrid = layout.compactKpis ? (
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
        <div className="x-kpi__label">Last payroll period</div>
        <div className="x-kpi__value" style={{ fontSize: '1rem' }}>
          {bundle.summaries.lastPayrollPeriod}
        </div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Pay schedules</div>
        <div className="x-kpi__value">{bundle.summaries.paySchedulesFound}</div>
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
        <div className="x-kpi__label">Last payroll period</div>
        <div className="x-kpi__value" style={{ fontSize: '1rem' }}>
          {bundle.summaries.lastPayrollPeriod}
        </div>
      </div>
      <div className="x-kpi">
        <div className="x-kpi__label">Sections</div>
        <div className="x-kpi__value">{IMPORT_SECTION_IDS.length}</div>
      </div>
    </div>
  );

  const mainColumn = (
    <div>
      <Card pad style={{ marginBottom: 16 }}>
        {kpiGrid}
      </Card>
      <ImportReviewSections
        bundle={bundle}
        resolvedMap={resolvedMap}
        expanded={{
          company: expanded.company,
          employees: expanded.employees,
          schedules: expanded.schedules,
          earnings: expanded.earnings,
          ytd: expanded.ytd,
          tax: expanded.tax,
        }}
        onToggleSection={(id) => toggle(id)}
        onEditSection={(id) => setEditSection(id)}
        showConfidenceBadges={false}
      />
    </div>
  );

  return (
    <WizardShell step="confirm" backTo="/review" narrow={false}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', flex: '1 1 auto' }}>
              Confirm imported details
            </h1>
            <Badge tone={variant === 'ready' ? 'success' : variant === 'follow-up' ? 'warning' : 'info'}>
              {variant === 'ready'
                ? 'Final review'
                : variant === 'expert-sent'
                  ? 'Specialist review'
                  : 'Follow-up'}
            </Badge>
          </div>
          <p style={{ margin: '10px 0 0', color: 'var(--x-color-text-secondary)', maxWidth: 720 }}>
            {confirmImportLeadCopy()}
            {statusLead ? (
              <>
                {' '}
                {statusLead}
              </>
            ) : null}
          </p>
        </div>

        {showExpertSummary ? (
          <Card pad style={{ marginBottom: 16, borderColor: '#c5e8f7' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr',
                gap: 16,
                alignItems: 'start',
                marginBottom: 16,
              }}
            >
              <img
                src="/expert-review-specialist.svg"
                width={88}
                height={106}
                alt=""
                style={{
                  borderRadius: 8,
                  border: '1px solid var(--x-color-border-subtle)',
                }}
              />
              <div>
                <div style={{ marginBottom: 8 }}>
                  <Badge tone="info">Specialist review requested</Badge>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.0625rem' }}>{erc.specialistLabel}</h3>
                <p style={{ margin: 0, fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
                  {erc.specialistBlurb}
                </p>
              </div>
            </div>
            <div
              style={{
                paddingTop: 16,
                borderTop: '1px solid var(--x-color-border-subtle)',
              }}
            >
              <div style={{ fontSize: 'var(--x-text-xs)', fontWeight: 700, color: 'var(--x-color-text-secondary)', marginBottom: 4 }}>
                {erc.timelineTitle}
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 'var(--x-text-sm)', color: 'var(--x-color-text-secondary)' }}>
                {erc.timeline.map((t) => (
                  <li key={t.label} style={{ marginBottom: 4 }}>
                    <strong style={{ color: 'var(--x-color-text)' }}>{t.label}:</strong> {t.detail}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ) : null}

        {variant === 'follow-up' ? (
          <div style={{ marginBottom: 16 }}>
            <Banner variant="warning" title="What we need">
              Upload or enter your state unemployment account number on the next screen.
            </Banner>
          </div>
        ) : null}

        <div className="x-review-layout x-review-layout--with-nav">
          <div className="x-review-nav-column">
            <nav className="x-review-nav" aria-label="Import sections">
              <ul>
                {IMPORT_SECTION_IDS.map((s) => {
                  const n = (issuesBySection[s.id] ?? []).length;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        data-active={activeSection === s.id}
                        onClick={() => scrollToSection(s.id)}
                      >
                        <span className="x-review-nav__label">{s.label}</span>
                        {n > 0 ? <span className="x-review-nav__count">{n}</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="x-review-main">{mainColumn}</div>

          <aside className="x-review-rail" aria-label="Finish and options">
            <section
              className="x-finish-proceed x-finish-proceed--rail"
              aria-labelledby="finish-proceed-heading"
            >
              <h2 id="finish-proceed-heading" className="x-finish-proceed__title">
                How would you like to proceed?
              </h2>
              <div className="x-finish-proceed__grid">
                <Card pad className="x-finish-card x-finish-card--now">
                  <div className="x-finish-card__headline">
                    <div className="x-finish-card__icon x-finish-card__icon--check" aria-hidden>
                      ✓
                    </div>
                    <h3 className="x-finish-card__heading">Finish now</h3>
                  </div>
                  <p className="x-finish-card__desc">
                    I&apos;ve reviewed the import. Let Switcher Pro complete the payroll switch with the
                    details above.
                  </p>
                  <p className="x-finish-card__meta">Completes immediately</p>
                  <div className="x-finish-card__divider" />
                  <label className="x-finish-card__confirm">
                    <input
                      type="checkbox"
                      checked={confirmImportAccurate}
                      onChange={(e) => setConfirmImportAccurate(e.target.checked)}
                    />
                    <span>I confirm the imported details look accurate for my business.</span>
                  </label>
                  <Button
                    variant="primary"
                    block
                    size="lg"
                    type="button"
                    disabled={!confirmImportAccurate}
                    onClick={() => navigate('/done')}
                  >
                    Finish now →
                  </Button>
                </Card>

                <Card pad className="x-finish-card x-finish-card--concierge">
                  <div className="x-finish-card__headline">
                    <div className="x-finish-card__icon x-finish-card__icon--concierge" aria-hidden>
                      ★
                    </div>
                    <h3 className="x-finish-card__heading">Expert review</h3>
                  </div>
                  <p className="x-finish-card__desc">
                    A payroll specialist reviews your mappings and setup with human verification before we
                    finalize the switch.
                  </p>
                  <p className="x-finish-card__meta">3-4 days</p>
                  <Button
                    variant="secondary"
                    block
                    size="lg"
                    type="button"
                    onClick={() => {
                      setExpertReviewChoice('requested');
                      navigate('/done');
                    }}
                  >
                    Request expert review →
                  </Button>
                </Card>
              </div>
            </section>

            <p
              style={{
                marginTop: 16,
                fontSize: 'var(--x-text-sm)',
                color: 'var(--x-color-text-tertiary)',
              }}
            >
              Then you&apos;ll see a short confirmation before opening payroll or exiting.
            </p>
          </aside>
        </div>
      </div>

      <Modal
        open={!!editSection}
        title={editSection ? `Edit ${editSection}` : 'Edit'}
        onClose={() => setEditSection(null)}
        footer={
          <Button variant="primary" onClick={() => setEditSection(null)}>
            Save
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
          Update the value as needed. In a live product this would sync to your import preview.
        </p>
        <label className="x-mod-label" htmlFor="confirm-edit-field-value" style={{ display: 'block', marginTop: 12 }}>
          Value
        </label>
        <input id="confirm-edit-field-value" className="x-mod-select" defaultValue="Sample value" />
      </Modal>
    </WizardShell>
  );
}
