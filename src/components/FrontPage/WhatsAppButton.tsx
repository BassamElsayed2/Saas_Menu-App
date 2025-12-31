"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "next-intl";

const WhatsAppButton = () => {
  const { isRTL } = useLanguage();
  const t = useTranslations("Landing.whatsapp");
  return (
    <a
      href="https://wa.me/201000000000?text=مرحبا%20،%20حابب%20أعرف%20تفاصيل%20أكتر"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className={`
        fixed bottom-6 z-50
        ${isRTL ? "right-6" : "left-6"}
        w-14 h-14 rounded-full
        bg-green-500 hover:bg-green-600
        flex items-center justify-center
        shadow-lg hover:shadow-green-500/40
        transition-all duration-300
        hover:scale-110
        focus:outline-none focus:ring-4 focus:ring-green-500/40
        animate-pulse
        group
      `}
    >
      {/* Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>

     {/* Tooltip */}
<span
  className={`
    absolute whitespace-nowrap
    ${isRTL ? "right-16" : "left-16"}
    top-1/2 -translate-y-1/2
    bg-gradient-to-r from-purple-600 to-purple-500
    text-white text-sm font-semibold
    px-4 py-2 rounded-xl
    shadow-lg shadow-purple-500/40
    opacity-0 group-hover:opacity-100
    translate-y-1 group-hover:translate-y-0
    transition-all duration-300
    pointer-events-none
  `}
>
  {t("title")}

  {/* Arrow */}
  <span
    className={`
      absolute top-1/2 -translate-y-1/2
      ${isRTL ? "-right-1" : "-left-1"}
      w-3 h-3 bg-purple-500 rotate-45
    `}
  />
</span>

    </a>
  );
};

export default WhatsAppButton;
