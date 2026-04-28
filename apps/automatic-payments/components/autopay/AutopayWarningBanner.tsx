'use client'

import { useState } from 'react'
import XUIBanner from '@xero/xui/react/banner'
import { Contact } from '@/types'

interface Props {
  contact: Contact
}

export default function AutopayWarningBanner({ contact }: Props) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <XUIBanner
      sentiment="warning"
      hasDefaultLayout={false}
      header="Card expiring soon"
      closeButtonLabel="Dismiss"
      onCloseClick={() => setDismissed(true)}
    >
      Xero will ask {contact.name} to update their card before it expires. No action needed.
    </XUIBanner>
  )
}
