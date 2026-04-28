"use client";

import { useRegion } from "@/app/contexts/RegionContext";

import Image from "next/image";

import WorkpapersNavTop from "@/app/assets/images/workpapers/workpapers-nav-top.svg";
import WorkPapersHomeAUNZ from "@/app/assets/images/workpapers/aunz/workpapers-home.svg";
import WorkPapersHomeROW from "@/app/assets/images/workpapers/row/workpapers-home.svg";
import WorkPapersHomeUK from "@/app/assets/images/workpapers/uk/workpapers-home.svg";

import Link from "next/link";

export default function WorkpapersPage() {
  const { region } = useRegion();

  const getWorkpapersImage = () => {
    if (region === "AU" || region === "NZ") {
      return WorkPapersHomeAUNZ;
    } else if (region === "USA") {
      return WorkPapersHomeROW;
    } else if (region === "UK") {
      return WorkPapersHomeUK;
    }
    return WorkPapersHomeAUNZ; // default fallback
  };

  return (
    <div>
      <div className="bg-neutral-0 flex flex-col gap-2 border-b border-[#E1E2E5] bg-white px-5 pt-3">
        <div className="mb-5 flex items-center justify-between gap-2">
          <h1 className="font-national text-[24px]/[115%] font-bold">
            Workpapers
          </h1>
          <Image src={WorkpapersNavTop} alt="" width={208} />
        </div>
        <ul className="flex items-center gap-4 text-[14px]/[130%] text-[#424F60] *:cursor-pointer *:pb-2">
          <li className="border-b-2 border-[#1F65D6] text-[#1F65D6]">Active</li>
          <li>Archive</li>
        </ul>
      </div>
      <div className="relative p-8">
        <Image
          src={getWorkpapersImage()}
          alt="Workpapers dashboard home"
          width={1400}
          className="mx-auto block w-[1400px] min-w-[1400px]"
        />
        <Link
          href="/workpapers/cafe-decashflow"
          className="absolute inset-x-8 top-[170px] h-[40px]"
        />
      </div>
    </div>
  );
}
