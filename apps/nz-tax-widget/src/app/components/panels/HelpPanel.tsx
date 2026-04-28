"use client";

import {
  ExternalLink,
  Close,
  Search,
  Chevron,
} from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { SlidingSubPanel } from "@/app/components/global/SlidingSubPanel";
import { useRegion } from "@/app/contexts/RegionContext";

export default function HelpPanel() {
  const { activeSubPanel, openSubPanel, openPanel } = useNavigation();
  const { region } = useRegion();

  // Article data structure to eliminate repetition
  const helpArticles = [
    {
      id: "add-user",
      title: `Add a new user to your ${
        region === "USA" ? "organization" : "organisation"
      }`,
      description: `Add a new user or your accountant to your ${
        region === "USA" ? "organization" : "organisation"
      }, free of charge. ... The invited user is sent an invite that they need to accept or decline. ... The invite expires after 14 days, but you can...`,
      onClick: "add-user",
    },
    {
      id: "overpayment",
      title: "Record an overpaymement",
      description:
        "Record an overpayment transaction if your customer accidentally pays you too much, or you overpay a supplier. ... Create an overpayment in your bank account, during bank reconciliation, or from any...",
    },
    {
      id: "invoice-template",
      title: "Create an invoice template",
      description:
        "Customise the appearance and the information included in your invoices, quotes, customer credit notes, customer statements, and purchase orders. ... Create, copy or edit an invoice template and the...",
    },
    {
      id: "refund",
      title: "Process a customer or supplier refund",
      description:
        "Record a customer or supplier refund on a credit note, overpayment or prepayment. ... Reconcile a refund against a bank statement line. ... If you don't want to issue or receive a refund, you can a...",
    },
    {
      id: "supplier-credit",
      title: "Add a supplier credit note",
      description:
        "Add a credit note to reduce the amount you owe your supplier, or record a refund received from a supplier. ... You need the adviser, standard, invoice only + approve & pay, or invoice only + purcha...",
    },
  ];

  const renderArticleItem = (article: (typeof helpArticles)[0]) => (
    <li key={article.id}>
      <button
        className="group border-border-primary hover:bg-background-primary flex cursor-pointer items-start gap-3 border-b px-5 py-2 text-left"
        type="button"
        onClick={() => article.onClick && openSubPanel(article.onClick)}
      >
        <div>
          <h4 className="my-2 text-[15px]/[20px] font-bold">{article.title}</h4>
          <p className="mb-2 text-[13px]/[20px] text-[#404756]">
            {article.description}
          </p>
        </div>
        <div className="group-hover:bg-content-secondary/5 flex size-10 flex-none -rotate-90 items-center justify-center rounded-full">
          <Chevron fill="fill-content-secondary" />
        </div>
      </button>
    </li>
  );

  return (
    <>
      <div className="border-border-primary relative flex items-center justify-between gap-2 border-b py-3 pr-3 pl-5">
        <h2 className="text-[17px]/[28px] font-bold capitalize">Help</h2>
        <button
          className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => openPanel(null)}
          type="button"
        >
          <span className="sr-only">Close</span>
          <Close fill="fill-content-secondary" />
        </button>
      </div>
      <div className="border-border-primary absolute top-16 left-0 flex w-full items-center gap-3 border-b px-5 py-3">
        <div className="flex w-full items-center justify-between gap-3 rounded-md border border-[#A6A9B0] px-3">
          <Search className="fill-faint flex-none" />
          <input
            className="text-content-secondary placeholder:text-content-secondary h-10 w-full border-none bg-transparent text-[15px]/[20px] outline-none"
            placeholder="Search support articles"
            aria-label="Search support articles"
            type="text"
          />
        </div>
      </div>
      <div className="absolute top-33 bottom-14 w-screen overflow-y-scroll scroll-smooth bg-white md:w-[400px]">
        <div className="pt-3">
          <h3 className="mx-5 my-2 text-[11px]/[16px] font-bold uppercase">
            Recommended articles
          </h3>
          <ul>{helpArticles.map(renderArticleItem)}</ul>
        </div>
      </div>
      <div className="border-border-primary fixed right-0 bottom-0 flex w-screen flex-col border-t bg-white py-3 md:w-[400px]">
        <button
          className="hover:bg-background-primary text-content-primary flex h-10 w-full items-center justify-between px-5 text-left text-[15px]/[24px]"
          type="button"
          aria-label="Go to Xero Central (opens in new window)"
        >
          Go to Xero Central
          <div className="flex size-10 items-center justify-center">
            <ExternalLink
              stroke="stroke-current"
              className="size-3"
              aria-hidden="true"
            />
          </div>
        </button>
        <button
          className="hover:bg-background-primary text-content-primary flex h-10 w-full items-center justify-between px-5 text-left text-[15px]/[24px]"
          type="button"
          aria-label="Go to Partner Central (opens in new window)"
        >
          Go to Partner Central
          <div className="flex size-10 items-center justify-center">
            <ExternalLink
              stroke="stroke-current"
              className="size-3"
              aria-hidden="true"
            />
          </div>
        </button>
        <button
          className="hover:bg-background-primary text-content-primary flex h-10 w-full items-center justify-between px-5 text-left text-[15px]/[24px]"
          type="button"
          aria-label="Contact support (opens in new window)"
        >
          Contact support
          <div className="flex size-10 items-center justify-center">
            <ExternalLink
              stroke="stroke-current"
              className="size-3"
              aria-hidden="true"
            />
          </div>
        </button>
        <div className="bg-border-primary my-[10px] h-px w-full" />
        <button
          className="hover:bg-background-primary text-content-primary flex h-10 w-full items-center gap-4 px-5 text-left text-[15px]/[24px]"
          type="button"
          aria-label="Invite support"
        >
          <svg
            className="size-3"
            fill="currentColor"
            viewBox="0 0 12 12"
            aria-hidden="true"
          >
            <path d="M6 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM6 7.5c-2.21 0-4 1.34-4 3v1.5h8V10.5c0-1.66-1.79-3-4-3Z" />
          </svg>
          Invite support
        </button>
      </div>

      {/* General Settings Sub-Panel */}
      {activeSubPanel === "add-user" && (
        <SlidingSubPanel title="Help">
          <article className="px-5 pt-5 pb-[64px] text-[15px]/[24px]">
            <h1 className="text-[21px]/[32px] font-bold">
              Add a new user to your{" "}
              {region === "USA" ? "organization" : "organisation"}
            </h1>
            <h2 className="mt-5 mb-2 text-[17px]/[28px] font-bold">
              Invite a new user
            </h2>
            <p className="mb-5">
              To add new users to your{" "}
              {region === "USA" ? "organization" : "organisation"},{" "}
              <button
                className="text-brand-primary underline underline-offset-2 hover:no-underline"
                type="button"
              >
                your user role
              </button>{" "}
              needs to include the manage users permission. It&apos;s free of
              charge to add users, including your accountant, to your{" "}
              {region === "USA" ? "organization" : "organisation"}.
            </p>
            <p className="mb-5">
              If you need to{" "}
              <button
                className="text-brand-primary underline underline-offset-2 hover:no-underline"
                type="button"
              >
                invite an employee into Xero Me
              </button>
              , do this from the Payroll screen instead.
            </p>
            <ol className="mb-5 ml-5 list-outside list-decimal">
              <li>
                Click on the Fast Movers Inc., select<strong> Settings</strong>,
                then click<strong> Users</strong>.
              </li>
              <li>
                Click <strong>Invite a user</strong>.
              </li>
              <li>
                Enter the new user&apos;s first name, last name and email
                address. The email address you send the invite to will be the
                user&apos;s login email address.
              </li>
              <li>
                Select which features you want them to access, and a user role
                for each feature.
              </li>
              <li>
                (Optional) Click <strong>Add a message</strong>, then enter an
                email message. You can include a link to our support article on
                how to
                <button
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                  type="button"
                >
                  accept or decline a Xero invite
                </button>
                .
              </li>
              <li>
                Click <strong>Send invite</strong>.
              </li>
            </ol>
            <p>
              The new user must accept the invite within 14 days, or the link
              will no longer work.
            </p>
            <h2 className="mt-5 mb-2 text-[17px]/[28px] font-bold">
              Invite a new user
            </h2>
            <p className="mb-5">
              If an invite isn&apos;t accepted within 14 days, you&apos;ll need
              to resend the user invite.
            </p>
            <ol className="mb-5 ml-5 list-outside list-decimal">
              <li>
                Click on the Fast Movers Inc., select<strong> Settings</strong>,
                then click<strong> Users</strong>.
              </li>
              <li>Click the name of the pending user.</li>
              <li>
                Click <strong>Resend invite</strong>.
              </li>
              <li>(Optional) Enter a message or use the default text.</li>
              <li>
                Click <strong>Send invite</strong>.
              </li>
            </ol>
          </article>
          <div className="fixed right-0 bottom-0 z-20 w-screen bg-white p-3 shadow-[0px_-3px_0px_0px_rgba(0,10,30,0.05),0px_-1px_0px_0px_rgba(0,10,30,0.20)] sm:w-[400px]">
            <button
              className="text-brand-primary hover:bg-background-primary flex items-center gap-2 rounded-[3px] px-3 py-[6px] text-[13px]/[20px] font-bold"
              type="button"
            >
              Open article in Xero Central
              <ExternalLink stroke="stroke-current" />
            </button>
          </div>
        </SlidingSubPanel>
      )}
    </>
  );
}
