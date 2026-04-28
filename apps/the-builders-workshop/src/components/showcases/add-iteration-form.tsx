"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AddIterationFormProps {
  showcaseId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddIterationForm({ showcaseId, onSuccess, onCancel }: AddIterationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState("");
  const [summary, setSummary] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!version.trim()) {
      setError("Version is required");
      return;
    }

    if (!summary.trim()) {
      setError("Summary is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/showcases/${showcaseId}/iterations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version,
          summary,
          deployed_url: deployedUrl || null,
          github_url: null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add iteration");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Add New Version
        </h3>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-800 mb-3">
            {error}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="version" className="block text-sm font-medium text-neutral-900 mb-1">
          Version <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
          placeholder="1.1, 2.0, etc."
          required
        />
        <p className="text-xs text-neutral-500 mt-1">
          Use semantic versioning (e.g., 1.1, 2.0)
        </p>
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-neutral-900 mb-1">
          What changed? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
          placeholder="Describe what's new or changed..."
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="deployed_url" className="block text-sm font-medium text-neutral-900 mb-1">
          Updated Deployed URL (optional)
        </label>
        <input
          type="url"
          id="deployed_url"
          value={deployedUrl}
          onChange={(e) => setDeployedUrl(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
          placeholder="https://my-project.vercel.app"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          size="sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-neutral-900 text-white hover:bg-neutral-800"
          disabled={isSubmitting}
          size="sm"
        >
          {isSubmitting ? "Adding..." : "Add Version"}
        </Button>
      </div>
    </form>
  );
}

