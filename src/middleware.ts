import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "ensmenu.com";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0] || "";
  const url = request.nextUrl;

  // Ignore internal routes
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/uploads")
  ) {
    return NextResponse.next();
  }

  // Localhost
  if (hostname.includes("localhost")) {
    return NextResponse.next();
  }

  // Root domain
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
    return NextResponse.next();
  }

  // Subdomains: test3.ensmenu.com
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const tenant = hostname.replace(`.${ROOT_DOMAIN}`, "");
    const locale = url.pathname.startsWith("/en") ? "en" : "ar";

    // Prevent infinite loop
    if (url.pathname.startsWith(`/${locale}/menus/${tenant}`)) {
      return NextResponse.next();
    }

    // ✅ CORRECT ROUTE
    return NextResponse.rewrite(
      new URL(`/${locale}/menus/${tenant}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
