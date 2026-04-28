'use client'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function EInvoiceToggle({ checked, onChange }: Props) {
  return (
    <div className="ap-einvoice">
      <a
        href="#"
        className="ap-einvoice__classic"
        onClick={(e) => e.preventDefault()}
      >
        Switch to classic invoicing
      </a>
      <div>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span
            role="switch"
            aria-checked={checked}
            tabIndex={0}
            onClick={() => onChange(!checked)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onChange(!checked)}
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: checked ? '#2490eb' : '#d0d8e0',
              position: 'relative',
              display: 'inline-block',
              cursor: 'pointer',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: checked ? 18 : 2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.15s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          </span>
          <span style={{ fontSize: 13, color: '#3d4f60', fontWeight: 500 }}>Send as an eInvoice</span>
        </label>
        <div className="ap-einvoice__text">
          {checked
            ? 'This invoice will be sent as an eInvoice'
            : 'Select a contact to send as an eInvoice'}
        </div>
      </div>
    </div>
  )
}
