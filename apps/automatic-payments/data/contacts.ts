import { Contact } from '@/types'
import { autopayEnrollments } from './autopayEnrollments'

export const contacts: Contact[] = [
  {
    id: 'nora-massy',
    name: 'Nora Massy',
    email: 'nora.massy@example.com',
    phone: '+61 412 555 011',
    autopayStatus: 'unenrolled',
  },
  {
    id: 'sora-mets',
    name: 'Sora Mets',
    email: 'sora.mets@example.com',
    phone: '+61 413 555 042',
    autopayStatus: 'enrolled',
    enrollment: autopayEnrollments.find((e) => e.contactId === 'sora-mets'),
  },
  {
    id: 'eric-expired',
    name: 'Eric Expired',
    email: 'eric.expired@example.com',
    phone: '+61 414 555 078',
    autopayStatus: 'expired',
    enrollment: autopayEnrollments.find((e) => e.contactId === 'eric-expired'),
  },
  {
    id: 'william-warning',
    name: 'William Warning',
    email: 'william.warning@example.com',
    phone: '+61 415 555 093',
    autopayStatus: 'expiring',
    enrollment: autopayEnrollments.find((e) => e.contactId === 'william-warning'),
  },
  {
    id: 'carol-cancelo',
    name: 'Carol Cancelo',
    email: 'carol.cancelo@example.com',
    phone: '+61 416 555 107',
    autopayStatus: 'cancelled',
    enrollment: autopayEnrollments.find((e) => e.contactId === 'carol-cancelo'),
  },
]
