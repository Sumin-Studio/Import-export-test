"use client";

import { useState, useEffect, useRef } from "react";
import { Close } from "@/app/components/ui/icons";
import type { Transaction } from "./CardTransactions";
import { useNavigation } from "@/app/contexts/NavigationContext";

interface TransactionDetailsPanelProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTransaction: Transaction) => void;
  categories: string[];
}

export function TransactionDetailsPanel({
  transaction,
  isOpen,
  onClose,
  onSave,
  categories,
}: TransactionDetailsPanelProps) {
  const [formData, setFormData] = useState<Transaction | null>(transaction);
  const panelRef = useRef<HTMLDivElement>(null);
  const { headerHeight } = useNavigation();
  const [panelStyle, setPanelStyle] = useState({
    top: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`,
  });

  // Initialize form data when transaction changes
  useEffect(() => {
    if (transaction) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Need to sync formData with transaction prop
      setFormData(transaction);
    }
  }, [transaction]);

  // Update panel style based on scroll and screen size
  useEffect(() => {
    const updatePanelStyle = () => {
      if (window.innerWidth >= 1200) {
        const scrollY = window.scrollY;
        const topOffset = Math.max(40, headerHeight - scrollY);
        setPanelStyle({
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        });
      } else if (window.innerWidth >= 800) {
        const scrollY = window.scrollY;
        const topOffset = Math.max(68, headerHeight - scrollY);
        setPanelStyle({
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        });
      } else {
        setPanelStyle({
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        });
      }
    };

    window.addEventListener("scroll", updatePanelStyle, { passive: true });
    window.addEventListener("resize", updatePanelStyle, { passive: true });
    updatePanelStyle(); // Set initial state

    return () => {
      window.removeEventListener("scroll", updatePanelStyle);
      window.removeEventListener("resize", updatePanelStyle);
    };
  }, [headerHeight]);

  // Handle escape key to close panel
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);


  if (!transaction || !formData || !isOpen) {
    return null;
  }

  const handleChange = (
    field: keyof Transaction,
    value: string | "cleared" | "pending" | "needs-review" | "resolved" | "declined"
  ) => {
    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div
      ref={panelRef}
      className={`fixed right-0 z-50 w-screen overflow-x-hidden bg-white shadow-[-7px_10px_14px_0px_rgba(0,42,70,0.10)] transition-transform duration-300 ease-in-out focus:outline-none md:w-[500px] ${
        isOpen
          ? "translate-x-0 pointer-events-auto"
          : "pointer-events-none translate-x-[calc(100%+20px)]"
      }`}
      style={panelStyle}
    >
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary px-5 py-4">
          <h2 className="text-[17px]/[28px] font-bold">Transaction Details</h2>
          <button
            className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary transition-colors duration-200"
            onClick={onClose}
            type="button"
            aria-label="Close panel"
          >
            <Close className="text-[#5a606c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="space-y-6">
            {/* Merchant */}
            <div>
              <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                Merchant
              </label>
              <input
                type="text"
                value={formData.merchant}
                onChange={(e) => handleChange("merchant", e.target.value)}
                className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
              />
            </div>

            {/* Date and Amount - Inline */}
            <div className="flex gap-4">
              {/* Date */}
              <div className="flex-1">
                <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
                />
              </div>

              {/* Amount */}
              <div className="flex-1">
                <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px]/[24px] text-content-secondary">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className="w-full rounded-[8px] border border-border-primary bg-white px-3 pl-8 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75 resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Cardholder */}
            <div>
              <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                Cardholder
              </label>
              <input
                type="text"
                value={formData.cardholder}
                onChange={(e) => handleChange("cardholder", e.target.value)}
                className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
              />
            </div>

            {/* Spent From */}
            <div>
              <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                Spent From
              </label>
              <input
                type="text"
                value={formData.spentFrom}
                onChange={(e) => handleChange("spentFrom", e.target.value)}
                className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
              />
            </div>

            {/* Charge Status */}
            <div>
              <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                Charge Status
              </label>
              <select
                value={formData.chargeStatus}
                onChange={(e) =>
                  handleChange(
                    "chargeStatus",
                    e.target.value as "cleared" | "pending"
                  )
                }
                className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
              >
                <option value="cleared">Cleared</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Status (if exists) */}
            {formData.status !== undefined && (
              <div>
                <label className="block text-[13px]/[20px] font-medium text-content-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      handleChange(
                        "status",
                        value as "needs-review" | "resolved" | "declined"
                      );
                    }
                  }}
                  className="w-full rounded-[8px] border border-border-primary bg-white px-3 py-2.5 text-[15px]/[24px] outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/75"
                >
                  <option value="needs-review">Needs review</option>
                  <option value="resolved">Resolved</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border-primary px-5 py-4">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-[8px] border border-border-primary bg-white px-4 text-[15px] font-medium text-content-primary transition-all duration-200 ease-in-out hover:bg-background-primary focus-visible:ring-2 focus-visible:ring-brand-primary/75"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-10 items-center justify-center rounded-[8px] border-border-primary bg-brand-primary px-4 text-[15px] font-medium text-white transition-all duration-200 ease-in-out hover:bg-[#0073bf] focus-visible:ring-2 focus-visible:ring-brand-primary/75"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

