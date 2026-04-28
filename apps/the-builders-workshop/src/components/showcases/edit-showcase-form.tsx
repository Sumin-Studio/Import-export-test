"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Showcase, UpdateShowcaseInput } from "@/lib/showcases";
import { getPrototypes } from "@/lib/prototypes";

interface EditShowcaseFormProps {
  showcase: Showcase;
  onClose: () => void;
  onSuccess: () => void;
  onDelete?: () => void;
}

export function EditShowcaseForm({ showcase, onClose, onSuccess, onDelete }: EditShowcaseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [communityShowcases, setCommunityShowcases] = useState<Showcase[]>([]);
  const hiddenPrototypeSlugs = new Set([
    "james-buchanan-builder-tool-v1", // hidden due to figma:asset import issue
    "angus-replit-v1", // hidden due to router/build complexity
  ]);
  const prototypeTemplates = getPrototypes().filter(
    (p) => !hiddenPrototypeSlugs.has(p.slug)
  );
  
  const [formData, setFormData] = useState<UpdateShowcaseInput>({
    title: showcase.title,
    description: showcase.description,
    deployed_url: showcase.deployed_url || "",
    github_url: showcase.github_url || "",
    base_prototype_slug: showcase.base_prototype_slug || "",
  });

  useEffect(() => {
    const fetchShowcases = async () => {
      try {
        setIsLoadingTemplates(true);
        const response = await fetch("/api/showcases");
        if (response.ok) {
          const data = await response.json();
          setCommunityShowcases(data.showcases || []);
        }
      } catch (err) {
        console.error("Error fetching showcases for template list", err);
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    fetchShowcases();
  }, []);

  const templateOptions = useMemo(() => {
    const baseOptions = prototypeTemplates.map((template) => ({
      value: template.slug,
      label: `${template.title || template.folderName || template.designer} (${template.designer})`,
    }));
    const communityOptions = communityShowcases.map((community) => ({
      value: `community:${community.id}`,
      label: `${community.title} (${community.author_name || community.author_email || "Community"})`,
    }));
    return [...baseOptions, ...communityOptions];
  }, [prototypeTemplates, communityShowcases]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title?.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.description?.trim()) {
      setError("Description is required");
      return;
    }

    if (!formData.deployed_url && !formData.github_url) {
      setError("At least one URL (deployed or GitHub) is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/showcases/${showcase.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          deployed_url: formData.deployed_url || null,
          github_url: formData.github_url || null,
          base_prototype_slug: formData.base_prototype_slug || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update showcase");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${showcase.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/showcases/${showcase.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete showcase");
      }

      onDelete?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsDeleting(false);
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
          <h2 className="text-xl font-semibold text-neutral-900">Edit Showcase</h2>
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
              {isLoadingTemplates && " Loading templates…"}
            </p>
          </div>

          {/* Deployed URL */}
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

          {/* GitHub URL */}
          <div>
            <label htmlFor="github_url" className="block text-sm font-medium text-neutral-900 mb-1">
              GitHub Repository
            </label>
            <input
              type="url"
              id="github_url"
              value={formData.github_url || ""}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <p className="text-xs text-neutral-500">
            At least one URL is required (deployed or GitHub)
          </p>

          {/* Actions */}
          <div className="flex justify-between gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              disabled={isSubmitting || isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              type="submit"
              className="bg-neutral-900 text-white hover:bg-neutral-800"
              disabled={isSubmitting || isDeleting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

