"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export interface JaxChatMessage {
  role: "user" | "assistant";
  content: string;
}

type EntryPoint = string;

const STORAGE_KEY = "jax-chat-messages";

function loadFromStorage(): Record<EntryPoint, JaxChatMessage[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<EntryPoint, JaxChatMessage[]>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
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

  return (
    <JaxChatContext.Provider
      value={{ getMessages, appendMessage, seedIfEmpty }}
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
