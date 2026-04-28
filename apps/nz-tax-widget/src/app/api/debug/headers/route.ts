import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get all headers
    const headers = Object.fromEntries(req.headers.entries());

    // Extract IP-related headers
    const trueClientIP = req.headers.get("true-client-ip");
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const xRealIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip");

    // Try Vercel geolocation
    let vercelGeo = null;
    try {
      vercelGeo = geolocation(req);
    } catch (error) {
      vercelGeo = { error: String(error) };
    }

    // Get Vercel-specific headers
    const vercelHeaders = {
      'x-vercel-ip-country': req.headers.get("x-vercel-ip-country"),
      'x-vercel-ip-country-region': req.headers.get("x-vercel-ip-country-region"),
      'x-vercel-ip-city': req.headers.get("x-vercel-ip-city"),
      'x-vercel-ip-latitude': req.headers.get("x-vercel-ip-latitude"),
      'x-vercel-ip-longitude': req.headers.get("x-vercel-ip-longitude"),
    };

    const response = {
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent"),

      // IP addresses from various sources
      ipAddresses: {
        trueClientIP,           // Akamai
        xForwardedFor,         // General proxy header
        xRealIp,               // Nginx
        cfConnectingIp,        // Cloudflare
        reqIp: req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown",         // Next.js request IP
      },

      // Vercel geolocation
      vercelGeolocation: vercelGeo,

      // Vercel headers
      vercelHeaders,

      // All headers for debugging
      allHeaders: headers,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
