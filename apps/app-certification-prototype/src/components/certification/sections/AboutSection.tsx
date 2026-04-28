"use client";

import type { AnalysisOutput } from "@/lib/mock/analysis";
import type { CertificationFormValues } from "@/lib/certification/schema";
import { USE_CASES } from "@/lib/certification/schema";
import { FieldSuggestion, type SuggestionState } from "@/components/ai";
import { MultiSelect, Textarea } from "@/components/form";

export default function AboutSection({
  analysis,
  values,
  setValues,
  states,
  setState,
}: {
  analysis: AnalysisOutput;
  values: CertificationFormValues;
  setValues: (v: Partial<CertificationFormValues>) => void;
  states: Record<string, SuggestionState>;
  setState: (key: string, s: SuggestionState) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <FieldSuggestion
        label="In plain English, what does this app do?"
        suggestion={analysis.appPurpose}
        state={states.appPurpose ?? "suggested"}
        onStateChange={(s) => {
          setState("appPurpose", s);
          if (s === "suggested" || s === "accepted")
            setValues({ appPurpose: analysis.appPurpose.value });
          if (s === "dismissed") setValues({ appPurpose: "" });
        }}
      >
        <Textarea
          rows={5}
          value={values.appPurpose}
          onChange={(e) => {
            setValues({ appPurpose: e.target.value });
            if (e.target.value !== analysis.appPurpose.value)
              setState("appPurpose", "edited");
          }}
          placeholder="3-5 sentences describing what problem your app solves for Xero users."
        />
      </FieldSuggestion>

      <FieldSuggestion
        label="Which use cases does your app support?"
        suggestion={analysis.useCases}
        state={states.useCases ?? "suggested"}
        onStateChange={(s) => {
          setState("useCases", s);
          if (s === "suggested" || s === "accepted")
            setValues({ useCases: analysis.useCases.value });
          if (s === "dismissed") setValues({ useCases: [] });
        }}
      >
        <MultiSelect
          values={values.useCases}
          onChange={(v) => {
            setValues({ useCases: v });
            const sameLen = v.length === analysis.useCases.value.length;
            const same =
              sameLen && v.every((x) => analysis.useCases.value.includes(x));
            if (!same) setState("useCases", "edited");
          }}
          options={USE_CASES}
          placeholder="Select use case(s)"
        />
      </FieldSuggestion>
    </div>
  );
}
