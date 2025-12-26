"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const t = useTranslations("heroSection");
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`flex flex-col ${
            isRTL ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-12 md:gap-16`}
        >
          {/* Text Content */}
          <div
            className={`flex-1 text-center ${
              isRTL ? "md:text-right" : "md:text-left"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up text-gray-800 dark:text-white">
              <span suppressHydrationWarning>{t("title1")}</span>
              <br />
              <span
                className="text-gradient animate-gradient"
                suppressHydrationWarning
              >
                {t("title2")}
              </span>
            </h1>
            <p className="sr-only">
              منيو إلكتروني QR Code للمطاعم والكافيهات في مصر، طلب ودفع بدون
              عمولات
            </p>

            <p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8 animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              suppressHydrationWarning
            >
              {t("description")}
            </p>
            <div
              className="animate-slide-up opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Button
                variant="hero"
                size="xl"
                className="group hover:scale-105 transition-all duration-300 shadow-glow"
                asChild
                suppressHydrationWarning
              >
                <a href="#contact">
                  {t("cta")}
                  <ArrowIcon
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isRTL
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </a>
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex-1 flex justify-center perspective-1000">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-75 animate-pulse-slow" />
              <video
                src="https://cdn.prod.website-files.com/64ef7d0d34ee51e7fdfd939c%2F6782cc6994f4276a731a21f7_f2-transcode.mp4"
                title="عرض منيو إلكتروني QR Code للمطاعم"
                className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-2xl"
                aria-label="Digital Menu QR Code"
                muted
                autoPlay
                loop
                playsInline
              />
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-float-delayed" />
              <div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500/30 rounded-full blur-lg animate-float"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
