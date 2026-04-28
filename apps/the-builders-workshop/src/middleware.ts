import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "bw_user";

const publicRoutes = [
  "/sign-in",
  "/unauthorized",
  "/landing",
  "/api/health",
];

const exactPublicRoutes = ["/"];

function isPublicRoute(req: NextRequest): boolean {
  const path = req.nextUrl.pathname;
  return (
    exactPublicRoutes.includes(path) ||
    publicRoutes.some((route) => path.startsWith(route)) ||
    path.startsWith("/prototypes")
  );
}

export async function middleware(req: NextRequest) {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Check for identity cookie
  const userCookie = req.cookies.get(COOKIE_NAME)?.value;

  if (!userCookie) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
