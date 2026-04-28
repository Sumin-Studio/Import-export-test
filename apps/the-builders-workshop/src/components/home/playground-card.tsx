"use client";

import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PlaygroundItemType = "base" | "community";

export interface PlaygroundItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: PlaygroundItemType;
  createdAt?: string;
  updatedAt?: string;
  authorUserId?: string | null;
  basePrototypeSlug?: string | null;
  viewUrl?: string | null;
  changelogUrl?: string | null;
  externalUrl?: string | null;
}

interface PlaygroundCardProps {
  item: PlaygroundItem;
  canEdit?: boolean;
  onEdit?: (id: string) => void;
}

export function PlaygroundCard({ item, canEdit, onEdit }: PlaygroundCardProps) {
  const isFork = Boolean(item.basePrototypeSlug);
  const viewHref = item.viewUrl || item.externalUrl || "#";
  const hasView = viewHref !== "#";
  // Date functionality removed per request; kept for future use if needed
  // const displayDate = item.updatedAt || item.createdAt;
  // const formatDate = (date: string | undefined) => { ... };

  return (
    <div
      className={`group flex items-start justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 ${isFork ? "py-2.5" : "py-3"} hover:border-neutral-300 transition-colors`}
      style={isFork ? { marginLeft: "32px" } : undefined}
    >
      <div className="min-w-0 space-y-1 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
            {item.subtitle && (
              <p className="text-sm text-neutral-600 truncate">by {item.subtitle}</p>
            )}
            {canEdit && item.type === "community" && (
              <button
                type="button"
                className="text-xs text-neutral-500 hover:text-neutral-900 underline opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => onEdit?.(item.id)}
              >
                (edit)
              </button>
            )}
          </div>
          {/* Date hidden per request; keep placeholder data for consistency */}
        </div>
        {item.description && (
          <p className="text-sm text-neutral-600 line-clamp-2">{item.description}</p>
        )}
        {item.changelogUrl && (
          <Link
            href={item.changelogUrl}
            className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900"
          >
            <FileText className="h-4 w-4" />
            Changelog
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link href={viewHref} className="inline-flex">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={!hasView}
          >
            <ExternalLink className="h-4 w-4 mr-1.5" />
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
