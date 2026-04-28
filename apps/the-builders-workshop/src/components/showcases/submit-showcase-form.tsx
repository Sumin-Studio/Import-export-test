"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreateShowcaseInput } from "@/lib/showcases";
import { getPrototypes } from "@/lib/prototypes";
import type { Showcase } from "@/lib/showcases";

interface SubmitShowcaseFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function SubmitShowcaseForm({ onClose, onSuccess }: SubmitShowcaseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocalOnly, setIsLocalOnly] = useState(false);
  const [communityShowcases, setCommunityShowcases] = useState<Showcase[]>([]);
  const [isLoadingShowcases, setIsLoadingShowcases] = useState(false);
  const hiddenPrototypeSlugs = new Set([
    "james-buchanan-builder-tool-v1", // hidden due to figma:asset import issue
    "angus-replit-v1", // hidden due to router/build complexity
  ]);
  const prototypeTemplates = getPrototypes().filter(
    (p) => !hiddenPrototypeSlugs.has(p.slug)
  );

  useEffect(() => {
    const fetchShowcases = async () => {
      try {
        setIsLoadingShowcases(true);
        const response = await fetch("/api/showcases");
        if (response.ok) {
          const data = await response.json();
          setCommunityShowcases(data.showcases || []);
        }
      } catch (err) {
        console.error("Error fetching showcases for template list", err);
      } finally {
        setIsLoadingShowcases(false);
      }
    };
    fetchShowcases();
  }, []);

  const templateOptions = useMemo(() => {
    const baseOptions = prototypeTemplates.map((template) => ({
      value: template.slug,
      label: `${template.title || template.folderName || template.designer} (${template.designer})`,
    }));
    const communityOptions = communityShowcases.map((showcase) => ({
      value: `community:${showcase.id}`,
      label: `${showcase.title} (${showcase.author_name || showcase.author_email || "Community"})`,
    }));
    return [...baseOptions, ...communityOptions];
  }, [prototypeTemplates, communityShowcases]);
  
  const [formData, setFormData] = useState<CreateShowcaseInput>({
    title: "",
    description: "",
    deployed_url: "",
    github_url: "",
    base_prototype_slug: "",
    initial_version_summary: "Initial release",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    // Only require URLs if not local only
    if (!isLocalOnly && !formData.deployed_url?.trim() && !formData.github_url?.trim()) {
      setError("At least one URL (deployed or GitHub) is required, or check 'Built locally only'");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/showcases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          deployed_url: isLocalOnly ? null : (formData.deployed_url?.trim() || null),
          github_url: isLocalOnly ? null : (formData.github_url?.trim() || null),
          base_prototype_slug: formData.base_prototype_slug || null,
          initial_version_summary: formData.initial_version_summary,
          is_local_only: isLocalOnly,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create showcase");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        // Close when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">Share Your Work</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-900 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
              placeholder="My awesome project"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-900 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
              placeholder="Tell us about your project..."
              rows={4}
              required
            />
          </div>

          {/* Prototype Template Dropdown */}
          <div>
            <label htmlFor="prototype_template" className="block text-sm font-medium text-neutral-900 mb-1">
              Based on Prototype Template (optional)
            </label>
            <select
              id="prototype_template"
              value={formData.base_prototype_slug || ""}
              onChange={(e) => setFormData({ ...formData, base_prototype_slug: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
            >
              <option value="">None - Built from scratch</option>
              {templateOptions.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-neutral-500 mt-1">
              Select a prototype template or community build if your project was based on it.
              {isLoadingShowcases && " Loading templates…"}
            </p>
          </div>

          {/* Local Only Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="localOnly"
              checked={isLocalOnly}
              onChange={(e) => setIsLocalOnly(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
            />
            <label htmlFor="localOnly" className="text-sm text-neutral-700">
              Built locally only (no deployed URL or GitHub repo yet)
            </label>
          </div>

          {/* URLs - only show if not local only */}
          {!isLocalOnly && (
            <>
              <div>
                <label htmlFor="deployed_url" className="block text-sm font-medium text-neutral-900 mb-1">
                  Deployed URL
                </label>
                <input
                  type="url"
                  id="deployed_url"
                  value={formData.deployed_url || ""}
                  onChange={(e) => setFormData({ ...formData, deployed_url: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
                  placeholder="https://my-project.vercel.app"
                />
              </div>

              <p className="text-xs text-neutral-500">
                Deployed URL is required
              </p>
            </>
          )}

          {/* Initial Version Summary */}
          <div>
            <label htmlFor="version_summary" className="block text-sm font-medium text-neutral-900 mb-1">
              Version Summary (optional)
            </label>
            <input
              type="text"
              id="version_summary"
              value={formData.initial_version_summary}
              onChange={(e) => setFormData({ ...formData, initial_version_summary: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
              placeholder="Initial release"
            />
            <p className="text-xs text-neutral-500 mt-1">
              This will be recorded as version 1.0
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-neutral-900 text-white hover:bg-neutral-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Share Work"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

