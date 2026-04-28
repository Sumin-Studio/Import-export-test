import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REGIONS, COUNTRY_TO_REGION } from "../../lib/regions";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const force = url.searchParams.get("force") === "true";

  // Check if region is already set (unless force is true)
  const existingRegion = cookieStore.get("region")?.value;
  if (existingRegion && !force) {
    return NextResponse.json({
      region: existingRegion,
      source: "existing-cookie",
    });
  }

  // Get country from CloudFront header
  const countryHeader = request.headers.get("cloudfront-viewer-country");
  const country = countryHeader || "US";
  const region = COUNTRY_TO_REGION[country] || REGIONS.DEFAULT;

  // Set the region cookie
  cookieStore.set("region", region, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    httpOnly: false,
  });

  return NextResponse.json({
    region,
    country: countryHeader,
    source: "cloudfront-detection",
  });
}
