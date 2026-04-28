"use client";

import { useEffect, useId } from "react";
import { SendInvoiceScreen } from "@/components/bill-cash-flow/SendInvoiceScreen";

export type SendInvoiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultToEmail?: string;
  contactName?: string | null;
  invoiceNumber?: string;
  totalFormatted?: string;
  dueDateFormatted?: string;
  previewLineDescription?: string;
  previewLineAmountFormatted?: string;
  subtotalFormatted?: string;
  gstFormatted?: string;
  gstRowLabel?: string;
  currencyCode?: string;
  onSendComplete?: () => void;
};

/** Full-screen overlay; prefer route `/send-invoice` + {@link SendInvoiceScreen} `variant="page"` for new flows. */
export function SendInvoiceModal({
  isOpen,
  onClose,
  onSendComplete,
  ...rest
}: SendInvoiceModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <SendInvoiceScreen
      variant="modal"
      titleId={titleId}
      onClose={onClose}
      onSendComplete={onSendComplete}
      {...rest}
    />
  );
}
