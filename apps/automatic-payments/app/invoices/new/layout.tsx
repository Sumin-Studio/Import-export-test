import dynamic from 'next/dynamic'
import { InvoiceProvider } from '@/hooks/useInvoiceState'

const XeroTopNav = dynamic(() => import('@/components/nav/XeroTopNav'), { ssr: false })

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <InvoiceProvider>
      <XeroTopNav />
      {children}
    </InvoiceProvider>
  )
}
