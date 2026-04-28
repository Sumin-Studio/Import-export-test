"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { RobbShell } from "@/components/prototype-shell/RobbShell";

type SettingItem = { title: string; description: string; href?: string };

type SettingSection = { category: string; items: SettingItem[] };

/** Pay-to-Bank playground — Settings hub (Figma node 86-4060) */
const SECTIONS: SettingSection[] = [
  {
    category: "General",
    items: [
      {
        title: "Organisation details",
        description: "Update your organisation's name, logo, or contact information",
      },
      {
        title: "Users",
        description: "Invite new users, manage permissions, or delete current users",
      },
      {
        title: "Subscription and billing",
        description: "Update your subscription, billing information, or pricing plan",
      },
      {
        title: "Connected apps",
        description: "Add and manage the apps connected to your organisation",
      },
      {
        title: "Email settings",
        description: "Set a reply-to email address and name, or edit email templates",
      },
    ],
  },
  {
    category: "Sales",
    items: [
      {
        title: "Invoice settings",
        description:
          "Manage default settings, invoice reminders, and branding themes (templates for invoices, quotes, purchase orders etc.)",
      },
      {
        title: "Online payments",
        description: "Add and manage payment options for customers to pay you online",
        href: "/settings/online-payments",
      },
    ],
  },
  {
    category: "Purchases",
    items: [
      {
        title: "Xero to Xero",
        description:
          "Connect with customers and suppliers who use Xero to exchange invoices and bills directly",
      },
      {
        title: "Expense settings",
        description: "Manage users, accounts for expense and mileage claims, and labels",
      },
    ],
  },
  {
    category: "Payroll",
    items: [
      {
        title: "Payroll settings",
        description: "Manage payroll account details, pay frequencies, pay items, holidays, and more",
      },
    ],
  },
  {
    category: "Accounting",
    items: [
      {
        title: "Financial settings",
        description: "Update financial year end, tax settings, lock dates, and time zone",
      },
      { title: "Currencies", description: "Manage the currencies your organisation uses" },
      {
        title: "Chart of accounts",
        description: "Manage accounts used to categorise your transactions",
      },
      {
        title: "Tracking categories",
        description: "Set up tracking categories to see how different areas of your business are performing",
      },
      {
        title: "Conversion balances",
        description: "Update the opening balances of your accounts in Xero",
      },
    ],
  },
  {
    category: "Tax",
    items: [
      { title: "Tax rates", description: "Add and manage tax rates" },
      {
        title: "Activity Statement settings",
        description: "Update your Activity Statement settings",
      },
    ],
  },
  {
    category: "Contacts",
    items: [
      {
        title: "Custom contact links",
        description: "Connect your contacts in Xero with external systems such as CRM",
      },
    ],
  },
  {
    category: "Projects",
    items: [
      {
        title: "Staff cost rates",
        description: "Manage hourly cost rate for staff",
      },
      {
        title: "Staff permissions",
        description: "Invite staff to Projects and manage their permissions",
      },
    ],
  },
];

export function SettingsMount() {
  return (
    <RobbShell showPreviewBanner>
      <div
        className="min-h-screen bg-[#f2f3f4]"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {/* Title bar — matches Sales overview */}
        <div className="relative z-20 mb-6 bg-white py-4">
          <div className="mx-auto flex max-w-full flex-col px-4 md:flex-row md:items-center md:justify-between md:px-5">
            <div className="mb-1 flex items-center gap-3.5 md:mb-0">
              <h1 className="text-[21px]/[26px] font-bold text-content-primary md:text-[24px]/[32px]">
                Settings
              </h1>
              <span className="rounded-[3px] border border-content-secondary px-1 text-[13px]/[20px] text-content-secondary">
                Prototype
              </span>
            </div>
            <div className="flex items-center gap-2" aria-hidden />
          </div>
        </div>

        <div
          className="mx-auto w-full max-w-[1164px] px-6 pb-16 text-[15px] md:px-8"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <section key={section.category} aria-labelledby={`settings-cat-${section.category}`}>
                <h2
                  id={`settings-cat-${section.category}`}
                  className="mb-2 text-[18px] font-bold leading-tight text-content-primary"
                >
                  {section.category}
                </h2>
                <div className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white">
                  <ul className="divide-y divide-[#e1e2e5]">
                    {section.items.map((item) => {
                      const rowClass =
                        "group flex w-full flex-col items-start gap-0 p-[20px] text-left transition-colors hover:bg-[#F2F3F4]";
                      const inner = (
                        <>
                          <span className="text-[15px] font-semibold leading-tight text-brand-primary transition-colors group-hover:text-brand-secondary">
                            {item.title}
                          </span>
                          <span className="text-[15px] leading-snug text-[#000A1E]">{item.description}</span>
                        </>
                      );
                      return (
                        <li key={item.title}>
                          {item.href ? (
                            <Link href={item.href} className={rowClass}>
                              {inner}
                            </Link>
                          ) : (
                            <button type="button" className={rowClass} onClick={(e) => e.preventDefault()}>
                              {inner}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-14 flex justify-center border-t border-transparent pt-6 text-center">
            <p className="text-[15px] text-content-secondary">
              Looking for user settings?{" "}
              <button
                type="button"
                className="inline-flex items-center gap-1 font-semibold text-brand-primary hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Open My Xero
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </button>
            </p>
          </footer>
        </div>
      </div>
    </RobbShell>
  );
}
