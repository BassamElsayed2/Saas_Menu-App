"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Icon } from "./Icon";
import { DEFAULT_IMAGE, defaultData, formatPrice, getCurrencyLabel } from "../constants";

interface AdItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  originalPrice?: number;
  discountPercent?: number;
}

interface AdBannerProps {
  items?: AdItem[];
  currency?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ items = [], currency = "EGP" }) => {
  const { locale, direction } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use provided items or defaults
  const hasItems = items.length > 0;
  const slides = hasItems ? items.slice(0, 5) : defaultData[locale].ads;
  const totalSlides = slides.length;

  // Navigation handlers
  const goTo = useCallback((index: number) => setCurrentSlide(index), []);
  const goNext = useCallback(() => setCurrentSlide((p) => (p + 1) % totalSlides), [totalSlides]);
  const goPrev = useCallback(() => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides), [totalSlides]);

  // Auto-slide
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [totalSlides, goNext]);

  if (totalSlides === 0) return null;

  return (
    <section className="py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/50 to-blue-900/50 backdrop-blur-sm">
          {/* Slides */}
          <div className="relative min-h-[280px] md:min-h-[320px]">
            {slides.map((slide, i) => {
              const isActive = i === currentSlide;
              const title = hasItems ? (slide as AdItem).name : (slide as typeof defaultData.ar.ads[0]).title;
              const desc = slide.description;
              const img = hasItems ? (slide as AdItem).image : DEFAULT_IMAGE;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <div className="flex h-full flex-col items-center gap-6 p-6 md:flex-row md:p-10">
                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-violet-900/30 ring-2 ring-violet-500/30 md:aspect-square md:w-1/3">
                      <Image src={img || DEFAULT_IMAGE} alt={title} fill className="object-cover" />
                      {hasItems && (slide as AdItem).discountPercent && (
                        <span className="absolute start-3 top-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                          -{(slide as AdItem).discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-start">
                      <h3 className="mb-3 text-2xl font-black text-white md:text-3xl">{title}</h3>
                      <p className="mb-6 text-lg text-violet-200/70">{desc}</p>
                      {hasItems && (
                        <div className="flex items-center justify-center gap-4 md:justify-start">
                          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-3xl font-black text-transparent">
                            {formatPrice((slide as AdItem).price, locale)} {getCurrencyLabel(locale, currency)}
                          </span>
                          {(slide as AdItem).originalPrice && (
                            <span className="text-xl text-violet-400/40 line-through">
                              {formatPrice((slide as AdItem).originalPrice!, locale)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Counter */}
          <div className="absolute end-4 top-4 z-20 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {currentSlide + 1} / {totalSlides}
          </div>

          {/* Dots */}
          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-8 bg-gradient-to-r from-violet-500 to-blue-500" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute start-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <Icon name={direction === "rtl" ? "arrow-right-s-line" : "arrow-left-s-line"} size={24} />
              </button>
              <button
                onClick={goNext}
                className="absolute end-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <Icon name={direction === "rtl" ? "arrow-left-s-line" : "arrow-right-s-line"} size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
