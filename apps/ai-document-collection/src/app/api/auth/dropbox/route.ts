import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationUrl } from "@/lib/dropbox";
import { getAppOriginFromRequest } from "@/lib/app-url";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;
  const appUrl = getAppOriginFromRequest(request);

  if (!appKey || !appSecret) {
    return NextResponse.json(
      { error: "Dropbox app not configured. Set DROPBOX_APP_KEY and DROPBOX_APP_SECRET." },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const clientId = searchParams.get("clientId") || "default";
  const folderPath = searchParams.get("folderPath") || "";
  const from = searchParams.get("from") || "";

  const state = Buffer.from(
    JSON.stringify({ clientId, folderPath, from })
  ).toString("base64url");
  const redirectUri = `${appUrl}/api/auth/dropbox/callback`;

  const authUrl = getAuthorizationUrl(appKey, redirectUri, state);
  return NextResponse.redirect(authUrl);
}
