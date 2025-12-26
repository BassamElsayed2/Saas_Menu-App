"use client";

import { useTranslations } from "next-intl";
import { Package, ListPlus, Share2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const icons = [Package, ListPlus, Share2];

const HowItWorks = () => {
  const t = useTranslations("Landing.howItWorks");
  const { isRTL } = useLanguage();
  
  const steps = [
    { number: t("steps.0.number"), title: t("steps.0.title"), description: t("steps.0.description") },
    { number: t("steps.1.number"), title: t("steps.1.title"), description: t("steps.1.description") },
    { number: t("steps.2.number"), title: t("steps.2.title"), description: t("steps.2.description") },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-shimmer" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4 animate-bounce-in" suppressHydrationWarning>
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up text-gray-800 dark:text-white">
            <span suppressHydrationWarning>{t("title")}</span>{" "}
            <span className="text-gradient" suppressHydrationWarning>{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
            {t("description")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="relative group animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: "forwards" }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`hidden md:block absolute top-16 ${isRTL ? '-left-4' : '-right-4'} w-8 h-0.5 bg-purple-300 dark:bg-purple-600`} />
                )}
                
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-center group-hover:shadow-purple-500/10">
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-purple-100 dark:text-purple-900/50 mb-4 group-hover:text-purple-200 dark:group-hover:text-purple-800/50 transition-colors duration-300 group-hover:scale-110">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-purple-500/20">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" suppressHydrationWarning>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed" suppressHydrationWarning>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
