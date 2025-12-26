"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const LanguageSwitcher = () => {
  const { locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-purple-500/10 transition-all duration-300"
      suppressHydrationWarning
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium" suppressHydrationWarning>
        {locale === 'ar' ? 'EN' : 'عربي'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;

