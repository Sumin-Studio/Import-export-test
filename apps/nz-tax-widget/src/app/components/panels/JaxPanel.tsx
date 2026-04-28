"use client";

import { useState } from "react";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { Close, ExternalLink } from "@/app/components/ui/icons";

export default function JaxPanel() {
  const { openPanel, openSubPanel } = useNavigation();
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="border-border-primary fixed inset-x-0 top-0 flex items-center justify-between gap-2 border-b bg-white py-3 pr-3 pl-5">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px]/[28px] font-bold capitalize">
            Just Ask Xero
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-brand-primary hover:bg-background-primary cursor-pointer rounded-[3px] px-3 py-[6px] text-[13px]/[20px] font-bold"
            onClick={() => openSubPanel("more-features")}
            type="button"
            aria-label="View more Jax features"
          >
            Settings
          </button>
          <button
            className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
            onClick={() => openPanel(null)}
            type="button"
            aria-label="Close Jax panel"
          >
            <span className="sr-only">Close</span>
            <Close fill="fill-content-secondary" />
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[420px] flex-1 flex-col items-start justify-start gap-y-4 overflow-y-auto px-3 pt-[80px] pb-36">
        <div className="zoom-in flex w-full items-start justify-end">
          <div className="max-w-[343px] rounded-xl rounded-br-[2px] bg-[#0078C8] px-3.5 py-2 text-left text-[15px]/[24px] text-white">
            <div>
              Generate a client summary for Cafe DeCashflow for a meeting
              tomorrow.
            </div>
          </div>
        </div>
        <div className="max-w-[343px] rounded-xl rounded-bl-[2px] bg-[#F2F3F4] px-3.5 py-2 text-left text-[15px]/[24px]">
          <div>
            <p>
              Your summary for Cafe DeCashflow is here. Take a look to see the
              highlights.
            </p>
            <p className="mt-4">
              <span className="font-bold">Cafe DeCashflow</span>
              <br />
              Email:{" "}
              <button className="text-action-primary underline hover:no-underline">
                contact.cafedecashflow@gmail.com
              </button>
              <br />
              Phone: +61 3 4567 8901
            </p>
            <p className="mt-4">
              <span className="font-bold">Financials</span> | Last updated:
              Today
              <br />
              Bank reconciliation status:{" "}
              <button className="text-action-primary inline-flex items-baseline gap-1.5 underline hover:no-underline">
                Up to date <ExternalLink stroke="stroke-action-primary" />
              </button>
              <br />
              Current ratio: 2.1 (Comfortable liquidity)
              <br />
              Net profit: AUD 24,000 (↓12% QoQ)
              <br />
              Revenue: AUD 120,000 (Flat vs previous quarter)
            </p>
            <p>
              Operating expenses: AUD 67,860 (↑17% QoQ)
              <br />
              Utility costs: AUD 14,200 (↑34% QoQ – primary cost driver)
            </p>
            <p className="mt-4">
              <span className="font-bold">Jobs</span> | Next due
              <br />
              <button className="text-action-primary underline hover:no-underline">
                J000211 - BAS Review – Q3
              </button>
              <br />
              Due: 28 Oct 2025
            </p>
            <ul className="list-outside list-disc pl-4">
              <li>Prepare and lodge Business Activity Statement</li>
              <li>Flagged for follow-up on rising energy costs</li>
            </ul>
            <p className="mt-4">
              <button className="text-action-primary underline hover:no-underline">
                J000253 - Q4 Forecast Planning
              </button>
              <br />
              Scheduled: 3 Nov 2025
            </p>
            <ul className="list-outside list-disc pl-4">
              <li>Evaluate impact of extended hours on margins</li>
              <li>Prepare sensitivity model for input cost increases</li>
            </ul>
            <p className="mt-4">
              <span className="font-bold">Notes</span> | Most recent
              <br />
              <button className="text-action-primary underline hover:no-underline">
                Expanded operating hours
              </button>
              <br />
              25 Jun 2025
            </p>
            <ul className="list-outside list-disc pl-4">
              <li>
                Client confirmed expansion to evening shifts to meet wholesale
                demand
              </li>
              <li>
                Expressed concern over rising power bills and potential cash
                flow tightness
              </li>
            </ul>
            <p className="mt-4">
              <button className="text-action-primary underline hover:no-underline">
                FY26 engagement review
              </button>
              <br />
              14 Feb 2025
            </p>
            <ul className="list-outside list-disc pl-4">
              <li>New contract secured with regional distributor</li>
              <li>Plans to onboard part-time staff beginning March</li>
            </ul>
            <p className="mt-4 font-bold">Sources</p>
            <ul className="list-outside list-disc pl-4 text-[#0078C8]">
              <li>
                <button className="text-action-primary underline hover:no-underline">
                  More client details via client record
                </button>
              </li>
              <li>
                <button className="text-action-primary underline hover:no-underline">
                  More financials data via business snapshot
                </button>
              </li>
              <li>
                <button className="text-action-primary underline hover:no-underline">
                  All jobs for J&apos;s Cupcake company
                </button>
              </li>
              <li>
                <button className="text-action-primary underline hover:no-underline">
                  All notes for J&apos;s Cupcake company
                </button>
              </li>
            </ul>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="24"
            fill="none"
            className="mt-2"
          >
            <path
              fill="#404756"
              d="M17.2 8.4c.4 0 .8.4.8.873v7.855c0 .436-.4.872-.8.872h-8c-.4 0-.8-.436-.8-.872l.008-7.855C8.4 8.837 8.8 8.401 9.2 8.4zm-8 8.801h8v-8h-8zM14.8 6c.4 0 .8.4.8.873V7.6h-.8v-.727h-8V14.8l.8.014v.786h-.8c-.4 0-.8-.4-.8-.785V6.873C5.992 6.437 6.615 6 6.8 6z"
            ></path>
            <g
              stroke="#404756"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              clipPath="url(#a)"
            >
              <path d="M44.125 12.276h.6c.5 0 .9.4.9.9s-.4.9-.9.9h-.6"></path>
              <path d="M44.125 15.873h.15c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-.15m.002-1.798h.35c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-3l.05-.1c.5-.85.8-1.85.85-2.9.05-.35-.1-.65-.4-.85-.2-.15-.4-.15-.65-.1s-.45.2-.55.4c-1.02 1.785-1.699 4.035-3.45 5.3h-1.2m8 3.65h-.35c.55 0 .95.45.85 1-.05.45-.45.75-.9.75h-3.25c-.2 0-.45 0-.65-.05l-2.65-.45h-1.05m-.002-5.75h-1.75v6.25h1.75z"></path>
            </g>
            <g
              stroke="#404756"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              clipPath="url(#b)"
            >
              <path d="M72.125 11.724h.6c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-.6"></path>
              <path d="M72.125 8.127h.15c.5 0 .9.4.9.9s-.4.9-.9.9h-.15m.002 1.798h.35c.5 0 .9.4.9.9s-.4.9-.9.9h-3l.05.1c.5.85.8 1.85.85 2.9.05.35-.1.65-.4.85-.2.15-.4.15-.65.1a.77.77 0 0 1-.55-.4c-1.02-1.785-1.699-4.035-3.45-5.3h-1.2m8-3.65h-.35c.55 0 .95-.45.85-1-.05-.45-.45-.75-.9-.75h-3.25c-.2 0-.45 0-.65.05l-2.65.45h-1.05m-.002 5.75h-1.75v-6.25h1.75z"></path>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M34 18h12V6H34z"></path>
              </clipPath>
              <clipPath id="b">
                <path fill="#fff" d="M62 6h12v12H62z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="fixed right-0 bottom-px flex w-screen flex-col bg-white md:w-[400px]">
        <div className="relative mx-5 my-3">
          <span className="jax-input absolute inset-0 flex" />
          <div className="relative z-10 flex items-end gap-3 rounded-[20px] border border-[#3CDCFA] bg-white pr-2 pl-4 text-[15px]/[24px]">
            <input
              className="placeholder:text-content-secondary w-full bg-transparent py-2 text-[#000] outline-none"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Enter your message..."
              aria-label="Enter your message to Jax AI assistant"
              type="text"
              value={inputValue}
            />
            <button
              className="group mb-2.5 flex-none"
              type="button"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9.5"
                  className="stroke-[#59606D] group-hover:fill-[#0078C8] group-hover:stroke-[#0078C8] group-data-[thinking=true]:fill-[#0078C8] group-data-[thinking=true]:stroke-[#0078C8]"
                  transform="rotate(90 10 10)"
                ></circle>
                <path
                  className="stroke-[#59606D] group-hover:stroke-white group-data-[thinking=true]:stroke-white"
                  strokeLinecap="round"
                  d="M13.571 9.286 10 5.714m0 0L6.428 9.286M10 5.714v8.572"
                ></path>
              </svg>
            </button>
          </div>
          <span className="jax-bg absolute top-0 right-5 bottom-0 left-5 z-0 block rounded-[20px] opacity-100" />
        </div>
        <p className="mt-2 mb-4 text-center text-[11px]/[16px] text-[#404756]">
          JAX can make mistakes. Outputs are not financial, tax or legal advice.
          <br />
          Review{" "}
          <button type="button" className="underline hover:no-underline">
            JAX disclaimer
          </button>{" "}
          |{" "}
          <span className="inline-flex items-center gap-1">
            <button type="button" className="underline hover:no-underline">
              JAX Terms
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
            >
              <path
                fill="#404756"
                fillRule="evenodd"
                d="M1.01 2.09C1 1.546 1.5 1 2 1h5v1H2v10h10V7h1v4.91c0 .544-.5 1.09-1 1.09H2c-.5 0-1-.546-1-1.09zm9.24.16L9 1h4v4l-1.25-1.25L8 7.5 6.5 6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </p>
      </div>

      {/* General Settings Sub-Panel */}
      {/* {activeSubPanel === "more-features" && (
        <SlidingSubPanel title="Just Ask Xero">
          <article className="px-5 py-5 text-[15px]/[24px]">
            <h1 className="text-[21px]/[32px] font-bold">More features</h1>
            <h2 className="mb-2 mt-5 text-[17px]/[28px] font-bold">
              Just Ask Xero wherever you are
            </h2>
            <p className="mb-2">
              Driven by advanced generative AI and securely linked to your Xero
              data.
            </p>
            <button
              className="flex items-center gap-2 text-brand-primary"
              type="button"
            >
              Frequently asked questions
              <ExternalLink stroke="stroke-brand-primary" />
            </button>
            <h2 className="mb-2 mt-5 text-[17px]/[28px] font-bold">Email</h2>
            <p className="mb-2">
              Forward your email conversations to Xero and they’ll be
              automatically turned into a quote or an invoice.
            </p>
            <input
              className="w-full rounded-[3px] border border-[#A6A9B0] px-4 py-2 text-[rgba(0,10,30,0.65)]"
              type="text"
              defaultValue="jax.oz73-s.krxwiyal9h9zn5zo@xero.com"
            />
            <button
              className="py-[6px] font-bold text-brand-primary"
              type="button"
            >
              Register my number
            </button>
            <h2 className="mb-2 mt-5 text-[17px]/[28px] font-bold">
              Chat via SMS or Whatsapp
            </h2>
            <p className="mb-2">
              Send Xero an SMS or Whatsapp message to create or update a draft
              quote or invoice.
            </p>
            <button
              className="rounded-[3px] bg-brand-primary px-4 py-2 text-[15px]/[24px] font-bold text-white"
              type="button"
            >
              Register my number
            </button>
          </article>
        </SlidingSubPanel>
      )} */}
    </>
  );
}
