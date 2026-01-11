import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "ensmenu.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const url = request.nextUrl;
  const pathname = url.pathname;

  // 1️⃣ تجاهل الملفات الداخلية
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 2️⃣ Root domain (ensmenu.com)
  if (
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname.includes("localhost")
  ) {
    return NextResponse.next();
  }

  // 3️⃣ Subdomain logic
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const tenant = hostname.replace(`.${ROOT_DOMAIN}`, "");
    const locale = pathname.startsWith("/en") ? "en" : "ar";

    // لو الريكويست داخل menu أو menus بالفعل → سيبه
    if (
      pathname.startsWith(`/${locale}/menu/`) ||
      pathname.startsWith(`/${locale}/menus/`)
    ) {
      return NextResponse.next();
    }

    // إزالة locale لو موجود
    const cleanPath = pathname.replace(/^\/(ar|en)/, "");

    // Rewrite ذكي → جرّب menus الأول
    return NextResponse.rewrite(
      new URL(`/${locale}/menus/${tenant}${cleanPath}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
