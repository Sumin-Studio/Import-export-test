'use client'

import { useState, useRef, useEffect } from 'react'
import { Contact } from '@/types'
import { contacts } from '@/data/contacts'

interface Props {
  value: Contact | null
  onChange: (contact: Contact | null) => void
}

const AVATAR_COLORS: Record<string, { bg: string; color: string }> = {
  'nora-massy':     { bg: '#2E86C1', color: '#fff' }, // accessible light blue
  'sora-mets':      { bg: '#1A7F4B', color: '#fff' }, // accessible green
  'eric-expired':   { bg: '#B5376A', color: '#fff' }, // accessible pink
  'william-warning':{ bg: '#C45000', color: '#fff' }, // accessible orange
  'carol-cancelo':  { bg: '#6B4FA0', color: '#fff' }, // accessible purple
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function ContactSelector({ value, onChange }: Props) {
  const [query, setQuery] = useState(value?.name ?? '')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = contacts
    .filter(
      (c) =>
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        if (!value) setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [value])

  function handleSelect(contact: Contact) {
    setQuery(contact.name)
    onChange(contact)
    setOpen(false)
  }

  function handleCreateNew() {
    setOpen(false)
  }

  return (
    <div className="ap-contact" ref={containerRef}>
      <div className="ap-contact__inputwrap">
        {value && (() => {
          const av = AVATAR_COLORS[value.id] ?? { bg: '#9aa5b1', color: '#fff' }
          return (
            <div className="ap-contact__input-avatar" style={{ background: av.bg, color: av.color }}>
              {getInitials(value.name)}
            </div>
          )
        })()}
        <input
          ref={inputRef}
          className={`ap-contact__input${value ? ' ap-contact__input--has-avatar' : ''}`}
          type="text"
          value={query}
          placeholder="Search or add a contact"
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            if (!e.target.value) onChange(null)
          }}
          onFocus={() => setOpen(true)}
          aria-label="Contact"
          aria-autocomplete="list"
          aria-expanded={open}
        />
        {value && (
          <button
            className="ap-contact__clear"
            onClick={() => {
              setQuery('')
              onChange(null)
              inputRef.current?.focus()
            }}
            aria-label="Clear contact"
          >
            ×
          </button>
        )}
      </div>

      {open && (
        <div className="ap-contact__dropdown" role="listbox" aria-label="Contacts">
          {query && (
            <div
              className="ap-contact__create"
              role="option"
              aria-selected={false}
              onClick={handleCreateNew}
            >
              <span className="ap-contact__create-icon">+</span>
              <span>Create <strong>&lsquo;{query}&rsquo;</strong> as a new contact</span>
            </div>
          )}
          {query && filtered.length > 0 && <div className="ap-contact__divider" />}
          {filtered.map((contact) => {
            const av = AVATAR_COLORS[contact.id] ?? { bg: '#9aa5b1', color: '#fff' }
            return (
              <div
                key={contact.id}
                className="ap-contact__item"
                role="option"
                aria-selected={value?.id === contact.id}
                onClick={() => handleSelect(contact)}
              >
                <div
                  className="ap-contact__avatar"
                  style={{ background: av.bg, color: av.color }}
                >
                  {getInitials(contact.name)}
                </div>
                <div className="ap-contact__info">
                  <div className="ap-contact__name">{contact.name}</div>
                  <div className="ap-contact__email">{contact.email}</div>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && !query && contacts.map((contact) => {
            const av = AVATAR_COLORS[contact.id] ?? { bg: '#9aa5b1', color: '#fff' }
            return (
              <div
                key={contact.id}
                className="ap-contact__item"
                role="option"
                aria-selected={value?.id === contact.id}
                onClick={() => handleSelect(contact)}
              >
                <div
                  className="ap-contact__avatar"
                  style={{ background: av.bg, color: av.color }}
                >
                  {getInitials(contact.name)}
                </div>
                <div className="ap-contact__info">
                  <div className="ap-contact__name">{contact.name}</div>
                  <div className="ap-contact__email">{contact.email}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
