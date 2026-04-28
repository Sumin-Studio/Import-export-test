import { suppliers, Supplier } from '../data/suppliers';
import { GlobalDropdown } from './GlobalDropdown';

interface SupplierDropdownProps {
  onSelect?: (supplier: Supplier | null) => void;
}

export function SupplierDropdown({ onSelect }: SupplierDropdownProps) {
  const supplierItems = suppliers.map(supplier => ({
    id: supplier.id,
    label: supplier.name,
    subtitle: supplier.email
  }));

  const handleSelect = (item: { id: string; label: string; subtitle?: string } | null) => {
    if (item) {
      const selectedSupplier = suppliers.find(s => s.id === item.id);
      onSelect?.(selectedSupplier || null);
    } else {
      onSelect?.(null);
    }
  };

  return (
    <GlobalDropdown
      items={supplierItems}
      placeholder="Select a supplier..."
      onSelect={handleSelect}
      allowClear={true}
    />
  );
}
