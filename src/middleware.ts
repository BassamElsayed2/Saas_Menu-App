import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "ensmenu.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const url = request.nextUrl;

  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  if (
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname.includes("localhost")
  ) {
    return NextResponse.next();
  }

  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const tenant = hostname.replace(`.${ROOT_DOMAIN}`, "");
    const locale = url.pathname.startsWith("/en") ? "en" : "ar";

    if (url.pathname.startsWith(`/${locale}/menu/${tenant}`)) {
      return NextResponse.next();
    }

    const path = url.pathname === "/" ? "" : url.pathname;

    return NextResponse.rewrite(
      new URL(`/${locale}/menu/${tenant}${path}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
