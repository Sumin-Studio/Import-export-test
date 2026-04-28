import { Invoice } from '@/types'

function addDays(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export const defaultInvoice: Invoice = {
  number: 'INV-0457',
  reference: '',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: addDays(30),
  brandingTheme: 'Standard',
  onlinePayments: 'None',
  currency: 'AUD',
  amountsAre: 'Tax inclusive',
  lineItems: [
    {
      id: 'li-001',
      item: '',
      description: '',
      qty: 0,
      price: 0,
      account: '',
      taxRate: 'GST (10%)',
      amount: 0,
    },
  ],
  subtotal: 0,
  taxTotal: 0,
  total: 0,
  sendAsEInvoice: false,
}
