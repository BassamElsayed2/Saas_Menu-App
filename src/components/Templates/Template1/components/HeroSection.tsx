"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Button } from "./Button";
import { Icon } from "./Icon";

// Default placeholder image
const DEFAULT_IMAGE = "/images/ENSd.png";

interface HeroSectionProps {
  menuName: string;
  description?: string;
  logo?: string;
  rating?: {
    average: number;
    total: number;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  menuName,
  description,
  logo,
  rating,
}) => {
  const { t } = useLanguage();

  // Use logo if provided, otherwise use default
  const logoSrc = logo || DEFAULT_IMAGE;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated Orbs */}
      <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-violet-400 animate-twinkle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 left-32 w-3 h-3 rounded-full bg-blue-400 animate-twinkle" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 right-40 w-2 h-2 rounded-full bg-indigo-300 animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute top-60 right-60 w-3 h-3 rounded-full bg-violet-300 animate-twinkle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-60 left-20 w-4 h-4 rounded-full bg-blue-300 animate-twinkle" style={{ animationDelay: '0.8s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo with Glow */}
        <div className="relative w-36 h-36 mx-auto mb-10">
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 blur-xl opacity-50 animate-pulse-glow" />
          {/* Logo Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-violet-400/30 shadow-2xl shadow-violet-500/30 animate-float bg-violet-900/30">
            <Image src={logoSrc} alt={menuName} fill className="object-cover" />
          </div>
          {/* Orbiting Dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" 
               style={{ animation: 'orbit 8s linear infinite' }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="text-white drop-shadow-2xl">{t.hero.title} </span>
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
            {t.hero.highlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-violet-200/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          {description || t.hero.description}
        </p>

        {/* Rating */}
        {rating && rating.total > 0 && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name={star <= Math.round(rating.average) ? "star-fill" : "star-line"}
                  size={24}
                  className={
                    star <= Math.round(rating.average)
                      ? "text-amber-400 drop-shadow-lg"
                      : "text-violet-300/30"
                  }
                />
              ))}
              <span className="ms-3 text-violet-200 font-semibold">
                {rating.average.toFixed(1)}
              </span>
              <span className="text-violet-300/50 text-sm">
                ({rating.total} {t.rating.reviews})
              </span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Icon name="rocket-2-line" size={24} />
          {t.hero.cta}
        </Button>
      </div>
    </section>
  );
};
