import Image from "next/image";
import { MoreButton, CtaButton } from "@/app/components/global";
import Half from "@/app/assets/images/half-circle.png";

interface ComponentProps {
  isCustomising?: boolean;
}

export function BillsAwaiting({ isCustomising }: ComponentProps) {
  return (
    <div
      className={`relative flex h-[251px] w-[440px] min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
        isCustomising ? "pointer-events-none" : ""
      }`}
    >
      {isCustomising ? (
        <div className="absolute left-0 top-0 h-full w-full animate-border-pulse rounded-xl border-[3px] border-border-primary border-opacity-100 bg-white">
          <button
            className="absolute -left-3 -top-3 flex size-6 items-center justify-center rounded-full bg-[#414755]"
            type="button"
          >
            <svg
              fill="none"
              height="12"
              viewBox="0 0 12 12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4.5L10.5 0L12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5Z"
                fill="white"
              />
            </svg>
            <span className="sr-only">Remove</span>
          </button>
        </div>
      ) : null}
      <div className="relative flex items-center justify-between pb-1 pl-8 pr-2 pt-4">
        <h3 className="text-[17px]/[17px] font-bold">Bills awaiting payment</h3>
        <MoreButton />
      </div>
      <div className="mx-[70px] mb-3 mt-4">
        <div className="aspect-[2/1] w-full overflow-hidden">
          <Image
            alt="A cupcake"
            className="h-auto w-full"
            priority={false}
            src={Half}
          />
        </div>
      </div>
      <div className="relative my-5 grid grid-cols-2 justify-between gap-6 px-8 text-center">
        <div className="flex flex-col text-[24px]/[32px] font-light">
          7,974
          <span className="mt-2 text-[13px]/[18px] font-normal">
            <span className="font-bold">10</span> Awaiting payment
          </span>
        </div>
        <div className="relative flex flex-col text-[24px]/[32px] text-[#DC3246] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-background-tertiary">
          3,455
          <span className="mt-2 text-[13px]/[18px]">
            <span className="font-bold">3</span> Overdue
          </span>
        </div>
      </div>
      <CtaButton
        className="border-t border-background-tertiary"
        link="Go to purchases overview"
        url="/"
      />
    </div>
  );
}

export default BillsAwaiting;
