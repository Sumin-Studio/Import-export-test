"use client";

import type { MockApp } from "@/lib/mock/app";
import { useCertStatus } from "@/lib/certification/status";
import { CertificationLauncher } from "@/components/certification";

export default function CertificationBanner({ app }: { app: MockApp }) {
  const status = useCertStatus(app.id);
  const isCertified = status === "certified";
  const isSubmitted = status === "pending" || status === "in-review";

  if (isCertified) return null;

  return (
    <div className="mb-6 rounded-lg border border-border-secondary bg-white">
      <div className="flex items-start gap-4 p-6">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
          style={{ background: "rgb(231 246 254)" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(0 120 200)"
            strokeWidth="1.5"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 9h10M7 13h6" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-bold text-content-primary">
            {isSubmitted
              ? "Certification submitted"
              : "Ready for certification?"}
          </div>
          <div className="mt-1 text-[14px] text-content-secondary">
            {isSubmitted
              ? "We'll email you with the outcome. You can view your submission below."
              : "Submit your app for certification to unlock more connections and appear as trusted to Xero customers."}
          </div>
        </div>
        <CertificationLauncher app={app}>
          {(open) => (
            <button
              type="button"
              onClick={open}
              className="inline-flex h-10 shrink-0 items-center self-center rounded border border-action-primary bg-white px-4 text-[14px] font-bold text-action-primary hover:bg-action-tertiary"
            >
              {isSubmitted ? "View submission" : "Start certification"}
            </button>
          )}
        </CertificationLauncher>
      </div>
    </div>
  );
}
