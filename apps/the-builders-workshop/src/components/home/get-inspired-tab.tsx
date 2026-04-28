"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const APPS_JSON_URL = "/apps.json";

interface AppEntry {
  name: string;
  description: string;
  url: string;
  tags: string[];
  authors: string[];
  latestUpdate: string;
}

export function GetInspiredTab() {
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(APPS_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load apps (${res.status})`);
        return res.json();
      })
      .then((data: Record<string, AppEntry>) => {
        const prototypes = Object.values(data)
          .filter(
            (app) => app.tags?.includes("prototype") && !app.tags?.includes("deleted")
          )
          .sort((a, b) => {
            const da = new Date(a.latestUpdate || "").getTime() || 0;
            const db = new Date(b.latestUpdate || "").getTime() || 0;
            return db - da;
          });
        setApps(prototypes);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function normalizeUrl(url: string) {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }

  return (
    <div className="space-y-8 py-8">
      <div className="max-w-3xl space-y-2">
        <h2 className="text-2xl font-semibold text-neutral-900">Get Inspired</h2>
        <p className="text-base text-neutral-600">
          Prototypes built by the team. Open any of them to explore.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-neutral-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading prototypes…
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">Could not load prototypes: {error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <div
              key={app.url}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm overflow-hidden flex flex-col justify-between gap-4"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900">{app.name}</h3>
                {app.authors?.length > 0 && (
                  <p className="text-xs text-neutral-500">{app.authors.join(", ")}</p>
                )}
                <p className="text-sm text-neutral-600">{app.description}</p>
              </div>
              <div>
                <Button asChild size="sm" variant="outline">
                  <a href={normalizeUrl(app.url)} target="_blank" rel="noopener noreferrer">
                    Open
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

