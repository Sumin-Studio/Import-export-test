import { readFile } from "fs/promises";
import { join } from "path";
import { getPrototypeBySlug } from "./prototypes";

// Server-side only function for reading changelog files
export async function getPrototypeChangelog(slug: string): Promise<string | null> {
  const prototype = getPrototypeBySlug(slug);
  if (!prototype) {
    return null;
  }

  try {
    const changelogPath = join(process.cwd(), prototype.changelogPath);
    const content = await readFile(changelogPath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading changelog for ${slug}:`, error);
    return null;
  }
}
