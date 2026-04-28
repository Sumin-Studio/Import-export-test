"use client";

import type { AnalysisOutput } from "@/lib/mock/analysis";
import type { CertificationFormValues } from "@/lib/certification/schema";
import { FieldSuggestion, type SuggestionState } from "@/components/ai";
import {
  RadioGroup,
  ScreenshotUpload,
  TextInput,
  Textarea,
} from "@/components/form";

export default function UxSection({
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
        label="Does your app have a disconnect button?"
        suggestion={analysis.hasDisconnectButton}
        state={states.hasDisconnectButton ?? "suggested"}
        onStateChange={(s) => {
          setState("hasDisconnectButton", s);
          if (s === "suggested" || s === "accepted")
            setValues({
              hasDisconnectButton: analysis.hasDisconnectButton.value,
              disconnectLocation: analysis.disconnectLocation.value,
            });
          if (s === "dismissed")
            setValues({
              hasDisconnectButton: null,
              disconnectLocation: "",
              disconnectScreenshots: [],
            });
        }}
      >
        <div className="flex flex-col gap-3">
          <RadioGroup
            name="hasDisconnectButton"
            value={values.hasDisconnectButton ?? ""}
            onChange={(v) => {
              setValues({ hasDisconnectButton: v as "yes" | "no" });
              if (v !== analysis.hasDisconnectButton.value)
                setState("hasDisconnectButton", "edited");
            }}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <div>
            <div className="mb-1 text-[12px] font-bold text-content-secondary">
              Where in your UI is it?
            </div>
            <TextInput
              value={values.disconnectLocation}
              onChange={(e) => {
                setValues({ disconnectLocation: e.target.value });
                if (e.target.value !== analysis.disconnectLocation.value)
                  setState("hasDisconnectButton", "edited");
              }}
            />
          </div>
          <ScreenshotUpload
            label="Screenshots showing the disconnect button"
            hint="Upload screenshots of the disconnect button in your UI to help reviewers verify."
            value={values.disconnectScreenshots}
            onChange={(next) => {
              setValues({ disconnectScreenshots: next });
              if (next.length > 0)
                setState("hasDisconnectButton", "edited");
            }}
          />
        </div>
      </FieldSuggestion>

      <FieldSuggestion
        label="Does your app present errors to users so they can fix them?"
        suggestion={analysis.presentsErrorsToUsers}
        state={states.presentsErrorsToUsers ?? "suggested"}
        onStateChange={(s) => {
          setState("presentsErrorsToUsers", s);
          if (s === "suggested" || s === "accepted")
            setValues({
              presentsErrorsToUsers: analysis.presentsErrorsToUsers.value,
              errorExample: analysis.errorExample.value,
            });
          if (s === "dismissed")
            setValues({
              presentsErrorsToUsers: null,
              errorExample: "",
              errorScreenshots: [],
            });
        }}
      >
        <div className="flex flex-col gap-3">
          <RadioGroup
            name="presentsErrorsToUsers"
            value={values.presentsErrorsToUsers ?? ""}
            onChange={(v) => {
              setValues({ presentsErrorsToUsers: v as "yes" | "no" });
              if (v !== analysis.presentsErrorsToUsers.value)
                setState("presentsErrorsToUsers", "edited");
            }}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <div>
            <div className="mb-1 text-[12px] font-bold text-content-secondary">
              Share a short example
            </div>
            <Textarea
              rows={3}
              value={values.errorExample}
              onChange={(e) => {
                setValues({ errorExample: e.target.value });
                if (e.target.value !== analysis.errorExample.value)
                  setState("presentsErrorsToUsers", "edited");
              }}
            />
          </div>
          <ScreenshotUpload
            label="Screenshots of the error experience"
            hint="Show how your app surfaces errors to users (e.g. inline error, toast, retry flow)."
            value={values.errorScreenshots}
            onChange={(next) => {
              setValues({ errorScreenshots: next });
              if (next.length > 0)
                setState("presentsErrorsToUsers", "edited");
            }}
          />
        </div>
      </FieldSuggestion>
    </div>
  );
}
