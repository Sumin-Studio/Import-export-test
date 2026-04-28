import { readdir } from "node:fs/promises";
import path from "node:path";
import { getHubAgentBySlug } from "@/data/agent-hub";

export interface SquadResourceGroup {
  label: string;
  directory: string;
  files: string[];
}

async function walkDirectory(absoluteDirectory: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(absoluteDirectory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(absoluteDirectory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(absolutePath)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

function toPosixRelativePath(absolutePath: string, workspaceRoot: string): string {
  return path.relative(workspaceRoot, absolutePath).split(path.sep).join("/");
}

export async function getSquadResourceGroups(
  slug: string
): Promise<SquadResourceGroup[]> {
  const agent = getHubAgentBySlug(slug);
  if (!agent) {
    return [];
  }

  const workspaceRoot = process.cwd();
  const groups: SquadResourceGroup[] = [];

  for (const resourceDirectory of agent.resourceDirectories) {
    const absoluteDirectory = path.join(workspaceRoot, resourceDirectory.directory);
    const allFiles = await walkDirectory(absoluteDirectory);
    const keywords = resourceDirectory.keywords.map((keyword) => keyword.toLowerCase());

    const matchingFiles = allFiles
      .map((file) => toPosixRelativePath(file, workspaceRoot))
      .filter((file) => {
        const lower = file.toLowerCase();
        return keywords.some((keyword) => lower.includes(keyword));
      })
      .sort((a, b) => b.localeCompare(a))
      .slice(0, resourceDirectory.limit ?? 8);

    groups.push({
      label: resourceDirectory.label,
      directory: resourceDirectory.directory,
      files: matchingFiles,
    });
  }

  return groups;
}
