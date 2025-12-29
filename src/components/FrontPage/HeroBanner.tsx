"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "@/components/icons/Icons";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const t = useTranslations("heroSection");
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50 dark:bg-[#0a0e19] overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="container 2xl:max-w-[1320px] mx-auto px-[12px] relative z-10">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-bold leading-tight mb-6 text-black dark:text-white animate-[slideUp_0.6s_ease-out_forwards]">
              <span suppressHydrationWarning>{t("title1")}</span>
              <br />
              <span
                className="bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600 bg-clip-text text-transparent"
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
              className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto md:mx-0 mb-8 animate-[slideUp_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              suppressHydrationWarning
            >
              {t("description")}
            </p>
            <div
              className="animate-[slideUp_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Button
                size="lg"
                className="group bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary-500/30"
                asChild
                suppressHydrationWarning
              >
                <a href="#contact" className="flex items-center gap-2">
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
          <div className="flex-1 flex justify-center">
            <div className="relative animate-[float_3s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full scale-75 animate-[pulse_4s_ease-in-out_infinite]" />
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
              <div className="absolute -top-8 ltr:-right-8 rtl:-left-8 w-16 h-16 bg-purple-500/30 rounded-full blur-xl animate-[float_3s_ease-in-out_infinite_0.5s]" />
              <div
                className="absolute -bottom-4 ltr:-left-4 rtl:-right-4 w-12 h-12 bg-primary-500/30 rounded-full blur-lg animate-[float_3s_ease-in-out_infinite]"
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
