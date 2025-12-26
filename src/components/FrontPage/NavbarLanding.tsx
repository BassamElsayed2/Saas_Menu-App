"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

const NavbarLanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("nav");
  const { locale } = useLanguage();
  
  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const currentLogo = isMounted && locale === 'ar' ? '/images/landing-pages/ENS-AR.png' : '/images/landing-pages/ENS-EN.png';
  const currentAlt = isMounted && locale === 'ar' ? 'شعار ENS' : 'ENS Logo';

  const navLinks = [
    { href: "#features", label: t("features") },
    { href: "#packages", label: t("packages") },
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={currentLogo} 
              alt={currentAlt}
              suppressHydrationWarning
              className="
                h-10 
                w-auto 
                object-contain
                transition-transform 
                duration-300 
                group-hover:scale-110
              "
              draggable="false"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-purple-600">
              ENS
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-600 hover:text-purple-600 transition-colors font-medium group"
                suppressHydrationWarning
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <a 
              href={`/${locale}/sign-in`} 
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium" 
              suppressHydrationWarning
            >
              {t("login")}
            </a>
            <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform duration-300" suppressHydrationWarning>
              <a href="#contact">{t("startNow")}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium py-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsOpen(false)}
                  suppressHydrationWarning
                >
                  {link.label}
                </a>
              ))}
              <Button variant="hero" size="lg" className="mt-4 animate-fade-in" style={{ animationDelay: "0.4s" }} asChild suppressHydrationWarning>
                <a href="#contact">{t("startNow")}</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarLanding;

