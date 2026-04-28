"use client";

import { useEffect, useState } from "react";

interface VideoButtonProps {
  onClick: () => void;
}

export function VideoButton({ onClick }: VideoButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setIsMounted(true);
  }, []);

  // Don't render until after hydration to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 z-50 cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
      aria-label="Watch video"
      title="Watch video"
    >
      <span className="text-lg" role="img" aria-label="Play video">
        ▶️
      </span>
    </button>
  );
}
