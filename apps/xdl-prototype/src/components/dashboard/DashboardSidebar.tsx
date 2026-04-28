"use client";

import { cn } from "@/lib/utils";
import type {
  FilterState,
  ReadinessTier,
  NexusRisk,
  ComplexityTier,
  BottleneckOwner,
} from "@/lib/data-store";
import { getUniquePartners, getUniqueServiceLines } from "@/lib/data-store";
import type { Client } from "@/lib/data-store";

const READINESS_OPTIONS: { value: ReadinessTier; label: string }[] = [
  { value: "ready", label: "Ready" },
  { value: "action_required", label: "Action required" },
  { value: "blocked", label: "Blocked" },
];

const NEXUS_OPTIONS: { value: NexusRisk; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const COMPLEXITY_OPTIONS: { value: ComplexityTier; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "high", label: "High" },
];

const BOTTLENECK_OPTIONS: { value: BottleneckOwner; label: string }[] = [
  { value: "client", label: "Client" },
  { value: "internal", label: "Internal" },
];

interface FilterSectionProps<T extends string> {
  title: string;
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}

function FilterSection<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: FilterSectionProps<T>) {
  return (
    <section className="border-b border-border-subtle py-4 first:pt-0 last:border-b-0">
      <h3 className="text-label-small-semibold text-text-muted mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <ul className="flex flex-col gap-2" role="group" aria-label={title}>
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <li key={opt.value}>
              <label className="flex cursor-pointer items-center gap-2 text-body-small-regular text-text-default">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt.value)}
                  className="size-4 rounded border-border-regular"
                  aria-label={`Filter by ${opt.label}`}
                />
                <span>{opt.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

interface DashboardSidebarProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  clients: Client[];
  className?: string;
}

export function DashboardSidebar({
  filterState,
  onFilterChange,
  clients,
  className,
}: DashboardSidebarProps) {
  const partners = getUniquePartners(clients);
  const serviceLines = getUniqueServiceLines(clients);

  const toggleReadiness = (v: ReadinessTier) => {
    const next = filterState.readinessTiers.includes(v)
      ? filterState.readinessTiers.filter((x) => x !== v)
      : [...filterState.readinessTiers, v];
    onFilterChange({ readinessTiers: next });
  };
  const togglePartner = (v: string) => {
    const next = filterState.partners.includes(v)
      ? filterState.partners.filter((x) => x !== v)
      : [...filterState.partners, v];
    onFilterChange({ partners: next });
  };
  const toggleService = (v: string) => {
    const next = filterState.serviceLines.includes(v)
      ? filterState.serviceLines.filter((x) => x !== v)
      : [...filterState.serviceLines, v];
    onFilterChange({ serviceLines: next });
  };
  const toggleNexus = (v: NexusRisk) => {
    const next = filterState.nexusRisk.includes(v)
      ? filterState.nexusRisk.filter((x) => x !== v)
      : [...filterState.nexusRisk, v];
    onFilterChange({ nexusRisk: next });
  };
  const toggleComplexity = (v: ComplexityTier) => {
    const next = filterState.complexityTiers.includes(v)
      ? filterState.complexityTiers.filter((x) => x !== v)
      : [...filterState.complexityTiers, v];
    onFilterChange({ complexityTiers: next });
  };
  const toggleBottleneck = (v: BottleneckOwner) => {
    const next = filterState.bottleneckOwners.includes(v)
      ? filterState.bottleneckOwners.filter((x) => x !== v)
      : [...filterState.bottleneckOwners, v];
    onFilterChange({ bottleneckOwners: next });
  };

  return (
    <nav
      aria-label="Filters"
      className={cn(
        "w-[240px] shrink-0 border-r border-border-subtle bg-background-secondary px-4 pb-6",
        className
      )}
    >
      <FilterSection
        title="Readiness"
        options={READINESS_OPTIONS}
        selected={filterState.readinessTiers}
        onToggle={toggleReadiness}
      />
      <FilterSection
        title="Partner"
        options={partners.map((p) => ({ value: p, label: p }))}
        selected={filterState.partners}
        onToggle={togglePartner}
      />
      <FilterSection
        title="Service line"
        options={serviceLines.map((s) => ({ value: s, label: s }))}
        selected={filterState.serviceLines}
        onToggle={toggleService}
      />
      <FilterSection
        title="Nexus risk"
        options={NEXUS_OPTIONS}
        selected={filterState.nexusRisk}
        onToggle={toggleNexus}
      />
      <FilterSection
        title="Complexity"
        options={COMPLEXITY_OPTIONS}
        selected={filterState.complexityTiers}
        onToggle={toggleComplexity}
      />
      <FilterSection
        title="Bottleneck owner"
        options={BOTTLENECK_OPTIONS}
        selected={filterState.bottleneckOwners}
        onToggle={toggleBottleneck}
      />
    </nav>
  );
}
