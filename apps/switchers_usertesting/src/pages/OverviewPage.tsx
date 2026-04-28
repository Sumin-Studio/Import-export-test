import { Link } from 'react-router-dom';
import { XeroMark } from '../components/layout/XeroMark';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePrototypeStore } from '../store/prototypeStore';
import './landing.css';

export function OverviewPage() {
  const setExpertOpen = usePrototypeStore((s) => s.setExpertHelpOpen);
  const showTime = usePrototypeStore((s) => s.showTimeEstimate);
  const enableCompare = usePrototypeStore((s) => s.enableCompareRoute);
  const enablePricing = usePrototypeStore((s) => s.enablePricingRoute);

  return (
    <div className="x-landing">
      <header className="x-landing__nav">
        <div className="x-landing__nav-inner">
          <Link to="/" className="x-landing__brand">
            <XeroMark />
            <span className="x-brand-switcher-pro">Switcher Pro</span>
          </Link>
          <nav className="x-landing__links" aria-label="Section links">
            <a href="#how-it-works">How it works</a>
            {enableCompare ? <Link to="/compare-options">Compare options</Link> : null}
            {enablePricing ? <Link to="/pricing">Pricing concepts</Link> : null}
          </nav>
          <Link to="/connect">
            <Button variant="primary">Start switch →</Button>
          </Link>
        </div>
      </header>

      <section className="x-landing__hero">
        <div className="x-landing__hero-grid">
          <div>
            <h1 className="x-landing__title">
              Switch payroll from QuickBooks to{' '}
              <span className="x-landing__accent">Xero Payroll</span>
            </h1>
            <p className="x-landing__lead">
              We bring over the payroll data that matters and prepare it for your review before
              you continue. Nothing is finalized until you have checked what you need to check.
            </p>
            <ul className="x-landing__bullets">
              <li>
                <span className="x-landing__bullet-icon" aria-hidden>
                  ◷
                </span>
                <span>Save setup time with a guided import from QuickBooks</span>
              </li>
              <li>
                <span className="x-landing__bullet-icon" aria-hidden>
                  ☰
                </span>
                <span>Review pay items, employees, and tax-related totals before you switch</span>
              </li>
              <li>
                <span className="x-landing__bullet-icon" aria-hidden>
                  ◎
                </span>
                <span>Get help from a payroll expert if you want a second set of eyes</span>
              </li>
            </ul>
            <div className="x-landing__cta-row">
              <Link to="/connect">
                <Button variant="primary" size="lg">
                  Start switch →
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg">
                  See how it works
                </Button>
              </a>
            </div>
            <button
              type="button"
              className="x-landing__text-link"
              onClick={() => setExpertOpen(true)}
            >
              Talk to an expert
            </button>
          </div>
          <div className="x-landing__deco" aria-hidden />
        </div>
      </section>

      <section id="how-it-works" className="x-landing__light">
        <div className="x-landing__container">
          <h2 className="x-landing__h2">What to expect</h2>
          <p className="x-landing__sub">
            This flow is designed so you always know what is happening and what still needs your
            attention.
          </p>

          <div className="x-landing__cards">
            <Card pad>
              <h3 className="x-landing__h3">Intro</h3>
              <p style={{ color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
                You connect QuickBooks, we import payroll-related data, and you review flagged
                items before completing the switch.
              </p>
            </Card>
            <Card pad>
              <h3 className="x-landing__h3">Estimated timeframe</h3>
              {showTime ? (
                <p style={{ color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
                  Most teams spend <strong>20–45 minutes</strong> when data is clean. If multiple
                  items need mapping or tax confirmation, plan for <strong>part of a business day</strong>{' '}
                  including review.
                </p>
              ) : (
                <p style={{ color: 'var(--x-color-text-secondary)', fontSize: 'var(--x-text-sm)' }}>
                  Time depends on how many items need review. You can pause and return at any time.
                </p>
              )}
            </Card>
          </div>

          <div className="x-landing__split">
            <Card pad>
              <h3 className="x-landing__h3">What we’ll transfer from QuickBooks</h3>
              <p
                style={{
                  margin: '0 0 12px',
                  color: 'var(--x-color-text-secondary)',
                  fontSize: 'var(--x-text-sm)',
                }}
              >
                Aligned with a full payroll setup: company details, people, schedules, money
                movement, and historical runs — plus common add-ons teams rely on with payroll.
              </p>
              <ul className="x-checklist">
                <li>
                  <strong>Company &amp; tax profile:</strong> legal name, addresses (mailing, filing,
                  work locations), federal tax info (FEIN, entity type, deposit schedule), industry
                </li>
                <li>
                  <strong>Banking:</strong> company bank account used for payroll (routing and
                  account)
                </li>
                <li>
                  <strong>Employees:</strong> names, start dates, compensation, contact and work
                  addresses, IDs where collected, withholding, deductions, bank details if used
                </li>
                <li>
                  <strong>Pay schedules:</strong> frequency, pay dates, first pay period / next run
                </li>
                <li>
                  <strong>Earnings &amp; deductions:</strong> pay items brought over and mapped for
                  Xero
                </li>
                <li>
                  <strong>Year-to-date payroll history</strong> when you switch during the tax year
                </li>
                <li>
                  <strong>State &amp; local payroll taxes:</strong> agency accounts, rates, deposit
                  frequencies where they apply
                </li>
                <li>
                  <strong>Time tracking &amp; scheduling</strong> tied to payroll in QuickBooks
                  (hours, jobs, or rosters your runs depend on)
                </li>
              </ul>
            </Card>
            <Card pad>
              <h3 className="x-landing__h3">What you’ll confirm in review</h3>
              <ul className="x-checklist">
                <li>Company filing context and identifiers look right</li>
                <li>Employee pay rates, statuses, and deductions match how you run payroll today</li>
                <li>Pay items that need a quick mapping check</li>
                <li>YTD totals line up with what you expect</li>
                <li>Tax settings that differ between QuickBooks and Xero</li>
              </ul>
            </Card>
          </div>

          <Card pad className="x-trust-box">
            <h3 className="x-landing__h3">Trust and control</h3>
            <ul className="x-checklist">
              <li>You’ll see what needs a quick check before anything is finalized</li>
              <li>You can edit or confirm mappings where the product allows</li>
              <li>Specialist support is there if you want help on anything nuanced</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
