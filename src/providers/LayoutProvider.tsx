"use client";

import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import SidebarMenu from "@/components/Layout/SidebarMenu/SimpleMenu";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { routing } from "@/i18n/routing";

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Remove locale prefix from pathname to check against routes
  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/(${routing.locales.join("|")})`), "") || "/";

  // Check if current page is authentication or public page (no header/sidebar/footer)
  const isAuthPage =
    pathnameWithoutLocale.startsWith("/authentication/") ||
    pathnameWithoutLocale.startsWith("/menu/") || // Public menu pages
    pathnameWithoutLocale === "/" ||
    pathnameWithoutLocale.startsWith("/coming-soon") ||
    pathnameWithoutLocale.startsWith("/front-pages/");

  return (
    <>
      <div className="main-content-wrap transition-all">
        {!isAuthPage && (
          <>
            {/* Overlay when sidebar is open on mobile */}
            <div
              className={`fixed inset-0 z-[55] lg:hidden backdrop-blur-sm transition-all duration-300 ${
                sidebarOpen 
                  ? "bg-black/50 opacity-100 pointer-events-auto" 
                  : "bg-transparent opacity-0 pointer-events-none"
              }`}
              onClick={toggleSidebar}
            />

            {/* Sidebar - Fixed on desktop, toggleable on mobile (z-60 to be above header z-50 on mobile) */}
            <div
              className={`fixed top-0 ltr:left-0 rtl:right-0 z-[60] lg:z-40 h-screen transition-all duration-300 ease-out
                lg:ltr:translate-x-0 lg:rtl:translate-x-0
                ${sidebarOpen 
                  ? "ltr:translate-x-0 rtl:translate-x-0 opacity-100" 
                  : "ltr:-translate-x-full rtl:translate-x-full opacity-0 lg:opacity-100 lg:ltr:translate-x-0 lg:rtl:translate-x-0"
                }`}
            >
              <SidebarMenu toggleActive={toggleSidebar} />
            </div>

            {/* Header - Always show for authenticated pages */}
            <Header toggleActive={toggleSidebar} />
          </>
        )}

        <div className={`transition-all flex flex-col overflow-hidden min-h-screen ${isAuthPage ? "" : "main-content lg:ltr:ml-[30px] lg:rtl:mr-[30px]"}`}>
          {children}

          {!isAuthPage && <Footer />}
        </div>
      </div>
    </>
  );
};

export default LayoutProvider;
