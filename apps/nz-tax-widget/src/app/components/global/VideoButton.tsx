"use client";

import { useEffect, useState } from "react";

interface VideoButtonProps {
  onClick: () => void;
}

export function VideoButton({ onClick }: VideoButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until after hydration to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-20 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      aria-label="Watch video"
      title="Watch video"
    >
      <span className="text-lg" role="img" aria-label="Play video">
        ▶️
      </span>
    </button>
  );
}
