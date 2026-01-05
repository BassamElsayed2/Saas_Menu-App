"use client";

import React from "react";
import { useLanguage } from "../context";

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = "",
}) => {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`
        px-5 py-2.5 rounded-xl
        bg-gradient-to-r from-violet-600/20 to-blue-600/20
        border border-violet-500/30
        text-sm font-bold text-violet-200
        hover:from-violet-600/30 hover:to-blue-600/30
        hover:border-violet-400/50 hover:text-white
        transition-all duration-300
        shadow-lg shadow-violet-500/10
        ${className}
      `}
      aria-label={locale === "ar" ? "Switch to English" : "تغيير إلى العربية"}
    >
      {locale === "ar" ? "EN" : "عربي"}
    </button>
  );
};
