'use client'

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react'
import { AppState, Action, LineItem } from '@/types'
import { defaultInvoice } from '@/data/invoices'

const initialState: AppState = {
  selectedContact: null,
  invoice: defaultInvoice,
  toastMessage: null,
  toastSentiment: null,
  panelType: null,
  panelInteractionAttempted: false,
  overrideMethods: null,
  autopayEnabled: false,
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CONTACT':
      return {
        ...state,
        selectedContact: action.payload,
        overrideMethods: null,
        autopayEnabled: false,
        panelType: (action.payload?.autopayStatus === 'expired' || action.payload?.autopayStatus === 'expiring') ? 'manage' : state.panelType,
      }

    case 'UPDATE_INVOICE':
      return {
        ...state,
        invoice: { ...state.invoice, [action.payload.field]: action.payload.value },
      }

    case 'ADD_LINE_ITEM': {
      const newItem: LineItem = {
        id: `li-${Date.now()}`,
        item: '',
        description: '',
        qty: 1,
        price: 0,
        account: '',
        taxRate: 'GST (10%)',
        amount: 0,
      }
      return {
        ...state,
        invoice: {
          ...state.invoice,
          lineItems: [...state.invoice.lineItems, newItem],
        },
      }
    }

    case 'REMOVE_LINE_ITEM':
      return {
        ...state,
        invoice: {
          ...state.invoice,
          lineItems: state.invoice.lineItems.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      }

    case 'UPDATE_LINE_ITEM': {
      const updatedItems = state.invoice.lineItems.map((item) => {
        if (item.id !== action.payload.id) return item
        const updated = { ...item, [action.payload.field]: action.payload.value }
        updated.amount = updated.qty * updated.price
        return updated
      })
      const subtotal = updatedItems.reduce((sum, i) => sum + i.amount, 0)
      const taxTotal = subtotal * 0.1
      return {
        ...state,
        invoice: {
          ...state.invoice,
          lineItems: updatedItems,
          subtotal,
          taxTotal,
          total: subtotal + taxTotal,
        },
      }
    }

    case 'SHOW_TOAST':
      return {
        ...state,
        toastMessage: action.payload.message,
        toastSentiment: action.payload.sentiment,
      }

    case 'DISMISS_TOAST':
      return { ...state, toastMessage: null, toastSentiment: null }

    case 'OPEN_PANEL':
      return { ...state, panelType: action.payload }

    case 'CLOSE_PANEL':
      return { ...state, panelType: null, panelInteractionAttempted: false }

    case 'PANEL_INTERACTION_ATTEMPTED':
      return { ...state, panelInteractionAttempted: true }

    case 'CLEAR_PANEL_INTERACTION':
      return { ...state, panelInteractionAttempted: false }

    case 'SET_OVERRIDE_METHODS':
      return { ...state, overrideMethods: action.payload }

    case 'SET_AUTOPAY_ENABLED':
      return { ...state, autopayEnabled: action.payload }

    default:
      return state
  }
}

interface InvoiceContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const InvoiceContext = createContext<InvoiceContextValue | null>(null)

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoice() {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error('useInvoice must be used within InvoiceProvider')
  return ctx
}
