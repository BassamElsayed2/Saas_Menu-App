import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "ensmenu.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const url = request.nextUrl;

  // 1️⃣ Ignore internal routes
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/uploads")
  ) {
    return NextResponse.next();
  }

  // 2️⃣ Localhost
  if (hostname.includes("localhost")) {
    return NextResponse.next();
  }

  // 3️⃣ Root domain (ensmenu.com)
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
    return NextResponse.next();
  }

  // 4️⃣ Subdomains (momoza.ensmenu.com)
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const tenant = hostname.replace(`.${ROOT_DOMAIN}`, "");

    // Locale detection (simple & stable)
    const locale = url.pathname.startsWith("/en") ? "en" : "ar";

    // Prevent infinite rewrite
    if (url.pathname.startsWith(`/${locale}/menu/${tenant}`)) {
      return NextResponse.next();
    }

    // Rewrite EVERYTHING to tenant route
    return NextResponse.rewrite(
      new URL(`/${locale}/menu/${tenant}${url.pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
