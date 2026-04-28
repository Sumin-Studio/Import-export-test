const DROPBOX_AUTH_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const DROPBOX_LIST_FOLDER_URL = "https://api.dropboxapi.com/2/files/list_folder";
const DROPBOX_GET_TEMPORARY_LINK_URL = "https://api.dropboxapi.com/2/files/get_temporary_link";
const DROPBOX_DOWNLOAD_URL = "https://content.dropboxapi.com/2/files/download";

const DROPBOX_SCOPES = "files.metadata.read files.content.read";

/** MIME type by file extension for inline display in browser */
const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  txt: "text/plain",
  html: "text/html",
  json: "application/json",
  xml: "application/xml",
};

export function getAuthorizationUrl(
  appKey: string,
  redirectUri: string,
  state: string
): string {
  const params = new URLSearchParams({
    client_id: appKey,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
    scope: DROPBOX_SCOPES,
  });
  return `${DROPBOX_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(
  code: string,
  redirectUri: string,
  appKey: string,
  appSecret: string
): Promise<{ access_token: string }> {
  const auth = Buffer.from(`${appKey}:${appSecret}`).toString("base64");
  const res = await fetch(DROPBOX_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }).toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox token exchange failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<{ access_token: string }>;
}

export interface DropboxEntry {
  name: string;
  path_display: string;
  ".tag": "file" | "folder";
}

export interface ListFolderResponse {
  entries: DropboxEntry[];
  has_more: boolean;
  cursor?: string;
}

export async function listFolder(
  accessToken: string,
  path: string
): Promise<ListFolderResponse> {
  const res = await fetch(DROPBOX_LIST_FOLDER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: path === "" ? "" : path.startsWith("/") ? path : `/${path}`,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox list_folder failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<ListFolderResponse>;
}

export async function listFolderFiles(
  accessToken: string,
  path: string
): Promise<DropboxEntry[]> {
  const out: DropboxEntry[] = [];
  let cursor: string | undefined;
  const normalizedPath = path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  let body: { path: string; recursive: boolean } | { cursor: string } = {
    path: normalizedPath,
    recursive: true,
  };

  do {
    const res = await fetch(DROPBOX_LIST_FOLDER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Dropbox list_folder failed: ${res.status} ${err}`);
    }
    const data = (await res.json()) as ListFolderResponse & { cursor?: string };
    out.push(...data.entries.filter((e) => e[".tag"] === "file"));
    if (data.has_more && data.cursor) {
      body = { cursor: data.cursor };
    } else {
      break;
    }
  } while (true);

  return out;
}

export async function getTemporaryLink(
  accessToken: string,
  path: string
): Promise<{ link: string }> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(DROPBOX_GET_TEMPORARY_LINK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path: normalizedPath }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox get_temporary_link failed: ${res.status} ${err}`);
  }
  const data = (await res.json()) as { link: string };
  return { link: data.link };
}

/**
 * Download file content from Dropbox (for proxying with inline display).
 * Path must be normalized (e.g. /Folder/file.pdf).
 */
export async function downloadFile(
  accessToken: string,
  path: string
): Promise<{ body: ReadableStream<Uint8Array>; contentType: string }> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(DROPBOX_DOWNLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Dropbox-API-Arg": JSON.stringify({ path: normalizedPath }),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox download failed: ${res.status} ${err}`);
  }
  const ext = normalizedPath.split(".").pop()?.toLowerCase() ?? "";
  const contentType = MIME_BY_EXT[ext] || "application/octet-stream";
  return { body: res.body!, contentType };
}

/**
 * Download file as a Buffer (for text extraction during classification).
 * Path must be normalized (e.g. /Folder/file.pdf).
 */
export async function downloadFileAsBuffer(
  accessToken: string,
  path: string
): Promise<Buffer> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(DROPBOX_DOWNLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Dropbox-API-Arg": JSON.stringify({ path: normalizedPath }),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox download failed: ${res.status} ${err}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
