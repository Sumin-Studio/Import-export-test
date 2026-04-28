import { getConfluenceConfig, type ConfluenceConfig } from "./env";

export interface ConfluencePageSearchResult {
  id: string;
  title: string;
  type: string;
  _links?: {
    webui?: string;
  };
}

export interface ConfluencePage {
  id: string;
  title: string;
  type: string;
  version: {
    number: number;
  };
  body: {
    storage: {
      value: string;
      representation: string;
    };
  };
  _links?: {
    webui?: string;
  };
}

function getHeaders(config: ConfluenceConfig): HeadersInit {
  const token = Buffer.from(`${config.username}:${config.apiToken}`).toString("base64");

  return {
    Accept: "application/json",
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

async function request<T>(url: string, init: RequestInit = {}, config?: ConfluenceConfig): Promise<T> {
  const resolvedConfig = config ?? (await getConfluenceConfig());
  const response = await fetch(url, {
    ...init,
    headers: {
      ...getHeaders(resolvedConfig),
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Confluence request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as T;
}

export function getConfluencePageUrl(pageId: string, baseUrl: string): string {
  return `${baseUrl}/pages/viewpage.action?pageId=${pageId}`;
}

export async function searchPagesByTitle(
  title: string,
  options?: { spaceKey?: string; config?: ConfluenceConfig }
): Promise<ConfluencePageSearchResult[]> {
  const config = options?.config ?? (await getConfluenceConfig());
  const spaceKey = options?.spaceKey ?? config.spaceKey;
  const url = `${config.baseUrl}/rest/api/content?spaceKey=${encodeURIComponent(spaceKey)}&title=${encodeURIComponent(title)}`;
  const data = await request<{ results: ConfluencePageSearchResult[] }>(url, {}, config);
  return data.results ?? [];
}

export async function getPageById(pageId: string, config?: ConfluenceConfig): Promise<ConfluencePage> {
  const resolvedConfig = config ?? (await getConfluenceConfig());
  const url = `${resolvedConfig.baseUrl}/rest/api/content/${pageId}?expand=body.storage,version`;
  return request<ConfluencePage>(url, {}, resolvedConfig);
}

/** Returns ancestor page IDs (root to direct parent). Used to check if a page lives under a given parent. */
export async function getPageAncestorIds(
  pageId: string,
  config?: ConfluenceConfig
): Promise<string[]> {
  const resolvedConfig = config ?? (await getConfluenceConfig());
  const url = `${resolvedConfig.baseUrl}/rest/api/content/${pageId}?expand=ancestors`;

  try {
    const data = await request<{ ancestors?: Array<{ id: string }> }>(url, {}, resolvedConfig);
    return (data.ancestors ?? []).map((a) => a.id);
  } catch {
    // If the page no longer exists or is inaccessible, treat it as having no ancestors.
    return [];
  }
}

export async function createPage(args: {
  title: string;
  content: string;
  parentId?: string;
  spaceKey?: string;
  config?: ConfluenceConfig;
}): Promise<ConfluencePageSearchResult> {
  const config = args.config ?? (await getConfluenceConfig());
  const spaceKey = args.spaceKey ?? config.spaceKey;
  const payload = {
    type: "page",
    title: args.title,
    space: { key: spaceKey },
    ...(args.parentId ? { ancestors: [{ id: args.parentId }] } : {}),
    body: {
      storage: {
        value: args.content,
        representation: "storage",
      },
    },
  };

  return request<ConfluencePageSearchResult>(`${config.baseUrl}/rest/api/content`, {
    method: "POST",
    body: JSON.stringify(payload),
  }, config);
}

export async function updatePage(args: {
  pageId: string;
  title: string;
  content: string;
  version: number;
  parentId?: string;
  config?: ConfluenceConfig;
}): Promise<ConfluencePage> {
  const config = args.config ?? (await getConfluenceConfig());
  const payload = {
    id: args.pageId,
    type: "page",
    title: args.title,
    version: {
      number: args.version + 1,
    },
    ...(args.parentId ? { ancestors: [{ id: args.parentId }] } : {}),
    body: {
      storage: {
        value: args.content,
        representation: "storage",
      },
    },
  };

  return request<ConfluencePage>(`${config.baseUrl}/rest/api/content/${args.pageId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }, config);
}

export async function deletePage(
  pageId: string,
  options?: { purge?: boolean; config?: ConfluenceConfig }
): Promise<void> {
  const config = options?.config ?? (await getConfluenceConfig());
  const status = options?.purge ? "trashed" : "current";
  const url = `${config.baseUrl}/rest/api/content/${pageId}?status=${status}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: getHeaders(config),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Confluence delete failed (${response.status}): ${text}`);
  }
}

export async function findOrCreatePage(args: {
  title: string;
  content: string;
  parentId?: string;
  spaceKey?: string;
  config?: ConfluenceConfig;
}): Promise<{ pageId: string; created: boolean }> {
  const config = args.config ?? (await getConfluenceConfig());
  const spaceKey = args.spaceKey ?? config.spaceKey;
  const matches = await searchPagesByTitle(args.title, {
    config,
    spaceKey,
  });

  if (matches.length > 0) {
    if (args.parentId) {
      for (const match of matches) {
        const ancestorIds = await getPageAncestorIds(match.id, config);
        if (ancestorIds.includes(args.parentId)) {
          return { pageId: match.id, created: false };
        }
      }

      // No existing page with this title under the requested parent – create a new one there.
      const page = await createPage(args);
      return {
        pageId: page.id,
        created: true,
      };
    }
    return {
      pageId: matches[0].id,
      created: false,
    };
  }

  const page = await createPage(args);
  return {
    pageId: page.id,
    created: true,
  };
}
