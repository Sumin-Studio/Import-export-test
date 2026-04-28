"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { MockApp } from "@/lib/mock/app";
import {
  CERT_SECTIONS,
  EMPTY_CERT_VALUES,
  type CertificationFormValues,
} from "@/lib/certification/schema";
import { analyzeApp, type AnalysisOutput } from "@/lib/mock/analysis";
import {
  AnalysisProgress,
  type SuggestionState,
} from "@/components/ai";
import { Button } from "@/components/form";
import {
  OnboardingModal,
  type OnboardingStep,
} from "@/components/onboarding";
import {
  setCertStatus,
  useCertStatus,
} from "@/lib/certification/status";
import IntroStep from "./steps/IntroStep";
import ReviewStep from "./steps/ReviewStep";
import SubmittedStep from "./steps/SubmittedStep";
import AboutSection from "./sections/AboutSection";
import AccessSection from "./sections/AccessSection";
import UxSection from "./sections/UxSection";
import AiSection from "./sections/AiSection";

type Stage = "intro" | "analyzing" | "section" | "review" | "submitted";

const SIDEBAR_STEPS: OnboardingStep[] = [
  { id: "get-started", title: "Get started" },
  ...CERT_SECTIONS.map((s) => ({ id: s.id, title: s.title })),
  { id: "review", title: "Review & submit" },
];

export default function CertificationModal({
  app,
  open,
  onClose,
  fromLabel = null,
}: {
  app: MockApp;
  open: boolean;
  onClose: () => void;
  fromLabel?: string | null;
}) {
  const status = useCertStatus(app.id);
  const alreadySubmitted =
    status === "pending" || status === "in-review" || status === "certified";

  const [stage, setStage] = useState<Stage>(
    alreadySubmitted ? "submitted" : "intro",
  );
  const [sectionIndex, setSectionIndex] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisOutput | null>(null);
  const [values, setValuesState] = useState<CertificationFormValues>({
    ...EMPTY_CERT_VALUES,
  });
  const [states, setStates] = useState<Record<string, SuggestionState>>({});

  useEffect(() => {
    if (!open) return;
    setStage(alreadySubmitted ? "submitted" : "intro");
    setSectionIndex(0);
  }, [open, alreadySubmitted]);

  const setValues = (v: Partial<CertificationFormValues>) =>
    setValuesState((prev) => ({ ...prev, ...v }));
  const setState = (key: string, s: SuggestionState) =>
    setStates((prev) => ({ ...prev, [key]: s }));

  const finishAnalysis = useCallback(() => {
    setStage("section");
  }, []);

  const startAnalysis = () => {
    setStage("analyzing");
    const out = analyzeApp(app);
    setAnalysis(out);
    const initialStates: Record<string, SuggestionState> = {};
    initialStates.appPurpose = "suggested";
    initialStates.useCases = "suggested";
    initialStates.offlineAccess = "suggested";
    initialStates.hasDisconnectButton = "suggested";
    initialStates.presentsErrorsToUsers = "suggested";
    initialStates.usesAiOrBots = "suggested";
    initialStates.aiLlm = "suggested";
    initialStates.aiPurpose = "suggested";
    initialStates.aiWhere = "suggested";
    initialStates.aiDataUsed = "suggested";
    initialStates.aiXeroDataHandling = "suggested";
    for (const scope of app.scopes)
      initialStates[`scope:${scope.id}`] = "suggested";
    setStates(initialStates);
    setValuesState({
      ...EMPTY_CERT_VALUES,
      appPurpose: out.appPurpose.value,
      useCases: out.useCases.value,
      scopeJustifications: Object.fromEntries(
        Object.entries(out.scopeJustifications).map(([k, v]) => [k, v.value]),
      ),
      offlineAccess: out.offlineAccess.value,
      hasDisconnectButton: out.hasDisconnectButton.value,
      disconnectLocation: out.disconnectLocation.value,
      presentsErrorsToUsers: out.presentsErrorsToUsers.value,
      errorExample: out.errorExample.value,
      usesAiOrBots: out.usesAiOrBots.value,
      aiLlm: out.aiLlm.value,
      aiPurpose: out.aiPurpose.value,
      aiWhere: out.aiWhere.value,
      aiDataUsed: out.aiDataUsed.value,
      aiXeroDataHandling: out.aiXeroDataHandling.value,
    });
  };

  const clampedSectionIndex = Math.min(
    Math.max(0, sectionIndex),
    Math.max(0, CERT_SECTIONS.length - 1),
  );

  const activeIndex = useMemo(() => {
    if (stage === "intro" || stage === "analyzing") return 0;
    if (stage === "section") return 1 + clampedSectionIndex;
    if (stage === "review") return 1 + CERT_SECTIONS.length;
    if (stage === "submitted") return SIDEBAR_STEPS.length - 1;
    return 0;
  }, [stage, clampedSectionIndex]);

  const section = CERT_SECTIONS[clampedSectionIndex]!;

  const acceptAllInSection = () => {
    if (!analysis) return;
    const keys = keysForSection(
      section.id,
      app.scopes.map((s) => s.id),
    );
    setStates((prev) => {
      const next = { ...prev };
      for (const k of keys) if (next[k] === "suggested") next[k] = "accepted";
      return next;
    });
  };

  const goBack = () => {
    if (stage === "section") {
      if (sectionIndex === 0) setStage("intro");
      else setSectionIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (stage === "review") {
      setSectionIndex(CERT_SECTIONS.length - 1);
      setStage("section");
      return;
    }
  };

  const goNext = () => {
    if (stage === "section") {
      if (sectionIndex < CERT_SECTIONS.length - 1)
        setSectionIndex((i) => i + 1);
      else setStage("review");
    }
  };

  const submit = () => {
    setCertStatus(app.id, "pending");
    setStage("submitted");
  };

  const footer = (() => {
    if (stage === "intro") {
      return (
        <>
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] font-bold text-action-primary hover:underline"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={startAnalysis}>
              Skip — I&apos;ll fill it in myself
            </Button>
            <Button onClick={startAnalysis}>Analyse my app with AI</Button>
          </div>
        </>
      );
    }
    if (stage === "analyzing") {
      return (
        <>
          <span className="text-[13px] text-content-secondary">
            Analysing…
          </span>
          <Button disabled>Next</Button>
        </>
      );
    }
    if (stage === "section") {
      return (
        <>
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={acceptAllInSection}>
              Accept all suggestions
            </Button>
            <Button onClick={goNext}>
              {clampedSectionIndex < CERT_SECTIONS.length - 1
                ? "Next"
                : "Review submission"}
            </Button>
          </div>
        </>
      );
    }
    if (stage === "review") {
      return (
        <>
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
          <Button disabled={!values.meetsCheckpoints} onClick={submit}>
            Submit for certification
          </Button>
        </>
      );
    }
    return (
      <>
        <span />
        <Button onClick={onClose}>Done</Button>
      </>
    );
  })();

  return (
    <OnboardingModal
      open={open}
      onClose={onClose}
      title={`Certify ${app.name}`}
      steps={SIDEBAR_STEPS}
      activeIndex={activeIndex}
      footer={footer}
    >
      {stage === "intro" && <IntroStep app={app} fromLabel={fromLabel} />}

      {stage === "analyzing" && (
        <AnalysisProgress onDone={finishAnalysis} />
      )}

      {stage === "section" && analysis && (
        <div className="flex flex-col gap-5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-content-secondary">
              Step {clampedSectionIndex + 1} of {CERT_SECTIONS.length}
            </div>
            <div className="text-[22px] font-bold text-content-primary">
              {section.title}
            </div>
            <div className="mt-1 text-[14px] text-content-secondary">
              {section.subtitle}
            </div>
          </div>
          {section.id === "about" && (
            <AboutSection
              analysis={analysis}
              values={values}
              setValues={setValues}
              states={states}
              setState={setState}
            />
          )}
          {section.id === "access" && (
            <AccessSection
              app={app}
              analysis={analysis}
              values={values}
              setValues={setValues}
              states={states}
              setState={setState}
            />
          )}
          {section.id === "ux" && (
            <UxSection
              analysis={analysis}
              values={values}
              setValues={setValues}
              states={states}
              setState={setState}
            />
          )}
          {section.id === "ai" && (
            <AiSection
              analysis={analysis}
              values={values}
              setValues={setValues}
              states={states}
              setState={setState}
            />
          )}
        </div>
      )}

      {stage === "review" && (
        <ReviewStep
          app={app}
          values={values}
          setValues={setValues}
          states={states}
        />
      )}

      {stage === "submitted" && <SubmittedStep app={app} />}
    </OnboardingModal>
  );
}

function keysForSection(
  sectionId: "about" | "access" | "ux" | "ai",
  scopeIds: string[],
): string[] {
  switch (sectionId) {
    case "about":
      return ["appPurpose", "useCases"];
    case "access":
      return ["offlineAccess", ...scopeIds.map((id) => `scope:${id}`)];
    case "ux":
      return ["hasDisconnectButton", "presentsErrorsToUsers"];
    case "ai":
      return [
        "usesAiOrBots",
        "aiLlm",
        "aiPurpose",
        "aiWhere",
        "aiDataUsed",
        "aiXeroDataHandling",
      ];
  }
}
