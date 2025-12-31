import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const defaultMetadata: Metadata = {
  title: "Menu",
  description: "Restaurant menu",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Check if API URL is configured
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return defaultMetadata;
  }

  try {
    const { slug } = await params;
    const locale = await getLocale();

    const response = await fetch(
      `${apiUrl}/public/menu/${slug}?locale=${locale}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      return {
        title: "Menu Not Found",
        description: "The requested menu could not be found.",
      };
    }

    const data = await response.json();
    const menu = data.data?.menu;

    if (!menu) {
      return {
        title: "Menu Not Found",
        description: "The requested menu could not be found.",
      };
    }

    const metadata: Metadata = {
      title: menu.name || "Menu",
      description: menu.description || "",
    };

    // Add favicon if logo exists
    if (menu.logo) {
      metadata.icons = {
        icon: menu.logo,
        apple: menu.logo,
      };
    }

    return metadata;
  } catch {
    // Silently return default metadata on error
    return defaultMetadata;
  }
}

export default function MenuLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
