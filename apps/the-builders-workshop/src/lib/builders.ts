import { z } from "zod";
import buildersData from "@/data/builders.json";

export const MilestoneKeySchema = z.enum([
  "adminAccess",
  "cursorInstalled",
  "githubSetup",
  "firstApp",
  "firstCommit",
  "hostedApp",
]);

export type MilestoneKey = z.infer<typeof MilestoneKeySchema>;

export const BuilderSchema = z.object({
  name: z.string(),
  slug: z.string(),
  role: z.string(),
  joined: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  photo: z.string().nullable().optional(),
  milestones: z.record(MilestoneKeySchema, z.string().nullable()),
  notes: z.string().nullable().optional(),
  github: z.string().url().nullable().optional(),
  favoritePrototype: z.string().url().nullable().optional(),
});

export type Builder = z.infer<typeof BuilderSchema>;

export const MILESTONE_DEFINITIONS: Array<{
  key: MilestoneKey;
  label: string;
  description: string;
}> = [
    {
      key: "adminAccess",
      label: "Admin Access",
      description: "Local admin rights granted",
    },
    {
      key: "cursorInstalled",
      label: "Installed Cursor",
      description: "Local dev setup complete",
    },
    {
      key: "githubSetup",
      label: "Connected GitHub",
      description: "Pulled + pushed code",
    },
    {
      key: "firstApp",
      label: "Built Local App",
      description: "Utility prototype running locally",
    },
    {
      key: "firstCommit",
      label: "First Commit",
      description: "Tracked changes in Git",
    },
    {
      key: "hostedApp",
      label: "Hosted Prototype",
      description: "Online deployment",
    },
  ];

const builders = z.array(BuilderSchema).parse(buildersData);

export function getBuilders(): Builder[] {
  return builders;
}

export function getBuilderBySlug(slug: string): Builder | undefined {
  return builders.find((builder) => builder.slug === slug);
}

export type BuilderMilestone = {
  key: MilestoneKey;
  label: string;
  description: string;
  date: string | null;
  status: "completed" | "upcoming";
};

export function getBuilderMilestones(builder: Builder): BuilderMilestone[] {
  return MILESTONE_DEFINITIONS.map((definition) => {
    const date = builder.milestones[definition.key];
    return {
      ...definition,
      date,
      status: date ? "completed" : "upcoming",
    };
  });
}

export function hasSequentialMilestones(builder: Builder): boolean {
  const milestones = getBuilderMilestones(builder);
  
  // Check if there are any gaps (completed milestone after an incomplete one)
  // This catches cases like: step 1 incomplete, step 2 complete
  for (let i = 0; i < milestones.length - 1; i++) {
    if (milestones[i].status === "upcoming" && milestones[i + 1].status === "completed") {
      return false;
    }
  }
  
  return true;
}

export function getNextMilestone(builder: Builder): BuilderMilestone | null {
  const milestones = getBuilderMilestones(builder);
  const nextIncomplete = milestones.find((m) => m.status === "upcoming");
  return nextIncomplete || null;
}

export function getLastUpdatedForBuilder(builder: Builder): string | null {
  const dates = Object.values(builder.milestones).filter(
    (value): value is string => Boolean(value),
  );
  if (dates.length === 0) {
    return null;
  }
  const latest = dates.sort((a, b) => Date.parse(b) - Date.parse(a))[0];
  return new Date(latest).toISOString();
}

export function getMilestoneCompletion() {
  const total = builders.length;

  return MILESTONE_DEFINITIONS.map((milestone) => {
    const completed = builders.filter(
      (builder) => Boolean(builder.milestones[milestone.key]),
    ).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      ...milestone,
      completed,
      total,
      percent,
    };
  });
}

export function getProgressSummary() {
  const completion = getMilestoneCompletion();
  const lastUpdated = builders
    .flatMap((builder) => Object.values(builder.milestones))
    .filter((date): date is string => Boolean(date))
    .sort((a, b) => Date.parse(b) - Date.parse(a))[0];

  return {
    builderCount: builders.length,
    completedMilestones: completion.reduce((acc, item) => acc + item.completed, 0),
    completion,
    lastUpdated: lastUpdated ? new Date(lastUpdated).toISOString() : null,
  };
}

/**
 * Unified milestone type that combines Getting Started milestones and Builder milestones
 */
export type UnifiedMilestone = {
  key: string;
  title: string;
  description: string;
  type: "getting-started" | "builder";
  displayOrder: number;
};

/**
 * Gets all unified milestones (Getting Started + Builder milestones)
 * This combines milestones from Supabase (Getting Started) and builders.json (Builder milestones)
 */
export function getAllUnifiedMilestones(): UnifiedMilestone[] {
  // Builder milestones from builders.json
  const builderMilestones: UnifiedMilestone[] = MILESTONE_DEFINITIONS.map((def, index) => ({
    key: def.key,
    title: def.label,
    description: def.description,
    type: "builder" as const,
    displayOrder: 100 + index, // Builder milestones come after Getting Started
  }));

  // Getting Started milestones are fetched from Supabase via API
  // For now, we'll return builder milestones. The API will merge them.
  return builderMilestones;
}

/**
 * Gets builder milestone completions from builders.json
 * Returns completions in a format compatible with Supabase completions
 */
export function getBuilderMilestoneCompletions(): Array<{
  builderName: string;
  builderEmail: string | null;
  milestoneKey: string;
  milestoneTitle: string;
  completedAt: string;
}> {
  const completions: Array<{
    builderName: string;
    builderEmail: string | null;
    milestoneKey: string;
    milestoneTitle: string;
    completedAt: string;
  }> = [];

  builders.forEach((builder) => {
    MILESTONE_DEFINITIONS.forEach((milestoneDef) => {
      const date = builder.milestones[milestoneDef.key];
      if (date) {
        completions.push({
          builderName: builder.name,
          builderEmail: null, // builders.json doesn't have email
          milestoneKey: milestoneDef.key,
          milestoneTitle: milestoneDef.label,
          completedAt: new Date(date).toISOString(),
        });
      }
    });
  });

  return completions;
}

