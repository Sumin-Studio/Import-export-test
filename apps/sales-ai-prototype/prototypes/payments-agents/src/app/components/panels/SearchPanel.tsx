"use client";

import { useState, useRef } from "react";
import { Close, Search, Filter } from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";
import SearchIllo from "@/app/assets/images/search-panel.svg";
import Image from "next/image";

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState("");
  const { openPanel } = useNavigation();
  const inputRef = useRef(null);

  return (
    <>
      <div className="relative flex items-center justify-between gap-2 border-b border-border-primary py-3 pl-5 pr-3">
        <h2 className="text-[17px]/[28px] font-bold capitalize">Search</h2>
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
          onClick={() => openPanel(null)}
          type="button"
        >
          <span className="sr-only">Close</span>
          <Close fill="fill-[#59606D]" />
        </button>
      </div>
      <div className="z-20 w-full bg-white md:w-[400px] absolute top-[65px] left-0">
        <div className="flex items-center border-b border-border-primary py-3 pl-5 pr-3">
          <div className="flex w-full items-center justify-between gap-3 rounded-[20px] border border-[#A6A9B0] px-3">
            <Search className="flex-none" stroke="stroke-[#59606D]" />
            <input
              className="h-10 w-full border-none bg-transparent text-[15px]/[24px] outline-none placeholder:"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Search contacts and transactions"
              ref={inputRef}
              type="text"
              value={inputValue}
            />
          </div>
          <div className="flex items-center justify-center size-10">
            <Filter className="flex-none" fill="fill-action-primary" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-left my-16 h-[calc(100vh-184px)] overflow-y-scroll">
        <div className="flex flex-col items-center justify-between p-16">
          <div className="mb-5 flex w-full items-center justify-center p-6">
            <Image alt="Search" priority={false} src={SearchIllo} />
          </div>
          <div className="flex w-full flex-col items-center justify-center text-center text-[15px]/[24px]">
            <p className="mb-2 text-[#404756]">
              Search names, numbers, references and more to find your contacts
              and transactions
            </p>
            <button
              className="flex items-center text-action-default"
              type="button"
            >
              Learn how to search in Xero
              <svg
                fill="none"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M6.01 7.09C6 6.546 6.5 6 7 6h5v1H7v10h10v-5h1v4.91c0 .544-.5 1.09-1 1.09H7c-.5 0-1-.546-1-1.09l.01-9.82zm9.24.16L14 6h4v4l-1.25-1.25L13 12.5 11.5 11l3.75-3.75z"
                  fill="#0078C8"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
