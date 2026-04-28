"use client";

import type { MockApp } from "@/lib/mock/app";
import type { CertificationFormValues } from "@/lib/certification/schema";
import type { SuggestionState } from "@/components/ai";

export default function ReviewStep({
  app,
  values,
  setValues,
  states,
}: {
  app: MockApp;
  values: CertificationFormValues;
  setValues: (v: Partial<CertificationFormValues>) => void;
  states: Record<string, SuggestionState>;
}) {
  const statesList = Object.values(states);
  const accepted = statesList.filter((s) => s === "accepted").length;
  const edited = statesList.filter((s) => s === "edited").length;
  const dismissed = statesList.filter((s) => s === "dismissed").length;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-[22px] font-bold text-content-primary">
          Review &amp; submit
        </div>
        <div className="mt-1 text-[14px] text-content-secondary">
          {accepted} AI suggestion{accepted === 1 ? "" : "s"} accepted,{" "}
          {edited} edited, {dismissed} dismissed.
        </div>
      </div>

      <SummaryCard title="About your app">
        <Row label="App purpose" value={values.appPurpose} />
        <Row label="Use cases" value={values.useCases.join(", ") || "—"} />
      </SummaryCard>

      <SummaryCard title="Access & scopes">
        <Row
          label="offline_access"
          value={values.offlineAccess ?? "Not answered"}
        />
        <div className="border-t border-border-secondary pt-3">
          <div className="mb-2 text-[12px] font-bold uppercase tracking-wide text-content-secondary">
            Scope justifications
          </div>
          <ul className="flex flex-col gap-2">
            {app.scopes.map((scope) => (
              <li key={scope.id}>
                <div className="text-[13px] font-bold">{scope.label}</div>
                <div className="text-[13px] text-content-secondary">
                  {values.scopeJustifications[scope.id] || "—"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SummaryCard>

      <SummaryCard title="User experience">
        <Row
          label="Disconnect button"
          value={values.hasDisconnectButton ?? "Not answered"}
        />
        {values.disconnectLocation && (
          <Row label="Location" value={values.disconnectLocation} />
        )}
        <Row
          label="Shows errors to users"
          value={values.presentsErrorsToUsers ?? "Not answered"}
        />
        {values.errorExample && (
          <Row label="Example" value={values.errorExample} />
        )}
      </SummaryCard>

      <SummaryCard title="AI & data handling">
        <Row label="Uses AI/bots" value={values.usesAiOrBots ?? "Not answered"} />
        {values.usesAiOrBots === "yes" && (
          <>
            <Row label="LLM(s)" value={values.aiLlm || "—"} />
            <Row label="Purpose" value={values.aiPurpose || "—"} />
            <Row label="Where used" value={values.aiWhere || "—"} />
            <Row label="Data used" value={values.aiDataUsed || "—"} />
            <Row
              label="Xero data handling"
              value={values.aiXeroDataHandling || "—"}
            />
          </>
        )}
        {values.questionsForTeam && (
          <Row
            label="Questions for the team"
            value={values.questionsForTeam}
          />
        )}
      </SummaryCard>

      <div className="rounded-lg border border-border-secondary bg-white p-5">
        <label className="flex items-start gap-3 text-[14px]">
          <input
            type="checkbox"
            checked={values.meetsCheckpoints}
            onChange={(e) =>
              setValues({ meetsCheckpoints: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 accent-action-primary"
          />
          <span>
            I confirm that {app.name} meets the{" "}
            <a
              href="#"
              className="text-action-primary hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Xero certification checkpoints
            </a>
            , including security, user experience, and data handling
            requirements.
          </span>
        </label>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border-secondary bg-white p-5">
      <div className="mb-3 text-[16px] font-bold">{title}</div>
      <div className="flex flex-col gap-3 text-[14px]">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[180px_1fr] sm:gap-4">
      <div className="text-[12px] font-bold uppercase tracking-wide text-content-secondary">
        {label}
      </div>
      <div className="whitespace-pre-wrap text-content-primary">{value}</div>
    </div>
  );
}
