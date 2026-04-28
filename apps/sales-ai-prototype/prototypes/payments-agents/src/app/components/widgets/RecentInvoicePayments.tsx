import { MoreButton } from "../global";
import { RecentInvoicePaymentsOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

const data = [
  {
    invoiceNumber: "ORC1015",
    contact: "Quantum Consultants",
    dateReceived: "16 Jun",
    thisMonth: "5,995.00",
  },
  {
    invoiceNumber: "ORC1019",
    contact: "Rex Media Group",
    dateReceived: "15 Jun",
    thisMonth: "4,326.00",
  },
  {
    invoiceNumber: "ORC1016",
    contact: "Hamilton Smith Pty",
    dateReceived: "6 Jun",
    thisMonth: "1,320.00",
  },
  {
    invoiceNumber: "ORC1001",
    contact: "Portal project",
    dateReceived: "8 Jun",
    thisMonth: "550.00",
  },
  {
    invoiceNumber: "ORC1000",
    contact: "Kinnet & Jones",
    dateReceived: "1 Jun",
    thisMonth: "1,155.00",
  },
  {
    invoiceNumber: "ORC1020",
    contact: "ABC furniture",
    dateReceived: "29 May",
    thisMonth: "856.00",
  },
  {
    invoiceNumber: "ORC1008",
    contact: "Arabica Cafe",
    dateReceived: "27 May",
    thisMonth: "2,430.00",
  },
  {
    invoiceNumber: "ORC1012",
    contact: "Kinnet & Jones",
    dateReceived: "27 May",
    thisMonth: "1,340.00",
  },
  {
    invoiceNumber: "ORC1006",
    contact: "Alpha Pharma",
    dateReceived: "24 May",
    thisMonth: "1,776.00",
  },
];

export function RecentInvoicePayments({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-[522px] w-[440px] min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-2 pl-6 pr-2 pt-[10px]">
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
            Recent invoice payments
          </h3>
          <MoreButton
            menu={<RecentInvoicePaymentsOverflow />}
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <ul className="relative px-6">
          <li className="flex w-full justify-between gap-4 py-2 text-[11px]/[16px] text-content-secondary">
            <span className="w-1/2 text-left">Invoice #</span>
            <span className="line-clamp-1 w-full text-left">Contact</span>
            <span className="w-1/2 text-left">Date received</span>
            <span className="w-1/2 text-right">Amount</span>
          </li>
          {data.map((item) => (
            <li
              className="flex w-full justify-between gap-4 border-t border-background-tertiary py-2 text-[13px]/[20px]"
              key={item.invoiceNumber}
            >
              <span className="w-1/2 text-left">
                <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
                  {item.invoiceNumber}
                </span>
              </span>
              <span className="line-clamp-1 w-full text-left">
                {item.contact}
              </span>
              <span className="w-1/2 text-left">{item.dateReceived}</span>
              <span className="w-1/2 text-right">{item.thisMonth}</span>
            </li>
          ))}
        </ul>
        <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none cursor-pointer rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View paid invoices
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default RecentInvoicePayments;
