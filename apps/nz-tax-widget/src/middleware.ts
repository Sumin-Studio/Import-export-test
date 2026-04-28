import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

// Define regions
const REGIONS = {
  UK: "UK",
  USA: "USA",
  NZ: "NZ",
  AU: "AU",
  REST_OF_WORLD: "REST_OF_WORLD",
} as const;

const COUNTRY_TO_REGION: Record<string, string> = {
  GB: REGIONS.UK,
  US: REGIONS.USA,
  NZ: REGIONS.NZ,
  AU: REGIONS.AU,
};

// Run on all requests to ensure middleware works on any domain
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  console.log(`[Middleware] STARTING - URL: ${req.url}`);

  // Check if region cookie already exists
  const existingRegion = req.cookies.get("region")?.value;

  // Check if we should force re-detection
  const { nextUrl: url } = req;
  const forceDetection =
    url.searchParams.get("force") === "true" ||
    existingRegion === "REST_OF_WORLD";

  console.log(
    `[Middleware] Path: ${url.pathname}, Existing: ${existingRegion}, Force: ${forceDetection}`
  );

  if (!existingRegion || forceDetection) {
    // Use Vercel's geolocation (now working with Akamai!)
    let country = "UNKNOWN";

    try {
      const geo = geolocation(req);
      country = geo.country || "UNKNOWN";
      console.log(`[Middleware] Vercel geolocation: ${country} (${geo.city})`);
    } catch (error) {
      console.error(`[Middleware] Vercel geolocation failed:`, error);
    }

    const region = COUNTRY_TO_REGION[country] || REGIONS.NZ;
    console.log(`[Middleware] Final result: ${country} -> ${region}`);

    // If force param is set, redirect without it
    if (url.searchParams.get("force") === "true") {
      url.searchParams.delete("force");
      const response = NextResponse.redirect(url);
      response.cookies.set("region", region, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        httpOnly: false,
      });
      return response;
    }

    // Set the region cookie and continue
    const response = NextResponse.next();
    response.cookies.set("region", region, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      httpOnly: false,
    });

    return response;
  }

  console.log(`[Middleware] Using existing region: ${existingRegion}`);
  return NextResponse.next();
}
