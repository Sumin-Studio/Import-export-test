import dynamic from 'next/dynamic'

const NewInvoicePageContent = dynamic(
  () => import('./NewInvoicePageContent'),
  { ssr: false }
)

export default function NewInvoicePage() {
  return <NewInvoicePageContent />
}
