"use client";

import { useState, useEffect } from "react";
import { X, Plus, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddIterationForm } from "./add-iteration-form";
import type { ShowcaseWithIterations } from "@/lib/showcases";
import { formatShowcaseUrl } from "@/lib/showcases";

interface ChangelogModalProps {
  showcaseId: string;
  currentUserId?: string | null;
  onClose: () => void;
}

export function ChangelogModal({ showcaseId, currentUserId, onClose }: ChangelogModalProps) {
  const [showcase, setShowcase] = useState<ShowcaseWithIterations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchShowcase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/showcases/${showcaseId}`);
      if (response.ok) {
        const data = await response.json();
        setShowcase(data.showcase);
      }
    } catch (error) {
      console.error("Error fetching showcase:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShowcase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showcaseId]);

  const handleIterationAdded = () => {
    setShowAddForm(false);
    fetchShowcase();
  };

  const canAddIteration = currentUserId && showcase?.author_user_id === currentUserId;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {showcase?.title || "Changelog"}
            </h2>
            {showcase?.author_name && (
              <p className="text-sm text-neutral-600 mt-0.5">
                by {showcase.author_name}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-200" />
                    <div className="w-px flex-1 bg-neutral-200 min-h-[40px]" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="h-4 bg-neutral-100 rounded w-1/4 mb-2" />
                    <div className="h-3 bg-neutral-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : showcase ? (
            <>
              {canAddIteration && !showAddForm && (
                <div className="mb-6">
                  <Button
                    onClick={() => setShowAddForm(true)}
                    size="sm"
                    className="bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Update
                  </Button>
                </div>
              )}

              {showAddForm && (
                <div className="mb-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                  <AddIterationForm
                    showcaseId={showcaseId}
                    onSuccess={handleIterationAdded}
                    onCancel={() => setShowAddForm(false)}
                  />
                </div>
              )}

              {showcase.iterations && showcase.iterations.length > 0 ? (
                <div className="space-y-0">
                  {showcase.iterations.map((iteration, index) => (
                    <div key={iteration.id} className="flex gap-3">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-400 flex-shrink-0 mt-2" />
                        {index < showcase.iterations.length - 1 && (
                          <div className="w-px flex-1 bg-neutral-200 min-h-[40px]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-neutral-900">
                            v{iteration.version}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {formatDate(iteration.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-700 mb-2">
                          {iteration.summary}
                        </p>
                        {/* Iteration URLs */}
                        {(iteration.deployed_url || iteration.github_url) && (
                          <div className="flex flex-wrap gap-2 text-xs mt-2">
                            {iteration.deployed_url && (
                              <a
                                href={iteration.deployed_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {formatShowcaseUrl(iteration.deployed_url)}
                              </a>
                            )}
                            {iteration.github_url && (
                              <a
                                href={iteration.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 underline"
                              >
                                <Github className="h-3 w-3" />
                                {formatShowcaseUrl(iteration.github_url)}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-600 text-center py-8">
                  No iterations yet.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-neutral-600 text-center py-8">
              Failed to load changelog.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-6 py-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

