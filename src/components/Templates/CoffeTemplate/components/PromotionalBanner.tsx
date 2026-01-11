"use client";

import React from "react";
import { fakeImages } from "../utils/fakeImages";

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  kicker?: string;
  align?: "left" | "right";
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  subtitle,
  image,
  imageAlt,
  kicker,
  align = "left",
}) => {
  // Get fallback image based on title
  const getFallbackImage = () => {
    if (title.toLowerCase().includes("happy")) {
      return fakeImages.promotional.happyHour;
    }
    if (title.toLowerCase().includes("weekend")) {
      return fakeImages.promotional.weekendSpecial;
    }
    return fakeImages.promotional.coffee;
  };

  const displayImage = image && image.trim() !== "" && !image.includes("placeholder")
    ? image
    : getFallbackImage();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-card-2)] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/60">
      {/* Background Image (full bleed) */}
      <div className="absolute inset-0">
        <img
          src={displayImage}
          alt={imageAlt || title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getFallbackImage();
          }}
        />
        {/* Dark overlay + vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Gold tint overlay (to match original gold style) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/18 via-transparent to-[var(--accent-2)]/12 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative p-7 md:p-9 min-h-[170px] md:min-h-[220px] flex items-end">
        <div className={`max-w-[85%] ${align === "right" ? "ml-auto text-right" : ""}`}>
          {kicker && (
            <div className="text-[11px] md:text-sm tracking-[0.22em] uppercase text-white/80 mb-2">
              {kicker}
            </div>
          )}
          <div className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
            {title}
          </div>
          <div className="mt-2 text-[12px] md:text-base font-semibold tracking-[0.18em] uppercase text-[var(--accent-2)]">
            {subtitle}
          </div>
        </div>
      </div>

      {/* Subtle border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
      {/* Bottom gold shine */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
    </div>
  );
};
