"use client";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { Tooltip } from "react-tooltip";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { Search, Filter, Caret } from "@/app/components/ui/icons";
import { TransactionDetailsPanel } from "./TransactionDetailsPanel";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  filter?: "all" | "needs-review" | "resolved" | "declined";
}

export interface Transaction {
  date: string;
  merchant: string;
  spentFrom: string;
  cardholder: string;
  description: string;
  category: string;
  amount: string;
  chargeStatus: "cleared" | "pending";
  status?: "needs-review" | "resolved" | "declined";
}

const allTransactions: Transaction[] = [
  {
    date: "22 Jul",
    merchant: "Office Supplies Co",
    spentFrom: "Sales team",
    cardholder: "Sarah Johnson",
    description: "Office Supplies Co",
    category: "Office expenses",
    amount: "125.50",
    chargeStatus: "pending",
    status: "resolved",
  },
  {
    date: "21 Jul",
    merchant: "Starbucks",
    spentFrom: "Sales team",
    cardholder: "Mike Williams",
    description: "Starbucks Coffee",
    category: "Meals & entertainment",
    amount: "8.50",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "20 Jul",
    merchant: "Uber",
    spentFrom: "John's card",
    cardholder: "John Smith",
    description: "Uber Ride",
    category: "Travel",
    amount: "32.00",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "19 Jul",
    merchant: "Amazon",
    spentFrom: "Sales team",
    cardholder: "Mike Williams",
    description: "Amazon Business",
    category: "Office expenses",
    amount: "245.99",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "18 Jul",
    merchant: "Restaurant ABC",
    spentFrom: "John's card",
    cardholder: "John Smith",
    description: "Restaurant ABC",
    category: "Meals & entertainment",
    amount: "67.25",
    chargeStatus: "cleared",
    status: "declined",
  },
  {
    date: "17 Jul",
    merchant: "Shell",
    spentFrom: "Sales team",
    cardholder: "Sarah Johnson",
    description: "Gas Station",
    category: "Travel",
    amount: "45.00",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "16 Jul",
    merchant: "Tech Store",
    spentFrom: "Sales team",
    cardholder: "Mike Williams",
    description: "Tech Store",
    category: "Office expenses",
    amount: "189.99",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "15 Jul",
    merchant: "Coffee Shop",
    spentFrom: "John's card",
    cardholder: "John Smith",
    description: "Coffee Shop",
    category: "Meals & entertainment",
    amount: "12.50",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "14 Jul",
    merchant: "Marriott",
    spentFrom: "Sales team",
    cardholder: "Sarah Johnson",
    description: "Hotel Booking",
    category: "Travel",
    amount: "320.00",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "13 Jul",
    merchant: "Microsoft",
    spentFrom: "Sales team",
    cardholder: "Mike Williams",
    description: "Software License",
    category: "Office expenses",
    amount: "99.00",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "12 Jul",
    merchant: "Eventbrite",
    spentFrom: "John's card",
    cardholder: "John Smith",
    description: "Conference Ticket",
    category: "Professional development",
    amount: "450.00",
    chargeStatus: "cleared",
    status: "declined",
  },
  {
    date: "11 Jul",
    merchant: "IKEA",
    spentFrom: "Sales team",
    cardholder: "Sarah Johnson",
    description: "Office Furniture",
    category: "Office expenses",
    amount: "1,250.00",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "10 Jul",
    merchant: "FedEx",
    spentFrom: "John's card",
    cardholder: "John Smith",
    description: "Shipping and delivery services",
    category: "Office expenses",
    amount: "45.75",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "9 Jul",
    merchant: "Zoom",
    spentFrom: "Sales team",
    cardholder: "Mike Williams",
    description: "Video conferencing subscription",
    category: "Office expenses",
    amount: "149.99",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "8 Jul",
    merchant: "Hilton",
    spentFrom: "Team travel",
    cardholder: "Sarah Johnson",
    description: "Hotel accommodation for business trip",
    category: "Travel",
    amount: "285.50",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "7 Jul",
    merchant: "Adobe",
    spentFrom: "Operations",
    cardholder: "David Wilson",
    description: "Creative Cloud subscription renewal",
    category: "Office expenses",
    amount: "52.99",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "6 Jul",
    merchant: "Delta Airlines",
    spentFrom: "Team travel",
    cardholder: "Emily Chen",
    description: "Flight booking for conference",
    category: "Travel",
    amount: "425.00",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "5 Jul",
    merchant: "Best Buy",
    spentFrom: "Operations",
    cardholder: "Lisa Anderson",
    description: "Computer equipment and accessories",
    category: "Office expenses",
    amount: "789.99",
    chargeStatus: "cleared",
    status: "needs-review",
  },
  {
    date: "4 Jul",
    merchant: "LinkedIn",
    spentFrom: "Ad spend",
    cardholder: "Sarah Johnson",
    description: "LinkedIn advertising campaign",
    category: "Marketing",
    amount: "1,500.00",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "3 Jul",
    merchant: "Google Ads",
    spentFrom: "Ad spend",
    cardholder: "Mike Davis",
    description: "Google Ads campaign for Q3 promotion",
    category: "Marketing",
    amount: "2,350.00",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "2 Jul",
    merchant: "Uber Eats",
    spentFrom: "Sales team",
    cardholder: "Mike Williams",
    description: "Team lunch delivery",
    category: "Meals & entertainment",
    amount: "87.45",
    chargeStatus: "cleared",
    status: "resolved",
  },
  {
    date: "1 Jul",
    merchant: "Staples",
    spentFrom: "Operations",
    cardholder: "David Wilson",
    description: "Office supplies and stationery",
    category: "Office expenses",
    amount: "156.30",
    chargeStatus: "cleared",
    status: "resolved",
  },
];

const getFilteredTransactions = (filter?: string): Transaction[] => {
  if (!filter || filter === "all") {
    return allTransactions;
  }
  return allTransactions.filter((transaction) => transaction.status === filter);
};

// Get all unique categories from transactions
const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  allTransactions.forEach((transaction) => {
    categories.add(transaction.category);
  });
  return Array.from(categories).sort();
};

// Status pill component with colors
const StatusPill = ({ status }: { status?: string }) => {
  if (!status) return null;

  const statusConfig = {
    resolved: {
      text: "Resolved",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
    },
    "needs-review": {
      text: "Needs review",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
      borderColor: "border-orange-200",
    },
    declined: {
      text: "Declined",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px]/[18px] font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      {config.text}
    </span>
  );
};

export function CardTransactions({
  className = "",
  isCustomising = false,
  filter = "all",
}: ComponentProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Record<number, string>>({});
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const transactions = getFilteredTransactions(filter);
  const allCategories = getAllCategories();

  // Initialize selected categories with transaction's current category
  const getCategoryForTransaction = (index: number, defaultCategory: string): string => {
    if (selectedCategories[index] !== undefined) {
      return selectedCategories[index];
    }
    return defaultCategory;
  };

  const handleCategoryChange = (index: number, category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [index]: category,
    }));
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsPanelOpen(true);
  };

  const handleSaveTransaction = (updatedTransaction: Transaction) => {
    // Find the transaction in the list and update it
    // In a real app, this would make an API call
    const transactionIndex = transactions.findIndex(
      (t) =>
        t.date === selectedTransaction?.date &&
        t.merchant === selectedTransaction?.merchant &&
        t.amount === selectedTransaction?.amount
    );
    
    if (transactionIndex !== -1 && selectedTransaction) {
      // Update the category if it changed
      if (updatedTransaction.category !== selectedTransaction.category) {
        handleCategoryChange(transactionIndex, updatedTransaction.category);
      }
    }
    
    // Close the panel
    setIsPanelOpen(false);
    setSelectedTransaction(null);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div className={`bg-white border border-border-primary rounded-lg ${className || "m-5"}`}>
        <div className="w-full flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 border-b border-background-tertiary py-3 px-6">
          <div className="flex w-full items-center gap-3 rounded-[20px] px-3">
            <Search className="flex-none" stroke="stroke-[#59606D]" />
            <input
              className="h-10 w-full border-none bg-transparent text-[15px]/[24px] outline-none placeholder:text-content-secondary"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search transactions"
              type="text"
              value={searchValue}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary transition-colors duration-200"
              aria-label="Filter"
            >
              <Filter fill="fill-[#404756]" />
            </button>
          </div>
        </div>
        <ul className="relative w-full">
          <li className="flex w-full justify-between gap-4 py-2 text-[11px]/[16px] text-content-secondary px-6">
            <span className="w-[140px] text-left">Merchant</span>
            <span className="w-[70px] text-left">Date</span>
            <span className="flex-1 min-w-[300px] text-left">Description</span>
            {filter === "all" && <span className="w-[120px] text-left">Status</span>}
            <span className="w-[140px] text-left">Spent from</span>
            <span className="w-[160px] text-left">Cardholder</span>
            <span className="w-[120px] text-left">Charge status</span>
            <span className="w-[200px] text-left flex items-center gap-1">
              Category
              <span
                className="inline-flex items-center"
                data-tooltip-content="All transactions are automatically categorized"
                data-tooltip-id="category-tooltip"
                data-tooltip-offset={8}
                data-tooltip-place="top"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-brand-primary"
                >
                  <path
                    d="M6 0L7.2 4.4L11.6 6L7.2 7.6L6 12L4.8 7.6L0.4 6L4.8 4.4L6 0Z"
                    fill="currentColor"
                    className="fill-brand-primary"
                  />
                </svg>
                <Tooltip className="tooltip" id="category-tooltip" />
              </span>
            </span>
            <span className="w-[100px] text-right">Amount</span>
          </li>
          {transactions.length > 0 ? (
            transactions.map((item, index) => {
              const currentCategory = getCategoryForTransaction(index, item.category);
              return (
                <li
                  className="flex w-full justify-between gap-4 border-t border-background-tertiary py-2 text-[13px]/[20px] px-6 hover:bg-[#F8F9FA] transition-colors duration-150 cursor-pointer"
                  key={index}
                  onClick={() => handleRowClick(item)}
                >
                  <span className="w-[140px] text-left font-bold">{item.merchant}</span>
                  <span className="w-[70px] text-left">{item.date}</span>
                  <span className="flex-1 min-w-[300px] text-left">{item.description}</span>
                  {filter === "all" && (
                    <span className="w-[120px] text-left">
                      <StatusPill status={item.status} />
                    </span>
                  )}
                  <span className="w-[140px] text-left">{item.spentFrom}</span>
                  <span className="w-[160px] text-left">{item.cardholder}</span>
                  <span className="w-[120px] text-left capitalize">{item.chargeStatus}</span>
                  <div className="w-[200px] text-left" onClick={(e) => e.stopPropagation()}>
                    <Listbox
                      value={currentCategory}
                      onChange={(value) => handleCategoryChange(index, value)}
                    >
                      {({ open }) => (
                        <div className="relative">
                          <Listbox.Button className="group flex w-full items-center gap-1 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/75 rounded px-1 -mx-1">
                            <span className="flex-1">{currentCategory}</span>
                            <Caret
                              className={`fill-[#A6A9B0] transition-transform ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-border-primary bg-background-secondary shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] py-1">
                            {allCategories.map((category) => (
                              <Listbox.Option
                                key={category}
                                value={category}
                                className={({ active, selected }) =>
                                  `cursor-pointer px-3 py-2 text-[13px]/[20px] ${
                                    active || selected
                                      ? "bg-background-primary"
                                      : ""
                                  }`
                                }
                              >
                                {category}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>
                  <span className="w-[100px] text-right">{item.amount}</span>
                </li>
              );
            })
          ) : (
            <li className="flex w-full justify-center py-8 text-[13px]/[20px] text-content-secondary">
              No transactions found
            </li>
          )}
        </ul>
        </div>
      </div>
      <TransactionDetailsPanel
        transaction={selectedTransaction}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onSave={handleSaveTransaction}
        categories={allCategories}
      />
    </CustomizationOverlay>
  );
}

export default CardTransactions;

