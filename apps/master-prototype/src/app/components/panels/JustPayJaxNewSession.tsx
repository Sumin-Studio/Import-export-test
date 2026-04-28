"use client";

import Image from "next/image";
import JaxSparkleIcon from "@/app/assets/images/icon-sparkle-colour-small.svg";
import {
  JUST_PAY_JAX_NEW_SESSION_HEADLINE,
  JUST_PAY_QUICK_REPLY_LABELS,
} from "@/lib/just-pay-jax-copy";

type JustPayJaxNewSessionProps = {
  onSelectPill: (label: string) => void;
};

export function JustPayJaxNewSession({ onSelectPill }: JustPayJaxNewSessionProps) {
  return (
    <div className="flex w-full flex-col items-stretch px-5 pt-4 pb-4 nav-1049:w-[400px]">
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-6 pt-[10px]">
          <Image
            src={JaxSparkleIcon}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 flex-shrink-0"
            aria-hidden
          />
          <p className="text-[21px] font-normal leading-8 text-[#404756]">
            {JUST_PAY_JAX_NEW_SESSION_HEADLINE}
          </p>
          <div className="flex flex-col items-start gap-3">
            {JUST_PAY_QUICK_REPLY_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelectPill(label)}
                className="rounded-[30px] border border-[#0078c8] bg-white px-4 py-2 text-left text-[15px] leading-6 text-[#0078c8] transition-colors hover:bg-[#f7f9fc]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
