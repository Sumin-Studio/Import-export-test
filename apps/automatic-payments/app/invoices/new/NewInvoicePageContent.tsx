'use client'

import React from 'react'
import InvoicePageHeader from '@/components/invoice/InvoicePageHeader'
import InvoiceForm from '@/components/invoice/InvoiceForm'
import SidePanel from '@/components/SidePanel'
import AutopayExpiredBanner from '@/components/autopay/AutopayExpiredBanner'
import AutopayWarningBanner from '@/components/autopay/AutopayWarningBanner'
import AutopayCancelledBanner from '@/components/autopay/AutopayCancelledBanner'
import { useInvoice } from '@/hooks/useInvoiceState'

export default function NewInvoicePageContent() {
  const { state, dispatch } = useInvoice()
  const { panelType, selectedContact, overrideMethods } = state
  const panelOpen = panelType !== null

  return (
    <div className="ap-invoice-shell">
      <div className={`ap-invoice-main${panelOpen ? ' ap-invoice-main--panel-open' : ''}`}>
        <InvoicePageHeader />
        <div style={{ padding: '20px 24px 48px' }}>
          {selectedContact?.autopayStatus === 'expired' && !overrideMethods && (
            <div style={{ marginBottom: 16 }}>
              <AutopayExpiredBanner contact={selectedContact} />
            </div>
          )}
          {selectedContact?.autopayStatus === 'expiring' && !overrideMethods && (
            <div style={{ marginBottom: 16 }}>
              <AutopayWarningBanner contact={selectedContact} />
            </div>
          )}
          {selectedContact?.autopayStatus === 'cancelled' && !overrideMethods && (
            <div style={{ marginBottom: 16 }}>
              <AutopayCancelledBanner contact={selectedContact} />
            </div>
          )}
          <InvoiceForm />
        </div>
        {panelOpen && (
          <div
            className="ap-invoice-main__overlay"
            aria-hidden="true"
            onClick={() => dispatch({ type: 'PANEL_INTERACTION_ATTEMPTED' })}
          />
        )}
      </div>
      <SidePanel />
    </div>
  )
}
