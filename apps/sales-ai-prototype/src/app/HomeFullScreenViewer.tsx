"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, Suspense } from "react";

export interface FlatImage {
  index: number;
  src: string;
  description: string;
  sectionTitle: string;
  href?: string;
  figmaUrl?: string;
}

function HomeFullScreenViewerInner({ flatImages }: { flatImages: FlatImage[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const currentIndex = viewParam !== null ? parseInt(viewParam, 10) : null;
  const validIndex =
    currentIndex !== null &&
    !isNaN(currentIndex) &&
    currentIndex >= 0 &&
    currentIndex < flatImages.length
      ? currentIndex
      : null;

  const goTo = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", String(index));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const goPrev = useCallback(() => {
    if (validIndex === null || validIndex <= 0) return;
    goTo(validIndex - 1);
  }, [validIndex, goTo]);

  const goNext = useCallback(() => {
    if (validIndex === null || validIndex >= flatImages.length - 1) return;
    goTo(validIndex + 1);
  }, [validIndex, flatImages.length, goTo]);

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("view");
    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (validIndex === null) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [validIndex, goNext, goPrev, close]);

  if (validIndex === null) return null;

  const item = flatImages[validIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-white">
      <header className="flex shrink-0 items-center justify-between px-4 py-3 md:px-8">
        <button
          type="button"
          onClick={close}
          className="text-sm font-medium text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1F68DD] focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
        >
          ← Back
        </button>
        <span className="text-sm text-white/50">
          {validIndex + 1} of {flatImages.length}
          {item.sectionTitle ? ` · ${item.sectionTitle}` : ""}
        </span>
      </header>

      <main className="flex flex-1 min-h-0 flex-row">
        {/* Image flush left */}
        <div className="flex-1 min-w-0 relative flex items-center justify-start pl-0 pr-4">
          <div className="relative w-full h-full min-h-[50vh]">
            <Image
              src={encodeURI(item.src)}
              alt={item.description}
              fill
              className="object-contain object-left"
              sizes="(max-width: 1024px) 70vw, 60vw"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Blurb on the right */}
        <aside className="shrink-0 w-80 md:w-96 flex flex-col justify-center py-6 pr-6 md:pr-8 gap-4">
          <p className="text-sm text-white/80 leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-col gap-2">
            {item.href && (
              <a
                href={item.href}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1F68DD] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1a5abf] transition-colors"
              >
                Open prototype →
              </a>
            )}
            {item.figmaUrl && (
              <a
                href={item.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                  <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                  <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                  <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                  <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                </svg>
                View in Figma
              </a>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export function HomeFullScreenViewer({ flatImages }: { flatImages: FlatImage[] }) {
  return (
    <Suspense fallback={null}>
      <HomeFullScreenViewerInner flatImages={flatImages} />
    </Suspense>
  );
}
