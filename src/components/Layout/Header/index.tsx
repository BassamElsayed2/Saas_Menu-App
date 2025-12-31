"use client";

import React, { useEffect } from "react";
import DarkMode from "./DarkMode";
import Fullscreen from "./Fullscreen";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  toggleActive: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleActive }) => {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const elementId = document.getElementById("header");
    const handleScroll = () => {
      if (window.scrollY > 100) {
        elementId?.classList.add("shadow-lg");
      } else {
        elementId?.classList.remove("shadow-lg");
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/(ar|en)/, "") || "/";
    window.location.href = `/${newLocale}${pathnameWithoutLocale}`;
  };

  return (
    <>
      <header
        id="header"
        className="header-area bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-primary-500/10 py-3 px-4 md:px-6 fixed top-0 ltr:left-0 rtl:right-0 right-0 left-0 lg:ltr:left-[260px] lg:rtl:right-[260px] z-50 transition-all"
      >
        <div className="flex items-center justify-between">
          {/* Left Section - Menu Toggle & Logo */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button - Only visible on mobile */}
            <button
              type="button"
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 transition-all lg:hidden"
              onClick={toggleActive}
            >
              <i className="ri-menu-line text-xl"></i>
            </button>

            {/* Logo - Only visible on mobile since sidebar has logo on desktop */}
            <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 group lg:hidden">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all">
                <Image
                  src="/images/ENSd.png"
                  alt="logo"
                  width={18}
                  height={18}
                />
              </div>
              <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
                ENS Menu
              </span>
            </Link>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => handleLanguageChange(locale === "ar" ? "en" : "ar")}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-all"
              title={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <i className="ri-translate-2 text-xl"></i>
            </button>

            <DarkMode />

            <Fullscreen />

            <ProfileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
