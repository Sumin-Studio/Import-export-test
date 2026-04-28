import { AutopayEnrollment } from '@/types'

export const autopayEnrollments: AutopayEnrollment[] = [
  {
    id: 'enroll-001',
    contactId: 'sora-mets',
    enrolledAt: '2025-11-20T09:15:00Z',
    status: 'active',
    paymentMethod: {
      type: 'card',
      brand: 'American Express',
      last4: '1234',
      expiryMonth: 8,
      expiryYear: 28,
      holderName: 'Sora Mets',
    },
  },
  {
    id: 'enroll-002',
    contactId: 'eric-expired',
    enrolledAt: '2024-06-10T11:30:00Z',
    status: 'active',
    paymentMethod: {
      type: 'card',
      brand: 'Visa',
      last4: '4567',
      expiryMonth: 3,
      expiryYear: 25,
      holderName: 'Eric Expired',
    },
  },
  {
    id: 'enroll-003',
    contactId: 'william-warning',
    enrolledAt: '2025-09-14T08:00:00Z',
    status: 'active',
    paymentMethod: {
      type: 'card',
      brand: 'Visa',
      last4: '9012',
      expiryMonth: 6,
      expiryYear: 26,
      holderName: 'William Warning',
    },
  },
  {
    id: 'enroll-004',
    contactId: 'carol-cancelo',
    enrolledAt: '2025-07-03T10:00:00Z',
    cancelledAt: '2026-03-20T00:00:00Z',
    status: 'cancelled',
    paymentMethod: {
      type: 'card',
      brand: 'Mastercard',
      last4: '3456',
      expiryMonth: 11,
      expiryYear: 27,
      holderName: 'Carol Cancelo',
    },
  },
]
