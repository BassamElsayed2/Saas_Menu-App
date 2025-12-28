import "material-symbols";
import "remixicon/fonts/remixicon.css";
import "react-calendar/dist/Calendar.css";
import "swiper/css";
import "swiper/css/bundle";

// globals
import "./globals.css";

import LayoutProvider from "@/providers/LayoutProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import NotFound from "./not-found";
import { routing } from "@/i18n/routing";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trezo - Tailwind Nextjs Admin Dashboard Templat",
  description: "Tailwind Nextjs Admin Dashboard Templat",
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    NotFound();
  }

  // Set the request locale for static rendering
  setRequestLocale(locale);

  // Load messages for the current locale directly
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  // Set direction based on locale (RTL for Arabic, LTR for others)
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} antialiased`}>
        <ReactQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              {/* <LayoutProvider>{children}</LayoutProvider> */}
              {children}
              <Toaster position="top-right" />
            </AuthProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
