"use client";

import {
  BankRec,
  BillsToPay,
  InvoicesOwed,
} from "@/app/components/widgets";
import { AvailableTodayCard } from "@/app/components/widgets/just-pay/AvailableTodayCard";
import { CashflowProjectionCard } from "@/app/components/widgets/just-pay/CashflowProjectionCard";
import { JustPayBillsSuggestionWidget } from "@/app/components/widgets/just-pay/JustPayBillsSuggestionWidget";
import { PaySupplierQuickLinkCard } from "@/app/components/widgets/just-pay/PaySupplierQuickLinkCard";

const fullWidthWidget =
  "w-full min-w-0 max-w-none lg:!min-w-0 lg:!max-w-none";

/**
 * “Available cash” + first “Business overview” row from Just Pay / cash flow home (Figma
 * Cash flow home page — Option 1). Shared by Dashboard `spotlightVariant="just-pay"` and
 * app-route prototype 3.
 */
export function JustPayCashflowHomeSections() {
  return (
    <div className="w-full overflow-x-auto scroll-smooth lg:overflow-x-visible">
      <section className="mb-10">
        <PaySupplierQuickLinkCard className="mb-5 self-start" />
        <h2 className="mb-4 text-[19px]/[32px] font-[700] text-content-primary lg:text-[21px]/[32px]">
          Available cash
        </h2>
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,440px)_1fr]">
          <div className="flex min-w-0 flex-col gap-5">
            <AvailableTodayCard className="xl:max-w-none" />
            <JustPayBillsSuggestionWidget />
          </div>
          <div className="min-h-0 min-w-0 w-full">
            <CashflowProjectionCard />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-[19px]/[32px] font-[700] text-content-primary lg:text-[21px]/[32px]">
          Business overview
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <BankRec
            isCustomising={false}
            className={`${fullWidthWidget} h-auto min-h-[251px] lg:h-[251px]`}
            accountName="Westpac Everyday Savings"
            accountNumber="03-1301-0494812-22"
            items="20"
            mismatch="623.11"
            statementBalance="14,763.22"
            statementBalanceDate="10 July"
            balanceInXero="14,140.11"
          />
          <InvoicesOwed
            isCustomising={false}
            className={`${fullWidthWidget} h-auto min-h-[522px] lg:h-[522px]`}
          />
          <BillsToPay
            isCustomising={false}
            className={`${fullWidthWidget} h-auto min-h-[522px] lg:h-[522px]`}
          />
        </div>
      </section>
    </div>
  );
}
