"use client";

import Image from "next/image";
import { ExternalLink, Github, Pencil, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Showcase } from "@/lib/showcases";
import { getShowcasePreviewUrl, formatShowcaseUrl } from "@/lib/showcases";

interface ShowcaseCardProps {
  showcase: Showcase;
  currentUserId?: string | null;
  onEdit?: (showcase: Showcase) => void;
  onViewChangelog?: (showcase: Showcase) => void;
}

export function ShowcaseCard({ 
  showcase, 
  currentUserId, 
  onEdit,
  onViewChangelog
}: ShowcaseCardProps) {
  const canEdit = currentUserId && showcase.author_user_id === currentUserId;
  // Use avatar_seed for unique avatars
  const previewUrl = getShowcasePreviewUrl(showcase.avatar_seed);
  
  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-300 transition-colors flex flex-col h-full">
      {/* DiceBear Preview */}
      <div className="aspect-video bg-neutral-50 flex items-center justify-center overflow-hidden relative">
        <Image 
          src={previewUrl}
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex flex-col flex-1">
        {/* Content area that grows */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {showcase.title}
            </h3>
            <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
              {showcase.description}
            </p>
          </div>

          {/* Author and Version Info */}
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>by {showcase.author_name || "Unknown"}</span>
            {showcase.iteration_count !== undefined && showcase.iteration_count > 0 && (
              <span>{showcase.iteration_count} version{showcase.iteration_count !== 1 ? 's' : ''}</span>
            )}
          </div>

          {/* URLs */}
          {(showcase.deployed_url || showcase.github_url) && (
            <div className="flex flex-wrap gap-2 text-xs">
              {showcase.deployed_url && (
                <a
                  href={showcase.deployed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  {formatShowcaseUrl(showcase.deployed_url)}
                </a>
              )}
              {showcase.github_url && (
                <a
                  href={showcase.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 underline"
                >
                  <Github className="h-3 w-3" />
                  {formatShowcaseUrl(showcase.github_url)}
                </a>
              )}
            </div>
          )}

          {/* Base Prototype */}
          {showcase.base_prototype_slug && (
            <p className="text-xs text-neutral-500">
              Based on: {showcase.base_prototype_slug}
            </p>
          )}
        </div>

        {/* Actions - Always at bottom */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewChangelog?.(showcase)}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            Changelog
          </Button>
          
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(showcase)}
            >
              <Pencil className="h-4 w-4 mr-1.5" />
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

