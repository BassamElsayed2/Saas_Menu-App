"use client";

import { useTranslations } from "next-intl";
import { 
  Palette, 
  BarChart3, 
  CreditCard, 
  HeadphonesIcon, 
  Building2, 
  TrendingUp,
  Settings,
  Languages
} from "lucide-react";

const icons = [Palette, BarChart3, CreditCard, Settings, Building2, TrendingUp, HeadphonesIcon, Languages];

const FeaturesSection = () => {
  const t = useTranslations("Landing.features");
  
  const features = [
    { title: t("items.0.title"), description: t("items.0.description") },
    { title: t("items.1.title"), description: t("items.1.description") },
    { title: t("items.2.title"), description: t("items.2.description") },
    { title: t("items.3.title"), description: t("items.3.description") },
    { title: t("items.4.title"), description: t("items.4.description") },
    { title: t("items.5.title"), description: t("items.5.description") },
    { title: t("items.6.title"), description: t("items.6.description") },
    { title: t("items.7.title"), description: t("items.7.description") },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4 animate-bounce-in" suppressHydrationWarning>
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up text-gray-800 dark:text-white">
            <span suppressHydrationWarning>{t("title")}</span>{" "}
            <span className="text-gradient" suppressHydrationWarning>{t("titleHighlight")}</span>{" "}
            <span suppressHydrationWarning>{t("titleEnd")}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
            {t("description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 hover:shadow-purple-500/10 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/20">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" suppressHydrationWarning>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed" suppressHydrationWarning>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
