import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface AgentConfig {
  /** Ollama API base URL (e.g. http://localhost:11434). */
  ollamaHost: string;
  /** Model name for classification (e.g. llama3.2). */
  ollamaModel: string;
  /** Delay in ms between each file classification during a scan (throttle). */
  scanDelayMs: number;
  /** Confidence below this value is shown as "low confidence" in the UI (0–100). */
  lowConfidenceThreshold: number;
  /** Max files to classify per scan; 0 = no limit. */
  maxFilesPerScan: number;
  /** Max length of document name + preview sent to the model (chars). */
  classificationPreviewChars: number;
  /** If false, classify by filename only (fast). If true, extract text from PDFs, run OCR on images, and use content for classification (slower but accurate). */
  useContentForClassification: boolean;
}

const STORE_DIR = join(process.cwd(), ".agenticcloud");
const CONFIG_FILE = join(STORE_DIR, "agent-config.json");

const DEFAULT_CONFIG: AgentConfig = {
  ollamaHost: process.env.OLLAMA_HOST || "http://localhost:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.2",
  scanDelayMs: 0,
  lowConfidenceThreshold: 80,
  maxFilesPerScan: 0,
  classificationPreviewChars: 500,
  useContentForClassification: false,
};

let cachedConfig: AgentConfig | null = null;

function ensureStoreDir(): void {
  if (typeof window === "undefined" && !existsSync(STORE_DIR)) {
    mkdirSync(STORE_DIR, { recursive: true });
  }
}

/** Load config from disk; env vars override defaults, then file overrides. */
export function getAgentConfig(): AgentConfig {
  if (typeof window !== "undefined") {
    return { ...DEFAULT_CONFIG };
  }
  if (cachedConfig) return cachedConfig;
  try {
    if (existsSync(CONFIG_FILE)) {
      const raw = JSON.parse(readFileSync(CONFIG_FILE, "utf-8")) as Partial<AgentConfig>;
      cachedConfig = {
        ollamaHost: raw.ollamaHost ?? process.env.OLLAMA_HOST ?? DEFAULT_CONFIG.ollamaHost,
        ollamaModel: raw.ollamaModel ?? process.env.OLLAMA_MODEL ?? DEFAULT_CONFIG.ollamaModel,
        scanDelayMs: typeof raw.scanDelayMs === "number" ? raw.scanDelayMs : DEFAULT_CONFIG.scanDelayMs,
        lowConfidenceThreshold:
          typeof raw.lowConfidenceThreshold === "number"
            ? raw.lowConfidenceThreshold
            : DEFAULT_CONFIG.lowConfidenceThreshold,
        maxFilesPerScan: typeof raw.maxFilesPerScan === "number" ? raw.maxFilesPerScan : DEFAULT_CONFIG.maxFilesPerScan,
        classificationPreviewChars:
          typeof raw.classificationPreviewChars === "number"
            ? raw.classificationPreviewChars
            : DEFAULT_CONFIG.classificationPreviewChars,
        useContentForClassification:
          typeof raw.useContentForClassification === "boolean"
            ? raw.useContentForClassification
            : DEFAULT_CONFIG.useContentForClassification,
      };
      return cachedConfig;
    }
  } catch {
    // ignore invalid file
  }
  cachedConfig = { ...DEFAULT_CONFIG };
  return cachedConfig;
}

/** Persist config to disk and update cache. Server-only. */
export function setAgentConfig(updates: Partial<AgentConfig>): AgentConfig {
  const current = getAgentConfig();
  const next: AgentConfig = {
    ollamaHost: updates.ollamaHost ?? current.ollamaHost,
    ollamaModel: updates.ollamaModel ?? current.ollamaModel,
    scanDelayMs: updates.scanDelayMs ?? current.scanDelayMs,
    lowConfidenceThreshold: updates.lowConfidenceThreshold ?? current.lowConfidenceThreshold,
    maxFilesPerScan: updates.maxFilesPerScan ?? current.maxFilesPerScan,
    classificationPreviewChars: updates.classificationPreviewChars ?? current.classificationPreviewChars,
    useContentForClassification: updates.useContentForClassification ?? current.useContentForClassification,
  };
  if (typeof window === "undefined") {
    ensureStoreDir();
    writeFileSync(CONFIG_FILE, JSON.stringify(next, null, 2), "utf-8");
    cachedConfig = next;
  }
  return next;
}

export { DEFAULT_CONFIG };
