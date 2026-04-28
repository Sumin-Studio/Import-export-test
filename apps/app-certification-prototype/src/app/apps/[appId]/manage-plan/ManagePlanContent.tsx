"use client";

import type { MockApp } from "@/lib/mock/app";
import { useCertStatus } from "@/lib/certification/status";
import { Button } from "@/components/form";
import { CertificationLauncher } from "@/components/certification";

export default function ManagePlanContent({ app }: { app: MockApp }) {
  const status = useCertStatus(app.id);
  const isCertified = status === "certified";
  const isSubmitted = status === "pending" || status === "in-review";

  return (
    <div className="flex flex-col gap-6">
      {!isCertified && (
        <div className="flex items-center gap-4 rounded-lg bg-[linear-gradient(90deg,#E8F4FF_0%,#F2F3F4_100%)] p-5">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="text-[16px] font-bold">
                {isSubmitted
                  ? "Your certification submission is being reviewed"
                  : "Hey, you're almost there!"}
              </div>
              {!isSubmitted && (
                <div className="h-2 w-40 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-action-primary"
                    style={{ width: "66%" }}
                  />
                </div>
              )}
            </div>
            <div className="mt-1 text-[13px] text-content-secondary">
              {isSubmitted
                ? "We'll email you with the outcome. You can view your submission below."
                : "Complete certification to unlock more connections and XCI status."}
            </div>
          </div>
          <CertificationLauncher
            app={app}
            fromLabel={
              isSubmitted ? null : "Manage plan → Complete certification"
            }
          >
            {(open) => (
              <button
                type="button"
                onClick={open}
                className="inline-flex h-10 shrink-0 items-center rounded bg-action-primary px-4 text-[14px] font-bold text-white hover:bg-action-secondary"
              >
                {isSubmitted ? "View submission" : "Complete certification"}
              </button>
            )}
          </CertificationLauncher>
        </div>
      )}

      {isCertified && (
        <div className="flex items-center gap-4 rounded-lg border border-positive/30 bg-positive/5 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-positive/15">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="rgb(0 138 62)"
              strokeWidth="2"
            >
              <path
                d="M4 10.5L8 14.5L16 5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-bold text-content-primary">
              This app is certified
            </div>
            <div className="text-[13px] text-content-secondary">
              Your app is a Xero Certified Integration (XCI).
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border-secondary bg-white p-5 text-[14px] text-content-secondary">
        You&apos;re on the <strong>Starter plan</strong>. Certified apps get
        access to the Core plan and higher connection limits.
      </div>

      <section>
        <div className="mb-2 text-[16px] font-bold">Upgrade to the next plan</div>
        <div className="flex items-center justify-between rounded-lg border border-border-secondary bg-white p-6">
          <div className="flex-1">
            <div className="text-[18px] font-bold">Core plan</div>
            <ul className="mt-2 flex flex-col gap-1 text-[14px] text-content-secondary">
              <li>• Up to 50 connections</li>
              <li>• 10 GB of data egress</li>
              <li>• Increased rate limits</li>
            </ul>
            <div className="mt-4 text-[14px]">
              <span className="text-[24px] font-bold">$25</span>
              <span className="ml-1 text-content-secondary">USD / month</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              disabled={!isCertified}
              title={isCertified ? "" : "Complete certification to unlock"}
            >
              Buy
            </Button>
            <button className="text-[13px] font-bold text-action-primary hover:underline">
              Learn more
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2 text-[16px] font-bold">Other options</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <OtherOption
            app={app}
            title="Financial services partner"
            desc="Connect your banking, payments, lending or insurance app to our APIs."
            actionLabel="Apply"
            fromLabel="Financial services partner application"
          />
          <OtherOption
            app={app}
            title="Advanced plan features"
            desc="Journals endpoint, Xero Practice Manager API, bulk connections."
            actionLabel="Request access"
            fromLabel="Advanced plan features request"
          />
          <OtherOption
            app={app}
            title="Building for internal use"
            desc="Accountants, franchises, and corporate groups need to register internal-only apps."
            actionLabel="Get in touch"
            fromLabel="Internal-use registration"
          />
        </div>
      </section>
    </div>
  );
}

function OtherOption({
  app,
  title,
  desc,
  actionLabel,
  fromLabel,
}: {
  app: MockApp;
  title: string;
  desc: string;
  actionLabel: string;
  fromLabel: string;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-border-secondary bg-white p-5">
      <div className="flex-1">
        <div className="mb-1 text-[15px] font-bold">{title}</div>
        <div className="text-[13px] text-content-secondary">{desc}</div>
      </div>
      <CertificationLauncher app={app} fromLabel={fromLabel}>
        {(open) => (
          <button
            type="button"
            onClick={open}
            className="mt-4 inline-flex h-9 items-center self-start rounded border border-action-primary bg-white px-3 text-[13px] font-bold text-action-primary hover:bg-action-tertiary"
          >
            {actionLabel}
          </button>
        )}
      </CertificationLauncher>
    </div>
  );
}
