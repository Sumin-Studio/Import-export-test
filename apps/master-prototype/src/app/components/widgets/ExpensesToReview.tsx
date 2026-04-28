import { ReactElement } from "react";
import { MoreButton } from "@/app/components/global";
import { getRegionContent } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { ExpensesOverflow } from "./overflow";

interface ExpenseToReview {
  initials: string;
  color: string;
  name: string;
  expenses: string;
  amount: string;
}

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function ExpensesToReview({
  className = "",
  isCustomising = false,
}: ComponentProps): ReactElement {
  const { region } = useRegion();
  const data = getRegionContent("chartOfAccounts", "expensesToReview", region);
  const expensesToReview = data?.expenses || [];

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[522px] lg:h-[522px] w-[440px] min-w-[440px] overflow-hidden flex-col items-start rounded-xl bg-white transition-all duration-100 ease-in-out ${className} ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative z-10 flex w-full items-center justify-between overflow-hidden pb-1 pl-6 pr-[10px] pt-4">
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
            Expenses to review
          </h3>
          <MoreButton
            menu={<ExpensesOverflow />}
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative mt-1 flex gap-10 px-6">
          <div className="flex flex-col pr-6 text-[24px]/[32px] font-light">
            <span className="subpixel-antialiased">{data?.totalToReview}</span>
            <span className="cursor-pointer text-[13px]/[18px] font-normal text-brand-primary hover:text-brand-secondary hover:underline">
              {data?.countToReview} to review
            </span>
          </div>
          <div className="relative mt-1 flex h-[38px] w-px flex-none bg-background-tertiary" />
          <div className="flex flex-col text-[24px]/[32px] font-light">
            <span className="subpixel-antialiased">{data?.totalToPay}</span>
            <span className="cursor-pointer text-[13px]/[18px] font-normal text-brand-primary hover:text-brand-secondary hover:underline">
              {data?.countToPay} to pay
            </span>
          </div>
        </div>
        <div className="px-6 w-full mt-3">
          <table className="relative w-full">
            <thead className="text-[11px]/[16px] text-content-secondary">
              <tr>
                <th className="py-2 font-normal text-left ">
                  <span>Submitted by</span>
                </th>
                <th className="py-2 font-normal text-right">
                  <span>Expenses to review</span>
                </th>
                <th className="py-2 font-normal text-right">
                  <span>Amount</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px]/[16px] text-content-primary">
              {expensesToReview.map((expense: ExpenseToReview) => (
                <tr
                  key={expense.initials}
                  className="border-t border-background-tertiary last-of-type:border-b"
                >
                  <td className="flex gap-3 items-center py-1">
                    {expense.initials ? (
                      <span
                        className={`font-bold size-8 rounded-full flex items-center justify-center`}
                        style={{ backgroundColor: expense.color }}
                      >
                        {expense.initials}
                      </span>
                    ) : (
                      <span className="size-8"></span>
                    )}
                    <span className="text-action-primary">{expense.name}</span>
                  </td>
                  <td className="text-right">
                    <span>{expense.expenses}</span>
                  </td>
                  <td className="text-right">
                    <span>{expense.amount}</span>
                  </td>
                </tr>
              ))}
              <tr className="border-t border-background-tertiary last-of-type:border-b">
                <td className="flex gap-3 items-center py-1">
                  <span className="size-8"></span>
                  <span className="text-action-primary">+ 4 others</span>
                </td>
                <td className="text-right">
                  <span>4</span>
                </td>
                <td className="text-right">
                  <span>652.45</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View all expenses
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default ExpensesToReview;
