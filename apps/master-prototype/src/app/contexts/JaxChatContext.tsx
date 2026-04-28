"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

/** Prototype-only: structured UI rendered after an assistant message (Just Pay). */
export type JustPayMessageEmbed =
  | {
      type: "contact_amount_review";
      supplierName: string;
      /** Persisted so the funding list survives list remounts when new messages append. */
      cardPhase?: "details" | "funding" | "done";
      /** Set when `cardPhase` is `done` (shown in the card summary). */
      selectedFundingLabel?: string;
    }
  | {
      /** Figma Make payment (Melio) — opened from dashboard Payment details modal. */
      type: "make_payment_checkout";
      supplierName: string;
      amountDisplay: string;
      currencyCode: string;
    };

export interface JaxChatMessage {
  role: "user" | "assistant";
  content: string;
  embed?: JustPayMessageEmbed;
}

type EntryPoint = string;

const STORAGE_KEY = "jax-chat-messages";

function loadFromStorage(): Record<EntryPoint, JaxChatMessage[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<EntryPoint, JaxChatMessage[]>;
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed;
  } catch {
    return {};
  }
}

function saveToStorage(threads: Record<EntryPoint, JaxChatMessage[]>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch {
    // ignore
  }
}

interface JaxChatContextType {
  getMessages: (entry: EntryPoint) => JaxChatMessage[];
  appendMessage: (entry: EntryPoint, message: JaxChatMessage) => void;
  seedIfEmpty: (
    entry: EntryPoint,
    message: JaxChatMessage
  ) => boolean;
  /** Clear all messages for an entry (e.g. reset just-pay when the panel closes). */
  clearThread: (entry: EntryPoint) => void;
  /** Merge fields onto the Just Pay embed at `messageIndex` (no-op if missing / wrong type). */
  patchJustPayEmbed: (
    entry: EntryPoint,
    messageIndex: number,
    patch: Partial<{
      cardPhase: "details" | "funding" | "done";
      selectedFundingLabel: string;
    }>
  ) => void;
}

const JaxChatContext = createContext<JaxChatContextType | undefined>(
  undefined
);

export function JaxChatProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<Record<EntryPoint, JaxChatMessage[]>>(
    () => ({})
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage();
    const id = setTimeout(() => {
      setThreads((prev) => {
        const merged = { ...stored };
        for (const entry of Object.keys(prev)) {
          if ((!merged[entry] || merged[entry].length === 0) && prev[entry]?.length)
            merged[entry] = prev[entry];
        }
        return merged;
      });
      setHydrated(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(threads);
  }, [hydrated, threads]);

  const getMessages = useCallback(
    (entry: EntryPoint): JaxChatMessage[] => {
      return threads[entry] ?? [];
    },
    [threads]
  );

  const appendMessage = useCallback(
    (entry: EntryPoint, message: JaxChatMessage) => {
      setThreads((prev) => ({
        ...prev,
        [entry]: [...(prev[entry] ?? []), message],
      }));
    },
    []
  );

  const seedIfEmpty = useCallback(
    (entry: EntryPoint, message: JaxChatMessage): boolean => {
      const existing = threads[entry] ?? [];
      if (existing.length > 0) return false;
      setThreads((prev) => ({
        ...prev,
        [entry]: [message],
      }));
      return true;
    },
    [threads]
  );

  const clearThread = useCallback((entry: EntryPoint) => {
    setThreads((prev) => {
      const next = { ...prev, [entry]: [] };
      return next;
    });
  }, []);

  const patchJustPayEmbed = useCallback(
    (
      entry: EntryPoint,
      messageIndex: number,
      patch: Partial<{
        cardPhase: "details" | "funding" | "done";
        selectedFundingLabel: string;
      }>
    ) => {
      setThreads((prev) => {
        const list = [...(prev[entry] ?? [])];
        const msg = list[messageIndex];
        if (!msg?.embed || msg.embed.type !== "contact_amount_review") {
          return prev;
        }
        list[messageIndex] = {
          ...msg,
          embed: { ...msg.embed, ...patch },
        };
        return { ...prev, [entry]: list };
      });
    },
    []
  );

  return (
    <JaxChatContext.Provider
      value={{
        getMessages,
        appendMessage,
        seedIfEmpty,
        clearThread,
        patchJustPayEmbed,
      }}
    >
      {children}
    </JaxChatContext.Provider>
  );
}

export function useJaxChat() {
  const context = useContext(JaxChatContext);
  if (context === undefined) {
    throw new Error("useJaxChat must be used within a JaxChatProvider");
  }
  return context;
}

/** Same as useJaxChat but returns undefined outside JaxChatProvider (no throw). */
export function useJaxChatOptional(): JaxChatContextType | undefined {
  return useContext(JaxChatContext);
}
