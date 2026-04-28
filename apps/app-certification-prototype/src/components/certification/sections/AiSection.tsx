"use client";

import type { AnalysisOutput } from "@/lib/mock/analysis";
import type { CertificationFormValues } from "@/lib/certification/schema";
import { FieldSuggestion, type SuggestionState } from "@/components/ai";
import { Field, RadioGroup, TextInput, Textarea } from "@/components/form";

export default function AiSection({
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
        label="Does your app use AI or bots?"
        suggestion={analysis.usesAiOrBots}
        state={states.usesAiOrBots ?? "suggested"}
        onStateChange={(s) => {
          setState("usesAiOrBots", s);
          if (s === "suggested" || s === "accepted")
            setValues({ usesAiOrBots: analysis.usesAiOrBots.value });
          if (s === "dismissed") setValues({ usesAiOrBots: null });
        }}
      >
        <RadioGroup
          name="usesAiOrBots"
          value={values.usesAiOrBots ?? ""}
          onChange={(v) => {
            setValues({ usesAiOrBots: v as "yes" | "no" });
            if (v !== analysis.usesAiOrBots.value)
              setState("usesAiOrBots", "edited");
          }}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </FieldSuggestion>

      {values.usesAiOrBots === "yes" && (
        <>
          <FieldSuggestion
            label="What LLM(s) are you using?"
            suggestion={analysis.aiLlm}
            state={states.aiLlm ?? "suggested"}
            onStateChange={(s) => {
              setState("aiLlm", s);
              if (s === "suggested" || s === "accepted")
                setValues({ aiLlm: analysis.aiLlm.value });
              if (s === "dismissed") setValues({ aiLlm: "" });
            }}
          >
            <TextInput
              value={values.aiLlm}
              onChange={(e) => {
                setValues({ aiLlm: e.target.value });
                if (e.target.value !== analysis.aiLlm.value)
                  setState("aiLlm", "edited");
              }}
            />
          </FieldSuggestion>

          <FieldSuggestion
            label="What do the AI/bots do?"
            suggestion={analysis.aiPurpose}
            state={states.aiPurpose ?? "suggested"}
            onStateChange={(s) => {
              setState("aiPurpose", s);
              if (s === "suggested" || s === "accepted")
                setValues({ aiPurpose: analysis.aiPurpose.value });
              if (s === "dismissed") setValues({ aiPurpose: "" });
            }}
          >
            <Textarea
              rows={3}
              value={values.aiPurpose}
              onChange={(e) => {
                setValues({ aiPurpose: e.target.value });
                if (e.target.value !== analysis.aiPurpose.value)
                  setState("aiPurpose", "edited");
              }}
            />
          </FieldSuggestion>

          <FieldSuggestion
            label="Are they used in development, core product, or both?"
            suggestion={analysis.aiWhere}
            state={states.aiWhere ?? "suggested"}
            onStateChange={(s) => {
              setState("aiWhere", s);
              if (s === "suggested" || s === "accepted")
                setValues({ aiWhere: analysis.aiWhere.value });
              if (s === "dismissed") setValues({ aiWhere: "" });
            }}
          >
            <TextInput
              value={values.aiWhere}
              onChange={(e) => {
                setValues({ aiWhere: e.target.value });
                if (e.target.value !== analysis.aiWhere.value)
                  setState("aiWhere", "edited");
              }}
            />
          </FieldSuggestion>

          <FieldSuggestion
            label="What data do they use?"
            suggestion={analysis.aiDataUsed}
            state={states.aiDataUsed ?? "suggested"}
            onStateChange={(s) => {
              setState("aiDataUsed", s);
              if (s === "suggested" || s === "accepted")
                setValues({ aiDataUsed: analysis.aiDataUsed.value });
              if (s === "dismissed") setValues({ aiDataUsed: "" });
            }}
          >
            <Textarea
              rows={3}
              value={values.aiDataUsed}
              onChange={(e) => {
                setValues({ aiDataUsed: e.target.value });
                if (e.target.value !== analysis.aiDataUsed.value)
                  setState("aiDataUsed", "edited");
              }}
            />
          </FieldSuggestion>

          <FieldSuggestion
            label="How is Xero user data handled?"
            suggestion={analysis.aiXeroDataHandling}
            state={states.aiXeroDataHandling ?? "suggested"}
            onStateChange={(s) => {
              setState("aiXeroDataHandling", s);
              if (s === "suggested" || s === "accepted")
                setValues({
                  aiXeroDataHandling: analysis.aiXeroDataHandling.value,
                });
              if (s === "dismissed") setValues({ aiXeroDataHandling: "" });
            }}
          >
            <Textarea
              rows={3}
              value={values.aiXeroDataHandling}
              onChange={(e) => {
                setValues({ aiXeroDataHandling: e.target.value });
                if (e.target.value !== analysis.aiXeroDataHandling.value)
                  setState("aiXeroDataHandling", "edited");
              }}
            />
          </FieldSuggestion>
        </>
      )}

      <div className="rounded-lg border border-border-secondary bg-white p-4">
        <Field label="Anything else you'd like our team to know? (optional)">
          <Textarea
            rows={3}
            value={values.questionsForTeam}
            onChange={(e) => setValues({ questionsForTeam: e.target.value })}
            placeholder="Context, questions, or anything unusual about your app."
          />
        </Field>
      </div>
    </div>
  );
}
