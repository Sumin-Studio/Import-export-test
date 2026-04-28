'use client'

import { useState } from 'react'
import XUIBanner from '@xero/xui/react/banner'
import { Contact } from '@/types'

interface Props {
  contact: Contact
}

function formatCancelledDate(dateStr: string): string {
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AutopayCancelledBanner({ contact }: Props) {
  const [dismissed, setDismissed] = useState(false)
  const cancelledAt = contact.enrollment?.cancelledAt

  if (dismissed) return null

  return (
    <XUIBanner
      sentiment="information"
      hasDefaultLayout={false}
      closeButtonLabel="Dismiss"
      onCloseClick={() => setDismissed(true)}
    >
      {contact.name} cancelled autopay{cancelledAt ? ` on ${formatCancelledDate(cancelledAt)}` : ''}
    </XUIBanner>
  )
}
