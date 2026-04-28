"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import type { AgentConfig } from "@/lib/agent-config";

const EMPTY_CONFIG: AgentConfig = {
  ollamaHost: "",
  ollamaModel: "",
  scanDelayMs: 300,
  lowConfidenceThreshold: 80,
  maxFilesPerScan: 0,
  classificationPreviewChars: 500,
  useContentForClassification: true,
};

export default function SettingsPage() {
  const [config, setConfig] = useState<AgentConfig>(EMPTY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings/agent-config")
      .then((r) => r.json())
      .then((data: AgentConfig) => setConfig(data))
      .catch(() => setConfig(EMPTY_CONFIG))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings/agent-config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ollamaHost: config.ollamaHost,
          ollamaModel: config.ollamaModel,
          scanDelayMs: config.scanDelayMs,
          lowConfidenceThreshold: config.lowConfidenceThreshold,
          maxFilesPerScan: config.maxFilesPerScan,
          classificationPreviewChars: config.classificationPreviewChars,
          useContentForClassification: config.useContentForClassification,
        }),
      });
      if (res.ok) {
        const updated = (await res.json()) as AgentConfig;
        setConfig(updated);
        setSaved(true);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading settings…
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Settings
      </h1>
      <p className="mt-2 text-muted-foreground">
        Configure the document collection agent and classification behavior.
      </p>

      <form onSubmit={handleSave} className="mt-8 max-w-2xl space-y-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">
            Agent configuration
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Control how the AI agent scans and classifies client documents.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-1">
            <div>
              <label
                htmlFor="ollamaHost"
                className="block text-sm font-medium text-slate-700"
              >
                Ollama host
              </label>
              <input
                id="ollamaHost"
                type="url"
                value={config.ollamaHost}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, ollamaHost: e.target.value }))
                }
                placeholder="http://localhost:11434"
                className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Base URL of your Ollama server (used for document classification).
              </p>
            </div>

            <div>
              <label
                htmlFor="ollamaModel"
                className="block text-sm font-medium text-slate-700"
              >
                Classification model
              </label>
              <input
                id="ollamaModel"
                type="text"
                value={config.ollamaModel}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, ollamaModel: e.target.value }))
                }
                placeholder="llama3.2"
                className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Model name to use for categorizing documents (e.g. Tax, Receipts, Invoices).
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="scanDelayMs"
                  className="block text-sm font-medium text-slate-700"
                >
                  Scan delay (ms)
                </label>
                <input
                  id="scanDelayMs"
                  type="number"
                  min={0}
                  step={50}
                  value={config.scanDelayMs}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      scanDelayMs: Math.max(0, parseInt(e.target.value, 10) || 0),
                    }))
                  }
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Pause between each file when scanning (throttle).
                </p>
              </div>

              <div>
                <label
                  htmlFor="maxFilesPerScan"
                  className="block text-sm font-medium text-slate-700"
                >
                  Max files per scan
                </label>
                <input
                  id="maxFilesPerScan"
                  type="number"
                  min={0}
                  value={config.maxFilesPerScan}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      maxFilesPerScan: Math.max(0, parseInt(e.target.value, 10) || 0),
                    }))
                  }
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  0 = no limit. Cap files classified per run for safety.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lowConfidenceThreshold"
                  className="block text-sm font-medium text-slate-700"
                >
                  Low-confidence threshold (%)
                </label>
                <input
                  id="lowConfidenceThreshold"
                  type="number"
                  min={0}
                  max={100}
                  value={config.lowConfidenceThreshold}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      lowConfidenceThreshold: Math.min(
                        100,
                        Math.max(0, parseInt(e.target.value, 10) || 0)
                      ),
                    }))
                  }
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Below this %, a file is shown as &quot;low confidence&quot; and the AI can explain why.
                </p>
              </div>

              <div>
                <label
                  htmlFor="classificationPreviewChars"
                  className="block text-sm font-medium text-slate-700"
                >
                  Preview length (chars)
                </label>
                <input
                  id="classificationPreviewChars"
                  type="number"
                  min={100}
                  max={2000}
                  value={config.classificationPreviewChars}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      classificationPreviewChars: Math.min(
                        2000,
                        Math.max(100, parseInt(e.target.value, 10) || 500)
                      ),
                    }))
                  }
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Max document text sent to the model for classification (100–2000).
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                id="useContentForClassification"
                type="checkbox"
                checked={config.useContentForClassification}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    useContentForClassification: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="useContentForClassification"
                className="text-sm font-medium text-slate-700"
              >
                Use file content for classification (PDF text, OCR on images)
              </label>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              When on, the agent downloads each file and extracts text (PDFs, .txt, etc.) or runs OCR on images (jpg, png, etc.) and sends a preview to Ollama. More accurate but slower. When off, only the filename is used.
            </p>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save agent configuration
              </>
            )}
          </Button>
          {saved && (
            <span className="text-sm text-emerald-600">Settings saved.</span>
          )}
        </div>
      </form>
    </div>
  );
}
