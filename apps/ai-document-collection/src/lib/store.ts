import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Redis } from "@upstash/redis";
import type { EngagementStore } from "@/lib/engagements";
import type { ChaseStore } from "@/lib/chase";
import { DEMO_ACCESS_TOKEN } from "@/lib/demo-storage";

export interface DropboxConnection {
  accessToken: string;
  folderPath: string;
  connectedAt: string; // ISO string
  /** Simulated Dropbox tree for prototypes — no OAuth or API calls. */
  isDemo?: boolean;
}

/** Xero-style link: document attached to a transaction or job. */
export interface XeroLink {
  type: "invoice" | "bill" | "bank_transaction" | "job";
  id: string;
  label: string;
}

export interface ClassifiedFile {
  name: string;
  path_display: string;
  category: string;
  confidence: number;
  /** When confidence is low, optional reason (what's ambiguous). */
  lowConfidenceReason?: string;
  /** Short "why" for this category (e.g. "Filename contains 'invoice'") — shown in tooltip. */
  reason?: string;
  /** Fictitious Xero entity this document is linked to (for demo). */
  linkedTo?: XeroLink;
}

export interface ScanResult {
  log: string[];
  files: ClassifiedFile[];
  scannedAt: string; // ISO string
  /** Paths already seen in a previous scan; used to only surface new files on subsequent scans. */
  lastSeenPaths?: string[];
}

// Classified files are persisted in .agenticcloud/scans.json, keyed by clientId.
// Each ScanResult.files entry is a ClassifiedFile; path_display (Dropbox path) is stored on each.
const STORE_DIR = join(process.cwd(), ".agenticcloud");
const TOKENS_FILE = join(STORE_DIR, "tokens.json");
const SCANS_FILE = join(STORE_DIR, "scans.json");
const ENGAGEMENTS_FILE = join(STORE_DIR, "engagements.json");
const CHASES_FILE = join(STORE_DIR, "chases.json");

const inMemoryTokens = new Map<string, DropboxConnection>();
const inMemoryScans = new Map<string, ScanResult>();
let inMemoryEngagements: EngagementStore = { engagements: [], expectedItems: [] };
let inMemoryChases: ChaseStore = { chasePlans: [] };

/** Upstash Redis (Vercel “Redis” integration) — survives across serverless invocations. */
const REDIS_KEYS = {
  tokens: "agenticcloud:tokens",
  scans: "agenticcloud:scans",
  engagements: "agenticcloud:engagements",
  chases: "agenticcloud:chases",
} as const;

let redisSingleton: Redis | null = null;
let localDiskHydrated = false;

export function isRedisPersistenceEnabled(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

function getRedis(): Redis | null {
  if (!isRedisPersistenceEnabled()) return null;
  if (!redisSingleton) {
    redisSingleton = Redis.fromEnv();
  }
  return redisSingleton;
}

/**
 * Load store from Redis (always) or local disk (once per process). Call at the start of
 * server routes / RSC that read connection state so Vercel lambdas see data written by others.
 */
export async function syncStoreFromPersistence(): Promise<void> {
  if (typeof window !== "undefined") return;

  const redis = getRedis();
  if (redis) {
    const [tokens, scans, engagements, chases] = await Promise.all([
      redis.get<Record<string, DropboxConnection>>(REDIS_KEYS.tokens),
      redis.get<Record<string, ScanResult>>(REDIS_KEYS.scans),
      redis.get<EngagementStore>(REDIS_KEYS.engagements),
      redis.get<ChaseStore>(REDIS_KEYS.chases),
    ]);

    inMemoryTokens.clear();
    if (tokens && typeof tokens === "object") {
      for (const [k, v] of Object.entries(tokens)) {
        if (v && typeof v === "object") inMemoryTokens.set(k, v as DropboxConnection);
      }
    }

    inMemoryScans.clear();
    if (scans && typeof scans === "object") {
      for (const [k, v] of Object.entries(scans)) {
        if (v && typeof v === "object") inMemoryScans.set(k, v as ScanResult);
      }
    }

    if (engagements && typeof engagements === "object") {
      inMemoryEngagements = {
        engagements: Array.isArray(engagements.engagements) ? engagements.engagements : [],
        expectedItems: Array.isArray(engagements.expectedItems)
          ? engagements.expectedItems
          : [],
      };
    } else {
      inMemoryEngagements = { engagements: [], expectedItems: [] };
    }

    if (chases && typeof chases === "object" && Array.isArray(chases.chasePlans)) {
      inMemoryChases = { chasePlans: chases.chasePlans };
    } else {
      inMemoryChases = { chasePlans: [] };
    }
    return;
  }

  if (!localDiskHydrated) {
    loadTokensFromDisk();
    loadScansFromDisk();
    loadEngagementsFromDisk();
    loadChasesFromDisk();
    localDiskHydrated = true;
  }
}

/** Persist full snapshot to Redis or local files. Call after mutations on serverless. */
export async function persistStoreToBackend(): Promise<void> {
  if (typeof window !== "undefined") return;

  const redis = getRedis();
  if (redis) {
    await Promise.all([
      redis.set(REDIS_KEYS.tokens, Object.fromEntries(inMemoryTokens)),
      redis.set(REDIS_KEYS.scans, Object.fromEntries(inMemoryScans)),
      redis.set(REDIS_KEYS.engagements, inMemoryEngagements),
      redis.set(REDIS_KEYS.chases, inMemoryChases),
    ]);
    return;
  }

  saveTokensToDisk();
  saveScansToDisk();
  saveEngagementsToDisk();
  saveChasesToDisk();
}

function ensureStoreDir() {
  if (typeof window === "undefined" && !existsSync(STORE_DIR)) {
    mkdirSync(STORE_DIR, { recursive: true });
  }
}

function loadTokensFromDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    if (existsSync(TOKENS_FILE)) {
      const data = JSON.parse(readFileSync(TOKENS_FILE, "utf-8")) as Record<
        string,
        DropboxConnection
      >;
      Object.entries(data).forEach(([k, v]) => inMemoryTokens.set(k, v));
    }
  } catch {
    // ignore
  }
}

function saveTokensToDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    ensureStoreDir();
    const obj = Object.fromEntries(inMemoryTokens);
    writeFileSync(TOKENS_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

function loadScansFromDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    if (existsSync(SCANS_FILE)) {
      const data = JSON.parse(readFileSync(SCANS_FILE, "utf-8")) as Record<
        string,
        ScanResult
      >;
      Object.entries(data).forEach(([k, v]) => inMemoryScans.set(k, v));
    }
  } catch {
    // ignore
  }
}

function saveScansToDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    ensureStoreDir();
    const obj = Object.fromEntries(inMemoryScans);
    writeFileSync(SCANS_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

function loadEngagementsFromDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    if (existsSync(ENGAGEMENTS_FILE)) {
      const data = JSON.parse(readFileSync(ENGAGEMENTS_FILE, "utf-8")) as EngagementStore;
      inMemoryEngagements = {
        engagements: data.engagements ?? [],
        expectedItems: data.expectedItems ?? [],
      };
    }
  } catch {
    // ignore
  }
}

function saveEngagementsToDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    ensureStoreDir();
    writeFileSync(ENGAGEMENTS_FILE, JSON.stringify(inMemoryEngagements, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

function loadChasesFromDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    if (existsSync(CHASES_FILE)) {
      const data = JSON.parse(readFileSync(CHASES_FILE, "utf-8")) as ChaseStore;
      inMemoryChases = { chasePlans: data.chasePlans ?? [] };
    }
  } catch {
    // ignore
  }
}

function saveChasesToDisk(): void {
  if (typeof window !== "undefined") return;
  try {
    ensureStoreDir();
    writeFileSync(CHASES_FILE, JSON.stringify(inMemoryChases, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

// Local dev: first syncStoreFromPersistence() loads disk. With Redis, always pull from Redis per request.

export function getToken(clientId: string): DropboxConnection | null {
  return inMemoryTokens.get(clientId) ?? null;
}

export function setToken(
  clientId: string,
  accessToken: string,
  folderPath: string
): void {
  inMemoryTokens.set(clientId, {
    accessToken,
    folderPath: folderPath || "",
    connectedAt: new Date().toISOString(),
    isDemo: false,
  });
  saveTokensToDisk();
}

export function setDemoConnection(clientId: string): void {
  inMemoryTokens.set(clientId, {
    accessToken: DEMO_ACCESS_TOKEN,
    folderPath: "",
    connectedAt: new Date().toISOString(),
    isDemo: true,
  });
  saveTokensToDisk();
}

export function updateFolderPath(clientId: string, folderPath: string): void {
  const conn = inMemoryTokens.get(clientId);
  if (!conn) return;
  inMemoryTokens.set(clientId, {
    ...conn,
    folderPath: folderPath || "",
  });
  saveTokensToDisk();
}

export function removeToken(clientId: string): void {
  inMemoryTokens.delete(clientId);
  saveTokensToDisk();
}

export function getScanResult(clientId: string): ScanResult | null {
  return inMemoryScans.get(clientId) ?? null;
}

export function setScanResult(clientId: string, result: ScanResult): void {
  inMemoryScans.set(clientId, result);
  saveScansToDisk();
}

export function removeScanResult(clientId: string): void {
  inMemoryScans.delete(clientId);
  saveScansToDisk();
}

export function getAllClientIdsWithTokens(): string[] {
  return Array.from(inMemoryTokens.keys());
}

export function getEngagementStore(): EngagementStore {
  return { ...inMemoryEngagements };
}

export function saveEngagementStore(store: EngagementStore): void {
  inMemoryEngagements = { engagements: store.engagements, expectedItems: store.expectedItems };
  saveEngagementsToDisk();
}

export function getChaseStore(): ChaseStore {
  return { ...inMemoryChases };
}

export function saveChaseStore(store: ChaseStore): void {
  inMemoryChases = { chasePlans: store.chasePlans };
  saveChasesToDisk();
}
