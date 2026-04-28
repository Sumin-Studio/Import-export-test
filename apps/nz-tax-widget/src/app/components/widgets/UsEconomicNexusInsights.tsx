"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { MoreButton } from "@/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import {
  getNexusRowForStateName,
  NEXUS_STATUS_FILL,
  type NexusInsightStatus,
} from "@/app/lib/mockData/usEconomicNexus";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

const US_ATLAS_STATES_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MAP_W = 960;
const MAP_H = 560;

type HoverInfo = {
  name: string;
  status: NexusInsightStatus;
  clients: string[];
};

function legendItem(
  status: NexusInsightStatus,
  label: string,
  dotId: string
) {
  return (
    <div className="flex items-center gap-2" key={label}>
      <span
        id={dotId}
        className="size-[18px] shrink-0 rounded-full border border-[#e6e7e9]"
        style={{ backgroundColor: NEXUS_STATUS_FILL[status] }}
        aria-hidden
      />
      <span className="text-content-primary text-[13px]/[20px] font-semibold">
        {label}
      </span>
    </div>
  );
}

export function UsEconomicNexusInsights({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const stripId = useId();
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<HoverInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(US_ATLAS_STATES_URL);
        if (!res.ok) throw new Error(`Map data failed (${res.status})`);
        const topology = (await res.json()) as Topology;
        const fc = feature(
          topology,
          topology.objects.states
        ) as unknown as FeatureCollection;
        if (!cancelled) setGeo(fc);
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "Could not load US map data."
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { path, pathFor } = useMemo(() => {
    if (!geo) {
      return {
        path: null as ReturnType<typeof geoPath> | null,
        pathFor: (_f: Feature<Geometry>) => null as string | null,
      };
    }
    const projection = geoAlbersUsa().fitSize([MAP_W, MAP_H], geo);
    const path = geoPath(projection);
    return {
      path,
      pathFor: (f: Feature<Geometry>) => path(f) ?? null,
    };
  }, [geo]);

  const namedFeatures = useMemo(() => {
    if (!geo) return [];
    return geo.features
      .map((f) => ({
        f,
        name: String(
          (f.properties as Record<string, unknown> | null)?.name ?? ""
        ),
      }))
      .filter((x) => x.name);
  }, [geo]);

  const onEnterState = useCallback((name: string) => {
    const row = getNexusRowForStateName(name);
    setHovered({ name, status: row.status, clients: row.clients });
  }, []);

  const onLeaveState = useCallback(() => {
    setHovered(null);
  }, []);

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[522px] min-h-0 flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex h-[54px] shrink-0 items-center justify-between gap-2 pt-3.5 pr-2 pb-2 pl-6">
          <h3 className="text-content-primary text-[17px]/[24px] font-bold">
            Economic nexus insights
          </h3>
          <MoreButton
            menu={
              <button
                type="button"
                className="flex w-full min-w-[240px] items-center gap-2 bg-white px-5 py-2.5 text-left text-[15px]/[24px] text-[#000a1e] hover:bg-[#f8f8f9]"
              >
                About this map
              </button>
            }
            menuClassName="max-w-[280px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {loadError ? (
              <p className="text-content-secondary px-3 py-6 text-center text-[13px]/[20px]">
                {loadError}
              </p>
            ) : !geo || !path ? (
              <div className="text-content-secondary flex h-full items-center justify-center text-[13px]/[20px]">
                Loading map…
              </div>
            ) : (
              <svg
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                className="h-full max-h-[360px] w-full touch-manipulation"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-labelledby={`${stripId}-title`}
              >
                <title id={`${stripId}-title`}>
                  United States economic nexus status by state
                </title>
                {(hovered
                  ? namedFeatures.filter((x) => x.name !== hovered.name)
                  : namedFeatures
                ).map(({ f, name }) => {
                  const row = getNexusRowForStateName(name);
                  const d = pathFor(f);
                  if (!d) return null;
                  return (
                    <path
                      key={name}
                      d={d}
                      fill={NEXUS_STATUS_FILL[row.status]}
                      stroke="#ffffff"
                      strokeWidth={0.65}
                      paintOrder="stroke fill"
                      className="cursor-pointer transition-[stroke,stroke-width] duration-200 ease-out"
                      onMouseEnter={() => onEnterState(name)}
                      onMouseLeave={onLeaveState}
                      onFocus={() => onEnterState(name)}
                      onBlur={onLeaveState}
                      tabIndex={0}
                      aria-label={`${name}, ${row.status}`}
                    />
                  );
                })}
                {(() => {
                  const hit = hovered
                    ? namedFeatures.find((x) => x.name === hovered.name)
                    : null;
                  if (!hit) return null;
                  const row = getNexusRowForStateName(hit.name);
                  const d = pathFor(hit.f);
                  if (!d) return null;
                  return (
                    <g key={`${hit.name}-hover-layer`}>
                      <path
                        d={d}
                        fill={NEXUS_STATUS_FILL[row.status]}
                        stroke="#1e3a8a"
                        strokeWidth={3.25}
                        paintOrder="stroke fill"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        style={{
                          filter:
                            "drop-shadow(0 0 0 rgb(255,255,255)) drop-shadow(0 0 2px rgb(255,255,255)) drop-shadow(0 0 6px rgba(30,58,138,0.4)) drop-shadow(0 4px 14px rgba(15,23,42,0.28))",
                        }}
                        className="pointer-events-none"
                        aria-hidden
                      />
                      <path
                        d={d}
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth={14}
                        className="cursor-pointer"
                        onMouseEnter={() => onEnterState(hit.name)}
                        onMouseLeave={onLeaveState}
                        onFocus={() => onEnterState(hit.name)}
                        onBlur={onLeaveState}
                        tabIndex={0}
                        aria-label={`${hit.name}, ${row.status}`}
                      />
                    </g>
                  );
                })()}
              </svg>
            )}
          </div>

          <div
            id={`${stripId}-strip`}
            className="border-background-tertiary min-h-[48px] shrink-0 border-t px-4 py-2.5"
            aria-live="polite"
          >
            {hovered ? (
              <div className="text-[13px]/[20px]">
                <span className="text-content-primary font-bold">
                  {hovered.name}
                </span>
                <span className="text-content-secondary"> — </span>
                {hovered.clients.length > 0 ? (
                  <span className="text-content-primary">
                    {hovered.clients.join(", ")}
                  </span>
                ) : (
                  <span className="text-content-secondary">
                    No affected clients in this state.
                  </span>
                )}
              </div>
            ) : (
              <p className="text-content-secondary text-[13px]/[20px]">
                Hover a state to see affected clients.
              </p>
            )}
          </div>

          <div
            className="flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3"
            role="list"
            aria-label="Nexus status legend"
          >
            {legendItem("inactive", "Inactive", `${stripId}-lg-inactive`)}
            {legendItem("approaching", "Approaching", `${stripId}-lg-app`)}
            {legendItem("exposed", "Exposed", `${stripId}-lg-exp`)}
            {legendItem("active", "Active", `${stripId}-lg-act`)}
          </div>
        </div>
      </div>
    </CustomizationOverlay>
  );
}
