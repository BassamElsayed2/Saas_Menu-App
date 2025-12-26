"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles } from "lucide-react";

const PricingSection = () => {
  const t = useTranslations("Landing.pricing");
  
  const packages = [
    {
      name: t("packages.0.name"),
      originalPrice: t("packages.0.originalPrice"),
      price: t("packages.0.price"),
      features: [
        t("packages.0.features.0"),
        t("packages.0.features.1"),
        t("packages.0.features.2"),
        t("packages.0.features.3"),
        t("packages.0.features.4"),
      ],
      enterpriseCta: t("packages.0.enterpriseCta"),
    },
    {
      name: t("packages.1.name"),
      originalPrice: t("packages.1.originalPrice"),
      price: t("packages.1.price"),
      features: [
        t("packages.1.features.0"),
        t("packages.1.features.1"),
        t("packages.1.features.2"),
        t("packages.1.features.3"),
        t("packages.1.features.4"),
      ],
      enterpriseCta: t("packages.1.enterpriseCta"),
    },
    {
      name: t("packages.2.name"),
      originalPrice: t("packages.2.originalPrice"),
      price: t("packages.2.price"),
      features: [
        t("packages.2.features.0"),
        t("packages.2.features.1"),
        t("packages.2.features.2"),
        t("packages.2.features.3"),
        t("packages.2.features.4"),
      ],
      enterpriseCta: t("packages.2.enterpriseCta"),
    },
  ];

  return (
    <section id="packages" className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500 rounded-full animate-float opacity-30" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full animate-float opacity-20" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-float opacity-25" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-500 rounded-full animate-float opacity-15" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up text-gray-800 dark:text-white">
            <span suppressHydrationWarning>{t("title")}</span>{" "}
            <span className="text-gradient" suppressHydrationWarning>{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
            {t("description")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const isPopular = index === 1;
            const isEnterprise = index === 2;
            
            return (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-3 animate-fade-in opacity-0 ${
                  isPopular
                    ? "border-purple-500 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800 shadow-xl shadow-purple-500/10 scale-105 md:scale-110 z-10"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg"
                }`}
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-2 bg-gradient-primary rounded-full text-white text-sm font-semibold animate-bounce-in shadow-lg" suppressHydrationWarning>
                      <Star className="w-4 h-4 fill-current animate-pulse" />
                      {t("mostPopular")}
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Discount Badge (for non-popular) */}
                {index === 0 && (
                  <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4 animate-pulse" suppressHydrationWarning>
                    {t("save40")}
                  </div>
                )}

                {/* Package Name */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white" suppressHydrationWarning>{pkg.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  {pkg.originalPrice && (
                    <span className="text-gray-400 dark:text-gray-500 line-through text-lg ml-2" suppressHydrationWarning>
                      {pkg.originalPrice} {t("egp")}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient" suppressHydrationWarning>
                      {isEnterprise ? t("contactUs") : pkg.price}
                    </span>
                    {!isEnterprise && pkg.price && (
                      <span className="text-gray-500 dark:text-gray-400" suppressHydrationWarning>{t("egp")} / {t("yearly")}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li 
                      key={fIndex} 
                      className="flex items-start gap-3 animate-fade-in opacity-0"
                      style={{ animationDelay: `${(index * 0.15) + (fIndex * 0.05)}s`, animationFillMode: "forwards" }}
                    >
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-200 transition-colors">
                        <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300" suppressHydrationWarning>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={isPopular ? "hero" : "outline"}
                  size="lg"
                  className={`w-full transition-all duration-300 ${isPopular ? 'hover:scale-105 shadow-lg' : 'hover:bg-purple-50 dark:hover:bg-purple-900/30'}`}
                  asChild
                  suppressHydrationWarning
                >
                  <a href="#contact">{pkg.enterpriseCta}</a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
