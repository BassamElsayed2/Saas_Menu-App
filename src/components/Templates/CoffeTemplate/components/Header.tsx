"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

interface HeaderProps {
  menuName: string;
  logo?: string;
}

const defaultLogo = "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=100&h=100&fit=crop";

export const Header: React.FC<HeaderProps> = ({ menuName, logo }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const logoUrl = logo && logo.trim() !== "" && !logo.includes("placeholder") 
    ? logo 
    : defaultLogo;

  const isAr = locale === "ar";

  const labels = {
    menu: isAr ? "المنيو" : "MENU",
    reservations: isAr ? "الحجوزات" : "RESERVATIONS",
    about: isAr ? "من نحن" : "ABOUT",
    contact: isAr ? "تواصل" : "CONTACT",
  };

  const toggleLanguage = () => {
    router.push(pathname, { locale: isAr ? "en" : "ar" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--glass)] backdrop-blur-md border-b border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <img
                src={logoUrl}
                alt={menuName}
                className="w-full h-full object-cover rounded-full ring-1 ring-[var(--glass-border)]"
              />
            </div>
            <h1 className="text-2xl font-bold font-display text-[var(--accent)]">
              {menuName}
            </h1>
            <i className="ri-leaf-line text-[var(--accent)] text-xl"></i>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
            <a
              href="#menu"
              className="text-[var(--text-main)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
            >
              {labels.menu}
            </a>
            <a
              href="#reservations"
              className="text-[var(--text-main)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
            >
              {labels.reservations}
            </a>
            <a
              href="#about"
              className="text-[var(--text-main)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
            >
              {labels.about}
            </a>
            <a
              href="#contact"
              className="text-[var(--text-main)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
            >
              {labels.contact}
            </a>
            </nav>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold border border-[var(--glass-border)] bg-white/5 hover:bg-white/10 text-[var(--text-main)] hover:text-[var(--accent)] transition-all"
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <i className="ri-global-line text-base" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </button>

            {/* Mobile Menu Button (visual only for now) */}
            <button className="md:hidden text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
