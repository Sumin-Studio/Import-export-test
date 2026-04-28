"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Folder, ChevronRight, Loader2 } from "lucide-react";

interface FolderItem {
  name: string;
  path_display: string;
}

interface FolderPickerProps {
  clientId: string;
}

export function FolderPicker({ clientId }: FolderPickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoBootstrap = searchParams.get("demo") === "1";
  const [demoReady, setDemoReady] = useState(!isDemoBootstrap);
  const [demoBootError, setDemoBootError] = useState<string | null>(null);
  const [path, setPath] = useState("");
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [storageRootLabel, setStorageRootLabel] = useState("Dropbox");

  useEffect(() => {
    if (!isDemoBootstrap) {
      setDemoReady(true);
      return;
    }
    let cancelled = false;
    fetch(`/api/connect/${clientId}/demo`, { method: "POST" })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (cancelled) return;
        if (res.status === 409) {
          setDemoBootError(data.error ?? "Already connected to a real account.");
          setDemoReady(true);
          return;
        }
        if (!res.ok) {
          setDemoBootError(data.error ?? "Could not start demo mode.");
          setDemoReady(true);
          return;
        }
        setDemoReady(true);
        router.replace(`/connect/${clientId}/folder`, { scroll: false });
      })
      .catch(() => {
        if (!cancelled) {
          setDemoBootError("Could not start demo mode.");
          setDemoReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [clientId, isDemoBootstrap, router]);

  useEffect(() => {
    if (!demoReady) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/connect/${clientId}/folders?path=${encodeURIComponent(path)}`)
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as {
          folders?: FolderItem[];
          error?: string;
          demoMode?: boolean;
        };
        if (!res.ok) {
          throw new Error(data.error || `Failed to load folders (${res.status})`);
        }
        return data;
      })
      .then((data: { folders?: FolderItem[]; demoMode?: boolean }) => {
        if (!cancelled) {
          setFolders(data.folders || []);
          if (data.demoMode) setStorageRootLabel("Dropbox (demo)");
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load folders");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [clientId, path, demoReady]);

  const pathSegments = path ? path.split("/").filter(Boolean) : [];

  const handleSelectFolder = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/connect/${clientId}/folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath: path || "/" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to set folder");
      if (data.redirect) {
        router.push(data.redirect);
        return;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSubmitting(false);
    }
  };

  if (!demoReady) {
    return (
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-16 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" aria-hidden />
        <p className="text-sm text-slate-600">Starting demo storage…</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Choose your main working folder
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Select the folder that contains the documents your accountant needs. The AI agent will scan this folder only.
        </p>
        {demoBootError && (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {demoBootError}
          </p>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
        <button
          type="button"
          onClick={() => setPath("")}
          className="text-slate-600 hover:text-slate-900 hover:underline"
        >
          {storageRootLabel}
        </button>
        {pathSegments.map((segment, i) => {
          const segmentPath = pathSegments.slice(0, i + 1).join("/");
          return (
            <span key={segmentPath} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setPath(segmentPath)}
                className="text-slate-600 hover:text-slate-900 hover:underline"
              >
                {segment}
              </button>
            </span>
          );
        })}
      </div>

      {error && (
        <div className="space-y-2 rounded-md bg-red-50 px-3 py-3 text-sm text-red-700">
          <p>{error}</p>
          {error.includes("Not connected") && (
            <p>
              <a
                href={`/connect/${clientId}`}
                className="font-medium underline hover:no-underline"
              >
                Go back and connect Dropbox first
              </a>
            </p>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-12">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          <span className="text-sm text-slate-500">Loading folders…</span>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-medium text-slate-700">
              {path ? "Subfolders" : "Your folders"}
            </p>
          </div>
          <ul className="max-h-64 overflow-y-auto divide-y divide-slate-100">
            {path && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const segs = path.split("/").filter(Boolean);
                    setPath(segs.slice(0, -1).join("/"));
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-slate-50"
                >
                  <Folder className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-600">.. (up)</span>
                </button>
              </li>
            )}
            {folders.map((f) => (
              <li key={f.path_display}>
                <button
                  type="button"
                  onClick={() => setPath(f.path_display)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-slate-50"
                >
                  <Folder className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-slate-900">{f.name}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
                </button>
              </li>
            ))}
            {!loading && folders.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-slate-500">
                {path ? "No subfolders here." : "No folders in root."}
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <p className="text-sm text-slate-600">
          Using: <strong className="text-slate-900">{path || "/"}</strong>
        </p>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={handleSelectFolder}
          disabled={loading || submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Use this folder"
          )}
        </Button>
      </div>
    </div>
  );
}
