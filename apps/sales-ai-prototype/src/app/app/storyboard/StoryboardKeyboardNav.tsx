"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

interface StoryboardKeyboardNavProps {
  prevId: string | null;
  nextId: string | null;
  children: React.ReactNode;
}

export function StoryboardKeyboardNav({
  prevId,
  nextId,
  children,
}: StoryboardKeyboardNavProps) {
  const router = useRouter();

  const goNext = useCallback(() => {
    if (nextId) router.push(`/app/storyboard/${nextId}`);
  }, [nextId, router]);

  const goPrev = useCallback(() => {
    if (prevId) router.push(`/app/storyboard/${prevId}`);
  }, [prevId, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return <>{children}</>;
}
