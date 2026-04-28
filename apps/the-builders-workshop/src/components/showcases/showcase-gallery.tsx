"use client";

import { ShowcaseCard } from "./showcase-card";
import type { Showcase } from "@/lib/showcases";

interface ShowcaseGalleryProps {
  showcases: Showcase[];
  currentUserId?: string | null;
  isLoading?: boolean;
  onEdit?: (showcase: Showcase) => void;
  onViewChangelog?: (showcase: Showcase) => void;
}

export function ShowcaseGallery({ 
  showcases, 
  currentUserId, 
  isLoading,
  onEdit,
  onViewChangelog
}: ShowcaseGalleryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="rounded-xl border border-neutral-200 bg-white overflow-hidden animate-pulse"
          >
            <div className="aspect-video bg-neutral-100" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-neutral-100 rounded w-3/4" />
              <div className="h-4 bg-neutral-100 rounded w-full" />
              <div className="h-4 bg-neutral-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (showcases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 text-sm">
          No showcases yet. Be the first to share your work!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {showcases.map((showcase) => (
        <ShowcaseCard
          key={showcase.id}
          showcase={showcase}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onViewChangelog={onViewChangelog}
        />
      ))}
    </div>
  );
}

