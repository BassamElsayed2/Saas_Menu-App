"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Language, TranslationType } from "../translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationType;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLang?: Language;
}

export function LanguageProvider({ children, defaultLang = "ar" }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(defaultLang);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
