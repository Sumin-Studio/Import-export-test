"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import {
  getTailorSpeechRecognitionCtor,
  type TailorSpeechRecognition,
  type TailorSpeechRecognitionErrorEvent,
  type TailorSpeechRecognitionEvent,
} from "@/app/lib/tailorSpeechRecognition";

const TAX_TRIGGER = /tax/i;

/** Browser speech backends often reject `en-NZ`; `en-US` has the best compatibility. */
const RECOGNITION_LANG = "en-US";

function getSubmitMotionTiming() {
  if (typeof window === "undefined") {
    return { heroMs: 420, pulseMs: 760, dissolveMs: 720 };
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    return { heroMs: 180, pulseMs: 0, dissolveMs: 220 };
  }
  return { heroMs: 420, pulseMs: 760, dissolveMs: 720 };
}

/** Total “thinking” duration before the fake tax dashboard is revealed (matches prior hero+pulse+dissolve timing). */
function getThinkingDurationMs(): number {
  const { heroMs, pulseMs, dissolveMs } = getSubmitMotionTiming();
  return heroMs + pulseMs + dissolveMs + 80;
}

function speechErrorMessage(code: string | undefined): string | null {
  switch (code) {
    case "aborted":
      return null;
    case "not-allowed":
      return "Microphone access was denied.";
    case "no-speech":
      return "No speech heard. Try again.";
    case "audio-capture":
      return "No microphone was found or it could not be opened.";
    case "network":
      return "Speech recognition needs a network connection. Check your connection and try again.";
    case "service-not-allowed":
      return "Speech recognition is not allowed (try HTTPS or check browser permissions).";
    case "language-not-supported":
      return "This language is not supported for voice input in your browser.";
    case "bad-grammar":
      return "Voice input could not start. Try again.";
    default:
      return "Voice input failed. Try again.";
  }
}

function VoiceListeningIndicator() {
  return (
    <div
      className="border-border-secondary flex items-center gap-3 rounded-xl border bg-[rgba(0,120,200,0.06)] px-3 py-2.5"
      aria-hidden
    >
      <div className="flex h-8 shrink-0 items-end gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="tailor-voice-bar bg-brand-primary h-7 w-[3px] shrink-0 rounded-full"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-content-primary text-[14px] font-medium leading-tight">
          Listening…
        </p>
        <p className="text-content-secondary mt-0.5 text-[12px] leading-snug">
          Speak now — we&apos;ll use what you say below
        </p>
      </div>
    </div>
  );
}

function TailorThinkingPanel() {
  return (
    <div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-[rgba(248,249,250,0.92)] px-6 backdrop-blur-[2px]"
      aria-busy="true"
      aria-label="Thinking"
    >
      <div className="max-w-md text-center">
        <p className="text-content-primary text-[15px] font-medium leading-snug">
          Thinking…
        </p>
        <p className="text-content-secondary mt-1 text-[13px] leading-snug">
          Shaping your tax overview
        </p>
        <div
          className="mx-auto mt-5 h-[3px] w-52 max-w-full overflow-hidden rounded-full bg-[rgba(0,10,30,0.06)]"
          aria-hidden
        >
          <div className="tailor-ai-stream-bar h-full rounded-full" />
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="tailor-thinking-dot bg-brand-primary size-1.5 rounded-full opacity-60"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * NZ Tailor — prompt (text/voice) → subtle thinking state → hand off to the main tax grid
 * (this view unmounts once the dashboard is revealed).
 */
export function TailorPrototypeView() {
  const {
    setWidgetScope,
    setTailorNzTaxDashboardRevealed,
    armTailorDashboardEntrance,
  } = usePrototypeSettings();
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  /** `prompt` = composer only; `thinking` = AI-style loading until grid reveal. */
  const [tailorPhase, setTailorPhase] = useState<"prompt" | "thinking">("prompt");
  const [voiceHint, setVoiceHint] = useState<string | null>(null);
  const finalTranscriptRef = useRef("");
  const latestInterimRef = useRef("");
  const recognitionRef = useRef<TailorSpeechRecognition | null>(null);
  const phaseTimersRef = useRef<number[]>([]);
  const dissolveNavigatedRef = useRef(false);
  const exitTransitionLockRef = useRef(false);

  const isThinking = tailorPhase === "thinking";

  const clearPhaseTimers = useCallback(() => {
    for (const id of phaseTimersRef.current) {
      window.clearTimeout(id);
    }
    phaseTimersRef.current = [];
  }, []);

  const completeTransition = useCallback(() => {
    if (dissolveNavigatedRef.current) return;
    dissolveNavigatedRef.current = true;
    clearPhaseTimers();
    armTailorDashboardEntrance();
    setTailorNzTaxDashboardRevealed(true);
    setWidgetScope("tax");
    exitTransitionLockRef.current = false;
  }, [
    armTailorDashboardEntrance,
    clearPhaseTimers,
    setTailorNzTaxDashboardRevealed,
    setWidgetScope,
  ]);

  const beginTaxDashboardTransition = useCallback(() => {
    if (exitTransitionLockRef.current) return;
    exitTransitionLockRef.current = true;
    clearPhaseTimers();
    dissolveNavigatedRef.current = false;
    const thinkingMs = getThinkingDurationMs();
    setTailorPhase("thinking");

    phaseTimersRef.current.push(
      window.setTimeout(() => {
        completeTransition();
      }, thinkingMs)
    );
  }, [clearPhaseTimers, completeTransition]);

  useEffect(() => {
    return () => {
      clearPhaseTimers();
      exitTransitionLockRef.current = false;
      try {
        recognitionRef.current?.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, [clearPhaseTimers]);

  const submitComposer = useCallback(() => {
    const text = message.trim();
    if (!text || isThinking || listening) return;
    setVoiceHint(null);
    if (!TAX_TRIGGER.test(text)) {
      setVoiceHint("Try mentioning tax to open your tax dashboard.");
      return;
    }
    beginTaxDashboardTransition();
  }, [message, isThinking, listening, beginTaxDashboardTransition]);

  const startVoiceInput = useCallback(() => {
    const Ctor = getTailorSpeechRecognitionCtor();
    if (!Ctor) {
      setVoiceHint("Voice input is not supported in this browser.");
      return;
    }

    if (listening && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      return;
    }

    setVoiceHint(null);
    finalTranscriptRef.current = "";
    latestInterimRef.current = "";
    setMessage("");

    const rec = new Ctor();
    recognitionRef.current = rec;
    rec.lang = RECOGNITION_LANG;
    rec.continuous = false;
    rec.interimResults = true;

    rec.onresult = (event: TailorSpeechRecognitionEvent) => {
      let finalChunk = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const row = event.results[i];
        if (row?.isFinal) {
          finalChunk += row[0]?.transcript ?? "";
        }
      }
      finalTranscriptRef.current += finalChunk;

      let fullInterim = "";
      for (let i = 0; i < event.results.length; i++) {
        const row = event.results[i];
        if (!row?.isFinal) {
          fullInterim += row[0]?.transcript ?? "";
        }
      }
      latestInterimRef.current = fullInterim;
      const live = finalTranscriptRef.current + fullInterim;
      setMessage(live);
    };

    rec.onerror = (event: TailorSpeechRecognitionErrorEvent) => {
      const raw = (event as { error?: string }).error;
      const code = typeof raw === "string" ? raw : undefined;
      const msg = speechErrorMessage(code);
      if (msg === null) {
        return;
      }
      setVoiceHint(msg);
    };

    rec.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      const transcript =
        finalTranscriptRef.current.trim() || latestInterimRef.current.trim();
      finalTranscriptRef.current = "";
      latestInterimRef.current = "";
      if (!transcript) {
        return;
      }
      setMessage(transcript);
      if (TAX_TRIGGER.test(transcript)) {
        requestAnimationFrame(() => {
          beginTaxDashboardTransition();
        });
      } else {
        setVoiceHint("Try mentioning tax to open your tax dashboard.");
      }
    };

    try {
      setListening(true);
      rec.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setVoiceHint("Could not start voice input.");
    }
  }, [listening, beginTaxDashboardTransition]);

  return (
    <div className="bg-background-primary relative min-h-[min(100dvh,920px)]">
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {listening ? "Listening. Speak now." : ""}
        {isThinking ? "Thinking. Building your tax overview." : ""}
      </div>

      {isThinking ? <TailorThinkingPanel /> : null}

      {tailorPhase === "prompt" ? (
        <div className="relative z-10 mx-auto flex flex-col items-center px-5 pt-8 pb-16 sm:pt-10 lg:pt-12">
          <div className="flex w-full max-w-[640px] flex-col items-center text-center">
            <h2 className="text-content-primary text-[19px]/[32px] font-bold lg:text-[21px]/[32px]">
              What do you want to see?
            </h2>
            <p className="text-content-secondary mt-2 max-w-[640px] text-[15px] leading-[1.45]">
              We&apos;ll create a custom dashboard for you.
            </p>

            <div className="mt-14 w-full sm:mt-16">
              <div className="relative">
                <div
                  className={clsx(
                    "tailor-composer-orbit pointer-events-none absolute inset-[-18px] z-0 rounded-[22px]",
                    listening && "tailor-composer-orbit--listening"
                  )}
                  aria-hidden
                />
                <form
                  className={clsx(
                    "relative z-[1] flex flex-col gap-3 rounded-[16px] border border-white/90 bg-white p-2 text-left shadow-[0_1px_3px_rgba(0,10,30,0.06)] transition-[border-color,box-shadow] duration-300",
                    listening &&
                      "shadow-[0_0_0_1px_rgba(23,89,255,0.1),0_6px_24px_-6px_rgba(23,89,255,0.14)]"
                  )}
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitComposer();
                  }}
                >
                  <div className="relative rounded-xl bg-white px-2 pt-1 pb-0.5">
                    <label className="sr-only" htmlFor="tailor-composer">
                      Describe your scenario
                    </label>
                    <textarea
                      id="tailor-composer"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" || e.shiftKey) return;
                        e.preventDefault();
                        submitComposer();
                      }}
                      placeholder="e.g. Show me what I need to do for my tax clients"
                      className={clsx(
                        "text-content-primary min-h-[96px] w-full resize-y bg-transparent py-1 text-[15px] leading-6 outline-none placeholder:text-[rgba(0,10,30,0.65)]",
                        listening &&
                          "shadow-[inset_0_0_0_1px_rgba(23,89,255,0.12)] rounded-md"
                      )}
                    />
                  </div>
                  {listening ? (
                    <div className="px-0.5">
                      <VoiceListeningIndicator />
                    </div>
                  ) : null}
                  {voiceHint ? (
                    <p
                      className="text-content-secondary px-2 text-left text-[13px] leading-snug"
                      role="status"
                    >
                      {voiceHint}
                    </p>
                  ) : null}
                  <div className="flex items-center justify-between gap-2 px-0.5 pb-0.5">
                    <button
                      type="button"
                      onClick={startVoiceInput}
                      disabled={isThinking}
                      aria-pressed={listening}
                      aria-busy={listening}
                      aria-label={
                        listening ? "Stop voice input" : "Speak to describe your dashboard"
                      }
                      className={clsx(
                        "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
                        listening
                          ? "tailor-mic-listening bg-brand-primary text-white hover:bg-brand-primary-hover"
                          : "text-[#1e3145] hover:bg-[rgba(0,10,30,0.05)] rounded-lg"
                      )}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v3M8 22h8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="submit"
                      disabled={!message.trim() || isThinking || listening}
                      className={clsx(
                        "flex size-12 shrink-0 items-center justify-center rounded-full text-white shadow-[0_4px_16px_rgba(0,120,200,0.42)] transition-[background-color,box-shadow,transform,opacity] duration-200",
                        "bg-brand-primary hover:bg-brand-primary-hover hover:shadow-[0_6px_22px_rgba(0,120,200,0.48)] active:scale-[0.97]",
                        "disabled:cursor-not-allowed disabled:scale-100 disabled:bg-[#b4bac4] disabled:text-white/85 disabled:shadow-none disabled:hover:bg-[#b4bac4]"
                      )}
                      aria-label="Send message"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M12 17V9M7 13l5-5 5 5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
