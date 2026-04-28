'use client'

import { useInvoice } from '@/hooks/useInvoiceState'
import { useState, useEffect } from 'react'
import XUIBanner from '@xero/xui/react/banner'
import { XUICheckbox } from '@xero/xui/react/checkbox'
import { XUISwitch } from '@xero/xui/react/switch'
import XUITag from '@xero/xui/react/tag'
import XUIButton from '@xero/xui/react/button'
import XUIIcon from '@xero/xui/react/icon'
import XUITooltip from '@xero/xui/react/tooltip'
import cycleIcon from '@xero/xui-icon/icons/cycle'
import crossIcon from '@xero/xui-icon/icons/cross'
import externalIcon from '@xero/xui-icon/icons/external'
import arrowSmallIcon from '@xero/xui-icon/icons/arrow-small'
import emailIcon from '@xero/xui-icon/icons/email'
import infoIcon from '@xero/xui-icon/icons/info'
import trashIcon from '@xero/xui-icon/icons/trash'
import { XUIModal, XUIModalHeader, XUIModalBody, XUIModalFooter, XUIModalHeading } from '@xero/xui/react/modal'
import { XUIToast, XUIToastWrapper } from '@xero/xui/react/toast'
import AutopayLearnMoreModal from '@/components/autopay/AutopayLearnMoreModal'

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PanelErrorBanner() {
  const { state, dispatch } = useInvoice()

  if (!state.panelInteractionAttempted) return null

  return (
    <div className="ap-sidepanel__error-banner">
      <XUIBanner
        sentiment="negative"
        closeButtonLabel="Dismiss"
        onCloseClick={() => dispatch({ type: 'CLEAR_PANEL_INTERACTION' })}
      >
        Close this panel to edit the invoice
      </XUIBanner>
    </div>
  )
}

function DepositPanel() {
  const { state, dispatch } = useInvoice()
  const { invoice } = state
  const [depositPercent, setDepositPercent] = useState(50)
  const depositAmount = ((depositPercent / 100) * invoice.total).toFixed(2)
  const balance = (invoice.total - parseFloat(depositAmount)).toFixed(2)

  function formatDate(dateStr: string) {
    if (!dateStr) return '—'
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <>
      <div className="ap-sidepanel__content">
        <PanelErrorBanner />

        <div className="ap-sidepanel__section">
          <div className="ap-sidepanel__row-label">
            <span className="ap-sidepanel__label">Deposit</span>
            <span className="ap-sidepanel__sublabel">Due upon receipt</span>
          </div>
          <div className="ap-sidepanel__deposit-controls">
            <div className="ap-select-wrap ap-select-wrap--small">
              <select
                className="ap-select-wrap__select"
                value={depositPercent}
                onChange={e => setDepositPercent(Number(e.target.value))}
              >
                {[10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100].map(p => (
                  <option key={p} value={p}>{p}%</option>
                ))}
              </select>
            </div>
            <span className="ap-sidepanel__deposit-amount">{depositAmount}</span>
          </div>
        </div>

        <div className="ap-sidepanel__divider" />

        <div className="ap-sidepanel__section">
          <div className="ap-sidepanel__row-label">
            <span className="ap-sidepanel__label">Balance</span>
            <span className="ap-sidepanel__sublabel">Due {formatDate(invoice.dueDate)}</span>
          </div>
          <span className="ap-sidepanel__balance-amount">{balance}</span>
        </div>
      </div>

      <div className="ap-sidepanel__footer">
        <button
          className="xui-button xui-button-standard xui-button-small"
          type="button"
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
        >
          Cancel
        </button>
        <button
          className="xui-button xui-button-main xui-button-small"
          type="button"
        >
          Apply
        </button>
      </div>
    </>
  )
}

const MANAGE_METHODS = [
  { key: 'card', label: 'Card includes Apple Pay and Google Pay', recurring: true },
  { key: 'directDebit', label: 'Direct Debit (recurring)', recurring: true },
  { key: 'payTo', label: 'PayTo', recurring: false },
  { key: 'zip', label: 'Zip', recurring: false },
]

function ManagePanel() {
  const { state, dispatch } = useInvoice()
  const { selectedContact, overrideMethods, autopayEnabled: stateAutopay } = state

  const initMethods = () => {
    if (overrideMethods !== null) {
      return {
        card: overrideMethods.includes('card'),
        directDebit: overrideMethods.includes('directDebit'),
        payTo: overrideMethods.includes('payTo'),
        zip: overrideMethods.includes('zip'),
      }
    }
    return { card: true, directDebit: false, payTo: true, zip: false }
  }

  const [methods, setMethods] = useState<Record<string, boolean>>(initMethods)
  const [autopayEnabled, setAutopayEnabled] = useState(stateAutopay)
  const [infoDismissed, setInfoDismissed] = useState(false)
  const [shimmerKeys, setShimmerKeys] = useState<string[]>([])
  const [showLearnMore, setShowLearnMore] = useState(false)

  function toggle(key: string) {
    setMethods(prev => {
      const next = { ...prev, [key]: !prev[key] }
      if (autopayEnabled && !next.card && !next.directDebit) {
        setAutopayEnabled(false)
      }
      return next
    })
  }

  function handleAutopayToggle() {
    const next = !autopayEnabled
    setAutopayEnabled(next)
    if (next) {
      setMethods(prev => ({ ...prev, card: true, directDebit: true }))
      setShimmerKeys(['card', 'directDebit'])
      setTimeout(() => setShimmerKeys([]), 900)
    }
  }

  function handleApply() {
    const selected = MANAGE_METHODS.filter(m => methods[m.key]).map(m => m.key)
    dispatch({ type: 'SET_OVERRIDE_METHODS', payload: selected })
    dispatch({ type: 'SET_AUTOPAY_ENABLED', payload: autopayEnabled })
    dispatch({ type: 'CLOSE_PANEL' })
  }

  return (
    <>
      <div className="ap-sidepanel__content">
        <PanelErrorBanner />

        <div className="ap-manage__section">
          <label className="ap-manage__section-label">Online payment methods</label>
          <div className="ap-manage__checkbox-group">
            {MANAGE_METHODS.map(({ key, label, recurring }, i) => (
              <div
                key={key}
                className={[
                  'ap-manage__checkbox-row',
                  i === 0 ? 'ap-manage__checkbox-row--first' : '',
                  shimmerKeys.includes(key) ? 'ap-manage__checkbox-row--shimmer' : '',
                ].filter(Boolean).join(' ')}
              >
                <XUICheckbox
                  size="small"
                  isChecked={methods[key]}
                  onChange={() => toggle(key)}
                >
                  {label}
                </XUICheckbox>
                {methods[key] && (key === 'directDebit' || (recurring && autopayEnabled)) && (
                  <span className="ap-manage__method-icon">
                    <XUIIcon icon={cycleIcon} color="green" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="ap-manage__divider" />

        <div className="ap-manage__toggle-box">
          {!infoDismissed && !['enrolled', 'expired'].includes(selectedContact?.autopayStatus ?? '') && (
            <div className="ap-manage__info-bar">
              <div className="ap-manage__info-bar-left">
                <span className="ap-tag--navy">New</span>
                <XUIButton variant="borderless-main" size="xsmall" onClick={() => setShowLearnMore(true)}>
                  Learn more about Autopay
                </XUIButton>
              </div>
              <button
                className="ap-manage__info-bar-close"
                aria-label="Dismiss"
                onClick={() => setInfoDismissed(true)}
              >
                <XUIIcon icon={crossIcon} color="black-faint" />
              </button>
            </div>
          )}
          <div className="ap-manage__toggle-row">
            <XUISwitch
              isChecked={autopayEnabled}
              onChange={handleAutopayToggle}
              id="autopay-switch"
            />
            <span className="ap-manage__toggle-label">
              Offer Autopay
            </span>
          </div>
          <p className="ap-manage__toggle-desc">
            Allows customers to set up automatic payments for future sales using compatible methods (<XUIIcon icon={cycleIcon} color="green" />).
          </p>
        </div>
      </div>

      <div className="ap-sidepanel__footer">
        <div className="ap-sidepanel__footer-left">
          <XUIButton variant="borderless-main" size="small" rightIcon={externalIcon}>
            Manage methods
          </XUIButton>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <XUIButton variant="standard" size="small" onClick={() => dispatch({ type: 'CLOSE_PANEL' })}>
            Cancel
          </XUIButton>
          <XUIButton variant="main" size="small" onClick={handleApply}>
            Apply
          </XUIButton>
        </div>
      </div>

      <AutopayLearnMoreModal isOpen={showLearnMore} onClose={() => setShowLearnMore(false)} />
    </>
  )
}

const OVERRIDE_METHODS = [
  { key: 'card', label: 'Card includes Apple Pay and Google Pay' },
  { key: 'directDebit', label: 'Direct Debit (recurring)' },
  { key: 'payTo', label: 'PayTo' },
  { key: 'zip', label: 'Zip' },
]

function CarolManagePanel() {
  const { state, dispatch } = useInvoice()
  const { selectedContact, overrideMethods, autopayEnabled: stateAutopay } = state

  const initMethods = () => {
    if (overrideMethods !== null) {
      return {
        card: overrideMethods.includes('card'),
        directDebit: overrideMethods.includes('directDebit'),
        payTo: overrideMethods.includes('payTo'),
        zip: overrideMethods.includes('zip'),
      }
    }
    return { card: true, directDebit: false, payTo: false, zip: false }
  }

  const [methods, setMethods] = useState<Record<string, boolean>>(initMethods)
  const [autopayEnabled, setAutopayEnabled] = useState(overrideMethods !== null ? stateAutopay : true)
  const [shimmerKeys, setShimmerKeys] = useState<string[]>([])

  function toggle(key: string) {
    setMethods(prev => {
      const next = { ...prev, [key]: !prev[key] }
      if (autopayEnabled && !next.card && !next.directDebit) {
        setAutopayEnabled(false)
      }
      return next
    })
  }

  function handleAutopayToggle() {
    const next = !autopayEnabled
    setAutopayEnabled(next)
    if (next) {
      setMethods(prev => ({ ...prev, card: true, directDebit: true }))
      setShimmerKeys(['card', 'directDebit'])
      setTimeout(() => setShimmerKeys([]), 900)
    }
  }

  function handleApply() {
    const selected = MANAGE_METHODS.filter(m => methods[m.key]).map(m => m.key)
    dispatch({ type: 'SET_OVERRIDE_METHODS', payload: selected })
    dispatch({ type: 'SET_AUTOPAY_ENABLED', payload: autopayEnabled })
    dispatch({ type: 'CLOSE_PANEL' })
  }

  return (
    <>
      <div className="ap-sidepanel__content">
        <PanelErrorBanner />

        <div className="ap-manage__section">
          <label className="ap-manage__section-label">Online payment methods</label>
          <div className="ap-manage__checkbox-group">
            {MANAGE_METHODS.map(({ key, label, recurring }, i) => (
              <div
                key={key}
                className={[
                  'ap-manage__checkbox-row',
                  i === 0 ? 'ap-manage__checkbox-row--first' : '',
                  shimmerKeys.includes(key) ? 'ap-manage__checkbox-row--shimmer' : '',
                ].filter(Boolean).join(' ')}
              >
                <XUICheckbox
                  size="small"
                  isChecked={methods[key]}
                  onChange={() => toggle(key)}
                >
                  {label}
                </XUICheckbox>
                {methods[key] && (key === 'directDebit' || (recurring && autopayEnabled)) && (
                  <span className="ap-manage__method-icon">
                    <XUIIcon icon={cycleIcon} color="green" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="ap-manage__divider" />

        <div className="ap-manage__toggle-box">
          <div className="ap-manage__toggle-row">
            <XUISwitch
              isChecked={autopayEnabled}
              onChange={handleAutopayToggle}
              id="carol-autopay-switch"
            />
            <span className="ap-manage__toggle-label">Offer Autopay</span>
          </div>
          <p className="ap-manage__toggle-desc">
            Allows customers to set up automatic payments for future sales using compatible methods (<XUIIcon icon={cycleIcon} color="green" />).
          </p>
        </div>
      </div>

      <div className="ap-sidepanel__footer">
        <div className="ap-sidepanel__footer-left">
          <XUIButton variant="borderless-main" size="small" rightIcon={externalIcon}>
            Manage methods
          </XUIButton>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <XUIButton variant="standard" size="small" onClick={() => dispatch({ type: 'CLOSE_PANEL' })}>
            Cancel
          </XUIButton>
          <XUIButton variant="main" size="small" onClick={handleApply}>
            Apply
          </XUIButton>
        </div>
      </div>
    </>
  )
}

function TessManagePanel() {
  const { state, dispatch } = useInvoice()
  const { selectedContact, overrideMethods } = state
  const enrollment = selectedContact?.enrollment
  const [selectedOption, setSelectedOption] = useState<'saved' | 'change'>(
    overrideMethods !== null ? 'change' : 'saved'
  )
  const [checkedMethods, setCheckedMethods] = useState<Record<string, boolean>>(
    overrideMethods !== null
      ? {
          card: overrideMethods.includes('card'),
          directDebit: overrideMethods.includes('directDebit'),
          payTo: overrideMethods.includes('payTo'),
          zip: overrideMethods.includes('zip'),
        }
      : { card: true, directDebit: false, payTo: true, zip: false }
  )

  const last4 = enrollment?.paymentMethod.last4 ?? '1234'
  const expMonth = String(enrollment?.paymentMethod.expiryMonth ?? 8).padStart(2, '0')
  const expYear = String(enrollment?.paymentMethod.expiryYear ?? 28).slice(-2)

  function toggleMethod(key: string) {
    setCheckedMethods(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSave() {
    if (selectedOption === 'change') {
      const selected = OVERRIDE_METHODS
        .filter(m => checkedMethods[m.key])
        .map(m => m.key)
      dispatch({ type: 'SET_OVERRIDE_METHODS', payload: selected })
    } else {
      dispatch({ type: 'SET_OVERRIDE_METHODS', payload: null })
    }
    dispatch({ type: 'CLOSE_PANEL' })
  }

  return (
    <>
      <div className="ap-sidepanel__content">
        <PanelErrorBanner />

        <p className="ap-tess__method-label">
          {selectedContact?.name} has a saved method on file
        </p>

        <div className="ap-tess__radio-group">
          {/* Option 1 — saved method */}
          <div className={`ap-tess__radio-option${selectedOption === 'saved' ? ' ap-tess__radio-option--selected' : ''}`}>
            <label className="ap-tess__radio-label">
              <input
                type="radio"
                name="payment-option"
                value="saved"
                checked={selectedOption === 'saved'}
                onChange={() => setSelectedOption('saved')}
                className="ap-tess__radio-input"
              />
              <div className="ap-tess__radio-top">
                <div className="ap-tess__radio-left">
                  <div className="ap-tess__radio-title-line">
                    <span className={`ap-tess__radio-dot${selectedOption === 'saved' ? ' ap-tess__radio-dot--checked' : ''}`} aria-hidden="true" />
                    <div className="ap-tess__radio-title-row">
                      <span className="ap-tess__radio-title">American Express</span>
                      <XUITag size="xsmall" variant="positive">Active</XUITag>
                    </div>
                  </div>
                  <div className="ap-tess__radio-helper">
                    ···· {last4} | Expiry {expMonth}/{expYear}
                  </div>
                </div>
                <div className="ap-tess__card-wrap">
                  <img
                    src="/amex-saved-card.svg"
                    alt="American Express card"
                    className="ap-tess__card-img"
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Option 2 — change method */}
          <div className={`ap-tess__radio-option${selectedOption === 'change' ? ' ap-tess__radio-option--selected' : ''}`}>
            <label className="ap-tess__radio-label">
              <input
                type="radio"
                name="payment-option"
                value="change"
                checked={selectedOption === 'change'}
                onChange={() => setSelectedOption('change')}
                className="ap-tess__radio-input"
              />
              <div className="ap-tess__radio-top">
                <div className="ap-tess__radio-left">
                  <div className="ap-tess__radio-title-line">
                    <span className={`ap-tess__radio-dot${selectedOption === 'change' ? ' ap-tess__radio-dot--checked' : ''}`} aria-hidden="true" />
                    <span className="ap-tess__radio-title">Change payment method</span>
                  </div>
                  <div className="ap-tess__radio-helper">
                    Only applies to this invoice, all future sales will continue to use the saved method
                  </div>
                </div>
              </div>
            </label>

            {/* Expanded checkbox section — outside label so clicks don't trigger radio */}
            {selectedOption === 'change' && (
              <div className="ap-tess__change-expand">
                <div className="ap-tess__change-divider" />
                <div className="ap-manage__checkbox-group">
                  {OVERRIDE_METHODS.map(({ key, label }, i) => {
                    const isDD = key === 'directDebit'
                    return (
                      <div
                        key={key}
                        className={[
                          'ap-manage__checkbox-row',
                          i === 0 ? 'ap-manage__checkbox-row--first' : '',
                          isDD ? 'ap-manage__checkbox-row--dd-disabled' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        <XUICheckbox
                          size="small"
                          isChecked={checkedMethods[key]}
                          onChange={() => !isDD && toggleMethod(key)}
                          isDisabled={isDD}
                        >
                          {label}
                        </XUICheckbox>
                        {isDD && (
                          <XUITooltip
                            trigger={<span className="ap-manage__dd-tooltip-trigger" aria-hidden="true" />}
                            preferredPosition="top"
                            maxWidth={160}
                            isPortalled
                          >
                            Direct Debit cannot be offered because there is already a recurring saved method for {selectedContact?.name}
                          </XUITooltip>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ap-sidepanel__footer">
        <div className="ap-sidepanel__footer-left">
          <XUIButton variant="borderless-main" size="small" rightIcon={externalIcon}>
            Manage methods
          </XUIButton>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <XUIButton variant="standard" size="small" onClick={() => dispatch({ type: 'CLOSE_PANEL' })}>
            Cancel
          </XUIButton>
          <XUIButton variant="main" size="small" onClick={handleSave}>
            Apply
          </XUIButton>
        </div>
      </div>
    </>
  )
}

function EricManagePanel() {
  const { state, dispatch } = useInvoice()
  const { selectedContact, overrideMethods, autopayEnabled: stateAutopay } = state
  const pm = selectedContact?.enrollment?.paymentMethod
  const expMonth = pm ? String(pm.expiryMonth).padStart(2, '0') : ''
  const expYear = pm ? String(pm.expiryYear).slice(-2) : ''

  const initMethods = () => {
    if (overrideMethods !== null) {
      return {
        card: overrideMethods.includes('card'),
        directDebit: overrideMethods.includes('directDebit'),
        payTo: overrideMethods.includes('payTo'),
        zip: overrideMethods.includes('zip'),
      }
    }
    return { card: true, directDebit: false, payTo: false, zip: false }
  }

  const [methods, setMethods] = useState<Record<string, boolean>>(initMethods)
  const [autopayEnabled, setAutopayEnabled] = useState(overrideMethods !== null ? stateAutopay : true)
  const [shimmerKeys, setShimmerKeys] = useState<string[]>([])
  const [cardDeleted, setCardDeleted] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  function toggle(key: string) {
    setMethods(prev => {
      const next = { ...prev, [key]: !prev[key] }
      if (autopayEnabled && !next.card && !next.directDebit) {
        setAutopayEnabled(false)
      }
      return next
    })
  }

  function handleAutopayToggle() {
    const next = !autopayEnabled
    setAutopayEnabled(next)
    if (next) {
      setMethods(prev => ({ ...prev, card: true }))
      setShimmerKeys(['card'])
      setTimeout(() => setShimmerKeys([]), 900)
    }
  }

  function handleApply() {
    const selected = MANAGE_METHODS.filter(m => methods[m.key]).map(m => m.key)
    dispatch({ type: 'SET_OVERRIDE_METHODS', payload: selected })
    dispatch({ type: 'SET_AUTOPAY_ENABLED', payload: autopayEnabled })
    dispatch({ type: 'CLOSE_PANEL' })
  }

  function handleDeleteCard() {
    setShowDeleteModal(false)
    setCardDeleted(true)
    setShowToast(true)
    // Update invoice state: removes the expired banner and shows Card + autopay in the field
    dispatch({ type: 'SET_OVERRIDE_METHODS', payload: ['card'] })
    dispatch({ type: 'SET_AUTOPAY_ENABLED', payload: true })
  }

  return (
    <>
      <div className="ap-sidepanel__content">
        <PanelErrorBanner />

        <p className="ap-tess__method-label">
          {selectedContact?.name} has a saved method on file
        </p>

        {!cardDeleted && (
          <div className="ap-eric__tile">
            <div className="ap-eric__tile-card-row">
              <div className="ap-eric__tile-left">
                <div className="ap-eric__tile-title-row">
                  <span className="ap-eric__tile-brand">{pm?.brand ?? 'Visa'}</span>
                  <XUITag size="xsmall" variant="negative">Expired</XUITag>
                </div>
                <span className="ap-eric__tile-number">···· {pm?.last4} | Expiry {expMonth}/{expYear}</span>
              </div>
              <img src="/visa-expired-card.svg" alt="Expired Visa card" className="ap-eric__tile-img" />
            </div>
            <XUIButton
              variant="borderless-negative"
              size="xsmall"
              rightIcon={trashIcon}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete expired card
            </XUIButton>
          </div>
        )}

        {/* Online payment methods */}
        <div className="ap-manage__section">
          <label className="ap-manage__section-label">Online payment methods</label>
          <div className="ap-manage__checkbox-group">
            {MANAGE_METHODS.map(({ key, label, recurring }, i) => (
              <div
                key={key}
                className={[
                  'ap-manage__checkbox-row',
                  i === 0 ? 'ap-manage__checkbox-row--first' : '',
                  shimmerKeys.includes(key) ? 'ap-manage__checkbox-row--shimmer' : '',
                ].filter(Boolean).join(' ')}
              >
                <XUICheckbox
                  size="small"
                  isChecked={methods[key]}
                  onChange={() => toggle(key)}
                >
                  {label}
                </XUICheckbox>
                {methods[key] && (key === 'directDebit' || (recurring && autopayEnabled)) && (
                  <span className="ap-manage__method-icon">
                    <XUIIcon icon={cycleIcon} color="green" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="ap-manage__divider" />

        <div className="ap-manage__toggle-box">
          <div className="ap-manage__toggle-row">
            <XUISwitch
              isChecked={autopayEnabled}
              onChange={handleAutopayToggle}
              id="eric-autopay-switch"
            />
            <span className="ap-manage__toggle-label">Offer Autopay</span>
          </div>
          <p className="ap-manage__toggle-desc">
            Allows customers to set up automatic payments for future sales using compatible methods (<XUIIcon icon={cycleIcon} color="green" />).
          </p>
        </div>
      </div>

      <div className="ap-sidepanel__footer">
        <div className="ap-sidepanel__footer-left">
          <XUIButton variant="borderless-main" size="small" rightIcon={externalIcon}>
            Manage methods
          </XUIButton>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <XUIButton variant="standard" size="small" onClick={() => dispatch({ type: 'CLOSE_PANEL' })}>
            Cancel
          </XUIButton>
          <XUIButton variant="main" size="small" onClick={handleApply}>
            Apply
          </XUIButton>
        </div>
      </div>

      {/* Delete expired card modal */}
      <XUIModal
        isOpen={showDeleteModal}
        closeButtonLabel="Close"
        onClose={() => setShowDeleteModal(false)}
        size="medium"
        isUsingPortal
        hasDefaultLayout
      >
        <XUIModalHeader>
          <XUIModalHeading>Delete expired card</XUIModalHeading>
        </XUIModalHeader>
        <XUIModalBody>
          <p style={{ marginBottom: 12 }}>
            Deleting this payment method will remove it from {selectedContact?.name}.
          </p>
          <p>
            A record of when this card was added, used, and removed will be kept for audit purposes. For your security, Xero automatically removes expired payment methods after 90 days.
          </p>
        </XUIModalBody>
        <XUIModalFooter>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <XUIButton variant="standard" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </XUIButton>
            <XUIButton variant="main" onClick={handleDeleteCard}>
              Delete expired card
            </XUIButton>
          </div>
        </XUIModalFooter>
      </XUIModal>

      {/* Success toast */}
      {showToast && (
        <div className="ap-toast-fixed">
          <XUIToastWrapper>
            <XUIToast
              sentiment="positive"
              message="Expired card successfully deleted"
            />
          </XUIToastWrapper>
        </div>
      )}
    </>
  )
}

function WilliamManagePanel() {
  const { state, dispatch } = useInvoice()
  const { selectedContact, overrideMethods } = state
  const enrollment = selectedContact?.enrollment
  const pm = enrollment?.paymentMethod
  const last4 = pm?.last4 ?? ''
  const expMonth = pm ? String(pm.expiryMonth).padStart(2, '0') : ''
  const expYear = pm ? String(pm.expiryYear).slice(-2) : ''

  const [selectedOption, setSelectedOption] = useState<'saved' | 'change'>(
    overrideMethods !== null ? 'change' : 'saved'
  )
  const [checkedMethods, setCheckedMethods] = useState<Record<string, boolean>>(
    overrideMethods !== null
      ? {
          card: overrideMethods.includes('card'),
          directDebit: overrideMethods.includes('directDebit'),
          payTo: overrideMethods.includes('payTo'),
          zip: overrideMethods.includes('zip'),
        }
      : { card: true, directDebit: false, payTo: true, zip: false }
  )

  function toggleMethod(key: string) {
    setCheckedMethods(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSave() {
    if (selectedOption === 'change') {
      const selected = OVERRIDE_METHODS.filter(m => checkedMethods[m.key]).map(m => m.key)
      dispatch({ type: 'SET_OVERRIDE_METHODS', payload: selected })
    } else {
      dispatch({ type: 'SET_OVERRIDE_METHODS', payload: null })
    }
    dispatch({ type: 'CLOSE_PANEL' })
  }

  return (
    <>
      <div className="ap-sidepanel__content">
        <PanelErrorBanner />

        <p className="ap-tess__method-label">
          {selectedContact?.name}&apos;s card is expiring soon
        </p>

        <div className="ap-tess__radio-group">
          {/* Option 1 — saved (expiring) method */}
          <div className={`ap-tess__radio-option${selectedOption === 'saved' ? ' ap-tess__radio-option--selected' : ''}`}>
            <label className="ap-tess__radio-label">
              <input
                type="radio"
                name="william-payment-option"
                value="saved"
                checked={selectedOption === 'saved'}
                onChange={() => setSelectedOption('saved')}
                className="ap-tess__radio-input"
              />
              <div className="ap-tess__radio-top">
                <div className="ap-tess__radio-left">
                  <div className="ap-tess__radio-title-line">
                    <span className={`ap-tess__radio-dot${selectedOption === 'saved' ? ' ap-tess__radio-dot--checked' : ''}`} aria-hidden="true" />
                    <div className="ap-tess__radio-title-row">
                      <span className="ap-tess__radio-title">{pm?.brand ?? 'Visa'}</span>
                      <span className="ap-tag-expiring">Expiring soon</span>
                    </div>
                  </div>
                  <div className="ap-tess__radio-helper">
                    ···· {last4} | Expiry {expMonth}/{expYear}
                  </div>
                </div>
                <div className="ap-tess__card-wrap">
                  <img src="/MC-warning-card.svg" alt="Expiring card" className="ap-tess__card-img" />
                </div>
              </div>
            </label>

            {/* Info box — always visible inside option 1 */}
            <div className="ap-warning-info-box">
              <XUIIcon icon={infoIcon} color="blue" className="ap-warning-info-box__icon" />
              <p>Xero will ask {selectedContact?.name} to update their card before it expires.</p>
            </div>
          </div>

          {/* Option 2 — change method for this invoice */}
          <div className={`ap-tess__radio-option${selectedOption === 'change' ? ' ap-tess__radio-option--selected' : ''}`}>
            <label className="ap-tess__radio-label">
              <input
                type="radio"
                name="william-payment-option"
                value="change"
                checked={selectedOption === 'change'}
                onChange={() => setSelectedOption('change')}
                className="ap-tess__radio-input"
              />
              <div className="ap-tess__radio-top">
                <div className="ap-tess__radio-left">
                  <div className="ap-tess__radio-title-line">
                    <span className={`ap-tess__radio-dot${selectedOption === 'change' ? ' ap-tess__radio-dot--checked' : ''}`} aria-hidden="true" />
                    <span className="ap-tess__radio-title">Change payment method</span>
                  </div>
                  <div className="ap-tess__radio-helper">
                    Only applies to this invoice, all future sales will continue to use the saved method
                  </div>
                </div>
              </div>
            </label>

            {selectedOption === 'change' && (
              <div className="ap-tess__change-expand">
                <div className="ap-tess__change-divider" />
                <div className="ap-manage__checkbox-group">
                  {OVERRIDE_METHODS.map(({ key, label }, i) => {
                    const isDD = key === 'directDebit'
                    return (
                      <div
                        key={key}
                        className={[
                          'ap-manage__checkbox-row',
                          i === 0 ? 'ap-manage__checkbox-row--first' : '',
                          isDD ? 'ap-manage__checkbox-row--dd-disabled' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        <XUICheckbox
                          size="small"
                          isChecked={checkedMethods[key]}
                          onChange={() => !isDD && toggleMethod(key)}
                          isDisabled={isDD}
                        >
                          {label}
                        </XUICheckbox>
                        {isDD && (
                          <XUITooltip
                            trigger={<span className="ap-manage__dd-tooltip-trigger" aria-hidden="true" />}
                            preferredPosition="top"
                            maxWidth={160}
                            isPortalled
                          >
                            Direct Debit cannot be offered because there is already a recurring saved method for {selectedContact?.name}
                          </XUITooltip>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ap-sidepanel__footer">
        <div className="ap-sidepanel__footer-left">
          <XUIButton variant="borderless-main" size="small" rightIcon={externalIcon}>
            Manage methods
          </XUIButton>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <XUIButton variant="standard" size="small" onClick={() => dispatch({ type: 'CLOSE_PANEL' })}>
            Cancel
          </XUIButton>
          <XUIButton variant="main" size="small" onClick={handleSave}>
            Apply
          </XUIButton>
        </div>
      </div>
    </>
  )
}

export default function SidePanel() {
  const { state, dispatch } = useInvoice()
  const { panelType, selectedContact } = state

  const isOpen = panelType !== null
  const title = panelType === 'deposit' ? 'Deposit' : panelType === 'manage' ? 'Online payments' : ''
  const showTessPanel = panelType === 'manage' && selectedContact?.autopayStatus === 'enrolled'
  const showEricPanel = panelType === 'manage' && selectedContact?.autopayStatus === 'expired'
  const showWilliamPanel = panelType === 'manage' && selectedContact?.autopayStatus === 'expiring'
  const showCarolPanel = panelType === 'manage' && selectedContact?.autopayStatus === 'cancelled'

  return (
    <div className={`ap-sidepanel${isOpen ? ' ap-sidepanel--open' : ''}`} aria-hidden={!isOpen}>
      <div className="ap-sidepanel__header">
        <span className="ap-sidepanel__title">{title}</span>
        <button
          className="ap-sidepanel__close"
          aria-label="Close panel"
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
        >
          <CloseIcon />
        </button>
      </div>
      {panelType === 'deposit' && <DepositPanel />}
      {panelType === 'manage' && !showTessPanel && !showEricPanel && !showWilliamPanel && !showCarolPanel && <ManagePanel />}
      {panelType === 'manage' && showTessPanel && <TessManagePanel />}
      {panelType === 'manage' && showEricPanel && <EricManagePanel />}
      {panelType === 'manage' && showWilliamPanel && <WilliamManagePanel />}
      {panelType === 'manage' && showCarolPanel && <CarolManagePanel />}
    </div>
  )
}
