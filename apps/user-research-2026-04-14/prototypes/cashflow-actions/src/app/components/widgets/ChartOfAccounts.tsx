import { MoreButton } from "../global";
import { ChartOfAccountsOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { getChartOfAccountsData } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";
import React, { useState } from "react";

const accountDisplayData = [
  { name: "Sales", type: "sales" },
  { name: "Other revenue", type: "other" },
  { name: "Interest income", type: "interest" },
  { name: "Purchases", type: "purchases" },
  { name: "Consulting & Accounting", type: "consulting" },
  { name: "Depreciation", type: "depreciation" },
  { name: "Office expenses", type: "office" },
  { name: "Bank fees", type: "bank" },
  { name: "Inventory", type: "inventory" },
];

interface AccountData {
  accountNumber?: string | null;
  budget?: string;
  thisMonth?: string;
  ytd?: string;
}

interface AccountRowProps {
  accountName: string;
  accountType: string;
  data: AccountData | undefined;
  showBudgets: boolean;
  formatAccountNumber: (accountNumber: string | null) => string;
  AmountButton: ({ amount }: { amount: string }) => React.JSX.Element;
}

const AccountRow = ({
  accountName,
  accountType,
  data,
  showBudgets,
  formatAccountNumber,
  AmountButton,
}: AccountRowProps) => {
  return (
    <tr className="border-t border-background-tertiary">
      <td className="py-[11px] text-left font-bold">
        {accountType === "sales"
          ? data?.accountNumber
            ? formatAccountNumber(data.accountNumber)
            : ""
          : formatAccountNumber(data?.accountNumber ?? null)}
      </td>
      <td className="py-[11px] text-left">{accountName}</td>
      {showBudgets && (
        <td className="py-[11px] text-right">
          <AmountButton amount={data?.budget || "0.00"} />
        </td>
      )}
      <td className="py-[11px] text-right">
        <AmountButton amount={data?.thisMonth || "0.00"} />
      </td>
      <td className="py-[11px] text-right">
        <AmountButton amount={data?.ytd || "0.00"} />
      </td>
    </tr>
  );
};

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function ChartOfAccounts({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  const { region } = useRegion();
  const [showBudgets, setShowBudgets] = useState(true);

  const formatAccountNumber = (accountNumber: string | null) => {
    return accountNumber || "—";
  };

  const AmountButton = ({ amount }: { amount: string }) => (
    <button
      className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline"
      type="button"
    >
      {amount}
    </button>
  );

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[522px] lg:h-[522px] w-[440px] min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
            Chart of accounts watchlist
          </h3>
          <MoreButton
            menu={
              <ChartOfAccountsOverflow
                enabled={showBudgets}
                setEnabled={setShowBudgets}
              />
            }
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative mx-6 w-[392px] overflow-x-auto text-[13px]/[16px]">
          <table className="w-full border-collapse">
            <thead className="text-[11px]/[16px] text-content-secondary">
              <tr>
                <th className="py-2 text-left font-normal">Code</th>
                <th className="py-2 w-[23%] text-left font-normal">Account</th>
                {showBudgets && (
                  <th className="py-2 text-right font-normal">Budget</th>
                )}
                <th className="py-2 text-right font-normal">This month</th>
                <th className="py-2 text-right font-normal">YTD</th>
              </tr>
            </thead>
            <tbody>
              {accountDisplayData.map(({ name, type }) => (
                <AccountRow
                  key={name}
                  accountName={name}
                  accountType={type}
                  data={getChartOfAccountsData(type, region)}
                  showBudgets={showBudgets}
                  formatAccountNumber={formatAccountNumber}
                  AmountButton={AmountButton}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            Go to full chart of accounts
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default ChartOfAccounts;
