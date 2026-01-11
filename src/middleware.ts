import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "ensmenu.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const url = request.nextUrl;

  // 1️⃣ Ignore system & static routes
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/uploads")
  ) {
    return NextResponse.next();
  }

  // 2️⃣ Localhost (development)
  if (hostname.includes("localhost")) {
    return NextResponse.next();
  }

  // 3️⃣ Root domain (ensmenu.com / www.ensmenu.com)
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
    return NextResponse.next();
  }

  // 4️⃣ Subdomain handling (momoza.ensmenu.com)
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");

    // Detect locale
    const locale =
      request.cookies.get("NEXT_LOCALE")?.value ||
      (url.pathname.startsWith("/en") ? "en" : "ar");

    // Rewrite ONLY root paths
    const isRootPath =
      url.pathname === "/" || url.pathname === "/en" || url.pathname === "/ar";

    if (isRootPath) {
      return NextResponse.rewrite(
        new URL(`/${locale}/menu/${subdomain}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
