"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface SidebarMenuProps {
  toggleActive: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ toggleActive }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const isRTL = locale === "ar";

  // Extract menu ID from pathname if in menu context
  const menuIdMatch = pathname.match(/\/menus\/(\d+)/);
  const menuId = menuIdMatch ? menuIdMatch[1] : null;

  // Show guide animation on menu pages
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (menuId) {
      // Show guide every time the page loads
      setShowGuide(true);
      
      // Auto-hide guide after 8 seconds
      const timer = setTimeout(() => {
        setShowGuide(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    } else {
      setShowGuide(false);
    }
  }, [menuId]);

  // Hide guide when clicking on categories or products
  const handleGuideClick = () => {
    if (showGuide) {
      setShowGuide(false);
    }
  };

  // Determine menu items based on context
  const menuItems = menuId ? [
    {
      title: t("overview"),
      icon: "ri-dashboard-line",
      href: `/${locale}/menus/${menuId}`,
      showPulse: false,
    },
    {
      title: t("categories"),
      icon: "ri-folder-line",
      href: `/${locale}/menus/${menuId}/categories`,
      showPulse: true, // Guide user to categories
    },
    {
      title: t("products"),
      icon: "ri-restaurant-line",
      href: `/${locale}/menus/${menuId}/items`,
      showPulse: true, // Guide user to products
    },
    {
      title: t("settings"),
      icon: "ri-settings-3-line",
      href: `/${locale}/menus/${menuId}/settings`,
      showPulse: false,
    },
  ] : [
    {
      title: t("dashboard"),
      icon: "ri-dashboard-line",
      href: `/${locale}/dashboard`,
      showPulse: false,
    },
    {
      title: t("menus"),
      icon: "ri-restaurant-line",
      href: `/${locale}/menus`,
      showPulse: false,
    },
    {
      title: t("profile"),
      icon: "ri-user-line",
      href: `/${locale}/dashboard/profile/user-profile`,
      showPulse: false,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className="sidebar-area h-screen w-[280px] max-w-[85vw] bg-white dark:bg-[#0c1427]/95 backdrop-blur-xl ltr:border-r rtl:border-l border-gray-200/50 dark:border-primary-500/10 shadow-2xl dark:shadow-primary-500/5">
        {/* Logo Section */}
        <div className="h-[70px] flex items-center justify-between px-4 sm:px-5 border-b border-gray-100 dark:border-[#1e293b] safe-area-inset-top">
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all">
              <Image
                src="/images/ENSd.png"
                alt="logo"
                width={20}
                height={20}
              />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              ENS Menu
            </span>
          </Link>

          {/* Close button - Only visible on mobile */}
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 active:scale-95 transition-all lg:hidden"
            onClick={toggleActive}
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Navigation */}
        <div className="h-[calc(100vh-70px)] overflow-y-auto px-3 sm:px-4 py-4 sm:py-5 sidebar-custom-scrollbar overscroll-contain">
          {/* Main Menu */}
          <div className="mb-6">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">
              {t("main")}
            </span>

            <nav className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const shouldPulse = showGuide && item.showPulse && !isActive;
                
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={item.showPulse ? handleGuideClick : undefined}
                    className={`relative flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white"
                    } ${shouldPulse ? "animate-guide-pulse" : ""}`}
                  >
                    {/* Pulsing glow effect */}
                    {shouldPulse && (
                      <span className="absolute inset-0 rounded-xl bg-primary-500/20 animate-ping-slow"></span>
                    )}
                    <i className={`${item.icon} text-xl ${isActive ? "text-white" : ""} ${shouldPulse ? "text-primary-500" : ""} relative z-10`}></i>
                    <span className="relative z-10">{item.title}</span>
                    {/* Guide badge */}
                    {shouldPulse && (
                      <span className="ltr:ml-auto rtl:mr-auto relative z-10 px-2 py-0.5 text-[10px] font-bold bg-primary-500 text-white rounded-full animate-bounce">
                        {locale === "ar" ? "ابدأ هنا" : "Start"}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Settings Section - only show when NOT in menu context */}
          {!menuId && (
            <div className="mb-6 pt-4 border-t border-gray-100 dark:border-[#1e293b]">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">
                {t("other")}
              </span>

              <nav className="space-y-1">
                <Link
                  href={`/${locale}/dashboard/profile/edit`}
                  className={`flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] ${
                    pathname === `/${locale}/dashboard/profile/edit`
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <i className={`ri-settings-3-line text-xl ${pathname === `/${locale}/dashboard/profile/edit` ? "text-white" : ""}`}></i>
                  <span>{t("accountSettings")}</span>
                </Link>
              </nav>
            </div>
          )}

          {/* Back to Menus - only show when in menu context */}
          {menuId && (
            <div className="mb-6 pt-4 border-t border-gray-100 dark:border-[#1e293b]">
              <Link
                href={`/${locale}/menus`}
                className="flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-xl font-medium text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white transition-all duration-200 active:scale-[0.98]"
              >
                <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-xl`}></i>
                <span>{t("backToMenus")}</span>
              </Link>
            </div>
          )}

          {/* Help & Support Card */}
          <div className="mt-6 pb-4 sm:pb-0">
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-100 dark:border-primary-500/10 rounded-2xl p-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-primary-500/25">
                <i className="ri-question-line text-white text-xl"></i>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {t("needHelp")}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                {t("helpDescription")}
              </p>
              <Link
                href={`/${locale}/support`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors py-1"
              >
                {t("contactSupport")}
                <i className={`ri-arrow-${isRTL ? 'left' : 'right'}-line`}></i>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarMenu;
