export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  track1099: boolean;
}

export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Westpac Everyday Savings',
    email: 'accounts@westpac.com.au',
    phone: '+61 2 9293 9270',
    address: '275 Kent Street, Sydney NSW 2000',
    taxId: '12-3456789',
    track1099: false,
  },
  {
    id: '2',
    name: 'Rio Media Group',
    email: 'billing@riomedia.com',
    phone: '+1 415 555 0123',
    address: '1234 Market St, San Francisco, CA 94103',
    taxId: '98-7654321',
    track1099: true,
  },
  {
    id: '3',
    name: 'Quantum Consultancy',
    email: 'invoices@quantumconsult.com',
    phone: '+1 212 555 0199',
    address: '350 5th Ave, New York, NY 10118',
    taxId: '45-6789012',
    track1099: true,
  },
  {
    id: '4',
    name: 'Hampton Smith Pty',
    email: 'finance@hamptonsmith.com.au',
    phone: '+61 3 9654 8321',
    address: '88 Collins Street, Melbourne VIC 3000',
    taxId: '23-4567890',
    track1099: false,
  },
  {
    id: '5',
    name: 'Forval Project',
    email: 'payments@forvalproject.com',
    phone: '+1 310 555 0156',
    address: '2049 Century Park E, Los Angeles, CA 90067',
    taxId: '67-8901234',
    track1099: true,
  },
  {
    id: '6',
    name: 'Introit & Jones',
    email: 'ap@introitjones.com',
    phone: '+44 20 7946 0958',
    address: '1 Canada Square, Canary Wharf, London E14 5AB',
    taxId: '89-0123456',
    track1099: false,
  },
  {
    id: '7',
    name: 'Apex Technologies Ltd',
    email: 'accounting@apextech.com',
    phone: '+1 650 555 0187',
    address: '3500 Deer Creek Rd, Palo Alto, CA 94304',
    taxId: '34-5678901',
    track1099: true,
  },
  {
    id: '8',
    name: 'BlueSky Marketing',
    email: 'finance@blueskymarketing.com',
    phone: '+1 617 555 0142',
    address: '125 Summer St, Boston, MA 02110',
    taxId: '56-7890123',
    track1099: true,
  },
];