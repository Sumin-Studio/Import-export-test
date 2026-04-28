"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";

interface ReactionButtonProps {
  sourceType: string;
  sourceId: string;
  reactionType?: string;
}

export function ReactionButton({
  sourceType,
  sourceId,
  reactionType = "heart",
}: ReactionButtonProps) {
  const [count, setCount] = useState(0);
  const [userReacted, setUserReacted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReactions = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        source_type: sourceType,
        source_id: sourceId,
        reaction_type: reactionType,
      });
      const res = await fetch(`/api/reactions?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setCount(data.count ?? 0);
      setUserReacted(data.userReacted ?? false);
    } catch {
      // Silently fail — reactions are non-critical
    }
  }, [sourceType, sourceId, reactionType]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    // Optimistic update
    const wasReacted = userReacted;
    setUserReacted(!wasReacted);
    setCount((prev) => (wasReacted ? Math.max(0, prev - 1) : prev + 1));
    setIsLoading(true);

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_type: sourceType,
          source_id: sourceId,
          reaction_type: reactionType,
        }),
      });

      if (!res.ok) {
        // Revert on failure
        setUserReacted(wasReacted);
        setCount((prev) => (wasReacted ? prev + 1 : Math.max(0, prev - 1)));
        return;
      }

      const data = await res.json();
      setCount(data.count ?? 0);
      setUserReacted(data.userReacted ?? false);
    } catch {
      // Revert on failure
      setUserReacted(wasReacted);
      setCount((prev) => (wasReacted ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      title="Used it"
      aria-label={userReacted ? "Remove reaction" : "Mark as used"}
      className={`
        inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium
        transition-colors cursor-pointer select-none
        ${
          userReacted
            ? "text-rose-500 hover:text-rose-400"
            : "text-neutral-400 hover:text-rose-400"
        }
      `}
    >
      <Heart
        className={`h-3.5 w-3.5 transition-all ${isLoading ? "opacity-50" : ""}`}
        fill={userReacted ? "currentColor" : "none"}
      />
      {count > 0 && <span>{count}</span>}
    </button>
  );
}
