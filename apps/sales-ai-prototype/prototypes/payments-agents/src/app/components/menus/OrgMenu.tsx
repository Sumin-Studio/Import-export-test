import {
  Files,
  Settings,
  Caret,
  ExternalLink,
  ChevronMobile,
} from "@/app/components/ui/icons";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRegion } from "@/app/contexts/RegionContext";

interface MenuProps {
  onClose: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
  backButtonClassName?: string;
}

export default function OrgMenu({
  onClose,
  showBackButton = false,
  onBackClick,
  backButtonClassName,
}: MenuProps) {
  const [inputValue, setInputValue] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const inputRef = useRef(null);
  const { region } = useRegion();

  const handleInputFocus = (): void => {
    if (!isToggled) {
      setIsToggled(true);
    }
  };

  const handleFormToggle = (): void => {
    setIsToggled(!isToggled);
    if (isToggled) {
      setInputValue("");
    }
  };
  return (
    <>
      {showBackButton ? (
        <button
          className={`mb-2 flex w-full items-center cursor-pointer justify-between border-b border-[#CCCED2] p-3 text-[15px]/[24px] text-content-primary ${
            backButtonClassName || ""
          }`}
          onClick={onBackClick}
          type="button"
        >
          <span className="flex items-center gap-2 font-bold">
            <span className="flex size-10 items-center justify-center">
              <span className="flex size-8 flex-none items-center justify-center rounded-[3px] bg-[#9EEEFD] text-center text-[13px]/[20px] font-bold uppercase">
                FS
              </span>
            </span>
            Foxglove Studios
          </span>
          <span className="ml-auto flex size-10 rotate-180 transform items-center justify-center">
            <ChevronMobile />
          </span>
        </button>
      ) : (
        <div className="py-1 pl-4 pr-3 text-content-tertiary">
          <h2 className="flex items-center text-[15px]/[24px] font-bold">
            <span className="flex size-8 flex-none items-center justify-center rounded-[3px] bg-[#9EEEFD] text-[13px]/[20px] font-bold uppercase text-[#154D58]">
              FS
            </span>
            <div className="p-2">Foxglove Studios</div>
          </h2>
        </div>
      )}
      <nav>
        <ul className="flex flex-col">
          <li>
            <button
              aria-disabled="true"
              className="flex w-full items-center gap-1 px-3 text-left hover:bg-background-tertiary"
              type="button"
            >
              <span className="flex size-[36px] items-center justify-center">
                <Files />
              </span>
              Files
            </button>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex w-full items-center gap-1 px-3 py-0 text-left text-content-primary hover:bg-background-tertiary"
              onClick={onClose}
            >
              <span className="flex size-[36px] items-center justify-center">
                <Settings />
              </span>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="my-3 h-px w-full border-border-primary" />
      <div className="relative mx-5 mb-3 flex items-center gap-3 rounded-[20px] border border-[#A6A9B0] px-3 py-2 hover:border-[#80858F] has-[:focus]:ring-2 has-[:focus]:ring-[#81848d] has-[:focus]:ring-offset-[1px]">
        <svg
          className="flex-none"
          fill="none"
          height="18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-current"
            d="M1.513 9.965a6.445 6.445 0 108.343-8.497 6.449 6.449 0 00-8.388 3.565 6.448 6.448 0 00.045 4.932zm10.489 2.036L17 17"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
          />
        </svg>
        <input
          className="w-full bg-transparent placeholder-content-secondary outline-none"
          onBlur={handleFormToggle}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={handleInputFocus}
          placeholder={`Search ${
            region === "USA" ? "organizations" : "organisations"
          }`}
          ref={inputRef}
          type="text"
          value={inputValue}
        />
        {isToggled ? (
          <button
            className="focus:outline-none"
            onClick={handleFormToggle}
            type="button"
          >
            <span className="sr-only">Clear filter</span>
            <svg
              fill="none"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10a8.003 8.003 0 004.939 7.391 7.995 7.995 0 008.718-1.734 8.003 8.003 0 000-11.314 8.003 8.003 0 00-11.314 0A7.997 7.997 0 002 10zm5.144-2.857l5.714 5.714m0-5.714l-5.714 5.714"
                stroke="#59606D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
      <h3 className="block w-full px-5 py-2 text-[11px]/[16px] font-bold uppercase">
        Recent {region === "USA" ? "Organizations" : "Organisations"}
      </h3>
      <ul>
        <li>
          <button
            aria-disabled="true"
            className="flex cursor-pointer w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[1.92px] bg-[#FDD580] py-1 text-[11px]/[16px] font-bold uppercase text-[#583C00]">
              LAR
            </span>
            Livingstone Auto Repairs
          </button>
        </li>
        <li>
          <button
            aria-disabled="true"
            className="flex cursor-pointer w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[1.92px] bg-[#9EEEFD] py-1 text-[11px]/[16px] font-bold uppercase text-[#154D58]">
              BB
            </span>
            Blue Breeze
          </button>
        </li>
        <li>
          <button
            aria-disabled="true"
            className="flex cursor-pointer w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[1.92px] bg-[#ADADF3] py-1 text-[11px]/[16px] font-bold uppercase text-[#202051]">
              FM
            </span>
            Fleetwood Motors
          </button>
        </li>
        <li>
          <button
            aria-disabled="true"
            className="flex cursor-pointer w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[1.92px] bg-[#FFB2CB] py-1 text-[11px]/[16px] font-bold uppercase text-[#592335]">
              MM
            </span>
            Maker Mugs
          </button>
        </li>
        <li>
          <button
            aria-disabled="true"
            className="flex cursor-pointer w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[1.92px] bg-[#80C19E] py-1 text-[11px]/[16px] font-bold uppercase text-[#002E15]">
              G
            </span>
            Goodyear
          </button>
        </li>
      </ul>
      <hr className="my-3 h-px w-full border-border-primary" />
      <ul>
        <li>
          <button
            aria-disabled="true"
            className="flex cursor-pointer w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <svg
              fill="none"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4 11.88c0 1.48 1.2 2.72 2.68 2.72 1.48 0 2.72-1.24 2.72-2.72 0-1.48-1.24-2.68-2.72-2.68A2.68 2.68 0 0016 11.88zm-7.24.28v.08a.607.607 0 01.042.159c.01.05.02.106.038.161.2.52.76 1.28 1.84 1.28.32 0 .64-.08.92-.24.2-.12.36-.28.52-.44.04-.04.08-.08.12-.16.2-.24.4-.16.56-.08.16.12.16.4.04.56v.04a11.21 11.21 0 00-.142.145c-.182.189-.355.367-.578.495-.24.16-.52.28-.8.32-.32.12-.64.12-.96.08-1.08-.12-2-.92-2.28-2l-.017-.103C8.029 12.262 8 12.091 8 11.92c0-.88.4-1.72 1.12-2.24.88-.6 2.12-.64 3-.08.64.4 1.04 1.04 1.2 1.76.08.44-.2.8-.72.8H8.76zm5.96-.84c0-.92.12-1.28.88-1.4h.16c.24 0 .36-.16.36-.36 0-.2-.16-.36-.36-.36h-.12c-.32 0-.64.12-.92.32a.384.384 0 00-.36-.28c-.2 0-.36.16-.36.36v4.52c0 .2.16.36.36.36.2 0 .36-.16.36-.36v-2.8zM7.4 14.56c-.12 0-.2-.04-.28-.12L5.08 12.4l-2.04 2.04c-.08.08-.16.12-.28.12-.2 0-.36-.16-.36-.36 0-.12.04-.2.12-.28l2.04-2.04-2.04-2.04a.363.363 0 01-.12-.28c0-.2.16-.36.36-.36.12 0 .2.04.28.12l2.04 2.04 2.04-2.04c.08-.08.16-.12.28-.12.2 0 .36.16.36.36 0 .12-.04.2-.12.28L5.6 11.88l2.04 2.04c.08.08.12.16.12.28 0 .2-.16.36-.36.36zm9.4-2.64c0-1.04.88-1.92 1.92-1.92 1.08 0 1.96.88 1.92 1.92 0 1.08-.84 1.92-1.92 1.92a1.92 1.92 0 01-1.92-1.92zM10.68 10c-.92 0-1.68.64-1.88 1.48h3.76c-.2-.84-.96-1.48-1.88-1.48zM18 11.88c0 .36.32.64.68.64.36 0 .64-.28.64-.64s-.28-.68-.64-.68c-.4 0-.68.32-.68.68z"
                fill="#13B5EA"
                fillRule="evenodd"
              />
            </svg>
            Demo Company ({region})
          </button>
        </li>
        <li>
          <button
            aria-disabled="true"
            className="flex w-full items-center gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-content-primary/10">
              <svg
                fill="none"
                height="12"
                viewBox="0 0 12 12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  fill="#003C64"
                  height="12"
                  rx="0.6"
                  width="1.2"
                  x="5.25006"
                  y="0.000106812"
                />
                <rect
                  fill="#003C64"
                  height="1.2"
                  rx="0.6"
                  width="12"
                  y="5.24994"
                />
              </svg>
            </span>
            Add new {region === "USA" ? "organization" : "organisation"}
          </button>
        </li>
      </ul>
      <hr className="my-3 h-px w-full border-border-primary" />
      <ul>
        <li>
          <button
            aria-disabled="true"
            className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
            type="button"
          >
            My Xero
            <ExternalLink className="text-content-secondary" />
          </button>
        </li>
      </ul>
      <hr className="my-3 h-px w-full border-border-primary" />
      <Disclosure as="div">
        <DisclosureButton className="group cursor-pointer flex w-full items-center justify-between px-5 py-2 text-[11px]/[20px] font-bold uppercase text-brand-secondary">
          Practice tools
          <Caret className="group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel>
          <ul>
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                My Xero
                <ExternalLink className="text-content-secondary" />
              </button>
            </li>
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                Xero HQ
                <ExternalLink className="text-content-secondary" />
              </button>
            </li>
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                Workpapers
                <ExternalLink className="text-content-secondary" />
              </button>
            </li>
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                Practice Manager & Tax
                <ExternalLink className="text-content-secondary" />
              </button>
            </li>
          </ul>
        </DisclosurePanel>
      </Disclosure>
      <hr className="my-3 h-px w-full border-border-primary" />
      <Disclosure as="div" defaultOpen={true}>
        <DisclosureButton className="group cursor-pointer flex w-full items-center justify-between px-5 py-2 text-[11px]/[20px] font-bold uppercase text-brand-secondary">
          Do more with Xero
          <Caret className="group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel>
          <ul>
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                Hubdoc
                <ExternalLink className="text-content-secondary" />
              </button>
            </li>
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                Analytics powered by Syft
              </button>
            </li>
            {(region === "AU" || region === "NZ") && (
              <li>
                <button
                  aria-disabled="true"
                  className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                  type="button"
                >
                  Rostering
                </button>
              </li>
            )}
            <li>
              <button
                aria-disabled="true"
                className="flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-content-primary hover:bg-background-tertiary"
                type="button"
              >
                Xero App store
              </button>
            </li>
          </ul>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}
