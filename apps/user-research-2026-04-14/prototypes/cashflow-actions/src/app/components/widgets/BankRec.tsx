"use client";

import Link from "next/link";
import { MoreButton } from "../global";
import { BankRecOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { useRegion } from "@/app/contexts/RegionContext";
import { getBankAccountData } from "@/app/lib/RegionContent";
import { Jax } from "@/app/components/ui/icons";

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
  dataKey?: string;
  className?: string;
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
  dataKey,
  className = "",
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
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-[251px] w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative pl-6 pr-2 pt-[9px]">
          <div className="flex items-center justify-between">
            {displayData.accountName === "Xero Card" ? (
              <Link href="/accounts">
                <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
                  {displayData.accountName}
                </h3>
              </Link>
            ) : (
              <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
                {displayData.accountName}
              </h3>
            )}
            <MoreButton
              menu={<BankRecOverflow />}
              position={{ to: "bottom end", gap: "4px" }}
            />
          </div>
          {connectionIssue ? (
            <div className="-mt-1 flex items-center gap-2">
              <span className="relative block text-[13px]/[20px] text-content-secondary before:absolute before:-left-6 before:bottom-0 before:top-[-2px] before:h-[24px] before:w-[3px] before:bg-negative">
                {displayData.accountNumber}
              </span>
              <button
                className="flex items-center gap-1 rounded-[40px] bg-[#FEF5F8] px-2 pb-1 pt-[3px] text-[11px]/[16px] text-[#6E1923] hover:bg-[#FCEBF0] hover:text-[#6E1923] hover:underline"
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
          ) : displayData.accountName !== "Xero Card" ? (
            <span className="-mt-1 block text-[13px]/[20px] text-content-secondary">
              {displayData.accountNumber}
            </span>
          ) : null}
        </div>
        <div className="relative mt-2 flex gap-6 pr-6">
          <div className="relative flex w-full flex-col pl-[23px] text-[24px]/[28px] font-light">
            <span className="subpixel-antialiased">
              {displayData.accountName === "Xero Card" ? "5,538.07" : displayData.statementBalance}
            </span>
            {displayData.accountName === "Xero Card" ? (
              <span className="text-[13px]/[16px] font-normal text-brand-primary">
                <Link href="/accounts" className="cursor-pointer hover:underline">
                  Current balance
                </Link>
              </span>
            ) : (
              <span className="cursor-pointer text-[13px]/[16px] font-normal text-brand-primary hover:underline">
                Statement balance ({displayData.statementBalanceDate || "22 Jul"})
              </span>
            )}
          </div>
          {displayData.accountName === "Xero Card" ? (
            <>
              <div className="relative mt-1 flex h-[38px] w-px flex-none bg-background-tertiary" />
              <div className="flex w-full flex-col text-[24px]/[28px] font-light">
                <span className="subpixel-antialiased">4</span>
                <span className="text-[13px]/[16px] font-normal text-brand-primary">
                  <Link href="/accounts" className="cursor-pointer hover:underline">
                    Cards issued
                  </Link>
                </span>
              </div>
            </>
          ) : displayData.mismatch !== "0.00" ? (
            <>
              <div className="relative mt-1 flex h-[38px] w-px flex-none bg-background-tertiary" />
              <div className="flex w-full flex-col text-[24px]/[28px] font-light">
                <span className="subpixel-antialiased">
                  {displayData.balanceInXero}
                </span>
                <span className="text-[13px]/[16px] font-normal text-brand-primary">
                  Balance in Xero
                </span>
              </div>
            </>
          ) : null}
        </div>
        <hr className="border-t border-background-tertiary mx-6 mt-3" />
        <ul className="relative mx-6 mt-[13px] text-[13px]/[16px]">
          {displayData.mismatch == "0.00" && (
            <li className="flex w-full items-center gap-2 text-[#0F7C54]">
              {displayData.accountName === "Xero Card" ? (
                <>
                  <Jax className="fill-brand-primary" />
                  <span>Autoreconciled by JAX</span>
                </>
              ) : (
                <>
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
                  <span>Reconciled</span>
                </>
              )}
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
          displayData.accountName === "Xero Card" ? (
            <Link
              href="/accounts?tab=transactions"
              className="relative mb-5 ml-6 mr-auto mt-auto inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            >
              View account transactions
            </Link>
          ) : (
            <button
              className="relative mb-5 ml-6 mr-auto mt-auto inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
              type="button"
            >
              View account transactions
            </button>
          )
        ) : (
          <button
            className="relative mb-5 ml-6 mr-auto mt-auto inline-block w-auto flex-none rounded-[48px] border border-brand-primary bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-all duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF]"
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
