"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface WhyUsItemProps {
  text: string;
  index: number;
}

const WhyUsItem: React.FC<WhyUsItemProps> = ({ text, index }) => (
  <div 
    className="group relative bg-gradient-to-br from-white/40 to-white/20 dark:from-gray-800/40 dark:to-gray-800/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-500/50 animate-fade-in"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    
    {/* Icon */}
    <div className="relative flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-colors duration-300">
        <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Text */}
      <p className="relative text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 leading-relaxed">
        {text}
      </p>
    </div>

    {/* Sparkle Effect on Hover */}
    <Sparkles className="absolute top-4 right-4 w-4 h-4 text-purple-500/30 dark:text-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

export default function WhyUsSection() {
  const t = useTranslations("Landing.whyUs");
  const { isRTL } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const title = t("title");
  const items = [
    t("items.0"),
    t("items.1"),
    t("items.2"),
    t("items.3"),
  ];

  if (!isReady) {
    return null;
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 dark:bg-purple-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400" suppressHydrationWarning>
              {title}
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient animate-gradient" 
            suppressHydrationWarning
          >
            {title}
          </h2>
        </div>

        {/* Items Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {items.map((item, idx) => (
            <WhyUsItem key={idx} text={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
