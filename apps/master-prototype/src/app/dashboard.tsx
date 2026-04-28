"use client";

import { useState, useMemo, useEffect, createContext, useContext } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Close } from "@/app/components/ui/icons";
import WidgetsAU from "@/app/assets/images/widgetsAU.svg";
import WidgetsCA from "@/app/assets/images/widgetsCA.svg";
import WidgetsUK from "@/app/assets/images/widgetsUK.svg";
import { RegionText } from "@/app/components/global/RegionText";
import { useRegion } from "@/app/contexts/RegionContext";
import GridHintPopover from "@/app/components/global/GridHintPopover";

// Regular imports instead of dynamic imports
import {
  Spotlight,
  JustPaySpotlightWidget,
  BillsHomeAgentTrio,
  InvoicesOwed,
  CashInAndOut,
  BillsToPay,
  NetProfitLoss,
  BankRec,
  RecentInvoicePayments,
  Tasks,
  ChartOfAccounts,
  ExpensesToReview,
  YourExpenses,
} from "@/app/components/widgets";
import { JustPayCashflowHomeSections } from "@/app/components/just-pay/JustPayCashflowHomeSections";

// Context for customization state
const CustomizationContext = createContext<{ isCustomising: boolean }>({
  isCustomising: false,
});

interface GridItem {
  id: string;
  component: React.ReactNode;
  width: number;
  height: number;
}

// Widget configuration types
type WidgetConfig = {
  id: string;
  type:
    | "Spotlight"
    | "JustPayCTA"
    | "BillsHomeAgentTrio"
    | "BankRec"
    | "Tasks"
    | "InvoicesOwed"
    | "BillsToPay"
    | "NetProfitLoss"
    | "CashInAndOut"
    | "RecentInvoicePayments"
    | "ChartOfAccounts"
    | "ExpensesToReview"
    | "YourExpenses";
  props: Record<string, unknown>;
  width: number;
  height: number;
};

// Widget configurations - moved outside component to prevent recreation
const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    id: "spotlight",
    type: "Spotlight",
    props: {},
    width: 440,
    height: 320,
  },
  {
    id: "bank-rec-1",
    type: "BankRec",
    props: { dataKey: "everydaySavings" },
    width: 440,
    height: 251,
  },
  {
    id: "bank-rec-2",
    type: "BankRec",
    props: { dataKey: "businessTransaction" },
    width: 440,
    height: 251,
  },
  {
    id: "invoices-owed",
    type: "InvoicesOwed",
    props: {},
    width: 440,
    height: 522,
  },
  {
    id: "bills-to-pay",
    type: "BillsToPay",
    props: {},
    width: 440,
    height: 522,
  },
  {
    id: "tasks",
    type: "Tasks",
    props: {},
    width: 440,
    height: 251,
  },
  {
    id: "recent-invoice-payments",
    type: "RecentInvoicePayments",
    props: {},
    width: 440,
    height: 522,
  },
  {
    id: "cash-in-and-out",
    type: "CashInAndOut",
    props: {},
    width: 440,
    height: 522,
  },
  {
    id: "net-profit-loss",
    type: "NetProfitLoss",
    props: {},
    width: 440,
    height: 522,
  },
  {
    id: "your-expenses",
    type: "YourExpenses",
    props: {},
    width: 440,
    height: 251,
  },
  {
    id: "chart-of-accounts",
    type: "ChartOfAccounts",
    props: {},
    width: 440,
    height: 522,
  },
  {
    id: "expenses-to-review",
    type: "ExpensesToReview",
    props: {},
    width: 440,
    height: 522,
  },
];

export type DashboardSpotlightVariant = "default" | "just-pay" | "bills-home-trio";

function getWidgetConfigs(
  spotlightVariant: DashboardSpotlightVariant
): WidgetConfig[] {
  const configs = [...WIDGET_CONFIGS];
  if (spotlightVariant === "bills-home-trio") {
    configs[0] = {
      ...configs[0],
      id: "bills-home-trio",
      type: "BillsHomeAgentTrio",
      props: {},
      width: 440,
      height: 320,
    };
  } else if (spotlightVariant === "just-pay") {
    configs[0] = {
      ...configs[0],
      id: "just-pay-cta",
      type: "JustPayCTA",
      props: {},
      width: 440,
      height: 320,
    };
  }
  return configs;
}

export interface DashboardProps {
  /** Top-left tile: default Spotlight, Just Pay CTA, or three agent entry cards (bills-home). */
  spotlightVariant?: DashboardSpotlightVariant;
}

export default function Dashboard({
  spotlightVariant = "default",
}: DashboardProps) {
  const { region } = useRegion();
  const [isCustomising, setIsCustomising] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const widgetConfigs = useMemo(
    () => getWidgetConfigs(spotlightVariant),
    [spotlightVariant]
  );

  const widgetImage = useMemo(() => {
    switch (region) {
      case "AU":
      case "NZ":
        return WidgetsAU;
      case "UK":
        return WidgetsUK;
      case "USA":
      case "CA":
      default:
        return WidgetsCA;
    }
  }, [region]);

  // Create widget components without Suspense boundaries
  const widgets = useMemo(() => {
    return widgetConfigs.map((config) => ({
      id: config.id,
      component: <WidgetComponent key={config.id} config={config} />,
      width: config.width,
      height: config.height,
    }));
  }, [widgetConfigs]);

  // Single widget component that reads context
  function WidgetComponent({ config }: { config: WidgetConfig }) {
    const { isCustomising: customising } = useContext(CustomizationContext);
    const commonProps = { ...config.props, isCustomising: customising };

    switch (config.type) {
      case "Spotlight":
        return <Spotlight {...commonProps} />;
      case "JustPayCTA":
        return <JustPaySpotlightWidget {...commonProps} />;
      case "BillsHomeAgentTrio":
        return <BillsHomeAgentTrio {...commonProps} />;
      case "BankRec":
        return <BankRec {...commonProps} />;
      case "Tasks":
        return <Tasks {...commonProps} />;
      case "InvoicesOwed":
        return <InvoicesOwed {...commonProps} />;
      case "BillsToPay":
        return <BillsToPay {...commonProps} />;
      case "NetProfitLoss":
        return <NetProfitLoss {...commonProps} />;
      case "CashInAndOut":
        return <CashInAndOut {...commonProps} />;
      case "RecentInvoicePayments":
        return <RecentInvoicePayments {...commonProps} />;
      case "ChartOfAccounts":
        return <ChartOfAccounts {...commonProps} />;
      case "ExpensesToReview":
        return <ExpensesToReview {...commonProps} />;
      case "YourExpenses":
        return <YourExpenses {...commonProps} />;
      default:
        return <div>Unknown widget type</div>;
    }
  }

  const [widgetOrder, setWidgetOrder] = useState<GridItem[]>(widgets);

  // Filter widgets based on region - hide VAT for USA
  const filteredWidgets = useMemo(() => {
    return widgetOrder.filter((widget) => {
      if (widget.id === "vat" && region === "USA") {
        return false;
      }
      return true;
    });
  }, [widgetOrder, region]);

  // Update widget order when widgets change
  useEffect(() => {
    setWidgetOrder(widgets);
  }, [widgets]);

  const handleSave = (): void => {
    setIsCustomising(false);
  };

  if (spotlightVariant === "just-pay") {
    return (
      <>
        <div className="mb-6 overflow-hidden bg-white py-4">
          <div className="mx-auto flex max-w-full flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between md:px-5">
            <div className="flex items-center gap-3 md:gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F4B8A8] text-[13px]/[20px] font-bold text-[#5c2e24] md:text-[15px]/[22px]">
                HE
              </div>
              <h1 className="text-[21px]/[26px] font-bold text-content-primary md:text-[24px]/[32px]">
                Hornblower Enterprises
              </h1>
            </div>
            <div className="text-[13px]/[20px] text-content-secondary md:text-right">
              Last login:{" "}
              <span className="text-brand-primary">
                <RegionText textKey="text.loggedIn" />
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto mb-10 overflow-x-auto scroll-smooth px-4 md:px-5 lg:overflow-x-visible">
          <JustPayCashflowHomeSections />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 overflow-hidden bg-white py-4">
        <div className="mx-auto px-4 md:px-5 max-w-full md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-3.5 mb-1 md:mb-0">
            <div className="hidden md:flex items-center justify-center overflow-hidden rounded-[3px] bg-[#A8EED5] text-[13px]/[20px] font-bold text-[#1C4D3C] md:size-10 md:text-[17px]/[28px]">
              FS
            </div>
            <h1 className="text-[21px]/[26px] font-bold md:text-[24px]/[32px]">
              Demo organisation
            </h1>
            <span className="text-[13px]/[20px] text-content-secondary border border-content-secondary rounded-[3px] px-1">
              Sample data
            </span>
          </div>
          <div className="text-[13px]/[20px] text-content-secondary">
            Last login:{" "}
            <span className="text-brand-primary">
              <RegionText textKey="text.loggedIn" />
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto overflow-x-auto scroll-smooth lg:overflow-x-visible">
        <div className="mb-2 flex items-center justify-between gap-3 lg:mb-4">
          <div className="flex gap-3">
            <h2 className="text-[19px]/[32px] font-bold lg:text-[21px]/[32px]">
              Business overview
            </h2>
          </div>
          {isCustomising ? (
            <div className="flex gap-3">
              <div className="relative">
                <button
                  aria-label="Add widget"
                  className="flex size-8 flex-none cursor-pointer transtion-all ease-in-out duration-200 items-center justify-center z-10 gap-2 rounded-full bg-white text-[13px]/[20px] font-bold text-brand-primary hover:bg-[rgba(0,10,30,.05)] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  type="button"
                >
                  <svg
                    fill="none"
                    height="12"
                    viewBox="0 0 12 12"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 5H12V7H7V12H5V7H0V5H5V0H7V5Z" fill="#3376c2" />
                  </svg>
                  <span className="hidden lg:flex">Add widget</span>
                </button>
                {/* Show the hint to the right of the Add widget button on first customise */}
                <GridHintPopover
                  openOnMount
                  containerClassName="absolute left-0 top-0 w-px"
                />
              </div>
              <button
                aria-label="Save dashboard"
                className="flex size-8 cursor-pointer flex-none transtion-all ease-in-out duration-200 items-center justify-center gap-2 rounded-full bg-brand-primary text-[13px]/[20px] font-bold text-white hover:border-[#0073BF] hover:bg-[#0073BF] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
                onClick={handleSave}
                type="button"
              >
                <svg
                  fill="none"
                  height="10"
                  viewBox="0 0 13 10"
                  width="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 5.714L1.444 4.286L4.334 7.143L11.555 0L13 1.429L4.333 10L0 5.714Z"
                    fill="white"
                  />
                </svg>
                <span className="hidden lg:flex">Save</span>
              </button>
              <Dialog
                transition
                className="fixed inset-0 opacity-100 flex w-screen items-center z-60 justify-center bg-black/25 p-4 transition-all duration-200 ease-in-out data-closed:opacity-0"
                onClose={() => {
                  setIsOpen(false);
                }}
                open={isOpen}
              >
                <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto p-4">
                  <DialogPanel className="relative z-10 max-h-[90vh] w-[400px] overflow-y-auto rounded-[10px] bg-white">
                    <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-white pl-5 pr-3">
                      <h2 className="text-[0.9375rem]/[1.5rem] font-bold">
                        Show and hide widgets
                      </h2>
                      <button
                        className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        type="button"
                      >
                        <span className="sr-only">Close</span>
                        <Close className="text-[#5a606c]" />
                      </button>
                    </div>
                    <Image
                      alt="Add widget"
                      className="mx-auto px-0.5 pb-5 pt-2"
                      src={widgetImage}
                      priority
                    />
                    <div className="sticky bottom-0 z-10 flex h-16 w-full items-center justify-end bg-white px-5 shadow-[0px_-3px_0px_0px_rgba(0,10,30,0.05),0px_-1px_0px_0px_rgba(0,10,30,0.20)]">
                      <button
                        className="relative inline-block transtion-all ease-in-out duration-200 w-auto flex-none rounded-[48px] border border-brand-primary bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white hover:border-[#0073BF] hover:bg-[#0073BF]"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        type="button"
                      >
                        Done
                      </button>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          ) : (
            <button
              aria-label={
                region === "USA" ? "Customize dashboard" : "Customise dashboard"
              }
              className="flex size-8 flex-none transtion-all ease-in-out duration-200 cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-[13px]/[20px] font-bold text-brand-primary hover:bg-[rgba(0,10,30,.05)] lg:h-auto lg:w-auto lg:px-3 lg:py-[6px]"
              onClick={() => {
                setIsCustomising(true);
              }}
              type="button"
            >
              <svg
                fill="none"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10.085 7H1v1h9.085a1.5 1.5 0 0 0 2.83 0H15V7h-2.085a1.5 1.5 0 0 0-2.83 0m-7 4H1v1h2.085a1.5 1.5 0 0 0 2.83 0H15v-1H5.915a1.5 1.5 0 0 0-2.83 0m0-8H1v1h2.085a1.5 1.5 0 0 0 2.83 0H15V3H5.915a1.5 1.5 0 0 0-2.83 0"
                  fill="#0078C8"
                  fillRule="evenodd"
                />
              </svg>
              <span className="hidden lg:flex">
                {region === "USA" ? "Customize" : "Customise"}
              </span>
            </button>
          )}
        </div>
      </div>

      <CustomizationContext.Provider value={{ isCustomising }}>
        <div className="container mx-auto mb-10 min-h-screen overflow-x-auto scroll-smooth lg:overflow-x-visible">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 min-[1440px]:grid-cols-3 3xl:grid-cols-4">
            {filteredWidgets.map((widget) => (
              <div
                key={widget.id}
                className={`relative ${
                  widget.height === 522 ? "lg:row-span-2" : ""
                } ${widget.id === "bills-home-trio" ? "col-span-full" : ""}`}
              >
                {widget.component}
              </div>
            ))}
          </div>
        </div>
      </CustomizationContext.Provider>
    </>
  );
}
