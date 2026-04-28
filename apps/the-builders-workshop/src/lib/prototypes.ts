import prototypesData from "@/data/prototypes.json";

export interface Prototype {
  title?: string;
  slug: string;
  folderName: string;
  designer: string;
  tool: string;
  summary: string;
  uniqueFeatures: string[];
  sharedFeatures: string[];
  changelogPath: string;
  hasLocalCode?: boolean;
  viewUrl?: string;
  featured?: boolean;
  tags?: string[];
  githubUrl?: string;
}

export function getPrototypes(): Prototype[] {
  return prototypesData as Prototype[];
}

export function getPrototypeBySlug(slug: string): Prototype | undefined {
  return prototypesData.find((p) => p.slug === slug) as Prototype | undefined;
}

