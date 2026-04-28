export type AutopayStatus = 'unenrolled' | 'enrolled' | 'expired' | 'expiring' | 'cancelled' | 'none'

export interface PaymentMethod {
  type: 'card' | 'bank'
  brand: string
  last4: string
  expiryMonth: number
  expiryYear: number
  holderName: string
}

export interface AutopayEnrollment {
  id: string
  contactId: string
  enrolledAt: string
  cancelledAt?: string
  paymentMethod: PaymentMethod
  status: 'active' | 'cancelled'
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  autopayStatus: AutopayStatus
  enrollment?: AutopayEnrollment
}

export interface LineItem {
  id: string
  item: string
  description: string
  qty: number
  price: number
  account: string
  taxRate: string
  amount: number
}

export interface Invoice {
  number: string
  reference: string
  issueDate: string
  dueDate: string
  brandingTheme: string
  onlinePayments: string
  currency: string
  amountsAre: string
  lineItems: LineItem[]
  subtotal: number
  taxTotal: number
  total: number
  sendAsEInvoice: boolean
}

export type PanelType = 'deposit' | 'manage' | null

export interface AppState {
  selectedContact: Contact | null
  invoice: Invoice
  toastMessage: string | null
  toastSentiment: 'positive' | 'negative' | 'information' | null
  panelType: PanelType
  panelInteractionAttempted: boolean
  overrideMethods: string[] | null
  autopayEnabled: boolean
}

export type Action =
  | { type: 'SET_CONTACT'; payload: Contact | null }
  | { type: 'UPDATE_INVOICE'; payload: { field: keyof Invoice; value: unknown } }
  | { type: 'ADD_LINE_ITEM' }
  | { type: 'REMOVE_LINE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_LINE_ITEM'; payload: { id: string; field: keyof LineItem; value: unknown } }
  | { type: 'SHOW_TOAST'; payload: { message: string; sentiment: AppState['toastSentiment'] } }
  | { type: 'DISMISS_TOAST' }
  | { type: 'OPEN_PANEL'; payload: PanelType }
  | { type: 'CLOSE_PANEL' }
  | { type: 'PANEL_INTERACTION_ATTEMPTED' }
  | { type: 'CLEAR_PANEL_INTERACTION' }
  | { type: 'SET_OVERRIDE_METHODS'; payload: string[] | null }
  | { type: 'SET_AUTOPAY_ENABLED'; payload: boolean }
