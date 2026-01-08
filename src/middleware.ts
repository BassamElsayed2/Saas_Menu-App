import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const hostWithoutPort = hostname.split(":")[0];
  const hostParts = hostWithoutPort.split(".");

  let subdomain: string | null = null;

  // تحديد الـ subdomain
  if (hostWithoutPort.includes("localhost")) {
    if (hostParts.length >= 2 && hostParts[0] !== "localhost" && hostParts[0] !== "www") {
      subdomain = hostParts[0];
    }
  } else {
    if (hostParts.length >= 3 && hostParts[0] !== "www" && hostParts[0] !== "dashboard") {
      subdomain = hostParts[0];
    }
  }

  const isPreviewMode = url.searchParams.get("preview") === "true";

  // -------------------------------
  // Redirect من /locale/menu/[slug] → slug.domain.com
  // فقط إذا المستخدم مش على subdomain بالفعل
  // -------------------------------
  const menuPathMatch = url.pathname.match(/^\/[a-z]{2}\/menu\/([^/]+)/);
  if (menuPathMatch && !isPreviewMode && !subdomain) {
    const slug = menuPathMatch[1];
    const protocol = url.protocol;
    const baseHost = hostWithoutPort.includes("localhost")
      ? "localhost"
      : hostWithoutPort.split(".").slice(-2).join(".");
    const port = hostname.includes(":") ? ":" + hostname.split(":")[1] : "";
    const queryString = url.search;
    return NextResponse.redirect(`${protocol}//${slug}.${baseHost}${port}${queryString}`);
  }

  // -------------------------------
  // Rewrite للـ subdomain → /locale/menu/subdomain
  // -------------------------------
  if (subdomain) {
    let locale = "ar";
    if (url.pathname.startsWith("/en")) locale = "en";
    else if (url.pathname.startsWith("/ar")) locale = "ar";

    let pathname = url.pathname;

    if (pathname === "/" || pathname === `/${locale}`) {
      pathname = `/${locale}/menu/${subdomain}`;
    }

    // استثناءات لأي API أو ملفات Next.js أو static
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/images") ||
      pathname.startsWith("/uploads") ||
      pathname === "/favicon.ico"
    ) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL(pathname, request.url));
  }

  // أي حاجة تانية، تمر عادي
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|images|uploads).*)",
};
