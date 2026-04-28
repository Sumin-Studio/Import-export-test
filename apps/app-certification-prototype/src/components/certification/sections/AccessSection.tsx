"use client";

import type { AnalysisOutput } from "@/lib/mock/analysis";
import type { CertificationFormValues } from "@/lib/certification/schema";
import type { MockApp } from "@/lib/mock/app";
import { FieldSuggestion, type SuggestionState } from "@/components/ai";
import { RadioGroup, Textarea } from "@/components/form";

export default function AccessSection({
  app,
  analysis,
  values,
  setValues,
  states,
  setState,
}: {
  app: MockApp;
  analysis: AnalysisOutput;
  values: CertificationFormValues;
  setValues: (v: Partial<CertificationFormValues>) => void;
  states: Record<string, SuggestionState>;
  setState: (key: string, s: SuggestionState) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border-secondary bg-white">
        <div className="border-b border-border-secondary px-4 py-3">
          <div className="text-[14px] font-bold">Requested scopes</div>
          <div className="text-[12px] text-content-secondary">
            Confirm each scope is needed. If a scope isn&apos;t actually used,
            consider removing it in Configuration.
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border-secondary">
          {app.scopes.map((scope) => {
            const suggestion = analysis.scopeJustifications[scope.id];
            const key = `scope:${scope.id}`;
            const justification =
              values.scopeJustifications[scope.id] ?? suggestion.value;
            return (
              <FieldSuggestion
                key={scope.id}
                variant="flush"
                label={scope.label}
                suggestion={suggestion}
                state={states[key] ?? "suggested"}
                onStateChange={(s) => {
                  setState(key, s);
                  if (s === "dismissed") {
                    setValues({
                      scopeJustifications: {
                        ...values.scopeJustifications,
                        [scope.id]: "",
                      },
                    });
                  }
                  if (s === "suggested" || s === "accepted") {
                    setValues({
                      scopeJustifications: {
                        ...values.scopeJustifications,
                        [scope.id]: suggestion.value,
                      },
                    });
                  }
                }}
              >
                <Textarea
                  rows={3}
                  value={justification}
                  onChange={(e) => {
                    setValues({
                      scopeJustifications: {
                        ...values.scopeJustifications,
                        [scope.id]: e.target.value,
                      },
                    });
                    if (e.target.value !== suggestion.value)
                      setState(key, "edited");
                  }}
                />
              </FieldSuggestion>
            );
          })}
        </div>
      </div>

      <FieldSuggestion
        label="Are you using offline_access?"
        suggestion={analysis.offlineAccess}
        state={states.offlineAccess ?? "suggested"}
        onStateChange={(s) => {
          setState("offlineAccess", s);
          if (s === "dismissed") setValues({ offlineAccess: null });
          if (s === "suggested" || s === "accepted")
            setValues({ offlineAccess: analysis.offlineAccess.value });
        }}
      >
        <RadioGroup
          name="offlineAccess"
          value={values.offlineAccess ?? ""}
          onChange={(v) => {
            setValues({ offlineAccess: v as "yes" | "no" });
            if (v !== analysis.offlineAccess.value)
              setState("offlineAccess", "edited");
          }}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </FieldSuggestion>
    </div>
  );
}
