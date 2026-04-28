"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ConceptDetailNavProps {
  prevId: string | null;
  nextId: string | null;
}

export function ConceptDetailNav({ prevId, nextId }: ConceptDetailNavProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && prevId) {
        e.preventDefault();
        router.push(`/app/explorations/${prevId}`);
      } else if (e.key === "ArrowRight" && nextId) {
        e.preventDefault();
        router.push(`/app/explorations/${nextId}`);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, prevId, nextId]);

  return null;
}
