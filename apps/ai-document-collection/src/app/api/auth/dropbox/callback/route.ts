import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/dropbox";
import { setToken, syncStoreFromPersistence, persistStoreToBackend } from "@/lib/store";
import { getAppOriginFromRequest } from "@/lib/app-url";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await syncStoreFromPersistence();
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const appUrl = getAppOriginFromRequest(request);

  if (error) {
    return NextResponse.redirect(
      `${appUrl}/dashboard?error=dropbox_denied`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${appUrl}/dashboard?error=dropbox_callback_missing`
    );
  }

  let clientId: string;
  let folderPath: string;
  let from: string;
  try {
    const decoded = JSON.parse(
      Buffer.from(state, "base64url").toString("utf-8")
    ) as { clientId?: string; folderPath?: string; from?: string };
    clientId = decoded.clientId || "default";
    folderPath = decoded.folderPath || "";
    from = decoded.from || "";
  } catch {
    return NextResponse.redirect(
      `${appUrl}/dashboard?error=dropbox_invalid_state`
    );
  }

  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;
  if (!appKey || !appSecret) {
    return NextResponse.redirect(
      `${appUrl}/dashboard?error=dropbox_not_configured`
    );
  }

  const redirectUri = `${appUrl}/api/auth/dropbox/callback`;

  try {
    const { access_token } = await exchangeCodeForToken(
      code,
      redirectUri,
      appKey,
      appSecret
    );
    if (from === "client") {
      setToken(clientId, access_token, "");
      await persistStoreToBackend();
      return NextResponse.redirect(
        `${appUrl}/connect/${clientId}/folder`
      );
    }
    setToken(clientId, access_token, folderPath);
    await persistStoreToBackend();

    return NextResponse.redirect(
      `${appUrl}/dashboard/clients/${clientId}?dropbox=connected`
    );
  } catch (e) {
    console.error("Dropbox token exchange error:", e);
    return NextResponse.redirect(
      `${appUrl}/dashboard?error=dropbox_token_failed`
    );
  }
}
