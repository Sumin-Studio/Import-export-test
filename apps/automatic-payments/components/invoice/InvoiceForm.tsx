'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useInvoice } from '@/hooks/useInvoiceState'
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput'
import XUIIcon from '@xero/xui/react/icon'
import dateIcon from '@xero/xui-icon/icons/date-start'
import bookmarkIcon from '@xero/xui-icon/icons/bookmark'
import themeIcon from '@xero/xui-icon/icons/theme'
import currencyIcon from '@xero/xui-icon/icons/currency'
import cycleIcon from '@xero/xui-icon/icons/cycle'
import invalidIcon from '@xero/xui-icon/icons/invalid'
import XUITag from '@xero/xui/react/tag'
import XUIButton from '@xero/xui/react/button'
import XUIPopover from '@xero/xui/react/popover'
import AutopayLearnMoreModal from '@/components/autopay/AutopayLearnMoreModal'
import ContactSelector from './ContactSelector'
import LineItemsTable from './LineItemsTable'
import InvoiceTotals from './InvoiceTotals'
import EInvoiceToggle from './EInvoiceToggle'

const BRANDING_THEMES = ['Standard', 'Modern', 'Classic']
const CURRENCIES = ['Australian Dollar', 'New Zealand Dollar', 'US Dollar', 'British Pound']
const AMOUNTS_ARE = ['Tax exclusive', 'Tax inclusive', 'No tax']

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function DateField({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const hiddenRef = useRef<HTMLInputElement>(null)
  return (
    <div style={{ position: 'relative' }}>
      <XUITextInput
        id={id}
        size="small"
        value={formatDateDisplay(value)}
        readOnly
        onClick={() => hiddenRef.current?.showPicker?.()}
        style={{ cursor: 'pointer' }}
        leftElement={
          <XUITextInputSideElement>
            <XUIIcon icon={dateIcon} color="black-muted" />
          </XUITextInputSideElement>
        }
      />
      <input
        ref={hiddenRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 1,
          height: 1,
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ fontSize: 13, fontWeight: 700, color: 'rgba(0, 10, 30, 0.65)', display: 'block', marginBottom: 4 }}
    >
      {children}
    </label>
  )
}

function VisaLogo() {
  return (
    <img src="/visa_logo.svg" alt="Visa" width={20} height={11} style={{ flexShrink: 0 }} />
  )
}

function AmexLogo() {
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="American Express" role="img" style={{ flexShrink: 0 }}>
      <g clipPath="url(#amex-clip)">
        <mask id="amex-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="-8" y="0" width="32" height="20">
          <path d="M22.574 0H-6.57397C-7.36155 0 -8 0.688793 -8 1.53846V18.4615C-8 19.3112 -7.36155 20 -6.57397 20H22.574C23.3615 20 24 19.3112 24 18.4615V1.53846C24 0.688793 23.3615 0 22.574 0Z" fill="white"/>
        </mask>
        <g mask="url(#amex-mask)">
          <path d="M22.574 0H-6.57397C-7.36155 0 -8 0.688793 -8 1.53846V18.4615C-8 19.3112 -7.36155 20 -6.57397 20H22.574C23.3615 20 24 19.3112 24 18.4615V1.53846C24 0.688793 23.3615 0 22.574 0Z" fill="white"/>
          <path d="M21.2052 19.0148L19.7222 17.2302L18.1821 19.0148H15.1589H8.65622V10.7071H5.63304L9.39775 1.41478H13.0484L14.3603 4.61478V1.41478H18.9236L19.7222 3.81478L20.5207 1.41478H24.0002V-0.000600934C24.0002 -0.862139 23.3728 -1.53906 22.5742 -1.53906H-7.99976C-8.79833 -1.53906 -9.42578 -0.862139 -9.42578 -0.000600934V19.9994C-9.42578 20.8609 -8.79833 21.5379 -7.99976 21.5379H22.5742C23.3728 21.5379 24.0002 20.8609 24.0002 19.9994V19.0148H21.2052Z" fill="#0071CE"/>
          <path d="M21.6065 18.032H24.0023L20.865 14.4013L24.0023 10.832H21.6636L19.6671 13.1705L17.7278 10.832H15.332L18.5263 14.4628L15.332 18.032H17.6707L19.6671 15.6936L21.6065 18.032Z" fill="#0071CE"/>
          <path d="M11.5089 16.3705V15.2628H15.2736V13.6013H11.5089V12.4936H15.3307V10.832H9.68359V18.032H15.3307V16.3705H11.5089Z" fill="#0071CE"/>
          <path d="M22.234 9.78498H23.9452V2.52344L21.2073 2.58498L19.7242 7.07728L18.1841 2.58498H15.332V9.78498H17.1573V4.73882L18.8686 9.78498H20.4657L22.234 4.73882V9.78498Z" fill="#0071CE"/>
          <path d="M12.422 2.58594H10.0833L7.11719 9.78594H9.11362L9.68403 8.37055H12.7642L13.3347 9.78594H15.3881L12.422 2.58594ZM10.3115 6.70902L11.2241 4.37055L12.1368 6.70902H10.3115Z" fill="#0071CE"/>
          <path d="M22.3457 14.2153L23.9999 16.1846V12.2461L22.3457 14.2153Z" fill="#0071CE"/>
        </g>
      </g>
      <defs>
        <clipPath id="amex-clip">
          <rect width="24" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default function InvoiceForm() {
  const { state, dispatch } = useInvoice()
  const { invoice, selectedContact, overrideMethods, autopayEnabled } = state

  const manageButtonRef = useRef<HTMLSpanElement>(null)
  const [showPopover, setShowPopover] = useState(false)
  const [showLearnMore, setShowLearnMore] = useState(false)

  useEffect(() => {
    if (selectedContact?.autopayStatus === 'unenrolled') {
      setShowPopover(true)
    } else {
      setShowPopover(false)
    }
  }, [selectedContact])

  function updateField(field: keyof typeof invoice, value: unknown) {
    dispatch({ type: 'UPDATE_INVOICE', payload: { field, value } })
  }

  return (
    <React.Fragment>
      <div className="ap-form-card">

        {/* Fields grid: 5 equal columns, wraps after 5 */}
        <div className="ap-form__fields">

          <div className="ap-form__field">
            <FieldLabel>Contact</FieldLabel>
            <ContactSelector
              value={selectedContact}
              onChange={(c) => dispatch({ type: 'SET_CONTACT', payload: c })}
            />
          </div>

          <div className="ap-form__field">
            <FieldLabel htmlFor="issue-date">Issue date</FieldLabel>
            <DateField
              id="issue-date"
              value={invoice.issueDate}
              onChange={(v) => updateField('issueDate', v)}
            />
          </div>

          <div className="ap-form__field">
            <FieldLabel htmlFor="due-date">Due date</FieldLabel>
            <DateField
              id="due-date"
              value={invoice.dueDate}
              onChange={(v) => updateField('dueDate', v)}
            />
          </div>

          <div className="ap-form__field">
            <FieldLabel htmlFor="inv-number">Invoice number</FieldLabel>
            <XUITextInput
              id="inv-number"
              size="small"
              value={invoice.number}
              onChange={(e) => updateField('number', e.target.value)}
              leftElement={
                <XUITextInputSideElement type="text">#</XUITextInputSideElement>
              }
            />
          </div>

          <div className="ap-form__field">
            <FieldLabel htmlFor="reference">Reference</FieldLabel>
            <XUITextInput
              id="reference"
              size="small"
              value={invoice.reference}
              onChange={(e) => updateField('reference', e.target.value)}
              leftElement={
                <XUITextInputSideElement>
                  <XUIIcon icon={bookmarkIcon} color="black-muted" />
                </XUITextInputSideElement>
              }
            />
          </div>

          {/* Row 2: Branding theme, Online payments, Currency, Amounts are */}

          <div className="ap-form__field">
            <FieldLabel htmlFor="branding">Branding theme</FieldLabel>
            <div className="ap-select-wrap">
              <XUIIcon icon={themeIcon} color="black-muted" className="ap-select-wrap__icon" />
              <select
                id="branding"
                className="ap-select-wrap__select"
                value={invoice.brandingTheme}
                onChange={(e) => updateField('brandingTheme', e.target.value)}
              >
                {BRANDING_THEMES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="ap-form__field">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 24, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(0, 10, 30, 0.65)', lineHeight: '20px' }}>
                Online payments
              </span>
              {selectedContact ? (
                <span ref={manageButtonRef} style={{ display: 'inline-flex' }}>
                  <XUIButton
                    variant="borderless-main"
                    size="xsmall"
                    onClick={() => dispatch({ type: 'OPEN_PANEL', payload: 'manage' })}
                  >
                    Manage
                  </XUIButton>
                </span>
              ) : (
                <XUIButton variant="borderless-main" size="xsmall" onClick={e => e.preventDefault()}>
                  + Add
                </XUIButton>
              )}
            </div>
            {selectedContact?.autopayStatus === 'expired' && selectedContact.enrollment && !overrideMethods ? (
              <div className="ap-static-field ap-static-field--card ap-static-field--expired">
                <VisaLogo />
                <span className="ap-static-field__card-text ap-static-field__card-text--expired">
                  ···· {selectedContact.enrollment.paymentMethod.last4} has expired
                </span>
                <XUIIcon icon={invalidIcon} color="red" className="ap-static-field__invalid-icon" />
              </div>
            ) : selectedContact?.autopayStatus === 'expiring' && selectedContact.enrollment && !overrideMethods ? (
              <div className="ap-static-field ap-static-field--card ap-static-field--expiring">
                <img src="/ms-logo-square.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
                <span className="ap-static-field__card-text">
                  ···· {selectedContact.enrollment.paymentMethod.last4} | Expiry {String(selectedContact.enrollment.paymentMethod.expiryMonth).padStart(2, '0')}/{String(selectedContact.enrollment.paymentMethod.expiryYear).slice(-2)}
                </span>
              </div>
            ) : selectedContact?.autopayStatus === 'enrolled' && selectedContact.enrollment && !overrideMethods ? (
              <div className="ap-static-field ap-static-field--card">
                <AmexLogo />
                <span className="ap-static-field__card-text">
                  ···· {selectedContact.enrollment.paymentMethod.last4} | Expiry {String(selectedContact.enrollment.paymentMethod.expiryMonth).padStart(2, '0')}/{String(selectedContact.enrollment.paymentMethod.expiryYear).slice(-2)}
                </span>
              </div>
            ) : overrideMethods && overrideMethods.length > 0 ? (
              <div className="ap-static-field ap-static-field--pills">
                {overrideMethods.includes('card') && (
                  <span className="ap-payment-pill">
                    Card
                    {autopayEnabled && <span className="ap-payment-pill__cycle"><XUIIcon icon={cycleIcon} color="green" /></span>}
                  </span>
                )}
                {overrideMethods.includes('directDebit') && (
                  <span className="ap-payment-pill">
                    Direct Debit
                    <span className="ap-payment-pill__cycle"><XUIIcon icon={cycleIcon} color="green" /></span>
                  </span>
                )}
                {overrideMethods.includes('payTo') && <span className="ap-payment-pill">PayTo</span>}
                {overrideMethods.includes('zip') && <span className="ap-payment-pill">Zip</span>}
              </div>
            ) : selectedContact?.autopayStatus === 'unenrolled' ? (
              <div className="ap-static-field ap-static-field--pills">
                <span className="ap-payment-pill">Card</span>
                <span className="ap-payment-pill">PayTo</span>
              </div>
            ) : selectedContact?.autopayStatus === 'cancelled' ? (
              <div className="ap-static-field ap-static-field--pills">
                <span className="ap-payment-pill">
                  Card
                  <span className="ap-payment-pill__cycle"><XUIIcon icon={cycleIcon} color="green" /></span>
                </span>
              </div>
            ) : (
              <div className="ap-static-field">None</div>
            )}
          </div>

          <div className="ap-form__field">
            <FieldLabel htmlFor="currency">Currency</FieldLabel>
            <div className="ap-select-wrap">
              <XUIIcon icon={currencyIcon} color="black-muted" className="ap-select-wrap__icon" />
              <select
                id="currency"
                className="ap-select-wrap__select"
                value={invoice.currency === 'AUD' ? 'Australian Dollar' : invoice.currency}
                onChange={(e) => updateField('currency', e.target.value)}
              >
                {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="ap-form__field">
            <FieldLabel htmlFor="amounts-are">Amounts are</FieldLabel>
            <select
              id="amounts-are"
              className="ap-select-wrap__select ap-select-wrap__select--no-icon"
              value={invoice.amountsAre}
              onChange={(e) => updateField('amountsAre', e.target.value)}
            >
              {AMOUNTS_ARE.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>

        </div>

        {/* Line items */}
        <LineItemsTable
          items={invoice.lineItems}
          onUpdate={(id, field, value) =>
            dispatch({ type: 'UPDATE_LINE_ITEM', payload: { id, field, value } })
          }
          onAdd={() => dispatch({ type: 'ADD_LINE_ITEM' })}
          onRemove={(id) => dispatch({ type: 'REMOVE_LINE_ITEM', payload: { id } })}
        />

        {/* Footer: action buttons + totals aligned top */}
        <div className="ap-form__footer">
          <div className="ap-table__footer-actions">
            <button className="xui-button xui-button-standard xui-button-small" type="button">
              Columns
              <span style={{ color: '#9aa5b1', fontWeight: 400, marginLeft: 4 }}>(3 hidden)</span>
            </button>
            <button className="xui-button xui-button-standard xui-button-small" type="button">Files</button>
          </div>
          <InvoiceTotals
            subtotal={invoice.subtotal}
            taxTotal={invoice.taxTotal}
            total={invoice.total}
            contactSelected={!!selectedContact}
          />
        </div>

      </div>

      {/* eInvoice toggle — outside the form card */}
      <EInvoiceToggle
        checked={invoice.sendAsEInvoice}
        onChange={(v) => updateField('sendAsEInvoice', v)}
      />

      {/* Autopay promo popover — anchored to Manage button */}
      {showPopover && manageButtonRef.current && (
        <XUIPopover
          id="autopay-promo-popover"
          triggerRef={manageButtonRef}
          width="medium"
          preferredPosition="right"
          onClickCloseButton={() => setShowPopover(false)}
        >
          <div className="ap-promo-popover__inner">
            <span className="ap-tag--navy">New</span>
            <p className="ap-promo-popover__body">
              Allow your customers to store their payment method and give you permission to collect future payments automatically with Autopay
            </p>
            <div className="ap-promo-popover__footer">
              <XUIButton variant="standard" size="small" onClick={() => setShowPopover(false)}>
                Dismiss
              </XUIButton>
              <XUIButton
                variant="main"
                size="small"
                onClick={() => { setShowPopover(false); setShowLearnMore(true) }}
              >
                Discover Autopay
              </XUIButton>
            </div>
          </div>
        </XUIPopover>
      )}

      <AutopayLearnMoreModal isOpen={showLearnMore} onClose={() => setShowLearnMore(false)} />
    </React.Fragment>
  )
}
