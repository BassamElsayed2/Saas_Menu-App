"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

// ============================
// Types
// ============================

export type Language = "ar" | "en";

export interface BaseTranslations {
  dir?: "rtl" | "ltr";
  lang?: string;
}

export interface LanguageContextType<T extends BaseTranslations> {
  language: Language;
  t: T;
  isRTL: boolean;
  direction: "rtl" | "ltr";
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  // Backward compatibility aliases
  locale: Language;
  lang: Language;
  setLang: (lang: Language) => void;
}

// ============================
// Simple Template Language Factory
// ============================

export function createTemplateLanguage<
  TAr extends BaseTranslations,
  TEn extends BaseTranslations
>(
  translations: { ar: TAr; en: TEn },
  defaultLanguage: Language = "ar"
) {
  type T = TAr | TEn;
  const Context = createContext<LanguageContextType<T> | undefined>(undefined);

  function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(defaultLanguage);

    const setLanguage = useCallback((lang: Language) => {
      setLanguageState(lang);
    }, []);

    const toggleLanguage = useCallback(() => {
      setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));
    }, []);

    const t = translations[language] as T;
    const isRTL = language === "ar";
    const direction = isRTL ? "rtl" : "ltr";

    useEffect(() => {
      if (typeof document !== "undefined") {
        document.documentElement.dir = direction;
        document.documentElement.lang = language;
      }
    }, [language, direction]);

    const value: LanguageContextType<T> = {
      language,
      t,
      isRTL,
      direction,
      toggleLanguage,
      setLanguage,
      // Backward compatibility
      locale: language,
      lang: language,
      setLang: setLanguage,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useLanguage(): LanguageContextType<T> {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
  }

  return { LanguageProvider, useLanguage };
}

