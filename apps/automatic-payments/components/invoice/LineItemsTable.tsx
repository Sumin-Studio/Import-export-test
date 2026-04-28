'use client'

import { LineItem } from '@/types'

interface Props {
  items: LineItem[]
  onUpdate: (id: string, field: keyof LineItem, value: unknown) => void
  onAdd: () => void
  onRemove: (id: string) => void
}

const TAX_RATES = ['GST (10%)', 'BAS Excluded', 'No tax']
const ACCOUNTS = ['200 - Sales', '400 - Advertising', '461 - Bank Charges', '404 - Entertainment']

function DragHandle() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true" style={{ color: '#59606d' }}>
      <circle cx="3" cy="3" r="1.5" />
      <circle cx="7" cy="3" r="1.5" />
      <circle cx="3" cy="8" r="1.5" />
      <circle cx="7" cy="8" r="1.5" />
      <circle cx="3" cy="13" r="1.5" />
      <circle cx="7" cy="13" r="1.5" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1.75 3.5h10.5M5.25 3.5V2.333a.583.583 0 01.583-.583h2.334a.583.583 0 01.583.583V3.5M2.917 3.5l.583 8.167a.583.583 0 00.583.583h5.834a.583.583 0 00.583-.583L11.083 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

export default function LineItemsTable({ items, onUpdate, onAdd, onRemove }: Props) {
  return (
    <div className="ap-table-wrap">
      <div className="ap-table-outer">
      <table className="ap-table" aria-label="Invoice line items">
        <thead>
          <tr>
            <th style={{ width: 32 }} aria-hidden="true" />
            <th style={{ width: 150 }}>Item</th>
            <th>Description</th>
            <th style={{ width: 64, textAlign: 'right' }}>Qty.</th>
            <th style={{ width: 90, textAlign: 'right' }}>Price</th>
            <th style={{ width: 155 }}>Account</th>
            <th style={{ width: 125 }}>Tax rate</th>
            <th style={{ width: 105, textAlign: 'right' }}>Amount AUD</th>
            <th style={{ width: 32 }} aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <button
                  className="ap-table__drag"
                  aria-label="Drag to reorder"
                  style={{ background: 'none', border: 'none', padding: '0 4px', cursor: 'grab' }}
                >
                  <DragHandle />
                </button>
              </td>
              <td>
                <input
                  className="ap-table__input"
                  value={item.item}
                  onChange={(e) => onUpdate(item.id, 'item', e.target.value)}
                  aria-label="Item"
                />
              </td>
              <td>
                <input
                  className="ap-table__input"
                  value={item.description}
                  onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                  aria-label="Description"
                />
              </td>
              <td>
                <input
                  className="ap-table__input"
                  type="number"
                  value={item.qty || ''}
                  placeholder="0"
                  onChange={(e) => onUpdate(item.id, 'qty', parseFloat(e.target.value) || 0)}
                  style={{ textAlign: 'right' }}
                  aria-label="Quantity"
                />
              </td>
              <td>
                <input
                  className="ap-table__input"
                  type="number"
                  value={item.price || ''}
                  placeholder="0.00"
                  onChange={(e) => onUpdate(item.id, 'price', parseFloat(e.target.value) || 0)}
                  style={{ textAlign: 'right' }}
                  aria-label="Unit price"
                />
              </td>
              <td>
                <select
                  className="ap-table__input"
                  value={item.account}
                  onChange={(e) => onUpdate(item.id, 'account', e.target.value)}
                  aria-label="Account"
                >
                  <option value="" />
                  {ACCOUNTS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </td>
              <td>
                <select
                  className="ap-table__input"
                  value={item.taxRate}
                  onChange={(e) => onUpdate(item.id, 'taxRate', e.target.value)}
                  aria-label="Tax rate"
                >
                  {TAX_RATES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </td>
              <td className="ap-table__amount">
                {item.amount > 0 ? item.amount.toFixed(2) : ''}
              </td>
              <td>
                <button
                  className="ap-table__removebtn"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove line item"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ap-table__addrow">
        <div className="ap-addrow-btn-group">
          <button className="ap-addrow-btn__main" onClick={onAdd}>
            Add row
          </button>
          <button className="ap-addrow-btn__caret" aria-label="More options">
            <ChevronDownIcon />
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
