"use client";

import { useState, useRef } from "react";
import { Close, Search } from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState("");
  const { openPanel } = useNavigation();
  const inputRef = useRef(null);

  return (
    <>
      <div className="border-border-primary relative flex items-center justify-between gap-2 border-b py-3 pr-3 pl-5">
        <h2 className="text-[17px]/[28px] font-bold capitalize">Search</h2>
        <button
          className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => openPanel(null)}
          type="button"
        >
          <span className="sr-only">Close</span>
          <Close fill="fill-[#59606D]" />
        </button>
      </div>
      <div className="absolute top-[65px] left-0 z-20 w-full bg-white">
        <div className="border-border-primary flex items-center border-b py-3 pr-3 pl-5">
          <div className="flex w-full items-center justify-between gap-3 rounded-md border border-[#A6A9B0] px-3">
            <Search className="flex-none" stroke="stroke-[#59606D]" />
            <input
              className="placeholder: h-10 w-full border-none bg-transparent text-[15px]/[24px] outline-none"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Search contacts and transactions"
              aria-label="Search contacts and transactions"
              ref={inputRef}
              type="text"
              value={inputValue}
            />
          </div>
        </div>
      </div>
    </>
  );
}
