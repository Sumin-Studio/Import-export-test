export interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  accountType: string;
  logo?: React.ReactNode;
}

export const banks: Bank[] = [
  {
    id: '1',
    name: 'Chase bank',
    accountNumber: '•••7134',
    accountType: 'My private checking account',
  },
  {
    id: '2',
    name: 'Wells Fargo',
    accountNumber: '•••2891',
    accountType: 'Business checking account',
  },
  {
    id: '3',
    name: 'Bank of America',
    accountNumber: '•••4567',
    accountType: 'Corporate savings account',
  },
];