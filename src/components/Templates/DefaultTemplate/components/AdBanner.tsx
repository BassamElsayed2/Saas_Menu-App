"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context";
import { adsData } from "../data";
import { Button } from "./Button";
import { Icon } from "./Icon";

// ============================
// Ad Banner Component
// ============================

export const AdBanner: React.FC = () => {
  const { locale, direction } = useLanguage();
  const [currentAd, setCurrentAd] = useState(0);
  const rtl = direction === "rtl";

  // Auto-rotate ads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const ad = adsData[currentAd];
  const title = locale === "ar" ? ad.titleAr : ad.titleEn;
  const description = locale === "ar" ? ad.descriptionAr : ad.descriptionEn;
  const badge = ad.badge ? (locale === "ar" ? ad.badge.ar : ad.badge.en) : null;

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div
          dir={direction}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-main)] shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={ad.image}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col sm:flex-row items-center gap-6 min-h-[200px] sm:min-h-[240px]">
            {/* Text Content */}
            <div
              className={`flex-1 text-center sm:text-start ${
                rtl ? "sm:text-right" : "sm:text-left"
              }`}
            >
              {/* Badge */}
              {badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold mb-4 animate-pulse">
                  <Icon name="fire-fill" className="text-sm" />
                  <span>{badge}</span>
                </div>
              )}

              {/* Title with Discount */}
              <div className="flex items-center gap-3 justify-center sm:justify-start mb-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {title}
                </h3>
                {ad.discount && (
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white text-lg sm:text-xl font-bold shadow-lg">
                    -{ad.discount}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/80 mb-6 max-w-md leading-relaxed">
                {description}
              </p>

              {/* CTA */}
              <Button
                variant="hero"
                size="default"
                className="text-sm sm:text-base"
              >
                <span>{locale === "ar" ? "اطلب الآن" : "Order Now"}</span>
                <Icon
                  name={rtl ? "arrow-left-line" : "arrow-right-line"}
                  className="text-lg"
                />
              </Button>
            </div>

            {/* Decorative Element */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-12 w-32 h-32 rounded-full bg-[var(--accent)]/20 blur-2xl" />
          </div>

          {/* Ad Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {adsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentAd === index
                    ? "w-6 bg-[var(--accent)]"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentAd(
                (prev) => (prev - 1 + adsData.length) % adsData.length
              )
            }
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent)] transition-all duration-300 ${
              rtl ? "right-3" : "left-3"
            }`}
          >
            <Icon
              name={rtl ? "arrow-right-s-line" : "arrow-left-s-line"}
              className="text-xl"
            />
          </button>
          <button
            onClick={() => setCurrentAd((prev) => (prev + 1) % adsData.length)}
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent)] transition-all duration-300 ${
              rtl ? "left-3" : "right-3"
            }`}
          >
            <Icon
              name={rtl ? "arrow-left-s-line" : "arrow-right-s-line"}
              className="text-xl"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

