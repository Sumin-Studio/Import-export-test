"use client";

import { useEffect, useState } from "react";

export type CertStatus =
  | "not-started"
  | "pending"
  | "in-review"
  | "certified"
  | "rejected";

/** Per browser tab/session only (not persisted across tabs or after closing the tab). */
const PREFIX = "cert-status-";
const STORAGE_KEY = (appId: string) => `${PREFIX}${appId}`;

const VALID: readonly CertStatus[] = [
  "pending",
  "in-review",
  "certified",
  "rejected",
];

function parseStatus(raw: string | null): CertStatus {
  if (raw && (VALID as readonly string[]).includes(raw)) return raw as CertStatus;
  return "not-started";
}

function collectKeysWithPrefix(store: Storage, prefix: string): string[] {
  const keys: string[] = [];
  try {
    for (let i = 0; i < store.length; i++) {
      const key = store.key(i);
      if (key?.startsWith(prefix)) keys.push(key);
    }
  } catch {
    /* storage access blocked */
  }
  return keys;
}

/** One-time migration from older builds that used localStorage (shared across tabs). */
function migrateLegacyLocalToSession(appId: string): void {
  if (typeof window === "undefined") return;
  const k = STORAGE_KEY(appId);
  try {
    if (window.sessionStorage.getItem(k)) {
      window.localStorage.removeItem(k);
      return;
    }
    const legacy = window.localStorage.getItem(k);
    if (!legacy) return;
    const status = parseStatus(legacy);
    if (status === "not-started") {
      window.localStorage.removeItem(k);
      return;
    }
    window.sessionStorage.setItem(k, status);
    window.localStorage.removeItem(k);
  } catch {
    /* quota / private mode */
  }
}

export function getCertStatus(appId: string): CertStatus {
  if (typeof window === "undefined") return "not-started";
  migrateLegacyLocalToSession(appId);
  try {
    return parseStatus(window.sessionStorage.getItem(STORAGE_KEY(appId)));
  } catch {
    return "not-started";
  }
}

export function setCertStatus(appId: string, status: CertStatus) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY(appId), status);
    try {
      window.localStorage.removeItem(STORAGE_KEY(appId));
    } catch {
      /* ignore */
    }
  } catch {
    return;
  }
  window.dispatchEvent(
    new CustomEvent("cert-status-change", { detail: { appId, status } }),
  );
}

export function resetCertStatus(appId: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY(appId));
    window.localStorage.removeItem(STORAGE_KEY(appId));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("cert-status-change", {
      detail: { appId, status: "not-started" as CertStatus },
    }),
  );
}

function emitNotStarted(appId: string) {
  window.dispatchEvent(
    new CustomEvent("cert-status-change", {
      detail: { appId, status: "not-started" as CertStatus },
    }),
  );
}

export function resetAllCertStatuses() {
  if (typeof window === "undefined") return;
  const appIds = new Set<string>();

  for (const key of collectKeysWithPrefix(window.sessionStorage, PREFIX)) {
    appIds.add(key.slice(PREFIX.length));
  }
  for (const key of collectKeysWithPrefix(window.localStorage, PREFIX)) {
    appIds.add(key.slice(PREFIX.length));
  }

  try {
    for (const key of collectKeysWithPrefix(window.sessionStorage, PREFIX)) {
      window.sessionStorage.removeItem(key);
    }
    for (const key of collectKeysWithPrefix(window.localStorage, PREFIX)) {
      window.localStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }

  for (const appId of appIds) {
    if (appId) emitNotStarted(appId);
  }
}

export function useCertStatus(appId: string): CertStatus {
  const [status, setStatus] = useState<CertStatus>("not-started");

  useEffect(() => {
    setStatus(getCertStatus(appId));
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<{ appId: string; status: CertStatus }>;
      if (ce.detail?.appId === appId) setStatus(ce.detail.status);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== window.sessionStorage) return;
      if (e.key === STORAGE_KEY(appId) || e.key === null) {
        setStatus(getCertStatus(appId));
      }
    };
    window.addEventListener("cert-status-change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("cert-status-change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [appId]);

  return status;
}
