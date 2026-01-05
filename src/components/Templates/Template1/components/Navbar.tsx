"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { LanguageToggle } from "./LanguageToggle";

interface NavbarProps {
  menuName: string;
  logo?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ menuName, logo }) => {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/25 animate-pulse-glow bg-violet-900/30">
              <Image
                src={logo || "/images/ENSd.png"}
                alt={menuName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
              {menuName}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#menu", label: t.nav.menu },
              { href: "#about", label: t.nav.about },
              { href: "#contact", label: t.nav.contact },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-violet-200/70 hover:text-white transition-colors font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Language Toggle */}
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};
