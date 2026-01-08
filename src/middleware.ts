import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl;

  const hostWithoutPort = hostname.split(":")[0];
  const hostParts = hostWithoutPort.split(".");

  let subdomain: string | null = null;

  if (hostWithoutPort.includes("localhost")) {
    if (
      hostParts.length >= 2 &&
      hostParts[0] !== "localhost" &&
      hostParts[0] !== "www"
    ) {
      subdomain = hostParts[0];
    }
  } else {
    if (
      hostParts.length >= 3 &&
      hostParts[0] !== "www" &&
      hostParts[0] !== "dashboard"
    ) {
      subdomain = hostParts[0];
    }
  }

  const isPreviewMode = url.searchParams.get("preview") === "true";

  // --- FIX: only redirect if NOT already on subdomain ---
  const menuPathMatch = url.pathname.match(/^\/[a-z]{2}\/menu\/([^/]+)/);
  if (menuPathMatch && !isPreviewMode) {
    const slug = menuPathMatch[1];

    // Redirect only if hostname is NOT slug.domain.com already
    if (!hostname.startsWith(slug + ".")) {
      const protocol = url.protocol;
      const baseHost = hostWithoutPort.includes("localhost")
        ? "localhost"
        : hostWithoutPort.split(".").slice(-2).join(".");
      const queryString = url.search;
      return NextResponse.redirect(
        `${protocol}//${slug}.${baseHost}${queryString}`
      );
    }
  }

  // If subdomain exists, rewrite to menu page
  if (subdomain) {
    let locale = "ar";
    if (url.pathname.startsWith("/en")) locale = "en";
    else if (url.pathname.startsWith("/ar")) locale = "ar";

    let pathname = url.pathname;

    // Only rewrite if not already on the correct menu path
    const expectedMenuPath = `/${locale}/menu/${subdomain}`;
    if (pathname !== expectedMenuPath) {
      // Ignore API and static files
      if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/uploads")
      ) {
        return NextResponse.next();
      }

      return NextResponse.rewrite(new URL(expectedMenuPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|uploads).*)"],
};
