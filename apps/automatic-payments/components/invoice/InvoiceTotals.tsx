'use client'

import { formatAmount } from '@/lib/formatCurrency'
import { useInvoice } from '@/hooks/useInvoiceState'

interface Props {
  subtotal: number
  taxTotal: number
  total: number
  contactSelected?: boolean
}

export default function InvoiceTotals({ subtotal, taxTotal, total, contactSelected }: Props) {
  const { dispatch } = useInvoice()

  return (
    <div className="ap-totals">
      <div className="ap-totals__inner">
        <div className="ap-totals__row">
          <span>Subtotal</span>
          <span>{formatAmount(subtotal)}</span>
        </div>
        <div className="ap-totals__row ap-totals__row--muted">
          <span>Includes GST on Income</span>
          <span>{formatAmount(taxTotal)}</span>
        </div>
        <div className="ap-totals__row ap-totals__row--total">
          <span>Total</span>
          <span>{formatAmount(total)}</span>
        </div>
        {contactSelected && (
          <div className="ap-totals__deposit">
            <button
              className="xui-button xui-button-standard xui-button-small"
              type="button"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => dispatch({ type: 'OPEN_PANEL', payload: 'deposit' })}
            >
              Request deposit
            </button>
            <div className="ap-totals__deposit-divider" />
          </div>
        )}
      </div>
    </div>
  )
}
