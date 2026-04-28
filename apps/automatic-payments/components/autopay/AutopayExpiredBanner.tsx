'use client'

import { useState } from 'react'
import XUIBanner from '@xero/xui/react/banner'
import { Contact } from '@/types'

interface Props {
  contact: Contact
}

export default function AutopayExpiredBanner({ contact }: Props) {
  const [dismissed, setDismissed] = useState(false)
  const pm = contact.enrollment?.paymentMethod

  if (dismissed) return null

  return (
    <XUIBanner
      sentiment="negative"
      hasDefaultLayout={false}
      closeButtonLabel="Dismiss"
      onCloseClick={() => setDismissed(true)}
    >
      {contact.name}&apos;s saved {pm?.brand} has expired - all future payments will not be collected automatically unless autopay is reinstated
    </XUIBanner>
  )
}
