import { MoreButton } from "@/components/global";
import { BankRecOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { useRegion } from "@/app/contexts/RegionContext";
import { getBankAccountData } from "@/app/lib/RegionContent";

interface BankRecProps {
  accountName?: string;
  accountNumber?: string;
  items?: string;
  mismatch?: string;
  statementBalance?: string;
  statementBalanceDate?: string;
  balanceInXero?: string;
  connectionIssue?: boolean;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  dataKey?: string;
}

export function BankRec({
  accountName,
  accountNumber,
  items,
  mismatch,
  statementBalance,
  statementBalanceDate,
  balanceInXero,
  connectionIssue,
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  dataKey,
}: BankRecProps) {
  const { region } = useRegion();
  const regionData = dataKey ? getBankAccountData(dataKey, region) : null;

  const displayData = {
    accountName: regionData?.accountName || accountName,
    accountNumber: regionData?.accountNumber || accountNumber,
    items: regionData?.items || items,
    mismatch: regionData?.mismatch || mismatch,
    statementBalance: regionData?.statementBalance || statementBalance,
    balanceInXero: regionData?.balanceInXero || balanceInXero,
    statementBalanceDate:
      regionData?.statementBalanceDate || statementBalanceDate,
  };

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
    >
      <div
        className={`relative flex h-[251px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        }`}
      >
        <div className="relative pt-[9px] pr-2 pl-6">
          <div className="flex items-center justify-between">
            <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
              {displayData.accountName}
            </h3>
            <MoreButton
              menu={<BankRecOverflow />}
              position={{ to: "bottom end", gap: "4px" }}
            />
          </div>
          {connectionIssue ? (
            <div className="-mt-1 flex items-center gap-2">
              <span className="text-content-secondary before:bg-negative relative block text-[13px]/[20px] before:absolute before:top-[-2px] before:bottom-0 before:-left-6 before:h-[24px] before:w-[3px]">
                {displayData.accountNumber}
              </span>
              <button
                className="flex items-center gap-1 rounded-[40px] bg-[#FEF5F8] px-2 pt-[3px] pb-1 text-[11px]/[16px] text-[#6E1923] hover:bg-[#FCEBF0] hover:text-[#6E1923] hover:underline"
                type="button"
              >
                <svg
                  fill="none"
                  height="17"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M7.621 2.59a1 1 0 011.758 0l6.196 11.434a1 1 0 01-.879 1.476H2.304a1 1 0 01-.879-1.476L7.621 2.59zm-.105 8.758h1.967v2.074H7.516v-2.074zm1.967-5.19H7.516v4.152h1.967V6.158z"
                    fill="#DE0E40"
                    fillRule="evenodd"
                  />
                </svg>
                Feed connection issue
              </button>
            </div>
          ) : (
            <span className="text-content-secondary -mt-1 block text-[13px]/[20px]">
              {displayData.accountNumber}
            </span>
          )}
        </div>
        <div className="relative mt-2 flex gap-6 pr-6">
          <div className="relative flex w-full flex-col pl-[23px] text-[24px]/[28px] font-light">
            <span className="subpixel-antialiased">
              {displayData.statementBalance}
            </span>
            <span className="text-brand-primary cursor-pointer text-[13px]/[16px] font-normal hover:underline">
              Statement balance (22 Jul)
            </span>
          </div>
          {displayData.mismatch !== "0.00" && (
            <>
              <div className="bg-background-tertiary relative mt-1 flex h-[38px] w-px flex-none" />
              <div className="flex w-full flex-col text-[24px]/[28px] font-light">
                <span className="subpixel-antialiased">
                  {displayData.balanceInXero}
                </span>
                <span className="text-brand-primary text-[13px]/[16px] font-normal">
                  Balance in Xero
                </span>
              </div>
            </>
          )}
        </div>
        <hr className="border-background-tertiary mx-6 mt-3 border-t" />
        <ul className="relative mx-6 mt-[13px] text-[13px]/[16px]">
          {displayData.mismatch == "0.00" && (
            <li className="flex w-full items-center gap-2 text-[#0F7C54]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  fill="#13A972"
                  d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0M8.242 12.414 5.414 9.586 4 11l4.242 4.242 8.485-8.484-1.414-1.415z"
                ></path>
              </svg>
              Reconciled
            </li>
          )}
          {displayData.mismatch !== "0.00" && (
            <li className="flex w-full items-center justify-between">
              <span>Balance difference</span>
              <span>623.11</span>
            </li>
          )}
          {/* <li className="mt-2 flex w-full items-center justify-between">
            <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
              Statement balance ({displayData.statementBalanceDate})
            </span>
            <span>{displayData.statementBalance}</span>
            </li> */}
        </ul>
        {displayData.items === "0" ? (
          <button
            className="border-border-primary text-brand-primary relative mt-auto mr-auto mb-6 ml-6 inline-block w-auto flex-none rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View account transactions
          </button>
        ) : (
          <button
            className="border-brand-primary bg-brand-primary relative mt-auto mr-auto mb-6 ml-6 inline-block w-auto flex-none rounded-[48px] border px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-all duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF]"
            type="button"
          >
            Reconcile {displayData.items} items
          </button>
        )}
      </div>
    </CustomizationOverlay>
  );
}

export default BankRec;
