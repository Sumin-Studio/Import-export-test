"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  DISCUSSION_GUIDE_SECTIONS,
  DISCUSSION_GUIDE_SPINE,
  buildSectionScheduleSlots,
  guideLineText,
  type GuideLine,
  type GuideSection,
} from "@/data/discussion-guide";

const STORAGE_KEY = "discussion-guide-checks-v4";

type Persisted = {
  checked: Record<string, boolean>;
  /** ISO timestamp when item was last checked on */
  checkedAt: Record<string, string>;
  /** Set on first checkbox check in a run; cleared when nothing is checked */
  sessionAnchorIso: string | null;
};

type PersistedV3 = {
  checked: Record<string, boolean>;
  checkedAt?: Record<string, string>;
  sessionStartTime?: string;
};

function earliestCheckedAtIso(
  checked: Record<string, boolean>,
  checkedAt: Record<string, string>
): string | null {
  let best: string | null = null;
  for (const [k, on] of Object.entries(checked)) {
    if (!on) continue;
    const iso = checkedAt[k];
    if (!iso) continue;
    if (!best || iso < best) best = iso;
  }
  return best;
}

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Persisted;
    }
  } catch {
    /* ignore */
  }
  try {
    const v3raw = localStorage.getItem("discussion-guide-checks-v3");
    if (v3raw) {
      const v3 = JSON.parse(v3raw) as PersistedV3;
      const checkedAt = v3.checkedAt ?? {};
      return {
        checked: v3.checked ?? {},
        checkedAt,
        sessionAnchorIso: earliestCheckedAtIso(v3.checked ?? {}, checkedAt),
      };
    }
  } catch {
    /* ignore */
  }
  try {
    const legacy = localStorage.getItem("discussion-guide-checks-v2");
    if (legacy) {
      const checked = JSON.parse(legacy) as Record<string, boolean>;
      return {
        checked,
        checkedAt: {},
        sessionAnchorIso: null,
      };
    }
  } catch {
    /* ignore */
  }
  return {
    checked: {},
    checkedAt: {},
    sessionAnchorIso: null,
  };
}

function savePersisted(p: Persisted) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

function formatClock(d: Date): string {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCheckedStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return formatClock(d);
}

function scheduleFeedback(
  section: GuideSection,
  slot: { startOffsetMinutes: number; durationMinutes: number } | undefined,
  anchor: Date,
  now: Date
): string {
  if (!slot) return "";

  const start = new Date(
    anchor.getTime() + slot.startOffsetMinutes * 60_000
  );
  const end = new Date(start.getTime() + slot.durationMinutes * 60_000);
  const t = now.getTime();

  if (section.id === "before") {
    if (t < start.getTime()) {
      const m = Math.round((start.getTime() - t) / 60_000);
      return m > 0 ? `About ${m} min before session start` : "At session start";
    }
    const m = Math.round((t - start.getTime()) / 60_000);
    return m > 0
      ? `About ${m} min after planned session start`
      : "At planned session start";
  }

  if (slot.durationMinutes <= 0) {
    return "";
  }

  if (t < start.getTime()) {
    const m = Math.round((start.getTime() - t) / 60_000);
    return m > 0
      ? `About ${m} min ahead of this block’s planned start`
      : "At this block’s planned start";
  }
  if (t > end.getTime()) {
    const m = Math.round((t - end.getTime()) / 60_000);
    return m > 0
      ? `About ${m} min behind this block’s planned end`
      : "At this block’s planned end";
  }
  return "Within this block’s planned window";
}

function CheckRow({
  label,
  robbHighlight,
  checked,
  checkedAt,
  onToggle,
}: {
  label: string;
  robbHighlight?: boolean;
  checked: boolean;
  checkedAt?: string;
  onToggle: () => void;
}) {
  const labelClass =
    checked && robbHighlight
      ? "text-red-400/90 line-through decoration-red-300/80"
      : checked
        ? "text-neutral-400 line-through decoration-neutral-300"
        : robbHighlight
          ? "font-medium text-red-600"
          : "";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full flex-col items-stretch gap-1 rounded-lg py-2.5 pl-1 pr-2 text-left text-[15px] leading-[1.35] tracking-[-0.01em] text-neutral-900 transition-colors active:bg-neutral-100/70 [-webkit-tap-highlight-color:transparent] hover:bg-neutral-50"
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border text-[12px] ${
            checked
              ? "border-[#007aff] bg-[#007aff] text-white"
              : "border-neutral-300 bg-white text-transparent"
          }`}
          aria-hidden
        >
          ✓
        </span>
        <span className={labelClass}>{label}</span>
      </span>
      {checked && checkedAt ? (
        <span className="pl-[34px] text-[12px] font-normal text-neutral-400">
          Checked at {formatCheckedStamp(checkedAt)}
        </span>
      ) : null}
    </button>
  );
}

function SectionCard({
  section,
  checked,
  checkedAt,
  setPersisted,
  plannedStartLabel,
}: {
  section: GuideSection;
  checked: Record<string, boolean>;
  checkedAt: Record<string, string>;
  setPersisted: React.Dispatch<React.SetStateAction<Persisted>>;
  plannedStartLabel: string | null;
}) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggle = useCallback(
    (key: string, sectionForSchedule: GuideSection) => {
      setPersisted((prev) => {
        const was = !!prev.checked[key];
        const nextChecked = !was;
        const hadAnyChecked = Object.values(prev.checked).some(Boolean);
        const stamp = new Date().toISOString();

        const nextCheckedAt = { ...prev.checkedAt };
        if (nextChecked) {
          nextCheckedAt[key] = stamp;
        } else {
          delete nextCheckedAt[key];
        }

        const nextCheckedMap = { ...prev.checked, [key]: nextChecked };
        const anyCheckedAfter = Object.values(nextCheckedMap).some(Boolean);

        let sessionAnchorIso = prev.sessionAnchorIso;
        if (nextChecked && !hadAnyChecked) {
          sessionAnchorIso = stamp;
        }
        if (!anyCheckedAfter) {
          sessionAnchorIso = null;
        }

        const next: Persisted = {
          ...prev,
          checked: nextCheckedMap,
          checkedAt: nextCheckedAt,
          sessionAnchorIso,
        };
        savePersisted(next);

        queueMicrotask(() => {
          if (nextChecked && next.sessionAnchorIso) {
            const slots = buildSectionScheduleSlots();
            const slot = slots.find((s) => s.sectionId === sectionForSchedule.id);
            const anchor = new Date(next.sessionAnchorIso!);
            const msg = scheduleFeedback(
              sectionForSchedule,
              slot,
              anchor,
              new Date()
            );
            setFeedback(msg || null);
          } else {
            setFeedback(null);
          }
        });

        return next;
      });
    },
    [setPersisted]
  );

  return (
    <section id={section.id} className="scroll-mt-4">
      <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <h2 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-neutral-900">
          {section.title}
        </h2>
        {section.duration ? (
          <span className="text-[13px] font-normal text-neutral-400">
            {section.duration}
          </span>
        ) : null}
        {plannedStartLabel ? (
          <span className="w-full text-[13px] font-normal text-neutral-500 sm:w-auto">
            Start: {plannedStartLabel}
          </span>
        ) : null}
      </div>

      {feedback ? (
        <p className="mb-2 mt-2 rounded-md bg-neutral-50 px-2 py-1.5 text-[13px] text-neutral-600">
          {feedback}
        </p>
      ) : null}

      <div className="mt-3 divide-y divide-neutral-100">
        {section.primary.map((line: GuideLine, i) => {
          const key = `${section.id}-p-${i}`;
          const text = guideLineText(line);
          const robb =
            typeof line === "object" && line.robbHighlight === true;
          return (
            <CheckRow
              key={key}
              label={text}
              robbHighlight={robb}
              checked={!!checked[key]}
              checkedAt={checkedAt[key]}
              onToggle={() => toggle(key, section)}
            />
          );
        })}
      </div>

      {section.secondary?.length || section.ifTime?.length ? (
        <details className="group mt-5">
          <summary className="cursor-pointer list-none text-[13px] text-neutral-400 [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-1">
              More
              <span className="text-[10px] opacity-60 transition group-open:rotate-180">
                ▼
              </span>
            </span>
          </summary>
          <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-neutral-500">
            {section.secondary?.length ? (
              <ul className="space-y-2">
                {section.secondary.map((line) => {
                  const t = guideLineText(line);
                  return (
                    <li key={t} className="pl-1">
                      {t}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            {section.ifTime?.length ? (
              <ul className="space-y-2">
                {section.ifTime.map((line) => {
                  const t = guideLineText(line);
                  return (
                    <li key={t} className="pl-1">
                      {t}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </details>
      ) : null}
    </section>
  );
}

export default function DiscussionGuidePage() {
  const [persisted, setPersisted] = useState<Persisted>({
    checked: {},
    checkedAt: {},
    sessionAnchorIso: null,
  });

  useEffect(() => {
    setPersisted(loadPersisted());
  }, []);

  const scheduleSlots = useMemo(() => buildSectionScheduleSlots(), []);

  const anchorDate = useMemo(() => {
    if (!persisted.sessionAnchorIso) return null;
    const d = new Date(persisted.sessionAnchorIso);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [persisted.sessionAnchorIso]);

  const sectionStartLabels = useMemo(() => {
    const map = new Map<string, string>();
    if (!anchorDate) return map;
    for (const slot of scheduleSlots) {
      const start = new Date(
        anchorDate.getTime() + slot.startOffsetMinutes * 60_000
      );
      map.set(slot.sectionId, formatClock(start));
    }
    return map;
  }, [anchorDate, scheduleSlots]);

  const clearAll = useCallback(() => {
    const next: Persisted = {
      checked: {},
      checkedAt: {},
      sessionAnchorIso: null,
    };
    setPersisted(next);
    savePersisted(next);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#e8f2fc] pb-16 text-neutral-900 antialiased"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
      }}
    >
      <header className="sticky top-0 z-10 border-b border-sky-900/10 bg-[#e8f2fc] px-4 py-3">
        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold tracking-[-0.03em] text-neutral-900">
              Discussion guide
            </h1>
            <p className="mt-0.5 text-[13px] text-neutral-500">
              Xero Protect sessions
            </p>
          </div>
          <div className="flex items-center gap-4 text-[15px]">
            <button
              type="button"
              onClick={clearAll}
              className="text-[#007aff] active:opacity-60"
            >
              Clear
            </button>
            <Link
              href="/"
              className="text-[#007aff] active:opacity-60"
            >
              Prototype
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-lg px-4 pb-12 pt-8">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
            <section className="border-b border-neutral-100 pb-8">
              <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-neutral-400">
                Flow
              </h2>
              <ol className="space-y-2 text-[15px] leading-snug text-neutral-800">
                {DISCUSSION_GUIDE_SPINE.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="w-5 shrink-0 text-right text-[13px] text-neutral-400">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-12 space-y-12 border-t border-neutral-100 pt-12">
              {DISCUSSION_GUIDE_SECTIONS.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  checked={persisted.checked}
                  checkedAt={persisted.checkedAt}
                  setPersisted={setPersisted}
                  plannedStartLabel={
                    sectionStartLabels.get(section.id) ?? null
                  }
                />
              ))}
            </div>

            <p className="mt-12 border-t border-neutral-100 pt-8 text-center text-[11px] text-neutral-400">
              Confluence · Xero Protect: Discussion Guide
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
