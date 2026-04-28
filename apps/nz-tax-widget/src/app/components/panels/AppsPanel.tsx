"use client";

import Image from "next/image";
import Cas360 from "@/app/assets/images/apps-cas360.png";
import Fyi from "@/app/assets/images/apps-fyi.png";
import Dext from "@/app/assets/images/apps-dext.png";
import Socket from "@/app/assets/images/apps-socket.png";
import Suitefiles from "@/app/assets/images/apps-suitefiles.png";
import DashboardInsights from "@/app/assets/images/apps-dashboardinsights.png";
import { Close, ExternalLink } from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { useRegion } from "@/app/contexts/RegionContext";

function Stars() {
  return (
    <svg fill="none" height="12" width="203" xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M6 10l-4 2 .667-4.333-2.667-3L4 4l2-4 2 4 4 .667-2.667 3L10 12l-4-2zm15 0l-4 2 .667-4.333-2.667-3L19 4l2-4 2 4 4 .667-2.667 3L25 12l-4-2zm15 0l-4 2 .667-4.333-2.667-3L34 4l2-4 2 4 4 .667-2.667 3L40 12l-4-2zm15 0l-4 2 .667-4.333-2.667-3L49 4l2-4 2 4 4 .667-2.667 3L55 12l-4-2z"
        fill="#FAAA00"
        fillRule="evenodd"
      />
      <path
        d="M66.224 9.553L66 9.44l-.224.112-3.135 1.567.52-3.377.036-.233-.157-.176-2.065-2.323 3.107-.518.251-.042.114-.227L66 1.118l1.553 3.106.114.227.25.042 3.108.518-2.065 2.323-.157.176.036.233.52 3.377-3.135-1.567z"
        fill="#fff"
        stroke="#CCCED2"
      />
      <path
        d="M83.56 10h-.85V4.92h-1.84v-.68c.24 0 .473-.017.7-.05.227-.04.43-.11.61-.21.187-.1.343-.237.47-.41.127-.173.213-.393.26-.66h.65V10zm3.337-1.71c.033.347.173.613.42.8.246.187.54.28.88.28.52 0 .91-.223 1.17-.67.26-.453.403-1.143.43-2.07l-.02-.02c-.16.3-.387.54-.68.72-.294.173-.614.26-.96.26-.36 0-.68-.057-.96-.17a2.08 2.08 0 01-.71-.49 2.128 2.128 0 01-.43-.75 3.153 3.153 0 01-.14-.96c0-.34.056-.65.17-.93a2.152 2.152 0 011.22-1.21c.286-.113.6-.17.94-.17.333 0 .646.053.94.16.293.1.55.277.77.53.22.253.393.6.52 1.04.133.433.2.987.2 1.66 0 1.227-.197 2.17-.59 2.83-.387.653-1.01.98-1.87.98-.594 0-1.087-.15-1.48-.45-.394-.3-.617-.757-.67-1.37h.85zm2.75-3.01c0-.22-.034-.427-.1-.62a1.41 1.41 0 00-.28-.51 1.253 1.253 0 00-.45-.36c-.18-.087-.39-.13-.63-.13-.254 0-.47.047-.65.14-.174.093-.317.22-.43.38-.107.153-.187.33-.24.53-.047.2-.07.41-.07.63 0 .193.033.38.1.56.073.18.17.34.29.48.126.14.273.253.44.34.173.08.363.12.57.12.22 0 .42-.04.6-.12.18-.087.333-.2.46-.34.126-.147.223-.313.29-.5.066-.193.1-.393.1-.6zm6.166-1.5h-2.86l-.38 2.04.02.02c.154-.173.35-.3.59-.38.247-.087.49-.13.73-.13.314 0 .61.05.89.15.28.1.524.253.73.46.207.2.37.453.49.76.12.3.18.653.18 1.06 0 .3-.053.593-.16.88-.1.28-.253.53-.46.75-.206.22-.466.397-.78.53-.306.127-.666.19-1.08.19a2.86 2.86 0 01-.87-.13 2.363 2.363 0 01-.71-.39 1.865 1.865 0 01-.49-.64 2.088 2.088 0 01-.19-.86h.85c.014.18.057.35.13.51.08.153.184.29.31.41.134.113.287.203.46.27.18.06.377.09.59.09.2 0 .39-.033.57-.1.187-.073.347-.18.48-.32.14-.14.25-.313.33-.52a2.1 2.1 0 00.12-.74c0-.233-.04-.447-.12-.64-.073-.2-.18-.37-.32-.51-.14-.147-.31-.26-.51-.34-.193-.08-.41-.12-.65-.12-.28 0-.53.063-.75.19-.213.12-.403.28-.57.48l-.73-.04.66-3.68h3.5v.75z"
        fill="#59606D"
      />
    </svg>
  );
}

export default function AppsPanel() {
  const { openPanel } = useNavigation();
  const { region } = useRegion();

  return (
    <>
      <div className="border-border-primary relative flex items-center justify-between gap-2 border-b py-3 pr-3 pl-5">
        <h2 className="text-[17px]/[28px] font-bold capitalize">Apps</h2>
        <div className="flex items-center gap-3">
          <button
            className="text-brand-primary hover:bg-background-primary flex items-center gap-2 rounded-[3px] px-3 py-2 text-[13px]/[20px] font-bold"
            type="button"
            aria-label="Open Xero App Store (opens in new window)"
          >
            Open Xero App Store
            <ExternalLink stroke="stroke-current" />
          </button>
          <button
            className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
            onClick={() => openPanel(null)}
            type="button"
          >
            <span className="sr-only">Close</span>
            <Close fill="fill-content-secondary" />
          </button>
        </div>
      </div>
      <div className="border-border-primary border-b pb-3">
        <h3 className="mx-5 my-2 text-[11px]/[16px] font-bold uppercase">
          Connected apps
        </h3>
        <ul>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary flex w-full items-center justify-between gap-4 py-2 pr-4 pl-5 font-bold"
              type="button"
            >
              <Image
                src={Cas360}
                alt="Cas360"
                width={48}
                height={48}
                className="flex-none rounded-[3px]"
              />
              Cas360
              <div className="ml-auto flex size-8 flex-none items-center justify-center">
                <ExternalLink stroke="stroke-content-secondary" />
              </div>
            </button>
          </li>
        </ul>
        <div className="px-5 py-1">
          <button
            className="text-body-small-regular text-action-primary text-action-default hover:bg-secondary flex items-center gap-2 rounded-[3px] px-3 py-2 font-bold"
            type="button"
          >
            <svg
              fill="none"
              height="18"
              width="17"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M7.866.5c-.5 0-1 .5-1 1v1.174a6.493 6.493 0 00-3.235 1.873L2.683 4c-.433-.25-1.116-.067-1.366.366l-.5.866c-.25.433-.067 1.116.366 1.366l.951.55A6.501 6.501 0 001.866 9c0 .674.103 1.325.294 1.936l-.977.564c-.433.25-.616.933-.366 1.366l.5.866c.25.433.933.616 1.366.366l1.008-.582c.85.88 1.945 1.52 3.175 1.81V16.5c0 .5.5 1 1 1h1c.5 0 1-.5 1-1v-1.174a6.493 6.493 0 003.175-1.81l1.008.582c.433.25 1.116.067 1.366-.366l.5-.866c.25-.433.067-1.116-.366-1.366l-.976-.564c.19-.611.293-1.262.293-1.936 0-.644-.093-1.266-.268-1.853l.951-.549c.433-.25.616-.933.366-1.366l-.5-.866c-.25-.433-.933-.616-1.366-.366l-.947.547a6.493 6.493 0 00-3.236-1.873V1.5c0-.5-.5-1-1-1h-1zm3.5 8.5a3 3 0 11-6 0 3 3 0 016 0z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            Manage connected apps
          </button>
        </div>
      </div>
      <div className="border-border-primary border-b py-3">
        <h3 className="mx-5 my-2 text-[11px]/[16px] font-bold uppercase">
          Recommended apps
        </h3>
        <ul>
          <li>
            <button
              className="hover:bg-secondary flex w-full items-center justify-start gap-4 px-5 py-2"
              type="button"
            >
              <Image
                src={Fyi}
                alt="FYI"
                width={48}
                height={48}
                className="flex-none rounded-[3px]"
              />
              <div className="text-left">
                <span className="text-body-small-regular font-bold">FYI</span>
                <Stars />
                <span className="text-[11px]/[16px]">
                  Inventory, and Invoicing and jobs
                </span>
              </div>
            </button>
          </li>
          {region === "UK" ? (
            <>
              <li>
                <button
                  className="hover:bg-secondary flex w-full items-center justify-start gap-4 px-5 py-2"
                  type="button"
                >
                  <Image
                    src={Socket}
                    alt="Socket"
                    width={48}
                    height={48}
                    className="flex-none rounded-[3px]"
                  />
                  <div className="text-left">
                    <span className="text-body-small-regular font-bold">
                      Socket
                    </span>
                    <Stars />
                    <span className="text-[11px]/[16px]">Engagements</span>
                  </div>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="hover:bg-secondary flex w-full items-center justify-start gap-4 px-5 py-2"
                  type="button"
                >
                  <Image
                    src={Suitefiles}
                    alt="Suitefiles"
                    width={48}
                    height={48}
                    className="flex-none rounded-[3px]"
                  />
                  <div className="text-left">
                    <span className="text-body-small-regular font-bold">
                      Suitefiles
                    </span>
                    <Stars />
                    <span className="text-[11px]/[16px]">
                      Inventory, and Ecommerce
                    </span>
                  </div>
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="hover:bg-secondary flex w-full items-center justify-start gap-4 px-5 py-2"
              type="button"
            >
              <Image
                src={DashboardInsights}
                alt="Dashboard Insights"
                width={48}
                height={48}
                className="flex-none rounded-[3px]"
              />
              <div className="text-left">
                <span className="text-body-small-regular font-bold">
                  Dashboard Insights
                </span>
                <Stars />
                <span className="text-[11px]/[16px]">
                  Accountant tools, and Reporting
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div className="py-3">
        <h3 className="mx-5 my-2 text-[11px]/[16px] font-bold uppercase">
          Popular app categories
        </h3>
        <ul>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary w-full px-5 py-2 text-left"
              type="button"
            >
              Workflow builders
            </button>
          </li>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary w-full px-5 py-2 text-left"
              type="button"
            >
              Client and practice management
            </button>
          </li>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary w-full px-5 py-2 text-left"
              type="button"
            >
              Document management
            </button>
          </li>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary w-full px-5 py-2 text-left"
              type="button"
            >
              CRM and marketing
            </button>
          </li>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary w-full px-5 py-2 text-left"
              type="button"
            >
              Reporting and forecasting
            </button>
          </li>
          <li>
            <button
              className="text-body-standard-regular hover:bg-secondary w-full px-5 py-2 text-left"
              type="button"
            >
              Tax and compliance
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
