import { useState } from "react";

export function usePendingValue(
  value: string,
  onChange: (value: string) => void,
) {
  const [pendingValue, setPendingValue] = useState<string | null>(null);

  const displayValue = pendingValue !== null ? pendingValue : value;
  const hasPendingChange = pendingValue !== null;

  const handleConfirm = () => {
    if (pendingValue !== null) {
      onChange(pendingValue);
      setPendingValue(null);
    }
  };

  const handleCancel = () => {
    setPendingValue(null);
  };

  return {
    pendingValue,
    setPendingValue,
    displayValue,
    hasPendingChange,
    handleConfirm,
    handleCancel,
  };
}
