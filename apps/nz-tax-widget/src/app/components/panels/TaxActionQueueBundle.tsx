"use client";

import { useCallback, useState } from "react";
import type {
  TaxActionQueueBundle as TaxActionQueueBundleType,
  TaxActionQueueCard,
} from "@/app/lib/taxActionsPanelContent";
import Sparkle from "@/app/components/ui/icons/Sparkle";
import clsx from "clsx";

type ActionKey = string;

export function TaxActionQueueBundle({
  bundle,
}: {
  bundle: TaxActionQueueBundleType;
}) {
  const [applied, setApplied] = useState<Record<ActionKey, boolean>>({});

  const markApplied = useCallback((cardId: string, actionId: string) => {
    const k = `${cardId}:${actionId}`;
    setApplied((m) => ({ ...m, [k]: true }));
  }, []);

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-content-primary text-[17px]/[24px] font-bold">
          {bundle.bundleTitle}
        </h3>
        <span className="text-content-secondary shrink-0 text-[15px]/[22px] font-normal tabular-nums">
          {bundle.bundleTotalCount}
        </span>
      </div>

      {bundle.cards.map((card) => (
        <QueueCard
          key={card.id}
          card={card}
          applied={applied}
          onAction={markApplied}
        />
      ))}
    </div>
  );
}

function QueueCard({
  card,
  applied,
  onAction,
}: {
  card: TaxActionQueueCard;
  applied: Record<string, boolean>;
  onAction: (cardId: string, actionId: string) => void;
}) {
  return (
    <div className="border-border-primary rounded-xl border bg-white shadow-[0_1px_3px_rgba(0,10,30,0.06)]">
      <div className="flex items-baseline justify-between gap-2 border-b border-[rgba(0,10,30,0.08)] px-3 py-2.5">
        <p className="text-content-primary min-w-0 flex-1 text-[14px]/[20px] font-bold">
          {card.title}
        </p>
        <span className="text-content-secondary shrink-0 text-[13px]/[18px] tabular-nums">
          {card.count}
        </span>
      </div>

      <div className="overflow-x-auto px-0">
        <table className="w-full min-w-[320px] text-left text-[13px]/[18px]">
          <thead>
            <tr className="text-content-secondary border-b border-[rgba(0,10,30,0.08)]">
              <th className="px-3 py-2 font-semibold">Date</th>
              <th className="px-3 py-2 font-semibold">Contact</th>
              <th className="px-3 py-2 font-semibold">Description</th>
              <th className="px-3 py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {card.rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[rgba(0,10,30,0.06)] last:border-b-0"
              >
                {row.placeholder ? (
                  <>
                    <td className="px-3 py-2.5" colSpan={4}>
                      <div className="flex flex-col gap-1.5">
                        <div className="h-2.5 w-16 rounded bg-[#eceff1]" />
                        <div className="h-2.5 max-w-full rounded bg-[#eceff1]" />
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="text-content-primary px-3 py-2.5 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-3 py-2.5">
                      <button
                        type="button"
                        className="text-[#0078c8] font-semibold hover:underline"
                      >
                        {row.contact}
                      </button>
                    </td>
                    <td className="text-content-primary px-3 py-2.5">
                      {row.description}
                    </td>
                    <td className="text-content-primary px-3 py-2.5 text-right font-medium whitespace-nowrap">
                      {row.amount}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[rgba(0,10,30,0.08)] px-3 py-3">
        {card.actions.map((action) => {
          const k = `${card.id}:${action.id}`;
          const done = applied[k];
          if (action.variant === "dismiss") {
            return (
              <button
                key={action.id}
                type="button"
                disabled={done}
                onClick={() => onAction(card.id, action.id)}
                className="text-brand-primary hover:text-brand-secondary px-1 py-1.5 text-[13px]/[16px] font-semibold disabled:opacity-40"
              >
                {action.label}
              </button>
            );
          }
          if (action.variant === "secondary") {
            return (
              <button
                key={action.id}
                type="button"
                disabled={done}
                onClick={() => onAction(card.id, action.id)}
                className="border-border-primary text-content-primary hover:bg-background-primary rounded-full border bg-white px-3 py-1.5 text-[13px]/[16px] font-semibold disabled:opacity-40"
              >
                {action.label}
              </button>
            );
          }
          return (
            <button
              key={action.id}
              type="button"
              disabled={done}
              onClick={() => onAction(card.id, action.id)}
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px]/[16px] font-bold text-white disabled:opacity-40",
                "bg-[#0078c8] hover:bg-[#0066a8]"
              )}
            >
              <Sparkle className="size-3.5 shrink-0 text-white" />
              {action.label}
            </button>
          );
        })}
      </div>
      {card.actions.some((a) => applied[`${card.id}:${a.id}`]) ? (
        <p className="text-content-secondary border-t border-[rgba(0,10,30,0.08)] px-3 py-2 text-[12px]/[16px]">
          Action recorded (prototype)
        </p>
      ) : null}
    </div>
  );
}
