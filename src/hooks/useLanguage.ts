import { useLocale } from "next-intl";

export function useLanguage() {
  const locale = useLocale();

  return {
    locale,
    isRTL: locale === "ar",
    isArabic: locale === "ar",
    isEnglish: locale === "en",
  };
}

