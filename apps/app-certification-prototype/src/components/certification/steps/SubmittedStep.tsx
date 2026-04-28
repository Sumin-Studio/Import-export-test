"use client";

import type { MockApp } from "@/lib/mock/app";

export default function SubmittedStep({ app }: { app: MockApp }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-positive/15">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(0 138 62)"
            strokeWidth="2"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[22px] font-bold text-content-primary">
            Submitted for certification
          </div>
          <div className="mt-1 text-[14px] text-content-secondary">
            Thanks! Your submission for <strong>{app.name}</strong> is in our
            queue. We&apos;ll email you at each stage.
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border-secondary bg-white p-5">
        <div className="mb-3 text-[14px] font-bold">What happens next</div>
        <ol className="flex flex-col gap-4">
          <TimelineStep
            number={1}
            active
            title="AI pre-review"
            detail="Our reviewer assistant checks your submission against the certification checkpoints and flags anything that needs attention. Usually within 24 hours."
          />
          <TimelineStep
            number={2}
            title="Human reviewer"
            detail="If anything is flagged — or your app is a VIP/exception case — a Xero reviewer will pick it up and get in touch if they need more information."
          />
          <TimelineStep
            number={3}
            title="Decision"
            detail="You'll receive an email with the outcome. Once certified, you'll unlock the Core plan and appear as trusted to Xero customers."
          />
        </ol>
      </div>
    </div>
  );
}

function TimelineStep({
  number,
  title,
  detail,
  active = false,
}: {
  number: number;
  title: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
          active
            ? "bg-action-primary text-white"
            : "bg-background-tertiary text-content-secondary"
        }`}
      >
        {number}
      </div>
      <div>
        <div className="text-[14px] font-bold">{title}</div>
        <div className="text-[13px] text-content-secondary">{detail}</div>
      </div>
    </li>
  );
}
