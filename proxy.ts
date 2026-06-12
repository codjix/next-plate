import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/features/auth";

export async function proxy({ nextUrl, url, headers }: NextRequest) {
  if (nextUrl.pathname.startsWith("/api/rpc/health")) return NextResponse.next();

  const session = await auth.api.getSession({ headers });
  if (session && nextUrl.pathname.startsWith("/auth")) {
    // If authenticated, redirect to /
    return NextResponse.redirect(new URL("/", url));
  }

  // use !=/auth to protect all routes
  // use =/dash to protect dash routes only
  if (!session && nextUrl.pathname.startsWith("/dash")) {
    // If unauthenticated, redirect to /auth/login?redirect=<current-path>
    const login = new URL(`/auth/login`, url);
    login.searchParams.set("redirect", nextUrl.pathname + nextUrl.search || "/");
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
