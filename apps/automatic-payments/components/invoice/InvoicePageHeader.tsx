'use client'

import Link from 'next/link'
import XUIPageHeader from '@xero/xui/react/pageheader'
import XUIButton, { XUISplitButtonGroup } from '@xero/xui/react/button'
import XUITag from '@xero/xui/react/tag'
import XUIIcon from '@xero/xui/react/icon'
import viewIcon from '@xero/xui-icon/icons/view'
import caretIcon from '@xero/xui-icon/icons/caret'
import { useInvoice } from '@/hooks/useInvoiceState'

function BreadcrumbArrow() {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color: '#9aa5b1' }}
    >
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function VerticalDots() {
  return (
    <svg width="3" height="13" viewBox="0 0 3 13" fill="currentColor" aria-hidden="true">
      <circle cx="1.5" cy="1.5" r="1.5" />
      <circle cx="1.5" cy="6.5" r="1.5" />
      <circle cx="1.5" cy="11.5" r="1.5" />
    </svg>
  )
}

export default function InvoicePageHeader() {
  const { state } = useInvoice()
  const { selectedContact } = state

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="ap-invoice__breadcrumb">
      <ol className="ap-invoice__breadcrumb-list">
        <li><Link href="#">Sales</Link></li>
        <li aria-hidden="true"><BreadcrumbArrow /></li>
        <li aria-current="page"><Link href="#">Invoices</Link></li>
      </ol>
    </nav>
  )

  const title = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      New invoice
      <XUITag size="small" variant="neutral">Draft</XUITag>
      {selectedContact && (
        <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(0,10,30,0.55)', marginLeft: 4 }}>
          All changes saved as draft
        </span>
      )}
    </span>
  )

  const actions = (
    <div className="xui-u-flex xui-u-flex-align-center" style={{ gap: 8 }}>
      <XUIButton variant="borderless-main" size="small">
        <XUIIcon icon={viewIcon} className="xui-margin-right-2xsmall" />
        Preview
      </XUIButton>

      <XUISplitButtonGroup variant="standard" size="small">
        <XUIButton variant="standard" size="small">Save and close</XUIButton>
        <XUIButton variant="standard" size="small" aria-label="More save options">
          <XUIIcon icon={caretIcon} />
        </XUIButton>
      </XUISplitButtonGroup>

      <XUISplitButtonGroup variant="main" size="small">
        <XUIButton variant="main" size="small">Approve and email</XUIButton>
        <XUIButton variant="main" size="small" aria-label="More approval options">
          <XUIIcon icon={caretIcon} />
        </XUIButton>
      </XUISplitButtonGroup>

      <button className="ap-invoice__more" aria-label="More options">
        <VerticalDots />
      </button>
    </div>
  )

  return (
    <XUIPageHeader
      breadcrumb={breadcrumb}
      title={title}
      actions={actions}
    />
  )
}
