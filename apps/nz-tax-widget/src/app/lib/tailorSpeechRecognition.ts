/** Narrow surface of the Web Speech API used by Tailor voice input. */

export interface TailorSpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  abort(): void;
  onresult: ((this: TailorSpeechRecognition, ev: TailorSpeechRecognitionEvent) => void) | null;
  onerror:
    | ((this: TailorSpeechRecognition, ev: TailorSpeechRecognitionErrorEvent) => void)
    | null;
  onend: ((this: TailorSpeechRecognition, ev: Event) => void) | null;
}

export interface TailorSpeechRecognitionResultList {
  readonly length: number;
  [index: number]: TailorSpeechRecognitionResult;
}

export interface TailorSpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: { readonly transcript: string };
}

export interface TailorSpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: TailorSpeechRecognitionResultList;
}

export interface TailorSpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

type TailorSpeechRecognitionCtor = new () => TailorSpeechRecognition;

export function getTailorSpeechRecognitionCtor(): TailorSpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: TailorSpeechRecognitionCtor;
    webkitSpeechRecognition?: TailorSpeechRecognitionCtor;
  };
  return w.webkitSpeechRecognition ?? w.SpeechRecognition ?? null;
}
