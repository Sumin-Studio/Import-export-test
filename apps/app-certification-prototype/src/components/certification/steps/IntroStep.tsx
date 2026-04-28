import type { MockApp } from "@/lib/mock/app";

export default function IntroStep({
  app,
  fromLabel,
}: {
  app: MockApp;
  fromLabel: string | null;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ai-surface text-ai-accent">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M12 3l1.8 5.6h5.9l-4.8 3.5 1.8 5.6L12 14.2l-4.7 3.5 1.8-5.6-4.8-3.5h5.9L12 3z"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[22px] font-bold text-content-primary">
            Get {app.name} certified, the fast way
          </div>
          <div className="mt-2 text-[14px] text-content-secondary">
            We&apos;ll analyse your app&apos;s public information and pre-fill
            most of the certification form for you. You&apos;ll only need to
            review and edit what we got wrong.
          </div>
          {fromLabel && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-action-tertiary px-3 py-1 text-[12px] font-bold text-action-primary">
              Coming from: {fromLabel}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-lg border border-border-secondary bg-white p-5 sm:grid-cols-3">
        <EligibilityStat
          label="App age"
          value="~22 months"
          sub="Created 2024 Jul 14"
        />
        <EligibilityStat
          label="Connections"
          value={`${app.connections} of ${app.maxConnections}`}
          sub="Currently on Starter plan"
        />
        <EligibilityStat
          label="Scopes requested"
          value={`${app.scopes.length}`}
          sub="Including offline_access"
        />
      </div>

      <div>
        <div className="mb-3 text-[14px] font-bold text-content-primary">
          What we&apos;ll analyse
        </div>
        <ul className="mb-4 grid grid-cols-1 gap-2 text-[13px] text-content-secondary sm:grid-cols-2">
          <li>• Your company website ({app.companyUrl})</li>
          <li>• Your privacy policy and terms</li>
          <li>• Your Xero app registration and scopes</li>
          <li>• Public changelogs and help docs (if we can find them)</li>
        </ul>
        <div className="rounded border border-border-secondary bg-background-primary/40 p-4 text-[12px] text-content-secondary">
          We do not call your API, read customer data, or share anything
          externally. You&apos;ll review every suggestion before submitting.
        </div>
      </div>
    </div>
  );
}

function EligibilityStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-content-secondary">
        {label}
      </div>
      <div className="text-[18px] font-bold text-content-primary">{value}</div>
      <div className="text-[12px] text-content-secondary">{sub}</div>
    </div>
  );
}
