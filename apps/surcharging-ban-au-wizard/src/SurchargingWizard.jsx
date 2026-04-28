/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef, useCallback } from 'react';
import { ReactComponent as InfoIcon } from './icons/Info.svg';
import { ReactComponent as ProgressCircularIcon } from './icons/ProgressCircular.svg';
import { ReactComponent as CardIcon } from './icons/Card.svg';
import { ReactComponent as BankIcon } from './icons/Bank.svg';
import { ReactComponent as GreenCheck } from './icons/CheckboxChecked.svg';
import { ReactComponent as ClockIcon } from './icons/Clock.svg';
import './SurchargingWizard.css';

function calcFees(amt) {
  const card = +(amt * 0.018 + 0.30).toFixed(2);
  const payto = Math.min(+(amt * 0.013 + 0.30).toFixed(2), 5.00);
  const ddBase = Math.min(+(amt * 0.01 + 0.40).toFixed(2), 4.00);
  const ddExtra = amt > 3000 ? +(amt * 0.003).toFixed(2) : 0;
  const dd = +(ddBase + ddExtra).toFixed(2);
  return { card: +card.toFixed(2), payto: +payto.toFixed(2), dd };
}

function fmt(n) {
  return '$' + n.toFixed(2);
}

function fmtAmt(n) {
  return '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2 });
}

/* ── Progress bar ── */
function WizProgress({ wStep, wFork }) {
  const total = wFork === 'explore' ? 4 : 3;
  const pos = (wFork !== 'explore' && wStep === 4) ? 3 : wStep;
  return (
    <div className="wiz-prog-segs">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`wiz-prog-seg${i < pos ? ' done' : ''}`} />
      ))}
    </div>
  );
}

/* ── Step 1: Announcement (full-screen layout) ── */
function Step1({ onNext, onClose, onRemind }) {
  return (
    <>
      <div className="wiz-body">
        <div className="wiz-body-inner">
          <WizProgress wStep={1} wFork={null} />

          <h2 className="wiz-heading">Surcharging rules are changing</h2>
          <p className="wiz-body-lead">
            From 1 October 2026, Australian businesses can no longer add a surcharge to eftpos,
            Mastercard and Visa payments. This regulatory change is from The Reserve Bank of
            Australia and <strong>affects your business</strong>.
          </p>

          <div className="wiz-callout-card">
            <div className="wiz-callout-icon">
              <InfoIcon />
            </div>
            <div>
              <div className="wiz-callout-title">Nothing changes today</div>
              <div className="wiz-callout-body">
                You can keep surcharging as normal until the deadline.
                After that, Xero will automatically turn it off on your account.
              </div>
            </div>
          </div>

          <div className="wiz-tl">
            {/* Today */}
            <div className="wiz-tl-item wiz-tl-active">
              <div className="wiz-tl-track">
                <div className="wiz-tl-dot wiz-tl-dot-blue" />
                <div className="wiz-tl-connector" />
              </div>
              <div className="wiz-tl-content">
                <div className="wiz-tl-label">Today</div>
                <div className="wiz-tl-desc">Surcharging continues as normal - no action needed yet.</div>
              </div>
            </div>
            {/* 1 October 2026 */}
            <div className="wiz-tl-item">
              <div className="wiz-tl-track">
                <ProgressCircularIcon className="wiz-tl-svg-dot" />
                <div className="wiz-tl-connector" />
              </div>
              <div className="wiz-tl-content">
                <div className="wiz-tl-label">1 October 2026</div>
                <div className="wiz-tl-desc">Surcharging is banned in Australia. Xero turns it off on your account automatically.</div>
              </div>
            </div>
            {/* After the deadline */}
            <div className="wiz-tl-item">
              <div className="wiz-tl-track">
                <div className="wiz-tl-dot wiz-tl-dot-dark" />
              </div>
              <div className="wiz-tl-content">
                <div className="wiz-tl-label">After the deadline</div>
                <div className="wiz-tl-desc">Card fees become a business cost to absorb - unless you switch to a lower-cost method or turn off card payments.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wiz-footer">
        <button className="btn btn-s" onClick={onRemind}>Email me a reminder</button>
        <div className="wiz-footer-right">
          <button className="btn-gm" onClick={onClose}>Close</button>
          <button className="btn btn-p" onClick={onNext}>See options</button>
        </div>
      </div>
    </>
  );
}

/* ── Step 2: Fork ── */
function Step2({ wFork, onSelectFork, onBack, onContinue }) {
  return (
    <>
      <div className="wiz-body">
        <div className="wiz-body-inner">
          <WizProgress wStep={2} wFork={null} />
          <h2 className="wiz-heading">What would you like to do?</h2>
          <p className="wiz-body-lead">You can still accept card payments after the deadline. The fee comes out of your margin.</p>
          <div className="wiz-fork-options">
            <ForkOption
              selected={wFork === 'card'}
              title="Keep accepting card payments beyond the deadline"
              desc="Your customers can continue making card payments. At 23:59 on 30 Sep 2026, Xero automatically turns off surcharging. You'll be responsible for the full fee amount after that."
              onSelect={() => onSelectFork('card')}
            />
            <ForkOption
              selected={wFork === 'explore'}
              title="Explore other payment methods"
              desc="See what other payment methods are available in Xero, including options with lower fees. Card payments continue as normal until the deadline, then fees are turned off."
              onSelect={() => onSelectFork('explore')}
            />
          </div>
        </div>
      </div>
      <div className="wiz-footer">
        <button className="btn btn-s" onClick={onBack}>Back</button>
        <div className="wiz-footer-right">
          <button className="btn btn-p" disabled={!wFork} onClick={onContinue}>Continue</button>
        </div>
      </div>
    </>
  );
}

function ForkOption({ selected, title, desc, onSelect }) {
  return (
    <div className={`oc${selected ? ' sel' : ''}`} onClick={onSelect}>
      <div className="oc-header">
        <div className={`ro${selected ? ' ck' : ''}`}>
          <div className={`ri${selected ? ' v' : ''}`} />
        </div>
        <div className="oc-title">{title}</div>
      </div>
      {desc && <div className="oc-body"><div className="oc-desc">{desc}</div></div>}
    </div>
  );
}

/* ── Step 3: Alternatives ── */
function Step3({ wAlt, wAmt, onToggleAlt, onAmtChange, onBack, onContinue }) {
  const fees = calcFees(wAmt);
  const cardSave = fees.card - fees.payto;
  const ddSave = fees.card - fees.dd;
  return (
    <>
      <div className="wiz-body">
        <div className="wiz-body-inner">
          <WizProgress wStep={3} wFork="explore" />
          <h2 className="wiz-heading">Give your customers ways to pay</h2>
          <p className="wiz-body-lead">These are the payment methods available in Xero. Select the ones you'd like to offer your customers.</p>

          <div className="fee-table">
            {/* Card column */}
            <div className="fee-col fee-col-card">
              <div className="fee-th fee-th-card">
                <span>Card</span><CardIcon className="fee-col-icon" />
              </div>
              <div className="fee-td fee-td-card">
                <div className="fee-amount">{fmt(fees.card)}</div>
                <div className="fee-rate">1.8% + $0.30</div>
              </div>
            </div>
            {/* PayTo column */}
            <div className="fee-col fee-col-alt">
              <div className="fee-th fee-th-dark">
                <span>PayTo</span><BankIcon className="fee-col-icon" />
              </div>
              <div className="fee-td fee-td-alt">
                <div className="fee-amount">{fmt(fees.payto)}</div>
                <div className="fee-rate">1.3% + $0.30,<br />capped $5.00</div>
                <div className="fee-save">You save {fmt(cardSave > 0 ? cardSave : 0)}</div>
              </div>
            </div>
            {/* Direct Debit column */}
            <div className="fee-col fee-col-alt">
              <div className="fee-th fee-th-dark">
                <span>Direct Debit</span><BankIcon className="fee-col-icon" />
              </div>
              <div className="fee-td fee-td-alt">
                <div className="fee-amount">{fmt(fees.dd)}</div>
                <div className="fee-rate">1% + $0.40, capped $4{wAmt > 3000 ? <><br />(+0.3% on $3k+)</> : ''}</div>
                <div className="fee-save">You save {fmt(ddSave > 0 ? ddSave : 0)}</div>
              </div>
            </div>
          </div>

          <div className="fee-slider-row">
            <span className="fee-slider-lbl">Invoice amount</span>
            <input
              type="range"
              min="100" max="10000" step="50"
              value={wAmt}
              onChange={e => onAmtChange(parseInt(e.target.value))}
              className="fee-slider"
            />
            <span className="fee-slider-val">{fmtAmt(wAmt)}</span>
          </div>

          <div className="wiz-alt-options">
            <AltOption
              selected={wAlt.includes('payto')}
              onToggle={() => onToggleAlt('payto')}
              title="PayTo"
              desc="Bank-to-bank payments via your existing Stripe connection. Your customers see it as a payment option on their next invoice."
              pills={['One-off sales', 'No sign up required']}
            />
            <AltOption
              selected={wAlt.includes('dd')}
              onToggle={() => onToggleAlt('dd')}
              title="Recurring Direct Debit"
              desc="Collect recurring payments by debiting your customer's bank account. Requires a GoCardless account - takes about 10 minutes to set up."
              pills={['Recurring sales', 'Collects payments automatically']}
            />
          </div>
        </div>
      </div>
      <div className="wiz-footer">
        <button className="btn btn-s" onClick={onBack}>Back</button>
        <div className="wiz-footer-right">
          <button className="btn btn-p" disabled={wAlt.length === 0} onClick={onContinue}>Continue</button>
        </div>
      </div>
    </>
  );
}

function AltOption({ selected, onToggle, title, desc, pills }) {
  return (
    <div className={`oc${selected ? ' sel' : ''}`} onClick={onToggle}>
      <div className="oc-header">
        <div className={`cb${selected ? ' ck' : ''}`}>
          <svg className="cb-tick" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 8l4 4 7-7.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="oc-title">{title}</div>
      </div>
      {(desc || pills?.length > 0) && (
        <div className="oc-body">
          {desc && <div className="oc-desc">{desc}</div>}
          {pills?.length > 0 && (
            <div className="pills">
              {pills.map(p => <span key={p} className="pill">{p}</span>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SlidersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="#1E3145" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="5" cy="4" r="1.5" fill="#fff" stroke="#1E3145" strokeWidth="1.4"/>
    <circle cx="11" cy="8" r="1.5" fill="#fff" stroke="#1E3145" strokeWidth="1.4"/>
    <circle cx="5" cy="12" r="1.5" fill="#fff" stroke="#1E3145" strokeWidth="1.4"/>
  </svg>
);

/* ── Step 4: Confirm ── */
function Step4({ wFork, wAlt, onBack, onClose }) {
  const backStep = wFork === 'explore' ? 3 : 2;
  const hasPayTo = wAlt.includes('payto');
  const hasDd = wAlt.includes('dd');

  return (
    <>
      <div className="wiz-body">
        <div className="wiz-body-inner">
          <WizProgress wStep={4} wFork={wFork} />
          <h2 className="wiz-heading">You're all set!</h2>
          <div className="wiz-summary-label">Summary of changes</div>
          <div className="wiz-checklist">

            {/* PayTo activated - shown when PayTo selected */}
            {hasPayTo && (
              <div className="wiz-check-item">
                <span className="wiz-check-icon"><GreenCheck /></span>
                <span className="wiz-check-text">PayTo is now on and offered on all your outstanding invoices.</span>
              </div>
            )}

            {/* Card continuation - shown for all paths */}
            <div className="wiz-check-item">
              <span className="wiz-check-icon"><GreenCheck /></span>
              <span className="wiz-check-text">Continue accepting card payments and passing on the fee until the deadline.</span>
            </div>

            {/* Deadline clock - always shown */}
            <div className="wiz-check-item">
              <span className="wiz-check-icon"><ClockIcon /></span>
              <span className="wiz-check-text">At 23:59 on 30 Sep 2026, Xero turns off surcharging automatically. You'll be responsible for the full fee amount after that.</span>
            </div>

            {/* Next step - shown when DD selected */}
            {hasDd && (
              <div className="wiz-check-item">
                <span className="wiz-check-icon"><SlidersIcon /></span>
                <span className="wiz-check-text wiz-check-text-next">Next: Start accepting Direct Debit payments with GoCardless</span>
              </div>
            )}

          </div>
          <div className="wiz-callout-card">
            <div className="wiz-callout-icon"><InfoIcon /></div>
            <div>
              <div className="wiz-callout-title">Keeping Stripe connected to Xero</div>
              <div className="wiz-callout-body">You don't need to remove Stripe if you decide to stop accepting card payments before the deadline. Turn off Card in Settings &gt; Online payments &gt; Payment methods &gt; Card.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="wiz-footer">
        <button className="btn btn-s" onClick={() => onBack(backStep)}>Back</button>
        <div className="wiz-footer-right">
          {hasDd ? (
            <>
              <button className="btn-gm" onClick={onClose}>Skip set up and finish</button>
              <button className="btn btn-p" onClick={onClose}>Set up Direct Debit</button>
            </>
          ) : (
            <button className="btn btn-p" onClick={onClose}>Finish</button>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Main component ── */
export default function SurchargingWizard() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [wStep, setWStep] = useState(1);
  const [wFork, setWFork] = useState(null);
  const [wAlt, setWAlt] = useState([]);
  const [wAmt, setWAmt] = useState(1000);
  const [fading, setFading] = useState(false);
  const [toast, setToast] = useState(false);
  const toastTimerRef = useRef(null);
  const modalRef = useRef(null);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  const openWizard = useCallback(() => {
    setWStep(1); setWFork(null); setWAlt([]);
    setOverlayOpen(true);
  }, []);

  const closeWizard = useCallback(() => setOverlayOpen(false), []);

  const showToast = useCallback(() => {
    closeWizard();
    setToast(true);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(false), 5000);
  }, [closeWizard]);

  const dismissBanner = useCallback(() => setBannerVisible(false), []);

  function wGo(n) {
    setFading(true);
    setTimeout(() => {
      setWStep(n);
      setFading(false);
      if (modalRef.current) modalRef.current.scrollTop = 0;
    }, 110);
  }

  function handleSelectFork(v) {
    setWFork(v);
    if (v === 'card') setWAlt(['card']);
    else setWAlt([]);
  }

  function handleToggleAlt(v) {
    setWAlt(prev =>
      prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
    );
  }

  function handleForkContinue() {
    wGo(wFork === 'card' ? 4 : 3);
  }

  return (
    <div className="xero-shell">

      {/* ── Xero top nav ── */}
      <nav className="xero-nav">
        <div className="xero-nav-left">
          {/* Logo */}
          <div className="xero-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#fff" fillOpacity="0.15"/>
              <path d="M14 5.5C9.31 5.5 5.5 9.31 5.5 14s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5S18.69 5.5 14 5.5zm-1.54 11.71l-3.3-3.3 1.18-1.15 2.12 2.14 5.41-5.42 1.15 1.18-6.56 6.55z" fill="#fff"/>
            </svg>
          </div>
          {/* Org */}
          <div className="xero-org">
            AE Creations
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="xero-nav-divider" />
          {/* Nav links */}
          <div className="xero-nav-links">
            <a className="xero-nav-link" href="#">Home</a>
            <a className="xero-nav-link active" href="#">Sales</a>
            <a className="xero-nav-link" href="#">Purchases</a>
            <a className="xero-nav-link" href="#">Reporting</a>
            <a className="xero-nav-link" href="#">Accounting</a>
            <a className="xero-nav-link" href="#">Tax</a>
            <a className="xero-nav-link" href="#">Contacts</a>
          </div>
        </div>
        <div className="xero-nav-right">
          {/* + */}
          <button className="xero-nav-icon" aria-label="New">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          {/* Search */}
          <button className="xero-nav-icon" aria-label="Search">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          {/* Star/spark */}
          <button className="xero-nav-icon" aria-label="Explore">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1l1.5 4.5H13L9.5 8l1.5 4.5L7.5 10 4 12.5 5.5 8 2 5.5h4L7.5 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          </button>
          {/* Help */}
          <button className="xero-nav-icon" aria-label="Help">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 5.5a2 2 0 013.9.67c0 1.33-2 2-2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7.5" cy="11" r=".6" fill="currentColor"/></svg>
          </button>
          {/* Bell */}
          <button className="xero-nav-icon" aria-label="Notifications">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none"><path d="M7 1.5a4.5 4.5 0 00-4.5 4.5v3l-1 1.5h11l-1-1.5V6A4.5 4.5 0 007 1.5z" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 10.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4"/></svg>
          </button>
          {/* Grid */}
          <button className="xero-nav-icon" aria-label="Apps">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg>
          </button>
          {/* Avatar */}
          <div className="xero-nav-avatar">AE</div>
        </div>
      </nav>

      {/* ── Page ── */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Page header */}
        <div className="xero-page-header">
          <h1 className="xero-page-title">Sales overview</h1>
          <div className="xero-page-actions">
            <button className="xero-action-icon" aria-label="Download">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v9M3.5 7l3.5 4 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button className="xero-action-btn">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3"/><path d="M8.5 8.5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Search
            </button>
            <button className="xero-action-btn primary">
              Create
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="xero-action-icon" aria-label="Settings">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.9 2.9l1.1 1.1M11 11l1.1 1.1M2.9 12.1l1.1-1.1M11 4l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="xero-page-content">

          {/* Banner */}
          {bannerVisible && (
            <div className="xero-banner">
              <div className="xero-banner-title">Surcharging on card payments is ending</div>
              <ul className="xero-banner-list">
                <li>From 1 October 2026, businesses can no longer pass on card fees. We'll update your account automatically to keep you compliant. We recommend you check your options before the deadline.</li>
              </ul>
              <div className="xero-banner-actions">
                <button className="xero-banner-close-text" onClick={dismissBanner}>Close</button>
                <button className="xero-banner-cta" onClick={openWizard}>See what this means for you</button>
              </div>
              <button className="xero-banner-close-x" onClick={dismissBanner} aria-label="Dismiss">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          )}

          {/* Invoices and payments - section header sits on page bg */}
          <div className="xero-section-head">
            <span className="xero-section-title">Invoices and payments</span>
            <div className="xero-tabs">
              <button className="xero-tab active">Invoices</button>
              <button className="xero-tab">Repeating invoices</button>
              <button className="xero-tab">Payment links</button>
              <button className="xero-tab">Statements</button>
            </div>
            <button className="xero-edit-dash">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
              Edit dashboard
            </button>
          </div>

          {/* Metric panels - separate card */}
          <div className="xero-card">
            <div className="xero-metrics">
              <div className="xero-metric">
                <div className="xero-metric-label">Drafts (27)</div>
                <div className="xero-metric-value">5,280.50</div>
              </div>
              <div className="xero-metric">
                <div className="xero-metric-label">Awaiting approval (2)</div>
                <div className="xero-metric-value">490.00</div>
              </div>
              <div className="xero-metric">
                <div className="xero-metric-label">Awaiting payment (52)</div>
                <div className="xero-metric-value">28,529.20</div>
              </div>
              <div className="xero-metric">
                <div className="xero-metric-label" style={{ color: 'var(--red)' }}>Overdue (3)</div>
                <div className="xero-metric-value overdue">736.30</div>
              </div>
            </div>
          </div>

          {/* Widget grid */}
          <div className="xero-widget-grid">

            {/* Left column */}
            <div className="xero-widget-col">
              <div className="xero-widget">
                <div className="xero-widget-header">
                  <span className="xero-widget-title">Create new</span>
                </div>
                <div className="xero-create-row">
                  <div className="xero-create-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#9ca3af" strokeWidth="1.2"/><path d="M4 7h6M7 4v6" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    Invoice
                  </div>
                  <button className="xero-create-plus">+</button>
                </div>
                <div className="xero-create-row">
                  <div className="xero-create-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/><path d="M9 5l1 2-2 1" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Payment link
                  </div>
                  <button className="xero-create-plus">+</button>
                </div>
                <div className="xero-create-row">
                  <div className="xero-create-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3h8v8H3z" stroke="#9ca3af" strokeWidth="1.2" rx="1"/><path d="M5 6h4M5 8.5h2" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round"/></svg>
                    Repeating invoice
                  </div>
                  <button className="xero-create-plus">+</button>
                </div>
              </div>

              <div className="xero-widget">
                <div className="xero-widget-header">
                  <span className="xero-widget-title">Billable expenses</span>
                </div>
                <div className="xero-be-summary">
                  <div className="xero-be-stat">
                    <div className="xero-be-num">7</div>
                    <a className="xero-be-link" href="#">Customers</a>
                  </div>
                  <div className="xero-be-stat">
                    <div className="xero-be-num">2,748.02</div>
                    <a className="xero-be-link" href="#">Owing</a>
                  </div>
                </div>
                <div className="xero-be-table-head">
                  <span>Contact</span>
                  <span>Amount</span>
                  <span></span>
                </div>
                <div className="xero-be-row">
                  <span className="xero-be-contact">Quantum Consultants</span>
                  <span className="xero-be-amount">5,995.00</span>
                  <a className="xero-be-action" href="#">Create invoice</a>
                </div>
              </div>
            </div>

            {/* Middle column */}
            <div className="xero-widget-col">
              <div className="xero-widget">
                <div className="xero-widget-header">
                  <span className="xero-widget-title">Money coming in</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#9ca3af" strokeWidth="1.2"/><path d="M7 4.5v3l1.5 1.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="xero-mci-summary">
                  <div className="xero-mci-stat">
                    <div className="xero-mci-value">612.00</div>
                    <div className="xero-mci-label">Due this week</div>
                  </div>
                  <div className="xero-mci-stat">
                    <div className="xero-mci-value">891.56</div>
                    <div className="xero-mci-label">Due next week</div>
                  </div>
                </div>
                {/* Bar chart */}
                <div className="xero-chart">
                  {[
                    { h: 28, color: '#6b7280' },
                    { h: 44, color: '#6b7280' },
                    { h: 36, color: '#93c5fd' },
                    { h: 72, color: '#93c5fd' },
                    { h: 90, color: '#3b82f6' },
                    { h: 58, color: '#93c5fd' },
                    { h: 40, color: '#93c5fd' },
                  ].map((bar, i) => (
                    <div key={i} className="xero-bar" style={{ height: bar.h, background: bar.color }} />
                  ))}
                </div>
                <div className="xero-chart-axis">
                  <span>1k</span>
                  <span>2k</span>
                  <span>3k</span>
                  <span>4k</span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="xero-widget-col">
              <div className="xero-widget">
                <div className="xero-widget-header">
                  <span className="xero-widget-title">Customers owing the most</span>
                </div>
                <div className="xero-owing-head">
                  <span>Customer</span>
                  <span>Due</span>
                  <span>Overdue</span>
                </div>
                {[
                  { initials: 'QC', color: '#10b981', name: 'Quantum Consultants', due: '10,295.00', overdue: '5,995.00', red: true },
                  { initials: 'AE', color: '#8b5cf6', name: 'Alana Edwards', due: '4,326.10', overdue: '1,240.60', red: true },
                  { initials: 'HSP', color: '#16a34a', name: 'Hamilton Smith Pty', due: '1,320.00', overdue: '0.00', red: false },
                  { initials: 'PP', color: '#f59e0b', name: 'Portal project', due: '1,155.20', overdue: '1,155.20', red: true },
                  { initials: 'KJ', color: '#f97316', name: 'Kinnet & Jones', due: '840.12', overdue: '0.00', red: false },
                  { initials: 'AW', color: '#0ea5e9', name: 'Abby & Wells', due: '680.90', overdue: '0.00', red: false },
                  { initials: 'JD', color: '#ec4899', name: 'Jane Doe', due: '612.00', overdue: '0.00', red: false },
                  { initials: 'SSB', color: '#14b8a6', name: 'Sunny Side Bakery', due: '589.50', overdue: '589.50', red: true },
                  { initials: 'CD', color: '#6366f1', name: 'Cityscape Developers', due: '430.00', overdue: '0.00', red: false },
                ].map(row => (
                  <div key={row.name} className="xero-owing-row">
                    <div className="xero-owing-customer">
                      <div className="xero-customer-avatar" style={{ background: row.color, fontSize: row.initials.length > 2 ? '8px' : '10px' }}>{row.initials}</div>
                      <a className="xero-owing-name" href="#">{row.name}</a>
                    </div>
                    <span className="xero-owing-due">{row.due}</span>
                    <span className={`xero-owing-overdue${row.red ? ' red' : ' zero'}`}>{row.overdue}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="xero-toast">
          <span className="xero-toast-text">We'll email a reminder to tess@gmail.com</span>
          <button className="xero-toast-close" onClick={() => setToast(false)} aria-label="Dismiss">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      )}

      {/* Wizard overlay - full screen */}
      <div className={`overlay${overlayOpen ? ' open' : ''}`}>
        <div className="wizard-modal" ref={modalRef}>
          <div className="wiz-inner">
            {/* Title bar */}
            <div className="wiz-topbar">
              <span className="wiz-modal-title">Surcharging rules are changing in Australia</span>
              <button className="wiz-close" onClick={closeWizard} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div className={`wiz-step${fading ? ' fading' : ''}`}>
              {wStep === 1 && (
                <Step1 onNext={() => wGo(2)} onClose={closeWizard} onRemind={showToast} />
              )}
              {wStep === 2 && (
                <Step2
                  wFork={wFork}
                  onSelectFork={handleSelectFork}
                  onBack={() => wGo(1)}
                  onContinue={handleForkContinue}
                />
              )}
              {wStep === 3 && (
                <Step3
                  wAlt={wAlt}
                  wAmt={wAmt}
                  onToggleAlt={handleToggleAlt}
                  onAmtChange={setWAmt}
                  onBack={() => wGo(2)}
                  onContinue={() => wGo(4)}
                />
              )}
              {wStep === 4 && (
                <Step4
                  wFork={wFork}
                  wAlt={wAlt}
                  onBack={n => wGo(n)}
                  onClose={closeWizard}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
