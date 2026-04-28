import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';

// Protect /app only (except sign-in and unauthorized). Root / and /sales are public for shareable prototype.
const isProtectedRoute = createRouteMatcher([
  '/app',
  '/app/walkthrough(.*)',
  '/app/explorations(.*)',
  '/app/process(.*)',
  '/app/explainer(.*)',
  '/app/story(.*)',
]);

// Whitespace-only counts as missing; otherwise Clerk initializes with an invalid secret and can 500.
const clerkSecretConfigured = Boolean(process.env.CLERK_SECRET_KEY?.trim());

const clerkHandler = clerkSecretConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect();
      }
    })
  : null;

/**
 * Single default export: always receives (request, event) as Next expects.
 * try/catch avoids 500s when Clerk misconfigured or API errors (prototype still loads; protection may be skipped).
 */
export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!clerkHandler) {
    return NextResponse.next();
  }
  try {
    const result = await clerkHandler(request, event);
    return result ?? NextResponse.next();
  } catch (err) {
    console.error('[middleware] Clerk error:', err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Clerk only for the protected /app hub. A broad matcher runs middleware on /, /sales,
    // RSC, and prefetch requests and can contribute to flaky dev CSS / hydration.
    "/app/:path*",
  ],
};
