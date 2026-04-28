import { Bank, banks } from '../data/banks';
import { GlobalDropdown } from './GlobalDropdown';
import { ChaseLogo, WellsFargoLogo, BankOfAmericaLogo } from './BankLogos';

interface BankDropdownProps {
  onSelect: (bank: Bank | null) => void;
}

// Map bank IDs to their logos
const bankLogos: Record<string, React.ReactNode> = {
  '1': <ChaseLogo />,
  '2': <WellsFargoLogo />,
  '3': <BankOfAmericaLogo />,
};

export function BankDropdown({ onSelect }: BankDropdownProps) {
  const bankItems = banks.map(bank => ({
    id: bank.id,
    label: `${bank.name} account ${bank.accountNumber}`,
    subtitle: bank.accountType,
    icon: bankLogos[bank.id]
  }));

  const handleSelect = (item: { id: string; label: string; subtitle?: string; icon?: React.ReactNode } | null) => {
    if (item) {
      const selectedBank = banks.find(b => b.id === item.id);
      onSelect(selectedBank || null);
    } else {
      onSelect(null);
    }
  };

  return (
    <GlobalDropdown
      items={bankItems}
      placeholder="Select a bank account..."
      onSelect={handleSelect}
      defaultSelectedId="1" // Default to Chase
      allowClear={false}
    />
  );
}