'use client'

import React, { useState, useEffect, useRef } from 'react'
import { XUIModal } from '@xero/xui/react/modal'
import XUIButton from '@xero/xui/react/button'
import XUIIcon from '@xero/xui/react/icon'
import cycleIcon from '@xero/xui-icon/icons/cycle'

// ─── Slide 1: animated toggle panel ─────────────────────────────────────────

function Slide1Visual() {
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsOn(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="ap-lm-visual ap-lm-visual--s1">
      <div className="ap-lm-panel-mock">
        <div className="ap-lm-pm__header">Online payments</div>
        <div className="ap-lm-pm__body">
          <div className="ap-lm-pm__toggle-row">
            <div className={`ap-lm-pm__switch${isOn ? ' ap-lm-pm__switch--on' : ''}`}>
              <span className="ap-lm-pm__switch-thumb" />
            </div>
            <span className="ap-lm-pm__toggle-label">Offer Autopay</span>
            <span className={`ap-lm-pm__cycle-icon${isOn ? ' ap-lm-pm__cycle-icon--on' : ''}`}>
              <XUIIcon icon={cycleIcon} color={isOn ? 'green' : undefined} />
            </span>
          </div>
          <div className="ap-lm-pm__methods">
            <div className="ap-lm-pm__method-row ap-lm-pm__method-row--first">
              <span className="ap-lm-pm__checkbox ap-lm-pm__checkbox--checked" aria-hidden="true" />
              <span className="ap-lm-pm__method-text">Card incl. Apple Pay &amp; Google Pay</span>
              <span className={`ap-lm-pm__method-cycle${isOn ? ' ap-lm-pm__method-cycle--on' : ''}`}>
                <XUIIcon icon={cycleIcon} color="green" />
              </span>
            </div>
            <div className="ap-lm-pm__method-row">
              <span className="ap-lm-pm__checkbox" aria-hidden="true" />
              <span className="ap-lm-pm__method-text">Direct Debit (recurring)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 2: invoice field pill with pulsing cycle icon ─────────────────────

function Slide2Visual() {
  return (
    <div className="ap-lm-visual ap-lm-visual--s2">
      <div className="ap-lm-field-mock">
        <div className="ap-lm-fm__mock-header">Invoice #INV-0892</div>
        <div className="ap-lm-fm__mock-body">
          <span className="ap-lm-fm__label">Online payments</span>
          <div className="ap-lm-fm__field">
            <span className="ap-lm-fm__pill">
              Card
              <span className="ap-lm-fm__pill-cycle">
                <XUIIcon icon={cycleIcon} color="green" />
              </span>
            </span>
          </div>
          <span className="ap-lm-fm__hint">Autopay is on for this invoice</span>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 3: animated checkout form ─────────────────────────────────────────

const CARD_FULL   = '3456 3456 3456 1234'
const EXPIRY_FULL = '08 / 28'
const CVC_FULL    = '123'

function Slide3Visual() {
  const [cardNum, setCardNum] = useState('')
  const [expiry,  setExpiry]  = useState('')
  const [cvc,     setCvc]     = useState('')
  const [showVisa, setShowVisa] = useState(false)
  const [checked,  setChecked] = useState(false)
  const [pressing, setPressing] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    function run() {
      if (cancelled) return
      setCardNum(''); setExpiry(''); setCvc('')
      setShowVisa(false); setChecked(false); setPressing(false)

      // Card number: 19 chars × 65ms = 1235ms → done at ~1635ms
      CARD_FULL.split('').forEach((_, i) =>
        t(() => setCardNum(CARD_FULL.slice(0, i + 1)), 400 + i * 65)
      )
      t(() => setShowVisa(true), 400 + CARD_FULL.length * 65 + 80)

      // Expiry: 7 chars × 80ms = 560ms → starts 2000ms, done ~2560ms
      const expiryStart = 2000
      EXPIRY_FULL.split('').forEach((_, i) =>
        t(() => setExpiry(EXPIRY_FULL.slice(0, i + 1)), expiryStart + i * 80)
      )

      // CVC: 3 chars × 100ms → starts 2800ms, done ~3100ms
      const cvcStart = 2800
      CVC_FULL.split('').forEach((_, i) =>
        t(() => setCvc(CVC_FULL.slice(0, i + 1)), cvcStart + i * 100)
      )

      // Checkbox: 3500ms
      t(() => setChecked(true), 3500)

      // Pay press: 4200ms
      t(() => setPressing(true),  4200)
      t(() => setPressing(false), 4420)

      // Loop: 6200ms
      t(run, 6200)
    }

    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [])

  const typingCard   = !showVisa
  const typingExpiry = showVisa && expiry.length < EXPIRY_FULL.length
  const typingCvc    = expiry.length === EXPIRY_FULL.length && cvc.length < CVC_FULL.length

  return (
    <div className="ap-lm-visual ap-lm-visual--s3">
      <div className="ap-lm-co">
        <div className="ap-lm-co__field-group">
          <div className="ap-lm-co__label">Card number</div>
          <div className="ap-lm-co__input">
            <span className="ap-lm-co__cardnum">
              {cardNum}
              {typingCard && <span className="ap-lm-co__caret" />}
            </span>
            <span className={`ap-lm-co__visa${showVisa ? ' ap-lm-co__visa--show' : ''}`}>VISA</span>
          </div>
        </div>
        <div className="ap-lm-co__row">
          <div className="ap-lm-co__field-group">
            <div className="ap-lm-co__label">Expiration</div>
            <div className="ap-lm-co__input">
              <span className="ap-lm-co__val">
                {expiry}{typingExpiry && <span className="ap-lm-co__caret" />}
              </span>
            </div>
          </div>
          <div className="ap-lm-co__field-group">
            <div className="ap-lm-co__label">CVC</div>
            <div className="ap-lm-co__input">
              <span className="ap-lm-co__val">
                {cvc}{typingCvc && <span className="ap-lm-co__caret" />}
              </span>
            </div>
          </div>
        </div>
        <div className="ap-lm-co__check-row">
          <span className={`ap-lm-co__box${checked ? ' ap-lm-co__box--checked' : ''}`}>
            {checked && (
              <svg viewBox="0 0 12 10" fill="none" aria-hidden="true" className="ap-lm-co__tick">
                <polyline points="1,5 4,9 11,1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="ap-lm-co__check-label">
            Set up Auto pay and pay future invoices automatically on their due dates
          </span>
        </div>
        <button
          type="button"
          className={`ap-lm-co__pay${pressing ? ' ap-lm-co__pay--pressing' : ''}`}
        >
          Pay $396.00
        </button>
      </div>
    </div>
  )
}

// ─── Slide 4: Check autopay illustration (SVG) ────────────────────────────────

function Slide4Visual() {
  return (
    <div className="ap-lm-visual ap-lm-visual--s4">
      <div className="ap-lm-illustration-wrap">
        <img
          src="/saved-card-wizard.svg"
          alt=""
          aria-hidden="true"
          className="ap-lm-illustration-img"
        />
      </div>
    </div>
  )
}

// ─── Slide 5: Autopay ON → OFF toggle animation ───────────────────────────────

function Slide5Visual() {
  const [isOff, setIsOff] = useState(false)

  useEffect(() => {
    // Show ON for 3s, then loop: ON → OFF → ON → OFF every 3s (6s full cycle)
    const interval = setInterval(() => setIsOff(prev => !prev), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="ap-lm-visual ap-lm-visual--s5">
      <div className="ap-lm-s5__wrap">
        <img
          src="/PS-AutopayOn-Ill.svg"
          alt=""
          aria-hidden="true"
          className={`ap-lm-s5__img ap-lm-s5__img--on${isOff ? ' ap-lm-s5__img--hidden' : ''}`}
        />
        <img
          src="/PS-AutopayOff-Ill.svg"
          alt=""
          aria-hidden="true"
          className={`ap-lm-s5__img ap-lm-s5__img--off${isOff ? ' ap-lm-s5__img--visible' : ''}`}
        />
      </div>
    </div>
  )
}

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    tag: 'For you',
    tagVariant: 'positive' as const,
    headline: 'Turn Autopay on for any invoice',
    body: 'Switch Autopay on in the online payments panel. Xero will offer your customer the option to save their card. Once they do, every future invoice is collected automatically on the due date.',
    Visual: Slide1Visual,
  },
  {
    tag: 'In the invoice',
    tagVariant: 'neutral' as const,
    headline: 'The cycle icon confirms Autopay is offered',
    body: 'Once you turn Autopay on, the cycle icon appears next to the online payments field. It\'s a quick signal for you and your team that this invoice is set up for automatic collection.',
    Visual: Slide2Visual,
  },
  {
    tag: 'For your customer',
    tagVariant: 'neutral' as const,
    headline: 'Customers save their card once. Autopay handles the rest.',
    body: 'Your customer pays their first invoice as normal and selects "Set up Autopay". From that point, every future invoice is collected automatically on its due date. No reminders, no chasing.',
    Visual: Slide3Visual,
  },
  {
    tag: 'Visibility',
    tagVariant: 'neutral' as const,
    headline: 'Track Autopay from the invoice and their contact',
    body: 'Enrolled customers show "Auto pay active" on every new invoice you raise. You can see their saved card and manage it from there: update, cancel, or leave it running.',
    Visual: Slide4Visual,
  },
  {
    tag: 'Heads up',
    tagVariant: 'negative' as const,
    headline: 'One-time sales only? You can turn it off',
    body: 'If your business only sends one-time invoices, Autopay may not be the right fit. You can switch it off as the default in Settings › Online payments › Default settings.',
    Visual: Slide5Visual,
  },
]

// ─── Main modal ───────────────────────────────────────────────────────────────

interface AutopayLearnMoreModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AutopayLearnMoreModal({ isOpen, onClose }: AutopayLearnMoreModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  function handleClose() {
    setCurrentSlide(0)
    setDirection('forward')
    onClose()
  }

  function goNext() {
    if (currentSlide < SLIDES.length - 1) {
      setDirection('forward')
      setCurrentSlide(s => s + 1)
    } else {
      handleClose()
    }
  }

  function goBack() {
    if (currentSlide > 0) {
      setDirection('back')
      setCurrentSlide(s => s - 1)
    }
  }

  const slide = SLIDES[currentSlide]
  const isLast = currentSlide === SLIDES.length - 1
  const { Visual } = slide

  return (
    <XUIModal
      isOpen={isOpen}
      closeButtonLabel="Close"
      onClose={handleClose}
      size="medium"
      isUsingPortal
      hasDefaultLayout={false}
      hideOnOverlayClick={false}
      hideOnEsc
      closeClassName="ap-lm__xui-close"
      className="ap-lm__modal"
    >
      {/* Single clip wrapper — prevents white radius bleed */}
      <div className="ap-lm__modal-body">
      {/* ── Hero visual — full-bleed, top ~60% ── */}
      <div className="ap-lm__visual-wrap" key={`visual-${currentSlide}`}>
        <Visual />
        <button
          className="ap-lm__close-btn"
          aria-label="Close"
          onClick={handleClose}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ── Dark content section ── */}
      <div className="ap-lm__dark-section">
        <div
          className={`ap-lm__content ap-lm__content--enter-${direction}`}
          key={currentSlide}
        >
          <span className="ap-lm__eyebrow">{slide.tag}</span>
          <h2 className="ap-lm__headline">{slide.headline}</h2>
          <p className="ap-lm__body">{slide.body}</p>
        </div>

        <div className="ap-lm__footer">
          <div className="ap-lm__dots" role="tablist" aria-label="Step">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={`Step ${i + 1} of ${SLIDES.length}`}
                className={`ap-lm__dot${i === currentSlide ? ' ap-lm__dot--active' : ''}`}
              />
            ))}
          </div>
          <div className="ap-lm__footer-btns">
            {currentSlide > 0 && (
              <XUIButton
                variant="standard"
                size="small"
                onClick={goBack}
              >
                Back
              </XUIButton>
            )}
            <XUIButton variant="main" size="small" onClick={goNext}>
              {isLast ? 'Got it' : 'Next'}
            </XUIButton>
          </div>
        </div>
      </div>
      </div>{/* ── end ap-lm__modal-body ── */}
    </XUIModal>
  )
}
